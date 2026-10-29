---
date: 2024-07-17
updatedDate: 2026-10-29
title: monoscope vs New Relic
description: New Relic charges per GB and per user and samples traces. monoscope keeps every request and response, prices per event and gives its AI SRE the full payload. A sourced comparison.
ogImage: https://raw.githubusercontent.com/monoscope/.github/main/images/compare-og.png
name: New Relic
headline: Every request kept, priced per event, not per GB and per user
lead: New Relic samples traces and leaves request bodies out unless you add them. monoscope keeps every request and response unsampled, and its AI SRE works from them to find the cause and open the fix.
table_title: What you get, and what it costs
checked: October 2026
them:
  - { s: part, t: "Not by default; request parameters are opt-in" }
  - { s: part, t: "Not in public docs" }
  - { s: part, t: "Not by default" }
  - { s: part, t: "New Relic AI, billed in compute units" }
  - { list: ["100 GB/month free", "$0.40/GB ingested after that", "$99–$349 per full platform user", "No host fees"] }
  - { s: no, t: "No" }
  - { s: none }
  - { s: yes, t: "Logs, traces, metrics, errors and more" }
fit_mono:
  - You want every request and response kept, not 10 sampled traces a minute
  - Your bill grows with full-platform seats and you want unlimited team members
  - You want an open-source platform, or your data in your own bucket
fit_them:
  - You want a large catalogue of integrations and a free tier measured in gigabytes
  - Only a few people on your team need full platform access
sources:
  - { t: "Free tier, ingest and user pricing", url: "https://newrelic.com/pricing" }
  - { t: "Request parameters are opt-in (Node.js agent attributes)", url: "https://docs.newrelic.com/docs/apm/agents/nodejs-agent/attributes/nodejs-agent-attributes/" }
  - { t: "Adaptive sampling, 10 traces a minute by default for most agents", url: "https://docs.newrelic.com/docs/distributed-tracing/concepts/how-new-relic-distributed-tracing-works/" }
  - { t: "New Relic AI billed in Advanced Compute units", url: "https://docs.newrelic.com/whats-new/2025/06/whats-new-06-04-nrai/" }
---

```=html
{% render "default/components/compare", this:this %}
```
