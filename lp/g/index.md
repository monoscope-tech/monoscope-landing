---
title: "G: Homepage + why AI fails + side by side"
noindex: true
description: Open-source observability where every issue comes with the exact request behind it, the response, the trace and what the customer saw, and an AI that opens the fix. Free to start.
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
  - quote: "We had a major upgrade planned for our iOS/Android app... After adding monoscope to our laravel app, we could see every new route and request. It gave me and the dev team complete confidence that our users weren’t being affected by our changes. <br/><br/>... became the smoothest and LEAST STRESSFUL rollouts we have ever done. Really an amazing tool and now a permanent part of our workflow. Thank you!!"
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
  - quote: "I fell for monoscope because it integrated effortlessly with my application and provided valuable API insights. Whenever I needed help, the team was always ready to listen and resolve any issues. That’s why we pay for their service."
    photo: david_odohi.jpeg
    name: Odohi David
    title: CTO of Grovepay
    logo: grovepay.svg

sections:
  - id: know
    icon: eye
    tone: brand
    art: know-observatory.webp
    eyebrow: Know what happened
    title: Every error, with the exact request behind it
    lead: >-
      Errors, crashes and breaking API changes, each with the request and response
      that caused it. Logs, traces, metrics and session replay sit next to it, linked.
    demo: /assets/demos/know.html
    frame: app.monoscope.tech / issues
    brief: >-
      Issues list. Open an issue, then the request that triggered it: headers, body,
      response, trace. Click through to the log line and the session replay. 25-30s.
    link: /features/error-tracking/
    link_label: Error tracking
    bullets:
      - title: Every error comes with its request
        body: Errors and slow endpoints, grouped into issues, each with the full request and response as they were.
      - title: Breaking changes, yours and your suppliers’
        body: A field removed, renamed or retyped, in your endpoints or a third-party API, flagged with the request that revealed it.
      - title: Watch what the customer did before the error
        body: Session replay is linked to the failing request. Scrub to the click, see the toast they saw, and the exact request it fired.
  - id: prove
    icon: database
    tone: success
    eyebrow: Prove it
    title: What you sent, and what they answered
    lead: >-
      Every request, response, log and span is kept. When a customer or a supplier
      disputes what happened, you have the evidence.
    demo: /assets/demos/prove.html
    frame: app.monoscope.tech / explorer
    brief: >-
      An outgoing request to a supplier API: the request body, the 200 response with
      its acknowledgement body, the timestamp. End on the share link. 20-25s.
    link: /features/byob-s3/
    link_label: Your own S3
    bullets:
      - title: The receipt
        body: What you sent, what the supplier answered and when, to the millisecond. One customer used it in court against a supplier that acknowledged requests and never acted on them.
      - title: Share any request with a link
        body: Send the exact request and response to the partner or the customer instead of describing it.
      - title: Your bucket is the database
        body: Add your own S3 bucket ($199/month) and everything lands there as Delta Lake tables. Unlimited retention. Query it with DuckDB, Spark or SQL.
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
    icon: code
    tone: warning
    art: fix-archive.webp
    eyebrow: Fix it
    title: An AI that reads the actual request
    lead: >-
      Not a sampled span or an error string. It investigates on a schedule, answers
      in Slack, opens pull requests with fixes and checks risky changes against
      production before they merge.
    demo: /assets/demos/fix.html
    frame: app.monoscope.tech / ai / routines
    brief: >-
      Slack: a message from a routine with the root cause, the failing request and a
      PR link. Click through to the PR diff on GitHub. Then a question typed in Slack
      and its answer with a chart. 25-30s.
    link: /docs/ai/
    link_label: AI routines, Slack and CLI
    bullets:
      - title: Routines on your schedule, or on every deploy
        body: Every hour, after each deploy or each morning, a routine checks for new errors, regressions and breaking changes, reads the failing requests and the deploy timeline, and posts the root cause.
      - title: A pull request, not a summary
        body: It opens a PR with the fix and posts the evidence in Slack. You review it with the request in front of you.
      - title: Ask it in Slack
        body: '"Why is checkout slower than yesterday?" Answered from logs, traces, metrics, payloads and deploys, with charts and linked requests.'
      - title: Risky changes caught before they merge
        body: PRs reviewed against live production data. The migration that locks a hot table, the handler that drops a field a partner still sends.
    code_label: Claude Code · monoscope-skills:investigate
    code_class: nohighlight
    code: |
      <span class="block bg-white/10 rounded px-2 py-1 mb-3 text-white"><span class="text-white/50">&gt;</span> investigate why orders have been stuck in processing since this morning</span><span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope facets resource.service.name --top 3)
        <span class="text-white/50">⎿  orders-service 41,208 · checkout-api 18,733 · payments 9,410</span>
      <span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope logs search 'body has "tracking_id"' --since 6h --first --id-only)
        <span class="text-white/50">⎿  evt_01JA7Q3M9X4K2R</span>
      <span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope events context --at 2026-10-07T07:52:14Z --window 10m --summary)
        <span class="text-white/50">⎿  41 traces · orders-service → api.acme-logistics.com · 41 errors in advance()</span>
      <span class="block whitespace-normal mt-3 text-white">● Orders stopped advancing at 07:52, and it isn’t your code. Acme’s <span class="text-[#F2C27B]">POST /v1/shipments</span> still returns 200, but the response no longer includes <span class="text-[#F2C27B]">tracking_id</span>, so <span class="text-[#F2C27B]">advance()</span> throws and 41 orders are stuck. Your last deploy was <span class="text-[#F2C27B]">b7e21c0</span>, two days ago. Want me to open a pull request with a fallback?</span>
  - id: start
    tone: violet
    eyebrow: Get started
    title: Get your data in, or let your agent do it
    lead: monoscope takes OTLP from any OpenTelemetry SDK or collector, across 780+ integrations, and costs one price per event. Here’s how to start and how to switch.

plans:
  - eyebrow: Free
    name: Try it on real traffic
    icon: zap
    bullets:
      [
        "10k events a day",
        "All core features",
        "Unlimited team members",
        "30 days of data retention",
        "No credit card",
      ]
    price: Free
    price_note: up to 10k events a day, forever.
    cta:
      {
        label: Start for free,
        href: "https://app.monoscope.tech",
        tracking: index-pricing-plan,
        event: SignUp,
      }
  - eyebrow: Monoscope Cloud
    name: Bring nothing
    icon: cloud
    featured: true
    bullets:
      [
        "Fully managed, nothing to run",
        "Usage-based pricing you can predict",
        "Alerts with the failing request attached",
        "Ask questions in plain English",
        "30 days of data retention",
      ]
    addon:
      {
        name: "Your own S3 bucket",
        price: "+$199/month",
        note: "Every event written to your bucket as open Delta Lake and Parquet. Unlimited retention, queryable from monoscope, DuckDB or Spark.",
      }
    price: $29
    price_note: 20M events included, +$1 per 1M after. Includes 20M metric datapoints and 2,000 session replays.
    cta:
      {
        label: Get started,
        href: "https://app.monoscope.tech",
        tracking: index-pricing-plan,
        event: SignUp,
      }
  - eyebrow: Self-hosted
    name: Bring your own servers
    icon: server
    badge: Open source
    bullets:
      [
        "100% open source, AGPL 3.0",
        "All core features",
        "Deploy to your own servers",
        "Data never leaves your network",
        "Enterprise adds SSO, SLA and priority support",
      ]
    price: Free
    price_note: Community Edition. Enterprise from $500/month.
    cta:
      {
        label: View on GitHub,
        href: "https://github.com/monoscope-tech/monoscope",
        tracking: index-github-enterprise,
        event: ViewContent,
        external: true,
      }
    cta2:
      {
        label: Talk to an engineer about Enterprise,
        href: "https://calendar.app.google/1a4HG5GZYv1sjjZG6",
        tracking: index-enterprise-demo,
        event: ScheduleDemo,
        external: true,
      }

