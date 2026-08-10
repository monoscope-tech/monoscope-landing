// Re-captures the landing-page demo sequences from the live demo project.
// Usage: node scripts/demo-capture.mjs   (needs monoscope on localhost:8080 + `npm i -g playwright` + system Chrome + cwebp)
// Output: assets/demos/*.json specs + assets/demos/img/*.webp frames (via scratch PNGs in /tmp).
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
const { chromium } = createRequire(import.meta.url)(execSync('npm root -g').toString().trim() + '/playwright');
const P = 'http://localhost:8080/p/00000000-0000-0000-0000-000000000000';
const OUT = new URL('../assets/demos', import.meta.url).pathname;
const TMP = '/tmp/demo-capture-shots';
const W = 1440, H = 900;
fs.mkdirSync(TMP, {recursive: true}); fs.mkdirSync(`${OUT}/img`, {recursive: true});
const browser = await chromium.launch({channel:'chrome'});
const page = await browser.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
page.setDefaultTimeout(25000);
const hideScrollbars = () => page.addStyleTag({content:'::-webkit-scrollbar{display:none!important} *{scrollbar-width:none!important}'}).catch(()=>{});
const settle = async (ms=2500) => { await page.waitForLoadState('networkidle').catch(()=>{}); await page.waitForTimeout(ms); await hideScrollbars(); };
const shot = async name => { await page.screenshot({path:`${TMP}/${name}.png`}); return `${name}.webp`; };
const rectOf = async loc => { const b = await loc.boundingBox({timeout:8000}).catch(()=>null); return b ? [+((b.x+b.width/2)/W*100).toFixed(2), +((b.y+b.height/2)/H*100).toFixed(2)] : null; };
const specs = {};

// see-everything: explorer -> request detail -> trace waterfall
{
  await page.goto(P + '/log_explorer', {waitUntil:'networkidle'}); await settle(4000);
  const steps = [{img: await shot('explorer-01'), caption:'All your logs, traces and metrics — one query away', wait:1800}];
  const row = page.locator('div,tr', {hasText:'POST'}).filter({hasText:'ms'}).last();
  const rowAt = await rectOf(row);
  steps.push({cursor:rowAt, click:true});
  await row.click(); await settle(3000);
  steps.push({img: await shot('explorer-02'), caption:'Click any request to open its full context', wait:2200});
  const vt = page.locator('text=View trace').first();
  steps.push({cursor: await rectOf(vt), click:true});
  await vt.click(); await settle(4000);
  steps.push({img: await shot('explorer-03'), caption:'Jump straight into the distributed trace', wait:3000});
  specs['see-everything'] = {steps};
}

// know-instantly: issues list -> error-filtered explorer
{
  await page.goto(P + '/issues', {waitUntil:'networkidle'}); await settle(2500);
  const steps = [{img: await shot('issues-01'), caption:'Every error grouped into issues, newest first', wait:2000}];
  const link = page.locator('a[href*="/issues/"]').first();
  steps.push({cursor: await rectOf(link) || [35,25], click:true});
  await page.goto(P + '/log_explorer?query=' + encodeURIComponent('level == "ERROR"'), {waitUntil:'networkidle'}); await settle(4500);
  steps.push({img: await shot('issues-02'), caption:'Filter to errors and jump straight into the failing trace', wait:3000});
  specs['know-instantly'] = {steps};
}

// measure-anything: overview dashboard, top + scrolled
{
  await page.goto(P + '/', {waitUntil:'networkidle'}); await settle(4500);
  const steps = [{img: await shot('overview-01'), caption:'Golden signals for every service, out of the box', wait:2600}];
  await page.mouse.move(W/2, H/2); await page.mouse.wheel(0, 520); await page.waitForTimeout(2000); await hideScrollbars();
  steps.push({img: await shot('overview-02'), caption:'Service health, throughput and p95 in one table', wait:3000});
  specs['measure-anything'] = {steps};
}

// ask-like-colleague: endpoints list -> api catalog (dependencies)
{
  await page.goto(P + '/endpoints', {waitUntil:'networkidle'}); await settle(2500);
  const steps = [{img: await shot('endpoints-01'), caption:'Every endpoint catalogued automatically from live traffic', wait:2600}];
  await page.goto(P + '/api_catalog', {waitUntil:'networkidle'}); await settle(3000);
  steps.push({img: await shot('endpoints-02'), caption:'Plus every API you depend on — with live volumes and health', wait:3000});
  specs['ask-like-colleague'] = {steps};
}

// from-anywhere: AI bar typing -> query results
{
  await page.goto(P + '/log_explorer', {waitUntil:'networkidle'}); await settle(3500);
  const steps = [{img: await shot('ai-01'), wait:600}];
  const aiBox = page.locator('input[placeholder*="plain English"], textarea[placeholder*="plain English"], [contenteditable]').first();
  const b = await aiBox.boundingBox().catch(()=>null);
  const rect = b ? [b.x/W*100, b.y/H*100, b.width/W*100, b.height/H*100].map(v=>+v.toFixed(2)) : [8.5,11.6,79.6,3.5];
  steps.push({cursor:[rect[0]+4, rect[1]+rect[3]/2], click:true});
  steps.push({type:{at:[rect[0]+4, rect[1]+rect[3]/2], rect, text:'show me requests slower than 1 second'}, caption:'Ask in plain English'});
  await page.goto(P + '/log_explorer?query=' + encodeURIComponent('duration > 1s'), {waitUntil:'networkidle'}); await settle(4000);
  steps.push({img: await shot('ai-02'), caption:'Monoscope turns it into a query and runs it', wait:3200});
  specs['from-anywhere'] = {steps};
}

