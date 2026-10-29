---
title: Go Gin
ogTitle: Go Gin OpenTelemetry Integration
date: 2022-03-23
updatedDate: 2025-03-02
menuWeight: 4
---

# Go Gin OpenTelemetry Integration

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

Install the monoscope Gin SDK:

```sh
go get github.com/monoscope-tech/monoscope-go/gin
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

Initialize OpenTelemetry and add the monoscope middleware to your Gin router:

```go
package main

import (
  "log"
  "net/http"

  monoscope "github.com/monoscope-tech/monoscope-go/gin"
  "github.com/gin-gonic/gin"
  _ "github.com/joho/godotenv/autoload" // autoload .env file for otel configuration
)

func main() {
  // Configure openTelemetry
  shutdown, err := monoscope.ConfigureOpenTelemetry()
  if err != nil {
    log.Printf("error configuring openTelemetry: %v", err)
  }
  defer shutdown()

  router := gin.Default()
  // Add the monoscope gin middleware to monitor http requests
  // And report errors to monoscope
  router.Use(monoscope.Middleware(monoscope.Config{
    CaptureRequestBody:  true,
    CaptureResponseBody: true,
    RedactHeaders:       []string{"Authorization", "X-Api-Key"},
    RedactRequestBody:   []string{"$.password", "$.credit_card"},
    RedactResponseBody: []string{"$.password", "$.credit_card"},
  }))

  router.GET("/greet/:name", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "Hello " + c.Param("name")})
  })

  router.Run(":8000")
}
```

## Error Reporting

The middleware records panics on its own. To attach a handled error to the current request, call `ReportError()` with the request context. Pass `c.Request.Context()`, not `c`:

```go
package main

import (
  "log"
  "net/http"
  "os"

  monoscope "github.com/monoscope-tech/monoscope-go/gin"
  "github.com/gin-gonic/gin"
  _ "github.com/joho/godotenv/autoload" // autoload .env file for otel configuration
)

func main() {
  // Configure openTelemetry
  shutdown, err := monoscope.ConfigureOpenTelemetry()
  if err != nil {
    log.Printf("error configuring openTelemetry: %v", err)
  }
  defer shutdown()

  router := gin.New()
  router.Use(monoscope.Middleware(monoscope.Config{}))

  router.GET("/", func(c *gin.Context) {
    file, err := os.Open("non-existing-file.txt")
    if err != nil {
      // Report the error to monoscope
      monoscope.ReportError(c.Request.Context(), err)
      c.JSON(http.StatusInternalServerError, gin.H{"message": "Something went wrong"})
      return
    }
    c.JSON(http.StatusOK, gin.H{"message": file.Name()})
  })
  router.Run(":8000")
}
```

## Monitoring Outgoing Requests

Outgoing requests are the HTTP calls your server makes to other APIs. monoscope shows them together with the incoming request that made them.

```=html
<section class="tab-group" data-tab-group="group1">
  <button class="tab-button" data-tab="tab1">Using monoscope</button>
  <button class="tab-button" data-tab="tab2">Using OTel instrumentation</button>
  <div id="tab1" class="tab-content">
  Create the client with <code>monoscope.HTTPClient()</code> and pass it the request context. The client records request and response bodies, so redact sensitive fields:
```

```go
package main

import (
  "log"
  "net/http"

  monoscope "github.com/monoscope-tech/monoscope-go/gin"
  "github.com/gin-gonic/gin"
  _ "github.com/joho/godotenv/autoload" // autoload .env file for otel configuration
)

func main() {
  // Configure openTelemetry
  shutdown, err := monoscope.ConfigureOpenTelemetry()
  if err != nil {
    log.Printf("error configuring openTelemetry: %v", err)
  }
  defer shutdown()

  router := gin.New()
  router.Use(monoscope.Middleware(monoscope.Config{}))

  router.GET("/", func(c *gin.Context) {
    // Create a new HTTP client
    HTTPClient := monoscope.HTTPClient(
      c.Request.Context(),
      monoscope.WithRedactHeaders("content-type", "Authorization", "HOST"),
      monoscope.WithRedactRequestBody("$.user.email", "$.user.addresses"),
      monoscope.WithRedactResponseBody("$.users[*].email", "$.users[*].credit_card"),
    )

    // Make an outgoing HTTP request using the modified HTTPClient
    _, _ = HTTPClient.Get("https://jsonplaceholder.typicode.com/posts/1")
    c.String(http.StatusOK, "Ok, success!")
  })
  router.Run(":8000")
}
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p class="mt-6">To instrument an existing transport, use <code>WrapRoundTripper</code> from the root <code>github.com/monoscope-tech/monoscope-go</code> package. It takes the same redaction options.</p>
</div>

  </div>

   <div id="tab2" class="tab-content">
  You can use the OpenTelemetry <code>otelhttp</code> library instead. It records request metadata only, not request or response bodies. Install it first:
```

```sh
go get go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp
```

Then wrap your HTTP transport with `otelhttp.NewTransport`:

```go
package main

import (
  "io"
  "log"
  "net/http"

  monoscope "github.com/monoscope-tech/monoscope-go/gin"
  "github.com/gin-gonic/gin"
  _ "github.com/joho/godotenv/autoload" // autoload .env file for otel configuration
  "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
)

var clientWithOtel = http.Client{
  Transport: otelhttp.NewTransport(http.DefaultTransport),
}

