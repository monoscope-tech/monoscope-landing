---
title: "C: Comparison-led"
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
          <p class="md:col-start-1 md:row-start-1 font-mono text-xs uppercase tracking-wider text-textBrand">Open-source observability + AI SRE</p>
          <h1 class="md:col-start-1 md:row-start-2 text-5xl md:text-7xl font-medium tracking-tight leading-tight text-balance text-textStrong">Know what happened.<br class="hidden md:block"> <span class="text-textDisabled dark:text-textWeak">Prove it. Fix it.</span></h1>
        </div>
        <div class="hero-copy md:col-start-2 md:row-start-2 space-y-6 md:pt-2">
          <p class="text-lg md:text-xl leading-relaxed text-textWeak text-pretty max-w-[44ch]">Observability data lake and an AI SRE agent, to catch issues and continuously improve production.</p>
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
          {% assign customers = "andela.svg,partna.svg,grovepay.svg,sameday.svg,platnova.png,payfonte.svg,thepeer.svg,blockradar-full.svg" | split: "," %}
          {% for logo in customers %}<div><img src="/assets/img/customers/{{logo}}" alt="{{logo}}"></div>{% endfor %}
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


    <section class="wrap tone-brand space-y-16 md:space-y-24 ">
      <div class="space-y-4 max-w-3xl">
        <p class="font-mono text-xs uppercase tracking-wider text-(--tone)">Why AI on-call keeps guessing</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Three things your tools throw away</h2>
        <p class="max-w-[65ch] text-lg md:text-xl leading-relaxed text-textWeak text-pretty">Every AI SRE is only as good as what it can read. Here's what most of them never get to see.</p>
      </div><div class="grid md:grid-cols-3 gap-px bg-strokeWeak border border-strokeWeak rounded-xl overflow-hidden"><div class="bg-bgBase p-6 space-y-3"><p class="font-mono text-sm font-bold text-(--tone)">01</p><h3 class="text-xl font-semibold text-textStrong text-balance">The trace was sampled</h3><p class="text-base leading-relaxed text-textWeak text-pretty">To keep the bill down, most requests are dropped before anyone looks. The one that failed is often among them.</p></div><div class="bg-bgBase p-6 space-y-3"><p class="font-mono text-sm font-bold text-(--tone)">02</p><h3 class="text-xl font-semibold text-textStrong text-balance">The body was never stored</h3><p class="text-base leading-relaxed text-textWeak text-pretty">A span says POST /v1/shipments, 200, 182 ms. It doesn't say which field was missing, or what the supplier answered.</p></div><div class="bg-bgBase p-6 space-y-3"><p class="font-mono text-sm font-bold text-(--tone)">03</p><h3 class="text-xl font-semibold text-textStrong text-balance">The AI lives in a second tool</h3><p class="text-base leading-relaxed text-textWeak text-pretty">AI SRE layers read what your observability vendor kept. If it sampled the trace and dropped the body, the AI guesses.</p></div></div>
    </section>

    <section class="wrap tone-brand space-y-16 md:space-y-24 ">
      <div class="space-y-4 max-w-3xl">
        <p class="font-mono text-xs uppercase tracking-wider text-(--tone)">Side by side</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">What each tool can show you about one failed request</h2>
        
      </div><div class="space-y-3"><div class="overflow-x-auto rounded-xl border border-strokeWeak">
        <table class="w-full min-w-[48rem] text-sm text-left">
          <thead><tr class="border-b border-strokeWeak"><th class="p-4 align-bottom font-semibold text-textStrong "></th><th class="p-4 align-bottom font-semibold text-textStrong bg-fillBrand-weak">monoscope</th><th class="p-4 align-bottom font-semibold text-textStrong ">Datadog</th><th class="p-4 align-bottom font-semibold text-textStrong ">Sentry</th><th class="p-4 align-bottom font-semibold text-textStrong ">AI SRE layers<br><span class="font-normal text-textWeak">Polylane, Superlog</span></th></tr></thead>
          <tbody class="divide-y divide-strokeWeak"><tr><td class="p-4 font-medium text-textStrong ">Request and response bodies</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong"><span class="text-textSuccess font-semibold">Yes</span>, by default</td><td class="p-4 text-textWeak ">Not by default</td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td><td class="p-4 text-textWeak ">Only what the tool underneath kept</td></tr><tr><td class="p-4 font-medium text-textStrong ">Outgoing calls to suppliers, with bodies</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong"><span class="text-textSuccess font-semibold">Yes</span></td><td class="p-4 text-textWeak ">Spans only</td><td class="p-4 text-textWeak ">Spans only</td><td class="p-4 text-textWeak ">Only what the tool underneath kept</td></tr><tr><td class="p-4 font-medium text-textStrong ">Breaking changes in APIs you don't own</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong"><span class="text-textSuccess font-semibold">Yes</span></td><td class="p-4 text-textWeak ">—</td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td></tr><tr><td class="p-4 font-medium text-textStrong ">Sampling</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong">Never</td><td class="p-4 text-textWeak ">Configurable</td><td class="p-4 text-textWeak ">Configurable</td><td class="p-4 text-textWeak ">Inherited</td></tr><tr><td class="p-4 font-medium text-textStrong ">AI investigates and opens fix PRs</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong"><span class="text-textSuccess font-semibold">Yes</span></td><td class="p-4 text-textWeak ">Bits AI</td><td class="p-4 text-textWeak ">Seer</td><td class="p-4 text-textWeak "><span class="text-textSuccess font-semibold">Yes</span></td></tr><tr><td class="p-4 font-medium text-textStrong ">The AI reads the full request</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong"><span class="text-textSuccess font-semibold">Yes</span></td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td></tr><tr><td class="p-4 font-medium text-textStrong ">Pricing</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong">Per event, bodies included</td><td class="p-4 text-textWeak ">Per host + per GB</td><td class="p-4 text-textWeak ">Per event type</td><td class="p-4 text-textWeak ">On top of your observability bill</td></tr><tr><td class="p-4 font-medium text-textStrong ">Open source, self-hostable</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong">AGPL</td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td><td class="p-4 text-textWeak ">FSL</td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td></tr><tr><td class="p-4 font-medium text-textStrong ">Your S3 bucket as the database</td><td class="p-4 text-textWeak bg-fillBrand-weak text-textStrong">Yes, +$199/mo</td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td><td class="p-4 text-textWeak "><span class="text-textWeak">No</span></td></tr></tbody>
        </table>
      </div>
      <p class="text-xs text-textWeak">Draft from public docs, October 2026. Verify every cell before publishing.</p></div>
    </section>

    <section class="wrap tone-violet space-y-16 md:space-y-24 ">
            <!-- PRICING -->
      <div id="pricing" class="blk w-full space-y-6 scroll-mt-24">
        <div class="flex flex-wrap items-end justify-between gap-5">
          <div class="space-y-3 max-w-2xl">
            <p class="text-sm font-medium uppercase tracking-wide text-(--tone)">Pricing</p>
            <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Pay per event, not per host</h3>
            <p class="text-lg leading-normal text-textWeak text-pretty">$29 a month includes 20M events, then $1 per million. A request, a log line and a span cost the same, and request bodies don't count extra.</p>
          </div>
          <a href="/pricing/" class="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-textBrand underline underline-offset-4">See full pricing <span aria-hidden="true">→</span></a>
        </div>
        <div id="bill" class="rounded-2xl bg-fillWeaker ring-1 ring-strokeWeak overflow-hidden">
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
            <div data-vendor="datadog" class="grid grid-cols-[1fr_auto] sm:grid-cols-[10rem_1fr_auto] items-center gap-x-4 gap-y-2">
              <span class="text-sm text-textStrong">Datadog</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-sm whitespace-nowrap"><span class="amount tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-14 ms-3 text-xs tabular-nums text-textWeak"></span></p>
            </div>
            <div data-vendor="splunk" class="grid grid-cols-[1fr_auto] sm:grid-cols-[10rem_1fr_auto] items-center gap-x-4 gap-y-2">
              <span class="text-sm text-textStrong">Splunk Observability</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-sm whitespace-nowrap"><span class="amount tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-14 ms-3 text-xs tabular-nums text-textWeak"></span></p>
            </div>
            <div data-vendor="sentry" class="grid grid-cols-[1fr_auto] sm:grid-cols-[10rem_1fr_auto] items-center gap-x-4 gap-y-2">
              <span class="text-sm text-textStrong">Sentry</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-sm whitespace-nowrap"><span class="amount tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-14 ms-3 text-xs tabular-nums text-textWeak"></span></p>
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

      <div class="blk w-full rounded-2xl border border-strokeWeak p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div class="space-y-2 max-w-2xl">
          <h3 class="text-2xl font-medium tracking-tight text-balance text-textStrong">We'll help you move off Datadog</h3>
          <p class="text-base leading-relaxed text-textWeak text-pretty">An engineer from our team helps you point your OpenTelemetry exporters at monoscope, rebuilds your key dashboards and monitors, and runs both side by side until you're sure. No charge.</p>
        </div>
        <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" target="_blank" rel="noopener noreferrer" class="btn btn-secondary py-2.5 px-5 rounded-lg whitespace-nowrap" data-tracking="lp-migration-call" data-reddit-event="ScheduleDemo">Book a migration call</a>
      </div>

    </section>

    <section class="wrap tone-brand space-y-16 md:space-y-24 ">
      <div class="space-y-4 max-w-3xl">
        <p class="font-mono text-xs uppercase tracking-wider text-(--tone)">How it works</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Know what happened. Prove it. Fix it.</h2>
        
      </div><div class="grid lg:grid-cols-3 gap-6"><div class="tone-brand rounded-2xl border border-strokeWeak p-5 space-y-5 flex flex-col">
          <p class="inline-flex w-fit items-center gap-2 rounded-md px-2.5 py-1 font-mono text-xs uppercase tracking-wider bg-(--tone-weak) text-(--tone)"><svg class="w-4 h-4"><use xlink:href="/assets/deps/sprite.svg#eye"></use></svg>Know</p>
          <h3 class="text-xl font-semibold text-textStrong text-balance">Every error, with the exact request behind it</h3>
          <div class="rounded-xl border border-strokeWeak bg-fillWeak overflow-hidden shadow-[0_24px_64px_-32px_var(--tone-fill)]">
          <div class="flex items-center gap-2 px-4 py-2.5 border-b border-strokeWeak"><span class="flex gap-1.5"><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i></span><span class="font-mono text-xs text-textDisabled">issues</span></div>
          <div class="relative aspect-video bg-fillWeak"><demo-scene src="/assets/demos/know.html" class="absolute inset-0"></demo-scene></div>
        </div>
          {% for s in this.frontmatter.sections %}{% if s.id == 'know' %}<ul class="space-y-3 flex-1">{% for b in s.bullets limit:3 %}<li class="text-sm leading-relaxed text-textWeak"><span class="font-semibold text-textStrong">{{b.title}}.</span> {{b.body}}</li>{% endfor %}</ul>
          <a href="{{s.link}}" class="text-sm text-textBrand underline underline-offset-4">{{s.link_label}}</a>{% endif %}{% endfor %}
        </div><div class="tone-success rounded-2xl border border-strokeWeak p-5 space-y-5 flex flex-col">
          <p class="inline-flex w-fit items-center gap-2 rounded-md px-2.5 py-1 font-mono text-xs uppercase tracking-wider bg-(--tone-weak) text-(--tone)"><svg class="w-4 h-4"><use xlink:href="/assets/deps/sprite.svg#database"></use></svg>Prove</p>
          <h3 class="text-xl font-semibold text-textStrong text-balance">What you sent, and what they answered</h3>
          <div class="rounded-xl border border-strokeWeak bg-fillWeak overflow-hidden shadow-[0_24px_64px_-32px_var(--tone-fill)]">
          <div class="flex items-center gap-2 px-4 py-2.5 border-b border-strokeWeak"><span class="flex gap-1.5"><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i></span><span class="font-mono text-xs text-textDisabled">explorer</span></div>
          <div class="relative aspect-video bg-fillWeak"><demo-scene src="/assets/demos/prove.html" class="absolute inset-0"></demo-scene></div>
        </div>
          {% for s in this.frontmatter.sections %}{% if s.id == 'prove' %}<ul class="space-y-3 flex-1">{% for b in s.bullets limit:3 %}<li class="text-sm leading-relaxed text-textWeak"><span class="font-semibold text-textStrong">{{b.title}}.</span> {{b.body}}</li>{% endfor %}</ul>
          <a href="{{s.link}}" class="text-sm text-textBrand underline underline-offset-4">{{s.link_label}}</a>{% endif %}{% endfor %}
        </div><div class="tone-warning rounded-2xl border border-strokeWeak p-5 space-y-5 flex flex-col">
          <p class="inline-flex w-fit items-center gap-2 rounded-md px-2.5 py-1 font-mono text-xs uppercase tracking-wider bg-(--tone-weak) text-(--tone)"><svg class="w-4 h-4"><use xlink:href="/assets/deps/sprite.svg#code"></use></svg>Fix</p>
          <h3 class="text-xl font-semibold text-textStrong text-balance">An AI that reads the actual request</h3>
          <div class="rounded-xl border border-strokeWeak bg-fillWeak overflow-hidden shadow-[0_24px_64px_-32px_var(--tone-fill)]">
          <div class="flex items-center gap-2 px-4 py-2.5 border-b border-strokeWeak"><span class="flex gap-1.5"><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i><i class="block w-2.5 h-2.5 rounded-full bg-textDisabled/40"></i></span><span class="font-mono text-xs text-textDisabled">ai / routines</span></div>
          <div class="relative aspect-video bg-fillWeak"><demo-scene src="/assets/demos/fix.html" class="absolute inset-0"></demo-scene></div>
        </div>
          {% for s in this.frontmatter.sections %}{% if s.id == 'fix' %}<ul class="space-y-3 flex-1">{% for b in s.bullets limit:3 %}<li class="text-sm leading-relaxed text-textWeak"><span class="font-semibold text-textStrong">{{b.title}}.</span> {{b.body}}</li>{% endfor %}</ul>
          <a href="{{s.link}}" class="text-sm text-textBrand underline underline-offset-4">{{s.link_label}}</a>{% endif %}{% endfor %}
        </div></div>
    </section>

    <section class="wrap tone-success space-y-16 md:space-y-24 ">
            <!-- Same request, two records -->
      <div class="blk w-full space-y-6">
        <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Same request, two records</h3>
        <div class="grid md:grid-cols-[2fr_3fr] rounded-xl border border-strokeWeak overflow-hidden">
          <div class="bg-fillWeaker p-6 space-y-4">
            <h3 class="text-base font-semibold text-textStrong">What a sampled trace keeps</h3>
            <div class="flex items-center gap-3 rounded-lg border border-strokeWeak bg-bgBase px-3 py-2 font-mono text-sm text-textStrong">
              <span>POST</span><span class="flex-1 truncate">/v1/shipments</span><span class="rounded px-1.5 text-xs font-bold bg-fillSuccess-weak text-textSuccess">200</span><span class="text-textWeak">182 ms</span>
            </div>
            <ul class="space-y-2 text-sm text-textWeak [&>li]:flex [&>li]:gap-2 [&>li]:before:content-['×'] [&>li]:before:font-bold [&>li]:before:text-textError">
              <li>No request body</li>
              <li>No response body</li>
              <li>Possibly not this request at all, if it was sampled out</li>
              <li>Nothing you can send the supplier as proof</li>
            </ul>
          </div>
          <div class="p-6 space-y-4 border-t md:border-t-0 md:border-s border-strokeWeak min-w-0">
            <h3 class="text-base font-semibold text-textStrong">What monoscope keeps for every request</h3>
            <div class="rounded-lg overflow-hidden bg-[oklch(18%_0.02_263)]">
              <p class="px-4 py-2 text-xs font-mono text-white/50 border-b border-white/10">Response from api.acme-logistics.com at 07:52:14.208</p>
              <pre class="py-3 text-sm leading-relaxed font-mono text-white/90 overflow-x-auto [&>span]:block [&>span]:px-4"><span><span class="text-[#8FB6FF]">HTTP/1.1</span> 200 OK</span><span>{</span><span>  "shipment_id": <span class="text-[#F2C27B]">"shp_7Hk2m9"</span>,</span><span>  "status": <span class="text-[#F2C27B]">"acknowledged"</span>,</span><span class="bg-[#E11D5C]/25 text-[#FFB3C9] line-through decoration-[#FF7FA3]/60">  "tracking_id": "AX-99812-NG",</span><span>  "eta": <span class="text-[#F2C27B]">"2026-10-09"</span></span><span>}</span></pre>
            </div>
            <p class="text-sm text-textWeak text-pretty">monoscope notices the missing field, flags it as a breaking change and links it to the trace, the logs and the customer's session.</p>
          </div>
        </div>
      </div>

    </section>

    <section class="wrap tone-brand space-y-16 md:space-y-24 ">
            <!-- CAPABILITIES -->
      <div class="blk w-full space-y-8">
        <div class="space-y-4 max-w-3xl">
          <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Logs, traces, metrics and the rest</h3>
          <p class="text-xl leading-normal text-textWeak text-pretty">The rest of the toolbox, so monoscope replaces a tool instead of becoming one more.</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {% for c in this.frontmatter.capabilities %}
          <a href="{{c.link}}" class="group rounded-xl border border-strokeWeak p-5 flex flex-col gap-3 hover:border-strokeBrand-strong hover:bg-fillWeaker transition-colors">
            <span class="inline-flex p-2 rounded-lg bg-fillBrand-weak w-fit"><svg class="w-5 h-5 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#{{c.icon}}"></use></svg></span>
            <h3 class="text-base font-semibold text-textStrong">{{c.title}}</h3>
            <p class="text-sm leading-relaxed text-textWeak flex-1">{{c.details}}</p>
          </a>
          {% endfor %}
        </div>
      </div>

    </section>

    <section class="wrap tone-warning space-y-16 md:space-y-24 ">
            <!-- Coding agents -->
      <section id="agents" class="blk w-full space-y-8 scroll-mt-24">
        <div class="space-y-4 max-w-3xl">
          <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Your coding agent reads production too</h3>
          <p class="text-xl leading-normal text-textWeak text-pretty">Claude Code, Cursor or your own agents ask what broke and get the stored request and response back, not a guess from the code.</p>
        </div>
        {% render "default/components/cmd-cards", items:this.frontmatter.agents, cols:"lg:grid-cols-3" %}
      </section>

    </section>

    <section class="wrap tone-success space-y-16 md:space-y-24 ">
            <!-- SECURITY -->
      <section id="security" class="blk w-full grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 scroll-mt-24">
        <div class="space-y-4 max-w-3xl">
          <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Your data, your bucket, code you can read</h3>
          <p class="text-xl leading-normal text-textWeak text-pretty">What leaves your app, where it's stored, and who can read the code that handles it.</p>
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

    </section>

    <section class="wrap tone-violet space-y-16 md:space-y-24 ">
            <!-- Switching + CTA -->
      <section class="blk w-full">
        <div class="rounded-2xl bg-[oklch(18%_0.02_263)] text-white p-6 md:p-10 grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-16">
          <div class="space-y-5">
            <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance">See it on your own traffic</h3>
            <p class="text-lg leading-normal text-white/70 text-pretty">Free up to 10,000 events a day, no credit card. Or open the playground and click through a live project without signing up.</p>
            <div class="flex flex-wrap gap-3">
              <a href="https://app.monoscope.tech" class="btn py-3 px-6 rounded-xl bg-fillBrand-strong text-textInverse-strong" data-tracking="index-start-trial-3" data-reddit-event="SignUp">Start for free</a>
              <a href="https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer" class="btn py-3 px-6 rounded-xl bg-white/10 border-white/15 text-white hover:bg-white/15" data-tracking="index-playground-3" data-reddit-event="ViewContent">Launch playground</a>
              <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" target="_blank" rel="noopener noreferrer" class="btn py-3 px-6 rounded-xl bg-transparent border-white/15 text-white hover:bg-white/10" data-tracking="index-book-call" data-reddit-event="ScheduleDemo">Book a call</a>
            </div>
          </div>
          <div class="space-y-5">
            <p class="font-mono text-xs uppercase tracking-wider text-white/50">Switching takes three steps</p>
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

    </section>
    <!-- REAL RESULTS FROM CUSTOMERS -->
    <div id="results" class="wrap space-y-8">
      <div class="space-y-4 max-w-3xl">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">What changed for teams <span class="text-textDisabled">on monoscope</span></h2>
        <a href="https://www.trustpilot.com/review/apitoolkit.io" target="_blank" rel="noopener noreferrer" class="inline-block text-textBrand underline underline-offset-2">All reviews on Trustpilot</a>
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
    <section id="faq" class="wrap grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 scroll-mt-24">
      <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Questions teams ask before leaving Datadog</h2>
      <div class="divide-y divide-strokeWeak border-y border-strokeWeak">
        {% for f in this.frontmatter.faq %}
        <details class="group py-5">
          <summary class="flex items-center justify-between gap-4 min-h-11 cursor-pointer list-none text-lg font-medium text-textStrong [&::-webkit-details-marker]:hidden">{{f.q}}<svg class="size-5 shrink-0 text-textWeak group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
          <p class="pt-3 max-w-[65ch] text-base leading-relaxed text-textWeak text-pretty [&_code]:font-mono [&_code]:text-sm [&_code]:bg-fillWeak [&_code]:px-1 [&_code]:rounded">{{f.a}}</p>
        </details>
        {% endfor %}
      </div>
    </section>

    <section class="wrap">
      <div class="rounded-[2rem] bg-[oklch(18%_0.02_263)] text-white px-6 py-16 md:py-24 flex flex-col items-center text-center gap-6">
        <h2 class="text-4xl md:text-6xl font-medium tracking-tight leading-[1.05] text-balance">Run it next to Datadog before your renewal.</h2>
        <p class="text-lg md:text-xl leading-relaxed text-white/70 max-w-[48ch] text-pretty">Free up to 10k events a day. We'll help you move the rest.</p>
        <div class="flex flex-wrap justify-center gap-3">
          <a href="https://app.monoscope.tech" class="btn py-3 px-6 rounded-xl bg-fillBrand-strong text-textInverse-strong" data-tracking="lp-start-final" data-reddit-event="SignUp">Start for free</a>
          <a href="https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer" class="btn py-3 px-6 rounded-xl bg-white/10 border-white/15 text-white hover:bg-white/15" data-tracking="lp-playground-final" data-reddit-event="ViewContent">Launch playground</a>
        </div>
      </div>
    </section>

</section>

```
