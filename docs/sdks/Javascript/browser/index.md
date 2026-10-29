---
title: Browser
ogTitle: Browser Integration Guide
date: 2022-03-23
updatedDate: 2025-03-25
menuWeight: 2
---

# Monoscope Browser SDK

The **monoscope browser SDK** is a lightweight JavaScript library for adding **session replay**, **performance tracing**, **error tracking**, and **web vitals** to your web applications.

Use it with the [monoscope server SDKs](/docs/sdks/) to get **end-to-end observability**: user interactions in the browser connect to backend services, APIs and databases.

This means you can:

- **Replay user sessions** to see exactly what happened.
- **Trace requests** from the frontend, through your backend, and into your database.
- **Capture errors and console logs** with full context and breadcrumbs for faster debugging.
- **Collect Web Vitals** (CLS, INP, LCP, FCP, TTFB) automatically.
- **Track SPA navigations** across pushState, replaceState, and popstate.

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

Install with npm:

```bash
npm install @monoscopetech/browser
```

Or include it directly in your HTML using a `<script>` tag:

```html
<script src="https://unpkg.com/@monoscopetech/browser@latest/dist/monoscope.min.js"></script>
```

## Quick Start

Initialize monoscope with your **API key** (in the app under Settings > API Keys):

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

When you use the `<script>` tag, the SDK is available as the global `Monoscope` class: `new Monoscope({ apiKey: "YOUR_API_KEY" })`.

On `localhost`, debug mode is auto-enabled — you'll see a status overlay and console diagnostics. Call `monoscope.test()` to verify your setup:

```javascript
const result = await monoscope.test();
console.log(result); // { success: true, message: "Test span sent successfully." }
```

## Identifying users & tenants

After your user signs in, call `setUser` and `setTenant`. The SDK adds them to the session, its replay and its spans, so you can filter by user or tenant in the dashboard.

```javascript
monoscope.setUser({ id: "user-123", email: "user@example.com", name: "Jane" });
monoscope.setTenant({ id: "org-42", name: "Acme Inc" });
```

The browser SDK also sends the session ID to your backend in the W3C `baggage` header. It does this for same-origin requests, and for the URLs you list in `propagateTraceHeaderCorsUrls`. The monoscope server SDKs set it as `session.id` on the request span.

## React / Next.js

For React and Next.js apps, the SDK provides idiomatic bindings with context providers, hooks, and an error boundary via the `@monoscopetech/browser/react` subpath export.

See the dedicated [React / Next.js integration guide](/docs/sdks/Javascript/reactjs/) for setup, hooks API, and component instrumentation examples.

## Configuration

The `Monoscope` constructor accepts the following options:

{class="docs-table"}
:::
| Name | Type | Description |
| --- | --- | --- |
| `apiKey` | `string` | **Required**. Your monoscope API key (Settings > API Keys). |
| `serviceName` | `string` | Service name. Defaults to `location.hostname`. |
| `projectId` | `string` | Deprecated alias for `apiKey`. |
| `exporterEndpoint` | `string` | Endpoint for exporting traces. Defaults to monoscope's ingest endpoint (`/v1/traces`). |
| `metricsExporterEndpoint` | `string` | Endpoint for exporting metrics (web vitals). Defaults to the trace endpoint with `/v1/traces` replaced by `/v1/metrics`. |
| `propagateTraceHeaderCorsUrls` | `RegExp[]` | URL patterns where trace context headers should be propagated. Defaults to same-origin only. |
| `resourceAttributes` | `Record<string, string>` | Additional OpenTelemetry resource attributes. |
| `instrumentations` | `unknown[]` | Additional OpenTelemetry instrumentations to register. |
| `replayEventsBaseUrl` | `string` | Base URL for session replay events. Defaults to monoscope's ingest endpoint. |
| `enableNetworkEvents` | `boolean` | Include network timing events in document load spans. Default `false`. |
| `user` | `MonoscopeUser` | Default user information for the session. |
| `tenant` | `MonoscopeTenant` | Default tenant information for the session. |
| `debug` | `boolean` | Enable debug logging to the console. Auto-enabled on `localhost`. |
| `sampleRate` | `number` | Trace sampling rate from `0` to `1`. Default `1` (100%). |
| `replaySampleRate` | `number` | Replay sampling rate from `0` to `1`. Default `1` (100%). |
| `enabled` | `boolean` | Whether to start collecting data immediately. Default `true`. |
| `resourceTimingThresholdMs` | `number` | Minimum resource duration (ms) to report. Default `200`. |
| `captureResourceTiming` | `boolean` | Emit a span for each resource load over the threshold. Default `false`. |
| `captureLongTasks` | `boolean` | Emit a span for each long task (main thread blocked over 50ms). Default `false`. |
| `captureLongAnimationFrames` | `boolean` | Emit a span for each long animation frame, with per-script attribution. Chrome 123+. Default `true`. |
| `captureWebVitals` | `boolean` | Capture Core Web Vitals (LCP, INP, CLS, FCP, TTFB) as OTel metrics. Default `true`. |
| `captureExtensionErrors` | `boolean` | Capture errors from browser extensions. Default `false`. |
| `enableUserInteraction` | `boolean` | Trace user clicks and form submits, linking them to downstream network calls. Default `true`. |
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

The `MonoscopeTenant` object can contain `id`, `name` and other string-keyed attributes.

## API

### `setUser(user: MonoscopeUser)`

Associates the given user with the current session. You can call it at any time.

```javascript
monoscope.setUser({
  id: "user-123",
  email: "user@example.com",
});
```

### `setTenant(tenant: MonoscopeTenant)`

Associates the given tenant (organization or workspace) with the current session.

```javascript
monoscope.setTenant({
  id: "org-42",
  name: "Acme Inc",
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
Reports long animation frames as spans by default. Set `captureLongTasks` or `captureResourceTiming` to also report long tasks and slow resource loads.

### Session Management
Sessions persist across page reloads via `sessionStorage` and automatically rotate after 30 minutes of inactivity.

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.
