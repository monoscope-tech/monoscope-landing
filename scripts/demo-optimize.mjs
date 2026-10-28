// Shrinks the captured demo screens in assets/demos/screens without changing a pixel of what the player shows.
// Usage: node scripts/demo-optimize.mjs   (also run by demo-snapshot.mjs after a capture; needs `npm i -g playwright`)
// Per generated screen, rendered at the player's 1280x720 stage: drop display:none subtrees, attributes that
// cannot affect rendering, class tokens no stylesheet mentions, and re-encode inlined PNGs as WebP.
// Then app.css is deduplicated (the capture concatenates each sheet twice), purged to the selectors, custom
// properties and keyframes the screens can still use. Hand-written screens (no `.app-body` wrapper) are left alone.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
const { chromium } = createRequire(import.meta.url)(execSync('npm root -g').toString().trim() + '/playwright');
const DIR = (process.env.DEMO_OUT ? process.env.DEMO_OUT.replace(/\/?$/, '/') : null) || new URL('../assets/demos/screens/', import.meta.url).pathname;
const W = +process.env.DEMO_W || 1280, H = +process.env.DEMO_H || 720;
const kb = s => Math.round(s.length / 1024) + 'KB';

// Serve the screens dir so the harness page has an http origin (data: URIs and fetch need one).
const server = http.createServer((q, r) => { const f = DIR + q.url.slice(1).split('?')[0];
  fs.existsSync(f) && fs.statSync(f).isFile() ? r.end(fs.readFileSync(f)) : r.end('<!doctype html><meta charset=utf-8>'); }).listen(0);
const base = `http://localhost:${server.address().port}/`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W + 40, height: H + 40 } });
await page.goto(base + 'harness');

