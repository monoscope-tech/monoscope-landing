---
title: Getting Started
date: 2024-05-04
updatedDate: 2025-04-23
faLogo: circle-play
menuWeight: 1
hideFileTree: true
pageFullWidth: true
---

# Onboarding Guide

This guide walks you through setting up Monoscope: create an account, get an API key, integrate an SDK, and start monitoring your API. The whole process takes about 5 minutes.

```=html
<aside class="not-prose my-8 rounded-xl border border-strokeBrand-weak bg-fillBrand-weak/40 p-6 md:p-8" aria-labelledby="quick-path-heading">
  <div class="flex items-baseline justify-between gap-4 mb-5">
    <div>
      <p class="text-xs uppercase tracking-[0.18em] font-medium text-fillBrand-strong mb-1">Quick path · 90 seconds</p>
      <h2 id="quick-path-heading" class="text-xl md:text-2xl font-semibold tracking-tight text-textStrong m-0">In a hurry? Run these three.</h2>
    </div>
    <a href="#steps" class="hidden md:inline text-sm text-textWeak hover:text-fillBrand-strong shrink-0">Full guide ↓</a>
  </div>

  <ol class="space-y-5 m-0 list-none p-0">
    <li class="flex gap-4">
      <span class="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-fillBrand-strong text-white text-sm font-semibold">1</span>
      <div class="flex-1 min-w-0">
        <p class="m-0 text-textStrong font-medium">Sign up & grab your API key</p>
        <p class="m-0 mt-1 text-sm text-textWeak">Create an account at <a href="https://app.monoscope.tech?utm_source=docs_quickpath" class="text-fillBrand-strong hover:underline">app.monoscope.tech</a> — your default project gives you an API key on first load.</p>
      </div>
    </li>
    <li class="flex gap-4">
      <span class="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-fillBrand-strong text-white text-sm font-semibold">2</span>
      <div class="flex-1 min-w-0">
        <p class="m-0 text-textStrong font-medium">Install the CLI (or pick your SDK)</p>
        <pre class="m-0 mt-2 px-4 py-3 rounded-lg overflow-x-auto text-[13px] leading-relaxed" style="background:#0d1117;color:#e6edf3;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace">curl monoscope.tech/install.sh | sh
monoscope auth login</pre>
        <p class="m-0 mt-2 text-sm text-textWeak">Prefer language-native? Jump to <a href="/docs/sdks/" class="text-fillBrand-strong hover:underline">SDK Guides</a>.</p>
      </div>
    </li>
    <li class="flex gap-4">
      <span class="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-fillBrand-strong text-white text-sm font-semibold">3</span>
      <div class="flex-1 min-w-0">
        <p class="m-0 text-textStrong font-medium">Send your first event</p>
        <pre class="m-0 mt-2 px-4 py-3 rounded-lg overflow-x-auto text-[13px] leading-relaxed" style="background:#0d1117;color:#e6edf3;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace">monoscope send-event -m "Hello from Monoscope"</pre>
        <p class="m-0 mt-2 text-sm text-textWeak">Open the <a href="https://app.monoscope.tech" class="text-fillBrand-strong hover:underline">dashboard</a> — your event lands in seconds. That's the aha. ✓</p>
      </div>
    </li>
  </ol>

  <p class="mt-6 mb-0 text-sm text-textWeak md:hidden">Need more detail? <a href="#steps" class="text-fillBrand-strong hover:underline">Read the full guide below ↓</a></p>
</aside>
```

Prefer video? Here's a walkthrough:

```=html
<iframe
  class="w-full h-48 md:h-96 lg:h-96 xl:h-96"
  src="https://www.youtube.com/embed/Q-tGuIkDmyk?si=xFhCZrvS-g-bjnqj"
  title="YouTube Video Player: monoscope Walkthrough"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  ></iframe>
```

```=html
<hr />
```

## Steps {#steps}

