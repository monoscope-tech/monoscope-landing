---
title: Prometheus
ogTitle: Scrape Prometheus Endpoints
date: 2026-10-29
updatedDate: 2026-10-29
menuWeight: 5
---

# Prometheus

monoscope can scrape your Prometheus `/metrics` endpoints on a schedule, with no collector to run. The metrics show in the [metrics explorer](/docs/dashboard/dashboard-pages/metrics/) and can be used in dashboards and monitors. Open **Settings** → **Prometheus**. A project editor can configure Prometheus targets.

## Add a Scrape Target

1. Click **Add scrape target**.
2. Enter a name and the **Metrics URL**, for example `http://service:9090/metrics`. The URL must be reachable from monoscope and return the Prometheus text exposition format.
3. Select the **Scrape interval**: 1 minute, 5 minutes, 15 minutes or 1 hour.
4. If the endpoint needs authentication, enter the **Authorization header**. monoscope sends it with every scrape.
5. Optional: add **Static labels**, for example `env=prod, team=core`. monoscope adds them to every metric from this target.
6. Click **Test connection** to scrape the endpoint once.
7. Save the target.

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p>If your endpoint is on a private network that monoscope cannot reach, run the OpenTelemetry Collector with a Prometheus receiver instead. See the <a href="/docs/sdks/infrastructure/">infrastructure guides</a>.</p>
</div>
```
