---
title: Query Language
date: 2026-10-01
updatedDate: 2026-10-01
menuWeight: 8
---

# Query Language Reference

Monoscope uses a subset of the Kusto Query Language (KQL) to search and aggregate logs, traces, and metrics. The same dialect runs in the Log Explorer editor, dashboard widgets, alert monitors, the [CLI](/docs/ai/cli/commands/), and the [MCP server](/docs/ai/mcp/).

A query is an optional data source, a filter expression, and zero or more pipe operators. Each pipe (`|`) passes its output to the next step.

```
[source] [filter_expression] [| pipe_operator]...
```

```
spans
| where attributes.http.request.method == "GET" and attributes.http.response.status_code >= 400
| summarize count() by attributes.http.response.status_code
| sort by count_ desc
| take 10
```

## Data Sources

| Source | Aliases | Description |
|---|---|---|
| Spans and logs | `spans`, `otlp_logs_and_spans` | OpenTelemetry logs and spans. This is the default when no source is given. |
| Metrics | `metrics`, `telemetry.metrics` | Time-series metric points (`metric_name`, `value`, `attributes.*`, `resource.*`). |

## Filter Operators

| Operator | Description | Example |
|---|---|---|
| `==`, `!=` | Equal, not equal | `status_code != 200` |
| `>`, `<`, `>=`, `<=` | Numeric comparison | `duration > 1000` |
| `has`, `!has` | Contains a whole word (case-insensitive) | `body has "timeout"` |
| `contains`, `!contains` | Contains a substring (case-insensitive) | `attributes.url.path contains "/api"` |
| `startswith`, `!startswith` | Starts with a string | `resource.service.name startswith "payment-"` |
| `endswith`, `!endswith` | Ends with a string | `attributes.url.path endswith ".json"` |
| `matches regex` | Quoted regex, case-sensitive | `name matches regex "^GET /Cart$"` |
| `matches`, `=~` | Slash regex, case-insensitive | `body =~ /^ERROR:.*/` |
| `in`, `!in` | Value is (not) in a list | `attributes.http.request.method in ("GET", "POST")` |
| `has_any`, `has_all` | Contains any / all of the words | `body has_any ["error", "critical"]` |
| `and`, `or`, `()` | Logical operators and grouping | `(status_code >= 500) or (duration > 5000)` |

Precedence is `()`, then `and`, then `or`. Use `==` for equality, not Lucene's `:`.

## Pipe Operators

| Operator | Syntax | Description |
|---|---|---|
| `where` | `where condition` | Filter rows. |
| `summarize` | `summarize agg [, agg...] [by field, ...]` | Aggregate, optionally grouped. |
| `extend` | `extend name = expr [, ...]` | Add computed columns, keep existing ones. |
| `project` | `project name = expr [, ...]` | Keep only the listed columns, optionally renamed. |
| `sort by` / `order by` | `sort by field desc` | Order results (`asc` or `desc`). |
| `take` / `limit` | `take N` | Limit the number of rows. |

```
| summarize avg(duration), max(duration) by resource.service.name, name
| extend duration_ms = round(duration / 1e6, 2)
| project service = resource.service.name, attributes.http.response.status_code
```

## Aggregation Functions

### Basic Aggregations

| Function | Description |
|---|---|
| `count()`, `count(field)` | Number of rows, or of non-null values |
| `sum(field)`, `avg(field)`, `min(field)`, `max(field)` | Sum, mean, minimum, maximum |
| `median(field)`, `stdev(field)` | Median, standard deviation |
| `range(field)` | `max - min` |
| `countif(condition)` | Rows where the condition is true |
| `dcount(field [, accuracy])` | Approximate distinct count (accuracy hint 0-4) |

### Percentiles

| Function | Description |
|---|---|
| `p50(field)`, `p75`, `p90`, `p95`, `p99`, `p100` | Fixed percentiles |
| `percentile(field, N)` | Nth percentile |
| `percentiles(field, N1, N2, ...)` | Several percentiles at once |

Arithmetic works inside the argument, for example `percentiles(duration / 1e6, 50, 95, 99)` for milliseconds. Percentiles are approximate.

### Counter and Gauge Functions

Metric points need different aggregations depending on the metric type. These functions are for the `metrics` source.

