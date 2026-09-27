---
title: Observability with an AI SRE built in
description: Open-source observability that keeps every request and response, yours and your suppliers', unsampled in your own bucket, with an AI SRE that investigates and writes the fix. Free to start.
enableFreeTier: true
testimonials:
  - stat: 20x
    desc: faster <span class="underline underline-offset-4 decoration-dotted tooltip tooltip-right" data-tip="mean time to resolution">MTTR</span>
    logo: blockradar-full.svg
    theme: Warning
    color: ffebe0
  - stat: 70%
    desc: reduction in manual troubleshooting
    logo: sameday.svg
    theme: Brand
    color: d3e5f0
  - quote: "We had a major upgrade planned for our iOS/Android app... After adding monoscope to our laravel app, we could see every new route and request. It gave me and the dev team complete confidence that our users weren't being affected by our changes. <br/><br/>... became the smoothest and LEAST STRESSFUL rollouts we have ever done. Really an amazing tool and now a permanent part of our workflow. Thank you!!"
    photo: larrison_morrison.jpeg
    name: Lazarus Morrison
    title: Founder of Community Fluency
    logo_raw: <div class="inline-flex items-center text-lg gap-1"><img src="/assets/img/customers/community_fluency.png" alt="Community Fluency" class="logo1 logo2"/> <span class="hidden sm:inline-block">Community<strong class="text-lg!">Fluency</strong></span></div>
  - quote: "The best observability tool we use today at Woodcore, monoscope notifies us about any slight change that happens on the system. <br/><br/>Most especially, for the features we utilise today on monoscope, would cost us a lot more elsewhere."
    photo: samuel_joseph.jpeg
    name: Samuel Joseph
    title: CEO of Woodcore
    logo: woodcore-logo-full.svg
  - stat: 3x
    desc: faster system recovery
    logo: partna.svg
    theme: Error
    color: e9daff
  - stat: 5x
    desc: faster incident debug times
    logo: coronams-logo.svg
    theme: Warning
    color: ffebe0
  - stat: 9x
    desc: less customer support calls
    logo: platnova.png
    theme: Warning
    color: d3e5f0
  - stat: 500ms
    desc: shaved off improved endpoints
    logo: payfonte.svg
    theme: Brand
    color: e6fae3
  - quote: "I fell for monoscope because it integrated effortlessly with my application and provided valuable API insights. Whenever I needed help, the team was always ready to listen and resolve any issues. That's why we pay for their service."
    photo: david_odohi.jpeg
    name: Odohi David
    title: CTO of Grovepay
    logo: grovepay.svg

sections:
  - id: know
    eyebrow: Know what happened
    title: Every error, with the exact request behind it
    lead: >-
      Errors, crashes and breaking API changes, each with the request and response
      that caused it. Logs, traces, metrics and session replay sit next to it, linked.
    recording: know.mp4
    poster: /assets/img/home/explore-012025.svg
    mock: none
    frame: app.monoscope.tech / issues
    brief: >-
      Issues list. Open an issue, then the request that triggered it: headers, body,
      response, trace. Click through to the log line and the session replay. 25-30s.
    link: /features/error-tracking/
    link_label: Error tracking
    bullets:
      - title: Every error comes with its request
        body: Errors and slow endpoints, grouped into issues, each with the full request and response as they were.
      - title: Breaking changes, yours and your suppliers'
        body: A field removed, renamed or retyped, in your endpoints or a third-party API, flagged with the request that revealed it.
      - title: Logs, traces, metrics and replay, linked
        body: Search with KQL or plain English, then click from a log line to the trace, the endpoint's metrics and what the user saw.
  - id: prove
    eyebrow: Prove it
    title: Never sampled. The record, not a summary of it.
    lead: >-
      Every request, response, log and span is kept. When a customer or a supplier
      disputes what happened, you have the evidence.
    recording: prove.mp4
    poster: /assets/img/home/dashboard-012025.svg
    mock: none
    frame: app.monoscope.tech / outgoing requests
    brief: >-
      An outgoing request to a supplier API: the request body, the 200 response with
      its acknowledgement body, the timestamp. End on the share link. 20-25s.
    link: /features/byob-s3/
    link_label: Your own S3
    bullets:
      - title: Never sampled
        body: No sampling decisions and no dropped bodies. Every request, response, log and span is kept.
      - title: The receipt
        body: What you sent, what the supplier answered and when, to the millisecond. One customer used it in court against a supplier that acknowledged requests and never acted on them.
      - title: Share any request with a link
        body: Send the exact request and response to the partner or the customer instead of describing it.
      - title: Your bucket is the database
        body: On the Cloud + your own S3 plan, everything lands in your bucket as Delta Lake tables. Unlimited retention. Query it with DuckDB, Spark or SQL.
    code_label: duckdb
    code: |
      INSTALL delta; LOAD delta;

      SELECT timestamp,
             attributes___http___request___method  AS method,
             attributes___url___full               AS url,
             attributes___http___response___status_code AS status
      FROM delta_scan('s3://your-bucket/timefusion/otel_logs_and_spans')
      WHERE project_id = 'your-project'
        AND date = DATE '2026-09-27'
        AND attributes___server___address = 'api.supplier.com'
      ORDER BY timestamp;
  - id: fix
    eyebrow: Fix it
    title: An AI that reads the actual request
    lead: >-
      Not a sampled span or an error string. It investigates on a schedule, answers
      in Slack, opens pull requests with fixes and checks risky changes against
      production before they merge.
    recording: fix.mp4
    poster: ''
    mock: slack
    frame: 'slack / #incidents'
    brief: >-
      Slack: a message from a routine with the root cause, the failing request and a
      PR link. Click through to the PR diff on GitHub. Then a question typed in Slack
      and its answer with a chart. 25-30s.
    link: /docs/ai/
    link_label: AI routines, Slack and CLI
    bullets:
      - title: Routines that investigate while you sleep
        body: On a schedule, it checks for new errors, regressions and anomalies, reads the failing requests and the deploy timeline, and finds the root cause.
      - title: A pull request, not a summary
        body: It opens a PR with the fix and posts the evidence in Slack. You review it with the request in front of you.
      - title: Ask it in Slack
        body: '"Why is checkout slower than yesterday?" Answered from logs, traces, metrics, payloads and deploys, with charts and linked requests.'
      - title: Risky changes caught before they merge
        body: PRs reviewed against live production data. The migration that locks a hot table, the handler that drops a field a partner still sends.
      - title: Your coding agent can use it too
        body: One static binary, one auth, one JSON shape. An MCP server with the full API, and skills for Claude Code and Cursor.
    code_label: sh
    code: |
      # Which service is on fire?
      monoscope facets resource.service.name --top 3

      # One error to anchor the investigation
      ID=$(monoscope logs search 'severity.text=="error"' \
             --service checkout-api --since 1h --first --id-only)

      # The surrounding 5 minutes: every trace, every service touched
      monoscope events context --window 5m --summary \
        --at "$(monoscope events get "$ID" | jq -r .timestamp)"

