#!/usr/bin/env node
// Daily GitHub stars for monoscope-tech/monoscope -> stars-daily.csv, plus a traffic snapshot when the token has push access.
import { execSync } from 'node:child_process';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const REPO = 'monoscope-tech/monoscope', dir = new URL('.', import.meta.url).pathname;
const token = process.env.GITHUB_TOKEN || execSync('gh auth token').toString().trim();
const gh = (path, accept = 'application/vnd.github+json') =>
  fetch(`https://api.github.com/repos/${REPO}${path}`, { headers: { Authorization: `Bearer ${token}`, Accept: accept } });
const day = (d) => d.toISOString().slice(0, 10);

const starredAt = [];
for (let page = 1; ; page++) {
  const res = await gh(`/stargazers?per_page=100&page=${page}`, 'application/vnd.github.star+json');
  if (!res.ok) throw new Error(`stargazers page ${page}: ${res.status} ${await res.text()}`);
  const batch = await res.json();
  starredAt.push(...batch.map((s) => s.starred_at.slice(0, 10)));
  if (batch.length < 100) break;
}

const counts = starredAt.reduce((m, d) => m.set(d, (m.get(d) || 0) + 1), new Map());
const rows = [];
for (let d = new Date(starredAt.sort()[0]), total = 0, today = day(new Date()); day(d) <= today; d.setUTCDate(d.getUTCDate() + 1)) {
  const n = counts.get(day(d)) || 0;
  rows.push([day(d), n, (total += n)]);
}
writeFileSync(`${dir}stars-daily.csv`, ['date,new_stars,total', ...rows.map((r) => r.join(','))].join('\n') + '\n');
console.log(`${REPO}: ${starredAt.length} stars (days in UTC). Last 14 days:`);
console.table(rows.slice(-14).map(([date, new_stars, total]) => ({ date, new_stars, total })));

const [refs, views] = await Promise.all(['/traffic/popular/referrers', '/traffic/views'].map((p) => gh(p)));
if (!refs.ok || !views.ok) console.log(`traffic skipped: token lacks push access (${refs.status}/${views.status})`);
else {
  const file = `traffic-${day(new Date())}.json`;
  const snaps = existsSync(dir + file) ? JSON.parse(readFileSync(dir + file, 'utf8')) : [];
  snaps.push({ fetched_at: new Date().toISOString(), referrers: await refs.json(), views: await views.json() });
  writeFileSync(dir + file, JSON.stringify(snaps, null, 2) + '\n');
  const { count, uniques } = snaps.at(-1).views;
  console.log(`traffic (last 14 days): ${count} views, ${uniques} unique visitors -> ${file}`);
  console.table(snaps.at(-1).referrers);
}
