---
title: Javascript (Browser)
date: 2022-03-23
updatedDate: 2024-05-04
menuWeight: 5
pageFullWidth: true
hideToc: true
pages:
  - title: Browser
    slug: /docs/sdks/Javascript/browser
    icon: /assets/img/framework-logos/js.png
---

# Browser SDK

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
