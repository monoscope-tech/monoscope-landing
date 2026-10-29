# Site rebuild plan: product pages, pricing, changelog, docs

Owner: lead agent (this session). Started 2026-10-29. `brand/` is excluded from the build.

## Goal

Bring every page beyond the homepage up to the homepage's standard: same messaging, same visual system, real product screenshots, and up-to-date docs. Old pages still say "API observability / APItoolkit", use 2024 screenshots, and describe features that have since changed.

## Inputs every agent must read first

- `brand-brief.md` (positioning, BrandScript, tagline "Know what happened. Prove it. Fix it.", category "AI SRE + open-source observability", primary reader: mid-size Datadog teams of 50–300 engineers).
- `brand/voice.md` (voice rules and banned words). Write plainly; no hype.
- `index.md` (the homepage): the reference for layout, section rhythm, panels, painted art strips, type scale, code blocks, copy buttons, light/dark handling.
- `CLAUDE.md` (Djot/Liquid rules, `{% raw %}` around `{{ }}`, dev server, build log).
- Confirmed facts (do not invent others): request/response bodies don't add to price; EU region standard; no SOC 2/ISO yet; open source (AGPL); own S3 bucket option (+$199/month); Cloud $29/month includes 20M events then $1 per million; free tier 10k events/day; routines with templates and deploy triggers; CLI + skills + hosted MCP for coding agents. Proof numbers on the homepage are the only publishable ones.

## Visual system (shared rules)

- Copy markup patterns from `index.md`; don't invent a new style. Section heading: eyebrow pill + 42px heading + 17.5px intro. Card titles 17.5px/1.35. Nothing under 12px. Secondary copy 14px.
- Panels: `panel-w rounded-[2rem]` with `bg-(--tone-panel)`, tones brand/success/warning/violet. Painted strip at the panel bottom using the same mask as the homepage strips.
- Art world: coast with lighthouses and observatories, anime cel style. The lead agent generates new art in Midjourney and drops it in `assets/img/home/art/`; agents reference art by the names in "Art list" below.
- Product shots: framed like the homepage demos (dark window bar, `data-theme="dark"` frame) for marketing; docs use the light/dark pair (see Screenshots).
- Motion: `assets/css/home-motion.css` / `assets/js/home-motion.js` may be loaded on marketing pages; respect reduced motion. Apply `emil-design-eng` and `better-ui` rules: no `transition: all`, press scale on buttons, custom ease-out curves.

## Screenshots (workstream B produces, everyone consumes)

Captured from the public demo project `https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/…` with Playwright (global install: `$(npm root -g)/playwright`), 1440×900 viewport at 2x, both themes, saved as WebP:
`assets/img/product/<name>-dark.webp` and `assets/img/product/<name>-light.webp`, plus `assets/img/product/manifest.md` describing each shot (URL, what it shows, crop).

Shot names (fixed so other agents can reference them before they exist):

| name | what it shows |
| --- | --- |
| log-explorer | Explorer with logs list and chart |
| log-explorer-request | a request row opened, request and response bodies visible |
| trace | a trace waterfall (span tree) |
| issues | issues list |
| issue-detail | one issue with its trace breakdown |
| dashboard-overview | overview dashboard, golden signals |
| dashboard-service | a service dashboard (traffic, latency, status codes) |
| session-replay | session replay player |
| ai-chat | an AI SRE investigation thread |
| routines | routines list |
| monitors | monitors / alerts list |
| api-catalog | API catalog / endpoints |
| metrics | metrics explorer |
| settings-api-keys | API keys settings |
| settings-integrations | integrations settings (Slack etc.) |
| settings-members | team members |
| onboarding | first-run / project setup screen if reachable |

## Art list (lead agent, Midjourney)

`page-<slug>.webp` strips (6:1) for: product index, ai-sre, logs-traces, issues, dashboards, session-replay, monitors, routines, coding-agents, own-bucket, pricing, changelog, docs-home, about. Until generated, pages reference `/assets/img/home/art/know-lighthouse.webp` etc. and the lead swaps names in during integration.

## Workstreams (parallel agents, one git worktree each)

