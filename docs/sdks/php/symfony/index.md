---
title: Symfony
ogTitle: Symfony SDK Guide
date: 2022-03-23
updatedDate: 2024-06-17
menuWeight: 3
---

# Symfony SDK Guide

To integrate your Symfony application with monoscope, you need to use this SDK to monitor incoming traffic, aggregate the requests, and then send them to monoscope's servers. Kindly follow this guide to get started and learn about all the supported features of monoscope's **Symfony SDK**.

```=html

<hr>
```

## Prerequisites

Ensure you have already completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

Kindly run the command below to install the SDK:

```sh
composer require monoscope/monoscope-symfony
```

## Configuration

First, add the `APITOOLKIT_KEY` environment variable to your `.env` file, like so:

```sh
APITOOLKIT_KEY={ENTER_YOUR_API_KEY_HERE}
```

Then, add the `monoscope\EventSubscriber\monoscopeService` listener and API Key to your `config/service.yaml` file, like so:

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
  monoscope\EventSubscriber\monoscopeService:
    arguments:
      $apiKey: "%env(APITOOLKIT_KEY)%"
  # END Initialize the monoscope client

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
  <p>The <code>{ENTER_YOUR_API_KEY_HERE}</code> demo string should be replaced with the API key generated from the monoscope dashboard.</p>
</div>
```

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To mark a field for redacting via this SDK, you need to add some additional arguments to the configuration with paths to the fields that should be redacted. There are three variables you can provide to configure what gets redacted, namely:

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

Here's what the configuration would look like with redacted fields in the `config/service.yaml` file:

```yaml
services:
  monoscope\EventSubscriber\monoscopeService:
    arguments:
      $apiKey: "%env(APITOOLKIT_KEY)%"
      $redactedHeaders:
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

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-symfony" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Symfony SDK
</a>
```
