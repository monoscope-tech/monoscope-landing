---
title: Django
ogTitle: Django SDK Guide
date: 2022-03-23
updatedDate: 2026-05-08
menuWeight: 1
---

# Django SDK Guide

In this guide, you’ll learn how to integrate OpenTelemetry into your Django application and install the Monoscope SDK to enhance its functionalities. By combining OpenTelemetry’s robust tracing and metrics capabilities with the Monoscope SDK, you’ll be able to monitor incoming and outgoing requests, report errors, and gain deeper insights into your application’s performance. This setup provides comprehensive observability, helping you track requests and troubleshoot issues effectively.

```=html
<hr>
```

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

Run the command below to install the monoscope django sdks and necessary opentelemetry packages:

```sh
pip install monoscope-django opentelemetry-distro opentelemetry-exporter-otlp
opentelemetry-bootstrap -a install
```

## Set Up OpenTelemetry

Setting up open telemetry allows you to send traces, metrics and logs to the monoscope platform.
To setup open telemetry, you need to configure the following environment variables:

```sh
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
export OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY" # Adds your API KEY to the resource.
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc" # Specifies the protocol to use for the OpenTelemetry exporter.
export OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true # enable logging auto instrumentation
export DJANGO_SETTINGS_MODULE={YOUR_DJANGO_PROJECT_NAME}.settings # Specifies the Django settings module to use.
```

Then run the command below to start your server with opentelemetry instrumented:

```sh
opentelemetry-instrument python3 manage.py runserver --noreload
```

Or run using `gunicorn`

```sh
opentelemetry-instrument gunicorn myapp.wsgi
```

Or using `daphne`

```sh
opentelemetry-instrument daphne myapp.asgi:application
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>Replace <code>YOUR_API_KEY</code> with an API key from <b>Settings &gt; API Keys</b> in monoscope.</p>
  <p>Replace <code>{YOUR_DJANGO_PROJECT_NAME}</code> with the name of your Django project.</p>
</div>
```

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p><b>Import / load order matters:</b> <code>opentelemetry-instrument</code> reads the <code>OTEL_*</code> environment variables when it starts. Export them in the same shell (or load them from a <code>.env</code> file) <i>before</i> invoking the command, otherwise the instrumentation will use defaults and your traces won't reach Monoscope.</p>
</div>
```

## Configuration

Add the monoscope options to your Django settings file (`settings.py`):

```python
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Add the Monoscope configuration options
MONOSCOPE_CAPTURE_REQUEST_BODY = True
MONOSCOPE_CAPTURE_RESPONSE_BODY = True

# Application definition
INSTALLED_APPS = [
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.sessions',
]
```

Then add `monoscope_django.MonoscopeMiddleware` to the `MIDDLEWARE` list in `settings.py`:

```python
MIDDLEWARE = [
  'monoscope_django.MonoscopeMiddleware',  # Initialize Monoscope
  'django.middleware.security.SecurityMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  # Add other middleware as needed
]
```

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `MONOSCOPE_SERVICE_NAME` | A defined string name of your application |
| `MONOSCOPE_DEBUG` | Set to `True` to enable debug mode. |
| `MONOSCOPE_TAGS` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `MONOSCOPE_SERVICE_VERSION` | A defined string version of your application (used for further debugging on the dashboard). |
| `MONOSCOPE_REDACT_HEADERS` | A list of HTTP header keys to redact. |
| `MONOSCOPE_REDACT_REQUEST_BODY` | A list of JSONPaths from the request body to redact. |
| `MONOSCOPE_REDACT_RESPONSE_BODY` | A list of JSONPaths from the response body to redact. |
| `MONOSCOPE_CAPTURE_REQUEST_BODY` | Set to `True` to capture the request body. |
| `MONOSCOPE_CAPTURE_RESPONSE_BODY` | Set to `True` to capture the response body. |
:::

To skip some paths, set `OTEL_PYTHON_EXCLUDED_URLS` to a comma-separated list of regular expressions, for example `healthz,metrics`. The middleware does not trace requests whose path matches.

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to Monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To mark a field for redacting via this SDK, you need to add some additional configuration options to the `settings.py` file with paths to the fields that should be redacted. There are three variables you can provide to configure what gets redacted, namely:

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
  <p>To learn more about JSONPaths, please take a look at the <a href="https://github.com/json-path/JsonPath/blob/master/README.md" target="_blank">official docs</a> or use this <a href="https://jsonpath.com?ref=monoscope" target="_blank">JSONPath Evaluator</a> to validate your JSONPath expressions. </p>
  <p><b>You can also use our <a href="/tools/json-redacter/">JSON Redaction Tool</a> <i class="fa-regular fa-screwdriver-wrench"></i> to preview what the final data sent from your API to Monoscope will look like, after redacting any given JSON object</b>.</p>
</div>
<hr />
```

Here's an example of what the `settings.py` file would look like with redacted fields:

```python
MONOSCOPE_REDACT_HEADERS = ["content-type", "Authorization", "HOST"]
MONOSCOPE_REDACT_REQUEST_BODY = ["$.user.email", "$.user.addresses"]
MONOSCOPE_REDACT_RESPONSE_BODY = ["$.users[*].email", "$.users[*].credit_card"]
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>MONOSCOPE_REDACT_HEADERS</code> variable expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>MONOSCOPE_REDACT_REQUEST_BODY</code> and <code>MONOSCOPE_REDACT_RESPONSE_BODY</code> variables expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

Monoscope automatically detects different unhandled errors, API issues, and anomalies but you can report and track specific errors at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

To manually report specific errors at different parts of your application, use the `report_error` function from the `monoscope_django` module, passing in the `request` and `error`, like so:

```python
from django.http import JsonResponse
from monoscope_django import report_error

