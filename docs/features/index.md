---
title: Features
date: 2024-04-22
updatedDate: 2024-05-07
faLogo: folder-tree
menuWeight: 4
hideFileTree: true
pageFullWidth: true
hideToc: true
pages:
  - title: API Monitoring and Observability
    slug: /docs/features/api-monitoring-observability
    icon: chart-line
    description: Track request latency, throughput, and error rates across all your endpoints in real time.
  - title: Error Tracking
    slug: /docs/features/error-tracking
    icon: circle-exclamation
    description: Catch and diagnose errors before your users notice, with full request context and stack traces.
  - title: API Testing
    slug: /docs/features/api-testing
    icon: flask-vial
    description: Automatically generate and run tests against live traffic to catch regressions early.
---

# monoscope Features

In these guides, you will learn more about all monoscope key features in detail.

```=html
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
{% for page in this.frontmatter.pages %}
  <a href="{{ page.slug }}" class="docs-card-2 rounded-lg">
    <i class="fa-solid fa-{{ page.icon }}"></i>
    <p class="text-lg">{{ page.title }}</p>
    {% if page.description %}<span class="text-sm text-textWeak">{{ page.description }}</span>{% endif %}
  </a>
{% endfor %}
</div>
```
