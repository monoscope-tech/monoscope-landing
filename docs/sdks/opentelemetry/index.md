---
title: OpenTelemetry (Any Language)
ogTitle: OpenTelemetry Integration Guide - Use Any Language with monoscope
date: 2026-03-24
updatedDate: 2026-03-24
linkTitle: "OpenTelemetry"
menuWeight: 50
---

# OpenTelemetry Integration Guide

If your language or framework doesn't have a [native monoscope SDK](/docs/sdks/), you can integrate directly using OpenTelemetry. Any language with an OpenTelemetry SDK — Rust, Ruby, Scala, C++, Swift, and many more — can send traces, metrics, and logs to monoscope.

Already using a language with a native SDK? Check our guides for [Node.js](/docs/sdks/nodejs/), [Python](/docs/sdks/python/), [Go](/docs/sdks/golang/), [PHP](/docs/sdks/php/), [Java](/docs/sdks/java/), [.NET](/docs/sdks/dotnet/), or [Elixir](/docs/sdks/elixir/) for richer integration features.

```=html
<hr>
```

## Prerequisites

Ensure you have completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Configuration (Environment Variables)

The standard way to configure any OpenTelemetry SDK is through environment variables. Set these in your shell, `.env` file, Docker config, or deployment platform:

```sh
# Specifies the endpoint URL for the OpenTelemetry collector.
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
# Specifies the name of the service.
OTEL_SERVICE_NAME="your-service-name"
# Adds your API KEY to the resource.
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
# Specifies the protocol to use for the OpenTelemetry exporter.
OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
```

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p><b>API key options:</b> The legacy key <code>x-api-key</code> is also supported as a resource attribute. Alternatively, you can pass the API key as an OTLP header:<br>
  <code>OTEL_EXPORTER_OTLP_HEADERS="x-api-key=YOUR_API_KEY"</code></p>
</div>
```

## Language Examples

Below are minimal examples for languages without a native monoscope SDK. Each example initializes OpenTelemetry and points it at monoscope.

```=html
<section class="tab-group" data-tab-group="lang">
  <button class="tab-button" data-tab="rust">Rust</button>
  <button class="tab-button" data-tab="ruby">Ruby</button>
  <button class="tab-button" data-tab="any">Any Language</button>

  <div id="rust" class="tab-content">
    <h3>Rust</h3>
    <p>Install dependencies in your <code>Cargo.toml</code>:</p>
    <pre><code class="language-toml">[dependencies]
opentelemetry = "0.24"
opentelemetry_sdk = { version = "0.24", features = ["rt-tokio"] }
opentelemetry-otlp = { version = "0.17", features = ["grpc-tonic"] }
tracing = "0.1"
tracing-opentelemetry = "0.25"
tracing-subscriber = "0.3"</code></pre>
    <p>Check <a href="https://crates.io/crates/opentelemetry" target="_blank" rel="noopener noreferrer">crates.io</a> for the latest compatible versions. Initialize the tracer (reads <code>OTEL_*</code> env vars automatically):</p>
    <pre><code class="language-rust">use opentelemetry::global;
use opentelemetry_sdk::trace::SdkTracerProvider;
use opentelemetry_sdk::Resource;
use tracing_opentelemetry::OpenTelemetryLayer;
use tracing_subscriber::layer::SubscriberExt;
use tracing_subscriber::util::SubscriberInitExt;

fn init_tracer() {
    let exporter = opentelemetry_otlp::SpanExporter::builder()
        .with_tonic()
        .build()
        .expect("Failed to create OTLP exporter");

    let provider = SdkTracerProvider::builder()
        .with_batch_exporter(exporter)
        .with_resource(Resource::default())
        .build();

    global::set_tracer_provider(provider.clone());

    tracing_subscriber::registry()
        .with(OpenTelemetryLayer::new(provider.tracer("my-service")))
        .init();
}

#[tokio::main]
async fn main() {
    init_tracer();
    tracing::info!("Application started");
    global::shutdown_tracer_provider();
}</code></pre>
  </div>

  <div id="ruby" class="tab-content">
    <h3>Ruby</h3>
    <p>Install the gems:</p>
    <pre><code class="language-bash">gem install opentelemetry-sdk opentelemetry-exporter-otlp opentelemetry-instrumentation-all</code></pre>
    <p>Or add to your <code>Gemfile</code>:</p>
    <pre><code class="language-ruby">gem 'opentelemetry-sdk'
gem 'opentelemetry-exporter-otlp'
gem 'opentelemetry-instrumentation-all'</code></pre>
    <p>Initialize OpenTelemetry (e.g., in a Rails initializer or at app startup):</p>
    <pre><code class="language-ruby">require 'opentelemetry/sdk'
