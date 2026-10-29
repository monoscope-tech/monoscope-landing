---
title: "monoscope for OpenCode: the full request and response, over MCP"
description: "Connect OpenCode to monoscope's MCP server. It reads the stored request and response behind an incident, plus logs, traces and issues."
eyebrow: "For OpenCode"
logo: opencode
tone: brand
h1: "Give OpenCode the request that broke production"
pitch: "Most observability tools hand your agent sampled spans and error strings. monoscope keeps every request and response, yours and your suppliers', so OpenCode reads the payload that failed before it edits a line."
docs: /docs/ai/mcp/
art: page-coding-agents.webp
terminal: opencode
sections:
  - id: evidence
    icon: database
    eyebrow: "Why monoscope"
    title: "Your agent reads the payload, not a guess"
    lead: "Code and stack traces tell an agent what could have happened. The stored request and response tell it what did. monoscope keeps both for every call your service receives and every call it makes to a supplier, unsampled, next to the logs, traces and metrics around it."
    code_label: "One stored call from 07:52, as OpenCode gets it back"
    code_class: nohighlight
    code: |
      resource.service.name                 orders-service
      attributes.http.request.method        POST
      attributes.url.full                   https://api.acme-logistics.com/v1/shipments
      attributes.http.response.status_code  200
      body.request_body                     {"order_id":"ord_8812","service_level":"standard"}
      body.response_body                    {"status":"acknowledged","shipment_id":"shp_8812"}
    bullets:
      - title: "Unsampled, bodies included"
        icon: align-left
        body: "Every request and response is kept with its headers and body. Bodies don't add to your event count or your bill."
      - title: "Your suppliers' calls too"
        icon: plug
        body: "Calls out to Stripe, Acme or any third-party API are stored the same way, so the agent can show what they sent back."
      - title: "Breaking changes, already flagged"
        icon: bug
        body: "When a response drops a field or changes a type, monoscope opens an issue. The agent finds it with list_issues instead of rediscovering it."
      - title: "One key for all of it"
        icon: zap
        body: "Logs, traces, metrics, requests, issues, monitors and dashboards answer to the same API key and the same query language."
    link: /features/logs-and-traces/
    link_label: "How monoscope keeps requests"
  - id: setup
    icon: plug
    eyebrow: "Set it up"
    title: "One file, then ask"
    lead: "Add monoscope as a remote MCP server in opencode.json. The key comes from your environment, so the file is safe to commit."
    code_label: "opencode.json"
    code_class: language-json
    code: |
      {
        "$schema": "https://opencode.ai/config.json",
        "mcp": {
          "monoscope": {
            "type": "remote",
            "url": "https://api.monoscope.tech/api/v1/mcp",
            "headers": { "Authorization": "Bearer {env:MONOSCOPE_API_KEY}" }
          }
        }
      }
    bullets:
      - title: "Scoped to one project"
        icon: users
        body: "The key carries the project, so there's no project id to pass. Give each person their own key."
      - title: "Nothing to run"
        icon: zap
        body: "The server is hosted at api.monoscope.tech. No binary, no container, no process to keep alive."
      - title: "Turn tools off by name"
        icon: code
        body: "Monoscope tools appear as monoscope_*. Disable the ones you don't want under tools in opencode.json, for example monoscope_delete_*."
    link: /docs/ai/mcp/
    link_label: "MCP server reference"
  - id: tools
    icon: database
    eyebrow: "What it can call"
    title: "Your production data, as tools"
    lead: "The tools come from the monoscope API, plus three that bundle a whole investigation into one call. New API endpoints show up as tools with nothing to update on your side."
    bullets:
      - title: "Search every request and log"
        icon: align-left
        body: "search_events runs a KQL query over logs, spans and stored request and response bodies. get_schema and list_facets tell it which fields exist."
      - title: "Find what's failing"
        icon: bug
        body: "find_error_patterns ranks what's growing this hour. list_issues and analyze_issue return an issue with a written diagnosis."
      - title: "Read metrics"
        icon: bar-chart
        body: "query_metrics runs the same queries as your dashboards, with rate and increase for counters."
      - title: "Change monitors and dashboards"
        icon: radio
        body: "Create, mute and resolve monitors, or apply a dashboard from YAML. You can turn off any monoscope tool by name in opencode.json."
    link: /docs/ai/mcp/
    link_label: "See every tool"
  - id: ask
    icon: activity
    eyebrow: "While you work"
    title: "Ask about production without leaving the terminal"
    lead: "The questions you'd otherwise answer by opening three dashboards. OpenCode asks monoscope mid-task, gets the records back and keeps working."
    bullets:
      - title: "\"What did Acme return for order 8812?\""
        icon: align-left
        body: "Finds the outbound call by its attributes and returns the stored response body."
      - title: "\"Did my last deploy slow down checkout?\""
        icon: activity
        body: "Compares p95 latency per endpoint before and after the new service version."
      - title: "\"Which endpoints started failing in the last hour?\""
        icon: bug
        body: "Ranks the new error patterns and lists the endpoints and messages behind them."
      - title: "\"Alert me if checkout errors pass 50 in five minutes.\""
        icon: radio
        body: "Creates the monitor and returns its link. Ask again to mute it."
  - id: skills
    icon: zap
    eyebrow: "Skills"
    title: "Playbooks for the jobs you repeat"
    lead: "The monoscope skills give OpenCode a playbook for each job. They drive the monoscope CLI in your shell, so the same steps work in CI and over SSH."
    code_label: "terminal"
    code_class: language-bash
    code: |
      npx skills add monoscope-tech/skills

      # The skills call the monoscope CLI
      curl -fsSL https://monoscopehq.com/install.sh | sh
      monoscope auth login
    bullets:
      - title: "Investigate"
        icon: compass
        body: "\"Look into the 500s in checkout-api.\" Finds the services involved, pulls the failing requests and the window around them, and summarises the cause."
      - title: "Triage"
        icon: bug
        body: "\"Do an on-call sweep.\" Reviews open issues, log patterns and monitors, then acknowledges, archives or mutes what's noise."
      - title: "Manage"
        icon: bar-chart
        body: "\"Alert me when checkout errors pass 50.\" Writes monitors and dashboards as code you can keep in the repo."
      - title: "Instrument"
        icon: plug
        body: "\"Add tracing to this app.\" Adds OpenTelemetry and points the exporter at monoscope."
    link: /docs/ai/cli/skills/
    link_label: "Skills reference"
