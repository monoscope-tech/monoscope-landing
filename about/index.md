---
title: About
description: monoscope exists because we once lost 20,000 orders to a missing field that no tool had kept. It's open-source observability that keeps every request and response.
date: 2022-03-23
updatedDate: 2026-10-29
hide_date: true
layout: default/index.liquid
beliefs:
  - { icon: align-left, title: Keep every request, body: "Every request and response, in and out, unsampled, next to your logs, traces and metrics. When something breaks, the failing request is already there." }
  - { icon: github, title: Open source, body: "The whole platform is AGPL-3.0 on GitHub, and the TimeFusion database underneath is MIT. Read the code that handles your data, or run it on your own servers." }
  - { icon: database, title: "Your bucket, your data", body: "On the own-bucket plan, every event lands in your S3 bucket as open Delta Lake and Parquet. Query it with DuckDB or SQL, and keep it as long as you need." }
---

```=html
{% render "default/components/page-panel", tone: "brand", art: "page-about.webp", eyebrow: "About monoscope", title: "We once shipped a rewrite that lost 20,000 orders in 10 minutes.", lead: "One field was missing, and nothing we had kept the request that would have shown it." %}

<div class="wrap max-w-[80rem] pt-16 md:pt-24 pb-20 md:pb-28 grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
  <h2 class="text-2xl md:text-3xl font-medium tracking-tight leading-[1.25] text-textStrong text-balance lg:sticky lg:top-24 self-start">How monoscope started</h2>
  <div class="max-w-[65ch] space-y-6 text-lg leading-[1.7] text-textWeak text-pretty [&_strong]:font-medium [&_strong]:text-textStrong">
    <p>A few years ago, I was a new hire at a food delivery company, moving a legacy PHP service to Go. We built every field in the Swagger docs, compared the old service’s responses with the new one’s, and fixed differences until they matched.</p>
    <p>After weeks of building and testing, we rolled it out. The moment we looked at the order charts, we knew something was wrong. <strong>Within 10 minutes, 20,000 orders were lost.</strong></p>
    <p>In a couple of the countries we ran in, the apps expected a field the old service sent and the new one didn’t. It wasn’t in the documentation we inherited, and those countries weren’t in the samples we had tested by hand.</p>
    <p>We rolled back and fixed it. The charts told us orders had stopped. Nothing told us why, because nothing had kept the requests and responses that would have shown the missing field in seconds.</p>
    <p class="text-textStrong">monoscope is the tool we needed that day. It keeps every request and response, yours and your suppliers’, flags when a field disappears or changes type, and its AI reads the failing request, finds the cause and opens a pull request with the fix.</p>
    <p class="pt-2 text-base">Anthony (<a href="https://twitter.com/tonialaribe" target="_blank" rel="noopener noreferrer" class="text-textBrand underline underline-offset-4">@tonialaribe</a>) and Smile</p>
  </div>
</div>

<section class="tone-warning relative w-full">
  <div aria-hidden="true" class="absolute inset-y-0 left-1/2 -translate-x-1/2 panel-w rounded-[2rem] bg-(--tone-panel) border border-(--tone-weak)"></div>
  <div class="relative wrap max-w-[80rem] py-24 md:py-32 space-y-14">
    <div class="space-y-6 max-w-3xl [&>p:first-child]:mb-3.5">
      <p class="inline-flex rounded-md px-2.5 py-1 eyebrow font-mono text-[12px] uppercase tracking-wider bg-(--tone-weak)">What we believe</p>
      <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-balance text-textStrong">Most tools throw away the evidence.</h2>
      <p class="max-w-[65ch] text-lg md:text-xl leading-[1.65] text-textWeak text-pretty">Sampled traces, dropped request bodies, short retention, and data locked in someone else’s system. Each one leaves you guessing when something breaks, and unable to prove what happened.</p>
    </div>
    <ul class="grid md:grid-cols-3 gap-4">
      {% for b in this.frontmatter.beliefs %}
      <li class="card flex flex-col gap-4 rounded-2xl border border-strokeWeak p-6">
        <span class="grid size-10 place-items-center rounded-xl bg-(--tone-weak) text-(--tone)"><svg class="size-5" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#{{b.icon}}"></use></svg></span>
        <h3 class="text-xl font-semibold leading-[1.35] text-textStrong">{{b.title}}</h3>
        <p class="text-base leading-relaxed text-textWeak text-pretty">{{b.body}}</p>
      </li>
      {% endfor %}
    </ul>
    <div class="grid sm:grid-cols-3 gap-px bg-strokeWeak border border-strokeWeak rounded-xl overflow-hidden *:bg-(--card-bg) *:p-5 text-base text-textWeak">
      <div><span class="text-3xl font-medium tracking-tight text-textStrong">Open source</span><br>AGPL 3.0</div>
      <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">20x</span><br>faster MTTR at Blockradar</div>
      <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">780+</span><br>OpenTelemetry integrations</div>
    </div>
  </div>
</section>

<div class="wrap max-w-[80rem] pt-24 md:pt-32 pb-24 md:pb-32 space-y-16">
  <div class="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16">
    <h2 class="text-2xl md:text-3xl font-medium tracking-tight leading-[1.25] text-textStrong text-balance">Tell us your story</h2>
    <div class="max-w-[65ch] space-y-6">
      <p class="text-lg leading-[1.7] text-textWeak text-pretty">We’re engineers, and monoscope started as a bad day in production. If you’ve lost orders, data or a weekend to something your tools didn’t keep, we’d like to hear about it.</p>
      <div class="flex flex-wrap gap-3">
        <a href="https://discord.gg/BSFCaUHxt4" target="_blank" rel="noopener noreferrer" class="btn py-2.5 px-5 rounded-lg bg-fillBrand-strong text-textInverse-strong" data-tracking="about-discord" data-reddit-event="Contact">Join our Discord</a>
        <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" target="_blank" rel="noopener noreferrer" class="btn btn-secondary py-2.5 px-5 rounded-lg" data-tracking="about-book-call" data-reddit-event="ScheduleDemo">Book a call with us</a>
        <a href="https://github.com/monoscope-tech/monoscope" target="_blank" rel="noopener noreferrer" class="inline-flex items-center min-h-11 px-2 text-base font-medium text-textBrand underline underline-offset-4" data-tracking="about-github" data-reddit-event="ViewContent">Read the code on GitHub <span class="ms-2" aria-hidden="true">↗</span></a>
      </div>
    </div>
  </div>
  <div class="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 border-t border-strokeWeak pt-10">
    <h2 class="text-xl font-semibold leading-[1.35] text-textStrong">Company</h2>
    <div class="space-y-2 text-base leading-relaxed text-textWeak max-w-[65ch]">
      <p>monoscope, previously called APItoolkit, is a product of <span class="text-textStrong">Past 3 Technologies UG</span>, a software consulting firm based in Berlin, Germany.</p>
      <p>Gruntaler Str. 18, 13357 Berlin, Germany · <a href="mailto:hello@monoscope.tech" class="text-textBrand underline underline-offset-4">hello@monoscope.tech</a></p>
      <p><a href="/contact/" class="text-textBrand underline underline-offset-4">All the ways to reach us</a></p>
    </div>
  </div>
</div>
```
