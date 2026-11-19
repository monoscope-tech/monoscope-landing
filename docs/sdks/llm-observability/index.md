---
title: LLM & Agent Observability
ogTitle: LLM and AI Agent Observability with OpenTelemetry - monoscope
faLogo: sparkles
date: 2026-11-16
updatedDate: 2026-11-19
linkTitle: "LLM & Agents"
menuWeight: 45
---

# LLM & Agent Observability

monoscope shows every conversation your agents have: what the user asked, each model call and tool call in order, the tokens and cost of every step, and the errors, loops and truncations along the way. The HTTP, database and queue spans of the same request sit beside the model calls in one trace.

It reads standard OpenTelemetry. Send spans from any SDK or framework below, in any of their attribute dialects, and monoscope maps them onto the [OpenTelemetry GenAI conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) when they arrive.

```=html
<hr>
```

After data arrives, use the [LLM and Agents product guide](/docs/dashboard/dashboard-pages/llm-agents/) to investigate conversations, topics and signals.

## What you get

- **Conversations.** Spans that share `gen_ai.conversation.id` (or `session.id`) are one conversation. A trace that ran an agent but carries no id is its own conversation.
- **Transcript and timeline.** Each message appears once, with the model, latency, tokens and cost of the call that produced it. Tool calls show their arguments, result and duration.
- **Cost.** Priced model calls carry `gen_ai.usage.cost` in US dollars. Calls without usable pricing or usage data remain unpriced. A cost reported by your SDK or gateway wins. Otherwise monoscope estimates it from the published price of the model, including cache-read and cache-write rates. Because cost is an attribute, you can chart it, alert on it, and group it by any field in [KQL](/docs/dashboard/dashboard-pages/query-language/).
- **Signals.** Each conversation is checked for tool errors, model errors, truncated replies, content-filter refusals, repeated identical tool calls, and calls that used at least 80% of the model's context window.
- **Ask AI.** One click hands the conversation to monoscope's assistant, which explains what happened and why.
- **Dashboard.** A ready-made dashboard charts cost, tokens, calls, latency and tool errors by model, agent and service.

## Connect monoscope

Every integration below sends OTLP to monoscope with the same four settings:

```sh
OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4318"
OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
OTEL_SERVICE_NAME="your-agent"
```

gRPC also works: use port `4317` and `OTEL_EXPORTER_OTLP_PROTOCOL="grpc"`. To send the key as a header instead, set `OTEL_EXPORTER_OTLP_HEADERS="x-api-key=YOUR_API_KEY"`.

```=html
<div class="callout">
  <i class="fa-regular fa-lightbulb"></i>
  <p><b>Prompts and replies are opt-in.</b> Most instrumentations record token counts but not message text until you enable content capture. Without it you still get cost, latency, models and tools, but the transcript is empty. Each section below names the switch.</p>
</div>
```

## Group calls into conversations

Set a stable conversation id on your spans. Any of these works:

| Attribute | Set by |
|---|---|
| `gen_ai.conversation.id` | OpenTelemetry GenAI conventions |
| `session.id` | OpenInference, Claude Code |
| `traceloop.association.properties.session_id` | OpenLLMetry `Traceloop.set_association_properties` |
| `ai.telemetry.metadata.sessionId` | Vercel AI SDK `experimental_telemetry.metadata` |
| `langfuse.session.id` | Langfuse SDKs |

## Python

### OpenTelemetry GenAI instrumentations

The official instrumentations emit the GenAI conventions directly.

```sh
pip install opentelemetry-distro opentelemetry-exporter-otlp opentelemetry-instrumentation-openai-v2
export OTEL_SEMCONV_STABILITY_OPT_IN=gen_ai_latest_experimental
opentelemetry-instrument python app.py
```

These spans carry the model, tokens, cost and tool calls. Current releases record prompt and completion text only as log events, not on the span, so the transcript stays empty. For transcripts, use OpenLLMetry or OpenInference below, which record message content on the span.

