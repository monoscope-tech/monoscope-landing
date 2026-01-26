---
title: Settings Pages
date: 2024-05-20
updatedDate: 2024-05-20
menuWeight: 2
pageFullWidth: true
hideToc: true
pages:
  - title: Project Settings
    slug: /docs/dashboard/settings-pages/project-settings
    icon: gear
  - title: Manage Members
    slug: /docs/dashboard/settings-pages/manage-members
    icon: user-plus
  - title: API Keys
    slug: /docs/dashboard/settings-pages/api-keys
    icon: key
  - title: Integrations
    slug: /docs/dashboard/settings-pages/integrations
    icon: arrows-turn-right
  - title: S3 Storage
    slug: /docs/dashboard/settings-pages/s3-storage
    icon: bucket
---

# Settings Pages

```=html
<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
{% for page in this.frontmatter.pages %}
  <a href="{{ page.slug }}" class="docs-card-2 rounded-lg">
    <i class="fa-solid fa-{{ page.icon }}"></i>
    <p class="text-base">{{ page.title }}</p>
  </a>
{% endfor %}
</div>
```