faqs:
  - q: "What does OpenCode need?"
    a: "A monoscope project that's receiving data, and an API key from Settings → API Keys. Setup takes one file."
  - q: "How is this different from other observability MCP servers?"
    a: "An MCP server can only return what its tool kept. APM tools usually sample traces and don't store request or response bodies, so the agent gets an error string and a span. monoscope keeps the full request and response of every call, yours and your suppliers', so the agent can quote the payload that failed."
  - q: "Can OpenCode change anything through monoscope?"
    a: "Inside monoscope, yes: monitors, dashboards, issue status, teams and API keys all have tools. It can't reach your code or infrastructure through monoscope. You can turn off any monoscope tool by name in opencode.json."
  - q: "Does it see request bodies?"
    a: "Yes, the ones monoscope stored. The SDKs redact the fields you list before anything leaves your app, so redacted values never reach monoscope or your agent."
  - q: "What does it cost?"
    a: "The free tier covers 10,000 events a day. Cloud is $29 a month with 20 million events included, then $1 per million. Request and response bodies don't count extra."
  - q: "Does it work with self-hosted monoscope?"
    a: "Yes. The MCP route ships in the open-source server at /api/v1/mcp, so point the URL at your own host. For the CLI and skills, set MONOSCOPE_API_URL."
related: [ai-sre, logs-and-traces, error-tracking]
---
