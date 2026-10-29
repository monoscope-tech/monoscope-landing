---
# UNVERIFIED: "780+ integrations" is copied from the homepage; source of the count not found in the repo (assumed: OpenTelemetry registry).
# NOTE: shots log-explorer-request, log-explorer, trace use the fixed W1 names; files were not in assets/img/product/ yet when written.
title: "Logs and traces with the full request and response"
description: "Every log, span and API request in one Explorer, with request and response bodies, trace waterfalls, KQL or plain-English queries and live tail."
eyebrow: "Logs & traces"
tone: brand
h1: "Every log, span and request, with its body"
pitch: "Search logs, traces and API calls in one place. Open any request to see its headers, body and response, then the trace and logs around it."
hero_demo: /assets/demos/prove-b.html
hero_frame: "app.monoscope.tech / log_explorer"
art: page-logs-traces.webp
sections:
  - id: request
    icon: align-left
    tone: brand
    eyebrow: "The exact request"
    title: "The body a sampled trace doesn't keep"
    lead: "A span tells you POST /v1/payments took 3.4 seconds and returned 502. Open the same row in monoscope and you get the request body you sent and the response body that came back."
    shot: log-explorer-request
    frame: "app.monoscope.tech / log_explorer"
    bullets:
      - title: "Headers, body and response"
        icon: align-left
        body: "Incoming requests and the calls you make to suppliers, with bodies, exactly as they were sent."
      - title: "Calls to other APIs, too"
        icon: plug
        body: "Payment, logistics and KYC calls sit next to your own traffic, on the same trace."
      - title: "Redacted before it leaves"
        icon: eye
        body: "The SDK strips the headers and body fields you list, such as $.password, inside your app."
    link: /docs/dashboard/dashboard-pages/api-log-explorer/
    link_label: "How the Explorer works"
  - id: query
    icon: code
    tone: brand
    eyebrow: "One query language"
    title: "Ask in English, or write the query"
    lead: "Type what you're looking for and monoscope writes the KQL for you. Edit it, or write your own. The same query runs in the Explorer, dashboard widgets, monitors, the CLI and the MCP server."
    shot: log-explorer
    frame: "app.monoscope.tech / log_explorer"
    bullets:
      - title: "Plain English in, KQL out"
        icon: zap
        body: "“product-catalog errors since the deploy” becomes a query you can read and change."
      - title: "Facets on every field"
        icon: bar-chart
        body: "Service, status code, route, host: click a value to filter, see the counts before you do."
      - title: "Patterns, not 40,000 lines"
        icon: grid
        body: "Similar log lines are grouped into patterns, so the new one stands out."
      - title: "Saved and recent queries"
        icon: star
        body: "Save the queries your team runs every incident; your recent ones are kept for you."
    code_label: "KQL · server errors per service in the last hour"
    code_class: nohighlight
    code: |
      spans
      | where attributes.http.response.status_code &gt;= 500
          and timestamp &gt;= ago(1h)
      | summarize count() by resource.service.name
      | sort by count_ desc
    link: /docs/dashboard/dashboard-pages/query-language/
    link_label: "Query language reference"
  - id: trace
    icon: activity
    tone: brand
    eyebrow: "Traces"
    title: "Follow one request through every service"
    lead: "Open a trace to see each span in a waterfall, with the database queries, outgoing calls and log lines it produced. Switch to a timeline, a per-service breakdown or a map of the services it touched."
    shot: trace
    frame: "app.monoscope.tech / log_explorer · trace"
    bullets:
      - title: "Waterfall and timeline"
        icon: align-left
        body: "Where the 3.4 seconds went: the slow SQL, the retry, the supplier that took two seconds to answer."
      - title: "Logs inside the trace"
        icon: code
        body: "Every log line written during the request, in order, next to the span that wrote it."
      - title: "Share the evidence"
        icon: link
        body: "A read-only link to the request opens for anyone for 48 hours, no account needed."
    link: /docs/dashboard/dashboard-pages/api-log-explorer/
    link_label: "Read about traces"
  - id: live
    icon: radio
    tone: brand
    eyebrow: "Live tail"
    title: "Watch a deploy as it happens"
    lead: "Turn on live tail and new logs and spans stream in as they arrive, filtered by the query you're already running."
    bullets:
      - title: "Filtered as it streams"
        icon: radio
        body: "Tail one service, one route or one customer, not the firehose."
      - title: "Built on OpenTelemetry"
        icon: plug
        body: "Any OpenTelemetry SDK or collector works, across 780+ integrations. Switching from Datadog is an exporter change."
      - title: "Kept, not sampled"
        icon: database
        body: "Paid plans keep every event. Request bodies don't count toward your bill."
    link: /docs/sdks/
    link_label: "Send your telemetry"
faqs:
  - q: "Do you sample my data?"
    a: "Not on paid plans: every log, span and request is kept. The free plan covers 10k events a day; past that, it keeps a share of traffic spread across the day, and traces with errors are kept whole."
  - q: "Do request and response bodies cost extra?"
    a: "No. An event is priced the same with or without its body. Cloud is $29 a month for 20M events, then $1 per million."
  - q: "How do I capture bodies?"
    a: "Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir capture request and response bodies, with redaction. Plain OpenTelemetry gives you logs and traces without bodies."
  - q: "Is it KQL as in Azure Data Explorer?"
    a: "It's a subset of KQL: where, summarize, extend, project, sort and take, with percentiles, counter rates and time bins. The reference lists every operator we support."
  - q: "How long is data kept?"
    a: "30 days on Free and Cloud. Connect your own S3 bucket for unlimited retention."
related: [error-tracking, dashboards, byob-s3]
---
