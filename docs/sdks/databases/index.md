---
title: Databases
date: 2024-06-14
updatedDate: 2026-11-19
menuWeight: 25
pageFullWidth: true
hideToc: true
pages:
  - title: MongoDB
    slug: /docs/sdks/databases/mongodb
    icon: /assets/img/opentelemetry-contrib-logos/mongodb.png
  - title: MySQL
    slug: /docs/sdks/databases/mysql
    icon: /assets/img/opentelemetry-contrib-logos/mysql.png
  - title: PostgreSQL
    slug: /docs/sdks/databases/postgres
    icon: /assets/img/opentelemetry-contrib-logos/postgresql.png
---

# Database SDKs

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

