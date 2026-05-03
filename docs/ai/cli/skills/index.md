---
title: Claude Code Skills
date: 2026-05-02
updatedDate: 2026-05-02
faLogo: robot
menuWeight: 4
---

# Claude Code Skills

Three drop-in skills that turn natural-language requests into well-formed
CLI invocations. A
[skill](https://docs.claude.com/en/docs/claude-code/skills) is a named
bundle of instructions plus shell access that Claude Code loads on
demand — when your request matches the skill's description, Claude
applies its playbook.

```=html
<div class="callout">
  <i class="fa-solid fa-lightbulb"></i>
  <p>The skills are <strong>thin wrappers</strong> around the <code>monoscope</code> CLI — no separate API key, no extra runtime. If the CLI works, the skills work. Prefer wiring tools in over the network instead? Use the <a href="/docs/ai/mcp/">MCP server</a>.</p>
</div>
```

## Available skills

| Skill | Activates on | What it does |
|---|---|---|
| **investigate** | "investigate the 500 errors", "look into payment-api errors", "what happened at 10:34?" | Runs the discover → search → context → triage chain. Uses `facets` to find services/values, `logs search` to drill in, `events context --summary` to pull the surrounding window. |
| **triage** | "do an on-call sweep", "ack the noisy issues for X", "clear the alert queue" | Reviews open issues, log patterns, and monitors. Acknowledges, archives, mutes, or resolves with the right granularity. |
| **kql-reference** | Any time another skill needs to write KQL | Operator/function reference for Monoscope's KQL dialect. Rarely invoked directly — other skills pull it in for query construction. |

The skills are open-source and live at
[github.com/monoscope-tech/skills](https://github.com/monoscope-tech/skills).

## Install

### Claude Code

```sh
# Add the marketplace once
claude plugin marketplace add monoscope-tech/skills

# Install
claude plugin install monoscope-skills@monoscope-skills
```

Restart Claude Code. The skills activate automatically when relevant — no
explicit invocation needed.

### Cursor, Cline, Copilot, and other agents

```sh
npx skills add monoscope-tech/skills
```

This drops the skill files into your project's `.claude/skills/` directory
(or equivalent) so any tool that reads that format picks them up.

## Prerequisites

The skills assume the `monoscope` binary is on your `PATH` and you're
authenticated:

```sh
curl monoscope.tech/install.sh | sh
export MONOSCOPE_API_KEY=<your-api-key>
export MONOSCOPE_PROJECT=<your-project-uuid>
monoscope auth status   # should report authenticated
```

The first time a skill runs, it reads these env vars (or falls back to
`~/.config/monoscope/config.yaml` and `~/.config/monoscope/tokens.json`).

## Usage examples

### Investigate

```
> Investigate the 500 errors in checkout-api over the last hour.

[Claude runs:]
  monoscope facets resource.service.name --top 5
  monoscope logs search 'attributes.http.response.status_code == 500' \
    --service checkout-api --since 1h --first --id-only
  monoscope events get <id>
  monoscope events context --at <timestamp> --window 5m --summary

[Then summarises:]
  - 47 errors in the last hour, all from checkout-api
  - Started at 10:34 after the deploy at 10:32 (correlated trace IDs span
    payments and inventory)
  - Likely cause: connection pool exhaustion in payments — 3 traces show
    `attributes.db.client.connections.usage` jumping from 12 → 100
```

### Triage

```
> Do an on-call sweep for the past day.

[Claude runs:]
  monoscope issues list --status open
  monoscope log-patterns list --per-page 30
  monoscope monitors list

[Then bulk-acks the noisy ones, flags the surprising ones for review,
 and produces a summary the team can paste into Slack.]
```

### Custom skill

The shipped skills are a starting point. You can write your own — they're
just markdown files with a frontmatter `description` Claude uses for
matching. See [SKILL.md examples](https://github.com/monoscope-tech/skills/tree/master/skills)
for the format.

## Pointing at a self-hosted server

Set `MONOSCOPE_API_URL`:

```sh
export MONOSCOPE_API_URL=http://monoscope.internal:8080
```

The skills inherit the env, so the same investigate/triage workflows run
unchanged against your private instance.

## See also

- [Agentic Pipelines](/docs/ai/cli/agentic/) — the JSON envelope contract the skills rely on.
- [Command Reference](/docs/ai/cli/commands/) — every command the skills can call.
- [MCP Server](/docs/ai/mcp/) — wire any agent in over the network instead of a local CLI.
