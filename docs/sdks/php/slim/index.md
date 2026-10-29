---
title: Slim
ogTitle: Slim SDK Guide
date: 2022-03-23
updatedDate: 2024-06-17
menuWeight: 2
---

# Slim SDK Guide

The monoscope Slim middleware monitors HTTP requests in your Slim application. It builds on OpenTelemetry to create a span for each request, with the request and response bodies, headers and status code. It can also monitor outgoing requests and report errors.

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

Install the Slim SDK and the OpenTelemetry packages:

```sh
composer require \
    open-telemetry/sdk \
    open-telemetry/exporter-otlp \
    open-telemetry/opentelemetry-auto-slim \
    open-telemetry/opentelemetry-auto-psr18 \
    apitoolkit/apitoolkit-slim
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

Create an instance of the `APIToolkitMiddleware` class and add it to your Slim app, for example in `app/middleware.php`. The middleware creates a span for each request. The span holds the headers, the request and response bodies, the matched route and more.

```php
use Slim\Factory\AppFactory;
use APIToolkit\APIToolkitMiddleware;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

// Initialize the monoscope middleware
$monoscopeMiddleware = new APIToolkitMiddleware([
  'debug' => false,
  'tags' => ["environment: production", "region: us-east-1"],
  'captureRequestBody' => true,
  'serviceVersion' => "v2.0",
]);

$app->add($monoscopeMiddleware);

$app->get('/', function ($request, $response) {
  $response->getBody()->write('Hello, World!');
  return $response;
});

$app->run();
```

### Middleware Configuration Options

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `debug` | Set to `true` to enable debug mode. |
| `tags` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `serviceVersion` | A defined string version of your application (used for further debugging on the dashboard). |
| `redactHeaders` | A list of HTTP header keys to redact. |
| `redactRequestBody` | A list of JSONPaths from the request body to redact. |
| `redactResponseBody` | A list of JSONPaths from the response body to redact. |
| `captureRequestBody` | Set to `true` to capture the request body. Default `false`. |
| `captureResponseBody` | Set to `true` to capture the response body. Default `false`. |
:::

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To redact fields, pass these keys in the middleware configuration array:

1. `redactHeaders`: A list of HTTP header keys.
2. `redactRequestBody`: A list of JSONPaths from the request body.
3. `redactResponseBody`: A list of JSONPaths from the response body.

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

Here's what the configuration would look like with redacted fields:

```php
use Slim\Factory\AppFactory;
use APIToolkit\APIToolkitMiddleware;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$monoscopeMiddleware = new APIToolkitMiddleware([
  'redactHeaders' => ['Content-Type', 'Authorization', 'HOST'],
  'redactRequestBody' => ['$.user.email', '$.user.addresses'],
  'redactResponseBody' => ['$.users[*].email', '$.users[*].credit_card'],
]);

$app->add($monoscopeMiddleware);

$app->get('/', function ($request, $response) {
  $response->getBody()->write('Hello, World!');
  return $response;
});

$app->run();
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>redactHeaders</code> variable expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>redactRequestBody</code> and <code>redactResponseBody</code> variables expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

monoscope can track and report unhandled errors, API issues and anomalies in your application. This links backend context to each failing customer request.

To manually report specific errors at different parts of your application, call the `reportError` method of the `APIToolkitSlim` class with the `error` and the `request`:

```php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use APIToolkit\APIToolkitMiddleware;
use APIToolkit\APIToolkitSlim;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$monoscopeMiddleware = new APIToolkitMiddleware([]);
$app->add($monoscopeMiddleware);

$app->get('/', function (Request $request, Response $response) {
  try {
    throw new Exception("Custom user error...");
    return $response;
  } catch (Exception $e) {
    // Report the error to monoscope
    APIToolkitSlim::reportError($e, $request);
    $response->getBody()->write($e->getMessage());
    return $response;
  }
});

$app->run();
```

## Monitoring Outgoing Requests

Outgoing requests are external API calls you make from your API. By default, monoscope monitors all requests that your application makes, and they appear on the [Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. To see only outgoing requests, open the **Outgoing** tab of the [API Catalog](/docs/dashboard/dashboard-pages/outgoing-integrations/). Each outgoing request links to the incoming request that triggered it.

To monitor outgoing HTTP requests from your application, call the `observeGuzzle` method of the `APIToolkitSlim` class with the `$request` and an `$options` array:

```php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use APIToolkit\APIToolkitMiddleware;
use APIToolkit\APIToolkitSlim;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$monoscopeMiddleware = new APIToolkitMiddleware([]);
$app->add($monoscopeMiddleware);

$app->get('/user', function (Request $request, Response $response) {
  $options = [
    "pathPattern" => "/repos/{owner}/{repo}",
    "redactHeaders" => ["Content-Type", "Authorization", "HOST"],
    "redactRequestBody" => ["$.users[*].email", "$.users[*].credit_card"],
    "redactResponseBody" => ["$.users[*].email", "$.users[*].credit_card"]
  ];

  $guzzleClient = APIToolkitSlim::observeGuzzle($request, $options);
  $responseFromGuzzle = $guzzleClient->request('GET', 'https://api.github.com/repos/monoscope-tech/monoscope-slim?foobar=123');
  $response->getBody()->write($responseFromGuzzle->getBody()->getContents());
  return $response;
});

$app->run();
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

The Slim middleware only covers HTTP requests. Standalone PHP CLIs, cron-driven scripts, and any queue consumer (Redis, RabbitMQ, custom) are invisible until you wrap each handler in a span yourself. Always cover these alongside your HTTP routes.

Use the OpenTelemetry PHP API directly inside the consumer / CLI handler. Auto-instrumentation picks up downstream HTTP/database calls automatically once a parent span is active.

```php
use OpenTelemetry\API\Globals;
use OpenTelemetry\API\Trace\StatusCode;
use OpenTelemetry\API\Trace\SpanKind;

$tracer = Globals::tracerProvider()->getTracer('my-service-worker');

function processEmail(array $payload): void {
    global $tracer;
    $span = $tracer->spanBuilder('email.send')
        ->setSpanKind(SpanKind::KIND_CONSUMER)
        ->setAttribute('messaging.system', 'redis')
        ->setAttribute('messaging.operation', 'process')
        ->setAttribute('messaging.destination.name', 'emails')
        ->setAttribute('code.function', 'processEmail')
        ->startSpan();
    $scope = $span->activate();
    try {
        sendEmail($payload);
        $span->setStatus(StatusCode::STATUS_OK);
    } catch (\Throwable $e) {
        $span->recordException($e);
        $span->setStatus(StatusCode::STATUS_ERROR);
        throw $e;
    } finally {
        $scope->detach();
        $span->end();
    }
}
```

For one-shot CLI scripts, call `Globals::tracerProvider()->shutdown()` before exit so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-slim" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Slim SDK
</a>
```
