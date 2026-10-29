---
title: Observability with an AI SRE built in
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

hero_tabs:
  - { id: issues, label: Issues, icon: bug, tone: warning, demo: "/assets/demos/know-b.html" }
  - { id: logs, label: "Logs & traces", icon: align-left, tone: brand, demo: "/assets/demos/prove-b.html" }
  - { id: dashboards, label: Dashboards, icon: bar-chart, tone: success, demo: "/assets/demos/dashboards-b.html" }
  - { id: replay, label: Replay, icon: circle-play, tone: violet, demo: "/assets/demos/replay-b.html" }
  - { id: agent, label: AI SRE, icon: zap, tone: success, demo: "/assets/demos/fix-b.html" }

sections:
  - id: know
    icon: eye
    tone: brand
    art: know-lighthouse.webp
    eyebrow: Know what happened
    title: "Catches what breaks"
    lead: "Stop hearing about it from customers. monoscope watches errors, logs, traces and the shape of every request, and tells you first."
    demo: "/assets/demos/know-b.html"
    frame: "Slack · app.monoscope.tech / issues"
    brief: >-
      Issues list. Open an issue, then the request that triggered it: headers, body,
      response, trace. Click through to the log line and the session replay. 25-30s.
    link: /features/error-tracking/
    link_label: See how error tracking works
    bullets:
      - title: "Hear it before your customers do"
        icon: radio
        body: "The alert reaches Slack, PagerDuty or email with the exact request that failed, not a support ticket."
      - title: "Catches failures that still return 200"
        icon: plug
        body: "Missing fields and changed types in any API you serve or call, caught in the response."
      - title: "Flags what’s new, without rules"
        icon: eye
        body: "New errors, endpoints, request shapes and log patterns, flagged the moment they appear."

  - id: fix
    icon: code
    tone: warning
    art: fix-lighthouse.webp
    eyebrow: Fix it
    title: "Finds the cause and opens the fix"
    lead: "Reads the failing request, its trace and recent deploys, then opens a pull request with the fix."
    demo: "/assets/demos/fix-b.html"
    frame: app.monoscope.tech / ai / routines
    brief: >-
      Slack: a message from a routine with the root cause, the failing request and a
      PR link. Click through to the PR diff on GitHub. Then a question typed in Slack
      and its answer with a chart. 25-30s.
    link: /docs/ai/
    link_label: "AI reviews, routines and Slack"
    bullets:
      - title: "Opens the fix on its own"
        icon: github
        body: "Errors, crashes and regressions get a pull request, with the request that proves it."
      - title: "Answers in Slack"
        icon: users
        body: "Ask why checkout is slower than yesterday. It answers from logs, traces and deploys."
      - title: "Speeds up slow endpoints"
        icon: activity
        body: "Finds the slowest endpoints and queries, and opens PRs that make them faster."
    code_label: Claude Code · monoscope-skills:investigate
    code_class: nohighlight
    code: |
      <span class="block bg-white/10 rounded px-2 py-1 mb-3 text-white"><span class="text-white/50">&gt;</span> investigate why orders have been stuck in processing since this morning</span><span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope facets resource.service.name --top 3)
        <span class="text-white/50">⎿  orders-service 41,208 · checkout-api 18,733 · payments 9,410</span>
      <span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope logs search 'body has "tracking_id"' --since 6h --first --id-only)
        <span class="text-white/50">⎿  evt_01JA7Q3M9X4K2R</span>
      <span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(monoscope events context --at 2026-10-07T07:52:14Z --window 10m --summary)
        <span class="text-white/50">⎿  41 traces · orders-service → api.acme-logistics.com · 41 errors in advance()</span>
      <span class="block whitespace-normal mt-3 text-white">● Orders stopped advancing at 07:52, and it isn’t your code. Acme’s <span class="text-[#F2C27B]">POST /v1/shipments</span> still returns 200, but the response no longer includes <span class="text-[#F2C27B]">tracking_id</span>, so <span class="text-[#F2C27B]">advance()</span> throws and 41 orders are stuck. Your last deploy was <span class="text-[#F2C27B]">b7e21c0</span>, two days ago. Want me to open a pull request with a fallback?</span><span class="block bg-white/10 rounded px-2 py-1 mt-3 text-white"><span class="text-white/50">&gt;</span> yes</span><span class="text-[#4EBA65]">●</span> <b class="text-white">Bash</b>(gh pr create --title "Fall back when tracking_id is absent")
        <span class="text-white/50">⎿  Opened PR #491 · acme/orders-service</span>
  - id: prove
    art: prove-observatory.webp?v=5
    art_class: h-64 md:h-[26rem] saturate-[.8]
    icon: database
    tone: success
    eyebrow: Prove it
    title: "Keeps the proof, and puts it on every PR"
    lead: "Every request and response is kept, unsampled. Before a pull request merges, monoscope checks it against that record: does it fix the issue, or break something that worked?"
    demo: "/assets/demos/prove-b.html"
    frame: app.monoscope.tech / explorer
    brief: >-
      An outgoing request to a supplier API: the request body, the 200 response with
      its acknowledgement body, the timestamp. End on the share link. 20-25s.
    link: /features/byob-s3/
    link_label: "Query your data"
    bullets:
      - title: "Keeps every request and response"
        icon: align-left
        body: "Every call in and out, with bodies, trace and replay. One customer took it to court."
      - title: "Puts proof on every pull request"
        icon: github
        body: "Shows if a PR fixes the issue or breaks something, from real traffic and past incidents."
      - title: "Keeps it in your bucket"
        icon: database
        body: "Open Delta Lake and Parquet in your S3 bucket, queryable with DuckDB or SQL."
    code_label: "duckdb · or the same SQL from any Postgres client"
    code_class: language-sql
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
  - id: start
    art: start-path.webp
    tone: violet
    eyebrow: Get started
    title: Two ways to start
    lead: Let your coding agent set it up, or point any OpenTelemetry exporter at monoscope. 780+ integrations, free up to 10k events a day.

routines:
  - schedule: "Every 5 minutes"
    prompt: "“Read the new logs and spans. If anything looks wrong, find the cause.”"
    outcome: "posts the cause in #oncall"
    systems: "otel|OpenTelemetry,errors|Errors,slack|Slack"
  - schedule: "After every deploy"
    prompt: "“Compare errors, latency and response shapes with the previous version.”"
    outcome: "replies in the deploy thread"
    systems: "github|GitHub,otel|OpenTelemetry,slack|Slack"
  - schedule: "Every night"
    prompt: "“Find the slowest endpoints and queries, and make them faster.”"
    outcome: "opens a PR with the optimization"
    systems: "otel|OpenTelemetry,github|GitHub"
  - schedule: "Weekdays at 09:00"
    prompt: "“Summarize what broke overnight, what’s still open and what’s getting worse.”"
    outcome: "sends a briefing to Slack"
    systems: "errors|Errors,linear|Linear,slack|Slack"

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
    tab: CLI
    body: One binary that gives your terminal, your CI and your agents the same view of production, with stable JSON output for scripts.
    cmd: |
      curl https://monoscope.tech/install.sh | sh
      monoscope logs search 'body has "tracking_id"' --since 6h
    link: /docs/ai/cli/
  - title: Agent skills
    tab: Skills
    body: Skills for investigating incidents, on-call triage, managing monitors and dashboards, and adding instrumentation, in Claude Code or Codex.
    cmd_codex: npx skills add monoscope-tech/skills -a codex
    cmd: |
      claude plugin marketplace add monoscope-tech/skills
      claude plugin install monoscope-skills@monoscope-skills
    link: /docs/ai/
  - title: A hosted MCP server
    tab: MCP server
    body: About 50 tools for Claude Desktop, Cursor or your own agents, using the same API key, with nothing to install.
    cmd: https://api.monoscope.tech/api/v1/mcp
    link: /docs/ai/mcp/

onboarding:
  - title: With your coding agent
    icon: zap
    kicker: Recommended · about 2 minutes
    win: "Terminal"
    lang: bash
    body: Ask your agent to instrument the project. It covers HTTP, SQL, queues and jobs, and checks that every route reports in.
    cmd: |
      npx skills add monoscope-tech/skills
      curl https://monoscope.tech/install.sh | sh
    link: /docs/ai/
    link_label: Set up with your agent
  - title: By hand, in any language
    icon: code
    kicker: Any OpenTelemetry SDK or collector
    win: ".env"
    lang: ini
    body: Set four environment variables. Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir also capture bodies.
    cmd: |
      OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
      OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
      OTEL_SERVICE_NAME="orders-service"
      OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
    link: /docs/sdks/
    link_label: Browse the SDK docs

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
  - icon: zap
    group: watch
    title: "AI SRE"
    visual: slack
    visual_alt: "monoscope in Slack: a supplier API stopped sending tracking_id, 41 shipments are stuck, with buttons to open PR #491 or view the 41 requests."
    link_label: "See the AI SRE"
    details: "Investigate production issues, find the cause and open a pull request."
    link: /docs/ai/
  - icon: align-left
    group: watch
    title: "Requests, logs and traces"
    visual: requests
    visual_alt: "Response body, request body and headers tabs showing a 500 error with code, message and collapsed details."
    link_label: "Explore requests and traces"
    details: "Payloads, telemetry and everything else that explains the failure."
    link: /features/api-logs-and-metrics/
  - icon: bar-chart
    group: watch
    title: "Metrics and dashboards"
    visual: metrics
    visual_alt: "Request latency percentiles plotted over time in a Monoscope dashboard."
    link_label: "View dashboards"
    details: "Track latency, traffic and errors on dashboards you keep as code."
    link: /docs/dashboard/dashboard-pages/dashboard/
  - icon: monitor
    group: watch
    title: "Session replay"
    visual: session-replay
    visual_alt: "Recorded customer screen inside Monoscope’s session replay player, with the playback timeline and controls."
    link_label: "See session replay"
    details: "Watch the customer’s session and jump to the request behind the error."
    link: /docs/sdks/Javascript/browser/
---

```=html
<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" focusable="false" class="absolute">
  <symbol id="routine-slack" viewBox="0 0 24 24"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></symbol>
  <symbol id="routine-linear" viewBox="0 0 24 24"><path d="M2.886 4.18A11.982 11.982 0 0 1 11.99 0C18.624 0 24 5.376 24 12.009c0 3.64-1.62 6.903-4.18 9.105L2.887 4.18ZM1.817 5.626l16.556 16.556c-.524.33-1.075.62-1.65.866L.951 7.277c.247-.575.537-1.126.866-1.65ZM.322 9.163l14.515 14.515c-.71.172-1.443.282-2.195.322L0 11.358a12 12 0 0 1 .322-2.195Zm-.17 4.862 9.823 9.824a12.02 12.02 0 0 1-9.824-9.824Z"/></symbol>
  <symbol id="routine-jira" viewBox="0 0 24 24"><path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z"/></symbol>
</svg>
<style>
  .eyebrow { color: color-mix(in oklab, var(--tone) 72%, black); }
  [data-theme="dark"] .eyebrow, [data-theme="dark"] [data-theme="dark"] .eyebrow { color: var(--tone); }
  @media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) .eyebrow { color: var(--tone); } }
  footer h3 { color: var(--color-textWeak) !important; }
  /* footer wordmark sits low enough that the hills and observatories pass in front of it */
  body .footer-scene .footer-scene-wordmark { top: 34%; }
  @media (max-width: 639px) { body .footer-scene .footer-scene-wordmark { top: 40%; } }
  /* cards sit slightly above the page: white with a hairline shadow in light, a half-step toward bgRaised in dark */
  body { --card-bg: #fff; --card-shadow: 0 1px 2px oklch(0 0 0 / .04); }
  [data-theme="dark"] { --card-bg: color-mix(in oklab, var(--color-bgBase), var(--color-bgRaised) 55%); --card-shadow: none; }
  .card { background: var(--card-bg); box-shadow: var(--card-shadow); }
  /* routine cards and the comparison table break out of the reading column; their headings and links stay in it */
  @media (min-width: 1360px) { .bleed { --w: min(96rem, 100vw - 2 * (var(--inset) + var(--gutter))); width: var(--w); max-width: none; margin-inline: calc((100% - var(--w)) / 2); } }
  /* a rule above the closing CTA, matching the footer's own divider */
  .max-w-9xl:not(nav):has(> h2) { position: relative; }
  .max-w-9xl:not(nav):has(> h2)::before { content: ""; position: absolute; top: 0; inset-inline: .75rem; border-top: 1px solid var(--color-strokeWeak); }
  [data-theme="light"] main a.text-textBrand { color: #005bd1; }
  [data-theme="light"] main [data-theme="dark"] a.text-textBrand { color: var(--color-textBrand); }
</style>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main'); if (!main) return; main.id ||= 'main';
    document.body.insertAdjacentHTML('afterbegin', `<a href="#${main.id}" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[100] focus:rounded-lg focus:bg-bgBase focus:px-4 focus:py-3 focus:text-textStrong focus:shadow-lg">Skip to content</a>`);
  });
