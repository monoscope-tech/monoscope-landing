#!/usr/bin/env python3
"""Single source for the Google Ads kit. Run: python3 brand/ads/build.py

Writes rsa.csv, keywords.csv, negatives.csv (launchable campaigns), draft/*.csv (C3, blocked),
the generated section of campaigns.md, then runs every copy check and exits non-zero on failure.
"""
import csv, re, sys
from pathlib import Path

HERE = Path(__file__).parent
GEOS = {"US": "United States", "EU": "EEA + UK + CH, English"}

# Campaigns: key -> (name, geos, blocked)
CAMPAIGNS = {
    "C1": ("C1 Conquest", ["US", "EU"], False),
    "C2": ("C2 Cost", ["US", "EU"], False),
    "C3": ("C3 Ownership", ["US", "EU"], True),
    "C4": ("C4 Brand", ["US", "EU"], False),
    "C5": ("C5 Category", ["US", "EU"], False),
}

# Shared copy. Facts only from brand/site-plan.md and pricing/index.md.
H_POOL = [
    "Request Bodies Included", "$1 per Million Events", "Free up to 10k Events a Day",
    "From $29/Month for 20M Events", "No Host or Seat Fees", "Open Source, AGPL-3.0",
    "Hosted in the EU or US", "AI SRE That Reads the Request", "Logs, Traces and Metrics",
    "Unlimited Team Members", "No Credit Card to Start", "AI SRE Answers in Slack",
    "Know What Happened. Prove It.", "Self-Host It for Free", "Start for Free",
]
D_POOL = {
    "price": "Free up to 10k events a day. Cloud is $29/month for 20M events, then $1 per million.",
    "bodies": "Request and response bodies never add to the bill. No host fees, no seat fees.",
    "ai": "The AI SRE investigates with the failing request and response in front of it.",
    "oss": "Open source under AGPL-3.0. Use monoscope Cloud in the EU or US, or self-host it.",
    "paid": "Paid plans keep every event unsampled, with request and response bodies included.",
    "stack": "Logs, traces, metrics, errors and session replay, each linked to the exact request.",
}

def g(cid, gid, url, status, kws, h, d, path, cap, neg=(), fallback=None, geos=None, rsa_b=None, why=""):
    return dict(cid=cid, gid=gid, url=url, status=status, kws=kws, h=h, d=d, path=path, cap=cap,
                neg=list(neg), fallback=fallback, geos=geos or CAMPAIGNS[cid][1], rsa_b=rsa_b, why=why)

def conquest(name, slug, status, kws, a_lines, b_pin, b_lines, d, cap=8, neg=(), why=""):
    """Two RSAs: A echoes the competitor name (may be limited by trademark), B carries none."""
    url = f"{U}/compare/{slug}/"
    return g("C1", slug, url, status, kws, [f"{name} Alternative"] + a_lines + [b_pin] + b_lines, d,
             ("compare", slug[:15]), cap, neg, why=why,
             rsa_b=dict(h=[b_pin] + b_lines, d=[x for x in d if name.split()[0].lower() not in x.lower()],
                        path=("compare", "observability")))

