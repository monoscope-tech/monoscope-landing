# Product screenshots

Captured from the public demo project (`https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000`) with `scripts/capture-product-shots.mjs`. Viewport 1440×900 at 2x (2880×1800 WebP, `cwebp -q 86 -m 6 -sharp_yuv`), timezone UTC. Every shot exists as `<name>-dark.webp` and `<name>-light.webp`; the theme is set with the app's `theme` cookie. All shots are full-viewport (no crop) and keep the sidebar and header.

The script hides the demo-only "Book Demo" / "Start Free Trial" header buttons, chat widgets and toasts. Refresh everything with `node scripts/capture-product-shots.mjs`, or refresh single shots with `node scripts/capture-product-shots.mjs trace issues`.

| name | URL path (under `/p/<demo>`) | what it shows | interaction |
| --- | --- | --- | --- |
| log-explorer | `/log_explorer` | Explorer: query bar, traces volume chart and latency percentile chart, facet sidebar, live log/span list across services | none |
| log-explorer-request | `/log_explorer?query=body.response_body != null` | An incoming `GET /api/products/{param}` request opened in the details panel, Request tab, with the JSON response body (product description, categories) visible | clicked the first `/api/products/` row; Res Body tab |
| trace | `/log_explorer?query=trace_id=="71a7e99c…"&from=2026-10-28T14:50Z&to=…15:00Z` | Trace Breakdown waterfall for a 96-span, 8-error, 9.4 s checkout trace across 11 services (frontend-web → frontend-proxy → frontend → shipping → quote …) | clicked the row, then "View trace". The trace view opens full-screen, so this shot has no app sidebar |
| issues | `/issues` | Issues inbox: critical 500 errors, gRPC errors, rage clicks, schema changes, with activity sparklines and counts | none |
| issue-detail | `/issues/e76bd12d-0c56-4779-a348-79e758105791` | Issue #113557 "Shipping Quote Failure in Checkout Service": error frequency chart, AI analysis ("Likely cause: Network"), event highlights, contexts and trace ids | none |
| dashboard-overview | `/dashboards/6f5ee51d-…/tab/overview` | Overview dashboard: golden signals (traffic, P95 latency, error rate, Apdex), system overview, services health table, ongoing issues | none |
| dashboard-service | `/dashboards/6f5ee51d-…/tab/service?var-service=frontend` | Overview dashboard, Service tab for `frontend`: requests, error rate, avg latency, endpoints, requests and P95 by resource, status codes, latency percentiles | service picked via URL variable |
| session-replay | `/rum/sessions` (redirects to Explorer, Sessions view) | Session replay player over the sessions list: a shopper's cart page mid-playback (00:25 of 00:29) | replayed the longest session, let it finish, clicked "Replay from start" |
| ai-chat | `/ai/757db319-a5b3-431c-bd47-bedb08f33cf3` | AI conversation "Investigate Telemetry, Flagd, and Disk Pressure Alerts": a findings list, an inline bar chart of errors by service, and "8 tool calls" | scrolled the thread down 100px so the chart is in full view (the user's prompt scrolls out) |
| routines | `/ai/routines` | Routines: 3 installed daily routines (error spikes, faulty metrics, today's logs) with Pause / Send to Slack, plus recent successful runs | none |
| monitors | `/monitors` | Monitors list: 4 active monitors with KQL queries, schedules, last run and alert/warn thresholds, one alerting | none |
| api-catalog | `/api_catalog` | API Catalog, incoming: hosts with 24h event counts, last seen, activity bars, Logs / API docs links | none |
| metrics | `/metrics` | Metrics explorer, Charts view: grid of metric charts (memory pools, routing, browser web vitals) with group-by pickers | none |
| service-map | `/service_map` | Service map: 34 services and 51 dependencies, left-to-right request flow, per-node error rate, latency and req/s, one dependency group flagged with errors | none |
| api-changes | `/issues/dd87a53a-b8bb-4236-9ae2-0360834e73d7` | Schema-change issue #113292 "API Change: Cart Endpoint Response Field Modified": `GET /api/cart`, field-changes table with before/after inferred formats and sample values (`user.id`: text, uuid → text), matching span activity chart | none (the list view is `/issues?type=api_change`) |
| settings-api-keys | `/apis` | Settings, API Keys: two active keys, masked by the app | none |
| settings-integrations | `/settings/integrations` | Settings, Integrations: Email, Slack, Discord, WhatsApp, PagerDuty notification channels | hid the demo's "Slack token rejected / Reconnect" warning block |
| settings-members | `/manage_teams` | Settings, Team, Teams tab: the default "Everyone" team | none. The demo has no invited members (the Members tab is an empty state), so this is the populated view |
| onboarding | `/onboarding?step=Integration` | Onboarding step 4 of 5 "Instrument your apps or servers": API key, language picker (Javascript selected) and the ExpressJS integration guide, including install via Claude Code | clicked "Javascript"; the API key is masked to its first 8 characters |
