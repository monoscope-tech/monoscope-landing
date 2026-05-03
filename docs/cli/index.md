---
title: CLI & Agents
date: 2026-05-02
updatedDate: 2026-05-02
faLogo: terminal
menuWeight: 3
pageFullWidth: true
hideToc: true
pages:
  - title: Install & Authenticate
    slug: /docs/cli/install/
    icon: download
    description: Install the binary, log in, and set defaults.
  - title: Command Reference
    slug: /docs/cli/commands/
    icon: keyboard
    description: Every subcommand, flag, and output mode.
  - title: Agentic Pipelines
    slug: /docs/cli/agentic/
    icon: code-branch
    description: Stable JSON envelopes and the discover → search → triage chain.
  - title: Claude Code Skills
    slug: /docs/cli/skills/
    icon: robot
    description: Plug the CLI into Claude Code with prebuilt skills for incident triage.
---

# Monoscope CLI & Agents

The `monoscope` CLI is a first-class way to use Monoscope from the terminal —
search logs and traces, query metrics, manage monitors and dashboards,
discover what's in your project, and triage issues. It's designed to be
**equally good for humans and LLM agents**: every command emits a stable JSON
envelope, every error includes the server-side detail, and pure helpers reject
malformed input client-side instead of forwarding an opaque HTTP 400.

```=html
<div class="callout">
  <i class="fa-solid fa-bolt"></i>
  <p>One-liner install:
  <code>curl -fsSL https://monoscope.tech/install.sh | bash</code></p>
</div>
```

## Why a CLI?

- **Scriptable observability** — bake assertions into CI (`metrics query "..." --assert "< 0.01"`), apply monitors from YAML (`monitors apply monitors/`), or rotate API keys with a Bash one-liner.
- **Incident response** — discover services with one command, drill into a single trace with the next, summarise the surrounding window with the third. No tab-switching.
- **AI-native** — Claude Code, Cursor, Cline, and any agent that runs Bash can use the CLI as their tool surface. Set `MONOSCOPE_AGENT_MODE=1` and every output is parseable JSON.

## Quick start

```bash
# 1. Install
curl -fsSL https://monoscope.tech/install.sh | bash

# 2. Authenticate (browser-based; use --token for CI)
monoscope auth login

# 3. Set a default project
monoscope config set project <your-project-uuid>

# 4. Try it
monoscope services list
monoscope facets resource.service.name --top 5
monoscope events search 'severity.text=="error"' --since 1h --limit 10
```

## What's inside this section

```=html
<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 not-prose">
  <a href="/docs/cli/install/" class="docs-card rounded-xl">
    <p><i class="fa-solid fa-download"></i> <strong>Install &amp; Authenticate</strong></p>
    <span>Linux/macOS install script, interactive vs token login, environment variables.</span>
  </a>
  <a href="/docs/cli/commands/" class="docs-card rounded-xl">
    <p><i class="fa-solid fa-keyboard"></i> <strong>Command Reference</strong></p>
    <span>Every subcommand: events, metrics, services, facets, monitors, dashboards, issues, schema, and more.</span>
  </a>
  <a href="/docs/cli/agentic/" class="docs-card rounded-xl">
    <p><i class="fa-solid fa-code-branch"></i> <strong>Agentic Pipelines</strong></p>
    <span>Stable JSON envelopes for every command, the discover → search → triage chain, and how to feed an LLM.</span>
  </a>
  <a href="/docs/cli/skills/" class="docs-card rounded-xl">
    <p><i class="fa-solid fa-robot"></i> <strong>Claude Code Skills</strong></p>
    <span>Drop-in skills that turn natural-language requests into Monoscope CLI invocations.</span>
  </a>
</div>
```

## See also

- [API Reference](/docs/api-reference/) — the same endpoints the CLI calls, if you'd rather use HTTP directly.
- [MCP Server](/docs/mcp/) — the same surface as a Model Context Protocol server for Claude Code, Cursor, and other agents.
- [SDKs](/docs/sdks/) — instrument your apps to send data *into* Monoscope.
- [Dashboard Guides](/docs/dashboard/) — the same workflows in the web UI.
