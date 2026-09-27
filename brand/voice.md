# monoscope Voice Guide

Internal reference for anyone writing copy for the site, docs, product, emails or social. Not published (ignored in `quickstatic.yaml`). Full strategy lives in `brand-brief.md`.

**Tagline:** Know what happened. Prove it. Fix it.
**Short form:** Know what happened. Prove it.

## Who We Sound Like

The senior engineer at the postmortem who, while everyone argues about what happened, pulls up the actual request. Calm, specific, evidence first.

- **Sounds like:** a good postmortem (timeline, evidence, root cause, fix), our CLI docs, Stripe docs, Linear changelogs.
- **Doesn't sound like:** an enterprise observability brochure, AI hype, a legal notice, meme-heavy dev-tool Twitter.

| Dimension | Where we sit |
|---|---|
| Funny ↔ Serious | Mostly serious. One dry line is fine. Never joke about an outage. |
| Formal ↔ Casual | Conversational. Contractions and "you", engineer to engineer. No slang. |
| Respectful ↔ Irreverent | Call out sampling, dropped request bodies and surprise bills. Never sneer at a named competitor. |
| Enthusiastic ↔ Matter-of-fact | Matter-of-fact. Numbers carry the energy. No exclamation marks. |

## On-Brand Examples

These set the bar. When in doubt, write something that sits next to these without standing out.

**Homepage headline**
> Know what happened. Prove it. Fix it.

**Product description**
> monoscope keeps every API request and response, yours and your suppliers', next to your logs, traces and metrics. When something breaks, its AI finds the request that caused it and opens a PR with the fix.

**Error message**
> We can't write to your bucket 'acme-telemetry': access denied for s3:PutObject. Data is buffering for up to 24 hours. Add PutObject to the IAM policy and we'll resume automatically.

**Email subject line**
> Your payment provider changed its response shape on Tuesday

**Social post**
> A customer's supplier returned 200 OK and never shipped the order. They had the request and the response, timestamped, in their own S3 bucket. That's the whole case.

**CTA button**
> Start for free

**Support reply**
> You're right, the alert fired 12 minutes late. The delay was in our Slack delivery queue, not your data. It's fixed as of 14:05 UTC, and here's the exact alert timeline.

**About page opening**
> We once shipped a rewrite that lost 20,000 orders in 10 minutes. One field was missing, and nothing we had kept the request that would have shown it.

The error message and support reply show tone only. Their specifics (24-hour buffering, the 14:05 fix) are placeholders, so check real product behavior before reusing them.

## Rules

1. Lead with the concrete noun: the request, the response, the PR. Not "visibility" or "insights".
2. Numbers over adjectives: "10k events a day", "20x faster MTTR", not "blazing fast".
3. Say what the AI does, as verbs: investigates, opens a PR, flags, answers. Never just "AI-powered".
4. The customer is the subject: "you see the exact request", not "our platform provides".
5. Short declaratives. Parallel threes are welcome ("one binary, one auth, one JSON shape").
6. No exclamation marks. No "simply" or "just"; they read as condescending when something is broken.
7. Competitors: name them only in comparisons, state facts, never mock.
8. Errors and outages: say what happened, what we did, and what the reader needs to do.

## Words

**Use:** request, response, payload, the exact request, keep/kept, unsampled, evidence, receipt (sparingly), breaking change, supplier/third-party API, root cause, pull request/PR, your bucket, open format, you, ship.

**Avoid:** innovative, cutting-edge, best-in-class, world-class, next-generation, revolutionary, game-changing, seamless, holistic, synergy, leverage, empower, transform, solutions, passionate about, comprehensive, robust, unified, single pane of glass, enterprise-grade, autonomous, "AI-powered" without saying what it does, "insights" or "visibility" on their own, simply, just, "nobody should be on-call" (a competitor's line).
