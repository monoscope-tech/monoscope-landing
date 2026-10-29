---
title: Getting Started
ogTitle: Get Started with monoscope
date: 2024-05-04
updatedDate: 2026-10-29
faLogo: circle-play
menuWeight: 1
hideFileTree: true
pageFullWidth: true
---

# Get Started

Send your first logs, traces and requests to monoscope in about five minutes. You create an account, get an API key, and connect your application. The free plan includes 10k events a day and needs no credit card.

```=html
<aside class="not-prose my-8 rounded-xl border border-strokeBrand-weak bg-fillBrand-weak/40 p-6 md:p-8" aria-labelledby="two-ways-heading">
  <p class="text-xs uppercase tracking-[0.18em] font-medium text-fillBrand-strong mb-1">Two ways to start</p>
  <h2 id="two-ways-heading" class="text-xl md:text-2xl font-semibold tracking-tight text-textStrong m-0">Let your coding agent do it, or set four variables by hand</h2>
  <div class="grid md:grid-cols-2 gap-4 mt-6">
    <a href="#connect-your-application" class="block rounded-lg border border-strokeWeak bg-bgBase p-5 hover:border-strokeBrand-weak">
      <p class="m-0 text-textStrong font-medium"><i class="fa-solid fa-bolt mr-1.5 text-fillBrand-strong"></i>With your coding agent</p>
      <p class="m-0 mt-1.5 text-sm text-textWeak">Claude Code, Cursor, Codex or Cline adds OpenTelemetry to your project and checks that every route reports in. About two minutes.</p>
    </a>
    <a href="#connect-your-application" class="block rounded-lg border border-strokeWeak bg-bgBase p-5 hover:border-strokeBrand-weak">
      <p class="m-0 text-textStrong font-medium"><i class="fa-solid fa-code mr-1.5 text-fillBrand-strong"></i>By hand, in any language</p>
      <p class="m-0 mt-1.5 text-sm text-textWeak">Point any OpenTelemetry SDK or collector at monoscope with four environment variables. Our SDKs also capture request and response bodies.</p>
    </a>
  </div>
</aside>
```

## Before You Start

- An application, service or server that you can change and restart.
- For the coding-agent path: Claude Code, Cursor, Codex, Cline or another agent that supports skills.
- For the CLI: macOS or Linux.

