---
title: Springboot
ogTitle: Springboot SDK Guide
date: 2024-05-28
updatedDate: 2024-06-10
menuWeight: 1
---

# Springboot SDK Guide

This guide shows how to attach the OpenTelemetry Java agent to your Spring Boot application and install the monoscope SDK. OpenTelemetry sends traces, metrics and logs. The SDK adds request and response details, error reports and outgoing request monitoring.

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

Add the dependency to the `<dependencies>` section of your `pom.xml` file:

```xml
<dependency>
  <groupId>io.apitoolkit.springboot</groupId>
  <artifactId>apitoolkit-springboot</artifactId>
  <version>2.0.9</version>
</dependency>
```

## OpenTelemetry Setup

The SDK adds its data to OpenTelemetry spans, so the OpenTelemetry Java agent must be attached. Download the agent:

```sh
curl -L -O https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

### Set Up OpenTelemetry Variables

Set your API key and the monoscope endpoint:

```sh
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
export OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY" # Adds your API KEY to the resource.
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc" # Specifies the protocol to use for the OpenTelemetry exporter.
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>Replace <code>YOUR_API_KEY</code> with an API key from <b>Settings &gt; API Keys</b> in monoscope.</p>
</div>
```

Run the application with the agent attached:

```sh
java -javaagent:<PATH-TO>/opentelemetry-javaagent.jar -jar target/your_app.jar
```

Or, with Maven:

```sh
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-javaagent:<PATH-TO>/opentelemetry-javaagent.jar"
```

## monoscope SDK Configuration

Configure the SDK with these optional properties in your `src/main/resources/application.properties` file:

```properties
# Capture request and response bodies (off by default)
apitoolkit.captureRequest_body=true
apitoolkit.captureResponse_body=true
apitoolkit.serviceName=my-service
apitoolkit.serviceVersion=2.0
# Comma-separated lists
apitoolkit.tags=value1,value2
apitoolkit.redactHeaders=Authorization,X-Api-Key
apitoolkit.redactRequestBody=$.password,$.creditCardNumber
apitoolkit.redactResponseBody=$.password,$.creditCardNumber
apitoolkit.debug=false
```

Then add the `@EnableAPIToolkit` annotation to your application class:

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.apitoolkit.springboot.annotations.EnableAPIToolkit;
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@EnableAPIToolkit
@RestController
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @GetMapping("/greet/{name}")
  public String getUser(@PathVariable String name) {
    return "Hello, " + name;
  }
}
```

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To mark a field for redacting via this SDK, you need to provide additional configuration options to the `application.properties` file with paths to the fields that should be redacted. There are three arguments you can provide to configure what gets redacted, namely:

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

```properties
apitoolkit.redactHeaders=content-type,Authorization,HOST
apitoolkit.redactRequestBody=$.user.email,$.user.addresses
apitoolkit.redactResponseBody=$.users[*].email,$.users[*].credit_card
```

```=html
<div class="callout">
  <p><i class="fa-regular  fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>apitoolkit.redactHeaders</code> property expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>apitoolkit.redactRequestBody</code> and <code>apitoolkit.redactResponseBody</code> properties expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

With monoscope, you can track and report different unhandled or uncaught errors, API issues, and anomalies at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

To report an error by hand, call the static `APErrors.reportError()` method with the `request` and the exception:

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import io.apitoolkit.springboot.APErrors;
import io.apitoolkit.springboot.annotations.EnableAPIToolkit;

@EnableAPIToolkit
@SpringBootApplication
@RestController
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @GetMapping("/hello")
  public String hello(@RequestParam(value = "name", defaultValue = "World") String name, HttpServletRequest request) {
    try {
      System.out.print(1 / 0); // This will throw an ArithmeticException
    } catch (Exception e) {
      // Report the error to monoscope
      APErrors.reportError(request, e);
    }
    return String.format("Hello %s!", name);
  }
}
```

## Monitoring Outgoing Requests

Outgoing requests are external API calls you make from your API. By default, monoscope monitors all requests users make from your application and they will all appear in the [Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. To see only outgoing requests, open the **Outgoing** tab of the [API Catalog](/docs/dashboard/dashboard-pages/api-catalog/). Each outgoing request links to the incoming request that triggered it.

To monitor outgoing requests made with the Apache HTTP client, use the `ObserveRequest` class. Create an instance, then call `createHttpClient()` with the current `request` and an optional URL path pattern (for URLs with path parameters):

```java
package com.example.demo;

import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.apitoolkit.springboot.annotations.EnableAPIToolkit;
import io.apitoolkit.springboot.integrations.ObserveRequest;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@EnableAPIToolkit
@RestController
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  // Create an instance of the ObserveRequest class
  private ObserveRequest observingClient = new ObserveRequest(
    // Optional parameters to redact headers and request/response body
    List.of("content-type", "Authorization", "HOST"),
    List.of("$.user.email", "$.user.addresses"),
    List.of("$.users[*].email", "$.users[*].credit_card")
  );

  @GetMapping("/hello")
  public String hello(HttpServletRequest request) {
    // Use the observingClient instance to create an HTTP Client
    CloseableHttpClient httpClient = observingClient.createHttpClient(request, "/posts/{post_id}");
    try {
      HttpGet httpGet = new HttpGet("https://jsonplaceholder.typicode.com/posts/1");
      CloseableHttpResponse response = httpClient.execute(httpGet);
      String responseStr = EntityUtils.toString(response.getEntity());
      return responseStr;
    } catch (Exception e) {
      e.printStackTrace();
      return "Error occurred while processing the request...";
    }
  }
}
```

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The Spring Boot servlet filter only covers HTTP requests. The OpenTelemetry Java agent **already auto-instruments most of the rest** — including `@Scheduled`, `@KafkaListener`, `@RabbitListener`, `@JmsListener`, Spring Batch jobs, and Quartz triggers — so verify the agent is attached before doing manual work. Run with:

```sh
java -javaagent:opentelemetry-javaagent.jar -jar app.jar
```

Anything the agent doesn't cover (custom thread pools, `CommandLineRunner` startup work, manual queue consumers, `BackgroundService`-style polling beans) needs a manual span. Use the OpenTelemetry API:

```java
import io.opentelemetry.api.GlobalOpenTelemetry;
import io.opentelemetry.api.trace.Span;
import io.opentelemetry.api.trace.SpanKind;
import io.opentelemetry.api.trace.StatusCode;
import io.opentelemetry.api.trace.Tracer;
import io.opentelemetry.context.Scope;

@Component
public class EmailWorker {
    private static final Tracer tracer =
        GlobalOpenTelemetry.getTracer("my-service-worker");

    public void processEmail(EmailJob job) {
        Span span = tracer.spanBuilder("email.send")
            .setSpanKind(SpanKind.CONSUMER)
            .setAttribute("messaging.system", "redis")
            .setAttribute("messaging.operation", "process")
            .setAttribute("messaging.destination.name", "emails")
            .setAttribute("code.function", "EmailWorker.processEmail")
            .startSpan();
        try (Scope scope = span.makeCurrent()) {
            sendEmail(job);
            span.setStatus(StatusCode.OK);
        } catch (Exception e) {
            span.recordException(e);
            span.setStatus(StatusCode.ERROR);
            throw e;
        } finally {
            span.end();
        }
    }
}
```

For one-shot Spring Boot CLI runs, the OpenTelemetry Java agent flushes pending spans in a JVM shutdown hook. `SpringApplication.exit(...)` and `System.exit(0)` both run this hook. `Runtime.halt()` and `kill -9` do not, so the last spans are lost.

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/apitoolkit-springboot" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Spring Boot SDK
</a>
```
