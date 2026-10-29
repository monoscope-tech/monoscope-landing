# Site Rebuild Plan: Product Pages, Pricing, Changelog, Docs, Screenshots

Internal (brand/** is excluded from the build). Started 2026-10-29. The homepage is done; bring every other page up to the same story, voice and visual system.

## Sources of Truth

- **Story:** `brand-brief.md` (positioning, BrandScript, tagline "Know what happened. Prove it. Fix it.", onlyness: the AI SRE that reads the full, unsampled request and response). Reader: mid-size engineering teams on Datadog (primary), small API-heavy teams (secondary).
- **Voice:** `brand/voice.md`. Concrete nouns, numbers over adjectives, AI as verbs, customer as subject, no exclamation marks, no "simply/just", banned-word list.
- **Facts that must hold everywhere:** free up to 10k events/day; Cloud $29/mo for 20M events then $1/M; metric datapoints $1/10M; replays $1/1k; request bodies don't add to price; own S3 bucket $199/mo minimum (Delta Lake + Parquet, unlimited retention); EU region standard; AGPL self-host; **no SOC 2 / ISO 27001 yet** (never imply it).
- **Visual system:** the homepage (`index.md`): `wrap`/`panel-w` widths, tone classes (`tone-brand|warning|success|violet`), mono eyebrow pill, 48px h2 medium tracking-tight, dark product frame with `<demo-scene>`, numbered chapter rail, bullets grid with sprite icons, painted Midjourney art (anime, Railway-style) faded into panels.
- **Product truth:** live demo project `https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/` (public, no login). Product repo `../monoscope` (git log = changelog source).

## Information Architecture

| Page | Path | Story pillar | Replaces |
|---|---|---|---|
| Product overview | `/features/` | All three | (new) |
| AI SRE | `/features/ai-sre/` | Fix | (new; routines, fix PRs, pre-merge review, Slack, MCP/CLI) |
| Issues & error tracking | `/features/error-tracking/` | Know | rewrite in place |
| API monitoring & breaking changes | `/features/api-monitoring/` | Know + Prove | `api-analytics`, `api-management`, `api-observability` (301) |
| Logs & traces (Explorer) | `/features/logs-and-traces/` | Prove | `api-logs-and-metrics` (301) |
| Metrics & dashboards | `/features/dashboards/` | Know | (new) |
| Session replay (RUM) | `/features/session-replay/` | Prove | (new) |
| Your own bucket | `/features/byob-s3/` | Prove | rewrite in place |
| Pricing | `/pricing/` | — | rebuild |
| Changelog | `/changelog/` | — | redesign + backfill Feb 2025 → Oct 2026 |

Nav "Features" dropdown and footer link to the new set; `_redirects` gets 301s for retired paths.

## Workstreams

### W0 · Shared product-page template (lead, critical path)
- `features-single.liquid` renders a page from frontmatter: hero (eyebrow, h1, pitch, CTAs, demo or screenshot in the dark frame, optional art), `sections` (same schema as homepage chapters: eyebrow/title/lead/demo|shot/bullets/link/code), `faqs`, closing CTA, related products.
- Extract the homepage chapter markup into `components/chapter.liquid` and reuse it on the homepage and product pages, so there is one implementation.
- A `shot` block: theme-aware `<picture>` (light/dark webp) in the same frame as demos.
- Output: one schema doc at the top of the template; product pages become frontmatter only.

### W1 · Screenshot + demo library (agent: screenshots)
- `scripts/shots.mjs`: Playwright against the public demo project, 1440×900 @2x, light and dark, cwebp, into `assets/img/product/<name>-{light,dark}.webp`; list of shots is data at the top of the script (url + clicks), reusing helpers from `demo-snapshot.mjs`.
- Shots needed (minimum): issues list, issue detail (with request), log explorer list, request/response panel, trace waterfall, service map, dashboards, RUM sessions + replay player, monitors/alerts, API catalog/endpoints, API changes (breaking change), AI chat, routines, settings (API keys, integrations, S3, members), onboarding.
- New `<demo-scene>` storyboards per product page where motion earns it (AI SRE, explorer, replay, error tracking), via `demo-snapshot.mjs` with `MONOSCOPE_BASE=https://app.monoscope.tech`.
- Writes `assets/img/product/README.md` mapping shot name → what it shows, so page and docs agents can pick.

### W2 · Product pages (agents: pages-a, pages-b; after W0 lands)
- pages-a: `/features/` overview, AI SRE, error tracking, API monitoring.
- pages-b: logs & traces, dashboards, session replay, BYOB S3.
- Copy from the BrandScript, run through `brand/voice.md` and `avoid-ai-writing`; every claim checked against the product (demo project, `../monoscope`). Each page: one clear next step (Start for free / Launch playground).

### W3 · Pricing (agent: pricing; after W0)
- Rebuild `/pricing/` in the homepage style: plan cards (Free / Cloud / Cloud + your bucket / Self-hosted), the bill estimator (extract the homepage `#bill` block to `components/bill.liquid`, used by both), what counts as an event, honest FAQ (bodies free, EU, no SOC 2 yet, migration help), compare row vs Datadog/Sentry.

### W4 · Changelog (agent: changelog; independent, starts now)
- Redesign `changelog-list.liquid` / `changelog-single.liquid` in the Linear-changelog style: date rail, hero image per entry, tags.
- Backfill monthly entries Feb 2025 → Oct 2026 from `../monoscope` git log (user-facing changes only; skip deps/CI/refactors), plus SDK repos where notable. Voice: Linear changelog. Use W1 shots where an entry has a visible UI change.

### W5 · Docs (agent: docs; content starts now, images after W1)
- Replace all 80 legacy screenshots in `docs/**` and `features/**` with W1 shots; delete orphaned images.
- Rewrite `docs/dashboard/**` platform guides to match the current UI (Issues, Explorer, RUM, dashboards, monitors, AI, routines, settings); add missing pages for shipped features (session replay, AI SRE/routines, service map, wiki if public).
- Voice pass on `docs/features/**`, `docs/onboarding`, `docs/faqs` (fix the self-hosting and framework-count inconsistencies listed in the brief).

### W5b · Compare + About (agent: compare-about)
- 8 compare pages + index: the 2026-10-11 framing ("Everyone has an AI now. Only one keeps the request."), six rows ordered by what only monoscope claims, facts not mockery, current pricing. Same visual system.
- `/about/`: open with the founder story from voice.md (20,000 orders in 10 minutes).

### W6 · Art (lead, Midjourney via user's Chrome)
- One painted panel per product page in the homepage style (lighthouse/observatory/coast family). Needs `chrome://inspect/#remote-debugging` enabled in the user's Chrome. Until then pages fall back to existing art in `assets/img/home/art/`.

### W7 · Polish + QA (lead, last)
- `emil-design-eng` / `better-ui` review of every new page, light + dark at 390/800/1440, reduced motion, `quickstatic build` clean, no broken links/images, compare pages and nav/footer consistent.

## Product Page Frontmatter Schema (agents write this now; the template renders it)

A product page `features/<slug>/index.md` is frontmatter only (body empty). Every key not marked required is optional.

```yaml
---
title: "Error tracking with the request behind every error"   # required, <title> / og
description: "…"                      # required, meta, ≤160 chars
eyebrow: "Error tracking"             # required, mono pill above h1
tone: warning                         # brand | warning | success | violet
h1: "Every error, with the request that caused it"  # required
pitch: "…"                            # required, one or two sentences, ≤ 35 words
hero_demo: /assets/demos/know-b.html  # either a demo-scene storyboard …
hero_shot: issues                     # … or a screenshot name: /assets/img/product/<name>-{light,dark}.webp
hero_frame: "app.monoscope.tech / issues"
playground: issues                    # demo-project path for "Launch playground" (default log_explorer)
cta: "Get started"                    # primary button label (default "Start for free")
art: know-lighthouse.webp             # painted panel from assets/img/home/art/
sections:                             # same schema as homepage chapters
  - id: request
    icon: align-left                  # any id in /assets/deps/sprite.svg
    tone: brand
    eyebrow: "The exact request"
    title: "…"
    lead: "…"
    demo: /assets/demos/….html        # or shot: <name>
    frame: "app.monoscope.tech / log_explorer"
    bullets: [{ title: "…", icon: radio, body: "…" }]   # 3 or 4
    code_label: "…"                   # optional dark code panel
    code: |
      …
    link: /docs/…
    link_label: "…"
faqs: [{ q: "…", a: "…" }]            # 3-6, honest
related: [ai-sre, logs-and-traces]    # slugs of other product pages
---
```

## Copy Guardrails (every copy agent)

- **Use (validated):** tagline, onlyness statement, trueline, elevator pitch, BrandScript character, agreement plan (`brand-brief.md`).
- **Order:** the shipped homepage reads "Know what happened. Fix it. Prove it." with chapters Know → Fix → Prove, while the brief's tagline is Know / Prove / Fix. Product pages follow the homepage's order. Open question for the user.
- **Don't use:** the homepage hero pitch "Observability data lake and an AI SRE agent…" (the brief says it fails the swap test); "wake up to…" imagery and "nobody should be on-call" (Polylane's); any hint of SOC 2 / ISO 27001; customer logos, numbers or fix-PR counts that are not already on the homepage; anything on the voice.md avoid list.
- Run `avoid-ai-writing` on finished copy. Use `emil-design-eng` before any layout work.
- **Terminology:** in docs, "sessions"/"setting sessions" means `setUser`/`setTenant` identity on the request span (section "Identifying users & tenants"), not session replay.

## Coordination Rules

- Agents may run `make css-prod` (whole-repo, idempotent) but never `quickstatic build`. The dev server on :2020 rebuilds on save; check `build.log` and fetch the page from :2020 to confirm new markup is there (strict-Liquid errors leave the old page in place silently).
- Liquid `{% render %}` has its own scope: pass `n:forloop.index` and anything else the component needs. Guard every optional key with `{% if s.key %}`.

- Agents edit only files in their workstream. Shared files (`quickstatic.yaml`, `nav.liquid`, `foot.liquid`, `_redirects`, `index.md`, components) belong to the lead.
- No commits from agents; the lead reviews and commits per workstream.
- After CSS-affecting edits: `make css-prod` then `quickstatic build` and grep for `Error` (serve can silently keep stale pages).
- Every agent reports: files changed, open questions, claims it could not verify.

## Split With the Other Session (2026-10-29)

A second session (plan: `brand/site-rebuild-plan.md`) runs the same goal. Agreed split: this session owns the product pages (`/features/*`, `features-single.liquid`, `components/chapter.liquid`, `components/frame.liquid`, nav/footer/redirects for them) and the screenshot library. The other session owns pricing, compare, changelog, docs, about/contact/events/thanks/404, `components/bill.liquid` / `compare.liquid`, Midjourney art (strips in `assets/img/home/art/page-*.webp`), and the final CSS rebuild, QA and push. W3, W4, W5 and W5b below were handed over; partial work is in `brand/handoff-session1.*`.

## Status

| WS | Owner | State |
|---|---|---|
| W0 template | lead | done: features-single.liquid + components/chapter.liquid + components/frame.liquid; shared styles moved to tailwind.css; nav "Product" menu, footer, _redirects updated |
| W1 screenshots | agent | started |
| W2 product pages | agents A, B | started (frontmatter only) |
| W3 pricing | agent | started |
| W4 changelog | agent | started |
| W5 docs | agent | started |
| W5b compare/about | agent | started |
| W6 art | lead | blocked: Chrome remote debugging off (DevTools MCP timed out); existing art in use |
| W7 QA | lead | last |