// monitors (curated names for the placeholder alerts)
{
  await page.goto(P + '/monitors', {waitUntil:'networkidle'}); await settle(2500);
  await page.evaluate(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const t = []; while (walker.nextNode()) { if (walker.currentNode.textContent.trim() === 'Test alert') t.push(walker.currentNode); }
    t.forEach((n,i) => { n.textContent = ['Checkout error rate spike','Payment p95 latency > 800ms'][i] || n.textContent; });
    let i2 = 0;
    document.querySelectorAll('*').forEach(el => { if (el.children.length === 0 && el.textContent.includes('| summarize count(*) by bin_auto(timestamp), status_code') && !el.textContent.includes('==')) el.textContent = i2++ === 0 ? 'status_code >= 500 | summarize count(*) by bin_auto(timestamp)' : 'duration > 800ms | summarize p95(duration) by bin_auto(timestamp)'; });
  });
  await page.mouse.move(720, 60); await page.waitForTimeout(800);
  specs['monitors'] = {steps:[{img: await shot('monitors-01'), caption:'Monitors run your queries on a schedule', wait:2400},{caption:'Get alerted the moment a threshold is crossed', wait:2600}]};
}

// weekly-reports (curated stats, broken imgs hidden)
{
  await page.goto(P + '/reports', {waitUntil:'domcontentloaded'}); await settle(3500);
  for (const fr of page.frames()) {
    await fr.evaluate(() => {
      document.querySelectorAll('img').forEach(im => { if (!im.complete || im.naturalWidth === 0) (im.closest('p,div') || im).style.display = 'none'; });
      [...document.querySelectorAll('*')].filter(el => el.children.length === 0 && el.textContent.trim() === '0').forEach((el, i) => { el.textContent = i === 0 ? '412K' : '27'; });
    }).catch(()=>{});
  }
  await page.mouse.move(720, 60); await page.waitForTimeout(700);
  specs['weekly-reports'] = {steps:[{img: await shot('reports-01'), caption:'A weekly digest of errors, regressions and anomalies', wait:2600},{caption:'Delivered to your inbox every Monday morning', wait:2600}]};
}

// change-detection (curated example rows cloned from the real api_change issue)
{
  await page.goto(P + '/issues?type=api_change', {waitUntil:'domcontentloaded'}); await settle(2500);
  await page.evaluate(() => {
    const fix = (root, title, subMethod, subPath, subHost, ago) => {
      const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      while (w.nextNode()) { const n = w.currentNode, t = n.textContent;
        if (t.includes('New endpoint detected: GET / on 10.42.1.78')) n.textContent = title;
        else if (t.trim() === 'GET') n.textContent = subMethod;
        else if (t.trim() === '/') n.textContent = subPath;
        else if (t.includes('10.42.1.78')) n.textContent = t.replace('10.42.1.78', subHost);
        else if (t.includes('4 weeks')) n.textContent = t.replace('4 weeks', ago);
      }
    };
    const rows = [...document.querySelectorAll('div,li,tr')].filter(el => el.textContent.includes('New endpoint detected: GET / on 10.42.1.78') && el.querySelector('input[type=checkbox]') && !el.textContent.includes('Search'));
    const row = rows.at(-1); if (!row) return;
    const specsRows = [
      ['New field detected: card_type in POST /api/payments response', 'POST', '/api/payments', 'payment', '2 hours'],
      ['New endpoint detected: POST /api/checkout on frontend', 'POST', '/api/checkout', 'frontend', '5 hours'],
      ['Payload shape changed: GET /api/products/{productId} on frontend', 'GET', '/api/products/{productId}', 'frontend', 'a day'],
    ];
    const clones = specsRows.slice(1).map(() => row.cloneNode(true));
    fix(row, ...specsRows[0]);
    clones.forEach((c,i) => { row.parentElement.appendChild(c); fix(c, ...specsRows[i+1]); });
    const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w2.nextNode()) { if (w2.currentNode.textContent.includes('1-1 of 1')) w2.currentNode.textContent = '1-3 of 3'; }
  });
  await page.waitForTimeout(400);
  specs['change-detection'] = {steps:[{img: await shot('changes-01'), caption:'Field-level API changes, caught the moment they ship', wait:2600},{caption:'New endpoints, removed fields, changed shapes — reviewed in one click', wait:3000}]};
}

for (const [name, spec] of Object.entries(specs)) fs.writeFileSync(`${OUT}/${name}.json`, JSON.stringify({w:W, h:H, ...spec}));
for (const f of fs.readdirSync(TMP).filter(f => f.endsWith('.png'))) execSync(`cwebp -q 82 -m 6 "${TMP}/${f}" -o "${OUT}/img/${f.replace('.png','.webp')}"`);
console.log('captured:', Object.keys(specs).join(', '));
await browser.close();
