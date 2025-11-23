---
title: Events
date: 2024-06-06
ogImage: https://raw.githubusercontent.com/monoscope/.github/main/images/events-og.png
pages:
  - title: API Conference 2024
    slug: /events/apiconf24
    date: 20th July, 2024
    location: Lagos, Nigeria
    upcoming: true
  - title: Backend Performance and Error Monitoring with monoscope
    slug: /events/webinar-ii
    date: 28th June, 2024
    location: Virtual Webinar
    upcoming: true
  - title: Big Sky Dev Con 2024
    slug: /events/bigskydevcon24
    date: 8th June, 2024
    location: Montana, USA
    upcoming: false
  - title: "Building Resilient Backend System: Navigating Challenges with Integration"
    slug: /events/webinar-i
    date: 29th March, 2024
    location: Virtual Webinar
    upcoming: false
---

```=html
<div class="w-full">
    <header class="w-full mt-32">
        <div class="width-control mx-auto px-2">
            <div class="w-full flex flex-col items-center text-center gap-4">
                <h1 class="font-bold text-4xl text-[50px] dark:text-white">monoscope Events & Webinars</h1>
                <p class="max-w-[300px] md:max-w-[800px] lg:max-w-[800px] text-base-content font-medium text-base md:text-lg">Explore or come say hi at all events and webinars we're organizing or attending across the world.</p>
            </div>
        </div>
    </header>

    <div class="width-control mx-auto px-2">
        <section class="w-full grid md:grid-cols-2 lg:grid-cols-2 gap-8 py-24">
            {% for page in this.frontmatter.pages %}
                <a href="{{ page.slug }}"
                    class="group rounded-2xl border p-6 flex flex-col gap-6 text-left bg-base-100 shadow-md duration-300 hover:-translate-y-3">
                    <div class="flex flex-col gap-3 pb-1">
                        <h3 class="font-medium text-3xl">{{ page.title }}</h3>
                    </div>
                    <div class="text-base-content mt-auto">
                        <hr />
                        <ul class="flex flex-col gap-3 text-sm font-medium mt-8">
                            <li class="flex flex-row gap-2">
                                <span class="inline-block">
                                    <i class="fa-regular fa-calendar-days h-5 w-5 text-blue-600"></i>
                                    {{page.date}}.
                                </span>
                            </li>
                            <li class="flex flex-row gap-2">
                                <span class="inline-block">
                                    <i class="fa-regular fa-location-dot h-5 w-5 text-blue-600"></i>
                                    {{page.location}}.
                                </span>
                            </li>
                        </ul>
                    </div>
                </a>
            {% endfor %}
        </section>

        <section class="w-full pb-8">
                <div class="width-control w-full mx-auto mt-[54px] py-12 relative text-center">
                    <p class="text-xl pb-8">Trusted by 3000+ Developers at Companies Like:</p>
                    <div class="flex gap-6  w-full justify-center flex-wrap items-center *:brightness-0 *:dark:invert">
                        <img src="/assets/img/c1.png" alt="Andela Logo" class="h-5 sm:h-8">
                        <img src="/assets/img/c2.png" alt="Thepeer Logo" class="h-5 sm:h-8">
                        <img src="/assets/img/c3.png" alt="Grovepay Logo" class="h-5 sm:h-8">
                        <img src="/assets/img/c4.png" alt="Same Day Customs Logo" class="h-5 sm:h-8">
                        <img src="/assets/img/customers/platnova.png" alt="Platnova Logo" class="h-5 sm:h-8">
                        <img src="/assets/img/customers/payfonte.svg" alt="Payfonte Logo" class="h-5 sm:h-8">
                    </div>
                </div>
        </section>
    </div>
    
</div>
```

</section>