func main() {
  // Configure openTelemetry
  shutdown, err := monoscope.ConfigureOpenTelemetry()
  if err != nil {
    log.Printf("error configuring openTelemetry: %v", err)
  }
  defer shutdown()

  router := gin.New()
  router.Use(monoscope.Middleware(monoscope.Config{}))

  router.GET("/", func(c *gin.Context) {
    // Create a new request
    ctx := c.Request.Context()
    req, err := http.NewRequestWithContext(ctx, "GET", "https://jsonplaceholder.typicode.com/users", nil)
    if err != nil {
      log.Fatalf("failed to create request: %v", err)
    }

    // Perform the request (automatically traced by otelhttp)
    resp, err := clientWithOtel.Do(req)
    if err != nil {
      log.Fatalf("failed to make request: %v", err)
    }
    defer resp.Body.Close()

    // Read response body
    body, err := io.ReadAll(resp.Body)
    if err != nil {
      log.Fatalf("failed to read response: %v", err)
    }

    c.String(http.StatusOK, string(body))

  })
  router.Run(":8000")
}
```

```=html
  </div>
</section>
```

---

## OpenTelemetry Redis Instrumentation

Monitor Redis operations by adding the `redisotel` tracing hook. Install it first:

```sh
go get github.com/go-redis/redis/extra/redisotel/v8
```

Add the tracing hook to your Redis client:

```go
package main

import (
  "log"
  "net/http"

  monoscope "github.com/monoscope-tech/monoscope-go/gin"
  "github.com/gin-gonic/gin"
  "github.com/go-redis/redis/extra/redisotel/v8"
  "github.com/go-redis/redis/v8"
  _ "github.com/joho/godotenv/autoload"
)

func main() {
  // Configure openTelemetry
  shutdown, err := monoscope.ConfigureOpenTelemetry()
  if err != nil {
    log.Printf("error configuring openTelemetry: %v", err)
  }
  defer shutdown()

  // Create Redis client
  rdb := redis.NewClient(&redis.Options{
    Addr: "localhost:6379",
  })

  // Add Redis instrumentation
  rdb.AddHook(redisotel.NewTracingHook())

  router := gin.Default()
  router.Use(monoscope.Middleware(monoscope.Config{}))

  router.GET("/greet/:name", func(c *gin.Context) {
    // Get the current context from Gin
    ctx := c.Request.Context()
    // Perform Redis operations
    // IMPORTANT: You must use the context from Gin to perform Redis operations
    err := rdb.Set(ctx, "example_key", "example_value", 0).Err()
    if err != nil {
      c.JSON(http.StatusInternalServerError, gin.H{"error": "Redis set failed: " + err.Error()})
      return
    }
    val, err := rdb.Get(ctx, "example_key").Result()
    if err != nil {
      c.JSON(http.StatusInternalServerError, gin.H{"error": "Redis get failed: " + err.Error()})
      return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Hello, " + val + "!"})
  })
  router.Run(":8000")

}
```

All Redis operations appear in the monoscope Log Explorer.

## All Environment Variables

Set the following environment variables in your application to enable the SDK:

{class="docs-table"}
:::
| Variable Name | Description | Required | Example |
| ----------------------------------- | ------------------------------------------------------------- | -------- | ---------------------------- |
| `OTEL_RESOURCE_ATTRIBUTES` | Your monoscope API key (`x-api-key=YOUR_API_KEY`) | Yes | `x-api-key=YOUR_API_KEY` |
| `OTEL_SERVICE_NAME` | The name of the service being monitored | No | `example-gin-server` |
| `OTEL_SERVICE_VERSION` | The version of your application or service | No | `0.0.1` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The OpenTelemetry collector endpoint | Yes | `http://otelcol.monoscope.tech:4317` |
| `OTEL_TRACES_ENABLED` | Enable or disable tracing | No | `true` |
| `OTEL_METRICS_ENABLED` | Enable or disable metrics | No | `true` |
| `OTEL_LOG_LEVEL` | The log level for the SDK (Set to debug to enable debug logs) | No | `info` |
| `OTEL_EXPORTER_OTLP_METRICS_PERIOD` | The period at which metrics are exported. | No | `30s` |
| `OTEL_PROPAGATORS` | The propagators to use for tracing. | No | `tracecontext,baggage` |
:::

## All Middleware Configuration Fields

Pass these fields to `monoscope.Config{}` to customize middleware behavior:

{class="docs-table"}
:::
| Field Name | Type | Description | Default Value | Example |
| --------------------- | ---------- | ----------------------------------------------- | ------------- | ----------------------------------------- |
| `Debug` | `bool` | Enable detailed logs during development | `false` | `true` |
| `ServiceName` | `string` | Name of the service being monitored | - | `"example-gin-server"` |
| `ServiceVersion` | `string` | Version of the service | - | `"0.0.1"` |
| `Tags` | `[]string` | Additional tags for contextual information | `[]` | `[]string{"env:dev", "team:backend"}` |
| `CaptureRequestBody` | `bool` | Enable capturing of request body | `false` | `true` |
| `CaptureResponseBody` | `bool` | Enable capturing of response body | `false` | `true` |
| `RedactHeaders` | `[]string` | List of headers to redact | `[]` | `[]string{"Authorization", "X-Api-Key"}` |
| `RedactRequestBody` | `[]string` | JSONPath list of request body fields to redact | `[]` | `[]string{"$.password", "$.credit_card"}` |
| `RedactResponseBody` | `[]string` | JSONPath list of response body fields to redact | `[]` | `[]string{"$.password", "$.credit_card"}` |
:::

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Gin middleware only covers HTTP requests. Cron jobs (`robfig/cron`), task queues (`hibiken/asynq`, `gocraft/work`), Kafka/NATS consumers, and standalone CLI commands are invisible until you wrap each handler in a span yourself. Instrument these together with your HTTP routes. If you do not, much of your production work has no telemetry.

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
