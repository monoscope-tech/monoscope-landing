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
| Pod logs (`filelog`) | Files on each node's disk (`/var/log/pods`) | *DaemonSet* — one per node |
| Kubelet metrics (`kubeletstats`) | Local kubelet on each node | *DaemonSet* — one per node |
| Cluster events (`k8s_events`, emitted as logs) | Kubernetes API server (cluster-global) | *Deployment*, 1 replica |
| Cluster metrics (`k8s_cluster`) | Kubernetes API server (cluster-global) | *Deployment*, 1 replica |

Running everything in a single DaemonSet duplicates events and cluster metrics N times (once per node). Running everything in a single Deployment silently drops logs from every node except one. The safe pattern is to install *two* collector releases — an *agent* (DaemonSet) and a *cluster* collector (Deployment).

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
  # Pin a specific tag so chart upgrades don't silently roll a new collector.
  # Current as of April 2026 — bump after reviewing the release notes:
  # https://github.com/open-telemetry/opentelemetry-collector-releases/releases
  repository: ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector-k8s
  tag: "0.149.0"

presets:
  logsCollection:
    enabled: true          # filelog — reads /var/log/pods on each node
  kubeletMetrics:
    enabled: true          # kubeletstats — local kubelet
  kubernetesAttributes:
    enabled: true          # k8s_attributes processor — enriches with pod/namespace metadata
  # clusterMetrics and kubernetesEvents intentionally OFF here —
  # they belong on the cluster collector (one replica only).

extraEnvs:
  - name: MONOSCOPE_API_KEY
    valueFrom:
      secretKeyRef:
        name: monoscope-secrets
        key: api-key

config:
  # health_check must be declared explicitly: when you override config:, the
  # chart's default service.extensions block is replaced, and the readiness
  # probe (port 13133) starts failing.
  extensions:
    health_check:
      endpoint: 0.0.0.0:13133

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
    # Declared explicitly because overriding config.processors replaces the
    # block the kubernetesAttributes preset would have injected.
    k8s_attributes:
      auth_type: serviceAccount
      passthrough: false
      extract:
        metadata:
          - k8s.pod.name
          - k8s.pod.uid
          - k8s.deployment.name
          - k8s.namespace.name
          - k8s.node.name
          - k8s.container.name
    resource:
      attributes:
        - key: x-api-key
          value: ${env:MONOSCOPE_API_KEY}
          action: upsert

  exporters:
    # tls.insecure is safe here: the monoscope ingest endpoint terminates TLS at
    # its load balancer; the collector connects over a plaintext-tolerant L4 path.
    otlp_grpc:
      endpoint: "otelcol.monoscope.tech:4317"
      tls:
        insecure: true

  # IMPORTANT: when you override service.pipelines, you must list every receiver
  # and processor you want active — including the ones the presets configured
  # (filelog, kubeletstats, k8s_attributes). The chart merges receivers/processors
  # but does NOT merge pipeline arrays. Same applies to service.extensions: it's
  # replaced wholesale, so health_check must be re-declared here.
  service:
    extensions: [health_check]
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
        receivers: [otlp, filelog]
        processors: [k8s_attributes, memory_limiter, batch, resource]
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
# Must stay 1 — k8s_events and k8s_cluster don't leader-elect, so >1 replica
# produces duplicate events and cluster metrics.
replicaCount: 1

image:
  repository: ghcr.io/open-telemetry/opentelemetry-collector-releases/opentelemetry-collector-k8s
  tag: "0.149.0"           # see release notes before bumping

presets:
  clusterMetrics:
    enabled: true          # k8s_cluster — cluster-wide metrics from API server
  kubernetesEvents:
    enabled: true          # k8s_events — emits events as logs
  kubernetesAttributes:
    enabled: true

extraEnvs:
  - name: MONOSCOPE_API_KEY
    valueFrom:
      secretKeyRef:
        name: monoscope-secrets
        key: api-key

config:
  # See agent values for why health_check must be re-declared here.
  extensions:
    health_check:
      endpoint: 0.0.0.0:13133

  # Receivers are declared explicitly so the pipelines below are unambiguous.
  # The presets generate matching RBAC; the receiver blocks are merged with
  # whatever the presets inject.
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
    # Must be declared explicitly — overriding config.processors replaces the
    # block the kubernetesAttributes preset would have injected, so the
    # pipelines below would otherwise fail with a "reference error" on startup.
    k8s_attributes:
      auth_type: serviceAccount
      passthrough: false
    resource:
      attributes:
        - key: x-api-key
          value: ${env:MONOSCOPE_API_KEY}
          action: upsert

  exporters:
    otlp_grpc:
      endpoint: "otelcol.monoscope.tech:4317"
      tls:
        insecure: true     # see note in agent values

  service:
    extensions: [health_check]
    pipelines:
      metrics:
        receivers: [k8s_cluster]
        processors: [k8s_attributes, memory_limiter, batch, resource]
        exporters: [otlp_grpc]
      logs:
        receivers: [k8s_events]
        processors: [k8s_attributes, memory_limiter, batch, resource]
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
  <p>The presets auto-configure the matching receivers and the required ClusterRole/ClusterRoleBinding for each release. <code>image.repository</code> must point to GHCR — official collector images are no longer published to Docker Hub.</p>
