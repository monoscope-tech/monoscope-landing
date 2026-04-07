---
title: Integrating monoscope with Kubernetes
ogTitle: How to Integrate monoscope with Kubernetes using OpenTelemetry Collector
faLogo: cube
date: 2024-06-14
updatedDate: 2026-04-07
linkTitle: "Kubernetes"
menuWeight: 10
---

# Integrating monoscope with Kubernetes

This guide shows how to send Kubernetes logs, metrics, events, and traces to monoscope using the OpenTelemetry Collector — no application code changes required.

```=html
<hr>
```

## Prerequisites

- A Kubernetes cluster
- `kubectl` installed
- Helm 3
- A monoscope account with an API key

## Architecture: Why Two Collectors

Kubernetes telemetry comes from two fundamentally different sources, and each requires a different deployment shape:

| Data | Source | Deployment |
|------|--------|------------|
| Pod logs (`filelog`) | Files on each node's disk (`/var/log/pods`) | **DaemonSet** — one per node |
| Kubelet metrics (`kubeletstats`) | Local kubelet on each node | **DaemonSet** — one per node |
| Cluster events (`k8s_events`) | Kubernetes API server (cluster-global) | **Deployment**, 1 replica |
| Cluster metrics (`k8s_cluster`) | Kubernetes API server (cluster-global) | **Deployment**, 1 replica |

Running everything in a single DaemonSet duplicates events and cluster metrics N times (once per node). Running everything in a single Deployment silently drops logs from every node except one. The safe pattern is to install **two** collector releases — an **agent** (DaemonSet) and a **cluster** collector (Deployment).

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p>This split is the OpenTelemetry community's recommended pattern. The Helm chart's <code>presets</code> auto-wire the receivers, RBAC, and host mounts — you just pick which presets belong on which release.</p>
</div>
```

## Recommended: Helm (Two Releases)

### 1. Add the Helm Repository

```bash
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

### 2. Create a Secret for Your API Key

```bash
kubectl create secret generic monoscope-secrets \
  --from-literal=api-key=YOUR_API_KEY
```

### 3. Agent Collector (DaemonSet) — Logs and Node Metrics

Create `values-agent.yaml`:

```yaml
mode: daemonset

image:
  repository: ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector-k8s
  tag: "0.149.0"           # pin to avoid silent breaking upgrades
command:
  name: otelcol-k8s

presets:
  logsCollection:
    enabled: true          # filelog — reads /var/log/pods on each node
  kubeletMetrics:
    enabled: true          # kubeletstats — local kubelet
  kubernetesAttributes:
    enabled: true          # enriches telemetry with pod/namespace metadata
  # clusterMetrics and kubernetesEvents intentionally OFF here —
  # they belong on the cluster collector (one replica only).

extraEnvs:
  - name: MONOSCOPE_API_KEY
    valueFrom:
      secretKeyRef:
        name: monoscope-secrets
        key: api-key

config:
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318

  processors:
    batch: {}
    memory_limiter:
      check_interval: 1s
      limit_mib: 4000
      spike_limit_mib: 800
    resource:
      attributes:
        - key: x-api-key
          value: ${env:MONOSCOPE_API_KEY}
          action: upsert

  exporters:
    otlp_grpc:
      endpoint: "otelcol.monoscope.tech:4317"
      tls:
        insecure: true

  service:
    pipelines:
      traces:
        receivers: [otlp]
        processors: [memory_limiter, batch, resource]
        exporters: [otlp_grpc]
      metrics:
        receivers: [otlp]
        processors: [memory_limiter, batch, resource]
        exporters: [otlp_grpc]
      logs:
        receivers: [otlp]
        processors: [memory_limiter, batch, resource]
        exporters: [otlp_grpc]
```

Install it:

```bash
helm install monoscope-agent open-telemetry/opentelemetry-collector \
  --values values-agent.yaml
```

### 4. Cluster Collector (Deployment) — Events and Cluster Metrics

Create `values-cluster.yaml`:

```yaml
mode: deployment
replicaCount: 1            # MUST stay 1 — k8s_events and k8s_cluster are singletons

image:
  repository: ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector-k8s
  tag: "0.149.0"           # pin to avoid silent breaking upgrades
command:
  name: otelcol-k8s

presets:
  clusterMetrics:
    enabled: true          # k8s_cluster — cluster-wide metrics from API server
  kubernetesEvents:
    enabled: true          # k8s_events — cluster-wide events from API server
  kubernetesAttributes:
    enabled: true

extraEnvs:
  - name: MONOSCOPE_API_KEY
    valueFrom:
      secretKeyRef:
        name: monoscope-secrets
        key: api-key

config:
  processors:
    batch: {}
    memory_limiter:
      check_interval: 1s
      limit_mib: 1000
      spike_limit_mib: 200
    resource:
      attributes:
        - key: x-api-key
          value: ${env:MONOSCOPE_API_KEY}
          action: upsert

  exporters:
    otlp_grpc:
      endpoint: "otelcol.monoscope.tech:4317"
      tls:
        insecure: true

  service:
    pipelines:
      metrics:
        receivers: [k8s_cluster]
        processors: [memory_limiter, batch, resource]
        exporters: [otlp_grpc]
      logs:
        receivers: [k8s_events]
        processors: [memory_limiter, batch, resource]
        exporters: [otlp_grpc]
```

Install it:

