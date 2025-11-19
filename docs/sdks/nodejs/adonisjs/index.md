---
title: AdonisJs
ogTitle: AdonisJs Integration Guide
date: 2022-03-23
updatedDate: 2024-06-16
menuWeight: 2
---

# AdonisJs Integration Guide

You can integrate your AdonisJs application with Monoscope using OpenTelemetry. This allows you to send logs, metrics, and traces to Monoscope for monitoring and analytics.

To get started, you'll need the OpenTelemetry Node.js library and some basic configuration.

```=html
<hr>
```

## Prerequisites

Ensure you have completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

Run the command below to install the API, SDK, and Instrumentation tools.

```sh
npm install --save @monoscopetech/adonis @opentelemetry/api  @opentelemetry/auto-instrumentations-node
```

## Open Telemetery Configuration

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

## Setup Monoscope Adonis Middleware For HTTP Request Monitoring

Monoscope Adonis Middleware is a middleware that can be used to monitor HTTP requests. It is a wrapper around the Express.js middleware and provides additional functionalities on top of the open telemetry instrumentation which creates a custom span for each request capturing details about the request including request and response bodies.

First configure the `@monoscopetech/adonis` sdk by running the following command:

```sh
node ace configure @monoscopetech/adonis
```

Then, create an `monoscope.js|ts` file in the `/conf` directory and export the `defineConfig` object with some properties like so:

```js
import { defineConfig } from "@monoscopetech/adonis";
import axios from "axios";

export default defineConfig({
  captureResponseBody: true,
  serviceName: "my-service",
  monitorAxios: axios, // Optional: Use this to monitor all axios requests from your server
});
```

Then, register the middleware by adding the `@monoscopetech/adonis` client to your global middleware list in the `start/kernel.js|ts` file like so:

```js
import "@opentelemetry/auto-instrumentations-node/register";

import server from "@adonisjs/core/services/server";
import Monoscope from "@monoscopetech/adonis";

const client = new Monoscope();

server.use([
  () => import("#middleware/container_bindings_middleware"),
  () => import("#middleware/force_json_response_middleware"),
  () => import("@adonisjs/cors/cors_middleware"),
  () => client.middleware(),
]);
```

#### Quick overview of the configuration parameters

An object with the following optional fields can be passed to the `defineConfig` function in `conf/monoscope.ts` to configure it:

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

## Error Reporting

With Monoscope, you can track and report different unhandled or uncaught errors, API issues, and anomalies at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

To report errors, you need to first enable [asyncLocalStorage](https://docs.adonisjs.com/guides/concepts/async-local-storage){target="\_blank" rel="noopener noreferrer"} in your AdonisJS project by setting `useAsyncLocalStorage` to `true` in your `config/app.js|ts` file, like so:

```js
export const http = defineConfig({
  useAsyncLocalStorage: true,
  // Other configs...
});
```

Then, use the `reportError()` function in your application's exception handler, passing in the `error` argument, to report all uncaught errors and service exceptions that happened during a request, like so:

```js
import { HttpContext, ExceptionHandler } from "@adonisjs/core/http";
import { reportError } from "@monoscopetech/adonis";

export default class HttpExceptionHandler extends ExceptionHandler {
  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx);
  }

  async report(error: unknown, ctx: HttpContext) {
    // Automatically report all uncaught errors to Monoscope
    reportError(error);
    return super.report(error, ctx);
  }
}
```

#### Manual Error Reporting

You can also manually report errors to Monoscope by calling the `reportError()` function, passing in the `error` argument, like so:

```ts
import router from "@adonisjs/core/services/router";
import { reportError } from "@monoscopetech/adonis";
router.get("/", async () => {
  try {
    throw new Error("something went wrong");
    return res.data;
  } catch (error) {
    // report the error to Monoscope
    reportError(error);
    return { message: "something went wrong" };
  }
});
```

## Monitoring Axios requests

Monoscope supports monitoring outgoing HTTP requests made using libraries like Axios. This can be done either globally or on a per-request basis.

### Global monitoring

To monitor all outgoing Axios requests globally, you can use the `monitorAxios` option when initializing the Monoscope client.

```typescript
import { defineConfig } from "@monoscopetech/adonis";
import axios from "axios";

export default defineConfig({
  captureResponseBody: true,
  serviceName: "my-service",
  monitorAxios: axios, // Optional: Use this to monitor all axios requests from your server
});
```

By adding `monitorAxios` to config, all axios requests in your server will be monitored by Monoscope.

### Per-request monitoring

To monitor a specific Axios request, you can use the `observeAxios` function provided by the SDK.

```typescript
import router from "@adonisjs/core/services/router";
import { observeAxios } from "@monoscopetech/adonis";
import axios from "axios";
router.get("/", async () => {
  const res = await observeAxios({
    urlWildcard: "/todos/:todoId",
  }).get("https://jsonplaceholder.typicode.com/todos/1");
  return res.data;
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
import router from "@adonisjs/core/services/router";
import { observeAxios } from "@monoscopetech/adonis";
import axios from "axios";
router.get("/", async () => {
  const res = await observeAxios({
    axiosInstance: axios,
    urlWildcard: "/todos/:todoId"
    redactHeaders: ["Authorization"],
    redactResponseBody: ["$.credit_card_number"],
    redactRequestBody: ["$.password"]
  }).get("https://jsonplaceholder.typicode.com/todos/1");
  return res.data;
});
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
    Explore the Adonis SDK
</a>
```