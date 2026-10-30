# Newsletter: A shopper clicked Place Order (Kit)

| Field | Value |
|---|---|
| Subject | `[···] A shopper clicked Place Order` |
| Preview text | One error, three screens, one root cause. |
| From | Monoscope Team (as on the Jan and Mar 2026 sends) |
| Send | Weekday, around 12:00 CET. Jan 30 went out at 01:46 and got 5.6% opens; Mar 20 at 12:21 got 22.4%. |
| Before sending | Change the Kit footer from "© 2025" to "© 2026". |
| Blog copy | https://monoscope.tech/blog/a-shopper-clicked-place-order/ (`blog/a-shopper-clicked-place-order/`) |

Images are in `blog/a-shopper-clicked-place-order/`. Upload them into Kit, or use the
blog URLs below once the post is live. GIFs, not video: email clients don't play video.

---

![The issue page: the shopper's name and ID, the stack trace and the AI's likely cause](https://monoscope.tech/blog/a-shopper-clicked-place-order/cover.jpg)

Hi {{ subscriber.first_name | default: "there" }},

A shopper on our demo store clicked Place Order, and the page crashed:

`SyntaxError: Unexpected token 'I', "Internal S"... is not valid JSON`

Monoscope grouped it into one issue with the shopper's name and ID, the stack trace, and the 94 events that led up to it. The error is in the browser, but the bug isn't. Here is how we found it, using three screens from that issue.

**Session replay**

What the shopper saw: 15 seconds from the home page to the payment form, with the error marked on the timeline and in the console.

![Session replay ending at the error](https://monoscope.tech/blog/a-shopper-clicked-place-order/session-replay.gif)

**AI diagnosis**

Asked "What could cause this?", the AI read the issue and said the frontend was a symptom: an upstream service had returned a plain-text `Internal Server Error`, and the page tried to parse it as JSON.

![The AI's diagnosis](https://monoscope.tech/blog/a-shopper-clicked-place-order/ai-diagnosis.jpg)

**Trace**

The trace says which service. The click went through `POST /api/checkout` into the checkout service, which asked the shipping service for a quote and failed:

`shipping quote failure: failed POST to shipping service: Post "http://shipping:8080/get-quote": EOF`

The shipping service dropped the connection, checkout returned `INTERNAL`, and the browser received an error page instead of JSON.

![Trace with the failing checkout span and its error](https://monoscope.tech/blog/a-shopper-clicked-place-order/trace.jpg)

All three are on the issue page. [Open it yourself](https://app.monoscope.tech/p/00000000-0000-0000-0000-000000000000/issues/bf0881c3-cbe2-45f8-8975-66314a0fe1aa): the demo project needs no account.

New to Monoscope? We made a 100-second overview:

[![Watch: Monoscope in 100 seconds](https://monoscope.tech/blog/a-shopper-clicked-place-order/video.jpg)](https://www.youtube.com/watch?v=6kPSLUId8nw)

When a frontend error turns out to be a backend bug, how do you usually find out? Hit reply and tell me. I read every reply.

--

Anthony Alaribe (Cofounder, Monoscope)
