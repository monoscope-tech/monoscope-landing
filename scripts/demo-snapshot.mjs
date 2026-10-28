// Snapshots real dashboard screens (dark mode) as static HTML for the homepage demos.
// Usage: node scripts/demo-snapshot.mjs [scene ...]   (needs monoscope on localhost:8080 + `npm i -g playwright`)
// Env: DEMO_OUT=<dir> DEMO_W/DEMO_H=<stage px> DEMO_PRESENT=1 (declutter for a landing page) DEMO_ISSUE=<issue path> DEMO_QUERY=<explorer query> DEMO_CHAT=<ai chat path> DEMO_DASH=<dashboard path> DEMO_DASH_TAB=<tab> DEMO_SERVICE=<service> DEMO_OCCURRENCE=First|Recommended
// DEMO_RANGE=from=<iso>&to=<iso> pins the explorer window so req/resp/share/trace all show the same row.
// Output: assets/demos/screens/app.css (the app's CSS, once) + assets/demos/screens/<scene>.html, then demo-optimize.mjs shrinks them.
// Each screen is the page body with shadow roots serialised declaratively, canvases rasterised and images inlined.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
const { chromium } = createRequire(import.meta.url)(execSync('npm root -g').toString().trim() + '/playwright');
const BASE = process.env.MONOSCOPE_BASE || 'http://localhost:8080';
const P = BASE + '/p/00000000-0000-0000-0000-000000000000';
const OUT = process.env.DEMO_OUT || new URL('../assets/demos/screens', import.meta.url).pathname;
const W = +process.env.DEMO_W || 1280, H = +process.env.DEMO_H || 720, PRESENT = !!process.env.DEMO_PRESENT;
fs.mkdirSync(OUT, { recursive: true });

// scene name -> how to get there. `actions` run after the page settles; each is a Playwright locator to click.
const Q = q => '/log_explorer?query=' + encodeURIComponent(q);
// The results list is a closed-shadow <log-list>; click its first row by position until the request panel opens.
const ROW = { custom: async p => {
  const box = await p.locator('log-list').boundingBox();
  for (const dy of [44, 62, 80, 100, 26]) {
    await p.mouse.click(box.x + Math.min(320, box.width / 3), box.y + dy); await p.waitForTimeout(1800);
    if (await p.getByText(/^\s*Res Body\s*$/).first().isVisible().catch(() => false)) return;
  }
} };
// Expand the first row's trace inline (its "+N" child-span toggle).
const EXPAND = p => p.locator('button[aria-label^="Expand trace"]').first();
// After expanding, open the child span that ran a SQL query.
const SQLROW = { custom: async p => { const r = await p.evaluate(() => [...document.querySelectorAll('lit-virtualizer tr')].find(t => /SELECT /.test(t.textContent))?.getBoundingClientRect().toJSON());
  if (!r) throw new Error('no SQL row'); await p.mouse.click(r.x + 470, r.y + r.height / 2); await p.waitForTimeout(3000); } };
