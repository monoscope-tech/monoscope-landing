---
project: monoscope
codename: apitoolkit
brand_name: monoscope
codebase: /Users/tonyalaribe/Projects/apitoolkit/apitoolkit-landing
vault_path: null

stage: voice
created: 2026-09-27
last_updated: 2026-09-27
last_audit: 2026-09-27

business_type: saas
industry: developer tools / observability
target_audience: Backend and fullstack developers, DevOps/SRE engineers, and engineering managers evaluating observability tools

positioning:
  status: draft
  confidence: { competitive_alternatives: validated, unique_attributes: validated, value: validated, best_fit_customers: validated, market_category: assumed, why_now: researched }
  competitive_alternatives:
    - { name: "Grep logs / CloudWatch / hear it from customers", type: status_quo, notes: "User-confirmed. Most common for small teams; they find out when a customer or partner complains." }
    - { name: "Datadog / New Relic", type: direct, notes: "User-confirmed. Too expensive; request bodies not stored by default (Datadog docs)." }
    - { name: "Sentry-style error tracking", type: indirect, notes: "User-confirmed. Sees exceptions, not the request/response that caused them." }
    - { name: "SigNoz", type: direct, notes: "User-confirmed. Open source + OTel like monoscope; payload bodies need custom instrumentation." }
    - { name: "Atatus", type: direct, notes: "User-confirmed. Lower-cost APM; now tracks API calls too, so payload capture alone is not unique." }
    - { name: "Treblle", type: direct, notes: "Captures API payloads, but API-only: no app logs/traces/metrics. The key test for any payload claim." }
    - { name: "AI SRE layers (Polylane, Superlog)", type: direct, notes: "Agents that sit on top of Datadog/Sentry/Honeycomb etc.: investigate, open fix PRs, review changes, answer in Slack. They don't store data, so they only see what the underlying tool kept (sampled traces, no bodies). Polylane hero: 'Nobody should be on-call' — avoid echoing it." }
    - { name: "Axiom, Baselime, Bugsnag, Honeybadger", type: indirect, notes: "Compare pages exist; lower priority in real deals." }
  unique_attributes:
    - { attribute: "Full request + response payloads for incoming AND outgoing (third-party) API calls, unsampled", category: feature }
    - { attribute: "Payloads live next to logs, traces, metrics and session replay (OTel-native, 780+ integrations)", category: feature }
    - { attribute: "Breaking/shape-change detection on your APIs and the APIs you call", category: feature }
    - { attribute: "AI routines: scheduled AI investigations with access to all logs, metrics, traces, payloads, deployments and issues, which can act through Slack, email, Discord, Opsgenie, GitHub and other tools (check things, notify people, open issues)", category: feature }
    - { attribute: "Slack teammate that knows your system: ask any question in Slack and it answers from all logs, metrics, traces, payloads, deployments and issues", category: feature }
    - { attribute: "AI SRE built in (shipped): incident to pull request with the fix; pre-merge review of code changes against live production data; issue memory and dedup of recurring bugs; alert severity triage; finding monitoring gaps", category: feature }
    - { attribute: "Agent surfaces: hosted MCP server (~50 tools), agent-mode CLI, Claude Code skills, natural-language queries", category: feature }
    - { attribute: "Uses the customer's own S3 bucket as its database for ALL data (requests, payloads, logs, traces, metrics, replays): live and queryable, not an archive; unlimited retention", category: model }
    - { attribute: "Stored as open Delta Lake + Parquet: customers can query their data with DuckDB or other open-source tools, or build it into their own products", category: model }
    - { attribute: "Postgres-dialect SQL endpoint over the customer's data, powered by the open-source TimeFusion database: query it like any database without hosting DuckDB", category: ip }
    - { attribute: "AGPL open source; self-hostable", category: model }
    - { attribute: "Per-event pricing, no sampling decisions, free up to 10k events/day", category: model }
  value:
    - { value: "Debug from the exact request and response that failed, without reproducing it", tied_to: ["payloads", "payloads next to logs/traces"], for_whom: "Engineers on small teams" }
    - { value: "Proof of whose fault it was. The stored outgoing request shows exactly what was sent to a supplier, and the stored response shows the supplier acknowledged it (e.g. a 200 with a valid ack) even though they never did the work. One customer used this as evidence in court; Platnova's support team uses it to name which integration partner broke.", tied_to: ["payloads (outgoing)", "own S3 / unlimited retention"], for_whom: "Teams whose product depends on suppliers' APIs: payments, logistics" }
    - { value: "Know a partner (or your own deploy) changed an API's shape before customers do. Founder story: a missing field lost 20k orders in 10 minutes.", tied_to: ["breaking-change detection"], for_whom: "Integration-heavy products" }
    - { value: "An on-call engineer without the hire: AI routines investigate production on a schedule using the actual failing request, full history and deploy timeline, then act through the team's tools (Slack, GitHub, Opsgenie). Most AI observability features only see sampled spans and error strings.", tied_to: ["AI routines", "payloads", "own S3 / unlimited retention"], for_whom: "Teams without dedicated SRE" }
    - { value: "One product instead of two: observability plus an AI SRE that works from the full evidence. AI SRE layers (Polylane, Superlog) need Datadog or Sentry underneath and can only see what those kept; monoscope's AI sees the unsampled request and response, so its fix PRs and change reviews start from the real payload.", tied_to: ["AI SRE built in", "payloads", "own S3 / unlimited retention"], for_whom: "Small teams that won't pay for, or wire together, two tools" }
    - { value: "Your own AI can read it too: data is open Delta Lake/Parquet in your bucket, reachable by DuckDB, your agents (via MCP/CLI) or your product code", tied_to: ["Delta Lake + Parquet", "agent surfaces", "own S3 as database"], for_whom: "Teams building with AI agents" }
    - { value: "Keep every event without a Datadog-sized bill or sampling trade-offs; own the data if needed", tied_to: ["per-event pricing", "own S3 / self-host"], for_whom: "Cost-sensitive teams" }
    - { value: "Observability data becomes product data: customers build customer-facing audit trails and activity dashboards straight from the requests monoscope already stores", tied_to: ["own S3 as database", "Delta Lake + Parquet", "Postgres SQL endpoint (TimeFusion)"], for_whom: "Products that owe their own customers an activity/audit history (payments, logistics, B2B SaaS)" }
  best_fit_customers:
    - { segment: "Small product teams (2-20 engineers, no dedicated SRE) whose product depends on APIs — their own and third parties'", characteristics: ["Already ship with AI coding agents, so they deploy faster than they can watch production", "Payments, fintech, logistics, marketplaces or anything integration-heavy", "A broken request means lost money or a dispute with a partner", "Laravel / Express / Django / Go stacks", "Priced out of Datadog or found SigNoz/Sentry blind to payloads"], why_they_care: "Nobody babysits monitoring, and when an integration breaks they need the exact request to fix it and to prove who broke it." }
  market_category:
    category: "API-first observability"
    style: existing_niche
    alternative: "observability built for AI debugging (only if the payloads + own-S3 argument leads; otherwise fails the swap test)"
    rationale: "Keeps full observability (logs/traces/metrics) so Treblle's API-only frame loses, while starting from the request so Datadog/SigNoz breadth comparisons don't decide the deal. Rejected: 'open-source Datadog alternative' (invites a breadth fight, SigNoz owns it); 'API monitoring' (concedes logs/traces, Treblle's frame)."
  onlyness_statement: "monoscope is the only observability platform that uses your own S3 bucket as its database, and keeps the full request and response of every API call (yours and the third-party APIs you depend on) alongside your logs, traces and metrics."
  why_now: "AI coding agents let small teams ship far more code than they can watch, so APIs (theirs and suppliers') break more often, and no SRE was hired. AI can only debug what it can see: monoscope gives it the full request, the full history and the tools to act."
  pricing_constraint: "Own-S3-as-database stays a $199/month minimum for now. Messaging leads with payloads + full observability + AI routines (true on every plan); S3/data ownership is the upgrade story and the onlyness proof, not the entry hook."
  positioning_statement: "For small product teams whose business runs on APIs, monoscope is API-first observability: every request and response, incoming and outgoing, stored unsampled next to logs, traces and metrics, with alerts when an API's shape changes and AI routines that investigate on your behalf. Unlike Datadog or SigNoz, you don't need custom instrumentation to see payloads; unlike Treblle, you see the whole app, not just the API layer. AI routines investigate on a schedule with the full evidence and act through the team's own tools. On the Cloud + Your own S3 plan (from $199/month) the database is your own bucket, in open Delta Lake/Parquet: you own the data, keep it as long as you like, and query it with DuckDB, SQL or your own AI."

