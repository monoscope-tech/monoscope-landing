# Ads Tracking and Iteration: Groundwork Plan

Internal. Written 2026-10-29 by session `apitoolkit-landing-c2`. Builds on `brand/search-ads-plan.md` (pages) and `brand/ads/` (Google Ads kit, `tracking.md`).

## Goals and constraints

- **Two outcomes:** paying customers (signup → first data → paid) and GitHub stars on `monoscope-tech/monoscope`.
- **Budget is small.** Every dollar must be attributable to one of those two outcomes, and the algorithms must only ever learn from real outcomes, never from clicks or scrolls.
- **No spend without the founder.** This plan sets up accounts, tags, audiences, conversions and campaigns in a paused/draft state. Adding payment methods and turning campaigns on are left to the founder.

## What competitors do (observed 2026-10-29, homepage network requests)

| Company | Tags on their site | Consent | Socials |
|---|---|---|---|
| Sentry | Plausible only (no ad pixels on the homepage) | none shown | X @sentry, LinkedIn getsentry, Discord, GitHub getsentry |
| Datadog | GTM, GA4, Google Ads/DoubleClick, Meta pixel, LinkedIn Insight, Microsoft UET, Clarity, Demandbase, Marketo, 6sense-style intent (company-target), CaliberMind | Transcend CMP | X @datadoghq, Instagram @datadoghq, YouTube DatadogHQ, LinkedIn |
| Better Stack | gtag (Google Ads/GA4), TikTok pixel, Sentry, Front chat | "Please accept cookies" banner | X @betterstackhq, Instagram @betterstackhq, TikTok @betterstack, YouTube, LinkedIn, GitHub BetterStackHQ |

Takeaways: the two that advertise heavily (Datadog, Better Stack) run a consent banner and use an `hq` handle that matches their domain (`datadoghq.com`, `betterstack.com` → `betterstackhq`). Sentry's paid search runs with almost no client-side pixels, relying on Google Ads' own tag; it shows conversions can work without a pixel zoo.

## Where monoscope stands today

**Site (`monoscopehq.com`)** already loads: GTM `GTM-TF4BQQ3D` (Google Ads conversion `AW-11285541899` / label `XFpwCN3Po7wZEIvoroUq` on "Start for free" click, gclid linker, LinkedIn Insight, a custom-template tag `16806346`), Meta pixel `1135987380886994`, Reddit pixel, X pixel `om5gt`, LinkedIn Insight, Amplitude, PostHog, Apollo, ConvertKit. **No consent banner** (EU visitors, EU company).

**Problems with the current event stream** (`assets/js/ad-tracking.js`):
1. "SignUp" fires on *click* to `app.monoscope.tech`, and is sent to Meta as `Lead`, Google as `sign_up`, Reddit/LinkedIn/X as conversions. Bidding learns from clicks, not signups.
2. Scroll depth (25/50/75/90%) fires `ViewContent` to every ad pixel: noise.
3. GitHub clicks are not tracked at all, so the stars goal is invisible.
4. Click IDs (gclid, fbclid, rdt_cid, li_fat_id, twclid) and UTMs are not carried to the app (different domain), so no real signup can be attributed to an ad.
5. No consent: Google requires Consent Mode v2 for EEA remarketing and conversion modelling; Meta/Reddit/LinkedIn pixels fire before consent.

**App (`app.monoscope.tech`, repo `../monoscope`)**: config-driven Google Ads, Meta, LinkedIn, X, PostHog. The only real conversion is a Google Ads purchase (`AW-11285541899/rf7NCKzf_9YYEIvoroUq`) on LemonSqueezy checkout success. No signup or activation conversion.

