---
title: Dashboard Pages
date: 2024-05-20
updatedDate: 2024-05-20
menuWeight: 1
pageFullWidth: true
hideToc: true
pages:
  - title: Get Started
    slug: /docs/dashboard/dashboard-pages/get-started
    icon: list-check
  - title: Dashboard
    slug: /docs/dashboard/dashboard-pages/dashboard
    icon: qrcode
  - title: Endpoints
    slug: /docs/dashboard/dashboard-pages/endpoints
    icon: arrow-right-arrow-left
  - title: API Log Explorer
    slug: /docs/dashboard/dashboard-pages/api-log-explorer
    icon: rectangle-list
  - title: Changes & Errors
    slug: /docs/dashboard/dashboard-pages/changes-errors
    icon: bug
  - title: Outgoing Integrations
    slug: /docs/dashboard/dashboard-pages/outgoing-integrations
    icon: arrows-turn-right
  - title: API Tests
    slug: /docs/dashboard/dashboard-pages/api-tests
    icon: list-check
  - title: Reports
    slug: /docs/dashboard/dashboard-pages/reports
    icon: chart-simple
---

# Dashboard Pages

```=html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
{% for page in this.frontmatter.pages %}
  <a href="{{ page.slug }}" class="docs-card-2 rounded-lg">
    <i class="fa-solid fa-{{ page.icon }}"></i>
    <p class="text-base">{{ page.title }}</p>
  </a>
{% endfor %}
</div>
```
