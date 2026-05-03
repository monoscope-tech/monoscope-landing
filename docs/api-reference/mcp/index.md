---
title: MCP Server
date: 2026-05-03
updatedDate: 2026-05-03
faLogo: plug
menuWeight: 30
hideToc: true
---

# MCP Server

The Monoscope REST API is also exposed as a
[Model Context Protocol](https://modelcontextprotocol.io) server at
`https://api.monoscope.tech/api/v1/mcp`. About 50 tools auto-derive from
the same endpoints documented in this section — no separate auth, no
extra service to deploy, no parallel API to learn. New REST endpoints
become MCP tools automatically.

```=html
<div class="callout callout-tip">
  <i class="fa-solid fa-arrow-right"></i>
  <p><strong>The full docs live in the AI section:</strong> <a href="/docs/ai/mcp/">/docs/ai/mcp/</a> covers the tool catalog, client setup (Claude Code, Cursor, Claude Desktop, OpenAI Agents), workflow tools (<code>analyze_issue</code>, <code>find_error_patterns</code>, <code>search_events_nl</code>), and self-hosted configuration.</p>
</div>
```

## How it relates to the REST API

| Layer | What it is |
|---|---|
| [REST endpoints](/docs/api-reference/endpoints/) | The canonical HTTP surface. Everything else wraps it. |
| MCP Server | The same endpoints exposed as agent tools over JSON-RPC. |
| [Monoscope CLI](/docs/ai/cli/) | The same endpoints wrapped as a static binary for shells, CI, and bash-running agents. |

Same project API key works across all three.
