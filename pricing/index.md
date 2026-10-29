---
title: Pricing
description: Free up to 10k events a day. monoscope Cloud is $29 a month for 20M events, then $1 per million, with request and response bodies included. Self-host the open-source edition for free.
date: 2022-03-23
updatedDate: 2026-10-29
plans:
  - eyebrow: Free
    name: Try it on real traffic
    icon: zap
    price: Free
    price_note: up to 10k events a day
    bullets: ["10k events a day", "Request and response bodies included", "Unlimited team members", "30 days of retention", "No credit card"]
    cta: { label: Start for free, href: "https://app.monoscope.tech", tracking: pricing-plan-free, event: SignUp }
  - eyebrow: monoscope Cloud
    name: Keep every event
    icon: cloud
    featured: true
    price: $29
    price_unit: /month
    price_note: includes 20M events, then $1 per million
    bullets: ["Every event kept, never sampled", "Request and response bodies included", "20M metric datapoints, then $1 per 10M", "2,000 session replays, then $1 per 1,000", "30 days of retention", "No host or seat fees"]
    addon: { name: "Your own S3 bucket", price: "+$199/month", note: "Every event written to your bucket as open Delta Lake and Parquet. Unlimited retention, queryable from monoscope, DuckDB or Spark." }
    cta: { label: Get started, href: "https://app.monoscope.tech", tracking: pricing-plan-cloud, event: SignUp }
  - eyebrow: Self-hosted
    name: Run it on your servers
    icon: server
    badge: Open source
    price: Free
    price_note: Community Edition, AGPL-3.0
    bullets: ["The whole platform, open source", "Deploy to your own servers", "Data never leaves your network", "Enterprise adds SSO, an SLA and priority support, from $500/month"]
    cta: { label: View on GitHub, href: "https://github.com/monoscope-tech/monoscope", tracking: pricing-plan-github, event: ViewContent, external: true }
plan_cols: [Free, Cloud, Cloud + your bucket, Self-hosted]
plan_rows:
  - [Events, 10k a day, "20M included, then $1 per million", "20M included, then $1 per million", Unlimited]
  - [Request and response bodies, Included, Included, Included, Included]
  - [Metric datapoints, Count toward 10k a day, "20M included, then $1 per 10M", "20M included, then $1 per 10M", Unlimited]
  - [Session replays, Included, "2,000 included, then $1 per 1,000", "2,000 included, then $1 per 1,000", Unlimited]
  - [Retention, 30 days, 30 days, Unlimited, You decide]
  - [Where your data lives, monoscope Cloud, monoscope Cloud, Your S3 bucket, Your servers]
  - [Team members, Unlimited, Unlimited, Unlimited, Unlimited]
  - [Price, Free, From $29/month, From $228/month, "Free, Enterprise from $500/month"]
event_example:
  - [POST /checkout, incoming request, "span"]
  - [POST api.stripe.com/v1/charges, outgoing call, "span"]
  - ["payment authorized", log line, "log"]
  - ["order 8812 created", log line, "log"]
