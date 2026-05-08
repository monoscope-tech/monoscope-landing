---
title: Browser
ogTitle: Browser Integration Guide
date: 2022-03-23
updatedDate: 2025-03-25
menuWeight: 2
---

# Monoscope Browser SDK

The **Monoscope Browser SDK** is a lightweight JavaScript library for adding **session replay**, **performance tracing**, **error tracking**, and **web vitals** to your web applications.

When used together with the [Monoscope Server SDKs](https://monoscope.tech/docs/sdks/), you gain **end-to-end observability** — seamlessly connecting user interactions in the browser to backend services, APIs, and databases.

This means you can:

- **Replay user sessions** to see exactly what happened.
- **Trace requests** from the frontend, through your backend, and into your database.
- **Capture errors and console logs** with full context and breadcrumbs for faster debugging.
- **Collect Web Vitals** (CLS, INP, LCP, FCP, TTFB) automatically.
- **Track SPA navigations** across pushState, replaceState, and popstate.

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

Install via **npm/bun**:

```bash
npm install @monoscopetech/browser
```

Or include it directly in your HTML using a `<script>` tag:

```html
<script src="https://unpkg.com/@monoscopetech/browser@latest/dist/monoscope.min.js"></script>
```

## Quick Start

Initialize Monoscope with your **API key** (found in your project settings):

```javascript
import Monoscope from "@monoscopetech/browser";

const monoscope = new Monoscope({
  apiKey: "YOUR_API_KEY",
});

// Identify the current user
monoscope.setUser({
  id: "user-123",
  email: "user@example.com",
});
```

On `localhost`, debug mode is auto-enabled — you'll see a status overlay and console diagnostics. Call `monoscope.test()` to verify your setup:

```javascript
const result = await monoscope.test();
console.log(result); // { success: true, message: "Test span sent successfully." }
```

## React / Next.js

For React and Next.js apps, the SDK provides idiomatic bindings with context providers, hooks, and an error boundary via the `@monoscopetech/browser/react` subpath export.

See the dedicated [React / Next.js integration guide](/docs/sdks/Javascript/reactjs/) for setup, hooks API, and component instrumentation examples.

## Configuration

The `Monoscope` constructor accepts the following options:

{class="docs-table"}
:::
| Name | Type | Description |
| --- | --- | --- |
| `apiKey` | `string` | **Required** – Your Monoscope API key (found in project settings). |
| `serviceName` | `string` | Service name. Defaults to `location.hostname`. |
| `projectId` | `string` | Deprecated alias for `apiKey`. |
| `exporterEndpoint` | `string` | Endpoint for exporting traces. Defaults to Monoscope's ingest endpoint. |
| `propagateTraceHeaderCorsUrls` | `RegExp[]` | URL patterns where trace context headers should be propagated. Defaults to same-origin only. |
| `resourceAttributes` | `Record<string, string>` | Additional OpenTelemetry resource attributes. |
| `instrumentations` | `unknown[]` | Additional OpenTelemetry instrumentations to register. |
| `replayEventsBaseUrl` | `string` | Base URL for session replay events. Defaults to Monoscope's ingest endpoint. |
| `enableNetworkEvents` | `boolean` | Include network timing events in document load spans. |
| `user` | `MonoscopeUser` | Default user information for the session. |
| `debug` | `boolean` | Enable debug logging to the console. |
| `sampleRate` | `number` | Trace sampling rate from `0` to `1`. Default `1` (100%). |
| `replaySampleRate` | `number` | Replay sampling rate from `0` to `1`. Default `1` (100%). |
| `enabled` | `boolean` | Whether to start collecting data immediately. Default `true`. |
| `resourceTimingThresholdMs` | `number` | Minimum resource duration (ms) to report. Default `200`. |
| `enableUserInteraction` | `boolean` | Trace user clicks and interactions, linking them to downstream network calls. Default `false`. |
:::

### User Object

The `MonoscopeUser` object can contain:

{class="docs-table"}
:::
| Name | Type | Description |
| --- | --- | --- |
| `email` | `string` | User's email address. |
| `full_name` | `string` | User's full name. |
| `name` | `string` | User's preferred name. |
| `id` | `string` | User's unique identifier. |
| `roles` | `string[]` | User's roles. |
:::

Additional string-keyed attributes are also accepted and forwarded as custom user attributes.

## API

### `setUser(user: MonoscopeUser)`

Associates the given user with the current session. Can be called at any time.

```javascript
monoscope.setUser({
  id: "user-123",
  email: "user@example.com",
});
```

### `startSpan(name, fn)`

Creates a custom OpenTelemetry span. The span is automatically ended when the function returns. Supports async functions.

```javascript
monoscope.startSpan("checkout", (span) => {
  span.setAttribute("cart.items", 3);
  // ... your logic
});
```

### `recordEvent(name, attributes)`

Records a custom event as a span with the given attributes.

```javascript
monoscope.recordEvent("button_click", {
  "button.name": "subscribe",
  "button.variant": "primary",
});
```

### `getSessionId()`

Returns the current session ID — useful for tagging custom spans or correlating with backend logs.

```javascript
const sessionId = monoscope.getSessionId();
```

### `getTabId()`

Returns the current tab ID (unique per browser tab).

```javascript
const tabId = monoscope.getTabId();
```

### `test()`

Sends a test span and flushes it to verify the connection is working.

```javascript
const result = await monoscope.test();
console.log(result.success); // true if the span was accepted
```

### `enable()` / `disable()`

Dynamically enable or disable all data collection.

```javascript
monoscope.disable(); // pause collection
monoscope.enable();  // resume collection
```

### `isEnabled()`

Returns whether the SDK is currently enabled.

### `destroy()`

Stops all collection, flushes pending data, and shuts down the OpenTelemetry provider. Call this when your application is being torn down.

```javascript
await monoscope.destroy();
```

## Custom Instrumentation

### Custom Spans

Use `startSpan()` to instrument specific operations with timing and attributes. It supports both sync and async functions — the span is automatically ended when the function returns or the promise resolves.

```javascript
// Sync
monoscope.startSpan("parse-config", (span) => {
  span.setAttribute("config.size", rawConfig.length);
  return parseConfig(rawConfig);
});

// Async
const data = await monoscope.startSpan("fetch-dashboard", async (span) => {
  span.setAttribute("dashboard.id", dashboardId);
  const res = await fetch(`/api/dashboards/${dashboardId}`);
  span.setAttribute("http.status", res.status);
  return res.json();
});
```

### Custom Events

Use `recordEvent()` to track discrete events without wrapping a code block:

```javascript
monoscope.recordEvent("feature_flag_evaluated", {
  "flag.name": "new-checkout",
  "flag.value": true,
});
```

### React Components

For instrumenting React components with custom spans and events, see the [React / Next.js guide](/docs/sdks/Javascript/reactjs/#custom-spans-in-components).

### Additional OpenTelemetry Instrumentations

Pass extra OTel instrumentations via the `instrumentations` config to extend tracing beyond the built-in set:

```javascript
import { LongTaskInstrumentation } from "@opentelemetry/instrumentation-long-task";

const monoscope = new Monoscope({
  apiKey: "YOUR_API_KEY",
  instrumentations: [new LongTaskInstrumentation()],
});
```

## Features

### Session Replay
Captures DOM changes via [rrweb](https://github.com/rrweb-io/rrweb) to enable full session replay. Sensitive inputs are masked by default.

### Error Tracking
Automatically captures `window.onerror`, unhandled promise rejections, and `console.error` calls with stack traces and breadcrumbs.

### SPA Navigation Tracking
Detects client-side navigations (`pushState`, `replaceState`, `popstate`) and emits navigation spans.

### Web Vitals
Collects Core Web Vitals (CLS, INP, LCP) and additional metrics (FCP, TTFB) via the [web-vitals](https://github.com/GoogleChrome/web-vitals) library.

### Performance Observers
Reports long tasks and slow resource loads as spans for performance debugging.

### Session Management
Sessions persist across page reloads via `sessionStorage` and automatically rotate after 30 minutes of inactivity.
