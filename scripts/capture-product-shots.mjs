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
const hideFilters = pg => pg.locator('#toggle-filters').check({ force: true }); // the explorer's "Hide filters" toggle
const maskKey = pg => pg.evaluate(() => { // mask the project API key wherever it renders
  const mask = t => t.replace(/[A-Za-z0-9+/=]{30,}/g, k => k.slice(0, 8) + '•'.repeat(24));
  document.querySelectorAll('input, textarea').forEach(i => { i.value = mask(i.value); });
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) w.currentNode.nodeValue = mask(w.currentNode.nodeValue); });
// Onboarding, Javascript picked; gives the tile time to show its "verified" badge (data is flowing).
const pickJs = async pg => { await pg.getByText('Javascript', { exact: true }).first().click(); await pg.getByText('verified').first().waitFor({ timeout: 45000 }).catch(() => {}); };

const shots = [
  { name: 'log-explorer', path: '/log_explorer' },
  { name: 'log-explorer-request', path: `/log_explorer?query=${q('body.response_body != null')}`,
    act: async pg => { await hideFilters(pg); await click(pg, 'tr.item-row', { hasText: '/api/products/' }); await pg.getByText('Res Body').first().click(); } },
  // Ask AI turns the question into a query (each theme is a live AI call; this question reliably yields `duration > 1s`).
  { name: 'log-explorer-ask', path: '/log_explorer',
    act: async pg => { const i = pg.locator('#ai-search-input'); await i.fill('requests that took longer than 1 second'); await i.press('Enter');
      await pg.waitForURL(/query=/, { timeout: 60000 }); await pg.waitForTimeout(4000);
      // the row-count label sometimes shows only the live-polled rows; fail so the run can be repeated
      await pg.waitForFunction(() => /K$/.test(document.getElementById('row-count-display')?.textContent ?? ''), null, { timeout: 20000 })
        .catch(() => { throw new Error('row count not loaded: ' + pg.url()); }); } },
  // A load-generator checkout trace (dozens of spans across 5+ services) expanded inline in the list.
  { name: 'trace-inline', path: `/log_explorer?query=${q('name has "user_checkout"')}`,
    act: async pg => { await hideFilters(pg); await click(pg, 'button[aria-label^="Expand trace"]'); } },
  // A 96-span checkout trace that ended in a shipping error (linked from issue #113627).
  { name: 'trace', path: `/log_explorer?query=${q('trace_id=="71a7e99c2d3e2d94125752b4c4df918d"')}&from=2026-10-28T14:50:00Z&to=2026-10-28T15:00:00Z`,
    act: async pg => { await click(pg, 'tr.item-row'); await pg.waitForTimeout(2500); await pg.getByText('View trace').first().click(); } },
  { name: 'issues', path: '/issues' },
  { name: 'issue-detail', path: '/issues/e76bd12d-0c56-4779-a348-79e758105791' },
  { name: 'dashboard-overview', path: '/dashboards/6f5ee51d-900d-455c-99d9-2f62e6c023b8/tab/overview' },
  { name: 'dashboard-service', path: '/dashboards/6f5ee51d-900d-455c-99d9-2f62e6c023b8/tab/service?var-service=frontend-proxy' },
  // Session "Demo shopper b50add89" (pinned by replay id and time window), on the shop's landing hero. Every demo session
  // records product images from the shop's internal host (frontend-proxy:8080), so pages with products show alt text.
  // The player autoplays (and may have finished by now); rewinding the 20 s session to 0 and shooting 2 s later, without a
  // settle, keeps it mid-playback on the hero (pausing adds a play overlay).
  { name: 'session-replay', noSettle: true,
    path: `/log_explorer?viz_type=sessions&query=${q('(resource.telemetry.sdk.language in ("webjs", "javascript", "js") or resource.user_agent.original != null or name in ("documentLoad", "documentFetch") or name startswith "Pageview ")')}&from=2026-10-30T11:00:00Z&to=2026-10-30T11:10:00Z&session_replay=ef29be47-ef21-48ce-9fa3-8ed687aed755`,
    act: async pg => { for (const _ of [1, 2, 3]) await pg.locator('button[aria-label="Back 10 seconds"]').click({ timeout: 60000 }); await pg.waitForTimeout(2000); } },
  { name: 'ai-chat', path: '/ai/757db319-a5b3-431c-bd47-bedb08f33cf3',
    act: async pg => { await pg.mouse.move(720, 400); await pg.mouse.wheel(0, 100); } },
  { name: 'routines', path: '/ai/routines' },
  { name: 'monitors', path: '/monitors' },
  { name: 'api-catalog', path: '/api_catalog' },
  { name: 'metrics', path: '/metrics' },
  { name: 'service-map', path: '/service_map', // pan down so the first node clears the "Requests flow left to right" chip
    act: async pg => { await pg.mouse.move(1300, 760); await pg.mouse.down(); await pg.mouse.move(1300, 815, { steps: 8 }); await pg.mouse.up(); } },
  // Endpoint Analytics, Latency tab for POST /api/checkout: p50–p99 cards and percentiles over time.
  { name: 'apm-endpoint', path: '/dashboards/be6c5d62-d365-45c0-85f3-dbd133c5cda4/tab/latency?var-endpointHash=a213f867&var-host=frontend' },
  // Schema-change issue: a response field's inferred format changed, shown as a before/after diff.
  { name: 'api-changes', path: '/issues/dd87a53a-b8bb-4236-9ae2-0360834e73d7' },
  { name: 'settings-api-keys', path: '/apis' },
  { name: 'settings-integrations', path: '/settings/integrations',
    act: pg => pg.evaluate(() => { const w = [...document.querySelectorAll('div')].filter(d => d.textContent.includes('Slack rejected')).at(-1); w && (w.style.display = 'none'); }) },
  // The demo has no invited members (Members tab is empty), so this shows the Teams tab with the Create Team dialog open
  // (members, email and Slack routing). Nothing is submitted.
  { name: 'settings-members', path: '/manage_teams', act: pg => pg.getByText('New Team').first().click() },
  { name: 'onboarding', path: '/onboarding?step=Integration',
    act: async pg => { await pickJs(pg); await maskKey(pg); } },
  // Same step, scrolled to the guide's OTLP exporter env vars (endpoint + API key resource attribute).
  { name: 'otel-setup', path: '/onboarding?step=Integration',
    act: async pg => { await pickJs(pg); await pg.locator('h2', { hasText: 'OpenTelemetry Configuration' }).first().evaluate(e => e.scrollIntoView({ block: 'start' })); await maskKey(pg); } },
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
      if (s.act) { await s.act(pg); s.noSettle || await settle(pg); }
      await pg.mouse.move(1439, 899);
      const png = join(TMP, `${s.name}-${theme}.png`), webp = join(OUT, `${s.name}-${theme}.webp`);
      await pg.screenshot({ path: png });
      for (const resize of ['', '-resize 2400 0', '-resize 2000 0']) {
        execSync(`cwebp -quiet -q 80 -m 6 -sharp_yuv ${resize} "${png}" -o "${webp}"`);
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