</div>
```

### 5. Verify

```bash
kubectl get pods -l app.kubernetes.io/name=opentelemetry-collector
kubectl logs daemonset/monoscope-agent-opentelemetry-collector
kubectl logs deployment/monoscope-cluster-opentelemetry-collector
```

You should see the agent running on every node and a single cluster collector pod. Telemetry will start flowing to your monoscope dashboard shortly after the pods become Ready.

## Sending Application Telemetry

Both collectors expose OTLP on `4317` (gRPC) and `4318` (HTTP). Point your instrumented apps at the *agent* service:

```
http://monoscope-agent-opentelemetry-collector.default.svc.cluster.local:4318
```

By default this `ClusterIP` Service load-balances across every agent pod cluster-wide. If you want each app pod to send to the agent on its own node (lower latency, no cross-node hops), patch the Service with `spec.internalTrafficPolicy: Local`.

## Advanced: OpenTelemetry Operator

If you already run the [OpenTelemetry Operator](https://github.com/open-telemetry/opentelemetry-operator) — for example because you use its auto-instrumentation feature, manage everything via Argo CD / Flux, or need the Target Allocator for Prometheus sharding — you can replace the two Helm releases with two `OpenTelemetryCollector` custom resources.

The same split applies: *one CR with `mode: daemonset`* for `filelog` + `kubeletstats`, and *one CR with `mode: deployment` and `replicas: 1`* for `k8s_events` + `k8s_cluster`.

### Install the Operator

The OTel Operator's admission webhook requires cert-manager (or another certificate provider). Skip the first command if you already have cert-manager — or any compatible cert source — installed. For production, replace `latest` with a pinned release tag from each project.

```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/latest/download/cert-manager.yaml
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/latest/download/opentelemetry-operator.yaml
```

Create the same API key secret used by the Helm path (skip if already created):

```bash
kubectl create secret generic monoscope-secrets \
  --from-literal=api-key=YOUR_API_KEY
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
    - name: MONOSCOPE_API_KEY
      valueFrom:
        secretKeyRef:
          name: monoscope-secrets
          key: api-key
  config:
    extensions:
      health_check:
        endpoint: 0.0.0.0:13133
    receivers:
      filelog:
        # Path layout: /var/log/pods/<ns>_<pod>_<uid>/<container>/<restart>.log
        include: [/var/log/pods/*/*/*.log]
        start_at: end          # use 'beginning' only for first-install backfill
      kubeletstats:
        collection_interval: 10s
        auth_type: serviceAccount
        endpoint: ${env:K8S_NODE_NAME}:10250
        insecure_skip_verify: true   # acceptable for dev; in production mount the kubelet CA
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
            value: ${env:MONOSCOPE_API_KEY}
            action: upsert
    exporters:
      otlp_grpc:
        endpoint: "otelcol.monoscope.tech:4317"
        tls:
          insecure: true
    service:
      extensions: [health_check]
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
  env:
    - name: MONOSCOPE_API_KEY
      valueFrom:
        secretKeyRef:
          name: monoscope-secrets
          key: api-key
  config:
    extensions:
      health_check:
        endpoint: 0.0.0.0:13133
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
      k8s_attributes:
        auth_type: serviceAccount
        passthrough: false
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
      extensions: [health_check]
      pipelines:
        metrics:
          receivers: [k8s_cluster]
          processors: [k8s_attributes, memory_limiter, batch, resource]
          exporters: [otlp_grpc]
        logs:
          receivers: [k8s_events]
          processors: [k8s_attributes, memory_limiter, batch, resource]
          exporters: [otlp_grpc]
```

### RBAC

Both CRs need read access to pods, namespaces, nodes, events, and the workload APIs. The OTel Operator creates a ServiceAccount named `<cr-name>-collector` in the CR's namespace, so the binding below targets `monoscope-agent-collector` and `monoscope-cluster-collector`. Apply this once:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: monoscope-collector
rules:
- apiGroups: [""]
  resources:
    - pods
    - namespaces
    - nodes
    - nodes/stats
    - nodes/proxy
    - services
    - events
    - replicationcontrollers
    - resourcequotas
    - persistentvolumes
    - persistentvolumeclaims
  verbs: [get, list, watch]
- apiGroups: ["apps"]
  resources: [deployments, replicasets, daemonsets, statefulsets]
  verbs: [get, list, watch]
- apiGroups: ["batch"]
  resources: [jobs, cronjobs]
  verbs: [get, list, watch]
- apiGroups: ["autoscaling"]
  resources: [horizontalpodautoscalers]
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
