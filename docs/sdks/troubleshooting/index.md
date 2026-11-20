---
title: Integration Troubleshooting
ogTitle: Troubleshoot Missing Logs, Traces and Metrics
date: 2026-11-19
updatedDate: 2026-11-19
menuWeight: 52
---

# Integration Troubleshooting

Start with the first missing signal. A successful CLI test proves that the CLI can send to its selected project. It does not prove that your application's instrumentation or exporter works.

## No Events in Explorer

1. Make sure that Explorer shows the intended project.
2. Select a recent time range and clear service, environment and query filters.
3. Send a request to the application after restarting it with instrumentation enabled.
4. Inspect the application's OpenTelemetry exporter errors.
5. Make sure that the application process receives the endpoint, protocol and API key configuration.

A `.env` file does not load itself in every runtime. Export variables before the process starts, or load them through the framework's configuration mechanism. Shell assignments without `export` do not reach child processes.

Do not print your API key while diagnosing configuration. Inspect its presence and project association instead.

## Match the Endpoint to the Protocol

Use one of these pairs:

| Transport | `OTEL_EXPORTER_OTLP_ENDPOINT` | `OTEL_EXPORTER_OTLP_PROTOCOL` |
|---|---|---|
| gRPC | `https://otel.monoscopehq.com` | `grpc` |
| HTTP with protobuf | `https://otel.monoscopehq.com` | `http/protobuf` |

Use the endpoint supplied by your project if it differs from these defaults. The exporter package must support the selected transport.

For standard OTLP/HTTP exporters, the general endpoint is a base URL. The exporter appends `/v1/traces`, `/v1/metrics` or `/v1/logs`. A signal-specific endpoint such as `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` needs the complete signal URL.

Do not add `/v1/traces` to a gRPC endpoint. See the [OpenTelemetry exporter configuration](https://opentelemetry.io/docs/languages/sdk-configuration/otlp-exporter/) for precedence and per-signal options.

If the exporter reports connection failures, inspect DNS, outbound port access and proxy settings from the application's runtime environment.

## Check Authentication and Service Identity

Monoscope accepts the project key as a resource attribute:

```sh
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
export OTEL_SERVICE_NAME="checkout-api"
```

An OTLP header is another option:

```sh
export OTEL_EXPORTER_OTLP_HEADERS="x-api-key=YOUR_API_KEY"
```

Keep other resource attributes in the same comma-separated value. For example:

```sh
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY,deployment.environment.name=staging,service.version=1.2.3"
```

If the SDK uses programmatic resource configuration, make sure that it preserves the API key and service name. Environment-variable support depends on the SDK and initialization path.

## Traces Arrive, but Logs or Metrics Do Not

Traces, logs and metrics use separate OpenTelemetry providers and exporters. Pointing a trace exporter at Monoscope does not create the other signals.

- For application logs, configure the logging bridge or appender and the log exporter.
- For metrics, configure the meter provider, instruments and an exporting metric reader.
- For host and container metrics, use an [infrastructure integration](/docs/sdks/infrastructure/).

`console.log` and ordinary stdout do not automatically become OTLP logs. The [OpenTelemetry JavaScript instrumentation guide](https://opentelemetry.io/docs/languages/js/instrumentation/) shows separate setup for each signal.

## Framework Requests Are Missing

Initialize OpenTelemetry before importing the libraries it must instrument. For Node.js, load the instrumentation entry point before Express, HTTP clients and database drivers. For Python, export the environment before starting `opentelemetry-instrument`.

Register the Monoscope framework middleware or route wrapper as shown in its guide. Restart the process after changing startup configuration. Avoid initializing two independent providers for the same signal.

If HTTP requests work but jobs are absent, instrument the worker process too. An HTTP middleware does not cover a separate queue consumer.

## Payloads or Identity Are Missing

Body capture is opt-in. User and tenant identity come from your authentication layer. See [Data capture and identity](/docs/sdks/data-capture/) for the configuration and verification procedure.

If a body is empty, make sure that the SDK supports its content type. Then inspect the body parser order in the framework guide. A redacted field cannot be recovered from stored telemetry.

## A Trace Stops at a Service Boundary

Make sure that the outgoing client injects trace context and the receiving service extracts it. Preserve propagation headers through proxies. For queues, use the messaging instrumentation's context propagation.

Do not create a new root span for every downstream operation. Start child spans from the active request or extracted message context.

## Short-Lived Processes Lose Spans

Batch exporters buffer telemetry. Before a CLI, job or worker exits, await the provider's flush or shutdown operation. Keep the process alive until that operation completes.

An event written immediately before a forced exit can be lost. Shutdown cannot flush a process killed without a cleanup opportunity.

## Separate the CLI from the Application

With the [CLI installed](/docs/ai/cli/install/), run:

```sh
monoscope auth status
monoscope send-event -m "integration-check"
```

In Explorer, search for the quoted message:

```kql
"integration-check"
```

If the CLI event arrives, investigate the application's configuration and instrumentation. If neither arrives, inspect the project selection, key and network path for each client.

When requesting support, include the runtime, SDK versions, startup command, sanitized exporter error and test time. Send these details to [hello@monoscope.tech](mailto:hello@monoscope.tech).