faqs:
  - q: What counts as an event?
    a: "Each log record and each span is one event. An incoming or outgoing HTTP request is one span, and its headers, request body and response body come with it. Metric datapoints and session replays are metered on their own: 20M datapoints and 2,000 replays are included, then $1 per 10M datapoints and $1 per 1,000 replays."
  - q: Do request and response bodies cost extra?
    a: No. A request with a 40 kB response body is one event, the same as a request with no body. You never have to choose which payloads to keep to control the bill.
  - q: What happens when the free plan goes over 10k events a day?
    a: We keep a sample spread across the rest of the day instead of cutting off at the limit, and a kept trace stays whole. Paid plans keep every event.
  - q: How does the bill grow with usage?
    a: "$29 a month covers 20M events. After that it's $1 per million, so 50M events a month is $59 ($29 plus $30 for the extra 30M). There are no host, seat or indexing fees. Use the estimator above to add metrics and replays."
  - q: What does my own S3 bucket add?
    a: For $199 a month on top of Cloud, every event is written to your S3-compatible bucket as open Delta Lake and Parquet tables. Retention is unlimited, and you can query the data from monoscope, DuckDB, Spark or any Postgres client.
  - q: Can I self-host monoscope for free?
    a: Yes. The Community Edition is open source under AGPL-3.0 and free to run on your own servers. Enterprise adds SSO, an SLA and priority support, starting at $500 a month.
  - q: Can I switch plans later?
    a: Yes, at any time. When you turn on your own bucket, we help move your existing data into it. If you move to self-hosting, an engineer from our team can help with the migration.
  - q: Do you offer volume pricing?
    a: Yes, usually above a billion events a month. Email <a href="mailto:hello@monoscope.tech" class="text-textBrand underline underline-offset-2">hello@monoscope.tech</a> or <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" target="_blank" rel="noopener noreferrer" class="text-textBrand underline underline-offset-2">book a call</a> with your numbers.
  - q: Where is my data stored?
    a: In monoscope Cloud, in the US by default, and in the EU if you prefer. With your own bucket, the data sits in your account. Self-hosted, it never leaves your network.
  - q: Are you SOC 2 or ISO 27001 certified?
    a: Not yet. We sign data processing agreements (DPAs) for GDPR, the code that handles your data is open source, and you can keep every event in your own bucket or on your own servers.
  - q: Is there a startup discount?
    a: Yes. Startups under two years old, with fewer than five people and less than $100k raised, can get up to $10,000 off their first year. <a href="https://tally.so/r/n9vVkY" target="_blank" rel="noopener noreferrer" class="text-textBrand underline underline-offset-2">Apply in 2 minutes</a>.
---