</script>
<script src="/assets/js/demo-scene.js" data-width="1180" data-height="820" defer></script>
{% assign preloads = "/assets/demos/know-b.html,/assets/demos/screens-ipad/app.css,/assets/demos/screens-ipad/issues-errors.html" | split: "," %}
{% for href in preloads %}<link rel="preload" as="fetch" crossorigin href="{{href}}">{% endfor %}

<section class="flex flex-col space-y-20 md:space-y-28 items-center relative" style="z-index: 1;">
  <section class="space-y-12 mt-(--inset) w-full flex flex-col items-center">
    <!-- Dark inset hero: gradient sky, painted horizon anchored below the demo -->
    <div class="hero-paint hero-sky relative panel-w rounded-[2rem] overflow-hidden text-textStrong ring-1 ring-black/5 dark:ring-white/10">
    <img src="/assets/img/home/art/hero-morning.webp?v=5" alt="" data-anchor-to="[data-hero-tabs] [role=tablist]" data-anchor-at="0.8" class="dark:hidden absolute inset-x-0 top-0 w-full h-auto max-sm:h-[44%] max-sm:object-cover max-sm:object-[94%_0%] max-sm:opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_28%,black_80%,transparent)]">
    <img src="/assets/img/home/art/hero-shore-morning.webp" alt="" class="dark:hidden absolute inset-x-0 bottom-0 w-full h-auto min-h-48 object-cover object-[18%_100%] [mask-image:linear-gradient(to_top,black_55%,rgb(0_0_0/.5)_78%,transparent)]">
    <img src="/assets/img/home/art/hero-night.webp" alt="" data-art data-lamp="0.821,0.282" data-beam="out" class="hidden dark:block absolute inset-x-0 top-0 w-full h-[62%] object-cover object-[50%_0%] brightness-[.72] saturate-[.85] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_70%,transparent)]">
    <img src="/assets/img/home/art/hero-shore.webp" alt="" data-art data-glint class="hidden dark:block absolute inset-x-0 bottom-0 w-full h-auto min-h-48 object-cover object-[18%_100%] brightness-[.65] saturate-[.9] [mask-image:linear-gradient(to_top,black_55%,rgb(0_0_0/.5)_78%,transparent)]">
    <div aria-hidden="true" class="absolute inset-0 pointer-events-none bg-[radial-gradient(75%_34%_at_50%_24%,rgb(255_255_255/0.72),rgb(255_255_255/0.4)_50%,transparent_85%)] dark:bg-[radial-gradient(60%_45%_at_70%_28%,oklch(14%_0.04_270/0.7),transparent_75%)]"></div>
    <div class="relative flex flex-col items-center space-y-12 pt-16 sm:pt-28">
      <div class="grid md:grid-cols-[3fr_2fr] wrap-in gap-8 md:gap-x-16 md:gap-y-5 items-start mb-[clamp(5rem,10vw,12rem)]!">
        <div class="flex flex-col gap-5 md:contents">
          <h1 class="md:col-start-1 md:row-start-1 text-5xl md:text-7xl font-medium tracking-tight leading-tight text-balance text-textStrong">Know what happened.<br class="hidden md:block"> <span class="text-textWeak">Fix it. Prove it.</span></h1>
        </div>
        <div class="hero-copy md:col-start-2 md:row-start-1 space-y-6 md:pt-2">
          <p class="text-lg md:text-2xl leading-relaxed text-textStrong/85 text-pretty max-w-[44ch]">Observability data lake and an AI SRE agent, to catch issues and continuously improve production.</p>
          <div class="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="https://app.monoscope.tech" class="btn h-auto min-h-11 py-3 px-6 rounded-xl bg-fillBrand-strong text-textInverse-strong text-base font-medium inline-flex items-center gap-2 whitespace-nowrap" data-tracking="index-start-trial-1" data-reddit-event="SignUp">Start for free <svg class="h-3 w-3" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
            <a href="https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/log_explorer" class="inline-flex items-center min-h-11 text-base font-medium text-textStrong whitespace-nowrap underline underline-offset-4 [text-decoration-thickness:from-font] decoration-strokeWeak hover:decoration-strokeStrong" data-tracking="index-playground-1" data-reddit-event="ViewContent">Launch playground</a>
          </div>
          <p class="flex flex-wrap items-center gap-x-3 gap-y-2 text-base leading-relaxed text-textWeak">
            <a href="https://www.trustpilot.com/review/apitoolkit.io" target="_blank" rel="noopener noreferrer"><img src="/assets/img/trustpilot-stars-4.5.svg" class="w-20 sm:w-24 shrink-0 mt-1" alt="Rated 4.5 out of 5 on Trustpilot" /></a>
            <span class="text-textStrong/80">Free up to 10k events a day. No credit card.</span>
          </p>
        </div>
      </div>

      <!-- Hero demos: segmented tabs on the frame’s top edge; the active pill fills as its demo plays, then advances -->
      <div class="sm:hidden w-full pb-16">
        <ul aria-label="Product screens" class="flex gap-3 overflow-x-auto snap-x snap-mandatory px-(--gutter) pb-2 [scrollbar-width:none]">
          {% assign shots = "alerts|The alert lands in Slack with the failing request;requests|Request and response bodies, next to the trace;ai-sre|The AI SRE finds the cause and opens the fix;session-replay|What the customer saw" | split: ";" %}
          {% for sh in shots %}{% assign f = sh | split: "|" %}
          <li class="snap-center shrink-0 w-[85%] space-y-3">
            <img src="/assets/img/home/capabilities/{{f[0]}}.webp?v=5" alt="" width="1280" height="800" loading="lazy" class="w-full rounded-xl ring-1 ring-white/10">
            <p class="text-sm text-textWeak text-pretty">{{f[1]}}</p>
          </li>
          {% endfor %}
        </ul>
      </div>
      <div class="hidden sm:block wrap-in pb-12 sm:pb-24" data-hero-tabs>
        <div role="tablist" aria-label="Product demos" data-theme="dark" class="relative z-10 mx-auto -mb-6 sm:-mb-7 w-fit flex items-center gap-1 rounded-xl border border-white/10 bg-[oklch(15%_0.02_285/0.92)]! backdrop-blur p-1.5 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.8)]">
          {% for s in this.frontmatter.hero_tabs %}{% unless forloop.first %}<span aria-hidden="true" class="w-px h-5 bg-white/15"></span>{% endunless %}
          <button type="button" role="tab" id="hero-tab-{{s.id}}" aria-controls="hero-demo-{{s.id}}" aria-selected="{% if forloop.first %}true{% else %}false{% endif %}" {% unless forloop.first %}tabindex="-1"{% endunless %} class="group tone-{{s.tone}} relative overflow-hidden flex items-center gap-2 rounded-lg px-3 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white/60 hover:text-white transition-colors aria-selected:text-(--tone) aria-selected:bg-[color-mix(in_oklab,var(--tone-fill)_14%,transparent)]">
            <span data-fill aria-hidden="true" class="hidden group-aria-selected:block absolute inset-0 origin-left scale-x-0 transition-transform duration-50 ease-linear bg-[color-mix(in_oklab,var(--tone-fill)_45%,transparent)]"></span>
            <svg class="relative w-4 h-4 sm:w-5 sm:h-5"><use xlink:href="/assets/deps/sprite.svg#{{s.icon}}"></use></svg><span class="relative">{{ s.label }}</span>
          </button>
          {% endfor %}
        </div>
        {% for s in this.frontmatter.hero_tabs %}
        <div role="tabpanel" id="hero-demo-{{s.id}}" aria-labelledby="hero-tab-{{s.id}}" {% unless forloop.first %}hidden{% endunless %} data-theme="dark" class="rounded-xl border border-strokeWeak bg-bgRaised! overflow-hidden shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)]">
          <div class="h-[31px] border-b border-strokeWeak"></div>
          <div class="relative bg-fillWeak" style="aspect-ratio: 1180 / 820;"><demo-scene src="{{s.demo}}" class="absolute inset-0"></demo-scene></div>
        </div>
        {% endfor %}
        <script>
        (() => {
          const root = document.querySelector('[data-hero-tabs]'), tabs = [...root.querySelectorAll('[role=tab]')];
          const panels = tabs.map(t => document.getElementById(t.getAttribute('aria-controls')));
          let cur = 0;
          const select = (i, focus, auto) => {
            cur = (i + tabs.length) % tabs.length;
            tabs.forEach((t, k) => { t.setAttribute('aria-selected', k === cur); t.tabIndex = k === cur ? 0 : -1; panels[k].hidden = k !== cur; });
            if (focus) tabs[cur].focus();
            if (auto) panels[cur].animate({ opacity: [0, 1] }, { duration: 200, easing: 'cubic-bezier(.23,1,.32,1)' });
          };
          tabs.forEach((t, k) => {
            const fill = t.querySelector('[data-fill]'), demo = panels[k].querySelector('demo-scene');
            t.addEventListener('click', () => select(k));
            demo.addEventListener('progress', e => { fill.style.scale = e.detail + ' 1'; });
            demo.addEventListener('loop', () => { fill.style.scale = '0 1'; if (k === cur) select(k + 1, false, true); });
          });
          root.querySelector('[role=tablist]').addEventListener('keydown', e => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); select(cur + d, true); } });
        })();
        </script>
      </div>

      <div class="w-full grid grid-cols-4 sm:grid-cols-8 gap-px bg-black/5 dark:bg-white/10 border-t border-black/5 dark:border-white/10 *:bg-white/45 dark:*:bg-black/35 *:backdrop-blur-sm *:p-5 *:flex *:items-center *:justify-center [&_img]:h-5 [&_img]:sm:h-7 [&_img]:brightness-0 dark:[&_img]:invert [&_img]:opacity-70">
          {% assign customers = "Andela|andela.svg,Partna|partna.svg,Grovepay|grovepay.svg,Sameday|sameday.svg,Platnova|platnova.png,Payfonte|payfonte.svg,Thepeer|thepeer.svg,Blockradar|blockradar-full.svg" | split: "," %}
          {% for c in customers %}{% assign cn = c | split: "|" %}<div><img src="/assets/img/customers/{{cn[1]}}" alt="{{cn[0]}}"></div>{% endfor %}
      </div>
    </div>
    </div>

      <!-- Proof strip -->
      <div class="wrap max-w-[80rem]">
        <h2 class="max-w-4xl pt-8 pb-16 md:pt-12 md:pb-20 text-3xl md:text-4xl font-medium tracking-tight leading-[1.25] text-balance text-textStrong">monoscope watches, fixes and improves production,<br class="hidden lg:block"> <span class="text-textWeak">so your engineers can focus on building.</span></h2>
        <div class="grid sm:grid-cols-3 gap-px bg-strokeWeak border border-strokeWeak rounded-t-xl overflow-hidden *:bg-(--card-bg) *:p-5 text-textWeak">
          <div><span class="text-3xl font-medium tracking-tight text-textStrong">Open source</span><br/>AGPL 3.0</div>
          <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">20x</span><br/>faster MTTR at Blockradar</div>
          <div><span class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">780+</span><br/>OpenTelemetry integrations</div>
        </div>
        <div class="grid md:grid-cols-2 gap-px bg-strokeWeak border border-t-0 border-strokeWeak rounded-b-xl overflow-hidden *:bg-(--card-bg) *:p-5 text-textWeak">
          {% assign reviews = "sebastian_zwach.jpeg|Sebastian Zwach|Founder of Neorent GmbH|Easy onboarding and they added an integration just for our use case, thanks again! We didn’t have insights into our API load before and this helps very much.;joshua.jpeg|Joshua Chinemezum|CEO of Platnova|We had a major incident, and our tech support could see via APItoolkit which third-party integration partner was responsible, and could take action without needing the engineering team’s help." | split: ";" %}
          {% for r in reviews %}{% assign f = r | split: "|" %}
          <figure class="flex flex-col gap-4">
            <a href="https://www.trustpilot.com/review/apitoolkit.io" target="_blank" rel="noopener noreferrer" class="inline-flex gap-0.5 w-fit" aria-label="Five-star review on Trustpilot">{% for i in (1..5) %}<svg class="h-4 w-4 text-[#00b67a]"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg>{% endfor %}</a>
            <blockquote class="text-textStrong text-pretty flex-1">“{{f[3]}}”</blockquote>
            <figcaption class="flex gap-3 items-center text-base">
              <img class="rounded-lg grayscale w-9 h-9 object-cover" src="/assets/img/love/{{f[0]}}" alt="{{f[1]}}" />
              <span><span class="text-textStrong">{{f[1]}}</span>, {{f[2]}}</span>
            </figcaption>
          </figure>
          {% endfor %}
        </div>
      </div>
    </section>


    <section class="tone-brand relative w-full">
      <div class="relative wrap max-w-[80rem] pt-8 md:pt-12 pb-8 space-y-14">
      <div class="space-y-6 max-w-3xl [&>p:first-child]:mb-3.5">
        <p class="inline-flex rounded-md px-2.5 py-1 eyebrow font-mono text-[12px] uppercase tracking-wider bg-(--tone-weak)">Why the full request matters</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-balance text-textStrong">A 200 OK can hide 41 stuck orders.</h2>
        <p class="max-w-[65ch] text-lg md:text-xl leading-[1.65] text-textWeak text-pretty">A supplier drops <code class="font-mono text-base">tracking_id</code> but still returns 200 OK. Without the full response, an AI investigation guesses wrong.</p>
      </div>
      <div class="space-y-24 md:space-y-32">
      <div class="card rounded-2xl border border-strokeWeak overflow-hidden">
        <style>
          .context-gaps { display: grid; }
          .context-gap { display: grid; gap: 1.25rem; padding: 1.5rem; min-width: 0; }
          .context-gap + .context-gap { border-top: 1px solid var(--color-strokeWeak); }
          .context-evidence { display: flex; flex-direction: column; justify-content: center; gap: .75rem; min-height: 7rem; }
          .context-samples { display: grid; grid-template-columns: repeat(14, minmax(0, 1fr)); gap: .375rem; max-width: 18rem; }
          .context-samples span { width: .5rem; height: .5rem; border-radius: 50%; background: var(--color-strokeWeak); }
          .context-samples .kept { background: var(--color-textError); }
          @media (min-width: 768px) {
            .context-gaps { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            .context-gap { grid-row: span 3; grid-template-rows: subgrid; }
            .context-gap + .context-gap { border-top: 0; border-inline-start: 1px solid var(--color-strokeWeak); }
          }
          /* Plays once on scroll-in. Initial states live under :not(.play), so no-JS and reduced motion get the final frame. */
          .ctx-anim .ctx-status, .ctx-anim .ctx-body > span { transition: opacity .3s ease-out, filter .3s ease-out; }
          .ctx-anim .ctx-status { transition-delay: .15s; }
          .ctx-anim .ctx-body > span { transition-delay: .9s; }
          .ctx-body { position: relative; }
          .ctx-anim .ctx-body::before { content: ""; position: absolute; inset-inline-end: 0; top: 50%; width: 6.5rem; height: .5rem; margin-top: -.25rem; border-radius: 9999px; background: var(--color-fillWeak); opacity: 0; transition: opacity .2s ease-out .9s; }
          .ctx-anim:not(.play) .ctx-status, .ctx-anim:not(.play) .ctx-body > span { opacity: 0; filter: blur(4px); }
          .ctx-anim:not(.play) .ctx-body::before { opacity: 1; }
          .ctx-anim.play .context-samples span { animation: ctx-drop 1.4s ease-out calc(.3s + var(--i) * 20ms) both; }
          .ctx-anim.play .context-samples .kept { animation-name: ctx-keep; }
          @keyframes ctx-drop { 0%, 100% { background: var(--color-strokeWeak); } 15%, 50% { background: var(--color-textError); } }
          @keyframes ctx-keep { 0% { background: var(--color-strokeWeak); } 15%, 100% { background: var(--color-textError); } }
          .ctx-was { stroke-dasharray: 200 200; stroke-dashoffset: -200; }
          .ctx-anim .ctx-was, .ctx-anim .ctx-cut { transition: stroke-dashoffset 1.4s cubic-bezier(.65,0,.35,1) .9s, transform 1.4s cubic-bezier(.65,0,.35,1) .9s; }
          .ctx-anim:not(.play) .ctx-was { stroke-dashoffset: 0; }
          .ctx-anim:not(.play) .ctx-cut { transform: translateX(-200px); }
          .ctx-anim .ctx-hl, .ctx-anim .ctx-hl > span:last-child { transition: background-color .4s ease-out 2.4s, opacity .4s ease-out 2.4s; }
          .ctx-anim:not(.play) .ctx-hl { background-color: transparent; }
          .ctx-anim:not(.play) .ctx-hl > span:last-child { opacity: 0; }
        </style>
        <div class="context-gaps">
          <div class="context-gap">
            <h3 class="flex items-baseline gap-3 text-xl font-semibold leading-[1.35] text-textStrong"><span aria-hidden="true" class="font-mono text-sm text-(--tone)">01</span>Missing payloads</h3>
            <div class="context-evidence">
              <p class="font-mono text-[12px] text-textWeak">POST /v1/shipments · 182 ms</p>
              <dl class="space-y-2 text-base">
                <div class="flex justify-between gap-3"><dt class="text-textWeak">Status</dt><dd class="ctx-status font-mono text-textStrong">200 OK</dd></div>
                <div class="flex justify-between gap-3"><dt class="text-textWeak">Response body</dt><dd class="ctx-body font-mono text-textError"><span>{ unavailable }</span></dd></div>
              </dl>
            </div>
            <blockquote class="rounded-lg bg-fillError-weak px-4 py-3 text-base leading-relaxed text-textStrong text-pretty"><span class="font-medium text-textError">AI:</span> “The supplier returned 200. Check your code.”</blockquote>
          </div>
          <div class="context-gap">
            <h3 class="flex items-baseline gap-3 text-xl font-semibold leading-[1.35] text-textStrong"><span aria-hidden="true" class="font-mono text-sm text-(--tone)">02</span>Sampled requests</h3>
            <div class="context-evidence">
              <div class="context-samples" aria-hidden="true">{% for i in (1..41) %}<span style="--i:{{i}}"{% if i == 3 or i == 18 or i == 36 %} class="kept"{% endif %}></span>{% endfor %}</div>
              <p class="text-base leading-relaxed text-textWeak">Only a sample of 41 failures retained.</p>
            </div>
            <blockquote class="rounded-lg bg-fillError-weak px-4 py-3 text-base leading-relaxed text-textStrong text-pretty"><span class="font-medium text-textError">AI:</span> “Only a few errors. Probably noise.”</blockquote>
          </div>
          <div class="context-gap">
            <h3 class="flex items-baseline gap-3 text-xl font-semibold leading-[1.35] text-textStrong"><span aria-hidden="true" class="font-mono text-sm text-(--tone)">03</span>Short retention</h3>
            <div class="context-evidence">
              <svg viewBox="0 0 320 36" width="320" height="36" style="width: 100%; max-width: 20rem;" aria-hidden="true" fill="none">
                <path d="M4 18h200" stroke="currentColor" stroke-width="2" stroke-dasharray="4 6" class="text-textDisabled"/>
                <path d="M4 18h200" stroke="currentColor" stroke-width="3" class="ctx-was text-textBrand"/>
                <path d="M204 18h112" stroke="currentColor" stroke-width="3" class="text-textBrand"/>
                <path d="M204 6v24" stroke="currentColor" stroke-width="2" class="ctx-cut text-textWeak"/>
                <circle cx="316" cy="18" r="4" fill="currentColor" class="text-textBrand"/>
              </svg>
              <p class="flex justify-between gap-3 text-base text-textWeak"><span>Earlier history lost</span><span class="text-textStrong">Last 15 days</span></p>
            </div>
            <blockquote class="rounded-lg bg-fillError-weak px-4 py-3 text-base leading-relaxed text-textStrong text-pretty"><span class="font-medium text-textError">AI:</span> “No previous occurrence found.”</blockquote>
          </div>
        </div>
        <div class="border-t border-strokeSuccess-weak bg-fillSuccess-weak dark:bg-[color-mix(in_oklab,var(--color-fillSuccess-strong)_13%,var(--color-bgBase))] p-4 md:p-6 grid lg:grid-cols-[3fr_2fr] gap-6 lg:gap-10 items-center">
        <div class="rounded-lg overflow-hidden bg-[oklch(18%_0.02_263)] min-w-0">
          <p class="px-4 py-2 text-sm font-mono text-white/70 border-b border-white/10">Response comparison · api.acme-logistics.com · before / after 07:52</p>
          <pre class="py-3 text-base leading-relaxed font-mono text-white/90 overflow-x-auto [&>span]:block [&>span]:px-4"><span><span class="text-white/50">HTTP/1.1</span> 200 OK</span><span>{</span><span>  <span class="text-[#8FB6FF]">"shipment_id"</span>: <span class="text-[#F2C27B]">"shp_7Hk2m9"</span>,</span><span>  <span class="text-[#8FB6FF]">"status"</span>: <span class="text-[#F2C27B]">"acknowledged"</span>,</span><span class="ctx-hl flex! justify-between gap-6 w-max min-w-full! bg-[#E11D5C]/25"><span class="text-[#FFB3C9] line-through decoration-[#FF7FA3]/60">  "tracking_id": "AX-99812-NG",</span><span class="text-[#FF9AB6] whitespace-nowrap">missing since 07:52</span></span><span>  <span class="text-[#8FB6FF]">"eta"</span>: <span class="text-[#F2C27B]">"2026-10-09"</span></span><span>}</span></pre>
        </div>
        <div class="space-y-4">
          <p class="text-sm font-medium text-textSuccess">With monoscope</p>
          <p class="[text-indent:-0.42em] text-xl leading-snug text-textStrong text-pretty [&_code]:font-mono [&_code]:text-lg">“Acme removed <code>tracking_id</code>. All 41 failures started at 07:52.”</p>
          <div class="rounded-xl border border-strokeSuccess-weak bg-bgBase p-5 space-y-3">
            <p class="flex items-center gap-3 text-base font-semibold text-textStrong"><svg class="w-5 h-5 shrink-0 text-textSuccess" aria-hidden="true"><use href="/assets/deps/sprite.svg#github"></use></svg><span>monoscope opened the pull request</span></p>
            <p class="text-base leading-relaxed text-textStrong text-pretty"><span class="font-mono text-sm text-textSuccess">PR #491</span> · Fall back when <code class="font-mono text-sm">tracking_id</code> is absent</p>
            <p class="text-sm text-textWeak">The fix is ready for your review.</p>
          </div>
        </div>
      </div>
      <script>
        (() => {
          const el = document.currentScript.parentElement;
          if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
          el.classList.add('ctx-anim');
          new IntersectionObserver(([e], o) => { if (e.isIntersecting) { el.classList.add('play'); o.disconnect(); } }, { threshold: .35 }).observe(el);
        })();
      </script></div>
      <div class="space-y-6">
        <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Routines: AI checks that run on a schedule, <span class="text-textWeak">then act on what they find.</span></h3>
        <div class="bleed grid sm:grid-cols-2 sm:grid-rows-[auto_1fr_auto_auto_1fr_auto] min-[85rem]:grid-cols-4 min-[85rem]:grid-rows-[auto_1fr_auto] gap-4">
        {% for routine in this.frontmatter.routines %}
        <div class="card rounded-xl border border-strokeWeak p-5 flex flex-col gap-3 sm:row-span-3 sm:grid sm:grid-rows-subgrid">
          <p class="w-fit rounded-md px-2 py-0.5 font-mono text-sm bg-fillWeak text-textStrong">{{routine.schedule}}</p>
          <p class="[text-indent:-0.42em] text-base font-medium leading-snug text-textStrong text-pretty flex-1">{{routine.prompt}}</p>
          <div class="space-y-4">
            <p class="text-base leading-relaxed text-textWeak text-pretty"><span class="text-textStrong">Then</span> {{routine.outcome}}</p>
            <ul aria-label="Systems used by this routine" class="flex flex-wrap gap-1.5 border-t border-strokeWeak pt-4">
              {% assign systems = routine.systems | split: "," %}
              {% for system in systems %}{% assign tool = system | split: "|" %}
              <li class="inline-flex items-center gap-1 rounded-md bg-fillWeak px-1.5 py-1 text-[12px] text-textStrong">
                {% if tool[0] == 'otel' %}<img src="/assets/img/sdk-icons/opentelemetry.svg" alt="" class="w-4 h-4 shrink-0" loading="lazy">
                {% elsif tool[0] == 'github' %}<svg class="w-4 h-4 shrink-0" aria-hidden="true"><use href="/assets/deps/sprite.svg#github"></use></svg>
                {% elsif tool[0] == 'errors' %}<svg class="w-4 h-4 shrink-0 text-textError" aria-hidden="true"><use href="/assets/deps/sprite.svg#bug"></use></svg>
                {% else %}<svg viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 shrink-0{% if tool[0] == 'jira' %} text-textBrand{% endif %}" aria-hidden="true"><use href="#routine-{{tool[0]}}"></use></svg>{% endif %}
                <span>{{tool[1]}}</span>
              </li>
              {% endfor %}
            </ul>
          </div>
        </div>
        {% endfor %}
        </div>
        <a href="/docs/ai/" class="mt-8 inline-flex items-center gap-2 text-base font-medium text-textBrand underline underline-offset-4">Read the AI docs <span aria-hidden="true">→</span></a>
      </div></div>
      </div>
    </section>

    <!-- Chapters: one hue each, joined by a rail; odd chapters sit on tinted panels -->
    <div class="w-full">
    {% for s in this.frontmatter.sections %}
    <section id="{{s.id}}" class="tone-{{s.tone}} relative w-full scroll-mt-16">
      {% assign odd = forloop.index | modulo: 2 %}{% if odd == 1 or s.art %}<div aria-hidden="true" class="absolute top-(--inset) bottom-0 left-1/2 -translate-x-1/2 panel-w rounded-[2rem] overflow-hidden bg-(--tone-panel) border border-(--tone-weak)">{% if s.art %}<img src="/assets/img/home/art/{{s.art}}" alt="" loading="lazy" data-art{% if s.id == 'know' or s.id == 'start' %} data-glint{% endif %} class="absolute inset-x-0 bottom-0 w-full {% if s.art_class %}{{s.art_class}}{% else %}h-56 md:h-80{% endif %} object-cover object-left-bottom dark:opacity-60 [mask-image:linear-gradient(to_top,black_30%,rgb(0_0_0/.8)_44%,rgb(0_0_0/.52)_58%,rgb(0_0_0/.26)_72%,rgb(0_0_0/.09)_86%,transparent)]">{% endif %}</div>{% endif %}
      <div class="relative wrap max-w-[80rem] pt-32 md:pt-48 {% if s.id == 'start' %}pb-0{% elsif s.id == 'know' %}pb-0{% elsif s.art %}pb-56 md:pb-96{% else %}pb-24 md:pb-32{% endif %} space-y-24 md:space-y-32 lg:[&>.blk]:ps-12">
        <div aria-hidden="true" class="rail hidden lg:block absolute left-[23px] {% if s.art and s.id != 'know' and s.id != 'start' %}bottom-[21rem]{% else %}bottom-0{% endif %} m-0! w-0.5 bg-(--tone-line) {% if s.id == 'prove' %}top-0{% else %}top-[calc(8rem+13px)] md:top-[calc(12rem+13px)]{% endif %}"></div>
        <div class="space-y-14">
        <div class="relative space-y-6 max-w-3xl lg:ps-12 [&>p:first-of-type]:mb-3.5">
          <span aria-hidden="true" class="hidden lg:block absolute left-1.5 top-[7px] size-3 rounded-full border-2 border-(--tone) bg-bgBase"></span>
          <p class="inline-flex rounded-md px-2.5 py-1 eyebrow font-mono text-[12px] uppercase tracking-wider bg-(--tone-weak)">0{{forloop.index}} · {{s.eyebrow}}</p>
          <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-balance text-textStrong">{{s.title}}</h2>
          <p class="max-w-[65ch] text-lg md:text-xl leading-[1.65] text-textWeak text-pretty">{{s.lead}}</p>
        </div>
        {% if s.demo %}
        <div class="feature-demo-layout space-y-16 md:space-y-20">
          <div class="relative min-w-0 space-y-6">
          {% if s.id == 'prove' %}<div class="relative overflow-hidden rounded-xl ring-1 ring-white/10 bg-[#0D1117] text-[#F0F6FC] shadow-[0_24px_64px_-32px_var(--tone-fill)] [font-family:-apple-system,BlinkMacSystemFont,'Segoe_UI','Noto_Sans',Helvetica,Arial,sans-serif] [&_.m]:text-[#9198A1] [&_.b]:border-[#3D444D] [&_code]:font-mono [&_code]:text-[85%] [&_code]:rounded-md [&_code]:bg-[#656C7633] [&_code]:px-[0.4em] [&_code]:py-[0.2em]" role="img" aria-label="GitHub pull request #512: the monoscope bot requests changes, showing production traffic that still needs the tracking_id fallback">
            <div class="flex items-center gap-3 px-4 py-2.5 border-b b bg-[#010409]"><span class="flex gap-1.5"><i class="block size-3 rounded-full bg-[#FF5F57]"></i><i class="block size-3 rounded-full bg-[#FEBC2E]"></i><i class="block size-3 rounded-full bg-[#28C840]"></i></span><span class="flex-1 rounded-md bg-[#151B23] px-3 py-1 text-center text-[12px] m">github.com/acme/orders-service/pull/512</span></div>
            <div aria-hidden="true" class="px-5 md:px-6 pt-5 pb-6 text-[14px] leading-[1.5]">
              <p class="text-[24px] md:text-[28px] font-normal leading-tight">Simplify the Acme webhook handler <span class="m font-light">#512</span></p>
              <p class="mt-2 flex flex-wrap items-center gap-2 m"><span class="inline-flex items-center gap-1 rounded-full bg-[#238636] px-3 py-[5px] text-sm font-medium text-white"><svg class="size-4" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/></svg>Open</span><span><b class="text-[#F0F6FC] font-semibold">sam</b> wants to merge 3 commits into <span class="rounded-md bg-[#388BFD26] px-1.5 py-0.5 font-mono text-[12px] text-[#4493F8]">main</span> from <span class="rounded-md bg-[#388BFD26] px-1.5 py-0.5 font-mono text-[12px] text-[#4493F8]">sam/acme-cleanup</span></span></p>
              <div class="mt-4 flex gap-1 border-b b text-sm"><span class="-mb-px border-b-2 border-[#F78166] font-semibold text-[#F0F6FC] inline-flex items-center gap-2 px-2 pb-2.5"><svg class="size-4 shrink-0 text-[#9198A1]" viewBox="0 0 16 16" fill="currentColor"><path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1Z"/></svg>Conversation<span class="rounded-full bg-[#656C7633] px-1.5 text-[12px] leading-[18px] text-[#F0F6FC]">2</span></span><span class="m border-b-2 border-transparent inline-flex items-center gap-2 px-2 pb-2.5"><svg class="size-4 shrink-0 text-[#9198A1]" viewBox="0 0 16 16" fill="currentColor"><path d="M11.93 8.5a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/></svg>Commits<span class="rounded-full bg-[#656C7633] px-1.5 text-[12px] leading-[18px] text-[#F0F6FC]">3</span></span><span class="m border-b-2 border-transparent inline-flex items-center gap-2 px-2 pb-2.5"><svg class="size-4 shrink-0 text-[#9198A1]" viewBox="0 0 16 16" fill="currentColor"><path d="M2.5 1.75v11.5c0 .138.112.25.25.25h3.17a.75.75 0 0 1 0 1.5H2.75A1.75 1.75 0 0 1 1 13.25V1.75C1 .784 1.784 0 2.75 0h8.5C12.216 0 13 .784 13 1.75v7.736a.75.75 0 0 1-1.5 0V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13.274 9.537v-.001l-4.557 4.45a.75.75 0 0 1-1.055-.008l-1.943-1.95a.75.75 0 0 1 1.062-1.058l1.419 1.425 4.026-3.932a.75.75 0 1 1 1.048 1.074ZM4.75 4h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5Z"/></svg>Checks<span class="rounded-full bg-[#656C7633] px-1.5 text-[12px] leading-[18px] text-[#F0F6FC]">4</span></span><span class="m border-b-2 border-transparent hidden sm:inline-flex items-center gap-2 px-2 pb-2.5"><svg class="size-4 shrink-0 text-[#9198A1]" viewBox="0 0 16 16" fill="currentColor"><path d="M1 1.75C1 .784 1.784 0 2.75 0h7.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h10.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177l-2.914-2.914a.25.25 0 0 0-.177-.073ZM8 3.25a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0V7h-1.5a.75.75 0 0 1 0-1.5h1.5V4A.75.75 0 0 1 8 3.25Zm-3 8a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Z"/></svg>Files changed<span class="rounded-full bg-[#656C7633] px-1.5 text-[12px] leading-[18px] text-[#F0F6FC]">1</span></span></div>
              <div class="relative mt-5 space-y-5 ps-14 before:absolute before:start-[72px] before:top-0 before:bottom-0 before:w-0.5 before:bg-[#3D444D]">
                <div class="relative flex"><span class="absolute -start-14 top-0 grid size-10 place-items-center rounded-full bg-[#8250DF] text-sm font-semibold text-white">S</span>
                  <div class="relative flex-1 min-w-0 rounded-md border b bg-[#0D1117] before:absolute before:top-[13px] before:-left-2 before:size-3.5 before:rotate-45 before:border-b before:border-l before:border-[#3D444D] before:bg-[#151B23]"><div class="flex items-center gap-2 rounded-t-md border-b b bg-[#151B23] px-4 py-2 m"><span><b class="text-[#F0F6FC] font-semibold">sam</b> commented 2 hours ago</span><span class="ms-auto rounded-full border b px-2 text-[12px]">Author</span><span>···</span></div><div class="px-4 py-3 space-y-2"><p>Removes the old <code>tracking_id</code> fallback from the Acme webhook handler. Acme’s v2 API always sends it, so the lookup is dead code.</p></div></div></div>
                <div class="relative flex"><span class="absolute -start-14 top-0 grid size-10 place-items-center rounded-full bg-[#0068FF] font-mono text-[12px] font-bold text-white">[·]</span>
                  <div class="relative flex-1 min-w-0 rounded-md border b bg-[#0D1117] before:absolute before:top-[13px] before:-left-2 before:size-3.5 before:rotate-45 before:border-b before:border-l before:border-[#3D444D] before:bg-[#151B23]"><div class="flex items-center gap-2 rounded-t-md border-b b bg-[#151B23] px-4 py-2 m"><span><b class="text-[#F0F6FC] font-semibold">monoscope</b> <span class="rounded-full border b px-1.5 text-[12px]">bot</span> requested changes just now</span><span class="ms-auto">···</span></div>
                    <div class="px-4 py-3 space-y-3">
                      <div class="flex items-start gap-2.5 rounded-md border border-[#F8514966] bg-[#F851491A] px-3 py-2.5"><svg class="mt-0.5 size-4 shrink-0 text-[#F85149]" viewBox="0 0 16 16" fill="currentColor"><path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"/></svg><p><b class="text-[#F85149]">Do not merge.</b> Merging this would break order processing the next time Acme omits <code>tracking_id</code>.</p></div>
                      <p><b>Production says this fallback is still needed.</b> Acme stopped sending <code>tracking_id</code> once already, on Oct 9 at 07:52. Without the fallback, 41 orders would have stalled again.</p>
                      <div class="rounded-md border b p-3"><p class="mb-3 text-[12px] m">POST /webhooks/acme · Oct 6–12 · responses missing <code>tracking_id</code></p>
                        <div class="grid grid-cols-7 gap-2 h-24 items-end border-b b"><div></div><div></div><div></div><div class="flex flex-col items-center justify-end gap-1"><span class="text-[12px] font-semibold text-[#F85149]">41</span><div class="w-full max-w-10 rounded-t-sm bg-[#F85149]" style="height:60px"></div></div><div></div><div></div><div></div></div>
                        <div class="mt-1.5 grid grid-cols-7 gap-2 text-center text-[12px] whitespace-nowrap m"><span class="">6</span><span class="">7</span><span class="">8</span><span class="text-[#F85149] font-semibold">9</span><span class="">10</span><span class="">11</span><span class="">12</span></div></div>
                      <div class="rounded-md border b overflow-hidden"><p class="border-b b bg-[#151B23] px-3 py-1.5 text-[12px] font-semibold m">Suggested change</p>
                        <div class="overflow-x-auto font-mono text-[12px] leading-5"><div class="flex bg-[#F851491A]"><span class="w-10 shrink-0 bg-[#F851494D] pe-2 text-end m select-none">14</span><span class="px-3 whitespace-pre text-[#F0F6FC]"><span class="text-[#F85149]">-</span> const tracking = body.tracking_id</span></div><div class="flex bg-[#2EA04326]"><span class="w-10 shrink-0 bg-[#3FB9504D] pe-2 text-end m select-none">14</span><span class="px-3 whitespace-pre text-[#F0F6FC]"><span class="text-[#3FB950]">+</span> const tracking = body.tracking_id ?? await acme.lookup(body.shipment_id)</span></div></div>
                        <div class="flex justify-end border-t b bg-[#151B23] px-3 py-2"><span class="rounded-md border border-[#F0F6FC1A] bg-[#212830] px-3 py-1 text-[12px] font-medium">Commit suggestion</span></div></div>
                      <p class="text-[12px] m">From 453,088 stored requests · <span class="text-[#4493F8]">View the evidence in monoscope</span></p>
                    </div></div></div>
              </div>
            </div>
          </div>
          {% else %}
          <div data-theme="dark" class="hidden sm:block relative rounded-xl border border-strokeWeak bg-bgRaised! overflow-hidden shadow-[0_24px_64px_-32px_var(--tone-fill)]">
            <div class="flex items-center gap-1.5 px-4 h-[31px] border-b border-strokeWeak"><i class="block size-2.5 rounded-full bg-white/15"></i><i class="block size-2.5 rounded-full bg-white/15"></i><i class="block size-2.5 rounded-full bg-white/15"></i></div>
            <div class="relative bg-fillWeak" style="aspect-ratio: 1180 / 820;"><demo-scene src="{{s.demo}}" class="absolute inset-0"></demo-scene></div>
          </div>
          {% endif %}
          {% if s.code and s.id != 'fix' %}
          <div class="relative rounded-xl overflow-hidden border border-white/10 bg-[oklch(18%_0.02_263)] [&_code]:bg-transparent! [&_code]:p-0! [&_code]:text-inherit!">
            <p class="px-5 py-2 text-[12px] font-mono text-white/50 border-b border-white/10">{{s.code_label}}</p>
            <pre class="p-5 text-base leading-relaxed overflow-x-auto font-mono text-white/90"><code{% if s.code_class %} class="{{s.code_class}}"{% endif %}>{{s.code}}</code></pre>
          </div>
          {% endif %}
          </div>
          <div class="space-y-10 lg:ps-12">
            <ul class="grid sm:grid-cols-2 {% if s.bullets.size == 3 %}lg:grid-cols-3{% else %}lg:grid-cols-4{% endif %} gap-x-8 gap-y-10">
              {% for b in s.bullets %}
              <li>
                <svg class="size-5 text-(--tone)" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#{{b.icon}}"></use></svg>
                <h3 class="mt-4 text-xl font-semibold leading-[1.35] text-balance text-textStrong">{{b.title}}</h3>
                <p class="mt-2 text-base leading-relaxed text-textWeak text-pretty">{{b.body}}</p>
              </li>
              {% endfor %}
            </ul>
            <div class="border-t border-strokeWeak pt-6">
              <a href="{{s.link}}" class="inline-flex items-center gap-2 min-h-11 text-base font-medium text-textBrand underline underline-offset-4">{{s.link_label}} <svg class="h-3 w-3" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
            </div>
          </div>
        </div>
        {% endif %}
        </div>
        {% case s.id %}
        {% when 'prove' %}
      <!-- SECURITY -->
      <section id="security" class="blk w-full grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-16 scroll-mt-24">
        <div class="capability-intro space-y-4">
          <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Security and your data</h3>
          <p class="text-xl leading-[1.65] text-textWeak text-pretty">Your data, your bucket, code you can read.</p>
        </div>
        <dl class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {% for f in this.frontmatter.security %}
          <div class="border-t border-strokeWeak pt-4 space-y-1">
            <dt class="font-semibold text-textStrong">{{f.title}}</dt>
            <dd class="text-base leading-relaxed text-textWeak text-pretty [&_code]:font-mono [&_code]:text-[12px] [&_code]:bg-fillWeak [&_code]:px-1 [&_code]:rounded">{{f.body}}</dd>
          </div>
          {% endfor %}
        </dl>
      </section>
        {% when 'fix' %}
      <!-- Coding agents: setup on one side, the transcript as proof on the other -->
      <section id="agents" class="blk w-full scroll-mt-24">
        <div class="grid lg:grid-cols-[2fr_3fr] gap-8 lg:gap-12 items-start">
          <div class="contents lg:block lg:space-y-10">
            <div class="order-1 space-y-6 [&>p:first-child]:mb-3.5">
              <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Works with your coding agents</h3>
              <p class="text-xl leading-[1.65] text-textWeak text-pretty">Ask your agent what broke. It reads production through monoscope.</p>
            </div>
          <div class="ag order-3 min-w-0">
            <style>.ag-panel{display:none}.ag:has(input[value="1"]:checked) [data-panel="1"],.ag:has(input[value="2"]:checked) [data-panel="2"],.ag:has(input[value="3"]:checked) [data-panel="3"]{display:block}</style>
            <div role="radiogroup" aria-label="How to connect" class="inline-flex gap-1 p-1 rounded-[0.625rem] bg-fillWeak ring-1 ring-inset ring-strokeWeak">
              {% for a in this.frontmatter.agents %}<label class="cursor-pointer"><input type="radio" name="agtab" value="{{forloop.index}}" class="peer sr-only"{% if forloop.first %} checked{% endif %}><span class="flex min-h-9 items-center justify-center rounded-md px-3.5 text-sm font-medium text-textWeak transition-colors hover:text-textStrong peer-checked:bg-white dark:peer-checked:bg-white/15 peer-checked:text-textStrong peer-checked:shadow-[0_1px_2px_rgb(0_0_0/0.12)] peer-checked:ring-1 peer-checked:ring-black/5 dark:peer-checked:ring-white/10 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-strokeBrand-strong">{{a.tab}}</span></label>{% endfor %}
            </div>
            {% for a in this.frontmatter.agents %}
            <div data-panel="{{forloop.index}}" class="ag-panel pt-5 space-y-2.5">
              <a href="{{a.link}}" class="text-base font-semibold text-textStrong underline-offset-4 decoration-strokeWeak hover:underline">{{a.title}} <span aria-hidden="true" class="text-textWeak">→</span></a>
              <p class="text-base leading-relaxed text-textWeak text-pretty">{{a.body}}</p>
              {% if a.cmd_codex %}<p class="text-[12px] font-medium text-textWeak">Claude Code</p>{% endif %}
              <div class="relative">
                <pre class="rounded-lg bg-[oklch(18%_0.02_263)] text-white/90 p-3 pe-12 text-[12px] leading-relaxed font-mono whitespace-pre-wrap break-all"><code class="nohighlight">{{a.cmd | strip}}</code></pre>
                <button type="button" data-copy aria-label="Copy command" class="group absolute top-1.5 end-1.5 grid place-items-center size-8 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                  <svg class="col-start-1 row-start-1 size-4 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-data-[done]:opacity-0 group-data-[done]:scale-25 group-data-[done]:blur-[4px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  <svg class="col-start-1 row-start-1 size-4 text-[#9BE9A8] opacity-0 scale-25 blur-[4px] transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-data-[done]:opacity-100 group-data-[done]:scale-100 group-data-[done]:blur-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                  <span role="status" class="sr-only"></span>
                </button>
              </div>
              {% if a.cmd_codex %}<p class="text-[12px] font-medium text-textWeak">Codex</p>
              <div class="relative">
                <pre class="rounded-lg bg-[oklch(18%_0.02_263)] text-white/90 p-3 pe-12 text-[12px] leading-relaxed font-mono whitespace-pre-wrap break-all"><code class="nohighlight">{{a.cmd_codex | strip}}</code></pre>
                <button type="button" data-copy aria-label="Copy command" class="group absolute top-1.5 end-1.5 grid place-items-center size-8 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                  <svg class="col-start-1 row-start-1 size-4 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-data-[done]:opacity-0 group-data-[done]:scale-25 group-data-[done]:blur-[4px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  <svg class="col-start-1 row-start-1 size-4 text-[#9BE9A8] opacity-0 scale-25 blur-[4px] transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-data-[done]:opacity-100 group-data-[done]:scale-100 group-data-[done]:blur-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
                  <span role="status" class="sr-only"></span>
                </button>
              </div>
              {% endif %}
            </div>
            {% endfor %}
          </div>
          </div>
          <div class="order-2 min-w-0">
            <div class="rounded-xl overflow-hidden ring-1 ring-white/10 bg-[#141413] text-[#E8E6E3] shadow-[0_20px_50px_-24px_rgb(0_0_0/0.5)]" role="img" aria-label="Claude Code session: the monoscope skill finds that Acme stopped sending tracking_id and opens PR #491 with a fallback">
              <div class="relative flex items-center px-4 py-2.5 border-b border-white/10 bg-white/[0.03]"><span class="flex gap-1.5"><i class="block size-3 rounded-full bg-[#FF5F57]"></i><i class="block size-3 rounded-full bg-[#FEBC2E]"></i><i class="block size-3 rounded-full bg-[#28C840]"></i></span><span class="absolute inset-x-0 text-center font-mono text-[12px] text-white/50 pointer-events-none">orders-service — claude</span></div>
              <div aria-hidden="true" class="p-5 font-mono text-base leading-relaxed space-y-3 [&_.d]:text-white/45 [&_.o]:text-[#D97757] [&_.g]:text-[#4EBA65] [&_.y]:text-[#E8C17A]">
                <div class="w-fit rounded-md border border-[#D97757] px-3 py-2 space-y-1"><p><span class="o">✻</span> Welcome to <b class="text-white">Claude Code</b>!</p><p class="d">/help for help, /status for your current setup</p><p class="d">cwd: ~/acme/orders-service</p></div>
                <p class="d">&gt; investigate why orders have been stuck in processing since this morning</p>
                <div><p><span class="g">⏺</span> <b class="text-white">Skill</b>(monoscope-skills:investigate)</p></div>
                <div><p><span class="g">⏺</span> <b class="text-white">Bash</b>(monoscope logs search 'body has "tracking_id"' --since 6h)</p><p class="d whitespace-pre-wrap ps-[5ch] -indent-[5ch]">  ⎿  41 traces · orders-service → api.acme-logistics.com · 41 errors in advance()</p></div>
                <p class="ps-[2ch] -indent-[2ch] text-white">⏺ Acme’s <span class="y">POST /v1/shipments</span> still returns 200 but dropped <span class="y">tracking_id</span>, so 41 orders are stuck. Open a PR with a fallback?</p>
                <p class="d">&gt; yes</p>
                <div><p><span class="g">⏺</span> <b class="text-white">Bash</b>(gh pr create --title "Fall back when tracking_id is absent")</p><p class="d whitespace-pre-wrap ps-[5ch] -indent-[5ch]">  ⎿  Opened PR #491 · acme/orders-service</p></div>
                <div class="space-y-1.5 pt-1"><div class="rounded-md border border-white/20 px-3 py-2"><span class="text-white/60">&gt;</span> <span class="inline-block w-2 h-4 align-[-2px] bg-white/70 motion-safe:animate-pulse"></span></div><p class="d text-[12px] px-1">? for shortcuts</p></div>
              </div>
            </div>
          </div>
        </div>
        <script>
        document.querySelectorAll('#agents [data-copy]').forEach(b => b.addEventListener('click', async () => {
          try { await navigator.clipboard.writeText(b.parentElement.querySelector('code').innerText.trim()); } catch { return; }
          const s = b.querySelector('[role=status]'); b.dataset.done = ''; s.textContent = 'Copied';
          clearTimeout(b.t); b.t = setTimeout(() => { delete b.dataset.done; s.textContent = ''; }, 1500);
        }));
        </script>
      </section>
        {% when 'start' %}
      <!-- INTEGRATIONS-->
      <div class="blk -mt-14 md:-mt-24 text-textWeak space-y-5 w-full flex flex-col items-center justify-center">
        <div class="w-full space-y-5">
          <div class="grid md:grid-cols-2 gap-4">
            {% for c in this.frontmatter.onboarding %}
            <div class="group/card flex flex-col gap-5 min-w-0 card rounded-2xl border border-strokeWeak p-6">
              <div class="flex items-start gap-4">
                <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-(--tone-weak) text-(--tone)"><svg class="size-5" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#{{c.icon}}"></use></svg></span>
                <div class="space-y-1 min-w-0">
                  <p class="font-mono text-[12px] uppercase tracking-wider text-textWeak">{{c.kicker}}</p>
                  <h3 class="text-xl font-semibold leading-[1.35] text-textStrong">{{c.title}}</h3>
                </div>
              </div>
              <p class="text-base leading-relaxed text-textWeak text-pretty">{{c.body}}</p>
              <div class="relative flex-1 flex flex-col rounded-xl overflow-hidden ring-1 ring-white/10 bg-[oklch(18%_0.02_263)]">
                <div class="flex items-center gap-2 px-3 py-2 border-b border-white/10"><span class="flex gap-1.5"><i class="block size-2.5 rounded-full bg-white/15"></i><i class="block size-2.5 rounded-full bg-white/15"></i><i class="block size-2.5 rounded-full bg-white/15"></i></span><span class="font-mono text-[12px] text-white/50">{{c.win}}</span></div>
                <pre class="flex-1 p-4 text-[12px] leading-relaxed font-mono text-white/90 whitespace-pre-wrap break-all [&_.hljs]:overflow-visible! [&_.hljs]:bg-transparent! [&_.hljs]:p-0! [&_.hljs]:text-inherit! [&_.hljs-attr]:text-[#8FB6FF]! [&_.hljs-string]:text-[#F2C27B]! [&_.hljs-keyword]:text-[#C4A7FF]! [&_.hljs-meta]:text-white/50!">{% if c.lang == 'bash' %}<code class="nohighlight">{% assign lines = c.cmd | strip | newline_to_br | split: "<br />" %}{% for l in lines %}{% assign segs = l | strip | split: " | " %}{% for seg in segs %}{% unless forloop.first %} <span class="hljs-meta">|</span> {% endunless %}{% assign w = seg | split: " " %}<span class="hljs-keyword">{{w.first}}</span>{{seg | remove_first: w.first}}{% endfor %}{% unless forloop.last %}
{% endunless %}{% endfor %}</code>{% else %}<code class="language-{{c.lang}}">{{c.cmd | strip}}</code>{% endif %}</pre>
      <button type="button" data-copy aria-label="Copy command" class="group absolute top-0.5 end-1.5 grid place-items-center size-8 rounded-md text-white/60 hover:text-white hover:bg-white/10 transition-colors">
        <svg class="col-start-1 row-start-1 size-4 transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-data-[done]:opacity-0 group-data-[done]:scale-25 group-data-[done]:blur-[4px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="col-start-1 row-start-1 size-4 text-[#9BE9A8] opacity-0 scale-25 blur-[4px] transition-[opacity,scale,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:transition-none group-data-[done]:opacity-100 group-data-[done]:scale-100 group-data-[done]:blur-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
        <span role="status" class="sr-only"></span>
      </button>
              </div>
              <a href="{{c.link}}" class="inline-flex w-fit items-center gap-2 text-base font-medium text-textBrand underline-offset-4 hover:underline">{{c.link_label}} <span aria-hidden="true">→</span></a>
            </div>
            {% endfor %}
          </div>
          <script>
          document.querySelectorAll('#start [data-copy]').forEach(b => b.addEventListener('click', async () => {
            try { await navigator.clipboard.writeText(b.parentElement.querySelector('code').innerText.trim()); } catch { return; }
            const s = b.querySelector('[role=status]'); b.dataset.done = ''; s.textContent = 'Copied';
            clearTimeout(b.t); b.t = setTimeout(() => { delete b.dataset.done; s.textContent = ''; }, 1500);
          }));
          </script>
        </div>
        <div id="integration-marquee" class="[&:hover_*]:[animation-play-state:paused] [&:focus-within_*]:[animation-play-state:paused] w-full space-y-5 pt-5 mask-edges">
          <div class="flex w-full overflow-x-hidden max-w-screen
            [&_img]:w-full
            [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
            [&>div>*]:border [&>div>*]:border-strokeWeak">
            {% assign icons = "postgresql.png,cloudflare.png,mongodb.png,azure-1.png,mysql.png,nginx.png,redis.png,elasticsearch.png,google-cloud.png,apache-kafka.png,kubernetes.png,prometheus-app.png,haproxy-icon.svg,docker.png" | split: "," %}
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5 pe-5">
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5 pe-5" aria-hidden="true" >
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
          </div>
          <div class="flex w-full overflow-x-hidden max-w-screen
            [&_img]:w-full
            [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
            [&>div>*]:border [&>div>*]:border-strokeWeak">
            {% assign icons = "statsd-receiver.png,solacereceiver.jpg,zipkin-logo.png,snowflake.png,skywalking.jpg,riak-logo.png,huawei-icon.svg,apache_zookeeper-icon.svg,rabbitmq-icon.svg,podmanio-icon.svg,apache_couchdb-icon.svg,influxdata-icon.svg,jaegertracingio-icon.svg,oracle-icon.svg,memcached-icon.svg,signalfx-icon.svg" | split: "," %}
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none animation-reverse  whitespace-nowrap flex w-max shrink-0 gap-5 pe-5">
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none animation-reverse whitespace-nowrap flex w-max shrink-0 gap-5 pe-5" aria-hidden="true" >
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
          </div>
          <div class=" flex w-full overflow-x-hidden max-w-screen
            [&_img]:w-full
            [&>div>*]:inline-block [&>div>*]:w-24 [&>div>*]:p-3 [&>div>*]:rounded-xl
            [&>div>*]:border [&>div>*]:border-strokeWeak">
            {% assign icons = "splunk-icon.svg,alibabacloud-icon.svg,apache_cassandra-icon.svg,logicmonitor-icon.svg,sematext-icon.svg,sentryio-icon.svg,tencent-logo.png,pulsar-logo.png,clickhouse-logo.png,coralognix.png" | split: "," %}
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5 pe-5">
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
            <div class="animate-[scroll-x_60s_linear_infinite] motion-reduce:animate-none whitespace-nowrap flex w-max shrink-0 gap-5 pe-5" aria-hidden="true" >
              {% for ic in icons %}<div><img src="/assets/img/opentelemetry-contrib-logos/{{ic}}" alt=""/></div>{% endfor %}
            </div>
          </div>
        </div>

        <div class="w-full flex flex-wrap items-center justify-between gap-4">
          <a href="/docs/sdks/" class="inline-flex items-center gap-2 min-h-11 text-base font-medium text-textBrand underline underline-offset-4">View all 780+ integrations <span aria-hidden="true">→</span></a>
          <button type="button" data-marquee-toggle aria-pressed="false" class="min-h-11 px-3 rounded-lg text-sm text-textWeak hover:text-textStrong">Pause integrations</button>
        </div>
      </div>
      </div>
      <!-- Switching: outside the rail's wrap so the line ends above it -->
      <div class="relative wrap max-w-[80rem] pt-14 md:pt-16 pb-48 md:pb-64">
      <section class="w-full">
        <div class="card rounded-xl border border-strokeWeak p-5 md:p-6 grid lg:grid-cols-[1fr_auto] items-center gap-5 lg:gap-10">
          <div class="space-y-1.5">
            <h3 class="text-xl font-semibold leading-[1.35] text-textStrong">Already on Datadog or Sentry?</h3>
            <p class="text-base leading-relaxed text-textWeak text-pretty max-w-[65ch]">Run monoscope next to it for a week or two, compare which errors and API changes each one catches, then move your services over. An engineer from our team can help.</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="https://app.monoscope.tech" class="btn py-2.5 px-5 rounded-lg bg-fillBrand-strong text-textInverse-strong" data-tracking="index-start-trial-3" data-reddit-event="SignUp">Start for free</a>
            <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" target="_blank" rel="noopener noreferrer" class="btn btn-secondary py-2.5 px-5 rounded-lg" data-tracking="index-book-call" data-reddit-event="ScheduleDemo">Book a migration call</a>
          </div>
        </div>
      </section>
        {% endcase %}
      </div>
    {% if s.id == 'know' %}
      <div class="relative wrap max-w-[80rem] pt-24 md:pt-28 pb-56 md:pb-96">
      <!-- CAPABILITIES -->
      <div class="capability-section w-full">
        <style>
          .capability-section { position: relative; --capability-link-color: #005bd1; }
          [data-theme="dark"] .capability-section { --capability-link-color: var(--color-textBrand); }
          .capability-intro > p { max-width: 70ch; }
          .capability-groups { container-type: inline-size; display: grid; gap: 5rem; }
          .capability-group { display: grid; gap: 1.25rem; }
          .capability-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2.5rem; }
          .capability { min-width: 0; display: grid; grid-template-rows: auto auto 1fr auto; align-content: start; gap: .625rem; }
          .capability-visual { container-type: inline-size; position: relative; isolation: isolate; margin: 0 0 .375rem; aspect-ratio: 8 / 5; min-width: 0; overflow: hidden; border-radius: .75rem; background: #141617; }
          .capability-visual::after { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; border-radius: inherit; box-shadow: inset 0 0 0 1px oklch(0 0 0 / .1); }
          [data-theme="dark"] .capability-visual::after { box-shadow: inset 0 0 0 1px oklch(1 0 0 / .1); }
          .capability-visual img { display: block; width: 100%; height: 100%; object-fit: cover; }
          .capability h3 { margin: 0; font-size: 1.25rem; line-height: 1.35; font-weight: 600; color: var(--color-textStrong); }
          .capability > p { margin: 0; max-width: 48ch; font-size: 1rem; line-height: 1.6; color: var(--color-textWeak); text-wrap: pretty; }
          .capability-link { display: inline-flex; align-items: center; gap: .5rem; min-height: 44px; width: fit-content; font-size: 1rem; font-weight: 500; color: var(--capability-link-color); text-decoration: underline; text-decoration-color: transparent; text-underline-offset: .25em; }
          .capability-link:hover { text-decoration-color: currentColor; }
          .capability-link:focus-visible { outline: 2px solid var(--capability-link-color); outline-offset: 4px; border-radius: .25rem; }
          .capability-link svg { width: .875rem; height: .875rem; }
          .capability-slack { height: 100%; display: grid; grid-template-columns: auto 1fr; align-content: center; gap: 3cqi; padding: 5cqi; background: #1a1d21; color: #d1d2d3; font-size: clamp(.7rem, 3.6cqi, 1rem); line-height: 1.45; }
          .capability-slack p { margin: 0 0 2.4cqi; }
          .capability-slack .av { display: grid; place-items: center; width: 9cqi; height: 9cqi; border-radius: 1.8cqi; background: #fff; color: #0068ff; font: 700 3.4cqi/1 ui-monospace, monospace; }
          .capability-slack .who b { color: #fff; } .capability-slack .tag { margin: 0 1.5cqi; padding: 0 1cqi; border-radius: .6cqi; background: rgb(255 255 255 / .1); font-size: .75em; } .capability-slack .tm { color: #9a9b9e; font-size: .85em; }
          .capability-slack b { color: #fff; }
          .capability-slack code { padding: 0 .3em; border-radius: .25em; background: rgb(255 255 255 / .08); color: #e8a35a; font-size: .88em; }
          .capability-slack .acts { display: flex; flex-wrap: wrap; gap: 2cqi; margin: 0; }
          .capability-slack .acts span { padding: 1.2cqi 2.6cqi; border-radius: 1cqi; border: 1px solid rgb(255 255 255 / .25); color: #fff; font-weight: 600; font-size: .9em; }
          .capability-slack .acts .go { background: #007a5a; border-color: #007a5a; }
          .capability-storage { height: 100%; display: flex; flex-direction: column; justify-content: center; padding: 3.333cqi; gap: .75rem; background: #141617; color: #d9dce1; }
          .capability-storage > p { margin: 0; display: flex; align-items: center; gap: .65rem; font-size: .875rem; color: #b8bec9; }
          .capability-storage svg { width: 1rem; height: 1rem; color: var(--color-textBrand); }
          .capability-storage pre { margin: 0; padding: 0; overflow: hidden; font-size: clamp(.8rem, 3cqi, 1rem); line-height: 1.6; color: #d9dce1; }
          .capability-storage code { background: transparent; padding: 0; color: inherit; }
          .capability-storage .sql-keyword { color: #7bb7ff; }
          .capability-storage .sql-path { color: #8cc5ab; }
          @container (min-width: 44rem) { .capability-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 3.5rem 3rem; } }
          @container (min-width: 56rem) { .capability-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); column-gap: 1.5rem; } }
        </style>
        <div class="capability-groups">
        {% assign capability_groups = "watch" | split: "," %}
        {% for capability_group in capability_groups %}
        <div class="capability-group">
          <div class="capability-grid">
          {% assign capabilities = this.frontmatter.capabilities | where: "group", capability_group %}
          {% for c in capabilities %}
          <article class="capability">
            <figure class="capability-visual">
              {% if c.visual == 'slack' %}
              <div class="capability-slack" aria-hidden="true">
                <span class="av">{·}</span>
                <div>
                  <p class="who"><b>monoscope</b><span class="tag">AGENT</span><span class="tm">7:54 AM</span></p>
                  <p><b>Breaking change in a supplier API.</b> Since 07:52, <code>POST /v1/shipments</code> omits <code>tracking_id</code> but still returns <code>200</code>. 41 shipments are stuck, so I opened a fix.</p>
                  <p class="acts"><span class="go">Open PR #491</span><span>View the 41 requests</span></p>
                </div>
              </div>
              {% else %}
              <img src="/assets/img/home/capabilities/{{c.visual}}.webp?v={% if c.visual == 'session-replay' %}6{% else %}5{% endif %}" alt="{{c.visual_alt}}" width="1280" height="800" loading="lazy" decoding="async">
              {% endif %}
            </figure>
            <h3>{{c.title}}</h3>
            <p>{{c.details}}</p>
            <a href="{{c.link}}" class="capability-link">{{c.link_label}}<svg aria-hidden="true"><use href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
          </article>
          {% endfor %}
          </div>
        </div>
        {% endfor %}
        </div>
      </div>
      </div>
    {% endif %}
    </section>
    {% if s.id == 'prove' %}
    <section data-theme="dark" class="tone-brand relative w-full bg-transparent! text-textStrong mt-(--inset)">
      <div aria-hidden="true" class="hero-paint absolute inset-y-0 left-1/2 -translate-x-1/2 panel-w rounded-[2rem] overflow-hidden ring-1 ring-white/10"><img src="/assets/img/home/art/pricing-night.webp" alt="" loading="lazy" data-art data-lamp="0.767,0.17" class="absolute inset-x-0 bottom-0 w-full h-56 md:h-80 object-cover object-right-bottom [mask-image:linear-gradient(to_top,black_30%,rgb(0_0_0/.8)_44%,rgb(0_0_0/.52)_58%,rgb(0_0_0/.26)_72%,rgb(0_0_0/.09)_86%,transparent)]"></div>
      <div class="relative wrap max-w-[80rem] pt-24 md:pt-32 pb-56 md:pb-80 space-y-14">
      <div class="space-y-6 max-w-3xl lg:max-w-none [&>p:first-child]:mb-3.5">
        <p class="inline-flex rounded-md px-2.5 py-1 eyebrow font-mono text-[12px] uppercase tracking-wider bg-(--tone-weak)">Side by side</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-balance text-textStrong"><span class="text-textWeak">Every tool has an AI now.</span><br class="hidden lg:block"> Only monoscope reads the full request and response.</h2>

      </div>
      <div class="space-y-4">
        <div class="bleed overflow-x-auto rounded-2xl bg-bgRaised ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] p-2 pe-10 md:p-3 max-md:[mask-image:linear-gradient(to_left,transparent,black_2.5rem)]">
          <table class="w-full min-w-[52rem]! table-fixed border-separate border-spacing-0 text-base text-start">
            <caption class="sr-only">monoscope compared with Datadog, Sentry and AI SRE layers such as Polylane and Superlog</caption>
            <colgroup><col class="w-32 md:w-72"><col><col><col><col></colgroup>
            <thead><tr><td class="sticky left-0 z-10 bg-bgRaised w-32 md:w-72"></td><th scope="col" class="px-4 pt-5 pb-3 text-start align-bottom font-semibold bg-fillBrand-weak border-x border-x-strokeBrand-strong rounded-t-xl border-t border-t-strokeBrand-strong text-textStrong"><img src="/assets/brand/logo_full_white.svg" alt="monoscope" class="h-5 w-auto"></th><th scope="col" class="px-4 pt-5 pb-3 text-start align-bottom font-semibold text-textWeak">Datadog</th><th scope="col" class="px-4 pt-5 pb-3 text-start align-bottom font-semibold text-textWeak">Sentry</th><th scope="col" class="px-4 pt-5 pb-3 text-start align-bottom font-semibold text-textWeak">AI SRE layers<span class="block font-normal text-textWeak">Polylane, Superlog</span></th></tr></thead>
            <tbody><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-32 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-sm md:text-[15px] leading-snug font-medium text-textStrong text-pretty">Request and response bodies, in and out</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span>, every call, never sampled</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-2"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Not by default; traces are sampled</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-2"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Only what your telemetry already has</span></span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-32 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-sm md:text-[15px] leading-snug font-medium text-textStrong text-pretty">Breaking changes in third-party APIs</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span></span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-2"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Not in public docs</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-32 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-sm md:text-[15px] leading-snug font-medium text-textStrong text-pretty">AI sees the full request</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span></span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-2"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Not by default</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-2"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Only if your telemetry has it</span></span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-32 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-sm md:text-[15px] leading-snug font-medium text-textStrong text-pretty">AI investigates and opens fix PRs</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span>, built in</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-2"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Bits AI, priced separately</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-2"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Seer, a paid add-on</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span>, on top of Datadog or Sentry</span></span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-32 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-sm md:text-[15px] leading-snug font-medium text-textStrong text-pretty">Pricing</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong"><span class="flex items-start gap-1.5"><ul class="space-y-1 tabular-nums"><li class="font-semibold text-textSuccess">$29/month for 20M events</li><li>then $1 per million</li><li>Bodies and metrics included</li><li>No host or indexing fees</li></ul></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><ul class="space-y-1 tabular-nums"><li>$46/host</li><li>$0.10/GB logs ingested</li><li>$2.50/M logs indexed</li><li>$5/100 custom metrics</li><li>$2.65/1k replays</li></ul></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><ul class="space-y-1 tabular-nums"><li>$26/month to start</li><li>$0.29/1k errors</li><li>$1.60/M spans</li><li>$3.75/1k replays</li></ul></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-1.5"><ul class="space-y-1 tabular-nums"><li>Their plan</li><li>plus your Datadog or Sentry bill</li></ul></span></td></tr><tr><th scope="row" class="sticky left-0 z-10 bg-bgRaised w-32 md:w-72 border-t border-strokeWeak px-4 py-3.5 text-start align-top text-sm md:text-[15px] leading-snug font-medium text-textStrong text-pretty">Open source or your own S3</th><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong rounded-b-xl border-b border-b-strokeBrand-strong"><span class="flex items-start gap-1.5"><span class="mt-0.5 text-textSuccess"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg></span><span><span class="font-semibold text-textSuccess">Yes</span>, AGPL; S3 from $199/mo</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="flex items-start gap-2"><span class="mt-0.5 text-iconWarning"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 4.5v4M8 11.5h.01M14 8A6 6 0 1 1 2 8a6 6 0 0 1 12 0"/></svg></span><span>Source-available (FSL)</span></span></td><td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty text-textWeak"><span class="inline-flex items-center gap-1.5 text-textWeak"><svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 4.5l7 7m0-7-7 7"/></svg>No</span></td></tr></tbody>
          </table>
        </div>
        <details class="group max-w-[80ch]">
          <summary class="inline-flex items-center gap-2 min-h-11 cursor-pointer list-none text-sm text-textWeak hover:text-textStrong [&::-webkit-details-marker]:hidden">Sources and assumptions<svg class="size-4 shrink-0 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
          <p class="pb-2 text-base leading-relaxed text-textWeak text-pretty">List prices from public pricing pages, September 2026 (Datadog host fee: Infrastructure $15 + APM $31; replays: RUM $0.15 + Session Replay $2.50; monoscope Cloud: $29 a month includes 20M events, then $1 per million; metrics included up to 20M datapoints). — means we couldn’t confirm it. Draft: verify every cell before publishing.</p>
        </details>
      </div>
      <div class="pt-8 md:pt-14">
      <!-- PRICING -->
      <div id="pricing" class="blk w-full space-y-6 scroll-mt-24">
        <div class="flex flex-wrap items-end justify-between gap-5">
          <div class="space-y-3 max-w-2xl">
            <p class="font-mono text-[12px] uppercase tracking-wider text-(--tone)">Pricing</p>
            <h3 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Pay per million events, not per host, per GB and per index</h3>
            <p class="text-xl leading-[1.65] text-textWeak text-pretty">Cloud from $29/month. Requests, logs and spans at one price, with no host fees.</p>
          </div>
          <a href="/pricing/" class="inline-flex items-center gap-2 min-h-11 text-base font-medium text-textBrand underline underline-offset-4">See full pricing <span aria-hidden="true">→</span></a>
        </div>
        <div id="bill" class="rounded-2xl bg-bgRaised ring-1 ring-white/10 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.7)] overflow-hidden">
          <div class="grid md:grid-cols-[1fr_16rem] items-center gap-6 md:gap-10 p-5 md:p-7 border-b border-strokeWeak">
            <div class="space-y-2 min-w-0">
              <div class="flex flex-wrap items-baseline justify-between gap-3">
                <label for="bill_events" class="text-sm text-textWeak">Events per month</label>
                <p class="text-lg font-medium tabular-nums text-textStrong" id="bill_events_label">20M</p>
              </div>
              <input id="bill_events" type="range" min="0" max="1000" step="10" value="150" class="bill-range" aria-valuetext="20 million events per month">
              <div class="relative h-4 text-[12px] text-textWeak tabular-nums *:absolute *:-translate-x-1/2 [&>:first-child]:translate-x-0 [&>:last-child]:-translate-x-full" aria-hidden="true"><span style="left:0">10M</span><span style="left:34.9%">50M</span><span style="left:50%">100M</span><span style="left:84.9%">500M</span><span style="left:100%">1B</span></div>
              <details class="group pt-2" id="bill_workload">
                <summary class="flex items-center gap-2 min-h-11 cursor-pointer list-none text-[12px] text-textWeak hover:text-textStrong [&::-webkit-details-marker]:hidden"><span>Adjust workload <span id="bill_workload_label" class="block sm:inline">· 10 hosts · 400 series · 2k replays</span></span><svg class="size-4 shrink-0 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
                <div class="pt-3 pb-2">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 [&_input]:w-full [&_input]:min-h-11 [&_input]:rounded-lg [&_input]:border [&_input]:border-strokeWeak [&_input]:bg-bgBase [&_input]:px-3 [&_input]:py-2 [&_input]:text-base [&_input]:text-textStrong [&_input]:tabular-nums [&_input]:transition-colors [&_input:hover]:border-strokeStrong [&_label]:text-[12px] [&_label]:text-textWeak [&_label]:block [&_label]:mb-2">
              <div><label for="bill_hosts">Hosts</label><input id="bill_hosts" type="number" min="1" max="500" value="10"></div>
              <div><label for="bill_series">Metric series</label><input id="bill_series" type="number" min="0" max="1000000" step="100" value="400"></div>
              <div><label for="bill_sessions">Replay sessions / month</label><input id="bill_sessions" type="number" min="0" max="10000000" step="1000" value="2000"></div>
            </div>
                </div>
              </details>
            </div>
            <div class="space-y-3 md:border-s md:border-strokeWeak md:ps-7">
              <p class="text-[12px] text-textWeak">monoscope Cloud · estimated bill</p>
              <p class="whitespace-nowrap"><span id="bill_estimate" class="text-5xl font-medium tracking-tight tabular-nums text-textStrong">$29</span><span class="text-sm text-textWeak"> /month</span></p>
              <p class="text-[12px] text-textWeak">30-day retention. No host fees.</p>
              <a href="https://app.monoscope.tech" class="plan-action btn h-auto min-h-11 py-2.5 px-5 rounded-lg bg-fillBrand-strong text-textInverse-strong text-sm font-medium" data-tracking="index-pricing-plan" data-reddit-event="SignUp">Start for free</a>
            </div>
          </div>
          <p id="bill_summary" class="sr-only" role="status"></p>
          <div id="bill_rows" class="p-5 md:p-7 space-y-4">
            <p class="text-[12px] text-textWeak">Estimated monthly cost · same workload · 30-day retention</p>
            <div data-vendor="mono" class="grid grid-cols-[1fr_auto] sm:grid-cols-[16rem_1fr_8.5rem] items-center gap-x-5 gap-y-2">
              <span class="inline-flex items-center gap-3 text-lg font-medium text-textStrong"><span class="grid size-5 shrink-0 place-items-center rounded bg-fillBrand-strong font-mono text-[10px] font-bold text-white" aria-hidden="true">[·]</span>monoscope</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-fillBrand-strong"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-lg whitespace-nowrap"><span class="amount font-semibold tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-16 ms-3 text-base font-medium tabular-nums text-textWeak"></span></p>
            </div>
            <div data-vendor="datadog" class="grid grid-cols-[1fr_auto] sm:grid-cols-[16rem_1fr_8.5rem] items-center gap-x-5 gap-y-2">
              <span class="inline-flex items-center gap-3 text-lg font-medium text-textStrong"><img src="/assets/img/compare-logos/datadog-icon.svg" alt="" class="size-5 shrink-0 object-contain brightness-0 invert">Datadog</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-lg whitespace-nowrap"><span class="amount font-semibold tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-16 ms-3 text-base font-medium tabular-nums text-textWeak"></span></p>
            </div>
            <div data-vendor="splunk" class="grid grid-cols-[1fr_auto] sm:grid-cols-[16rem_1fr_8.5rem] items-center gap-x-5 gap-y-2">
              <span class="inline-flex items-center gap-3 text-lg font-medium text-textStrong"><img src="/assets/img/opentelemetry-contrib-logos/splunk-icon.svg" alt="" class="size-5 shrink-0 object-contain brightness-0 invert">Splunk Observability</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-lg whitespace-nowrap"><span class="amount font-semibold tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-16 ms-3 text-base font-medium tabular-nums text-textWeak"></span></p>
            </div>
            <div data-vendor="sentry" class="grid grid-cols-[1fr_auto] sm:grid-cols-[16rem_1fr_8.5rem] items-center gap-x-5 gap-y-2">
              <span class="inline-flex items-center gap-3 text-lg font-medium text-textStrong"><img src="/assets/img/opentelemetry-contrib-logos/sentryio-icon.svg" alt="" class="size-5 shrink-0 object-contain brightness-0 invert">Sentry</span>
              <div class="col-span-2 sm:col-span-1 row-start-2 sm:row-start-auto h-1.5 rounded-full bg-fillWeak" aria-hidden="true"><div class="bar h-1.5 rounded-full bg-textDisabled"></div></div>
              <p class="col-start-2 sm:col-start-3 row-start-1 text-end text-lg whitespace-nowrap"><span class="amount font-semibold tabular-nums text-textStrong"></span><span class="ratio inline-block min-w-16 ms-3 text-base font-medium tabular-nums text-textWeak"></span></p>
            </div>
          </div>
          <details class="group border-t border-strokeWeak px-5 md:px-7">
            <summary class="min-h-11 py-3 flex items-center justify-between gap-4 cursor-pointer list-none text-[12px] text-textWeak hover:text-textStrong [&::-webkit-details-marker]:hidden"><span>Assumptions &amp; price sources <span class="hidden sm:inline">· September 2026</span></span><svg class="size-4 shrink-0 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
            <div id="bill_note" class="pb-6 space-y-3 text-base leading-relaxed text-textWeak max-w-[70ch]">
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
            const p = +$('bill_events').value, raw = 10 * 100 ** (p / 1000), m = raw < 100 ? Math.round(raw) : Math.round(raw / 10) * 10, h = +$('bill_hosts').value || 0, s = +$('bill_series').value || 0, r = +$('bill_sessions').value || 0;
            $('bill_events_label').textContent = m >= 1000 ? '1B' : m + 'M';
            $('bill_events').setAttribute('aria-valuetext', m >= 1000 ? '1 billion events per month' : m + ' million events per month');
            $('bill_events').style.setProperty('--bill-progress', p / 10 + '%');
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
        <div id="pricing-plans" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-base text-textWeak">
          <p><span class="text-textStrong">Free forever</span> · 10k events/day, no credit card</p>
          <p>Optional: your own S3 bucket, +$199/month</p>
          <a href="https://github.com/monoscope-tech/monoscope" target="_blank" rel="noopener noreferrer" class="inline-flex items-center min-h-11 text-textBrand underline underline-offset-4" data-tracking="index-github-enterprise" data-reddit-event="ViewContent">Self-host for free <span class="ms-2" aria-hidden="true">↗</span></a>
        </div>
      </div>
      </div>
      </div>
    </section>
    {% endif %}
    {% endfor %}
    </div>

    <!-- REAL RESULTS FROM CUSTOMERS -->
    <div id="results" class="wrap max-w-[80rem] space-y-12 pt-12">
      <div class="space-y-6 max-w-3xl [&>p:first-child]:mb-3.5">
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-balance text-textStrong">What changed for teams <span class="text-textDisabled">on monoscope</span></h2>
        <a href="https://www.trustpilot.com/review/apitoolkit.io" target="_blank" rel="noopener noreferrer" class="inline-block text-textBrand underline underline-offset-2">View all reviews</a>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-strokeWeak border border-strokeWeak rounded-xl overflow-hidden *:bg-(--card-bg) *:p-5 *:flex *:flex-col *:gap-5 *:justify-between">
        {% for t in this.frontmatter.testimonials %}{% if t.stat %}
        <div>
          <div class="space-y-1"><p class="text-3xl font-medium tracking-tight tabular-nums text-textStrong">{{t.stat}}</p><p class="text-base leading-snug text-textWeak text-pretty">{{t.desc}}</p></div>
          <img class="h-5 w-auto self-start brightness-0 dark:invert opacity-60" src="/assets/img/customers/{{t.logo}}" alt="">
        </div>
        {% endif %}{% endfor %}
      </div>
      <div class="grid md:grid-cols-3 gap-4">
        {% for t in this.frontmatter.testimonials %}{% unless t.stat %}
        <figure class="card rounded-xl border border-strokeWeak p-6 flex flex-col gap-6">
          <blockquote class="text-base leading-relaxed text-textStrong text-pretty flex-1">{{t.quote}}</blockquote>
          <figcaption class="flex items-center gap-3 text-base">
            <img class="rounded-lg grayscale w-10 h-10 object-cover" src="/assets/img/love/{{t.photo}}" alt="{{t.name}}">
            <div><p class="text-textStrong">{{t.name}}</p><p class="text-[12px] text-textWeak">{{t.title}}</p></div>
          </figcaption>
        </figure>
        {% endunless %}{% endfor %}
      </div>
    </div>
<link rel="stylesheet" href="/assets/css/home-motion.css?v=3">
<script defer src="/assets/js/home-motion.js?v=3"></script>
</section>

```
