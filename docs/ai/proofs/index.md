---
title: Proofs for Pull Requests
ogTitle: Record Pull Request Behavior on Base and Head
date: 2026-11-19
updatedDate: 2026-11-19
faLogo: circle-play
menuWeight: 4
---

# Proofs for Pull Requests

A proof records a command, test, API request or browser interaction on two pinned revisions. Monoscope runs the same setup and demonstration on the merge base and the pull request head, in separate virtual machines. The result shows the behavior before and after the change.

Proofs are part of [production impact reviews](/docs/ai/impact-reviews/). Production telemetry describes the deployed service. A proof describes the code exercised in the review environment.

## Request a Proof

After connecting the GitHub App, service mapping and review routine, comment on the pull request:

```text
@monoscope prove it, show what happens when checkout times out twice
```

You can also use `@monoscope test`. State the behavior to exercise and the expected result. For a UI change, name the page, interaction and screen size.

Automatic reviews can record proofs when the change needs a demonstration. Documentation, formatting and similar changes usually need only the diff. An explicit proof request asks for a recording or an unverified claim with the reason.

## Interpret the Evidence

| Result | Meaning |
|---|---|
| **Matches** | The recorded behavior supports the stated claim. |
| **Differs** | The recording shows behavior that differs from the claim. |
| **Unverified** | The review could not establish the claim. Read the missing prerequisite or coverage explanation. |

Open the head recording first. Compare it with the merge-base recording, the revision labels and the exit codes. Browser proofs can also include screenshots and chapters.

A failing base and passing head can demonstrate a fix when both run the same relevant assertion. A passing command alone does not prove the intended behavior. Setup failures and missing dependencies leave the claim unverified.

The review can report another issue if the recording exposes broken behavior outside the stated claim. A proof supports only what it exercises.

## Add a Repository Recipe

Create `.monoscope/PROOF.md` in your repository. The review reads the recipe from the base revision. Merge the recipe before expecting later pull requests to use it.

Describe:

1. The tools, dependency versions and fixtures the application needs.
2. One setup command that prepares and starts the application, then returns.
3. The command or browser interaction that demonstrates the behavior.
4. The assertion that distinguishes the old behavior from the intended behavior.
5. The behavior that this environment cannot verify.

Keep setup separate from the recording. Dependency installation, migrations and sample-data preparation belong in setup. The recording must show the result a reviewer needs to assess.

### Example: A Node.js API

Adapt this recipe to your repository's actual scripts and fixture endpoint:

```markdown
# Proofs for this repository

Use Node.js 22 and the committed package-lock.json.
Use synthetic orders. No production credentials are required.

## Setup

Run `npm ci`, then `npm run build`.
Start `npm run start:proof` on port 3000 in the background.
Wait for `http://127.0.0.1:3000/health` to return 200.
The proof server seeds one order and a local payment-provider stub.

## Retry behavior

POST /proof/checkout with scenario `timeout-twice`.
Print the response and the provider stub's recorded calls.
Assert that all retries use the same idempotency key.
The same command must exercise both the base and head revisions.

## Limits

The stub verifies local retry behavior.
It cannot establish how the real payment provider handles a timeout.
```

Do not add scripts only to match this example. Use the entry points that your application actually provides.

## Browser Proofs

For a visual change, provide the local URL, setup command and steps in the recipe. State an observable assertion, such as a menu that stays inside the viewport.

Browser proofs use Playwright and Chromium when the review environment provides them. A proof can include a video, up to four cropped screenshots and chapter labels. Capture the interaction and resulting state. A screenshot of source code does not demonstrate UI behavior.

## Environment and Limits

- Each comparison uses pinned base and head revisions in fresh virtual machines.
- Proof VMs can read supported package registries. Arbitrary external services and production credentials are unavailable.
- Use local service stubs and synthetic fixtures for external dependencies.
- Tool installation must work without root access.
- Keep demonstrations focused. Reviews allow at most three proof attempts.
- A successful setup can become a saved recipe for later reviews. Changes to the base recipe invalidate incompatible saved setup.

For a slow build, describe the smallest real target that exercises the change. If required tools or application state are unavailable, the result must explain that limitation.

## If a Proof Is Unverified

Read the reason before changing the pull request:

- **Missing setup:** add a repeatable local command and fixtures to the recipe.
- **External dependency:** use a local stub, and state what that stub cannot prove.
- **Build or runtime failure:** reproduce the failure with the same command and pinned dependencies.
- **Behavior outside the recording:** request a focused proof with a direct assertion.

After fixing setup, request another review or use **Rerun review** on the latest revision. Keep CI checks for behavior outside the recorded scenario.
