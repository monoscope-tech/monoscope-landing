---
title: "How Monoscope gave Platnova support and operations the visibility to investigate production issues without engineering"
featured_image: platnova-team.jpg
date: 2026-11-10T00:00:00+00:00
description: "With Monoscope, Platnova's support and operations teams can investigate failed API requests, identify affected customers, trace provider issues and answer questions that previously required engineering involvement."
author: anthony
categories:
  - Case Studies
---

![Platnova logo](./platnova-logo.png)

Platnova lets people pay bills, create virtual cards and send money across borders. These services rely on multiple third-party providers, which means a failure in one integration can quickly become a problem for customers and the teams supporting them.

> "Monoscope has freed us a lot of time to actually innovate and build our product in the long run."
>
> — Joshua, Co-founder and CTO, Platnova

## Before Monoscope: every production issue pulled engineers away from building

When a third-party provider failed or a payment didn't go through, the process was largely manual.

- Customers experienced failed transactions.
- Support received complaints and requests for answers.
- Operations needed to understand what was happening and which customers were affected.
- Engineers had to investigate logs, trace requests and identify where the failure occurred.

Even straightforward investigations could take two to three hours. Recurring bugs could require days of investigation and follow-up.

Sometimes customers reported issues hours after they had started. Other failures went unnoticed until someone investigated them.

For a growing fintech, this meant engineering time was regularly diverted from product development to investigating incidents and answering internal questions.

As Joshua explained:

> "When you're running a startup, you're constantly putting out fires whenever something goes wrong."

## How Platnova found Monoscope

Joshua discovered Monoscope through a post on X, at a time when the team was already considering building an internal logging solution.

They had previously used Google Cloud Logs and Datadog. But building their own system would also mean taking responsibility for managing the volume, scalability and cost of their data.

Monoscope offered an alternative: visibility into API requests and responses without having to build and maintain the infrastructure themselves.

Engineers started using it to investigate issues. Before long, operations, support and the mobile team had also adopted it.

## What changed: production investigations no longer stop at engineering

### 1. Support and operations can investigate issues independently

Previously, when a customer reported a failed transaction, support often had to rely on engineering to understand what happened.

With Monoscope, they can access the underlying request data themselves:

- Find a request using a customer's user ID.
- Inspect what the customer sent and what the backend returned.
- Identify where a request failed.
- Determine whether an external provider was responsible.

This gives support and operations the information they need to investigate issues and respond to customers without waiting for an engineer to dig through logs.

As Joshua put it:

> "If a bug occurs, in most cases our support can handle it. Most cases, operations can handle it. We don't need to involve the engineering team."

Engineers can spend less time answering routine investigation requests and more time building the product.

### 2. Platnova knows exactly which customers are affected

Not every production issue affects every customer.

If a particular integration or feature stops working, Monoscope helps Platnova identify the users whose requests were affected.

Support and operations can then:

- Identify the affected customers.
- Contact them with relevant updates.
- Let them know when an issue is being addressed.
- Follow up once the problem is resolved.

Instead of sending blanket outage notifications, Platnova can communicate with the customers who actually experienced the problem.

That means more relevant customer communication and less unnecessary alarm.

### 3. Operations can identify failing providers and act faster

Platnova depends on multiple third-party providers to deliver its services. When one of those providers experiences an issue, knowing which integration is responsible matters.

Monoscope gives the team visibility into the requests and responses involved, helping operations identify which provider is failing.

For example, if the provider responsible for virtual card creation becomes unavailable, the team can identify the affected integration and, where appropriate, switch to an alternative provider while the underlying issue is investigated.

Operations no longer has to wait for engineering to establish what is happening before making informed decisions.

### 4. The mobile team can catch breaking API changes earlier

Monoscope has also become part of how Platnova's backend and mobile teams coordinate changes.

The mobile team receives notifications when an API endpoint's response structure or data types change.

Developers can then inspect what changed and assess whether it could affect existing versions of the mobile app.

This is important because an API can continue responding successfully while still breaking the experience for mobile users. For example, if an app expects a particular field and the backend changes its response structure, the affected screen may stop displaying the correct information.

By making these changes visible earlier, Monoscope helps the team identify potential compatibility issues before customers start reporting them.

## The result: less time investigating, more time building

Monoscope has changed how Platnova handles production issues, giving more people across the business access to the information they need.

**Before Monoscope**

- Routine production issues required engineering involvement.
- Investigations could take two to three hours.
- Support and operations depended on engineers for answers.
- Some customer-impacting issues went unnoticed until reported.

**With Monoscope**

- Support and operations can investigate failed requests themselves.
- Teams can identify affected customers and communicate directly with them.
- Operations can identify failing third-party integrations.
- The mobile team gets visibility into potentially breaking API changes.
- Engineers have more time to focus on product development.

As Joshua shared, the biggest difference has been the time Monoscope gives the team back to focus on innovation rather than constantly responding to production issues.

## About Platnova

Platnova is a financial services and lifestyle platform offering virtual cards, international payments, bill payments and gift cards. The company is also building a business offering that enables other fintech products to leverage parts of its platform.

## Give your entire team better visibility into production issues

When production breaks, engineers shouldn't be the only people who can find out what happened.

Monoscope brings API requests and responses together, helping engineering, support and operations investigate issues, understand failures and get answers faster.

**Start your free trial:** [https://monoscopehq.com/](https://monoscopehq.com/)