**Accounts found in the founder's Chrome:**
- Google Ads: `anthonyalaribe@gmail.com` and `anthony@monoscope.tech` have no Ads account; `anthony@past3.tech` has a cancelled "Past 3 Technologies UG" account. The account owning `AW-11285541899` is under a login that needs re-authentication (authuser=2). **Open item for the founder.**
- Meta: several business portfolios (AIFACTORY CALABAR, Past 3 Software and Design Studio, others). A Facebook Page **"Apitoolkit"** (id 61557955952297, 7 followers, old brand). The portfolio owning pixel `1135987380886994` is not yet identified.
- Instagram: logged into a personal account; no brand account.
- **Reddit Ads `t2_9wupu0` (EUR) is live.** Last 30 days €1,200: `GitHub_Traffic` €30/day, 11,603 clicks at €0.08, all straight to github.com (no pixel sees them); `Website_DevOps_Communities` €10/day, 860 clicks at €0.35, optimising on the pixel's `Sign Up`, which until now fired on *clicks* to the app. Pixel also logged 418k `View Content` a week from scroll tracking. This campaign explains Reddit being the top GitHub referrer.
- GTM `GTM-PTLSTQ8` (account APIToolkit, also loaded in `foot.liquid`): its Google Ads "Get started" conversion only fires on `app.apitoolkit.io` pages, so it is already dead; it also duplicates Reddit PageVisit and a click-based Reddit Sign Up. `GTM-TF4BQQ3D` is not visible to this login.
- X: @monoscope_tech exists. LinkedIn: /company/monoscope. YouTube: @Monoscope. GitHub: monoscope-tech.

## Handle decision

Use **`monoscopehq`** for every new or renamed account (Instagram, Facebook Page username, Reddit). Reasons: it matches the domain the ads point to (`monoscopehq.com`), follows the Datadog/Better Stack pattern, and is free where checked (`instagram.com/monoscope` belongs to an individual; `facebook.com/monoscope` is taken; `monoscopehq` is free on both). Keep the existing X (@monoscope_tech), GitHub (monoscope-tech), LinkedIn and YouTube handles; they have history, and renaming breaks links. Display name everywhere: "monoscope".

## Measurement design

### Conversion ladder (what each platform optimises on)

| Event | Fires where | Counts as | Value |
|---|---|---|---|
| `signup` (account created) | app, server-side after auth callback | **primary** conversion everywhere | $20 placeholder |
| `activated` (first event ingested) | app, server-side | **primary** once ≥30/month, else secondary | $100 |
| `purchase` | app, LemonSqueezy success (exists for Google) | primary | actual value |
| `demo_booked` | site click on the calendar link (no tag on Google Calendar) | secondary | $150 |
| `github_star_intent` | site click to github.com/monoscope-tech/monoscope | secondary (Google), **custom conversion** (Meta/Reddit) for star campaigns | $2 |
| `signup_start` | site click to app.monoscope.tech | secondary only | none |
| scroll depth, page views | analytics only (PostHog/Amplitude), never ad pixels | none | none |

### Attribution plumbing

1. **Click IDs and UTMs:** on landing, store gclid/gbraid/wbraid, fbclid (as `_fbc`), rdt_cid, li_fat_id, twclid and utm_* in a first-party cookie for 90 days.
2. **Carry them to the app:** append them to every `app.monoscope.tech` link, because the app is on a different domain.
3. **Store them on signup:** the app saves them on the user record, and the server-side signup and activation conversions send them back:
   - Google Ads: offline conversion import or enhanced conversions.
   - Meta: Conversions API.
   - Reddit: Conversions API.
4. **GitHub stars:** stars can't be attributed per click (GitHub sends no callback), so we track them two ways:
   - **Intent:** the `github_star_intent` click.
   - **Outcome:** a daily stargazer count with timestamps from the GitHub API, read against spend by day and by campaign window.
   - README and docs links back to the site carry UTMs.

### Consent