require 'opentelemetry/exporter/otlp'
require 'opentelemetry/instrumentation/all'

# Reads OTEL_EXPORTER_OTLP_ENDPOINT, OTEL_SERVICE_NAME,
# OTEL_RESOURCE_ATTRIBUTES, and OTEL_EXPORTER_OTLP_PROTOCOL
# from environment variables automatically.
OpenTelemetry::SDK.configure do |c|
  c.use_all # Enables all available auto-instrumentation
end</code></pre>
  </div>

  <div id="any" class="tab-content">
    <h3>Any Language</h3>
    <p>The general pattern works with any OpenTelemetry SDK:</p>
    <ol>
      <li>Install your language's OpenTelemetry SDK and OTLP exporter</li>
      <li>Set the four environment variables listed above</li>
      <li>Initialize the SDK — most SDKs auto-read <code>OTEL_*</code> env vars</li>
      <li>Run your application</li>
    </ol>
    <p>Find your language's OpenTelemetry SDK at <a href="https://opentelemetry.io/docs/languages/" target="_blank" rel="noopener noreferrer">opentelemetry.io/docs/languages</a>.</p>
    <p>Languages with official OpenTelemetry SDKs include: C++, .NET, Erlang/Elixir, Go, Java, JavaScript, PHP, Python, Ruby, Rust, Swift, and more.</p>
  </div>
</section>
```

## Non-HTTP Entry Points (Background Jobs, Workers, CLIs)

Whichever language you use, the OpenTelemetry HTTP instrumentation only covers inbound HTTP requests. Background jobs (Celery, BullMQ, Sidekiq, Oban, Hangfire, Asynq…), scheduled tasks, queue consumers, and CLI scripts are invisible until you wrap each handler in a span yourself. **Always cover these alongside your HTTP routes — without it, half your production work has no observability.**

### Pattern (any language)

1. Get a `Tracer` from the global `TracerProvider` you already configured for HTTP.
2. Around each non-HTTP handler, start a span with `kind = Consumer` (for queue/message handlers) or `kind = Internal` (for cron / scheduled tasks).
3. Set the [messaging semantic-convention attributes](https://opentelemetry.io/docs/specs/semconv/messaging/) so the span shows up correctly in queue/topology views.
4. Record exceptions and set status before the span ends.
5. For one-shot scripts (CLIs, Lambda-style entry points, batch jobs), explicitly call `tracerProvider.shutdown()` (or your SDK's flush equivalent) before exit. The default `BatchSpanProcessor` queues spans and only flushes on a timer — exit fast and you lose them silently.

### Required attributes

{class="docs-table"}
:::
| Attribute | Value | When to set |
| --------- | ----- | ----------- |
| `messaging.system` | `kafka`, `rabbitmq`, `redis`, `sqs`, `bullmq`, `celery`, `oban`, … | Queue/message handlers |
| `messaging.operation` | `process` (consume + handle) or `receive` | Queue/message handlers |
| `messaging.destination.name` | The queue / topic / channel name | Queue/message handlers |
| `messaging.message.id` | Provider-supplied job/message ID | When available |
| `code.function` | Fully-qualified handler name | All non-HTTP spans |
| `code.namespace` | Module / package | Optional, helpful for filtering |
:::

### Examples

```=html
<section class="tab-group" data-tab-group="lang-bg">
  <button class="tab-button" data-tab="bg-py">Python</button>
  <button class="tab-button" data-tab="bg-go">Go</button>
  <button class="tab-button" data-tab="bg-rs">Rust</button>
  <button class="tab-button" data-tab="bg-rb">Ruby</button>

  <div id="bg-py" class="tab-content">
    <p>Celery has official auto-instrumentation — use it instead of writing manual spans:</p>
    <pre><code class="language-bash">pip install opentelemetry-instrumentation-celery</code></pre>
    <pre><code class="language-python">from celery.signals import worker_process_init
from opentelemetry.instrumentation.celery import CeleryInstrumentor

@worker_process_init.connect(weak=False)
def init_celery_tracing(*args, **kwargs):
    CeleryInstrumentor().instrument()</code></pre>
    <p>For RQ, APScheduler, raw threads, or anything else, use the tracer API directly:</p>
    <pre><code class="language-python">from opentelemetry import trace
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
            raise</code></pre>
  </div>

  <div id="bg-go" class="tab-content">
    <pre><code class="language-go">import (
    "context"
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
    "go.opentelemetry.io/otel/codes"
    "go.opentelemetry.io/otel/trace"
    "github.com/hibiken/asynq"
)

var tracer = otel.Tracer("my-service-worker")

