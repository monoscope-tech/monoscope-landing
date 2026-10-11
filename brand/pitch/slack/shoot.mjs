// Screenshots slack.html to ../img/slack-thread.png: node brand/pitch/slack/shoot.mjs
import { createRequire } from 'module'; import { execSync } from 'child_process'; import { fileURLToPath } from 'url';
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const dir = fileURLToPath(new URL('.', import.meta.url));
const b = await chromium.launch(), p = await b.newPage({ viewport: { width: 1366, height: 1024 }, deviceScaleFactor: 1 });
await p.goto('file://' + dir + 'slack.html', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: dir + '../img/slack-thread.png', omitBackground: true }); await b.close();
