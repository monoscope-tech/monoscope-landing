---
title: Go Fiber
ogTitle: Go Fiber SDK Guide
date: 2022-03-23
updatedDate: 2024-10-22
menuWeight: 3
---

# Go Fiber OpenTelemetry Integration Guide

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

Install the Monoscope fiber SDK using the following command `go get` command:

```sh
go get github.com/monoscope-tech/monoscope-go/fiber
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

	monoscope "github.com/monoscope-tech/monoscope-go/fiber"
	"github.com/gofiber/fiber/v2"
  _ "github.com/joho/godotenv/autoload" // autoload .env file for otel configuration

)

func main() {
  // Configure OpenTelemetry
	shutdown, err := monoscope.ConfigureOpenTelemetry()
	if err != nil {
		log.Printf("error configuring openTelemetry: %v", err)
	}
	defer shutdown()

	app := fiber.New()
	// Register Monoscope's middleware
	app.Use(monoscope.Middleware(monoscope.Config{
		RedactHeaders:       []string{"Authorization", "X-Api-Key"}, // Example headers to redact
		RedactRequestBody:   []string{"$.password", "$.account.credit_card"}, // Example request body fields to redact (in jsonpath)
		RedactResponseBody:  []string{"$.password", "$.user.credit_card"}, // Example response body fields to redact (in jsonpath)
	}))

	// Define a route for Hello World
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"message": "Hello, World!",
		})
	})

	app.Listen(":3000")
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

The Fiber middleware only covers HTTP requests. Cron jobs (`robfig/cron`), task queues (`hibiken/asynq`, `gocraft/work`), Kafka/NATS consumers, and standalone CLI commands are invisible until you wrap each handler in a span yourself. Always cover these alongside your HTTP routes — without it, half your production work has no observability.

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
