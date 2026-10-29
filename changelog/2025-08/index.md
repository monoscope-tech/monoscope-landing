---
title: "August 2025"
date: 2025-08-01
summary: "Session replay, your own S3 bucket, 30-day retention and a rebuilt explorer list."
description: "Session replay, your own S3 bucket, 30-day retention and a rebuilt explorer list."
themes:
  - replay
  - onboarding
  - explorer
  - monitors
  - issues
image: session-replay
image_alt: "The monoscope session replay player, with the playback timeline."
highlights:
  - "Session replay: watch what the customer saw, in a player opened from the explorer."
  - "Bring your own bucket: connect your S3 bucket and keep your data there."
  - "Logs and traces are kept for 30 days, up from 14."
  - "A rebuilt explorer list that scrolls smoothly and shows a row count."
---

## Session Replay

- *Replay player.* Watch recorded browser sessions in a player that opens from the explorer.
- *Scrub previews.* Hover or scrub the timeline to see thumbnails, and resize the player.
- Older recordings play again, and the progress bar shows.

## Logs & Traces

- *Rebuilt list.* Scrolling and expanding traces is smoother. The list shows a skeleton while loading, a row count, and an indicator while requests run.
- *Who and which session.* Event summaries show the user's name, email and session. Filter by session from an event's details.
- *Better summaries.* Rows without a body or operation name fall back to resource attributes, so every row says something useful.
- Errors reported by monoscope's SDK middleware get the error marker too, not only exception events.
- Load more and Load recent no longer fire together or use the wrong time window. Add as column works, and the search button submits the query.

## Monitors & Alerts

- *Create alert panel.* Create alert opens as a resizable panel on the right instead of a form above the results.
- *Removed.* API test collections (the step editor) and the API documentation pages were retired.

## Issues

- Error spans are picked up reliably; a timing gap that could skip some errors is closed.

## Dashboards & Metrics

- In automatic bin mode, chart buckets size themselves to the time range.
- The API catalog is paginated, and the overview time-series widget is fixed.

## Onboarding & Billing

- *Your own bucket.* Connect an S3 bucket from the sidebar to store your data, starting with session replays. You can remove it later.
- *Retention.* Logs and traces are kept for 30 days, up from 14.
- Choosing notification channels during onboarding works again.
