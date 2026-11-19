---
title: LLM and Agents
ogTitle: Investigate Agent Conversations, Cost and Signals
date: 2026-11-19
updatedDate: 2026-11-19
menuWeight: 8
---

# LLM and Agents

Open **LLM & Agents** to inspect model calls and tool use across an agent conversation. Monoscope groups compatible GenAI telemetry into conversations and shows transcripts, cost, tokens and failure signals.

First, [instrument your application](/docs/sdks/llm-observability/). The setup guide covers supported frameworks, conversation identifiers and content-capture options.

## Find a Conversation

The **Conversations** tab shows each conversation's agents, models, timing, token use, cost and signals. Select a time range, then filter by **Agent**, **Model** or **Signal**. Use the search field to narrow the list.

Spans with a shared conversation identifier belong together. Without a conversation identifier, an agent trace appears as its own conversation. Keep identifiers stable across turns.

A conversation without captured prompt text can use its first tool call or agent name as its title. An untitled conversation does not necessarily mean that telemetry is missing.

## Inspect a Conversation

Open a row to read the transcript and timeline. The detail shows:

- **Cost:** the total priced model calls, with a count of unpriced calls.
- **Tokens:** input, output and available cache counts.
- **Model calls:** the number of inference calls and their latency.
- **Tool calls:** tool use, duration and failures.
- **Signals:** detected or judged behavior, with its explanation.

Use **Open trace** to inspect the related HTTP, database and queue spans. Use **Spans in Explorer** for the underlying telemetry. **Ask AI** starts an investigation with the conversation as context.

## Read Cost and Token Totals

An SDK-reported cost takes precedence. Otherwise Monoscope can estimate cost from model pricing and recorded token usage, including available cache counts.

An unpriced call has no usable reported or estimated cost. A partial total does not establish the full provider bill. Make sure that the instrumentation records the model and usage fields before comparing costs.

For a chart across services or models, open **LLM calls** or use the [query language](/docs/dashboard/dashboard-pages/query-language/). For example:

```kql
isnotnull(attributes.gen_ai.usage.cost)
| summarize cost_usd = sum(attributes.gen_ai.usage.cost) by resource.service.name
| sort by cost_usd desc
```

This query counts only calls with a cost attribute. Keep the time range consistent with the conversation list.

## Built-in Signals

The **Signals** tab includes these built-in checks:

| Signal | What it indicates |
|---|---|
| **Tool error** | A failed tool call. |
| **Model error** | A failed model call. |
| **Truncated** | A reply stopped at the output token limit. |
| **Filtered** | A reply stopped because of content filtering. |
| **Repeated tool call** | The same tool ran with the same arguments at least three times. |
| **Context ≥80%** | A call used at least 80% of the model's context window. |

Click a signal to open matching conversations. Read the individual calls before deciding whether the behavior needs a change. Repeated calls can be intentional, and truncation can depend on the requested output limit.

## Create a Custom Signal

Use a custom signal for behavior that needs interpretation, such as a user repeating a request after an incorrect answer.

1. Open **Signals** and expand **New signal**.
2. Enter a **Name**.
3. Describe **What to look for** in observable terms.
4. Click **Create and judge today's conversations**.
5. Read the matched conversations and the judge's reasons.

For example:

```text
The user says the answer is wrong, repeats the same request after a failed response,
or abandons the task after the agent fails to complete it.
```

The table shows **Matched**, **Match rate** and **Judged**. The match rate uses judged conversations as its denominator. It does not imply that every historical conversation was evaluated.

Use **Judge new conversations now** to request another evaluation. Custom judgments depend on captured content and model interpretation. Inspect their reasons before acting on the result.

## Group Conversations by Topic

The **Topics** tab groups similar opening requests. Open a topic to inspect its conversations and compare their errors, tokens and cost.

A topic groups related requests. It does not establish that every conversation has the same outcome or root cause.

## Missing Content or Calls

- If no conversations appear, widen the time range and inspect service filters.
- If calls appear without transcripts, enable the instrumentation's content-capture option where supported.
- If turns split into separate conversations, inspect the conversation identifier on each span.
- If cost is missing, inspect model names, token usage and reported cost attributes.

See [LLM instrumentation](/docs/sdks/llm-observability/) and [integration troubleshooting](/docs/sdks/troubleshooting/) for the setup details.
