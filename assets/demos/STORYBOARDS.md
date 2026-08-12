# Demo storyboards

Direction rules: one idea per video. 8–13s loops. Motion never stops — every beat
either cuts to a new frame or moves the camera; no dead holds over 2.2s, no
mid-loop pull-backs to neutral. Captions are the voiceover: short, present tense,
they narrate exactly what the camera frames. The loop restart is the reset.

Frames: `img/*.webp` (2x screenshots of the demo project). Specs: `<name>.json`.

---

## see-everything — hero
**Point:** logs, traces and metrics live in one stream; any row opens into full
context and its distributed trace.
**Show:** unified event list → request detail panel → trace waterfall.
**Communicate:** stop tab-switching between three tools at 3 AM.
**Scenes** (~12s):
1. Wide on explorer, live charts visible — "Logs, traces and metrics — one stream" (1.2s)
2. Cursor clicks a request row (fast) — no caption change
3. Cut to detail panel, camera pushed into payload/attributes — "Full context on every request" (2s)
4. Cut to waterfall, camera on the span tree — "…and the whole distributed trace" (2.4s)

## know-instantly
**Point:** errors arrive pre-grouped as issues; one click isolates every failing request.
**Show:** issues inbox rows → error-filtered explorer with red histogram.
**Communicate:** no log-grepping to find what broke.
**Scenes** (~9s):
1. Camera on top issue rows — "Errors arrive pre-grouped" (1.8s)
2. Cut to error explorer, camera on red histogram — "One click isolates every failure" (1.8s)
3. Pan down to the red rows — "Each one links to its trace" (1.8s)

## measure-anything
**Point:** the dashboards you'd spend a sprint building already exist.
**Show:** golden-signal cards → per-service health table.
**Communicate:** RED metrics with zero setup.
**Scenes** (~10s):
1. Wide on overview — "Dashboards you didn't have to build" (1.2s)
2. Push into traffic + p95 cards — "Golden signals, straight from traces" (1.8s)
3. Pan to error rate + Apdex — no caption change (1.4s)
4. Cut to scrolled view, camera on service table — "Health per service, auto-built" (2s)

## ask-like-colleague — API catalog
**Point:** your API surface documents itself from live traffic.
**Show:** endpoint rows with volumes → external dependency list.
**Communicate:** an always-current catalog nobody has to maintain.
**Scenes** (~9s):
1. Camera on endpoint rows — "Endpoints catalogue themselves from traffic" (2s)
2. Pan right to the live volume numbers — no caption change (1.4s)
3. Cut to dependencies, camera on rows + sparklines — "…and every API you depend on" (2.2s)

## from-anywhere — AI
**Point:** a plain-English question becomes a running query.
**Show:** typing into the AI bar → slowest-request results.
**Communicate:** no query language between you and the answer.
**Scenes** (~11s):
1. Camera already on the AI bar, cursor clicks, question types out fast — "Ask in plain English" (typing is the beat)
2. Cut to results, camera on generated query — "Monoscope writes the query" (1.6s)
3. Pan to the slow rows with latency bars — "…and runs it" (2s)

## change-detection
**Point:** your API surface is diffed continuously.
**Show:** three change rows: new field / new endpoint / changed shape.
**Communicate:** catch breaking changes before your clients do.
**Scenes** (~9s):
1. Camera on row 1 — "A field just appeared in the payments response" (1.8s)
2. Small pan to row 2 — "A new endpoint went live" (1.6s)
3. Small pan to row 3 — "A payload changed shape" (1.6s)
4. Snap wide — "Caught before your clients notice" (1.6s)

## monitors
**Point:** any query becomes a watchdog.
**Show:** monitor rows with alerting badges, KQL snippets, thresholds.
**Communicate:** thresholds page you, not customers.
**Scenes** (~8s):
1. Camera on the alerting rows — "Any query becomes a monitor" (2s)
2. Pan to thresholds/last-run column — "Warn and alert thresholds, checked every minute" (2.2s)

## weekly-reports
**Point:** Monday morning tells you what actually broke.
**Show:** events/errors stats → per-issue trend sparklines.
**Communicate:** no dashboard-hunting to start the week.
**Scenes** (~8s):
1. Camera on the 412K/27 stats — "Your week, summarized" (1.8s)
2. Pan down to the issues table — "Every issue, trended — in your inbox" (2.2s)
