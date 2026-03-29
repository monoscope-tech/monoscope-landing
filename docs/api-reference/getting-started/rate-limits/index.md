---
title: "Rate Limits"
ogTitle: "API Reference - Rate Limits"
menuWeight: 30
hideToc: true
---

The Monoscope API applies rate limits to ensure fair usage and platform stability.

## Default Limits

| Tier       | Requests per minute | Burst |
|------------|--------------------:|------:|
| Free       | 60                  | 10    |
| Pro        | 300                 | 50    |
| Enterprise | Custom              | Custom|

## Rate Limit Headers

Every API response includes rate limit information:

```
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 297
X-RateLimit-Reset: 1705312800
```

## Handling Rate Limits

When you exceed the limit, the API returns `429 Too Many Requests`. Best practices:

- **Check headers** — monitor `X-RateLimit-Remaining` proactively
- **Backoff and retry** — wait until `X-RateLimit-Reset` (Unix timestamp) before retrying
- **Batch where possible** — use broader time ranges instead of many narrow queries