func ProcessEmail(ctx context.Context, t *asynq.Task) error {
    ctx, span := tracer.Start(ctx, "email.send",
        trace.WithSpanKind(trace.SpanKindConsumer),
        trace.WithAttributes(
            attribute.String("messaging.system", "asynq"),
            attribute.String("messaging.operation", "process"),
            attribute.String("messaging.destination.name", t.Type()),
            attribute.String("code.function", "ProcessEmail"),
        ))
    defer span.End()

    if err := sendEmail(ctx, t.Payload()); err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
        return err
    }
    return nil
}</code></pre>
  </div>

  <div id="bg-rs" class="tab-content">
    <pre><code class="language-rust">use opentelemetry::{global, trace::{Tracer, Status, SpanKind}, KeyValue};

pub async fn process_email(payload: EmailJob) -> Result<(), Error> {
    let tracer = global::tracer("my-service-worker");
    let mut span = tracer
        .span_builder("email.send")
        .with_kind(SpanKind::Consumer)
        .with_attributes(vec![
            KeyValue::new("messaging.system", "redis"),
            KeyValue::new("messaging.operation", "process"),
            KeyValue::new("messaging.destination.name", "emails"),
            KeyValue::new("code.function", "process_email"),
        ])
        .start(&tracer);

    match send_email(payload).await {
        Ok(()) => Ok(()),
        Err(e) => {
            span.record_error(&e);
            span.set_status(Status::error(e.to_string()));
            Err(e)
        }
    }
}</code></pre>
  </div>

  <div id="bg-rb" class="tab-content">
    <p>Sidekiq has official auto-instrumentation — use it instead of writing manual spans:</p>
    <pre><code class="language-ruby">require 'opentelemetry/instrumentation/sidekiq'

OpenTelemetry::SDK.configure do |c|
  c.use 'OpenTelemetry::Instrumentation::Sidekiq'
end</code></pre>
    <p>For ActiveJob, raw threads, or anything else, use the tracer API directly:</p>
    <pre><code class="language-ruby">tracer = OpenTelemetry.tracer_provider.tracer('my-service-worker')

def process_email(payload)
  tracer.in_span('email.send', kind: :consumer, attributes: {
    'messaging.system' => 'sidekiq',
    'messaging.operation' => 'process',
    'messaging.destination.name' => 'emails',
    'code.function' => 'process_email',
  }) do |span|
    begin
      send_email(payload)
    rescue => e
      span.record_exception(e)
      span.status = OpenTelemetry::Trace::Status.error(e.message)
      raise
    end
  end
end</code></pre>
  </div>
</section>
```

## Using an OTel Collector as Proxy

If you prefer to run a local OpenTelemetry Collector — for example, to buffer telemetry, batch exports, or collect from multiple services — you can set one up as a proxy.

### Collector Configuration

Create an `otel-collector-config.yaml`:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:

exporters:
  otlp:
    endpoint: "otelcol.monoscope.tech:4317"
    tls:
      insecure: true
    headers:
      x-api-key: "YOUR_API_KEY"

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    metrics:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    logs:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
```

### Docker Compose Setup

```yaml
services:
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
    ports:
      - "4317:4317"
      - "4318:4318"
```

Then point your application's `OTEL_EXPORTER_OTLP_ENDPOINT` to `http://localhost:4317` instead of the monoscope endpoint directly. For a more comprehensive Docker-based collector setup with container metrics and log collection, see the [Docker integration guide](/docs/sdks/infrastructure/docker/).

## Feature Comparison: Native SDK vs Direct OpenTelemetry

{class="docs-table"}
:::
| Feature | Native SDK | Direct OTel |
| ------- | ---------- | ----------- |
| Traces, spans, metrics, logs | Yes | Yes |
| Request/response body capture | Yes | No |
| Automatic field redaction | Yes | No |
| Error reporting middleware | Yes | Manual |
| Endpoint detection | Yes | Yes |
:::

Native SDKs provide deeper integration features like automatic body capture and field redaction. Direct OpenTelemetry still gives you full observability for traces, metrics, and logs.

```=html
<hr>
```

## Verification

After configuring your application:

1. Start your application with the `OTEL_*` environment variables set
2. Send a few requests to your service
3. Open the [monoscope dashboard](https://app.monoscope.tech) and check the **API Log Explorer** — your traces should appear within a few seconds

You can also use **telemetrygen** to verify your setup independently. See the [Quick Test section](/docs/onboarding/#⑤-quick-test-your-integration) in the onboarding guide.

```=html
<div class="callout">
  <i class="fa-solid fa-envelope"></i>
  <p>Want a native SDK for your language? <a href="mailto:hello@monoscope.tech">Send us an email</a> and we'll prioritize based on demand.</p>
</div>
```