U = "https://monoscopehq.com"
GROUPS = [
    # C1 Conquest: alternatives. Branded lines only in RSA A.
    conquest("Datadog", "datadog", "live",
             ["datadog alternative", "datadog alternatives", "alternatives to datadog", "datadog competitors",
              "datadog replacement", "open source datadog alternative", "cheaper datadog alternative"],
             ["Datadog vs monoscope", "Switching From Datadog?"],
             "Priced per Event, Not per Host",
             ["Every Error With Its Request", "OpenTelemetry Native", "Move With an OTel Exporter"],
             ["Priced per event, not per host. Request and response bodies included at no extra cost.",
              D_POOL["ai"]], cap=10, neg=["datadog api", "datadog docs", "datadog status"],
             why="datadog competitors 720/mo, datadog alternatives 320/mo"),
    conquest("New Relic", "newrelic", "live",
             ["new relic alternative", "new relic alternatives", "alternatives to new relic",
              "new relic competitors", "newrelic alternative", "new relic replacement"],
             ["Compare New Relic Pricing", "Switching From New Relic?"],
             "APM Without Per-Seat Fees",
             ["Priced per Event, Not per GB", "Every Error With Its Request", "OpenTelemetry Native"],
             ["One price per event. No per-user fees, unlimited team members, bodies included.",
              D_POOL["ai"]], why="new relic alternatives 180-260/mo"),
    conquest("Sentry", "sentry", "live",
             ["sentry alternative", "sentry alternatives", "alternatives to sentry", "sentry competitors",
              "sentry.io alternative", "open source sentry alternative"],
             ["Sentry vs monoscope", "More Than the Stack Trace"],
             "Error Tracking With Requests",
             ["See the Request Behind Errors", "Errors Plus Logs and Traces", "Alerts in Slack or PagerDuty"],
             ["Each error comes with the headers, body and response of the request that caused it.",
              D_POOL["ai"]], cap=6, neg=["sentry mode", "sentry safe", "sentry gun", "sentry self hosted"],
             why="sentry alternative 80-90/mo; page live"),
    conquest("Splunk", "splunk", "building",
             ["splunk alternative", "splunk alternatives", "alternatives to splunk", "splunk competitors",
              "splunk replacement", "open source splunk alternative", "splunk observability alternative"],
             ["Splunk vs monoscope", "Leaving Splunk?"],
             "Log Management at $1/M Events",
             ["Search Logs in Plain English", "Every Log Linked to Its Trace", "OpenTelemetry Native"],
             ["Logs, traces and API requests in one Explorer. KQL or plain-English queries, live tail.",
              D_POOL["price"]], cap=13, neg=["siem", "soar", "enterprise security", "splunk phantom", "cyber"],
             why="splunk alternative 480-600/mo, $18.59 CPC"),
    conquest("Grafana", "grafana", "building",
             ["grafana alternative", "grafana alternatives", "alternatives to grafana", "grafana competitors",
              "grafana cloud alternative"],
             ["Grafana vs monoscope", "Switching From Grafana?"],
             "Dashboards on Logs and Traces",
             ["Alerts on Any Query", "From a Spike to the Request", "20 Dashboard Templates"],
             ["Chart latency, traffic and errors, alert on any query and click through to the request.",
              D_POOL["price"]], neg=["grafana tutorial", "grafana plugin", "grafana docker"],
             why="grafana alternative 110/mo"),
    conquest("ELK", "elastic", "building",
             ["elk alternative", "elk stack alternative", "alternatives to elk stack", "kibana alternative",
              "elastic observability alternative", "elasticsearch logging alternative"],
             ["ELK vs monoscope", "Leaving the ELK Stack?"],
             "Log Search Without a Cluster",
             ["Search Logs in Plain English", "Every Log Linked to Its Trace", "OpenTelemetry Native"],
             ["Logs, traces and API requests in one Explorer. KQL or plain-English queries, live tail.",
              D_POOL["price"]], neg=["elastic band", "elk hunting", "elk lodge", "vector search", "full text search"],
             why="elk alternative 44/mo"),
    conquest("LogRocket", "logrocket", "building",
             ["logrocket alternative", "logrocket alternatives", "alternatives to logrocket", "logrocket competitors"],
             ["LogRocket vs monoscope", "Switching From LogRocket?"],
             "Replay Plus the Backend Trace",
             ["Session Replay for Engineers", "Replays at $1 per 1,000", "Web Vitals and Browser Errors"],
             ["Replay the customer's screen when it broke, then open the backend trace behind it.",
              D_POOL["price"]], neg=["heatmap", "heatmaps", "marketing", "ux research"],
             why="logrocket alternative 44/mo"),
    conquest("FullStory", "fullstory", "building",
             ["fullstory alternative", "fullstory alternatives", "alternatives to fullstory", "fullstory competitors"],
             ["FullStory vs monoscope", "Switching From FullStory?"],
             "Session Replay for Engineers",
             ["Replay Plus the Backend Trace", "Replays at $1 per 1,000", "Web Vitals and Browser Errors"],
             ["Replay the customer's screen when it broke, then open the backend trace behind it.",
              D_POOL["price"]], neg=["heatmap", "heatmaps", "marketing", "ux research", "product analytics"],
             why="fullstory alternative 44/mo"),
    conquest("Dynatrace", "dynatrace", "building",
             ["dynatrace alternative", "dynatrace alternatives", "alternatives to dynatrace", "dynatrace competitors"],
             ["Dynatrace vs monoscope", "Switching From Dynatrace?"],
             "APM Priced per Event",
             ["Every Error With Its Request", "OpenTelemetry Native", "Move With an OTel Exporter"],
             ["Latency, errors and the slow request's trace, priced per event with bodies included.",
              D_POOL["ai"]], neg=["dynatrace university", "dynatrace managed"]),
    conquest("Better Stack", "better-stack", "building",
             ["better stack alternative", "betterstack alternative", "better stack alternatives",
              "better stack competitors", "better uptime alternative", "logtail alternative"],
             ["Compare Better Stack Pricing", "Switching From Better Stack?"],
             "Logs With Request Bodies",
             ["Every Error With Its Request", "Uptime and Cron Checks", "OpenTelemetry Native"],
             ["Each error and log line links to the full request and response that produced it.",
              D_POOL["ai"]], neg=["status page"]),
    conquest("SigNoz", "signoz", "building",
             ["signoz alternative", "signoz alternatives", "signoz competitors", "alternatives to signoz"],
             ["SigNoz vs monoscope", "Switching From SigNoz?"],
             "OTel Backend, Bodies Included",
             ["Bodies Without Custom Code", "OpenTelemetry Native", "Every Error With Its Request"],
             ["Request and response bodies come by default, next to your logs, traces and metrics.",
              D_POOL["ai"]], cap=6),
    conquest("BugSnag", "bugsnag", "live",
             ["bugsnag alternative", "bugsnag alternatives", "bugsnag competitors", "alternatives to bugsnag"],
             ["BugSnag vs monoscope", "More Than the Stack Trace"],
             "Errors With the Full Request",
             ["See the Request Behind Errors", "Errors Plus Logs and Traces", "Alerts in Slack or PagerDuty"],
             ["Each error comes with the headers, body and response of the request that caused it.",
              D_POOL["ai"]], cap=6),
    conquest("Honeybadger", "honeybadger", "live",
             ["honeybadger alternative", "honeybadger alternatives", "honeybadger competitors", "honeybadger.io alternative"],
             ["Compare Honeybadger Pricing", "More Than the Stack Trace"],
             "Errors, Uptime and Requests",
             ["See the Request Behind Errors", "Errors Plus Logs and Traces", "Uptime and Cron Checks"],
             ["Each error comes with the headers, body and response of the request that caused it.",
              D_POOL["ai"]], cap=6),
    conquest("Axiom", "axiom", "live",
             ["axiom.co alternative", "axiom logging alternative", "axiom observability alternative", "axiom logs alternative"],
             ["Axiom vs monoscope", "Switching From Axiom?"],
             "Event Pricing, Bodies Included",
             ["Request Capture Built In", "Every Error With Its Request", "OpenTelemetry Native"],
             ["monoscope captures the full request and response for you, next to logs and traces.",
              D_POOL["ai"]], cap=6, neg=["axiom space", "axiom verge", "axiom bank", "axiom telecom"]),

    # C2 Cost pain. Branded pricing echo in RSA A, generic RSA B.
    g("C2", "datadog-pricing", f"{U}/compare/datadog/", "live",
      ["datadog pricing", "datadog cost", "datadog costs", "reduce datadog costs", "datadog bill",
       "datadog too expensive", "datadog apm pricing", "datadog log pricing", "datadog pricing per host"],
      ["Datadog Pricing Compared", "Cut the Datadog Bill", "Priced per Event, Not per Host",
       "No Per-Host APM Fees", "Bodies Never Add to the Bill", "Compare List Prices"],
      ["Datadog charges per host, per indexed log and per replay. monoscope charges per event.",
       D_POOL["bodies"]], ("pricing", "compare"), 8,
      rsa_b=dict(h=["Observability Priced per Event", "Priced per Event, Not per Host", "No Per-Host APM Fees",
                    "Bodies Never Add to the Bill", "Cut Your Monitoring Bill"],
                 d=["One price per event: $1 per million after 20M. No host, seat or indexing fees.",
                    D_POOL["bodies"]], path=("pricing", "per-event")),
      why="cost pain, playbook"),
    g("C2", "splunk-pricing", f"{U}/compare/splunk/", "building",
      ["splunk pricing", "splunk cost", "splunk license cost", "reduce splunk costs", "splunk ingest pricing"],
      ["Splunk Pricing Compared", "Cut the Splunk Bill", "Log Management at $1/M Events",
       "No Ingest Tiers to Plan", "Bodies Never Add to the Bill"],
      ["$1 per million events after 20M. No host, seat or indexing fees, bodies included.", D_POOL["stack"]],
      ("pricing", "compare"), 8, neg=["siem", "enterprise security"], fallback=f"{U}/pricing/",
      rsa_b=dict(h=["Logging Priced per Event", "Log Management at $1/M Events", "No Ingest Tiers to Plan",
                    "Bodies Never Add to the Bill", "Cut Your Logging Bill"],
                 d=["$1 per million events after 20M. No host, seat or indexing fees, bodies included.",
                    D_POOL["stack"]], path=("pricing", "logs"))),
    g("C2", "newrelic-pricing", f"{U}/compare/newrelic/", "live",
      ["new relic pricing", "new relic cost", "new relic per user pricing", "reduce new relic costs"],
      ["New Relic Pricing Compared", "Priced per Event, Not per GB", "No Per-User Fees",
       "Unlimited Team Members", "Bodies Never Add to the Bill"],
      ["One price per event, unlimited team members, request and response bodies included.", D_POOL["ai"]],
      ("pricing", "compare"), 8,
      rsa_b=dict(h=["APM Without Per-User Fees", "Priced per Event, Not per GB", "No Per-User Fees",
                    "Bodies Never Add to the Bill", "Cut Your Monitoring Bill"],
                 d=["One price per event, unlimited team members, request and response bodies included.",
                    D_POOL["ai"]], path=("pricing", "per-event"))),
    g("C2", "log-pricing", f"{U}/pricing/", "live",
      ["log management pricing", "log management cost", "logging costs", "reduce logging costs",
       "observability pricing", "observability costs", "apm pricing", "monitoring costs"],
      ["Observability Pricing", "Log Management at $1/M Events", "Bodies Never Add to the Bill",
       "See a Bill at Your Volume", "Cut Your Monitoring Bill"],
      ["Estimate your bill on the page: events, metric datapoints and replays, nothing hidden.",
       D_POOL["bodies"]], ("pricing",), 9),

    # C3 Ownership/OTel. BLOCKED (see campaigns.md). Drafts only.
    g("C3", "otel-backend", f"{U}/features/opentelemetry/", "live",
      ["opentelemetry backend", "otel backend", "opentelemetry storage", "hosted opentelemetry",
       "opentelemetry platform", "opentelemetry observability platform", "managed opentelemetry"],
      ["OpenTelemetry Backend", "Point Your Collector Here", "Logs, Traces, Metrics Together",
       "Works With Any OTel SDK", "Move With an OTel Exporter"],
      ["Point any OpenTelemetry collector or SDK at monoscope. Logs, traces and metrics together.",
       D_POOL["price"]], ("opentelemetry", "backend"), 6, fallback=f"{U}/docs/sdks/"),
    g("C3", "self-hosted", f"{U}/pricing/", "live",
      ["self hosted observability", "open source observability platform", "self hosted apm",
       "open source apm", "self hosted log management", "open source log management", "self hosted error tracking"],
      ["Self-Hosted Observability", "Free Community Edition", "Data Stays on Your Network",
       "SSO and SLA From $500/Month", "Or Use Cloud From $29/Month"],
      ["The Community Edition is free under AGPL-3.0. Deploy it on your servers.", D_POOL["stack"]],
      ("self-hosted",), 6),
    g("C3", "eu-hosting", f"{U}/pricing/", "live",
      ["gdpr log management", "eu log management", "eu hosted observability", "european observability platform",
       "gdpr observability", "eu hosted logging", "eu data residency observability"],
      ["EU-Hosted Observability", "EU Region as Standard", "Or Self-Host in Your Network",
       "US or EU Region, Your Choice"],
      ["monoscope Cloud runs in the EU or US. Self-hosted, your data stays in your network.",
       D_POOL["price"]], ("eu", "observability"), 6, geos=["EU"]),
    g("C3", "s3-bucket", f"{U}/features/byob-s3/", "blocked",
      ["logs to s3", "store logs in s3", "s3 log storage", "observability s3 storage",
       "bring your own bucket observability", "telemetry in s3"],
      ["Telemetry in Your S3 Bucket", "Delta Lake and Parquet", "Unlimited Retention",
       "Your Bucket From $199/Month"],
      ["Every event written to your S3 bucket as Delta Lake and Parquet, kept as long as you like.",
       D_POOL["price"]], ("your-bucket",), 6),

    # C4 Brand
    g("C4", "brand", f"{U}/", "live",
      ["monoscope", "monoscope tech", "monoscope observability", "monoscope ai", "monoscope pricing",
       "apitoolkit", "api toolkit monitoring", "apitoolkit io"],
      ["monoscope", "monoscope: AI SRE", "Know What Happened. Prove It."],
      ["monoscope is open-source observability with an AI SRE that reads the exact request.",
       D_POOL["price"]], ("",), 2,
      neg=["test card", "test pattern", "tv", "television", "tube", "camera", "microscope", "telescope",
           "wallpaper", "monoscope pattern"]),

    # C5 Category: P1 pages and existing feature pages.
    g("C5", "log-management", f"{U}/features/log-management/", "live",
      ["log management", "log analysis", "log monitoring", "centralized logging", "log management software",
       "log management platform", "log aggregation", "log analysis tool", "=log management tools"],
      ["Log Management", "Every Log Linked to Its Trace", "Search Logs in Plain English",
       "Logs at $1 per Million Events", "Live Tail and KQL"],
      ["Every log line linked to its request and trace. Ask in plain English or write KQL.",
       D_POOL["price"]], ("logs",), 9, fallback=f"{U}/features/logs-and-traces/",
      why="log analysis 1,000, log management 870, log monitoring 480, centralized logging 480"),
    g("C5", "opentelemetry", f"{U}/features/opentelemetry/", "live",
      ["opentelemetry", "open telemetry", "opentelemetry collector", "opentelemetry tracing",
       "opentelemetry logs", "opentelemetry monitoring", "=otel observability"],
      ["OpenTelemetry", "Point Your Collector Here", "Logs, Traces, Metrics Together",
       "Works With Any OTel SDK", "Python, Node, Go, Java, .NET"],
      ["Point any OpenTelemetry collector or SDK at monoscope. Logs, traces and metrics together.",
       D_POOL["price"]], ("opentelemetry",), 6, fallback=f"{U}/docs/sdks/",
      neg=["demo", "specification", "semantic conventions", "operator", "helm", "what is", "backend",
           "storage", "hosted", "platform"],
      why="opentelemetry 2,800, collector 400"),
    g("C5", "apm", f"{U}/features/apm/", "live",
      ["application performance monitoring", "apm tools", "application monitoring", "apm software",
       "application performance monitoring tools", "apm platform", "application monitoring tools"],
      ["Application Monitoring", "Latency and Errors by Endpoint", "The Slow Request's Full Trace",
       "APM Priced per Event", "Dashboards From 20 Templates"],
      ["Latency, throughput and errors per endpoint, with the slow request's full trace.", D_POOL["paid"]],
      ("apm",), 15, fallback=f"{U}/features/dashboards/",
      neg=["apm terminals", "apm monaco", "apm music", "apm qualification", "project management",
           "apm planner", "ardupilot", "apm exam"],
      why="application monitoring 1,000, apm 870/870; SpyFu CPC $30.37 so cap binds"),
    g("C5", "distributed-tracing", f"{U}/features/distributed-tracing/", "live",
      ["distributed tracing", "distributed tracing tools", "distributed tracing platform",
       "microservices tracing", "request tracing", "trace monitoring"],
      ["Distributed Tracing", "Trace Waterfall From Any Log", "Every Span Kept on Paid Plans",
       "Open the Request in a Span", "OpenTelemetry Native"],
      ["Open the trace waterfall from any log row and expand a request inline.", D_POOL["paid"]],
      ("tracing",), 8, fallback=f"{U}/features/logs-and-traces/", neg=["what is"],
      why="distributed tracing 600-1,700"),
    g("C5", "error-tracking", f"{U}/features/error-tracking/", "live",
      ["error tracking", "error monitoring", "error tracking software", "error tracking tool",
       "exception tracking", "exception monitoring", "application error monitoring"],
      ["Error Tracking", "Every Error With Its Request", "Headers, Body and Response",
       "Alerts in Slack or PagerDuty", "Changed API Responses Flagged"],
      ["Exceptions and changed API responses become issues, each with the request behind it.", D_POOL["ai"]],
      ("errors",), 5, why="error tracking 2,400"),
    g("C5", "api-monitoring", f"{U}/features/api-monitoring/", "live",
      ["api monitoring", "api monitoring tools", "api observability", "third party api monitoring",
       "webhook monitoring", "api performance monitoring", "rest api monitoring", "api logging"],
      ["API Monitoring", "Incoming and Outgoing Calls", "Full Request and Response",
       "Breaking Changes Flagged", "Third-Party API Calls Kept"],
      ["Every request and response, in and out, with full bodies. Breaking changes flagged.", D_POOL["bodies"]],
      ("api-monitoring",), 10, neg=["postman", "api gateway"], why="api monitoring 270, tools 180"),
    g("C5", "real-user-monitoring", f"{U}/features/real-user-monitoring/", "live",
      ["real user monitoring", "rum monitoring", "real user monitoring tools", "frontend monitoring",
       "web vitals monitoring"],
      ["Real User Monitoring", "Web Vitals and Browser Errors", "Replay Plus the Backend Trace",
       "Replays at $1 per 1,000", "From the Replay to the Trace"],
      ["Web Vitals, browser errors and session replay, linked to the backend trace.", D_POOL["price"]],
      ("rum",), 15, fallback=f"{U}/features/session-replay/", why="real user monitoring 260, $27.74 CPC"),
    g("C5", "session-replay", f"{U}/features/session-replay/", "live",
      ["session replay", "session replay tool", "session recording", "session replay software", "user session replay"],
      ["Session Replay", "Replay Plus the Backend Trace", "Session Replay for Engineers",
       "Replays at $1 per 1,000", "The Error Toast and Console"],
      ["Replay the customer's screen when it broke, then open the backend trace behind it.", D_POOL["price"]],
      ("session-replay",), 13, neg=["heatmap", "heatmaps", "shopify", "wordpress", "marketing", "hotjar"],
      why="session replay 170, $19.13 CPC"),
    # uptime-monitoring: no page. Uptime checks keep no response body and the demo has none (2026-10-29).
    g("C5", "ai-rca", f"{U}/features/ai-sre/", "live",
      ["ai root cause analysis", "ai sre", "ai sre agent", "ai incident investigation",
       "ai on call", "root cause analysis tool", "ai for incident response"],
      ["AI Root Cause Analysis", "AI SRE That Reads the Request", "Investigates With the Payload",
       "Routines Check Production", "Ask It in Slack", "It Opens the Fix as a PR"],
      ["It investigates with the failing request and response in front of it, not a sampled span.",
       "It finds the root cause, then opens a pull request with the fix.",
       "Routines check production after each deploy and post what they find in Slack."],
      ("ai-sre",), 6, neg=["six sigma", "template", "fishbone"],
      why="ai root cause analysis 70; 'ai sre' no measured volume, cheap test"),
]

