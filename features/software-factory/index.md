---
# UNVERIFIED (claims not on ../monoscope master as of 2026-10-29; positioning requested by the founder):
# - monoscope opening pull requests for improvements it finds (pitch, "loop" section lead and bullet,
#   "requests" section, FAQ): draft fix-PR creation is on branch work/impact-worker-floor.
# - Hero demo fix-b.html shows the agent opening a PR ("I opened PR #491"), so it carries the same caveat.
# - Implementing feature requests from Slack or the platform ("requests" section, FAQ): no branch found, unverified.
# - Issues from in-app user feedback (user.feedback spans) in the "requests" section: branch sentry-issue-layout.
# - Project memory that learns from feedback across channels ("memory" section, FAQ): branches work/impact-agents-pr*.
# - Warp reading the same mcpServers JSON as Claude Code and Cursor: nothing in this repo documents Warp;
#   format not checked against Warp's docs.
# Verified on master: hosted MCP server and workflow tools (docs/ai/mcp), CLI with JSON output and Claude Code
# skills (docs/ai/cli), 18 routine templates on Every/Daily/Weekdays/Weekly schedules incl. Slow endpoint watch,
# Error regression radar, Deployment regression review (daily at 14:00), Telemetry gap detector (docs/ai/routines),
# PR impact review comments on GitHub pull requests (#659, docs/ai/ai-sre "Connect Your Code").
title: "A software factory that starts from production"
description: "Give your coding agents production data over MCP and the CLI, or let monoscope run its own loop: watch production, find fixes, open the pull request."
eyebrow: "Software factory"
tone: violet
h1: "The quality loop for your software factory"
pitch: "Plug monoscope into the coding agents you already run so they read production before they write code. Or let it run its own loop: watch production, find what to fix, open the pull request."
playground: ai/routines
hero_demo: /assets/demos/fix-b.html
hero_shot: routines
hero_frame: "Slack · app.monoscope.tech / ai / routines"
art: page-coding-agents.webp
sections:
  - id: agents
    icon: plug
    tone: violet
    eyebrow: "Your factory"
    title: "Plug into the agents you already run"
    lead: "Claude Code, Cursor, Codex, Warp or an agent you wrote yourself: point it at the hosted MCP server and it can search the requests, logs, traces and issues behind the code it's about to change. Same API key as the CLI and the REST API."
    code_label: "mcpServers · Claude Code, Cursor and any client that reads this shape"
    code_class: language-json
    code: |
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
    bullets:
      - title: "Hosted MCP server"
        icon: plug
        body: "Every public API operation is a tool, plus analyze_issue, find_error_patterns and search_events_nl. Nothing to install or keep running."
      - title: "A CLI for shells and CI"
        icon: code
        body: "One binary. Piped output switches to JSON with a stable shape, so agents and CI jobs parse the same thing every time."
      - title: "Skills for Claude Code"
        icon: zap
        body: "investigate, triage, manage, instrument and kql-reference turn a plain question into the right CLI calls."
    link: /docs/ai/mcp/
    link_label: "Connect your agent"
  - id: loop
    icon: activity
    tone: violet
    art: page-routines.webp
    eyebrow: "Its own loop"
    title: "Watches production and opens the pull request"
    lead: "Routines run on the schedule you set and check performance, errors, telemetry and deploys. When one finds something worth changing, monoscope writes the change against your repository and opens a draft pull request with the requests that justify it."
    shot: routines
    frame: "app.monoscope.tech / ai / routines"
    bullets:
      - title: "Slow endpoints"
        icon: gauge
        body: "Slow endpoint watch runs every hour and names the endpoints that got slower, with the traces behind them."
      - title: "Errors that came back"
        icon: bug
        body: "Error regression radar flags errors that returned or grew, grouped into one issue per problem."
      - title: "Every new version"
        icon: rocket
        body: "Deployment regression review compares errors and latency before and after each service version, every afternoon."
      - title: "Gaps in your telemetry"
        icon: eye
        body: "Telemetry gap detector finds services that stopped sending logs, traces or metrics."
    link: /docs/ai/routines/
    link_label: "How routines work"
  - id: requests
    icon: users
    tone: violet
    eyebrow: "What users ask for"
    title: "Builds what your users ask for"
    lead: "Ask for a feature in Slack or in the app, and monoscope turns it into implementation work on your repository: it reads the code at the deployed commit, checks how the affected endpoints are used in production, and opens a pull request for your review."
    shot: ai-chat
    frame: "app.monoscope.tech / ai"
    bullets:
      - title: "From Slack or the app"
        icon: radio
        body: "Ask in a channel thread or the AI chat. Follow-up questions keep the context of the request."
      - title: "Sized against real traffic"
        icon: database
        body: "It looks up the requests that hit the code it's changing, so the plan matches how the endpoint is used."
      - title: "Feedback becomes issues"
        icon: bug
        body: "Feedback your users send from inside your product lands as an issue, next to the requests around it."
  - id: review
    icon: github
    tone: violet
    eyebrow: "Before it merges"
    title: "Every pull request, checked against production"
    lead: "Whoever wrote it, a person, your agent or monoscope, each open pull request gets a comment with what live traffic says about the lines it changes: how many requests hit them, how many failed, and what to check before merging."
    github_review:
      repository: acme/payments-api
      number: 318
      title: Retry Stripe webhook handling on 5xx
      author: dana
      branch: agent/webhook-retry
      verdict: Worth checking
      project: payments
      commit: 4b7d2a9
      window: "2026-10-21 09:00 → 2026-10-28 09:00"
      file: src/webhooks/stripe.ts:88
      events: "18,940"
      errors: "57"
      finding: "57 requests this week delivered a Stripe event id this handler had already processed. A retry here would run those twice."
      next_check: Confirm the handler skips event ids it has already processed.
    bullets:
      - title: "Tied to the changed lines"
        icon: code
        body: "Findings point at a file and line in the diff, with event and error counts from production."
      - title: "Says when it can't tell"
        icon: eye
        body: "If the changed code has no traffic yet, the verdict says coverage unknown."
      - title: "Advisory, per repository"
        icon: users
        body: "Reviews never block a merge. Turn them on per repository with the GitHub App."
    link: /docs/ai/ai-sre/
    link_label: "Connect a repository"
  - id: memory
    icon: layout
    tone: violet
    eyebrow: "Feedback"
    title: "Learns from what your team tells it"
    lead: "Replies in Slack, comments on its pull requests and corrections in the app go into a memory kept per project. The next investigation, routine or pull request starts from what your team already said."
    shot: issues
    frame: "app.monoscope.tech / issues"
    bullets:
      - title: "One memory per project"
        icon: database
        body: "What it learns stays with the project, not with one chat thread."
      - title: "From every channel"
        icon: link
        body: "Slack threads, GitHub reviews and the AI chat all feed the same memory."
      - title: "Your coding agents read it too"
        icon: plug
        body: "Agents connected over MCP or the CLI get the same project context monoscope uses."
faqs:
  - q: "What do you mean by a software factory?"
    a: "A setup where coding agents write, test and open pull requests, and people review what ships. monoscope fits in two ways: it gives your agents production data, and it runs its own loop from production to pull request."
  - q: "Does it merge or deploy anything on its own?"
    a: "No. Its pull requests are drafts and its reviews are comments. Your reviewers and your CI decide what merges and ships."
  - q: "Do I have to replace the coding agents we use?"
    a: "No. Keep Claude Code, Cursor, Codex or your own agents. Connect them over MCP or the CLI with a project API key, and they query the same data monoscope's AI does."
  - q: "What production data do the agents see?"
    a: "Logs, traces, metrics, issues, deploys and, with our SDKs, the request and response bodies of your API calls and the calls you make to suppliers, unsampled on paid plans."
  - q: "Can it read our code?"
    a: "Only repositories you link. It reads source at the commit that was deployed, so its changes and reviews match the code that ran."
related: [ai-sre, opentelemetry, error-tracking]
---
