---
title: Flask
ogTitle: Flask SDK Guide
date: 2022-03-23
updatedDate: 2026-05-08
menuWeight: 3
---

# Flask SDK Guide

In this guide, you’ll learn how to integrate OpenTelemetry into your Flask application and install the Monoscope SDK to enhance its functionalities. By combining OpenTelemetry’s robust tracing and metrics capabilities with the Monoscope SDK, you’ll be able to monitor incoming and outgoing requests, report errors, and gain deeper insights into your application’s performance. This setup provides comprehensive observability, helping you track requests and troubleshoot issues effectively.

```=html
<hr>
```

## Prerequisites

Ensure you have already completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

Kindly run the command below to install the monoscope flask sdks and necessary opentelemetry packages:

```sh
pip install monoscope-flask opentelemetry-distro opentelemetry-exporter-otlp
opentelemetry-bootstrap -a install
```

## Setup Open Telemetry

Setting up open telemetry allows you to send traces, metrics and logs to the monoscope platform.
To setup open telemetry, you need to configure the following environment variables:

```sh
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
export OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
export OTEL_RESOURCE_ATTRIBUTES="x-api-key={ENTER_YOUR_API_KEY_HERE}" # Adds your API KEY to the resource.
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc" #Specifies the protocol to use for the OpenTelemetry exporter.
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true # enable logging auto instrumentation

```

Then run the command below to start your server with opentelemetry instrumented:

```sh
opentelemetry-instrument flask run --app app
```

Or using `gunicorn`:

```sh
opentelemetry-instrument gunicorn server:app
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>The <code>{ENTER_YOUR_API_KEY_HERE}</code> demo string should be replaced with the API key generated from the Monoscope dashboard.</p>
</div>
```

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p><b>Import / load order matters:</b> <code>opentelemetry-instrument</code> reads the <code>OTEL_*</code> environment variables when it starts. Export them in the same shell (or load them from a <code>.env</code> file) <i>before</i> invoking the command, otherwise the instrumentation will use defaults and your traces won't reach Monoscope.</p>
</div>
```

## Monoscope Flask Configuration

After setting up open telemetry, you can now configure the monoscope flask middleware.
Next, initialize Monoscope in your application's entry point (e.g., `main.py`), like so:

```python
from flask import Flask
from monoscope_flask import Monoscope

app = Flask(__name__)

# Initialize Monoscope
monoscope = Monoscope()

@app.before_request
def before_request():
  monoscope.beforeRequest()

@app.after_request
def after_request(response):
  monoscope.afterRequest(response)
  return response
# END Initialize Monoscope

@app.route('/hello', methods=['GET', 'POST'])
def sample_route():
  return {"Hello": "World"}

app.run(debug=True)
```

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `service_name` | A defined string name of your application (used for further debugging on the dashboard). |
| `debug` | Set to `true` to enable debug mode. |
| `tags` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `service_version` | A defined string version of your application (used for further debugging on the dashboard). |
| `redact_headers` | A list of HTTP header keys to redact. |
| `redact_response_body` | A list of JSONPaths from the request body to redact. |
| `redact_request_body` | A list of JSONPaths from the response body to redact. |
| `capture_request_body` | Set to `true` to capture the request body. |
| `capture_response_body` | Set to `true` to capture the response body. |
:::

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to Monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To mark a field for redacting via this SDK, you need to add some additional fields to the `monoscope` configuration object with paths to the fields that should be redacted. There are three variables you can provide to configure what gets redacted, namely:

1. `redact_headers`: A list of HTTP header keys.
2. `redact_response_body`: A list of JSONPaths from the request body.
3. `redact_request_body`: A list of JSONPaths from the response body.

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
  <p>To learn more about JSONPaths, please take a look at the <a href="https://github.com/json-path/JsonPath/blob/master/README.md" target="_blank">official docs</a> or use this <a href="https://jsonpath.com?ref=monoscope" target="_blank">JSONPath Evaluator</a> to validate your JSONPath expressions. </p>
  <p><b>You can also use our <a href="/tools/json-redacter/">JSON Redaction Tool</a> <i class="fa-regular fa-screwdriver-wrench"></i> to preview what the final data sent from your API to Monoscope will look like, after redacting any given JSON object</b>.</p>
</div>
<hr />
```

Here's an example of what the configuration would look like with redacted fields:

```python
from flask import Flask
from monoscope_flask import Monoscope

app = Flask(__name__)

redact_headers = ["content-type", "Authorization", "HOST"]
redact_response_body = ["$.user.email", "$.user.addresses"]
redact_request_body = ["$.users[*].email", "$.users[*].credit_card"]

monoscope = monoscope(
  redact_headers=redact_headers,
  redact_response_body=redact_response_body,
  redact_request_body=redact_request_body
)

@app.before_request
def before_request():
  monoscope.beforeRequest()

@app.after_request
def after_request(response):
  monoscope.afterRequest(response)
  return response

@app.route('/hello', methods=['GET', 'POST'])
def sample_route():
  return {"Hello": "World"}

app.run(debug=True)
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>redact_headers</code> variable expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>redact_response_body</code> and <code>redact_request_body</code> variables expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

With Monoscope, you can track and report different unhandled or uncaught errors, API issues, and anomalies at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

To manually report specific errors at different parts of your application, use the `report_error()` function from the `monoscope_flask` module, passing in the `request` and `error`, like so:

```python
from flask import Flask, request
from monoscope_flask import Monoscope, report_error

app = Flask(__name__)

monoscope = Monoscope()

@app.before_request
def before_request():
  monoscope.beforeRequest()

@app.after_request
def after_request(response):
  monoscope.afterRequest(response)
  return response

@app.route('/', methods=['GET', 'POST'])
def sample_route():
  try:
    value = 1 / 0
    return {"zero_division": value}
  except Exception as e:
    # Report the error to Monoscope
    report_error(request, e)
    return {"message": "Something went wrong"}

if __name__ == "__main__":
  app.run(debug=True)
```

## Identifying users & tenants

Attach the authenticated user and tenant to every request span so you can filter, group, and search by identity in the dashboard (e.g. "all errors for `user.email = jane@acme.com`"). Call `set_user` and `set_tenant` from any handler or `before_request` hook that runs after your auth layer — the SDK writes them to the active request span using the standard attribute keys (`user.id`, `user.email`, `user.full_name`, `tenant.id`, `tenant.name`).

```python
from flask import g, request
from monoscope_flask import set_user, set_tenant

@app.before_request
def attach_identity():
    user = getattr(g, "user", None)
    if user is None:
        return
    set_user({"id": user.id, "email": user.email, "name": user.full_name})
    set_tenant({"id": user.org_id, "name": user.org_name})
```

Both helpers skip missing fields, so partial info is fine. They must run inside a request handled by the Monoscope middleware — calls outside that scope are silent no-ops.

## Monitoring HTTPX requests

Outgoing requests are external API calls you make from your API. By default, Monoscope monitors all requests users make from your application and they will all appear in the [API Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. However, you can separate outgoing requests from others and explore them in the [Outgoing Integrations](/docs/dashboard/dashboard-pages/outgoing-integrations/){target="\_blank"} page, alongside the incoming request that triggered them.

To monitor outgoing HTTP requests from your application, use the `observe_request()` function from the `monoscope_flask` module, passing in the `request` argument, like so:

```python
from flask import Flask, request
from monoscope_flask import Monoscope, observe_request

app = Flask(__name__)

monoscope = Monoscope()

@app.before_request
def before_request():
  monoscope.beforeRequest()

@app.after_request
def after_request(response):
  monoscope.afterRequest(response)
  return response

@app.route('/', methods=['GET', 'POST'])
def sample_route():
  resp = observe_request(request).get("https://jsonplaceholder.typicode.com/todos/2")
  return resp.read()

if __name__ == "__main__":
  app.run(debug=True)
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

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Flask middleware only covers HTTP requests. Celery tasks, RQ workers, APScheduler jobs, Flask CLI commands, and standalone scripts are invisible until you instrument them yourself. Always cover these alongside your HTTP routes — without it, half your production work has no observability.

For **Celery**, install the auto-instrumentation package and every task automatically gets a span:

```sh
pip install opentelemetry-instrumentation-celery
```

```python
from celery.signals import worker_process_init
from opentelemetry.instrumentation.celery import CeleryInstrumentor

@worker_process_init.connect(weak=False)
def init_celery_tracing(*args, **kwargs):
    CeleryInstrumentor().instrument()
```

For **RQ, APScheduler, Flask CLI commands (`@app.cli.command`), or any custom worker**, wrap each handler in a span with the OpenTelemetry tracer API:

```python
from opentelemetry import trace
from opentelemetry.trace.status import Status, StatusCode

tracer = trace.get_tracer("my-service-worker")

def process_email(payload: dict) -> None:
    with tracer.start_as_current_span(
        "email.send",
        attributes={
            "messaging.system": "rq",
            "messaging.operation": "process",
            "messaging.destination.name": "emails",
            "code.function": "process_email",
        },
    ) as span:
        try:
            send_email(payload)
        except Exception as exc:
            span.record_exception(exc)
            span.set_status(Status(StatusCode.ERROR))
            raise
```

For Flask CLI commands and other one-shot scripts, call `trace.get_tracer_provider().shutdown()` before returning so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>The <code>observe_request()</code> function wraps an <a href="https://github.com/monoscope-tech/monoscope-flask" target="_blank" rel="noopener noreferrer" class="">HTTPX</a>

 client and you can use it just like you would normally use HTTPX for any request.</p>
</div>
```

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-python/tree/main/flask" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Flask SDK
</a>
```