COMPETITORS = ["datadog", "new relic", "newrelic", "sentry", "splunk", "grafana", "elastic", "elk", "kibana",
               "logrocket", "fullstory", "dynatrace", "better stack", "betterstack", "signoz", "bugsnag",
               "honeybadger", "axiom", "honeycomb", "sumo logic", "logz", "papertrail", "loggly", "uptimerobot",
               "pingdom", "hotjar", "posthog", "appdynamics", "instana", "coralogix", "dash0"]
SHARED_NEG = ["jobs", "careers", "career", "salary", "salaries", "hiring", "internship", "resume",
              "stock", "share price", "ipo", "login", "log in", "sign in", "signin", "certification",
              "certified", "interview", "interview questions", "tutorial", "course", "courses", "training",
              "udemy", "download", "free download", "datadog agent", "pdf", "ppt", "youtube"]
CAMPAIGN_NEG = {
    "C1": ["pricing", "price", "cost", "costs"] + ["monoscope", "apitoolkit"],
    "C2": ["alternative", "alternatives", "competitors", "monoscope", "apitoolkit"],
    "C3": COMPETITORS + ["monoscope", "apitoolkit"],
    "C4": [],
    "C5": COMPETITORS + ["pricing", "monoscope", "apitoolkit"],
}

# --- checks -----------------------------------------------------------------
ACRONYMS = {"AI", "PR", "SRE", "APM", "API", "APIs", "EU", "US", "S3", "AGPL", "OTel", "KQL", "GB", "SSO", "SLA",
            "RUM", "UK", "CH", "SDK", "NET", "SDKs", "ELK", "URL", "20M", "10k"}
