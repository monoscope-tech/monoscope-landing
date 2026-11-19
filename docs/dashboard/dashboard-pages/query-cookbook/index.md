---
title: Query Cookbook
ogTitle: KQL Recipes for Production Investigations
date: 2026-11-19
updatedDate: 2026-11-19
menuWeight: 12
---

# Query Cookbook

Use these recipes in **Explorer**, dashboard widgets or CLI searches. Replace service names, routes and IDs with values from your project. See the [language reference](/docs/dashboard/dashboard-pages/query-language/) for syntax and limitations.

Start with a bounded time range, such as the last hour. The app's time, service and environment selectors also restrict the result. If a query returns no rows, widen that scope before concluding that the event never occurred.

## Discover Your Data

Find active services:

```kql
| summarize events = count() by resource.service.name
| sort by events desc
```

For HTTP investigations, inspect the available span kinds, routes and methods:

```kql
resource.service.name == "checkout-api"
| summarize events = count() by kind, attributes.http.route, attributes.http.request.method
| sort by events desc
| take 30
```

A single request can produce many spans and logs. To count inbound HTTP requests, filter to server spans with an HTTP method. Do not count the entire trace as separate requests.

## Find an Error Message

```kql
"deadlock" and resource.service.name == "checkout-api"
| take 20
```

Quoted free text searches `body`, `status_message` and `name`. This can find a database error stored on a span's status rather than its log body.

For all events marked as errors:

```kql
resource.service.name == "checkout-api" and errors == true
| take 20
```

Open an event and select **View trace** to inspect its surrounding calls.

## Measure HTTP Failures Without Losing the Denominator

```kql
resource.service.name == "checkout-api"
and kind == "server"
and isnotnull(attributes.http.request.method)
| summarize requests = count(), failures = countif(attributes.http.response.status_code >= 500) by bin(timestamp, 5m)
| extend failure_pct = 100.0 * failures / requests
```

This query includes successful requests in `requests`. Filtering to 5xx responses before `summarize` would make the percentage 100%.

Missing HTTP status attributes do not count as 5xx. Inspect error spans separately if the service fails before it sends a response.

### Use the Percentage in a Monitor

A monitor compares aggregate values with its thresholds. Return only the percentage so that the request count cannot trigger the percentage threshold:

```kql
resource.service.name == "checkout-api"
and kind == "server"
and isnotnull(attributes.http.request.method)
| summarize 100.0 * countif(attributes.http.response.status_code >= 500) / count() by bin_auto(timestamp)
```

Select **Create monitor**, then set the evaluation window, schedule and percentage threshold. See [Monitors](/docs/dashboard/dashboard-pages/monitors/).

## Find Slow Routes

```kql
resource.service.name == "checkout-api"
and kind == "server"
and isnotnull(attributes.http.request.method)
| summarize requests = count(), p95_ms = percentile(duration / 1000000, 95) by attributes.http.route
| where requests > 100
| sort by p95_ms desc
| take 10
```

The minimum request count removes low-volume groups. Percentiles are approximate. A missing route produces an unnamed group. Inspect the instrumentation rather than treating that group as one endpoint.

To open individual slow requests:

```kql
resource.service.name == "checkout-api" and kind == "server" and duration > 1s
| sort by duration desc
| take 20
```

## Trace One User or Tenant

These queries require [identity attributes from your SDK](/docs/sdks/data-capture/):

```kql
attributes.user.id == "user-123"
| take 50
```

```kql
attributes.tenant.id == "acme" and errors == true
| summarize events = count() by resource.service.name, name
| sort by events desc
```

To follow a known trace across services, remove the service filter:

```kql
context.trace_id == "REPLACE_WITH_TRACE_ID"
```

To find events tagged with a browser or backend session:

```kql
attributes.session.id == "REPLACE_WITH_SESSION_ID"
| take 100
```

Identity on an incoming request does not automatically copy to every child span. Open the request's trace to investigate child calls.

## Inspect Captured Payloads

With body capture enabled, find requests whose JSON contains a particular order:

```kql
request_body.order.id == "order-123"
| take 20
```

The path depends on your payload. Open **Req Body** or **Raw data** first. A redacted or uncaptured field cannot match its original value. See [Data capture](/docs/sdks/data-capture/).

## Query Metrics by Type

First discover metric names:

```kql
metrics
| summarize points = count() by metric_name
| sort by points desc
| take 30
```

A metric name is an exact match. Replace the names in these examples with metrics your project emits.

### Counter: Requests per Second

```kql
metrics
| where metric_name == "http.server.request.count"
| summarize rate(value) by bin_auto(timestamp), resource.service.name
```

`rate` computes increases per series before combining them. Use `increase(value)` for the number of requests in each bin. Do not add raw cumulative counter values with `sum(value)`.

### Gauge: Current Memory by Service

```kql
metrics
| where metric_name == "process.memory.usage"
| summarize last(value) by bin_auto(timestamp), resource.service.name
```

`last` adds the newest point from each series within the group. For multiple processes, this shows their combined memory. Add resource attributes to `by` to separate processes.

### Counter Ratio: Cache Hit Percentage

```kql
metrics
| where metric_name in ("cache.hits", "cache.misses")
| summarize 100.0 * rateif(value, metric_name == "cache.hits") / rate(value) by bin_auto(timestamp)
```

Keep both metric names in the input. Use filtered-series predicates on stable labels, such as `metric_name` or `attributes.*`. Predicates on `value` or `timestamp` break the counter calculation.

## Compare Before and After a Release

Use the same service filter, query and bin width for each period. Set absolute time ranges around the deployment. Compare request volume, HTTP failure percentage and latency together.

A change in traffic mix can change latency without a code regression. Group by route or tenant to investigate that possibility. A temporal correlation alone does not establish a cause.

Save a useful query in the **Query library**, add it to a dashboard or give it to your [coding agent](/docs/ai/cli/).