1. [Create an Account](#①-create-an-account)
2. [Create a Project](#②-create-a-new-project)
3. [Get Your API Key](#③-fetch-api-key)
4. [Integrate an SDK](#④-integrate-sdk)
5. [Test Your Integration](#⑤-quick-test-your-integration)
6. [Acknowledge Endpoints](#⑥-acknowledge-endpoints-or-anomalies)

## ① Create an Account

[Sign up at app.monoscope.tech](https://app.monoscope.tech?utm_source=docs_onboarding) using Google, GitHub, or email.

![Screenshot of monoscope's signup page](/docs/onboarding/new-signup-page.png)

## ② Create a New Project

After signing up, you'll be guided through creating your first project. You can update all of these values later.

- **About you**: A quick survey to help us tailor your experience.
![Screenshot of monoscope's create new project page](/docs/onboarding/new-create-project.png)

- **Setup project**: Choose a server location and the features you'll be exploring.
![Screenshot of monoscope's configure project](/docs/onboarding/configure-project.png)

- **Create endpoint**: Add an endpoint to monitor and optionally choose the request type.
![Screenshot of monoscope's create new project page](/docs/onboarding/create-first-endpoint.png)

- **Set notifications**: Get alerts via Slack, Discord, email, or SMS when something goes wrong (optional).
![Screenshot of monoscope's create new project page](/docs/onboarding/set-notifications.png)

- **Add member**: Invite teammates to the project (optional).
![Screenshot of monoscope's create new project page](/docs/onboarding/invite-member.png)

- **Integration examples**: See sample code for your framework (optional).
![Screenshot of monoscope's create new project page](/docs/onboarding/integration.png)

- **Plan**: Choose your billing plan (required).
![Screenshot of monoscope's create new project page](/docs/onboarding/plans.png)



```=html
<div class="callout">
  <i class="fa-solid fa-forward"></i>
  <p>Click <b>Proceed</b> to create your project. You'll be taken to the dashboard.</p>
</div>
```

## ③ Get Your API Key

An API key is generated automatically when you create a project. To find it or create additional keys, click **API Keys** in the bottom-left of the dashboard.

![Screenshot of monoscope's settings popup](/docs/onboarding/new-api-keys.png)

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p>Create separate API keys for each environment (<b>development</b>, <b>staging</b>, <b>production</b>) to keep your data isolated.</p>
</div>
```


![Screenshot of monoscope's API keys page](/docs/onboarding/create-new-api-key.png)

## ④ Integrate an SDK

Add a Monoscope SDK to your application to start sending telemetry data. We have native SDKs for 17+ frameworks, plus OpenTelemetry support for any language.

```=html
<div class="callout">
  <i class="fa-solid fa-code"></i>
  <p>Find your framework in the <a href="/docs/sdks" class="font-semibold underline">SDK Guides</a>: Node.js, Python, Go, PHP, .NET, Java, and more. If your language isn't listed, use <a href="/docs/sdks/opentelemetry/" class="font-semibold underline">OpenTelemetry</a> to integrate directly.</p>
</div>
```

Need help? [Email us](mailto:hello@monoscope.tech) and we'll get you set up.

## ⑤ Test Your Integration

Verify everything works before deploying. No extra tools needed — the CLI handles it.

**Single event — instant confirmation:**

```bash
monoscope send-event -m "Hello from Monoscope"
```

Open the dashboard and search for your message in the Log Explorer. If it appears, your pipeline is working end-to-end.

**Sustained load — stress-test the pipeline:**

```bash
monoscope telemetrygen --kind=trace --rate=5 --count=50 --service=my-service
```

Useful for verifying ingestion at volume before a real deploy.

#### `send-event` options

- `-m TEXT`: Message (repeatable — multiple `-m` lines join into one event)
- `--level debug|info|warn|error`: Severity (default: `info`)
- `--service NAME`: Service name shown in the dashboard
- `-t KEY:VALUE`: Tag attribute, repeatable
- `-e KEY:VALUE`: Extra attribute, repeatable
- `-r KEY:VALUE`: Resource attribute (e.g. `service.version:1.2.0`), repeatable

#### `telemetrygen` options

- `--kind trace|log|metric`: Type of telemetry (default: `trace`)
- `--rate N`: Events per second (default: `1`)
- `--count N`: Total to send — omit to run continuously
- `--service NAME`: Service name (default: `telemetrygen`)
- `-r KEY:VALUE`: Resource attribute, repeatable

```=html
<div class="callout">
  <i class="fa-solid fa-check-circle"></i>
  <p>Check the <b>API Log Explorer</b> in your dashboard — events should appear within a few seconds.</p>
</div>
```

## ⑥ Acknowledge Endpoints or Anomalies

As Monoscope receives traffic, it auto-detects your API endpoints (visible in [Explorer](/docs/dashboard/endpoints/)) and anomalies (visible in [Changes & Errors](/docs/dashboard/changes-errors/)). **Acknowledge** each endpoint to tell Monoscope what's expected — this enables accurate anomaly detection and scheduled reports.

![Monoscope dashboard showing detected anomalies](/docs/onboarding/anomalies.png)

## Dashboard Overview

| Tab | What it does |
|---|---|
| **Get Started** | Onboarding checklist for your integration |
| **Dashboard** | Analytics overview: requests, anomalies, latency, and errors |
| **Endpoints** | All detected API endpoints |
| **API Log Explorer** | Search and filter request logs, create alerts |
| **Changes & Errors** | Detected anomalies and errors |
| **Outgoing Integrations** | External API calls your service makes |
| **API Tests** | Create and schedule HTTP response validation tests |
| **Reports** | Email report history and frequency settings |

## Next Steps

```=html
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
    <a href="/docs/sdks" class="docs-card rounded-lg">
        <p><i class="fa-solid fa-code"></i><span class="text-2xl">SDK Guides</span></p>
        <span>Native SDKs for Node.js, Python, Go, PHP, .NET, and 12+ more frameworks.</span>
    </a>
    <a href="/docs/dashboard" class="docs-card rounded-lg">
        <p><i class="fa-solid fa-chart-line"></i><span class="text-2xl">Dashboard Guides</span></p>
        <span>Explore endpoints, logs, anomalies, tests, and analytics in the dashboard.</span>
    </a>
    <a href="/docs/ai/cli/" class="docs-card rounded-lg">
        <p><i class="fa-solid fa-terminal"></i><span class="text-2xl">CLI &amp; Agents</span></p>
        <span>Drive Monoscope from the terminal — and let Claude Code skills triage incidents end-to-end.</span>
    </a>
</div>
```

```=html
<div class="callout">
  <i class="fa-solid fa-terminal"></i>
  <p><strong>Prefer terminal-first?</strong> Install the CLI and run <code>monoscope auth login</code> instead of clicking through the dashboard. <a href="/docs/ai/cli/install/" class="font-semibold underline">Install &amp; authenticate guide →</a></p>
</div>
```
