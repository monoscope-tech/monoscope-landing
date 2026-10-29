---
title: Integrating monoscope with Docker
ogTitle: How to Integrate monoscope with Docker using OpenTelemetry Collector
faLogo: docker
date: 2024-06-14
updatedDate: 2024-06-14
linkTitle: "Docker"
menuWeight: 20
---

# Integrating monoscope with Docker

This guide explains how to integrate monoscope with Docker containers using the OpenTelemetry Collector for infrastructure-level API monitoring and observability.

```=html
<hr>
```

## Prerequisites

- Docker and Docker Compose
- A monoscope project and its API key. If you do not have them yet, follow [Get started](/docs/onboarding/#get-your-api-key).

## Integration with OpenTelemetry Collector in Docker

The recommended approach for monitoring applications in Docker is to use the OpenTelemetry Collector as a sidecar or dedicated service. This infrastructure-level approach avoids the need for code modifications across your applications.

### Setting Up the OpenTelemetry Collector

Create a `docker-compose.yml` file that includes the OpenTelemetry Collector and your application services:

```yaml
services:
  # Your application service
  app:
    image: your-application-image
    depends_on:
      - otel-collector
    # Other application configuration...

  # OpenTelemetry Collector
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    container_name: otel-collector
    command: ["--config=/etc/otel-collector-config.yaml"]
    # The collector image runs as a non-root user. It needs root (or the host's
    # docker group via group_add) to read the Docker socket and container logs.
    user: "0"
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
    ports:
      - "4317:4317"   # OTLP gRPC receiver
      - "4318:4318"   # OTLP HTTP receiver
    environment:
      - MONOSCOPE_API_KEY=YOUR_API_KEY
```

### Configuring the OpenTelemetry Collector

Create an `otel-collector-config.yaml` file:

```yaml
receivers:
  # Collect metrics from Docker containers
  docker_stats:
    endpoint: unix:///var/run/docker.sock
    collection_interval: 30s
    timeout: 20s
    # Copy these container labels onto each metric data point.
    container_labels_to_metric_labels:
      app.name: app.name
      app.version: app.version

  # Collect logs from Docker containers (json-file logging driver)
  file_log:
    include:
      - /var/lib/docker/containers/*/*-json.log
    include_file_path: true
    operators:
      # Unwrap Docker's JSON envelope: body, stream and timestamp.
      - type: container
        format: docker
        add_metadata_from_filepath: false
      # Merge stack traces and other indented continuation lines into the
      # preceding entry. A line that starts with a non-whitespace character
      # starts a new entry. Tighten this if your apps log indented content
      # that should stay separate.
      - type: recombine
        combine_field: body
        is_first_entry: body matches "^\\S"
        source_identifier: attributes["log.file.path"]

  # Standard OTLP receiver for any instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
  memory_limiter:
    check_interval: 1s
    limit_mib: 4000
    spike_limit_mib: 800
  resource_detection:
    detectors: [env, docker]
    override: false
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
      processors: [memory_limiter, batch, resource_detection, resource]
      exporters: [otlp_grpc]
    metrics:
      receivers: [otlp, docker_stats]
      processors: [memory_limiter, batch, resource_detection, resource]
      exporters: [otlp_grpc]
    logs:
      receivers: [otlp, file_log]
      processors: [memory_limiter, batch, resource_detection, resource]
      exporters: [otlp_grpc]
```

### Mounting Docker Socket for Container Monitoring

The collector reads container stats from the Docker socket and container logs from `/var/lib/docker/containers`. The Compose file above mounts both read-only. If you run the collector another way, mount the same two paths.

## Using Auto-Instrumentation with the Collector

For applications that support OpenTelemetry auto-instrumentation, you can configure them to send telemetry to the collector without code changes:

### Java Applications

```yaml
services:
  java-app:
    image: your-java-app
    environment:
      - JAVA_TOOL_OPTIONS=-javaagent:/opentelemetry-javaagent.jar
      - OTEL_TRACES_EXPORTER=otlp
      - OTEL_METRICS_EXPORTER=otlp
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
      - OTEL_EXPORTER_OTLP_PROTOCOL=grpc
      - OTEL_SERVICE_NAME=your-service-name
    volumes:
      - ./opentelemetry-javaagent.jar:/opentelemetry-javaagent.jar
    depends_on:
      - otel-collector
```

### Node.js Applications

Install `@opentelemetry/api` and `@opentelemetry/auto-instrumentations-node` in the app image first.

```yaml
services:
  node-app:
    image: your-node-app
    environment:
      - NODE_OPTIONS=--require @opentelemetry/auto-instrumentations-node/register
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
      - OTEL_EXPORTER_OTLP_PROTOCOL=grpc
      - OTEL_SERVICE_NAME=your-node-service
    depends_on:
      - otel-collector
```

## Monitoring Multiple Services

One collector covers every container on the host. `docker_stats` reports each container with its `container.name` and `container.image.name`. Labels listed under `container_labels_to_metric_labels` are copied onto the metrics too:

```yaml
services:
  api-service:
    image: your-api-service
    labels:
      app.name: api-service
      app.version: 1.0.0

  auth-service:
    image: your-auth-service
    labels:
      app.name: auth-service
      app.version: 1.0.0

  database-service:
    image: your-database-service
    labels:
      app.name: database-service
      app.version: 1.0.0

  otel-collector:
    # ... collector configuration as above
```

## Verifying the Setup

After starting your Docker Compose stack:

1. Check collector logs to ensure proper configuration:
   ```bash
   docker logs otel-collector
   ```

2. Send some test traffic to your applications

3. Verify in your monoscope dashboard that telemetry data is being received

## Next Steps

- Configure alerting in monoscope based on infrastructure metrics
- Set up additional receivers in the collector for other data sources
- Use Docker labels to organize and categorize your services for better visibility
- Explore OpenTelemetry Collector processors for filtering and enriching telemetry data