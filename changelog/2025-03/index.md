---
title: "March 2025"
date: 2025-03-01
summary: "A full dashboard builder, live tail in the explorer, copy as cURL, and a free plan."
themes:
  - dashboards
  - explorer
  - onboarding
  - selfhost
highlights:
  - "Build dashboards in the app: add, duplicate, expand and copy widgets, with variables that depend on each other."
  - "Live tail streams new logs as they arrive, and the explorer can refresh itself on an interval."
  - "Copy any request or span as a cURL command."
  - "A free plan: 10,000 events a day, one team member, three days of retention."
---

## Logs & Traces

- *Live tail.* Stream logs as they arrive. A Recent button fetches the newest events and jumps back to them.
- *Auto refresh.* Pick an interval and the explorer refreshes on its own.
- *Copy as cURL.* Copy a request or a trace span as a cURL command and replay it from your terminal.
- *Columns and filters.* Resize columns, add a field as a column or hide it, and filter on a field's value or exclude it.
- *Shareable state.* The event you have open is kept in the URL, so a reload or a shared link lands on the same view.
- *Trace details.* The latency breakdown stays pinned while you scroll, child spans expand and collapse, and long lines wrap.
- *Speed.* The log list loads faster, and resizing the details panel is quicker.

## Dashboards & Metrics

- *Dashboard builder.* Create a blank dashboard, rename, duplicate or delete it, and add widgets that save as you go.
- *Widget menu.* Expand a widget to full size, duplicate it, or copy a chart from the explorer into any dashboard.
- *Linked variables.* Variables can depend on each other: pick a host and the endpoint list narrows to that host. A new endpoint stats dashboard uses this.
- *Auto refresh.* Dashboards refresh on an interval, and widgets show a spinner while they update.
- *Metrics table.* The metrics page has a new table with service names and a source filter, and the data points page loads faster.

## Onboarding & Billing

- *Free plan.* 10,000 events a day, one team member and three days of retention. Ingestion pauses at the daily limit.
- The page for changing your plan was redesigned.
- Anyone can open the demo project to try monoscope before sending data.

## Self-Hosting

- monoscope can read events from Kafka. Set brokers, topics and credentials in the config, and the bundled OpenTelemetry Collector config can export to Kafka.
