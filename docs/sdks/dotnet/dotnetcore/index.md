---
title: .Net Core
ogTitle: .Net Core SDK Guide
date: 2022-03-23
updatedDate: 2024-05-30
menuWeight: 1
---

# .Net Core SDK Guide

This guide shows how to add OpenTelemetry to your .NET application and install the monoscope SDK. OpenTelemetry sends traces, metrics and logs. The SDK adds request and response details, error reports and outgoing request monitoring.

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

## OpenTelemetry Setup

OpenTelemetry sends traces, metrics and logs to monoscope. This guide uses the OpenTelemetry .NET auto-instrumentation.

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

On Windows, follow the [PowerShell setup](https://opentelemetry.io/docs/zero-code/net/#windows-powershell){target="\_blank" rel="noopener noreferrer"}.

#### OpenTelemetry Configuration

Configure the instrumentation with these environment variables:

```sh
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317" # Specifies the endpoint to send the traces to.
export OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_SOURCES="APItoolkit.HTTPInstrumentation" # The ActivitySource of the monoscope SDK.
export OTEL_SERVICE_NAME="my-service" # Specifies the name of the service.
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY" # Adds your API KEY to the resource.
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc" # Specifies the protocol to use for the OpenTelemetry exporter.
```

Build and run your application. Logs, traces and metrics appear in monoscope.

## monoscope SDK Configuration

The monoscope middleware adds request and response details to each request span. It also lets you report errors and monitor outgoing requests.

#### Installation

Run the command below to install the SDK:

```sh
dotnet add package ApiToolkit.Net
```

#### Configuration

Initialize the client in your application's entry point (for example, `Program.cs`) and register the middleware:

```csharp
using ApiToolkit.Net;

// Initialize the monoscope client
var config = new Config
{
  ServiceVersion = "v2.0",
  ServiceName = "MyService",
};
var client = APIToolkit.NewClient(config);
// END Initialize the monoscope client

// Register monoscope's middleware
app.Use(async (context, next) =>
{
  var apiToolkit = new APIToolkit(next, client);
  await apiToolkit.InvokeAsync(context);
});
// END Register monoscope's middleware

app.MapGet("/hello", async context =>
{
  await context.Response.WriteAsync("Hello, world!");
});


app.Run();
```

`Config` accepts these optional fields:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `Debug` | Set to `true` to enable debug mode. |
| `Tags` | A list of defined tags for your services (used for grouping and filtering data on the dashboard). |
| `ServiceVersion` | A defined string version of your application (used for further debugging on the dashboard). |
| `RedactHeaders` | A list of HTTP header keys to redact. |
| `RedactRequestBody` | A list of JSONPaths from the request body to redact. |
| `RedactResponseBody` | A list of JSONPaths from the response body to redact. |
| `ServiceName` | Set the name of the service. |
| `CaptureRequestBody` | Set to `true` to capture the request body. |
| `CaptureResponseBody` | Set to `true` to capture the response body. |
:::

```=html
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <ul>
    <li>Add the monoscope middleware before <code>UseEndpoints</code> and other middleware.</li>
    <li>Replace <code>YOUR_API_KEY</code> with an API key from <b>Settings &gt; API Keys</b> in monoscope.</li>
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
  RedactHeaders = new List<string> { "content-type", "Authorization", "HOST" },
  RedactRequestBody = new List<string> { "$.user.email", "$.user.addresses" },
  RedactResponseBody = new List<string> { "$.users[*].email", "$.users[*].credit_card" }
};
var client = APIToolkit.NewClient(config);

// Register the middleware to use the initialized client
app.Use(async (context, next) =>
{
  var apiToolkit = new APIToolkit(next, client);
  await apiToolkit.InvokeAsync(context);
});
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

To report an error by hand, call the static `Client.ReportError()` method with the `context` and the exception:

```csharp
using ApiToolkit.Net;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var config = new Config
{
  ServiceName = "Backend"
};
var client = APIToolkit.NewClient(config);

app.Use(async (context, next) =>
{
  var apiToolkit = new APIToolkit(next, client);
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
    Client.ReportError(context, error);
    await context.Response.WriteAsync("Error reported!");
  }
});
```

## Monitoring Outgoing Requests

Outgoing requests are external API calls you make from your API. By default, monoscope monitors all requests users make from your application and they will all appear in the [Log Explorer](/docs/dashboard/dashboard-pages/api-log-explorer/){target="\_blank"} page. To see only outgoing requests, open the **Outgoing** tab of the [API Catalog](/docs/dashboard/dashboard-pages/api-catalog/). Each outgoing request links to the incoming request that triggered it.

To monitor outgoing HTTP requests, use the `APIToolkitObservingHandler()` handler. Here's an example of the outgoing requests configuration with this SDK on a sample `/monitor-requests` endpoint that makes an asynchronous `HttpClient` GET request to a sample public endpoint URL.

```csharp
using ApiToolkit.Net;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

