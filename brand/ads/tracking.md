# Search Ads Tracking

Internal. What has to be true before non-brand spend starts (wave 0 in `campaigns.md`), and the changes the lead makes. Nothing here has been applied.

## What the Site Does Today

Read from `_quickstatic/themes/default/components/head.liquid` and `assets/js/ad-tracking.js` on 2026-10-29:

- Inside `{% unless config.dev %}` (line 166 to 389): Amplitude, Google Tag Manager `GTM-TF4BQQ3D`, PostHog, Facebook (two pixels), LinkedIn, reb2b, Reddit, Apollo. All load unconditionally. **No consent banner, no Consent Mode.**
- No direct Google tag (`gtag.js` / `AW-…`). What GTM contains is not visible from the repo; the lead must check the container before adding anything, so Google Ads tags don't fire twice.
- `ad-tracking.js` calls `gtag('event', 'sign_up')` when someone **clicks** a link to `app.monoscope.tech`, `generate_lead` on a click to the Google Calendar booking page, and `view_item` on scroll depth. It only reaches Google if `window.gtag` exists, which GTM alone does not define. These are clicks, not signups.
- Signup, onboarding and first data all happen on `app.monoscope.tech`. Demo booking is a Google Calendar appointment page (`calendar.app.google/1a4HG5GZYv1sjjZG6`) where no tag can run.

## UTM Convention

Keep the final URLs in `rsa.csv` clean. Put tracking in the **account-level final URL suffix** so it can change without re-importing ads:

```
utm_source=google&utm_medium=cpc&utm_campaign={_c}&utm_content={adgroupid}&utm_term={keyword}&utm_matchtype={matchtype}&utm_device={device}
```

- `{_c}` is a campaign-level custom parameter. Set it on each campaign: `c1-conquest-us`, `c1-conquest-eu`, `c2-cost-us`, `c2-cost-eu`, `c3-ownership-us`, `c3-ownership-eu`, `c4-brand-us`, `c4-brand-eu`, `c5-category-us`, `c5-category-eu`.
- Auto-tagging stays **on** (adds `gclid`, or `gbraid`/`wbraid` on iOS). UTMs are for PostHog and Amplitude, the click IDs are for Google.
- Other channels use the same keys: `utm_source` = platform (`google`, `linkedin`, `reddit`, `newsletter`), `utm_medium` = `cpc` | `paid_social` | `email` | `referral`, `utm_campaign` = lowercase-hyphenated name. The existing docs links (`?utm_source=docs`) fit this.

## Conversion Actions

| Action | Google Ads goal | Primary for bidding | Count | Source | How it fires |
|---|---|---|---|---|---|
| `signup` | Sign-up | **yes** | one per click | Google tag in the app, with enhanced conversions | App fires the conversion once, on the first page after account creation |
| `first_data_ingested` | Qualified lead | no at launch; yes once it reaches 30 a month | one | offline import | App backend records the first event a new project receives; a daily job uploads it against the stored click ID |
| `demo_booked` | Book appointment | no | one | offline import | Manual or scripted upload from the booking list, matched by email (enhanced conversions for leads) |
| `signup_click` | Other | **no, observation only** | one | website (existing `ad-tracking.js` `sign_up` event, if GTM forwards it) | Click on any `app.monoscope.tech` link. Never a bidding target; it counts intent, not accounts |

Values for bidding once tCPA starts (lead decision; placeholders): signup $20, first data ingested $100, demo booked $150. The kill criterion "cost per activated account > $400" uses `first_data_ingested`.

### Getting the Click to the App

`monoscope.tech` and `app.monoscope.tech` share the parent domain, so the Google tag's `_gcl_aw` cookie (set on `.monoscope.tech`) is readable by a Google tag on the app when consent allows cookies. When it doesn't (EU visitors who decline), the click ID has to travel in the URL. Do both:

1. **Linker + URL passthrough** in the Google tag on the marketing site (snippet below): adds `_gl` to links to `app.monoscope.tech`, and `url_passthrough` keeps `gclid`/`gbraid`/`wbraid` on links when cookies are denied.
2. **`ad-tracking.js`** (lead, small change): on load, read `gclid`, `gbraid`, `wbraid` and `utm_*` from `location.search`; if `ad_storage` consent is granted, keep them in a first-party cookie on `.monoscope.tech` for 90 days; append them to every `a[href*="app.monoscope.tech"]` before navigation (the existing CTA loop already selects these links).
3. **App (`../monoscope`)**: on signup, read the click ID and UTMs from the URL, the `_gl` linker parameter or the `_gcl_aw` cookie; store them on the user and project with the signup timestamp; fire the `signup` conversion with the Google tag (`gtag('event', 'conversion', {send_to: 'AW-XXXXXXXXXX/SIGNUP_LABEL', transaction_id: <user id>})`) and set `user_data` with the email for enhanced conversions. `transaction_id` stops duplicates on reload.
4. **First data ingested**: when a project receives its first event, write a row (click ID, conversion name `first_data_ingested`, conversion time with time zone, user id). Upload daily with the Google Ads API `UploadClickConversions` or a scheduled file upload (Goals > Conversions > Uploads, from a Google Sheet or HTTPS CSV). Click IDs are valid for 90 days. Rows without a click ID go up as enhanced conversions for leads (SHA-256 of the normalized email).

### Demo Booked

The Google Calendar booking page can't carry a tag or a click ID. Options, lead decision: (a) upload bookings by email weekly as enhanced conversions for leads (works now, needs the attendee email); (b) move booking to a tool that redirects to a `monoscope.tech/thanks/` page, which then fires the conversion on the site. Until then `demo_booked` stays secondary.

## Consent (EU)

EEA, UK and Swiss traffic needs Google Consent Mode v2 signals (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`). Without them Google Ads won't use EEA users for conversion measurement modeling or audiences, and dropping cookies before consent is an ePrivacy problem regardless of ads.

- Defaults: **denied** in EEA + UK + CH, **granted** elsewhere, set before GTM or any Google tag loads.
- A banner (lead decision): a Google-certified CMP (Cookiebot, CookieYes, Usercentrics and others have Consent Mode v2 built in), or a small self-built banner that calls `gtag('consent', 'update', {...})` and stores the choice. The CMP replaces the "update" half of the snippet below.
- The other pixels (Facebook, LinkedIn, Reddit, reb2b, Apollo, PostHog, Amplitude) also load without consent today. They are outside this kit, but the CMP should gate them for EU visitors too.

## Change in `head.liquid` (lead applies)

File: `_quickstatic/themes/default/components/head.liquid`. Insert **immediately after line 166** (`{% unless config.dev %}`), before `<!-- Amplitude (with GA Events Forwarder) -->`, so consent defaults exist before GTM (line 176) or any tag runs. Replace `AW-XXXXXXXXXX` with the Google Ads tag ID. Skip the `gtag.js` include and `config` line if the GTM container already has a Google tag for this Ads account; in that case set the linker and URL passthrough in that GTM tag instead.

```html
    <!-- Google consent defaults + Google Ads tag -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied',
        region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'],
        wait_for_update: 500
      });
      gtag('consent', 'default', {
        ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted'
      });
      gtag('set', 'ads_data_redaction', true);
      gtag('set', 'url_passthrough', true);
      gtag('js', new Date());
      gtag('config', 'AW-XXXXXXXXXX', {
        linker: { domains: ['monoscope.tech', 'app.monoscope.tech'] },
        allow_enhanced_conversions: true
      });
    </script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
    <!-- End Google consent defaults + Google Ads tag -->
```

Side effect to check: defining `window.gtag` here makes the `if (window.gtag)` branch in `ad-tracking.js` live, so every CTA click and every scroll-depth step sends a Google event (`sign_up`, `view_item`, …). That is fine as long as none of those events is set up as a **primary** conversion in Google Ads. In particular, don't import `sign_up` or `view_item` from GA4 as primaries; `signup_click` above is the only one to keep, as secondary.

The same tag (with the same consent defaults) goes in the app's `<head>` so the app can read the linker and fire `signup`. That change is in `../monoscope`, not this repo.

## Test Before Launch

1. Visit `https://monoscope.tech/compare/datadog/?gclid=TEST123&utm_source=google&utm_medium=cpc` in a clean profile. Tag Assistant shows consent defaults (denied from an EU IP, granted from US), the Ads tag, and links to `app.monoscope.tech` carrying `_gl` or `gclid`.
2. Sign up from that link. The app stores `TEST123` on the user; Tag Assistant on the app shows the `signup` conversion with `transaction_id`.
3. Send a test event to the new project; the next day's upload contains a `first_data_ingested` row for it (Google rejects the fake click ID, which confirms the pipeline runs).
4. In Google Ads, Goals > Conversions: `signup` primary, the rest secondary, and the diagnostics tab shows enhanced conversions "Recording".
