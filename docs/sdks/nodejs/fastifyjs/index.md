---
title: FastifyJs
ogTitle: FastifyJs Integration Guide
date: 2022-03-23
updatedDate: 2024-06-16
menuWeight: 2
---

# FastifyJs Integration Guide

The monoscope Fastify SDK lets you monitor HTTP requests in your Fastify applications. It builds upon OpenTelemetry instrumentation to create custom spans for each request, capturing key details such as request and response bodies, headers, and status codes. It also monitors outgoing requests and reports errors automatically.

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
curl -fsSL https://monoscope.tech/install.sh | sh
monoscope auth login
```

Then ask your agent to instrument the project. In Claude Code, run:

```
/monoscope-skills:instrument Add OpenTelemetry for monoscope to this project
```

The skill uses the CLI to add the SDK and to make sure that events arrive. To do the setup by hand, follow the steps below. For help from a person, [email us](mailto:hello@monoscope.tech).

## Installation

Install the monoscope Fastify SDK, the OpenTelemetry API and the auto-instrumentation package:

```sh
npm install --save @monoscopetech/fastify @opentelemetry/api @opentelemetry/auto-instrumentations-node
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

## Set Up the Fastify Hooks

The SDK adds a span for each request on top of the OpenTelemetry instrumentation. The span holds request and response details, including bodies. Call `initializeHooks()` after you create the client.

```js
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import fastify from "fastify";
import { Monoscope } from "@monoscopetech/fastify";
import axios from "axios";

const fastifyServer = fastify({});
const monoscopeClient = Monoscope.NewClient({
  fastify: fastifyServer, // Required: The Fastify server instance
  monitorAxios: axios, // Optional: Use this to monitor Axios requests
});

monoscopeClient.initializeHooks();

fastifyServer.get("/", async (request, reply) => {
  const response = await axios.get("https://api.github.com/users/octocat");
  return response.data;
});

fastifyServer.listen({ port: 3000 });
```

#### Configuration Options

An object with the following optional fields can be passed to the middleware function to configure it:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `fastify` | The Fastify server instance. |
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

## Reporting Errors

monoscope detects many API issues automatically. Reporting errors adds backend context to a failing request, as Sentry or Bugsnag do.

The Fastify SDK reports uncaught server errors automatically. To report an error manually, call `reportError`.

```typescript
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import fastify from "fastify";
import { Monoscope, reportError } from "@monoscopetech/fastify";
import axios from "axios";

const fastifyServer = fastify({});
const monoscopeClient = Monoscope.NewClient({
  fastify: fastifyServer,
});
monoscopeClient.initializeHooks();

fastifyServer.get("/", async (request, reply) => {
  try {
    throw new Error("Something went wrong");
    return { message: "Hello World" };
  } catch (error) {
    // Manually report the error to monoscope
    reportError(error);
    return { message: "Something went wrong" };
  }
});
fastifyServer.listen({ port: 3000 });
```

## Identifying users & tenants

Attach the authenticated user and tenant to every request span so you can filter, group, and search by identity in the dashboard (e.g. "all errors for `user.email = jane@acme.com`"). Call `setUser` and `setTenant` from a `preHandler` hook that you register after `initializeHooks()` and after your auth layer — the SDK writes them to the active request span using the standard attribute keys (`user.id`, `user.email`, `user.full_name`, `tenant.id`, `tenant.name`).

```ts
import { setUser, setTenant } from "@monoscopetech/fastify";

fastifyServer.addHook("preHandler", async (req) => {
  if (req.user) {
    setUser({ id: req.user.id, email: req.user.email, name: req.user.fullName });
    setTenant({ id: req.user.orgId, name: req.user.orgName });
  }
});
```

Both helpers skip undefined/null fields, so partial info is fine. They must run inside a request handled by the monoscope hooks — calls outside that scope are log a warning and do nothing.

## Tracking Sessions

If you use the [monoscope browser SDK](/docs/sdks/Javascript/browser/){target="\_blank"} on your frontend, **`session.id` is propagated and tagged automatically** — no Fastify code required. The browser SDK injects the W3C `baggage` header on every outbound fetch/XHR, and the monoscope hooks extract it and tags the request span. The session shows up alongside backend traces under the standard OTel `session.id` attribute.