messaging:
  status: draft
  confidence: { character: validated, villain: researched, internal_problem: assumed, authority: validated, tagline: validated }
  brandscript:
    character: "A small product team (2-20 engineers, no SRE) whose product runs on APIs, theirs and their suppliers'. They want to know exactly what happened to any request, without anyone babysitting dashboards."
    problem:
      villain: "Tools that throw away the evidence: sampled traces, dropped request bodies, short retention, and data locked in someone else's system."
      external: "A customer reports a failed payment or a missing order. The logs say 200 OK. Nobody can reproduce it, and the request body was never stored."
      internal: "Hearing about it from a customer first, then standing in front of the CEO or the customer unable to say what happened, or whose fault it was."
      philosophical: "No team should take the blame for a failure they can't see, or pay for a supplier's mistake they can't prove."
    guide:
      empathy: "We shipped a rewrite that lost 20,000 orders in 10 minutes because one field was missing from the docs. We built the tool we needed that day."
      authority: "5,000+ developers. Blockradar cut MTTR 20x, Sameday cut manual troubleshooting 70%, and a customer won a court case against a supplier using monoscope's stored requests. Open source (AGPL), including the TimeFusion database underneath."
    plan:
      - "Add the SDK or point your OpenTelemetry exporter at monoscope (minutes, 20+ frameworks)."
      - "Every request, response, log, trace and metric is kept unsampled, and AI routines watch it for you."
      - "When something breaks, the AI investigates, tells you in Slack and opens a PR with the fix. You review it with the exact request in front of you."
    agreement_plan: ["Free up to 10k events/day", "We never sample or drop your data", "Open source; on the own-S3 plan your data is open Delta Lake/Parquet in your bucket"]
    cta:
      direct: "Start for free"
      transitional: "Launch playground"
    success: "You wake up to a Slack message: the root cause, the exact failing request, and a pull request with the fix, ready to review. Risky changes get flagged against production data before they merge. When a customer says their payment failed, within a minute you have the exact request you sent, the supplier's 200 acknowledgement, and an AI routine's summary that already flagged it in Slack. The team keeps shipping at AI-agent speed without a pager rotation."
    failure: "You keep finding out from customers, spend days reproducing bugs from partial logs, absorb supplier failures you can't prove, and pay enterprise prices for sampled data. As AI agents ship more code, more breaks with nobody watching."
    transformation: "From hearing it from customers and guessing, to knowing first and holding the receipt."
  tagline: "Know what happened. Prove it. Fix it."
  tagline_short: "Know what happened. Prove it."
  tagline_candidates:
    - { text: "Know what happened. Prove it.", verdict: "short form (ads, bios, footer)", swap_test: "Pass. 'Prove it' needs stored payloads + long retention; Datadog/SigNoz (no bodies by default) and Sentry (errors only) can't back it." }
    - { text: "Know what happened. Prove it. Fix it.", verdict: chosen, swap_test: "Pass. 'Fix it' alone is Polylane/Superlog's claim, but paired with 'prove it' it needs the stored evidence they don't have." }
    - { text: "Observability that keeps the evidence.", verdict: "use as category line / meta", swap_test: "Pass vs Datadog/SigNoz (sampling, no bodies). Weaker vs Treblle, which keeps API payloads." }
    - { text: "Every request. Every response. Kept.", verdict: alternate, swap_test: "Partial. Treblle could claim it; doesn't signal logs/traces or AI." }
    - { text: "Your production, with receipts.", verdict: "internal / campaign", swap_test: "Pass (hand test strong) but too clever for a first-time visitor." }
    - { text: "Find and fix production issues, before customers notice. (current)", verdict: rejected, swap_test: "Fail. Sentry, Datadog and Honeybadger can all say it." }
  trueline: "monoscope keeps the receipts: the exact request and response behind every incident, for teams with nobody on call."
  elevator_pitch: "Small teams whose product runs on APIs find out about failures from their customers, then can't say what happened because their tools sampled the trace and never stored the request body. monoscope is API-first observability: it keeps every request and response, yours and your suppliers', next to your logs, traces and metrics, and AI routines investigate it on a schedule and tell you in Slack. Add the SDK in minutes and start free. When something breaks you have the exact request, and the proof. And it's open source; on the own-S3 plan the database is your own bucket."
  homepage_hero_draft:
    h1: "Know what happened. Prove it. Fix it."
    section_structure: ["Know: errors, crashes, breaking API changes, logs/traces/metrics", "Prove: full payloads, your own S3 as database, the court-case receipt", "Fix: AI routines, fix PRs, pre-merge change review, Slack Q&A"]
    sub: "monoscope catches errors, crashes and breaking API changes, and keeps the exact request and response behind each one, next to your logs, traces and metrics. Its AI investigates, opens a pull request with the fix, and tells you in Slack before your customers do."
    sub_alt: "Every error, crash and breaking API change, with the exact request and response that caused it. Logs, traces and metrics in one place, and AI routines that flag issues in Slack before your customers do."
  meta_description_draft: "Catch errors, crashes and breaking API changes with the exact request and response behind each, plus logs, traces, metrics and AI routines. Free to start."