BANNED = [r"!", r"#1", r"\bSOC\b", r"\bISO\b", r"\b780", r"\bbest\b", r"fastest",
          r"leading", r"cheapest", r"GDPR[- ]compliant", r"innovative", r"cutting-edge", r"world-class",
          r"next-generation", r"revolutionary", r"game-changing", r"seamless", r"holistic", r"synergy",
          r"leverage", r"empower", r"transform", r"solutions?\b", r"passionate", r"comprehensive", r"robust",
          r"unified", r"single pane", r"enterprise-grade", r"autonomous", r"AI-powered", r"\bsimply\b",
          r"\bjust\b", r"insights", r"visibility", r"migration help", r"\bwake up\b", r"on-call"]
SAMPLING = re.compile(r"unsampled|no sampling|never sampled|every (event|span) kept|every span", re.I)
errors = []

def check_text(where, s, limit):
    if len(s) > limit: errors.append(f"{where}: {len(s)}>{limit} '{s}'")
    if not s.strip(): errors.append(f"{where}: empty")
    for b in BANNED:
        if re.search(b, s, re.I): errors.append(f"{where}: banned '{b}' in '{s}'")
    if SAMPLING.search(s) and "paid" not in s.lower(): errors.append(f"{where}: sampling claim without 'paid plans': '{s}'")
    for w in re.findall(r"[A-Za-z0-9']+", s):
        if len(w) > 1 and w.isupper() and w not in ACRONYMS and not w.isdigit(): errors.append(f"{where}: caps '{w}'")

