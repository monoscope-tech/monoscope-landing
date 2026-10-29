---
title: SDK Guides
date: 2022-03-23
updatedDate: 2026-10-29
faLogo: plug
menuWeight: 2
pageFullWidth: true
hideToc: true
pages:
  - title: .Net SDKs
    slug: /docs/sdks/dotnet
    icon: /assets/img/sdk-icons/dotnet.svg
  - title: Elixir SDKs
    slug: /docs/sdks/elixir
    icon: /assets/img/sdk-icons/elixir.svg
  - title: Golang SDKs
    slug: /docs/sdks/golang
    icon: /assets/img/sdk-icons/golang.svg
  - title: Java SDKs
    slug: /docs/sdks/java
    icon: /assets/img/sdk-icons/java.svg
  - title: Nodejs SDKs
    slug: /docs/sdks/nodejs
    icon: /assets/img/sdk-icons/nodejs.svg
  - title: Javascript (Browser)
    slug: /docs/sdks/Javascript
    icon: /assets/img/framework-logos/js.png
  - title: PHP SDKs
    slug: /docs/sdks/php
    icon: /assets/img/sdk-icons/php.svg
  - title: Python SDKs
    slug: /docs/sdks/python
    icon: /assets/img/sdk-icons/python.svg
  - title: Flutter (OpenTelemetry)
    slug: /docs/sdks/flutter
    icon: /assets/img/sdk-icons/opentelemetry.svg
  - title: OpenTelemetry (Any Language)
    slug: /docs/sdks/opentelemetry
    icon: /assets/img/sdk-icons/opentelemetry.svg
  - title: Infrastructure
    slug: /docs/sdks/infrastructure
    icon: /assets/img/framework-logos/kubernetes.svg
  - title: Databases
    slug: /docs/sdks/databases
    icon: /assets/img/opentelemetry-contrib-logos/postgresql.png
---

# SDK Guides

Each guide shows how to send logs, traces and metrics from your stack to monoscope with OpenTelemetry. The monoscope SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir also capture request and response bodies, report errors, and monitor outgoing HTTP calls (for example `fetch`, `axios` and Guzzle).

For a language without a monoscope SDK, use [OpenTelemetry](/docs/sdks/opentelemetry/) directly. To let your coding agent do the setup, read [Get started](/docs/onboarding/#connect-your-application).

```=html
<hr />
```

```=html
<div id="sdk-images" class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
  {% for page in this.frontmatter.pages %}
    <a href="{{ page.slug }}" class="docs-card-2 rounded-lg">
      <img src="{{ page.icon }}" alt="{{ page.title }}" class="h-12 w-12 not-prose" />
      <p class="text-base">{{ page.title }}</p>
    </a>
  {% endfor %}
</div>
```
