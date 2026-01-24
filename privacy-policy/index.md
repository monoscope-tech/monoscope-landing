---
title: Privacy Policy
date: 2022-08-21
updatedDate: 2025-01-23
---

```=html
<section class="mt-8 sm:mt-32 px-6 md:px-12 lg:px-24">
  <div class="max-w-5xl space-y-6">
    <span class="inline-block text-textWeak uppercase tracking-wide text-xs font-semibold">Legal</span>
    <h1 class="text-[2.5rem] font-normal leading-tight">Privacy Policy</h1>
    <p class="text-lg text-textWeak">
      Last Updated: January 23, 2025
    </p>
  </div>
</section>

<section class="py-12 px-6 md:px-12 lg:px-24">
  <div class="max-w-5xl prose prose-lg">
```

Past 3 technologies UG ("Monoscope", "we", "us", or "our") operates the Monoscope observability platform and the website [monoscope.tech](https://monoscope.tech). This Privacy Policy explains how we collect, use, disclose, and protect your personal data.

For questions about this Privacy Policy, contact us at [hello@monoscope.tech](mailto:hello@monoscope.tech).

---

**Table of Contents**

1. [Scope and Data Roles](#scope-and-data-roles)
2. [Data We Collect](#data-we-collect)
3. [How We Use Your Data](#how-we-use-your-data)
4. [Customer Control Over Observability Data](#customer-control-over-observability-data)
5. [Legal Bases for Processing](#legal-bases-for-processing)
6. [Data Retention](#data-retention)
7. [Sub-processors and Data Sharing](#sub-processors-and-data-sharing)
8. [International Data Transfers](#international-data-transfers)
9. [Security Measures](#security-measures)
10. [Your Data Protection Rights (GDPR)](#your-data-protection-rights-gdpr)
11. [California Privacy Rights (CCPA)](#california-privacy-rights-ccpa)
12. [Cookies](#cookies)
13. [Children's Privacy](#childrens-privacy)
14. [Changes to This Policy](#changes-to-this-policy)
15. [Contact Us](#contact-us)

---

## Scope and Data Roles

This Privacy Policy covers three categories of data:

**Website Visitor Data** — When you visit monoscope.tech, we act as the **data controller** for information collected through cookies, analytics, and contact forms.

**Customer Account Data** — When you create a Monoscope account, we act as the **data controller** for your account information, billing details, and usage data.

**Observability Data** — When you use Monoscope to monitor your APIs and applications, we act as the **data processor** on your behalf. You (the customer) are the data controller for any personal data contained in API requests, logs, traces, and metrics sent through our platform. This data may include information about your end users.

For observability data, our Data Processing Agreement (DPA) governs how we process data on your behalf. Enterprise customers can request a DPA by contacting us.

---

## Data We Collect

### Website Visitors

When you visit our website, we collect:

- **Log data**: IP address, browser type, operating system, referring URLs, pages visited, and timestamps
- **Analytics data**: Usage patterns and interactions via Posthog
- **Contact information**: Name, email, and message content when you contact us or subscribe to our newsletter
- **Cookie data**: Preferences and session information

### Customer Accounts

When you register for Monoscope, we collect:

- **Account information**: Name, email address, company name
- **Billing information**: Payment details processed by Lemonsqueezy (we do not store full payment card numbers)
- **Team data**: Information about team members you invite
- **Project configuration**: API keys, project settings, alert configurations

### Observability Data (Processed on Your Behalf)

When you integrate Monoscope into your applications, the following data may be transmitted to our platform:

- **HTTP request/response data**: Headers, bodies, status codes, latency, and endpoints
- **Telemetry data**: Traces, spans, logs, and metrics (OpenTelemetry compatible)
- **Error data**: Stack traces, exception messages, and error context
- **Performance data**: Response times, throughput, and resource utilization

This data may contain personal information about your end users. You control what data is sent through our redaction and filtering features.

---

## How We Use Your Data

### Website and Account Data

We use this data to:

- Provide, operate, and improve our services
- Process payments and manage your account
- Send service notifications and updates
- Respond to support requests
- Analyze usage to improve our product
- Comply with legal obligations

### Observability Data

We process observability data solely to:

- Provide the monitoring, alerting, and analytics features you use
- Generate reports and dashboards you configure
- Detect anomalies and errors in your APIs
- Power AI-assisted insights when enabled

We do not use your observability data for advertising, profiling, or any purpose other than providing our services to you.

---

## Customer Control Over Observability Data

Monoscope provides extensive controls over what data is collected and how it's handled:

### Data Redaction

You can redact sensitive fields before data leaves your servers:

- **JSONPath-based redaction**: Specify fields like `$.password`, `$.credit_card.cvv`, or `$.users[*].email` to be redacted
- **Header redaction**: Remove sensitive headers like `Authorization`, `Cookie`, or custom API keys
- **Automatic redaction**: Fields named `password`, `api_key`, and similar are redacted by default

Redacted data appears as `[CLIENT_REDACTED]` and is never transmitted to Monoscope.

### Endpoint Filtering

Exclude specific routes from monitoring entirely (e.g., `/login`, `/payment`, `/health`).

### Capture Controls

Control what data is captured:

- Request/response bodies are optional (headers and metadata only by default)
- Per-request control via SDK configuration

### Deployment Options

Choose where your data is stored:

- **Cloud**: Hosted by Monoscope on EU infrastructure
- **Cloud + S3**: Data stored in your own S3-compatible storage
- **Self-hosted**: Run Monoscope on your own infrastructure with complete data control
- **Open source**: Community edition available for self-hosting

---

## Legal Bases for Processing

Under GDPR, we process personal data based on:

- **Contract performance**: To provide services you've purchased
- **Legitimate interests**: For security, fraud prevention, and service improvement
- **Consent**: For marketing communications and optional cookies
- **Legal obligations**: For tax records and regulatory compliance

---

## Data Retention

### Observability Data

Retention is configurable based on your plan:

- Data retention periods are set by you in your project settings
- When you delete data or close your account, it is removed from our systems within 30 days
- Backups are purged according to our backup rotation schedule

### Account Data

- Active accounts: Retained for the duration of your account
- Closed accounts: Deleted within 30 days, except where legally required

### Website Data

- Analytics: Retained according to Posthog's retention settings
- Contact form submissions: Retained until you request deletion

---

## Sub-processors and Data Sharing

We use the following sub-processors:

| Provider | Purpose | Location |
|----------|---------|----------|
| OVH Cloud | Infrastructure hosting | EU (Germany, France) |
| Posthog | Product analytics | EU/US |
| Cloudflare R2 | Object storage | Global (EU primary) |
| Lemonsqueezy | Payment processing | US |
| GitHub | Code hosting, issue tracking | US |

We will notify customers of material changes to sub-processors.

**We do not sell your personal data.** We only share data:

- With sub-processors as necessary to provide our services
- When required by law or valid legal process
- To protect our rights, safety, or property
- With your consent

---

## International Data Transfers

We are based in Germany and primarily process data within the European Union. When data is transferred outside the EEA:

- We use Standard Contractual Clauses (SCCs) approved by the European Commission
- We assess the data protection laws of the destination country
- We implement supplementary technical measures where necessary

---

## Security Measures

We implement appropriate technical and organizational measures:

**Technical measures:**
- Encryption in transit (TLS 1.2+) and at rest
- Access controls and authentication
- Regular security assessments
- Client-side redaction before data transmission
- Secure infrastructure on OVH Cloud

**Organizational measures:**
- Employee security training
- Access on a need-to-know basis
- Incident response procedures
- Regular security reviews

---

## Your Data Protection Rights (GDPR)

As a data subject in the EU, you have the right to:

- **Access**: Request a copy of your personal data
- **Rectification**: Correct inaccurate or incomplete data
- **Erasure**: Request deletion of your data ("right to be forgotten")
- **Restriction**: Limit how we process your data
- **Data portability**: Receive your data in a portable format
- **Object**: Object to processing based on legitimate interests
- **Withdraw consent**: Withdraw consent at any time (where processing is based on consent)

To exercise these rights, contact us at [hello@monoscope.tech](mailto:hello@monoscope.tech). We will respond within 30 days.

**For end-user data** processed through our platform: Since we act as a processor, end users should contact you (the customer) to exercise their rights. We will assist you in fulfilling these requests.

**Supervisory authority**: You have the right to lodge a complaint with a data protection authority. Our lead supervisory authority is the Berliner Beauftragte für Datenschutz und Informationsfreiheit (Berlin Commissioner for Data Protection and Freedom of Information).

---

## California Privacy Rights (CCPA)

If you are a California resident, you have the right to:

- **Know** what personal information we collect and how it's used
- **Request deletion** of your personal information
- **Non-discrimination** for exercising your privacy rights

**We do not sell personal information.** We do not share personal information for cross-context behavioral advertising.

To exercise your rights, contact us at [hello@monoscope.tech](mailto:hello@monoscope.tech).

---

## Cookies

We use cookies for:

- **Essential cookies**: Required for the website and application to function
- **Analytics cookies**: To understand how visitors use our site (Posthog)
- **Preference cookies**: To remember your settings

You can manage cookies through your browser settings. Disabling certain cookies may affect website functionality.

---

## Children's Privacy

Monoscope is not directed at children under 16 (or 13 in jurisdictions where applicable). We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, contact us and we will delete it.

---

## Changes to This Policy

We may update this Privacy Policy from time to time. Material changes will be communicated via email or a notice on our website. The "Last Updated" date at the top reflects the most recent revision.

---

## Contact Us

**Past 3 technologies UG**
Grüntaler str. 18
13357 Berlin
Germany

Email: [hello@monoscope.tech](mailto:hello@monoscope.tech)

For data protection inquiries, contact us at the email above. We aim to respond within 30 days.

```=html
  </div>
</section>
```
