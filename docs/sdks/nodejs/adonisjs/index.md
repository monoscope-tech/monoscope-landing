---
title: AdonisJs
ogTitle: AdonisJs Integration Guide
date: 2022-03-23
updatedDate: 2024-06-16
menuWeight: 2
---

# AdonisJs Integration Guide

Integrate your AdonisJs application with monoscope through OpenTelemetry to send logs, metrics and traces to monoscope.

To get started, you'll need the OpenTelemetry Node.js library and some basic configuration.

```=html
<hr>
```

## Prerequisites

You need a monoscope project and its API key. If you do not have them yet, follow [Get started](/docs/onboarding/#get-your-api-key).

## Set Up With Your Coding Agent

Your coding agent can add the instrumentation for you. Install the monoscope skills and the monoscope CLI:

```sh
# Claude Code
claude plugin marketplace add monoscope-tech/skills
claude plugin install monoscope-skills@monoscope-skills

# Cursor, Codex, Cline and other agents
npx skills add monoscope-tech/skills

# monoscope CLI
curl https://monoscopehq.com/install.sh | sh
monoscope auth login
```

Then ask your agent to instrument the project. In Claude Code, run:

```
/monoscope-skills:instrument Add OpenTelemetry for monoscope to this project
```

The skill uses the CLI to add the SDK and to make sure that events arrive. To do the setup by hand, follow the steps below. For help from a person, [email us](mailto:hello@monoscope.tech).

## Installation

Install the monoscope Adonis SDK, the OpenTelemetry API and the auto-instrumentation package:

```sh
npm install --save @monoscopetech/adonis @opentelemetry/api @opentelemetry/auto-instrumentations-node
```

## OpenTelemetry Configuration

This module is highly configurable by setting environment variables. So many aspects of the auto instrumentation’s behavior such as Resource detectors, Exporters, Trace context propagation headers,
and many more can be configured based on your needs.

Add the following environment variables to your `.env` file:

```sh
# Specifies the endpoint URL for the OpenTelemetry collector.
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
# Specifies the name of the service.
OTEL_SERVICE_NAME="{YOUR_SERVICE_NAME}"
# Adds your API KEY to the resource.
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
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

## Set Up the Adonis Middleware

The middleware adds a span for each request on top of the OpenTelemetry instrumentation. The span holds request and response details, including bodies.

Create a `config/apitoolkit.ts` file (or `.js`) and export a `defineConfig` object. The middleware reads its options from the `apitoolkit` config key, so the file name must be `apitoolkit`:

```js
import { defineConfig } from "@monoscopetech/adonis";
import axios from "axios";

export default defineConfig({
  captureResponseBody: true,
  serviceName: "my-service",
  monitorAxios: axios, // Optional: Use this to monitor all axios requests from your server
});
```

Then add the client to your global middleware list in `start/kernel.ts` (or `.js`):

```js
import "dotenv/config";
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

#### Configuration Options

Pass these optional fields to `defineConfig` in `config/apitoolkit.ts`:

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

Reporting errors adds backend context to a failing request.

To report errors, first enable [asyncLocalStorage](https://docs.adonisjs.com/guides/concepts/async-local-storage){target="\_blank" rel="noopener noreferrer"} in your AdonisJS project by setting `useAsyncLocalStorage` to `true` in your `config/app.js|ts` file, like so:

```js
export const http = defineConfig({
  useAsyncLocalStorage: true,
  // Other configs...
});
```

Then call `reportError(error)` in your exception handler to report all uncaught errors from a request:

```js
import { HttpContext, ExceptionHandler } from "@adonisjs/core/http";
import { reportError } from "@monoscopetech/adonis";

export default class HttpExceptionHandler extends ExceptionHandler {
  async handle(error: unknown, ctx: HttpContext) {
    return super.handle(error, ctx);
  }

  async report(error: unknown, ctx: HttpContext) {
    // Report all uncaught errors to monoscope
    reportError(error);
    return super.report(error, ctx);
  }
}
```

#### Manual Error Reporting

To report an error manually, call `reportError(error)`:

```ts
import router from "@adonisjs/core/services/router";
import { reportError } from "@monoscopetech/adonis";
router.get("/", async () => {
  try {
    throw new Error("something went wrong");
    return res.data;
  } catch (error) {
    // report the error to monoscope
    reportError(error);
    return { message: "something went wrong" };
  }
});
```

## Tracking Sessions

If you use the [monoscope browser SDK](/docs/sdks/Javascript/browser/){target="\_blank"} on your frontend, `session.id` is propagated and tagged automatically. The browser SDK adds the W3C `baggage` header to outgoing fetch/XHR requests. The monoscope middleware reads it and sets the standard OTel `session.id` attribute on the request span.

## Monitoring Axios Requests

monoscope can monitor outgoing HTTP requests made with libraries like Axios, either globally or per request.

### Global Monitoring

To monitor all outgoing Axios requests, set the `monitorAxios` option in `config/apitoolkit.ts`.

```typescript
import { defineConfig } from "@monoscopetech/adonis";
import axios from "axios";

export default defineConfig({
  captureResponseBody: true,
  serviceName: "my-service",
  monitorAxios: axios, // Optional: Use this to monitor all axios requests from your server
});
```

monoscope then monitors all Axios requests in your server.

### Per-Request Monitoring

To monitor a specific Axios request, use the `observeAxios` function.

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

Use `urlWildcard` for URLs with dynamic path parameters. It lets monoscope group requests to the same endpoint.

#### All `observeAxios` Options

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
    urlWildcard: "/todos/:todoId",
    redactHeaders: ["Authorization"],
    redactResponseBody: ["$.credit_card_number"],
    redactRequestBody: ["$.password"]
  }).get("https://jsonplaceholder.typicode.com/todos/1");
  return res.data;
});
```

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The AdonisJS middleware only covers HTTP requests. `@rlanz/bull-queue` workers, scheduled commands, and standalone Ace CLI scripts are invisible until you wrap each handler in a span yourself. Always instrument these alongside your HTTP routes.

Use the standard OpenTelemetry tracer API directly inside your queue processor or scheduled command. Auto-instrumentation picks up downstream HTTP/database calls automatically once a parent span is active.

```ts
import { trace, SpanStatusCode } from "@opentelemetry/api";
import { JobHandlerContract } from "@rlanz/bull-queue/types";

const tracer = trace.getTracer("my-service-worker");

export default class SendEmail implements JobHandlerContract {
  async handle(payload: { to: string }) {
    return tracer.startActiveSpan(
      "email.send",
      {
        attributes: {
          "messaging.system": "bullmq",
          "messaging.operation": "process",
          "messaging.destination.name": "emails",
          "code.function": "SendEmail.handle",
        },
      },
      async (span) => {
        try {
          await this.sendEmail(payload);
          span.setStatus({ code: SpanStatusCode.OK });
        } catch (err) {
          span.recordException(err as Error);
          span.setStatus({ code: SpanStatusCode.ERROR });
          throw err;
        } finally {
          span.end();
        }
      }
    );
  }
}
```

The same wrapper goes around scheduled commands and any standalone Ace task. For one-shot CLI commands, ensure the OTel SDK shuts down (`await sdk.shutdown()`) before the process exits so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

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
  </ol>
</div>
```

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-js/tree/main/packages/adonis" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Adonis SDK
</a>
```