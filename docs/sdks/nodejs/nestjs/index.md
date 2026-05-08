---
title: NestJs
ogTitle: NestJs Integration Guide
date: 2022-03-23
updatedDate: 2024-06-16
menuWeight: 2
---

# NestJs Integration Guide

You can integrate your NestJs application with Monoscope using OpenTelemetry. This allows you to send logs, metrics, and traces to Monoscope for monitoring and analytics.

To get started, you'll need the OpenTelemetry Node.js library and some basic configuration.

```=html
<hr>
```

## Prerequisites

Ensure you have completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Install via Claude Code

Use [Claude Code](https://claude.com/claude-code)? Our skill will instrument this project for you. Add the marketplace, install the skill, and install our CLI:

```sh
claude plugin marketplace add monoscope-tech/skills
claude plugin install monoscope-skills@monoscope-skills
curl monoscope.tech/install.sh | sh
monoscope auth login
```

Then run inside Claude Code:

```
/monoscope-skills:instrument OpenTelemetry via Monoscope into this project
```

The skill drives the CLI to wire up the SDK and verify it. Prefer a human? [Email us](mailto:hello@monoscope.tech) — happy to jump on a call or connect over Slack.

## Installation

Run the command below to install the API, SDK, and Instrumentation tools.

```sh

npm install --save @opentelemetry/api \
    @opentelemetry/auto-instrumentations-node

# Or

yarn add @opentelemetry/api @opentelemetry/auto-instrumentations-node

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
OTEL_RESOURCE_ATTRIBUTES="x-api-key={YOUR_API_KEY}"
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

## Monoscope Middleware for NestJs + Express

If your NestJs app uses the default Express adapter (which is the default unless changed), you can include the Monoscope Express middleware to capture HTTP request and response details:

### Installation

```sh
npm install --save @monoscopetech/express
```

in your `main.ts` file

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

  app.get("/", async (req, res) => {
    // This axios request get's monitored and appears in the  Monoscope explorer
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    res.json(response.data);
  });

  // automatically report unhandled errors along with the request data
  app.use(monoscopeClient.errorMiddleware);

  await app.listen(3000);
}
bootstrap();
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

## Monoscope Middleware with for NestJs + Fastify

If your NestJS app uses the Fastify adapter, you should follow our
Fastify integration [fastify guide](/docs/sdks/nodejs/fastifyjs/){target="\_blank"}. for detailed setup instructions.

#### Quick overview of the configuration parameters

{class="docs-table"}
:::
| Attribute | Description |
| --------- | ----------- |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Specifies the endpoint URL for the OpenTelemetry collector. In this case, it's set to "http://otelcol.monoscope.tech:4317". |
| `OTEL_NODE_RESOURCE_DETECTORS` | Defines which resource detectors to use. Here, it's set to detect environment variables, host information, and operating system details. |
| `OTEL_SERVICE_NAME` | Sets the name of your service. You should replace "your-service-name" with the actual name of your service. |
| `OTEL_RESOURCE_ATTRIBUTES` | Specifies additional resource attributes. In this case, it's setting an API Toolkit project key. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | Defines the protocol used for exporting telemetry data. It's set to "grpc" (gRPC protocol). |
| `OTEL_PROPAGATORS` | Specifies which context propagators to use. Here, it's set to use both "baggage" and "tracecontext". |
:::

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
  </ul>
</div>
```

