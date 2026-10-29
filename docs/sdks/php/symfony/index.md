---
title: Symfony
ogTitle: Symfony SDK Guide
date: 2022-03-23
updatedDate: 2024-06-17
menuWeight: 3
---

# Symfony SDK Guide

To integrate your Symfony application with monoscope, you need to use this SDK to monitor incoming traffic, aggregate the requests, and then send them to monoscope's servers. Follow this guide to set up the **Symfony SDK**.

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

Run the command below to install the SDK:

```sh
composer require apitoolkit/apitoolkit-symfony:dev-master
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <p>The package has no tagged release yet, so require the <code>dev-master</code> version.</p>
</div>
```

## OpenTelemetry Configuration

The Symfony bundle does not use OpenTelemetry. It sends requests to monoscope directly with your API key. If you add your own OpenTelemetry spans, as in Non-HTTP Entry Points below, set these environment variables to configure the exporter:

```sh
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
```

## Configuration

First, add the `MONOSCOPE_API_KEY` environment variable to your `.env` file:

```sh
MONOSCOPE_API_KEY=YOUR_API_KEY
```

Then add the `APIToolkit\EventSubscriber\APIToolkitService` listener, the API key and the monoscope URL to your `config/services.yaml` file:

```yaml
# This file is the entry point to configure your own services.
# Files in the packages/ subdirectory configure your dependencies.

# Put parameters here that don't need to change on each machine where the app is deployed
# https://symfony.com/doc/current/best_practices.html#use-parameters-for-application-configuration
parameters:
  locale: "en"
services:
  # default configuration for services in *this* file
  _defaults:
    autowire: true # Automatically injects dependencies in your services.
    autoconfigure: true # Automatically registers your services as commands, event subscribers, etc.

  # Initialize the monoscope client
  APIToolkit\EventSubscriber\APIToolkitService:
    arguments:
      $apiKey: "%env(MONOSCOPE_API_KEY)%"
      $rootURL: "https://app.monoscope.tech"

  # makes classes in src/ available to be used as services
  # this creates a service per class whose id is the fully-qualified class name
  App\:
    resource: "../src/"
    exclude:
      - "../src/DependencyInjection/"
      - "../src/Entity/"
      - "../src/Kernel.php"

  # add more service definitions when explicit configuration is needed
  # please note that last definitions always *replace* previous ones
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>Replace <code>YOUR_API_KEY</code> with an API key from <b>Settings &gt; API Keys</b> in monoscope.</p>
</div>
```

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To redact fields, add these arguments to the service configuration:

1. `$redactHeaders`: A list of HTTP header keys.
2. `$redactRequestBody`: A list of JSONPaths from the request body.
3. `$redactResponseBody`: A list of JSONPaths from the response body.

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

Here is the `config/services.yaml` configuration with redacted fields:

```yaml
services:
  APIToolkit\EventSubscriber\APIToolkitService:
    arguments:
      $apiKey: "%env(MONOSCOPE_API_KEY)%"
      $rootURL: "https://app.monoscope.tech"
      $redactHeaders:
        - "content-type"
        - "Authorization"
        - "HOST"
      $redactRequestBody:
        - "$.user.email"
        - "$.user.addresses"
        - "$.user.addresses[*]"
      $redactResponseBody:
        - "$.users[*].email"
        - "$.users[*].credit_card"
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>$redactHeaders</code> config field expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>$redactRequestBody</code> and <code>$redactResponseBody</code> config fields expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Symfony bundle only covers HTTP requests. Symfony Messenger handlers (`messenger:consume`), scheduled commands, and Console commands are invisible until you wrap each handler in a span yourself. Always cover these alongside your HTTP routes.

For **Messenger**, register a middleware that wraps each message-handling pipeline in a span:

```php
namespace App\Messenger;

use OpenTelemetry\API\Globals;
use OpenTelemetry\API\Trace\StatusCode;
use OpenTelemetry\API\Trace\SpanKind;
use Symfony\Component\Messenger\Envelope;
use Symfony\Component\Messenger\Middleware\MiddlewareInterface;
use Symfony\Component\Messenger\Middleware\StackInterface;
use Symfony\Component\Messenger\Stamp\BusNameStamp;

class TraceMiddleware implements MiddlewareInterface {
    public function handle(Envelope $envelope, StackInterface $stack): Envelope {
        $tracer = Globals::tracerProvider()->getTracer('my-service-worker');
        $messageClass = get_class($envelope->getMessage());
        $bus = $envelope->last(BusNameStamp::class)?->getBusName() ?? 'messenger';

        $span = $tracer->spanBuilder($messageClass)
            ->setSpanKind(SpanKind::KIND_CONSUMER)
            ->setAttribute('messaging.system', 'symfony.messenger')
            ->setAttribute('messaging.operation', 'process')
            ->setAttribute('messaging.destination.name', $bus)
            ->setAttribute('code.function', $messageClass)
            ->startSpan();
        $scope = $span->activate();
        try {
            $envelope = $stack->next()->handle($envelope, $stack);
            $span->setStatus(StatusCode::STATUS_OK);
            return $envelope;
        } catch (\Throwable $e) {
            $span->recordException($e);
            $span->setStatus(StatusCode::STATUS_ERROR);
            throw $e;
        } finally {
            $scope->detach();
            $span->end();
        }
    }
}
```

Wire it into `config/packages/messenger.yaml` under `framework.messenger.buses.<bus>.middleware`. For Console commands and scheduled tasks, wrap the body of `execute()` the same way and call `Globals::tracerProvider()->shutdown()` before returning so the BatchSpanProcessor flushes; otherwise spans are dropped silently.

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/apitoolkit-symfony" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Symfony SDK
</a>
```