Lightweight first-party banner (no paid CMP): EEA/UK/CH visitors default to denied, everyone else granted; Google Consent Mode v2 signals (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`); Meta/Reddit/LinkedIn/X pixels and PostHog/Amplitude load only after consent in the EEA. Choice stored in a cookie; a "Cookie settings" link in the footer.

## Channel plan for a small budget

| Channel | Job | Start budget | Optimise on |
|---|---|---|---|
| Google Search | Capture intent: competitor alternatives, pricing pain, category pages (`brand/ads/`) | ~60% | signup → activated |
| Reddit | Two jobs: promoted posts in r/selfhosted, r/devops, r/opensource, r/sre for **stars**; retargeting site visitors for signups | ~20% | github_star_intent / signup |
| Meta (FB + IG) | Retargeting only: site visitors 30/90 days, pricing and compare viewers, docs readers; never cold | ~10% | signup |
| LinkedIn | Retargeting matched audiences only once the audience is >300; cold LinkedIn is too expensive | 0% until then | signup |
| X | Organic + retargeting only if audience grows | 0% | — |
| Reserve | Shift to whatever wins after 2 weeks | ~10% | — |

Rules: one primary conversion per campaign; daily caps on every campaign; kill rules from `brand/ads/campaigns.md` (CTR < 2% after 1k impressions, LP→signup < 3% after 300 clicks, cost per activated > $400); weekly review every Monday (spend, signups, activations, stars by day).

## Audiences to build (Meta, Reddit, LinkedIn, Google)

All site visitors 30/90/180d · pricing viewers · compare/alternative viewers · docs readers · GitHub-click users · signups (exclusion) · customers (exclusion) · lookalikes later from activated users.

## Work list (state as of 2026-10-29)

| # | Work | State |
|---|---|---|
| 1 | Event cleanup: only real outcomes to ad pixels; scroll/pageview to analytics only; `github_star_intent`, `demo_booked`, `signup_start`; UTM'd GitHub links | **done, live** (`assets/js/ad-tracking.js`). Bridge: Reddit still gets `SignUp` on app clicks so the live SIGN_UP ad group keeps a signal; flip to `Custom SignupStart` when the app PR ships |
| 2 | Click-ID + UTM capture (`ms_attr`, 90 days) and app-link decoration | **done, live** |
| 3 | Consent banner + Consent Mode v2, pixels gated in EEA (time-zone detection) | **done, live**; QA: EU 0 ad requests before Accept, both Meta pixels after |
| 4 | App: store attribution on signup, `signup`/`activated` server-side (Google, Meta CAPI, Reddit CAPI) | draft PR [monoscope#749](https://github.com/monoscope-tech/monoscope/pull/749): attribution cookie → `users.attribution`, signup + activation to Google (gtag + offline view), Meta (pixel + CAPI) and Reddit (CAPI); each inert until its env keys are set |
| 5 | Daily GitHub stars + spend report | **done** (`brand/ads/report/`) |
| 6 | Meta | **done:** FB Page "Monoscope" (61596069719066, Sign up button with UTMs), Instagram **@monoscopehq** (business, linked to the Page), new business portfolio **"monoscope"** (1810239816910047) owning both, new pixel **"monoscope web" 2333667580805655** fired on the site next to the legacy `1135987380886994` (owner unknown, not reachable from this login). **Open:** ad account (currency/time zone are permanent: founder's call), then custom conversions and audiences; audiences backfill 180 days, so nothing is lost by waiting |
| 7 | Reddit | **done:** audiences `Site visitors 30d`, `Site visitors 90d` (~5.5k), `App clickers 90d (exclude)`. **Next:** `GitHub clickers 90d` once the pixel has seen `GitHubStarIntent` (Reddit rejects unseen custom events); a retargeting ad group on `Site visitors 90d` excluding app clickers |
| 8 | Google Ads: locate the AW-11285541899 account, conversion actions per ladder, import `brand/ads/` kit paused | blocked on founder login (also owns `GTM-TF4BQQ3D`) |
| 9 | LinkedIn/X website audiences | todo (no account access checked yet) |

## Founder to-do (in order of payoff)

1. **Reddit spend check (saves money now).** €40/day runs on Reddit. Test `GitHub_Traffic` honestly: pause it for 7 days, run `node brand/ads/report/stars.mjs` daily, and compare stars/day to the ~40/week organic baseline in `stars-daily.csv`. Extra stars per paid week = paid-week stars minus the paused-week stars; keep the campaign only if €210 ÷ extra stars is a price you accept per star.
2. **Merge the app PR**, set the Meta CAPI dataset to `2333667580805655` with a token from Events Manager, and set the Reddit CAPI token. Then flip `signup_start` back to `rdt: ['Custom', 'SignupStart']` and switch the Reddit ad group to optimise on real `SignUp`.
3. **Google:** log into the account that owns `AW-11285541899` and `GTM-TF4BQQ3D`; pause its click-based "Start for free" conversion (label `XFpwCN3Po7wZEIvoroUq`) as primary, add signup/activated as primary once the app PR ships.
4. **Meta ad account** in the "monoscope" portfolio (pick currency: EUR matches Reddit billing), then: custom conversions GitHubStarIntent, SignupStart (secondary), Schedule; audiences visitors 30/90/180d, pricing, compare, docs, GitHub clickers.
5. **Facebook Page username** `monoscopehq` (Accounts Center loops in automation; takes 30 s by hand) and the **Instagram website link** (mobile app only). Instagram login is in Keychain: `instagram.com monoscopehq`.
6. Payment methods and turning campaigns on stay with you.
