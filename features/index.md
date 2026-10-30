---
# NOTE: order follows the homepage (Know → Fix → Prove), not the brief's tagline order (Know / Prove / Fix).
title: "Product: an AI SRE on observability that keeps the request"
description: "monoscope keeps every API request and response next to your logs, traces and metrics, and its AI SRE reads that record to investigate and open the fix."
eyebrow: Product
tone: brand
h1: "The AI SRE that keeps its own evidence"
pitch: "monoscope keeps every API request and response, yours and your suppliers', next to your logs, traces and metrics. Its AI reads that record to investigate, answer in Slack and open the fix."
hero_demo: /assets/demos/fix-b.html
hero_frame: "Slack · app.monoscope.tech / ai / routines"
art: page-product.webp
sections:
  - id: error-tracking
    icon: bug
    tone: warning
    eyebrow: "Know · Error tracking"
    title: "Every error, with the request that caused it"
    lead: "Exceptions, crashes and new log patterns become issues, each with the headers, body and response exactly as they were. Alerts reach Slack, PagerDuty or email before a customer writes in."
    shot: issues
    frame: "app.monoscope.tech / issues"
    link: /features/error-tracking/
    link_label: "Error tracking"
  - id: api-monitoring
    icon: plug
    tone: brand
    eyebrow: "Know · API monitoring"
    title: "Breaking changes in the APIs you serve and the ones you call"
    lead: "Every call in and out, with bodies. When a supplier drops a field and still returns 200 OK, you get an issue with the requests that show it."
    shot: api-catalog
    frame: "app.monoscope.tech / api_catalog"
    link: /features/api-monitoring/
    link_label: "API monitoring"
  - id: dashboards
    icon: bar-chart
    tone: success
    eyebrow: "Know · Metrics & dashboards"
    title: "Dashboards and alerts on any query"
    lead: "Chart latency, traffic and errors from logs, traces and metrics, keep dashboards as code in your repository, and click from a spike to the requests behind it."
    shot: dashboard-overview
    frame: "app.monoscope.tech / dashboards"
    link: /features/dashboards/
    link_label: "Metrics & dashboards"
  - id: ai-sre
    icon: zap
    tone: success
    eyebrow: "Fix · AI SRE"
    title: "An AI SRE that reads the actual request"
    lead: "Routines check production on a schedule and post what they find. It answers questions in Slack, comments on pull requests with what production traffic says, and opens the fix, all from the unsampled request, not a sampled span."
    shot: routines
    frame: "app.monoscope.tech / ai / routines"
    link: /features/ai-sre/
    link_label: "AI SRE"
  - id: logs-and-traces
    icon: align-left
    tone: brand
    eyebrow: "Prove · Logs & traces"
    title: "Every log, span and request, with its body"
    lead: "Search logs, traces and API calls in one explorer. Open any request to see what was sent and what came back, then the trace and the logs around it."
    shot: log-explorer-request
    frame: "app.monoscope.tech / log_explorer"
    link: /features/logs-and-traces/
    link_label: "Logs & traces"
  - id: session-replay
    icon: circle-play
    tone: violet
    eyebrow: "Prove · Session replay"
    title: "The customer's screen, and the request behind it"
    lead: "Replay the session at the moment it broke, with the error toast and the console, then jump to the backend request it fired."
    shot: session-replay
    frame: "app.monoscope.tech / session replay"
    link: /features/session-replay/
    link_label: "Session replay"
  - id: byob-s3
    icon: database
    tone: success
    eyebrow: "Prove · Your own bucket"
    title: "Your S3 bucket is the database"
    lead: "Add your own bucket ($199/month) and every request, log, span, metric and replay is written there as open Delta Lake and Parquet. Unlimited retention, queryable from monoscope, DuckDB or any Postgres client."
    code_label: "duckdb · your data, from your bucket"
    code_class: language-sql
    code: |
      INSTALL delta; LOAD delta;
      SELECT count(*)
      FROM delta_scan('s3://your-bucket/timefusion/otel_logs_and_spans')
      WHERE project_id = 'your-project' AND date = DATE '2026-10-28';
    link: /features/byob-s3/
    link_label: "Your own S3 bucket"
faqs:
  - q: "Is monoscope an AI SRE or an observability tool?"
    a: "Both, in one product. The observability side keeps the requests, logs, traces and metrics; the AI works from that record. There's no second vendor underneath deciding what it can see."
  - q: "How much does it cost?"
    a: "Free up to 10k events a day. Cloud is $29 a month for 20M events, then $1 per million. Request bodies don't add to the price."
  - q: "Where is my data stored?"
    a: "On monoscope Cloud in the US or the EU, in your own S3 bucket, or on your own servers with the open-source edition (AGPL 3.0)."
  - q: "Are you SOC 2 certified?"
    a: "Not yet. We sign DPAs, host in the EU, redact in the SDK before data leaves your app, and the code that handles your data is open source."
  - q: "Do I need to replace my current tools first?"
    a: "No. Point an OpenTelemetry exporter at monoscope, run it next to Datadog or Sentry for a week or two, and compare what each one catches."
---
