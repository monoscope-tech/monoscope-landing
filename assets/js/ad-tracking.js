// Site events, ad conversions and attribution (click IDs + UTMs carried to app.monoscope.tech). Consent lives in components/consent.liquid.
(() => {
  'use strict';
  const C = window.msConsent || { granted: true, idle: true, cookie: () => {} };
  const dl = window.dataLayer = window.dataLayer || [];

  // The only events ad pixels see. signup_start is a click, not an account: Reddit gets it as Lead so the website campaign has a
  // goal with enough volume to optimise (real SIGN_UP comes from the app via CAPI); everywhere else it stays custom.
  // li/tw take LinkedIn conversion ids and X event ids once those exist in each ads account.
  const ADS = {
    demo_booked:        { fb: ['track', 'Schedule'],               rdt: ['Lead'] },
    github_star_intent: { fb: ['trackCustom', 'GitHubStarIntent'], rdt: ['Custom', 'GitHubStarIntent'] },
    signup_start:       { fb: ['trackCustom', 'SignupStart'],      rdt: ['Lead'] },
  };
  const afterIdle = f => C.idle ? f() : addEventListener('ms:idle', f, { once: true });

  function track(event, meta = {}) {
    const id = `${event}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    meta = { ...meta, page: location.pathname };
    dl.push({ event, ...meta, event_id: id });
    afterIdle(() => {
      window.amplitude?.track(event, meta);
      window.posthog?.capture(event, meta);
      const a = ADS[event];
      if (!a || !C.granted) return;
      window.fbq?.(a.fb[0], a.fb[1], meta, { eventID: id });
      window.rdt?.('track', a.rdt[0], { ...meta, conversionId: id, ...(a.rdt[1] && { customEventName: a.rdt[1] }) });
      a.li && window.lintrk?.('track', { conversion_id: a.li });
      a.tw && window.twq?.('event', a.tw, { conversion_id: id });
    });
  }

  const kind = u => u.hostname == 'calendar.app.google' ? 'demo_booked'
    : u.hostname == 'app.monoscope.tech' && !u.pathname.startsWith('/p/') ? 'signup_start'
    : /^(www\.)?github\.com$/.test(u.hostname) && /^\/monoscope-tech\/monoscope(\/|$)/i.test(u.pathname) ? 'github_star_intent' : null;
  const url = a => { try { return new URL(a.href); } catch { return null; } };

  ['click', 'auxclick'].forEach(t => document.addEventListener(t, e => {
    const a = e.target.closest?.('a[href]'), u = a && url(a), k = u && kind(u);
    k && !(k == 'signup_start' && /^log\s?in$/i.test(a.textContent.trim())) && track(k, { label: a.textContent.trim().slice(0, 80), url: a.href });
  }, true));
  document.addEventListener('submit', e => {
    const f = e.target;
    f.matches('.formkit-form, [data-uid="e05f719e6e"]') ? track('newsletter_subscribe')
      : f.matches('form[action*="contact"], #contact-form, .contact-form') && track('contact_submit');
  }, true);

  // Attribution: first and last touch in a 90-day cookie once consent allows; links decorate from the URL either way
  const KEYS = ['gclid', 'gbraid', 'wbraid', 'fbclid', 'rdt_cid', 'li_fat_id', 'twclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const q = new URLSearchParams(location.search), hit = Object.fromEntries(KEYS.filter(k => q.get(k)).map(k => [k, q.get(k)]));
  const cookie = n => decodeURIComponent((document.cookie.match(`(?:^|; )${n}=([^;]*)`) || [])[1] || '');
  let attr = {};
  try { attr = JSON.parse(cookie('ms_attr') || '{}'); } catch {}
  if (Object.keys(hit).length) {
    const touch = { ...hit, ts: new Date().toISOString(), landing: location.pathname };
    attr = { first: attr.first || touch, last: touch };
  }
  const persist = () => {
    if (!C.granted || !Object.keys(hit).length) return;
    C.cookie('ms_attr', JSON.stringify(attr), 7776000);
    hit.fbclid && !cookie('_fbc') && C.cookie('_fbc', `fb.1.${Date.now()}.${hit.fbclid}`, 7776000);
  };
  persist();
  addEventListener('ms:consent', persist);

  const decorate = (ghUtm = { utm_source: 'monoscopehq.com', utm_medium: 'site', utm_campaign: location.pathname }) => document.querySelectorAll('a[href*="app.monoscope.tech"], a[href*="github.com/monoscope-tech/monoscope"]').forEach(a => {
    const u = url(a), k = u && kind(u), add = k == 'signup_start' ? attr.last : k == 'github_star_intent' ? ghUtm : null;
    if (!add) return;
    const missing = KEYS.filter(p => add[p] && !u.searchParams.has(p));
    if (!missing.length) return;
    missing.forEach(p => u.searchParams.set(p, add[p]));
    a.href = u.href;
  });

  // Scroll depth and page views are analytics only: one passive listener for the page's lifetime
  function trackScrollDepth() {
    const depths = [25, 50, 75, 90];
    let pending = false;
    const check = () => {
      pending = false;
      const pct = (scrollY + innerHeight) / document.documentElement.scrollHeight * 100;
      while (depths.length && pct >= depths[0]) track('scroll_depth', { depth: depths.shift() });
      if (!depths.length) removeEventListener('scroll', onScroll);
    };
    const onScroll = () => { if (!pending) { pending = true; setTimeout(check, 250); } };
    addEventListener('scroll', onScroll, { passive: true });
  }

  function ready() {
    decorate();
    trackScrollDepth();
    track('page_view', { referrer: document.referrer });
    // Decorate links added later (htmx swaps, injected forms) at most once per idle period.
    // Background art adds nodes several times a second, so this must never run per mutation.
    let queued = false;
    const idle = window.requestIdleCallback || (f => setTimeout(f, 200));
    const rescan = () => { if (!queued) { queued = true; idle(() => { queued = false; decorate(); }, { timeout: 2000 }); } };
    new MutationObserver(rescan).observe(document.body, { childList: true, subtree: true });
  }

  document.readyState == 'loading' ? document.addEventListener('DOMContentLoaded', ready) : ready();
})();
