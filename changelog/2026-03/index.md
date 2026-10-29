---
title: "March 2026"
date: 2026-03-01
summary: "Monitors rebuilt around the chart, charts inside alerts, every OpenTelemetry metric type, and far fewer noisy issues."
description: "Monitors rebuilt around the chart, charts inside alerts, every OpenTelemetry metric type, and far fewer noisy issues."
themes:
  - monitors
  - issues
  - dashboards
  - explorer
  - integrations
  - onboarding
  - selfhost
image: monitors
image_alt: "The monoscope monitors list, alerting monitors first."
highlights:
  - "Monitors evaluate on schedule, re-notify on an interval you set, stop after a set count, and send alert and recovery emails."
  - "Error and monitor alerts in Slack, Discord, email and PagerDuty include a trend chart and occurrence counts."
  - "All OpenTelemetry metric types are stored: sums, histograms, exponential histograms and summaries."
  - "Issues open only for error and warning patterns, and identical errors merge before an issue is created."
---

## Monitors & Alerts

- *Monitors that fire.* Query monitors evaluate on schedule and notify. Set how often a monitor re-notifies and when it stops, and get alert and recovery emails.
- *Chart-first detail page.* Threshold lines, a time picker, a details sidebar, and mute, resolve and deactivate actions. Alerts are now called Monitors across the app.
- *Charts in alerts.* Slack, Discord, email and PagerDuty alerts include a trend chart and occurrence counts.
- The monitors list puts alerting monitors first and shows short relative run times. Duplicate notification emails are gone.

## Issues

- *Less noise.* Issues open only for error and warning log patterns. Infrastructure noise is skipped, identical errors merge first, and regression alerts repeat less.
- *Issues page.* Severity colors and icons, a short `#N` number for each issue that you can search by, an activity log, and syntax-highlighted code.
- Log pattern issues show a 7-day volume chart, with event counts over 24 hours or 7 days.
- *Cleaner endpoints.* Paths with IDs merge into templates such as `/users/{id}`, so the API catalog stops filling with duplicates.
- *Plain OpenTelemetry.* The API catalog picks up standard OpenTelemetry HTTP spans, and shows sparklines with a Last Seen column.

## Dashboards & Metrics

- *Every metric type.* Sums, histograms, exponential histograms and summaries are stored, not only gauges, so CPU and memory from infrastructure agents show up. Metric queries are faster.
- *Endpoint dashboard.* Overview, Errors and Latency tabs, with downstream calls at any depth.
- Built-in dashboards have fewer tabs, table rows open the matching view, and timestamps and tags are easier to read.
- Dashboards work on phones, and reordering widgets can no longer wipe another tab.

## Logs & Traces

- *Waterfall.* Hover tooltips, a time cursor and labeled stats. Clock skew is corrected, so child spans no longer start before their parents.
- *Merged patterns.* Similar log patterns merge, with a badge showing how many.
- The explorer, onboarding and settings work on phones.
- A command palette, faster facets, and queries on missing columns return empty results instead of an error.

## Integrations

- Send telemetry with an `x-api-key` header as well as `Authorization`. The bundled collector accepts it from browsers.
- Integrations live under Settings, Integrations.

## Onboarding & Billing

- *Weekly reports.* Redesigned emails, and the reports page shows each email as sent plus a live week-to-date preview.
- Free projects see a banner and get emails as they approach and reach the daily limit.
- Stripe checkout, and usage-based overage on the bring-your-own-storage plan.
- Removed members can no longer open the project, and a project audit log records critical changes.

## Self-Hosting

- Docker Compose runs TimescaleDB on Postgres 18.
- Telemetry is compressed after an hour and deleted after 30 days by default.
- `PAUSE_NOTIFICATIONS` turns off monitor, error and endpoint notifications for the whole install.
