---
title: Integrating monoscope with PostgreSQL
ogTitle: How to Monitor PostgreSQL Database Operations with monoscope using OpenTelemetry Collector
faLogo: database
date: 2024-06-14
updatedDate: 2024-06-14
linkTitle: "PostgreSQL"
menuWeight: 10
---

# Integrating monoscope with PostgreSQL

This guide demonstrates how to integrate monoscope with PostgreSQL databases using the OpenTelemetry Collector for infrastructure-level monitoring without requiring code changes to your applications.

```=html
<hr>
```

## Prerequisites

- PostgreSQL database server
- OpenTelemetry Collector
- monoscope account with an API key

## Monitoring PostgreSQL with OpenTelemetry Collector

### 1. Deploy the OpenTelemetry Collector

The OpenTelemetry Collector can be deployed as a sidecar container, a standalone service, or directly on the host machine running PostgreSQL.

#### Using Docker

```yaml
version: '3'
services:
  postgres:
    image: postgres:latest
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    environment:
      - APITOOLKIT_API_KEY=YOUR_API_KEY
    depends_on:
      - postgres

volumes:
  postgres-data:
```

### 2. Configure the OpenTelemetry Collector for PostgreSQL

Create an `otel-collector-config.yaml` file with the following configuration:

```yaml
receivers:
  # PostgreSQL metrics receiver
  postgresql:
    endpoint: postgres:5432
    transport: tcp
    username: postgres
    password: postgres
    databases: [mydatabase]
    collection_interval: 10s
    tls:
      insecure: true
    
  # For logs if enabled in PostgreSQL
  filelog:
    include:
      - /var/log/postgresql/*.log
    operators:
      - type: regex_parser
        regex: '^(?P<time>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}.\d{3} \w+) \[(?P<pid>\d+)\] (?P<user>\w+)@(?P<database>\w+) (?P<level>\w+): (?P<message>.*)$'
        timestamp:
          parse_from: time
          layout: '%Y-%m-%d %H:%M:%S.%L %z'
        severity:
          parse_from: level
          mapping:
            error: ERROR
            warning: WARN
            info: INFO
            debug: DEBUG

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
      - key: db.system
        value: postgresql
        action: upsert
      - key: service.name
        value: postgresql-database
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
      receivers: [postgresql, otlp]
      processors: [memory_limiter, batch, resourcedetection, resource]
      exporters: [otlp]
    logs:
      receivers: [filelog, otlp]
      processors: [memory_limiter, batch, resourcedetection, resource]
      exporters: [otlp]
```

### 3. Enable PostgreSQL Monitoring Features

To get the most comprehensive monitoring data, configure your PostgreSQL server with these settings in `postgresql.conf`:

```
# Enable statistics collection
track_activities = on
track_counts = on
track_io_timing = on
track_functions = all

# Enable query statistics collection
shared_preload_libraries = 'pg_stat_statements'
pg_stat_statements.track = all
pg_stat_statements.max = 10000

# Log settings (adjust based on your needs)
log_destination = 'stderr'
logging_collector = on
log_directory = 'log'
log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
log_min_duration_statement = 5000  # Log queries taking > 5s
```

After changing these settings, restart PostgreSQL:

```bash
sudo systemctl restart postgresql
```

Then enable the pg_stat_statements extension:

```sql
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
```

## PostgreSQL Exporter (Alternative Approach)

If you prefer using Prometheus and its ecosystem, you can use the PostgreSQL Exporter with the OpenTelemetry Collector:

```yaml
version: '3'
services:
  postgres:
    image: postgres:latest
    # ... PostgreSQL configuration ...
      
  postgres-exporter:
    image: prometheuscommunity/postgres-exporter:latest
    environment:
      DATA_SOURCE_NAME: "postgresql://postgres:postgres@postgres:5432/postgres?sslmode=disable"
    ports:
      - "9187:9187"
    depends_on:
      - postgres
  
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    depends_on:
      - postgres-exporter
```

Update the collector config to scrape the PostgreSQL exporter:

```yaml
receivers:
  # ... other receivers ...
  
  prometheus:
    config:
      scrape_configs:
        - job_name: 'postgres'
          scrape_interval: 10s
          static_configs:
            - targets: ['postgres-exporter:9187']
          metric_relabel_configs:
            - source_labels: [__name__]
              regex: 'pg_.*'
              action: keep

# ... rest of the collector config ...

service:
  pipelines:
    metrics:
      receivers: [prometheus, otlp]
      processors: [memory_limiter, batch, resourcedetection, resource]
      exporters: [otlp]
    # ... other pipelines ...
```

## Monitoring PostgreSQL in Kubernetes

If you're running PostgreSQL in Kubernetes, you can deploy the OpenTelemetry Collector as a sidecar or using the Operator:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:latest
        ports:
        - containerPort: 5432
        env:
        - name: POSTGRES_USER
          value: "postgres"
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secrets
              key: password
        volumeMounts:
        - name: postgres-data
          mountPath: /var/lib/postgresql/data
      
      - name: otel-collector
        image: otel/opentelemetry-collector-contrib:latest
        args:
        - "--config=/etc/otel-collector-config.yaml"
        volumeMounts:
        - name: otel-collector-config
          mountPath: /etc/otel-collector-config.yaml
          subPath: otel-collector-config.yaml
        env:
        - name: APITOOLKIT_API_KEY
          valueFrom:
            secretKeyRef:
              name: monoscope-secrets
              key: api-key
      
      volumes:
      - name: postgres-data
        persistentVolumeClaim:
          claimName: postgres-pvc
      - name: otel-collector-config
        configMap:
          name: otel-collector-config
```

## Monitoring Specific SQL Queries

For monitoring specific SQL queries without code changes, you can use the PostgreSQL audit extension:

1. Install the `pgaudit` extension:

```
shared_preload_libraries = 'pg_stat_statements,pgaudit'
pgaudit.log = 'all'
```

2. Update the collector's filelog receiver to parse audit logs:

```yaml
filelog:
  include:
    - /var/log/postgresql/*.log
  operators:
    - type: regex_parser
      regex: '.*AUDIT: SESSION,.*statement: (?P<statement>.*)'
      parse_to: attributes.statement
```

## Verifying the Setup

After setting up the OpenTelemetry Collector with PostgreSQL:

1. Run some test queries against your PostgreSQL database

2. Check the collector logs to ensure it's receiving PostgreSQL metrics:
   ```bash
   docker logs otel-collector
   ```

3. View your monoscope dashboard to see PostgreSQL metrics, including:
   - Query execution time
   - Connection counts
   - Transaction rates
   - Lock statistics
   - Buffer usage

## Key PostgreSQL Metrics to Monitor

The OpenTelemetry Collector will capture these important PostgreSQL metrics:

- **Connection metrics**: Total connections, active connections, idle connections
- **Transaction metrics**: Commits, rollbacks, deadlocks
- **Query metrics**: Query execution time, rows returned/affected
- **Database size**: Total size, index size, table size
- **Cache efficiency**: Cache hit ratio, buffer usage
- **Lock metrics**: Waiting transactions, lock types
- **Background writer**: Pages written, clean scan stops

## Next Steps

- Configure alerting in monoscope for critical PostgreSQL metrics
- Create custom dashboards for database performance monitoring
- Correlate database operations with API endpoints to identify bottlenecks
- Set up collection of additional PostgreSQL-specific metrics