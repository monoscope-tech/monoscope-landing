---
title: Pricing
date: 2022-03-23
updatedDate: 2024-06-15
enableFreeTier: false
faqs:
  - q: What's included in the free tier?
    a: The free tier includes 10,000 events per day, unlimited team members, 30 days data retention, and access to all core features including logs, traces, API documentation, and custom monitors. Perfect for hobby projects and getting started.
  - q: How does pricing scale with usage?
    a: After the free tier, you pay $29/month for up to 20M events, then $2 per million events after that. For example, 50M events/month costs $89 ($29 base + $60 for 30M extra events). With Cloud + S3, it's $199/month for up to 100M events, then $2 per million events after that, plus you get unlimited data retention.
  - q: What's the difference between deployment options?
    a: <strong>Cloud:</strong> Fully managed, 30-day retention, starts free. <strong>Cloud + S3:</strong> Your data in your own S3 bucket, unlimited retention, starts at $199/month. <strong>Self-hosted:</strong> Run on your servers, complete control, free community edition or custom enterprise pricing.
  - q: Can I switch between plans?
    a: Yes! You can upgrade or switch deployment options anytime. Moving from Cloud to Cloud + S3 is seamless—we'll help migrate your historical data. For self-hosted, our team provides migration assistance.
  - q: What counts as an event?
    a: An event includes API requests, log entries, traces, spans, and metric data points. We count all telemetry data processed by Monoscope. Unlike competitors, we never sample or drop your data—every event is stored and searchable.
  - q: Do you offer volume discounts?
    a: Yes, we offer custom pricing for high-volume usage (typically above 1 billion events/month). Contact our sales team at <a href="mailto:hello@monoscope.tech" class="text-textBrand">hello@monoscope.tech</a> to discuss your specific needs.
---

