---
title: Phoenix
ogTitle: Phoenix SDK Guide
date: 2022-03-23
updatedDate: 2026-11-19
menuWeight: 1
---

# Phoenix SDK Guide

The monoscope **Phoenix SDK** is a Plug that records incoming requests and sends them to monoscope. This guide shows how to install and configure it.

```=html
<hr>
```

## Choose the Integration Path

The `apitoolkit_phoenix` Plug below uses the legacy request-ingestion client. It captures request and response bodies, and its configuration differs from an OpenTelemetry exporter. The body-capture switches in other language SDKs do not apply to this Plug.

For a new OpenTelemetry integration, use [OpentelemetryPhoenix](https://hexdocs.pm/opentelemetry_phoenix/readme.html) with the appropriate Bandit or Cowboy instrumentation. Initialize its handler before the application supervisor starts. Configure the OTLP exporter through the [OpenTelemetry guide](/docs/sdks/opentelemetry/).

The official Phoenix instrumentation requires `Plug.Telemetry` in the endpoint. Consult its setup guide for adapter options and complete request-lifecycle coverage.

For the legacy Plug, review payload redaction before sending real traffic. If the integration must exclude bodies, use the OpenTelemetry path.

## Prerequisites

You need a monoscope project and its API key. If you do not have them yet, follow [Get started](/docs/onboarding/#get-your-api-key).

## Set Up With Your Coding Agent

Your coding agent can add the instrumentation for you. Install the monoscope skills and the monoscope CLI:

```sh
# Claude Code
claude plugin marketplace add monoscope-tech/skills
claude plugin install monoscope-skills@monoscope-skills

# Cursor, Codex, Cline and other agents
npx skills add monoscope-tech/skills

# monoscope CLI
curl https://monoscopehq.com/install.sh | sh
monoscope auth login
```

Then ask your agent to instrument the project. In Claude Code, run:

```
/monoscope-skills:instrument Add OpenTelemetry for monoscope to this project
```

The skill uses the CLI to add the SDK and to make sure that events arrive. To do the setup by hand, follow the steps below. For help from a person, [email us](mailto:hello@monoscope.tech).

## Installation

Add `apitoolkit_phoenix` to the dependencies in your `mix.exs` file:

```elixir
def deps do
  [
    {:apitoolkit_phoenix, "~> 0.1.2"}
  ]
end
```

Then run `mix deps.get` to install it. See the [Hex package](https://hex.pm/packages/apitoolkit_phoenix) for published releases. A version in repository source does not establish that it is available from Hex.

## Configuration

Import the `ApitoolkitPhoenix` Plug in your `router.ex` file and add it to your pipeline:

```elixir
defmodule HelloWeb.Router do
  use HelloWeb, :router
  use Plug.ErrorHandler
  import ApitoolkitPhoenix

  pipeline :api do
    plug :accepts, ["json"]
    plug ApitoolkitPhoenix,
      config: %{
        api_key: "YOUR_API_KEY",
        debug: false,
        redact_headers: ["authorization", "cookie", "set-cookie", "proxy-authorization", "x-api-key"],
      }
    # Other plugs...
  end
end
```

Only `api_key` is required. These fields are optional:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `debug` | Set to `true` to enable debug mode. |
| `redact_headers` | A list of HTTP header keys to redact. In published `0.1.2`, only `cookie` is redacted automatically. |
| `redact_request_body` | A list of JSONPaths from the request body to redact. |
| `redact_response_body` | A list of JSONPaths from the response body to redact. |
| `root_url` | The monoscope API URL. Defaults to `https://app.apitoolkit.io`. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>Replace <code>YOUR_API_KEY</code> with an API key from <b>Settings &gt; API Keys</b> in monoscope.</p>
</div>
```

## Redacting Sensitive Data

<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p>The published <code>0.1.2</code> package automatically redacts <code>cookie</code>. Add <code>authorization</code>, <code>set-cookie</code>, <code>proxy-authorization</code> and application keys explicitly. The newer source defaults are not a guarantee for the published package.</p>
</div>

If you have fields that are sensitive and should not be sent to monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To mark a field for redacting via this SDK, you need to provide additional arguments to the `config` key with paths to the fields that should be redacted. There are three arguments you can provide to configure what gets redacted, namely:

1. `redact_headers`: A list of HTTP header keys.
2. `redact_request_body`: A list of JSONPaths from the request body.
3. `redact_response_body`: A list of JSONPaths from the response body.

```=html
<hr />
```

JSONPath is a query language used to select and extract data from JSON files. For example, given the following sample user data JSON object:

```json
{
  "user": {
    "name": "John Martha",
    "email": "john.martha@example.com",
    "addresses": [
      {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
      },
      {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345"
      }
    ],
    "credit_card": {
      "number": "4111111111111111",
      "expiration": "12/28",
      "cvv": "123"
    }
  }
}
```

Examples of valid JSONPath expressions would be:

{class="docs-table"}
:::
| JSONPath | Description |
| -------- | ----------- |
| `$.user.addresses[*].zip` | In this case, monoscope will replace the `zip` field in all the objects of the `addresses` list inside the `user` object with the string `[CLIENT_REDACTED]`. |
| `$.user.credit_card` | In this case, monoscope will replace the entire `credit_card` object inside the `user` object with the string `[CLIENT_REDACTED]`. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>To learn more about JSONPaths, please take a look at the <a href="https://github.com/json-path/JsonPath/blob/master/README.md" target="_blank">official docs</a> or use this <a href="https://jsonpath.com?ref=monoscope" target="_blank">JSONPath Evaluator</a> to validate your JSONPath expressions. </p>
  <p><b>You can also use our <a href="/tools/json-redacter/">JSON Redaction Tool</a> <i class="fa-regular fa-screwdriver-wrench"></i> to preview what the final data sent from your API to monoscope will look like, after redacting any given JSON object</b>.</p>
</div>
<hr />
```

Here's an example of what the configuration would look like with redacted fields:

```elixir
defmodule HelloWeb.Router do
  use HelloWeb, :router
  use Plug.ErrorHandler
  import ApitoolkitPhoenix

  pipeline :api do
    plug :accepts, ["json"]
    # Other plugs
    plug ApitoolkitPhoenix,
      config: %{
        api_key: "YOUR_API_KEY",
        redact_headers: ["authorization", "cookie", "set-cookie", "proxy-authorization", "x-api-key"],
        redact_request_body: ["$.user.email", "$.user.addresses"],
        redact_response_body: ["$.users[*].email", "$.users[*].credit_card"]
      }
  end
end
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>redact_headers</code> config field expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>redact_request_body</code> and <code>redact_response_body</code> config fields expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

With monoscope, you can track and report different unhandled or uncaught errors, API issues, and anomalies at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

```=html
<section class="tab-group" data-tab-group="group1">
  <button class="tab-button" data-tab="tab1">Report All Errors</button>
  <button class="tab-button" data-tab="tab2">Report Specific Errors</button>
  <div id="tab1" class="tab-content">
To report all uncaught errors, call `report_error()` with the `conn` and the error in your `handle_errors` function:
```

```elixir
@impl Plug.ErrorHandler
def handle_errors(conn, err) do
  conn = report_error(conn, err)
  json(conn, %{message: "Something went wrong!"})
end
```

```=html
  </div>
  <div id="tab2" class="tab-content">
To report a specific error, call `report_error()` in a controller with the `conn`, the error and `__STACKTRACE__`. It returns the updated `conn`, so keep using that `conn`:
```

```elixir
defmodule HelloWeb.PageController do
  use HelloWeb, :controller
  import ApitoolkitPhoenix

  def home(conn, _params) do
    conn =
      try do
        raise("Oops, something went wrong!")
      rescue
        err ->
          # Report the error to monoscope
          report_error(conn, err, __STACKTRACE__)
      end

    json(conn, %{message: "Hello, world!"})
  end
end
```

```=html
  </div>
</section>
```

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Phoenix plug only covers HTTP requests. Oban workers, Broadway pipelines, GenServer pollers, and Mix tasks are invisible until you wrap each handler in a span yourself. Always cover these alongside your HTTP routes.

The examples below use OpenTelemetry, not the Phoenix SDK. Add the `opentelemetry` and `opentelemetry_exporter` dependencies, then point the exporter at monoscope:

```sh
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4318"
OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
OTEL_SERVICE_NAME="my-service"
```

For **Oban**, use the official auto-instrumentation — every job automatically gets a span:

```elixir
# mix.exs
{:opentelemetry_oban, "~> 1.1"}

# application.ex — in start/2 before children:
OpentelemetryOban.setup()
```

For **Broadway**, **GenServer pollers**, and **Mix tasks**, wrap each handler with `OpenTelemetry.Tracer`:

```elixir
require OpenTelemetry.Tracer, as: Tracer

def process_email(payload) do
  Tracer.with_span "email.send", %{
    kind: :consumer,
    attributes: [
      {"messaging.system", "broadway"},
      {"messaging.operation", "process"},
      {"messaging.destination.name", "emails"},
      {"code.function", "MyApp.Worker.process_email"}
    ]
  } do
    try do
      send_email(payload)
    rescue
      e ->
        Tracer.record_exception(e, __STACKTRACE__)
        Tracer.set_status(:error, Exception.message(e))
        reraise e, __STACKTRACE__
    end
  end
end
```

For Mix tasks and other one-shot processes, call `:opentelemetry.get_tracer_provider() |> :otel_tracer_provider.force_flush()` before exit so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/apitoolkit-phoenix" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Phoenix SDK
</a>
```