Instrumentations for Anthropic, Google GenAI, Vertex AI and LangChain follow the same pattern in [opentelemetry-python-contrib](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation-genai).

### OpenLLMetry (LangChain, LangGraph, CrewAI, LlamaIndex, Bedrock, Vertex AI, Azure OpenAI and more)

[OpenLLMetry](https://github.com/traceloop/openllmetry) instruments the model SDKs and agent frameworks in one call.

```sh
pip install traceloop-sdk
export TRACELOOP_BASE_URL="http://otelcol.monoscope.tech:4318"
export TRACELOOP_HEADERS="x-api-key=YOUR_API_KEY"
```

```python
from traceloop.sdk import Traceloop

Traceloop.init(app_name="your-agent")
Traceloop.set_association_properties({"session_id": conversation_id, "user_id": user_id})
```

Prompts and completions are recorded by default. Set `TRACELOOP_TRACE_CONTENT=false` to turn them off.

### OpenInference (LangChain, LlamaIndex, DSPy, CrewAI, Agno, Google ADK, OpenAI Agents SDK, smolagents)

[OpenInference](https://github.com/Arize-ai/openinference) has an instrumentor per framework. Install the one you use and point the OpenTelemetry SDK at monoscope.

```sh
pip install opentelemetry-sdk opentelemetry-exporter-otlp openinference-instrumentation-openai-agents
```

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter
from openinference.instrumentation.openai_agents import OpenAIAgentsInstrumentor

provider = TracerProvider()
provider.add_span_processor(BatchSpanProcessor(OTLPSpanExporter()))  # reads the OTEL_* variables above
trace.set_tracer_provider(provider)
OpenAIAgentsInstrumentor().instrument(tracer_provider=provider)
```

Swap the package and instrumentor for your framework, for example `openinference-instrumentation-langchain` with `LangChainInstrumentor`, `openinference-instrumentation-dspy` with `DSPyInstrumentor`, `openinference-instrumentation-agno` with `AgnoInstrumentor`, or `openinference-instrumentation-google-adk` with `GoogleADKInstrumentor`. Wrap a conversation in `using_session(conversation_id)` from `openinference.instrumentation` to group it.

### Pydantic AI

Pydantic AI emits the GenAI conventions through Logfire's OpenTelemetry setup. Send it to monoscope instead of Logfire:

```python
import logfire

logfire.configure(send_to_logfire=False)  # exports to OTEL_EXPORTER_OTLP_ENDPOINT
logfire.instrument_pydantic_ai()
```

### Strands Agents

```python
from strands.telemetry import StrandsTelemetry

StrandsTelemetry().setup_otlp_exporter()  # reads the OTEL_* variables above
```

## TypeScript and JavaScript

### Vercel AI SDK

Register OpenTelemetry (for example with `@vercel/otel` in `instrumentation.ts`) using the variables above, then turn telemetry on per call:

```ts
const result = await generateText({
  model: openai('gpt-4o'),
  prompt,
  experimental_telemetry: {
    isEnabled: true,
    functionId: 'support-agent',
    metadata: { sessionId: conversationId, userId },
  },
});
```

Inputs and outputs are recorded by default. Set `recordInputs: false` or `recordOutputs: false` to omit them.

### OpenLLMetry for Node.js (OpenAI, Anthropic, LangChain.js, LlamaIndex.TS, Bedrock, Vertex AI)

```sh
npm install @traceloop/node-server-sdk
```

```ts
import * as traceloop from '@traceloop/node-server-sdk';

traceloop.initialize({
  appName: 'your-agent',
  baseUrl: 'http://otelcol.monoscope.tech:4318',
  headers: { 'x-api-key': process.env.MONOSCOPE_API_KEY },
});
```

### Mastra and other OpenTelemetry-native frameworks

Mastra, the OpenAI Agents SDK for JavaScript, and other frameworks that export OpenTelemetry need only their OTLP exporter pointed at monoscope with the variables above.

## Go, Rust, Java, .NET and other languages

Wrap each model call in a span with the GenAI attributes using your language's [OpenTelemetry SDK](/docs/sdks/opentelemetry/). monoscope needs only the operation, model and token counts to price a call:

| Attribute | Example |
|---|---|
| `gen_ai.operation.name` | `chat`, `execute_tool`, `invoke_agent`, `embeddings` |
| `gen_ai.provider.name` | `openai`, `anthropic`, `aws.bedrock`, `gcp.vertex_ai` |
| `gen_ai.request.model` | `gpt-4o`, `claude-sonnet-4-5` |
| `gen_ai.usage.input_tokens`, `gen_ai.usage.output_tokens` | `1200`, `340` |
| `gen_ai.usage.cache_read.input_tokens` | `800` |
| `gen_ai.conversation.id` | `conv_8f2a` |
| `gen_ai.input.messages`, `gen_ai.output.messages` | JSON, in the conventions' message format |
| `gen_ai.tool.name`, `gen_ai.tool.call.arguments`, `gen_ai.tool.call.result` | on `execute_tool` spans |

## Claude Code

Claude Code exports OpenTelemetry logs and metrics. Each API request, tool result and prompt becomes an event in monoscope, with its model, tokens and cost.

```sh
export CLAUDE_CODE_ENABLE_TELEMETRY=1
export OTEL_LOGS_EXPORTER=otlp
export OTEL_METRICS_EXPORTER=otlp
export OTEL_EXPORTER_OTLP_PROTOCOL=grpc
export OTEL_EXPORTER_OTLP_ENDPOINT="http://otelcol.monoscope.tech:4317"
export OTEL_RESOURCE_ATTRIBUTES="x-api-key=YOUR_API_KEY"
export OTEL_LOG_USER_PROMPTS=1   # optional: record prompt text
```

Each Claude Code session is one conversation, keyed by `session.id`.

## MCP servers and clients

Spans with the OpenTelemetry MCP attributes (`mcp.method.name`, `mcp.session.id`) appear alongside the tool calls they serve. If your agent framework already records the tool call, the MCP attributes belong on that `execute_tool` span. OpenInference's `openinference-instrumentation-mcp` propagates trace context across the MCP boundary, so client and server spans join one trace.

## Any other source: OTLP over HTTP

A single model call, sent with `curl`:

```sh
curl -X POST http://otelcol.monoscope.tech:4318/v1/traces \
  -H 'Content-Type: application/json' -H 'x-api-key: YOUR_API_KEY' \
  -d '{"resourceSpans":[{"resource":{"attributes":[{"key":"service.name","value":{"stringValue":"my-agent"}}]},
       "scopeSpans":[{"spans":[{"traceId":"5b8efff798038103d269b633813fc60c","spanId":"eee19b7ec3c1b174",
         "name":"chat gpt-4o","kind":3,"startTimeUnixNano":"1763251200000000000","endTimeUnixNano":"1763251201200000000",
         "attributes":[
           {"key":"gen_ai.operation.name","value":{"stringValue":"chat"}},
           {"key":"gen_ai.request.model","value":{"stringValue":"gpt-4o"}},
           {"key":"gen_ai.usage.input_tokens","value":{"intValue":"1200"}},
           {"key":"gen_ai.usage.output_tokens","value":{"intValue":"340"}},
           {"key":"gen_ai.conversation.id","value":{"stringValue":"conv_8f2a"}}]}]}]}]}'
```

## Supported dialects

monoscope reads these attribute families and maps them onto the GenAI conventions. The original attributes stay on the span.

| Source | Recognised by |
|---|---|
| OpenTelemetry GenAI conventions (current and deprecated names) | `gen_ai.*` |
| OpenInference | `openinference.span.kind`, `llm.*`, `input.value`, `output.value` |
| OpenLLMetry / Traceloop | `traceloop.*`, `gen_ai.prompt.N.*`, `gen_ai.completion.N.*` |
| Vercel AI SDK | `ai.*` |
| Langfuse | `langfuse.*` |
| Claude Code | `claude_code.*` events |
