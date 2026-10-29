---
title: Events
description: Talks, webinars and conference booths from the monoscope team, with recordings where we have them.
date: 2024-06-06
updatedDate: 2026-10-29
ogImage: https://raw.githubusercontent.com/monoscope/.github/main/images/events-og.png
---

```=html
{% render "default/components/page-panel", tone: "warning", art: "prove-observatory.webp", eyebrow: "Events", title: "Talks, webinars and booths.", lead: "Where the monoscope team has spoken about observability, API integrations and building for the web." %}
{% assign events = file_list | where_glob: 'file_path', "./events/*/index.md" | sort: "frontmatter.date" | reverse %}
{% assign today = "now" | date: "%Y-%m-%d" %}
<div class="wrap max-w-[80rem] pt-12 md:pt-16 pb-24 md:pb-32 space-y-16">
  <ul class="grid md:grid-cols-2 gap-4">
    {% for e in events %}{% assign fm = e.frontmatter %}{% assign day = fm.date | date: "%Y-%m-%d" %}
    <li><a href="{{e.permalink}}" class="card group flex h-full flex-col overflow-hidden rounded-2xl border border-strokeWeak">
      <img src="{{e.permalink}}{{fm.banner | remove_first: './'}}" alt="" loading="lazy" class="aspect-[2/1] w-full object-cover border-b border-strokeWeak">
      <span class="flex flex-1 flex-col gap-4 p-6">
        <span class="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] uppercase tracking-wider text-textWeak">
          <span class="tone-warning rounded-md px-2 py-0.5 bg-(--tone-weak) eyebrow">{% if day >= today %}Upcoming{% else %}Past{% endif %}</span>
          {{fm.kind}}
        </span>
        <span class="block text-xl font-semibold leading-[1.35] text-textStrong text-pretty">{{fm.headline}}</span>
        <span class="mt-auto flex flex-wrap gap-x-5 gap-y-2 text-base text-textWeak">
          <span class="inline-flex items-center gap-2"><svg class="size-4" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#calendar"></use></svg><time datetime="{{day}}">{{fm.date | date: "%-d %B %Y"}}</time></span>
          <span>{{fm.location}}</span>
        </span>
      </span>
    </a></li>
    {% endfor %}
  </ul>
  <div class="card rounded-xl border border-strokeWeak p-5 md:p-6 grid lg:grid-cols-[1fr_auto] items-center gap-5 lg:gap-10">
    <div class="space-y-1.5">
      <h2 class="text-xl font-semibold leading-[1.35] text-textStrong">Want to talk observability with us?</h2>
      <p class="text-base leading-relaxed text-textWeak text-pretty max-w-[65ch]">Ask about a talk, a webinar or anything you saw at one of these events.</p>
    </div>
    <a href="/contact/" class="btn w-fit py-2.5 px-5 rounded-lg bg-fillBrand-strong text-textInverse-strong">Contact the team</a>
  </div>
</div>
```