voice:
  status: draft
  source: "Codify the existing docs/CLI voice ('One static binary, one auth, one JSON shape.') and retire the generic marketing voice (seamless x5, comprehensive x3, leverage x1 on marketing pages)."
  dimensions:
    funny_serious: 1            # straightforward; one dry line allowed, never a joke about an outage
    formal_casual: 1            # contractions, "you", engineer to engineer; no slang
    respectful_irreverent: 1    # call out sampling, dropped bodies and surprise bills; never sneer at a named competitor
    enthusiastic_matter_of_fact: 2  # numbers and facts carry the energy; no exclamation marks
  personality: competence
  personality_secondary: sincerity
  archetype: sage
  archetype_note: "The senior engineer at the postmortem who, while everyone argues about what happened, pulls up the actual request. Knows, shows the evidence, then fixes it."
  sounds_like:
    - "A senior engineer's postmortem: timeline, evidence, root cause, fix. No blame, no drama."
    - "monoscope's own CLI docs"
    - "Stripe docs and Linear changelogs: specific, calm, confident"
  not_like:
    - "An enterprise observability brochure ('a unified platform that empowers teams with seamless, comprehensive visibility')"
    - "AI hype ('autonomous agents revolutionizing operations!')"
    - "A legal or compliance notice. 'Prove it' means evidence, not legalese."
    - "Meme-heavy dev-tool Twitter"
  rules:
    - "Lead with the concrete noun: the request, the response, the PR. Not 'visibility' or 'insights'."
    - "Numbers over adjectives: '10k events a day', '20x faster MTTR', not 'blazing fast'."
    - "Say what the AI does, as verbs: investigates, opens a PR, flags, answers. Never just 'AI-powered'."
    - "Customer as subject: 'you see the exact request', not 'our platform provides'."
    - "Short declaratives; parallel threes are welcome (Know / Prove / Fix, 'one binary, one auth, one JSON shape')."
    - "No exclamation marks, no 'simply' or 'just' (condescending when something is broken)."
    - "Competitors: name them only in comparisons, state facts (Datadog doesn't store request bodies by default), never mock."
    - "In outages and errors: say what happened, what we did, what you need to do. No 'oops'."
  vocabulary:
    use: ["request", "response", "payload", "the exact request", "keep / kept", "unsampled", "evidence", "receipt (sparingly)", "breaking change", "supplier / third-party API", "root cause", "pull request / PR", "your bucket", "open format", "you", "ship"]
    avoid: ["innovative", "cutting-edge", "best-in-class", "world-class", "next-generation", "revolutionary", "game-changing", "seamless", "holistic", "synergy", "leverage", "empower", "transform", "solutions", "passionate about", "comprehensive", "robust", "unified", "single pane of glass", "AI-powered (without saying what it does)", "autonomous", "enterprise-grade", "insights (as a noun on its own)", "visibility (on its own)", "simply", "just", "nobody should be on-call (Polylane's line)"]
  examples:
    on_brand:
      - { context: "Homepage headline", text: "Know what happened. Prove it. Fix it." }
      - { context: "Product description", text: "monoscope keeps every API request and response, yours and your suppliers', next to your logs, traces and metrics. When something breaks, its AI finds the request that caused it and opens a PR with the fix." }
      - { context: "Error message (S3 connection)", text: "We can't write to your bucket 'acme-telemetry': access denied for s3:PutObject. Data is buffering for up to 24 hours. Add PutObject to the IAM policy and we'll resume automatically." }
      - { context: "Email subject", text: "Your payment provider changed its response shape on Tuesday" }
      - { context: "Social post", text: "A customer's supplier returned 200 OK and never shipped the order. They had the request and the response, timestamped, in their own S3 bucket. That's the whole case." }
      - { context: "CTA", text: "Start for free" }
      - { context: "Support reply", text: "You're right, the alert fired 12 minutes late. The delay was in our Slack delivery queue, not your data. It's fixed as of 14:05 UTC, and here's the exact alert timeline." }
      - { context: "About page opening", text: "We once shipped a rewrite that lost 20,000 orders in 10 minutes. One field was missing, and nothing we had kept the request that would have shown it." }
    off_brand:
      - { context: "Homepage headline", text: "Unified, AI-powered observability for modern teams", why_wrong: "Swap test fails (Datadog, New Relic, SigNoz); 'unified' and 'AI-powered' are on the avoid list; says nothing about requests or proof." }
      - { context: "Product description", text: "Our comprehensive platform seamlessly empowers engineering teams with actionable insights across the stack.", why_wrong: "Four avoid-list words; the brand is the subject; no concrete noun a developer can picture." }
      - { context: "Error message (S3 connection)", text: "Oops! Something went wrong with your storage. Please try again later!", why_wrong: "Too casual and enthusiastic for a data-loss worry; doesn't say what happened, whether data is safe, or what to do." }
      - { context: "Email subject", text: "🚀 Supercharge your debugging with our latest AI features!", why_wrong: "Hype, emoji, exclamation mark, feature-first instead of the customer's problem." }
      - { context: "Social post", text: "Observability is broken. Legacy vendors are ripping you off. Time for a revolution 🔥", why_wrong: "Irreverence tips into sneering (+3); 'revolution' is banned; no evidence." }
      - { context: "CTA", text: "Unlock the power of monoscope", why_wrong: "Vague, grandiose, doesn't say what happens on click." }
      - { context: "Support reply", text: "We sincerely apologize for any inconvenience this may have caused. Our team is looking into it.", why_wrong: "Too formal; no facts, no timeline, no evidence — the opposite of the brand promise." }
      - { context: "About page opening", text: "Founded in 2021, monoscope is passionate about delivering innovative observability solutions.", why_wrong: "Three avoid-list words; company as hero; could be any vendor." }

