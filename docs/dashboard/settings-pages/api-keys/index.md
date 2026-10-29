---
title: API Keys
date: 2024-04-22
updatedDate: 2026-10-29
menuWeight: 2
---

# API Keys

An API key connects your services to one monoscope project. Your SDKs and the OpenTelemetry Collector send it with the telemetry, and the [CLI](/docs/ai/cli/), the [MCP server](/docs/ai/mcp/) and the [REST API](/docs/api-reference/) use it to authenticate. Open **Settings** → **API Keys**.

```=html
{% render "docs/components/shot", name: "settings-api-keys", alt: "The API keys page with the title, creation date and masked value of each key" %}
```

A project editor or admin can create, reveal and manage API keys.

## Create a Key

1. Click **New Key**.
2. Enter a **Key title** that says where the key is used, for example `checkout-production`.
3. Click **Create key**.
4. Click **Copy key** and put the key in your service configuration.

Use a different key for each service or environment. Then you can revoke one key without stopping the others.

## Revoke a Key

```=html
<div class="callout">
  <i class="fa-solid fa-triangle-exclamation"></i>
  <p>monoscope rejects telemetry sent with a revoked key. Before you revoke a key, replace it in every service that uses it.</p>
</div>
```

Click **Revoke key** next to the key, then confirm. Revoked keys move to **Archived keys**. To use a revoked key again, open **Archived keys** and click **Activate key**.
