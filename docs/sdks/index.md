---
title: SDK Guides
date: 2022-03-23
updatedDate: 2024-08-03
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
---

# SDK Guides

In these guides, you will learn how to integrate monoscope into your application using any of our 17+ platform SDKs in different programming languages and frameworks. Even if your application doesn't use a web framework,
**these SDKs are also compatible with different HTTP client libraries (e.g., `<i class="fa-brands fa-js"></i>`{=html} fetch, `<i class="fa-brands fa-js"></i>`{=html} axios, `<i class="fa-brands fa-js"></i>`{=html} xhr, `<i class="fa-brands fa-php"></i>`{=html} guzzle, `<i class="fa-brands fa-golang"></i>`{=html} tls, etc.)**.
Kindly select your preferred programming language below to get started.

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