visual:
  status: not_started

assets:
  existing:
    - { type: logo, location: "assets/brand/logo_full_color.svg, logo_full_white.svg, assets/img/logo_mini.svg, logo_black.svg", intentionality: 4, consistency: 4, quality: 3, notes: "Full wordmark + icon-only + light/dark variants. White variant duplicated as SVG and PNG (logo_full_white_clean.png)." }
    - { type: favicon, location: "static/favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png", intentionality: 3, consistency: 3, quality: 3, notes: "Sizes present. msapplication-TileColor is #da532c (orange generator default), unrelated to brand blue #0068FF." }
    - { type: og_image, location: "scripts/generate-og-images.mjs -> assets/og/{slug}.png", intentionality: 4, consistency: 2, quality: 3, notes: "Per-page generation is deliberate, but homepage renders og:image https://monoscope.tech/assets/og/.png (empty slug), which returns HTML, not an image. assets/og/index.png exists and is unused." }
    - { type: colors, location: "assets/css/tailwind.css @theme (lines 18-141)", intentionality: 4, consistency: 4, quality: 3, notes: "Tokenized light/dark palette; brand blue #0068FF light / #3B82F6 dark (Tailwind blue-500). Semantic OKLCH states. Legacy gradient hexes #eb3349, #266df0 outside the token system." }
    - { type: fonts, location: "assets/css/tailwind.css:586 (InterVariable); assets/deps/bakemono (unused)", intentionality: 3, consistency: 5, quality: 2, notes: "Inter only, same as Vercel/Linear/most dev tools. No mono brand face defined despite code-heavy docs. Bakemono shipped but unused." }
    - { type: tagline, location: "index.md hero; foot.liquid:5", intentionality: 3, consistency: 4, quality: 2, notes: "'Find and fix production issues, before customers notice' (hero) echoed in footer. Swap test fails: Sentry, Datadog, Honeybadger could all say it." }
    - { type: meta_description, location: "_quickstatic/themes/default/components/head.liquid:10-11; quickstatic.yaml:3", intentionality: 2, consistency: 2, quality: 1, notes: "Default: 'API-first monitoring and observability platform for engineers and customer support teams. We use AI to help engineering teams observe, manage, monitor, and test...' Four-verb pile, audience includes support teams (absent everywhere else). quickstatic.yaml says 'Monitoring and Observability Platform.'" }
    - { type: css_theme, location: "assets/css/tailwind.css, DaisyUI themes light/dark/cupcake", intentionality: 4, consistency: 4, quality: 3, notes: "Well centralized. 'cupcake' DaisyUI theme is an unused leftover." }
    - { type: social_bio, location: "foot.liquid:10", intentionality: 3, consistency: 4, quality: null, notes: "GitHub monoscope-tech, X monoscope_tech, LinkedIn monoscope, YouTube @Monoscope, Discord. Bios not audited. No twitter:site meta." }
  gaps:
    - { type: homepage_title, priority: critical, recommendation: "index.md has no title frontmatter, so <title> and og:title render empty on monoscope.tech. Add title/description to index.md." }
    - { type: og_image, priority: critical, recommendation: "Default og_slug to 'index' when permalink is '/' in head.liquid so the homepage uses assets/og/index.png." }
    - { type: positioning, priority: critical, recommendation: "No onlyness statement. Hero, meta and section headlines describe the category (monitoring/observability), not a difference. Run brand-positioning; candidate anchors: API payload-level monitoring + breaking-change detection, OTel-native (780+ integrations), self-host/own-S3 deployment." }
    - { type: messaging, priority: important, recommendation: "Homepage sections pull three directions (API monitoring, general observability, 'Put AI to work'). Pick one story via brand-messaging." }
    - { type: brand_guide, priority: important, recommendation: "No written rules for name casing, logo usage, color, or voice. Voice lives only in CLAUDE.md design notes." }
    - { type: mono_font, priority: nice_to_have, recommendation: "Pick a code/mono face (or use the unused Bakemono deliberately) — code is a core brand surface for a dev tool." }
  inconsistencies:
    - { description: "Name casing: 'monoscope' (quickstatic.yaml, most homepage copy) vs 'Monoscope' (<title> suffix, meta, og) vs 'MONOSCOPE'.", locations: ["quickstatic.yaml:2", "head.liquid:6", "index.md"], severity: medium }
    - { description: "CTA says 'Start free trial' / 'Start 30 day free trial' while the product now has a free tier (enableFreeTier: true, pricing 'starts free'). A trial implies expiry; a free tier doesn't.", locations: ["nav.liquid:79", "foot.liquid:8", "index.md:207,624,633"], severity: high }
    - { description: "Audience: meta description targets 'engineers and customer support teams'; everything else targets engineers only.", locations: ["head.liquid:10"], severity: medium }
    - { description: "Self-hosting: FAQ says on-prem needs an enterprise plan; pricing offers a free AGPL Community Edition.", locations: ["docs/faqs/index.md", "pricing/index.md"], severity: medium }
    - { description: "Framework count: '17+' (docs, FAQ) vs '20+' (compare pages).", locations: ["docs/index.md", "compare/*/index.md"], severity: low }
    - { description: "Breaking-change uniqueness: error-tracking page says 'No other platform can detect arbitrary breaking changes' but the Treblle compare page doesn't mark Treblle as lacking it.", locations: ["features/error-tracking/index.md", "compare/treblle/index.md"], severity: medium }
    - { description: "Legacy APItoolkit domain in Trustpilot links.", locations: ["index.md (3x apitoolkit.io)"], severity: low }
    - { description: "Footer copyright 'Copyrights (c) 2025 - Past 3 technologies UG' — stale year, 'Copyrights' typo, lowercase 'technologies'.", locations: ["foot.liquid"], severity: low }
    - { description: "TileColor #da532c and legacy gradient hexes #eb3349/#266df0 sit outside the brand token palette.", locations: ["head.liquid", "assets/css/tailwind.css utilities"], severity: low }

