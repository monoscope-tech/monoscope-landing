---
title: "June 2026"
date: 2026-06-01
summary: "Prometheus scraping, monitors and dashboards as code, OTLP over HTTP without a collector, and accuracy fixes across the explorer and dashboards."
description: "Prometheus scraping, monitors and dashboards as code, OTLP over HTTP without a collector, and accuracy fixes across the explorer and dashboards."
themes:
  - integrations
  - agents
  - explorer
  - dashboards
  - selfhost
image: metrics
image_alt: "The monoscope metrics explorer."
highlights:
  - "Add Prometheus scrape targets in settings. Their metrics land in the metrics explorer."
  - "Export monitors to YAML and apply them back from the CLI, as you already could with dashboards."
  - "Send traces and logs straight to monoscope over OTLP/HTTP, no collector needed."
  - "Golden Signals stats show the right numbers, and broken widget queries show the error instead of No data."
---

## Integrations

- *Prometheus scraping.* Add `/metrics` endpoints as scrape targets in a new Prometheus settings page. Each target has its own interval, auth header and labels, a health badge, a Test connection button, and a link to its metrics. Private network addresses are blocked.
- *OTLP over HTTP.* Send traces and logs to `/v1/traces` and `/v1/logs` with an `x-api-key` header. No collector needed.

## CLI, MCP & Agents

- *Monitors as code.* Export monitors to YAML and apply them back. `monitors apply` matches on the alert title, so running it twice changes nothing.
- *Output.* `--json`, `--yaml` and `--table`, chosen for you when omitted: a terminal gets a table, a pipe gets JSON.
- *Search.* Plain words search full text, `--service` repeats, `--limit` works everywhere, long `--since` windows come back as one result, and `events get --field` prints the fields you name.
- Bad KQL returns an error with a suggested fix, and `metrics query --assert` works again for CI checks.

## Logs & Traces

- *Paging and live tail.* No duplicate rows across pages, Show earlier events loads from the oldest row on screen, live tail no longer stalls, and hidden or reordered columns stay that way.
- *Error logs in traces.* An error log turns its parent span's badge red in the waterfall.
- Timestamps show in your local time zone, and opening a single log is faster.

## Dashboards & Metrics

- *Correct Golden Signals.* Traffic is a real requests-per-minute rate, p95 latency and totals cover the whole window, and error rates are red.
- *Widget errors.* A broken widget query shows the reason, such as Column not found or Query timed out, instead of No data.
- Metrics charts that filter by service or attribute return data, and a failed fetch no longer leaves a lasting gap in a chart.

## Onboarding & Billing

- The install command in onboarding uses https.

## Self-Hosting

- *Ingest-only replicas.* `CONSUMER_ONLY=True` runs a replica with no web server or OTLP ports.
- *Clean shutdown.* Ctrl-C or SIGTERM stops the server within a bounded time, so `docker stop` and Kubernetes drains are graceful.
- *Resilient ingestion.* A dead-letter queue with replay, retries on brief database resets, and support for 64 MiB Kafka messages.
