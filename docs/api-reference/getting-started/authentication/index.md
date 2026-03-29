---
title: "Authentication"
ogTitle: "API Reference - Authentication"
menuWeight: 20
hideToc: true
---

All Monoscope API requests require authentication via a Bearer token in the `Authorization` header.

## Getting Your API Key

1. Log in to [your Monoscope dashboard](https://app.monoscope.tech)
2. Go to **Settings > API Keys**
3. Click **Create API Key** and copy the generated key

<div class="callout">
  <i class="fa-solid fa-triangle-exclamation"></i>
  <p>API keys are shown only once. Store your key securely — you cannot retrieve it later.</p>
</div>

## Using Your Key

Include the key as a Bearer token in every request:

{% raw %}
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.monoscope.tech/api/v1/metrics?pid=YOUR_PROJECT_ID
```
{% endraw %}

## Key Scoping

Each API key is scoped to a single project. To access multiple projects, create a key for each one.

## Revoking Keys

Navigate to **Settings > API Keys** in the dashboard and click **Revoke** next to the key you want to disable. Revoked keys stop working immediately.