intelligence:
  competitors:
    - { name: Polylane, url: "https://polylane.com/", positioning_summary: "'Nobody should be on-call' — self-operating software: AI agents read code, watch infra, fix prod. Incident to PR, pre-merge review against live telemetry, cloud-to-code context graph, MCP/CLI context for coding agents.", strengths: ["Strong philosophical hook", "30+ integrations", "curl-install CTA", "public pricing from $80/mo"], weaknesses: ["Stores no telemetry; depends on Datadog/Sentry/etc. for evidence"], last_scanned: 2026-09-27 }
    - { name: Superlog, url: "https://superlog.sh/", positioning_summary: "'Triage and fix incidents from Slack' — watches Sentry, Datadog and Slack, traces alerts through code, returns root cause, evidence and fix PR; one PR per issue; severity triage; finds observability gaps.", strengths: ["Clear Slack-first workflow", "Issue memory"], weaknesses: ["Layer on top of other tools; evidence limited to what they kept", "No public pricing"], last_scanned: 2026-09-27 }
  inspiration: []
  last_scan: 2026-09-27
---

# monoscope Brand Brief

**What it is:** An API monitoring and observability platform (logs, traces, metrics, anomaly alerts) with SDKs for Express, Laravel, Django, FastAPI, Go, .NET, Phoenix, Symfony and more.