def build_rsa(grp, h_lines, d_lines, path, label):
    hs = list(dict.fromkeys(h_lines))
    for x in H_POOL:
        if len(hs) == 15: break
        if x.lower() not in {h.lower() for h in hs}: hs.append(x)
    ds = list(dict.fromkeys(d_lines))
    for k in ["price", "bodies", "ai", "oss", "stack", "paid"]:
        if len(ds) == 4: break
        if D_POOL[k] not in ds: ds.append(D_POOL[k])
    where = f"{grp['gid']}/{label}"
    if len(hs) != 15 or len(set(map(str.lower, hs))) != 15: errors.append(f"{where}: needs 15 unique headlines, has {len(set(hs))}")
    if len(ds) != 4: errors.append(f"{where}: needs 4 descriptions")
    for i, h in enumerate(hs): check_text(f"{where} H{i+1}", h, 30)
    for i, d in enumerate(ds): check_text(f"{where} D{i+1}", d, 90)
    p = (list(path) + ["", ""])[:2]
    for x in p:
        if len(x) > 15: errors.append(f"{where}: path '{x}' > 15")
    return hs, ds, p

def rows_for(cid):
    rsa, kw, neg = [], [], []
    name, _, _ = CAMPAIGNS[cid]
    groups = [x for x in GROUPS if x["cid"] == cid]
    for geo in CAMPAIGNS[cid][1]:
        camp = f"{name} | {geo}"
        for x in SHARED_NEG + CAMPAIGN_NEG[cid]:
            neg.append([camp, "", x, "Campaign negative phrase"])
        for grp in groups:
            if geo not in grp["geos"]: continue
            ag = grp["gid"]
            variants = [("A", grp["h"], grp["d"], grp["path"])]
            if grp["rsa_b"]: variants.append(("B", grp["rsa_b"]["h"], grp["rsa_b"]["d"], grp["rsa_b"]["path"]))
            for label, h, d, path in variants:
                hs, ds, p = build_rsa(grp, h, d, path, label)
                rsa.append([camp, ag] + hs + ["1"] + ds + [grp["url"]] + p)
            for k in grp["kws"]:
                exact_only = k.startswith("=")
                k = k.lstrip("=")
                kw.append([camp, ag, k, "Exact"])
                if not exact_only: kw.append([camp, ag, k, "Phrase"])
            for x in grp["neg"]:
                neg.append([camp, ag, x, "Negative phrase"])
    return rsa, kw, neg

