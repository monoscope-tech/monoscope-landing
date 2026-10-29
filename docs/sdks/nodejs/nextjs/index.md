---
title: NextJs
ogTitle: NextJs Integration Guide
date: 2024-12-18
updatedDate: 2024-12-18
menuWeight: 2
---

# NextJs Integration Guide

The monoscope Next.js SDK lets you monitor HTTP requests in your Next.js applications. It builds upon OpenTelemetry instrumentation to create custom spans for each request, capturing key details such as request and response bodies, headers, and status codes. It also monitors outgoing requests and reports errors.

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

Install the monoscope Next.js SDK, the OpenTelemetry API and `@vercel/otel`:

```sh
npm install --save @monoscopetech/next @opentelemetry/api @vercel/otel
```

## Set Up OpenTelemetry

OpenTelemetry sends traces, metrics and logs to monoscope. Add these environment variables to your `.env` file:

```sh
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4318"
OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY" # Adds your API KEY to the resource.
OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf" #Specifies the protocol to use for the OpenTelemetry exporter.
```

### Register OpenTelemetry in `instrumentation.ts`

Create `instrumentation.ts` (or `.js`) in your project root, or in `src` if you use a `src` directory:

```js
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel("{YOUR_PROJECT_NAME}");
}
```

### HTTP Requests Monitoring

The monoscope wrappers record headers, response time, status code and request and response bodies for each request.

Wrap your routes with `withMonoscopeAppRouter` for the App Router, or `withMonoscopePagesRouter` for the Pages Router.

#### App Router Example

```ts
import { withMonoscopeAppRouter } from "@monoscopetech/next";
import { NextRequest, NextResponse } from "next/server";
async function handleRequest(req: NextRequest) {
  return NextResponse.json({ message: "hello world" });
}

// Optional configuration
const config = {
  captureResponseBody: true,
}
export const GET = withMonoscopeAppRouter(handleRequest, config);

```

#### Pages Router Example

```ts
import type { NextApiRequest, NextApiResponse } from "next";
import { withMonoscopePagesRouter } from "@monoscopetech/next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Hello from Next.js!" });
}

// Optional configuration
const config = {
  captureResponseBody: true,
}

export default withMonoscopePagesRouter(handler, config);
```

#### Configuration Options

Pass an object with these optional fields as the second argument of the wrapper:

{class="docs-table"}
:::
| Option | Description |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `debug` | Set to `true` to enable debug mode. |
| `serviceName` | A defined string name of your application. |
| `tags` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `serviceVersion` | A defined string version of your application (used for further debugging on the dashboard). |
| `redactHeaders` | A list of HTTP header keys to redact. |
| `redactResponseBody` | A list of JSONPaths from the response body to redact. |
| `redactRequestBody` | A list of JSONPaths from the request body to redact. |
| `captureRequestBody` | Default `false`, set to `true` if you want to capture the request body. |
| `captureResponseBody` | Default `false`, set to `true` if you want to capture the response body. |
:::

## Reporting Errors

monoscope detects many API issues automatically. Reporting errors adds backend context to a failing request, as Sentry or Bugsnag do. To report an error, call `reportError`.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { withMonoscopeAppRouter, reportError } from "@monoscopetech/next";
async function handleRequest(req: NextRequest) {
  try {
    throw new Error("Something went wrong");
  } catch (e) {
    // reportError sends the error to monoscope
    reportError(e);
  }

  return NextResponse.json({ message: "hello world" });
}

export const GET = withMonoscopeAppRouter(handleRequest);
```

## Identifying users & tenants

Attach the authenticated user and tenant to every request span so you can filter, group, and search by identity in the dashboard (e.g. "all errors for `user.email = jane@acme.com`"). Call `setUser` and `setTenant` from inside a route handler that's wrapped with `withMonoscopeAppRouter` or `withMonoscopePagesRouter` — the SDK writes them to the active request span using the standard attribute keys (`user.id`, `user.email`, `user.full_name`, `tenant.id`, `tenant.name`).

```ts
import { withMonoscopeAppRouter, setUser, setTenant } from "@monoscopetech/next";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

async function handler() {
  const session = await getSession();
  if (session?.user) {
    setUser({
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    });
    setTenant({ id: session.user.orgId, name: session.user.orgName });
  }
  return NextResponse.json({ ok: true });
}

export const GET = withMonoscopeAppRouter(handler);
```

Both helpers skip undefined/null fields, so partial info is fine. They must run inside a handler wrapped by `withMonoscopeAppRouter`/`withMonoscopePagesRouter` — calls outside that scope are log a warning and do nothing.

## Tracking Sessions

If you use the [monoscope browser SDK](/docs/sdks/Javascript/browser/){target="\_blank"} on your frontend, **`session.id` is propagated and tagged automatically** — no Next.js code required. The browser SDK injects the W3C `baggage` header on every outbound fetch/XHR, and the monoscope wrapper extracts it and tags the request span under the standard OTel `session.id` attribute.

For server-only sessions (server components without the browser SDK, or your own session scheme), set the session ID alongside user and tenant on the active request span. The three together — **who**, **which org**, **which session** — are what makes a trace searchable and replayable in the dashboard:

```ts
import { withMonoscopeAppRouter, setUser, setTenant, setSession } from "@monoscopetech/next";
import { getSession } from "@/lib/auth";

async function handler() {
  const session = await getSession();
  if (session?.user) {
    setUser({ id: session.user.id, email: session.user.email, name: session.user.name });
    setTenant({ id: session.user.orgId, name: session.user.orgName });
  }
  if (session?.id) setSession(session.id);
  // ...
}

export const GET = withMonoscopeAppRouter(handler);
```

`setSession` writes the standard `session.id` attribute to the active request span. Calls outside a wrapped handler are no-ops.

## Monitoring Axios Requests

To monitor a specific outgoing Axios request, use the `observeAxios` function.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { withMonoscopeAppRouter, observeAxios } from "@monoscopetech/next";

async function handleRequest(req: NextRequest) {
  // Observe an Axios request
  const response = await observeAxios({
    urlWildcard: "/todos/:id",
  }).get("https://jsonplaceholder.typicode.com/todos/1");

  return NextResponse.json({ data: response.data });
}

export const GET = withMonoscopeAppRouter(handleRequest);
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

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Next.js wrapper only covers route handlers and pages. Server Actions, Vercel Cron jobs (`/api/cron/*` triggered externally are still HTTP, but anything running outside the request cycle is not), separate worker processes, and CLI scripts are invisible until you wrap each handler in a span yourself. Always instrument these alongside your HTTP routes.

Use the standard OpenTelemetry tracer API directly inside the worker / cron handler. Auto-instrumentation picks up downstream HTTP/database calls automatically once a parent span is active.

```ts
// worker.ts — separate process started via `node worker.js`
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

For Server Actions called outside a normal request (`'use server'` in a background context), the same `tracer.startActiveSpan` wrapper applies. For CLI / one-shot scripts, call `await sdk.shutdown()` before the process exits so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-js/tree/main/packages/nextjs" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the NextJs SDK
</a>
```