story:
  - time: "07:52"
    body: A logistics supplier quietly stops sending <code>tracking_id</code>, but its API keeps returning 200 OK, so nothing looks wrong.
  - time: "07:54"
    body: monoscope spots the breaking change two minutes later and posts it in Slack, with all 41 affected requests attached.
  - time: "09:41"
    body: "When an engineer asks what’s going on, monoscope answers from the stored requests and opens PR #491."

agents:
  - title: The monoscope CLI
    body: One binary that gives your terminal, your CI and your agents the same view of production, with stable JSON output for scripts.
    cmd: curl https://monoscope.tech/install.sh | sh
    link: /docs/ai/cli/
  - title: Claude Code skills
    body: Skills for investigating incidents, on-call triage, managing monitors and dashboards, and adding instrumentation.
    cmd: |
      claude plugin marketplace add monoscope-tech/skills
      claude plugin install monoscope-skills@monoscope-skills
    link: /docs/ai/
  - title: A hosted MCP server
    body: About 50 tools for Claude Desktop, Cursor or your own agents, using the same API key, with nothing to install.
    cmd: https://api.monoscope.tech/api/v1/mcp
    link: /docs/ai/mcp/

onboarding:
  - title: With your coding agent
    body: Add the skills and the CLI, then ask your agent to instrument the project. It plans first, covers HTTP, SQL, queues and jobs, and checks every route arrived in monoscope before it says it’s done.
    cmd: |
      npx skills add monoscope-tech/skills
      curl https://monoscope.tech/install.sh | sh
    link: /docs/sdks/
  - title: By hand, in any language
    body: Point any OpenTelemetry exporter at monoscope. Native SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir also capture bodies, with redaction.
    cmd: |
      OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
      OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
      OTEL_SERVICE_NAME="orders-service"
      OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
    link: /docs/sdks/

switching:
  - title: Send your telemetry
    body: Point your OpenTelemetry exporter at monoscope, add our SDK, or let your coding agent set it up.
  - title: Run it side by side
    body: Keep your current tool running for a week or two and compare which errors and API changes each one catches.
  - title: Move your services
    body: Once you’re happy, send the rest of your services over and retire the tools you don’t need anymore.

security:
  - title: GDPR
    body: We’re happy to sign a data processing agreement (DPA) whenever you need one.
  - title: EU data region
    body: If you’d prefer, we can store your data in the EU.
  - title: SSO
    body: Single sign-on and advanced authentication come with Enterprise.
  - title: Redaction
    body: The SDK strips out the headers and body fields you choose, such as <code>$.password</code>, before any data leaves your app.
  - title: Data ownership
    body: With your own S3 bucket, your bucket is the database, so you can query it directly with DuckDB, Spark or SQL.
  - title: Open source
    body: The whole platform is open source on GitHub under AGPL-3.0, so your team can read the code that handles your data.

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
<script src="/assets/js/demo-scene.js" defer></script>
{% assign preloads = "/assets/demos/know.html,/assets/demos/screens/app.css,/assets/demos/screens/issues.html" | split: "," %}
{% for href in preloads %}<link rel="preload" as="fetch" crossorigin href="{{href}}">{% endfor %}