// Click the centre of the first *rendered* element whose own text matches `re` (labels often exist twice, one hidden).
const vis = re => ({ custom: async p => {
  const pt = await p.evaluate(src => { const re = new RegExp(src);
    for (const e of document.querySelectorAll('a,button,span,div,td,[role=tab]')) { const r = e.getBoundingClientRect();
      if (r.width > 4 && r.height > 4 && re.test(e.textContent.trim()) && e.textContent.trim().length < 60) return [r.x + r.width / 2, r.y + r.height / 2]; }
    return null; }, re.source);
  if (pt) return p.mouse.click(pt[0], pt[1]);
  // Labels inside shadow roots: Playwright's text locator pierces them.
  const loc = p.getByText(re).first(); if (!(await loc.isVisible().catch(() => false))) throw new Error('not visible: ' + re); await loc.click();
} });
const EQ = Q(process.env.DEMO_QUERY || 'attributes.http.request.method == "POST"') + (process.env.DEMO_RANGE ? '&' + process.env.DEMO_RANGE : '');
const SCENES = {
  'issues':         { url: '/issues' },
  'issues-errors':  { url: '/issues', actions: [vis(/^Errors$/)] },
  'explorer':       { url: '/log_explorer' },
  'explorer-list':  { url: EQ },
  'explorer-expand': { url: EQ, actions: [EXPAND] },
  'explorer-expand-sql': { url: EQ, actions: [EXPAND, SQLROW] },
  'explorer-row':   { url: EQ, actions: [ROW] },
  'explorer-req':   { url: EQ, actions: [ROW, vis(/^Req Body$/)] },
  'explorer-resp':  { url: EQ, actions: [ROW, vis(/^Res Body$/)] },
  'explorer-share': { url: EQ, actions: [ROW, vis(/^Share link$/)] },
  'explorer-trace': { url: EQ, actions: [ROW, vis(/View trace/)] },
  'issue':          { url: process.env.DEMO_ISSUE || '/issues/94ae2b78-340b-4f3a-aa0e-2ee41d694858?since=7D', wait: 9000 },
  'issue-trace':    { url: process.env.DEMO_ISSUE || '/issues/94ae2b78-340b-4f3a-aa0e-2ee41d694858?since=7D', actions: process.env.DEMO_OCCURRENCE ? [vis(new RegExp('^' + process.env.DEMO_OCCURRENCE + '$'))] : [], wait: 6000 },
  'catalog':        { url: '/api_catalog', actions: [vis(/^\s*Outgoing\s*$/)], wait: 6000 },
  'ai-chat':        { url: process.env.DEMO_CHAT || '/ai/e599e4f8-302f-42bf-8cc8-d6404c37e448', wait: 5000 },
  'sessions':       { url: '/rum?tab=sessions', wait: 4000 },
  'session':        { url: process.env.SESSION_URL || '/rum?tab=sessions', actions: process.env.SESSION_URL ? [] : [p => p.locator('a[href*="session"]').first()], wait: 6000 },
  'routines':       { url: '/ai/routines', wait: 4000 },
  'ai-changes':     { url: '/ai/4879f007-38de-4e00-8acd-370a74dfa1d1', wait: 5000 },
  'monitors':       { url: '/monitors' },
  'ai':             { url: '/ai' },
  'dashboards':     { url: '/dashboards' },
  'dashboard':      { url: process.env.DEMO_DASH || '/dashboards/6f5ee51d-900d-455c-99d9-2f62e6c023b8', wait: 6000 },
  'dashboard-tab':   { url: process.env.DEMO_DASH || '/dashboards/6f5ee51d-900d-455c-99d9-2f62e6c023b8', actions: [vis(new RegExp('^\\s*' + (process.env.DEMO_DASH_TAB || 'Infra') + '\\s*$'))], wait: 6000 },
  'dashboard-svc':   { url: process.env.DEMO_DASH || '/dashboards/6f5ee51d-900d-455c-99d9-2f62e6c023b8', actions: [vis(/^\s*Service\s*$/), vis(new RegExp('^\\s*' + (process.env.DEMO_SERVICE || 'frontend') + '\\s*$'))], wait: 6000 },
};
const only = process.argv.slice(2);
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H }, colorScheme: 'dark', deviceScaleFactor: 2 });
const page = await ctx.newPage();
page.setDefaultTimeout(20000);

const settle = async (ms = 2500) => {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.waitForTimeout(ms);
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.querySelectorAll('input.theme-controller').forEach(i => { i.checked = true; });
    const b = [...document.querySelectorAll('div')].filter(d => d.textContent.trim().startsWith('Demo Project') && d.textContent.includes('Start Free Trial')).at(-1);
    if (b) b.remove();
    document.querySelectorAll('.htmx-indicator, #nprogress, [id*="progress"], [class*="loading-bar"]').forEach(n => n.remove());
    // Demo-project noise: a stored event sample that fails to load.
    [...document.querySelectorAll('p,div,span')].filter(e => e.children.length <= 1 && /could not be loaded/.test(e.textContent)).forEach(e => e.remove());
  }).catch(() => {});
  await page.waitForTimeout(300);
};

