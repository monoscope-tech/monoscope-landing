# Homepage Content Proposal

Competitor scan (2026-10-11) and the content layout and copy for `index.md` that follow from it. Internal; `brand/**` is excluded from the build.

**Revised after Q&A (2026-10-11).** Primary reader: a mid-size team (about 50-300 engineers) leaving Datadog, triggered by wanting AI on-call, data ownership/EU, or the renewal. The hero leads with the AI SRE; the claim that wins is **"it reads the real request"**. The request-level story (Prove) becomes the reason the AI is right, not a separate pitch.

## 1. What the Competitors Say

| | Hero | Lead claim | What they own | What they can't say |
|---|---|---|---|---|
| **Better Stack** | "30x cheaper than Datadog. Predictable pricing." Eyebrow: "The AI SRE observability stack" | Price, then a long feature catalogue (tracing, logs, uptime, incidents, status pages, RUM) | The price multiplier vs Datadog ($56,774 vs $687 table); "Forget sampling"; logs in your own S3 bucket | Request/response bodies; outgoing API calls; anything about proving what a supplier did |
| **SigNoz** | "Observability for your team and AI agents. Powered by open standards." | OTel-native, one platform, no host or seat pricing | Open source + OpenTelemetry; "Datadog / Grafana / CloudWatch alternative"; now also "Move from symptoms to evidence" | Payload bodies without custom instrumentation; an AI that writes fixes (Noz investigates and tunes alerts) |
| **Axiom** | "The modern machine data platform." | Keep every byte at petabyte scale, predictable bill | "No data left behind"; 111x/137x cheaper than Datadog/Splunk; schema-less; "Run a query. No account required" | Anything at the request level; small teams (it sells to petabyte shops); AI that acts |
| **Sentry** | "Code breaks, fix it faster" | Developer-first error tracking, "everything's connected by the same trace", Seer AI | Errors + Seer (root cause, merge-ready patches, pre-merge review); five-line setup; closing section is literally "Fix It" | The request body and response; outgoing calls; breaking changes in a supplier's API |
| **Polylane** | "Nobody should be on-call" | Detect / Troubleshoot / Fix: AI that opens PRs | "Wake up to a fix ready to merge"; merged-PR counts from customers; "Every write pauses for your approval" | It stores no telemetry. Its evidence is whatever Datadog or Sentry kept: sampled spans, no bodies |
| **Superlog** | "Automate all routine engineering tasks" (pivoted from "Triage and fix incidents from Slack") | Scheduled automations from templates: fix errors, daily observability review, support answers; bring your own model and tokens | Automation templates; "bring your own inference" | Same as Polylane: a layer on Datadog/Sentry/CloudWatch with no store of its own |

### Where everyone already is

- **Cheaper than Datadog.** Better Stack 30x, Axiom 111x, SigNoz "no host-based pricing". Our honest 8x loses a multiplier contest.
- **AI that opens a fix PR and reviews changes before merge.** Sentry Seer, Polylane, Superlog, Better Stack.
- **MCP server and coding agents.** All six.
- **"Keep everything" / no sampling.** Axiom and Better Stack both say it.
- **Open source + OTel.** SigNoz.
- **"Evidence".** SigNoz and Polylane now both use the word, so it no longer marks us out.

### Where nobody is

The **request and response body**, **outgoing calls to suppliers' APIs**, **breaking changes in APIs you don't own**, and the **dispute**: showing a partner or a customer what was sent and what came back. Polylane's Detect / Troubleshoot / Fix and Sentry's Issue → Context → Fix both skip the middle beat. **Prove is the only one of our three pillars with no competitor on it.** The page should spend its biggest visual on it.

### What this changes in our copy

- Lead with **"the request"**, **"the response"**, **"what you sent, what they answered"**. Use "evidence" sparingly.
- Drop sleep/wake imagery ("investigate while you sleep", "wake up to a Slack message"). Polylane owns "wake up to a fix".
- "Fix it" stays as our third beat, but the page shouldn't end on it alone: Sentry closes on "Fix It".
- "Routines" now sits next to Superlog's "automations". Every routine line has to say it **reads the stored request**; that is the only part Superlog can't copy.
- "Never sampled" stays true but goes in supporting copy, not a headline: Axiom and Better Stack say it too.
- Pricing headline stays "per event, not per host". No multiplier in a headline.
- Every agent-surface line says the agent gets the stored request and response back. Without that, it reads like Sentry's Claude skill or Better Stack's "Claude Code with the knowledge of your telemetry".

## 2. Page Layout

Sections keep their current IDs and components. Two moves and two additions:

