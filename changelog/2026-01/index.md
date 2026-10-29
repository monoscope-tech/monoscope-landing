---
title: "January 2026"
date: 2026-01-01
summary: "Ask the AI about an issue, alerts straight from dashboard widgets, a Golden Signals overview, and a much larger query language."
themes:
  - ai
  - monitors
  - dashboards
  - explorer
  - issues
  - onboarding
  - performance
image: ai-chat
image_alt: "An AI SRE thread in monoscope answering questions about an issue."
highlights:
  - "Ask the AI about an issue from the issue page. The conversation is saved."
  - "Create an alert from a dashboard widget, with the threshold drawn on the chart."
  - "The Overview dashboard leads with traffic, p95 latency, error rate and Apdex, and adds an Infra tab."
  - "The query language gains countif, dcount, extend, project, case and more."
---

## AI SRE

- *Chat on issues.* Ask the AI about an issue from its page, and pick up the conversation later. Slack and Discord threads keep their history too.
- *Smarter queries.* When you ask a question, the AI looks at your real services and field values, and runs exploratory queries first when the question is hard.

## Monitors & Alerts

- *Alerts from widgets.* Create an alert from a dashboard widget. Thresholds are drawn on the chart, and a bell shows the alert's state.
- Recovery thresholds stop alerts flapping, thresholds accept decimals, and the Alerts page shows whether each alert came from a widget or the explorer.

## Dashboards & Metrics

- *Golden Signals.* The Overview dashboard leads with traffic, p95 latency, error rate and Apdex. The Logs and Databases tabs were reworked, and an Infra tab covers CPU, memory, containers, Kafka and Redis.
- *Tabs.* Dashboard tabs load on demand, each with its own URL, and can be renamed.
- *YAML in the app.* Edit a dashboard's YAML with syntax highlighting, preview the SQL behind a widget, and define constants from queries.
- When a dashboard needs a variable you haven't set, a picker asks for it.
- Expanded widgets keep their state in the URL, legends resize, and reordering, duplicating and deleting widgets works reliably.

## Logs & Traces

- *Query language.* `countif`, `dcount`, `coalesce`, `strcat`, `iff`, `case`, `extend`, `project`, `round`, type conversions, latency percentiles and arithmetic in `summarize`. A KQL reference is in the docs.
- Invalid queries return empty results instead of failing, and division by zero is safe.
- The explorer fetches data earlier, and child spans that arrive before their parent sit under a placeholder.
- Log levels are cleaned up as they arrive (WARNING becomes WARN, and so on), so level filters stay tidy.
- New projects get facets right away.

## Issues

- API change detection works again.
- System logs: actions monoscope takes for you, such as monitor runs, appear as logs.

## Onboarding & Billing

- *Invites on Free.* Free projects can invite teammates. Extra members are paused, and come back when you upgrade.
- Onboarding detects your first events again, and a removed member can be re-added.
- Skeleton loaders, smoother transitions, a theme that follows your OS, better keyboard and screen reader support, larger touch targets and reduced-motion support.

## Performance

- Repeated chart and dashboard queries come back faster from a cache.