| id | scope | output |
| --- | --- | --- |
| B | Screenshots from the live demo, both themes, per the list above | `assets/img/product/*`, manifest |
| C | Product pages: new `/product/` index + pages for AI SRE, Logs & traces (full request/response), Issues & errors, Dashboards & metrics, Session replay, Monitors & alerts, Routines, Coding agents (CLI, skills, MCP), Own bucket (BYOB S3). Redirect old `/features/*` slugs in `_redirects`. Update nav + footer links in `quickstatic.yaml` / `nav.liquid` / `foot.liquid`. | new pages, redirects, nav |
| D | Pricing page rebuilt in the homepage style (reuse the calculator from `index.md`), FAQ refreshed; compare pages (datadog, sentry, newrelic, honeybadger, bugsnag, axiom, treblle, baselime + index) refreshed to current positioning and verified claims | `pricing/`, `compare/` |
| E | Changelog: monthly entries from Feb 2025 to Oct 2026 written from `~/Projects/apitoolkit/monoscope` git history (user-visible changes only), and the changelog list/single templates restyled | `changelog/`, templates |
| F1 | Docs: onboarding, SDK guides, getting started; replace old screenshots with the new ones; fix outdated names (APItoolkit → monoscope) and flows | `docs/onboarding`, `docs/sdks`, docs home |
| F2 | Docs: dashboard pages, features docs, AI (CLI/MCP), query language; new screenshots; docs theme polish (code blocks, callouts, tables) | `docs/dashboard`, `docs/features`, `docs/ai`, docs theme |
| G | Company pages: about, contact, events, thanks; footer and 404 page (Cloudflare Pages returns a soft 200 for unknown paths today) | `about/`, `contact/`, `events/`, `404.html` |

The lead agent (this session) owns: Midjourney art, merging branches, rebuilding `tailwind.min.css`, cross-page QA (light/dark, 390/1440 px, no console errors, no broken links/images), and the final push.

## Rules for agents

1. Work only inside your own scope. Shared files (`quickstatic.yaml`, `nav.liquid`, `foot.liquid`, `head.liquid`, `tailwind.css`) only by the agent named for them (C for nav/footer links); others list needed changes in their final report.
2. Do not commit `assets/css/tailwind.min.css`; the lead rebuilds it after merging.
3. Build check: `ln -s <main repo>/node_modules node_modules` in the worktree if missing, `make css-prod`, then `quickstatic build`; zero errors. Serve `_quickstatic/public` with `python3 -m http.server <unique port>` and screenshot pages with Playwright at 1440 and 390 in light and dark.
4. Commit to your worktree branch with plain messages (no AI attribution). Report: branch name, pages changed, open questions, anything you couldn't verify.
5. Never invent customer numbers, certifications or features. If unsure whether a feature exists, check the live demo or the monoscope repo; otherwise leave it out and say so.

## Integration order

B (screenshots) lands first → C, D, E, F1, F2, G merge in any order → lead swaps in art and screenshots, rebuilds CSS, runs site-wide QA → push to `master` (Cloudflare Pages deploys).

## Split with session apitoolkit-landing-01 (agreed 2026-10-29)

That session owns the product pages: `/features/*` (overview, ai-sre, error-tracking, api-monitoring, logs-and-traces, dashboards, session-replay, byob-s3), `features-single.liquid`, `components/chapter.liquid` + `frame.liquid`, shared styles moved into `tailwind.css`, the "Product" nav dropdown, the footer Product column and the `/features/*` redirects (schema in `brand/site-plan.md`). Workstream C is cancelled; there are no `/product/*` paths. This session owns everything else, including screenshots (B, also used by their pages), `components/bill.liquid` + `compare.liquid`, and the handoff files `brand/handoff-session1.*` (delete them after merging).

## Status

- [x] B screenshots
- [x] C product pages (moved to the other session)
- [x] D pricing + compare
- [x] E changelog
- [x] F1 docs onboarding/SDKs
- [x] F2 docs dashboard/features/AI
- [x] G company pages + 404
- [x] Art (lead): 13 `page-*.webp` strips, commit 90d44d6f
- [x] Integration + QA + push (lead)
