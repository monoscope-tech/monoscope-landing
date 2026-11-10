---
title: "How Platnova gave support and operations more control over production issues with Monoscope"
description: "How Platnova's support and operations teams use Monoscope request-level evidence to investigate issues, contact affected customers and respond to provider failures without pulling in engineering."
date: 2026-11-10
category: case-studies
---

> “Monoscope has freed us a lot of time to actually innovate and build our product in the long run.”

> — Joshua, Co-founder and CTO, Platnova

## The challenge: When every incident became an engineering problem
Platnova is building a financial services and lifestyle platform that helps customers make payments, create virtual cards, pay bills and access services across borders. Its product relies on multiple third-party providers to deliver these services.

When one of those providers experiences an outage, the impact can spread quickly. Payments may fail, customers contact support, and operations need to understand what is happening — often before engineering has identified the cause.

Before Monoscope, investigating these incidents meant searching through logs and tracing the sequence of events to determine where a request failed, which provider was responsible and which customers were affected.

The problem was not always straightforward. A customer might report an issue hours after it began, while other failures remained unnoticed in the background. With multiple providers involved, engineers had to work through the evidence to distinguish a problem within Platnova's own systems from one originating with an external provider.

The investigation could take two to three hours, and recurring bugs could consume an entire week of engineering time.

As Joshua, Platnova's co-founder and CTO, explained:

> “When you're running a startup, we have to be turning off fire, like extinguishing fire as if something happens.”

Platnova needed a way to make investigations more efficient without requiring an engineer to handle every issue.

## The solution: Making request-level visibility available beyond engineering
Joshua first discovered Monoscope through a post on X while Platnova was considering building a similar solution in-house.

The team had previously used Google Cloud logs and Datadog, but building and maintaining its own logging system introduced another challenge: managing the volume, scalability and cost of telemetry data.

Monoscope addressed the need for visibility into API requests and responses without Platnova having to build and maintain the entire system itself.

The team initially used Monoscope to investigate logs and understand what had gone wrong. Over time, its use expanded beyond engineering into a workflow that also involved operations, customer support and the mobile development team.

The change was significant: instead of treating every incident as an engineering task, Platnova could give the people closest to customers the evidence they needed to investigate and respond.

## The impact
### 1. Support and operations can handle more issues independently
Operations and customer support can use Monoscope to inspect requests, filter activity by user identifier and understand what happened during a transaction.

They can examine what the customer sent, what the backend returned, where a failure occurred and whether an external provider was involved.

This gives teams more context to resolve customer issues without waiting for engineering to investigate every case.

As Joshua described it:

> “If a bug occurs, in most cases our support can handle it. Most cases, operations can handle it. We don't need to involve the engineering team.”

For a growing fintech team, this means engineers can spend less time on routine investigations and more time building and improving the product.

### 2. Platnova can identify and communicate with affected customers
Monoscope also helps Platnova identify which users experienced a particular issue.

Rather than sending a blanket notification to everyone, operations can identify the affected users and work with support to contact them directly.

Platnova can inform those customers that the issue is being addressed and follow up when it has been resolved.

This is especially important for a product where different customers use different features and integrations. A failure affecting one service does not necessarily affect everyone.

As Joshua explained, notifying every customer that the application is down can create unnecessary concern for people who were never affected.

With better visibility, Platnova can make its communications more targeted and relevant.

### 3. Operations can respond when a provider fails
Platnova depends on multiple providers for parts of its financial services.

When a provider becomes unavailable, operations can use the information available in Monoscope to understand which integration is affected. For example, if a provider responsible for card creation is down, the team can switch to another provider where appropriate while the original issue is investigated.

This helps Platnova respond to provider-specific failures without making engineering the first stop for every operational decision.

### 4. Mobile and backend teams can spot potentially breaking API changes
Monoscope has also become part of the workflow between Platnova's backend and mobile development teams.

The mobile team can receive notifications when an endpoint's response structure or data types change. Developers can then investigate what changed and assess whether it could break existing mobile application versions.

This matters because a backend change can affect a mobile application even when the endpoint itself is still responding.

For example, if a mobile screen expects a particular field and the backend changes the response structure, the application may stop displaying information correctly. Visibility into the request and response helps the team investigate the change before it becomes a customer-reported problem.

This gives Platnova another way to identify potential issues proactively rather than relying on users to report broken functionality.

## From firefighting to building
For Platnova, the value of Monoscope extends beyond making logs easier to inspect. It has helped the team change how production issues are handled across the business.

Engineering is no longer required to investigate every customer issue. Operations and support can use request-level evidence to identify affected users, understand failures and coordinate responses. Meanwhile, the mobile team can use endpoint-change information to investigate potentially breaking changes.

The result is a workflow that gives different teams the visibility they need while allowing engineers to focus more of their time on product development.

As Joshua put it:

> “I think definitely that should be quite one of the key things about using [Monoscope].”

For a growing fintech company managing multiple integrations, that visibility helps turn production data into something the whole team can use — not just engineering.

## About Platnova
Platnova is a financial services and lifestyle platform offering features including virtual cards, international payments, bill payments and gift cards. The company is also developing its business offering to make elements of its platform available to other fintech products.

## See what Monoscope can help your team uncover
Monoscope brings API request and response data together with the context engineers need to investigate issues, understand changes and see what is happening across their systems.

**Start your free trial:** [https://monoscopehq.com/](https://monoscopehq.com/)