plans:
  - eyebrow: Monoscope Cloud
    name: Bring nothing
    icon: cloud
    bullets: ["Fully managed, nothing to run", "Usage-based pricing you can predict", "Alerts with the failing request attached", "Ask questions in plain English", "30 days of data retention"]
    price: Free
    price_note: up to 10k events a day. Then $29/month for 20M events, +$1 per 1M after.
    cta: { label: Start for free, href: "https://app.monoscope.tech", tracking: index-pricing-plan, event: SignUp }
  - eyebrow: Monoscope Cloud + your own S3
    name: Bring your own storage
    icon: database
    badge: Popular
    featured: true
    bullets: ["Every event written to your S3-compatible bucket", "Open Delta Lake and Parquet, readable by any tool", "Unlimited data retention at no extra cost", "Query years of data in monoscope, DuckDB or SQL", "Build audit trails for your own customers on it"]
    price: $199
    price_note: per month, includes 100M events, +$1 per 1M after.
    cta: { label: Get started, href: "https://app.monoscope.tech", tracking: index-pricing-plan, event: SignUp }
  - eyebrow: Self-hosted
    name: Bring your own servers
    icon: server
    badge: Open source
    bullets: ["100% open source, AGPL 3.0", "All core features", "Deploy to your own servers", "Data never leaves your network", "Enterprise adds SSO, SLA and priority support"]
    price: Free
    price_note: Community Edition. Enterprise from $500/month.
    cta: { label: View on GitHub, href: "https://github.com/monoscope-tech/monoscope", tracking: index-github-enterprise, event: ViewContent, external: true }
    cta2: { label: Talk to an engineer about Enterprise, href: "https://calendar.app.google/1a4HG5GZYv1sjjZG6", tracking: index-enterprise-demo, event: ScheduleDemo, external: true }

capabilities:
  - icon: align-left
    title: Logs and traces
    details: Search every log with KQL or plain English and jump to the trace it belongs to.
    link: /features/api-logs-and-metrics/
  - icon: bar-chart
    title: Metrics and dashboards
    details: Custom metrics, per-endpoint latency and error rates, on dashboards you can keep as code.
    link: /docs/dashboard/dashboard-pages/dashboard/
  - icon: monitor
    title: Session replay
    details: Watch what the user saw in the session that triggered the error, linked to the request.
    link: /docs/sdks/Javascript/browser/
  - icon: layout
    title: API catalog and docs
    details: Every endpoint, its fields and its live schema, documented from real traffic.
    link: /docs/dashboard/dashboard-pages/endpoints/
  - icon: compass
    title: Monitors and health checks
    details: Synthetic checks on your endpoints and on the APIs you depend on, with assertions.
    link: /docs/dashboard/dashboard-pages/api-tests/
  - icon: radio
    title: Alerts
    details: Slack, PagerDuty, Opsgenie, email or webhooks, with a severity and the failing request attached.
    link: /docs/dashboard/settings-pages/integrations/
  - icon: calendar
    title: Reports
    details: Daily or weekly summaries of new errors, regressions and anomalies, in your inbox.
    link: /docs/dashboard/dashboard-pages/reports/
  - icon: database
    title: Your own S3
    details: Every event in your bucket as Delta Lake and Parquet, with unlimited retention.
    link: /features/byob-s3/

