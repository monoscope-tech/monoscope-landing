---
title: Go Gorilla Mux
ogTitle: Go Gorilla Mux SDK Guide
date: 2022-03-23
updatedDate: 2024-06-08
menuWeight: 5
---

# Go Gorilla Mux OpenTelemetry Integration Guide

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

Install the monoscope gorilla mux SDK:

```sh
go get github.com/monoscope-tech/monoscope-go/gorilla
```

## Configuration

Set these environment variables, for example in a `.env` file or your deployment config. Always set `OTEL_EXPORTER_OTLP_ENDPOINT`: without it, the SDK sends data to an old default endpoint.

```sh
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
OTEL_SERVICE_NAME="monoscope-otel-go-demo"
OTEL_SERVICE_VERSION="0.0.1"
OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
```

## Usage

Initialize OpenTelemetry and add the monoscope middleware:

```go
package main

import (
  "log"
  "net/http"

  monoscope "github.com/monoscope-tech/monoscope-go/gorilla"
  "github.com/gorilla/mux"
  _ "github.com/joho/godotenv/autoload" // autoload .env file for otel configuration
)

func main() {
  shutdown, err := monoscope.ConfigureOpenTelemetry()
  if err != nil {
    log.Printf("error configuring openTelemetry: %v", err)
  }
  defer shutdown()

  router := mux.NewRouter()
  // Register monoscope's middleware
  router.Use(monoscope.Middleware(
    monoscope.Config{
      CaptureRequestBody:  true,
      CaptureResponseBody: true,
      RedactHeaders:       []string{"Authorization", "X-Api-Key"},
      RedactRequestBody:   []string{"$.password", "$.credit_card"},
      RedactResponseBody:  []string{"$.password", "$.credit_card"},
    }))

  router.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("ok"))
  })
  http.ListenAndServe(":8000", router)

}
```

### All Environment Variables

Set the following environment variables in your application to enable the SDK:

{class="docs-table"}
:::
| Variable Name | Description | Required | Example |
| ----------------------------------- | ------------------------------------------------------------- | -------- | ---------------------------- |
| `OTEL_RESOURCE_ATTRIBUTES` | Your monoscope API key (`x-api-key=YOUR_API_KEY`) | Yes | `x-api-key=YOUR_API_KEY` |
| `OTEL_SERVICE_NAME` | The name of the service being monitored | No | `example-chi-server` |
| `OTEL_SERVICE_VERSION` | The version of your application or service | No | `0.0.1` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The OpenTelemetry collector endpoint | Yes | `http://otelcol.monoscope.tech:4317` |
| `OTEL_TRACES_ENABLED` | Enable or disable tracing | No | `true` |
| `OTEL_METRICS_ENABLED` | Enable or disable metrics | No | `true` |
| `OTEL_LOG_LEVEL` | The log level for the SDK (Set to debug to enable debug logs) | No | `info` |
| `OTEL_EXPORTER_OTLP_METRICS_PERIOD` | The period at which metrics are exported. | No | `30s` |
| `OTEL_PROPAGATORS` | The propagators to use for tracing. | No | `tracecontext,baggage` |
:::

### All Middleware Configuration Fields

Pass these fields to `monoscope.Config{}` to customize the middleware:

{class="docs-table"}
:::
| Field Name | Type | Description | Default Value | Example |
| --------------------- | ---------- | ----------------------------------------------- | ------------- | ----------------------------------------- |
| `Debug` | `bool` | Enable detailed logs during development | `false` | `true` |
| `ServiceName` | `string` | Name of the service being monitored | - | `"example-chi-server"` |
| `ServiceVersion` | `string` | Version of the service | - | `"0.0.1"` |
| `Tags` | `[]string` | Additional tags for contextual information | `[]` | `[]string{"env:dev", "team:backend"}` |
| `CaptureRequestBody` | `bool` | Enable capturing of request body | `false` | `true` |
| `CaptureResponseBody` | `bool` | Enable capturing of response body | `false` | `true` |
| `RedactHeaders` | `[]string` | List of headers to redact | `[]` | `[]string{"Authorization", "X-Api-Key"}` |
| `RedactRequestBody` | `[]string` | JSONPath list of request body fields to redact | `[]` | `[]string{"$.password", "$.credit_card"}` |
| `RedactResponseBody` | `[]string` | JSONPath list of response body fields to redact | `[]` | `[]string{"$.password", "$.credit_card"}` |
:::

## Error Reporting

To attach an error to the current request, call `ReportError()` with the request context:

```go
func handler(w http.ResponseWriter, r *http.Request) {
  if _, err := os.Open("non-existing-file.txt"); err != nil {
    monoscope.ReportError(r.Context(), err)
    http.Error(w, "Something went wrong", http.StatusInternalServerError)
    return
  }
  w.Write([]byte("ok"))
}
```

## Monitoring Outgoing Requests

To trace the HTTP calls your server makes to other APIs, create the client with `monoscope.HTTPClient()` and pass it the request context. The client records request and response bodies, so redact sensitive fields:

```go
func handler(w http.ResponseWriter, r *http.Request) {
  client := monoscope.HTTPClient(r.Context(),
    monoscope.WithRedactHeaders("Authorization"),
    monoscope.WithRedactRequestBody("$.user.email"),
    monoscope.WithRedactResponseBody("$.users[*].email"),
  )
  resp, err := client.Get("https://jsonplaceholder.typicode.com/posts/1")
  if err != nil {
    http.Error(w, "Something went wrong", http.StatusInternalServerError)
    return
  }
  defer resp.Body.Close()
  w.Write([]byte("ok"))
}
```

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Gorilla Mux middleware only covers HTTP requests. Cron jobs (`robfig/cron`), task queues (`hibiken/asynq`, `gocraft/work`), Kafka/NATS consumers, and standalone CLI commands are invisible until you wrap each handler in a span yourself. Instrument these together with your HTTP routes. If you do not, much of your production work has no telemetry.

Use the standard OpenTelemetry Go SDK. The same `TracerProvider` you configured for HTTP also instruments downstream calls (database, outbound HTTP) once a parent span is active.

```go
import (
    "context"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/codes"
    semconv "go.opentelemetry.io/otel/semconv/v1.26.0"
    "go.opentelemetry.io/otel/trace"
    "github.com/hibiken/asynq"
)

var tracer = otel.Tracer("my-service-worker")

func ProcessEmail(ctx context.Context, t *asynq.Task) error {
    ctx, span := tracer.Start(ctx, "email.send",
        trace.WithSpanKind(trace.SpanKindConsumer),
        trace.WithAttributes(
            semconv.MessagingSystem("asynq"),
            attribute.String("messaging.operation", "process"),
            attribute.String("messaging.destination.name", t.Type()),
            attribute.String("code.function", "ProcessEmail"),
        ))
    defer span.End()

    if err := sendEmail(ctx, t.Payload()); err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
        return err
    }
    return nil
}
```

The same wrapper goes around `robfig/cron` job functions, Kafka/NATS subscribers, and any goroutine-based worker. For one-shot CLI binaries, call the `shutdown` function returned by `ConfigureOpenTelemetry()` before `os.Exit`. Otherwise the batch span processor does not flush and the spans are lost.

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tips</b></p>
  <ol>
  <li>
  Keep your monoscope API key (<code>x-api-key</code>) secret. Do not commit it to public repositories or write it to logs.
  </li>
  </ol>
</div>
```

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.
