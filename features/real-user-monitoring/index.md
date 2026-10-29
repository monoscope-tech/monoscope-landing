---
# Verified: RUM dashboard tabs Overview / Web Vitals / Errors / Audience / Application, P75 LCP/INP/CLS
# with ratings, vitals by page, audience by browser/OS/device (static/public/dashboards/rum.yaml, demo
# project); rage-click and dead-click issues (BackgroundJobs.detectFrontendIssues, Issues.FKRageClick/FKDeadClick);
# user feedback issues linked to the error on the same trace (BackgroundJobs.detectFeedback).
# Replay, trace propagation, masking, replaySampleRate and replay pricing are taken from features/session-replay.
# Ideal shot: the RUM dashboard Web Vitals tab; the metrics shot (browser.web_vital charts) stands in.
title: "Real user monitoring with the backend request behind each page"
description: "Real user monitoring: Core Web Vitals per page, browser errors, rage and dead clicks, and session replay, linked to the backend request and its trace."
eyebrow: Real user monitoring
tone: violet
h1: "Real user monitoring that reaches the backend"
pitch: "See how fast each page loads for real users, which browsers hit errors and where they rage-click. Each page links to the API requests behind it, so the AI SRE reads what the server received."
playground: rum/sessions
hero_demo: /assets/demos/replay-b.html
hero_shot: session-replay
hero_frame: "app.monoscope.tech / real user monitoring"
art: page-real-user-monitoring.webp
sections:
  - id: vitals
    icon: activity
    tone: violet
    eyebrow: "Page performance"
    title: "Core Web Vitals for every page"
    lead: "A Real User Monitoring dashboard shows sessions, page views, browser errors and P75 page load. The Web Vitals tab rates LCP, INP and CLS at P75 for each page as good, needs improvement or poor."
    shot: metrics
    frame: "app.monoscope.tech / metrics"
    bullets:
      - title: "Vitals by page"
        icon: layout
        body: "LCP, INP and CLS per page with the sample count, so a slow checkout doesn't hide behind a fast homepage."
      - title: "P75 over time"
        icon: chart-line
        body: "Watch a vital move after a release, and open the Explorer query behind any chart."
      - title: "Top pages"
        icon: bar-chart
        body: "Views and P75 load time for each page, sorted by traffic."
    link: /docs/sdks/Javascript/browser/
    link_label: "Add the browser SDK"
  - id: frustration
    icon: bug
    tone: warning
    eyebrow: "Errors and frustration"
    title: "Browser errors, rage clicks and dead clicks become issues"
    lead: "Three or more clicks on one element within two seconds opens a rage-click issue. A click that changes nothing opens a dead-click issue. Browser errors are grouped with the sessions and users they hit."
    shot: issues
    frame: "app.monoscope.tech / issues"
    bullets:
      - title: "Affected sessions and users"
        icon: users
        body: "Each browser error shows how many sessions and identified users it reached, and when it was last seen."
      - title: "Feedback with the error"
        icon: mail
        body: "Feedback your app records opens an issue, linked to the error on the same trace."
      - title: "Alerts where you work"
        icon: radio
        body: "Frontend issues go to Slack, Discord, PagerDuty or email like any other issue."
    link: /features/error-tracking/
    link_label: "How issues work"
  - id: backend
    icon: align-left
    tone: brand
    eyebrow: "The request behind it"
    title: "From the slow page to the slow request"
    lead: "The browser SDK propagates the trace to your API, so a page view, the fetch it made and the request your server handled share one trace, with the request and response bodies."
    code_label: "Browser SDK · propagate the trace to your API"
    code_class: language-js
    code: |
      import Monoscope from "@monoscopetech/browser";

      const monoscope = new Monoscope({
        apiKey: "YOUR_API_KEY",
        serviceName: "web-checkout",
        propagateTraceHeaderCorsUrls: [/^https:\/\/api\.example\.com/],
      });
    bullets:
      - title: "One trace, browser to database"
        icon: activity
        body: "The click, the fetch, the API handler, the SQL query and the supplier call, in one waterfall."
      - title: "Replay the session"
        icon: circle-play
        body: "Watch what the user saw at the moment of the error, with the console in sync."
      - title: "Who it happened to"
        icon: users
        body: "Call setUser and sessions carry the user's ID and email, so you can answer the support ticket."
    link: /features/session-replay/
    link_label: "Session replay"
  - id: audience
    icon: monitor
    tone: violet
    eyebrow: "Audience"
    title: "Which browsers, systems and devices it breaks for"
    lead: "Break sessions down by browser, operating system and device, with the error rate for each. Save a filter such as Safari on iOS, sessions with errors, and reopen it in one click."
    bullets:
      - title: "Session error rate"
        icon: pie-chart
        body: "The share of sessions with an error, overall and per browser, OS and device."
      - title: "Masked by default"
        icon: eye
        body: "Inputs are masked in the browser before anything is sent."
      - title: "Priced per event and replay"
        icon: dollar-sign
        body: "Page views and errors count as events. Cloud includes 2,000 replays a month, then $1 per 1,000."
    link: /pricing/
    link_label: "See pricing"
faqs:
  - q: "What do I need to install?"
    a: "The monoscope browser SDK in your web app. It sends page views, Web Vitals, errors and session replays. Your backend can use any OpenTelemetry SDK."
  - q: "Does it slow my site down?"
    a: "The SDK sends data in batches. Lower replaySampleRate if you only want replays for a share of sessions; page views, vitals and errors are recorded either way."
  - q: "Is this the same as session replay?"
    a: "Replay is one part. Real user monitoring adds Web Vitals, page performance, browser errors, rage and dead clicks, and audience breakdowns."
related: [session-replay, error-tracking, apm]
---