RSA_HEAD = (["Campaign", "Ad group"] + [f"Headline {i}" for i in range(1, 16)] + ["Headline 1 position"]
            + [f"Description {i}" for i in range(1, 5)] + ["Final URL", "Path 1", "Path 2"])

# Google Ads Editor import: every campaign paused, with the settings the three CSVs above leave out.
# Daily budgets are the wave-1 split in campaigns.md, entered in the account currency (EUR).
BUDGET = {("C1", "US"): 23.70, ("C1", "EU"): 15.80, ("C2", "US"): 14.80, ("C2", "EU"): 9.90,
          ("C4", "US"): 2.50, ("C4", "EU"): 2.50, ("C5", "US"): 11.80, ("C5", "EU"): 7.90}
LOCATIONS = {"US": ["United States"], "EU": ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark",
    "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania",
    "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden",
    "Iceland", "Liechtenstein", "Norway", "United Kingdom", "Switzerland"]}
EDITOR_HEAD = (["Campaign", "Campaign Type", "Networks", "Budget", "Budget type", "Bid Strategy Type", "Campaign Status",
                "Languages", "Location", "Ad Group", "Max CPC", "Ad Group Status", "Keyword", "Criterion Type", "Ad type"]
               + RSA_HEAD[2:] + ["Status"])

