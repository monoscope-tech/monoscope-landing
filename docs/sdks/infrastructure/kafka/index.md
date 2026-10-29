---
title: Integrating monoscope with Kafka
ogTitle: How to Monitor Kafka Producers and Consumers with monoscope using OpenTelemetry Collector
faLogo: message-lines
date: 2024-06-14
updatedDate: 2026-10-29
linkTitle: "Kafka"
menuWeight: 40
---

# Integrating monoscope with Kafka

This guide demonstrates how to integrate monoscope with Kafka using the OpenTelemetry Collector for infrastructure-level monitoring without requiring code changes to your Kafka producers and consumers.

```=html
<hr>
```

## Prerequisites

- Apache Kafka cluster
- OpenTelemetry Collector Contrib, version 0.140 or later
- A monoscope project and its API key. If you do not have them yet, follow [Get started](/docs/onboarding/#get-your-api-key).

## Monitoring Kafka with OpenTelemetry Collector

### 1. Deploying the OpenTelemetry Collector for Kafka

The OpenTelemetry Collector can be deployed alongside your Kafka cluster to collect metrics, logs, and traces without modifying your application code.

#### Option 1: Using Docker

```yaml
services:
  # Kafka and Zookeeper services (your existing setup)
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    # ... zookeeper configuration
    
  kafka:
    image: confluentinc/cp-kafka:latest
    # ... kafka configuration
    depends_on:
      - zookeeper
      
  # OpenTelemetry Collector
  otel-collector:
    image: otel/opentelemetry-collector-contrib:0.163.2
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
      - kafka-logs:/var/log/kafka:ro   # the same volume the broker writes its logs to
    environment:
      - MONOSCOPE_API_KEY=YOUR_API_KEY
    ports:
      - "4317:4317"   # OTLP gRPC receiver
      - "4318:4318"   # OTLP HTTP receiver
      - "8888:8888"   # Metrics endpoint
    depends_on:
      - kafka
```

#### Option 2: Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: otel-collector
spec:
  replicas: 1
  selector:
    matchLabels:
      app: otel-collector
  template:
    metadata:
      labels:
        app: otel-collector
    spec:
      containers:
      - name: otel-collector
        image: otel/opentelemetry-collector-contrib:0.163.2
        args:
        - "--config=/conf/otel-collector-config.yaml"
        volumeMounts:
        - name: otel-collector-config
          mountPath: /conf
        env:
        - name: MONOSCOPE_API_KEY
          valueFrom:
            secretKeyRef:
              name: monoscope-secrets
              key: api-key
      volumes:
      - name: otel-collector-config
        configMap:
          name: otel-collector-config
```

### 2. Configuring the OpenTelemetry Collector for Kafka

Create an `otel-collector-config.yaml` file with the following configuration:

```yaml
receivers:
  # Broker, topic and consumer-group metrics from the Kafka protocol
  kafka_metrics:
    brokers: [kafka:9092]
    collection_interval: 10s
    scrapers: [brokers, topics, consumers]
    topic_match: ".*"
    group_match: ".*"
    client_id: otel-collector

  # Broker JVM and JMX metrics, exposed by the Prometheus JMX exporter (step 3)
  prometheus:
    config:
      scrape_configs:
        - job_name: kafka-jmx
          scrape_interval: 10s
          static_configs:
            - targets: ["kafka:7071"]

  # Kafka server logs
  file_log:
    include:
      - /var/log/kafka/server.log
      - /var/log/kafka/kafka-request.log
    start_at: end
    include_file_path: true
    # Kafka writes Java stack traces across many lines. Each record starts
    # with a timestamp; every other line belongs to the record before it.
    multiline:
      line_start_pattern: '^\[?\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
    operators:
      - type: regex_parser
        regex: '^\[?(?P<time>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3})\]? (?P<level>\w+) (?P<message>(?s).*)'
        timestamp:
          parse_from: attributes.time
          layout: '%Y-%m-%d %H:%M:%S,%L'
        severity:
          parse_from: attributes.level

  # OTLP from instrumented producers and consumers
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  memory_limiter:
    check_interval: 1s
    limit_percentage: 80
    spike_limit_percentage: 20
  batch: {}
  resource_detection:
    detectors: [env, system]
    override: false
  resource:
    attributes:
      - key: x-api-key
        value: ${env:MONOSCOPE_API_KEY}
        action: upsert
      - key: service.name
        value: kafka-broker
        action: insert

exporters:
  otlp_grpc:
    endpoint: "otelcol.monoscope.tech:4317"
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, resource_detection, resource, batch]
      exporters: [otlp_grpc]
    metrics:
      receivers: [kafka_metrics, prometheus, otlp]
      processors: [memory_limiter, resource_detection, resource, batch]
      exporters: [otlp_grpc]
    logs:
      receivers: [file_log, otlp]
      processors: [memory_limiter, resource_detection, resource, batch]
      exporters: [otlp_grpc]
