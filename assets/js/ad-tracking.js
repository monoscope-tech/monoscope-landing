// Unified Ad Platform Conversion Tracking (Reddit, LinkedIn, Meta, Google, Twitter/X)
(function() {
  'use strict';

  var tracked = new WeakSet();
  var genId = (e) => `${e}_${Date.now()}_${Math.random().toString(36).slice(2,9)}`;

  // Platform-specific event dispatch
  function track(event, meta) {
    var id = genId(event);
    meta = { ...meta, conversionId: id, page: location.pathname, ts: new Date().toISOString() };

    // Reddit
    if (window.rdt) window.rdt('track', event, meta);

    // LinkedIn
    if (window.lintrk) window.lintrk('track', meta);

    // Twitter/X
    if (window.twq) {
      var twMap = { SignUp: 'tw-om5gt-om5gt', ScheduleDemo: 'tw-om5gt-om5gt', InitiateCheckout: 'tw-om5gt-om5gt',
                   Contact: 'tw-om5gt-om5gt', CompleteRegistration: 'tw-om5gt-om5gt', ViewContent: 'tw-om5gt-om5gt' };
      window.twq('event', twMap[event] || 'tw-om5gt-om5gt', meta);
    }

    // Meta/Facebook
    if (window.fbq) {
      var fbMap = { SignUp: 'Lead', ScheduleDemo: 'Schedule', InitiateCheckout: 'InitiateCheckout',
                   Contact: 'Contact', CompleteRegistration: 'CompleteRegistration', ViewContent: 'ViewContent' };
      window.fbq('track', fbMap[event] || 'Lead', meta);
    }

    // Google Ads
    if (window.gtag) {
      var gMap = { SignUp: 'sign_up', ScheduleDemo: 'generate_lead', InitiateCheckout: 'begin_checkout',
                  Contact: 'contact', CompleteRegistration: 'complete_registration', ViewContent: 'view_item' };
      window.gtag('event', gMap[event] || 'conversion', meta);
    }

    // Analytics
    if (window.amplitude) window.amplitude.track(event, meta);
    if (window.posthog) window.posthog.capture(event, meta);
  }

  function init() {
    // CTA click tracking
    var ctas = [
      ['a[href*="app.monoscope.tech"]', 'SignUp'],
      ['a[href*="calendar.app.google"]', 'ScheduleDemo'],
      ['[data-tracking="playground"], .playground-button', 'ViewContent']
    ];

    ctas.forEach(([sel, event]) => {
      document.querySelectorAll(sel).forEach(el => {
        if (tracked.has(el)) return;
        tracked.add(el);
        el.addEventListener('click', () => track(event, { label: el.textContent.trim(), url: el.href || '' }));
      });
    });

    // "Get Started" buttons
    document.querySelectorAll('a, button').forEach(el => {
      if (tracked.has(el)) return;
      var txt = el.textContent.toLowerCase();
      if (txt.includes('get started') || txt.includes('getting started')) {
        tracked.add(el);
        el.addEventListener('click', () => track('InitiateCheckout', { label: el.textContent.trim(), url: el.href || '' }));
      }
    });

    // Form tracking
    document.querySelectorAll('[data-uid="e05f719e6e"], .formkit-form').forEach(form => {
      if (tracked.has(form)) return;
      tracked.add(form);
      form.addEventListener('submit', () => track('CompleteRegistration', { type: 'newsletter' }));
    });

    document.querySelectorAll('form[action*="contact"], form#contact-form, .contact-form').forEach(form => {
      if (tracked.has(form)) return;
      tracked.add(form);
      form.addEventListener('submit', () => track('Contact', { type: 'form' }));
    });

    // Crisp chat
    if (window.$crisp) {
      window.$crisp.push(['on', 'message:sent', () => track('Contact', { type: 'chat' })]);
    }

    // Scroll depth
    var depths = { 25: 0, 50: 0, 75: 0, 90: 0 };
    var checkScroll = () => {
      var pct = Math.round((scrollY + innerHeight) / document.documentElement.scrollHeight * 100);
      Object.keys(depths).forEach(d => {
        if (pct >= d && !depths[d]) {
          depths[d] = 1;
          track('ViewContent', { label: `Scroll ${d}%`, depth: d });
        }
      });
    };
    var scrollTimer;
    addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(checkScroll, 100); });
  }

  function ready(fn) {
    if (!window.rdt && !window.lintrk) return setTimeout(() => ready(fn), 100);
    fn();
    track('PageView', { referrer: document.referrer });

    // Re-init on dynamic content
    if (window.htmx) document.body.addEventListener('htmx:afterSwap', () => setTimeout(fn, 100));
    new MutationObserver(() => fn()).observe(document.body, { childList: true, subtree: true });
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', () => ready(init)) : ready(init);
})();