def editor_rows(rsa, kw, neg):
    blank = dict.fromkeys(EDITOR_HEAD, "")
    row = lambda **kv: [{**blank, **kv}[c] for c in EDITOR_HEAD]
    out, caps = [], {(x["gid"]): x for x in GROUPS}
    for (cid, geo), budget in BUDGET.items():
        camp = f"{CAMPAIGNS[cid][0]} | {geo}"
        out.append(row(**{"Campaign": camp, "Campaign Type": "Search", "Networks": "Google search",
                          "Budget": f"{budget:.2f}", "Budget type": "Daily", "Bid Strategy Type": "Manual CPC",
                          "Campaign Status": "Paused", "Languages": "en"}))
        out += [row(Campaign=camp, Location=loc) for loc in LOCATIONS[geo]]
    for camp, ag in dict.fromkeys((r[0], r[1]) for r in rsa):
        grp = caps[ag]
        out.append(row(**{"Campaign": camp, "Ad Group": ag, "Max CPC": f"{grp['cap']:.2f}",
                          "Ad Group Status": "Enabled" if grp["status"] == "live" else "Paused"}))
    out += [row(**{"Campaign": c, "Ad Group": a, "Keyword": k, "Criterion Type": m}) for c, a, k, m in kw]
    out += [row(**{"Campaign": c, "Ad Group": a, "Keyword": k, "Criterion Type": t}) for c, a, k, t in neg]
    out += [row(**{"Campaign": r[0], "Ad Group": r[1], "Ad type": "Responsive search ad", "Status": "Enabled",
                   **dict(zip(RSA_HEAD[2:], r[2:]))}) for r in rsa]
    return out

def write(path, head, rows):
    path.parent.mkdir(exist_ok=True)
    with open(path, "w", newline="") as f:
        w = csv.writer(f); w.writerow(head); w.writerows(rows)

