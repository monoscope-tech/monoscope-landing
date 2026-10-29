---
title: "October 2026"
date: 2026-10-01
summary: "Pull request reviews backed by your telemetry, a project wiki, rate() and increase() for metrics, and saved views on every dashboard."
themes:
  - ai
  - integrations
  - dashboards
  - explorer
  - issues
  - replay
  - agents
  - onboarding
image: ai-chat
image_alt: "An AI SRE investigation thread in monoscope."
highlights:
  - "monoscope reviews pull requests on linked repositories and flags changes that production traffic says are risky."
  - "Repositories are their own settings area. Dashboards and every monitor type sync to Git through one pull request."
  - "A project wiki for notes and runbooks that your team and the AI both use."
  - "KQL rate(), increase() and last() for counters and gauges, and arithmetic after summarize for ratio charts."
---

## AI SRE

- *Pull request reviews.* monoscope comments on pull requests in linked repositories, using your telemetry: Worth checking, Coverage unknown or No finding. Comments contain links by default, and production numbers are opt-in.
- *Project wiki.* Members and the AI agent write shared notes and runbooks, with Markdown editing, folders and revision history.
- *AI documents.* The agent saves documents next to a conversation, and scheduled routines add to a dated daily document.

## Integrations

- *Repositories.* A settings area for source context, pull request reviews and config sync on each repository. Dashboards and query, uptime and cron monitors sync to Git through one pull request, with conflicts resolved per resource.

## Dashboards & Metrics

- *Metric functions.* `rate()`, `increase()` and `last()`, plus `rateif`, `increaseif` and `lastif`. Arithmetic after `summarize` makes ratio charts, and charts draw one series per `by` combination. A 7-day rate chart now loads in under a second.
- *Saved views.* Any dashboard with variables can save shared views. Tabs choose which filters they show.
- *Responsive.* Widgets adapt to the width and stack on narrow screens.
- Threshold controls are back in the widget editor, widget queries preview with highlighting, and the dashboard list loads faster. Table widgets render as images in shared links and notifications.

## Logs & Traces

- *Free-text search.* A quoted string searches the body, status message and span name, ignoring case, in Explorer and Live Tail. Terms combine with AND, and `"hello world"` also matches hello-world.
- *Live Tail.* No longer freezes the tab on busy projects, stays responsive while you type, and restarts only when you submit a query.
- *Faster explorer.* Pages load about three times faster on large projects, and switching chart type no longer refetches the list.
- *Databases tab.* Error counts, a Recent Database Errors table linked to spans, and copy buttons on queries. Rare error rates no longer round to 0%.
- Values within one facet combine with OR, and Clear all works in Explorer and infrastructure tables.

## Issues

- *API changes.* API change issues are grouped and show the fields side by side as evidence.
- Runtime issues sort by their latest error, and charts over wide windows load fast.

## Session Replay

- *RUM dashboard.* Real user monitoring is a dashboard now, with Web Vitals at p75, and sessions live in the Explorer's sessions view. Audience breakdowns save as views.

## CLI, MCP & Agents

- *CLI v0.6.31.* Breaking: `metrics query --assert` fails when the query doesn't return a single number. Use `summarize` without `by` for assertions.
- Credential files are written with owner-only permissions, the installer skips a release you already have, resource lists show IDs, and an omitted ID can be picked interactively.

## Onboarding & Billing

- *Free plan.* Over the daily cap, monoscope samples data across the day instead of stopping: whole traces are kept, part of the budget is reserved for errors, and the banner shows the sampling rate.
- Promotion codes at checkout, and choosing Free cancels a paid subscription.
- The API key settings were reworked, and the sidebar avatar falls back to your initials.
