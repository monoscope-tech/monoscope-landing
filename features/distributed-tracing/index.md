---
# Verified: trace views Waterfall / Timeline / Services / Map, Trace Breakdown, logs joined by trace and
# span ID (docs/dashboard/dashboard-pages/traces, demo project trace shot), service map (demo project),
# Trace correlation audit and Dependency degradation digest routines (Issues.routineTemplates),
# 48-hour share links (copied from logs-and-traces; not re-checked).
title: "Distributed tracing with the request and response on every span"
description: "Distributed tracing on OpenTelemetry: follow one request through every service, with its logs, queries, supplier calls and request and response bodies."
eyebrow: Distributed tracing
tone: brand
h1: "Distributed tracing that keeps the request body"
pitch: "Follow one request through every service in a waterfall, with its logs, queries and outgoing calls. The bodies stay on the trace, so the AI SRE reads what was sent, not a span name."
playground: log_explorer
hero_shot: trace
hero_frame: "app.monoscope.tech / log_explorer · trace"
art: page-distributed-tracing.webp
sections:
  - id: waterfall
    icon: activity
    tone: brand
    eyebrow: "One request, every service"
    title: "See where the 9 seconds went"
    lead: "Open any log line or request and click View trace. The header shows the span count, the spans with errors and the total duration; Trace Breakdown shows each service's share of the time."
    bullets:
      - title: "Four views of the same spans"
        icon: layout
        body: "Waterfall, a flame-graph timeline, a per-service list and a map of the calls between services."
      - title: "Logs next to their span"
        icon: align-left
        body: "Logs that carry the trace context sit beside the span that wrote them, in order."
      - title: "From an issue, too"
        icon: bug
        body: "Every issue shows the trace of the event you're looking at, so the error and its path are on one screen."
    link: /docs/dashboard/dashboard-pages/traces/
    link_label: "How to read a trace"
  - id: bodies
    icon: align-left
    tone: brand
    eyebrow: "The payload"
    title: "The span says 502. The body says why."
    lead: "With our SDKs, the spans for incoming requests and outgoing calls carry their headers, request body and response body. The supplier that answered 200 with an empty tracking_id shows up in the trace, with the response it sent."
    shot: log-explorer-request
    frame: "app.monoscope.tech / log_explorer"
    bullets:
      - title: "Incoming and outgoing"
        icon: plug
        body: "Your own endpoints and the payment, shipping and KYC APIs you call, on the same trace."
      - title: "Kept on Cloud"
        icon: database
        body: "Every span you send is kept for 30 days. The trace you need from last Tuesday is still complete."
      - title: "Redacted before it leaves"
        icon: eye
        body: "Headers and JSON paths you list, such as $.card.number, are removed inside your app."
    link: /features/api-monitoring/
    link_label: "Monitor the APIs you call"
  - id: map
    icon: compass
    tone: success
    eyebrow: "Service map"
    title: "Which service calls which, and which one is failing"
    lead: "monoscope draws the map from your spans: every service, database, queue and third-party API, with request rate, error rate and latency on each node. A dependency group with errors is marked."
    shot: service-map
    frame: "app.monoscope.tech / service_map"
    bullets:
      - title: "Built from traffic"
        icon: grid
        body: "No service catalog to maintain. A new service appears the first time it sends a span."
      - title: "Dependencies that degrade"
        icon: radio
        body: "The Dependency degradation digest routine names downstream calls that got slower or started failing, and who calls them."
      - title: "Broken context, found"
        icon: link
        body: "The Trace correlation audit routine finds services whose logs and spans can't be joined."
    link: /features/ai-sre/
    link_label: "What routines check"
  - id: send
    icon: plug
    tone: success
    eyebrow: "OpenTelemetry"
    title: "Send traces from any OpenTelemetry SDK"
    lead: "Set the OTLP endpoint and your API key, and spans arrive. Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir add request and response bodies on top."
    code_label: "Environment · any OpenTelemetry SDK"
    code_class: language-bash
    code: |
      OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
      OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
      OTEL_SERVICE_NAME="checkout"
      OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
    link: /features/opentelemetry/
    link_label: "monoscope as your OpenTelemetry backend"
faqs:
  - q: "Are traces sampled?"
    a: "Not on Cloud. Every span you send is kept for 30 days. The free plan covers 10k events a day."
  - q: "How are traces priced?"
    a: "Each span is one event. Free for 10k events a day; Cloud is $29 a month for 20M events, then $1 per million. Bodies don't add to the count."
  - q: "Do I have to replace my tracing setup?"
    a: "No. If you already export OpenTelemetry, add monoscope as an exporter in your collector and run it beside your current tool."
  - q: "Can I find a trace by ID?"
    a: "Yes. Filter the Explorer on context.trace_id, or open the trace from any log line or issue."
  - q: "Can I share a trace with someone outside the team?"
    a: "Yes. A read-only link to the request opens for anyone for 48 hours, no account needed."
related: [apm, opentelemetry, logs-and-traces]
---
