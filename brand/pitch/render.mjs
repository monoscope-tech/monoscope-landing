// Renders monoscope-pitch.html to monoscope-pitch.pdf: node brand/pitch/render.mjs
import { createRequire } from 'module'; import { execSync } from 'child_process'; import { fileURLToPath } from 'url';
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const dir = fileURLToPath(new URL('.', import.meta.url));
const b = await chromium.launch(), p = await b.newPage();
await p.goto('file://' + dir + 'monoscope-pitch.html', { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: dir + 'monoscope-pitch.pdf', preferCSSPageSize: true, printBackground: true });
await b.close();
