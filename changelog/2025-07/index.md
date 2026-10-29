---
title: "July 2025"
date: 2025-07-01
summary: "Alerts from any explorer query, dark mode and the monoscope name, metrics in the explorer, and the AI on WhatsApp."
description: "Alerts from any explorer query, dark mode and the monoscope name, metrics in the explorer, and the AI on WhatsApp."
themes:
  - monitors
  - dashboards
  - ai
  - integrations
  - onboarding
image: monitors
image_alt: "The monoscope monitors list, with alerts and their status."
highlights:
  - "Create an alert from any explorer query, with thresholds drawn on the chart."
  - "Dark mode, and the app now carries the monoscope name and logo."
  - "Metrics have their own page in the explorer."
  - "Ask questions and get alerts on WhatsApp, and mention the bot in Slack."
---

## Monitors & Alerts

- *Alerts from queries.* Turn any explorer query into an alert. Set the schedule, time window, alert and warning thresholds (drawn on the chart), severity, message, re-notify interval and when to stop.
- *One list.* Alerts and multi-step monitors share one list and one overview page.
- WhatsApp is a notification channel, and the notify checkbox on integrations toggles again.

## AI SRE

- *WhatsApp.* Ask about your project in plain English, receive alerts, and browse and share dashboards.
- *Slack mentions.* Mention the bot in Slack to ask a question.

## Dashboards & Metrics

- *Metrics in the explorer.* A metrics page in the navigation, with an overview tab and an empty state that tells you how to send metrics.
- *Share charts.* Share a widget to Slack, or pick and share a dashboard in Discord with `/dashboard`.
- The project list charts each project's log and span counts.
- Charts no longer flash a blue background on first load.

## Logs & Traces

- The latency breakdown reads as durations, and expanding a trace no longer expands the whole row.

## Integrations

- Spans from the renamed monoscope SDKs (`monoscope.http`) are recognized and appear on the overview dashboard.

## Onboarding & Billing

- *Dark mode.* A sun and moon toggle in the sidebar remembers your choice. Charts and code editors follow it.
- *New name.* The app now uses the monoscope name and logo.
- Onboarding skips the old step editor.

## Self-Hosting

- The repository README describes monoscope as an open-source observability platform and has Docker quick-start steps. The Docker image now bundles its static assets and libraries so it runs on its own.
