---
title: "F: Why AI agents fail (polished)"
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
  - quote: "We had a major upgrade planned for our iOS/Android app... After adding monoscope to our laravel app, we could see every new route and request. It gave me and the dev team complete confidence that our users weren't being affected by our changes. <br/><br/>... became the smoothest and LEAST STRESSFUL rollouts we have ever done. Really an amazing tool and now a permanent part of our workflow. Thank you!!"
    photo: larrison_morrison.jpeg
    name: Lazarus Morrison
    title: Founder of Community Fluency
    logo_raw: <div class="inline-flex items-center text-lg gap-1"><img src="/assets/img/customers/community_fluency.png" alt="Community Fluency" class="logo1 logo2"/> <span class="hidden sm:inline-block">Community<strong class="text-lg!">Fluency</strong></span></div>
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
    icon: eye
    tone: brand
    art: know-observatory.webp
    eyebrow: Know what happened
    title: Every error, with the exact request behind it
    lead: >-
      Errors, crashes and breaking API changes, each with the request and response
      that caused it. The trace, the logs and the customer's session replay are one click away.
    demo: /assets/demos/know.html
    frame: app.monoscope.tech / issues
    brief: >-
      Issues list. Open an issue, then the request that triggered it: headers, body,
      response, trace. Click through to the log line and the session replay. 25-30s.
    link: /features/error-tracking/
    link_label: How error tracking works
    bullets:
      - title: "The request comes with the error"
        body: "Exceptions and slow endpoints, grouped into issues. Each one carries the headers, body and response exactly as they were."
      - title: "Breaking changes in APIs you don't own"
        body: "A field removed, renamed or retyped, in your endpoints or a supplier's, flagged with the request that showed it."
      - title: "What the customer saw"
        body: "Session replay is linked to the failing request. Scrub to the click, see the toast they saw, and the request it fired."
  - id: prove
    icon: database
    tone: success
    eyebrow: Prove it
    title: What you sent, and what they answered
    lead: >-
      monoscope keeps the full request and response of every call: the ones customers
      make to you and the ones you make to suppliers. Nothing is sampled. When someone
      disputes what happened, you show them.
    demo: /assets/demos/prove.html
    frame: app.monoscope.tech / explorer
    brief: >-
      An outgoing request to a supplier API: the request body, the 200 response with
      its acknowledgement body, the timestamp. End on the share link. 20-25s.
    link: /features/byob-s3/
    link_label: Your own S3
    bullets:
      - title: "Outgoing calls too"
        body: "Payment providers, logistics partners, KYC vendors: every request you send and every response they return, stored next to your own traffic."
      - title: "The receipt"
        body: "What you sent, what the supplier answered and when, to the millisecond. One customer took it to court: the supplier had acknowledged every request with a 200 and never did the work."
      - title: "Support answers without paging engineering"
        body: "Support opens the request and sees which partner broke it, the way Platnova's team does."
      - title: "Share any request with a link"
        body: "Send the partner the exact request and response instead of describing them."
      - title: "Your bucket is the database"
        body: "Add your own S3 bucket ($199/month) and every event lands there as open Delta Lake and Parquet. Unlimited retention. Query it with DuckDB, Spark or SQL."
    code_label: "duckdb · a supplier's receipts, from your bucket"
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
      - title: "Routines on your schedule, or on every deploy"
        body: "Every hour, after each deploy or each morning, a routine checks for new errors, regressions and breaking changes, reads the failing requests and the deploy timeline, and posts the root cause."
      - title: "Start from a template"
        body: "Triage new errors, check every deploy, run a weekly reliability review. Pick one, adjust the instructions, save."
      - title: "A pull request, not a summary"
        body: "It opens a PR with the fix and posts the request that proves it in Slack. You review it, your CI runs, nothing merges on its own."
      - title: "Ask it in Slack"
        body: "\"Why is checkout slower than yesterday?\" Answered from logs, traces, metrics, payloads and deploys, with charts and links to the requests."
      - title: "Risky changes caught before they merge"
        body: "PRs checked against live production traffic: the migration that locks a hot table, the handler that drops a field a partner still sends."
      - title: "No second tool to wire up"
        body: "An AI layer on top of another vendor's data only sees what that vendor kept. This one reads monoscope's own unsampled store."
    code_label: Claude Code · monoscope-skills:investigate
    code_class: nohighlight
    code: |
      <span class="block bg-white/10 rounded px-2 py-1 mb-3 text-white"><span class="text-white/50">&gt;</span> investigate why orders have been stuck in processing since this morning</span><span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope facets resource.service.name --top 3)
        <span class="text-white/50">⎿  orders-service 41,208 · checkout-api 18,733 · payments 9,410</span>
      <span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope logs search 'body has "tracking_id"' --since 6h --first --id-only)
        <span class="text-white/50">⎿  evt_01JA7Q3M9X4K2R</span>
      <span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope events context --at 2026-10-07T07:52:14Z --window 10m --summary)
        <span class="text-white/50">⎿  41 traces · orders-service → api.acme-logistics.com · 41 errors in advance()</span>
      <span class="block whitespace-normal mt-3 text-white">● Orders stopped advancing at 07:52, and it isn't your code. Acme's <span class="text-[#F2C27B]">POST /v1/shipments</span> still returns 200, but the response no longer includes <span class="text-[#F2C27B]">tracking_id</span>, so <span class="text-[#F2C27B]">advance()</span> throws and 41 orders are stuck. Your last deploy was <span class="text-[#F2C27B]">b7e21c0</span>, two days ago. Want me to open a pull request with a fallback?</span>
  - id: start
    tone: violet
    eyebrow: Get started
    title: Point OpenTelemetry at it, or ask your agent
    lead: Any OpenTelemetry SDK or collector works, across 780+ integrations. Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir also capture request and response bodies, with redaction.

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
    body: "An engineer asks what's going on. monoscope answers from the stored requests and opens PR #491 with a fallback."

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
    body: Add the skills and the CLI, then ask your agent to instrument the project. It plans first, covers HTTP, SQL, queues and jobs, and checks every route arrived in monoscope before it says it's done.
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
    body: Once you're happy, send the rest of your services over and retire the tools you don't need anymore.

