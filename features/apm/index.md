---
# Verified: Overview and Endpoint Analytics dashboards (static/public/dashboards/_overview.yaml,
# endpoint-stats.yaml: golden signals, Apdex, p50-p99, downstream time spent, slowest traces),
# N+1 and slow-query performance issues (BackgroundJobs.detectPerformanceIssues, Issues.PKNPlusOne/PKSlowQuery),
# "Slow endpoint watch" and "Dependency degradation digest" routine templates (Issues.routineTemplates).
# The demo project has no performance issues yet, so no section shows one.
title: "Application performance monitoring with the slow request's payload"
description: "Application performance monitoring on OpenTelemetry: latency, errors and Apdex per endpoint, N+1 and slow queries flagged, and the slow request's trace."
eyebrow: APM
tone: success
h1: "Application performance monitoring down to the slow request"
pitch: "Latency, throughput, error rate and Apdex for every service and endpoint, from your OpenTelemetry traces. Click a p95 spike and the AI SRE reads the slow request itself: its trace, its queries and its body."
playground: dashboards
hero_demo: /assets/demos/dashboards-b.html
hero_shot: dashboard-overview
hero_frame: "app.monoscope.tech / dashboards"
art: page-apm.webp
sections:
  - id: endpoints
    icon: bar-chart
    tone: success
    eyebrow: "Per endpoint"
    title: "Golden signals for every service and route"
    lead: "The Overview dashboard reads your traces and shows traffic, p95 latency, error rate and Apdex per service. Pick a service and each endpoint gets the same breakdown."
    shot: dashboard-service
    frame: "app.monoscope.tech / dashboards · service"
    bullets:
      - title: "p50 to p99"
        icon: activity
        body: "Latency percentiles over time for each endpoint, with requests by status code beside them."
      - title: "Apdex per service"
        icon: star
        body: "Requests under 500 ms count as satisfied, under 2 s as tolerating, so one number tracks how it feels."
      - title: "Where the time goes"
        icon: database
        body: "Time spent in each downstream operation: the SQL query, the cache call, the supplier API."
    link: /docs/dashboard/dashboard-pages/dashboard/
    link_label: "How dashboards work"
  - id: slow-request
    icon: align-left
    tone: brand
    eyebrow: "The slow request"
    title: "From the p95 line to the request that set it"
    lead: "Each endpoint lists its slowest traces. Open one and you see where 3.4 seconds went, span by span, with the request and response body that made it slow."
    shot: trace
    frame: "app.monoscope.tech / log_explorer · trace"
    bullets:
      - title: "Waterfall per request"
        icon: activity
        body: "Every span across services, with database queries, retries and outgoing calls in order."
      - title: "The payload that was slow"
        icon: code
        body: "A 4 MB cart or a search with 900 filters shows in the body, not only in the duration."
      - title: "Suppliers on the same trace"
        icon: plug
        body: "Calls to payment, shipping and KYC APIs are timed and kept next to your own spans."
    link: /features/distributed-tracing/
    link_label: "Distributed tracing"
  - id: database
    icon: database
    tone: warning
    eyebrow: "Database performance"
    title: "N+1 queries and slow queries become issues"
    lead: "Every hour monoscope looks for the same query repeated inside one request and for queries that take too long. Each one opens an issue with the endpoint it ran under, how often it repeated and the time it cost."
    shot: issues
    frame: "app.monoscope.tech / issues"
    bullets:
      - title: "N+1 detection"
        icon: grid
        body: "The repeated query, normalized, with the parent span and the root endpoint that issued it."
      - title: "Slow queries"
        icon: zap
        body: "The query, the database system and the latency it added, linked to an example trace."
      - title: "One issue per query"
        icon: bug
        body: "The same slow query across thousands of requests is one issue with a count."
  - id: ai
    icon: zap
    tone: success
    eyebrow: "AI SRE"
    title: "Regressions found before the dashboard is open"
    lead: "Routines compare each hour with its baseline and post to Slack when something got slower, with the queries and traces behind the finding. They stay quiet when nothing qualifies."
    shot: routines
    frame: "app.monoscope.tech / ai / routines"
    bullets:
      - title: "Slow endpoint watch"
        icon: activity
        body: "Endpoints whose p95 or p99 got materially worse than usual, with enough traffic to be credible."
      - title: "Dependency degradation digest"
        icon: plug
        body: "Downstream services, databases and APIs that got slower or started failing, and who calls them."
      - title: "Deployment regression review"
        icon: rocket
        body: "Errors and latency before and after each new service version, once a day."
    link: /features/ai-sre/
    link_label: "How the AI SRE works"
faqs:
  - q: "Do I need a monoscope agent on every host?"
    a: "No. APM comes from OpenTelemetry traces, from our SDKs or any OpenTelemetry SDK. There's no per-host agent and no per-host fee."
  - q: "How is APM priced?"
    a: "Per event. A span is one event. Free for 10k events a day; Cloud is $29 a month for 20M events, then $1 per million."
  - q: "Are traces sampled?"
    a: "Not on Cloud: every span you send is kept for 30 days, so the slow request you're looking for is there. The free plan covers 10k events a day."
  - q: "Which languages are supported?"
    a: "Any language with an OpenTelemetry SDK. Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir also capture request and response bodies."
  - q: "How does this compare to Datadog APM?"
    a: "Both give you service and endpoint latency, error rates and traces. monoscope keeps the request and response bodies with each trace, prices per event instead of per host, and is open source."
related: [distributed-tracing, dashboards, ai-sre]
---
