---
title: NestJs
ogTitle: NestJs Integration Guide
date: 2022-03-23
updatedDate: 2024-06-16
menuWeight: 2
---

# NestJs Integration Guide

Integrate your NestJs application with monoscope through OpenTelemetry to send logs, metrics and traces to monoscope.

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
curl -fsSL https://monoscopehq.com/install.sh | sh
monoscope auth login
```

Then ask your agent to instrument the project. In Claude Code, run:

```
/monoscope-skills:instrument Add OpenTelemetry for monoscope to this project
```

The skill uses the CLI to add the SDK and to make sure that events arrive. To do the setup by hand, follow the steps below. For help from a person, [email us](mailto:hello@monoscope.tech).

## Installation

Install the OpenTelemetry API and the auto-instrumentation package:

```sh
npm install --save @opentelemetry/api @opentelemetry/auto-instrumentations-node

# Or
yarn add @opentelemetry/api @opentelemetry/auto-instrumentations-node
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

## Use the Express Middleware With NestJs

NestJs has no separate monoscope package. If your app uses the default Express adapter, add the monoscope Express middleware to capture HTTP request and response details.

### Installation

```sh
npm install --save @monoscopetech/express
```

Add the middleware in your `main.ts` file:

```ts
import "dotenv/config";
import "@opentelemetry/auto-instrumentations-node/register";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Monoscope } from "@monoscopetech/express";
import axios from "axios";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const monoscopeClient = Monoscope.NewClient({
    monitorAxios: axios, // Optional: Use this to monitor axios requests
  });

  app.use(monoscopeClient.middleware);

  await app.listen(3000);
}
bootstrap();
```

Nest handles exceptions in its own exception filters, so Express error middleware does not see them. To report errors, call `reportError` from a global exception filter:

```ts
import { ArgumentsHost, Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { reportError } from "@monoscopetech/express";

@Catch()
export class MonoscopeExceptionFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    reportError(exception);
    super.catch(exception, host);
  }
}

// main.ts, after NestFactory.create (import HttpAdapterHost from "@nestjs/core")
const { httpAdapter } = app.get(HttpAdapterHost);
app.useGlobalFilters(new MonoscopeExceptionFilter(httpAdapter));
```

## Identifying users & tenants

Attach the authenticated user and tenant to every request span so you can filter, group, and search by identity in the dashboard (e.g. "all errors for `user.email = jane@acme.com`"). The cleanest pattern in NestJS is a global interceptor that runs after your auth guard has populated `req.user`. The SDK writes the values to the active request span using the standard attribute keys (`user.id`, `user.email`, `user.full_name`, `tenant.id`, `tenant.name`).

```ts
// monoscope-user.interceptor.ts
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { setUser, setTenant } from "@monoscopetech/express";

@Injectable()
export class MonoscopeUserInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    if (req.user) {
      setUser({
        id: req.user.id,
        email: req.user.email,
        name: req.user.fullName,
      });
      setTenant({ id: req.user.orgId, name: req.user.orgName });
    }
    return next.handle();
  }
}

// main.ts
app.useGlobalInterceptors(new MonoscopeUserInterceptor());
```

Order matters: `app.use(monoscopeClient.middleware)` must run before the interceptor so the request span exists, and your auth guard must populate `req.user` first. Guards run before interceptors in Nest, so this works out of the box with Passport / JWT guards. Both helpers skip undefined/null fields, so partial info is fine.

## Tracking Sessions

If you use the [monoscope browser SDK](/docs/sdks/Javascript/browser/){target="\_blank"} on your frontend, **`session.id` is propagated and tagged automatically** — no NestJS code required. The browser SDK injects the W3C `baggage` header on every outbound fetch/XHR, and the monoscope Express middleware extracts it and tags the request span via `applySessionFromBaggage`. The session shows up alongside backend traces under the standard OTel `session.id` attribute, so you can filter, group, and replay them end-to-end.

For server-only sessions (background jobs, server-rendered pages without the browser SDK, or your own session scheme), set the session ID alongside user and tenant on the active request span. The three together — **who**, **which org**, **which session** — are what makes a trace searchable and replayable in the dashboard:

```ts
import { setUser, setTenant, setSession } from "@monoscopetech/express";

@Injectable()
export class MonoscopeIdentityInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler) {
    const req = ctx.switchToHttp().getRequest();
    if (req.user) {
      setUser({ id: req.user.id, email: req.user.email, name: req.user.fullName });
      setTenant({ id: req.user.orgId, name: req.user.orgName });
    }
    if (req.session?.id) setSession(req.session.id);
    return next.handle();
  }
}
```

`setSession` writes the standard `session.id` attribute to the active request span. Calls outside the monoscope middleware scope are no-ops.

## Use NestJs With the Fastify Adapter

If your NestJs app uses the Fastify adapter, follow the [Fastify guide](/docs/sdks/nodejs/fastifyjs/){target="\_blank"}.

#### Environment Variables

{class="docs-table"}
:::
| Attribute | Description |
| --------- | ----------- |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The endpoint URL of the OpenTelemetry collector: `http://otelcol.monoscope.tech:4317`. |
| `OTEL_SERVICE_NAME` | The name of your service. |
| `OTEL_RESOURCE_ATTRIBUTES` | Specifies additional resource attributes. Holds your monoscope API key (`x-api-key=YOUR_API_KEY`). |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | The protocol for exporting telemetry data: `grpc`. |
| `OTEL_NODE_DISABLED_INSTRUMENTATIONS` | Auto-instrumentation libraries to turn off. |
:::

#### Middleware Options

Pass an object with these optional fields to `Monoscope.NewClient`:

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

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The NestJS interceptors only cover HTTP / RPC / GraphQL requests. `@nestjs/bullmq`, `@nestjs/schedule` cron jobs, microservice consumers, and standalone scripts are invisible until you wrap each handler in a span yourself. Always instrument these alongside your HTTP routes.

Use the standard OpenTelemetry tracer API directly inside the processor / scheduled method. Auto-instrumentation picks up downstream HTTP/database calls automatically once a parent span is active.

```ts
import { trace, SpanStatusCode } from "@opentelemetry/api";
import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";

const tracer = trace.getTracer("my-service-worker");

@Processor("emails")
export class EmailProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
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
          await this.sendEmail(job.data);
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

The same wrapper goes around `@Cron` / `@Interval` methods from `@nestjs/schedule`, microservice `@MessagePattern` handlers, and any standalone NestJS application context script. For one-shot CLI tasks, call `app.close()` before exiting so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

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