security:
  - title: GDPR
    body: We're happy to sign a data processing agreement (DPA) whenever you need one.
  - title: EU data region
    body: Host on monoscope Cloud in the US or the EU.
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
    details: Every endpoint, its fields and its live schema, documented from real traffic, including the third-party APIs you call.
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
noindex: true
faq:
  - q: "Do you really store request and response bodies?"
    a: "Yes, for incoming requests and the outgoing calls your app makes. The SDK redacts the headers and fields you list, such as <code>$.password</code>, before anything leaves your app."
  - q: "Is anything sampled?"
    a: "No. Every request, log and span you send is kept for your retention period: 30 days on Cloud, unlimited on your own S3 bucket."
  - q: "Do I have to replace Datadog or Sentry first?"
    a: "No. Run monoscope next to them for a week or two and compare what each one catches."
  - q: "Does the AI change production on its own?"
    a: "No. Fixes arrive as pull requests that go through your review and your CI."
  - q: "Where is my data stored?"
    a: "On monoscope Cloud in the US or the EU, in your own S3 bucket, or on your own servers with the open-source edition."
  - q: "Are you SOC 2 certified?"
    a: "Not yet. We sign DPAs, host in the EU, redact in the SDK before data leaves your app, and the code that handles your data is open source. If you need it on your infrastructure, self-host or use your own bucket."
  - q: "Can you help us move off Datadog?"
    a: "Yes. An engineer helps you switch exporters, rebuild key dashboards and monitors, and run both side by side. No charge."
  - q: "What counts as an event?"
    a: "One request (with its bodies), one log line or one span. Metric datapoints and session replays are metered separately and included up to the plan limits."
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

      <!-- Hero demos: segmented tabs on the frame's top edge; the active pill fills as its demo plays, then advances -->
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
          <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">9x</span><br/>fewer support calls at Platnova</div>
        </div>
        <div class="grid md:grid-cols-2 gap-px bg-strokeWeak border border-t-0 border-strokeWeak rounded-b-xl overflow-hidden *:bg-bgBase *:p-5 text-textWeak">
          {% assign reviews = "samuel_joseph.jpeg|Samuel Joseph|CEO of Woodcore|The best observability tool we use today at Woodcore, monoscope notifies us about any slight change that happens on the system.;joshua.jpeg|Joshua Chinemezum|CEO of Platnova|We had a major incident, and our tech support could see via APItoolkit which third-party integration partner was responsible, and could take action without needing the engineering team's help." | split: ";" %}
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
      </div>
    </section>

    <section class="wrap">
      <div class="rounded-[2rem] bg-[oklch(18%_0.02_263)] text-white px-6 py-16 md:py-24 flex flex-col items-center text-center gap-6">
        <h2 class="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-balance">Know what happened.</h2>
        <p class="text-lg md:text-xl leading-relaxed text-white/70 max-w-[48ch] text-pretty">Install a routine on your own traffic. Free up to 10k events a day.</p>
        <div class="flex flex-wrap justify-center gap-3">
          <a href="https://app.monoscope.tech" class="btn py-3 px-6 rounded-xl bg-fillBrand-strong text-textInverse-strong" data-tracking="lp-start-final" data-reddit-event="SignUp">Start for free</a>
          <a href="https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer" class="btn py-3 px-6 rounded-xl bg-white/10 border-white/15 text-white hover:bg-white/15" data-tracking="lp-playground-final" data-reddit-event="ViewContent">Launch playground</a>
        </div>
      </div>
    </section>

</section>

```