```bash
helm install monoscope-cluster open-telemetry/opentelemetry-collector \
  --values values-cluster.yaml
```

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p>The presets auto-configure the matching receivers and the required ClusterRole/ClusterRoleBinding for each release. <code>image.repository</code> must point to GHCR — Docker Hub images are no longer published since chart v0.122.0.</p>
</div>
```

### 5. Verify

```bash
kubectl get pods -l app.kubernetes.io/name=opentelemetry-collector
kubectl logs -l app.kubernetes.io/instance=monoscope-agent
kubectl logs -l app.kubernetes.io/instance=monoscope-cluster
```

You should see the agent running on every node and a single cluster collector pod. Telemetry will start appearing in your monoscope dashboard within a minute.

## Sending Application Telemetry

Both collectors expose OTLP on `4317` (gRPC) and `4318` (HTTP). Point your instrumented apps at the **agent** service (it's local to each node, so latency is lowest):

```
http://monoscope-agent-opentelemetry-collector.default.svc.cluster.local:4318
```

## Advanced: OpenTelemetry Operator

If you already run the [OpenTelemetry Operator](https://github.com/open-telemetry/opentelemetry-operator) — for example because you use its auto-instrumentation feature, manage everything via Argo CD / Flux, or need the Target Allocator for Prometheus sharding — you can replace the two Helm releases with two `OpenTelemetryCollector` custom resources.

The same split applies: **one CR with `mode: daemonset`** for `filelog` + `kubeletstats`, and **one CR with `mode: deployment` and `replicas: 1`** for `k8s_events` + `k8s_cluster`.

### Install the Operator

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```

### Agent CR (DaemonSet)

```yaml
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: monoscope-agent
spec:
  mode: daemonset
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
  env:
    - name: K8S_NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
  config:
    receivers:
      filelog:
        include: [/var/log/pods/*/*/*/*.log]
        start_at: beginning
      kubeletstats:
        collection_interval: 10s
        auth_type: serviceAccount
        endpoint: ${env:K8S_NODE_NAME}:10250
        insecure_skip_verify: true
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    processors:
      batch: {}
      memory_limiter:
        check_interval: 1s
        limit_mib: 4000
        spike_limit_mib: 800
      k8s_attributes:
        auth_type: serviceAccount
        passthrough: false
        filter:
          node_from_env_var: K8S_NODE_NAME
      resource:
        attributes:
          - key: x-api-key
            value: YOUR_API_KEY
            action: upsert
    exporters:
      otlp_grpc:
        endpoint: "otelcol.monoscope.tech:4317"
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [k8s_attributes, memory_limiter, batch, resource]
          exporters: [otlp_grpc]
        metrics:
          receivers: [otlp, kubeletstats]
          processors: [k8s_attributes, memory_limiter, batch, resource]
          exporters: [otlp_grpc]
        logs:
          receivers: [filelog, otlp]
          processors: [k8s_attributes, memory_limiter, batch, resource]
          exporters: [otlp_grpc]
```

### Cluster CR (Deployment, 1 replica)

```yaml
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: monoscope-cluster
spec:
  mode: deployment
  replicas: 1
  config:
    receivers:
      k8s_cluster:
        collection_interval: 10s
      k8s_events:
        namespaces: []
    processors:
      batch: {}
      memory_limiter:
        check_interval: 1s
        limit_mib: 1000
        spike_limit_mib: 200
      resource:
        attributes:
          - key: x-api-key
            value: YOUR_API_KEY
            action: upsert
    exporters:
      otlp_grpc:
        endpoint: "otelcol.monoscope.tech:4317"
        tls:
          insecure: true
    service:
      pipelines:
        metrics:
          receivers: [k8s_cluster]
          processors: [memory_limiter, batch, resource]
          exporters: [otlp_grpc]
        logs:
          receivers: [k8s_events]
          processors: [memory_limiter, batch, resource]
          exporters: [otlp_grpc]
```

### RBAC

Both CRs need read access to pods, namespaces, nodes, events, and the workload APIs. Apply this once:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: monoscope-collector
rules:
- apiGroups: [""]
  resources: [pods, namespaces, nodes, nodes/stats, nodes/metrics, services, events]
  verbs: [get, list, watch]
- apiGroups: ["apps"]
  resources: [deployments, replicasets, daemonsets, statefulsets]
  verbs: [get, list, watch]
- apiGroups: ["events.k8s.io"]
  resources: [events]
  verbs: [get, list, watch]
- apiGroups: ["discovery.k8s.io"]
  resources: [endpointslices]
  verbs: [get, list, watch]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: monoscope-collector
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: monoscope-collector
subjects:
- kind: ServiceAccount
  name: monoscope-agent-collector
  namespace: default
- kind: ServiceAccount
  name: monoscope-cluster-collector
  namespace: default
```

## Monitoring API Gateways and Ingresses

For Kubernetes API gateways (Kong, Istio, Ambassador) or Ingress controllers, point them at the agent collector's OTLP endpoint. For example, with the Nginx Ingress Controller:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otlp-collector-host: "monoscope-agent-opentelemetry-collector.default.svc.cluster.local"
  otlp-collector-port: "4317"
```

Then enable tracing per Ingress:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/enable-opentelemetry: "true"
```

## Next Steps

- Configure alerts in monoscope based on Kubernetes metrics and events
- Build dashboards for cluster health and workload performance
- Correlate API latency with container resource usage
- Use monoscope insights to right-size deployments and spot regressions
