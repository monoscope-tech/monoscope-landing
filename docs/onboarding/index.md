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

## Steps

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

Verify everything works by sending test data with **telemetrygen** before deploying.

### Install telemetrygen

First, install the telemetrygen tool based on your operating system:

```=html
<section class="tab-group" data-tab-group="os">
  <button class="tab-button" data-tab="macos">macOS</button>
  <button class="tab-button" data-tab="linux">Linux</button>
  <button class="tab-button" data-tab="windows">Windows</button>
  <button class="tab-button" data-tab="docker">Docker</button>

  <div id="macos" class="tab-content">
    <pre><code class="language-bash"># Using Homebrew
brew install telemetrygen

# Or download directly
curl -LO https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest/download/telemetrygen_darwin_amd64
chmod +x telemetrygen_darwin_amd64
sudo mv telemetrygen_darwin_amd64 /usr/local/bin/telemetrygen</code></pre>
  </div>

  <div id="linux" class="tab-content">
    <pre><code class="language-bash"># Download the binary
curl -LO https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest/download/telemetrygen_linux_amd64
chmod +x telemetrygen_linux_amd64
sudo mv telemetrygen_linux_amd64 /usr/local/bin/telemetrygen</code></pre>
  </div>

  <div id="windows" class="tab-content">
    <pre><code class="language-bash"># Download from PowerShell
Invoke-WebRequest -Uri https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest/download/telemetrygen_windows_amd64.exe -OutFile telemetrygen.exe</code></pre>
  </div>

  <div id="docker" class="tab-content">
    <pre><code class="language-bash"># Run using Docker
docker run --rm -it ghcr.io/open-telemetry/opentelemetry-collector-contrib/telemetrygen:latest \
  traces --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY"</code></pre>
  </div>
</section>
```

### Send Test Data

Once installed, you can send test traces to monoscope using your API key:

```bash
# Send test traces
telemetrygen traces \
  --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY" \
  --traces 10 \
  --rate 2
```

Replace `YOUR_API_KEY` with the key from [Step 3](#③-get-your-api-key).

#### Command Options

- `--traces 10`: Number of traces to generate (default: 1)
- `--rate 2`: Number of traces per second (default: 1)
- `--duration 30s`: How long to generate traces (e.g., 30s, 1m, 5m)
- `--service-name "test-service"`: Custom service name for the traces
- `--span-name "test-operation"`: Custom span name for the operations

### Example: Simulate Different Scenarios

```bash
# Simulate a service with normal traffic
telemetrygen traces \
  --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY" \
  --service-name "payment-service" \
  --span-name "process-payment" \
  --duration 1m \
  --rate 5

# Simulate errors (with status codes)
telemetrygen traces \
  --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY" \
  --service-name "auth-service" \
  --span-name "authenticate" \
  --status-code "ERROR" \
  --traces 5
```

```=html
<div class="callout">
  <i class="fa-solid fa-check-circle"></i>
  <p>Check the <b>API Log Explorer</b> in your dashboard — test traces should appear within a few seconds.</p>
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
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    <a href="/docs/sdks" class="docs-card rounded-lg">
        <p><i class="fa-solid fa-code"></i><span class="text-2xl">SDK Guides</span></p>
        <span>Native SDKs for Node.js, Python, Go, PHP, .NET, and 12+ more frameworks.</span>
    </a>
    <a href="/docs/dashboard" class="docs-card rounded-lg">
        <p><i class="fa-solid fa-chart-line"></i><span class="text-2xl">Dashboard Guides</span></p>
        <span>Explore endpoints, logs, anomalies, tests, and analytics in the dashboard.</span>
    </a>
</div>
```
