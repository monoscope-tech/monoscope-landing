---
title: Go Gorilla Mux
ogTitle: Go Gorilla Mux SDK Guide
date: 2022-03-23
updatedDate: 2024-06-08
menuWeight: 5
---

# Go Gorilla Mux OpenTelemetry Integration Guide

## Installation

Install the monoscope gorilla mux SDK using the following command `go get` command:

```sh
go get github.com/monoscope-tech/monoscope-go/gorilla
```

## Configuration

Before configuration open telemetery and setting up the monoscope middleware, you need to configure a few environment variables. These variables provide essential information for setting up openTelemetry and monoscope.

```sh
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
OTEL_SERVICE_NAME="monoscope-otel-go-demo"
OTEL_SERVICE_VERSION="0.0.1"
OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
```

## Usage

After setting up the environment variables, you can configure the OpenTelemetry SDK and monoscope middleware like so:

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
			RedactHeaders:       []string{"Authorization", "X-Api-Key"},
			RedactRequestBody:   []string{"password", "credit_card"},
			RedactResponseBody:  []string{"password", "credit_card"},
		}))

	router.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("ok"))
	})
	http.Handle("/", router)
	http.ListenAndServe(":8000", router)

}
```

### All Environment Variables

Set the following environment variables in your application to enable the SDK:

{class="docs-table"}
:::
| Variable Name | Description | Required | Example |
| ----------------------------------- | ------------------------------------------------------------- | -------- | ---------------------------- |
| `OTEL_RESOURCE_ATTRIBUTES` | monoscope project key (`x-api-key=<YOUR_API_KEY>`) | Yes | `x-api-key=my-api-key` |
| `OTEL_SERVICE_NAME` | The name of the service being monitored | No | `example-chi-server` |
| `OTEL_SERVICE_VERSION` | The version of your application or service | No | `0.0.1` |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | The grpc endpoint for the OpenTelemetry collector. | No | `otelcol.monoscope.tech:4317` |
| `OTEL_TRACES_ENABLED` | Enable or disable tracing | No | `true` |
| `OTEL_METRICS_ENABLED` | Enable or disable metrics | No | `true` |
| `OTEL_LOG_LEVEL` | The log level for the SDK (Set to debug to enable debug logs) | No | `info` |
| `OTEL_EXPORTER_OTLP_METRICS_PERIOD` | The period at which metrics are exported. | No | `30s` |
| `OTEL_PROPAGATORS` | The propagators to use for tracing. | No | `tracecontext,baggage` |
:::

### All Middleware Configuration Fields

The middleware configuration specifies how the monoscope SDK should handle requests and responses. Below are the available fields:

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
  Remember to keep your monoscope project key (`x-api-key`) secure and not expose it in public repositories or logs.
  </li>
  </ul>
</div>
```
