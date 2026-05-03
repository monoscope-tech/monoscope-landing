---
title: Home
ogTitle: Monoscope Docs
date: 2022-03-23
updatedDate: 2026-05-03
linkTitle: "Documentation"
menuWeight: 20
hideFileTree: true
hideToc: true
pageFullWidth: true
---

```=html
<style>
  .quote-logo-mono { filter: brightness(0); }
  [data-theme=dark] .quote-logo-mono { filter: brightness(0) invert(1); }
</style>
<section class="max-w-8xl mx-auto px-2 pb-24 md:pb-32 not-prose">

  <div class="grid md:grid-cols-2 gap-10 lg:gap-16 items-center mt-12 md:mt-20 not-prose">
    <div>
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.04]">Instrument fast. Investigate faster.</h1>
      <p class="text-lg text-textWeak mt-5 max-w-md">Native SDKs for 17+ frameworks, a CLI for shells and agents, an MCP server, and a dashboard for the humans. Start wherever fits.</p>
      <div class="flex items-center gap-3 mt-8 flex-wrap">
        <a href="/docs/onboarding/" class="btn btn-primary sm:w-48">Get Started</a>
        <a href="https://monoscope.tech/demo" target="_blank" rel="noopener noreferrer" class="btn btn-secondary sm:w-48">Book a Demo</a>
      </div>
    </div>

    <aside>
      <div class="rounded-xl overflow-hidden shadow-sm" style="background:#0d1117;border:1px solid rgba(255,255,255,.08)">
        <div class="flex items-center justify-between px-4 py-2 text-[11px] font-mono uppercase tracking-wider" style="color:rgba(230,237,243,.55);border-bottom:1px solid rgba(255,255,255,.06)">
          <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style="background:rgba(230,237,243,.35)"></span><span>Quickstart</span></div>
          <button class="hover:opacity-100 opacity-70 transition cursor-pointer" onclick="const p=this.closest('div.rounded-xl').querySelector('pre');navigator.clipboard.writeText(p.innerText);this.innerText='Copied';setTimeout(()=>this.innerText='Copy',1500)">Copy</button>
        </div>
        <pre class="m-0 px-5 py-4 text-[13px] leading-relaxed overflow-x-auto" style="background:transparent;color:#e6edf3;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace"><span style="color:rgba(230,237,243,.45)"># Install the CLI</span>
curl monoscope.tech/install.sh | sh
monoscope auth login

<span style="color:rgba(230,237,243,.45)"># Add the Monoscope Claude skill</span>
claude plugin marketplace add monoscope-tech/skills
claude plugin install monoscope-skills@monoscope-skills
<span style="color:rgba(230,237,243,.45)"># Then run: /instrument instrument this app with
# Monoscope opentelemetry auto instrumentation</span></pre>
      </div>
    </aside>
  </div>

  <figure class="mt-16 md:mt-20 max-w-3xl not-prose border-l-2 border-strokeBrand-weak pl-6">
    <blockquote class="text-textStrong font-medium tracking-tight" style="font-size:clamp(1.125rem, 1.6vw, 1.5rem); line-height:1.45;">
      <span class="text-fillBrand-strong mr-0.5" aria-hidden="true">&ldquo;</span>The best observability tool we use today at Woodcore — monoscope notifies us about any slight change or issue that happens on the system.<span class="text-fillBrand-strong ml-0.5" aria-hidden="true">&rdquo;</span>
    </blockquote>
    <figcaption class="mt-4 flex items-center gap-3 text-textWeak" style="font-size:0.875rem;">
      <img src="/assets/img/customers/woodcore-logo-full.svg" alt="Woodcore" class="h-5 w-auto opacity-50 quote-logo-mono" />
      <span>Samuel Joseph, CEO of Woodcore</span>
    </figcaption>
  </figure>

  <div class="docs-grid not-prose mt-20 md:mt-24">
    <a href="/docs/sdks/" class="docs-grid__cell">
      <p><i class="fa-solid fa-code"></i> <strong>SDK Guides</strong></p>
      <span>Install, configure, and instrument any supported framework — plus OpenTelemetry for the rest.</span>
    </a>
    <a href="/docs/ai/" class="docs-grid__cell">
      <p><i class="fa-solid fa-robot"></i> <strong>AI</strong></p>
      <span>CLI, MCP server, and Claude Code skills. Same auth, same JSON — for shells, agents, and CI.</span>
    </a>
    <a href="/docs/dashboard/" class="docs-grid__cell">
      <p><i class="fa-solid fa-chart-line"></i> <strong>Dashboard Guides</strong></p>
      <span>Endpoints, errors, log explorer, API tests, reports — find your way around the UI.</span>
    </a>
    <a href="/docs/features/" class="docs-grid__cell">
      <p><i class="fa-solid fa-star"></i> <strong>Features</strong></p>
      <span>API analytics, error tracking, monitors, anomaly detection — what Monoscope does, in detail.</span>
    </a>
  </div>

  <div class="mt-24 md:mt-32 mb-8">
    <p class="text-xs uppercase tracking-[0.18em] font-medium text-textWeak mb-3">Languages &amp; Frameworks</p>
    <h2 class="text-3xl md:text-4xl font-semibold tracking-tight leading-[1.1]">Choose Your SDK</h2>
  </div>
```

```=html
{% render "default/markdown/integration-footer.liquid", config:config %}
```

```=html
</section>
```
