# Google Search Campaigns

Internal (`brand/**` is excluded from the build). Workstream C of `brand/search-ads-plan.md`. Strategy from the PPC playbook (2026-10-26); demand and CPCs from the SpyFu tables in the plan.

**Files.** `build.py` is the single source: it holds every ad group, keyword, negative and line of ad copy, writes the CSVs and the generated section of this file, and checks the copy. Edit `build.py`, then run `python3 brand/ads/build.py`. Never hand-edit the CSVs.

| File | What | Import |
|---|---|---|
| `rsa.csv` | Responsive search ads, launchable campaigns (C1, C2, C4, C5) | Editor: Account > Import > From file |
| `keywords.csv` | Keywords, phrase and exact | same |
| `negatives.csv` | Campaign and ad group negatives | same |
| `draft/*.csv` | C3 Ownership, blocked (below) | not until cleared |
| `extensions.md` | Sitelinks, callouts, snippets, prices | create by hand in Editor |
| `tracking.md` | UTMs, conversions, consent, `head.liquid` change | lead |

Import with every campaign **paused**, review in Editor, post, then enable per the launch order.

## Stop: Claims Ads Must Not Make

The playbook's positioning line, "your telemetry stays in your own S3 bucket", is **not usable**. The own bucket currently applies to session replays only (coordinator, 2026-10-29; `features/byob-s3/index.md` UNVERIFIED notes). Ads, sitelinks and callouts in this kit also avoid:

| Claim | Status | Where it would have gone | Kit handling |
|---|---|---|---|
| Own S3 bucket holds all telemetry (logs, traces, requests) | unconfirmed | C3 `s3-bucket`, price assets | C3 blocked; `s3-bucket` copy is a draft in `draft/rsa.csv` |
| AI opens a fix PR | not in product code | AI SRE lines everywhere | AI verbs limited to investigates, answers in Slack, routines check production |
| Deploy-triggered routines | not in product code | AI SRE lines | not used |
| "780+ integrations" | unsourced | OTel groups, callouts | not used |
| Customer SQL endpoint | unconfirmed | BYOB | not used |
| Unsampled / every event kept | paid plans only | everywhere | only in descriptions that say "on paid plans" / "Paid plans keep every event"; `build.py` fails any other use |
| Supplier (outgoing) breaking-change detection | not traced end to end | `api-monitoring` | copy says "Breaking Changes Flagged" and "Third-Party API Calls Kept", not supplier change detection |
| Replay links straight to the request | goes via the trace | `session-replay`, `real-user-monitoring` | copy says "backend trace" |
| Framework count (17+ vs 20+) | inconsistent on site | OTel group | named languages instead of a count |
| Hands-on migration help | in the brief, not in `site-plan.md` facts | conquest | not used; add "Migration Help Included" callout if the user confirms the offer |
| GDPR compliance | no certification or DPA claim checked | `eu-hosting` | copy says "EU region", never "GDPR compliant" |

Usable facts (from `brand/site-plan.md` and `pricing/index.md`): free up to 10k events a day; Cloud $29/month for 20M events, then $1 per million; request bodies don't add to price; replays $1 per 1,000; no host or seat fees; unlimited team members; no credit card on Free; US or EU region; AGPL-3.0 Community Edition, free to self-host; Enterprise self-hosted from $500/month with SSO and SLA.

## Campaigns and Budget

Total **$3,000/month** (≈ $99/day). Google Search only: untick Display Network and Search Partners. Language English. Location option "Presence: people in or regularly in your targeted locations".

| Campaign | Playbook share | Monthly | Status |
|---|---|---|---|
| C1 Conquest (competitor alternatives) | 40% | $1,200 | launch, wave 1 |
| C2 Cost (pricing pain) | 25% | $750 | launch, wave 1 |
| C3 Ownership (OTel backend, self-hosted, EU, own bucket) | 20% | $600 | **blocked** |
| C4 Brand | 5% | $150 | launch, wave 0 |
| Reserve | 10% | $300 | held |
| C5 Category (P1 pages, existing feature pages) | not in playbook | see below | launch, wave 1 |

The playbook has no slot for the category groups, and SpyFu says that is where the volume is (error tracking 2,400/mo, opentelemetry 2,800, log analysis 1,000, application monitoring 1,000). Until C3 clears, **C5 takes C3's $600**. Proposed steady state once P1 pages and C3 are live (lead decision):

