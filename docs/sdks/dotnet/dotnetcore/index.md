---
title: .Net Core
ogTitle: .Net Core SDK Guide
date: 2022-03-23
updatedDate: 2024-05-30
menuWeight: 1
---

# .Net Core SDK Guide

In this guide, you’ll learn how to integrate OpenTelemetry into your .NET application and install the monoscope SDK to enhance its functionalities.
By combining OpenTelemetry’s robust tracing and metrics capabilities with the monoscope SDK, you’ll be able to monitor incoming and outgoing requests, report errors, and gain deeper insights into your application’s performance.
This setup provides comprehensive observability, helping you track requests and troubleshoot issues effectively.

```=html
<hr>
```

## Prerequisites

Ensure you have already completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Open Telemetry Setup

Setting up open telemetry allows you to send traces, metrics and logs to the monoscope platform.
In this guid, we will be using the opentelemetry auto-instrumentation packages to setup open telemetry.

#### Install OpenTelemetry

Run the following command to install the OpenTelemetry auto instrumentation for .NET:

```sh
# Download the bash script
curl -sSfL https://github.com/open-telemetry/opentelemetry-dotnet-instrumentation/releases/latest/download/otel-dotnet-auto-install.sh -O

# Install core files
sh ./otel-dotnet-auto-install.sh

# Enable execution for the instrumentation script
chmod +x $HOME/.otel-dotnet-auto/instrument.sh

# Setup the instrumentation for the current shell session
. $HOME/.otel-dotnet-auto/instrument.sh
```

