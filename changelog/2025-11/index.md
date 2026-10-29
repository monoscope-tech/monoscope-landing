---
title: "November 2025"
date: 2025-11-01
summary: "A new Reports page, standard OTLP clients that authenticate with a header, a quick test during onboarding, and fixes for self-hosted basic auth."
themes:
  - issues
  - integrations
  - onboarding
  - selfhost
  - explorer
  - monitors
highlights:
  - "Reports show a span overview, slow queries and an issues breakdown."
  - "Any standard OTLP client can send data with an Authorization header, over gRPC or HTTP."
  - "Onboarding has a quick test: copy one command with your API key in it and watch test traces arrive."
  - "Self-hosted Docker Compose ships with basic auth on and the demo project off."
---

## Issues

- *Reports.* A new Reports page shows a span overview, slow queries and an issues breakdown, and opens the latest report automatically.
- Several query alerts can raise issues at the same time.

## Logs & Traces

- *Query language.* New `has_all` and `has_any` operators.
- *Traces.* Open a trace at a point in time, and View parent trace works again. Flame graphs keep fixed colors and resize to fit.
- *Live mode.* Streamed-in rows are highlighted so new entries stand out.
- *Query editor.* Typing is more responsive, and suggestions come back after you clear a query.
- No more duplicate rows in the log list or its trace view. Latency bars, the selected range on the chart and chart zoom were fixed.

## Dashboards & Metrics

- A traces widget lists spans with a flame graph for each trace. On the overview dashboard, the recent traces panel is taller.
- Charts on endpoint and issue list rows show again.

## Monitors & Alerts

- Alerts remember their chart type, and editing an alert reopens it with its query and chart. The create form clears after you submit.
- Monitors and alerts are back on one Monitors page.

## Session Replay

- Larger recordings are accepted.

## Integrations

- *Header auth.* Standard OTLP clients, such as telemetrygen, authenticate with an Authorization header over gRPC or HTTP. You no longer need custom attributes on every span.

## Onboarding & Billing

- *Quick test.* A banner in onboarding opens a ready-to-copy telemetrygen command with your API key in it, so you can send test traces in one step.
- The Cloud plan is now $29 a month.
- Dark mode has better contrast, and navigation tabs share one style.

## Self-Hosting

- *Basic auth.* When enabled, basic auth works instead of redirecting to OAuth. Docker Compose ships with basic auth on and the demo project off.
- The self-hosting docs were reorganized into getting started, configuration, Kubernetes, alerts and architecture.
- Set the server's log level in config.