```=html
{% render "default/components/page-style" %}
{% assign check = '<svg class="size-4 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8.5 6.5 12 13 4.5"/></svg>' %}
<section class="flex flex-col items-center relative" style="z-index: 1;">

  <!-- Plans -->
  <section class="tone-brand relative w-full mt-(--inset)">
    <div aria-hidden="true" class="absolute inset-y-0 left-1/2 -translate-x-1/2 panel-w rounded-[2rem] overflow-hidden bg-(--tone-panel) border border-(--tone-weak)"></div>
    <div class="relative wrap max-w-[80rem] pt-20 md:pt-32 pb-16 md:pb-24 space-y-14">
      <div class="space-y-6 max-w-3xl [&>p:first-child]:mb-3.5">
        <p class="inline-flex rounded-md px-2.5 py-1 eyebrow font-mono text-[12px] uppercase tracking-wider bg-(--tone-weak)">Pricing</p>
        <h1 class="text-4xl md:text-6xl font-medium tracking-tight leading-[1.15] text-balance text-textStrong">Pay per event. <span class="text-textWeak">Every request and response included.</span></h1>
        <p class="max-w-[60ch] text-lg md:text-xl leading-[1.65] text-textWeak text-pretty">Free up to 10k events a day. Cloud is $29 a month for 20M events, then $1 per million. Bodies, hosts and team members never add to the bill.</p>
      </div>
      <div class="grid lg:grid-cols-3 gap-4 items-stretch">
        {% for p in this.frontmatter.plans %}
        <article class="card relative rounded-2xl border p-6 md:p-7 flex flex-col gap-6 {% if p.featured %}border-strokeBrand-strong ring-1 ring-strokeBrand-strong{% else %}border-strokeWeak{% endif %}">
          <div class="space-y-4">
            <div class="flex items-center justify-between gap-3">
              <p class="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-textWeak"><svg class="size-4 text-(--tone)" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#{{p.icon}}"></use></svg>{{p.eyebrow}}</p>
              {% if p.badge %}<span class="rounded-full bg-fillSuccess-weak px-2.5 py-0.5 text-[12px] font-medium text-textSuccess">{{p.badge}}</span>{% endif %}
            </div>
            <h2 class="text-xl font-semibold leading-[1.35] text-textStrong">{{p.name}}</h2>
            <p><span class="text-5xl font-medium tracking-tight tabular-nums text-textStrong">{{p.price}}</span>{% if p.price_unit %}<span class="text-base text-textWeak">{{p.price_unit}}</span>{% endif %}<span class="block mt-2 text-sm text-textWeak">{{p.price_note}}</span></p>
          </div>
          <ul class="space-y-2.5 text-base text-textStrong flex-1">
            {% for b in p.bullets %}<li class="flex items-start gap-2.5"><span class="mt-1 text-(--tone)">{{check}}</span><span class="text-pretty">{{b}}</span></li>{% endfor %}
          </ul>
          {% if p.addon %}
          <div class="rounded-xl border border-dashed border-strokeStrong p-4 space-y-1">
            <p class="flex flex-wrap items-baseline justify-between gap-x-3 font-semibold text-textStrong">{{p.addon.name}} <span class="font-normal text-sm text-textWeak tabular-nums">{{p.addon.price}}</span></p>
            <p class="text-sm leading-relaxed text-textWeak text-pretty">{{p.addon.note}}</p>
          </div>
          {% endif %}
          <a href="{{p.cta.href}}"{% if p.cta.external %} target="_blank" rel="noopener noreferrer"{% endif %} class="plan-action press btn h-auto min-h-11 py-2.5 px-5 rounded-lg text-base font-medium {% if p.featured %}bg-fillBrand-strong text-textInverse-strong{% else %}btn-secondary{% endif %}" data-tracking="{{p.cta.tracking}}" data-reddit-event="{{p.cta.event}}">{{p.cta.label}}{% if p.cta.external %} <span aria-hidden="true">↗</span>{% endif %}</a>
        </article>
        {% endfor %}
      </div>
      <div class="card rounded-2xl border border-strokeWeak p-5 md:p-6 grid lg:grid-cols-[1fr_auto] items-center gap-5 lg:gap-10">
        <div class="space-y-1.5">
          <h2 class="text-xl font-semibold leading-[1.35] text-textStrong">Volume and Enterprise</h2>
          <p class="text-base leading-relaxed text-textWeak text-pretty max-w-[70ch]">Sending over a billion events a month, or need SSO, an SLA and priority support? We’ll price it with you, in the cloud or on your servers.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" target="_blank" rel="noopener noreferrer" class="press btn btn-secondary py-2.5 px-5 rounded-lg" data-tracking="pricing-enterprise-call" data-reddit-event="ScheduleDemo">Talk to an engineer</a>
          <a href="mailto:hello@monoscope.tech" class="inline-flex items-center min-h-11 px-2 text-base font-medium text-textBrand underline underline-offset-4">hello@monoscope.tech</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Estimator: identical to the homepage calculator so the two never disagree -->
  <section data-theme="dark" class="tone-brand relative w-full bg-transparent! text-textStrong mt-(--inset)">
    <div aria-hidden="true" class="hero-paint absolute inset-y-0 left-1/2 -translate-x-1/2 panel-w rounded-[2rem] overflow-hidden ring-1 ring-white/10"><img src="/assets/img/home/art/pricing-night.webp" alt="" loading="lazy" data-art data-lamp="0.767,0.17" class="absolute inset-x-0 bottom-0 w-full h-56 md:h-80 object-cover object-right-bottom [mask-image:linear-gradient(to_top,black_30%,rgb(0_0_0/.8)_44%,rgb(0_0_0/.52)_58%,rgb(0_0_0/.26)_72%,rgb(0_0_0/.09)_86%,transparent)]"></div>
    <div class="relative wrap max-w-[80rem] pt-20 md:pt-28 pb-56 md:pb-80 space-y-10">
      <div id="estimate" class="space-y-6 max-w-3xl [&>p:first-child]:mb-3.5 scroll-mt-24">
        <p class="inline-flex rounded-md px-2.5 py-1 eyebrow font-mono text-[12px] uppercase tracking-wider bg-(--tone-weak)">Estimate your bill</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-balance text-textStrong">Pay per million events, <span class="text-textWeak">not per host, per GB and per index</span></h2>
        <p class="max-w-[65ch] text-lg md:text-xl leading-[1.65] text-textWeak text-pretty">Move the slider to your monthly volume. Open “Adjust workload” to add hosts, metric series and replays, and compare the same workload at list prices.</p>
      </div>
      <div class="space-y-6">
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
              <a href="https://app.monoscope.tech" class="plan-action btn h-auto min-h-11 py-2.5 px-5 rounded-lg bg-fillBrand-strong text-textInverse-strong text-sm font-medium" data-tracking="pricing-calculator" data-reddit-event="SignUp">Start for free</a>
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
      </div>
    </div>
  </section>

  <!-- What counts as an event -->
  <section id="events" class="tone-success relative w-full scroll-mt-16">
    <div class="relative wrap max-w-[80rem] pt-24 md:pt-36 space-y-14">
      <div class="space-y-6 max-w-3xl [&>p:first-child]:mb-3.5">
        <p class="inline-flex rounded-md px-2.5 py-1 eyebrow font-mono text-[12px] uppercase tracking-wider bg-(--tone-weak)">What counts as an event</p>
        <h2 class="text-4xl md:text-5xl font-medium tracking-tight leading-[1.2] text-balance text-textStrong">One log line or one span is one event. <span class="text-textWeak">The bodies come free.</span></h2>
        <p class="max-w-[65ch] text-lg md:text-xl leading-[1.65] text-textWeak text-pretty">You don’t pay by the gigabyte, so a large response body costs the same as an empty one. Keep every payload and never decide what to drop.</p>
      </div>
      <div class="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-start">
        <figure class="card rounded-2xl border border-strokeWeak overflow-hidden">
          <figcaption class="px-5 md:px-6 py-3 border-b border-strokeWeak text-sm text-textWeak">One checkout, as monoscope counts it</figcaption>
          <ol class="divide-y divide-strokeWeak">
            {% for e in this.frontmatter.event_example %}
            <li class="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 md:px-6 py-3.5">
              <span class="min-w-0 truncate font-mono text-sm text-textStrong">{% if e[2] == 'log' %}<span class="text-textWeak">log </span>“{{e[0]}}”{% else %}{{e[0]}}{% endif %}</span>
              <span class="row-span-2 inline-flex items-center rounded-md bg-(--tone-weak) px-2 py-0.5 font-mono text-[12px] tabular-nums text-textStrong">1 event</span>
              <span class="text-sm text-textWeak">{{e[1]}}{% if e[2] == 'span' %} · headers, request body and response body included{% endif %}</span>
            </li>
            {% endfor %}
          </ol>
          <p class="flex items-baseline justify-between gap-4 px-5 md:px-6 py-4 border-t border-strokeWeak bg-fillWeak"><span class="text-base font-semibold text-textStrong">Total</span><span class="text-base font-semibold tabular-nums text-textStrong">4 events, bodies included</span></p>
        </figure>
        <dl class="grid gap-6">
          <div class="border-t border-strokeWeak pt-4 space-y-1">
            <dt class="font-semibold text-textStrong">Counts as one event</dt>
            <dd class="text-base leading-relaxed text-textWeak text-pretty">Each log record and each span, including every HTTP request your services receive or send.</dd>
          </div>
          <div class="border-t border-strokeWeak pt-4 space-y-1">
            <dt class="font-semibold text-textStrong">Metered on its own</dt>
            <dd class="text-base leading-relaxed text-textWeak text-pretty">Metric datapoints: 20M included, then $1 per 10M. Session replays: 2,000 included, then $1 per 1,000.</dd>
          </div>
          <div class="border-t border-strokeWeak pt-4 space-y-1">
            <dt class="font-semibold text-textStrong">Never on the bill</dt>
            <dd class="text-base leading-relaxed text-textWeak text-pretty">Request and response bodies, headers, hosts, containers and team members.</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>

  <!-- Plans side by side -->
  <section id="compare-plans" class="tone-brand relative w-full scroll-mt-16">
    <div class="relative wrap max-w-[80rem] pt-24 md:pt-36 space-y-10">
      <div class="space-y-6 max-w-3xl">
        <h2 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Plans side by side</h2>
      </div>
      <div class="overflow-x-auto rounded-2xl card border border-strokeWeak p-2 pe-10 md:p-3 max-md:[mask-image:linear-gradient(to_left,transparent,black_2.5rem)]">
        <table class="w-full min-w-[46rem]! table-fixed border-separate border-spacing-0 text-base text-start">
          <caption class="sr-only">monoscope plans compared</caption>
          <thead><tr><td class="sticky left-0 z-10 bg-(--card-bg) w-36 md:w-60"></td>{% for c in this.frontmatter.plan_cols %}<th scope="col" class="px-4 pt-4 pb-3 text-start align-bottom font-semibold {% if forloop.index == 2 %}bg-fillBrand-weak border-x border-x-strokeBrand-strong rounded-t-xl border-t border-t-strokeBrand-strong text-textStrong{% else %}text-textWeak{% endif %}">{{c}}</th>{% endfor %}</tr></thead>
          <tbody>
            {% for r in this.frontmatter.plan_rows %}
            <tr><th scope="row" class="sticky left-0 z-10 bg-(--card-bg) border-t border-strokeWeak px-4 py-3.5 text-start align-top text-sm md:text-[15px] leading-snug font-medium text-textStrong text-pretty">{{r[0]}}</th>{% assign last_row = forloop.last %}{% for cell in r offset:1 %}<td class="border-t border-strokeWeak px-4 py-3.5 align-top text-pretty tabular-nums {% if forloop.index == 2 %}bg-fillBrand-weak border-x border-x-strokeBrand-strong text-textStrong{% if last_row %} rounded-b-xl border-b border-b-strokeBrand-strong{% endif %}{% else %}text-textWeak{% endif %}">{% if cell == 'Included' %}<span class="inline-flex items-center gap-1.5 text-textSuccess">{{check}}Included</span>{% else %}{{cell}}{% endif %}</td>{% endfor %}</tr>
            {% endfor %}
          </tbody>
        </table>
      </div>
      <a href="/compare/" class="inline-flex items-center gap-2 min-h-11 text-base font-medium text-textBrand underline underline-offset-4">Compare monoscope with Datadog, Sentry and others <svg class="h-3 w-3" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="relative w-full scroll-mt-16">
    <div class="relative wrap max-w-[80rem] pt-24 md:pt-36 grid lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
      <div class="space-y-4">
        <h2 class="text-3xl md:text-4xl font-medium tracking-tight leading-[1.1] text-balance text-textStrong">Questions about pricing</h2>
        <p class="text-lg leading-[1.65] text-textWeak text-pretty">Anything else, ask an engineer at <a href="mailto:hello@monoscope.tech" class="text-textBrand underline underline-offset-4">hello@monoscope.tech</a>.</p>
        <a href="/docs/faqs/" class="inline-flex items-center gap-2 min-h-11 text-base font-medium text-textBrand underline underline-offset-4">Read all FAQs <svg class="h-3 w-3" aria-hidden="true"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg></a>
      </div>
      <div class="border-b border-strokeWeak">
        {% for faq in this.frontmatter.faqs %}
        <details class="faq group border-t border-strokeWeak">
          <summary class="flex items-center justify-between gap-6 min-h-14 py-4 cursor-pointer list-none text-lg font-medium text-textStrong hover:text-textBrand">{{faq.q}}<svg class="size-5 shrink-0 text-textWeak transition-transform duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></summary>
          <div class="pb-6 max-w-[65ch] text-base leading-relaxed text-textWeak text-pretty">{{faq.a}}</div>
        </details>
        {% endfor %}
      </div>
    </div>
  </section>
</section>
```