// Components whose content cannot be serialised (closed shadow roots) become 2x images of themselves.
const RASTER = ['log-list', 'session-replay'];
async function rasterise() {
  for (const sel of RASTER) for (const loc of await page.locator(sel).all()) {
    const box = await loc.boundingBox().catch(() => null); if (!box || box.width < 10 || box.height < 10) continue;
    const png = (await loc.screenshot({ scale: 'device' })).toString('base64');
    await loc.evaluate((el, [png, w, h]) => { const i = document.createElement('img'); i.src = 'data:image/png;base64,' + png;
      i.style.cssText = `display:block;width:${w}px;height:${h}px;object-fit:cover`; el.replaceWith(i); }, [png, box.width, box.height]);
  }
}

// Runs in the page: freeze the live DOM into serialisable HTML.
const serialise = async () => await page.evaluate(async present => {
  const toDataURL = async url => { try { const b = await (await fetch(url)).blob(); if (b.size > 400000) return null;
    return await new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result); f.readAsDataURL(b); }); } catch { return null; } };
  document.querySelectorAll('canvas').forEach(c => { try { const i = document.createElement('img'); i.src = c.toDataURL('image/png');
    i.width = c.width; i.height = c.height; i.className = c.className; i.style.cssText = c.style.cssText; c.replaceWith(i); } catch {} });
  for (const img of document.querySelectorAll('img')) { const src = img.getAttribute('src') || '';
    if (src && !src.startsWith('data:')) { const d = await toDataURL(new URL(src, location.href).href); if (d) img.setAttribute('src', d); else img.remove(); } }
  const cssOf = sheets => [...sheets].map(s => { try { return [...s.cssRules].map(r => r.cssText).join('\n'); } catch { return ''; } }).join('\n');
  const attach = root => {
    for (const el of root.querySelectorAll('*')) {
      if (!el.shadowRoot) continue;
      attach(el.shadowRoot);
      const t = document.createElement('template'); t.setAttribute('shadowrootmode', 'open');
      t.innerHTML = `<style>${cssOf(el.shadowRoot.adoptedStyleSheets)}</style>` + el.shadowRoot.innerHTML;
      el.prepend(t);
    }
  };
  attach(document);
  // Checkbox/radio state lives in a property; mirror it to the attribute so :checked styling matches the live page.
  if (present) document.querySelectorAll('tr.bg-fillError-weak, tr.bg-fillWarning-weak').forEach(r => r.classList.remove('bg-fillError-weak', 'bg-fillWarning-weak')); // calmer issue rows
  const drawer = document.getElementById('details-drawer-mode'); if (drawer) drawer.checked = false; // narrow stages flip the detail pane into an overlay
  document.querySelectorAll('input[type=checkbox], input[type=radio]').forEach(i => i.toggleAttribute('checked', i.checked));
  // Screens share one stage during crossfades; same-named radios across screens would uncheck each other.
  const sfx = '-' + Math.random().toString(36).slice(2, 7); document.querySelectorAll('input[type=radio][name]').forEach(i => i.name += sfx);
  document.querySelectorAll('script, link, noscript, iframe').forEach(n => n.remove());
  document.querySelectorAll('*').forEach(n => { for (const a of [...n.attributes]) if (a.name.startsWith('hx-') || a.name.startsWith('data-hx-') || a.name === '_' || a.name === 'autofocus' || a.name === 'autoplay') n.removeAttribute(a.name); });
  // Libraries like gridstack insert rules through the CSSOM, which textContent doesn't show.
  const headStyles = [...document.head.querySelectorAll('style')].map(s => { try { return [...s.sheet.cssRules].map(r => r.cssText).join('\n'); } catch { return s.textContent; } }).join('\n');
  return { body: document.body.innerHTML, bodyClass: document.body.className, headStyles };
}, PRESENT);