{#create-an-account}
## 1. Create an Account

1. Go to [app.monoscope.tech](https://app.monoscope.tech?utm_source=docs_onboarding).
2. Sign up with Google, GitHub or an email address and password.

monoscope creates your first project and opens the project setup.

{#set-up-your-project}
## 2. Set Up Your Project

The setup has five short steps. You can change every answer later in **Settings**.

1. **About you.** Enter your name, your company and the size of your team.
2. **Configure your project.** Select where monoscope stores your data (USA, EU or Asia). Then select the features that you plan to use.
3. **Notifications.** Connect Slack or Discord, or enter email addresses and a phone number for alerts. You can also invite team members from this step. This step is optional.
4. **Instrument your apps or servers.** This step shows your API key and setup guides for each stack. Keep this page open for [step 4](#connect-your-application).
5. **Pick a plan.** Select the free plan or a paid plan.

{#get-your-api-key}
## 3. Get Your API Key

Every project gets an API key when you create it. The setup shows this key in step 4. To see it later, or to make more keys, open **Settings > API Keys**.

```=html
{% render "docs/components/shot", name: "settings-api-keys", alt: "The API Keys page in monoscope settings, with a list of keys and the date each key was made" %}
```

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p>Use a different API key for each environment, for example development, staging and production. Then you can turn off one key without an effect on the others.</p>
</div>
```

{#connect-your-application}
## 4. Connect Your Application

Select one of the two paths.

```=html
<section class="tab-group" data-tab-group="connect">
  <button class="tab-button" data-tab="connect-agent">With your coding agent</button>
  <button class="tab-button" data-tab="connect-hand">By hand</button>
  <div id="connect-agent" class="tab-content">
```

Install the monoscope skills for your agent:

```sh
# Claude Code
claude plugin marketplace add monoscope-tech/skills
claude plugin install monoscope-skills@monoscope-skills

# Cursor, Codex, Cline and other agents
npx skills add monoscope-tech/skills
```

Install the monoscope CLI and log in. The login opens your browser:

```sh
curl -fsSL https://monoscopehq.com/install.sh | sh
monoscope auth login
```

Ask your agent to instrument the project. In Claude Code, run:

```
/monoscope-skills:instrument Add OpenTelemetry for monoscope to this project
```

The skill adds the OpenTelemetry SDK for your language. It covers HTTP, SQL, queues and background jobs. Then it uses the CLI to make sure that events arrive.

```=html
  </div>
  <div id="connect-hand" class="tab-content">
```

Set these four environment variables in your application. Replace `YOUR_API_KEY` with the key from step 3:

```ini
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
OTEL_SERVICE_NAME="orders-service"
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
```

Any OpenTelemetry SDK or collector reads these variables. To capture request and response bodies, add the monoscope SDK for your framework. Each guide shows the full setup:

- [Node.js](/docs/sdks/nodejs/): Express, Fastify, NestJS, Next.js, AdonisJS
- [Python](/docs/sdks/python/): Django, FastAPI, Flask, Pyramid
- [Go](/docs/sdks/golang/): Gin, Echo, Chi, Fiber, Gorilla Mux, net/http
- [PHP](/docs/sdks/php/): Laravel, Symfony, Slim
- [Java](/docs/sdks/java/), [.NET](/docs/sdks/dotnet/), [Elixir](/docs/sdks/elixir/)
- [Browser](/docs/sdks/Javascript/) and [Flutter](/docs/sdks/flutter/) apps
- [Infrastructure](/docs/sdks/infrastructure/) and [databases](/docs/sdks/databases/)
- [Any other language](/docs/sdks/opentelemetry/), with OpenTelemetry

```=html
  </div>
</section>
```

{#check-that-events-arrive}
## 5. Check That Events Arrive

Send a test event with the CLI. If you did not install the CLI in step 4, install it and log in first:

```sh
curl -fsSL https://monoscopehq.com/install.sh | sh
monoscope auth login
monoscope send-event -m "Hello from monoscope"
```

Open **Log Explorer** in monoscope and search for `Hello from monoscope`. The event shows in a few seconds. Then send some requests to your application. Its logs, traces and requests show in the same place.

```=html
{% render "docs/components/shot", name: "log-explorer", alt: "Log Explorer in monoscope, with a chart of events over time above a list of logs and spans" %}
```

To test the pipeline with more data, send synthetic traces:

```sh
monoscope telemetrygen --kind=trace --rate=5 --count=50 --service=my-service
```

{class="docs-table overflow-x-auto"}
:::
| Command | Option | What it does |
|---|---|---|
| `send-event` | `-m TEXT` | Message. Use it more than once to send a multi-line message. |
| | `--kind log\|trace\|error` | Event type. The default is `log`. |
| | `--level debug\|info\|warn\|error` | Severity. The default is `info`. |
| | `--service NAME` | Service name. The default is `monoscope-cli`. |
| | `-t KEY:VALUE`, `-e KEY:VALUE` | Tag and extra attributes. You can use each more than once. |
| | `-r KEY:VALUE` | Resource attribute, for example `service.version:1.2.0`. |
| `telemetrygen` | `--kind trace\|log\|metric` | Telemetry type. The default is `trace`. |
| | `--rate N` | Events per second. The default is `1`. |
| | `--count N` | Total events. Without it, the command runs until you stop it. |
| | `--service NAME` | Service name. The default is `telemetrygen`. |
:::

If no events arrive after a minute:

1. Make sure that `OTEL_RESOURCE_ATTRIBUTES` contains your API key, with no spaces.
2. Make sure that your network allows outgoing traffic to `otelcol.monoscope.tech` on port 4317 (gRPC) or 4318 (HTTP).
3. Run `monoscope auth status` to see which project the CLI sends to.

## Next Steps

```=html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 not-prose">
  <a href="/docs/dashboard/" class="docs-card rounded-lg">
    <p><i class="fa-solid fa-chart-line"></i><span class="text-2xl">Find Your Way Around</span></p>
    <span>Log Explorer, issues, monitors, dashboards and the API catalog.</span>
  </a>
  <a href="/docs/ai/" class="docs-card rounded-lg">
    <p><i class="fa-solid fa-terminal"></i><span class="text-2xl">CLI, Skills and MCP</span></p>
    <span>Investigate production from your terminal, your coding agent or any MCP client.</span>
  </a>
  <a href="/docs/sdks/" class="docs-card rounded-lg">
    <p><i class="fa-solid fa-code"></i><span class="text-2xl">SDK Guides</span></p>
    <span>Capture request and response bodies, redact fields and report errors.</span>
  </a>
</div>
```

Need help with the setup? [Email us](mailto:hello@monoscope.tech) and we will help you connect your stack.
