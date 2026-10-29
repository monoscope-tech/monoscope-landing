---
title: AI SRE
ogTitle: AI SRE - Investigate Incidents with monoscope AI
date: 2026-10-29
updatedDate: 2026-10-29
faLogo: wand-magic-sparkles
menuWeight: 1
---

# AI SRE

monoscope AI investigates your project for you. Ask it a question in plain English. It runs queries on your logs, traces and metrics, reads your issues, monitors and dashboards, and answers with the evidence: the queries it ran, the charts, and the events that support each claim.

```=html
{% render "docs/components/shot", name: "ai-chat", alt: "An AI investigation thread with findings for each service, a chart of errors by service, and the tool calls the AI made" %}
```

## Start an Investigation

You can ask monoscope AI from several places:

- **Agents** view of the sidebar: click **New chat** and type a question, for example `Why did checkout errors go up after 14:00?`.
- **Issues**: on an issue page, click **Investigate** to ask about this issue, or **Plan a fix** to get a step-by-step fix plan. See [Issues](/docs/dashboard/dashboard-pages/issues/#Investigate-with-AI).
- **Explorer**: type a request in the **Ask AI** box. The AI writes the query for you. See [Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/#Write-a-Query).
- **Command palette**: press `⌘K` and type a question.
- **Slack, Discord and WhatsApp**: ask the monoscope app in a channel. Connect it first on the [Integrations](/docs/dashboard/settings-pages/integrations/) page.

Each investigation is saved as a conversation. Open **Conversations** in the **Agents** view to see them, grouped by **Today**, **This week** and **Older**.

## What the AI Can Do

The AI uses the same data that you see in the app:

- Run queries on logs, spans and metrics, and draw charts of the results.
- Read issues, monitors, dashboards, endpoints, log patterns and incidents.
- Read recent deployments, to compare behavior before and after a release.
- Read your code, if you connect a repository (see below).
- Post results to Slack.

Expand **tool calls** under an answer to see each query the AI ran. Use the answer as a starting point, and check the evidence before you act on it.

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p>AI usage is tracked and billed at your project rate. See <a href="/pricing/">pricing</a>.</p>
</div>
```

## Turn a Question into a Routine

If you ask the same question every day, schedule it. Click **Schedule** at the top of a conversation, or select **Make daily routine**. The AI then runs the prompt on a schedule and posts the result. See [Routines](/docs/ai/routines/).

## Connect Your Code

Open **Repositories** in the sidebar to connect the repositories behind your services. You can connect GitHub with the GitHub App, or GitHub, GitLab, Bitbucket and Gitea with an access token. Then link each service to its repository.

When a repository is connected:

- **Source context**: the AI and the issue page read the failing code from the paths in a stack trace.
- **Automatic pull request reviews**: monoscope comments on GitHub pull requests with the production telemetry of the code they change. This needs the GitHub App.
- **Configuration sync**: dashboards can be kept as YAML files in the repository. See [Dashboards as code](/docs/dashboard/dashboard-pages/dashboard/#Dashboards-as-Code).

## Use the AI from Your Coding Agent

To give Claude Code, Cursor or another coding agent the same access to your telemetry, use the [CLI and skills](/docs/ai/cli/) or the [MCP server](/docs/ai/mcp/).
