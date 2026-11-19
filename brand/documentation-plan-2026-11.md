# Documentation overhaul — November 2026

## Objective

Merge `llm-observability-docs` into master, then make the documentation reflect the current product and SDKs. Preserve unrelated homepage and newsletter edits.

## Evidence reviewed

- Landing branch: `193eb9e5`, fast-forwarded into master on 2026-11-19.
- Server: `monoscope` origin/master `65f0b52ef`; reviewed repository UI (`Pages/CodeContext.hs`), review webhooks/model, proof policy, review renderer, shared KQL parser, routes, and internal query reference. The relevant local files match origin/master.
- JavaScript SDK: origin/main `90d6090`; Python SDK: origin/main `c99d05d`; Go SDK: origin/main `b8fdbc5`. Read current remote revisions when a local checkout lagged.
- Existing public documentation, navigation templates, redirects, API generation script and cached OpenAPI specification.

## Findings and implementation sequence

1. **Missing review workflows.** Add a production impact review guide with GitHub App setup, named service mappings, routine activation, triggers, on-demand commands, evidence visibility, result interpretation and troubleshooting. Add a separate proof guide with base/head semantics, recipe authoring, limits and a small example. Link both from AI, product and repository guidance.
2. **Query language gaps and misleading guarantees.** Document duration units, message search, typed field roots, post-aggregation filters, heatmap buckets and metric series semantics. Correct the unconditional counter accuracy claim and gauge aggregation description. Add a task-oriented cookbook with explicit assumptions, service/request filters, identity queries and monitor-safe ratios.
3. **Integration guidance lacks a common verification path.** Add shared troubleshooting and data-capture guides. Explain startup order, signal exporters, body capture defaults, header redaction, identity and session scope, trace propagation and shutdown. Link them from SDK entry points and onboarding. Fix examples that cannot produce a span or depend on an out-of-scope variable.
4. **Removed Reports page.** Replace the old article with a migration explanation and links to scheduled routines. Remove obsolete navigation and project-setting instructions after checking the current implementation.
5. **Navigation and reliability.** Make the new workflows discoverable. Check source links and rendered fragments, Liquid/Djot output, code blocks and responsive reading. Add a reusable documentation link check so future edits expose broken routes and anchors.
6. **Broader consistency pass.** Review existing product, AI, SDK and API reference pages for obsolete instructions, contradictory claims and broken examples. Prefer targeted corrections with code evidence over blanket rewrites. Record any remaining gaps below.

## Validation and completion gates

- Full QuickStatic build succeeds using the native installed binary; inspect its log.
- All documentation links resolve against generated output, including fragments and image assets.
- Rendered new guides contain headings, tables, code and navigation, without leaked Liquid syntax.
- Exercise representative cookbook queries against the public demo when available. Record empty results separately from syntax failures. Do not claim a live scenario without observed data.
- Review changed SDK snippets against current source. External OpenTelemetry APIs require primary documentation verification.
- Commit only authorized documentation, tooling and navigation changes. Preserve unrelated working edits. Push master after validation; record commit and any unverified limitation.

## Progress

- [x] LLM branch merged into local master (fast-forward).
- [x] Initial server and SDK source review.
- [x] Review and proof guides.
- [x] KQL reference corrections and cookbook.
- [x] Integration troubleshooting and capture/identity guide.
- [x] Reports migration and navigation corrections.
- [x] Broader consistency pass and rendered verification.
- [ ] Final commit and remote master verification.


## Further source review and implemented changes

- Reviewed the server's changes since October 29. Added product guidance for LLM conversations, topics and custom signals; uptime custom requests and regional workers; public/internal status boards; synthetic browser issues; read-only built-in dashboards and metric stat rollups.
- Reviewed Laravel `53a8005`, Slim `dbe934c`, Symfony `a0c746e`, .NET `0b7b136`, current Spring Boot source and Phoenix `7357c4b`. Added Laravel configuration-cache instructions.
- Checked Maven Central metadata and the actual Spring Boot 2.0.9 source JAR. Its header redaction differs from current repository source. Kept the published version and corrected the guide's claims and explicit configuration.
- Checked Hex package metadata and Phoenix 0.1.2 package contents. Only cookie is automatically redacted there. Documented the legacy ingestion path, explicit header list and OpenTelemetry alternative.
- The live OpenAPI specification has 57 paths and 76 operations; the old cached reference described three operations. Replaced the snapshot and regenerated all 76 operation pages. Preserved the three existing endpoint URLs. Added schema tables, JSON schemas, request-file examples and project headers. Generation rejects duplicate slugs before replacing output.
- Fixed the API console to handle headers, encoded path parameters and JSON bodies. It uses a native dialog, labeled inputs, validation, focus restoration, cancellation and a bounded request timeout. Browser checks intercept API calls.
- Removed placeholder changelog, obsolete troubleshooting and retired Reports pages. Their URLs redirect to maintained content. A clean rebuild removed stale generated pages before link verification.
- Added reusable rendered-link and browser checks, with commands in README. Build refreshes the API schema with a checked-in fallback.

## Validation evidence

- Native `quickstatic build`: exit 0; `/tmp/monoscope-docs-build.log`.
- `python3 scripts/check-docs-links.py`: zero broken local links, fragments or image paths (165 documentation pages at the final pass).
- `node scripts/check-docs-browser.mjs`: project/auth headers, encoded path parameters, JSON validation and POST payload, Escape/focus restoration, key clearing, headings and mobile overflow on seven representative pages. All API requests intercepted.
- Current spec operation count equals generated endpoint page count: 76/76.
- Python snippets extracted from all 76 generated endpoint pages compile.
- Rust setup snippet and worker snippet compile with the documented dependencies. The worker check supplies application-specific type/function placeholders. Logs: `/tmp/monoscope-docs-rust-check.log`.
- Six representative demo queries checked live: service discovery, HTTP failure ratio, grouped latency with an aggregate filter, projection/unit conversion, error flags and metric inventory. Service, route and metric queries returned data. The HTTP ratio was zero in that window. Do not treat the absence of an error or an empty projected result as a demonstrated incident.
- Demo validation exposed and corrected three syntax traps: fixed `p95` only accepts a field, `project` needs explicit aliases, and its arithmetic parser needs `1000000` rather than `1e6`.
- `git diff --check`, JavaScript syntax checks and `bash -n build.sh` pass.

## Limits

The work checks SDK guidance against source and selected published artifacts. It does not claim end-to-end runtime testing for every language or framework. No blog incident or screenshot was fabricated. The public demo was used for read-only query verification. Homepage and newsletter working edits remain outside this change.
