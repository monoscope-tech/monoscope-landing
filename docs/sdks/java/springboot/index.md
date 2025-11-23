---
title: Springboot
ogTitle: Springboot SDK Guide
date: 2024-05-28
updatedDate: 2024-06-10
menuWeight: 1
---

# Springboot SDK Guide

In this guide, you’ll learn how to integrate OpenTelemetry into your Java application and install the monoscope Springboot SDK to enhance its functionalities. By combining OpenTelemetry’s robust tracing and metrics capabilities with the monoscope SDK, you’ll be able to monitor incoming and outgoing requests, report errors, and gain deeper insights into your application’s performance. This setup provides comprehensive observability, helping you track requests and troubleshoot issues effectively.

```=html

<hr>
```

## Prerequisites

Ensure you have already completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Installation

To install the SDK, kindly add the following dependency to your `pom.xml` file within the `<dependencies>` section, like so:

```xml
<dependency>
  <groupId>io.monoscope.springboot</groupId>
  <artifactId>monoscope-springboot</artifactId>
  <version>2.0.9</version>
</dependency>
```

## Open Telemetry Setup

Setting up open telemetry allows you to send traces, metrics and logs to the monoscope platform.
To setup open telemetry, you need to install the opentelemetry-javaagent.jar file.

```sh
curl -L -O https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar
```

### Setup Open Telemetry Variables

The environment variables include your API key and the endpoint to send the data to, this allows you to send data to the monoscope platform.

```sh
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
export OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
export OTEL_RESOURCE_ATTRIBUTES=at-project-key="{ENTER_YOUR_API_KEY_HERE}" # Adds your API KEY to the resource.
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc" #Specifies the protocol to use for the OpenTelemetry exporter.
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>
    The <code>{ENTER_YOUR_API_KEY_HERE}</code> demo string should be replaced
    with the API key generated from the monoscope dashboard.
  </p>
</div>
```

You can then run the application with opentelemetry instrumented using the following command:

```sh
java -javaagent:<PATH-TO>/opentelemetry-javaagent.jar -jar target/your_app.jar
```

or using maven

```sh
mvn spring-boot:run -Dspring-boot.run.jvmArguments="-javaagent:<PATH-TO>/opentelemetry-javaagent.jar"
```

## monoscope SDK Configuration

The monoscope sdk can be configured using the following optional properties in your `resource/application.properties` file:

```sh
monoscope.captureRequestBody=true # Capture request body.
monoscope.captureResponseBody=true # Capture response body.
monoscope.serviceName=my-service # Service name.
monoscope.serviceVersion="2.0" # Service version.
monoscope.tags = "value1,value2" # Comma-separated list of tags.
monoscope.redactHeaders = "Authorizations, X-Api-Key" # Comma-separated list of headers to redact.
monoscope.redactRequestBody= "$.password,$.creditCardNumber" # Comma-separated list of JSON paths to redact.
monoscope.redactResponseBody= "$.password,$.creditCardNumber" # Comma-separated list of JSON paths to redact.
monoscope.debug=false # Enable debug mode.
# ...
```

Then, initialize the SDK, like so:

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// Import monoscope annotation
import io.monoscope.springboot.annotations.Enablemonoscope;
// END Import monoscope annotation
import org.springframework.web.bind.annotation.*;

@SpringBootApplication
// Add monoscope custom annotation
@Enablemonoscope
// END Add monoscope custom annotation
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

```sh
monoscope.redactHeaders=content-type,Authorization,HOST
monoscope.redactRequestBody=$.user.email,$.user.addresses
monoscope.redactResponseBody=$.users[*].email,$.users[*].credit_card
```

```=html
<div class="callout">
  <p><i class="fa-regular  fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>monoscope.redactHeaders</code> config field expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>monoscope.redactRequestBody</code> and `monoscope.redactResponseBody` config fields expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

With monoscope, you can track and report different unhandled or uncaught errors, API issues, and anomalies at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

To manually report specific errors at different parts of your application, use the `reportError()` method, passing in the `request` and `exception` parameters, like so:

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

import io.monoscope.springboot.APErrors;
import io.monoscope.springboot.annotations.Enablemonoscope;

@Enablemonoscope
@SpringBootApplication
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

Outgoing requests are external API calls you make from your API. By default, monoscope monitors all requests users make from your application and they will all appear in the [API Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. However, you can separate outgoing requests from others and explore them in the [Outgoing Integrations](/docs/dashboard/dashboard-pages/outgoing-integrations/){target="\_blank"} page, alongside the incoming request that triggered them.

The Springboot SDK provides the `ObserveRequest` class for monitoring outgoing requests using the Apache HTTP client. First, you will create an instance of the class, then use the instance to create a new HTTP client, passing in the current `request` context and an optional `url_path` string (for URLs with path parameters), like so:

```java
package com.example.demo;

import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.monoscope.springboot.annotations.Enablemonoscope;
import io.monoscope.springboot.integrations.ObserveRequest;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.*;

@SpringBootApplication
@Enablemonoscope
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

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-springboot" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the Springboot SDK
</a>
```
