---
title: Contact
description: Talk to the engineers who build monoscope. Book a call, email us, ask in Discord or open a GitHub issue.
date: 2024-05-18
updatedDate: 2026-10-29
hide_date: true
layout: default/index.liquid
channels:
  - { href: "https://calendar.app.google/1a4HG5GZYv1sjjZG6", icon: calendar, title: Book a call, body: "A call with an engineer on the team. Bring a migration plan, a pricing question or a bug.", label: Pick a time, tracking: contact-book-call, event: ScheduleDemo, external: true }
  - { href: "mailto:hello@monoscope.tech", icon: mail, title: Email us, body: "For support, billing, security questions and anything that needs a paper trail.", label: hello@monoscope.tech, tracking: contact-email, event: Contact }
  - { href: "https://discord.gg/BSFCaUHxt4", icon: discord, title: Ask in Discord, body: "Questions about setup, SDKs and queries, answered by the team and other users.", label: Join the Discord server, tracking: contact-discord, event: Contact, external: true }
  - { href: "https://github.com/monoscope-tech/monoscope-landing/issues/new/choose", icon: github, title: Open a GitHub issue, body: "Found a mistake in the docs or on this site? File it where we can track the fix.", label: Open an issue, tracking: contact-github, event: Contact, external: true }
---

```=html
{% render "default/components/page-panel", tone: "brand", art: "know-lighthouse.webp", eyebrow: "Contact", title: "Talk to the people who build it.", lead: "Setup questions, pricing, or moving off another tool. Pick the channel that suits the question." %}
<div class="wrap max-w-[80rem] pt-12 md:pt-16 pb-24 md:pb-32 space-y-16">
  <ul class="grid md:grid-cols-2 gap-4">
    {% for c in this.frontmatter.channels %}
    <li><a href="{{c.href}}"{% if c.external %} target="_blank" rel="noopener noreferrer"{% endif %} data-tracking="{{c.tracking}}" data-reddit-event="{{c.event}}" class="card tone-brand flex h-full flex-col gap-5 rounded-2xl border border-strokeWeak p-6">
      <span class="flex items-start gap-4">
        <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-(--tone-weak) text-(--tone)"><svg class="size-5" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#{{c.icon}}"></use></svg></span>
        <span class="space-y-1.5 min-w-0">
          <span class="block text-xl font-semibold leading-[1.35] text-textStrong">{{c.title}}</span>
          <span class="block text-base leading-relaxed text-textWeak text-pretty">{{c.body}}</span>
        </span>
      </span>
      <span class="mt-auto ps-14 inline-flex items-center gap-2 text-base font-medium text-textBrand [overflow-wrap:anywhere]">{{c.label}} <span aria-hidden="true">{% if c.external %}↗{% else %}→{% endif %}</span></span>
    </a></li>
    {% endfor %}
  </ul>
  <div class="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-12 border-t border-strokeWeak pt-10">
    <h2 class="text-xl font-semibold leading-[1.35] text-textStrong">Company</h2>
    <div class="space-y-2 text-base leading-relaxed text-textWeak">
      <p>monoscope is a product of <span class="text-textStrong">Past 3 Technologies UG</span>, a software consulting firm based in Berlin, Germany.</p>
      <p>Gruntaler Str. 18, 13357 Berlin, Germany · <a href="mailto:hello@monoscope.tech" class="text-textBrand underline underline-offset-4">hello@monoscope.tech</a></p>
      <p><a href="/about/" class="text-textBrand underline underline-offset-4">Read why we built monoscope</a></p>
    </div>
  </div>
</div>
```
