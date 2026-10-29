---
# UNVERIFIED:
# - Shape-change detection on outgoing (supplier) endpoints: endpoints carry an `outgoing` flag and
#   ApiChanges detects field/endpoint/shape/format anomalies per endpoint; I did not trace a supplier
#   change end to end. The homepage and brief already state it.
# - "API docs from real traffic": the catalog has an "API Docs" tab in the demo project; not checked
#   whether it exports OpenAPI, so the copy doesn't say so.
# - Court case: anonymous per brand/landing-content.md. Platnova quote is verbatim from index.md.
title: "API monitoring for the APIs you serve and the ones you call"
description: "Every API request and response, incoming and outgoing, kept with full bodies. Breaking changes flagged in your APIs and your suppliers'. Proof for disputes."
eyebrow: API monitoring
tone: brand
h1: "What you sent, and what they answered"
pitch: "Every request and response, the ones customers send you and the ones you send suppliers, kept with full bodies. When a field changes, you know first. When a partner disputes it, you show them."
playground: api_catalog
hero_demo: /assets/demos/prove-b.html
hero_frame: "app.monoscope.tech / explorer"
art: prove-observatory.webp
sections:
  - id: both-ways
    icon: plug
    tone: brand
    eyebrow: "In and out"
    title: "Your endpoints and your suppliers', side by side"
    lead: "Most API monitoring stops at your own routes. monoscope also records the calls your app makes to payment providers, logistics partners and KYC vendors, with the request you sent and the response they returned."
    shot: api-catalog
    frame: "app.monoscope.tech / api_catalog"
    bullets:
      - title: "A catalog built from traffic"
        icon: grid
        body: "Every endpoint you serve, grouped by host and service, with its fields, latency and error rate. Nothing to declare up front."
      - title: "Every host you call"
        icon: plug
        body: "Outgoing hosts get the same catalog: which services call them, how often, how slowly, and how often they fail."
      - title: "Full bodies, never sampled"
        icon: align-left
        body: "Headers, request body and response body for each call, linked to the trace and logs around it. Bodies don't add to the price."
    link: /docs/dashboard/dashboard-pages/api-catalog/
    link_label: "Monitor outgoing calls"
  - id: changes
    icon: eye
    tone: brand
    eyebrow: "Breaking changes"
    title: "Know when an API changes shape, before customers do"
    lead: "A supplier drops tracking_id. Its API still returns 200 OK, nothing throws and the traces stay green. monoscope compares each response with the shape it learned, and flags the missing field with the requests that show it."
    shot: api-changes
    frame: "app.monoscope.tech / issues"
    bullets:
      - title: "Fields added, removed or retyped"
        icon: code
        body: "Each change names the field path, the old type and the new one, and is rated breaking, incremental or safe."
      - title: "In APIs you don't own"
        icon: plug
        body: "The same check runs on supplier responses, so their change reaches you as an issue the first time a response shows it."
      - title: "New endpoints and formats"
        icon: zap
        body: "A route nobody documented, or a field that switched from a number to a string, shows up the first time it's seen."
      - title: "Your own deploys too"
        icon: rocket
        body: "A deploy that renames a field your mobile app still reads is caught in the response, before the app store reviews do."
    link: /docs/dashboard/dashboard-pages/issues/
    link_label: "How change detection works"
  - id: proof
    icon: database
    tone: brand
    eyebrow: "The receipt"
    title: "When someone disputes it, show them the request"
    lead: "One customer took a supplier to court. The supplier had acknowledged every request with a 200 and never did the work. The stored requests, with what was sent and what came back to the millisecond, were the case."
    shot: log-explorer-request
    frame: "app.monoscope.tech / log_explorer"
    bullets:
      - title: "Support names the partner"
        icon: users
        body: "\"Our tech support could see via APItoolkit which third-party integration partner was responsible.\" Joshua Chinemezum, CEO of Platnova."
      - title: "Share the exact call"
        icon: link
        body: "Send a partner a link to the request and response instead of describing them. Anyone with the link can view it for 48 hours."
      - title: "Keep it as long as you need"
        icon: database
        body: "30 days on Cloud. Add your own S3 bucket ($199/month) for unlimited retention in open Delta Lake and Parquet."
    code_label: "duckdb · every call to a supplier on one day, from your bucket"
    code_class: language-sql
    code: |
      INSTALL delta; LOAD delta;

      SELECT timestamp,
             attributes___http___request___method       AS method,
             attributes___url___full                    AS url,
             attributes___http___response___status_code AS status
      FROM delta_scan('s3://your-bucket/timefusion/otel_logs_and_spans')
      WHERE project_id = 'your-project'
        AND date = DATE '2026-09-27'
        AND attributes___server___address = 'api.supplier.com'
      ORDER BY timestamp;
    link: /features/byob-s3/
    link_label: "Your own S3 bucket"
faqs:
  - q: "How do outgoing calls get recorded?"
    a: "Our SDKs wrap the HTTP clients your app uses, such as Axios in Node.js, and record each call with its request and response. Plain OpenTelemetry records the call as a span, without the bodies."
  - q: "Do request bodies cost extra?"
    a: "No. A request counts as one event whatever its size. Free up to 10k events a day, then $29 a month for 20M events and $1 per million after."
  - q: "What about sensitive fields?"
    a: "List headers and JSON paths such as $.card.number in the SDK config. They're redacted in your app before anything is sent."
  - q: "How long are requests kept?"
    a: "30 days on Cloud. With your own S3 bucket, as long as you keep the bucket, in open Delta Lake and Parquet you can query with DuckDB or Postgres-compatible SQL."
  - q: "Does this replace Treblle or an API gateway's analytics?"
    a: "It covers the API side and adds the rest: logs, traces, metrics, session replay and an AI that investigates from the stored requests. Gateways see calls coming in, not the calls your app makes out."
related: [error-tracking, logs-and-traces, byob-s3]
---
