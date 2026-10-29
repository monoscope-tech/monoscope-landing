---
title: AI
date: 2026-05-03
updatedDate: 2026-10-29
faLogo: robot
menuWeight: 3
pageFullWidth: true
hideToc: true
---

# AI in monoscope

```=html
<p class="text-lg text-textWeak mt-3 max-w-2xl">monoscope AI investigates incidents inside the app and runs scheduled reviews of your project. Coding agents get the same data through the CLI, skills and a hosted MCP server.</p>
```

## In the App

```=html
<div class="surface-chooser surface-chooser--equal not-prose">
  <a href="/docs/ai/ai-sre/">
    <span class="label">Ask a question, get the evidence</span>
    <span class="name">AI SRE</span>
    <span class="when">Ask in plain English from the app, an issue, Slack or Discord. The AI runs queries on your logs, traces and metrics, and answers with the charts and events behind each claim.</span>
    <span class="footer">Start an investigation <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
  </a>
  <a href="/docs/ai/routines/">
    <span class="label">Reviews on a schedule</span>
    <span class="name">Routines</span>
    <span class="when">18 built-in reviews, such as error regressions, traffic drops and on-call handoffs, or your own prompt. Each runs on a schedule and posts what it finds.</span>
    <span class="footer">Add a routine <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
  </a>
</div>
```

## In Your Coding Agent

```=html
<div class="surface-chooser surface-chooser--equal not-prose">
  <a href="/docs/ai/cli/">
    <span class="label">For shells, CI and agents that run bash</span>
    <span class="name">CLI and Skills</span>
    <span class="when">One static binary with table output for people and JSON for scripts. Claude Code skills (<code>investigate</code>, <code>triage</code>, <code>manage</code>, <code>instrument</code>, <code>kql-reference</code>) use the same commands.</span>
    <span class="footer">Install the CLI <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
  </a>
  <a href="/docs/ai/mcp/">
    <span class="label">For any MCP client</span>
    <span class="name">MCP Server</span>
    <span class="when">A hosted Model Context Protocol endpoint. Every public REST operation is a tool, plus workflow tools such as <code>analyze_issue</code> and <code>search_events_nl</code>. No install. It uses your project API key.</span>
    <span class="footer">Connect a client <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>
  </a>
</div>
```

### CLI or MCP?

Use the **CLI** when the agent already runs in a shell: Claude Code, Cline or a CI job. You get the same binary for people and agents, and the skills for Claude Code.

Use **MCP** when the client speaks the Model Context Protocol (Claude Desktop, Cursor, the OpenAI Agents SDK, or your own client) and you do not want to install a binary.

```=html
<div class="callout callout-tip">
  <i class="fa-solid fa-lightbulb"></i>
  <p>The CLI and the MCP server use the same project API key and the same <a href="/docs/dashboard/dashboard-pages/query-language/">query language</a>. You can switch between them without changing your queries.</p>
</div>
```
