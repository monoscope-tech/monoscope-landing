---
title: Integrating monoscope with Kafka
ogTitle: How to Monitor Kafka Producers and Consumers with monoscope using OpenTelemetry Collector
faLogo: message-lines
date: 2024-06-14
updatedDate: 2024-06-14
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
- OpenTelemetry Collector
- monoscope account with an API key

## Monitoring Kafka with OpenTelemetry Collector

### 1. Deploying the OpenTelemetry Collector for Kafka

The OpenTelemetry Collector can be deployed alongside your Kafka cluster to collect metrics, logs, and traces without modifying your application code.

#### Option 1: Using Docker

```yaml
version: '3'
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
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    environment:
      - APITOOLKIT_API_KEY=YOUR_API_KEY
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
        image: otel/opentelemetry-collector-contrib:latest
        args:
        - "--config=/conf/otel-collector-config.yaml"
        volumeMounts:
        - name: otel-collector-config
          mountPath: /conf
        env:
        - name: APITOOLKIT_API_KEY
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
  # Kafka metrics receiver
  kafkametrics:
    brokers: kafka:9092
    protocol_version: 2.0.0
    collection_interval: 10s
    scrape_topics: true
    topic_match: ".*"
    scrape_consumer_groups: true
    client_id: otel-collector
    group_match: ".*"
  
  # JMX metrics for Kafka brokers
  jmx:
    endpoint: kafka:1099
    collection_interval: 10s
    service_url: "service:jmx:rmi:///jndi/rmi://kafka:1099/jmxrmi"
    target_system: jvm,kafka
    groovy_script: |
      # Various JMX metric collection rules
      kafka_metrics = [
        'kafka.server:type=BrokerTopicMetrics,name=MessagesInPerSec,topic=*:OneMinuteRate',
        'kafka.server:type=BrokerTopicMetrics,name=BytesOutPerSec,topic=*:OneMinuteRate',
        'kafka.server:type=BrokerTopicMetrics,name=BytesInPerSec,topic=*:OneMinuteRate',
        'kafka.server:type=ReplicaManager,name=UnderReplicatedPartitions:Value',
        'kafka.controller:type=KafkaController,name=ActiveControllerCount:Value',
        'kafka.controller:type=KafkaController,name=OfflinePartitionsCount:Value',
        'kafka.server:type=ReplicaManager,name=PartitionCount:Value'
      ]
      kafka_metrics.each { metric ->
        def mbean = jmx.getMBean(metric.tokenize(':')[0])
        def attr = metric.tokenize(':')[1]
        def value = mbean ? mbean.getAttribute(attr) : null
        if (value != null) {
          record.gauge(metric, value)
        }
      }
  
  # File log receiver for Kafka server logs
  filelog:
    include:
      - /var/log/kafka/server.log
      - /var/log/kafka/kafka-request.log
    start_at: beginning
    include_file_path: true
    operators:
      - type: regex_parser
        regex: '^(?P<time>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2},\d{3}) (?P<level>\w+) (?P<message>.*)'
        timestamp:
          parse_from: time
          layout: '%Y-%m-%d %H:%M:%S,%L'
        severity:
          parse_from: level
  
  # OTLP receiver for any instrumented clients
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
    detectors: [env, system]
    override: false
  resource:
    attributes:
      - key: at-project-key
        value: ${env:APITOOLKIT_API_KEY}
        action: upsert
      - key: service.name
        value: kafka-broker
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
      receivers: [kafkametrics, jmx, otlp]
      processors: [memory_limiter, batch, resourcedetection, resource]
      exporters: [otlp]
    logs:
      receivers: [filelog, otlp]
      processors: [memory_limiter, batch, resourcedetection, resource]
      exporters: [otlp]
```

Replace `YOUR_API_KEY` with your actual monoscope project key.

### 3. Configuring Kafka for JMX Monitoring

To enable JMX monitoring in Kafka, update your Kafka broker configuration:

```properties
# Add to your kafka server.properties or as environment variables in Docker/Kubernetes
KAFKA_JMX_PORT=1099
KAFKA_JMX_HOSTNAME=kafka
KAFKA_JMX_OPTS="-Djava.rmi.server.hostname=kafka -Dcom.sun.management.jmxremote -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.port=1099 -Dcom.sun.management.jmxremote.rmi.port=1099"
```

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