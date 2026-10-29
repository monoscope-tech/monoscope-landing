---
title: Laravel
ogTitle: Laravel SDK Guide
date: 2022-03-23
updatedDate: 2024-06-17
menuWeight: 1
---

# Laravel SDK Guide

The monoscope Laravel middleware monitors HTTP requests in your Laravel application. It builds on OpenTelemetry to create a span for each request, with the request and response bodies, headers and status code. It can also monitor outgoing requests and report errors.

To get started, install the SDK and the OpenTelemetry PHP packages, then configure the exporter.

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
curl -fsSL https://monoscopehq.com/install.sh | sh
monoscope auth login
```

Then ask your agent to instrument the project. In Claude Code, run:

```
/monoscope-skills:instrument Add OpenTelemetry for monoscope to this project
```

The skill uses the CLI to add the SDK and to make sure that events arrive. To do the setup by hand, follow the steps below. For help from a person, [email us](mailto:hello@monoscope.tech).

## Installation

Install the Laravel SDK and the OpenTelemetry packages:

```sh
composer require \
    open-telemetry/sdk \
    open-telemetry/exporter-otlp \
    apitoolkit/apitoolkit-laravel
```

## Set Up OpenTelemetry

OpenTelemetry sends your traces, metrics and logs to monoscope. First, install the OpenTelemetry PHP extension:
```sh
pecl install opentelemetry
```

Then add it to your `php.ini` file:

```ini
[opentelemetry]
extension=opentelemetry.so
```

Then configure the following environment variables:

```sh
export OTEL_PHP_AUTOLOAD_ENABLED=true
export OTEL_SERVICE_NAME=your-service-name
export OTEL_TRACES_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
export OTEL_EXPORTER_OTLP_ENDPOINT=http://otelcol.monoscope.tech:4318
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
export OTEL_PROPAGATORS=baggage,tracecontext
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>Replace <code>YOUR_API_KEY</code> with an API key from <b>Settings &gt; API Keys</b> in monoscope.</p>
</div>
```

## Set Up the Middleware

The middleware creates a span for each request. The span holds the headers, the request and response bodies, the matched route and more.

```=html
<section class="tab-group" data-tab-group="group1">
  <button class="tab-button" data-tab="tab1">Middleware (Global)</button>
  <button class="tab-button" data-tab="tab2">Middleware (Specific Routes)</button>
  <div id="tab1" class="tab-content">
    Register the middleware in `app/Http/Kernel.php`, in a middleware group (for example `api`) or at the root:
```

```php
<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
  protected $middlewareGroups = [
    'api' => [
      // Other middleware here...
      \APIToolkit\Http\Middleware\APIToolkit::class,
    ],
  ];
}
```

```=html
  </div>
  <div id="tab2" class="tab-content">
    To monitor only specific routes, register the middleware as a route middleware:
```

```php
<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
  protected $routeMiddleware = [
    // Other middleware here...
    'monoscope' => \APIToolkit\Http\Middleware\APIToolkit::class,
  ];
}
```

Then add the `monoscope` middleware to your routes:

```php
Route::get('/', function () {
  return response()->json([
    'message' => 'Welcome to your new application!'
  ]);
})->middleware('monoscope');
```

```=html
  </div>
