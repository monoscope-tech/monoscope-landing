---
title: Pyramid
ogTitle: Pyramid SDK Guide
date: 2022-03-23
updatedDate: 2024-06-17
menuWeight: 4
---

In this guide, you’ll learn how to integrate OpenTelemetry into your Pyramid application and install the Monoscope SDK to enhance its functionalities. By combining OpenTelemetry’s robust tracing and metrics capabilities with the Monoscope SDK, you’ll be able to monitor incoming and outgoing requests, report errors, and gain deeper insights into your application’s performance. This setup provides comprehensive observability, helping you track requests and troubleshoot issues effectively.

```=html
<hr>
```

## Prerequisites

Ensure you have already completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

Kindly run the command below to install the apitoolkit pyramid sdk and necessary opentelemetry packages:

```sh
pip install monoscope-pyramid opentelemetry-distro opentelemetry-exporter-otlp
opentelemetry-bootstrap -a install
```

## Setup Open Telemetry

Setting up open telemetry allows you to send traces, metrics and logs to the Monoscope platform.
To setup open telemetry, you need to configure the following environment variables:

```sh
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
export OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
export OTEL_RESOURCE_ATTRIBUTES="at-project-key={ENTER_YOUR_API_KEY_HERE}" # Adds your API KEY to the resource.
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc" #Specifies the protocol to use for the OpenTelemetry exporter.
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true # enable logging auto instrumentation
```

Then run the command below to start your server with opentelemetry instrumented:

```sh
opentelemetry-instrument python3 myapp.py
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>The <code>{ENTER_YOUR_API_KEY_HERE}</code> demo string should be replaced with the API key generated from the Monoscope dashboard.</p>
</div>
```

## Monoscope Pyramid Configuration

After setting up open telemetry, you can now configure and start the apitoolkit pyramid middleware.

Next, add the configuration variables to your settings or `development.ini` or `production.ini` file, like so:

```=html
<section class="tab-group" data-tab-group="group1">
  <button class="tab-button" data-tab="tab1">settings</button>
  <button class="tab-button" data-tab="tab2">.ini file</button>
    <div id="tab1" class="tab-content">
```

```python
settings = {
  "MONOSCOPE_DEBUG": False,
  "MONOSCOPE_TAGS": ["environment: production", "region: us-east-1"],
  "MONOSCOPE_SERVICE_VERSION": "v2.0",
  "MONOSCOPE_ROUTES_WHITELIST": ["/api/first", "/api/second"],
  "MONOSCOPE_IGNORE_HTTP_CODES": [404, 429]
}
```

```=html
  </div>
  <div id="tab2" class="tab-content">
```

```sh
MONOSCOPE_DEBUG = False
MONOSCOPE_TAGS = environment: production, region: us-east-1
MONOSCOPE_SERVICE_VERSION = "v2.0"
MONOSCOPE_ROUTES_WHITELIST = /api/first, /api/second
MONOSCOPE_IGNORE_HTTP_CODES = 404, 429
```

```=html
  </div>
</section>
```

Then, initialize Monoscope in your application's entry point (e.g., `app.py`), like so:

```python
from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
from pyramid.view import view_config

@view_config(route_name='home')
def home(request):
  return Response('Welcome!')

if __name__ == '__main__':
  settings = {
    "MONOSCOPE_DEBUG": False,
  }
  with Configurator(settings=settings) as config:
    # Initialize Monoscope
    config.add_tween("monoscope_pyramid.Monoscope")
    # END Initialize Monoscope
    config.add_route('home', '/')
    config.scan()
    app = config.make_wsgi_app()
  server = make_server('0.0.0.0', 6543, app)
  server.serve_forever()
```

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `MONOSCOPE_SERVICE_NAME` | A defined string name of your application |
| `MONOSCOPE_DEBUG` | Set to `true` to enable debug mode. |
| `MONOSCOPE_TAGS` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `MONOSCOPE_SERVICE_VERSION` | A defined string version of your application (used for further debugging on the dashboard). |
| `MONOSCOPE_REDACT_HEADERS` | A list of HTTP header keys to redact. |
| `MONOSCOPE_REDACT_REQUEST_BODY` | A list of JSONPaths from the request body to redact. |
| `MONOSCOPE_REDACT_RESPONSE_BODY` | A list of JSONPaths from the response body to redact. |
| `MONOSCOPE_CAPTURE_REQUEST_BODY` | Set to `true` to capture the request body. |
| `MONOSCOPE_CAPTURE_RESPONSE_BODY` | Set to `true` to capture the response body. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>The <code>{ENTER_YOUR_API_KEY_HERE}</code> demo string should be replaced with the API key generated from the Monoscope dashboard.</p>
</div>
```

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to Monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To mark a field for redacting via this SDK, you need to add some additional fields to your `development.ini` or `production.ini` file or settings with paths to the fields that should be redacted. There are three variables you can provide to configure what gets redacted, namely:

1. `MONOSCOPE_REDACT_HEADERS`: A list of HTTP header keys.
2. `MONOSCOPE_REDACT_REQUEST_BODY`: A list of JSONPaths from the request body.
3. `MONOSCOPE_REDACT_RESPONSE_BODY`: A list of JSONPaths from the response body.

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
| `$.user.addresses[*].zip` | In this case, Monoscope will replace the `zip` field in all the objects of the `addresses` list inside the `user` object with the string `[CLIENT_REDACTED]`. |
| `$.user.credit_card` | In this case, Monoscope will replace the entire `credit_card` object inside the `user` object with the string `[CLIENT_REDACTED]`. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>To learn more about JSONPaths, please take a look at the <a href="https://github.com/json-path/JsonPath/blob/master/README.md" target="_blank">official docs</a> or use this <a href="https://jsonpath.com?ref=apitoolkit" target="_blank">JSONPath Evaluator</a> to validate your JSONPath expressions. </p>
  <p><b>You can also use our <a href="/tools/json-redacter/">JSON Redaction Tool</a> <i class="fa-regular fa-screwdriver-wrench"></i> to preview what the final data sent from your API to Monoscope will look like, after redacting any given JSON object</b>.</p>
</div>
<hr />
```