See auto instrumentation setup for windows [here](https://opentelemetry.io/docs/zero-code/net/#windows-powershell){target="\_blank"}.

#### OpenTelemetry Configuration

After installating .NET autoinstrumentation packages, you can configure the OpenTelemetry instrumentation by setting the following environment variables:

```sh
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317" # Specifies the endpoint to send the traces to.
export OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_SOURCES="monoscope.HTTPInstrumentation" # The monoscope instrumentation  activity resource.
export OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
export OTEL_RESOURCE_ATTRIBUTES="at-project-key={ENTER_YOUR_API_KEY_HERE}" # Adds your API KEY to the resource.
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc" # Specifies the protocol to use for the OpenTelemetry exporter.
```

After setting the environment variables, build and run your application and you should see the logs, traces and metrics in the monoscope dashboard.

## monoscope SDK Configuration

After setting up open telemetry, you can now configure the monoscope middleware, to monitor incoming and outgoing requests, report errors, and gain deeper insights into your application's performance.

#### Installation

Kindly run the command below to install the SDK:

```sh
dotnet add package ApiToolkit.Net
```

#### Configuration

Next, initialize monoscope in your application's entry point (e.g., `Program.cs`), like so:

```csharp
using ApiToolkit.Net;

// Initialize the monoscope client
var config = new Config
{
  ServiceVersion: "v2.0",
  ServiceName = "MyService",
};
var client = monoscope.NewClient(config);
// END Initialize the monoscope client

// Register monoscope's middleware
app.Use(async (context, next) =>
{
  var apiToolkit = new monoscope(next, client);
  await apiToolkit.InvokeAsync(context);
});
// END Register monoscope's middleware

app.MapGet("/hello", async context =>
{
  await context.Response.WriteAsync("Hello, world!");
});


app.Run();
```

In the configuration above you can add the following optional fields:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `Debug` | Set to `true` to enable debug mode. |
| `Tags` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `ServiceVersion` | A defined string version of your application (used for further debugging on the dashboard). |
| `RedactHeaders` | A list of HTTP header keys to redact. |
| `RedactResponseBody` | A list of JSONPaths from the request body to redact. |
| `RedactRequestBody` | A list of JSONPaths from the response body to redact. |
| `ServiceName` | Set the name of the service. |
| `CaptureRequestBody` | Set to `true` to capture the request body. |
| `CaptureResponseBody` | Set to `true` to capture the response body. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <ul>
    <li>Please ensure the monoscope middleware is added before <code>UseEndpoint</code> and other middleware are initialized.</li>
    <li>The <code>{ENTER_YOUR_API_KEY_HERE}</code> demo string should be replaced with the API key generated from the monoscope dashboard.</li>
  </ul>
</div>
```

## Redacting Sensitive Data

If you have fields that are sensitive and should not be sent to monoscope servers, you can mark those fields to be redacted (the fields will never leave your servers).

To mark a field for redacting via this SDK, you need to provide additional arguments to the `config` variable with paths to the fields that should be redacted. There are three arguments you can provide to configure what gets redacted, namely:

1. `RedactHeaders`: A list of HTTP header keys.
2. `RedactRequestBody`: A list of JSONPaths from the request body.
3. `RedactResponseBody`: A list of JSONPaths from the response body.

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

```csharp
using ApiToolkit.Net;

var config = new Config
{
  RedactHeaders = new List&lt;string&gt; { "content-type", "Authorization", "HOST" },
  RedactRequestBody = new List&lt;string&gt; { "$.user.email", "$.user.addresses" },
  RedactResponseBody = new List&lt;string&gt; { "$.users[*].email", "$.users[*].credit_card" }
};
var client = monoscope.NewClient(config);

// Register the middleware to use the initialized client
app.Use(async (context, next) =>
{
  var apiToolkit = new monoscope(next, client);
  await apiToolkit.InvokeAsync(context);
})
```

```=html
<div class="callout">
  <p><i class="fa-regular fa-circle-info"></i> <b>Note</b></p>
  <ul>
    <li>The <code>RedactHeaders</code> config field expects a list of <b>case-insensitive headers as strings</b>.</li>
    <li>The <code>RedactRequestBody</code> and <code>RedactResponseBody</code> config fields expect a list of <b>JSONPaths as strings</b>.</li>
    <li>The list of items to be redacted will be applied to all endpoint requests and responses on your server.</li>
  </ul>
</div>
```

## Error Reporting

monoscope automatically detects different unhandled errors, API issues, and anomalies but you can report and track specific errors at different parts of your application. This will help you associate more detail and context from your backend with any failing customer request.

To manually report specific errors at different parts of your application, use the `ReportError()` handler, passing in the `context` and `error` arguments, like so:

```csharp
using ApiToolkit.Net;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var config = new Config
{
  ServiceName = "Backend"
};
var client = monoscope.NewClient(config);

app.Use(async (context, next) =>
{
  var apiToolkit = new monoscope(next, client);
  await apiToolkit.InvokeAsync(context);
});

app.MapGet("/error-tracking", async context =>
{
  try
  {
    // Attempt to open a non-existing file
    using (var fileStream = System.IO.File.OpenRead("non_existing_file.txt"))
    {
      // File opened successfully, do something if needed.
    }
    await context.Response.WriteAsync($"Hello");
  }
  catch (Exception error)
  {
    // Report the error to monoscope
    client.ReportError(context, error);
    await context.Response.WriteAsync("Error reported!");
  }
});
```

## Monitoring Outgoing Requests

Outgoing requests are external API calls you make from your API. By default, monoscope monitors all requests users make from your application and they will all appear in the [API Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. However, you can separate outgoing requests from others and explore them in the [Outgoing Integrations](/docs/dashboard/dashboard-pages/outgoing-integrations/){target="\_blank"} page, alongside the incoming request that triggered them.

To monitor outgoing HTTP requests from your application, we provide the `monoscopeObservingHandler()` handler. Here's an example of the outgoing requests configuration with this SDK on a sample `/monitor-requests` endpoint that makes an asynchronous `HttpClient` GET request to a sample public endpoint URL.

```csharp
using ApiToolkit.Net;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var config = new Config
{
  ApiKey = "{ENTER_YOUR_API_KEY_HERE}"
};
var client = monoscope.NewClient(config);

app.Use(async (context, next) =>
{
  var apiToolkit = new monoscope(next, client);
  await apiToolkit.InvokeAsync(context);
});

app.MapGet("/monitor-requests", async (context) =>
{
  var observingHandlerOptions = new ATOptions
  {
    PathWildCard = "/posts/{id}",
    RedactHeaders = ["User-Agent"],
    RedactRequestBody = ["$.user.password"],
    RedactResponseBody = ["$.user.data.email"]
  };

  using var httpClient = new HttpClient(client.monoscopeObservingHandler(context, observingHandlerOptions));
  var response = await httpClient.GetAsync("https://jsonplaceholder.typicode.com/posts/1");
  var body = await response.Content.ReadAsStringAsync();
  await context.Response.WriteAsync(body);
});
```

The `client.monoscopeObservingHandler` handler accepts a required `context` field and the following optional fields:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `PathWildCard` | The `url_path` string for URLs with path parameters. |
| `RedactHeaders` | A list of HTTP header keys to redact. |
| `RedactResponseBody` | A list of JSONPaths from the request body to redact. |
| `RedactRequestBody` | A list of JSONPaths from the response body to redact. |
:::

```=html
<hr />
<a href="https://github.com/monoscope-tech/monoscope-dotnet" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the .Net Core SDK
</a>
```
