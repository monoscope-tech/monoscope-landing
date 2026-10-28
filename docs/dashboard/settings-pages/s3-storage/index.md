---
title: S3 Storage Configuration
ogTitle: Configure Your Own S3 Bucket - Monoscope
date: 2026-01-26
updatedDate: 2026-09-27
menuWeight: 5
---

# S3 Storage Configuration

Connect your own S3 or S3-compatible bucket and Monoscope uses it as the database for your project. Every request and response payload, log, span, metric and session replay is written to your bucket, and Monoscope queries it from there.

The data is stored as open [Delta Lake](https://delta.io/) tables of Parquet files. The bucket is yours: you control access, encryption and retention, and you can query the data directly with DuckDB, Spark, Polars or your own code.

This feature is available on the **Cloud + Your own S3** plan (from $199/month). See [pricing](/pricing/).

```=html
<hr />
```

## Why Use Your Own S3 Bucket?

- **Data Sovereignty**: Keep all data within your own infrastructure
- **Compliance**: Meet GDPR, HIPAA, and data residency requirements
- **Unlimited Retention**: Keep data as long as you need it, e.g. to settle a dispute with a supplier months later
- **Open Format**: Delta Lake and Parquet, readable by any tool that supports them. No export step and no lock-in
- **Build On It**: Power audit trails or activity dashboards for your own customers from the same data
- **Cost Optimization**: Use your existing storage infrastructure or preferred provider

## Supported Providers

Monoscope works with AWS S3 and any S3-compatible object storage:

- **AWS S3** (native support)
- **MinIO** (self-hosted)
- **DigitalOcean Spaces**
- **Cloudflare R2**
- **Backblaze B2**
- **Any S3-compatible storage**

## Required IAM Permissions

Create an IAM policy with the following permissions for your S3 bucket:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:CreateBucket"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```

Replace `your-bucket-name` with your actual bucket name.

## Configuration Fields

Navigate to **Settings** → **S3 Storage** in your project dashboard.

| Field | Required | Description |
|-------|----------|-------------|
| Access Key ID | Yes | Your AWS/S3 access key |
| Secret Access Key | Yes | Your AWS/S3 secret key |
| Region | Yes | S3 region (e.g., `us-east-1`, `eu-west-1`) |
| Bucket Name | Yes | Name of your S3 bucket |
| Custom Endpoint | No | Endpoint URL for S3-compatible providers |

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p>The <b>Custom Endpoint</b> field is only needed for non-AWS S3-compatible providers like MinIO or DigitalOcean Spaces.</p>
</div>
```

## Setup Guide for AWS S3

### Step 1: Create an S3 Bucket

1. Go to the [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Click **Create bucket**
3. Enter a unique bucket name
4. Select your preferred region
5. Keep other settings as default or configure as needed
6. Click **Create bucket**

### Step 2: Create an IAM User

1. Go to the [IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Users** → **Create user**
3. Enter a username (e.g., `monoscope-s3-user`)
4. Click **Next**
5. Select **Attach policies directly**
6. Click **Create policy** and paste the JSON policy above
7. Attach the policy to the user
8. Click **Create user**

### Step 3: Generate Access Keys

1. Select your newly created user
2. Go to **Security credentials** tab
3. Click **Create access key**
4. Select **Third-party service**
5. Copy the **Access Key ID** and **Secret Access Key**

```=html
<div class="callout">
  <i class="fa-solid fa-circle-exclamation"></i>
  <p><b>Important:</b> Store your secret access key securely. You won't be able to view it again after this step.</p>
</div>
```

### Step 4: Configure in Monoscope

1. Go to your project in Monoscope
2. Navigate to **Settings** → **S3 Storage**
3. Enter your credentials:
   - Access Key ID
   - Secret Access Key
   - Region (e.g., `us-east-1`)
   - Bucket Name
4. Click **Save**

Monoscope will validate the connection. If successful, you'll see a **Connected** status.

## Setup for Other Providers

### MinIO

For MinIO, use the **Custom Endpoint** field:

- **Endpoint**: Your MinIO server URL (e.g., `https://minio.example.com`)
- **Region**: Usually `us-east-1` (or as configured)
- **Access Key / Secret Key**: Your MinIO credentials

### DigitalOcean Spaces

- **Endpoint**: `https://<region>.digitaloceanspaces.com` (e.g., `https://nyc3.digitaloceanspaces.com`)
- **Region**: Your Spaces region (e.g., `nyc3`)
- **Access Key / Secret Key**: Generate from DigitalOcean API settings

### Cloudflare R2

- **Endpoint**: `https://<account-id>.r2.cloudflarestorage.com`
- **Region**: `auto`
- **Access Key / Secret Key**: Generate R2 API tokens in Cloudflare dashboard

## Data Storage Format

Logs, spans and API requests (including request and response payloads) are written to the `otel_logs_and_spans` Delta table. Metrics are written to `otel_metrics`. Both tables are partitioned by `project_id` and `date`:

```
s3://your-bucket/timefusion/otel_logs_and_spans/project_id=<project-id>/date=2026-09-27/*.parquet
s3://your-bucket/timefusion/otel_metrics/project_id=<project-id>/date=2026-09-27/*.parquet
```

Session replays are stored in the same bucket as JSON files (`{session-id}.json`), each containing an array of [rrweb](https://github.com/rrweb-io/rrweb) events.

```=html
<div class="callout">
  <i class="fa-solid fa-circle-info"></i>
  <p>Always filter on <code>project_id</code> and <code>date</code>. They are the partition columns, so filtering on them lets the query skip every file outside that range.</p>
</div>
```

## Query Your Data With DuckDB

Because the tables are standard Delta Lake, [DuckDB](https://duckdb.org/)'s `delta` extension reads them with default settings. Run `duckdb` and load your AWS credentials:

```sql
INSTALL delta;
LOAD delta;
CREATE SECRET (TYPE s3, PROVIDER credential_chain);
```

Count server errors per route over the last 7 days:

```sql
SELECT attributes___http___route AS route,
       count(*) AS errors
FROM delta_scan('s3://your-bucket/timefusion/otel_logs_and_spans')
WHERE project_id = '<project-id>'
  AND date >= current_date - 7
  AND attributes___http___response___status_code >= 500
GROUP BY route
ORDER BY errors DESC;
```

List every call your service made to a supplier's API on a given day, with the status code they returned. This is the record you need when a supplier acknowledged a request but never acted on it:

```sql
SELECT timestamp,
       attributes___http___request___method AS method,
       attributes___url___full AS url,
       attributes___http___response___status_code AS status
FROM delta_scan('s3://your-bucket/timefusion/otel_logs_and_spans')
WHERE project_id = '<project-id>'
  AND date = DATE '2026-09-27'
  AND attributes___server___address = 'api.supplier.com'
ORDER BY timestamp;
```

The same tables work with any Delta Lake reader, such as Spark, Polars, `delta-rs` for Python and Rust, or Trino.

## Connection Status

After saving your configuration, Monoscope validates the connection by checking if the bucket exists. The status indicator shows:

- **Connected**: Bucket is accessible and ready to use
- **Not connected**: Check your credentials or bucket permissions

## Removing S3 Configuration

To revert to Monoscope's default storage:

1. Go to **Settings** → **S3 Storage**
2. Click **Remove S3 Configuration**
3. Confirm the removal

Your existing data in your S3 bucket will remain intact but Monoscope will stop writing new data there.

```=html
<hr />
<a href="/docs/dashboard/settings-pages/integrations/" class="w-full btn btn-outline link link-hover">
    Next: Integrations
    <i class="fa-regular fa-arrow-right mr-4"></i>
</a>
```