---

```=html
<!-- Static background at top of page only -->
<div class="absolute top-0 left-0 w-full pointer-events-none overflow-hidden" style="z-index: 0; height: 120vh;">
  <div class="hero-gradient-mesh"></div>
</div>

<section class="flex flex-col space-y-32 md:space-y-40 items-center relative" style="z-index: 1;">
  <section class="space-y-12 mt-10 sm:mt-24 w-full flex flex-col items-center">
      <div class="grid md:grid-cols-[3fr_2fr] max-w-8xl w-full gap-8 md:gap-16 px-3 items-end">
        <div class="space-y-5">
          <p class="font-mono text-xs uppercase tracking-wider text-textBrand">Open-source observability + AI SRE</p>
          <h1 class="text-5xl md:text-7xl font-medium tracking-tight leading-[1.05] text-balance text-textStrong">Know what happened.<br class="hidden md:block"> <span class="text-textDisabled dark:text-textWeak">Prove it. Fix it.</span></h1>
        </div>
        <div class="space-y-5 md:pb-2">
          <p class="text-lg md:text-xl leading-normal text-textWeak text-pretty">Every request and response, yours and your suppliers', kept unsampled in your own bucket. An AI that reads that record and writes the fix.</p>
          <div class="flex flex-wrap items-center gap-4">
            <a href="https://app.monoscope.tech" class="btn py-3 px-6 rounded-xl bg-fillBrand-strong text-textInverse-strong inline-flex items-center gap-2" data-tracking="index-start-trial-1" data-reddit-event="SignUp">Start for free <svg class="h-3 w-3"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
            <a href="https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer" class="text-textStrong underline underline-offset-4 decoration-strokeWeak hover:decoration-strokeStrong" data-tracking="index-playground-1" data-reddit-event="ViewContent">Launch playground</a>
          </div>
          <a class="flex items-center gap-3 text-sm text-textWeak" href="https://www.trustpilot.com/review/apitoolkit.io" target="_blank" rel="noopener noreferrer">
            <img src="/assets/img/trustpilot-stars-4.5.svg" class="w-24" alt="Monoscope Trustpilot Rating" />
            <span>Free up to 10k events a day. AGPL, self-hostable.</span>
          </a>
        </div>
      </div>

      <!-- Hero tabs: one recording per chapter -->
      <div class="max-w-8xl w-full px-3">
        <div class="tabs tabs-outline gap-1 [&>.tab]:rounded-lg [&>.tab]:px-4 [&>.tab]:py-2 [&>.tab]:text-sm [&>.tab]:font-medium [&>.tab]:text-textWeak [&>.tab:hover]:text-textStrong [&>.tab]:transition-colors">
          {% for s in this.frontmatter.sections %}
          <input type="radio" name="hero_tabs" role="tab" class="tab" aria-label="0{{forloop.index}}  {{s.eyebrow}}" {% if forloop.first %}checked{% endif %} />
          <div role="tabpanel" class="tab-content pt-4 w-full">
          <div class="rounded-xl border border-strokeWeak bg-fillWeak overflow-hidden shadow-lg">
            <div class="flex items-center gap-2 px-4 py-2.5 border-b border-strokeWeak">
              <span class="flex gap-1.5"><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i></span>
              <span class="font-mono text-xs text-textDisabled">{{s.frame}}</span>
            </div>
            <div class="rec relative aspect-video bg-fillWeak [&.rec-missing>.rec-brief]:flex [&.rec-missing>.rec-mock]:flex">
              <video autoplay muted loop playsinline preload="metadata" {% if s.poster != '' %}poster="{{s.poster}}"{% endif %} class="w-full h-full object-cover object-top">
                <source src="/assets/videos/{{s.recording}}" type="video/mp4" onerror="this.closest('.rec').classList.add('rec-missing')">
              </video>
              {% if s.mock == 'slack' %}
              <div class="rec-mock hidden absolute inset-0 items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,var(--color-fillBrand-weak),transparent_70%)]">
                <div class="w-full max-w-md rounded-xl border border-strokeWeak bg-bgBase shadow-lg p-4 space-y-3 text-start text-sm">
                  <div class="flex items-center gap-2">
                    <img src="/assets/img/logo_mini.svg" alt="" class="w-6 h-6 rounded-md">
                    <span class="font-semibold text-textStrong">monoscope</span>
                    <span class="text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-fillWeak text-textWeak">app</span>
                    <span class="text-xs text-textDisabled ms-auto tabular-nums">06:12</span>
                  </div>
                  <p class="text-textStrong"><span class="font-semibold">Nightly checkout routine:</span> 3.1% of <code class="font-mono text-xs bg-fillWeak px-1 rounded">POST /api/checkout</code> failed since deploy <code class="font-mono text-xs bg-fillWeak px-1 rounded">a91f3c2</code>.</p>
                  <p class="text-textWeak"><span class="text-textStrong">Root cause:</span> the payment provider now returns <code class="font-mono text-xs bg-fillWeak px-1 rounded">status</code> as an object. The handler still calls <code class="font-mono text-xs bg-fillWeak px-1 rounded">.toLowerCase()</code> on it.</p>
                  <div class="flex flex-wrap gap-2 pt-1">
                    <span class="inline-flex items-center gap-1 rounded-md border border-strokeWeak px-2.5 py-1 text-xs text-textStrong">Failing request</span>
                    <span class="inline-flex items-center gap-1 rounded-md bg-fillBrand-strong text-textInverse-strong px-2.5 py-1 text-xs">PR #482: handle object status</span>
                  </div>
                </div>
              </div>
              {% endif %}
              <div class="rec-brief hidden absolute bottom-3 end-3 items-center gap-2 rounded-md border border-strokeWeak bg-bgBase/90 backdrop-blur px-2.5 py-1.5 text-xs text-textWeak max-w-xs">
                <svg class="h-3.5 w-3.5 text-iconBrand shrink-0"><use xlink:href="/assets/deps/sprite.svg#monitor"></use></svg>
                <span class="font-mono text-textDisabled">{{s.recording}}</span>
              </div>
            </div>
          </div>
          </div>
          {% endfor %}
        </div>
      </div>

      <!-- Proof strip -->
      <div class="max-w-8xl w-full px-3">
        <div class="grid grid-cols-4 sm:grid-cols-8 gap-px bg-strokeWeak border border-strokeWeak rounded-t-xl overflow-hidden *:bg-bgBase *:p-5 *:flex *:items-center *:justify-center [&_img]:h-5 [&_img]:sm:h-7 [&_img]:brightness-0 [&_img]:dark:invert [&_img]:opacity-60">
          {% assign customers = "andela.svg,partna.svg,grovepay.svg,sameday.svg,platnova.png,payfonte.svg,thepeer.svg,blockradar-full.svg" | split: "," %}
          {% for logo in customers %}<div><img src="/assets/img/customers/{{logo}}" alt="{{logo}}"></div>{% endfor %}
        </div>
        <div class="grid sm:grid-cols-3 gap-px bg-strokeWeak border border-t-0 border-strokeWeak overflow-hidden *:bg-bgBase *:p-5 text-textWeak">
          <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">5,000+</span><br/>developers</div>
          <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">20x</span><br/>faster MTTR at Blockradar</div>
          <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">780+</span><br/>OpenTelemetry integrations</div>
        </div>
        <div class="grid md:grid-cols-2 gap-px bg-strokeWeak border border-t-0 border-strokeWeak rounded-b-xl overflow-hidden *:bg-bgBase *:p-5 text-textWeak">
          {% assign reviews = "sebastian_zwach.jpeg|Sebastian Zwach|Founder of Neorent GmbH|Easy onboarding and they added an integration just for our use case, thanks again! We didn't have insights into our API load before and this helps very much.;joshua.jpeg|Joshua Chinemezum|CEO of Platnova|We had a major incident, and our tech support could see via APItoolkit which third-party integration partner was responsible, and could take action without needing the engineering team's help." | split: ";" %}
          {% for r in reviews %}{% assign f = r | split: "|" %}
          <figure class="flex flex-col gap-4">
            <a href="https://www.trustpilot.com/review/apitoolkit.io" target="_blank" rel="noopener noreferrer" class="inline-flex gap-0.5 w-fit" aria-label="Five-star review on Trustpilot">{% for i in (1..5) %}<svg class="h-4 w-4 text-[#00b67a]"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg>{% endfor %}</a>
            <blockquote class="text-textStrong text-pretty flex-1">"{{f[3]}}"</blockquote>
            <figcaption class="flex gap-3 items-center text-sm">
              <img class="rounded-lg grayscale w-9 h-9 object-cover" src="/assets/img/love/{{f[0]}}" alt="{{f[1]}}" />
              <span><span class="text-textStrong">{{f[1]}}</span>, {{f[2]}}</span>
            </figcaption>
          </figure>
          {% endfor %}
        </div>
      </div>
    </section>

    <!-- Problem -->
    <div class="max-w-8xl px-3 w-full">
      <div class="grid md:grid-cols-2 gap-6 md:gap-16 items-start">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Agents ship faster than you can watch.</h2>
        <p class="text-xl leading-normal text-textWeak text-pretty md:pt-2">AI agents let a five-person team ship what took twenty. More code, more APIs touched, and nobody hired to watch them. An AI can only debug what was kept.</p>
      </div>
    </div>

    {% for s in this.frontmatter.sections %}
    <section id="{{s.id}}" class="max-w-8xl px-3 w-full space-y-10 scroll-mt-24">
      <div class="space-y-4 max-w-3xl">
        <p class="font-mono text-xs uppercase tracking-wider text-textBrand">0{{forloop.index}} · {{s.eyebrow}}</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">{{s.title}}</h2>
        <p class="text-xl leading-normal text-textWeak text-pretty">{{s.lead}}</p>
      </div>
      <div class="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start">
        <div class="space-y-6">
          <div class="rounded-xl border border-strokeWeak bg-fillWeak overflow-hidden shadow-lg">
            <div class="flex items-center gap-2 px-4 py-2.5 border-b border-strokeWeak">
              <span class="flex gap-1.5"><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i></span>
              <span class="font-mono text-xs text-textDisabled">{{s.frame}}</span>
            </div>
            <div class="rec relative aspect-video bg-fillWeak [&.rec-missing>.rec-brief]:flex [&.rec-missing>.rec-mock]:flex">
              <video autoplay muted loop playsinline preload="metadata" {% if s.poster != '' %}poster="{{s.poster}}"{% endif %} class="w-full h-full object-cover object-top">
                <source src="/assets/videos/{{s.recording}}" type="video/mp4" onerror="this.closest('.rec').classList.add('rec-missing')">
              </video>
              {% if s.mock == 'slack' %}
              <div class="rec-mock hidden absolute inset-0 items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,var(--color-fillBrand-weak),transparent_70%)]">
                <div class="w-full max-w-md rounded-xl border border-strokeWeak bg-bgBase shadow-lg p-4 space-y-3 text-start text-sm">
                  <div class="flex items-center gap-2">
                    <img src="/assets/img/logo_mini.svg" alt="" class="w-6 h-6 rounded-md">
                    <span class="font-semibold text-textStrong">monoscope</span>
                    <span class="text-[10px] font-medium uppercase tracking-wide px-1.5 py-0.5 rounded bg-fillWeak text-textWeak">app</span>
                    <span class="text-xs text-textDisabled ms-auto tabular-nums">06:12</span>
                  </div>
                  <p class="text-textStrong"><span class="font-semibold">Nightly checkout routine:</span> 3.1% of <code class="font-mono text-xs bg-fillWeak px-1 rounded">POST /api/checkout</code> failed since deploy <code class="font-mono text-xs bg-fillWeak px-1 rounded">a91f3c2</code>.</p>
                  <p class="text-textWeak"><span class="text-textStrong">Root cause:</span> the payment provider now returns <code class="font-mono text-xs bg-fillWeak px-1 rounded">status</code> as an object. The handler still calls <code class="font-mono text-xs bg-fillWeak px-1 rounded">.toLowerCase()</code> on it.</p>
                  <div class="flex flex-wrap gap-2 pt-1">
                    <span class="inline-flex items-center gap-1 rounded-md border border-strokeWeak px-2.5 py-1 text-xs text-textStrong">Failing request</span>
                    <span class="inline-flex items-center gap-1 rounded-md bg-fillBrand-strong text-textInverse-strong px-2.5 py-1 text-xs">PR #482: handle object status</span>
                  </div>
                </div>
              </div>
              {% endif %}
              <div class="rec-brief hidden absolute bottom-3 end-3 items-center gap-2 rounded-md border border-strokeWeak bg-bgBase/90 backdrop-blur px-2.5 py-1.5 text-xs text-textWeak max-w-xs">
                <svg class="h-3.5 w-3.5 text-iconBrand shrink-0"><use xlink:href="/assets/deps/sprite.svg#monitor"></use></svg>
                <span class="font-mono text-textDisabled">{{s.recording}}</span>
              </div>
            </div>
          </div>
          {% if s.code %}
          <div class="rounded-xl overflow-hidden border border-white/10 bg-[oklch(18%_0.02_263)] [&_code]:bg-transparent! [&_code]:p-0! [&_code]:text-inherit!">
            <p class="px-5 py-2 text-xs font-mono text-white/50 border-b border-white/10">{{s.code_label}}</p>
            <pre class="p-5 text-sm leading-relaxed overflow-x-auto font-mono text-white/90"><code>{{s.code}}</code></pre>
          </div>
          {% endif %}
        </div>
        <div class="space-y-6">
          <div class="divide-y divide-strokeWeak">
            {% for b in s.bullets %}
            <div class="py-4 space-y-1">
              <h3 class="text-base font-semibold text-textStrong">{{b.title}}</h3>
              <p class="text-sm leading-relaxed text-textWeak">{{b.body}}</p>
            </div>
            {% endfor %}
          </div>
          <a href="{{s.link}}" class="btn btn-secondary py-2.5 px-5 rounded-lg inline-flex items-center gap-2">{{s.link_label}} <svg class="h-3 w-3"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
        </div>
      </div>
    </section>
    {% endfor %}

    <div class="max-w-8xl px-3 w-full space-y-6">
      <p class="text-2xl leading-normal text-textStrong max-w-2xl">See it on your own traffic. Free up to 10k events a day.</p>
      <div class="flex flex-wrap gap-3 sm:gap-4">
        <a href="https://app.monoscope.tech" class="btn py-3 px-6 rounded-xl bg-fillBrand-strong text-textInverse-strong" data-tracking="index-start-trial-3" data-reddit-event="SignUp">Start for free</a>
        <a href="https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer" class="btn btn-secondary py-3 px-6 rounded-xl" data-tracking="index-playground-3" data-reddit-event="ViewContent">Launch playground</a>
      </div>
    </div>

    <!-- CAPABILITIES -->
    <div class="max-w-8xl px-3 w-full space-y-8">
      <div class="space-y-4 max-w-3xl">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Everything else you'd expect</h2>
        <p class="text-xl leading-normal text-textWeak text-pretty">The rest of the observability toolbox, so you don't need a second tool.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {% for c in this.frontmatter.capabilities %}
        <a href="{{c.link}}" class="group rounded-xl border border-strokeWeak p-5 flex flex-col gap-3 hover:border-strokeBrand-strong hover:bg-fillWeaker transition-colors">
          <span class="inline-flex p-2 rounded-lg bg-fillBrand-weak w-fit"><svg class="w-5 h-5 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#{{c.icon}}"></use></svg></span>
          <h3 class="text-base font-semibold text-textStrong">{{c.title}}</h3>
          <p class="text-sm leading-relaxed text-textWeak flex-1">{{c.details}}</p>
          <span class="text-sm text-textBrand group-hover:underline underline-offset-2">Learn more</span>
        </a>
        {% endfor %}
      </div>
    </div>

    <!-- DEPLOYMENT OPTIONS -->
    <div id="pricing" class="max-w-8xl px-3 w-full space-y-8 scroll-mt-24">
      <div class="space-y-4 max-w-3xl">
        <p class="text-sm font-medium uppercase tracking-wide text-textBrand">Pricing</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Pay per event, not per host</h2>
        <p class="text-xl leading-normal text-textWeak text-pretty">One price for requests, logs and spans. No host fees, no SKUs, and no sampling to make the bill fit.</p>
      </div>

      <!-- Bill estimate -->
      <div id="bill" class="rounded-2xl border border-strokeWeak bg-fillWeaker overflow-hidden">
        <div class="p-6 md:p-8 border-b border-strokeWeak flex flex-col md:flex-row md:items-end gap-6">
          <div class="flex-1 space-y-3">
            <label for="bill_events" class="text-sm text-textWeak">Events per month <span class="text-textDisabled">(requests, logs and spans)</span></label>
            <input id="bill_events" type="range" min="10" max="1000" step="10" value="100" class="range range-sm w-full" aria-describedby="bill_note">
            <div class="flex justify-between text-xs text-textDisabled tabular-nums"><span>10M</span><span>500M</span><span>1B</span></div>
          </div>
          <p class="text-4xl font-medium tracking-tight tabular-nums text-textStrong md:pb-5"><span id="bill_events_label">100M</span> <span class="text-base font-normal text-textWeak">events</span></p>
        </div>
        <div class="p-6 md:p-8 space-y-5" id="bill_rows">
          <div class="grid grid-cols-[9rem_1fr] md:grid-cols-[12rem_1fr] gap-4 items-center" data-vendor="datadog">
            <span class="text-textStrong">Datadog</span>
            <div class="space-y-1.5"><div class="h-2 rounded-full bg-fillWeak"><div class="bar h-2 rounded-full bg-textDisabled"></div></div><p class="text-sm text-textWeak">approx. <span class="amount text-textStrong tabular-nums"></span> per month <span class="ratio text-textDisabled"></span></p></div>
          </div>
          <div class="grid grid-cols-[9rem_1fr] md:grid-cols-[12rem_1fr] gap-4 items-center" data-vendor="sentry">
            <span class="text-textStrong">Sentry</span>
            <div class="space-y-1.5"><div class="h-2 rounded-full bg-fillWeak"><div class="bar h-2 rounded-full bg-textDisabled"></div></div><p class="text-sm text-textWeak">approx. <span class="amount text-textStrong tabular-nums"></span> per month <span class="ratio text-textDisabled"></span></p></div>
          </div>
          <div class="grid grid-cols-[9rem_1fr] md:grid-cols-[12rem_1fr] gap-4 items-center" data-vendor="mono">
            <span class="text-textStrong">monoscope Cloud</span>
            <div class="space-y-1.5"><div class="h-2 rounded-full bg-fillWeak"><div class="bar h-2 rounded-full bg-fillBrand-strong"></div></div><p class="text-sm text-textWeak"><span class="amount text-textStrong tabular-nums"></span> per month, 30-day retention</p></div>
          </div>
          <div class="grid grid-cols-[9rem_1fr] md:grid-cols-[12rem_1fr] gap-4 items-center" data-vendor="monos3">
            <span class="text-textStrong">monoscope + your own S3</span>
            <div class="space-y-1.5"><div class="h-2 rounded-full bg-fillWeak"><div class="bar h-2 rounded-full bg-fillBrand-strong"></div></div><p class="text-sm text-textWeak"><span class="amount text-textStrong tabular-nums"></span> per month, unlimited retention</p></div>
          </div>
        </div>
        <p id="bill_note" class="px-6 md:px-8 pb-6 text-xs leading-relaxed text-textDisabled text-pretty">Estimates from public list prices, September 2026, annual billing where offered. Assumes an average event size of 1 kB and 30-day retention. Datadog: $0.10 per ingested GB plus $2.50 per million indexed logs or spans at 30-day retention; host fees not included. Sentry: Team plan $26 plus $1.60 per million spans beyond 5M; errors and replays billed separately. monoscope: Cloud is free up to 10k events a day, then $29 for 20M events and $1 per million after; Cloud + your own S3 is $199 for 100M events and $1 per million after.</p>
      </div>
      <script>
      (function () {
        const el = document.getElementById('bill_events'); if (!el) return;
        const fmt = n => '$' + Math.round(n).toLocaleString('en-US');
        const price = {
          datadog: m => m * 2.50 + m * 0.10,
          sentry:  m => 26 + Math.max(0, m - 5) * 1.60,
          mono:    m => 29 + Math.max(0, m - 20),
          monos3:  m => 199 + Math.max(0, m - 100),
        };
        function render() {
          const m = +el.value;
          document.getElementById('bill_events_label').textContent = m >= 1000 ? '1B' : m + 'M';
          const cost = Object.fromEntries(Object.entries(price).map(([k, f]) => [k, f(m)]));
          const max = Math.max(...Object.values(cost));
          document.querySelectorAll('#bill_rows [data-vendor]').forEach(row => {
            const k = row.dataset.vendor, c = cost[k];
            row.querySelector('.bar').style.width = Math.max(1.5, c / max * 100) + '%';
            row.querySelector('.amount').textContent = fmt(c);
            const r = row.querySelector('.ratio'); if (r) r.textContent = '· ' + (c / cost.mono).toFixed(1) + '× monoscope Cloud';
          });
        }
        el.addEventListener('input', render); render();
      })();
      </script>
      <div class="grid lg:grid-cols-3 gap-6">
        {% for pl in this.frontmatter.plans %}
        <div class="relative rounded-2xl border p-8 flex flex-col gap-8 {% if pl.featured %}border-strokeBrand-strong bg-fillBrand-weak shadow-[0_24px_64px_-32px_rgba(0,104,255,0.45)]{% else %}border-strokeWeak bg-fillWeaker{% endif %}">
          {% if pl.badge %}<span class="absolute -top-3 start-8 rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide {% if pl.featured %}bg-fillBrand-strong text-textInverse-strong{% else %}bg-bgBase border border-strokeWeak text-textWeak{% endif %}">{{pl.badge}}</span>{% endif %}
          <div class="space-y-5">
            <span class="inline-flex p-2.5 rounded-lg bg-fillBrand-weak"><svg class="w-5 h-5 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#{{pl.icon}}"></use></svg></span>
            <div class="space-y-1">
              <p class="text-xs font-medium text-textWeak uppercase tracking-wide">{{pl.eyebrow}}</p>
              <h3 class="text-2xl font-semibold tracking-tight text-textStrong">{{pl.name}}</h3>
            </div>
          </div>
          <ul class="space-y-2.5 text-base text-textWeak list-disc list-outside ps-5 marker:text-iconBrand flex-1">
            {% for b in pl.bullets %}<li>{{b}}</li>{% endfor %}
          </ul>
          <div class="border-t border-strokeWeak pt-6 space-y-5">
            <div class="space-y-1">
              <p class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">{{pl.price}}</p>
              <p class="text-sm leading-snug text-textWeak text-pretty">{{pl.price_note}}</p>
            </div>
            <div class="flex flex-col gap-2">
              <a href="{{pl.cta.href}}" {% if pl.cta.external %}target="_blank" rel="noopener noreferrer"{% endif %} class="btn w-full py-3 px-6 rounded-lg bg-fillBrand-strong text-textInverse-strong font-medium" data-tracking="{{pl.cta.tracking}}" data-reddit-event="{{pl.cta.event}}">{{pl.cta.label}}</a>
              {% if pl.cta2 %}<a href="{{pl.cta2.href}}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary w-full py-3 px-6 rounded-lg font-medium" data-tracking="{{pl.cta2.tracking}}" data-reddit-event="{{pl.cta2.event}}">{{pl.cta2.label}}</a>{% endif %}
            </div>
          </div>
        </div>
        {% endfor %}
      </div>
    </div>

    <!-- INTEGRATIONS-->
    <div class="text-textWeak space-y-5 w-full flex flex-col items-center justify-center">
      <div class="max-w-8xl px-3 w-full space-y-5">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">780+ integrations, <span class="text-textDisabled">powered by OpenTelemetry</span></h2>
        <p class="text-xl leading-normal text-textWeak text-pretty max-w-2xl">Native SDKs for 17+ frameworks, and anything that speaks OTel: databases, queues, proxies, clouds.</p>
        <a href="/docs/sdks/" class="inline-block text-textBrand underline underline-offset-2">View all integrations</a>
      </div>
      <div class="space-y-5 pt-5 mask-edges">
        <div class="flex w-full overflow-x-hidden gap-5  max-w-screen
          [&_img]:w-full
          [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
          [&>div>*]:border [&>div>*]:border-strokeWeak">
          {% assign icons = "postgresql.png,cloudflare.png,mongodb.png,azure-1.png,mysql.png,nginx.png,redis.png,elasticsearch.png,google-cloud.png,apache-kafka.png,kubernetes.png,prometheus-app.png,haproxy-icon.svg,docker.png" | split: "," %}
          <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5">
            {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}"/></div>{% endfor %}
          </div>
          <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5" aria-hidden="true" >
            {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}"/></div>{% endfor %}
          </div>
        </div>
        <div class="flex w-full overflow-x-hidden gap-5  max-w-screen
          [&_img]:w-full
          [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
          [&>div>*]:border [&>div>*]:border-strokeWeak">
          {% assign icons = "statsd-receiver.png,solacereceiver.jpg,zipkin-logo.png,snowflake.png,skywalking.jpg,riak-logo.png,huawei-icon.svg,apache_zookeeper-icon.svg,rabbitmq-icon.svg,podmanio-icon.svg,apache_couchdb-icon.svg,influxdata-icon.svg,jaegertracingio-icon.svg,oracle-icon.svg,memcached-icon.svg,signalfx-icon.svg" | split: "," %}
          <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none animation-reverse  whitespace-nowrap flex w-max shrink-0 gap-5">
            {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}"/></div>{% endfor %}
          </div>
          <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none animation-reverse whitespace-nowrap flex w-max shrink-0 gap-5" aria-hidden="true" >
            {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}"/></div>{% endfor %}
          </div>
        </div>
        <div class=" flex w-full overflow-x-hidden gap-5  max-w-screen
          [&_img]:w-full
          [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
          [&>div>*]:border [&>div>*]:border-strokeWeak">
          {% assign icons = "splunk-icon.svg,alibabacloud-icon.svg,apache_cassandra-icon.svg,logicmonitor-icon.svg,sematext-icon.svg,sentryio-icon.svg,tencent-logo.png,pulsar-logo.png,clickhouse-logo.png,coralognix.png,statsd-receiver.png,solacereceiver.jpg,zipkin-logo.png" | split: "," %}
          <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5">
            {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}"/></div>{% endfor %}
          </div>
          <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5" aria-hidden="true" >
            {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}"/></div>{% endfor %}
          </div>
        </div>
      </div>

    </div>

    <!-- REAL RESULTS FROM CUSTOMERS -->
    <div id="results" class="max-w-8xl px-3 w-full space-y-8">
      <div class="space-y-4 max-w-3xl">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Real results for <span class="text-textDisabled">real companies</span></h2>
        <a href="https://www.trustpilot.com/review/apitoolkit.io" target="_blank" rel="noopener noreferrer" class="inline-block text-textBrand underline underline-offset-2">View all reviews</a>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-strokeWeak border border-strokeWeak rounded-xl overflow-hidden *:bg-bgBase *:p-5 *:flex *:flex-col *:gap-5 *:justify-between">
        {% for t in this.frontmatter.testimonials %}{% if t.stat %}
        <div>
          <div class="space-y-1"><p class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">{{t.stat}}</p><p class="text-sm leading-snug text-textWeak text-pretty">{{t.desc}}</p></div>
          <img class="h-5 w-auto self-start brightness-0 dark:invert opacity-60" src="/assets/img/customers/{{t.logo}}" alt="">
        </div>
        {% endif %}{% endfor %}
      </div>
      <div class="grid md:grid-cols-3 gap-4">
        {% for t in this.frontmatter.testimonials %}{% unless t.stat %}
        <figure class="rounded-xl border border-strokeWeak p-6 flex flex-col gap-6">
          <blockquote class="text-base leading-relaxed text-textStrong text-pretty flex-1">{{t.quote}}</blockquote>
          <figcaption class="flex items-center gap-3 text-sm">
            <img class="rounded-lg grayscale w-10 h-10 object-cover" src="/assets/img/love/{{t.photo}}" alt="{{t.name}}">
            <div><p class="text-textStrong">{{t.name}}</p><p class="text-xs text-textWeak">{{t.title}}</p></div>
          </figcaption>
        </figure>
        {% endunless %}{% endfor %}
      </div>
    </div>
</section>

```
