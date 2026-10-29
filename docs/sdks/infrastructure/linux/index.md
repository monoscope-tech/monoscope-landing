---
title: Integrating monoscope on Linux
ogTitle: How to Integrate monoscope on Linux Systems using OpenTelemetry Collector
faLogo: linux
date: 2024-06-14
updatedDate: 2024-06-14
linkTitle: "Linux"
menuWeight: 30
---

# Integrating monoscope on Linux

This guide covers how to integrate monoscope with applications running on Linux systems using the OpenTelemetry Collector for infrastructure-level monitoring without requiring code changes.

```=html
<hr>
```

## Prerequisites

- Linux server (Ubuntu, Debian, CentOS, etc.)
- Root or sudo access
- A monoscope project and its API key. If you do not have them yet, follow [Get started](/docs/onboarding/#get-your-api-key).

## Installing the OpenTelemetry Collector

The recommended approach for monitoring Linux-based applications is to deploy the OpenTelemetry Collector as a standalone service.

### Option 1: Using Prebuilt Binaries

1. Download the OpenTelemetry Collector Contrib package (which includes additional receivers and processors):

```bash
# Check the releases page for the latest version and your CPU architecture.
OTELCOL_VERSION=0.163.2
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v${OTELCOL_VERSION}/otelcol-contrib_${OTELCOL_VERSION}_linux_amd64.tar.gz
tar -xzf otelcol-contrib_${OTELCOL_VERSION}_linux_amd64.tar.gz
sudo mv otelcol-contrib /usr/local/bin/
```

2. Create a configuration file at `/etc/otel-collector-config.yaml`:

```yaml
receivers:
  # Collect Linux system metrics
  host_metrics:
    collection_interval: 30s
    scrapers:
      cpu:
      disk:
      filesystem:
      load:
      memory:
      network:
      paging:
      process:
        include:
          match_type: strict
          names:
            - httpd
            - nginx
            - node
            - python
            - java
  
  # Collect Linux logs
  file_log:
    include:
      - /var/log/nginx/*.log
      - /var/log/apache2/*.log
      - /var/log/syslog
      - /var/log/messages
    start_at: beginning
    include_file_path: true
    # Merge indented continuation lines (stack traces, multi-line errors)
    # into the preceding entry. ^\S = "first character is non-whitespace
    # = new entry"; whitespace-prefixed lines are continuations. Tighten
    # to a per-source regex if your apps log indented content legitimately.
    multiline:
      line_start_pattern: '^\S'
    operators:
      # Parses Nginx error log lines. Lines in other formats pass through unparsed.
      - type: regex_parser
        on_error: send_quiet
        regex: '^(?P<time>\d{4}/\d{2}/\d{2} \d{2}:\d{2}:\d{2}) \[(?P<level>\w+)\] (?P<message>.*)$'
        timestamp:
          parse_from: time
          layout: {% raw %}'%Y/%m/%d %H:%M:%S'{% endraw %}
        severity:
          parse_from: level
  
  # Collect from TCP/HTTP endpoints
  tcplog:
    listen_address: "0.0.0.0:54525"
    operators:
      - type: json_parser
  
  # OTLP receiver for any instrumented services
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
    limit_mib: 1000
    spike_limit_mib: 200
  resource_detection:
    detectors: [env, system]
    override: false
  resource:
    attributes:
      - key: x-api-key
        value: YOUR_API_KEY
        action: upsert
      - key: service.name
        value: linux-server
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
      receivers: [host_metrics, otlp]
      processors: [memory_limiter, batch, resource_detection, resource]
      exporters: [otlp_grpc]
    logs:
      receivers: [file_log, tcplog, otlp]
      processors: [memory_limiter, batch, resource_detection, resource]
      exporters: [otlp_grpc]
```

Replace `YOUR_API_KEY` with your actual monoscope project key.

3. Create a systemd service for the collector:

```bash
sudo tee /etc/systemd/system/otel-collector.service > /dev/null << 'EOF'
[Unit]
Description=OpenTelemetry Collector
After=network.target

[Service]
ExecStart=/usr/local/bin/otelcol-contrib --config=/etc/otel-collector-config.yaml
Restart=always
User=root
Group=root

[Install]
WantedBy=multi-user.target
EOF
```

4. Start and enable the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable otel-collector
sudo systemctl start otel-collector
```

### Option 2: Using Docker

If you prefer using Docker:

1. Create a directory for your collector configuration:

```bash
mkdir -p ~/otel-collector
cd ~/otel-collector
```

2. Create the `otel-collector-config.yaml` file with the configuration above. Add `root_path: /hostfs` under `host_metrics` so the collector reads the host's metrics, not the container's.

3. Create a `docker-compose.yml` file:

```yaml
services:
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otel-collector-config.yaml"]
    user: "0"  # needed to read host log files
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
      - /var/log:/var/log:ro
      - /:/hostfs:ro  # host filesystem for host_metrics
    ports:
      - "4317:4317"   # OTLP gRPC
      - "4318:4318"   # OTLP HTTP
      - "54525:54525" # TCP logs
    restart: unless-stopped
```

4. Start the collector:

```bash
docker compose up -d
```

## Monitoring Web Servers

### Nginx Monitoring

To monitor Nginx without code changes:

1. Configure Nginx to output access logs in JSON format by editing `/etc/nginx/nginx.conf`:

```
http {
    # ... other config
    
    log_format json_combined escape=json
        '{'
        '"time":"$time_iso8601",'
        '"remote_addr":"$remote_addr",'
        '"remote_user":"$remote_user",'
        '"request":"$request",'
        '"status":$status,'
        '"body_bytes_sent":$body_bytes_sent,'
        '"request_time":$request_time,'
        '"http_referrer":"$http_referer",'
        '"http_user_agent":"$http_user_agent"'
        '}';
    
    access_log /var/log/nginx/access.log json_combined;
    
    # ... other config
}
```

2. Add a receiver for the access log to your OpenTelemetry configuration. Remove `/var/log/nginx/*.log` from the first `file_log` receiver, and add `file_log/nginx` to the `logs` pipeline:

```yaml
receivers:
  file_log/nginx:
    include:
      - /var/log/nginx/access.log
    include_file_path: true
    operators:
      - type: json_parser
        timestamp:
          parse_from: attributes.time
          layout_type: gotime
          layout: '2006-01-02T15:04:05Z07:00'
      # Split "GET /users/1 HTTP/1.1" into method and path.
      - type: regex_parser
        parse_from: attributes.request
        regex: '^(?P<method>\S+) (?P<path>\S+)'
      - type: move
        from: attributes.method
        to: attributes["http.request.method"]
      - type: move
        from: attributes.path
        to: attributes["url.path"]
      - type: move
        from: attributes.status
        to: attributes["http.response.status_code"]
```

3. Restart Nginx and the OpenTelemetry Collector:

```bash
sudo systemctl restart nginx
sudo systemctl restart otel-collector
```

### Apache Monitoring

To monitor Apache without code changes:

1. Configure Apache to write JSON access logs. Add these lines to `/etc/apache2/apache2.conf`:

{% raw %}
```
LogFormat "{ \"time\":\"%{%Y-%m-%dT%H:%M:%S%z}t\", \"client\":\"%a\", \"request\":\"%r\", \"status\":%>s, \"bytes\":%B, \"duration\":%D, \"referer\":\"%{Referer}i\", \"user_agent\":\"%{User-agent}i\" }" json_combined
CustomLog ${APACHE_LOG_DIR}/access.log json_combined
```
{% endraw %}

2. Add a `file_log/apache` receiver like the Nginx one, with `/var/log/apache2/access.log` in `include`. Apache's `%z` writes offsets as `+0000`, so use the layout `'2006-01-02T15:04:05-0700'`.

3. Restart Apache and the OpenTelemetry Collector:

```bash
sudo systemctl restart apache2
sudo systemctl restart otel-collector
```

## Monitoring Databases on Linux

To monitor databases running on your Linux server without code changes:

1. Add specific database receivers to your OpenTelemetry Collector configuration:

```yaml
receivers:
  # ... other receivers
  
  # PostgreSQL monitoring
  postgresql:
    endpoint: localhost:5432
    transport: tcp
    username: postgres
    password: ${env:POSTGRES_PASSWORD}
    databases: [postgres]
    collection_interval: 30s
    tls:
      insecure: true  # remove if your server requires TLS
  
  # MySQL monitoring
  mysql:
    endpoint: localhost:3306
    username: root
    password: ${env:MYSQL_PASSWORD}
    collection_interval: 30s
```

Then add `postgresql` and `mysql` to the `receivers` list of the `metrics` pipeline.

2. Add an environment variable for the database password:

```bash
sudo mkdir -p /etc/systemd/system/otel-collector.service.d
sudo tee /etc/systemd/system/otel-collector.service.d/override.conf > /dev/null << 'EOF'
[Service]
Environment="POSTGRES_PASSWORD=your-postgres-password"
Environment="MYSQL_PASSWORD=your-mysql-password"
EOF
```

3. Reload and restart the collector:

```bash
sudo systemctl daemon-reload
sudo systemctl restart otel-collector
```

## Monitoring API Traffic with tcpdump and the Collector

For advanced monitoring of API traffic without code changes:

1. Install tcpdump:

```bash
sudo apt-get update && sudo apt-get install -y tcpdump
```

2. Create a script to capture HTTP traffic and forward it to the collector:

```bash
#!/bin/bash
# /usr/local/bin/api-capture.sh

# Capture plain-HTTP traffic on port 80 and send it to the collector.
# HTTPS traffic on port 443 is encrypted, so tcpdump cannot read it.
tcpdump -i any -A -nn -s0 'tcp port 80' 2>/dev/null | \
while read line; do
  if [[ $line == *"HTTP"* ]]; then
    timestamp=$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")
    # Construct a JSON object with the timestamp and HTTP data
    echo "{ \"timestamp\":\"$timestamp\", \"http_data\":\"$line\" }" | \
    nc -w1 localhost 54525
  fi
done
```

3. Make the script executable and set it up as a service:

```bash
chmod +x /usr/local/bin/api-capture.sh

sudo tee /etc/systemd/system/api-capture.service > /dev/null << 'EOF'
[Unit]
Description=API Traffic Capture
After=network.target

[Service]
ExecStart=/usr/local/bin/api-capture.sh
Restart=always
User=root
Group=root

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable api-capture
sudo systemctl start api-capture
```

## Verifying the Setup

After setting up the OpenTelemetry Collector:

1. Check the collector status:
   ```bash
   sudo systemctl status otel-collector
   ```

2. View collector logs:
   ```bash
   sudo journalctl -u otel-collector
   ```

3. Verify in your monoscope dashboard that telemetry data is being received

## Next Steps

- Configure alerts in monoscope based on system metrics and API performance
- Set up custom dashboards for correlating system metrics with API performance
- Deploy the collector to multiple servers for cluster-wide monitoring
- Use the insights from monoscope to optimize your server and API performance