const cssTokens = css => new Set([...css.matchAll(/(?<!\\)\.((?:\\.|[\w\u00a0-\uffff-])+)/g)].map(m => m[1].replace(/\\(.)/g, '$1')));
const attrsUsed = css => new Set([...css.matchAll(/\[([\w-]+)/g)].map(m => m[1]));
const idsUsed = css => new Set([...css.matchAll(/(?<!\\)#((?:\\.|[\w\u00a0-\uffff-])+)/g)].map(m => m[1].replace(/\\(.)/g, '$1')));

let appCss = fs.readFileSync(DIR + 'app.css', 'utf8');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.html') && fs.readFileSync(DIR + f, 'utf8').includes('class="app-body'));

for (const f of files) {
  const src = fs.readFileSync(DIR + f, 'utf8');
  const out = await page.evaluate(async ([html, css, opts]) => {
    document.body.innerHTML = '';
    const host = document.body.appendChild(document.createElement('div'));
    host.style.cssText = `position:relative;width:${opts.W}px;height:${opts.H}px;overflow:hidden;background:#000`;
    const root = host.attachShadow({ mode: 'open' });
    const sheet = new CSSStyleSheet(); sheet.replaceSync(css); root.adoptedStyleSheets = [sheet];
    root.setHTMLUnsafe(html);
    await new Promise(r => requestAnimationFrame(() => setTimeout(r, 50)));
    const roots = [], all = [];
    const walk = r => { roots.push(r); for (const e of r.querySelectorAll('*')) { all.push(e); if (e.shadowRoot) walk(e.shadowRoot); } };
    walk(root);
    // 1. Hidden subtrees. Checked before any removal so computed styles are those of the full page.
    const hidden = all.filter(e => !(e instanceof SVGElement && e.tagName !== 'svg') && !/^(STYLE|TEMPLATE|INPUT|SELECT|TEXTAREA|OPTION)$/.test(e.tagName) && getComputedStyle(e).display === 'none');
    let removed = 0; for (const e of hidden) if (!hidden.some(h => h !== e && h.contains(e))) { e.remove(); removed++; }
    // 2. PNG -> WebP (lossless first; lossy only if the diff harness proves it invisible, so keep lossless here).
    let png = 0;
    for (const img of root.querySelectorAll('img[src^="data:image/png"]')) {
      await new Promise(r => { if (img.complete) r(); else img.onload = img.onerror = r; });
      const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      const webp = c.toDataURL('image/webp', 1);
      if (webp.startsWith('data:image/webp') && webp.length < img.src.length) { png += img.src.length - webp.length; img.src = webp; }
    }
    // 3. Attributes and class tokens no stylesheet or storyboard can see.
    const keep = new Set(['class', 'style', 'href', 'src', 'alt', 'type', 'checked', 'selected', 'disabled', 'value', 'placeholder', 'width', 'height', 'shadowrootmode', 'open', 'colspan', 'rowspan', 'rows', 'cols', 'for', 'name', 'readonly', 'multiple', ...opts.attrs]);
    const styleCss = [...root.querySelectorAll('style')].map(s => s.textContent).join('\n');
    const classes = new Set([...opts.classes, ...styleCss.matchAll(/(?<!\\)\.((?:\\.|[\w\u00a0-\uffff-])+)/g).map(m => m[1].replace(/\\(.)/g, '$1'))]);
    const ids = new Set([...opts.ids, ...styleCss.matchAll(/#([\w-]+)/g).map(m => m[1])]);
    for (const r of roots) for (const e of r.querySelectorAll('*')) {
      const svg = e instanceof SVGElement; // svg: every presentation attribute draws or inherits, keep them all
      for (const a of [...e.attributes]) {
        if (a.name === 'id') { if (!ids.has(a.value)) e.removeAttribute('id'); }
        else if (a.name === 'class') { const v = a.value.split(/\s+/).filter(c => classes.has(c)).join(' '); if (v) e.setAttribute('class', v); else e.removeAttribute('class'); }
        else if (!svg && !keep.has(a.name)) e.removeAttribute(a.name);
      }
    }
    const html2 = root.getHTML({ shadowRoots: roots.slice(1) });
    return { html: html2, removed, png, nodes: [all.length, root.querySelectorAll('*').length] };
  }, [src, appCss, { W, H, attrs: [...attrsUsed(appCss)], classes: [...cssTokens(appCss)], ids: [...idsUsed(appCss)] }]);
  fs.writeFileSync(DIR + f, out.html);
  console.log(f.padEnd(20), kb(src), '->', kb(out.html), `nodes ${out.nodes[0]} -> ${out.nodes[1]}`, `png -${Math.round(out.png / 1024)}KB`);
}

// app.css: dedupe repeated rules (last wins, as in the cascade), purge to what the screens use, drop dead vars/keyframes.
{
  const used = new Set(), ids = new Set(); let screens = '';
  for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.html'))) { const t = fs.readFileSync(DIR + f, 'utf8'); screens += t;
    for (const m of t.matchAll(/class="([^"]*)"/g)) m[1].split(/\s+/).forEach(c => c && used.add(c));
    for (const m of t.matchAll(/ id="([^"]*)"/g)) ids.add(m[1]); }
  const kept = await page.evaluate(([css, used, ids]) => {
    const U = new Set(used), I = new Set(ids), sheet = new CSSStyleSheet(); sheet.replaceSync(css);
    const unesc = s => s.replace(/\\(.)/g, '$1');
    const ok = sel => [...sel.matchAll(/(?<!\\)\.((?:\\.|[\w\u00a0-\uffff-])+)/g)].every(m => U.has(unesc(m[1]))) && [...sel.matchAll(/(?<!\\)#((?:\\.|[\w\u00a0-\uffff-])+)/g)].every(m => I.has(unesc(m[1])));
    const walk = rules => [...rules].map(r => {
      if (r.selectorText !== undefined) return r.selectorText.split(',').some(s => ok(s.trim())) ? r.cssText : '';
      if (r.cssRules) { const inner = walk(r.cssRules).filter(Boolean).join('\n'); return inner ? r.cssText.replace(/\{[\s\S]*\}$/, '{' + inner + '}') : ''; }
      return r.cssText;
    }).filter(Boolean);
    // dedupe: identical top-level rule text keeps its last occurrence
    const top = walk(sheet.cssRules), seen = new Set(); const out = [];
    for (let i = top.length - 1; i >= 0; i--) if (!seen.has(top[i])) { seen.add(top[i]); out.unshift(top[i]); }
    return out.join('\n');
  }, [appCss, [...used], [...ids]]);
  // custom properties: keep those referenced by var() anywhere, transitively; keyframes: keep those named by an animation.
  let css = kept, prev;
  do { prev = css;
    const refs = new Set([...(css + screens).matchAll(/var\(\s*(--[\w-]+)/g)].map(m => m[1]));
    css = css.replace(/(?<=[{;\s])(--[\w-]+)\s*:[^;}]*;?/g, (m, v) => refs.has(v) ? m : '')
      .replace(/@property\s+(--[\w-]+)\s*\{[^}]*\}/g, (m, v) => refs.has(v) ? m : '')
      .replace(/(^|[{;\s])[^{};]*\{\s*\}/g, '$1');
  } while (css !== prev);
  const anims = new Set([...(css + screens).matchAll(/animation(?:-name)?\s*:\s*([^;}]+)/g)].flatMap(m => m[1].split(/[\s,]+/)));
  css = css.replace(/@keyframes\s+([\w-]+)\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g, (m, n) => anims.has(n) ? m : '');
  css = await page.evaluate(c => { const s = new CSSStyleSheet(); s.replaceSync(c); return [...s.cssRules].map(r => r.cssText).join('\n'); }, css); // canonical serialisation
  fs.writeFileSync(DIR + 'app.css', css);
  console.log('app.css'.padEnd(20), kb(appCss), '->', kb(css));
  // Classes and ids whose only rules were just purged have no effect either: drop them so a re-run is a no-op.
  for (const f of files) { const t = fs.readFileSync(DIR + f, 'utf8'), own = css + t.slice(0, t.indexOf('</style>')), ok = cssTokens(own), okId = idsUsed(own);
    fs.writeFileSync(DIR + f, t.replace(/ class="([^"]*)"/g, (m, v) => { const k = v.split(/\s+/).filter(c => ok.has(c)).join(' '); return k ? ` class="${k}"` : ''; })
      .replace(/ id="([^"]*)"/g, (m, v) => okId.has(v) ? m : '')); }
}
await browser.close(); server.close();