```

Set `MONOSCOPE_API_KEY` in the environment of the collector. Collector releases before 0.140 use the old component names: `kafkametrics`, `filelog`, `resourcedetection` and `otlp`.

### 3. Expose Broker JMX Metrics

The collector has no JMX receiver. Use the [Prometheus JMX exporter](https://github.com/prometheus/jmx_exporter){target="_blank" rel="noopener noreferrer"} as a Java agent on each broker. The collector then scrapes it on port 7071.

1. Download `jmx_prometheus_javaagent.jar` from the JMX exporter releases page.
2. Download the Kafka rules file `kafka-2_0_0.yml` from the `examples` folder of the same repository.
3. Add the agent to the broker JVM options, then restart the broker:

```sh
KAFKA_OPTS="-javaagent:/opt/jmx_exporter/jmx_prometheus_javaagent.jar=7071:/opt/jmx_exporter/kafka-2_0_0.yml"
```

4. Make sure that `curl http://kafka:7071/metrics` returns metrics.

## Monitoring Kafka Connect

To monitor Kafka Connect infrastructure without code changes:

1. Add a Kafka Connect metrics receiver to your collector configuration:

```yaml
receivers:
  # ... other receivers
  
  # Kafka Connect metrics
  prometheus:
    config:
      scrape_configs:
        - job_name: 'kafka-connect'
          scrape_interval: 10s
          static_configs:
            - targets: ['kafka-connect:8083']
          metrics_path: '/metrics'
```

2. Enable the Prometheus metrics in Kafka Connect by adding these properties to your Kafka Connect worker configuration:

```properties
# Kafka Connect configuration
metric.reporters=org.apache.kafka.common.metrics.JmxReporter
```

## Monitoring Kafka Streams Applications

For Kafka Streams applications, add the following to your collector configuration:

```yaml
receivers:
  # ... other receivers
  
  # Kafka Streams application metrics
  prometheus:
    config:
      scrape_configs:
        - job_name: 'kafka-streams'
          scrape_interval: 10s
          static_configs:
            - targets: ['kafka-streams-app:8080']
          metrics_path: '/actuator/prometheus'  # For Spring Boot applications
```

## Monitoring Schema Registry

For Confluent Schema Registry monitoring:

```yaml
receivers:
  # ... other receivers
  
  # Schema Registry metrics
  prometheus:
    config:
      scrape_configs:
        - job_name: 'schema-registry'
          scrape_interval: 10s
          static_configs:
            - targets: ['schema-registry:8081']
          metrics_path: '/metrics'
```

## Monitoring Kafka Client Applications without Code Changes

For monitoring Kafka producers and consumers without modifying application code, you can use the OpenTelemetry Collector with the appropriate interceptors:

1. Enable JVM metrics in your application's JVM options:

```bash
-javaagent:/path/to/jmx_prometheus_javaagent.jar=8080:/path/to/kafka_client_config.yaml
```

2. Add a Prometheus scraper to your collector config:

```yaml
receivers:
  # ... other receivers
  
  # Kafka client application metrics
  prometheus:
    config:
      scrape_configs:
        - job_name: 'kafka-clients'
          scrape_interval: 10s
          static_configs:
            - targets: ['kafka-producer:8080', 'kafka-consumer:8080']
```

## Verifying the Setup

After setting up the OpenTelemetry Collector with your Kafka infrastructure:

1. Check that the collector is running and able to connect to Kafka:
   ```bash
   docker logs otel-collector
   # or
   kubectl logs -l app=otel-collector
   ```

2. Verify that metrics are being collected by checking the metrics endpoint:
   ```bash
   curl http://localhost:8888/metrics
   ```

3. View your monoscope dashboard to see Kafka metrics and logs, including:
   - Broker metrics (message rates, bytes in/out, partition counts)
   - Consumer lag metrics
   - Replication status
   - Error rates and types

## Key Kafka Metrics to Monitor

The OpenTelemetry Collector will capture these important Kafka metrics:

- **Broker Metrics**: CPU usage, memory usage, request rate, network throughput
- **Topic Metrics**: Messages in rate, bytes in/out rate, failed produce/fetch requests
- **Consumer Metrics**: Consumer lag, offset commit rate, join/leave rate
- **Producer Metrics**: Record send rate, error rate, batch size
- **Zookeeper Metrics**: Outstanding requests, watch count, latency

## Next Steps

- Configure alerts in monoscope based on Kafka performance thresholds
- Create custom dashboards for monitoring your Kafka cluster health
- Correlate Kafka performance issues with application API performance
- Set up monitoring for additional Kafka ecosystem components