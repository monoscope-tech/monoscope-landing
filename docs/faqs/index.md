---
title: FAQs
date: 2024-04-22
updatedDate: 2026-10-29
faLogo: question
menuWeight: 7
hideFileTree: true
hideToc: true
hideFromNav: true
faqs:
  - q: Which languages and frameworks are supported?
    a: monoscope receives OpenTelemetry data, so any language with an OpenTelemetry SDK can send logs, traces and metrics. We have guides for Node.js, Python, Go, Java, PHP, .NET, Elixir, Flutter and the browser, and for Docker, Kubernetes and Linux hosts. See the <a href="/docs/sdks/">SDK guides</a>. If your stack is missing, email <a href="mailto:hello@monoscope.tech">hello@monoscope.tech</a>.
  - q: Can I keep my data in my own infrastructure?
    a: Yes, in two ways. On monoscope Cloud, you can connect your own S3 bucket and monoscope stores all project data there, in open Delta Lake and Parquet files. See <a href="/docs/dashboard/settings-pages/s3-storage/">Storage</a>. Or you can self-host monoscope. It is open source under the AGPL-3.0 license. See the <a href="https://github.com/monoscope-tech/monoscope" target="_blank" rel="noopener noreferrer">GitHub repository</a>.
  - q: Do request and response bodies cost extra?
    a: No. Request and response bodies do not add to the price. See <a href="/pricing/">pricing</a>.
  - q: Is there a free plan?
    a: Yes. The free plan includes 10,000 events a day. The Cloud plan is $29 a month with 20 million events included, then $1 for each additional million. See <a href="/pricing/">pricing</a>.
  - q: Will monoscope slow down my application?
    a: The OpenTelemetry SDKs send data in batches in the background, so they do not wait for monoscope before they answer a request. The cost is small, but it is not zero. Measure it in your own service if latency is critical.
  - q: How do I keep sensitive data out of monoscope?
    a: Remove or mask sensitive fields in your application or in the OpenTelemetry Collector before data leaves your servers. Several SDKs have options to redact headers and body fields. See the guide for your <a href="/docs/sdks/">SDK</a>. To keep user names and emails out of Slack alerts, turn off <b>Include affected user identity in alerts</b> on the <a href="/docs/dashboard/settings-pages/integrations/">Integrations</a> page.
  - q: Where is my data stored?
    a: monoscope Cloud stores data in the EU by default. If you connect your own S3 bucket, data is stored in your bucket, in the region that you choose.
  - q: Do you have SOC 2 or ISO 27001?
    a: Not yet. If you need a security review, email <a href="mailto:hello@monoscope.tech">hello@monoscope.tech</a>.
  - q: How is monoscope different from other observability tools?
    a: monoscope keeps every API request and response, yours and your suppliers', next to your logs, traces and metrics. When something breaks, its AI investigates with that evidence. See the <a href="/compare/">comparison pages</a>.
---

# Frequently Asked Questions

```=html
<section class="max-w-3xl not-prose">
  <div class="flex flex-col gap-3">
    {% for faq in this.frontmatter.faqs %}
    <details class="faq group border border-strokeWeak bg-bgRaised rounded-xl overflow-hidden">
      <summary class="flex gap-3 items-center w-full px-5 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-fillWeak transition-colors duration-150 font-medium text-textStrong">
        <i class="fa-solid fa-chevron-right text-iconNeutral text-xs transition-transform duration-150 group-open:rotate-90" aria-hidden="true"></i>
        {{ faq.q }}
      </summary>
      <div class="px-5 pb-5 pl-11 text-textWeak leading-relaxed faq-answer">{{ faq.a }}</div>
    </details>
    {% endfor %}
  </div>
</section>
```
