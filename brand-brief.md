---
project: monoscope
codename: apitoolkit
brand_name: monoscope
codebase: /Users/tonyalaribe/Projects/apitoolkit/apitoolkit-landing
vault_path: null

stage: voice
created: 2026-09-27
last_updated: 2026-10-11
last_audit: 2026-09-27

business_type: saas
industry: developer tools / observability
target_audience: Backend and fullstack developers, DevOps/SRE engineers, and engineering managers evaluating observability tools

positioning:
  status: draft
  confidence: { competitive_alternatives: validated, unique_attributes: validated, value: validated, best_fit_customers: user_stated, market_category: user_stated, why_now: user_stated }
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
    - { segment: "PRIMARY (2026-10-11): Mid-size engineering teams (roughly 50-300 engineers) on Datadog", characteristics: ["Triggers: want an AI SRE without paying for Datadog plus an AI layer; data ownership or EU residency; renewal or bill shock", "Already run OpenTelemetry or can, so switching is an exporter change", "Evaluate against Better Stack, SigNoz, Axiom on price and Polylane/Sentry Seer on AI", "Buyer is an EM/VP Eng or platform lead; users are backend engineers and SREs"], why_they_care: "They want AI on-call that is actually right, their data where they choose (EU, own bucket), and a bill they can predict. An AI SRE on sampled data guesses; ours reads the request." }
    - { segment: "SECONDARY: Small product teams (2-20 engineers, no dedicated SRE) whose product depends on APIs, theirs and third parties'", characteristics: ["Payments, fintech, logistics, marketplaces", "A broken request means lost money or a dispute with a partner", "Priced out of Datadog or found SigNoz/Sentry blind to payloads"], why_they_care: "Nobody babysits monitoring; when an integration breaks they need the exact request to fix it and to prove who broke it." }
  market_category:
    category: "AI SRE, on its own open-source observability"
    style: existing_head_to_head
    label: "AI SRE + open-source observability"
    rationale_2026_10_11: "User decision after the competitor scan: lead with the AI SRE (the buying trigger for mid-size Datadog teams), with observability as the reason the AI is right. The winning AI claim is 'it reads the real request': Polylane, Superlog and Datadog Bits AI work from sampled spans and error strings; Sentry Seer from errors and traces without bodies."
    rationale: "User decision: 'API-first' boxed monoscope in with Treblle. The category is now plain observability, head-to-head with Datadog, New Relic and Sentry, plus the AI SRE layer (Polylane, Superlog) folded into one product. The category label is shared on purpose; the difference is carried by the tagline and the onlyness claim (full payloads, your bucket as the database, open source)."
    alternative: "observability built for AI debugging (only if the payloads + own-S3 argument leads; otherwise fails the swap test)"
    rationale_prev: "Keeps full observability (logs/traces/metrics) so Treblle's API-only frame loses, while starting from the request so Datadog/SigNoz breadth comparisons don't decide the deal. Rejected: 'open-source Datadog alternative' (invites a breadth fight, SigNoz owns it); 'API monitoring' (concedes logs/traces, Treblle's frame)."
  onlyness_statement: "monoscope is the only AI SRE that works from the full, unsampled request and response of every API call, yours and your suppliers', because it keeps them itself, next to your logs, traces and metrics, and in your own S3 bucket if you choose."
  why_now: "Teams want AI on-call, and every vendor now sells one. But an AI SRE is only as good as what it can see, and most see sampled spans and error strings. Meanwhile Datadog renewals and EU data rules push mid-size teams to look. monoscope gives the AI the full request, the full history and the tools to act, at per-event prices, hosted in the US or EU, in your bucket, or on your servers."
  pricing_constraint: "Own-S3-as-database stays a $199/month minimum. Request bodies do not add to event count or price (user-confirmed 2026-10-11). EU region is standard. No SOC 2 or ISO 27001 yet: never imply it; answer it honestly in the FAQ."
  positioning_statement: "For engineering teams leaving Datadog, monoscope is an AI SRE built on its own open-source observability. It investigates every error, answers in Slack, checks every deploy and opens the fix, working from the full, unsampled request and response, not a sampled trace. Unlike Polylane or Superlog, there is no second tool underneath to limit what the AI sees; unlike Datadog, Better Stack or SigNoz, request bodies come by default and at no extra cost. Per-event pricing, US or EU hosting, your own S3 bucket as the database, or self-hosted under AGPL, with hands-on migration help."