| C1 | C2 | C3 | C4 | C5 | Reserve |
|---|---|---|---|---|---|
| 35% $1,050 | 20% $600 | 15% $450 | 5% $150 | 25% $750 | 0 |

### Geo Split

Each campaign exists twice: `| US` (United States) and `| EU` (EEA + UK + Switzerland, English). Separate campaigns keep budgets, schedules and CPA visible per region.

| Campaign | US | EU | Wave 1 daily (US / EU) |
|---|---|---|---|
| C1 Conquest | 60% | 40% | $23.70 / $15.80 |
| C2 Cost | 60% | 40% | $14.80 / $9.90 |
| C3 Ownership | 40% | 60% | blocked; `eu-hosting` is EU only |
| C4 Brand | 50% | 50% | $2.50 / $2.50 |
| C5 Category | 60% | 40% | $11.80 / $7.90 |

### Bidding

- **Manual CPC** with the per-ad-group caps in the table below. Cap = 0.7 × SpyFu broad CPC where SpyFu has a price, capped at $15; $8 for conquest groups without data ($6 for low-volume error-tracking competitors), $2 for brand. SpyFu CPCs are US broad-match estimates; EU usually runs lower, so start EU at the same caps and cut where impression share is above 80%.
- Switch a campaign to **Maximize conversions with a target CPA** when it reaches 30 signups in 30 days; set the first target at the observed CPA.
- Device: mobile bid −40% (signup needs a laptop to install the SDK). Ad rotation: Optimize.

### Schedule

- US: Monday–Friday, 08:00–20:00 US Eastern. EU: Monday–Friday, 08:00–19:00 CET. Google applies schedules in the account time zone, so convert (account in CET: US = 14:00–02:00) and recheck at each DST change.
- Brand: all hours, every day.
- After 4 weeks, open weekends for any campaign whose weekday CTR and click-to-signup rate are above the kill thresholds.

### Kill Criteria (per ad group, from the playbook)

- CTR < 2% after 1,000 impressions: rewrite the RSA once, then pause.
- Landing page → signup < 3% after 300 clicks: fix the page or pause.
- Cost per activated account (first data ingested) > $400: pause.

## Launch Order

| Wave | When | Ad groups |
|---|---|---|
| 0 | before any non-brand spend | Tracking from `tracking.md` live and tested (signup conversion recorded in Tag Assistant, consent defaults present). C4 `brand`. |
| 1 | day 1 (pages exist today) | C1 `datadog`, `newrelic`, `sentry`. C2 `datadog-pricing`, `newrelic-pricing`, `log-pricing`. C5 `error-tracking`, `api-monitoring`, `session-replay`, `ai-rca`. |
| 2 | each as its page lands (plan order) | C1 `splunk` with C2 `splunk-pricing`, then `grafana`, `elastic`. C5 `log-management`, `opentelemetry`, `apm`, `distributed-tracing`, `real-user-monitoring`, `uptime-monitoring` (after workstream A verifies uptime scope). |
| 3 | after 4 weeks of wave 1 data | C1 `logrocket`, `fullstory`, `dynatrace`, `better-stack`, `signoz`, `bugsnag`, `honeybadger`, `axiom`. At about $40/day, 14 conquest groups would starve each other; add these as wave 1 groups pause or prove out. |
| C3 | after the user clears it | `otel-backend` (needs `/features/opentelemetry/`), `self-hosted`, `eu-hosting`: none of these three depends on the bucket claim and could launch with wave 2 if the lead agrees. `s3-bucket`: only after the user confirms the bucket holds all telemetry. |

Pages marked **building** below must exist before their group goes live. The fallback column is an option for the lead (good message match only for `distributed-tracing` → logs-and-traces and `real-user-monitoring` → session-replay); the others should wait.

Not included, on purpose: Treblle and Baselime compare pages exist but have no measured search volume. AIOps (1,900/mo, 127 advertisers) draws IT-ops buyers, so it is left out. "sentry self hosted" (70–90/mo) is people running Sentry, so it is a negative. "synthetic monitoring" implies scripted browser checks; monoscope's uptime checks are HTTP checks, so it is left out until the uptime page says otherwise. Session replay and RUM are split into two groups so "session replay" lands on the existing page today.

## Trademarks in Ad Text

Competitor names are allowed as **keywords**. In **ad text** Google limits or disapproves them where the owner has filed a trademark complaint, and several of these competitors may have done so. So every C1 group and the branded C2 groups carry two RSAs:

