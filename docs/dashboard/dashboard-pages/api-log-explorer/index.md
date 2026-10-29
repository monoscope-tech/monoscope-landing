---
title: Explorer
ogTitle: Explorer - Search Logs, Spans and Requests
date: 2024-04-22
updatedDate: 2026-10-29
menuWeight: 1
---

# Explorer

The Explorer is where you search every log, span and request that your services send. Each HTTP request keeps its headers and its request and response bodies, so you can open the exact request that failed. Open **Explorer** in the sidebar.

```=html
{% render "docs/components/shot", name: "log-explorer", alt: "The Explorer with a query bar, an event-count chart, a latency chart and a list of logs and spans" %}
```

The Explorer has four tabs at the top:

- **Events**: search and chart logs and spans. This page describes it.
- **Live Tail**: watch new logs and spans arrive as they are sent. You can filter by service and environment, and choose **Logs**, **Spans** or **Logs & spans**.
- **Metrics**: see [Metrics and Service Map](/docs/dashboard/dashboard-pages/metrics/).
- **Service Map**: see [Metrics and Service Map](/docs/dashboard/dashboard-pages/metrics/#Service-Map).

Use the **All services** picker and the time range picker at the top right to set the scope. Every query, chart and facet on the page uses this scope.

## Write a Query

Type a query in the query bar and press **Enter**, or click the search button. Queries use monoscope's [query language](/docs/dashboard/dashboard-pages/query-language/), a subset of KQL:

```kql
resource.service.name == "checkout" and attributes.http.response.status_code >= 500
```

If you do not know the field names, write what you want in plain English in the **Ask AI** box, for example `errors from checkout in the last hour`. monoscope fills in the query, the time range and the visualization for you.

The row under the query bar gives you shortcuts:

- **Try:** chips run common queries, such as **Show errors**, **Show 5xx responses** and **Show slow requests (>1s)**.
- **Query library** has three tabs. **Popular** lists queries that your team runs often, **Saved** lists named queries, and **Recent** lists your last queries.
- The save button next to the query bar saves the current query with a name. Saved queries are visible to your team.
- The span filter next to the query bar selects **All spans**, **Root spans** or **Service entry spans**.

## Choose a Visualization

The tabs under the query bar change how results show:

| Tab | What it shows |
|---|---|
| **Logs** | The list of matching events, with an event-count chart and a latency chart above it. |
| **Bar**, **Line** | A chart of the query results over time. |
| **Patterns** | Similar log messages grouped into patterns, with a count for each. |
| **Sessions** | Browser sessions. See [Session Replay](/docs/dashboard/dashboard-pages/session-replay/). |

To chart one series for each service, add a `summarize` step to the query:

```kql
level == "ERROR" | summarize count() by bin_auto(timestamp), resource.service.name
```

Select **Hide timeline** to hide the charts. Select **Create monitor** to turn the current query into a [monitor](/docs/dashboard/dashboard-pages/monitors/).

## Filter with Facets

The panel on the left lists the most common values of useful fields, with a count for each. Groups include **Common Filters** (service, operation name, log level, status code), **HTTP**, **Database**, **Errors & Exceptions**, **User & Session** and **Resource**. Select a value to add it to the query.

In the results, right-click a field value to open more actions: **Filter by**, **Exclude**, **Group by**, **Show patterns for**, **Add column for**, and copy actions. Use **Options** above the list to change the columns, and **Tree** or **List** to show spans nested under their parents or as a flat list.

## Inspect an Event

Click a row to open the event. For an HTTP request, the tabs show the full request and response:

```=html
{% render "docs/components/shot", name: "log-explorer-request", alt: "An open request in the Explorer with tabs for attributes, headers, request body and response body" %}
```

- **Attributes**, **Headers** and **Params**: the OpenTelemetry attributes, the HTTP headers and the query parameters.
- **Req Body** and **Res Body**: the request and response bodies.
- **Stack trace**: shown when the event has an exception.
- **Raw data**: the event as JSON.

The buttons in the event header do these things:

- **View trace** opens the full trace. See [Traces](/docs/dashboard/dashboard-pages/traces/).
- **Copy as curl** copies a `curl` command that sends the same request again.
- **Share link** makes a link that anyone can open without a monoscope account. The link expires after 48 hours.

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p>Request and response bodies are kept only if your SDK sends them. To remove sensitive fields before they leave your servers, configure redaction in your SDK. See the <a href="/docs/sdks/">SDK guides</a>.</p>
</div>
```
