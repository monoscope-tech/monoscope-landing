---
# UNVERIFIED:
# - Slack alerts carrying the failing request: commits dbac0717e / f001815ab improve "Slack alert
#   context"; I did not confirm the request itself (vs a link to it) is in the message. Copy says
#   "a link to the request that failed".
# - Session replay linked from an issue: claimed on the homepage; not checked in the demo project.
# - Crashes: verified for the Flutter SDK (Dart errors + native crash handlers, captureNativeCrashes)
#   and browser errors (Frontend issue type). No crash reporting found for native iOS/Android SDKs.
title: "Error tracking and monitoring with the request behind every error"
description: "Error tracking that keeps the exact request and response behind every error, crash and changed API response. Alerts in Slack, PagerDuty or email. Open source."
eyebrow: Error tracking
tone: warning
h1: "Error tracking with the request that caused it"
pitch: "Exceptions, crashes and changed API responses become grouped issues, each with the headers, body and response exactly as they were. You hear about it in Slack before a customer writes in."
playground: issues
hero_demo: /assets/demos/know-b.html
hero_frame: "app.monoscope.tech / issues"
art: page-issues.webp
sections:
  - id: request
    icon: align-left
    tone: warning
    eyebrow: "The exact request"
    title: "Debug from the request, not a reproduction"
    lead: "A stack trace tells you where it broke. The request tells you why. Every issue keeps the method, URL, headers, body and the response you sent back, next to the trace and the logs from that same request."
    shot: issue-detail
    frame: "app.monoscope.tech / issues"
    bullets:
      - title: "Request and response, as sent"
        icon: code
        body: "The payload that broke the handler, as your app received it. Fields you mark as sensitive are redacted in your app before they're sent."
      - title: "The trace and logs around it"
        icon: activity
        body: "One click to the full trace, the database calls, the outgoing calls to suppliers and every log line from that request."
      - title: "What the customer saw"
        icon: circle-play
        body: "If the error came from a browser or Flutter app with replay on, open the session and scrub to the click that fired the request."
    link: /docs/dashboard/dashboard-pages/issues/
    link_label: "How error tracking works"
  - id: detect
    icon: eye
    tone: warning
    eyebrow: "No rules to write"
    title: "Flags what's new the first time it happens"
    lead: "monoscope learns the shape of your traffic. A new exception, a new endpoint, a field that disappears from a response or a log message that suddenly spikes becomes an issue without a monitor behind it."
    shot: issues
    frame: "app.monoscope.tech / issues"
    bullets:
      - title: "New errors and crashes"
        icon: bug
        body: "Server exceptions, browser errors, and Dart and native crashes from Flutter apps, each grouped by fingerprint."
      - title: "Responses that changed shape"
        icon: plug
        body: "A field added, removed or retyped, in an API you serve or one you call. Rated breaking, incremental or safe."
      - title: "New log patterns and spikes"
        icon: align-left
        body: "Log lines are clustered into patterns. A pattern you've never seen, or one whose rate jumps, opens an issue."
      - title: "One issue per problem"
        icon: grid
        body: "The same bug hitting thousands of requests is one issue with a count. A monitor that fires again reopens its old issue."
  - id: alerts
    icon: radio
    tone: warning
    eyebrow: "Alerts"
    title: "The alert arrives before the support ticket"
    lead: "Issues go to the team that owns them, in Slack, Discord, PagerDuty or email, with a link to the request that failed. Reply in the Slack thread and the AI investigates from there."
    shot: monitors
    frame: "app.monoscope.tech / monitors"
    bullets:
      - title: "Routed by team"
        icon: users
        body: "Each team has its own Slack channels, PagerDuty services and email list. Mute a channel without losing the others."
      - title: "Monitors on any query"
        icon: bar-chart
        body: "Alert on a log query or a dashboard widget, with warning and alert thresholds, a sustain window and a recovery level."
      - title: "Acknowledge, snooze, archive"
        icon: mail
        body: "An acknowledged issue stays quiet. Repeat notifications follow the interval you set, and stop after the count you choose."
    link: /features/ai-sre/
    link_label: "What the AI does with an issue"
faqs:
  - q: "How is this different from Sentry?"
    a: "Sentry shows the exception and the trace. monoscope also keeps the request and response bodies of the call that failed, including calls you made to suppliers, and flags API responses that changed shape even when nothing threw."
  - q: "Which languages are supported?"
    a: "Any OpenTelemetry SDK sends errors, traces and logs. Our SDKs for Node.js, Python, Go, PHP, Java, .NET and Elixir also capture request and response bodies. Browser and Flutter SDKs add frontend errors, crashes and session replay."
  - q: "How do I keep passwords and tokens out of it?"
    a: "List the headers and JSON paths to redact, such as $.password, in the SDK config. They're removed in your app before any data leaves it."
  - q: "Is anything sampled?"
    a: "Not on Cloud: every request, log and span you send is kept for 30 days. The free plan covers 10k events a day."
  - q: "Can I self-host it, like Sentry?"
    a: "Yes. monoscope is open source under AGPL. Run it on your own servers, or use monoscope Cloud in the US or EU."
  - q: "Can I run it next to my current error tracker?"
    a: "Yes. Run both for a week or two and compare which errors and API changes each one catches."
related: [ai-sre, api-monitoring, session-replay]
---
