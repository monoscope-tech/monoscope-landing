---
# Verified against ../monoscope master (2026-10-29): OTLP logs ingest, log pattern clustering and
# spike/new-pattern issues (BackgroundJobs: processNewLogPatterns, detectLogPatternSpikes),
# "Noisy log sources" routine template (Issues.routineTemplates), Ask AI + Patterns in the Explorer (demo project).
# Deliberately not claimed: logs written to your own bucket (own-bucket scope is under review),
# "780+ integrations", the free plan's sampling details.
title: "Log management with the request behind every line"
description: "Log management on OpenTelemetry: search logs in plain English or KQL, see the request and trace behind each line, and get an issue when a new pattern appears."
eyebrow: Log management
tone: brand
h1: "Log management with the request behind every line"
pitch: "Collect, search and alert on logs from every service, at $1 per million events. Each line links to the request and trace that wrote it, so the AI SRE reads the payload."
playground: log_explorer
hero_demo: /assets/demos/prove-b.html
hero_shot: log-explorer
hero_frame: "app.monoscope.tech / log_explorer"
art: page-log-management.webp
sections:
  - id: context
    icon: align-left
    tone: brand
    eyebrow: "Context"
    title: "Open the request behind any log line"
    lead: "\"payment failed for order 8812\" tells you something broke. In monoscope the same row opens the request that wrote it: the headers and body your API received, the response it sent and the trace around it."
    shot: log-explorer-request
    frame: "app.monoscope.tech / log_explorer"
    bullets:
      - title: "Logs joined to traces"
        icon: activity
        body: "Logs that carry a trace ID sit inside that trace, next to the span that wrote them and the database and supplier calls around it."
      - title: "Request and response bodies"
        icon: code
        body: "With our SDKs, the incoming request and every outgoing call keep their bodies. Bodies don't add to the price."
      - title: "What the AI SRE reads"
        icon: zap
        body: "When an issue opens, the AI starts from those log lines, that request and that trace, so its write-up cites what happened."
    link: /features/logs-and-traces/
    link_label: "Logs and traces in the Explorer"
  - id: search
    icon: code
    tone: brand
    eyebrow: "Log analysis"
    title: "Ask in plain English, or write the query"
    lead: "Type \"checkout errors since the last deploy\" and monoscope writes the KQL. Read it, change it, save it. Facets on service, level and status code show counts before you click."
    shot: log-explorer
    frame: "app.monoscope.tech / log_explorer"
    bullets:
      - title: "Patterns, not 40,000 lines"
        icon: grid
        body: "Similar lines are grouped into patterns with a count, so the one that's new stands out."
      - title: "Live tail"
        icon: radio
        body: "Stream new logs as they arrive, filtered by the query you're already running."
      - title: "One query everywhere"
        icon: bar-chart
        body: "The same KQL runs in the Explorer, dashboards, monitors, the CLI and the MCP server."
    code_label: "KQL · error logs per service, last hour"
    code_class: nohighlight
    code: |
      spans
      | where level == "ERROR" and timestamp &gt;= ago(1h)
      | summarize count() by resource.service.name
      | sort by count_ desc
    link: /docs/dashboard/dashboard-pages/query-language/
    link_label: "Query language reference"
  - id: monitoring
    icon: eye
    tone: warning
    eyebrow: "Log monitoring"
    title: "New patterns and spikes open an issue"
    lead: "You don't have to know which log line to alert on. A message pattern monoscope hasn't seen before, or one whose rate jumps against its baseline, becomes an issue with example lines and the requests behind them."
    shot: issues
    frame: "app.monoscope.tech / issues"
    bullets:
      - title: "No rules to start"
        icon: bug
        body: "New patterns and rate changes are detected from your traffic, per service."
      - title: "Monitors on any log query"
        icon: radio
        body: "Add thresholds to any query and route alerts to Slack, Discord, PagerDuty, WhatsApp or email."
      - title: "Noise, found for you"
        icon: dollar-sign
        body: "The Noisy log sources routine ranks the services and messages producing the most avoidable volume, with the log-level changes to make."
    link: /features/error-tracking/
    link_label: "How issues work"
  - id: collect
    icon: server
    tone: success
    eyebrow: "Centralized logging"
    title: "Every service, host and pod, through OpenTelemetry"
    lead: "Send logs from any OpenTelemetry SDK, or point a collector at your log files, Kubernetes pods and syslog. There's no proprietary agent to install."
    bullets:
      - title: "Application logs"
        icon: code
        body: "Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir, or any OpenTelemetry SDK."
      - title: "Files, pods and syslog"
        icon: hard-drive
        body: "The collector's filelog receiver reads /var/log, Kubernetes pod logs and nginx or Apache access logs."
      - title: "Priced per event"
        icon: dollar-sign
        body: "Free for 10k events a day. Cloud is $29 a month for 20M events, then $1 per million, with 30 days of retention."
    link: /docs/sdks/infrastructure/
    link_label: "Collect logs from your infrastructure"
faqs:
  - q: "What counts as an event?"
    a: "One log line, one span or one API request is one event, whatever its size. Request and response bodies don't count extra."
  - q: "Do I need your SDK to send logs?"
    a: "No. Any OpenTelemetry SDK or collector works. Our SDKs add request and response bodies and redact the fields you list before anything leaves your app."
  - q: "Can it replace our ELK stack or Splunk?"
    a: "For application and infrastructure logs, yes: search, patterns, dashboards, monitors and live tail. Run both side by side for a week or two first, and we'll help move your saved searches and alerts."
  - q: "Is every log kept?"
    a: "On Cloud, every log you send is kept for 30 days. The free plan covers 10k events a day."
  - q: "Can I self-host it?"
    a: "Yes. monoscope is open source under AGPL, and you can run it on your own servers."
related: [logs-and-traces, opentelemetry, error-tracking]
---