messaging:
  status: needs_refresh   # 2026-10-11: reader changed to mid-size Datadog teams; character/trueline/pitch updated, rest of BrandScript still small-team
  confidence: { character: validated, villain: researched, internal_problem: assumed, authority: validated, tagline: validated }
  brandscript:
    character: "An engineering team (roughly 50-300 engineers) on Datadog that wants AI on-call it can trust, its data where it chooses, and a bill it can predict. They want to know exactly what happened to any request without paying for a second AI tool on top."
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
  trueline: "monoscope's AI SRE reads the exact request and response behind every incident, because monoscope keeps them; every other AI SRE works from what some other tool decided to keep."
  elevator_pitch: "Teams on Datadog want an AI SRE, but every AI SRE on the market works from sampled traces and error strings, so it guesses. monoscope is an AI SRE built on its own open-source observability: it keeps every request and response, yours and your suppliers', next to your logs, traces and metrics, and its routines investigate errors and deploys, answer in Slack and open the fix from that full record. Per-event pricing with request bodies included, hosted in the US or EU, in your own S3 bucket or self-hosted, and we help you move off Datadog."
  homepage_hero_draft:
    h1: "Know what happened. Prove it. Fix it."
    section_structure: ["Know: errors, crashes, breaking API changes, logs/traces/metrics", "Prove: full payloads, your own S3 as database, the court-case receipt", "Fix: AI routines, fix PRs, pre-merge change review, Slack Q&A"]
    sub: "Every issue comes with the exact request behind it, and everything around it: the response, the trace, what the customer saw. An AI reads it and opens the fix."
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
    - { name: "Better Stack", url: "https://betterstack.com/", positioning_summary: "'30x cheaper than Datadog. Predictable pricing.' Eyebrow 'The AI SRE observability stack'. Price first, then a broad catalogue: eBPF tracing, logs, uptime, incidents, status pages, RUM, error tracking (Sentry-SDK compatible), AI SRE (MCP, AI post-mortems, Linear tickets).", strengths: ["Datadog price table ($56,774 vs $687/mo)", "'Forget sampling'", "Logs in your own S3 bucket", "Migration offer: rest of Datadog contract on us"], weaknesses: ["No request/response bodies", "No outgoing-call or supplier story", "Breadth reads as a catalogue"], last_scanned: 2026-10-11 }
    - { name: SigNoz, url: "https://signoz.io/", positioning_summary: "'Observability for your team and AI agents. Powered by open standards.' OTel-native, open source, one platform; no host or seat pricing; Noz AI teammate + MCP; 'Move from symptoms to evidence'.", strengths: ["Open source + OTel ownership", "10,000+ teams, Oracle/Cisco/Samsung logos", "SOC 2 Type II, HIPAA", "Datadog/Grafana/CloudWatch alternative pages", "FAQ for evaluators"], weaknesses: ["Payload bodies need custom instrumentation", "Noz investigates and tunes alerts; no fix PRs claimed"], last_scanned: 2026-10-11 }
    - { name: Axiom, url: "https://axiom.co/", positioning_summary: "'The modern machine data platform.' Petabyte-scale schema-less event store; 'No data left behind'; 'Predict every bill' with 111x (Datadog) / 137x (Splunk) multipliers; agents via MCP + skills; public playground.", strengths: ["Problem section right after hero", "Biggest price multipliers", "No-account playground", "Sits beside Splunk instead of rip-and-replace"], weaknesses: ["Sells to petabyte shops, not small teams", "Nothing at the request level", "AI reads data, doesn't act"], last_scanned: 2026-10-11 }
    - { name: Sentry, url: "https://sentry.io/welcome/", positioning_summary: "'Code breaks, fix it faster.' Developer-first; errors, logs, replays, spans, profiles, metrics connected by the trace; Seer AI does root cause, merge-ready patches and pre-merge review; MCP server; five-line setup.", strengths: ["Huge logo wall (Anthropic, Vercel, Cursor)", "Irreverent self-aware voice", "Seer covers the AI-fix claim", "Closing section is literally 'Fix It'"], weaknesses: ["No request/response bodies", "No outgoing API calls or supplier breaking changes"], last_scanned: 2026-10-11 }
    - { name: Polylane, url: "https://polylane.com/", positioning_summary: "'Nobody should be on-call.' Detect / Troubleshoot / Fix: AI agents watch logs/metrics/traces, investigate across code and deploys, open PRs. 'Wake up to a fix ready to merge.' 'Every write pauses for your approval.' curl-install CLI, MCP, REST API.", strengths: ["Strong philosophical hook", "Concrete merged-PR proof (Depot: 53 in a month, median 24 min)", "SOC 2 + ISO 27001", "'No migration. No new SDKs.'"], weaknesses: ["Stores no telemetry; sees only what Datadog/Sentry kept (sampled, no bodies)"], last_scanned: 2026-10-11 }
    - { name: Superlog, url: "https://superlog.sh/", positioning_summary: "Pivoted from 'Triage and fix incidents from Slack' to 'Automate all routine engineering tasks'. Scheduled automations from templates (fix production errors, daily observability review, answer support questions, reliability checks); bring your own model, harness and tokens. YC-backed.", strengths: ["Template gallery", "Bring-your-own-inference", "Support use case"], weaknesses: ["Layer on Datadog/Sentry/CloudWatch with no store of its own", "Now overlaps monoscope 'AI routines' naming"], last_scanned: 2026-10-11 }
  white_space: "Nobody claims the request and response body, outgoing calls to suppliers' APIs, breaking changes in APIs you don't own, or the dispute (showing a partner what was sent and what came back). Crowded: cheaper-than-Datadog multipliers, AI fix PRs and pre-merge review, MCP/agents, 'no sampling', open source + OTel, 'evidence', own S3 for logs (Better Stack)."
  inspiration: []
  last_scan: 2026-10-11
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
- **2026-09-27 — Homepage restructured.** Know / Prove / Fix are now real sections (3 + 2 + 4 rows) driven by a `sections` array in index.md, each row one claim plus one recording slot or code block. Deployment cards moved to "Run it your way". Seven new recording slots listed in brand/recordings.md; old videos retired.
- **2026-09-27 — Homepage v3 (Railway/CodeRabbit pattern).** Hero split (headline left, plan + CTAs right) over a Know/Prove/Fix tab strip that plays the three chapter recordings in a window frame. Bordered logo grid + stats strip + Platnova quote. Problem line ("Agents ship faster than you can watch"). Numbered chapters: one big recording, side column of bullets, one link; DuckDB/CLI code under Prove/Fix. Recording load: 3 files (brand/recordings.md).
- **2026-09-27 — Polish pass (better-ui / better-typography / better-layout).** Display type: h1 60px, h2 48px, medium weight, tight tracking, balanced wrapping. Hero tabs as numbered pills. Code panels dark in both themes. Results rebuilt as a bordered stats grid + three quote cards (pastel tiles removed). Self-hosted card neutral. Reduced-motion marquee. Footer heading matched. Verified light + dark at 390/800/1440.
- **2026-09-27 — Hero cut to Railway density (user: "too much text").** Centered headline (72px), one line ("The exact request behind every error, and an AI that writes the fix."), two buttons, one trust line, then the tabbed product frame. Long subhead and plan paragraph removed; problem paragraph shortened.
- **2026-09-27 — Slots ship-ready without recordings.** Know/Prove use existing product screenshots as video posters; Fix shows a mocked routine message in Slack. Platnova quote typo corrected (APItoolkit). $199 plan CTA is "Get started" (it has no trial).
- **2026-09-27 — Hero switched to CodeRabbit layout (user).** Mono eyebrow "API-first observability", left two-line 72px headline, right column with the one-line pitch, primary button + text link, trust line; tab strip left-aligned over the product frame.
- **2026-09-27 — Category changed (user).** "API-first observability" → "Observability + AI SRE" (eyebrow), "Observability with an AI SRE built in" (page title, meta default, compare intro). We now compete head-to-head with Datadog/Sentry and with Polylane/Superlog, not Treblle.
- **2026-09-27 — Hero pitch re-anchored to the onlyness claim (user: copy not based on positioning).** Now: every request and response, incoming and outgoing, unsampled, in your own bucket, AI works from that record. Eyebrow carries open source.
- **2026-09-27 — Price as differentiator (user, refs Axiom / Better Stack).** Pricing section now leads with a bill estimate: events/month slider, bars for Datadog, Sentry, monoscope Cloud and monoscope + own S3, assumptions footnoted (list prices Sept 2026, 1 kB/event, 30-day retention). Honest ratio at 100M events: Datadog 2.4x, Sentry 1.6x. Bigger multiples require adding host fees or custom-metric assumptions, which need user sign-off.
- **2026-09-28 — HTML product demos replace recordings.** `assets/demos/{know,prove,fix}.html` = real dashboard screens (DOM snapshots, dark, via `scripts/demo-snapshot.mjs` against localhost:8080) + a JSON storyboard; `assets/js/demo-scene.js` plays them (no zoom, cursor/click/caption only). Hero tabs and chapters use them. Old branch new-landing was the reference; its zoom-heavy camera was dropped on request.
- **2026-09-28 — Session replay added to the Know demo (user).** Final beat: the customer's checkout at the moment of the 500, error toast, timeline with the error marker, linked request. Authored screen, because neither demo project has RUM sessions; replace with a captured `/rum` session screen when one exists.
- **2026-09-28 — Replay in Prove; Slack in Fix (user).** Shared authored screens: `screens/replay.html` (+`replay.css`) used by Know and Prove; `screens/slack.html` (+`slack.css`): routine finding with PR button, teammate question, monoscope answer with chart and actions, modelled on the Polylane/Superlog references.
- **2026-09-28 — Bill estimator v2 (user).** Own-S3 row removed; Grafana Cloud added; inputs: events, hosts, metric series, replay sessions. monoscope meters: $1/M events, $1/10M metric datapoints, $1/1k sessions, all else included. Default (100M events, 10 hosts, 20k series, 20k sessions, 2 kB/event): Datadog 8.2×, Sentry 1.9×, Grafana 1.2×. Grafana stays close on pure ingest; the gap comes from hosts (Datadog), metric series and replay.
- **2026-09-28 — Estimator: Grafana → Splunk (user, "not dramatic enough"); Slack scene rebuilt on Slack's dark palette + Lato with a supplier breaking-change scenario (tracking_id dropped, orders stuck) and Anthony Alaribe as the asker; 30-day retention stated for all vendors.
- **2026-09-28 — Hero pitch (user).** "Every issue comes with the exact request behind it, and everything around it: the response, the trace, what the customer saw. An AI reads it and opens the fix." Own-bucket and never-sampled move to the trust line / Prove chapter (bucket is $199-plan only). Pitch set smaller (text-base/lg, max-w-md) so it stops competing with the headline.