| # | Block | Change | Why |
|---|---|---|---|
| 1 | Hero + Know/Prove/Fix demo tabs + logo strip | AI SRE pitch line, new trust line; tabs open on **Fix** | The reader's first trigger is AI on-call (see 3.1) |
| 2 | Proof strip + two quotes | One stat and one quote swapped | 780+ integrations is table stakes (SigNoz says the same); Neorent quote says "insights" |
| 3 | **Problem: "A 200 OK that stranded 41 orders"** | **Moved up**, out of Know, to sit right after the proof strip | It names the villain before the chapters answer it. Axiom runs its problem section in this slot |
| 4 | 01 Know + capabilities grid | Copy edits | |
| 5 | 02 Prove | **"Same request, two records" moved to the top of the chapter**, above the demo | It's the one picture no competitor can draw. Put it where people still read |
| 6 | 02 Prove → security | Copy edits | |
| 7 | 03 Fix + coding agents | Sleep imagery out, "one product" bullet in, agent bullet moved to the agents block | Polylane collision; duplication |
| 7b | **Leaving Datadog (new, after Fix)**: estimator + migration help | Pricing **moved up** out of Start into its own band | Renewal is a trigger for this reader. Better Stack and Axiom put price in the first two screens |
| 8 | 04 Start + onboarding + switch CTA | New h2 | |
| 9 | Results | New heading | "Real results for real companies" could be anyone's |
| 10 | **FAQ (new)** | 6 questions | SigNoz and Polylane both use one to answer evaluators. Ours handles "do you store bodies?" and "does the AI touch prod?" |
| 11 | **Final CTA band (new)** | Short closing line + buttons | The page currently ends on testimonials with no ask |

## 3. Copy

### 3.1 Hero

**Eyebrow:** AI SRE + open-source observability *(was "Open-source observability + AI SRE")*

**H1:** Know what happened. Prove it. Fix it. *(keep. The tagline holds; the pitch line carries the AI SRE.)*

**Pitch line.** The live line, "Observability data lake and an AI SRE agent, to catch issues and continuously improve production", was aiming at the AI SRE but reads like Axiom plus everyone else. Proposed:

> An AI SRE that reads the exact request behind every error, not a sampled trace. It investigates, answers in Slack and opens the fix.

Alternatives:

- "An AI SRE that sees every request and response, because it keeps them. It investigates, checks every deploy and opens the fix."
- "An AI SRE that works from the full request, not a sampled span. Observability included, at a fraction of Datadog's bill." *(price-forward, for a Datadog-retargeting variant)*

**Buttons:** Start for free · Launch playground *(keep)*

**Trust line:**

> Free up to 10k events a day · Open source · Hosted in the US or EU

**Demo tabs:** Know · Prove · Fix, opening on **Fix** (the Slack routine scene) so the first thing a visitor sees matches the pitch line.

### 3.2 Proof Strip

| Stat | Label |
|---|---|
| Open source | AGPL 3.0, including the database underneath *(TimeFusion)* |
| 20x | faster MTTR at Blockradar |
| 9x | fewer support calls at Platnova *(replaces "780+ OpenTelemetry integrations"; 780+ moves to Start)* |

