#!/usr/bin/env node
// Weekly ads report: joins stars-daily.csv and spend.csv by date. Usage: node weekly.mjs [weeks=8]
import { readFileSync } from 'node:fs';

const dir = new URL('.', import.meta.url).pathname, weeks = +process.argv[2] || 8;
const csv = (f) => {
  const [head, ...lines] = readFileSync(dir + f, 'utf8').trim().split('\n').filter((l) => l.trim());
  const cells = (l) => [...l.matchAll(/("([^"]|"")*"|[^,]*)(,|$)/g)].slice(0, -1).map((m) => m[1].replace(/^"|"$/g, '').replace(/""/g, '"'));
  const keys = cells(head);
  return lines.map((l) => Object.fromEntries(cells(l).map((v, i) => [keys[i], isNaN(v) || v === '' ? v : +v])));
};
const monday = (d) => { const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7)); return t.toISOString().slice(0, 10); };
const sum = (rows, k) => rows.reduce((a, r) => a + (+r[k] || 0), 0);
const money = (n, d) => (n && d ? `$${(n / d).toFixed(2)}` : '-');
const group = (rows, key) => rows.reduce((m, r) => m.set(key(r), [...(m.get(key(r)) || []), r]), new Map());

const stars = csv('stars-daily.csv'), spend = csv('spend.csv');
const platforms = [...new Set(spend.map((r) => r.platform))].sort();
const starsBy = group(stars, (r) => monday(r.date)), spendBy = group(spend, (r) => monday(r.date));
const allWeeks = [...starsBy.keys()].sort();

// Organic baseline: mean weekly stars over the 4 full weeks before the first spend (or before the report window).
const firstSpend = spend.map((r) => r.date).sort()[0];
const pivot = firstSpend ? allWeeks.indexOf(monday(firstSpend)) : allWeeks.length - weeks;
const base = allWeeks.slice(Math.max(0, pivot - 4), pivot).reduce((a, w) => a + sum(starsBy.get(w), 'new_stars'), 0) / Math.min(4, Math.max(1, pivot));

console.table(allWeeks.slice(-weeks).map((week) => {
  const s = spendBy.get(week) || [], total = sum(s, 'spend'), newStars = sum(starsBy.get(week), 'new_stars'), signups = sum(s, 'conversions_signup');
  return {
    week, ...Object.fromEntries(platforms.map((p) => [p, +sum(s.filter((r) => r.platform === p), 'spend').toFixed(2)])),
    spend: +total.toFixed(2), signups, gh_intent: sum(s, 'conversions_github_intent'), new_stars: newStars,
    vs_base: +(newStars - base).toFixed(1), cost_per_star: money(total, newStars), cost_per_signup: money(total, signups),
  };
}));
console.log(`Organic star baseline: ${base.toFixed(1)}/week (4 weeks before ${firstSpend ? 'first spend ' + firstSpend : 'this window'}).`);

// Kill rules from brand/ads/campaigns.md, on each campaign's cumulative totals.
const flags = [...group(spend, (r) => `${r.platform} / ${r.campaign}`)].flatMap(([name, rows]) => {
  const [cost, clicks, imps, signups] = ['spend', 'clicks', 'impressions', 'conversions_signup'].map((k) => sum(rows, k));
  const activated = 'conversions_activated' in rows[0] ? sum(rows, 'conversions_activated') : null;
  return [
    imps >= 1000 && clicks / imps < 0.02 && `CTR ${((clicks / imps) * 100).toFixed(2)}% < 2% after ${imps} impressions: rewrite RSA once, then pause`,
    clicks >= 300 && signups / clicks < 0.03 && `click->signup ${((signups / clicks) * 100).toFixed(2)}% < 3% after ${clicks} clicks: fix page or pause`,
    activated !== null && cost > 400 && (activated === 0 || cost / activated > 400) && `cost per activated ${activated ? money(cost, activated) : `$${cost} with 0 activated`} > $400: pause`,
  ].filter(Boolean).map((rule) => ({ campaign: name, rule }));
});
if (flags.length) console.table(flags);
else console.log(spend.length ? 'No campaign hits a kill rule.' : 'spend.csv is empty: fill it from the platform exports.');
if (spend.length && !('conversions_activated' in spend[0])) console.log('Cost per activated not checked: add a conversions_activated column to spend.csv.');
