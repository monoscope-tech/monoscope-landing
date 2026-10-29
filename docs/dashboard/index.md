---
title: Product Guide
ogTitle: monoscope Product Guide
date: 2024-04-22
updatedDate: 2026-10-29
faLogo: chart-line
menuWeight: 4
pageFullWidth: true
hideToc: true
pages:
  - title: Explorer
    slug: /docs/dashboard/dashboard-pages/api-log-explorer/
    icon: compass
    description: Search logs, spans and full requests. Live tail.
  - title: Traces
    slug: /docs/dashboard/dashboard-pages/traces/
    icon: bars-staggered
    description: Follow one request through every service.
  - title: Issues
    slug: /docs/dashboard/dashboard-pages/issues/
    icon: bug
    description: Errors, API changes and alerts, grouped and triaged.
  - title: Dashboards
    slug: /docs/dashboard/dashboard-pages/dashboard/
    icon: table-cells-large
    description: Built-in dashboards, templates and dashboards as YAML.
  - title: Monitors
    slug: /docs/dashboard/dashboard-pages/monitors/
    icon: bell
    description: Query alerts, uptime checks and cron monitors.
  - title: Metrics and Service Map
    slug: /docs/dashboard/dashboard-pages/metrics/
    icon: chart-line
    description: Every metric you send, and how your services connect.
  - title: Session Replay and RUM
    slug: /docs/dashboard/dashboard-pages/session-replay/
    icon: circle-play
    description: Web vitals, browser errors and session playback.
  - title: API Catalog
    slug: /docs/dashboard/dashboard-pages/api-catalog/
    icon: arrow-right-arrow-left
    description: Every endpoint you serve and call, with learned OpenAPI docs.
  - title: Infrastructure
    slug: /docs/dashboard/dashboard-pages/infrastructure/
    icon: server
    description: Hosts, containers, images and Kubernetes.
  - title: Reports
    slug: /docs/dashboard/dashboard-pages/reports/
    icon: file-lines
    description: Weekly and live summaries of your project.
  - title: Query Language
    slug: /docs/dashboard/dashboard-pages/query-language/
    icon: magnifying-glass
    description: Operators, aggregations and metric functions.
settings:
  - title: Project
    slug: /docs/dashboard/settings-pages/project-settings/
    icon: gear
    description: Name, time zone, alerts and reports.
  - title: API Keys
    slug: /docs/dashboard/settings-pages/api-keys/
    icon: key
    description: Create and revoke the keys your SDKs use.
  - title: Team
    slug: /docs/dashboard/settings-pages/manage-members/
    icon: user-plus
    description: Members, roles and teams that receive alerts.
  - title: Integrations
    slug: /docs/dashboard/settings-pages/integrations/
    icon: plug
    description: Email, Slack, Discord, WhatsApp and PagerDuty.
  - title: Prometheus
    slug: /docs/dashboard/settings-pages/prometheus/
    icon: fire
    description: Scrape metrics from your /metrics endpoints.
  - title: Storage
    slug: /docs/dashboard/settings-pages/s3-storage/
    icon: bucket
    description: Keep all project data in your own S3 bucket.
---

# Product Guide

These guides describe each page of the monoscope app: what it shows and how to use it. To send data to monoscope first, see [Getting Started](/docs/onboarding/). To work with monoscope from a terminal or a coding agent, see [AI](/docs/ai/).

## Pages

```=html
<div class="docs-grid not-prose">
{% for page in this.frontmatter.pages %}
  <a href="{{ page.slug }}" class="docs-grid__cell">
    <p><i class="fa-solid fa-{{ page.icon }}" aria-hidden="true"></i><strong>{{ page.title }}</strong></p>
    <span>{{ page.description }}</span>
  </a>
{% endfor %}
</div>
```

## Settings

```=html
<div class="docs-grid not-prose">
{% for page in this.frontmatter.settings %}
  <a href="{{ page.slug }}" class="docs-grid__cell">
    <p><i class="fa-solid fa-{{ page.icon }}" aria-hidden="true"></i><strong>{{ page.title }}</strong></p>
    <span>{{ page.description }}</span>
  </a>
{% endfor %}
</div>
```