| Function | Use it for | Result per time bin |
|---|---|---|
| `rate(value)` | Counters | Per-second rate |
| `increase(value)` | Counters | How many in the bin |
| `last(value)` | Gauges | The last value in the bin |
| `rateif(value, predicate)` | Counters | `rate(value)` of only the series that match |
| `increaseif(value, predicate)` | Counters | `increase(value)` of only the series that match |
| `lastif(value, predicate)` | Gauges | `last(value)` of only the series that match |

**`rate(value)`** is a counter-aware per-second rate.

- It is calculated per series first. A series is one metric name with one full set of attributes. The per-series rates are then summed into the `by` groups.
- For cumulative counters, it takes the difference between consecutive points and divides by the elapsed seconds. If the value drops, the counter was reset (for example, a process restart), and the new value counts as the difference. This matches Prometheus.
- For delta-temporality counters, it is the sum of the deltas divided by the bin width in seconds.
- It is correct at any time range, including when a bin holds only one point.
- It has no meaning for gauges.

**`increase(value)`** uses the same per-series, reset-aware differences, summed per bin. It answers "how many in this interval". A stat tile over `increase(value)` shows the total for the selected time window.

**`last(value)`** returns the last value in each bin. Use it for gauges such as memory in bytes, queue depth, or pressure percentages. A stat tile over `last(value)` shows the latest value, not a sum of bins.

**`rateif`, `increaseif` and `lastif`** take a predicate that selects which series are added together for that one aggregate. Each series still calculates its differences from its own points, so two of these aggregates can divide each other. Write the predicate on columns that are the same for every point of a series: `metric_name`, `attributes.*` or `resource.*`. Do not filter on `value` or `timestamp` in the predicate. Keep the `where` wide enough to include every series that the aggregates use. A division by 0 gives 0.

```
// Rollup hit rate in percent: hits / (hits + misses)
metrics
| where metric_name in ("rollup.hits", "rollup.misses")
| summarize hits = rateif(value, metric_name == "rollup.hits"), total = rate(value) by bin_auto(timestamp)
| extend hit_pct = 100.0 * hits / total

// The same ratio as one expression
metrics
| where metric_name in ("rollup.hits", "rollup.misses")
| summarize 100.0 * rateif(value, metric_name == "rollup.hits") / rate(value) by bin_auto(timestamp)

// Memory in use as a percent of the limit (two gauges)
metrics
| where metric_name in ("memory.used_bytes", "memory.limit_bytes")
| summarize 100.0 * lastif(value, metric_name == "memory.used_bytes") / lastif(value, metric_name == "memory.limit_bytes") by bin_auto(timestamp)
```

An `extend` after a `summarize` calculates from the named aggregates. The calculated column is the series that a time-series chart shows. A monitor alerts on the largest of all aggregates, so write a ratio for a monitor as the only aggregate (the one-expression form).

Choose the aggregation from the OpenTelemetry metric type:

| Metric type | Use | Do not use |
|---|---|---|
| Counter (OTel Sum, monotonic) | `rate(value)`, `increase(value)` | `sum(value)` or `range(value)` over the raw cumulative values |
| Gauge | `last(value)`, `avg(value)`, `max(value)` | `rate`, `increase` |
| A ratio of counters or of gauges | `rateif(value, …) / rate(value)`, `lastif(value, …) / lastif(value, …)` | `sum(value)` ratios of cumulative values |
| Histogram | `percentile`, `percentiles`, `p50` ... `p99` | |

```
// Requests per second
metrics | where metric_name == "http.server.request.count" | summarize rate(value) by bin_auto(timestamp)

// Requests per second, one series per route and status code
metrics | where metric_name == "http.server.request.count" | summarize rate(value) by bin_auto(timestamp), attributes.http.route, attributes.http.response.status_code

// Requests per interval
metrics | where metric_name == "http.server.request.count" | summarize increase(value) by bin_auto(timestamp)

// Current memory use
metrics | where metric_name == "process.memory.usage" | summarize last(value) by bin_auto(timestamp)
```

## Scalar Functions

