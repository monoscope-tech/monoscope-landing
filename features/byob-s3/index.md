---
# UNVERIFIED: no customer-facing Postgres/SQL endpoint (host, credentials, how it's provisioned) exists in monoscope's code or docs; TimeFusion speaking the Postgres wire protocol is verified. The psql example uses placeholders.
# UNVERIFIED: "within minutes" relies on TimeFusion's README (WAL + buffer, flush to Delta about every 10 minutes).
# NOTE: no storage-settings shot in the W1 list, so the hero reuses the homepage Prove demo (prove-b).
title: "Your own S3 bucket as the database"
description: "Every request, payload, log, trace, metric and replay written to your S3 bucket as open Delta Lake and Parquet. Unlimited retention, from $199/month."
eyebrow: "Your own bucket"
tone: success
h1: "Your S3 bucket is the database"
pitch: "monoscope writes every request, response, log, trace, metric and session replay to your bucket as Delta Lake and Parquet, and queries it from there. Keep it as long as you like."
hero_demo: /assets/demos/prove-b.html
hero_frame: "app.monoscope.tech / log_explorer"
art: page-own-bucket.webp
cta: "Get started"
sections:
  - id: receipt
    icon: database
    tone: success
    eyebrow: "The receipt"
    title: "Months later, you still have what you sent"
    lead: "A supplier returned 200 OK and never shipped the order. One customer had the request and the response, timestamped, in their own bucket, and took it to court. Thirty-day retention would have deleted it."
    bullets:
      - title: "Unlimited retention"
        icon: calendar
        body: "Data stays until you delete it. Set lifecycle rules in S3 if you want a limit."
      - title: "Live, not an archive"
        icon: activity
        body: "The Explorer, dashboards, monitors and the AI query the same tables. There's no export job and no rehydration."
      - title: "Everything, in one place"
        icon: align-left
        body: "Requests with their bodies, logs, spans and metrics as Delta tables; session replays as rrweb JSON."
    link: /docs/dashboard/settings-pages/s3-storage/
    link_label: "How the bucket is laid out"
  - id: duckdb
    icon: code
    tone: brand
    eyebrow: "Open format"
    title: "Query it with the tools you already have"
    lead: "Logs, spans and API requests live in an otel_logs_and_spans Delta table, metrics in otel_metrics, partitioned by project and date. DuckDB, Spark, Polars, Trino or delta-rs read them with no export step."
    bullets:
      - title: "Delta Lake and Parquet"
        icon: database
        body: "Open formats with readers in every data stack. Nothing to migrate out of if you leave."
      - title: "Your AI can read it"
        icon: zap
        body: "Point your own agents, notebooks or warehouse at the bucket, or use the monoscope MCP server and CLI."
      - title: "Any S3-compatible store"
        icon: cloud
        body: "AWS S3, Cloudflare R2, MinIO, DigitalOcean Spaces, Backblaze B2 or OVH."
    code_label: "duckdb · every call to a supplier on one day"
    code_class: language-sql
    code: |
      INSTALL delta; LOAD delta;
      CREATE SECRET (TYPE s3, PROVIDER credential_chain);

      SELECT timestamp,
             attributes___http___request___method       AS method,
             attributes___url___full                    AS url,
             attributes___http___response___status_code AS status
      FROM delta_scan('s3://your-bucket/timefusion/otel_logs_and_spans')
      WHERE project_id = 'your-project'
        AND date = DATE '2026-09-27'
        AND attributes___server___address = 'api.supplier.com'
      ORDER BY timestamp;
    link: /docs/dashboard/settings-pages/s3-storage/
    link_label: "More DuckDB examples"
  - id: sql
    icon: server
    tone: violet
    eyebrow: "Postgres SQL"
    title: "Or connect like it's Postgres"
    lead: "If you'd rather not run DuckDB, query the same tables over the Postgres wire protocol. It's served by TimeFusion, the open-source database monoscope runs on, so psql and any Postgres driver work."
    bullets:
      - title: "Audit trails for your customers"
        icon: users
        body: "Show your own customers what they sent and what came back, from the requests monoscope already stores."
      - title: "Activity dashboards in your product"
        icon: bar-chart
        body: "Feed customer-facing charts from the same tables your engineers debug with."
      - title: "Open source underneath"
        icon: github
        body: "TimeFusion is on GitHub under MIT. Read the code that stores your data, or run it yourself."
    code_label: "psql · the same data from any Postgres client"
    code_class: language-sql
    code: |
      -- psql "host=&lt;your-endpoint&gt; dbname=&lt;db&gt; user=&lt;user&gt;"
      SELECT attributes___http___route AS route,
             count(*)                  AS errors
      FROM otel_logs_and_spans
      WHERE project_id = 'your-project'
        AND date &gt;= current_date - 7
        AND attributes___http___response___status_code &gt;= 500
      GROUP BY route
      ORDER BY errors DESC;
    link: https://github.com/monoscope-tech/timefusion
    link_label: "TimeFusion on GitHub"
  - id: setup
    icon: plug
    tone: success
    eyebrow: "Set up"
    title: "Four fields and a policy"
    lead: "Create a bucket and an IAM user with list, get and put access. Paste the access key, secret, region and bucket name into Settings, and monoscope checks the connection before it saves."
    bullets:
      - title: "Your keys, your rules"
        icon: eye
        body: "You control access, encryption and lifecycle in your own cloud account."
      - title: "Leave whenever you want"
        icon: arrow-right
        body: "Remove the bucket in Settings and monoscope stops writing to it. Everything already there stays."
      - title: "$199 a month"
        icon: dollar-sign
        body: "Cloud with your own bucket starts at $199 a month. Storage is billed by your cloud provider, to you."
    link: /docs/dashboard/settings-pages/s3-storage/
    link_label: "Setup guide"
faqs:
  - q: "Is this an export or a backup?"
    a: "Neither. Your bucket is where monoscope stores the project's data and where it reads it from. New events reach the Delta tables within minutes."
  - q: "Who pays for storage?"
    a: "You do, directly to AWS or whichever provider holds the bucket. The monoscope plan starts at $199 a month."
  - q: "What happens to my data if I cancel?"
    a: "It stays in your bucket as Delta Lake and Parquet. You can keep querying it with DuckDB or any Delta reader."
  - q: "Does it help with data residency?"
    a: "Yes. Pick the bucket's region and the data stays there. We'll also sign a GDPR data processing agreement. We don't have SOC 2 or ISO 27001 yet."
  - q: "Can I self-host instead?"
    a: "Yes. monoscope is open source under AGPL 3.0, and the Community Edition is free to run on your own servers."
related: [logs-and-traces, session-replay, error-tracking]
---
