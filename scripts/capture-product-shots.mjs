// Captures product screenshots from the public monoscope demo project, in dark and light themes.
// Usage: node scripts/capture-product-shots.mjs [shot-name ...]   (no args = all shots)
// Needs global Playwright (npm i -g playwright) and cwebp. Output: assets/img/product/<name>-<theme>.webp
import { execSync } from 'node:child_process';
import { mkdtempSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const { chromium } = await import(join(execSync('npm root -g').toString().trim(), 'playwright/index.mjs'));

const HOST = 'https://app.monoscope.tech';
const P = `${HOST}/p/00000000-0000-0000-0000-000000000000`;
const OUT = new URL('../assets/img/product/', import.meta.url).pathname;
const TMP = mkdtempSync(join(tmpdir(), 'shots-'));
const MAX_BYTES = 400 * 1024;

// Demo-only CTAs, chat widgets, toasts and a demo-specific Slack auth warning are hidden.
const HIDE_CSS = `
  a[href*="calendar.app.google"], a[href="/login"], #intercom-container, .intercom-lightweight-app,
  [id^="posthog"], .PostHogSurvey, #toast-container, .toast, [data-sonner-toaster] { display: none !important; }
  * { caret-color: transparent !important; }`;

const q = s => encodeURIComponent(s);
const click = (pg, sel, opts) => pg.locator(sel, opts).first().click();

const shots = [
  { name: 'log-explorer', path: '/log_explorer' },
  { name: 'log-explorer-request', path: `/log_explorer?query=${q('body.response_body != null')}`,
    act: async pg => { await click(pg, 'tr.item-row', { hasText: '/api/products/' }); await pg.getByText('Res Body').first().click(); } },
  // A 96-span checkout trace that ended in a shipping error (linked from issue #113627).
  { name: 'trace', path: `/log_explorer?query=${q('trace_id=="71a7e99c2d3e2d94125752b4c4df918d"')}&from=2026-10-28T14:50:00Z&to=2026-10-28T15:00:00Z`,
    act: async pg => { await click(pg, 'tr.item-row'); await pg.waitForTimeout(2500); await pg.getByText('View trace').first().click(); } },
  { name: 'issues', path: '/issues' },
  { name: 'issue-detail', path: '/issues/e76bd12d-0c56-4779-a348-79e758105791' },
  { name: 'dashboard-overview', path: '/dashboards/6f5ee51d-900d-455c-99d9-2f62e6c023b8/tab/overview' },
  { name: 'dashboard-service', path: '/dashboards/6f5ee51d-900d-455c-99d9-2f62e6c023b8/tab/service?var-service=frontend' },
  { name: 'session-replay', path: '/rum/sessions',
    act: async pg => { // replay the longest session
      const rows = pg.locator('tr.item-row', { has: pg.locator('[aria-label="Replay session recording"]') });
      const counts = await rows.evaluateAll(rs => rs.map(r => +(r.textContent.match(/(\d+(?:\.\d+)?) s(?!\w)/) || [0, 0])[1]));
      await rows.nth(counts.indexOf(Math.max(...counts))).locator('[aria-label="Replay session recording"]').click();
      // first play loads the recording; restarting it captures a frame a few seconds in, with no end card
      await pg.getByText('Replay from start').click({ timeout: 60000 }); await pg.waitForTimeout(2000); } },
  { name: 'ai-chat', path: '/ai/757db319-a5b3-431c-bd47-bedb08f33cf3',
    act: async pg => { await pg.mouse.move(720, 400); await pg.mouse.wheel(0, 100); } },
  { name: 'routines', path: '/ai/routines' },
  { name: 'monitors', path: '/monitors' },
  { name: 'api-catalog', path: '/api_catalog' },
  { name: 'metrics', path: '/metrics' },
  { name: 'service-map', path: '/service_map' },
  // Schema-change issue: a response field's inferred format changed, shown as a before/after diff.
  { name: 'api-changes', path: '/issues/dd87a53a-b8bb-4236-9ae2-0360834e73d7' },
  { name: 'settings-api-keys', path: '/apis' },
  { name: 'settings-integrations', path: '/settings/integrations',
    act: pg => pg.evaluate(() => { const w = [...document.querySelectorAll('div')].filter(d => d.textContent.includes('Slack rejected')).at(-1); w && (w.style.display = 'none'); }) },
  // The demo has no invited members, so the Teams tab (the @everyone team) is the populated view.
  { name: 'settings-members', path: '/manage_teams' },
  { name: 'onboarding', path: '/onboarding?step=Integration',
    act: async pg => { await pg.getByText('Javascript', { exact: true }).first().click();
      await pg.evaluate(() => { // mask the project API key wherever it renders
        const mask = t => t.replace(/[A-Za-z0-9+/=]{30,}/g, k => k.slice(0, 8) + '•'.repeat(24));
        document.querySelectorAll('input, textarea').forEach(i => { i.value = mask(i.value); });
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (w.nextNode()) w.currentNode.nodeValue = mask(w.currentNode.nodeValue); }); } },
];

async function settle(pg) {
  await pg.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
  await pg.evaluate(() => document.fonts.ready);
  await pg.waitForFunction(() => !document.querySelector('.htmx-request, .loading-spinner, .skeleton, .loading:not(.hidden)'), null, { timeout: 20000 }).catch(() => {});
  await pg.waitForTimeout(3000); // chart enter animations
}

async function capture(theme, only) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, timezoneId: 'UTC' });
  await ctx.addCookies([{ name: 'theme', value: theme, domain: 'app.monoscope.tech', path: '/' }]);
  for (const s of shots.filter(s => !only.length || only.includes(s.name))) {
    const pg = await ctx.newPage();
    try {
      await pg.goto(P + s.path, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await settle(pg);
      await pg.addStyleTag({ content: HIDE_CSS });
      if (s.act) { await s.act(pg); await settle(pg); }
      await pg.mouse.move(1439, 899);
      const png = join(TMP, `${s.name}-${theme}.png`), webp = join(OUT, `${s.name}-${theme}.webp`);
      await pg.screenshot({ path: png });
      for (const resize of ['', '-resize 2400 0', '-resize 2000 0']) {
        execSync(`cwebp -quiet -q 86 -m 6 -sharp_yuv ${resize} "${png}" -o "${webp}"`);
        if (statSync(webp).size <= MAX_BYTES) break;
      }
      console.log(`${s.name}-${theme}`, Math.round(statSync(webp).size / 1024) + 'KB');
    } catch (e) { console.error(`FAILED ${s.name}-${theme}: ${e.message.split('\n')[0]}`); }
    await pg.close();
  }
  await browser.close();
}

const only = process.argv.slice(2);
await Promise.all(['dark', 'light'].map(t => capture(t, only)));
console.log('PNG sources in', TMP);