## Known Context (unformalized)

- Site config description: "Monitoring and Observability Platform."
- CLAUDE.md design context: personality "Clear. Modern. Capable." — friendly and approachable, like Vercel/Linear. Refined minimalism, subtle blue accents. Anti-references: Datadog (cluttered), ReadTheDocs default, GitBook free tier.
- Homepage proof points: 20x faster MTTR (Blockradar), 70% less manual troubleshooting (Sameday), 3x faster recovery (Partna), 5x faster incident debugging; testimonials from Community Fluency and Woodcore.
- Legacy name: APItoolkit (repo and some paths still use it).

## Decision Log

- **2026-09-27 — Brand audit.** Visual system (tokens, logo variants, Inter) is centralized and consistent. Strategy layer is the weak point: tagline and meta description fail the swap test and no positioning exists. Two live bugs: empty homepage `<title>`/`og:title` and broken homepage og:image. The 'free trial' CTAs conflict with the new free tier. Next: fix the bugs, then brand-positioning.
- **2026-09-27 — Quick fixes.** Homepage title/description added; homepage og:image falls back to `assets/og/index.png`; free tier enabled on pricing page; sign-up CTAs changed to "Start for free" (BYOB $199 plan keeps "Start free trial"); footer copyright corrected.
- **2026-09-27 — Positioning draft.** Category: API-first observability, for small product teams (2-20 engineers, no SRE) whose product runs on APIs. Anchor: full request/response payloads (incoming and outgoing) alongside logs/traces/metrics, open source. The payload claim holds against Datadog (no bodies by default), SigNoz (custom instrumentation needed) and Treblle (API-only). Status draft because the category is assumed and competitor capabilities are based on light desk research. Needs validation before messaging: breaking-change uniqueness vs Treblle; whether "AI routines" is distinctive vs Datadog Bits AI and Sentry Seer.
- **2026-09-27 — Onlyness revised (user).** Payload capture alone isn't unique: Atatus now tracks API calls. The combination that is unique is using the customer's S3 bucket as the database, plus full payloads alongside logs/traces/metrics. The BYOB S3 inconsistency is now high severity because it contradicts the anchor.
- **2026-09-27 — Compare pages fixed.** All 8 compare pages now show current pricing (10k events/day free, $29 for 20M, own S3 from $199) and mark logs as supported.
- **2026-09-27 — Court-case value confirmed (user).** The case turned on proving the supplier received the full request context and returned a valid acknowledgement, then did not do the work. Payments and logistics are the clearest examples. This is validated and is the strongest proof point for messaging.
- **2026-09-27 — S3 scope confirmed (user).** The customer bucket stores everything as Delta Lake + Parquet, queryable with DuckDB or from customer code. This backs the onlyness claim, the "receipts" retention story and the "your AI can read it" AI angle. The S3 docs are wrong and need updating.
- **2026-09-27 — Data-as-product use case (user).** Some customers show their own customers audit trails or activity dashboards built on the data monoscope stores. They query it through a Postgres-dialect SQL endpoint powered by the open-source TimeFusion database, with no need to host DuckDB. Treat it as proof of "you own the data", not as a second category.
- **2026-09-27 — S3 docs rewritten.** They now say the bucket is the database for all data (Delta Lake + Parquet, partitioned by project_id/date), with DuckDB examples including a supplier-receipts query. Plan renamed to "Cloud + Your own S3".
- **2026-09-27 — AI layer + pricing (user).** AI routines see all logs, metrics, traces, payloads, deployments and issues, and act through Slack, email, Discord, Opsgenie and GitHub. Storage is Delta Lake + Parquet, and the bucket holds everything. Own S3 stays a $199/month minimum for now. Decision: AI is the "why now" and the value, not the category or the onlyness claim. Messaging leads with the evidence (payloads) plus AI routines on every plan, and the own-S3 database is the upgrade and proof story.
- **2026-09-27 — Messaging draft (fast mode).** Villain: tools that throw away the evidence. Recommended tagline: "Know what happened. Prove it." Hero, meta and elevator pitch drafted. The internal problem ("hearing it from a customer, unable to say what happened") is assumed and needs a user check.
- **2026-09-27 — Hero subhead revised (user).** The subhead now names errors, crashes and breaking API changes before the evidence. The earlier draft sold the payloads but not the problem.
- **2026-09-27 — AI SRE scan (Polylane, Superlog).** Both are AI layers on top of Datadog/Sentry. User confirmed monoscope has shipped all their headline features: incident to PR, pre-merge review against production data, issue memory/dedup, severity triage and gap finding. Positioning gains a second front: one product (evidence + AI SRE) against observability-plus-agent stacks. Avoid "nobody should be on-call" (Polylane owns it).
- **2026-09-27 — Tagline chosen (user).** "Know what happened. Prove it. Fix it." The short form "Know what happened. Prove it." is for tight spaces. Know / Prove / Fix doubles as the homepage section structure.
- **2026-09-27 — Voice draft (fast mode).** Sage archetype, with competence first and sincerity second. Dimensions: serious +1, casual +1, irreverent +1, matter-of-fact +2. The source is the existing docs/CLI voice. The marketing pages (seamless x5, comprehensive x3, leverage x1) need rewriting to match. Name casing is still open.
