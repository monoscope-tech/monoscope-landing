---
title: Infrastructure
date: 2024-06-14
updatedDate: 2024-06-14
menuWeight: 20
pageFullWidth: true
hideToc: true
pages:
  - title: Docker
    slug: /docs/sdks/infrastructure/docker
    icon: /assets/img/framework-logos/docker.svg
  - title: Kubernetes
    slug: /docs/sdks/infrastructure/kubernetes
    icon: /assets/img/framework-logos/kubernetes.svg
  - title: Linux
    slug: /docs/sdks/infrastructure/linux
    icon: /assets/img/framework-logos/linux.svg
  - title: Kafka
    slug: /docs/sdks/infrastructure/kafka
    icon: /assets/img/framework-logos/kafka.svg
---

# Infrastructure SDKs

```=html
<div id="sdk-images" class="mt-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8 text-center items-center align-center">
{% for page in this.frontmatter.pages %}
  <a href="{{ page.slug }}" class="docs-card-2 rounded-md">
    <img src={{ page.icon }} alt={{ page.title }} class="h-16 w-16 not-prose" />
    <p class="text-base text-black dark:text-white">{{ page.title }}</p>
  </a>
{% endfor %}
</div>
```

