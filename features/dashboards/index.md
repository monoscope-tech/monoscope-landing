---
# NOTE: shots dashboard-overview, monitors, service-map use the fixed W1 names; files were not in assets/img/product/ yet when written.
# UNVERIFIED: dashboard/monitor sync through GitHub PRs is taken from the commit title of monoscope #671 ("sync dashboards and monitors through PRs"); the user-facing flow wasn't checked in the UI.
title: "Metrics, dashboards and alerts on any query"
description: "Dashboards from 20 templates or your own KQL, alerts on any query, infrastructure and a service map, all kept as YAML you can review in a PR."
eyebrow: "Metrics & dashboards"
tone: success
h1: "Dashboards and alerts on every query"
pitch: "Chart latency, traffic and errors from your logs, traces and metrics. Alert on any query, and click from a spike to the requests behind it."
playground: dashboards
hero_demo: /assets/demos/dashboards-b.html
hero_frame: "app.monoscope.tech / dashboards"
art: page-dashboards.webp
sections:
  - id: dashboards
    icon: bar-chart
    tone: success
    eyebrow: "Dashboards"
    title: "Start from a template, change anything"
    lead: "20 templates cover Kubernetes, PostgreSQL, MySQL, Redis, nginx, RabbitMQ, Docker, the OpenTelemetry Collector and more. Every widget is a query you can open and edit."
    shot: dashboard-overview
    frame: "app.monoscope.tech / dashboards"
    bullets:
      - title: "Widgets that fit the question"
        icon: pie-chart
        body: "Time series, stat, top list, table, pie, distribution, heatmap, flame graph and service map."
      - title: "From a chart to the request"
        icon: align-left
        body: "Open any widget in the Explorer to see the logs and requests behind the line."
      - title: "Variables and saved views"
        icon: layout
        body: "Filter a whole dashboard by service or environment, and save the views your team checks every day."
    link: /docs/dashboard/dashboard-pages/dashboard/
    link_label: "Build a dashboard"
  - id: monitors
    icon: radio
    tone: warning
    art: page-monitors.webp
    eyebrow: "Alerts"
    title: "Alert on any query"
    lead: "Any KQL query or dashboard widget can become a monitor. Set a warning and an alert threshold, how long it has to hold, and when to notify again."
    shot: monitors
    frame: "app.monoscope.tech / monitors"
    bullets:
      - title: "Thresholds that recover"
        icon: activity
        body: "Warning, alert and recovery levels, so a value hovering on the line doesn't page you ten times."
      - title: "Uptime and cron checks"
        icon: calendar
        body: "Probe URLs on a schedule, and know when a nightly job stops checking in."
      - title: "Where your team already is"
        icon: users
        body: "Slack, Discord, PagerDuty, WhatsApp and email, with the value, the threshold and a chart."
    code_label: "KQL · checkout p95 latency in ms, per minute"
    code_class: nohighlight
    code: |
      spans
      | where attributes.http.route == "/checkout"
      | summarize p95(duration / 1e6) by bin(timestamp, 1m)
    link: /docs/dashboard/dashboard-pages/query-language/
    link_label: "Query language reference"
  - id: infrastructure
    icon: server
    tone: success
    eyebrow: "Infrastructure"
    title: "Hosts, containers and how services connect"
    lead: "monoscope builds an inventory from the OpenTelemetry data you already send: hosts, containers, images and Kubernetes resources, plus a map of which service calls which."
    shot: service-map
    frame: "app.monoscope.tech / service_map"
    bullets:
      - title: "Service map"
        icon: compass
        body: "Request rate, errors and latency per service, plus the databases, queues and third-party APIs they call."
      - title: "Host map and containers"
        icon: hard-drive
        body: "CPU and memory per host, pod and container, filtered by cluster, namespace or region."
      - title: "Metrics included"
        icon: dollar-sign
        body: "20M metric datapoints a month come with Cloud, then $1 per 10M. No per-host or custom-metric fees."
    link: /docs/sdks/
    link_label: "Send metrics with OpenTelemetry"
  - id: as-code
    icon: code
    tone: violet
    eyebrow: "As code"
    title: "Dashboards and monitors you can review"
    lead: "Export any dashboard or monitor as YAML, keep it in your repo, and apply it from CI. Changes go through a pull request like the rest of your code."
    bullets:
      - title: "Round-trip YAML"
        icon: copy
        body: "Export, edit, apply. Applying the same file twice changes nothing."
      - title: "Synced through GitHub"
        icon: github
        body: "Connect a repository and dashboard and monitor changes arrive as pull requests."
      - title: "Your agent can edit them"
        icon: zap
        body: "Claude Code and other agents manage monitors and dashboards with the monoscope CLI and skills."
    code_label: "monoscope CLI"
    code_class: language-bash
    code: |
      monoscope dashboards yaml &lt;id&gt; &gt; dashboards/checkout.yaml
      monoscope dashboards apply dashboards/
      monoscope monitors apply monitors/
    link: /docs/ai/cli/commands/
    link_label: "CLI reference"
faqs:
  - q: "Can I bring my Prometheus metrics?"
    a: "Yes. Send them through the OpenTelemetry Collector, or have monoscope scrape your Prometheus endpoints."
  - q: "How are metrics priced?"
    a: "Cloud includes 20M metric datapoints a month; after that it's $1 per 10M. There are no host fees or custom-metric fees."
  - q: "Can I move my Datadog dashboards over?"
    a: "There's no automatic importer. We'll help you rebuild your key dashboards and monitors as part of moving off Datadog, at no charge."
  - q: "What does an alert look like?"
    a: "It shows the value, the threshold it crossed and a chart, with links to the issue and the monitor. From there the query opens in the Explorer with the matching requests."
related: [logs-and-traces, error-tracking, ai-sre]
---
