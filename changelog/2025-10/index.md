---
title: "October 2025"
date: 2025-10-01
summary: "Per-project alert settings, patterns by summary, sortable dashboard tables, and an explorer that stays responsive on slower machines."
themes:
  - monitors
  - explorer
  - dashboards
  - issues
  - replay
  - performance
highlights:
  - "Turn new-endpoint alerts, runtime error alerts and daily or weekly reports on or off per project."
  - "Group patterns by log body or by event summary."
  - "Dashboard tables sort, show progress-bar columns, and keep each series the same color everywhere."
  - "Explorer data loads in a background worker, so the page doesn't freeze."
---

## Monitors & Alerts

- *Alert settings.* A new section in project settings turns new-endpoint alerts, runtime error alerts, and daily and weekly reports on or off.
- Creating alerts works again, and alert creation times show correctly.

## Logs & Traces

- *Patterns picker.* Group patterns by log body or by event summary. The patterns list is paginated.
- *Expand the range.* When results run out, a button widens the time range and keeps loading.
- *Complete traces.* Queries return every match plus its child spans, logs sit under the right span, and pages hold 500 rows by default.
- Live updates respect your current query, error markers work again, and the query editor's cursor behaves.

## Issues

- A project can show more than one issue again.
- Expand and collapse stack traces on error issues.

## Dashboards & Metrics

- *Tables.* Sort columns and show values as progress bars.
- *Steady colors.* A series keeps its color across charts and reloads, and long legend names are shortened.
- *Overview updates.* Top-20 limits on resource charts, better database queries, and latency charts with proper units. Select dropdowns are no longer see-through.

## Session Replay

- Recordings from browsers on other domains are accepted.

## Integrations

- Database spans that use older OpenTelemetry attribute names are mapped to the current names, so they show in database views.

## Performance

- Explorer data loads in a background worker, so the page doesn't freeze on slower machines. Render times dropped and the query editor no longer waits before responding.

## Onboarding & Billing

- New API keys use only characters that are safe in URLs and `.env` files.
