---
date: 2024-17-07
title: Why Choose monoscope?
description: There are many monitoring and observability platforms in the market today, each with its unique offerings. Here’s what monoscope does better and offers differently compared to a few of the others.
ogImage: https://raw.githubusercontent.com/monoscope/.github/main/images/compare-og.png
pages:
  - name: Datadog
    slug: /compare/datadog
    img: /assets/img/compare-logos/datadog.svg
  - name: Sentry
    slug: /compare/sentry
    img: /assets/img/compare-logos/sentry.svg
  - name: HoneyBadger
    slug: /compare/honeybadger
    img: /assets/img/compare-logos/honeybadger.svg
  - name: New Relic
    slug: /compare/newrelic
    img: /assets/img/compare-logos/newrelic.svg
  - name: Baselime
    slug: /compare/baselime
    img: /assets/img/compare-logos/baselime.svg
  - name: Bugsnag
    slug: /compare/bugsnag
    img: /assets/img/compare-logos/bugsnag.svg
  - name: Treblle
    slug: /compare/treblle
    img: /assets/img/compare-logos/treblle.svg
  - name: Axiom
    slug: /compare/axiom
    img: /assets/img/compare-logos/axiom.svg
---

```=html
<div class="w-full">
```

```=html
   <section class="mt-8 py-10 md:py-20">
      <div class="width-control px-2 mx-auto flex flex-col items-center bg-[url('/assets/img/svgs/grid.svg')] dark:bg-none">
         <h1
            class="text-center mt-[20px] text-4xl md:text-6xl tracking-tight sm:leading-normal font-bold dark:text-white ">
            Why Choose monoscope?
         </h1>
         <p
            class="mt-8 text-gray-700 dark:text-inherit text-[26px] tracking-tight leading-normal max-w-[800px]  text-center font-medium">
            There are many monitoring and observability platforms in the market today, each with its unique offerings. Here’s what monoscope does better and offers differently compared to a few of the others.
         <p>
         <div class="mt-[30px] flex items-center gap-4 text-center">
            <a href="https://app.monoscope.tech" class="btn py-3 px-6 bg-fillBrand-strong text-textInverse-strong rounded-lg font-medium hover:bg-fillBrand-weak transition-colors sm:w-56">GET STARTED <i class="fa-solid fa-angle-right ml-5"></i></a>
            <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" class="btn btn-outline btn-neutral sm:w-56">BOOK A CALL <span class="text-xs">- for free</span></a>
         </div>
      </div>
      <hr class="mt-12 w-full" />
   </section>
```

```=html
   <div class="w-full width-control mx-auto px-2">
      <div class="w-full flex flex-col items-center text-center">
         <p class="max-w-[400px] md:max-w-[800px] lg:max-w-[800px] text-lg prose">
         <span class="mb-3">For a start, monoscope is an <span class="bg-blue-500 text-white border border-none rounded-xl px-2 py-0.5">API-first monitoring and observability platform</span>.</span>
         <br />
         <span>We track all the live users' requests that come in and out of your application (for both internal and external APIs in use) and analyze the requests to catch bugs and breaking changes, while also tracking all the errors and exceptions that happen while we are processing the requests.</span></p>
      </div>
   </div>
```

```=html
    <div class="width-control mx-auto px-2">
        <div class="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-28">
            {% for page in this.frontmatter.pages %}
                <a href="{{ page.slug }}" class="group rounded-2xl border p-6 flex flex-col items-center gap-6 text-left shadow-md duration-300 hover:-translate-y-3 bg-white dark:bg-white">
                    <img class="h-6" src="/assets/brand/logo_full_color.svg" alt="monoscope's logo" />

                    <span class="text-black dark:text-black">VS</span>

                    <img class="h-6" src="{{ page.img }}" alt="{{ page.name }}'s logo" />
                </a>
            {% endfor %}
        </div>
    </div>
```

```=html
   <div class="w-full my-12 width-control mx-auto px-2">
      <div class="w-full flex flex-col items-center text-center bg-blue-500 py-16 rounded-3xl gap-8">
         <p class="font-medium text-3xl text-white px-16 leading-normal">If you’re building an API-driven application on the web, mobile, IoT, etc., and you need to observe the API usage data from live users’ payload for any reason, then you should consider using monoscope.</p>
         <a href="https://app.monoscope.tech" class="btn btn-neutral sm:w-56 text-white">GET STARTED <i class="fa-solid fa-angle-right ml-5"></i></a>
      </div>
   </div>
```

```=html
   <div class="width-control mx-auto px-2">
      {% render "default/components/customers" %}
   </div>
```

```=html
</div>
```
