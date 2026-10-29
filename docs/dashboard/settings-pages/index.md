---
title: Settings
date: 2024-05-20
updatedDate: 2026-10-29
menuWeight: 2
hideToc: true
---

# Settings

To open the settings of a project, click **Settings** at the bottom of the sidebar. The settings pages are **Project**, **API Keys**, **Team**, **Integrations**, **Prometheus**, **Storage** and **Billing**.

```=html
<nav class="pathway not-prose">
{% assign pages = file_list | where_glob: 'file_path', './docs/dashboard/settings-pages/*/index.md' | sort: 'frontmatter.menuWeight' %}
{% for page in pages %}
  <a href="{{ page.permalink }}"><span class="step">{{ forloop.index }}</span><span class="title">{{ page.frontmatter.title }}</span><i class="fa-solid fa-arrow-right arrow" aria-hidden="true"></i></a>
{% endfor %}
</nav>
```
