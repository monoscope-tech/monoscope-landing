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

- Docker installed on your system
- Docker Compose
- monoscope account with an API key

## Integration with OpenTelemetry Collector in Docker

The recommended approach for monitoring applications in Docker is to use the OpenTelemetry Collector as a sidecar or dedicated service. This infrastructure-level approach avoids the need for code modifications across your applications.

### Setting Up the OpenTelemetry Collector

Create a `docker-compose.yml` file that includes the OpenTelemetry Collector and your application services:

```yaml
version: '3'
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
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    ports:
      - "4317:4317"   # OTLP gRPC receiver
      - "4318:4318"   # OTLP HTTP receiver
      - "8888:8888"   # Metrics endpoint
      - "8889:8889"   # Health check endpoint
    environment:
      - MONOSCOPE_API_KEY=YOUR_API_KEY
```

### Configuring the OpenTelemetry Collector

Create an `otel-collector-config.yaml` file:

```yaml
receivers:
  # Collect metrics from Docker containers
  docker_stats:
    collection_interval: 10s
    timeout: 20s
    api_version: 1.24
    providers:
      docker:
        endpoint: unix:///var/run/docker.sock
        container_labels_to_resource_attributes:
          app.name: service.name
          app.version: service.version
  
  # Collect logs from Docker containers
  filelog:
    include:
      - /var/lib/docker/containers/*/*.log
    operators:
      - type: json_parser
      - type: regex_parser
        regex: '^(?P<time>[^ ]+) (?P<stream>stdout|stderr) (?P<flags>[^ ]*) (?P<content>.*)$'
        timestamp:
          parse_from: time
          layout: '%Y-%m-%dT%H:%M:%S.%LZ'

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
  resourcedetection:
    detectors: [env, docker]
    override: false
  resource:
    attributes:
      - key: x-api-key
        value: ${env:MONOSCOPE_API_KEY}
        action: upsert

exporters:
  otlp:
    endpoint: "otelcol.monoscope.tech:4317"
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, batch, resourcedetection, resource]
      exporters: [otlp]
    metrics:
      receivers: [otlp, docker_stats]
      processors: [memory_limiter, batch, resourcedetection, resource]
      exporters: [otlp]
    logs:
      receivers: [otlp, filelog]
      processors: [memory_limiter, batch, resourcedetection, resource]
      exporters: [otlp]
```

### Mounting Docker Socket for Container Monitoring

To allow the OpenTelemetry Collector to monitor Docker containers, you need to mount the Docker socket into the collector container:

```yaml
services:
  otel-collector:
    # ... other configuration
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
      - /var/run/docker.sock:/var/run/docker.sock  # Mount Docker socket
      - /var/lib/docker/containers:/var/lib/docker/containers:ro  # For container logs
```

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
      - OTEL_SERVICE_NAME=your-service-name
    volumes:
      - ./opentelemetry-javaagent.jar:/opentelemetry-javaagent.jar
    depends_on:
      - otel-collector
```

### Node.js Applications

```yaml
services:
  node-app:
    image: your-node-app
    environment:
      - NODE_OPTIONS=--require @opentelemetry/auto-instrumentations-node/register
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
      - OTEL_SERVICE_NAME=your-node-service
    depends_on:
      - otel-collector
```

## Monitoring Multiple Services

The collector-based approach is particularly useful for microservices architectures where you have multiple services:

```yaml
version: '3'
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