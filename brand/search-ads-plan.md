# Search Ads Plan: Segment Pages, Ad Landing Pages, Ads Kit

Internal (`brand/**` is excluded from the build). Started 2026-10-29 by session `apitoolkit-landing-c2`.

## Where This Fits

- The site rebuild is done and on `master` (`brand/site-rebuild-plan.md`, `brand/site-plan.md`): 7 product pages under `/features/*`, pricing, 8 compare pages, changelog, docs, product screenshots (`assets/img/product/*`, manifest), painted art strips.
- The PPC playbook (Claude Doc "Monoscope PPC GTM Playbook", 2026-10-26) set the ad strategy: conquest + cost-pain + data-ownership campaigns, ~$3k/month to start, EU + US.
- **This plan adds what search traffic needs and the site lacks:** a page for every ad group, written to the keyword (message match), on the existing template and visual system, plus a ready-to-import ads kit.

## Research (SpyFu, US Google, Oct 2026 roll-up, pulled 2026-10-29)

### The AI SRE category has no search demand yet

| Domain | Est. Google Ads budget/mo | Paid keywords | Organic keywords |
|---|---|---|---|
| antimetal.com | $157 | 22 | 103 |
| polylane.com | $0 (never advertised) | 0 | 0 |
| superlog.sh | $0 | 1 | 15 |
| highlight.io | $0 | 59 | 216 |
| signoz.io | $4.50 | 7 | 9,634 |
| sentry.io | $250,900 | 17,273 | 46,426 |
| betterstack.com | $148,500 | 7,209 | 30,570 |
| dash0.com | $127,000 | 6,956 | 7,066 |
| logrocket.com | $115,100 | 5,685 | 76,168 |

"ai sre" has 34 advertisers but no measurable volume; "ai root cause analysis" ~70/mo. **Conclusion: buy the categories people already search for (error tracking, log management, APM, OpenTelemetry, API monitoring, session replay, competitor alternatives) and sell the AI SRE on every one of those pages.** The AI SRE is the differentiator, not the keyword.

### Keyword demand by segment

Volume = SpyFu monthly US searches (Google-provided where shown); CPC = broad-match estimate ("$0.00" = SpyFu has no price, usually low competition); Adv = advertisers seen.

| Segment | Keyword | Vol/mo | CPC | Adv |
|---|---|---|---|---|
| OpenTelemetry | opentelemetry | 2,800 | – | 57 |
| | opentelemetry collector | 400 | – | 22 |
| | opentelemetry backend | low | – | 14 |
| Error tracking | error tracking | 2,400 | $7.37 | 17 |
| | error monitoring | 135 | $4.82 | 16 |
| | sentry alternative | 80–90 | – | 36 |
| | sentry self hosted | 70–90 | – | 1 |
| Logs | log analysis | 1,000 | $15.56 | 66 |
| | log management | 870 | $9.56 | 58 |
| | log monitoring | 480 | $14.40 | 53 |
| | centralized logging | 480 | $11.60 | 29 |
| | log management tools | 170 | $37.96 | 36 |
| APM | application monitoring | 1,000 | $9.93 | 73 |
| | application performance monitoring | 870 | $30.37 | 67 |
| | apm tools | 870 | – | 38 |
| Tracing | distributed tracing | 600–1,700 | – | 28 |
| Uptime | uptime monitoring | 720 | $16.80 | 57 |
| | synthetic monitoring | 480 | – | 43 |
| API | api monitoring | 270 | $14.68 | 69 |
| | api monitoring tools | 180 | – | 47 |
| | api observability / third-party api monitoring / webhook monitoring | low | – | 6–25 |
| Session replay / RUM | real user monitoring | 260 | $27.74 | 66 |
| | session replay | 170 | $19.13 | 35 |
| | logrocket alternative / fullstory alternative | 44 each | – | 18 / 23 |
| AIOps / AI SRE | aiops | 1,900 | $13.20 | 127 |
| | ai root cause analysis | 70 | – | 32 |
| | incident management | high | – | 96 |
| Infra | kubernetes monitoring | 600 | – | 50 |
| | infrastructure monitoring | 210 | $19.49 | 55 |
| Conquest | datadog competitors | 720 | – | 37 |
| | splunk alternative | 480–600 | $18.59 | 33 |
| | datadog alternatives | 320 | – | 43 |
| | new relic alternatives | 180–260 | – | 24 |
| | grafana alternative | 110 | – | 18 |
| | elk alternative | 44 | – | 10 |
| Languages | nodejs monitoring / python monitoring | 170 / 70 | – | 10 / 6 |

