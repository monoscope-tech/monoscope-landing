---
title: "December 2025"
date: 2025-12-01
summary: "Teams, two-way GitHub sync for dashboards, an error details page, and a refreshed interface."
themes:
  - integrations
  - dashboards
  - issues
  - monitors
  - ai
  - performance
image: settings-members
image_alt: "Team members in monoscope project settings."
highlights:
  - "Group members into teams, give dashboards and alerts to a team, and route each team's notifications to its own Slack or Discord channel."
  - "Keep dashboards as YAML in a GitHub repo. Changes sync both ways."
  - "An error details page links each error to its first and latest trace."
  - "A calmer dark theme and one table with sorting and bulk actions across the app."
---

## Integrations

- *Teams.* Group project members into teams, assign dashboards and alerts to a team, and send each team's notifications to its own Slack or Discord channel. Only admins create or edit teams.
- Profile photos no longer break when the sign-in provider's photo link expires.

## Dashboards & Metrics

- *GitHub sync.* Store dashboards as YAML in a repo. Saving pushes to GitHub, and pushes to GitHub update monoscope. Setup steps are built in, and dashboards can live in folders.
- *Stars and filters.* Star dashboards to keep them at the top, filter by team, and delete in bulk.
- Dashboard variables initialize correctly, widgets no longer overflow nested grids, and flame graph and waterfall charts were fixed.

## Issues

- *Error details.* A new page for each error links to its first and most recent traces. The monitor history tab uses the same table as the log list.
- Each issue has its own page, and Investigate links in emails open it.
- Issue filters, session replay inside an issue, and span detail tabs were fixed.

## Monitors & Alerts

- Query monitor alerts have a clearer body and summary. Last triggered and execution history are correct, and alert details expand.

## AI SRE

- Queries written by the AI choose the time bucket size for your range, unless you ask for a specific interval.

## Onboarding & Billing

- *Interface refresh.* A dark theme that's easier on the eyes and meets WCAG AA contrast, raised cards, frosted modal backdrops and a new settings sidebar.
- *One table.* Issues, API catalog, dashboards, monitors and API keys share one table with sorting, bulk actions and page-by-page navigation.
- The explorer's resizable panels work on touch screens.

## Performance

- The log list fetches data and counts in one query, so it loads faster.
