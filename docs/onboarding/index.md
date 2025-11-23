---
title: Onboarding
date: 2024-05-04
updatedDate: 2025-04-23
faLogo: circle-play
menuWeight: 1
hideFileTree: true
pageFullWidth: true
---

# Onboarding Guide

**monoscope** is an API-first monitoring and observability platform for engineering and customer support teams. We use AI to help engineering teams observe, manage, monitor, and test their backend systems and any external API they depend on. When you integrate monoscope into your application, you gain access to different features out-of-the-box, including but not limited to **API Monitoring and Observability**, **Error Tracking**, **Anomalies Detection**, **API Log Explorer**, **API Testing**, **API Management**, **API Analytics**, **Automatic OpenAPI Spec Generation**, and even more coming (we are always shipping!).

In this guide, we will walk you through the process of integrating monoscope into your API application. You will learn all the steps required to set up your account, fetch an API key, integrate with our SDK, and start monitoring requests on your API. If you prefer a video guide, here's one for you:

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

## Getting Started

There are six steps required to get started with monoscope and begin exploring and analyzing requests from your API in our dashboard:

1. [Create an Account](#create-an-account)
2. [Create a New Project](#create-a-new-project)
3. [Fetch API Key](#fetch-api-key)
4. [Integrate SDK](#integrate-sdk)
5. [Quick Test Your Integration](#⑤-quick-test-your-integration)
6. [Acknowledge Endpoints or Anomalies](#⑥-acknowledge-endpoints-or-anomalies)

## ① Create an Account

Kindly visit [this page](https://app.monoscope.tech?utm_source=docs_onboarding) to create a new account. When you are there, you can choose to sign up with either your **Google** or **GitHub** account or your **email address**. If you choose to sign up with Google or GitHub, you will be redirected to the respective authentication page to authorize monoscope. If you choose to sign up with your email address, you will need to provide your email address and a strong password in the input fields as seen in the screenshot below.

![Screenshot of monoscope's signup page](/docs/onboarding/new-signup-page.png)

```=html
<div class="callout">
  <i class="fa-solid fa-forward"></i>
  <p>Once you are done providing the required values, click on the <b>Continue</b> button. Your account will then be created and you will be redirected to the monoscope dashboard.</p>
</div>
```

## ② Create a New Project

Once you are redirected to the dashboard, you have to create a new project to begin using monoscope. Kindly provide the values requested in the form as listed below. You can always update any of these values later.

- **About you**: A quick survey that helps us gives better service to users.
![Screenshot of monoscope's create new project page](/docs/onboarding/new-create-project.png)

- **Setup project**: Choose a server location and the features you'll be exploring.
![Screenshot of monoscope's configure project](/docs/onboarding/configure-project.png)

- **Create endpoint**: Create an endpoint you'd like to monitor and choose the request type(optional).
![Screenshot of monoscope's create new project page](/docs/onboarding/create-first-endpoint.png)

- **Set notifications**: Connect your project to Slack, Discord, Email or your phone number to get notified when something goes wrong(optional).
![Screenshot of monoscope's create new project page](/docs/onboarding/set-notifications.png)

- **Add member**: Invite someone else to collaborate on the project (optional).
![Screenshot of monoscope's create new project page](/docs/onboarding/invite-member.png)

- **Integration examples**: Select an SDK to see the integration guide for it (optional).
![Screenshot of monoscope's create new project page](/docs/onboarding/integration.png)

- **Plan**: Select the plan you want to subscribe to (required).
![Screenshot of monoscope's create new project page](/docs/onboarding/plans.png)



```=html
<div class="callout">
  <i class="fa-solid fa-forward"></i>
  <p>Once you are done providing the required values and your payment details (if you chose the <b>Pay as you use</b> plan), click the <b>Proceed</b> button. Your new project will then be created and you will be redirected to your monoscope dashboard.</p>
</div>
```

## ③ Fetch API Key

Once your project is created, an API key is automatically generated for you (which you can already see being used in the integration examples). To fetch your API key anytime or create a new one, kindly click on the API keys at the bottom-left section of the dashboard. You will then be redirected to another page where you can access the API key or create a new one.

![Screenshot of monoscope's settings popup](/docs/onboarding/new-api-keys.png)

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p>Usually you will create an API key for the different environments you want monoscope to track from (e.g., <b>development</b>, <b>staging</b>, <b>production</b>, etc.) and use each of the API keys when integrating with any of our SDK.</p>
</div>
```


![Screenshot of monoscope's API keys page](/docs/onboarding/create-new-api-key.png)

## ④ Integrate SDK

To allow monoscope to begin monitoring your API and for you to start exploring your data through our platform, you need to integrate one of our SDKs into your application. We support OpenTelemetry and have native SDKs for 17+ web frameworks in different programming languages.

```=html
<div class="callout">
  <i class="fa-solid fa-code"></i>
  <p>To integrate monoscope with your preferred framework, please visit our <a href="/docs/sdks" class="font-semibold underline">SDK Guides</a> section where you'll find detailed integration instructions for each language and framework we support, including:</p>
  <ul class="list-disc list-inside mt-2">
    <li>JavaScript/Node.js (Express, Fastify, NestJS, etc.)</li>
    <li>Python (Django, FastAPI, Flask, etc.)</li>
    <li>Go (Gin, Echo, Fiber, etc.)</li>
    <li>PHP (Laravel, Symfony, Slim)</li>
    <li>.NET Core</li>
    <li>Java (Spring Boot)</li>
    <li>And more...</li>
  </ul>
</div>
```

If we don't support your framework yet, kindly [send us an email](mailto:hello@monoscope.tech) and we'll help you get started!

## ⑤ Quick Test Your Integration

Want to verify that your monoscope integration is working correctly before deploying your application? You can quickly send test telemetry data to monoscope using **telemetrygen**, a tool that generates sample OpenTelemetry data.

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

Replace `YOUR_API_KEY` with your actual monoscope API key from [Step 3](#fetch-api-key).

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
  <p>After running the command, check your monoscope dashboard. You should see the test traces appear in the <b>API Log Explorer</b> within a few seconds. This confirms that your API key is valid and monoscope is correctly receiving telemetry data.</p>
</div>
```

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p><b>Pro tip:</b> Use telemetrygen to test your alerting rules and monitors by generating specific error patterns or latency spikes before deploying your actual application.</p>
</div>
```

## ⑥ Acknowledge Endpoints or Anomalies

Once monoscope starts tracking data from your API, you will find the list of **detected endpoints** on the [Explorer](/docs/dashboard/endpoints/) page and the list of **detected anomalies** on the [Changes & Errors](/docs/dashboard/changes-errors/) page or in the Ongoing Anomalies and Monitors section of the [Dashboard](/docs/dashboard/dashboard/) page. You need to **acknowledge** each endpoint or anomaly so monoscope understands the shape of the endpoints on your API and uses that information for future anomaly detections. As a side effect, we then use this information to trigger the [OpenAPI spec generation](/docs/dashboard/documentation) feature and send you scheduled reports. Hence, **you should continuously acknowledge all important endpoints and anomalies you want us to monitor**.

![monoscope dashboard screenshot](/docs/onboarding/anomalies.png)

Once you successfully integrate monoscope into your application using any of our SDKs, we will start monitoring requests to your API and you can start acknowledging endpoints/anomalies, begin exploring the tracked data in the dashboard, and begin using all our powerful features.

## Dashboard Overview

Here is a quick overview of all the available dashboard tabs and the features in them to aid your navigation:

```=html
<table class="table border">
<!-- <tr>
<th class="font-bold border">Tab Name</th>
<th class="font-bold">Description</th>
</tr> -->
<tr>
<td class="font-bold border">Get Started</td>
<td>The onboarding checklist that reminds you of all you need to integrate monoscope into your API and begin monitoring requests.</td>
</tr>
<tr>
<td class="font-bold border">Dashboard</td>
<td>A summary of all the API analytics, including requests, anomalies, endpoints, etc. alongside all the requests visualized by status code, errors, endpoint, and latency percentiles.</td>
</tr>
<tr>
<td class="font-bold border">Endpoints</td>
<td>A list of all endpoints detected from your API.</td>
</tr>
<tr>
<td class="font-bold border">API Log Explorer</td>
<td>A list of all request logs with options to query them based on certain parameters and create alerts.</td>
</tr>
<tr>
<td class="font-bold border">Changes & Errors</td>
<td>A list of all anomalies and errors detected from your API.</td>
</tr>
<tr>
<td class="font-bold border">Outgoing Integrations</td>
<td>A list of all outgoing requests (external API calls) from your API.</td>
</tr>
<tr>
<td class="font-bold border">API Tests</td>
<td>Explore and create manual or scheduled test assertions with multiple steps to validate HTTP responses in your API.</td>
</tr>
<tr>
<td class="font-bold border">Reports</td>
<td>Explore your email reports history and update the frequency of the reports.</td>
</tr>
</table>
```

## Next Steps

**Great work on getting this far!** You are now on the path to testing and improving your backend systems.

Now that you have set up your new project with monoscope, you should explore the pages below to learn even more.

```=html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
    <a href="/docs/sdks" class="docs-card rounded-lg">
        <p><i class="fa-solid fa-code"></i><span class="text-2xl">SDK Guides</span></p>
        <span>Integrate monoscope using our SDKs for Node.js, Python, Go, and 14+ other frameworks.</span>
    </a>
    <a href="/docs/dashboard" class="docs-card rounded-lg">
        <p><i class="fa-solid fa-chart-line"></i><span class="text-2xl">Dashboard Guides</span></p>
        <span>Navigate through monoscope's dashboard features, settings, and analytics tools.</span>
    </a>
</div>
```
