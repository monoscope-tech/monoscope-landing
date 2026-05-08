---
title: Go Chi
ogTitle: Go Chi OpenTelemetry Integration
date: 2022-03-23
updatedDate: 2024-10-22
menuWeight: 1
---

# Go Chi OpenTelemetry Integration Guide

## Installation

Install the Monoscope chi SDK using the following command `go get` command:

```sh
go get github.com/monoscope-tech/monoscope-go/chi
```

## Configuration

Before configuration open telemetery and setting up the Monoscope middleware, you need to configure a few environment variables. These variables provide essential information for setting up openTelemetry and Monoscope.

```sh
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
OTEL_SERVICE_NAME="monoscope-otel-go-demo"
OTEL_SERVICE_VERSION="0.0.1"
OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
```

## Usage

After setting up the environment variables, you can configure the OpenTelemetry SDK and Monoscope middleware like so:

```go
package main

import (
	"log"

	monoscope "github.com/monoscope-tech/monoscope-go/chi"
	"github.com/go-chi/chi/v5"
  _ "github.com/joho/godotenv/autoload" // autoload .env file for otel configuration
)

func main() {
  // Configure OpenTelemetry
	shutdown, err := monoscope.ConfigureOpenTelemetry()
	if err != nil {
		log.Printf("error configuring openTelemetry: %v", err)
	}
	defer shutdown()

  r := chi.NewRouter()
	// Add the monoscope chi middleware to monitor http requests
	// And report errors to monoscope
	r.Use(monoscope.Middleware(monoscope.Config{
		Debug:               false,
		ServiceName:         "example-chi-server",
		ServiceVersion:      "0.0.1",
		Tags:                []string{"env:dev"},
		CaptureRequestBody:  true,
		CaptureResponseBody: true,
		RedactHeaders:       []string{"Authorization", "X-Api-Key"},
		RedactRequestBody:   []string{"password", "credit_card"},
		RedactResponseBody:  []string{"password", "credit_card"},
	}))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello, world!"))
	})

	http.ListenAndServe(":8000", r)
}
```

### All Middleware Configuration Fields

The middleware configuration specifies how the Monoscope SDK should handle requests and responses. Below are the available fields:

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

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Chi middleware only covers HTTP requests. Cron jobs (`robfig/cron`), task queues (`hibiken/asynq`, `gocraft/work`), Kafka/NATS consumers, and standalone CLI commands are invisible until you wrap each handler in a span yourself. Always cover these alongside your HTTP routes — without it, half your production work has no observability.

Use the standard OpenTelemetry Go SDK; the same `TracerProvider` you configured for HTTP also instruments downstream calls (database, outbound HTTP) once a parent span is active.

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

The same wrapper goes around `robfig/cron` job functions, Kafka/NATS subscribers, and any goroutine-based worker. For one-shot CLI binaries, call `tp.Shutdown(ctx)` on your `TracerProvider` before `os.Exit` so the `BatchSpanProcessor` flushes; otherwise spans are dropped silently.

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tips</b></p>
  <ol>
  <li>
  Remember to keep your Monoscope project key (<code>x-api-key</code>) secure and not expose it in public repositories or logs.
  </li>
  </ol>
</div>
```