<section class="flex flex-col space-y-32 md:space-y-40 items-center relative" style="z-index: 1;">
  <section class="space-y-12 mt-(--inset) w-full flex flex-col items-center">
    <!-- Dark inset hero: gradient sky, painted horizon anchored below the demo -->
    <div data-theme="dark" class="hero-paint relative panel-w rounded-[2rem] overflow-hidden text-textStrong ring-1 ring-white/10">
    <img src="/assets/img/home/art/hero-horizon.webp" alt="" class="absolute inset-x-0 bottom-0 w-full h-[clamp(14rem,30vw,32rem)] object-cover object-[20%_100%] [mask-image:linear-gradient(to_top,black_55%,transparent)]">
    <div class="relative flex flex-col items-center space-y-12 pt-16 sm:pt-28">
      <div class="grid md:grid-cols-[3fr_2fr] wrap-in gap-8 md:gap-x-16 md:gap-y-5 items-start mb-[clamp(5rem,10vw,12rem)]!">
        <div class="flex flex-col gap-5 md:contents">
          <p class="md:col-start-1 md:row-start-1 font-mono text-[12px] uppercase tracking-wider text-textBrand">Open-source observability + AI SRE</p>
          <h1 class="md:col-start-1 md:row-start-2 text-5xl md:text-7xl font-medium tracking-tight leading-tight text-balance text-textStrong">Know what happened.<br class="hidden md:block"> <span class="text-textDisabled dark:text-textWeak">Prove it. Fix it.</span></h1>
        </div>
        <div class="hero-copy md:col-start-2 md:row-start-2 space-y-6 md:pt-2">
          <p class="text-lg md:text-2xl leading-relaxed text-textWeak text-pretty max-w-[44ch]">Observability data lake and an AI SRE agent, to catch issues and continuously improve production.</p>
          <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="https://app.monoscope.tech" class="btn h-auto min-h-11 py-3 px-6 rounded-xl bg-fillBrand-strong text-textInverse-strong text-base font-medium inline-flex items-center gap-2 whitespace-nowrap" data-tracking="index-start-trial-1" data-reddit-event="SignUp">Start for free <svg class="h-3 w-3" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
            <a href="https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer" class="inline-flex items-center min-h-11 text-base font-medium text-textStrong whitespace-nowrap underline underline-offset-4 [text-decoration-thickness:from-font] decoration-strokeWeak hover:decoration-strokeStrong" data-tracking="index-playground-1" data-reddit-event="ViewContent">Launch playground</a>
          </div>
          <a class="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-relaxed text-textWeak" href="https://www.trustpilot.com/review/apitoolkit.io" target="_blank" rel="noopener noreferrer">
            <img src="/assets/img/trustpilot-stars-4.5.svg" class="w-20 sm:w-24 shrink-0 mt-1" alt="Monoscope Trustpilot Rating" />
            <span class="whitespace-nowrap">Free 10k events/day.</span>
          </a>
        </div>
      </div>

      <!-- Hero demos: segmented tabs on the frame’s top edge; the active pill fills as its demo plays, then advances -->
      <div class="wrap-in pb-20 sm:pb-40" data-hero-tabs>
        <div role="tablist" aria-label="Product demos" class="relative z-10 mx-auto -mb-6 sm:-mb-7 w-fit flex items-center gap-1 rounded-xl border border-white/10 bg-[oklch(15%_0.02_285/0.92)] backdrop-blur p-1.5 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.8)]">
          {% for s in this.frontmatter.sections %}{% if s.demo %}{% unless forloop.first %}<span aria-hidden="true" class="w-px h-5 bg-white/15"></span>{% endunless %}
          <button type="button" role="tab" id="hero-tab-{{s.id}}" aria-controls="hero-demo-{{s.id}}" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}" {% unless forloop.first %}tabindex="-1"{% endunless %} class="group tone-{{s.tone}} relative overflow-hidden flex items-center gap-2 rounded-lg px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white/60 hover:text-white transition-colors aria-selected:text-(--tone) aria-selected:bg-[color-mix(in_oklab,var(--tone-fill)_14%,transparent)]">
            <span data-fill aria-hidden="true" class="hidden group-aria-selected:block absolute inset-y-0 left-0 w-0 bg-[color-mix(in_oklab,var(--tone-fill)_45%,transparent)]"></span>
            <svg class="relative w-4 h-4 sm:w-5 sm:h-5"><use xlink:href="/assets/deps/sprite.svg#{{s.icon}}"></use></svg><span class="relative">{{ s.eyebrow | split: " " | first }}</span>
          </button>
          {% endif %}{% endfor %}
        </div>
        {% for s in this.frontmatter.sections %}{% if s.demo %}
        <div role="tabpanel" id="hero-demo-{{s.id}}" aria-labelledby="hero-tab-{{s.id}}" {% unless forloop.first %}hidden{% endunless %} class="rounded-xl border border-strokeWeak bg-bgRaised overflow-hidden shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]">
          <div class="flex items-center gap-2 px-4 py-2.5 border-b border-strokeWeak">
            <span class="flex gap-1.5"><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i></span>
            <span class="font-mono text-xs text-textDisabled">{{s.frame}}</span>
          </div>
          <div class="relative aspect-video bg-fillWeak"><demo-scene src="{{s.demo}}" class="absolute inset-0"></demo-scene></div>
        </div>
        {% endif %}{% endfor %}
        <script>
        (() => {
          const root = document.querySelector('[data-hero-tabs]'), tabs = [...root.querySelectorAll('[role=tab]')];
          const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
          let cur = 0;
          const select = (i, focus) => {
            cur = (i + tabs.length) % tabs.length;
            tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === cur); t.tabIndex = k === cur ? 0 : -1; panels[k].hidden = k !== cur; });
            if (focus) tabs[cur].focus();
          };
          tabs.forEach((t, k) => {
            const fill = t.querySelector('[data-fill]'), demo = panels[k].querySelector('demo-scene');
            t.addEventListener('click', () => select(k));
            demo.addEventListener('progress', e => { fill.style.width = e.detail * 100 + '%'; });
            demo.addEventListener('loop', () => { fill.style.width = '0'; if (k === cur) select(k + 1); });
          });
          root.querySelector('[role=tablist]').addEventListener('keydown', e => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); select(cur + d, true); } });
        })();
        </script>
      </div>

      <div class="w-full grid grid-cols-4 sm:grid-cols-8 gap-px bg-white/10 border-t border-white/10 *:bg-black/35 *:backdrop-blur-sm *:p-5 *:flex *:items-center *:justify-center [&_img]:h-5 [&_img]:sm:h-7 [&_img]:brightness-0 [&_img]:invert [&_img]:opacity-70">
          {% assign customers = "Andela|andela.svg,Partna|partna.svg,Grovepay|grovepay.svg,Sameday|sameday.svg,Platnova|platnova.png,Payfonte|payfonte.svg,Thepeer|thepeer.svg,Blockradar|blockradar-full.svg" | split: "," %}
          {% for c in customers %}{% assign cn = c | split: "|" %}<div><img src="/assets/img/customers/{{cn[1]}}" alt="{{cn[0]}}"></div>{% endfor %}
      </div>
    </div>
    </div>

      <!-- Proof strip -->
      <div class="wrap">
        <div class="grid sm:grid-cols-3 gap-px bg-strokeWeak border border-strokeWeak rounded-t-xl overflow-hidden *:bg-bgBase *:p-5 text-textWeak">
          <div><span class="text-3xl font-medium tracking-tight text-textStrong">Open source</span><br/>AGPL 3.0</div>
          <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">20x</span><br/>faster MTTR at Blockradar</div>
          <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">780+</span><br/>OpenTelemetry integrations</div>
        </div>
        <div class="grid md:grid-cols-2 gap-px bg-strokeWeak border border-t-0 border-strokeWeak rounded-b-xl overflow-hidden *:bg-bgBase *:p-5 text-textWeak">
          {% assign reviews = "sebastian_zwach.jpeg|Sebastian Zwach|Founder of Neorent GmbH|Easy onboarding and they added an integration just for our use case, thanks again! We didn’t have insights into our API load before and this helps very much.;joshua.jpeg|Joshua Chinemezum|CEO of Platnova|We had a major incident, and our tech support could see via APItoolkit which third-party integration partner was responsible, and could take action without needing the engineering team’s help." | split: ";" %}
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


    <section class="tone-brand relative w-full">
      <div aria-hidden="true" class="absolute inset-y-0 left-1/2 -translate-x-1/2 panel-w rounded-[2rem] overflow-hidden bg-(--tone-panel) border border-(--tone-weak)"><img src="/assets/img/home/art/know-observatory.webp" alt="" loading="lazy" class="absolute inset-x-0 bottom-0 w-full h-40 md:h-64 object-cover object-bottom opacity-35 dark:opacity-90 [mask-image:linear-gradient(to_top,black_35%,transparent)]"></div>
      <div class="relative wrap pt-20 md:pt-28 pb-40 md:pb-64 space-y-10">
      <div class="space-y-4 max-w-3xl">
        <p class="inline-flex rounded-md px-2.5 py-1 font-mono text-xs uppercase tracking-wider bg-(--tone-weak) text-(--tone)">Why AI on-call agents fail</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Data. Or lack of it.</h2>
        <p class="max-w-[65ch] text-lg md:text-xl leading-relaxed text-textWeak text-pretty">Scenario: At 07:52 a supplier dropped the <code class="font-mono text-base">tracking_id</code> field and 41 orders got stuck. Here’s what a typical stack kept, and what its AI concluded.</p>
      </div><div class="space-y-20 md:space-y-24"><div class="rounded-2xl border border-strokeWeak overflow-hidden bg-bgBase"><div class="grid md:grid-cols-3 md:grid-rows-[auto_1fr] md:gap-y-4">
        <div class="p-6 flex flex-col gap-4 md:row-span-2 md:grid md:grid-rows-subgrid border-strokeWeak ">
          <h3 class="flex items-baseline gap-3 text-xl font-semibold text-balance text-textStrong"><span class="font-mono text-sm font-bold text-(--tone)">01</span><span class="[&_code]:font-mono [&_code]:text-base [&_code]:font-medium [&_code]:bg-fillWeak dark:[&_code]:bg-white/10 [&_code]:px-1 [&_code]:rounded"><code class="block w-fit mb-1">POST /v1/shipments · 200 · 182 ms</code>No request or response body.</span></h3>
          <div class="rounded-lg bg-fillError-weak px-4 py-3 space-y-1"><p class="text-sm font-medium text-textError">The AI guesses</p><p class="[text-indent:-0.42em] text-base leading-relaxed text-textStrong text-pretty">“The supplier returned 200, so the bug must be in your code.”</p></div>
        </div>
        <div class="p-6 flex flex-col gap-4 md:row-span-2 md:grid md:grid-rows-subgrid border-strokeWeak border-t md:border-t-0 md:border-s">
          <h3 class="flex items-baseline gap-3 text-xl font-semibold text-balance text-textStrong"><span class="font-mono text-sm font-bold text-(--tone)">02</span><span class="[&_code]:font-mono [&_code]:text-base [&_code]:font-medium [&_code]:bg-fillWeak dark:[&_code]:bg-white/10 [&_code]:px-1 [&_code]:rounded">It sees a sample, not all 41</span></h3>
          <div class="rounded-lg bg-fillError-weak px-4 py-3 space-y-1"><p class="text-sm font-medium text-textError">The AI guesses</p><p class="[text-indent:-0.42em] text-base leading-relaxed text-textStrong text-pretty">“A few errors in a sea of 200s. Probably noise.”</p></div>
        </div>
        <div class="p-6 flex flex-col gap-4 md:row-span-2 md:grid md:grid-rows-subgrid border-strokeWeak border-t md:border-t-0 md:border-s">
          <h3 class="flex items-baseline gap-3 text-xl font-semibold text-balance text-textStrong"><span class="font-mono text-sm font-bold text-(--tone)">03</span><span class="[&_code]:font-mono [&_code]:text-base [&_code]:font-medium [&_code]:bg-fillWeak dark:[&_code]:bg-white/10 [&_code]:px-1 [&_code]:rounded">It sees 15 days, not the history</span></h3>
          <div class="rounded-lg bg-fillError-weak px-4 py-3 space-y-1"><p class="text-sm font-medium text-textError">The AI guesses</p><p class="[text-indent:-0.42em] text-base leading-relaxed text-textStrong text-pretty">“This has never happened before.”</p></div>
        </div></div><div class="border-t border-strokeSuccess-weak bg-fillSuccess-weak dark:bg-[color-mix(in_oklab,var(--color-fillSuccess-strong)_13%,var(--color-bgBase))] p-4 md:p-6 grid lg:grid-cols-[3fr_2fr] gap-6 lg:gap-10 items-center">
        <div class="rounded-lg overflow-hidden bg-[oklch(18%_0.02_263)] min-w-0">
          <p class="px-4 py-2 text-sm font-mono text-white/70 border-b border-white/10">Response from api.acme-logistics.com · 07:52:14.208 · kept by monoscope</p>
          <pre class="py-3 text-sm leading-relaxed font-mono text-white/90 overflow-x-auto [&>span]:block [&>span]:px-4"><span><span class="text-white/50">HTTP/1.1</span> 200 OK</span><span>{</span><span>  <span class="text-[#8FB6FF]">"shipment_id"</span>: <span class="text-[#F2C27B]">"shp_7Hk2m9"</span>,</span><span>  <span class="text-[#8FB6FF]">"status"</span>: <span class="text-[#F2C27B]">"acknowledged"</span>,</span><span class="flex! justify-between gap-6 w-max min-w-full! bg-[#E11D5C]/25"><span class="text-[#FFB3C9] line-through decoration-[#FF7FA3]/60">  "tracking_id": "AX-99812-NG",</span><span class="text-[#FF9AB6] whitespace-nowrap">missing since 07:52</span></span><span>  <span class="text-[#8FB6FF]">"eta"</span>: <span class="text-[#F2C27B]">"2026-10-09"</span></span><span>}</span></pre>
        </div>
        <div class="space-y-4">
          <p class="text-sm font-medium text-textSuccess">With monoscope, the AI knows</p>
          <p class="[text-indent:-0.42em] text-xl leading-snug text-textStrong text-pretty [&_code]:font-mono [&_code]:text-lg">“Acme stopped sending <code>tracking_id</code> at 07:52. Your code is fine.”</p>
          <p class="text-base leading-relaxed text-textWeak text-pretty">Monoscope opens a Pull Request for you to review.</p>
          <p class="flex items-center gap-2 text-sm text-textWeak [&_.font-semibold]:text-textStrong"><svg class="w-4 h-4 shrink-0 text-textStrong" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#github"></use></svg><span><span class="font-semibold">PR #491</span> by monoscope · Fall back when <code class="font-mono text-xs">tracking_id</code> is absent</span></p>
        </div>
      </div></div>
      <div class="space-y-6">
        <h3 class="text-2xl md:text-3xl font-medium tracking-tight leading-snug text-balance text-textStrong">Monoscope does this round the clock, while you ship. <span class="text-textWeak">Example routines:</span></h3>
        <div class="flex sm:grid sm:grid-cols-2 sm:grid-rows-[auto_1fr_auto_auto_1fr_auto] lg:grid-cols-4 lg:grid-rows-[auto_1fr_auto] gap-4 overflow-x-auto sm:overflow-visible snap-x pb-2 -mb-2 sm:pb-0 sm:mb-0">
        <div class="snap-start shrink-0 w-[16rem] sm:w-auto rounded-xl border border-strokeWeak bg-bgBase p-5 flex flex-col gap-3 sm:row-span-3 sm:grid sm:grid-rows-subgrid">
          <p class="w-fit rounded-md px-2 py-0.5 font-mono text-sm bg-fillWeak text-textStrong">Every 5 minutes</p>
          <p class="[text-indent:-0.42em] text-base font-medium leading-snug text-textStrong text-pretty flex-1">“Read the new logs and spans. If anything looks wrong, find the cause.”</p>
          <p class="text-sm leading-relaxed text-textWeak text-pretty"><span class="text-textStrong">Then</span> posts the cause in #oncall</p>
        </div>
        <div class="snap-start shrink-0 w-[16rem] sm:w-auto rounded-xl border border-strokeWeak bg-bgBase p-5 flex flex-col gap-3 sm:row-span-3 sm:grid sm:grid-rows-subgrid">
          <p class="w-fit rounded-md px-2 py-0.5 font-mono text-sm bg-fillWeak text-textStrong">After every deploy</p>
          <p class="[text-indent:-0.42em] text-base font-medium leading-snug text-textStrong text-pretty flex-1">“Compare errors, latency and response shapes with the previous version.”</p>
          <p class="text-sm leading-relaxed text-textWeak text-pretty"><span class="text-textStrong">Then</span> replies in the deploy thread</p>
        </div>
        <div class="snap-start shrink-0 w-[16rem] sm:w-auto rounded-xl border border-strokeWeak bg-bgBase p-5 flex flex-col gap-3 sm:row-span-3 sm:grid sm:grid-rows-subgrid">
          <p class="w-fit rounded-md px-2 py-0.5 font-mono text-sm bg-fillWeak text-textStrong">Every hour</p>
          <p class="[text-indent:-0.42em] text-base font-medium leading-snug text-textStrong text-pretty flex-1">“Triage new errors. If the fix is clear, write it.”</p>
          <p class="text-sm leading-relaxed text-textWeak text-pretty"><span class="text-textStrong">Then</span> opens a PR with the fix</p>
        </div>
        <div class="snap-start shrink-0 w-[16rem] sm:w-auto rounded-xl border border-strokeWeak bg-bgBase p-5 flex flex-col gap-3 sm:row-span-3 sm:grid sm:grid-rows-subgrid">
          <p class="w-fit rounded-md px-2 py-0.5 font-mono text-sm bg-fillWeak text-textStrong">Weekdays at 09:00</p>
          <p class="[text-indent:-0.42em] text-base font-medium leading-snug text-textStrong text-pretty flex-1">“Summarize what broke overnight, what’s still open and what’s getting worse.”</p>
          <p class="text-sm leading-relaxed text-textWeak text-pretty"><span class="text-textStrong">Then</span> sends a briefing to Slack</p>
        </div></div>
        <a href="/docs/ai/" class="pt-2 inline-flex items-center gap-2 text-sm font-medium text-textBrand underline underline-offset-4">Read the AI docs <span aria-hidden="true">→</span></a>
      </div></div>
      </div>
    </section>

    <section data-theme="dark" class="tone-brand relative w-full text-textStrong">
      <div aria-hidden="true" class="hero-paint absolute inset-y-0 left-1/2 -translate-x-1/2 panel-w rounded-[2rem] overflow-hidden ring-1 ring-white/10"><img src="/assets/img/home/art/fix-archive.webp" alt="" loading="lazy" class="absolute inset-x-0 bottom-0 w-full h-40 md:h-64 object-cover object-bottom opacity-90 [mask-image:linear-gradient(to_top,black_35%,transparent)]"></div>
      <div class="relative wrap pt-20 md:pt-28 pb-40 md:pb-64 space-y-10">
      <div class="space-y-4 max-w-3xl">
        <p class="inline-flex rounded-md px-2.5 py-1 font-mono text-xs uppercase tracking-wider bg-(--tone-weak) text-(--tone)">Side by side</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong"><span class="text-textWeak">Everyone has an AI now,</span> but only monoscope keeps all the production context.</h2>
        
      </div>
      <div class="space-y-4">
        <div class="overflow-x-auto rounded-2xl bg-bgRaised ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] p-2 md:p-3">
          <table class="w-full min-w-[52rem]! table-fixed border-separate border-spacing-0 text-base text-start">
            <caption class="sr-only">monoscope compared with Datadog, Sentry and AI SRE layers</caption>
            <colgroup><col class="w-40 md:w-72"><col><col><col><col></colgroup>
            <thead><tr><td class="sticky left-0 z-10 bg-bgRaised w-40 md:w-72"></td><th scope="col" class="px-4 pt-5 pb-3 text-start align-bottom font-semibold bg-fillBrand-weak border-x border-x-strokeBrand-strong rounded-t-xl border-t border-t-strokeBrand-strong text-textStrong"><img src="/assets/brand/logo_full_white.svg" alt="monoscope" class="h-5 w-auto"></th><th scope="col" class="px-4 pt-5 pb-3 text-start align-bottom font-semibold text-textWeak">Datadog</th><th scope="col" class="px-4 pt-5 pb-3 text-start align-bottom font-semibold text-textWeak">Sentry</th><th scope="col" class="px-4 pt-5 pb-3 text-start align-bottom font-semibold text-textWeak">AI SRE layers<span class="block font-normal text-textWeak">Polylane, Superlog</span></th></tr></thead>
            <tbody><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-40 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-[15px] leading-snug font-medium text-textStrong text-pretty">Request and response bodies, incoming and outgoing</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span>, every call, never sampled</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Not by default; traces are sampled</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Only what the tool underneath kept</span></span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-40 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-[15px] leading-snug font-medium text-textStrong text-pretty">Breaking changes in APIs you don’t own</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span></span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="text-textWeak" title="Not confirmed in public docs">—<span class="sr-only">Not confirmed</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-40 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-[15px] leading-snug font-medium text-textStrong text-pretty">AI reads the full request and response</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span></span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Not by default</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Only if the tool underneath kept it</span></span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-40 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-[15px] leading-snug font-medium text-textStrong text-pretty">AI that investigates and opens fix PRs</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span>, built in</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Bits AI, priced separately</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Seer, a paid add-on</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span>, on top of Datadog or Sentry</span></span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-40 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-[15px] leading-snug font-medium text-textStrong text-pretty">What you pay for</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><ul class="space-y-1 tabular-nums"><li class="font-semibold text-textSuccess">$1 per million events</li><li>Bodies included</li><li>No host or indexing fees</li><li>Metrics included</li></ul></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><ul class="space-y-1 tabular-nums"><li>$46 per host</li><li>$0.10 per GB of logs ingested</li><li>$2.50 per million logs indexed</li><li>$5 per 100 custom metrics</li><li>$2.65 per 1,000 replays</li></ul></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><ul class="space-y-1 tabular-nums"><li>$26 a month to start</li><li>$0.29 per 1,000 errors</li><li>$1.60 per million spans</li><li>$3.75 per 1,000 replays</li></ul></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><ul class="space-y-1 tabular-nums"><li>Their plan</li><li>plus your Datadog or Sentry bill</li></ul></span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-40 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-[15px] leading-snug font-medium text-textStrong text-pretty">Open source, or your own S3 as the database</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong rounded-b-xl border-b border-b-strokeBrand-strong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span>, AGPL; S3 from $199/mo</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Source-available (FSL)</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td></tr></tbody>
          </table>
        </div>
        <details class="group max-w-[80ch]">
          <summary class="inline-flex items-center gap-2 min-h-11 cursor-pointer list-none text-sm text-textWeak hover:text-textStrong [&::-webkit-details-marker]:hidden">Sources and assumptions<svg class="size-4 shrink-0 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
          <p class="pb-2 text-sm leading-relaxed text-textWeak text-pretty">List prices from public pricing pages, September 2026 (Datadog host fee: Infrastructure $15 + APM $31; replays: RUM $0.15 + Session Replay $2.50; monoscope Cloud: $29 a month includes 20M events, then $1 per million; metrics included up to 20M datapoints). — means we couldn’t confirm it. Draft: verify every cell before publishing.</p>
        </details>
      </div>
      <div class="pt-8 md:pt-14">
      <!-- PRICING -->
      <div id="pricing" class="blk w-full space-y-6 scroll-mt-24">
        <div class="flex flex-wrap items-end justify-between gap-5">
          <div class="space-y-3 max-w-2xl">
            <p class="font-mono text-xs uppercase tracking-wider text-(--tone)">Pricing</p>
            <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Pay per million events, not per host, per GB and per index</h3>
            <p class="text-lg leading-normal text-textWeak text-pretty">Cloud from $29/month. Requests, logs and spans at one price, with no host fees.</p>
          </div>
          <a href="/pricing/" class="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-textBrand underline underline-offset-4">See full pricing <span aria-hidden="true">→</span></a>
        </div>
        <div id="bill" class="rounded-2xl bg-bgRaised ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] overflow-hidden">
          <div class="grid md:grid-cols-[1fr_16rem] items-center gap-6 md:gap-10 p-5 md:p-7 border-b border-strokeWeak">
            <div class="space-y-2 min-w-0">
              <div class="flex flex-wrap items-baseline justify-between gap-3">
                <label for="bill_events" class="text-sm text-textWeak">Events per month</label>
                <p class="text-lg font-medium tabular-nums text-textStrong" id="bill_events_label">20M</p>
              </div>
              <input id="bill_events" type="range" min="10" max="1000" step="10" value="20" class="bill-range" aria-valuetext="20 million events per month">
              <div class="flex justify-between text-xs text-textWeak tabular-nums" aria-hidden="true"><span>10M</span><span>500M</span><span>1B</span></div>
              <details class="group pt-2" id="bill_workload">
                <summary class="flex items-center gap-2 min-h-11 cursor-pointer list-none text-xs text-textWeak hover:text-textStrong [&::-webkit-details-marker]:hidden"><span>Adjust workload <span id="bill_workload_label" class="block sm:inline">· 10 hosts · 400 series · 2k replays</span></span><svg class="size-4 shrink-0 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
                <div class="pt-3 pb-2">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 [&_input]:w-full [&_input]:min-h-11 [&_input]:rounded-lg [&_input]:border [&_input]:border-strokeWeak [&_input]:bg-bgBase [&_input]:px-3 [&_input]:py-2 [&_input]:text-base [&_input]:text-textStrong [&_input]:tabular-nums [&_input]:transition-colors [&_input:hover]:border-strokeStrong [&_label]:text-xs [&_label]:text-textWeak [&_label]:block [&_label]:mb-2">
              <div><label for="bill_hosts">Hosts</label><input id="bill_hosts" type="number" min="1" max="500" value="10"></div>
              <div><label for="bill_series">Metric series</label><input id="bill_series" type="number" min="0" max="1000000" step="100" value="400"></div>
              <div><label for="bill_sessions">Replay sessions / month</label><input id="bill_sessions" type="number" min="0" max="10000000" step="1000" value="2000"></div>
            </div>
                </div>
              </details>
            </div>
            <div class="space-y-3 md:border-s md:border-strokeWeak md:ps-7">
              <p class="text-xs text-textWeak">monoscope Cloud · estimated bill</p>
              <p class="whitespace-nowrap"><span id="bill_estimate" class="text-5xl font-medium tracking-tight tabular-nums text-textStrong">$29</span><span class="text-sm text-textWeak"> /month</span></p>
              <p class="text-xs text-textWeak">30-day retention. No host fees.</p>
              <a href="https://app.monoscope.tech" class="plan-action btn h-auto min-h-11 py-2.5 px-5 rounded-lg bg-fillBrand-strong text-textInverse-strong text-sm font-medium" data-tracking="index-pricing-plan" data-reddit-event="SignUp">Start for free</a>
            </div>
          </div>
          <p id="bill_summary" class="sr-only" role="status"></p>
          <div id="bill_rows" class="p-5 md:p-7 space-y-4">
            <p class="text-xs text-textWeak">Estimated cost elsewhere · same workload · 30-day retention</p>
            <div data-vendor="datadog" class="grid grid-cols-[1fr_auto] sm:grid-cols-[13rem_1fr_auto] items-center gap-x-5 gap-y-2">
              <span class="text-lg font-medium text-textStrong">Datadog</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-lg whitespace-nowrap"><span class="amount font-semibold tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-16 ms-3 text-base font-medium tabular-nums text-textWeak"></span></p>
            </div>
            <div data-vendor="splunk" class="grid grid-cols-[1fr_auto] sm:grid-cols-[13rem_1fr_auto] items-center gap-x-5 gap-y-2">
              <span class="text-lg font-medium text-textStrong">Splunk Observability</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-lg whitespace-nowrap"><span class="amount font-semibold tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-16 ms-3 text-base font-medium tabular-nums text-textWeak"></span></p>
            </div>
            <div data-vendor="sentry" class="grid grid-cols-[1fr_auto] sm:grid-cols-[13rem_1fr_auto] items-center gap-x-5 gap-y-2">
              <span class="text-lg font-medium text-textStrong">Sentry</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-lg whitespace-nowrap"><span class="amount font-semibold tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-16 ms-3 text-base font-medium tabular-nums text-textWeak"></span></p>
            </div>
          </div>
          <details class="group border-t border-strokeWeak px-5 md:px-7">
            <summary class="min-h-11 py-3 flex items-center justify-between gap-4 cursor-pointer list-none text-xs text-textWeak hover:text-textStrong [&::-webkit-details-marker]:hidden"><span>Assumptions &amp; price sources <span class="hidden sm:inline">· September 2026</span></span><svg class="size-4 shrink-0 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
            <div id="bill_note" class="pb-6 space-y-3 text-sm leading-relaxed text-textWeak max-w-[70ch]">
              <p>Estimates from public list prices, September 2026, annual billing where offered, 30-day retention on every vendor, 2 kB average event, one metric datapoint per series per minute.</p>
              <p>Datadog: Infrastructure $15 and APM $31 per host; logs $0.10 per GB ingested plus $2.50 per million indexed; custom metrics $5 per 100 series beyond 100 per host; RUM $0.15 plus Session Replay $2.50 per 1,000 sessions.</p>
              <p>Splunk: Observability Cloud App & Infrastructure $60 per host; Splunk Cloud log ingest at about $12.50 per GB/day per month; RUM $14 per 10,000 sessions; custom metrics not modelled.</p>
              <p>Sentry: Team $26; spans $1.60 per million beyond 5M; errors at $0.29 per 1,000 assuming 0.5% of events are errors; replays $3.75 per 1,000; no metrics product.</p>
              <p>monoscope Cloud: $29 includes 20M events, 20M metric datapoints and 2,000 replay sessions; then $1 per million events, $1 per 10 million metric datapoints and $1 per 1,000 sessions. Everything else is included.</p>
            </div>
          </details>
        </div>
        <script>
        (function () {
          const $ = id => document.getElementById(id); if (!$('bill_events')) return;
          const fmt = n => '$' + Math.round(n).toLocaleString('en-US');
          const KB = 2, DPM = 43200; // event size in kB; datapoints per series per month at 1/min
          const price = {
            datadog: (m, h, s, r) => h * (15 + 31) + m * (0.10 * KB / 1000 * 1000 + 2.50) + Math.max(0, s - 100 * h) / 100 * 5 + r / 1000 * (0.15 + 2.50),
            splunk:  (m, h, s, r) => h * 60 + (m * KB / 30) * 12.5 + r / 10000 * 14, // App & Infra per host; Splunk Cloud ingest per GB/day; RUM
            sentry:  (m, h, s, r) => 26 + Math.max(0, m - 5) * 1.60 + m * 1e6 * 0.005 / 1000 * 0.29 + Math.max(0, r - 50) / 1000 * 3.75,
            mono:    (m, h, s, r) => 29 + Math.max(0, m - 20) + Math.max(0, s * DPM - 20e6) / 10e6 + Math.max(0, r - 2000) / 1000,
          };
          function render() {
            const m = +$('bill_events').value, h = +$('bill_hosts').value || 0, s = +$('bill_series').value || 0, r = +$('bill_sessions').value || 0;
            $('bill_events_label').textContent = m >= 1000 ? '1B' : m + 'M';
            $('bill_events').setAttribute('aria-valuetext', m >= 1000 ? '1 billion events per month' : m + ' million events per month');
            $('bill_events').style.setProperty('--bill-progress', ((m - 10) / 990 * 100) + '%');
            const cost = Object.fromEntries(Object.entries(price).map(([k, f]) => [k, f(m, h, s, r)]));
            $('bill_estimate').textContent = fmt(cost.mono);
            const compact = n => n.toLocaleString('en-US', { notation: 'compact' }).toLowerCase();
            $('bill_workload_label').textContent = `· ${h} hosts · ${compact(s)} series · ${compact(r)} replays`;
            const max = Math.max(...Object.values(cost));
            document.querySelectorAll('#bill_rows [data-vendor]').forEach(row => {
              const k = row.dataset.vendor, c = cost[k];
              row.querySelector('.bar').style.width = Math.max(1.5, c / max * 100) + '%';
              row.querySelector('.amount').textContent = fmt(c);
              const ratio = row.querySelector('.ratio'); if (ratio) ratio.textContent = (c / cost.mono).toFixed(1) + '×';
            });
          }
          ['bill_events', 'bill_hosts', 'bill_series', 'bill_sessions'].forEach(id => {
            $(id).addEventListener('input', render);
            $(id).addEventListener('change', () => {
              $('bill_summary').textContent = 'monoscope Cloud estimated monthly bill: ' + $('bill_estimate').textContent + '. ' + $('bill_rows').innerText;
            });
          }); render();
        })();
        </script>
        <div id="pricing-plans" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-textWeak">
          <p><span class="text-textStrong">Free forever</span> · 10k events/day, no credit card</p>
          <a href="https://github.com/monoscope-tech/monoscope" target="_blank" rel="noopener noreferrer" class="inline-flex items-center min-h-11 text-textBrand underline underline-offset-4" data-tracking="index-github-enterprise" data-reddit-event="ViewContent">Self-host for free <span class="ms-2" aria-hidden="true">↗</span></a>
          <p class="w-full text-xs">Optional: Your own S3 bucket · +$199/month</p>
        </div>
      </div>
      </div>
      </div>
    </section>

    <!-- Chapters: one hue each, joined by a rail; odd chapters sit on tinted panels -->
    <div class="w-full">
    {% for s in this.frontmatter.sections %}
    <section id="{{s.id}}" class="tone-{{s.tone}} relative w-full scroll-mt-16">
      {% assign odd = forloop.index | modulo: 2 %}{% if odd == 1 %}<div aria-hidden="true" class="absolute inset-y-0 left-1/2 -translate-x-1/2 panel-w rounded-[2rem] overflow-hidden bg-(--tone-panel) border border-(--tone-weak)">{% if s.art %}<img src="/assets/img/home/art/{{s.art}}" alt="" loading="lazy" class="absolute inset-x-0 bottom-0 w-full h-40 md:h-64 object-cover object-bottom opacity-35 dark:opacity-90 [mask-image:linear-gradient(to_top,black_35%,transparent)]">{% endif %}</div>{% endif %}
      <div class="relative wrap pt-20 md:pt-28 {% if s.art %}pb-40 md:pb-64{% else %}pb-20 md:pb-28{% endif %} space-y-24 md:space-y-32 lg:[&>.blk]:ps-12">
        <div aria-hidden="true" class="hidden lg:block absolute left-[23px] bottom-0 m-0! w-0.5 bg-(--tone-line) {% if forloop.first %}top-[calc(7rem+13px)]{% else %}top-0{% endif %}"></div>
        <div class="space-y-10">
        <div class="relative space-y-4 max-w-3xl lg:ps-12">
          <span aria-hidden="true" class="hidden lg:block absolute left-1.5 top-[7px] size-3 rounded-full border-2 border-(--tone) bg-bgBase"></span>
          <p class="inline-flex rounded-md px-2.5 py-1 font-mono text-[12px] uppercase tracking-wider bg-(--tone-weak) text-(--tone)">0{{forloop.index}} · {{s.eyebrow}}</p>
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">{{s.title}}</h2>
          <p class="max-w-[65ch] text-lg md:text-xl leading-relaxed text-textWeak text-pretty">{{s.lead}}</p>
        </div>
        {% if s.demo %}
        <div class="feature-demo-layout grid lg:grid-cols-[minmax(0,1fr)_15rem] xl:grid-cols-[minmax(0,1fr)_18rem] gap-8 xl:gap-10 items-start">
          <div class="relative min-w-0 space-y-6">
          <div class="relative rounded-xl border border-strokeWeak bg-bgRaised overflow-hidden shadow-[0_24px_64px_-32px_var(--tone-fill)]">
            <div class="flex items-center gap-2 px-4 py-2.5 border-b border-strokeWeak">
              <span class="flex gap-1.5"><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i></span>
              <span class="font-mono text-xs text-textDisabled">{{s.frame}}</span>
            </div>
            <div class="relative aspect-video bg-fillWeak"><demo-scene src="{{s.demo}}" class="absolute inset-0"></demo-scene></div>
          </div>
          {% if s.code %}
          <div class="rounded-xl overflow-hidden border border-white/10 bg-[oklch(18%_0.02_263)] [&_code]:bg-transparent! [&_code]:p-0! [&_code]:text-inherit!">
            <p class="px-5 py-2 text-xs font-mono text-white/50 border-b border-white/10">{{s.code_label}}</p>
            <pre class="p-5 text-sm leading-relaxed overflow-x-auto font-mono text-white/90"><code{% if s.code_class %} class="{{s.code_class}}"{% endif %}>{{s.code}}</code></pre>
          </div>
          {% endif %}
          </div>
          <div class="min-w-0 space-y-6">
            <div class="divide-y divide-strokeWeak">
              {% for b in s.bullets %}
              <div class="py-6 first:pt-2 last:pb-0 space-y-3">
                <h3 class="relative ps-3.5 text-base font-semibold leading-[1.4] text-balance text-textStrong before:absolute before:start-0 before:top-[0.55em] before:size-1.5 before:rounded-full before:bg-(--tone)">{{b.title}}</h3>
                <p class="ps-3.5 text-base leading-relaxed text-textWeak text-pretty">{{b.body}}</p>
              </div>
              {% endfor %}
            </div>
            <a href="{{s.link}}" class="btn btn-secondary py-2.5 px-5 rounded-lg inline-flex items-center gap-2">{{s.link_label}} <svg class="h-3 w-3"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
          </div>
        </div>
        {% endif %}
        </div>
        {% case s.id %}
        {% when 'know' %}
      <!-- CAPABILITIES -->
      <div class="blk w-full space-y-8">
        <div class="space-y-4 max-w-3xl">
          <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Everything else you’d expect</h3>
          <p class="text-xl leading-normal text-textWeak text-pretty">The rest of the observability toolbox, so you don’t need a second tool.</p>
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
        {% when 'prove' %}
      <!-- SECURITY -->
      <section id="security" class="blk w-full grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 scroll-mt-24">
        <div class="space-y-4 max-w-3xl">
          <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Security and your data</h3>
          <p class="text-xl leading-normal text-textWeak text-pretty">Your data, your bucket, code you can read.</p>
        </div>
        <dl class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {% for f in this.frontmatter.security %}
          <div class="border-t border-strokeWeak pt-4 space-y-1">
            <dt class="font-semibold text-textStrong">{{f.title}}</dt>
            <dd class="text-sm leading-relaxed text-textWeak text-pretty [&_code]:font-mono [&_code]:text-xs [&_code]:bg-fillWeak [&_code]:px-1 [&_code]:rounded">{{f.body}}</dd>
          </div>
          {% endfor %}
        </dl>
      </section>
        {% when 'fix' %}
      <!-- Coding agents -->
      <section id="agents" class="blk w-full space-y-8 scroll-mt-24">
        <div class="space-y-4 max-w-3xl">
          <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Works with your coding agents</h3>
          <p class="text-xl leading-normal text-textWeak text-pretty">If your team already works with Claude Code, Cursor or another coding agent, monoscope plugs straight in. Ask what broke, and the agent reads production to find out.</p>
        </div>
        {% render "default/components/cmd-cards", items:this.frontmatter.agents, cols:"lg:grid-cols-3" %}
      </section>
        {% when 'start' %}
      <!-- INTEGRATIONS-->
      <div class="blk text-textWeak space-y-5 w-full flex flex-col items-center justify-center">
        <div class="w-full space-y-5">
          {% render "default/components/cmd-cards", items:this.frontmatter.onboarding, cols:"md:grid-cols-2" %}
          <a href="/docs/sdks/" class="inline-block text-textBrand underline underline-offset-2">View all integrations</a>
        </div>
        <button type="button" class="btn btn-secondary px-4 py-2 rounded-lg" data-marquee-toggle aria-pressed="false">Pause integrations</button>
        <div id="integration-marquee" class="w-full space-y-5 pt-5 mask-edges">
          <div class="flex w-full overflow-x-hidden gap-5  max-w-screen
            [&_img]:w-full
            [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
            [&>div>*]:border [&>div>*]:border-strokeWeak">
            {% assign icons = "postgresql.png,cloudflare.png,mongodb.png,azure-1.png,mysql.png,nginx.png,redis.png,elasticsearch.png,google-cloud.png,apache-kafka.png,kubernetes.png,prometheus-app.png,haproxy-icon.svg,docker.png" | split: "," %}
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5">
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5" aria-hidden="true" >
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
          </div>
          <div class="flex w-full overflow-x-hidden gap-5  max-w-screen
            [&_img]:w-full
            [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
            [&>div>*]:border [&>div>*]:border-strokeWeak">
            {% assign icons = "statsd-receiver.png,solacereceiver.jpg,zipkin-logo.png,snowflake.png,skywalking.jpg,riak-logo.png,huawei-icon.svg,apache_zookeeper-icon.svg,rabbitmq-icon.svg,podmanio-icon.svg,apache_couchdb-icon.svg,influxdata-icon.svg,jaegertracingio-icon.svg,oracle-icon.svg,memcached-icon.svg,signalfx-icon.svg" | split: "," %}
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none animation-reverse  whitespace-nowrap flex w-max shrink-0 gap-5">
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none animation-reverse whitespace-nowrap flex w-max shrink-0 gap-5" aria-hidden="true" >
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
          </div>
          <div class=" flex w-full overflow-x-hidden gap-5  max-w-screen
            [&_img]:w-full
            [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
            [&>div>*]:border [&>div>*]:border-strokeWeak">
            {% assign icons = "splunk-icon.svg,alibabacloud-icon.svg,apache_cassandra-icon.svg,logicmonitor-icon.svg,sematext-icon.svg,sentryio-icon.svg,tencent-logo.png,pulsar-logo.png,clickhouse-logo.png,coralognix.png,statsd-receiver.png,solacereceiver.jpg,zipkin-logo.png" | split: "," %}
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5">
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5" aria-hidden="true" >
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
          </div>
        </div>

      </div>
      <!-- Switching + CTA -->
      <section class="blk w-full">
        <div class="rounded-2xl bg-[oklch(18%_0.02_263)] text-white p-6 md:p-10 grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16">
          <div class="space-y-5">
            <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance">See it on your own traffic</h3>
            <p class="text-lg leading-normal text-white/70 text-pretty">Start free with up to 10,000 events a day, explore the playground without signing up, or book a call and one of our engineers will help you get set up.</p>
            <div class="flex flex-wrap gap-3">
              <a href="https://app.monoscope.tech" class="btn py-3 px-6 rounded-xl bg-fillBrand-strong text-textInverse-strong" data-tracking="index-start-trial-3" data-reddit-event="SignUp">Start for free</a>
              <a href="https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer" class="btn py-3 px-6 rounded-xl bg-white/10 border-white/15 text-white hover:bg-white/15" data-tracking="index-playground-3" data-reddit-event="ViewContent">Launch playground</a>
              <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" target="_blank" rel="noopener noreferrer" class="btn py-3 px-6 rounded-xl bg-transparent border-white/15 text-white hover:bg-white/10" data-tracking="index-book-call" data-reddit-event="ScheduleDemo">Book a call</a>
            </div>
          </div>
          <div class="space-y-5">
            <p class="font-mono text-[12px] uppercase tracking-wider text-white/50">Switching takes three steps</p>
            <ol class="grid sm:grid-cols-3 gap-6">
              {% for st in this.frontmatter.switching %}
              <li class="space-y-2">
                <span class="grid place-items-center w-7 h-7 rounded-full bg-fillBrand-strong/25 text-[#8FB6FF] font-mono text-xs font-bold">{{forloop.index}}</span>
                <h3 class="text-base font-semibold text-white">{{st.title}}</h3>
                <p class="text-sm leading-relaxed text-white/70 text-pretty">{{st.body}}</p>
              </li>
              {% endfor %}
            </ol>
          </div>
        </div>
      </section>
        {% endcase %}
      </div>
    </section>
    {% endfor %}
    </div>

    <!-- REAL RESULTS FROM CUSTOMERS -->
    <div id="results" class="wrap space-y-8">
      <div class="space-y-4 max-w-3xl">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">What changed for teams <span class="text-textDisabled">on monoscope</span></h2>
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
