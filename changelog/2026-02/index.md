---
title: "February 2026"
date: 2026-02-01
summary: "Log patterns that catch spikes and drops, rebuilt error tracking, PagerDuty, and chart images in chat replies."
themes:
  - issues
  - monitors
  - integrations
  - ai
  - explorer
  - replay
  - selfhost
highlights:
  - "monoscope groups logs into patterns, learns each one's normal volume, and opens an issue when a new pattern appears or a pattern spikes or drops."
  - "Error tracking was rebuilt: assign, resolve and subscribe to errors, with repeat alerts as replies in one Slack or Discord thread."
  - "PagerDuty is a notification channel, and you can send a test notification to check every channel."
  - "Ask the bots in Slack, Discord or WhatsApp and get a chart image back for the time range you asked about."
---

## Issues

- *Log patterns.* Logs are grouped into patterns, and each pattern learns its normal volume. A new pattern, a spike or a drop opens an issue with an AI-written title and description.
- *Error tracking.* Errors are grouped into error patterns with spike and regression detection. Assign, resolve, and subscribe or unsubscribe from the error page.
- *Threaded alerts.* Repeat alerts for the same error post as replies in one Slack or Discord thread.

## Monitors & Alerts

- *Test notifications.* Send a test from the integrations page to check that each channel works.
- *@everyone.* A built-in team that includes every project member and integration.
- Alert emails were redesigned. Every subject starts with `[···]`, and tests are marked `[Test]`.

## Integrations

- *PagerDuty.* Add integration keys at project or team level.
- Slack notifications use the channel and bot token from your install, which fixes messages that didn't reach their channel.

## AI SRE

- *Chart replies.* The Slack, Discord and WhatsApp bots reply with chart images for the time range you asked about, and explain what went wrong when a question fails.
- *Reads the numbers.* When the AI explains a chart, it runs the query and comments on the actual values and trends.
- The AI chat answers with more chart types (distribution, pie, top list, table, stat, heatmap) and keeps longer histories.
- The Slack command is now `/monoscope-here`.

## Logs & Traces

- AI search sets the time picker to the range you described.
- *View patterns.* A new option in field menus jumps to the patterns for that field.
- Download any explorer chart as a PNG.
- The explorer runs its queries in parallel, and spans no longer appear twice across trace roots.

## Session Replay

- Recordings are merged and ordered more reliably, so playback holds together.

## Self-Hosting

- Send email over any SMTP server. Postmark is no longer required.
