---
# UNVERIFIED:
# - "About 50 tools" for MCP comes from docs/ai/mcp, not counted in code.
title: "AI SRE for root cause analysis from the real request"
description: "An AI SRE that finds the root cause from the full request and response, opens the fix as a pull request, checks PRs against production and answers in Slack."
eyebrow: AI SRE
tone: success
h1: "An AI SRE that reads the actual request"
pitch: "It investigates with the failing request and response in front of it, checks production on a schedule, answers in Slack and opens the fix. No second tool underneath deciding what it gets to see."
playground: ai/routines
hero_demo: /assets/demos/fix-b.html
hero_frame: "Slack · app.monoscope.tech / ai / routines"
art: page-ai-sre.webp
sections:
  - id: evidence
    icon: database
    tone: success
    eyebrow: "Why it gets it right"
    title: "Other AI SREs read what another tool kept"
    lead: "An AI layer on top of Datadog or Sentry sees sampled spans and error strings. monoscope keeps every request and response itself, so its AI starts from the payload that failed, the trace around it and the deploy before it."
    shot: ai-chat
    frame: "app.monoscope.tech / ai"
    bullets:
      - title: "The request that failed, in full"
        icon: align-left
        body: "Headers, body and response of the call that failed, in your API or a supplier's, plus every similar call around it."
      - title: "Your code at the commit that ran"
        icon: github
        body: "It reads the source around the stack frame at the deployed revision, your runbooks and recent GitHub deployments."
      - title: "Earlier episodes of the same problem"
        icon: activity
        body: "Recurrences land on the same issue, and monoscope pulls up related past incidents before it guesses at a new cause."
  - id: routines
    icon: calendar
    tone: success
    art: page-routines.webp
    eyebrow: "Routines"
    title: "Checks production on a schedule you set"
    lead: "A routine is an instruction and a schedule: every 30 minutes, every morning at 09:00, every Monday. It queries your logs, traces, metrics and stored requests, then posts what it found in Slack or in the AI chat, or stays quiet when nothing qualifies."
    shot: routines
    frame: "app.monoscope.tech / ai / routines"
    bullets:
      - title: "18 templates to start from"
        icon: grid
        body: "Daily operations briefing, Error regression radar, Dependency degradation digest, On-call handoff. Install one and edit the instructions."
      - title: "Every new version, compared"
        icon: rocket
        body: "Deployment regression review compares errors and latency before and after each deploy."
      - title: "Finds what nothing is watching"
        icon: eye
        body: "Telemetry gap detector flags services that went quiet. Alert quality review names symptoms no monitor caught and monitors that only make noise."
      - title: "Reports only when it matters"
        icon: radio
        body: "Set a routine to post every run, or only when it has a finding. Each one cites the queries and records behind it."
    link: /docs/ai/
    link_label: "How routines work"
  - id: fix
    icon: github
    tone: success
    eyebrow: "Incident to pull request"
    title: "From the failing request to a fix you can review"
    lead: "When an issue opens, the AI reads the request that triggered it, rates the severity and writes up the root cause. Then it opens a pull request with the fix and links the request that proves it."
    shot: issue-detail
    frame: "app.monoscope.tech / issues"
    bullets:
      - title: "Severity before you open it"
        icon: zap
        body: "New errors get a root cause and a category. API changes are rated critical or safe, with breaking fields counted."
      - title: "One issue per problem"
        icon: bug
        body: "Errors are fingerprinted, so one bug hitting thousands of requests is one issue. A monitor that fires again reopens its old issue, history included."
      - title: "Nothing merges on its own"
        icon: code
        body: "Fixes arrive as pull requests. Your review and your CI decide what ships."
  - id: review
    icon: github
    tone: success
    eyebrow: "Before it merges"
    title: "Every pull request, checked against production"
    lead: "Link a GitHub repository and monoscope comments on each open pull request with what live traffic says about the lines it changes: how many requests hit them, how many failed, and what to check next."
    github_review:
      repository: acme/orders-service
      number: 512
      title: Simplify the Acme webhook handler
      author: sam
      branch: sam/acme-cleanup
      verdict: Worth checking
      project: orders
      commit: 9f3c1e0
      window: "2026-10-21 09:00 → 2026-10-28 09:00"
      file: src/shipments/advance.ts:42
      events: "41,208"
      errors: "312"
      finding: "The new guard returns early when <code>tracking_id</code> is absent, which 3% of acme-logistics responses this week were missing."
      next_check: Replay one of those responses against this branch.
    bullets:
      - title: "Tied to the changed lines"
        icon: code
        body: "Findings point at a file and line in the diff, with event and error counts from production."
      - title: "Says when it can't tell"
        icon: eye
        body: "If the changed code has no traffic yet, the verdict says coverage unknown."
      - title: "Advisory, per repository"
        icon: users
        body: "Reviews never block a merge. Turn them on per repository and choose whether the evidence shows on GitHub."
  - id: slack
    icon: users
    tone: success
    eyebrow: "In Slack"
    shot: slack
    frame: "Slack · #engineering"
    title: "Ask it anything about production"
    lead: "\"Orders have been stuck since this morning. Did Acme change something?\" monoscope answers in the thread from your logs, traces, metrics, stored requests and deploys, with a chart and links to the requests it used. Follow-up questions keep the context."
    bullets:
      - title: "Starts from the alert"
        icon: radio
        body: "Reply to an alert thread and it investigates that incident, with the evidence already scoped to it."
      - title: "Shows its working"
        icon: activity
        body: "A progress checklist in the thread shows each query as it runs. Stop it at any point."
      - title: "Only for your project's members"
        icon: users
        body: "Slack identities link to monoscope accounts, and each question is checked against project membership."
  - id: agents
    icon: code
    tone: success
    eyebrow: "Your coding agent"
    title: "Give Claude Code and Cursor the same production data"
    lead: "A hosted MCP server, a CLI built for agents and open-source Claude Code skills. Your agent asks what broke and gets the stored request and response back, not a guess from the code."
    code_label: "terminal"
    code_class: language-bash
    code: |
      # The CLI, for your terminal, CI and agents
      curl https://monoscopehq.com/install.sh | sh
      monoscope issues list --json
      monoscope logs search 'body has "tracking_id"' --since 6h

      # Skills for Claude Code
      claude plugin marketplace add monoscope-tech/skills
      claude plugin install monoscope-skills@monoscope-skills

      # Hosted MCP server, about 50 tools, same API key
      https://api.monoscope.tech/api/v1/mcp
    bullets:
      - title: "Hosted MCP server"
        icon: plug
        body: "About 50 tools for Claude Desktop, Cursor or your own agents. Nothing to install."
      - title: "A CLI that answers in JSON"
        icon: code
        body: "One binary. Piped output switches to JSON with a stable shape, so scripts and agents parse the same thing every time."
      - title: "Claude Code skills"
        icon: zap
        body: "Investigate an incident, triage on-call, manage monitors and add instrumentation, in Claude Code or Codex."
    link: /docs/ai/mcp/
    link_label: "Connect your agent"