// The app's CSS, rewritten to live inside the demo's shadow root at a fixed 1280x720 stage.
async function appCss() {
  // Sheets are collected from the explorer and a dashboard (gridstack's CSS loads only there), once per URL.
  const seen = new Map();
  for (const url of ['/log_explorer', SCENES.dashboard.url]) {
    await page.goto(P + url); await settle(1500);
    const got = await page.evaluate(flatten => {
      // Freeze responsive rules as they matched at the capture viewport, so the stage renders the same layout at any page width.
      const walk = rules => rules.map(r =>
        r instanceof CSSMediaRule ? (matchMedia(r.media.mediaText).matches ? walk([...r.cssRules]) : '')
        : r instanceof CSSLayerBlockRule ? `@layer ${r.name}{${walk([...r.cssRules])}}`
        : r instanceof CSSSupportsRule ? `@supports ${r.conditionText}{${walk([...r.cssRules])}}`
        : r.cssText).join('\n');
      return [...document.styleSheets].filter(s => s.ownerNode?.tagName === 'LINK').map(s => { try { return [s.href, flatten ? walk([...s.cssRules]) : null]; } catch { return [s.href, '']; } });
    }, !!process.env.DEMO_OUT);
    for (const [h, c] of got) if (!seen.has(h)) seen.set(h, c ?? `\n/* ${h} */\n` + await (await page.request.get(h)).text());
  }
  const css = [...seen.values()].join('\n');
  return css
    .replace(/@font-face\s*{[^}]*}/g, '')
    .replace(/(^|[\s,>+~}])(html|:root)(?=[\s,{:.[#>])/g, '$1:host')
    .replace(/(^|[\s,>+~}])body(?=[\s,{:.[#>])/g, '$1.app-body')
    .replace(/100(d|s|l)?vh/g, `${H}px`).replace(/100(d|s|l)?vw/g, `${W}px`);
}

fs.writeFileSync(`${OUT}/app.css`, await appCss());
for (const [name, scene] of Object.entries(SCENES)) {
  if (only.length && !only.includes(name)) continue;
  try {
    await page.goto(P + scene.url, { waitUntil: 'domcontentloaded' }); await settle(3000);
    // Presentation: collapse the explorer's filter sidebar before anything else.
    if (PRESENT && scene.url.startsWith('/log_explorer')) { await page.evaluate(() => document.querySelectorAll('.toggle-filters, .ai-search').forEach(i => { i.checked = true; i.dispatchEvent(new Event('change', { bubbles: true })); })); await settle(2000); }
    for (const a of scene.actions || []) { if (a.custom) await a.custom(page); else await a(page).click({ timeout: 8000 }); await settle(scene.wait || 3500); }
    // Let lazy sections finish: wait until no "Loading…" text remains (up to 25 s), then a beat for charts to draw.
    for (let i = 0; i < 25; i++) { if (!(await page.evaluate(() => /Loading( events)?\.{3}|Loading\u2026/.test(document.body.innerText)))) break; await page.waitForTimeout(1000); }
    await page.waitForTimeout(2000);
    await page.mouse.move(W - 4, H - 4); await page.waitForTimeout(600);
    await rasterise();
    const { body, bodyClass, headStyles } = await serialise();
    fs.writeFileSync(`${OUT}/${name}.html`,
      `<style>${headStyles}</style>\n<div class="app-body ${bodyClass}" data-theme="dark" style="position:absolute;inset:0;overflow:hidden">${body}</div>\n`);
    console.log('ok  ', name, Math.round(fs.statSync(`${OUT}/${name}.html`).size / 1024) + 'KB');
  } catch (e) { console.log('FAIL', name, e.message.split('\n')[0]); }
}

await browser.close();
if (!process.env.DEMO_NO_OPT) execSync('node ' + new URL('demo-optimize.mjs', import.meta.url).pathname, { stdio: 'inherit' }); // prune, strip and purge what was captured
