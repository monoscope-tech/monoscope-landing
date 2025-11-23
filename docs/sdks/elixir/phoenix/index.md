---
title: Phoenix
ogTitle: Phoenix SDK Guide
date: 2022-03-23
updatedDate: 2024-06-08
menuWeight: 1
---

# Phoenix SDK Guide

To integrate your Elixir Phoenix application with monoscope, you need to use this SDK to monitor incoming traffic, aggregate the requests, and then send them to monoscope's servers. Kindly follow this guide to get started and learn about all the supported features of monoscope's **Phoenix SDK**.

```=html
<hr>
```

## Prerequisites

Ensure you have already completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

To install the SDK, kindly add `monoscope_phoenix` to the list of dependencies in the `mix.exs` file, like so:

```elixir
def deps do
  [
    {:monoscope_phoenix, "~> 0.1.1"}
  ]
end
```

Then, run the `mix deps.get` command to install the `monoscope_phoenix` dependency.

## Configuration

Next, import and initialize the `MonoscopePhoenix` Plug in your `router.ex` file, like so:

```elixir
defmodule HelloWeb.Router do
  use HelloWeb, :router
  use Plug.ErrorHandler
  import MonoscopePhoenix

  pipeline :api do
    plug :accepts, ["json"]
    plug MonoscopePhoenix,
      config: %{
        api_key: "{ENTER_YOUR_API_KEY_HERE}",
        debug: false,
      }
    # Other plugs...
  end
end
```

In the configuration above, **only the `api_key` option is required**, but you can add the following optional fields:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `debug` | Set to `true` to enable debug mode. |
| `redact_headers` | A list of HTTP header keys to redact. |
| `redact_response_body` | A list of JSONPaths from the request body to redact. |
| `redact_request_body` | A list of JSONPaths from the response body to redact. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>
    The <code>{ENTER_YOUR_API_KEY_HERE}</code> demo string should be replaced
    with the API key generated from the monoscope dashboard.
  </p>
</div>
```

## Redacting Sensitive Data

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
  import MonoscopePhoenix

  pipeline :api do
    plug :accepts, ["json"]
    # Other plugs
    plug MonoscopePhoenix,
      config: %{
        api_key: "{ENTER_YOUR_API_KEY_HERE}",
        redact_headers: ["content-type", "Authorization", "HOST"],
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
To report all uncaught errors and service exceptions, use the `report_error()` method, passing in the `connection` and `error` arguments in the `handle_errors` function, like so:
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
To manually report specific errors at different parts of your application, call the `report_error()` method anywhere within a controller, also passing in the `connection`, `error`, and `__STACKTRACE__` arguments, like so:
```

```elixir
defmodule HelloWeb.PageController do
  use HelloWeb, :controller
  import MonoscopePhoenix

  def home(conn, _params) do
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

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-phoenix" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Phoenix SDK
</a>
```