| Function | Description | Example |
|---|---|---|
| `strcat(s1, s2, ...)` | Concatenate strings | `strcat(attributes.http.request.method, " ", attributes.url.path)` |
| `coalesce(v1, v2, ...)` | First non-null value | `coalesce(user_id, "anonymous")` |
| `iff(cond, then, else)` | If-then-else | `iff(status_code >= 400, "error", "ok")` |
| `case(p1, v1, ..., else)` | Multi-branch conditional | `case(status_code >= 500, "5xx", status_code >= 400, "4xx", "ok")` |
| `tofloat`, `todouble` | Convert to float | `tofloat(errors) / tofloat(total)` |
| `toint`, `tolong` | Convert to integer | `toint(duration / 1e6)` |
| `tostring` | Convert to text | `tostring(status_code)` |
| `round(value, decimals)` | Round to N decimal places | `round(error_rate, 2)` |

## Time Functions

| Function | Description | Example |
|---|---|---|
| `now()` | Current time | `timestamp <= now()` |
| `ago(span)` | Time relative to now | `timestamp >= ago(1h)` |
| `bin(timestamp, span)` | Fixed-width time buckets | `summarize count() by bin(timestamp, 5m)` |
| `bin_auto(timestamp)` | Bucket width picked from the query time range | `summarize count() by bin_auto(timestamp)` |

Time spans use `ns`, `us`, `ms`, `s`, `m`, `h`, `d`, `w`, for example `ago(7d)`.

`bin_auto` picks these widths:

| Time range | Bin width |
|---|---|
| Up to 2 minutes | 1 second |
| 2 to 5 minutes | 5 seconds |
| 5 to 15 minutes | 10 seconds |
| 15 minutes to 1 hour | 30 seconds |
| 1 to 6 hours | 1 minute |
| 6 to 14 hours | 5 minutes |
| 14 to 48 hours | 10 minutes |
| 2 to 7 days | 1 hour |
| 7 to 30 days | 6 hours |
| More than 30 days | 1 day |

In a time-series query, every column after the time bin in `by` is a grouping key: `summarize ... by bin_auto(timestamp), a, b` draws one series for each combination of `a` and `b`.

## Field References

| Form | Example |
|---|---|
| Top-level field | `status_code >= 400` |
| Nested JSON | `request_body.user.id == "12345"` |
| Array index | `errors[0].message has "timeout"` |
| Any array element | `errors[*].type == "ValidationError"` |
| OpenTelemetry attribute | `attributes.http.request.method == "POST"` |
| Resource attribute | `resource.service.name == "payment-service"` |
| Trace context | `context.trace_id == "abc123def456"` |

Values can be strings (`"GET"` or `'GET'`), numbers, `true`/`false`, `null`, lists, durations (`5m`), and regexes (`/pattern/`).

## Named Aggregations

Name a result with `alias=function(...)`. Without an alias, the column gets a default name: `count()` is `count_`, `countif(...)` is `countif_`, and other functions use `function_field`, for example `avg_duration` or `p95_duration`.

```
| summarize total=count(), errors=countif(status_code >= 400), p99_latency=p99(duration) by resource.service.name
```

## Examples

```
// Error rate by service over the last day
timestamp >= ago(24h)
| summarize total=count(), errors=countif(status_code >= 400), error_rate=round(countif(status_code >= 400) * 100.0 / count(), 2) by resource.service.name
| sort by error_rate desc

// Top error messages
status_code >= 500
| summarize count() by body
| sort by count_ desc
| take 10

// Latency percentiles in milliseconds over time
timestamp >= ago(6h)
| summarize percentiles(duration / 1e6, 50, 90, 95, 99) by bin(timestamp, 5m)

// Unique users per day
timestamp >= ago(7d)
| summarize unique_users=dcount(user_id) by bin(timestamp, 1d)

// Request rate per route
metrics
| where metric_name == "http.server.request.count"
| summarize rate(value) by bin_auto(timestamp), attributes.http.route
```

## Limitations

- No `join`, `union`, subqueries, `let`, `mv-expand`, or `render`. Visualization is chosen in the widget, not in the query.
- Comparisons with a missing field return false. Use `coalesce(field, default)` for defaults. Aggregations skip null values.
- Strings are not converted to numbers. Write `status_code == 200`, not `status_code == "200"`.
- Filter on a time range first, prefer `has` to `contains`, and use `take` while you explore.
