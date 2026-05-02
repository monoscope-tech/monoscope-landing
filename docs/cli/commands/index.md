---
title: Command Reference
date: 2026-05-02
updatedDate: 2026-05-02
faLogo: keyboard
menuWeight: 2
---

# Command Reference

Every command supports `--help` for a complete flag list. Below is an
opinionated tour grouped by use case. The full reference, including every
flag for every subcommand, lives in the [GitHub repo](https://github.com/monoscope-tech/monoscope/blob/master/docs/cli.md).

## Global flags

| Flag | Description |
|---|---|
| `--project/-p <uuid>` | Override the project for this invocation. |
| `--output/-o json\|yaml\|table` | Force output format. |
| `--json` | Shorthand for `--output json`. |
| `--agent` | Force JSON output (same as `MONOSCOPE_AGENT_MODE=1`). |
| `--debug` | Print every outgoing request URL to stderr. |

## Output modes

- **`table`** — default on a TTY. Human-readable aligned columns.
- **`json`** — default when stdout is a pipe or `CI`/`CLAUDE_CODE` is set. Pretty-printed, agent-friendly.
- **`yaml`** — config-friendly. Round-trips cleanly through `apply` for monitors and dashboards.

## Logs, traces, events

`logs`, `traces`, and `events` share the same event store. `logs` and `traces`
are aliases for `events` with a `--kind` filter pre-applied.

```sh
# Recent errors across all services (KQL)
monoscope events search 'severity.text=="error"' --since 1h

# Service + level shorthands compose with the positional KQL query
monoscope logs search --service checkout-api --level error --since 30m

# Free-text search inside the body
monoscope logs search 'body has "payment failed"' --since 1h

# Absolute time range
monoscope traces search --service auth \
  --from 2026-04-01T00:00:00Z --to 2026-04-02T00:00:00Z

# Pagination via cursor
CURSOR=$(monoscope events search "" --since 1h --limit 100 | jq -r .cursor)
monoscope events search "" --since 1h --limit 100 --cursor "$CURSOR"

# "Just give me one event id to chain"
monoscope logs search 'severity.text=="error"' --first --id-only

# Trace tree
monoscope traces get <trace-id> --tree

# Live tail with optional grep
monoscope logs tail --service api --level error --grep timeout

# Context window around a timestamp, with per-trace summary for triage
monoscope events context --at 2026-04-15T10:34:22Z --window 10m --summary
```

KQL operator reference: see the [kql-reference skill](https://github.com/monoscope-tech/skills/blob/master/skills/kql-reference/SKILL.md).
Use `==`/`!=` (not Lucene `:`) for equality, `and`/`or` for logical, `has` for
word-search inside text fields.

## Discovery

These two commands tell you what's actually in your project — run them
*before* writing a query so you don't waste round-trips on field names that
don't exist or values that never match.

```sh
# What fields do I have? (~600 in a default project — narrow with --search)
monoscope schema --search service --limit 20
monoscope schema --search http
monoscope schema -o json | jq '.fields | keys[]' | head -50

# What values does each field have? (Precomputed top-N per field.)
monoscope facets                                   # every faceted field
monoscope facets resource.service.name --top 10    # one field, top 10 values
monoscope facets severity.text                     # which levels are in use?
monoscope facets attributes.http.response.status_code   # which 4xx/5xx happen?
```

## Metrics

```sh
# Group event count by service
monoscope metrics query 'summarize count() by resource.service.name'

# p99 latency by service over the last 30 minutes
monoscope metrics query 'summarize percentile(duration, 99) by resource.service.name' --since 30m

# CI-friendly assertion: exit non-zero if condition fails
monoscope metrics query 'summarize count()' --since 30m --assert '< 1000'

# Sparkline charts (bin by 1m)
monoscope metrics chart 'summarize count() by bin(timestamp, 1m)' --since 2h
monoscope metrics chart 'summarize avg(duration) by bin(timestamp, 1m)' --watch 30s
```

## Services

```sh
monoscope services list                  # services active in the last 24h
monoscope services list --since 7d       # widen the window
```

## Issues, log patterns, monitors, dashboards

All list commands share a uniform envelope — `{data: [...], pagination: {...}}` —
so the same jq pipelines work everywhere.

```sh
# Issues
monoscope issues list --status open --service payment-api \
  | jq '.data[] | {id, title, severity, service}'
monoscope issues get <issue-id>
monoscope issues ack <issue-id>
monoscope issues bulk acknowledge --ids id1,id2,id3

# Log patterns
monoscope log-patterns list --per-page 50 \
  | jq '.data[] | {id, frequency: .occurrence_count, sample: .pattern}'
monoscope log-patterns ack <pattern-id>
monoscope log-patterns bulk ignore --ids 1,2,3

# Monitors (CRUD + lifecycle)
monoscope monitors list
monoscope monitors create monitor.yaml
monoscope monitors apply monitors/                 # idempotent batch upsert
monoscope monitors mute <monitor-id> --for 30      # mute for 30 minutes
monoscope monitors bulk resolve --ids id1,id2

# Dashboards (CRUD + apply)
monoscope dashboards list
monoscope dashboards yaml <id> > dashboard.yaml    # round-trip
monoscope dashboards apply dashboards/             # idempotent
monoscope dashboards widget upsert <dashboard-id> widget.yaml
```

## API keys, teams, members, project

```sh
monoscope api-keys create "ops-2026" -o json   # plaintext key shown ONCE
monoscope api-keys deactivate <id>             # soft disable
monoscope api-keys delete <id>                 # permanent

monoscope teams list
monoscope teams create team.yaml

monoscope members list
monoscope members add --email teammate@example.com --permission view
monoscope members patch <user-id> admin

monoscope me                                   # current project identity
monoscope project get
monoscope project patch patch.yaml             # subset: title, description, time_zone, ...
```

## Share links

```sh
monoscope share-link create \
  --event-id <uuid> \
  --created-at 2026-04-15T00:00:00Z \
  --type log
```

Returns `{id, url}` — a 48-hour read-only link that opens for anyone, no
account required. Useful for incident reports and bug tickets.

## CI / automation tips

```sh
# Health-check style assertion in CI
monoscope metrics query 'summarize count()' --since 5m --assert '< 100' \
  || echo "error spike — failing the build"

# Apply monitors from a directory (idempotent — safe to re-run)
monoscope monitors apply .monoscope/monitors/

# Bulk acknowledge stale issues
monoscope issues list --status open --service legacy-billing \
  | jq -r '.data[].id' | head -20 | paste -sd, - \
  | xargs -I {} monoscope issues bulk acknowledge --ids {}
```

## Next: [Agentic Pipelines →](/docs/cli/agentic/)
