---
title: CLI & Agents
date: 2026-05-02
updatedDate: 2026-05-03
faLogo: terminal
menuWeight: 3
pageFullWidth: true
hideToc: true
---

# A CLI for humans and agents

```=html
<p class="text-lg text-textWeak mt-3 max-w-2xl">One static binary, one auth, one JSON shape. It doesn't care whether you typed the command or your agent did — the same <code>monoscope</code> drives shell sessions, CI pipelines, and any LLM that can run <code>bash</code>.</p>
```

## A real incident, in three commands

```sh
# 1. Which service is on fire?
monoscope facets resource.service.name --top 3

# 2. Get one error to anchor the investigation.
ID=$(monoscope logs search 'severity.text=="error"' \
       --service checkout-api --since 1h --first --id-only)

# 3. Pull the surrounding 5 minutes — every trace, every service touched.
monoscope events context --window 5m --summary \
  --at "$(monoscope events get "$ID" | jq -r .timestamp)"
```

Every command emits stable JSON, surfaces the server's actual error
message (not an opaque 4xx), and switches into agent mode under
`MONOSCOPE_AGENT_MODE=1` — auto-set in CI, where the same binary backs
assertions like `monoscope metrics query '...' --assert '< 0.01'`.

## Three surfaces, one product

```=html
<div class="surface-chooser not-prose">
  <a href="/docs/ai/cli/install/" class="primary">
    <span class="label">For your terminal</span>
    <span class="name">monoscope CLI</span>
    <span class="when">A single static binary for shell or CI. Tabular output for humans, JSON for pipes. The tool everything else on this page wraps.</span>
    <span class="footer">Get the CLI <i class="fa-solid fa-arrow-right"></i></span>
  </a>
  <a href="/docs/ai/mcp/" class="alt-a">
    <span class="label">For any MCP client</span>
    <span class="name">MCP Server</span>
    <span class="when">Hosted endpoint, ~50 tools, no install. Wire any agent in over the network.</span>
  </a>
  <a href="/docs/ai/cli/skills/" class="alt-b">
    <span class="label">For Claude Code</span>
    <span class="name">Agent Skills</span>
    <span class="when">Drop-in <code>investigate</code>, <code>triage</code>, <code>kql-reference</code> — natural language to CLI calls.</span>
  </a>
</div>
```

```=html
<div class="callout callout-tip">
  <i class="fa-solid fa-bolt"></i>
  <p><code>curl -fsSL https://monoscope.tech/install.sh | bash</code> — drops the binary into <code>~/.local/bin</code>. Linux and macOS, x86_64 and arm64.</p>
</div>
```

## In this section

```=html
<nav class="pathway not-prose">
  <a href="/docs/ai/cli/install/">
    <span class="step">01</span>
    <span>
      <span class="title">Install &amp; authenticate</span>
      <span class="desc">One-liner install, browser or token login, env vars, shell completions.</span>
    </span>
    <span class="arrow"><i class="fa-solid fa-arrow-right"></i></span>
  </a>
  <a href="/docs/ai/cli/commands/">
    <span class="step">02</span>
    <span>
      <span class="title">Command reference</span>
      <span class="desc">Logs, traces, metrics, services, monitors, dashboards — the full command tour with copy-paste examples.</span>
    </span>
    <span class="arrow"><i class="fa-solid fa-arrow-right"></i></span>
  </a>
  <a href="/docs/ai/cli/agentic/">
    <span class="step">03</span>
    <span>
      <span class="title">Agentic pipelines</span>
      <span class="desc">JSON envelope contract, the discover → search → context → triage chain, and error prefixes an agent can switch on to retry, refine, or escalate.</span>
    </span>
    <span class="arrow"><i class="fa-solid fa-arrow-right"></i></span>
  </a>
  <a href="/docs/ai/cli/skills/">
    <span class="step">04</span>
    <span>
      <span class="title">Claude Code skills</span>
      <span class="desc">Install the prebuilt skills, see what each one does, write your own.</span>
    </span>
    <span class="arrow"><i class="fa-solid fa-arrow-right"></i></span>
  </a>
</nav>
```
