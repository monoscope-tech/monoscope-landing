// Snapshots real dashboard screens (dark mode) as static HTML for the homepage demos.
// Usage: node scripts/demo-snapshot.mjs [scene ...]   (needs monoscope on localhost:8080 + `npm i -g playwright`)
// Output: assets/demos/screens/app.css (the app's CSS, once) + assets/demos/screens/<scene>.html
// Each screen is the page body with shadow roots serialised declaratively, canvases rasterised and images inlined.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
const { chromium } = createRequire(import.meta.url)(execSync('npm root -g').toString().trim() + '/playwright');
const BASE = process.env.MONOSCOPE_BASE || 'http://localhost:8080';
const P = BASE + '/p/00000000-0000-0000-0000-000000000000';
const OUT = new URL('../assets/demos/screens', import.meta.url).pathname;
const W = 1280, H = 720;
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
// Click the centre of the first *rendered* element whose own text matches `re` (labels often exist twice, one hidden).
const vis = re => ({ custom: async p => {
  const pt = await p.evaluate(src => { const re = new RegExp(src);
    for (const e of document.querySelectorAll('a,button,span,div,td,[role=tab]')) { const r = e.getBoundingClientRect();
      if (r.width > 4 && r.height > 4 && re.test(e.textContent.trim()) && e.textContent.trim().length < 60) return [r.x + r.width / 2, r.y + r.height / 2]; }
    return null; }, re.source);
  if (!pt) throw new Error('not visible: ' + re); await p.mouse.click(pt[0], pt[1]);
} });
const SCENES = {
  'issues':         { url: '/issues' },
  'explorer':       { url: '/log_explorer' },
  'explorer-row':   { url: Q('attributes.http.request.method == "POST"'), actions: [ROW] },
  'explorer-req':   { url: Q('attributes.http.request.method == "POST"'), actions: [ROW, vis(/^Req Body$/)] },
  'explorer-resp':  { url: Q('attributes.http.request.method == "POST"'), actions: [ROW, vis(/^Res Body$/)] },
  'explorer-share': { url: Q('attributes.http.request.method == "POST"'), actions: [ROW, vis(/^Share link$/)] },
  'explorer-trace': { url: Q('attributes.http.request.method == "POST"'), actions: [ROW, vis(/View trace/)] },
  'issue':          { url: '/issues/94ae2b78-340b-4f3a-aa0e-2ee41d694858?since=7D', wait: 9000 },
  'catalog':        { url: '/api_catalog', actions: [vis(/^\s*Outgoing\s*$/)], wait: 6000 },
  'ai-chat':        { url: '/ai/e599e4f8-302f-42bf-8cc8-d6404c37e448', wait: 5000 },
  'sessions':       { url: '/rum?tab=sessions', wait: 4000 },
  'session':        { url: process.env.SESSION_URL || '/rum?tab=sessions', actions: process.env.SESSION_URL ? [] : [p => p.locator('a[href*="session"]').first()], wait: 6000 },
  'routines':       { url: '/ai/routines', wait: 4000 },
  'ai-changes':     { url: '/ai/4879f007-38de-4e00-8acd-370a74dfa1d1', wait: 5000 },
  'monitors':       { url: '/monitors' },
  'ai':             { url: '/ai' },
  'dashboards':     { url: '/dashboards' },
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
const serialise = async () => await page.evaluate(async () => {
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
  document.querySelectorAll('script, link, noscript, iframe').forEach(n => n.remove());
  document.querySelectorAll('*').forEach(n => { for (const a of [...n.attributes]) if (a.name.startsWith('hx-') || a.name.startsWith('data-hx-') || a.name === '_' || a.name === 'autofocus' || a.name === 'autoplay') n.removeAttribute(a.name); });
  const headStyles = [...document.head.querySelectorAll('style')].map(s => s.textContent).join('\n');
  return { body: document.body.innerHTML, bodyClass: document.body.className, headStyles };
});

// The app's CSS, rewritten to live inside the demo's shadow root at a fixed 1280x720 stage.
async function appCss() {
  await page.goto(P + '/log_explorer'); await settle(1500);
  const hrefs = await page.evaluate(() => [...document.querySelectorAll('link[rel=stylesheet], link[as=style]')].map(l => l.href));
  let css = '';
  for (const h of hrefs) css += `\n/* ${h} */\n` + await (await page.request.get(h)).text();
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

// Purge app.css down to the rules the captured screens can use (class tokens present in any screen).
{
  const used = new Set();
  for (const f of fs.readdirSync(OUT).filter(f => f.endsWith('.html')))
    for (const m of fs.readFileSync(`${OUT}/${f}`, 'utf8').matchAll(/class="([^"]*)"/g)) m[1].split(/\s+/).forEach(c => c && used.add(c));
  const css = fs.readFileSync(`${OUT}/app.css`, 'utf8');
  const kept = await page.evaluate(([css, used]) => {
    const U = new Set(used), sheet = new CSSStyleSheet(); sheet.replaceSync(css);
    const unesc = s => s.replace(/\\(.)/g, '$1');
    const ok = sel => [...sel.matchAll(/\.((?:\\.|[\w-])+)/g)].every(m => U.has(unesc(m[1])));
    const walk = rules => [...rules].map(r => {
      if (r.selectorText !== undefined) return r.selectorText.split(',').some(s => ok(s.trim())) ? r.cssText : '';
      if (r.cssRules) { const inner = walk(r.cssRules).filter(Boolean).join('\n'); return inner ? r.cssText.replace(/\{[\s\S]*\}$/, '{' + inner + '}') : ''; }
      return r.cssText;
    }).filter(Boolean);
    return walk(sheet.cssRules).join('\n');
  }, [css, [...used]]);
  fs.writeFileSync(`${OUT}/app.css`, kept);
  console.log('app.css purged:', Math.round(css.length / 1024) + 'KB ->', Math.round(kept.length / 1024) + 'KB');
}
await browser.close();
