---
title: Home
ogTitle: Monoscope Docs
date: 2022-03-23
updatedDate: 2026-10-29
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
      <p class="text-lg text-textWeak mt-5 max-w-md">Let your coding agent add OpenTelemetry, or point any OpenTelemetry exporter at monoscope. Then investigate from the dashboard, the CLI or your agent.</p>
      <div class="flex items-center gap-3 mt-8 flex-wrap">
        <a href="/docs/onboarding/" class="btn btn-primary sm:w-48">Get started</a>
        <a href="/docs/sdks/" class="btn btn-secondary sm:w-48">Browse SDK guides</a>
      </div>
    </div>

    <aside>
      <div class="rounded-xl overflow-hidden shadow-sm" style="background:#0d1117;border:1px solid rgba(255,255,255,.08)">
        <div class="flex items-center justify-between px-4 py-2 text-xs font-mono uppercase tracking-wider" style="color:rgba(230,237,243,.55);border-bottom:1px solid rgba(255,255,255,.06)">
          <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full" style="background:rgba(230,237,243,.35)"></span><span>With your coding agent</span></div>
          <button type="button" class="opacity-70 hover:opacity-100 transition-opacity cursor-pointer" onclick="const p=this.closest('div.rounded-xl').querySelector('pre');navigator.clipboard.writeText(p.innerText);this.innerText='Copied';setTimeout(()=>this.innerText='Copy',1500)">Copy</button>
        </div>
        <pre class="m-0 px-5 py-4 text-[13px] leading-relaxed overflow-x-auto" style="background:transparent;color:#e6edf3;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace"><span style="color:rgba(230,237,243,.45)"># Install the monoscope skills (Claude Code)</span>
claude plugin marketplace add monoscope-tech/skills
claude plugin install monoscope-skills@monoscope-skills

<span style="color:rgba(230,237,243,.45)"># Install the CLI and log in</span>
curl https://monoscopehq.com/install.sh | sh
monoscope auth login

<span style="color:rgba(230,237,243,.45)"># Then, in Claude Code:
# /monoscope-skills:instrument Add OpenTelemetry for monoscope</span></pre>
      </div>
    </aside>
  </div>

  <div aria-hidden="true" class="relative mt-14 md:mt-20 h-32 md:h-48 rounded-[2rem] overflow-hidden">
    <img src="/assets/img/home/art/page-docs.webp" alt="" width="2688" height="448" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center dark:opacity-60 [mask-image:linear-gradient(to_top,black_30%,rgb(0_0_0/.8)_44%,rgb(0_0_0/.52)_58%,rgb(0_0_0/.26)_72%,rgb(0_0_0/.09)_86%,transparent)]" />
  </div>

  <div class="docs-grid not-prose mt-14 md:mt-20">
    <a href="/docs/onboarding/" class="docs-grid__cell">
      <p><i class="fa-solid fa-circle-play"></i> <strong>Get Started</strong></p>
      <span>Create an account, get an API key and send your first events in about five minutes.</span>
    </a>
    <a href="/docs/sdks/" class="docs-grid__cell">
      <p><i class="fa-solid fa-code"></i> <strong>SDK Guides</strong></p>
      <span>Set up your framework, capture request and response bodies, and redact sensitive fields. OpenTelemetry for everything else.</span>
    </a>
    <a href="/docs/ai/" class="docs-grid__cell">
      <p><i class="fa-solid fa-robot"></i> <strong>AI</strong></p>
      <span>The CLI, agent skills and the hosted MCP server. One API key, one JSON shape, for shells, agents and CI.</span>
    </a>
    <a href="/docs/dashboard/" class="docs-grid__cell">
      <p><i class="fa-solid fa-chart-line"></i> <strong>Product Guide</strong></p>
      <span>Log Explorer, issues, monitors, dashboards, the API catalog and reports.</span>
    </a>
    <a href="/features/" class="docs-grid__cell">
      <p><i class="fa-solid fa-star"></i> <strong>Product Overview</strong></p>
      <span>What monoscope does, page by page: the AI SRE, issues, logs and traces, dashboards and session replay.</span>
    </a>
    <a href="/docs/sdks/opentelemetry/" class="docs-grid__cell">
      <p><i class="fa-solid fa-diagram-project"></i> <strong>OpenTelemetry</strong></p>
      <span>Send traces, logs and metrics from any language or collector with four environment variables.</span>
    </a>
  </div>

  <figure class="mt-20 md:mt-24 max-w-3xl not-prose border-l-2 border-strokeBrand-weak pl-6">
    <blockquote class="text-textStrong font-medium tracking-tight" style="font-size:clamp(1.125rem, 1.6vw, 1.5rem); line-height:1.45;">
      <span class="text-fillBrand-strong mr-0.5" aria-hidden="true">&ldquo;</span>The best observability tool we use today at Woodcore — monoscope notifies us about any slight change or issue that happens on the system.<span class="text-fillBrand-strong ml-0.5" aria-hidden="true">&rdquo;</span>
    </blockquote>
    <figcaption class="mt-4 flex items-center gap-3 text-textWeak" style="font-size:0.875rem;">
      <img src="/assets/img/customers/woodcore-logo-full.svg" alt="Woodcore" class="h-5 w-auto opacity-50 quote-logo-mono" />
      <span>Samuel Joseph, CEO of Woodcore</span>
    </figcaption>
  </figure>

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