- **A**: pinned headline 1 is the keyword echo with the name ("Datadog Alternative", "Datadog Pricing Compared"), plus one or two other named lines; display path `compare/<name>`.
- **B**: no competitor name anywhere; pinned headline 1 is a category echo ("Priced per Event, Not per Host", "Error Tracking With Requests"); display path `compare/observability` or `pricing/per-event`.

If A shows "Limited" or "Disapproved (Trademarks)", leave it paused and let B serve. Never put competitor names in display paths of B, sitelinks, callouts or snippets. Never use keyword insertion (`{KeyWord:}`) in conquest groups: it would write the trademark into the headline. Claims about a competitor (Datadog per-host list prices, New Relic per-GB/per-user pricing) appear only where the compare page cites the source.

Other editorial notes: Title Case headlines, sentence case descriptions, no exclamation marks, no all-caps words except acronyms (checked). The lowercase brand "monoscope" at the start of a headline can trip the capitalization review; if it does, request an exception for the stylized trademark or use "Monoscope" in that headline only.

## Ad Groups, Keywords, Negatives

Generated by `build.py`. Every keyword is imported as phrase and exact unless shown as `[exact only]`. "Page" is the final URL's state today: **live** (exists), **building** (P1/P2 workstreams), **blocked** (claim unconfirmed). "(A+B)" marks groups with the trademark-free second RSA.

Cross-campaign negatives keep each search in one place: C1 negates pricing words so C2 owns them; C2 negates "alternative(s)"/"competitors" so C1 owns them; C3 and C5 negate every competitor name so C1 owns them; all non-brand campaigns negate "monoscope" and "apitoolkit". Within C5, `opentelemetry` negates "backend/storage/hosted/platform" so C3 `otel-backend` owns them. While C3 is blocked, those four C5 negatives can be removed so the searches still reach `/features/opentelemetry/`. Phrase and exact only, no broad: at $99/day broad match spends on loosely related searches before it has conversion data to learn from.

<!-- BEGIN GENERATED -->

### C1 Conquest

| Ad group | Final URL | Page | Fallback until built | Geo | Max CPC | Keywords (phrase + exact; `[x]` exact only) | Group negatives |
|---|---|---|---|---|---|---|---|
| `datadog` (A+B) | `/compare/datadog/` | live | – | US+EU | $10 | datadog alternative, datadog alternatives, alternatives to datadog, datadog competitors, datadog replacement, open source datadog alternative, cheaper datadog alternative | datadog api, datadog docs, datadog status |
| `newrelic` (A+B) | `/compare/newrelic/` | live | – | US+EU | $8 | new relic alternative, new relic alternatives, alternatives to new relic, new relic competitors, newrelic alternative, new relic replacement | – |
| `sentry` (A+B) | `/compare/sentry/` | live | – | US+EU | $6 | sentry alternative, sentry alternatives, alternatives to sentry, sentry competitors, sentry.io alternative, open source sentry alternative | sentry mode, sentry safe, sentry gun, sentry self hosted |
| `splunk` (A+B) | `/compare/splunk/` | building | – | US+EU | $13 | splunk alternative, splunk alternatives, alternatives to splunk, splunk competitors, splunk replacement, open source splunk alternative, splunk observability alternative | siem, soar, enterprise security, splunk phantom, cyber |
| `grafana` (A+B) | `/compare/grafana/` | building | – | US+EU | $8 | grafana alternative, grafana alternatives, alternatives to grafana, grafana competitors, grafana cloud alternative | grafana tutorial, grafana plugin, grafana docker |
| `elastic` (A+B) | `/compare/elastic/` | building | – | US+EU | $8 | elk alternative, elk stack alternative, alternatives to elk stack, kibana alternative, elastic observability alternative, elasticsearch logging alternative | elastic band, elk hunting, elk lodge, vector search, full text search |
| `logrocket` (A+B) | `/compare/logrocket/` | building | – | US+EU | $8 | logrocket alternative, logrocket alternatives, alternatives to logrocket, logrocket competitors | heatmap, heatmaps, marketing, ux research |
| `fullstory` (A+B) | `/compare/fullstory/` | building | – | US+EU | $8 | fullstory alternative, fullstory alternatives, alternatives to fullstory, fullstory competitors | heatmap, heatmaps, marketing, ux research, product analytics |
| `dynatrace` (A+B) | `/compare/dynatrace/` | building | – | US+EU | $8 | dynatrace alternative, dynatrace alternatives, alternatives to dynatrace, dynatrace competitors | dynatrace university, dynatrace managed |
| `better-stack` (A+B) | `/compare/better-stack/` | building | – | US+EU | $8 | better stack alternative, betterstack alternative, better stack alternatives, better stack competitors, better uptime alternative, logtail alternative | status page |
| `signoz` (A+B) | `/compare/signoz/` | building | – | US+EU | $6 | signoz alternative, signoz alternatives, signoz competitors, alternatives to signoz | – |
| `bugsnag` (A+B) | `/compare/bugsnag/` | live | – | US+EU | $6 | bugsnag alternative, bugsnag alternatives, bugsnag competitors, alternatives to bugsnag | – |
| `honeybadger` (A+B) | `/compare/honeybadger/` | live | – | US+EU | $6 | honeybadger alternative, honeybadger alternatives, honeybadger competitors, honeybadger.io alternative | – |
| `axiom` (A+B) | `/compare/axiom/` | live | – | US+EU | $6 | axiom.co alternative, axiom logging alternative, axiom observability alternative, axiom logs alternative | axiom space, axiom verge, axiom bank, axiom telecom |