### How competitors structure pages for this traffic

- **Sentry:** `/product/<feature>/` per capability, `/solutions/<category>/` for search categories (opentelemetry, application-performance-monitoring, real-user-monitoring-rum, ai-observability), `/for/<segment>/`.
- **Dash0:** a `/<competitor>-alternative` page for 14 competitors (datadog, newrelic, grafana, splunk, elastic, sentry, honeycomb, signoz, better-stack, coralogix, dynatrace, chronosphere, instana, solarwinds); ad headline "#1 Datadog Alternative – Clear Costs, No Surprises".
- **Better Stack:** one page per category (`/log-management`, `/error-tracking`, `/tracing`, `/uptime`, `/real-user-monitoring`, `/ai-sre`); ads lead with "Say Goodbye to Splunk".
- **Polylane / Antimetal:** no paid search; Polylane builds `/for/<platform>` and `/integrations/<tool>` pages for organic and agent-ecosystem discovery.

### Claims check (from the sessions that audited the product, 2026-10-29)

- "Unsampled" holds only on paid plans; the free tier samples past 10k events/day.
- No fix-PR creation or deploy-triggered routines were found in the product code: no "opens the fix" claims in pages or ads until confirmed.
- Own bucket (BYOB S3) currently applies to session replays only. The playbook's "your telemetry stays in your own S3 bucket" headline is **not true for logs and traces today**; the data-ownership campaign is blocked until the user confirms the roadmap.
- Existing product pages list other unverified claims in `# UNVERIFIED:` frontmatter comments (SQL endpoint, "780+ integrations"); keep them out of ads.
- Install command: `curl -fsSL https://monoscopehq.com/install.sh | sh`. Screenshot script: `scripts/capture-product-shots.mjs`.

## Page Plan

Every page uses the existing `features-single.liquid` template (frontmatter only, schema in `brand/site-plan.md`) or the compare template, the existing screenshots/demos, and the voice in `brand/voice.md`. H1 and first line restate the keyword (message match); the second beat is monoscope's onlyness (the AI SRE reads the full request and response); one CTA ("Start for free"), secondary "Launch playground".

### P1 · Category pages (new, `/features/` template; workstream A)

| Path | Primary keywords | Story angle | Hero |
|---|---|---|---|
| `/features/log-management/` | log management, log analysis, log monitoring, centralized logging | Every log line linked to its request and trace; ask in plain English; $1 per million events, logs in your bucket | `log-explorer` shot or prove-b demo |
| `/features/opentelemetry/` | opentelemetry, opentelemetry backend, opentelemetry collector | OTel-native backend: point any collector at monoscope; logs, traces, metrics in one store; no proprietary agent | explorer + collector config code block |
| `/features/apm/` | application performance monitoring, apm tools, application monitoring | Latency, throughput, errors per endpoint, with the slow request's full trace; AI finds and fixes slow endpoints (routine) | dashboards-b demo |
| `/features/distributed-tracing/` | distributed tracing | Trace waterfall from the log row; expand a request inline; every span kept, unsampled | `trace` shot |
| `/features/uptime-monitoring/` | uptime monitoring, synthetic monitoring | Uptime checks that keep the failing response; AI SRE investigates when a check fails. **Verify scope in the demo project before writing.** | `monitors` shot |
| `/features/real-user-monitoring/` | real user monitoring, session replay | Replay linked to the backend request behind each click | replay-b demo |

