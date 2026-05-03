---
title: MCP Server
date: 2026-05-03
updatedDate: 2026-05-03
faLogo: plug
menuWeight: 4
hideToc: false
---

# Monoscope MCP Server

Monoscope ships a hosted [Model Context Protocol](https://modelcontextprotocol.io)
server at `https://api.monoscope.tech/api/v1/mcp`. Any MCP-aware client —
Claude Code, Claude Desktop, Cursor, Cline, OpenAI Agents SDK, custom
clients — can talk to it directly. No CLI install, no SDK, no separate
process.

```=html
<div class="callout">
  <i class="fa-solid fa-bolt"></i>
  <p>One JSON-RPC endpoint, ~50 tools auto-derived from our public REST API plus a few hand-written workflow tools (<code>analyze_issue</code>, <code>find_error_patterns</code>, <code>search_events_nl</code>). Same API key as the REST API and the CLI.</p>
</div>
```

## What you get

- **REST tools** — every operation in the public API surfaces as a verb-first MCP tool: `list_monitors`, `get_monitor`, `mute_monitor`, `search_events`, `apply_dashboard`, `whoami`, `get_schema`, … About 50 in total. New endpoints become MCP tools automatically; renames don't require a server release.
- **Workflow tools** — bundled actions that combine several internal calls into one agent-friendly verb:
  - `find_error_patterns` — top established log patterns ranked by current-hour count. Use to answer "what is blowing up right now" without crafting a query.
  - `search_events_nl` — translate a natural-language description into a KQL query (returns the query for the agent to execute via `search_events`).
  - `analyze_issue` — fetch an issue and return both the payload and an LLM-generated diagnosis (probable cause / signals / next steps).
- **Same auth as the REST API** — Bearer API key. Project scope is encoded in the key; one key per project. See [API Reference → Getting Started](/docs/api-reference/getting-started/) for how to mint one.

## Quick start

### Claude Code

Add to `~/.claude.json`:

```json
{
  "mcpServers": {
    "monoscope": {
      "url": "https://api.monoscope.tech/api/v1/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

Restart Claude Code. Run `/mcp` to confirm `monoscope` appears with its
tool catalog. Then ask in natural language — `which services have the
most errors right now?`, `mute the high-CPU alert for an hour`, `analyze
issue 9f2c3d…` — Claude picks the right tool.

### Cursor

Cursor reads `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "monoscope": {
      "url": "https://api.monoscope.tech/api/v1/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}
```

### Cline / Continue / other clients

Use the same JSON-RPC endpoint. The MCP spec doesn't mandate a single
config format — copy the auth header convention into whatever your
client uses.

## Verifying with curl

```sh
# List tools
curl -s -H "Authorization: Bearer $MONOSCOPE_API_KEY" \
     -H 'Content-Type: application/json' \
     -X POST https://api.monoscope.tech/api/v1/mcp \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' \
     | jq '.result.tools[].name' | head -10

# Call a tool
curl -s -H "Authorization: Bearer $MONOSCOPE_API_KEY" \
     -H 'Content-Type: application/json' \
     -X POST https://api.monoscope.tech/api/v1/mcp \
     -d '{
           "jsonrpc": "2.0",
           "id": 2,
           "method": "tools/call",
           "params": {"name": "find_error_patterns", "arguments": {"limit": 10}}
         }' \
     | jq '.result.structuredContent.patterns[0]'
```

## Tool catalog

### Telemetry

| Tool | Description |
|---|---|
| `search_events` | KQL-shaped event search (POST body — supports long queries). |
| `list_events` | Same as `search_events` but URL-encoded query (limited to short queries). |
| `query_metrics` | Run a metrics query with `summarize`/`bin_auto` aggregations. |
| `get_schema` | Returns the telemetry schema (column names, types, descriptions). |
| `list_facets` | Return the top values for a given event field over a time window. |

### Monitors

| Tool | Description |
|---|---|
| `list_monitors` / `get_monitor` | Read. |
| `create_monitor` / `update_monitor` / `patch_monitor` / `delete_monitor` | CRUD. |
| `mute_monitor` / `unmute_monitor` / `resolve_monitor` / `toggle_monitor_active` | Lifecycle. |
| `bulk_monitors` | Bulk action over a list of ids. |

### Dashboards

| Tool | Description |
|---|---|
| `list_dashboards` / `get_dashboard` / `get_dashboard_yaml` | Read. |
| `create_dashboard` / `apply_dashboard` / `update_dashboard` / `patch_dashboard` / `delete_dashboard` | CRUD; `apply_dashboard` upserts by `file_path` and is idempotent. |
| `duplicate_dashboard` / `star_dashboard` / `unstar_dashboard` | Lifecycle. |
| `upsert_dashboard_widget` / `delete_dashboard_widget` / `reorder_dashboard_widgets` | Widget management. |

### Issues, endpoints, log patterns

| Tool | Description |
|---|---|
| `list_issues` / `get_issue` / `ack_issue` / `unack_issue` / `archive_issue` / `unarchive_issue` / `bulk_issues` | Issue triage. |
| `list_endpoints` / `get_endpoint` | API endpoint discovery. |
| `list_log_patterns` / `get_log_pattern` / `ack_log_pattern` / `bulk_log_patterns` | Log-pattern triage. |

### Project, teams, members, keys

| Tool | Description |
|---|---|
| `whoami` | The authenticated identity + scoped project. |
| `get_project` / `patch_project` | Project read + partial update. |
| `list_teams` / `get_team` / `create_team` / `update_team` / `patch_team` / `delete_team` / `bulk_teams` | Teams CRUD. |
| `list_members` / `get_member` / `add_member` / `patch_member` / `remove_member` | Members CRUD. |
| `list_api_keys` / `get_api_key` / `create_api_key` / `activate_api_key` / `deactivate_api_key` / `delete_api_key` | API key management. |

### Workflow tools

| Tool | What it does |
|---|---|
| `find_error_patterns` | Top established log patterns sorted by current-hour event count. One call to surface "what's blowing up". |
| `search_events_nl` | Natural-language → KQL via the LLM. Returns the query and a short explanation; the agent runs it via `search_events`. |
| `analyze_issue` | Fetch an issue and ask the LLM for a structured diagnosis (probable cause, key signals, next steps). One LLM call per invocation. |

## Naming convention

Verb-first snake_case throughout: `list_X`, `get_X`, `create_X`,
`<action>_<resource>` (e.g. `mute_monitor`). No `{id}` placeholders in
tool names — those live in the `inputSchema`. This matches the
conventions used by Sentry, Grafana, Datadog, and Honeycomb's MCP
servers.

## Tool result envelope

Every tool call returns the standard MCP envelope:

```json
{
  "content": [{"type": "text", "text": "<JSON or message>"}],
  "isError": false,
  "structuredContent": { ... }
}
```

- `content` — text fallback (the JSON body or an error message). Always
  present.
- `isError` — `true` when the underlying handler returned a non-2xx
  status (or the workflow tool reported a problem). Never raised as a
  JSON-RPC error so the agent can react to it.
- `structuredContent` — the parsed JSON result when the response was
  JSON. Use this for typed handling.

## Auth, project scoping, and security

- Bearer token in the `Authorization` header, same scheme as the REST API.
  Mint keys at **Settings → API Keys** in the dashboard, or via
  `monoscope api-keys create` from the CLI.
- A key is scoped to one project. The MCP server reads the project from
  the key — no `X-Project-Id` header to remember.
- The endpoint is hosted on TLS-only `api.monoscope.tech`. Do not put a
  raw API key into a client config that other people share — use
  per-user keys.
- The MCP route does **not** expose itself as a tool, so an agent cannot
  recursively call `/api/v1/mcp` from inside a tool call.

## See also

- [API Reference](/docs/api-reference/) — the same operations as raw HTTP.
- [CLI & Agents](/docs/ai/cli/) — terminal access to the same surface.
- [Claude Code Skills](/docs/ai/cli/skills/) — natural-language skills that drive the CLI; complementary to the MCP server.