### C2 Cost

| Ad group | Final URL | Page | Fallback until built | Geo | Max CPC | Keywords (phrase + exact; `[x]` exact only) | Group negatives |
|---|---|---|---|---|---|---|---|
| `datadog-pricing` (A+B) | `/compare/datadog/` | live | – | US+EU | $8 | datadog pricing, datadog cost, datadog costs, reduce datadog costs, datadog bill, datadog too expensive, datadog apm pricing, datadog log pricing, datadog pricing per host | – |
| `splunk-pricing` (A+B) | `/compare/splunk/` | building | /pricing/ | US+EU | $8 | splunk pricing, splunk cost, splunk license cost, reduce splunk costs, splunk ingest pricing | siem, enterprise security |
| `newrelic-pricing` (A+B) | `/compare/newrelic/` | live | – | US+EU | $8 | new relic pricing, new relic cost, new relic per user pricing, reduce new relic costs | – |
| `log-pricing` | `/pricing/` | live | – | US+EU | $9 | log management pricing, log management cost, logging costs, reduce logging costs, observability pricing, observability costs, apm pricing, monitoring costs | – |

### C3 Ownership (BLOCKED, draft/)

| Ad group | Final URL | Page | Fallback until built | Geo | Max CPC | Keywords (phrase + exact; `[x]` exact only) | Group negatives |
|---|---|---|---|---|---|---|---|
| `otel-backend` | `/features/opentelemetry/` | building | /docs/sdks/ | US+EU | $6 | opentelemetry backend, otel backend, opentelemetry storage, hosted opentelemetry, opentelemetry platform, opentelemetry observability platform, managed opentelemetry | – |
| `self-hosted` | `/pricing/` | live | – | US+EU | $6 | self hosted observability, open source observability platform, self hosted apm, open source apm, self hosted log management, open source log management, self hosted error tracking | – |
| `eu-hosting` | `/pricing/` | live | – | EU | $6 | gdpr log management, eu log management, eu hosted observability, european observability platform, gdpr observability, eu hosted logging, eu data residency observability | – |
| `s3-bucket` | `/features/byob-s3/` | blocked | – | US+EU | $6 | logs to s3, store logs in s3, s3 log storage, observability s3 storage, bring your own bucket observability, telemetry in s3 | – |

### C4 Brand

| Ad group | Final URL | Page | Fallback until built | Geo | Max CPC | Keywords (phrase + exact; `[x]` exact only) | Group negatives |
|---|---|---|---|---|---|---|---|
| `brand` | `/` | live | – | US+EU | $2 | monoscope, monoscope tech, monoscope observability, monoscope ai, monoscope pricing, apitoolkit, api toolkit monitoring, apitoolkit io | test card, test pattern, tv, television, tube, camera, microscope, telescope, wallpaper, monoscope pattern |

### C5 Category

