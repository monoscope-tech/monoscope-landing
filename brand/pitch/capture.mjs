// Capture read-only views from the local demo: node brand/pitch/capture.mjs
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const output = fileURLToPath(new URL('./img/', import.meta.url));
const base = (process.env.MONOSCOPE_BASE || 'http://localhost:8080') + '/p/00000000-0000-0000-0000-000000000000';
// --only=issue,trace re-captures just those shots (tree needs trace); default captures everything.
const only = process.argv.find(a => a.startsWith('--only='))?.slice(7).split(','), want = n => !only || only.includes(n);
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1366, height: 1024 }, colorScheme: 'dark', deviceScaleFactor: 1 });
  // Recorded demo assets use an internal hostname. Resolve the original assets
  // from the OpenTelemetry demo repository, without changing the recording.
  await page.route('http://frontend-proxy:8080/**', async route => {
    const url = new URL(route.request().url());
    const path = url.pathname.startsWith('/images/')
      ? 'src/image-provider/static/' + url.pathname.slice('/images/'.length)
      : 'src/frontend/public' + url.pathname;
    const response = await page.request.get('https://raw.githubusercontent.com/open-telemetry/opentelemetry-demo/main/' + path);
    await route.fulfill({ response });
  });
  const open = async path => {
    await page.goto(base + path, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3500);
    await page.evaluate(() => document.fonts.ready);
  };
  // 90% scale: a 1518x1138 layout in a 1366x1024 image, so the explorer's list toolbar fits on one line beside a readable details panel
  const zoomedPage = () => browser.newPage({ viewport: { width: 1518, height: 1138 }, colorScheme: 'dark', deviceScaleFactor: 0.9 });
  // Use fictional names in the pitch capture. The demo project's data stays intact.
  const pseudonymise = pg => pg.evaluate(() => {
    const firstNames = ['Maya', 'Daniel', 'Sofia', 'Lukas', 'Amara', 'James', 'Priya', 'Samuel', 'Aisha', 'David', 'Nina', 'Joshua', 'Elena', 'Omar', 'Grace', 'Leo'];
    const lastNames = ['Chen', 'Ross', 'Martins', 'Weber', 'Okafor', 'Bennett', 'Shah', 'Joseph', 'Ahmed', 'Kim', 'Patel', 'Mensah', 'Garcia', 'Hassan', 'Williams', 'Santos'];
    const names = new Map();
    const rename = () => {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement.closest('script, style')) continue;
        const replacement = node.textContent.replace(/Demo shopper\s+[a-f0-9]+/gi, label => {
          const key = label.toLowerCase();
          if (!names.has(key)) {
            const index = names.size;
            names.set(key, firstNames[index % firstNames.length] + ' ' + lastNames[(index + Math.floor(index / firstNames.length)) % lastNames.length]);
          }
          return names.get(key);
        });
        if (replacement !== node.textContent) node.textContent = replacement;
      }
      document.querySelectorAll('.rum-avatar').forEach(avatar => {
        const scope = avatar.closest('tr, header');
        if (!scope) return;
        const name = [...names.values()].find(value => scope.textContent.includes(value));
        if (!name) return;
        const initials = name.split(' ').map(part => part[0]).join('');
        if (avatar.textContent !== initials) avatar.textContent = initials;
      });
    };
    rename();
    new MutationObserver(rename).observe(document.body, { childList: true, subtree: true, characterData: true });
    return names.size;
  });
  if (want('replay')) {
    await open('/rum?tab=sessions');
    const session = await page.locator('tr').filter({ hasText: '4 views' }).locator('a[href*="&session="]').first().getAttribute('href');
    await page.goto(new URL(session, base).href, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
    await page.locator('session-replay').getByRole('button', { name: 'Console', exact: true }).click();
    await page.locator('session-replay').evaluate(el => el.goTo(2000, true));
    await page.waitForTimeout(1500);
    const renamed = await pseudonymise(page);
    if (!renamed) throw new Error('No demo shopper labels found in the replay screen');
    console.log('Replaced demo shopper labels with', renamed, 'fictional names');
    await page.mouse.move(0, 0);
    if (/Demo shopper/i.test(await page.locator('body').innerText())) throw new Error('A demo shopper label remains visible');
    await page.screenshot({ path: output + 'session-replay.png' });
    console.log('Captured session replay:', page.url());
  }
  if (want('routines')) {
    await open('/ai/routines');
    await page.screenshot({ path: output + 'routines-current.png' });
    await page.screenshot({ path: output + 'routines.png' });
    console.log('Captured routines');
  }
  if (want('issue')) {
    // An error issue (not a log pattern or alert) with a stack trace and AI root cause
    await open('/issues?type=runtime_exception');
    await page.screenshot({ path: output + 'issues.png' });
    const issue = await page.locator('a[href*="/issues/"]').filter({ hasText: 'SyntaxError: Invalid JSON Response' }).first().getAttribute('href');
    if (!issue) throw new Error('No issue detail link found');
    await page.goto(new URL(issue, base).href, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(6000);
    await page.screenshot({ path: output + 'issue.png' });
    console.log('Captured issues and issue details');
  }
  if (want('explorer')) {
    const page = await zoomedPage();
    await page.goto(base + '/log_explorer', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3500);
    // Ask in plain language; the bar keeps the question above the query it generated
    await page.locator('text=Ask AI >> visible=true').first().click();
    await page.keyboard.type('checkout requests from the last hour');
    await page.keyboard.press('Enter');
    await page.waitForURL(/query=/, { timeout: 60000 });
    await page.waitForTimeout(5000);
    await pseudonymise(page);
    const liveToggle = page.locator('[data-live-toggle][aria-pressed="true"]');
    if (await liveToggle.count()) await liveToggle.first().click();
    const list = await page.locator('log-list').boundingBox();
    if (!list) throw new Error('No event list found');
    // Open the first request whose request and response bodies both have content (the JSON viewer offers "Collapse all" only then)
    const hasBody = async tab => {
      await page.getByText(tab).first().click();
      await page.waitForTimeout(800);
      return (await page.locator('text=Collapse all >> visible=true').count()) > 0;
    };
    let opened = false;
    for (let offset = 100; offset < 500 && !opened; offset += 25) { // rows start below the column header
      await page.mouse.click(list.x + Math.min(320, list.width / 3), list.y + offset);
      await page.waitForTimeout(1500);
      opened = (await page.getByText(/^Res Body$/).first().isVisible().catch(() => false)) && (await hasBody(/^Req Body$/)) && (await hasBody(/^Res Body$/));
    }
    if (!opened) throw new Error('No request with request and response bodies found');
    // Narrow the details panel until the list toolbar (Hide filters, row count, Tree/List/Options) fits on one line;
    // when it wraps, the list starts lower. Sets the width the way its splitter does (driving the splitter collapses it here).
    const oneLine = async () => (await page.locator('log-list').boundingBox()).y <= list.y + 2;
    const details = page.locator('#log_details_container');
    for (let w = (await details.boundingBox()).width; w > 300 && !(await oneLine()); w -= 10) {
      await details.evaluate((el, w) => { el.style.width = w + 'px'; document.body.dispatchEvent(new Event('loglist-resize')); }, w);
      await page.waitForTimeout(150);
    }
    if (!(await oneLine())) throw new Error('The list toolbar still wraps');
    await page.getByText(/^Req Body$/).first().click();
    await page.waitForTimeout(1000);
    await page.mouse.move(0, 0);
    await page.screenshot({ path: output + 'request.png' });
    await page.getByText(/^Res Body$/).first().click();
    await page.waitForTimeout(1000);
    await page.mouse.move(0, 0);
    await page.screenshot({ path: output + 'response.png' });
    console.log('Captured request and response');
  }
  if (want('trace')) {
    // A checkout trace fans out across ~10 services; collapse the add-to-cart branch so the checkout spans fill the view
    await open('/log_explorer?query=' + encodeURIComponent('name == "oteldemo.CheckoutService/PlaceOrder"'));
    const liveToggle = page.locator('[data-live-toggle][aria-pressed="true"]');
    if (await liveToggle.count()) await liveToggle.first().click();
    const list = await page.locator('log-list').boundingBox();
    if (!list) throw new Error('No event list found');
    // Prefer a single-item checkout: one add-to-cart branch, so collapsing it leaves the checkout fan-out in view
    const traces = new Set();
    for (const offset of [100, 128, 156, 184, 212, 240]) { // rows start below the column header
      await page.mouse.click(list.x + 400, list.y + offset);
      await page.waitForTimeout(2500);
      const link = page.locator('a[href*="showTrace="]');
      if (await link.count()) traces.add(await link.first().getAttribute('href'));
    }
    if (!traces.size) throw new Error('No trace link found for PlaceOrder');
    for (const trace of traces) {
      await page.goto(new URL(trace, base).href, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(4000);
      if (await page.getByText('user_checkout_single', { exact: true }).count()) break;
    }
    const branch = await page.getByText('user_add_to_cart', { exact: true }).first().boundingBox();
    if (!branch) throw new Error('No add-to-cart branch in the trace');
    await page.mouse.click(33, branch.y + branch.height / 2);
    await page.waitForTimeout(800);
    await page.mouse.move(0, 0);
    await page.screenshot({ path: output + 'trace.png' });
    console.log('Captured trace:', page.url());
    if (want('tree')) {
      // The same trace in the explorer's tree: spans, SQL, redis calls and logs nested under the root
      const traceId = decodeURIComponent(page.url()).match(/showTrace=([0-9a-f]{32})/)[1];
      const tree = await zoomedPage();
      await tree.goto(base + '/log_explorer?since=24H&query=' + encodeURIComponent(`context.trace_id == "${traceId}"`), { waitUntil: 'domcontentloaded' });
      await tree.waitForTimeout(5000);
      await tree.locator('button[aria-label^="Expand trace"]').first().click();
      await tree.locator('.toggle-filters').first().check({ force: true });
      await tree.waitForTimeout(1500);
      await pseudonymise(tree);
      await tree.mouse.move(0, 0);
      await tree.screenshot({ path: output + 'trace-tree.png' });
      console.log('Captured trace tree');
    }
  }
  if (want('ai')) {
    await open('/ai/e599e4f8-302f-42bf-8cc8-d6404c37e448');
    await page.screenshot({ path: output + 'ai-chat.png' });
    console.log('Captured AI conversation');
  }
} finally {
  await browser.close();
}