var config = new Config
{
  ServiceName = "Backend"
};
var client = APIToolkit.NewClient(config);

app.Use(async (context, next) =>
{
  var apiToolkit = new APIToolkit(next, client);
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

  using var httpClient = new HttpClient(client.APIToolkitObservingHandler(context, observingHandlerOptions));
  var response = await httpClient.GetAsync("https://jsonplaceholder.typicode.com/posts/1");
  var body = await response.Content.ReadAsStringAsync();
  await context.Response.WriteAsync(body);
});
```

`client.APIToolkitObservingHandler` takes the `context` and an optional `ATOptions` object with these fields:

{class="docs-table"}
:::
| Option | Description |
| ------ | ----------- |
| `PathWildCard` | The `url_path` string for URLs with path parameters. |
| `RedactHeaders` | A list of HTTP header keys to redact. |
| `RedactRequestBody` | A list of JSONPaths from the request body to redact. |
| `RedactResponseBody` | A list of JSONPaths from the response body to redact. |
:::

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

The ASP.NET Core middleware only covers HTTP requests. `IHostedService` / `BackgroundService` workers, Quartz / Hangfire jobs, channel consumers, and standalone console hosts are invisible until you wrap each handler in a span yourself. Always cover these alongside your HTTP routes.

Create a dedicated `ActivitySource` and wrap each work unit in `StartActivity`. With the auto-instrumentation, add the source name to `OTEL_DOTNET_AUTO_TRACES_ADDITIONAL_SOURCES` as a comma-separated list (for example, `APItoolkit.HTTPInstrumentation,MyService.Worker`). If you configure the OpenTelemetry SDK in code, register it with `AddSource`:

```csharp
using System.Diagnostics;
using Microsoft.Extensions.Hosting;
using OpenTelemetry.Trace;

// Program.cs — register the source
var workerSource = new ActivitySource("MyService.Worker");
builder.Services.AddOpenTelemetry().WithTracing(b => b.AddSource("MyService.Worker"));

public class EmailWorker : BackgroundService
{
    private static readonly ActivitySource Source = new("MyService.Worker");

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var job = await _queue.DequeueAsync(stoppingToken);

            using var activity = Source.StartActivity(
                "email.send", ActivityKind.Consumer);
            activity?.SetTag("messaging.system", "channel");
            activity?.SetTag("messaging.operation", "process");
            activity?.SetTag("messaging.destination.name", "emails");
            activity?.SetTag("code.function", nameof(EmailWorker.ExecuteAsync));

            try
            {
                await SendEmailAsync(job, stoppingToken);
                activity?.SetStatus(ActivityStatusCode.Ok);
            }
            catch (Exception ex)
            {
                activity?.RecordException(ex);
                activity?.SetStatus(ActivityStatusCode.Error, ex.Message);
                throw;
            }
        }
    }
}
```

For one-shot console hosts (`Host.CreateApplicationBuilder` followed by a single `RunAsync`), the host's shutdown lifecycle calls `Dispose` on the OTel SDK and flushes pending spans. If you exit via `Environment.Exit`, call `tracerProvider.ForceFlush()` and `Dispose()` first or you'll lose the final spans.

## Next Steps

- Send a few requests to your application. Then open **Log Explorer** in [monoscope](https://app.monoscope.tech) to see the requests, logs and traces.
- [Find your way around the dashboard](/docs/dashboard/): issues, monitors, dashboards and the API catalog.
- [Investigate from your terminal or your agent](/docs/ai/) with the CLI, the skills and the MCP server.

```=html
<hr />
<a href="https://github.com/monoscope-tech/apitoolkit-dotnet" target="_blank" rel="noopener noreferrer" class="w-full btn btn-outline link link-hover">
    <i class="fa-brands fa-github"></i>
    Explore the .Net Core SDK
</a>
```