**Placeholders for mid-size proof** (you have these but they aren't ready to publish): swap one stat for "**N** fix PRs merged at {customer}" once you can name it. Add larger logos to the hero strip ahead of the current eight. Polylane's "merged 53 in the first month" is the format to match.

**Quotes:** keep Platnova ("our tech support could see … which third-party integration partner was responsible"): it's the Prove story in a customer's words. Swap Neorent for Woodcore ("monoscope notifies us about any slight change that happens on the system"), which backs breaking-change detection.

### 3.3 Problem (moved up)

**Eyebrow:** A typical Tuesday *(keep)*

**H2:** The failures that cost you return 200 OK

**Lead:** When a supplier drops a field, nothing throws and the traces stay green. A sampled trace has no body to show the missing field, so an AI reading it can only guess. Here's the same morning with the request kept.

**Timeline:**

- **07:52.** A logistics supplier stops sending `tracking_id`. Its API keeps returning 200 OK, so nothing looks wrong.
- **07:54.** monoscope flags the breaking change in Slack, with all 41 affected requests attached.
- **09:41.** An engineer asks what's going on. monoscope answers from the stored requests and opens PR #491 with a fallback.

### 3.4 01 · Know What Happened

**H2:** Every error, with the exact request behind it *(keep)*

**Lead:** Errors, crashes and breaking API changes, each with the request and response that caused it. The trace, the logs and the customer's session replay are one click away.

**Bullets:**

- **The request comes with the error.** Exceptions and slow endpoints, grouped into issues. Each one carries the headers, body and response exactly as they were.
- **Breaking changes in APIs you don't own.** A field removed, renamed or retyped, in your endpoints or a supplier's, flagged with the request that showed it.
- **What the customer saw.** Session replay is linked to the failing request. Scrub to the click, see the toast they saw, and the request it fired.

**Link:** How error tracking works

**Capabilities grid**

- **H3:** Logs, traces, metrics and the rest
- **Lead:** The rest of the toolbox, so monoscope replaces a tool instead of becoming one more.
- **Cards:** keep the current eight. Drop the "Learn more" text; the whole card is already the link. One edit: *API catalog and docs*: "Every endpoint, its fields and its live schema, documented from real traffic, including the third-party APIs you call."

### 3.5 02 · Prove It

**H2** (replaces "Never sampled. The record, not a summary of it."):

> What you sent, and what they answered

Alternative: "A receipt for every API call"

**Lead:** monoscope keeps the full request and response of every call: the ones customers make to you and the ones you make to suppliers. Nothing is sampled. When someone disputes what happened, you show them.

**"Same request, two records"** *(moved to the top of the chapter)*

- Left heading: **What a sampled trace keeps** *(was "What a typical trace keeps")*
- Right heading: **What monoscope keeps for every request** *(keep)*
- Caption: monoscope sees the missing field, flags it as a breaking change, and links it to the trace, the logs and the customer's session.

**Bullets:**

- **Outgoing calls too.** Payment providers, logistics partners, KYC vendors: every request you send and every response they return, stored next to your own traffic.
- **The receipt.** What you sent, what the supplier answered and when, to the millisecond. One customer took it to court: the supplier had acknowledged every request with a 200 and never did the work.
- **Support answers without paging engineering.** Support opens the request and sees which partner broke it, the way Platnova's team does.
- **Share any request with a link.** Send the partner the exact request and response instead of describing them.
- **Your bucket is the database.** Add your own S3 bucket ($199/month) and every event lands there as open Delta Lake and Parquet. Unlimited retention. Query it with DuckDB, Spark or SQL.

**Link:** Your own S3 bucket

**Code label:** duckdb · the supplier's receipts, from your bucket

**Security block**

- **H3:** Your data, your bucket, code you can read *(was "Security and your data")*
- **Lead:** What leaves your app, where it's stored, and who can read the code that handles it.
- **Items:** keep the six. Redaction first, since "you store request bodies?" is the first objection.

### 3.6 03 · Fix It

**H2:** An AI that reads the actual request *(keep: Sentry, Polylane and Superlog can't say it)*

**Lead:** Not a sampled span or an error string. It investigates on a schedule, answers in Slack, opens pull requests with fixes, and reviews risky changes against production before they merge.

**Bullets:**

- **Routines on your schedule, or on every deploy.** Every hour, after each deploy or each morning, a routine checks for new errors, regressions and breaking changes, reads the failing requests and the deploy timeline, and posts the root cause. *(replaces "Routines that investigate while you sleep")*
- **Start from a template.** Triage new errors, check every deploy, run a weekly reliability review. Pick one, adjust the instructions, save. *(use the real template names from the product)*
- **A pull request, not a summary.** It opens a PR with the fix and posts the request that proves it in Slack. You review it, your CI runs, nothing merges on its own.
- **Ask it in Slack.** "Why is checkout slower than yesterday?" Answered from logs, traces, metrics, payloads and deploys, with charts and links to the requests.
- **Risky changes caught before they merge.** PRs checked against live production traffic: the migration that locks a hot table, the handler that drops a field a partner still sends.
- **No second tool to wire up.** An AI layer on top of another vendor's data only sees what that vendor kept. This one reads monoscope's own unsampled store.

**Link:** AI routines, Slack and CLI

**Coding agents block**

- **H3:** Your coding agent reads production too *(was "Works with your coding agents")*
- **Lead:** Claude Code, Cursor or your own agents ask what broke and get the stored request and response back, not a guess from the code.
- **Cards** (keep commands):
  - *The monoscope CLI*: One binary. Your terminal, your CI and your agents query the same production data, with stable JSON output.
  - *Claude Code skills*: Open-source skills that teach your agent to investigate incidents, triage on-call, manage monitors and add instrumentation.
  - *A hosted MCP server*: About 50 tools for Claude Desktop, Cursor or your own agents. Same API key, nothing to install.

### 3.6b Leaving Datadog (new band, after Fix)

**Eyebrow:** Pricing

**H2:** Pay per event, not per host *(keep)*

**Lead:** $29 a month includes 20M events, then $1 per million. A request, a log line and a span cost the same, and request bodies don't count extra. No host fees, no seat fees.

**Estimator:** keep it as is, with the assumptions in the footnote. No multiplier headline: Better Stack says 30x and Axiom says 111x, and our honest 8x loses that contest. Let visitors move the sliders and find their own number.

**Migration help** (beside or under the estimator):

- **H3:** We'll help you move off Datadog
- **Body:** An engineer from our team helps you point your OpenTelemetry exporters at monoscope, rebuilds your key dashboards and monitors, and runs both side by side until you're sure. No charge.
- **Button:** Book a migration call

**Line under it:** Free forever · 10k events a day, no credit card · Self-host for free ↗ · Your own S3 bucket +$199/month

### 3.7 04 · Get Started

**H2:** Point OpenTelemetry at it, or ask your agent *(was "Get your data in, or let your agent do it")*

**Lead:** Any OpenTelemetry SDK or collector works, across 780+ integrations. Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir also capture request and response bodies, with redaction.

**Onboarding cards:** keep both. "With your coding agent" body is already good.

**Switch CTA panel**

- **H3:** See it on your own traffic *(keep)*
- **Body:** Free up to 10,000 events a day, no credit card. Or open the playground and click through a live project without signing up.
- **Buttons:** Start for free · Launch playground · Book a call
- **Steps:** keep the three ("Send your telemetry", "Run it side by side", "Move your services").

### 3.8 Results

**H2:** What changed for teams on monoscope *(was "Real results for real companies")*

**Link:** All reviews on Trustpilot

Stats and quotes: keep. Customer quotes stay verbatim even where they break our voice rules.

### 3.9 FAQ (new)

**H2:** Questions teams ask before leaving Datadog

1. **Do you really store request and response bodies?** Yes, for incoming requests and the outgoing calls your app makes. The SDK redacts the headers and fields you list, such as `$.password`, before anything leaves your app.
2. **Is anything sampled?** No. Every request, log and span you send is kept for your retention period: 30 days on Cloud, unlimited on your own S3 bucket.
3. **Do I have to replace Datadog or Sentry first?** No. Run monoscope next to them for a week or two and compare what each one catches.
4. **Does the AI change production on its own?** No. Fixes arrive as pull requests that go through your review and your CI.
5. **Where is my data stored?** On monoscope Cloud in the US or the EU, in your own S3 bucket, or on your own servers with the open-source edition.
6. **Are you SOC 2 certified?** Not yet. We sign DPAs, host in the EU, redact in the SDK before data leaves your app, and the code that handles your data is open source. If you need it on your infrastructure, self-host or use your own bucket.
7. **Can you help us move off Datadog?** Yes. An engineer helps you switch exporters, rebuild key dashboards and monitors, and run both side by side. No charge.
8. **What counts as an event?** One request (with its bodies), one log line or one span. Metric datapoints and session replays are metered separately and included up to the plan limits.

### 3.10 Final CTA (new)

**H2:** Know what happened.

**Line:** Next time a customer says their payment failed, have the request in front of you before you reply.

**Buttons:** Start for free · Launch playground

### 3.11 Meta

- **Title:** Observability with an AI SRE built in *(keep)*
- **Title:** AI SRE and open-source observability *(alternative; current: "Observability with an AI SRE built in")*
- **Description:** An AI SRE that reads the exact request and response behind every error, not a sampled trace. It investigates, checks deploys and opens the fix. Open source, US or EU hosting, free up to 10k events a day.

## 4. Anti-Slop Pass

| Cut | Why |
|---|---|
| "Observability data lake and an AI SRE agent, to catch issues and continuously improve production" | Swap test fails (Axiom, Better Stack, Polylane); "continuously improve" is a vague outcome |
| "Never sampled. The record, not a summary of it." as the Prove h2 | Axiom and Better Stack say "no sampling" too; moved to the lead |
| "Routines that investigate while you sleep" | Polylane's "wake up to a fix" |
| "Real results for real companies" | Could be on any site |
| "Learn more" ×8 | Link text that says nothing; the card is already the link |
| "780+ OpenTelemetry integrations" in the proof strip | Table stakes; kept in Start, where it answers "will it work with my stack?" |
| Neorent quote ("insights into our API load") | "Insights" on its own is on the avoid list, and the quote doesn't back a claim |
| "monoscope plugs straight in" | Vague; replaced with what the agent gets back |
| "Get your data in, or let your agent do it" | Fine but generic; now names OpenTelemetry |

Checked against the avoid list: no seamless, unified, comprehensive, robust, leverage, empower, transform, simply, just, autonomous or bare "AI-powered". Every AI line uses a verb: reads, investigates, posts, opens, answers, checks.

## 5. Check Before Shipping

Confirmed 2026-10-11: request bodies don't add to the price; deploy-triggered routines exist; routine templates exist; the EU region is standard; no SOC 2 or ISO yet.

Still open:

- **Template names.** Replace the three example template names in Fix with the real ones.
- **Migration help scope.** Confirm the team will rebuild dashboards and monitors, not only advise.
- **Mid-size proof.** The fix-PR count and larger logos, once they can be named.
- **Court case.** Keep it anonymous unless the customer agrees to be named.
