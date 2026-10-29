---
date: 2024-07-17
updatedDate: 2026-10-29
title: monoscope vs Baselime (Cloudflare Workers Observability)
description: Baselime joined Cloudflare in 2024 and became Workers Observability. Here is how monoscope compares for teams that run beyond Cloudflare Workers. A sourced comparison.
ogImage: https://raw.githubusercontent.com/monoscope/.github/main/images/compare-og.png
name: Baselime
name_note: now Cloudflare Workers Observability
headline: Baselime is now part of Cloudflare. Here’s how monoscope compares.
lead: Cloudflare acquired Baselime in 2024, and its features now live in Workers Observability, built for apps on Cloudflare Workers. monoscope works with any stack through OpenTelemetry, keeps every request and response, and its AI SRE opens the fix.
table_title: What you get, and what it costs
checked: October 2026
them:
  - { s: none }
  - { s: part, t: "Not in public docs" }
  - { s: none }
  - { s: none }
  - { list: ["Free: 200k log events a day, 3-day retention", "Paid: 20M events a month, then $0.60/M", "7-day retention", "New pricing from Dec 1, 2026"] }
  - { s: none }
  - { s: none }
  - { s: part, t: "Logs and traces for Cloudflare Workers" }
fit_mono:
  - Your services run on servers, containers or other clouds, not only on Workers
  - You need request and response bodies kept for 30 days or more
  - You want an AI SRE that investigates and opens pull requests
fit_them:
  - Your whole app runs on Cloudflare Workers and you want observability in the same dashboard
  - A few days of log retention is enough for you
sources:
  - { t: "Cloudflare acquires Baselime (April 2024)", url: "https://www.cloudflare.com/press/press-releases/2024/cloudflare-enters-observability-market-with-acquisition-baselime/" }
  - { t: "Workers Observability", url: "https://developers.cloudflare.com/workers/observability/" }
  - { t: "Workers Logs pricing and retention", url: "https://developers.cloudflare.com/workers/observability/logs/workers-logs/" }
---

```=html
{% render "default/components/compare", this:this %}
```
