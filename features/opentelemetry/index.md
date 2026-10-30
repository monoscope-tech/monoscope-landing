---
# UNVERIFIED:
# - Collector exporter config mirrors docs/sdks/infrastructure (otlp_grpc, tls insecure); not run end to end.
# - "four environment variables" counts docs/sdks/opentelemetry, not tested against every SDK.
# Verified: OTLP gRPC trace/log/metric export services (src/Opentelemetry/OtlpServer.hs), x-api-key as
# resource attribute or header (OtlpServer.hs, docs/sdks/opentelemetry), otelcol.monoscope.tech:4317/4318
# (docs), Prometheus scrape targets (Models/Apis/PrometheusScrapeConfigs.hs), OpenTelemetry Collector
# dashboard template (static/public/dashboards/opentelemetry-collector.yaml), routine templates
# Telemetry gap detector / Trace correlation audit / Telemetry quality check (Issues.routineTemplates).
# Not claimed: "780+ integrations".
title: "OpenTelemetry backend for logs, traces and metrics"
description: "An OpenTelemetry backend: point any OTel SDK or collector at monoscope and search logs, traces and metrics together. No proprietary agent. Open source."
eyebrow: OpenTelemetry
tone: brand
h1: "The OpenTelemetry backend that keeps the request"
pitch: "Point any OpenTelemetry SDK or collector at monoscope and your logs, traces and metrics land in one place, no proprietary agent. Add our SDK and the AI SRE also reads each request and response body."
playground: log_explorer
hero_shot: log-explorer
hero_frame: "app.monoscope.tech / log_explorer"
art: page-opentelemetry.webp
sections:
  - id: collector
    icon: plug
    tone: brand
    eyebrow: "OpenTelemetry collector"
    title: "One exporter change, no new agent"
    lead: "monoscope receives OTLP over gRPC on port 4317 and HTTP on 4318. Keep the collector, receivers and processors you run today, add an exporter and your API key, and data starts arriving."
    shot: otel-setup
    code_label: "otel-collector.yaml · add monoscope as an exporter"
    code_class: language-yaml
    code: |
      processors:
        resource:
          attributes:
            - { key: x-api-key, value: ${env:MONOSCOPE_API_KEY}, action: upsert }

      exporters:
        otlp_grpc:
          endpoint: "otelcol.monoscope.tech:4317"
          tls: { insecure: true }

      service:
        pipelines:
          traces:  { receivers: [otlp], processors: [resource], exporters: [otlp_grpc] }
          logs:    { receivers: [otlp, filelog], processors: [resource], exporters: [otlp_grpc] }
          metrics: { receivers: [otlp], processors: [resource], exporters: [otlp_grpc] }
    bullets:
      - title: "Any language"
        icon: code
        body: "Rust, Ruby, Scala, C++, Swift: any OpenTelemetry SDK exports straight to monoscope with four environment variables."
      - title: "Keep your pipeline"
        icon: server
        body: "Fan out from the same collector to monoscope and your current vendor while you compare them."
      - title: "Prometheus too"
        icon: bar-chart
        body: "Send Prometheus metrics through the collector, or have monoscope scrape your endpoints."
    link: /docs/sdks/opentelemetry/
    link_label: "OpenTelemetry setup guide"
  - id: one-store
    icon: database
    tone: brand
    eyebrow: "One backend"
    title: "Logs, traces and metrics, queried together"
    lead: "Logs and spans share one table, so a log line sits inside the trace that wrote it. Metrics are queried in the same KQL, and any query becomes a dashboard widget or a monitor."
    shot: trace
    frame: "app.monoscope.tech / log_explorer · trace"
    bullets:
      - title: "Trace waterfall"
        icon: activity
        body: "Every span of a request across services, with its database queries, outgoing calls and logs in order."
      - title: "Service map"
        icon: compass
        body: "Built from your spans: which service calls which, with request rate, errors and latency on each edge."
      - title: "Dashboards to start from"
        icon: layout
        body: "Templates for the OpenTelemetry Collector, Kubernetes, PostgreSQL, Redis, nginx and more."
    link: /features/distributed-tracing/
    link_label: "Distributed tracing"
  - id: bodies
    icon: align-left
    tone: success
    eyebrow: "Beyond the span"
    title: "Our SDKs add the request and response bodies"
    lead: "A plain OpenTelemetry span says POST /v1/payments returned 502. Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir sit on top of OpenTelemetry and add the headers, request body and response body, for incoming calls and the calls you make to suppliers."
    shot: log-explorer-request
    frame: "app.monoscope.tech / log_explorer"
    bullets:
      - title: "Still OpenTelemetry"
        icon: plug
        body: "The SDKs emit standard OTel spans and attributes, so the rest of your instrumentation keeps working."
      - title: "Redacted in your app"
        icon: eye
        body: "List headers and JSON paths such as $.password, and they're removed before anything is sent."
      - title: "What the AI SRE reads"
        icon: zap
        body: "Investigations start from the failing request and response, not a span name and a status code."
    link: /docs/sdks/
    link_label: "Pick an SDK"
  - id: quality
    icon: eye
    tone: success
    eyebrow: "Telemetry quality"
    title: "Routines that check your instrumentation"
    lead: "OpenTelemetry setups drift. Routines run on a schedule and post to Slack when something needs fixing."
    shot: routines
    frame: "app.monoscope.tech / ai / routines"
    bullets:
      - title: "Telemetry gap detector"
        icon: radio
        body: "This routine flags services that were active and stopped sending logs, traces or metrics."
      - title: "Trace correlation audit"
        icon: link
        body: "This routine finds logs and spans that can't be joined because trace context is missing."
      - title: "Telemetry quality check"
        icon: grid
        body: "This routine lists missing or inconsistent service, environment and version attributes, ranked by impact."
    link: /features/ai-sre/
    link_label: "What else routines do"
faqs:
  - q: "Do I need the monoscope SDK?"
    a: "No. Any OpenTelemetry SDK or collector sends logs, traces and metrics. Our SDKs add request and response bodies, with redaction."
  - q: "Which protocols do you accept?"
    a: "OTLP over gRPC (port 4317) and over HTTP (port 4318). Send your API key as the x-api-key resource attribute or header."
  - q: "Can I send to monoscope and my current vendor at once?"
    a: "Yes. Add monoscope as a second exporter in your collector and compare the two for a week or two before you switch."
  - q: "How is it priced?"
    a: "Per event, not per host. Free for 10k events a day; Cloud is $29 a month for 20M events, then $1 per million. Metrics: 20M datapoints included, then $1 per 10M."
  - q: "Can I self-host it?"
    a: "Yes. monoscope is open source under AGPL. Run it on your own servers and point your collectors at it."
related: [log-management, distributed-tracing, apm]
---