| Ad group | Final URL | Page | Fallback until built | Geo | Max CPC | Keywords (phrase + exact; `[x]` exact only) | Group negatives |
|---|---|---|---|---|---|---|---|
| `log-management` | `/features/log-management/` | building | /features/logs-and-traces/ | US+EU | $9 | log management, log analysis, log monitoring, centralized logging, log management software, log management platform, log aggregation, log analysis tool, [log management tools] | – |
| `opentelemetry` | `/features/opentelemetry/` | building | /docs/sdks/ | US+EU | $6 | opentelemetry, open telemetry, opentelemetry collector, opentelemetry tracing, opentelemetry logs, opentelemetry monitoring, [otel observability] | demo, specification, semantic conventions, operator, helm, what is, backend, storage, hosted, platform |
| `apm` | `/features/apm/` | building | /features/dashboards/ | US+EU | $15 | application performance monitoring, apm tools, application monitoring, apm software, application performance monitoring tools, apm platform, application monitoring tools | apm terminals, apm monaco, apm music, apm qualification, project management, apm planner, ardupilot, apm exam |
| `distributed-tracing` | `/features/distributed-tracing/` | building | /features/logs-and-traces/ | US+EU | $8 | distributed tracing, distributed tracing tools, distributed tracing platform, microservices tracing, request tracing, trace monitoring | what is |
| `error-tracking` | `/features/error-tracking/` | live | – | US+EU | $5 | error tracking, error monitoring, error tracking software, error tracking tool, exception tracking, exception monitoring, application error monitoring | – |
| `api-monitoring` | `/features/api-monitoring/` | live | – | US+EU | $10 | api monitoring, api monitoring tools, api observability, third party api monitoring, webhook monitoring, api performance monitoring, rest api monitoring, api logging | postman, api gateway |
| `real-user-monitoring` | `/features/real-user-monitoring/` | building | /features/session-replay/ | US+EU | $15 | real user monitoring, rum monitoring, real user monitoring tools, frontend monitoring, web vitals monitoring | – |
| `session-replay` | `/features/session-replay/` | live | – | US+EU | $13 | session replay, session replay tool, session recording, session replay software, user session replay | heatmap, heatmaps, shopify, wordpress, marketing, hotjar |
| `uptime-monitoring` | `/features/uptime-monitoring/` | building | /features/dashboards/ | US+EU | $12 | uptime monitoring, website uptime monitoring, uptime monitor, api uptime monitoring, endpoint monitoring, cron monitoring, cron job monitoring | kuma, uptimerobot, uptime robot, uptime command, linux, windows, minecraft |
| `ai-rca` | `/features/ai-sre/` | live | – | US+EU | $6 | ai root cause analysis, ai sre, ai sre agent, ai incident investigation, ai on call, root cause analysis tool, ai for incident response | six sigma, template, fishbone |

**Shared negatives (every campaign, phrase):** jobs, careers, career, salary, salaries, hiring, internship, resume, stock, share price, ipo, login, log in, sign in, signin, certification, certified, interview, interview questions, tutorial, course, courses, training, udemy, download, free download, datadog agent, pdf, ppt, youtube

- **C1 Conquest campaign negatives:** pricing, price, cost, costs, monoscope, apitoolkit
- **C2 Cost campaign negatives:** alternative, alternatives, competitors, monoscope, apitoolkit
- **C3 Ownership campaign negatives:** datadog, new relic, newrelic, sentry, splunk, grafana, elastic, elk, kibana, logrocket, fullstory, dynatrace, better stack, betterstack, signoz, bugsnag, honeybadger, axiom, honeycomb, sumo logic, logz, papertrail, loggly, uptimerobot, pingdom, hotjar, posthog, appdynamics, instana, coralogix, dash0, monoscope, apitoolkit
- **C5 Category campaign negatives:** datadog, new relic, newrelic, sentry, splunk, grafana, elastic, elk, kibana, logrocket, fullstory, dynatrace, better stack, betterstack, signoz, bugsnag, honeybadger, axiom, honeycomb, sumo logic, logz, papertrail, loggly, uptimerobot, pingdom, hotjar, posthog, appdynamics, instana, coralogix, dash0, pricing, monoscope, apitoolkit
<!-- END GENERATED -->

## Decisions for the Lead

1. **Category budget.** C5 runs on C3's $600 until C3 clears; adopt the 35/20/15/5/25 steady state?
2. **C3 scope.** Launch `otel-backend`, `self-hosted`, `eu-hosting` (no bucket claim) with wave 2, or hold all of C3 until the user answers the bucket question?
3. **Trademark variant.** Run A and B together (default), or only B for competitors known to enforce?
4. **Fallback URLs.** Launch `distributed-tracing` and `real-user-monitoring` early on their fallback pages, or wait for the P1 pages?
5. **"apitoolkit" as a brand term.** Included in C4; drop if the old name sends support traffic.
6. **Unconfirmed offers.** Migration help and GDPR wording stay out until the user confirms them.
