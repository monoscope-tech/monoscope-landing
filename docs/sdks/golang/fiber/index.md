---
title: Go Fiber
ogTitle: Go Fiber SDK Guide
date: 2022-03-23
updatedDate: 2024-10-22
menuWeight: 3
---

# Go Fiber OpenTelemetry Integration Guide

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

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tips</b></p>
  <ol>
  <li>
  Remember to keep your Monoscope project key (<code>x-api-key</code>) secure and not expose it in public repositories or logs.
  </li>
  </ul>
</div>
```