</section>
```

## Middleware Configuration Options

Configure the middleware with these environment variables:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `APITOOLKIT_DEBUG` | Set to `true` to enable debug mode. |
| `APITOOLKIT_SERVICE_NAME` | The name of your service. |
| `APITOOLKIT_TAGS` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `APITOOLKIT_SERVICE_VERSION` | A defined string version of your application (used for further debugging on the dashboard). |
| `APITOOLKIT_REDACT_HEADERS` | A list of HTTP header keys to redact. |
| `APITOOLKIT_REDACT_REQUEST_BODY` | A list of JSONPaths from the request body to redact. |
| `APITOOLKIT_REDACT_RESPONSE_BODY` | A list of JSONPaths from the response body to redact. |
| `APITOOLKIT_CAPTURE_REQUEST_BODY` | Set to `true` to capture the request body. Default `false`. |
| `APITOOLKIT_CAPTURE_RESPONSE_BODY` | Set to `true` to capture the response body. Default `false`. |
:::

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To redact fields, add these environment variables to your `.env` file:

1. `APITOOLKIT_REDACT_HEADERS`: A list of HTTP header keys.
2. `APITOOLKIT_REDACT_REQUEST_BODY`: A list of JSONPaths from the request body.
3. `APITOOLKIT_REDACT_RESPONSE_BODY`: A list of JSONPaths from the response body.

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
| `$.user.addresses[*].zip` | monoscope replaces the `zip` field in all the objects of the `addresses` list inside the `user` object with the string `[CLIENT_REDACTED]`. |
| `$.user.credit_card` | monoscope replaces the entire `credit_card` object inside the `user` object with the string `[CLIENT_REDACTED]`. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>To learn more about JSONPaths, please take a look at the <a href="https://github.com/json-path/JsonPath/blob/master/README.md" target="_blank">official docs</a> or use this <a href="https://jsonpath.com?ref=monoscope" target="_blank">JSONPath Evaluator</a> to validate your JSONPath expressions. </p>
  <p><b>You can also use our <a href="/tools/json-redacter/">JSON Redaction Tool</a> <i class="fa-regular fa-screwdriver-wrench"></i> to preview what the final data sent from your API to monoscope will look like, after redacting any given JSON object</b>.</p>
</div>
<hr />
```

Here's an example of what the `.env` file would look like with redacted fields:

```sh
APITOOLKIT_REDACT_HEADERS="Content-Type, Authorization, HOST"
APITOOLKIT_REDACT_REQUEST_BODY="$.user.email, $.user.addresses"
APITOOLKIT_REDACT_RESPONSE_BODY="$.users[*].email, $.users[*].credit_card"
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>APITOOLKIT_REDACT_HEADERS</code> variable expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>APITOOLKIT_REDACT_REQUEST_BODY</code> and <code>APITOOLKIT_REDACT_RESPONSE_BODY</code> variables expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

monoscope can track and report unhandled errors, API issues and anomalies in your application. This links backend context to each failing customer request.

```=html
<section class="tab-group" data-tab-group="group2">
  <button class="tab-button" data-tab="tab1"> Report All Errors</button>
  <button class="tab-button" data-tab="tab2">Report Specific Errors</button>
  <div id="tab1" class="tab-content">
To report all uncaught errors and exceptions in a web request, call <code>reportError</code> from your Laravel exception handler with the <code>error</code> and the <code>request</code>:
```

```php
<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use APIToolkit\APIToolkitLaravel;
use Throwable;

class Handler extends ExceptionHandler
{
  protected $dontReport = [];

  public function register()
  {
    $this->reportable(function (Throwable $e) {
      // Report the error to monoscope
      $request = request();
      APIToolkitLaravel::reportError($e, $request);
    });
  }
}
```

```=html
  </div>
  <div id="tab2" class="tab-content">
To manually report specific errors at different parts of your application, call the <code>reportError</code> method of the <code>APIToolkitLaravel</code> class with the <code>error</code> and the <code>request</code>:
```

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use APIToolkit\APIToolkitLaravel;

Route::get('/user', function (Request $request) {
  try {
    // Simulate a custom user error
    throw new Exception("Custom user error");

    // This line will not execute if an exception is thrown
    return response()->json(["hello" => "world"]);
  } catch (Exception $e) {
    // Report the error to monoscope
    APIToolkitLaravel::reportError($e, $request);

    // Return a JSON response with the error message
    return response()->json(["error" => $e->getMessage()]);
  }
});
```

```=html
  </div>
</section>
```

## Monitoring Outgoing Requests

