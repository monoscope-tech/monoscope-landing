---
title: Laravel
ogTitle: Laravel SDK Guide
date: 2022-03-23
updatedDate: 2024-06-17
menuWeight: 1
---

# Laravel SDK Guide

Monoscope laravel Middleware allows you to monitor HTTP requests in your laravel applications. It builds upon OpenTelemetry instrumentation to create custom spans for each request, capturing key details such as request and response bodies, headers, and status codes. Additionally, it offers robust support for monitoring outgoing requests and reporting errors automatically.

To get started, you'll need the OpenTelemetry Node.js library and some basic configuration.

```=html
<hr>
```

## Prerequisites

Ensure you have already completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

Kindly run the command below to install the monoscope laravel sdk and required opentelemetry packages:

```sh
composer require \
    open-telemetry/sdk \
    open-telemetry/exporter-otlp \
    monoscope/laravel
```

## Setup Open Telemetry

Setting up open telemetry allows you to send traces, metrics and logs to the Monoscope platform.
To setup open telemetry, first install the opentelemetry php extension:

```sh
pecl install opentelemetry
```

Then add it to your `php.ini` file like so.

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
export OTEL_RESOURCE_ATTRIBUTES="x-api-key={ENTER_YOUR_API_KEY_HERE}"
export OTEL_PROPAGATORS=baggage,tracecontext
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>The `{ENTER_YOUR_API_KEY_HERE}` demo string should be replaced with the API key generated from the Monoscope dashboard.</p>
</div>
```

## Setup Monoscope Middleware

Register the middleware in the app/Http/Kernel.php file under the correct middleware group (e.g., api) or at the root, like so. This creates a customs spans which captures and sends http request info such as headers, requests and repsonse bodies, matched route etc. for each request

```=html
<section class="tab-group" data-tab-group="group1">
  <button class="tab-button" data-tab="tab1">Middleware (Global)</button>
  <button class="tab-button" data-tab="tab2">Middleware (Specific Routes)</button>
  <div id="tab1" class="tab-content">
    Next, register the middleware in the `app/Http/Kernel.php` file under the correct middleware group (e.g., `api`) or at the root, like so:
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
      \Monoscope\Http\Middleware\Monoscope::class, // Initialize the Monoscope client
    ],
  ];
}
```

```=html
  </div>
  <div id="tab2" class="tab-content">
    Alternatively, if you want to monitor specific routes, you can register the middleware, like so:
```

```php
<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
  protected $routeMiddleware = [
    // Other middleware here...
    'monoscope' => \Monoscope\Http\Middleware\Monoscope::class,
  ];
}
```

Then you can use the `monoscope` middleware in your routes like so:

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

## Middleware configuration options:

You can configure the middleware using the following environment variables:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `MONOSCOPE_DEBUG` | Set to `true` to enable debug mode. |
| `MONOSCOPE_TAGS` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `MONOSCOPE_SERVICE_VERSION` | A defined string version of your application (used for further debugging on the dashboard). |
| `MONOSCOPE_REDACT_HEADERS` | A list of HTTP header keys to redact. |
| `MONOSCOPE_REDACT_REQUEST_BODY` | A list of JSONPaths from the request body to redact. |
| `MONOSCOPE_REDACT_RESPONSE_BODY` | A list of JSONPaths from the response body to redact. |
| `MONOSCOPE_CAPTURE_REQUEST_BODY` | A list of JSONPaths from the request body to capture. |
| `MONOSCOPE_CAPTURE_RESPONSE_BODY` | A list of JSONPaths from the response body to capture. |
:::

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to Monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To mark a field for redacting via this SDK, you need to add some additional environmental variables to the `.env` file with paths to the fields that should be redacted. There are three variables you can provide to configure what gets redacted, namely:

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

Here's an example of what the `.env` file would look like with redacted fields:

```sh
MONOSCOPE_REDACT_HEADERS="Content-Type, Authorization, HOST"
MONOSCOPE_REDACT_REQUEST_BODY="$.user.email, $.user.addresses"
MONOSCOPE_REDACT_RESPONSE_BODY="$.users[*].email, $.users[*].credit_card"
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

With Monoscope, you can track and report different unhandled or uncaught errors, API issues, and anomalies at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

```=html
<section class="tab-group" data-tab-group="group2">
  <button class="tab-button" data-tab="tab1"> Report All Errors</button>
  <button class="tab-button" data-tab="tab2">Report Specific Errors</button>
  <div id="tab1" class="tab-content">
To report all uncaught errors and service exceptions that happened during a web request, modify your Laravel Exceptions handler, passing in the <code>error</code> and the <code>request</code> as arguments, like so:
```

```php
<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Monoscope\MonoscopeLaravel;
use Throwable;

class Handler extends ExceptionHandler
{
  protected $dontReport = [];

  public function register()
  {
    $this->reportable(function (Throwable $e) {
      // Report the error to Monoscope
      $request = request();
      MonoscopeLaravel::reportError($e, $request);
    });
  }
}
```

```=html
  </div>
  <div id="tab2" class="tab-content">
To manually report specific errors at different parts of your application, use the <code>reportError</code> method of the <code>MonoscopeLaravel</code> class, passing in the <code>error</code> and the <code>request</code> as arguments, like so:
```

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Monoscope\MonoscopeLaravel;

Route::get('/user', function (Request $request) {
  try {
    // Simulate a custom user error
    throw new Exception("Custom user error");

    // This line will not execute if an exception is thrown
    return response()->json(["hello" => "world"]);
  } catch (Exception $e) {
    // Report the error to Monoscope
    MonoscopeLaravel::reportError($e, $request);

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

Outgoing requests are external API calls you make from your API. By default, Monoscope monitors all requests users make from your application and they will all appear in the [API Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. However, you can separate outgoing requests from others and explore them in the [Outgoing Integrations](/docs/dashboard/dashboard-pages/outgoing-integrations/){target="\_blank"} page, alongside the incoming request that triggered them.

To monitor outgoing HTTP requests from your application, use the `observeGuzzle` method of the `MonoscopeLaravel` class, passing in the `$request` and `$options` object, like so:

```php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Monoscope\MonoscopeLaravel;

Route::get('/user', function (Request $request) {
  $options = [
    "pathPattern" => "/repos/{owner}/{repo}",
    "redactHeaders" => ["content-type", "Authorization", "HOST"],
    "redactRequestBody" => ["$.user.email", "$.user.addresses"],
    "redactResponseBody" => ["$.users[*].email", "$.users[*].credit_card"]
  ];
  $guzzleClient = MonoscopeLaravel::observeGuzzle($request, $options);
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
| `redactResponseBody` | A list of JSONPaths from the request body to redact. |
| `redactRequestBody` | A list of JSONPaths from the response body to redact. |
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

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-laravel" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Laravel SDK
</a>
```
