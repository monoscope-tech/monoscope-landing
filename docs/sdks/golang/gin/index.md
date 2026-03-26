---
title: Go Gin
ogTitle: Go Gin OpenTelemetry Integration
date: 2022-03-23
updatedDate: 2025-03-02
menuWeight: 4
---

# Go Gin OpenTelemetry Integration

## Installation

Install the Monoscope Gin SDK:

```sh
go get github.com/monoscope-tech/monoscope-go/gin
```

## Configuration

Configure the following environment variables for OpenTelemetry and Monoscope:

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
		RedactHeaders:      []string{"Authorization", "X-Api-Key"},
		RedactRequestBody:  []string{"password", "credit_card"},
		RedactResponseBody: []string{"password", "credit_card"},
	}))

	router.GET("/greet/:name", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Hello " + c.Param("name")})
	})

	router.Run(":8000")
}
```

## Error Reporting

Monoscope automatically detects different unhandled errors, API issues, and anomalies but you can report and track specific errors at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

To manually report specific errors at different parts of your application, use the `ReportError()` method, passing in the `context` and `error` arguments, like so:

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
			// Report the error to Monoscope
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

Outgoing requests are external API calls you make from your API. By default, Monoscope monitors all requests users make from your application and they will all appear in the page.

```=html
<section class="tab-group" data-tab-group="group1">
  <button class="tab-button" data-tab="tab1">Using Monoscope</button>
  <button class="tab-button" data-tab="tab2">Using Otel instrumentation</button>
  <div id="tab1" class="tab-content">
  To monitor outgoing HTTP requests from your application, replace the default HTTP client transport with a custom RoundTripper. This allows you to capture and send copies of all incoming and outgoing requests to Monoscope.

Here's an example of the configuration with a custom RoundTripper:
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
  <p class="mt-6">You can also redact data with the custom RoundTripper for outgoing requests.</p>
</div>

  </div>

   <div id="tab2" class="tab-content">
  You can also use an otel instrumentation library to monitor outgoing requests from your server, but using this instead of the Monoscope HTTP client will not log request and response bodies. To use otel outgoing request monitoring, you must first install it using the command below:
```

```sh
go get go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp
```

Here's an example of the configuration with otel instrumentation:

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

		// Perform the request, this requests will be monitored by
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

Monoscope provides an OpenTelemetry Redis instrumentation library that you can use to monitor Redis requests. To use the Redis instrumentation, you must first install it using the command below:

```sh
go get github.com/go-redis/redis/extra/redisotel/v8
```

Here's an example of the configuration with Redis instrumentation:

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

All redis operations will be monitored by the OpenTelemetry SDK and can be viewed in you monoscope log explorer.

## All Environment Variables

Set the following environment variables in your application to enable the SDK:

{class="docs-table"}
:::
| Variable Name | Description | Required | Example |
| ----------------------------------- | ------------------------------------------------------------- | -------- | ---------------------------- |
| `OTEL_RESOURCE_ATTRIBUTES` | Monoscope project key (`x-api-key=<YOUR_API_KEY>`) | Yes | `x-api-key=my-api-key` |
| `OTEL_SERVICE_NAME` | The name of the service being monitored | No | `example-chi-server` |
| `OTEL_SERVICE_VERSION` | The version of your application or service | No | `0.0.1` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The grpc endpoint for the OpenTelemetry collector. | No | `otelcol.monoscope.tech:4317` |
| `OTEL_TRACES_ENABLED` | Enable or disable tracing | No | `true` |
| `OTEL_METRICS_ENABLED` | Enable or disable metrics | No | `true` |
| `OTEL_LOG_LEVEL` | The log level for the SDK (Set to debug to enable debug logs) | No | `info` |
| `OTEL_EXPORTER_OTLP_METRICS_PERIOD` | The period at which metrics are exported. | No | `30s` |
| `OTEL_PROPAGATORS` | The propagators to use for tracing. | No | `tracecontext,baggage` |
:::

## All Middleware Configuration Fields

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