```=html
<div class="w-full">
    <header class="w-full mt-32">
        <div class="max-w-8xl mx-auto px-3">
            <div class="w-full flex flex-col items-center text-center gap-5 text-textWeak">
                <h1 class="text-4xl leading-tight font-normal text-textStrong">Flexible pricing <span class="text-textDisabled">for every company</span></h1>
                <p class="text-2xl leading-normal">Regardless of your company's size or compliance requirements, monoscope operates <br/>within your business and regulatory constraints.</p>
                <br/><br/>
            </div>
        </div>
    </header>
    <div class="max-w-8xl mx-auto px-3">
        <section class="w-full grid grid-cols-1 md:grid-cols-3 gap-8 pt-5 pb-12">

            <!-- MONOSCOPE CLOUD -->
            <div class="rounded-xl border border-strokeBrand-weak p-8 flex flex-col">
                <div class="inline-block p-3 bg-fillBrand-weak rounded-full w-fit"><svg class="w-5 h-5 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#cloud"></use></svg></div>
                <div class="mt-8 mb-6">
                    <p class="text-sm font-medium text-textDisabled dark:text-textWeak uppercase tracking-wide">MONOSCOPE CLOUD</p>
                    <h3 class="text-2xl font-semibold text-textStrong">Bring nothing</h3>
                </div>

                <ul class="space-y-3 text-lg mb-8 flex-1 list-disc list-inside marker:text-iconBrand">
                    <li>Fully managed cloud service</li>
                    <li><strong>Predictable usage-based</strong> pricing</li>
                    <li>Intelligent incident alerts</li>
                    <li>Query your data in english</li>
                    <li><strong>30 days data retention</strong> included</li>
                </ul>

                <div class="mb-8">
                    <p class="text-sm text-textDisabled mb-2">Estimate your monthly cost</p>
                    <input type="range" min="0" max="495000000" step="10000000" value="0" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range" id="cloud_price_range">
                    <div class="flex justify-between text-sm text-textWeak mt-1">
                        <span>Free</span>
                        <span>250M</span>
                        <span>500M events</span>
                    </div>
                </div>

                <div class="border-t border-strokeWeak pt-6 space-y-4">
                    <div class="space-y-2">
                        <p class="text-sm text-textDisabled uppercase tracking-wide">Pricing</p>
                         {% if this.frontmatter.enableFreeTier %}
                             <p class="text-2xl font-semibold text-textStrong">
                            <span id="cloud_price">Free</span> <span class="text-base font-normal text-textWeak" id="cloud_price_desc">up to 10k events/day</span>
                            </p>
                              <p class="text-base text-textWeak">Then <strong class="text-textStrong">$29/month</strong> for up to 20M events, + <strong class="text-textStrong">$2 per 1M events</strong> after</p>
                         {% else %}
                            <p class="text-base text-textWeak"><strong class="text-textStrong text-2xl">$29</strong>/month for up to 20M events, + <strong class="text-textStrong">$2 per 1M events</strong> after</p>
                        {% endif %}

                    </div>
                    <a href="https://app.monoscope.tech" class="block text-center py-3 px-6 bg-fillBrand-strong text-textInverse-strong rounded-lg font-medium hover:bg-fillBrand-weak transition-colors">Start free trial</a>
                </div>
            </div>


           <!-- CLOUD + S3 PLAN -->
            <div class="rounded-xl border-2 border-strokeBrand-strong bg-fillBrand-weak p-8 flex flex-col relative">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-fillBrand-strong text-textInverse-strong px-4 py-1 rounded-full text-sm font-medium">POPULAR</div>
                <div class="inline-block p-3 bg-fillBrand-weak rounded-full w-fit"><svg class="w-5 h-5 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#database"></use></svg></div>
                <div class="mt-8 mb-6">
                    <p class="text-sm font-medium text-textDisabled dark:text-textWeak uppercase tracking-wide">MONOSCOPE CLOUD + Your own S3</p>
                    <h3 class="text-2xl font-semibold text-textStrong">Bring your own storage</h3>
                </div>

                <ul class="space-y-3 text-lg mb-8 flex-1 list-disc list-inside marker:text-iconBrand">
                    <li>Own and control all your data</li>
                    <li>Save <strong>all your data</strong> to any S3-compatible bucket</li>
                    <li><strong>Unlimited data retention</strong> period</li>
                    <li>Query years of data via monoscope</li>
                    <li><strong>No extra cost</strong> for data retention</li>
                </ul>

                <div class="mb-8">
                    <p class="text-sm text-textDisabled mb-2">Estimate your monthly cost</p>
                    <input type="range" min="20000000" max="495000000" step="10000000" value="100000000" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range" id="price_range">
                    <div class="flex justify-between text-sm text-textWeak mt-1">
                        <span>20M</span>
                        <span>250M</span>
                        <span>500M events</span>
                    </div>
                </div>

                <div class="border-t border-strokeBrand-weak pt-6 space-y-4">
                    <div class="space-y-2">
                        <p class="text-sm text-textDisabled uppercase tracking-wide">Pricing</p>
                        <p class="text-2xl font-semibold text-textStrong">
                            <span id="price">$199</span><span class="text-base font-normal text-textWeak" id="num_requests">/month starting</span>
                        </p>
                        <p class="text-base text-textWeak">Includes up to 100M events, + <strong class="text-textStrong">$2 per 1M events</strong> after</p>
                    </div>
                    <a href="https://app.monoscope.tech" class="block text-center py-3 px-6 bg-fillBrand-strong text-textInverse-strong rounded-lg font-medium hover:bg-fillBrand-weak transition-colors">Start free trial</a>
                </div>
            </div>
            <!-- SELF-HOSTED PLAN -->
            <div class="rounded-xl border border-strokeWarning-weak bg-fillWarning-weak p-8 flex flex-col relative">
                <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-fillSuccess-strong text-textInverse-strong px-4 py-1 rounded-full text-sm font-medium">OPEN SOURCE</div>
                <div class="inline-block p-3 bg-fillBrand-weak rounded-full w-fit"><svg class="w-5 h-5 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#server"></use></svg></div>
                <div class="mt-8 mb-6">
                    <p class="text-sm font-medium text-textDisabled dark:text-textWeak uppercase tracking-wide">SELF-HOSTED</p>
                    <h3 class="text-2xl font-semibold text-textStrong">Bring your own servers</h3>
                </div>

                <div class="mb-6 space-y-4">
                    <div>
                        <p class="text-sm font-semibold text-textStrong uppercase tracking-wide mb-2">Community Edition (Free)</p>
                        <ul class="space-y-2 text-base list-disc list-inside marker:text-iconSuccess">
                            <li><strong>100% open source</strong> (Apache 2.0)</li>
                            <li>All core monitoring features</li>
                            <li>Deploy to your own servers</li>
                            <li>Complete data control</li>
                        </ul>
                    </div>
                    <br/>
                    <div>
                        <p class="text-sm font-semibold text-textStrong uppercase tracking-wide mb-2">Enterprise Edition</p>
                        <ul class="space-y-2 text-base list-disc list-inside marker:text-iconBrand">
                            <li>Premium features & integrations</li>
                            <li><strong>SSO</strong> & advanced auth</li>
                            <li><strong>Priority support</strong> & SLA</li>
                            <li>Advanced security & compliance</li>
                        </ul>
                    </div>
                </div>
                <br/>
                <div class="border-t border-strokeWeak pt-6 space-y-4 mt-auto">
                    <div class="space-y-2">
                        <p class="text-sm text-textDisabled uppercase tracking-wide">Pricing</p>
                        <p class="text-base text-textWeak">Community Edition: <strong class="text-textStrong text-2xl">Free</strong> <span class="text-sm">(forever)</span></p>
                        <p class="text-base text-textWeak">Enterprise: <strong class="text-textStrong">starts at $500/month</strong></p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <a href="https://github.com/monoscope-tech/monoscope" target="_blank" rel="noopener noreferrer" class="block text-center py-3 px-6 bg-fillBrand-strong text-textInverse-strong rounded-lg font-medium hover:bg-fillBrand-weak transition-colors">View on GitHub</a>
                        <a href="https://calendar.app.google/1a4HG5GZYv1sjjZG6" target="_blank" rel="noopener noreferrer" class="block text-center py-2.5 px-6 bg-transparent text-fillBrand-strong border border-fillBrand-strong rounded-lg font-medium hover:bg-fillBrand-weak hover:text-textStrong transition-colors text-sm">Discuss Enterprise with an engineer</a>
                    </div>
                </div>
            </div>

        </section>

        <!-- Feature Comparison Table -->
        <section class="w-full py-12 text-textWeak">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-2xl font-semibold text-center mb-8 text-textStrong">Compare Features Across Plans.</h2>
                <div class="overflow-x-auto">
                    <table class="w-full border border-gray-200 rounded-lg overflow-hidden">
                        <thead class="bg-fillWeak">
                            <tr>
                                <th class="text-left p-4 font-semibold text-textStrong">Features</th>
                                <th class="text-center p-4 font-semibold text-textStrong">Monoscope Cloud</th>
                                <th class="text-center p-4 font-semibold text-textStrong bg-fillBrand-weak">Cloud + Your own S3</th>
                                <th class="text-center p-4 font-semibold text-textStrong">Self-Hosted</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr class="hover:bg-fillWeak">
                                <td class="p-4 text-textWeak">Events per month</td>
                                <td class="p-4 text-center">
                                  {% if this.frontmatter.enableFreeTier %}
                                    10k/day free, then unlimited
                                  {% else %}
                                    Unlimited
                                  {% endif %}
                                </td>
                                <td class="p-4 text-center bg-fillBrand-weak">Unlimited</td>
                                <td class="p-4 text-center">Unlimited</td>
                            </tr>
                            <tr class="hover:bg-fillWeak">
                                <td class="p-4 text-textWeak">Data retention</td>
                                <td class="p-4 text-center">30 days</td>
                                <td class="p-4 text-center bg-fillBrand-weak font-semibold text-textStrong">Unlimited</td>
                                <td class="p-4 text-center">Custom</td>
                            </tr>
                            <tr class="hover:bg-fillWeak">
                                <td class="p-4 text-textWeak">Team members</td>
                                <td class="p-4 text-center">Unlimited</td>
                                <td class="p-4 text-center bg-fillBrand-weak">Unlimited</td>
                                <td class="p-4 text-center">Unlimited</td>
                            </tr>
                            <tr class="hover:bg-fillWeak">
                                <td class="p-4 text-textWeak">Data ownership</td>
                                <td class="p-4 text-center">Monoscope managed</td>
                                <td class="p-4 text-center bg-fillBrand-weak font-semibold text-textStrong">Your own S3 bucket</td>
                                <td class="p-4 text-center font-semibold text-textStrong">Complete control</td>
                            </tr>
                            <tr class="hover:bg-fillWeak">
                                <td class="p-4 text-textWeak">Infrastructure</td>
                                <td class="p-4 text-center">Fully managed</td>
                                <td class="p-4 text-center bg-fillBrand-weak">Managed + your storage</td>
                                <td class="p-4 text-center">Self-managed</td>
                            </tr>
                            <tr class="hover:bg-fillWeak">
                                <td class="p-4 text-textWeak">Setup time</td>
                                <td class="p-4 text-center text-iconSuccess font-semibold">< 5 minutes</td>
                                <td class="p-4 text-center bg-blue-50/30 text-green-600 font-semibold">< 15 minutes</td>
                                <td class="p-4 text-center">Varies</td>
                            </tr>
                            <tr class="hover:bg-fillWeak">
                                <td class="p-4 text-textWeak">Support</td>
                                <td class="p-4 text-center">Community + Email</td>
                                <td class="p-4 text-center bg-fillBrand-weak">Priority support</td>
                                <td class="p-4 text-center">Custom SLA available</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>


        <!-- Startup Program Section -->
        <section class="w-full py-16">
            <div class="max-w-5xl mx-auto px-3">
                <div class="relative">
                    <!-- Main container with gradient border effect -->
                    <div class="relative rounded-3xl bg-gradient-to-r from-fillBrand-strong via-fillBrand-weak to-fillBrand-strong p-[1px]">
                        <div class="rounded-3xl bg-bgBase overflow-hidden">
                            <!-- Pattern background -->
                            <div class="absolute inset-0 opacity-5">
                                <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230068ff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
                            </div>

                            <div class="relative grid md:grid-cols-2 items-center">
                                <!-- Left side content -->
                                <div class="p-8 md:p-12 space-y-6">
                                    <div class="space-y-4">
                                        <div class="inline-flex items-center gap-2">
                                            <div class="w-10 h-10 rounded-full bg-fillBrand-weak flex items-center justify-center">
                                                <svg class="w-5 h-5 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#zap"></use></svg>
                                            </div>
                                            <span class="text-sm font-semibold text-textBrand uppercase tracking-wider">Startup Program</span>
                                        </div>

                                        <h2 class="text-3xl md:text-4xl font-normal text-textStrong leading-tight">
                                            Save up to <span class="text-textBrand">$10,000</span><br/>
                                            on your first year
                                        </h2>

                                        <p class="text-lg text-textWeak">
                                            Building the next big thing? We'll cover up to 100% of your monoscope costs while you focus on growth.
                                        </p>
                                    </div>

                                    <div class="pt-2">
                                        <a href="https://tally.so/r/n9vVkY" target="_blank" class="inline-flex items-center gap-3 px-6 py-3 bg-fillBrand-strong text-textInverse-strong rounded-xl font-semibold hover:shadow-lg hover:shadow-fillBrand-strong/20 transition-all duration-200 group">
                                            Apply in 2 minutes
                                            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform"><use xlink:href="/assets/deps/sprite.svg#arrow-right"></use></svg>
                                        </a>
                                        <p class="text-sm text-textWeak mt-3">No credit card required</p>
                                    </div>
                                </div>

                                <!-- Right side - Qualification badges -->
                                <div class="p-8 md:p-12 bg-gradient-to-br from-fillBrand-weak/50 to-transparent">
                                    <p class="text-sm font-medium text-textWeak uppercase tracking-wide mb-6">You qualify if you have:</p>
                                    <div class="grid grid-cols-2 gap-3">
                                        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 border border-strokeBrand-weak hover:border-strokeBrand-strong transition-colors group">
                                            <div class="flex items-start gap-3">
                                                <div class="w-8 h-8 rounded-lg bg-fillBrand-weak flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                    <svg class="w-4 h-4 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#calendar"></use></svg>
                                                </div>
                                                <div>
                                                    <p class="text-2xl font-bold text-textStrong">< 2</p>
                                                    <p class="text-sm text-textWeak">years since founding</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 border border-strokeBrand-weak hover:border-strokeBrand-strong transition-colors group">
                                            <div class="flex items-start gap-3">
                                                <div class="w-8 h-8 rounded-lg bg-fillBrand-weak flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                    <svg class="w-4 h-4 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#users"></use></svg>
                                                </div>
                                                <div>
                                                    <p class="text-2xl font-bold text-textStrong">< 5</p>
                                                    <p class="text-sm text-textWeak">team members</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 border border-strokeBrand-weak hover:border-strokeBrand-strong transition-colors group">
                                            <div class="flex items-start gap-3">
                                                <div class="w-8 h-8 rounded-lg bg-fillBrand-weak flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                    <svg class="w-4 h-4 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#dollar-sign"></use></svg>
                                                </div>
                                                <div>
                                                    <p class="text-2xl font-bold text-textStrong">< $100k</p>
                                                    <p class="text-sm text-textWeak">in funding raised</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-5 border border-strokeBrand-weak hover:border-strokeBrand-strong transition-colors group">
                                            <div class="flex items-start gap-3">
                                                <div class="w-8 h-8 rounded-lg bg-fillBrand-weak flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                                    <svg class="w-4 h-4 text-iconBrand"><use xlink:href="/assets/deps/sprite.svg#code"></use></svg>
                                                </div>
                                                <div>
                                                    <p class="text-2xl font-bold text-textStrong">SaaS</p>
                                                    <p class="text-sm text-textWeak">or software product</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Floating badge -->
                    <div class="absolute -top-4 -right-4 bg-fillWarning-weak text-textWarning-strong px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                        Limited spots available
                    </div>
                </div>
            </div>
        </section>

        <!-- Trusted by developers section -->
        <div class="max-w-8xl px-3 w-full text-textWeak py-12 mx-auto">
            <div class="space-y-8">
                <p class="">Trusted by 5000+ developers at proactive engineering companies</p>
                <div class="grid grid-cols-4 sm:grid-cols-8 *:col-span-1  gap-4 md:gap-8  items-center *:brightness-0 *:dark:invert opacity-50">
                    <img src="/assets/img/customers/andela.svg" alt="andela.svg" class="h-5 sm:h-8"><img src="/assets/img/customers/partna.svg" alt="partna.svg" class="h-5 sm:h-8"><img src="/assets/img/customers/grovepay.svg" alt="grovepay.svg" class="h-5 sm:h-8"><img src="/assets/img/customers/sameday.svg" alt="sameday.svg" class="h-5 sm:h-8"><img src="/assets/img/customers/platnova.png" alt="platnova.png" class="h-5 sm:h-8"><img src="/assets/img/customers/payfonte.svg" alt="payfonte.svg" class="h-5 sm:h-8"><img src="/assets/img/customers/thepeer.svg" alt="thepeer.svg" class="h-5 sm:h-8"><img src="/assets/img/customers/blockradar-full.svg" alt="blockradar-full.svg" class="h-5 sm:h-8">
                </div>
                <div class="flex flex-col sm:flex-row text-textWeak gap-24 py-6">
                    <div class="timeline-fade-in flex-1 border-l border-fillBrand-strong px-6 py-2 space-y-4">
                        <div class="flex gap-1"><div class="inline-flex space-x-1  w-[6rem]">
                            <svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg><svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg><svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg><svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg><svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg>
                        </div></div>
                        <p>"Easy onboarding and they added an integration just for our use case, thanks again! We didn't have insights into our api load before and this helps very much."</p>
                        <div class="flex gap-3 items-center">
                            <img class="rounded-lg grayscale w-12 h-12 object-cover" src="/assets/img/love/sebastian_zwach.jpeg">
                            <div class="flex-1 space-y-1">
                                <p class="text-textStrong">Sebastian Zwach</p>
                                <p class="text-xs">founder of Neorent GmbH</p>
                            </div>
                        </div>
                        <a class="text-textBrand underline underline-offset-2 block">Neorent case study</a>
                    </div>
                    <div class="timeline-fade-in flex-1 border-l border-fillBrand-strong px-6 py-2 space-y-4">
                        <div class="flex gap-1"><div class="inline-flex space-x-1  w-[6rem]">
                            <svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg><svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg><svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg><svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg><svg class="icon h-5 inline-block"><use xlink:href="/assets/deps/sprite.svg#star"></use></svg>
                        </div></div>
                        <p>"We had a major incident, and our tech support could see via APItookit which third-party integration partner was responsible, and could take action without needing the engineering team's help"</p>
                        <div class="flex gap-3 items-center">
                            <img class="rounded-lg grayscale w-12 h-12 object-cover" src="/assets/img/love/joshua.jpeg">
                            <div class="flex-1 space-y-1">
                                <p class="text-textStrong">Joshua Chinemezum</p>
                                <p class="text-xs">CEO of Platnova</p>
                            </div>
                        </div>
                        <a class="text-textBrand underline underline-offset-2 block">Platnova case study</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- FAQ Section -->
        <section class="w-full py-16">
          <div class="flex flex-col md:flex-row gap-16">
              <div class="md:w-1/3 space-y-4">
                  <h2 class="text-5xl leading-tight font-normal text-textStrong">Frequently Asked <span class="text-textDisabled">Questions</span></h2>
                  <p class="text-2xl leading-normal text-textWeak">Here are some questions many have asked us.</p>
                  <a href="/docs/faqs/" class="text-lg text-textBrand underline block">View all FAQs</a>
              </div>

              <div class="md:w-2/3 space-y-3">
                {% for faq in this.frontmatter.faqs %}
                  {% if faq.q == "What's included in the free tier?" and this.frontmatter.enableFreeTier == false %}
                    {% continue %}
                  {% endif %}
                  <div class="border border-strokeWeak rounded-lg p-6 bg-fillWeak hover:bg-fillBrand-weak transition-colors">
                      <button class="cursor-pointer flex gap-4 items-center text-left w-full hover:text-textStrong" onclick="toggleFaq(event)">
                          <svg class="shrink-0 icon h-5 w-5 text-current fill-current stroke-current opacity-70 transition-transform"><use xlink:href="/assets/deps/fontawesome/solid.svg#caret-right"></use></svg>
                          <span class="text-lg font-medium">{{faq.q}}</span>
                      </button>
                      <div class="pl-9 pt-4 hidden text-textWeak">{{faq.a}}</div>
                  </div>
                {% endfor %}
              </div>
          </div>
        </section>

    </div>
</div>
```
