---
title: Pages
date: 2024-05-20
updatedDate: 2026-10-29
menuWeight: 1
hideToc: true
---

# Pages

Each guide in this section describes one page of the monoscope app.

```=html
<nav class="pathway not-prose">
{% assign pages = file_list | where_glob: 'file_path', './docs/dashboard/dashboard-pages/*/index.md' | sort: 'frontmatter.menuWeight' %}
{% for page in pages %}
  <a href="{{ page.permalink }}"><span class="step">{{ forloop.index }}</span><span class="title">{{ page.frontmatter.title }}</span><i class="fa-solid fa-arrow-right arrow" aria-hidden="true"></i></a>
{% endfor %}
</nav>
```
