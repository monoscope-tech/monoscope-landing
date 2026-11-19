---
title: Authentication
ogTitle: Monoscope API Authentication
updatedDate: 2026-11-19
menuWeight: 20
---

# API Authentication

Send your project API key in the `Authorization` header. Include the project's UUID in `X-Project-Id`:

```sh
curl 'https://api.monoscope.tech/api/v1/events?since=1h&limit=10' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID'
```

The project key determines which project's data you can access. The project header must match that key. Changing the header does not grant access to another project.

## Get a Project Key

1. Open **Settings** → **API Keys** in the application.
2. Click **New Key**.
3. Enter a title for the integration.
4. Click **Create key**, then **Copy key**.

Project editors and administrators can manage and reveal keys. See [API keys](/docs/dashboard/settings-pages/api-keys/) for revocation and reactivation.

The project UUID appears in the application URL after `/p/`. For example, `/p/PROJECT_UUID/log_explorer` identifies the project you are viewing.

Use a separate key for each integration or environment. Keep the key in your secret configuration. Do not put it in browser application code.

## Diagnose an Authentication Failure

- Make sure that the header contains `Bearer ` followed by the key.
- Make sure that the key is active and belongs to the selected project.
- Make sure that `X-Project-Id` contains the project UUID.
- Inspect the response's `error.code` and message.

REST authentication differs from OTLP ingestion configuration. SDKs can send `x-api-key` as a resource attribute or OTLP header. See [OpenTelemetry setup](/docs/sdks/opentelemetry/).
