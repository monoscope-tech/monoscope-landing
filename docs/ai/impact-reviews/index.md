---
title: Production Impact Reviews
ogTitle: Review Pull Requests with Production Evidence
date: 2026-11-19
updatedDate: 2026-11-19
faLogo: code-pull-request
menuWeight: 3
---

# Production Impact Reviews

A production impact review connects a pull request to the services it changes. Monoscope reads the diff and production telemetry, then reports concrete reliability, performance and observability risks. When a change needs a demonstration, it can also [record the behavior on both revisions](/docs/ai/proofs/).

For example, a pull request adds retries to payment capture. A review can inspect recent timeout traffic and identify a retry that changes the idempotency key. Production observations show how often the relevant condition occurs. A local proof can show what the proposed code does under that condition.

The review does not assume that the proposed code is already deployed. Missing telemetry appears as a coverage gap.

## Before You Start

You need:

- A project with telemetry from a named service, such as `checkout-api`.
- A repository on **GitHub.com**, connected through the **GitHub App**.
- A service mapping between that repository and the service name in your telemetry.
- An active **Production impact review** routine.
- Project editor permission to change review settings or rerun a review.

Token connections and other Git hosts can provide source context and configuration sync. Automatic pull request reviews currently require the GitHub.com App connection.

## Connect a Repository

1. Open **Repositories** in the sidebar.
2. Connect the GitHub App account and select the repository.
3. Open the repository and link the named services it builds.
4. For each mapping, use the service name that your application emits as `resource.service.name`.
5. For a monorepo, map each service to its source paths.

Open **Explorer** to make sure that the service has recent data:

```kql
resource.service.name == "checkout-api"
| summarize events = count() by bin(timestamp, 1d)
```

Select a seven-day time range. Replace `checkout-api` with your service name. If no rows appear, fix the service name or [integration](/docs/sdks/troubleshooting/) before relying on review coverage.

## Enable Reviews

1. Open the repository's **Production impact reviews** panel.
2. Select **Review pull requests**.
3. Select **Production evidence in GitHub**.
4. Click **Save review settings**.
5. Open **Manage review routine and runs**.
6. Activate or resume the **Production impact review** routine.

The repository setting selects which pull requests trigger a review:

| Setting | Behavior |
|---|---|
| **Ready pull requests** | Review open, non-draft pull requests. This is the default. |
| **Drafts and ready pull requests** | Include draft pull requests. |
| **Only when asked** | Wait for an explicit request in a pull request comment. |

New commits trigger a review of the new revision when automatic reviews are enabled. A newer revision supersedes an older run. The review history identifies the commit each result covers.

## Request a Review in GitHub

Add a pull request comment:

```text
@monoscope review
```

To request a recorded demonstration, use:

```text
@monoscope prove it, check the second retry after a timeout
```

`@monoscope test` also requests proof. Add a focus on the same line to direct the investigation. Requests work in every trigger mode, including **Only when asked**. The commenter must be a repository owner, member or collaborator. Bot comments do not trigger reviews.

A proof request asks for a recording or an explanation of any unverified behavior. It does not guarantee a successful proof.

## Read the Result

Open **Review history** from the repository, or read the comment on the pull request.

| Part | How to use it |
|---|---|
| **Claims and recordings** | Compare the pull request's stated behavior with the recorded result. See [Proofs](/docs/ai/proofs/). |
| **Merge risk** | Read the assessment of alignment, impact, verification, rollback cost and error detection. The overall rating combines these dimensions. |
| **Worth checking in production** | Inspect each changed-line finding, its mechanism, its telemetry evidence and its next check. |
| **Coverage gaps** | Identify missing telemetry, unavailable queries or behavior that the review could not verify. |
| **Revision and time window** | Make sure that the reviewed commit and production period match your investigation. |

The initial production evidence covers the previous seven days. Traffic volume alone does not establish a defect. A finding connects changed code to a failure mechanism and relevant telemetry.

A review with no findings can still have unknown coverage. Read the coverage section before treating the result as reassurance.

## Choose What Appears in GitHub

**Production evidence in GitHub** has two settings:

- **Links only**, the default, links to evidence in Monoscope.
- **Aggregates and links** also includes production counts and the observation period in the GitHub comment.

Choose the setting for everyone who can read the repository. Proof recordings show the commands, output or application state exercised during the review. Use synthetic fixtures in proof recipes.

Review and proof runs use metered AI resources. See [pricing](/pricing/) and the usage view in **Repositories**.

## Troubleshooting

| Symptom | What to check |
|---|---|
| **Link a named service** | Add a service mapping and make sure that its name matches incoming telemetry. |
| **Link source context through the GitHub App** | A token connection alone does not enable automatic reviews. Connect the repository through the App. |
| **Activate or resume the routine** | Open the linked routine and enable it. Repository trigger settings do not replace routine activation. |
| **Automatic reviews are unavailable** | Ask your Monoscope administrator to finish the review worker or GitHub App setup named in the panel. |
| No automatic review on a draft | Select **Drafts and ready pull requests**, or request a review with a comment. |
| A run is superseded | Read the run for the latest commit. |
| Incomplete or failed review | Read the failure message. After fixing the cause, use **Rerun review** on the latest revision. |
| Unknown production coverage | Make sure that the mapped services emit relevant fields within the observation window. An unavailable query is not zero matches. |

For repository setup and source context, see [AI SRE](/docs/ai/ai-sre/#Connect-Your-Code). For a repeatable demonstration of a change, write a [proof recipe](/docs/ai/proofs/).
