---
title: "June 2025"
date: 2025-06-01
summary: "KQL-style summaries and group-bys, a summary column in the log list, and an AI that answers in Discord and Slack."
themes:
  - ai
  - explorer
  - issues
  - monitors
  - integrations
  - onboarding
  - performance
highlights:
  - "The query language moved closer to KQL: summarize by, count() and group by any field."
  - "Each log row shows a compact summary: service, labels and latency, so you need fewer columns."
  - "Ask the Discord bot a question in plain English and get back a query and a chart. In Slack and Discord threads you can ask follow-ups about an alert."
  - "Daily and weekly reports can go to Slack and Discord."
---

## AI SRE

- *Discord bot.* Ask about your project in plain English. The bot answers with a generated query and a chart image. Use `/here` to choose the alert channel.
- *Follow-ups on alerts.* Error alerts in Slack and Discord carry more context, and you can ask follow-up questions in the thread.
- AI search picks the chart type for you and handles group-by questions.

## Logs & Traces

- *KQL-style queries.* `summarize ... by`, `count()` and grouping by a field.
- *Summary column.* Each row shows the service, labels and right-aligned latency, so you need fewer default columns.
- *Facets write queries.* Ticking a facet adds or removes that filter in the query. Add columns and group-bys from a facet or from a log row.
- *Your time zone.* Dates show in your own time zone.
- Row checkboxes, one options menu for view settings like line wrap, clearer trace trees, and no more duplicate rows when new data arrives.
- Buttons respond on press instead of release, so the interface feels quicker.

## Issues

- Error messages are normalized before grouping, so the same error no longer opens several issues.
- Fixed a crash on the overview dashboard and issues pages.

## Dashboards & Metrics

- Zoom a chart without a separate button. Nested widgets render correctly, and every chart shares one theme and number format.

## Monitors & Alerts

- *Rebuilt alerts.* Slack and Discord alerts are structured messages with chart images.
- *Reports in chat.* Daily and weekly reports can go to Slack and Discord.

## Integrations

- Slack slash commands, and a clearer page after you install the Slack or Discord app.

## Onboarding & Billing

- *Setup guides.* Onboarding pulls its instructions from the docs and adds guides for Docker, Kubernetes, Kafka, Linux, MongoDB, MySQL and PostgreSQL. It shows your API key and links to video tutorials.
- The free plan banner shows on every page, so you know when you're near the daily limit.

## Performance

- Ingestion processes events faster and no longer rejects payloads that contain null bytes.
