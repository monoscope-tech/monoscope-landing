---
# NOTE: The RUM chapter has no shot (none in the W1 list).
# UNVERIFIED: the replay player has a console panel but no network panel; the link to the failing request goes through the trace (Issues page, Explorer), not a request list inside the player.
title: "Session replay linked to the request that failed"
description: "Watch what the customer saw, then open the API request behind the error. Session replay, Web Vitals and browser errors, with the backend trace."
eyebrow: "Session replay"
tone: violet
h1: "The customer’s screen, and the request behind it"
pitch: "Replay the customer's screen at the moment it broke, with the error toast and the console. One click takes you to the backend request and its trace."
playground: rum/sessions
hero_demo: /assets/demos/replay-b.html
hero_frame: "app.monoscope.tech / session replay"
art: page-session-replay.webp
sections:
  - id: replay
    icon: circle-play
    tone: violet
    eyebrow: "What they saw"
    title: "Stop asking customers for screenshots"
    lead: "“The payment page kept spinning.” Open the session replay and watch it: the click, the spinner, the error toast. Errors and page changes are marked on the timeline, so you skip to the moment it broke."
    shot: session-replay
    frame: "app.monoscope.tech / session replay"
    bullets:
      - title: "Errors on the timeline"
        icon: bug
        body: "Errors and warnings are ticks on the scrubber. Page navigations are marked below them."
      - title: "The console, in sync"
        icon: code
        body: "Console messages and stack traces play alongside the recording."
      - title: "Link to the moment"
        icon: link
        body: "Copy a link that opens the replay at the exact second, for the ticket or the postmortem."
    link: /docs/sdks/Javascript/browser/
    link_label: "Add the browser SDK"
  - id: request
    icon: align-left
    tone: brand
    eyebrow: "The request behind it"
    title: "From the screen to the server in one click"
    lead: "The browser SDK propagates the trace to your API, so the browser's call and the request your server handled share one trace. An issue opens with the replay of the session that hit it."
    bullets:
      - title: "Replay on the issue"
        icon: bug
        body: "An error in your backend shows the customer's session right next to the stack trace."
      - title: "The body that caused it"
        icon: align-left
        body: "Follow the trace to the request and response bodies your server and its suppliers saw."
      - title: "Who it happened to"
        icon: users
        body: "Call setUser in the SDK and replays carry the user's ID and email."
    code_label: "Browser SDK · propagate the trace to your API"
    code_class: language-js
    code: |
      import Monoscope from "@monoscopetech/browser";

      const monoscope = new Monoscope({
        apiKey: "YOUR_API_KEY",
        serviceName: "web-checkout",
        propagateTraceHeaderCorsUrls: [/^https:\/\/api\.example\.com/],
      });
    link: /features/error-tracking/
    link_label: "See error tracking"
  - id: rum
    icon: monitor
    tone: violet
    eyebrow: "Real user monitoring"
    title: "Which browsers, pages and users it breaks for"
    lead: "A RUM dashboard shows page views, browser errors and Core Web Vitals at P75. Break the audience down by browser, operating system and device to see where the error rate is."
    frame: "app.monoscope.tech / rum"
    bullets:
      - title: "Core Web Vitals per page"
        icon: activity
        body: "LCP, INP and CLS at P75 for every page, each rated good, needs improvement or poor."
      - title: "Audience breakdowns"
        icon: pie-chart
        body: "Share of sessions and error rate for each browser, OS and device, plus the identified users who hit errors."
      - title: "Saved segments"
        icon: star
        body: "Save a filter like “Safari on iOS, sessions with errors” and reopen it with one click."
    link: /docs/sdks/Javascript/browser/
    link_label: "Set up RUM"
  - id: privacy
    icon: eye
    tone: success
    eyebrow: "Privacy and price"
    title: "Masked by default, priced per replay"
    lead: "Inputs are masked before anything leaves the browser. You choose what share of sessions to record, and you pay for the replays you keep."
    bullets:
      - title: "Inputs masked"
        icon: eye
        body: "Sensitive form fields are masked in the browser, before the recording is sent."
      - title: "Record a sample, or all of it"
        icon: radio
        body: "Set replaySampleRate from 0 to 1. Traces and errors are recorded either way."
      - title: "2,000 replays included"
        icon: dollar-sign
        body: "Cloud includes 2,000 session replays a month, then $1 per 1,000."
    link: /pricing/
    link_label: "See pricing"
faqs:
  - q: "Does session replay slow down my site?"
    a: "The SDK records DOM changes with rrweb and sends them in batches. Lower replaySampleRate if you only need a share of sessions."
  - q: "Can I keep replays in my own bucket?"
    a: "Yes. On the own-bucket plan, replays are written to your S3 bucket as rrweb JSON, next to your logs and traces."
  - q: "Do I need the browser SDK for the RUM dashboard?"
    a: "Yes. The browser SDK sends page views, Web Vitals, errors and replays. Your backend can use any OpenTelemetry SDK."
  - q: "How is this different from setUser and setTenant on the server?"
    a: "Those attach a user and tenant to backend request spans. Session replay records the browser. Use both, and a replay and the requests it made carry the same user."
related: [error-tracking, logs-and-traces, byob-s3]
---
