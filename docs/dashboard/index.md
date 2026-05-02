---
title: Dashboard
date: 2024-04-22
updatedDate: 2024-05-28
faLogo: chart-line
menuWeight: 4
pageFullWidth: true
hideToc: true
pages:
  - title: Get Started
    slug: /docs/dashboard/dashboard-pages/get-started
    icon: list-check
    description: First steps after signing in
  - title: Dashboard
    slug: /docs/dashboard/dashboard-pages/dashboard
    icon: qrcode
    description: Overview of key metrics at a glance
  - title: Endpoints
    slug: /docs/dashboard/dashboard-pages/endpoints
    icon: arrow-right-arrow-left
    description: Monitor individual endpoint performance
  - title: API Log Explorer
    slug: /docs/dashboard/dashboard-pages/api-log-explorer
    icon: rectangle-list
    description: Search and inspect individual requests
  - title: Changes & Errors
    slug: /docs/dashboard/dashboard-pages/changes-errors
    icon: bug
    description: Track API changes and error patterns
  - title: Outgoing Integrations
    slug: /docs/dashboard/dashboard-pages/outgoing-integrations
    icon: arrows-turn-right
    description: Send alerts to Slack, PagerDuty, and more
  - title: API Tests
    slug: /docs/dashboard/dashboard-pages/api-tests
    icon: list-check
    description: Create and manage automated API tests
  - title: Reports
    slug: /docs/dashboard/dashboard-pages/reports
    icon: chart-simple
    description: Generate and schedule analytics reports
  - title: Project Settings
    slug: /docs/dashboard/settings-pages/project-settings
    icon: gear
    description: Configure project-level preferences
  - title: Manage Members
    slug: /docs/dashboard/settings-pages/manage-members
    icon: user-plus
    description: Invite teammates and manage roles
  - title: API Keys
    slug: /docs/dashboard/settings-pages/api-keys
    icon: key
    description: Create and rotate API keys
---

# Dashboard Guides

In these guides, you will learn how to effectively navigate through the monoscope dashboard and maximize all the powerful features accessible on different pages of the dashboard. Kindly click on any of the cards below to get started.

```=html
<hr />
```

```=html
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
{% for page in this.frontmatter.pages %}
  <a href="{{ page.slug }}" class="docs-card-2 rounded-lg">
    <i class="fa-solid fa-{{ page.icon }}"></i>
    <p class="text-base text-center">{{ page.title }}</p>
    {% if page.description %}<span class="text-xs text-textWeak text-center">{{ page.description }}</span>{% endif %}
  </a>
{% endfor %}
</div>
```
