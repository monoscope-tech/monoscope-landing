---
title: Flutter (OpenTelemetry)
ogTitle: Flutter OpenTelemetry Integration Guide for monoscope
date: 2026-05-08
updatedDate: 2026-05-08
linkTitle: "Flutter"
menuWeight: 45
---

# Flutter Integration Guide

monoscope does not yet ship a native Flutter wrapper, but you can fully instrument a Flutter app — traces, HTTP calls, and **uncaught errors** — by wiring the standard Dart [`opentelemetry`](https://pub.dev/packages/opentelemetry) package directly to monoscope's OTLP endpoint.

This guide focuses on **error tracking**, which on Flutter requires hooking three different error channels: the Flutter framework, the Dart runtime, and the platform engine. Miss any one of them and you'll lose half your crashes silently.

```=html
<hr>
```

## Prerequisites

Ensure you have already completed the first three steps of the [onboarding guide](/docs/onboarding/){target="\_blank"}.

## Install via Claude Code

Use [Claude Code](https://claude.com/claude-code)? Our skill will instrument this project for you. Add the marketplace, install the skill, and install our CLI:

```sh
claude plugin marketplace add monoscope-tech/skills
claude plugin install monoscope-skills@monoscope-skills
curl monoscope.tech/install.sh | sh
monoscope auth login
```

Then run inside Claude Code:

```
/monoscope-skills:instrument OpenTelemetry via Monoscope into this project
```

The skill drives the CLI to wire up the SDK and verify it. Prefer a human? [Email us](mailto:hello@monoscope.tech) — happy to jump on a call or connect over Slack.

## Installation

Add the OpenTelemetry packages to your `pubspec.yaml`:

```yaml
dependencies:
  opentelemetry: ^0.18.11
  http: ^1.2.0
  stack_trace: ^1.11.0
```

Then run:

```sh
flutter pub get
```

The `opentelemetry` Dart package speaks **OTLP/HTTP+protobuf**, so point the exporter at monoscope's HTTP endpoint on port `4318` — not the gRPC `:4317` endpoint used by our backend SDKs.

## Tracer Setup

Initialize the tracer provider once, before `runApp`. The monoscope **API key is required** and is passed as a resource attribute named `x-api-key` (the same convention used by every other monoscope OTel integration — see [PHP](/docs/sdks/php/laravel/), [Next.js](/docs/sdks/nodejs/nextjs/), and the [generic OpenTelemetry guide](/docs/sdks/opentelemetry/)). Every span exported then carries the key, and monoscope routes it to your project.

```dart
import 'package:flutter/foundation.dart';
import 'package:opentelemetry/api.dart' as otel_api;
import 'package:opentelemetry/sdk.dart' as otel_sdk;

late final otel_api.Tracer tracer;
late final otel_sdk.TracerProviderBase tracerProvider;

void initTelemetry() {
  // OTLP/HTTP+protobuf endpoint. Note: http://, port 4318, /v1/traces path.
  final exporter = otel_sdk.CollectorExporter(
    Uri.parse('http://otelcol.monoscope.tech:4318/v1/traces'),
  );

  final provider = otel_sdk.TracerProviderBase(
    processors: [otel_sdk.BatchSpanProcessor(exporter)],
    resource: otel_sdk.Resource([
      // Required by monoscope to attribute spans to your project.
      otel_api.Attribute.fromString('x-api-key', 'YOUR_API_KEY'),
      otel_api.Attribute.fromString('service.name', 'my-flutter-app'),
      otel_api.Attribute.fromString(
        'service.version',
        const String.fromEnvironment('APP_VERSION', defaultValue: 'dev'),
      ),
      otel_api.Attribute.fromString(
        'deployment.environment',
        kReleaseMode ? 'production' : 'development',
      ),
    ]),
  );

  otel_api.registerGlobalTracerProvider(provider);
  tracerProvider = provider;
  tracer = provider.getTracer('my-flutter-app');
}
```

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p><b>The API key ships in the binary.</b> Anyone who downloads your app can extract it, so use a <b>dedicated, ingest-only API key</b> for mobile builds and rotate it independently of your server keys.</p>
</div>
```

```=html
<div class="callout">
  <i class="fa-regular fa-circle-info"></i>
  <p><b>Need TLS or a stable buffer?</b> Run a local OpenTelemetry Collector on your infrastructure, point your Flutter app at it, and have the collector forward to <code>otelcol.monoscope.tech:4317</code> with the API key in headers. See the <a href="/docs/sdks/opentelemetry/#using-an-otel-collector-as-proxy">collector-as-proxy section</a> of the generic OTel guide.</p>
</div>
```

## Error Tracking

Flutter has **three** distinct error channels. You must hook all of them; otherwise crashes from native code, build failures, or async gaps disappear without a trace.

{class="docs-table"}
:::
| Channel | Catches | How to hook |
| ------- | ------- | ----------- |
| `FlutterError.onError` | Errors in the widget/build/render pipeline | Assigned in `main()` |
| `PlatformDispatcher.instance.onError` | Uncaught async errors that bubble to the root zone (Dart 2.18+) | Assigned in `main()` |
| `runZonedGuarded` | Async errors from code running inside the zone (use as a backstop) | Wraps `runApp` |
:::

### Wire all three

```dart
import 'dart:async';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:opentelemetry/api.dart' as otel_api;
import 'package:stack_trace/stack_trace.dart';

void main() {
  runZonedGuarded<Future<void>>(() async {
    WidgetsFlutterBinding.ensureInitialized();
    initTelemetry();

    // 1. Flutter framework errors (build, layout, paint, gestures)
    FlutterError.onError = (FlutterErrorDetails details) {
      FlutterError.presentError(details); // keep red-screen / console output
      _reportError(
        details.exception,
        details.stack ?? StackTrace.current,
        library: details.library,
        context: details.context?.toString(),
      );
    };

    // 2. Uncaught async errors at the engine boundary
    PlatformDispatcher.instance.onError = (error, stack) {
      _reportError(error, stack);
      return true; // mark as handled so the engine doesn't terminate
    };

    runApp(const MyApp());
  }, (error, stack) {
    // 3. Backstop for anything that escapes the zone
    _reportError(error, stack);
  });
}
```

### Recording the error as a span

Treat each crash as a one-shot span with an exception event. monoscope renders these in the **Errors** view and links them back to the trace they happened in.

```dart
void _reportError(
  Object error,
  StackTrace stack, {
  String? library,
  String? context,
}) {
  final span = tracer.startSpan('flutter.error');
  try {
    span.setStatus(otel_api.StatusCode.error, error.toString());
    span.setAttributes([
      otel_api.Attribute.fromString('exception.type', error.runtimeType.toString()),
      otel_api.Attribute.fromString('exception.message', error.toString()),
      // Trace.from(...).terse strips Flutter framework frames so the top of
      // the stack is your code, not the rendering pipeline.
      otel_api.Attribute.fromString(
        'exception.stacktrace',
        Trace.from(stack).terse.toString(),
      ),
      if (library != null)
        otel_api.Attribute.fromString('flutter.library', library),
      if (context != null)
        otel_api.Attribute.fromString('flutter.context', context),
    ]);
    span.addEvent('exception', attributes: [
      otel_api.Attribute.fromString('exception.type', error.runtimeType.toString()),
      otel_api.Attribute.fromString('exception.message', error.toString()),
    ]);
  } finally {
    span.end();
  }
}
```

### Native (platform) crashes

`PlatformDispatcher.onError` does **not** catch crashes inside Kotlin/Swift code — those terminate the process before Dart sees them. If you need native crash capture too, pair this setup with a platform crash reporter on each side and forward the report via a method channel into `_reportError` on next launch.

## HTTP Instrumentation

The `opentelemetry` package does **not** ship an HTTP client wrapper — you wrap each request in a span manually and inject the W3C trace-context headers using the package's propagator. A small `BaseClient` subclass keeps this out of your call sites:

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:opentelemetry/api.dart' as otel_api;

class TracedClient extends http.BaseClient {
  TracedClient(this._inner);
  final http.Client _inner;
  static final _propagator = otel_api.W3CTraceContextPropagator();

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) async {
    final span = tracer.startSpan('HTTP ${request.method}', attributes: [
      otel_api.Attribute.fromString('http.method', request.method),
      otel_api.Attribute.fromString('http.url', request.url.toString()),
    ]);
    try {
      // Inject traceparent / tracestate so the backend span links up.
      _propagator.inject(
        otel_api.Context.current.withSpan(span),
        request.headers,
        otel_api.TextMapSetter<Map<String, String>>(),
      );
      final res = await _inner.send(request);
      span.setAttributes([
        otel_api.Attribute.fromInt('http.status_code', res.statusCode),
      ]);
      if (res.statusCode >= 400) {
        span.setStatus(otel_api.StatusCode.error, 'HTTP ${res.statusCode}');
      }
      return res;
    } catch (e, st) {
      span.recordException(e, stackTrace: st);
      span.setStatus(otel_api.StatusCode.error, e.toString());
      rethrow;
    } finally {
      span.end();
    }
  }
}
```

Use it like a normal `http.Client`:

```dart
final httpClient = TracedClient(http.Client());
final res = await httpClient.get(Uri.parse('https://api.example.com/users/1'));
```

For **Dio**, attach an `Interceptor` that calls `tracer.startSpan` in `onRequest`, ends it in `onResponse` / `onError`, and uses the same `W3CTraceContextPropagator` to inject headers into `options.headers`.

## Manual Spans

For business operations you care about (checkout, sync, file upload), wrap the work in a span so the error context shows up alongside the failed operation, not in isolation:

```dart
Future<void> submitOrder(Order order) async {
  final span = tracer.startSpan('checkout.submit');
  try {
    span.setAttributes([
      otel_api.Attribute.fromString('order.id', order.id),
      otel_api.Attribute.fromInt('order.items', order.items.length),
    ]);
    await api.placeOrder(order);
  } catch (e, st) {
    span.setStatus(otel_api.StatusCode.error, e.toString());
    span.recordException(e, stackTrace: st);
    rethrow;
  } finally {
    span.end();
  }
}
```

## Identifying Users

Attach the current user as span attributes so errors and traces are filterable per user:

```dart
void setUser({required String id, String? email}) {
  final attrs = [
    otel_api.Attribute.fromString('user.id', id),
    if (email != null) otel_api.Attribute.fromString('user.email', email),
  ];
  // Apply on every new span via a span processor, or set on each
  // top-level span you create after login.
}
```

For an app-wide approach, write a small `SpanProcessor` that reads the current user from a singleton and adds the attributes in `onStart`.

## Flushing on Background / Shutdown

Mobile apps are killed abruptly. The `BatchSpanProcessor` flushes on a timer — exit fast and you lose buffered spans, **including the crash you just reported**. Force a flush whenever the app goes to the background:

```dart
class _LifecycleObserver with WidgetsBindingObserver {
  @override
  Future<void> didChangeAppLifecycleState(AppLifecycleState state) async {
    if (state == AppLifecycleState.paused ||
        state == AppLifecycleState.detached) {
      await tracerProvider.forceFlush();
    }
  }
}
```

Register it once after `runApp`:

```dart
WidgetsBinding.instance.addObserver(_LifecycleObserver());
```

## Verification

1. Run the app in debug mode with the tracer initialized.
2. Trigger a deliberate crash to confirm error tracking is wired:

   ```dart
   ElevatedButton(
     onPressed: () => throw StateError('test crash'),
     child: const Text('Crash me'),
   )
   ```

3. Tap the button, then send the app to the background to flush.
4. Open the [monoscope dashboard](https://app.monoscope.tech) — you should see the `flutter.error` span in the **API Log Explorer** and a corresponding entry in **Errors**, with `exception.type = StateError` and the terse stack trace.

```=html
<div class="callout">
  <i class="fa-solid fa-envelope"></i>
  <p>Want a native Flutter SDK with auto-instrumentation, navigation tracking, and session replay? <a href="mailto:hello@monoscope.tech">Send us an email</a> — we prioritize based on demand.</p>
</div>
```
