---
title: ExpressJs
ogTitle: ExpressJs Integration Guide
date: 2022-03-23
updatedDate: 2024-06-15
menuWeight: 2
---

# ExpressJs Integration Guide

Monoscope Express Middleware allows you to monitor HTTP requests in your Express applications. It builds upon OpenTelemetry instrumentation to create custom spans for each request, capturing key details such as request and response bodies, headers, and status codes. Additionally, it offers robust support for monitoring outgoing requests and reporting errors automatically.

To get started, you'll need the OpenTelemetry Node.js library and some basic configuration.

```=html
<hr>
```

## Prerequisites

Ensure you have completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

Run the command below to install the Monoscope express sdk and Open telemetery API, SDK, and auto instrumentation tools.

```sh
npm install --save @monoscopetech/express @opentelemetry/api @opentelemetry/auto-instrumentations-node
```

## OpenTelemetery Configuration

This module is highly configurable by setting environment variables. So many aspects of the auto instrumentation’s behavior such as Resource detectors, Exporters, Trace context propagation headers,
and many more can be configured based on your needs.
Add the following environment variables to your `.env` file:

```sh
# Specifies the endpoint URL for the OpenTelemetry collector.
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
# Specifies the name of the service.
OTEL_SERVICE_NAME="{YOUR_SERVICE_NAME}"
# Adds your API KEY to the resource.
OTEL_RESOURCE_ATTRIBUTES="at-project-key={YOUR_API_KEY}"
# Specifies the protocol to use for the OpenTelemetry exporter.
OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
# disable some auto instrumentation libraries
OTEL_NODE_DISABLED_INSTRUMENTATIONS=net,connect,dns,fs
```

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p><b>Import Order Matters:</b> The <code>@opentelemetry/auto-instrumentations-node/register</code> module reads environment variables at import time. If using a <code>.env</code> file, import <code>dotenv/config</code> first. If not using a <code>.env</code> file, ensure <code>OTEL_*</code> environment variables are set before starting your application (e.g., via command line, Docker, or your deployment platform).</p>
</div>
```

## Setup Monoscope Express Middleware For HTTP Request Monitoring

Monoscope Express Middleware is a middleware that can be used to monitor HTTP requests. It is a wrapper around the Express.js middleware and provides additional functionalities on top of the open telemetry instrumentation which creates a custom span for each request capturing details about the request including request and response bodies.

```js
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import express from "express";
import { Monoscope } from "@monoscopetech/express";
import axios from "axios";

const app = express();
const monoscopeClient = Monoscope.NewClient({
  monitorAxios: axios, // Optional: Use this to monitor Axios requests
});

// Add middleware for request monitoring
app.use(monoscopeClient.middleware);

app.get("/", async (req, res) => {
  // This axios request get's monitored and appears in the  Monoscope explorer
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos/1"
  );
  res.json(response.data);
});

// automatically report unhandled errors along with the request data
app.use(monoscopeClient.errorMiddleware);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
```

#### Quick overview of the configuration parameters

An object with the following optional fields can be passed to the middleware function to configure it:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `debug` | Set to `true` to enable debug mode. |
| `tags` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `serviceName` | A defined string name of your application |
| `serviceVersion` | A defined string version of your application (used for further debugging on the dashboard). |
| `redactHeaders` | A list of HTTP header keys to redact. |
| `redactResponseBody` | A list of JSONPaths from the response body to redact. |
| `redactRequestBody` | A list of JSONPaths from the request body to redact. |
| `captureRequestBody` | default `false`, set to true if you want to capture the request body. |
| `captureResponseBody` | default `false`, set to true if you want to capture the response body. |
| `monitorAxios` | Axios instance to monitor. |
:::

## Reporting errors to Monoscope

Monoscope detects a lot of API issues automatically, but it's also valuable to report and track errors. This helps you associate more details about the backend with a given failing request.
If you've used sentry, or rollback, or bugsnag, then you're likely aware of this functionality.

To enable automatic error reporting, add the Monoscope `errorMiddleware` function immediately after your app's controllers and Monoscope will handle all uncaught errors that happened during a request and associate the error to that request.

```typescript
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import express from "express";
import { Monoscope } from "@monoscopetech/express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const monoscopeClient = Monoscope.NewClient({});

