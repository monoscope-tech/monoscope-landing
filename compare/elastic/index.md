---
# Prices checked 2026-10-29 at elastic.co/pricing/serverless-observability ("as low as" floor prices; volume tiers not published).
date: 2026-10-29
updatedDate: 2026-10-29
title: "Elastic and ELK alternative: monoscope vs Elastic"
description: "An ELK alternative that keeps every request and response body, not only the log line, and gives its AI SRE the full payload. A sourced comparison."
ogImage: https://raw.githubusercontent.com/monoscope/.github/main/images/compare-og.png
name: Elastic
name_note: ELK and Elastic Cloud
headline: "An ELK alternative that keeps the request, not only the log line"
lead: "Elastic is fast search over whatever you index, cheap per GB, and free to run yourself. Request bodies are opt-in in its APM agents and response bodies aren’t in the docs. monoscope keeps every request and response, yours and your suppliers’, and its AI SRE investigates with them."
table_title: What you get, and what it costs
checked: October 2026
them:
  - { s: part, t: "Request bodies opt-in, cut at 2 KiB (Node.js agent); response bodies not in docs" }
  - { s: part, t: "Not in public docs" }
  - { s: part, t: "Elastic AI Agent works from indexed data; bodies only if captured" }
  - { s: part, t: "AI Agent and Agent Builder, billed per run plus LLM tokens; fix PRs not in public docs" }
  - { list: ["As low as $0.09/GB ingested (Serverless Complete)", "$0.019/GB-month retained", "LLM tokens and agent runs extra", "Self-managed: free"] }
  - { s: yes, t: "Elastic License 2.0, AGPLv3 or SSPL; self-managed is free" }
  - { s: part, t: "Searchable snapshots in your bucket when self-managed; frozen tier needs an Enterprise license" }
  - { s: yes, t: "Logs, APM, metrics, RUM, synthetics, infrastructure and security" }
fit_mono:
  - You need the request and response body behind a failed call, including calls to third-party APIs
  - You don’t want to run and tune an Elasticsearch cluster to keep your telemetry
  - You want errors, breaking API changes and an AI SRE on the data without building them in Kibana
fit_them:
  - Search over very large log volumes at the lowest price per GB is the main job
  - Your security team uses Elastic as its SIEM and observability shares the cluster
  - You already run self-managed ELK and have the people to operate it
sources:
  - { t: "Observability Serverless prices, floor rates (checked 2026-10-29)", url: "https://www.elastic.co/pricing/serverless-observability" }
  - { t: "Billing dimensions for Observability Serverless", url: "https://www.elastic.co/docs/deploy-manage/cloud-organization/billing/elastic-observability-billing-dimensions" }
  - { t: "Node.js agent capture_body (off by default) and 2 KiB limit", url: "https://www.elastic.co/docs/reference/apm/agents/nodejs/configuration" }
  - { t: "Elastic AI Agent replaces the Observability AI Assistant", url: "https://www.elastic.co/docs/solutions/observability/ai/observability-ai-assistant" }
  - { t: "Licensing: Elastic License 2.0, AGPLv3, SSPL", url: "https://www.elastic.co/pricing/faq/licensing" }
  - { t: "Searchable snapshots on S3, GCS or Azure", url: "https://www.elastic.co/docs/deploy-manage/tools/snapshot-and-restore/searchable-snapshots" }
  - { t: "Coverage", url: "https://www.elastic.co/observability" }
price_title: "What you’d pay at three volumes"
price_unit: Events a month
price_lead: "Same workload on both: logs and spans only, about 2 kB each, kept 30 days. At Elastic’s floor prices, ingest costs less there, and any bodies you capture count toward the GB ingested."
volumes:
  - ["20M (40 GB)", "$29", "From $4.36"]
  - ["100M (200 GB)", "$109", "From $21.80"]
  - ["1B (2 TB)", "$1,009", "From $218"]
price_note: "Elastic Observability Serverless Complete, checked 29 October 2026: ingest “as low as” $0.09 per GB plus $0.019 per GB-month retained. Elastic doesn’t publish its volume tiers, so these are floors; egress, support and AI usage are extra. Self-managed ELK has no license fee but you run the cluster. monoscope: $29 a month includes 20M events, then $1 per million. Bodies don’t add to the count."
gaps_title: "What Elastic doesn’t keep, and monoscope does"
gaps:
  - { icon: align-left, title: "The request and response body", body: "Elastic’s Node.js agent captures request bodies only if you turn it on, and truncates them past 2 KiB. monoscope’s SDKs keep headers, request body and response body on the span, and bodies don’t add to the price." }
  - { icon: link, title: "Calls to your suppliers", body: "Outgoing calls to payment, shipping or auth APIs are kept with their bodies, linked to the incoming request, and checked for breaking changes." }
  - { icon: zap, title: "An AI that reads both", body: "The AI SRE investigates with the failing request and response in front of it, answers in Slack and reviews pull requests before merge." }
steps_title: "Move from Elastic in three steps"
steps:
  - { title: "Send OpenTelemetry to monoscope", body: "If you ship logs with an OpenTelemetry Collector, add a monoscope exporter next to the Elastic one. Services on Elastic APM agents move to OpenTelemetry or the monoscope SDK." }
  - { title: "Add the SDK where you want bodies", body: "OpenTelemetry records the URL and status, not the body. The monoscope SDK for your framework keeps request and response bodies once you switch body capture on, plus outgoing calls." }
  - { title: "Compare, then switch off the old exporter", body: "Run both for a week or two. When monoscope catches what you need, stop sending to Elastic. An engineer from our team can help." }
steps_link: /docs/sdks/infrastructure/
steps_link_label: "Collector setup guide"
code_label: "otel-collector.yaml"
code: |
  exporters:
    otlp_grpc/monoscope:
      endpoint: "otelcol.monoscope.tech:4317"
      tls:
        insecure: true
      headers:
        x-api-key: YOUR_API_KEY

  service:
    pipelines:
      traces:
        # keep your current exporter in the list
        exporters: [otlp_grpc/monoscope]
      logs:
        exporters: [otlp_grpc/monoscope]
---

```=html
{% render "default/components/compare", this:this %}
```