def main():
    out = {False: ([], [], []), True: ([], [], [])}
    for cid, (_, _, blocked) in CAMPAIGNS.items():
        for acc, new in zip(out[blocked], rows_for(cid)): acc.extend(new)
    for blocked, (rsa, kw, neg) in out.items():
        d = HERE / "draft" if blocked else HERE
        write(d / "rsa.csv", RSA_HEAD, rsa)
        write(d / "keywords.csv", ["Campaign", "Ad group", "Keyword", "Match type"], kw)
        write(d / "negatives.csv", ["Campaign", "Ad group", "Keyword", "Criterion Type"], neg)
        if not blocked: write(d / "editor-import.csv", EDITOR_HEAD, editor_rows(rsa, kw, neg))

    # Overlap: same keyword in two ad groups of the same geo
    seen = {}
    for grp in GROUPS:
        for k in grp["kws"]:
            k = k.lstrip("=")
            if k in seen: errors.append(f"keyword '{k}' in {seen[k]} and {grp['gid']}")
            seen[k] = grp["gid"]

    # A negative that matches a group's own keyword blocks it
    for grp in GROUPS:
        for n in SHARED_NEG + CAMPAIGN_NEG[grp["cid"]] + grp["neg"]:
            for k in grp["kws"]:
                if re.search(rf"(^| ){re.escape(n)}( |$)", k.lstrip("=")):
                    errors.append(f"{grp['gid']}: negative '{n}' blocks keyword '{k}'")

    # Extensions in extensions.md: | kind | text | line1 | line2 | url |
    lim = {"sitelink": (25, 35, 35), "callout": (25,), "snippet": (25,), "price": (25, 25)}
    n_ext = 0
    for line in (HERE / "extensions.md").read_text().splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if cells and cells[0] in lim:
            n_ext += 1
            for i, (c, l) in enumerate(zip(cells[1:], lim[cells[0]])):
                if c: check_text(f"extension {cells[0]} '{cells[1]}' field {i+1}", c, l)

    # Generated section of campaigns.md
    md = HERE / "campaigns.md"
    lines = []
    for cid, (name, geos, blocked) in CAMPAIGNS.items():
        lines.append(f"\n### {name}{' (BLOCKED, draft/)' if blocked else ''}\n")
        lines.append("| Ad group | Final URL | Page | Fallback until built | Geo | Max CPC | Keywords (phrase + exact; `[x]` exact only) | Group negatives |")
        lines.append("|---|---|---|---|---|---|---|---|")
        for grp in [x for x in GROUPS if x["cid"] == cid]:
            kws = ", ".join(f"[{k[1:]}]" if k.startswith("=") else k for k in grp["kws"])
            fb = grp["fallback"].replace(U, "") if grp["fallback"] and grp["status"] != "live" else "–"
            lines.append(f"| `{grp['gid']}`{' (A+B)' if grp['rsa_b'] else ''} | `{grp['url'].replace(U, '')}` | {grp['status']} | {fb} | "
                         f"{'+'.join(grp['geos'])} | ${grp['cap']} | {kws} | {', '.join(grp['neg']) or '–'} |")
    lines.append(f"\n**Shared negatives (every campaign, phrase):** {', '.join(SHARED_NEG)}\n")
    for cid, xs in CAMPAIGN_NEG.items():
        if xs: lines.append(f"- **{CAMPAIGNS[cid][0]} campaign negatives:** {', '.join(xs)}")
    text = md.read_text()
    a, b = "<!-- BEGIN GENERATED -->", "<!-- END GENERATED -->"
    md.write_text(text.split(a)[0] + a + "\n" + "\n".join(lines) + "\n" + b + text.split(b)[1])

    live, draft = out[False], out[True]
    print(f"ad groups: {len(GROUPS)} ({sum(1 for x in GROUPS if x['cid'] != 'C3')} launchable, "
          f"{sum(1 for x in GROUPS if x['cid'] == 'C3')} draft)")
    print(f"rsa.csv: {len(live[0])} ads, keywords.csv: {len(live[1])}, negatives.csv: {len(live[2])}")
    print(f"draft/: {len(draft[0])} ads, {len(draft[1])} keywords, {len(draft[2])} negatives")
    nh = sum(15 for _ in live[0] + draft[0]); nd = sum(4 for _ in live[0] + draft[0])
    print(f"checked {nh} headlines (<=30), {nd} descriptions (<=90), paths (<=15), {n_ext} extension rows")
    if errors:
        print(f"FAIL: {len(errors)} problems"); print("\n".join(errors)); sys.exit(1)
    print("PASS: all lengths, banned words, caps, sampling qualifier, 15/4 counts, keyword overlap, negative conflicts")

if __name__ == "__main__":
    main()
