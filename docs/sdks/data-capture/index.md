---
title: Data Capture and Identity
ogTitle: Capture Payloads, Redact Fields and Identify Users
date: 2026-11-19
updatedDate: 2026-11-19
menuWeight: 51
---

# Data Capture and Identity

OpenTelemetry supplies the traces, logs and metrics that Monoscope receives. Framework SDKs add request context, optional payload capture and error-reporting helpers. Configure these features before sending production traffic.

## Choose the Data You Need

| Data | Where it comes from | What to configure |
|---|---|---|
| HTTP timing, method and status | HTTP instrumentation | Initialize OpenTelemetry before the application libraries. |
| Request and response bodies | Monoscope framework SDK | Enable body capture explicitly, then redact sensitive fields. |
| Outgoing HTTP payloads | The SDK's HTTP client integration | Configure the supported client wrapper and its redaction options. |
| User and tenant | Your authentication layer | Call the identity helpers inside the active request. |
| Browser session correlation | Browser SDK and backend propagation | Preserve W3C baggage and trace context between services. |
| Worker and scheduled-job spans | Queue instrumentation or your tracer | Cover each non-HTTP entry point. |
| Application logs and metrics | Signal-specific OpenTelemetry providers | Configure their exporters as well as the trace exporter. |

Body capture is disabled by default in the current Node.js, Python, Go, PHP, Java and .NET SDKs. The legacy Phoenix Plug captures bodies and uses a separate ingestion path. See its [guide](/docs/sdks/elixir/phoenix/) before enabling it. The exact configuration names and supported clients differ by framework. Use the [framework guide](/docs/sdks/) for its options.

## Enable Body Capture and Redaction Together

For Express, create the client after the OpenTelemetry setup and before registering routes:

```ts
import { Monoscope } from "@monoscopetech/express";

const monoscopeClient = Monoscope.NewClient({
  captureRequestBody: true,
  captureResponseBody: true,
  redactHeaders: ["x-api-key"],
  redactRequestBody: ["$.password", "$.payment.card_number"],
  redactResponseBody: ["$.access_token"],
});

app.use(monoscopeClient.middleware);
```

This fragment assumes an existing Express `app`, body parser and initialized OpenTelemetry SDK. See the [complete Express setup](/docs/sdks/nodejs/expressjs/).

Body paths are JSONPaths in these options. A path must match your actual JSON shape. Use a synthetic request to make sure that redaction works before enabling capture for real traffic.

Header defaults depend on the installed package version. Configure `authorization`, `cookie`, `set-cookie`, `proxy-authorization` and application keys explicitly when upgrading or using an older package. The published Java `2.0.9` and Phoenix `0.1.2` packages lack some defaults present in their newer repository source. See their framework guides for the release-specific behavior.

Header redaction does not remove the same value from a URL, query parameter, log message or another span attribute. Configure each capture path that can contain sensitive data.

## Identify Users and Tenants

Call the helpers after authentication, while the request middleware's span is active. Use stable application IDs.

### Node.js

```ts
import { setUser, setTenant } from "@monoscopetech/express";

// Inside an authenticated request handler:
setUser({ id: user.id, email: user.email, name: user.name });
setTenant({ id: organization.id, name: organization.name });
```

### Python

```python
from monoscope_fastapi import set_user, set_tenant

# Inside an authenticated request handler:
set_user({"id": user.id, "email": user.email, "name": user.name})
set_tenant({"id": organization.id, "name": organization.name})
```

These fragments use your application's `user` and `organization` objects. IDs alone are sufficient if you do not want to send names or emails.

The helpers write these span attributes:

| Helper value | Query field |
|---|---|
| User ID | `attributes.user.id` |
| User email | `attributes.user.email` |
| User name | `attributes.user.full_name` |
| Tenant ID | `attributes.tenant.id` |
| Tenant name | `attributes.tenant.name` |

Calls outside the middleware's request scope do not attach identity. Attributes on the request span do not automatically copy to every child span or log.

Find one tenant's requests with:

```kql
attributes.tenant.id == "acme"
```

For background work, attach the required identity attributes to the worker span explicitly. Preserve the trace context through the queue integration so you can follow the request into the worker.

## Correlate Sessions Across Browser and Backend

The browser SDK sends session identity in W3C baggage. Supported backend middleware reads `session.id` from the active baggage context and attaches it to the request span.

For your own server session identifier, call `setSession(id)` in Node.js or `set_session(id)` in Python inside the request scope. The value appears as `attributes.session.id` in queries.

A session identifier links events. Browser replay also requires the [browser SDK's replay configuration](/docs/sdks/Javascript/browser/). Setting a backend session ID alone does not create a recording.

For cross-origin requests, allow the trace propagation headers required by your browser instrumentation and CORS policy. Make sure that proxies preserve `traceparent` and `baggage`. Use only approved destinations for browser propagation.

## Verify the Result

1. Send a synthetic authenticated request with a known user, tenant and payload.
2. Open the request in **Explorer**.
3. Inspect **Attributes**, **Headers**, **Req Body** and **Res Body**.
4. Make sure that the expected identity fields are present.
5. Make sure that sensitive headers and JSON fields are redacted.
6. Open **View trace** to inspect outgoing calls and worker spans.

If data is missing, use [integration troubleshooting](/docs/sdks/troubleshooting/). For investigation examples, see the [query cookbook](/docs/dashboard/dashboard-pages/query-cookbook/).
