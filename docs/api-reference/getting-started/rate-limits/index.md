---
title: Errors and Retries
ogTitle: Monoscope API Errors, Query Limits and Retries
updatedDate: 2026-11-19
menuWeight: 30
---

# Errors and Retries

Read the HTTP status and response body before retrying a request. The API's error responses include an `error` object with a machine-readable `code`. The operation's reference page lists its documented response statuses and schema.

## Choose the Next Action

| Response | Action |
|---|---|
| `400` | Inspect the error code, query syntax, fields and parameter values. Correct the request before retrying. |
| `401` | Check the project API key and `X-Project-Id` header. See [Authentication](/docs/api-reference/getting-started/authentication/). |
| `403` | Inspect the project scope or operation permission named in the response. |
| `404` | Check the resource ID and whether it belongs to this project. |
| `429`, if returned by the service or gateway | Respect `Retry-After` when present. Otherwise use a bounded backoff with jitter. |
| `502`, `503` or `504` | For read requests, retry with a bounded backoff. Narrow expensive query windows if failures continue. |

Response headers can depend on the deployment and gateway. Do not assume that every response includes `X-RateLimit-*` headers or a fixed per-plan request allowance.

## Keep Queries Bounded

Use `since` for a relative window, or `from` and `to` for an absolute period. Start with a small event limit. Use the pagination information returned by the endpoint rather than repeatedly fetching the same window.

For investigations across a long period, split the period into smaller windows. Keep the query and grouping consistent across windows.

See the [query cookbook](/docs/dashboard/dashboard-pages/query-cookbook/) for filters, aggregates and units.

## Retry Writes Carefully

A timeout does not establish whether the server applied a write. Before retrying a create, update or delete operation, inspect the resource state and the operation's behavior. Do not blindly retry every failed write.