def hello_world(request, name):
  try:
    value = 1/0
    return JsonResponse({"hello": value})
  except Exception as e:
    report_error(request, e)
    return JsonResponse({"Error": "Something went wrong..."})
```

## Identifying users & tenants

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p><code>set_user</code>, <code>set_tenant</code> and <code>set_session</code> need <code>monoscope-django</code> 1.1.0 or later and <code>monoscope-common</code> 1.2.0 or later.</p>
</div>
```

Attach the authenticated user and tenant to every request span so you can filter, group, and search by identity in the dashboard (e.g. "all errors for `user.email = jane@acme.com`"). Call `set_user` and `set_tenant` from a view or a custom middleware placed *after* `django.contrib.auth.middleware.AuthenticationMiddleware` so that `request.user` is populated. The SDK writes them to the active request span using the standard attribute keys (`user.id`, `user.email`, `user.full_name`, `tenant.id`, `tenant.name`).

```python
# myapp/middleware.py
from monoscope_django import set_user, set_tenant

class AttachIdentityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = getattr(request, "user", None)
        if user is not None and user.is_authenticated:
            set_user({
                "id": user.id,
                "email": user.email,
                "name": user.get_full_name() or user.username,
            })
            set_tenant({
                "id": getattr(user, "org_id", None),
                "name": getattr(user, "org_name", None),
            })
        return self.get_response(request)
```

In `settings.py`, list the middleware **after** `MonoscopeMiddleware` and `AuthenticationMiddleware`:

```python
MIDDLEWARE = [
    "monoscope_django.MonoscopeMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "myapp.middleware.AttachIdentityMiddleware",
    # ...
]
```

Both helpers skip missing fields, so partial info is fine. Calls outside a Monoscope-handled request are silent no-ops.

## Tracking sessions

If you ship the [Monoscope Browser SDK](/docs/sdks/Javascript/browser/){target="\_blank"} on your frontend, **`session.id` is propagated and tagged automatically** — no Django code required. The browser SDK injects the W3C `baggage` header on every outbound fetch/XHR, and `MonoscopeMiddleware` extracts it and tags the request span under the standard OTel `session.id` attribute.

For server-only sessions, set the session ID alongside user and tenant inside the identity middleware. The three together — **who**, **which org**, **which session** — are what makes a trace searchable and replayable in the dashboard:

```python
# myapp/middleware.py
from monoscope_django import set_user, set_tenant, set_session

class AttachIdentityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user = getattr(request, "user", None)
        if user is not None and user.is_authenticated:
            set_user({"id": user.id, "email": user.email, "name": user.get_full_name()})
            set_tenant({"id": getattr(user, "org_id", None), "name": getattr(user, "org_name", None)})
        if request.session.session_key:
            set_session(request.session.session_key)
        return self.get_response(request)
```

`set_session` writes the standard `session.id` attribute to the active request span. Calls outside a Monoscope-handled request are silent no-ops.

## Monitoring HTTPX requests

Outgoing requests are external API calls you make from your API. By default, Monoscope monitors all requests users make from your application and they will all appear in the [Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. To see only outgoing requests, open the **Outgoing** tab of the [API Catalog](/docs/dashboard/dashboard-pages/api-catalog/). Each outgoing request links to the incoming request that triggered it.

To monitor outgoing HTTP requests from your application, use the `observe_request` function from the `monoscope_django` module, passing in the `request` argument, like so:

```python
from django.http import JsonResponse
from monoscope_django import observe_request

def hello_world(request, name):
  resp = observe_request(request).get(
    "https://jsonplaceholder.typicode.com/todos/2")
  return JsonResponse({"data": resp.json()})
```

The `observe_request()` function accepts a **required `request` argument**, and the following optional arguments:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `url_wildcard` | The `url_path` string for URLs with path parameters. |
| `redact_headers` | A list of HTTP header keys to redact. |
| `redact_response_body` | A list of JSONPaths from the response body to redact. |
| `redact_request_body` | A list of JSONPaths from the request body to redact. |
:::

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Django middleware only covers HTTP requests. Celery tasks, RQ workers, custom `manage.py` commands, and `django-cron` jobs are invisible until you instrument them yourself. Always cover these alongside your HTTP routes — without it, half your production work has no observability.

For **Celery** (the most common Django background runner), install the auto-instrumentation package and every task automatically gets a span:

```sh
pip install opentelemetry-instrumentation-celery
```

```python
# celery.py — alongside your existing Celery app definition
from celery.signals import worker_process_init
from opentelemetry.instrumentation.celery import CeleryInstrumentor

@worker_process_init.connect(weak=False)
def init_celery_tracing(*args, **kwargs):
    CeleryInstrumentor().instrument()
```

For **RQ, APScheduler, custom management commands, or any worker not covered by an instrumentation package**, wrap each handler in a span with the OpenTelemetry tracer API:

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

For management commands and other one-shot scripts, call `trace.get_tracer_provider().shutdown()` in your `handle()` method's `finally` block so the BatchSpanProcessor flushes; otherwise spans are dropped silently when the process exits.

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>The <code>observe_request()</code> function returns an <a href="https://www.python-httpx.org/" target="_blank" rel="noopener noreferrer">HTTPX</a> client. Use it as you would use any HTTPX client.</p>
</div>
```

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-python/tree/main/django" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Django SDK
</a>
```
