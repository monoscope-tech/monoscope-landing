---
title: Dashboards
ogTitle: Dashboards - Charts, Templates and Dashboards as Code
date: 2024-04-22
updatedDate: 2026-11-19
menuWeight: 4
---

# Dashboards

A dashboard is a page of charts, tables and stats that run queries on your logs, spans and metrics. Each project starts with built-in dashboards, and you can add your own. Open **Dashboards** in the sidebar.

```=html
{% render "docs/components/shot", name: "dashboard-overview", alt: "The Overview dashboard with traffic, P95 latency, error rate and a services health table" %}
```

## Built-in Dashboards

- **Overview** shows the golden signals for the project: traffic, P95 latency, error rate and Apdex score. It also has a **Services Health** table and tabs for **Service**, **Logs**, **Databases** and **Infra**.
- **Endpoint Analytics** shows traffic, latency and status codes for each endpoint.
- **Real User Monitoring** shows page views, browser errors, web vitals and sessions from the [browser SDK](/docs/sdks/Javascript/browser/).

```=html
{% render "docs/components/shot", name: "dashboard-service", alt: "A service dashboard with traffic, latency and status code charts" %}
```

Use the filters at the top of a dashboard, such as **Service**, to narrow every widget at the same time. Click **Save view** to keep a set of filters.

Built-in dashboards are read-only and track the shipped templates. Select **Duplicate to edit** to create a dashboard you can change.

## Create a Dashboard

1. On the **Dashboards** page, click **New Dashboard**.
2. Select **Find a template** to start from a template, or **Blank dashboard** to start empty.
3. Click **Add widget**. Write a [query](/docs/dashboard/dashboard-pages/query-language/), select the widget type, and give the widget a name.

Templates include PostgreSQL, MySQL, Redis, RabbitMQ, Elasticsearch, Kubernetes, Docker, Nginx, Apache, HAProxy, the OpenTelemetry Collector, host metrics and more.

Widget types include time series (bars, lines or a stat with a chart), stat, table, top list, distribution, heatmap, pie chart, tree map, funnel, geo map, flame graph, service map, logs and an issues list. A **group** widget holds other widgets.

## Choose How a Metric Stat Summarizes Time

For a `timeseries_stat` widget, match `summarize_by` to the query:

| Query aggregate | `summarize_by` | Result |
|---|---|---|
| `increase(value)` | `sum` | Total increase over the selected range. |
| `rate(value)` | `mean` or `max` | Average or peak rate over the selected range. |
| `last(value)` | `last` | Latest value across the time bins. |

Do not apply `summarize_by: rate` to a query that already uses `rate(value)`. That divides the rate again. See the [metric function reference](/docs/dashboard/dashboard-pages/query-language/).

## Alert from a Widget

Each widget can have a monitor. Open the widget menu and click **Set up a monitor**. The monitor uses the widget query. Select **Show threshold lines** to draw the alert and warning thresholds on the chart. See [Monitors](/docs/dashboard/dashboard-pages/monitors/).

## Dashboards as Code

Custom dashboards have a YAML representation. Click **Edit YAML** to edit it in the browser, or use **Export** and **Import** to move a dashboard between projects.

```yaml
title: Checkout
refresh_interval: 60s
widgets:
  - type: timeseries
    title: Requests by status code
    query: resource.service.name == "checkout" | summarize count(*) by bin_auto(timestamp), attributes.http.response.status_code
    unit: reqs
    layout: { w: 6, h: 4 }
  - type: stat
    title: Errors
    query: resource.service.name == "checkout" and level == "ERROR" | summarize count(*)
    layout: { w: 3, h: 2 }
```

A dashboard can also have `tabs` and `variables`. A variable adds a filter at the top of the dashboard, and widget queries can use its value.

To keep dashboards in Git, open **Repositories**, select a repository and configure **Configuration sync**. Assign each custom dashboard to the repository that owns its file. Each repository keeps its own branch, folder and sync state. monoscope then manages the dashboards in a folder of the repository through pull requests. Coding agents can also create and change dashboards with the [CLI](/docs/ai/cli/) or the [MCP server](/docs/ai/mcp/) (`apply_dashboard`).
