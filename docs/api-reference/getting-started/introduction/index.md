---
title: "Introduction"
ogTitle: "API Reference - Introduction"
menuWeight: 10
hideToc: true
---

The Monoscope API gives you programmatic access to your observability data. Query metrics, retrieve telemetry schemas, and manage monitors — all from your own code or scripts.

## Base URL

```
https://api.monoscope.tech
```

All API endpoints are served over HTTPS. HTTP requests will be redirected.

## Request Format

- Send request bodies as JSON with `Content-Type: application/json`
- Query parameters should be URL-encoded
- All timestamps use ISO 8601 format (`2025-01-15T10:30:00Z`)

## Response Format

All responses return JSON. Successful responses return a `2xx` status code. Error responses include a descriptive message:

```json
{
  "error": "Invalid query parameters",
  "code": 422
}
```

## Getting Started

1. [Get your API key](/docs/api-reference/authentication/) from the dashboard
2. Try a request using the **Try it** button on any endpoint page
3. Browse [available endpoints](/docs/api-reference/endpoints/)