Existing pages to tune for their keywords (titles, H1, FAQ, meta): `error-tracking` (error tracking 2,400/mo), `api-monitoring`, `ai-sre` (add "AI root cause analysis" and AIOps language in body/FAQ, not H1).

### P2 · Competitor alternatives (compare template; workstream B)

Existing: datadog, sentry, newrelic, bugsnag, honeybadger, axiom, treblle, baselime. Add, in this order: **splunk** (highest-value conquest term), **grafana**, **elastic/ELK**, **logrocket** (replay), **fullstory** (replay), **dynatrace**, **better-stack**, **signoz**. Each answers: what you pay there vs here at 3 volumes, what you can't see there (request/response bodies, outgoing calls), migration in 3 steps (OTel collector), honest "when to stay". Same facts-not-mockery rules as the existing compare pages. Path pattern stays `/compare/<name>/`; add `/<name>-alternative` → `/compare/<name>/` 301s in `_redirects` so ad URLs read like the search.

### P3 · Ads kit (workstream C)

`brand/ads/` (excluded from build):
- `campaigns.md`: campaign → ad group → keywords (phrase/exact), final URL, negatives, budget split. Groups follow P1/P2 pages plus the playbook's cost-pain and brand groups.
- `rsa.csv`: Google Ads Editor import, 15 headlines (≤30 chars) + 4 descriptions (≤90) per ad group, pinned headline 1 = keyword echo; sitelinks and callouts.
- `tracking.md`: UTM convention, conversions (signup primary, first event ingested secondary, demo booked), where the site needs the gtag/consent change (shared `head.liquid` — lead applies).

### P4 · Screenshots and demos (workstream D)

Check every shot in `assets/img/product/manifest.md` against `https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/` and recapture stale ones with the existing `scripts/shots.mjs` / `scripts/demo-snapshot.mjs`. Add what P1 needs: collector/OTel onboarding view, log explorer with Ask AI query, uptime check detail, APM endpoint view. Report missing product states instead of faking them.

### P5 · Art (lead, Midjourney in the user's Chrome)

One `page-<slug>.webp` strip per new P1 page in the existing coastal/observatory style. Pages reference an existing strip until delivered.

### P6 · Lead integration

Nav "Product" menu and footer: add the P1 pages (Solutions group) and a "Compare" column; `_redirects`; sitemap; internal links from homepage chapters and docs; `make css-prod`, `quickstatic build`, light/dark at 390/800/1440, then commit and push.

## Agents

| Agent | Scope (edit only these) | Output |
|---|---|---|
| A · category pages | `features/{log-management,opentelemetry,apm,distributed-tracing,uptime-monitoring,real-user-monitoring}/`, keyword tuning of `features/{error-tracking,api-monitoring,ai-sre}/index.md` | frontmatter pages, built clean |
| B · alternatives | `compare/{splunk,grafana,elastic,logrocket,fullstory,dynatrace,better-stack,signoz}/`, `compare/index.md` | compare pages |
| C · ads kit | `brand/ads/**` | campaigns, RSA CSV, tracking spec |
| D · screenshots | `assets/img/product/**`, `scripts/shots.mjs` | refreshed + new shots, manifest |
| Lead | nav, footer, `_redirects`, `head.liquid`, art, CSS rebuild, QA, commit/push | integration |

Rules: one git worktree per agent; no `tailwind.min.css` commits; build check with `make css-prod` + `quickstatic build` (zero errors) in the worktree; plain commit messages, no AI attribution; never invent customer numbers, certifications or features; report unverifiable claims.

## Status

| Item | State |
|---|---|
| SpyFu research | done (above) |
| A category pages | started |
| B alternatives | started |
| C ads kit | started |
| D screenshots | started |
| P5 art | lead |
| P6 integration | lead, after A–D |
