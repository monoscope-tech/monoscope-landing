# Weekly Ads Report

Internal (under `brand/`, excluded from the site build). Work item 5 of `../growth-plan.md`: GitHub stars and ad spend, read side by side every Monday.

## Every Monday

1. `node stars.mjs` (Node 20+, no installs). It uses `GITHUB_TOKEN`, or `gh auth token` if that is unset. It rewrites `stars-daily.csv`, prints the last 14 days and, if the token has push access to the repo, saves `traffic-YYYY-MM-DD.json` (GitHub keeps only 14 days of traffic, so a weekly run keeps the history unbroken).
2. Export last week's daily rows from each ad platform (Google Ads, Reddit, Meta, LinkedIn) and append them to `spend.csv`, one row per date, platform and campaign. Wrap a campaign name in double quotes if it contains a comma.
3. `node weekly.mjs` (or `node weekly.mjs 12` for 12 weeks).
4. Act on every kill-rule line, then commit the CSVs and the traffic file.

## Columns

`stars-daily.csv`: `date` (UTC), `new_stars` that day, running `total`. Unstars are not visible: the total is current stargazers, so days before an unstar read slightly low.

`spend.csv`: `spend` in USD, `clicks`, `impressions`, `conversions_signup` (the platform's `signup` conversion), `conversions_github_intent` (the `github_star_intent` click). An optional `conversions_activated` column turns on the cost-per-activated rule.

## What `weekly.mjs` prints

Weeks start Monday (UTC). The current week is partial.

| Column | Meaning |
|---|---|
| one column per platform | spend that week |
| `spend` | total spend |
| `signups`, `gh_intent` | platform-reported conversions, summed |
| `new_stars` | all stars that week, paid and organic |
| `vs_base` | `new_stars` minus the organic baseline (mean of the 4 weeks before the first spend) |
| `cost_per_star` | spend / all new stars: a floor on the true cost, because organic stars are in the count |
| `cost_per_signup` | spend / platform-reported signups |

Kill rules from `../campaigns.md`, checked on each campaign's cumulative totals:

- CTR < 2% after 1,000 impressions: rewrite the RSA once, then pause.
- Click → signup < 3% after 300 clicks: fix the landing page or pause.
- Cost per activated > $400 (only with `conversions_activated`): pause.

## Caveats

- **Stars cannot be attributed per click.** GitHub sends no callback. Read `new_stars` and `vs_base` against campaign windows: start and stop star campaigns on clean dates, and compare with the weeks before. `gh_intent` is the only per-campaign signal.
- One-off spikes (a Reddit post, a newsletter, a Hacker News mention) move stars more than small ad budgets. Check the referrers in the traffic file before giving a campaign the credit.
- Platform conversion counts use each platform's own attribution window and overlap: one signup can be claimed by Google and Meta. The app's signup count is the ground truth.
