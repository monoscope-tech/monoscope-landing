---
title: S3 Storage Configuration
ogTitle: Configure Your Own S3 Bucket - Monoscope
date: 2026-01-26
updatedDate: 2026-01-26
menuWeight: 5
---

# S3 Storage Configuration

Connect your own S3 or S3-compatible storage bucket to store session replay data. This feature is available on the **Growth plan** ($199/month) and gives you complete control over your data storage location.

```=html
<hr />
```

## Why Use Your Own S3 Bucket?

- **Data Sovereignty**: Keep all data within your own infrastructure
- **Compliance**: Meet GDPR, HIPAA, and data residency requirements
- **Control**: Manage retention, encryption, and access policies yourself
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

Session replay data is stored as JSON files in your bucket:

- **File naming**: `{session-id}.json`
- **Content**: Array of rrweb events for session replay
- **Format**: Standard JSON, easily readable and exportable

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