app.use(monoscopeClient.middleware);

app.get("/", (req, res) => {});

// The error handler must be before any other error middleware and after all controllers
app.use(monoscopeClient.errorMiddleware);

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
```

Or manually report errors within the context of a web request, by calling the ReportError function.

```typescript
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import express from "express";
import { Monoscope, reportError } from "@monoscopetech/express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const monoscopeClient = Monoscope.NewClient({
  serviceName: "my-service",
});

app.use(monoscopeClient.middleware);

app.get("/", (req, res) => {
  try {
    throw new Error("Something went wrong");
    res.send("hello world");
  } catch (error) {
    // Manually report the error to Monoscope
    reportError(error);
    res.send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
```

## Monitoring Axios requests

Monoscope supports monitoring outgoing HTTP requests made using libraries like Axios. This can be done either globally or on a per-request basis.

### Global monitoring

To monitor all outgoing Axios requests globally, you can use the `monitorAxios` option when initializing the Monoscope client.

```typescript
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import express from "express";
import { Monoscope } from "@monoscopetech/express";
import axios from "axios";
const app = express();

const monoscopeClient = Monoscope.NewClient({
  monitorAxios: axios, // Optional: Use this to monitor Axios requests
});
```

By doing the above, all axios requests in your server will be monitored by Monoscope.

### Per-request monitoring

To monitor a specific Axios request, you can use the `observeAxios` function provided by the SDK.

```typescript
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import express from "express";
import { Monoscope, observeAxios } from "@monoscopetech/express";

const app = express();
const monoscopeClient = Monoscope.NewClient({ serviceName: "my-service" });

app.use(monoscopeClient.middleware);
app.get("/", async (req, res) => {
  const response = await observeAxios({
    urlWildcard: "/todos/:id",
  }).get("https://jsonplaceholder.typicode.com/todos/1");
  res.json(response.data);
});
```

The `urlWildcard` parameter is used for urls that contain dynamic path parameters. This helps Monoscope to identify request to the same endpoint but with different parameters.

#### All observeAxios options

Below is the full list of options for the `observeAxios` function:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `urlWildcard` | `optional` The route pattern of the url if it has dynamic path parameters. |
| `redactHeaders` | A list of HTTP header keys to redact. |
| `redactResponseBody` | A list of JSONPaths from the response body to redact. |
| `redactRequestBody` | A list of JSONPaths from the request body to redact. |
:::

#### Example

```typescript
import "dotenv/config";
import '@opentelemetry/auto-instrumentations-node/register'; // IMPORTANT: Do this as early as possible in your server
import express from "express";
import { Monoscope, observeAxios } from "@monoscopetech/express";

const app = express();
const monoscopeClient = Monoscope.NewClient({serviceName: "my-service"});

app.use(monoscopeClient.middleware);
app.get("/", async (req, res) => {
  const response = await observeAxios({
    urlWildcard: "/todos/:id"
    redactHeaders: ["Authorization"],
    redactResponseBody: ["$.credit_card_number"],
    redactRequestBody: ["$.password"]
  }).get("https://jsonplaceholder.typicode.com/todos/1");
  res.json(response.data);
})
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tips</b></p>
  <ol>
  <li>
  At the moment, only Traces are supported for environment variable configuration. See the open issues for <a href="https://github.com/open-telemetry/opentelemetry-js/issues/4551">Metrics</a> and <a href="https://github.com/open-telemetry/opentelemetry-js/issues/4552">Logs</a> to learn more.
  </li>
 <li>
  By default, all SDK <a href="https://opentelemetry.io/docs/languages/js/resources/">resource detectors</a> are enabled. However, you can customize this by setting the <code>OTEL_NODE_RESOURCE_DETECTORS</code> environment variable to activate specific detectors or disable them entirely.
 </li>
  </ul>
</div>
```

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-js/tree/main/packages/adonis" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Express SDK
</a>
```