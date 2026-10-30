# Ad Assets: Sitelinks, Callouts, Structured Snippets, Prices

Internal. `build.py` reads every table row below whose first cell is `sitelink`, `callout`, `snippet` or `price` and checks lengths (sitelink text ≤25, description lines ≤35; callout ≤25; snippet value ≤25; price header and description ≤25), banned words and caps. Final URLs are relative to `https://monoscopehq.com`.

Rules: no competitor names in any asset (trademark limits apply to assets too); no bucket, fix-PR or "780+" claims (see `campaigns.md`, Unverified claims). Title Case for sitelinks and callouts, matching the headlines.

## Sitelinks

Account level, applied to C1, C2, C3 and C5. Each final URL is unique, as Google requires within one ad.

| Kind | Text (≤25) | Line 1 (≤35) | Line 2 (≤35) | Final URL |
|---|---|---|---|---|
| sitelink | Pricing | Free up to 10k events a day | $29/month for 20M events | /pricing/ |
| sitelink | AI SRE | Investigates with the request | Answers your team in Slack | /features/ai-sre/ |
| sitelink | Error Tracking | Every error with its request | Alerts in Slack or PagerDuty | /features/error-tracking/ |
| sitelink | API Monitoring | Incoming and outgoing calls | Full request and response bodies | /features/api-monitoring/ |
| sitelink | Logs and Traces | Every log linked to its trace | KQL or plain-English queries | /features/logs-and-traces/ |
| sitelink | Session Replay | The customer's screen | Linked to the backend trace | /features/session-replay/ |
| sitelink | Compare Tools | Sourced side-by-side pages | Pricing, features and sources | /compare/ |
| sitelink | Docs and SDKs | Add an SDK or OTel exporter | Node, Python, Go, Java and more | /docs/sdks/ |
| sitelink | Changelog | What shipped each month | Features, fixes and SDK updates | /changelog/ |

Brand campaign (C4) set: Pricing, AI SRE, Docs and SDKs, Changelog from above, plus:

| Kind | Text (≤25) | Line 1 (≤35) | Line 2 (≤35) | Final URL |
|---|---|---|---|---|
| sitelink | Live Demo Project | Explore a real project | No signup needed | https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/ |

The demo project is on `app.monoscope.tech`, a different domain from the ads (`monoscopehq.com`), so Google may flag this sitelink as a destination mismatch; if it does, drop it.

When the P1 pages ship, swap Logs and Traces for Log Management (`/features/log-management/`) on C5 only.

## Callouts

Account level. Pick any 6–10; Google shows 2–4.

| Kind | Text (≤25) |
|---|---|
| callout | Request Bodies Included |
| callout | $1 per Million Events |
| callout | Free up to 10k Events/Day |
| callout | No Host or Seat Fees |
| callout | Open Source (AGPL-3.0) |
| callout | Hosted in the EU or US |
| callout | Unlimited Team Members |
| callout | No Credit Card to Start |
| callout | OpenTelemetry Native |
| callout | Self-Host for Free |

## Structured Snippets

| Kind | Value (≤25) |
|---|---|
| snippet | Error Tracking |
| snippet | Logs and Traces |
| snippet | Metrics and Dashboards |
| snippet | Session Replay |
| snippet | API Monitoring |
| snippet | Uptime Checks |
| snippet | AI SRE |

Header: **Types**. Use all seven on C5 and C1; on C2 lead with Logs and Traces, Error Tracking, API Monitoring.

Second set, header **Service catalog**:

| Kind | Value (≤25) |
|---|---|
| snippet | Free Plan |
| snippet | monoscope Cloud |
| snippet | Self-Hosted (AGPL) |
| snippet | Enterprise Self-Hosted |

## Price Assets

Type: Service tiers. Currency USD. Qualifier "From" (one qualifier covers every item).

| Kind | Header (≤25) | Description (≤25) | Price | Final URL |
|---|---|---|---|---|
| price | Free | Up to 10k events a day | $0 | /pricing/ |
| price | monoscope Cloud | 20M events included | From $29 per month | /pricing/#compare-plans |
| price | Self-Hosted Enterprise | SSO, SLA, support | From $500 per month | /contact/ |

Google requires a distinct final URL per price item. `/pricing/` has no `#plans`, `#self-hosted` or `#enterprise` ids, so the live set is three items on `/pricing/`, `/pricing/#compare-plans` and `/contact/`; add the Community Edition item back once the plan cards carry ids.

## Live State

Added 2026-10-30 in account 267-068-0364: the 9 sitelinks, 10 callouts, both snippet sets (Types, Service catalog) and the 3 price items at account level; the C4 set (Pricing, AI SRE, Docs and SDKs, Changelog, Live Demo Project) at campaign level on C4 Brand | US and | EU, where it replaces the account sitelinks.
