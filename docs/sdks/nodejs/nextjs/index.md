---
title: NextJs
ogTitle: NextJs Integration Guide
date: 2024-12-18
updatedDate: 2024-12-18
menuWeight: 2
---

# NextJs Integration Guide

Monoscope Next.js Middleware allows you to monitor HTTP requests in your Next.js applications. It builds upon OpenTelemetry instrumentation to create custom spans for each request, capturing key details such as request and response bodies, headers, and status codes. Additionally, it offers robust support for monitoring outgoing requests and reporting errors automatically.

To get started, you'll need the OpenTelemetry Node.js library and some basic configuration.

```=html
<hr>
```

## Prerequisites

Ensure you have completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

Run the command below to install the Monoscope nextJs sdk and Open telemetery API, SDK, and auto instrumentation tools.

```sh
npm install --save @monoscopetech/next @opentelemetry/api @vercel/otel
```

## Setup Open Telemetry

Setting up open telemetry allows you to send traces, metrics and logs to the Monoscope platform.
Add the following environment variables to your `.env` file:

```sh
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4318"
OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
OTEL_RESOURCE_ATTRIBUTES="at-project-key={YOUR_API_KEY}" # Adds your API KEY to the resource.
OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf" #Specifies the protocol to use for the OpenTelemetry exporter.
```

### Add the following to your `intrumentation.ts|js` file:

You can create the `intrumentation.ts|js` in the `src` directory of your project or root directory if you're not using a `src` directory.

```js
import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel("{YOUR_PROJECT_NAME}");
}
```

### HTTP Requests Monitoring

After setting up open telemetry. You can monitor http requests using Monoscope's next middleware, this allows you to monitor all your http requests. including headers, response time, response status code, request body, response body, etc.

To monitor http requests, wrap your routes with the `withMonoscopeAppRouter` function if you're using the `app` router or `withMonoscopePagesRouter` if you're using the `pages` router.

#### App Router Example

```js
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

```js
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

#### Quick overview of the configuration parameters

An object with the following optional fields can be passed to the middleware to configure it:

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

## Reporting errors to Monoscope

Monoscope detects a lot of API issues automatically, but it's also valuable to report and track errors. This helps you associate more details about the backend with a given failing request.
If you've used sentry, or rollback, or bugsnag, then you're likely aware of this functionality.

To report errors to Monoscope, you can use the `reportError` function.

```typescript
import { NextRequest, NextResponse } from "next/server";
import { withMonoscopeAppRouter, reportError } from "@monoscopetech/next";
async function handleRequest(req: NextRequest) {
  try {
    throw new Error("Something went wrong");
  } catch (e) {
    // reportError will send the error to Monoscope
    reportError(e);
  }

  return NextResponse.json({ message: "hello world" });
}

export const GET = withMonoscopeAppRouter(handler);
```

## Monitoring Axios requests

Monoscope supports monitoring outgoing HTTP requests made using libraries like Axios.
To monitor a specific Axios request, you can use the `observeAxios` function provided by the SDK.

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

export const GET = withMonoscopeAppRouter(handler);
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

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-js/tree/main/packages/nextjs" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the NextJs SDK
</a>
```