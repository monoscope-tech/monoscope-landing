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
<section class="max-w-8xl mx-auto px-2 not-prose">

  <div class="grid md:grid-cols-2 gap-10 lg:gap-12 items-center mt-6 md:mt-10 not-prose">
    <div>
      <h1 class="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1]">Instrument fast. Investigate faster.</h1>
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
<span style="color:rgba(230,237,243,.45)"># Then: /instrument instrument this app with Monoscope opentelemetry auto instrumentation</span></pre>
      </div>
    </aside>
  </div>

  <div class="docs-grid not-prose mt-16">
    <a href="/docs/sdks/" class="docs-grid__cell">
      <p><i class="fa-solid fa-code"></i> <strong>SDK Guides</strong></p>
      <span>Native SDKs for Go, Node.js, Python, PHP, .NET — and OpenTelemetry for everything else.</span>
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

  <h2 class="text-2xl font-semibold tracking-tight mt-20 mb-2">Choose Your SDK</h2>
```

```=html
{% render "default/markdown/integration-footer.liquid", config:config %}
```

```=html
</section>
```