Outgoing requests are external API calls you make from your API. By default, monoscope monitors all requests that your application makes, and they appear on the [Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. To see only outgoing requests, open the **Outgoing** tab of the [API Catalog](/docs/dashboard/dashboard-pages/api-catalog/). Each outgoing request links to the incoming request that triggered it.

To monitor outgoing HTTP requests from your application, call the `observeGuzzle` method of the `APIToolkitLaravel` class with the `$request` and an `$options` array:

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use APIToolkit\APIToolkitLaravel;

Route::get('/user', function (Request $request) {
  $options = [
    "pathPattern" => "/repos/{owner}/{repo}",
    "redactHeaders" => ["content-type", "Authorization", "HOST"],
    "redactRequestBody" => ["$.user.email", "$.user.addresses"],
    "redactResponseBody" => ["$.users[*].email", "$.users[*].credit_card"]
  ];
  $guzzleClient = APIToolkitLaravel::observeGuzzle($request, $options);
  $responseFromGuzzle = $guzzleClient->request('GET', 'https://api.github.com/repos/monoscope-tech/monoscope-laravel?foobar=123');
  $response = $responseFromGuzzle->getBody()->getContents();

  return $response;
});
```

The `$options` associative array accepts the following optional fields:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `pathPattern` | The `url_path` string for URLs with path parameters. |
| `redactHeaders` | A list of HTTP header keys to redact. |
| `redactRequestBody` | A list of JSONPaths from the request body to redact. |
| `redactResponseBody` | A list of JSONPaths from the response body to redact. |
:::

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Laravel middleware only covers HTTP requests. Queued jobs (`php artisan queue:work`), scheduled tasks (`App\Console\Kernel::schedule`), Horizon supervisors, and Artisan commands are invisible until you wrap each handler in a span yourself. Always cover these alongside your HTTP routes.

Use the OpenTelemetry PHP API directly. Hook into Laravel's `Queue` events for queued jobs, or wrap the handler body manually for scheduled / one-shot work.

```php
use OpenTelemetry\API\Globals;
use OpenTelemetry\API\Trace\Span;
use OpenTelemetry\API\Trace\StatusCode;
use OpenTelemetry\API\Trace\SpanKind;
use Illuminate\Support\Facades\Queue;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobFailed;

// In a service provider's boot():
$tracer = Globals::tracerProvider()->getTracer('my-service-worker');
$active = [];

Queue::before(function (JobProcessing $e) use ($tracer, &$active) {
    $span = $tracer->spanBuilder($e->job->resolveName())
        ->setSpanKind(SpanKind::KIND_CONSUMER)
        ->setAttribute('messaging.system', $e->connectionName)
        ->setAttribute('messaging.operation', 'process')
        ->setAttribute('messaging.destination.name', $e->job->getQueue())
        ->setAttribute('messaging.message.id', $e->job->getJobId())
        ->setAttribute('code.function', $e->job->resolveName())
        ->startSpan();
    $active[$e->job->getJobId()] = [$span, $span->activate()];
});

Queue::after(function (JobProcessed $e) use (&$active) {
    [$span, $scope] = $active[$e->job->getJobId()] ?? [null, null];
    if ($span) { $span->setStatus(StatusCode::STATUS_OK); $scope->detach(); $span->end(); }
});

Queue::failing(function (JobFailed $e) use (&$active) {
    [$span, $scope] = $active[$e->job->getJobId()] ?? [null, null];
    if ($span) {
        $span->recordException($e->exception);
        $span->setStatus(StatusCode::STATUS_ERROR);
        $scope->detach();
        $span->end();
    }
});
```

For scheduled tasks (`Schedule::call(...)`) and Artisan commands, wrap the handler body in `$tracer->spanBuilder('task.name')->startSpan()` and call `$span->end()` in a `finally`. For one-shot Artisan invocations, also call `Globals::tracerProvider()->shutdown()` before exit so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-laravel" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Laravel SDK
</a>
```
