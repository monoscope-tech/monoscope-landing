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
OTEL_RESOURCE_ATTRIBUTES="at-project-key={YOUR_API_KEY}"
# Specifies the protocol to use for the OpenTelemetry exporter.
OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
# disable some auto instrumentation libraries
OTEL_NODE_DISABLED_INSTRUMENTATIONS=net,connect,dns,fs
```

## Monoscope Middleware for NestJs + Express

If your NestJs app uses the default Express adapter (which is the default unless changed), you can include the Monoscope Express middleware to capture HTTP request and response details:

### Installation

```sh
npm install --save @monoscopetech/express
```

in your `main.ts` file

```ts
import "@opentelemetry/auto-instrumentations-node/register"; // IMPORTANT: Do this as early as possible in your server
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Monoscope } from "@monoscopetech/express";
import axios from "axios";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const monoscopeClient = Monoscope.NewClient({
    monitorAxios: axios, // Optional: Use this to monitor axios requests
  });

  app.use(apitoolkit.middleware);

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