For server-only sessions (background jobs, SSR without the browser SDK, or your own session scheme), set the session ID alongside user and tenant on the active request span. The three together — **who**, **which org**, **which session** — are what makes a trace searchable and replayable in the dashboard:

```ts
import { setUser, setTenant, setSession } from "@monoscopetech/fastify";

fastifyServer.addHook("preHandler", async (req) => {
  if (req.user) {
    setUser({ id: req.user.id, email: req.user.email, name: req.user.fullName });
    setTenant({ id: req.user.orgId, name: req.user.orgName });
  }
  if (req.session?.sessionId) setSession(req.session.sessionId);
});
```

`setSession` writes the standard `session.id` attribute to the active request span. Calls outside the monoscope hooks scope are no-ops.

## Monitoring Axios Requests

monoscope can monitor outgoing HTTP requests made with libraries like Axios, either globally or per request.

### Global Monitoring

To monitor all outgoing Axios requests, set the `monitorAxios` option when you create the client.

```typescript
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import fastify from "fastify";
import { Monoscope } from "@monoscopetech/fastify";
import axios from "axios";

const fastifyServer = fastify({});
const monoscopeClient = Monoscope.NewClient({
  fastify: fastifyServer,
  monitorAxios: axios, // Optional: Use this to monitor Axios requests
});
monoscopeClient.initializeHooks();
```

By setting `monitorAxios` in the client configuration, monoscope monitors all Axios requests in your server.

### Per-Request Monitoring

To monitor a specific Axios request, use the `observeAxios` function.

```typescript
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import fastify from "fastify";
import { Monoscope, observeAxios } from "@monoscopetech/fastify";

const fastifyServer = fastify({});
const monoscopeClient = Monoscope.NewClient({ fastify: fastifyServer });
monoscopeClient.initializeHooks();

fastifyServer.get("/", async (request, reply) => {
  const response = await observeAxios({
    urlWildcard: "/todos/:id",
  }).get("https://jsonplaceholder.typicode.com/todos/1");
  return response.data;
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
import "dotenv/config";
import '@opentelemetry/auto-instrumentations-node/register'; // IMPORTANT: Do this as early as possible in your server
import fastify from "fastify";
import { Monoscope, observeAxios } from "@monoscopetech/fastify";

const fastifyServer = fastify({});
const monoscopeClient = Monoscope.NewClient({fastify: fastifyServer});
monoscopeClient.initializeHooks();

fastifyServer.get("/", async (request, reply) => {
  const response = await observeAxios({
    urlWildcard: "/todos/:id",
    redactHeaders: ["Authorization"],
    redactResponseBody: ["$.credit_card_number"],
    redactRequestBody: ["$.password"]
  }).get("https://jsonplaceholder.typicode.com/todos/1");

  return response.data
})
fastifyServer.listen({ port: 3000 });
```

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Fastify hooks only cover HTTP requests. BullMQ / Bull / Agenda jobs, `node-cron` schedulers, queue consumers, and standalone CLI scripts are invisible until you wrap each handler in a span yourself. Always instrument these alongside your HTTP routes — without it, half your production work has no observability.

Use the standard OpenTelemetry tracer API. Auto-instrumentation picks up downstream HTTP/database calls automatically once a parent span is active.

```ts
import { trace, SpanStatusCode } from "@opentelemetry/api";
import { Worker } from "bullmq";

const tracer = trace.getTracer("my-service-worker");

new Worker("emails", async (job) => {
  return tracer.startActiveSpan(
    `email.${job.name}`,
    {
      attributes: {
        "messaging.system": "bullmq",
        "messaging.operation": "process",
        "messaging.destination.name": "emails",
        "messaging.message.id": job.id,
        "code.function": job.name,
      },
    },
    async (span) => {
      try {
        await sendEmail(job.data);
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
});
```

Same pattern works for `node-cron`, Agenda, raw `setInterval`, or any custom worker — wrap the handler body in `tracer.startActiveSpan`. For CLI / one-shot scripts, call `await sdk.shutdown()` before the process exits so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

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
<a href="https://github.com/monoscope-tech/monoscope-js/tree/main/packages/fastify" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Fastify SDK
</a>
```