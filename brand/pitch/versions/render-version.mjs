// node render-version.mjs <file.html>  → same name .pdf
import { createRequire } from 'module'; import { execSync } from 'child_process'; import { resolve } from 'path';
const { chromium } = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright');
const src = resolve(process.argv[2]); const b = await chromium.launch(), p = await b.newPage();
await p.goto('file://' + src, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: src.replace(/\.html$/, '.pdf'), preferCSSPageSize: true, printBackground: true }); await b.close();
