---
title: FAQs
date: 2024-04-22
updatedDate: 2024-08-03
faLogo: question
menuWeight: 6
hideFileTree: true
hideToc: true
pageFullWidth: true
hideFromNav: true
faqs:
  - q: What programming languages are supported?
    a: We currently support 17+ web frameworks in different programming languages (Python, Golang, Javascript, PHP, C#, Java, etc.). If we don't support your framework, kindly email us at <a href="mailto:hello@monoscope.tech">hello@monoscope.tech</a> and we'll create an SDK for you ASAP!
  - q: Do my requests have to leave my server to monoscope servers?
    a: If you want to benefit from the API monitoring and the log explorer feature, yes. However, we offer an <a href="/pricing/">enterprise plan</a> that allows you to run monoscope on-prem (on your servers).
  - q: Will your SDKs slow down my backend?
    a: It depends. Most SDKs stream data asynchronously via Google PubSub, so your requests will see almost zero change in performance. However, if you use PHP you may pay a very tiny performance hit to send data to Google PubSub. This is because PHP doesn't support async workflows by default. But if you have the GRPC extension installed in your PHP environment, it will be used by PubSub to stream data asynchronously like in other languages. But this performance hit is barely noticeable and usually under 5ms added to every request.
  - q: How do you handle security and sensitive data?
    a: We take security seriously at monoscope. We employ encryption and authentication measures to ensure the security of your data during transmission and storage. All our SDKs also support redacting data. You can simply specify the JSONPath to the fields that you don't want the SDKs to forward to monoscope, and those sensitive fields will be stripped out/redacted before the data even leaves your servers and replaced with the text "[CLIENT REDACTED]" on our end. We will never see anything you don't want us to see.
  - q: I really love what you're doing. How can I show support?
    a: Give us a shout-out on X (Twitter), Discord, or any social media you use. We would also appreciate honest feedback about what we're building and suggestions for what functionality you would love to see next.
  - q: How are you different from other popular platforms?
    a: For a start, monoscope is an API-first monitoring and observability platform. We track all the live users' requests that come in and out of your application (for both internal and external APIs in use) and analyze the requests to catch bugs and breaking changes, while also tracking all the errors and exceptions that happen while we are processing the requests. Kindly explore our <a href="/compare/">comparison pages</a> to see how we stand out compared to different platforms.
---

# Frequently Asked Questions

```=html
<section class="max-w-4xl">
    <div class="flex flex-col gap-4">
        {% for faq in this.frontmatter.faqs %}
        <div class="border border-strokeWeak bg-bgRaised rounded-lg overflow-hidden">
            <button class="flex gap-3 items-center text-left w-full px-6 py-4 hover:bg-fillWeak transition-colors" onclick="toggleFaq(event)">
                <i class="fa-solid fa-chevron-right text-iconNeutral text-sm transition-transform"></i>
                <span class="font-medium text-textStrong">{{faq.q}}</span>
            </button>
            <div class="px-6 pb-4 pl-12 hidden faq-answer text-textWeak">
                {{faq.a}}
            </div>
        </div>
        {% endfor %}
    </div>
</section>

<script>
function toggleFaq(event) {
    const button = event.currentTarget;
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    answer.classList.toggle('hidden');
    icon.classList.toggle('fa-chevron-right');
    icon.classList.toggle('fa-chevron-down');
}
</script>
```
