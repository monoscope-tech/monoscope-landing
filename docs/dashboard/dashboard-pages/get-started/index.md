---
title: Get Started
date: 2024-04-22
updatedDate: 2024-05-03
menuWeight: 1
---

# Get Started Page

In this guide, you will learn how to effectively navigate through the **Get Started** page on the monoscope dashboard and maximize all the powerful features accessible in it.

```=html
<hr />
```

On this page, you will find the checklist that shows your onboarding progress. The last and **important step is to integrate your project with [one of our SDKs](/docs/sdks/)** so monoscope can begin monitoring your API and likewise, you can begin exploring your API data in our dashboard. To help you achieve that easily, we also provide quick guides on this page on how to install and integrate some of our popular SDKs (others are linked too) with the auto-generated API key included in the code snippets so you can easily copy and paste them into your application. If you want to create a new API key or see all created API keys, you can click the **Generate an API key** step to go to the page for that.

![Screenshot of monoscope's get started page](/docs/dashboard/dashboard-pages/get-started/get-started-new.png)

Once you finish integrating one of our SDKs with your application, monoscope will begin monitoring your API, and you can now move forward to other pages in the dashboard.

## Quick Test - Try It Without Code

Want to test monoscope before integrating it into your application? You can use **telemetrygen** to send test telemetry data and see how monoscope works immediately!

### What is telemetrygen?

Telemetrygen is an OpenTelemetry tool that generates sample telemetry data. It's perfect for:
- **Testing your API key** before deploying your app
- **Exploring monoscope features** without writing code
- **Validating your setup** is working correctly
- **Testing alerting rules** with simulated traffic

### Quick Start (< 2 minutes)

```=html
<section class="tab-group" data-tab-group="quicktest">
  <button class="tab-button" data-tab="docker">Docker (Easiest)</button>
  <button class="tab-button" data-tab="macos">macOS</button>
  <button class="tab-button" data-tab="linux">Linux</button>
  <button class="tab-button" data-tab="windows">Windows</button>

  <div id="docker" class="tab-content">
    <pre><code class="language-bash"># Run this single command with your API key
docker run --rm -it ghcr.io/open-telemetry/opentelemetry-collector-contrib/telemetrygen:latest \
  traces --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY" \
  --traces 10 --rate 2</code></pre>
    <p class="mt-2 text-sm">✅ No installation needed - just Docker!</p>
  </div>

  <div id="macos" class="tab-content">
    <pre><code class="language-bash"># Install with Homebrew
brew install telemetrygen

# Send test data
telemetrygen traces --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY" \
  --traces 10 --rate 2</code></pre>
  </div>

  <div id="linux" class="tab-content">
    <pre><code class="language-bash"># Download and install
curl -LO https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest/download/telemetrygen_linux_amd64
chmod +x telemetrygen_linux_amd64
sudo mv telemetrygen_linux_amd64 /usr/local/bin/telemetrygen

# Send test data
telemetrygen traces --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY" \
  --traces 10 --rate 2</code></pre>
  </div>

  <div id="windows" class="tab-content">
    <pre><code class="language-powershell"># Download in PowerShell
Invoke-WebRequest -Uri https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/latest/download/telemetrygen_windows_amd64.exe -OutFile telemetrygen.exe

# Send test data
.\telemetrygen.exe traces --otlp-insecure `
  --otlp-endpoint otel.monoscope.tech:4317 `
  --otlp-header="x-api-key=YOUR_API_KEY" `
  --traces 10 --rate 2</code></pre>
  </div>
</section>
```

```=html
<div class="callout">
  <i class="fa-solid fa-rocket"></i>
  <p><b>What happens next?</b> After running the command, check your <a href="/docs/dashboard/dashboard-pages/log-explorer/">API Log Explorer</a> - you should see test traces appearing within seconds! This confirms your API key works and monoscope is ready to receive your data.</p>
</div>
```

### Simulate Different Scenarios

```bash
# Simulate normal traffic
telemetrygen traces --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY" \
  --service-name "my-api" \
  --duration 30s --rate 10

# Generate errors to test alerts
telemetrygen traces --otlp-insecure \
  --otlp-endpoint otel.monoscope.tech:4317 \
  --otlp-header="x-api-key=YOUR_API_KEY" \
  --service-name "my-api" \
  --status-code "ERROR" --traces 5
```

### Why Use This?

- **🚀 Instant Gratification**: See monoscope in action before writing any integration code
- **✅ Validate Setup**: Confirm your API key and project configuration work correctly
- **🧪 Test Features**: Explore dashboards, alerts, and analytics with real-looking data
- **📊 Demo Ready**: Perfect for showing monoscope to your team

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p><b>Pro Tip:</b> Use different service names and span names in telemetrygen to simulate multiple services and see how monoscope organizes and visualizes complex architectures!</p>
</div>
```

```=html
<hr />
<a href="/docs/dashboard/dashboard-pages/dashboard/" class="w-full btn btn-outline link link-hover">
    Next: Dashboard Page
    <i class="fa-regular fa-arrow-right mr-4"></i>
</a>
```
