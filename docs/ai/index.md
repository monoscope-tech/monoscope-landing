---
title: AI
date: 2026-05-03
updatedDate: 2026-05-03
faLogo: robot
menuWeight: 3
pageFullWidth: true
hideToc: true
---

# Monoscope for AI

```=html
<p class="text-lg text-textWeak mt-3 max-w-2xl">Tool surfaces for any LLM that talks to Monoscope — over the shell, over the network, or as a packaged Claude Code skill. Same auth, same primitives, same JSON.</p>
```

## Two ways to wire an agent in

```=html
<div class="surface-chooser surface-chooser--equal not-prose">
  <a href="/docs/ai/cli/" class="alt-a">
    <span class="label">For shells, CI, and bash-running agents</span>
    <span class="name">CLI &amp; Agents</span>
    <span class="when">A single static binary. Tabular for humans, JSON for pipes. Drop-in Claude Code skills (<code>investigate</code>, <code>triage</code>, <code>kql-reference</code>) wrap the same commands.</span>
    <span class="footer">Get the CLI <i class="fa-solid fa-arrow-right"></i></span>
  </a>
  <a href="/docs/ai/mcp/" class="alt-b">
    <span class="label">For any MCP client</span>
    <span class="name">MCP Server</span>
    <span class="when">Hosted Model Context Protocol endpoint with ~50 auto-derived REST tools plus workflow tools (<code>analyze_issue</code>, <code>find_error_patterns</code>, <code>search_events_nl</code>). No install, same API key as REST.</span>
    <span class="footer">Connect a client <i class="fa-solid fa-arrow-right"></i></span>
  </a>
</div>
```

## When to pick which

**Pick the CLI** when the agent already runs in a shell — Claude Code,
Cline, CI jobs, or any environment where `bash` is the substrate. You
get tabular output for humans on the same binary, plus a curated
`investigate → triage` skill set for Claude Code.

**Pick MCP** when the client speaks Model Context Protocol natively
(Claude Desktop, Cursor, OpenAI Agents SDK, your own) and you'd rather
not ship a binary. Tools auto-derive from the public REST API, so new
endpoints become MCP tools without a server release.

```=html
<div class="callout callout-tip">
  <i class="fa-solid fa-bolt"></i>
  <p>Both surfaces use the same project API key and the same KQL dialect. Switching between them is configuration, not migration.</p>
</div>
```
