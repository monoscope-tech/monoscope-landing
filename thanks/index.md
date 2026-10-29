---
title: Thank you
date: 2024-06-06
updatedDate: 2026-10-29
noindex: true
next:
  - { href: "https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer", icon: circle-play, title: Try the playground, body: "A live demo project with real requests, traces and issues. No sign-up.", tracking: thanks-playground, event: ViewContent }
  - { href: "/docs/", icon: code, title: Read the docs, body: "Send your first events with OpenTelemetry or one of our SDKs." }
  - { href: "https://discord.gg/BSFCaUHxt4", icon: discord, title: Join the Discord, body: "Ask the team and other users about setup, SDKs and queries.", external: true, tracking: thanks-discord, event: Contact }
---

```=html
{% render "default/components/page-panel", tone: "success", art: "start-path.webp", eyebrow: "Thank you", title: "You’re registered.", lead: "Thanks for signing up. We look forward to hosting you. While you wait, here’s where to start." %}
<div class="wrap max-w-[80rem] pt-12 md:pt-16 pb-24 md:pb-32">
  <ul class="grid md:grid-cols-3 gap-4">
    {% for l in this.frontmatter.next %}
    <li><a href="{{l.href}}"{% if l.external %} target="_blank" rel="noopener noreferrer"{% endif %}{% if l.tracking %} data-tracking="{{l.tracking}}" data-reddit-event="{{l.event}}"{% endif %} class="card tone-success flex h-full flex-col gap-4 rounded-2xl border border-strokeWeak p-6">
      <span class="grid size-10 place-items-center rounded-xl bg-(--tone-weak) text-(--tone)"><svg class="size-5" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#{{l.icon}}"></use></svg></span>
      <span class="space-y-1.5">
        <span class="flex items-center gap-2 text-xl font-semibold leading-[1.35] text-textStrong">{{l.title}} <span aria-hidden="true" class="text-textWeak">{% if l.external %}↗{% else %}→{% endif %}</span></span>
        <span class="block text-base leading-relaxed text-textWeak text-pretty">{{l.body}}</span>
      </span>
    </a></li>
    {% endfor %}
  </ul>
</div>
```
