---
title: Agentic Pipelines
date: 2026-05-02
updatedDate: 2026-05-02
faLogo: code-branch
menuWeight: 3
---

# Agentic Pipelines

The `monoscope` CLI is built so an LLM agent — Claude Code, Cursor, Cline,
or anything that can run `bash` — can use it as a tool surface without any
custom wrappers. Three properties make this work:

1. **Stable JSON envelopes.** Every list command returns `{data, pagination}`. Every event command returns `{events, count, has_more, cursor}`. These shapes are documented and pinned by integration tests.
2. **Server errors are forwarded verbatim.** A bad KQL query returns an HTTP 400 whose body includes the line/column of the parse error — the CLI surfaces that directly to stderr, no `Bad Request` blackbox.
3. **Client-side validation.** Malformed `--since 1xyz` or `--kind banana` is rejected with an actionable message before a network round-trip — the agent doesn't have to learn from a 4xx.

```=html
<div class="callout">
  <i class="fa-solid fa-bolt"></i>
  <p><strong>Set <code>MONOSCOPE_AGENT_MODE=1</code></strong> (or pass <code>--agent</code>) to force JSON output and disable interactive prompts. Auto-detected when <code>CI</code> or <code>CLAUDE_CODE</code> is set, so any skill or pipeline run from those tools already gets JSON.</p>
</div>
```

## The full pipeline

The canonical agentic workflow is **discover → search → context → triage**.
This is exactly the chain the [investigate skill](/docs/cli/skills/) drives:

```sh
# 1. Discover. Facets are precomputed top-N per field — far cheaper than
#    `summarize count() by ...` and tells you which equality checks will
#    actually match data.
SVC=$(monoscope facets resource.service.name --top 1 \
        | jq -r '.["resource.service.name"][0].value')

# 2. Search. --first --id-only short-circuits "give me one id to chain".
ID=$(monoscope logs search 'severity.text=="error"' \
        --service "$SVC" --first --id-only)

# 3. Context. --summary adds a per-trace breakdown — answers "which other
#    services were impacted in the same window?".
monoscope events context --window 5m --summary \
  --at "$(monoscope events get "$ID" | jq -r .timestamp)" \
  | jq '.traces | sort_by(-.error_count) | .[0:3]'

# 4. Triage. Acknowledge the open issues you've now formed a hypothesis for.
monoscope issues list --service "$SVC" --status open \
  | jq -r '.data[].id' | head -3 \
  | xargs -I {} monoscope issues ack {}
```

Each line consumes the previous line's JSON. No human glue in the middle.

## Output envelopes — memorise these

| Command | Shape |
|---|---|
| `facets [FIELD]` | `{<field_path>: [{value, count}, ...]}` |
| `events search` (and `logs`/`traces`) | `{events: [...], count, has_more, cursor}` |
| `events get` | a single event object |
| `events context --summary` | `{events, count, traces: [{trace_id, services, span_count, error_count}]}` |
| `services list` | `{services: [{name, events, last_seen}], count}` |
| `<resource> list` (`issues`, `monitors`, `dashboards`, `api-keys`, `teams`, `members`, `endpoints`, `log-patterns`) | `{data: [...], pagination: {has_more, total, cursor, page, per_page}}` |
| `auth status` (agent mode) | `{authenticated, method, api_url, project}` |
| `schema` | `{fields: {<name>: {field_type, description, ...}, ...}}` |

Use `.events[]` for event-shaped responses and `.data[]` for everything else
— **not** `.items[]` (that's the legacy server shape; the CLI normalises it
to `.data` for consistency across resources).

## Error contract

A 4xx exits non-zero with the server's body in the error message:

```sh
$ monoscope events search 'AND OR' --since 1h
error: HTTP 400: parse error at column 1: expected term (GET https://api.monoscope.tech/api/v1/events)

$ monoscope events search '' --since 1xyz
error: --since must match Ns|Nm|Nh|Nd|Nms (e.g. 30m, 2h, 7d); got '1xyz'

$ monoscope events search '' --kind banana --since 1h
error: --kind must be one of: log, trace, span; got 'banana'
```

Agents can match on the error prefix (`error: HTTP 400:` vs `error: --since`)
to decide whether to retry, refine the query, or escalate.

## Common patterns

### Discover before querying

```sh
# Don't guess values — ask facets first
monoscope facets attributes.http.response.status_code
# {"attributes.http.response.status_code": [
#   {"value": "200", "count": 12421},
#   {"value": "404", "count": 88},
#   {"value": "500", "count": 47}, ...
# ]}

# Now you know "500" is worth filtering for
monoscope events search 'attributes.http.response.status_code == 500' --since 1h
```

### Pagination loops

```sh
CURSOR=""
while :; do
  PAGE=$(monoscope events search "" --since 24h --limit 100 \
           ${CURSOR:+--cursor "$CURSOR"})
  echo "$PAGE" | jq -c '.events[]'
  HAS_MORE=$(echo "$PAGE" | jq -r .has_more)
  [ "$HAS_MORE" = "true" ] || break
  CURSOR=$(echo "$PAGE" | jq -r .cursor)
done
```

### CI assertions

```sh
# Fail the build if the error rate spikes
monoscope metrics query 'summarize count()' \
  --since 30m \
  --assert '< 100' \
  || (echo "::error::error spike detected" && exit 1)
```

### Inspecting what the CLI sent

`--debug` (or `MONOSCOPE_DEBUG=1`) prints every outgoing request URL on stderr.
Useful when an agent gets an unexpected response and needs to confirm what it
asked for:

```sh
$ monoscope --debug events search '' --service web --since 1h --limit 1 2>&1 | head -2
debug: GET https://api.monoscope.tech/api/v1/events?query=resource.service.name%3D%3D%22web%22&since=1h&limit=1
{...}
```

## Designed to not regress

Every property on this page is pinned by an integration test in
[`test/integration/CLI/CLIE2ESpec.hs`](https://github.com/monoscope-tech/monoscope/blob/master/test/integration/CLI/CLIE2ESpec.hs).
The suite runs the real `monoscope` binary against an HTTP server (point it
at `http://localhost:8080` for local dev) and asserts on:

- KQL operator (`==` not `:`)
- `--service`/`--level`/`--kind` shorthand expansions
- The `{events, count, has_more, cursor}` envelope shape
- `{data, pagination}` for every list resource
- Validation messages for `--since`, `--kind`
- Server error bodies surfaced in stderr
- `auth status` JSON shape in agent mode
- `completion <unknown>` failing loudly

If a wire format breaks, CI breaks before it ships.

## Next: [Claude Code Skills →](/docs/cli/skills/)