- **2026-10-07 — Agents section for the sales PDF (fast mode, from the existing BrandScript).** Hero: a team already shipping with Claude Code/Cursor. Villain: an agent that can only guess from the code because it can't see production. Guide: the investigate/triage/manage/instrument skills over the monoscope CLI, plus the hosted MCP server. Plan: install the CLI, install the skills, ask in plain English. Headline: "Ask Claude Code what broke, and it reads production to find out." Swap test vs Sentry (which also ships a Claude skill): passes only because the agent reads stored request/response payloads, so keep that claim in every agent-surface message. Lives in brand/pitch/monoscope-pitch.html, page 7.
- **2026-10-11 — Competitor scan + homepage content (Better Stack, SigNoz, Axiom, Sentry, Polylane, Superlog).** The crowded claims are price multipliers, AI fix PRs, MCP, "no sampling", open source + OTel and the word "evidence". The open claim is the request/response body, outgoing supplier calls, breaking changes in APIs you don't own, and disputes. Prove is the only pillar nobody else occupies. Superlog pivoted to scheduled "automations", which collides with "routines", so routine copy must always say it reads the stored request. The proposal is in `brand/landing-content.md`: problem block moved up, "two records" at the top of Prove, FAQ and final CTA added, sleep imagery dropped (Polylane), and the unlogged hero pitch ("Observability data lake and an AI SRE agent…") replaced because it fails the swap test. index.md is not changed yet.
- **2026-10-11 — Positioning refined (user Q&A).** All four win reasons count (request bodies, price vs Datadog, the AI fixing things, open source/own data). The primary reader is now a mid-size Datadog team (about 50-300 engineers); small API-heavy teams become secondary. Their triggers are wanting AI on-call, data ownership/EU, and renewal/bill shock. The hero leads with the AI SRE, and the winning claim is "it reads the real request". Category label: "AI SRE + open-source observability". Confirmed facts: bodies don't add to price, deploy-triggered routines exist, routine templates exist, the EU region is standard, no SOC 2/ISO yet. Offer: hands-on migration help, no money. Proof: fix-PR counts and larger logos exist but aren't ready to publish (placeholders). The tagline is unchanged.
- **2026-10-11 — Messaging set to needs_refresh.** Character, trueline and elevator pitch now describe the mid-size Datadog reader and the "AI SRE that reads the request" claim. The old trueline ("for teams with nobody on call") was false for teams that employ SREs. Villain, success (still uses "wake up" imagery that Polylane owns), failure and homepage_hero_draft still reflect the small-team framing and need a pass.
- **2026-10-11 — Comparison table framing (lp/f).** Headline: "Everyone has an AI now. Only one keeps the request." The fix-PR feature is admitted as table stakes and folded into one parity row ("Yes, on top of Datadog or Sentry" for AI SRE layers makes the two-tools point). Rows are ordered by what only monoscope can claim: bodies in and out (never sampled), breaking changes in third-party APIs, the AI reading the full request. Ten rows became six; group labels were removed.
