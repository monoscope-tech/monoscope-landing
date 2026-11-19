---
title: Introduction
ogTitle: Monoscope API Introduction
updatedDate: 2026-11-19
menuWeight: 10
---

# Monoscope API

Use the REST API to query events and metrics, inspect schemas and facets, and manage resources such as issues, monitors and dashboards.

## Base URL

```text
https://api.monoscope.tech/api/v1
```

Authenticate with a project API key and `X-Project-Id`. See [Authentication](/docs/api-reference/getting-started/authentication/).

## Search Recent Events

```sh
curl --get 'https://api.monoscope.tech/api/v1/events' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID' \
  --data-urlencode 'query=errors == true' \
  --data-urlencode 'since=1h' \
  --data-urlencode 'limit=20'
```

`--data-urlencode` preserves spaces and query operators. Use the same [KQL dialect](/docs/dashboard/dashboard-pages/query-language/) as Explorer. Read the event endpoint's response schema before building a client around returned columns and pagination fields.

## Select an Interface

- [REST endpoints](/docs/api-reference/endpoints/): HTTP requests from applications and scripts.
- [CLI](/docs/ai/cli/): terminal investigations, shell automation and resource configuration.
- [MCP](/docs/ai/mcp/): tools for an MCP-compatible agent.

Download the [OpenAPI specification](/assets/api/openapi.json) for the documented schema. The application also publishes its current schema at [the live OpenAPI endpoint](https://app.monoscope.tech/api/v1/openapi.json).