Here's an example of what the configuration would look like with redacted fields:

```=html
<section class="tab-group" data-tab-group="group1">
  <button class="tab-button" data-tab="tab1">settings</button>
  <button class="tab-button" data-tab="tab2">.ini file</button>
  <div id="tab1" class="tab-content">
```

```python
settings = {
  "MONOSCOPE_REDACT_HEADERS": ["content-type", "Authorization", "HOST"],
  "MONOSCOPE_REDACT_REQUEST_BODY": ["$.user.email", "$.user.addresses"],
  "MONOSCOPE_REDACT_RESPONSE_BODY": ["$.users[*].email", "$.users[*].credit_card"]
}
```

```=html
  </div>
  <div id="tab2" class="tab-content">
```

```sh
MONOSCOPE_REDACT_HEADERS: content-type, Authorization, HOST
MONOSCOPE_REDACT_REQ_BODY: $.user.email, $.user.addresses
MONOSCOPE_REDACT_RES_BODY: $.users[*].email, $.users[*].credit_card
```

```=html
  </div>
</section>
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>MONOSCOPE_REDACT_HEADERS</code> variable expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>MONOSCOPE_REDACT_REQ_BODY</code> and <code>MONOSCOPE_REDACT_RES_BODY</code> variables expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

With Monoscope, you can track and report different unhandled or uncaught errors, API issues, and anomalies at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

To manually report specific errors at different parts of your application, use the `report_error()` function from the `monoscope_pyramid` module, passing in the `request` and `error` arguments, like so:

```python
from pyramid.response import Response
from pyramid.view import view_config
from monoscope_pyramid import observe_request, report_error

@view_config(route_name='home')
def home(request):
  try:
    resp = observe_request(request).get(
      "https://jsonplaceholder.typicode.com/todos/2")
    return Response(resp.read())
  except Exception as e:
    report_error(request, e)
    return Response("something went wrong")
```

## Monitoring Outgoing Requests

Outgoing requests are external API calls you make from your API. By default, Monoscope monitors all requests users make from your application and they will all appear in the [API Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. However, you can separate outgoing requests from others and explore them in the [Outgoing Integrations](/docs/dashboard/dashboard-pages/outgoing-integrations/){target="\_blank"} page, alongside the incoming request that triggered them.

To monitor outgoing HTTP requests from your application, use the `observe_request()` function from the `monoscope_pyramid` module, passing in the `request` argument, like so:

```python
from pyramid.response import Response
from pyramid.view import view_config
from monoscope_pyramid import observe_request

@view_config(route_name='home')
def home(request):
  resp = observe_request(request).get(
    "https://jsonplaceholder.typicode.com/todos/2")
  return Response(resp.read())
```

The `observe_request()` function accepts a **required `request` argument**, and the following optional arguments:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `url_wildcard` | The `url_path` string for URLs with path parameters. |
| `redact_headers` | A list of HTTP header keys to redact. |
| `redact_response_body` | A list of JSONPaths from the request body to redact. |
| `redact_request_body` | A list of JSONPaths from the response body to redact. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>The `observe_request()` function wraps an <a href="https://github.com/monoscope-tech/apitoolkit-python/main/tree/pyramid" target="_blank" rel="noopener noreferrer" class="">HTTPX</a>

 client and you can use it just like you would normally use HTTPX for any request.</p>
</div>
```

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-python/tree/main/pyramid" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Pyramid SDK
</a>
```