faqs:
  - q: "Does the AI change production on its own?"
    a: "No. Fixes arrive as pull requests that go through your review and your CI. Routines can't act unless you allow actions for that routine, and its pull request reviews are comments only. Your review and your CI decide what ships."
  - q: "What does it read that other AI SREs don't?"
    a: "The request and response bodies of your API calls and the calls you make to suppliers, kept on Cloud without sampling, next to logs, traces and metrics. AI layers that sit on Datadog or Sentry only see what those tools kept."
  - q: "Is this AIOps, or AI root cause analysis?"
    a: "It does the root cause part. Each new error gets a written root cause and a category, and an investigation cites the requests, traces, logs and deploys it used. Then it opens a pull request with the fix. It doesn't replace your incident process; it gives it evidence."
  - q: "Do I need your SDK, or is OpenTelemetry enough?"
    a: "Any OpenTelemetry exporter works for logs, traces and metrics. Request and response bodies come from the monoscope SDKs, which redact the fields you list before anything leaves your app."
  - q: "Can it read our code?"
    a: "Only repositories you link. It reads source at the exact commit that was deployed, your runbooks and your GitHub deployments, so its answer matches the code that ran."
  - q: "Do I have to move off Datadog first?"
    a: "No. Run monoscope next to it for a week or two and compare what each one catches. We help you move exporters, dashboards and monitors when you're ready."
related: [error-tracking, api-monitoring, logs-and-traces]
---
