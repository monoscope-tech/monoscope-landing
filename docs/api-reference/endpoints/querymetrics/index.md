---
title: "Query Metrics"
menuWeight: 20
httpMethod: GET
apiPath: "/api/v1/metrics"
hideToc: true
pageFullWidth: true
---

```=html
<div class="not-prose">

<div class="api-breadcrumb">Metrics</div>

<div class="api-endpoint-bar">
  <span class="api-method-badge api-method-get">GET</span>
  <code class="api-endpoint-path">/api/v1/metrics</code>
  <button class="api-tryit-btn" data-method="GET" data-path="/api/v1/metrics" data-params="[{&quot;name&quot;:&quot;pid&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Project ID to query metrics for.&quot;},{&quot;name&quot;:&quot;data_type&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Type of metric data to return (e.g. `timeseries`, `aggregate`).&quot;},{&quot;name&quot;:&quot;query&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Metric query expression. Use this for predefined metric queries.&quot;},{&quot;name&quot;:&quot;query_sql&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Raw SQL query for advanced metric queries.&quot;},{&quot;name&quot;:&quot;since&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Relative time range (e.g. `1h`, `24h`, `7d`).&quot;},{&quot;name&quot;:&quot;from&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Start of absolute time range (ISO 8601).&quot;},{&quot;name&quot;:&quot;to&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;End of absolute time range (ISO 8601).&quot;},{&quot;name&quot;:&quot;source&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Metric source filter (e.g. `http`, `logs`, `traces`).&quot;}]">Try it <i class="fa-solid fa-play fa-xs"></i></button>
</div>

<p style="margin: 1rem 0; color: var(--color-textWeak); font-size: 0.875rem; line-height: 1.6;">
  Query aggregated metrics for a project. Supports filtering by time range, metric source, and custom queries.
</p>

<div class="api-two-col">
<div>

<div class="api-section-title">Authorization</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">Authorization</span>
    <span class="api-type-badge">header</span>
    <span class="api-required-badge">required</span>
  </div>
  <div class="api-param-desc">Bearer token using your project API key.</div>
</div>

<div class="api-section-title" style="margin-top: 1.5rem;">Parameters</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">pid</span>
    <span class="api-type-badge">string&lt;uuid&gt;</span> <span class="api-type-badge">query</span> <span class="api-required-badge">required</span>
  </div>
  <div class="api-param-desc">Project ID to query metrics for.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">data_type</span>
    <span class="api-type-badge">timeseries | aggregate</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">Type of metric data to return (e.g. `timeseries`, `aggregate`).</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">query</span>
    <span class="api-type-badge">string</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">Metric query expression. Use this for predefined metric queries.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">query_sql</span>
    <span class="api-type-badge">string</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">Raw SQL query for advanced metric queries.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">since</span>
    <span class="api-type-badge">string</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">Relative time range (e.g. `1h`, `24h`, `7d`).</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">from</span>
    <span class="api-type-badge">string&lt;date-time&gt;</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">Start of absolute time range (ISO 8601).</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">to</span>
    <span class="api-type-badge">string&lt;date-time&gt;</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">End of absolute time range (ISO 8601).</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">source</span>
    <span class="api-type-badge">string</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">Metric source filter (e.g. `http`, `logs`, `traces`).</div>
</div>

<div class="api-section-title" style="margin-top: 1.5rem;">Responses</div>
<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge api-status-2xx">200</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">Metrics data returned successfully.</span>
</div>
<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge api-status-4xx">401</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">Missing or invalid authentication.</span>
</div>
<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge api-status-4xx">403</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">Insufficient permissions for this project.</span>
</div>
<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge api-status-4xx">422</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">Invalid query parameters.</span>
</div>


<div class="api-section-title" style="margin-top: 1.5rem;">Response Fields</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">series</span>
    <span class="api-type-badge">object[]</span>
    
  </div>
  <div class="api-param-desc">Array of time series data points.</div>
</div><div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">series[].timestamp</span>
    <span class="api-type-badge">string&lt;date-time&gt;</span>
    
  </div>
  <div class="api-param-desc">Bucket timestamp.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">series[].value</span>
    <span class="api-type-badge">number</span>
    
  </div>
  <div class="api-param-desc">Aggregated metric value.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">series[].labels</span>
    <span class="api-type-badge">object</span>
    
  </div>
  <div class="api-param-desc">Label key-value pairs for this series.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">metadata</span>
    <span class="api-type-badge">object</span>
    
  </div>
  <div class="api-param-desc"></div>
</div><div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">metadata.query</span>
    <span class="api-type-badge">string</span>
    
  </div>
  <div class="api-param-desc">The query that produced these results.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">metadata.from</span>
    <span class="api-type-badge">string&lt;date-time&gt;</span>
    
  </div>
  <div class="api-param-desc"></div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">metadata.to</span>
    <span class="api-type-badge">string&lt;date-time&gt;</span>
    
  </div>
  <div class="api-param-desc"></div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">metadata.resolution</span>
    <span class="api-type-badge">string</span>
    
  </div>
  <div class="api-param-desc">Bucket resolution (e.g. `1m`, `5m`, `1h`).</div>
</div>

</div>
<div class="api-examples">

<div class="api-example-panel">
  <section class="tab-group" data-tab-group="lang-querymetrics">
    <div class="api-example-panel-header api-lang-tabs">
      <button class="tab-button" data-tab="lang-curl-querymetrics">cURL</button>
      <button class="tab-button" data-tab="lang-python-querymetrics">Python</button>
      <button class="tab-button" data-tab="lang-js-querymetrics">JavaScript</button>
    </div>
    <div id="lang-curl-querymetrics" class="tab-content"><pre><code class="language-bash">curl -X GET "https://api.monoscope.tech/api/v1/metrics?pid=YOUR_PROJECT_ID" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"</code></pre></div>
    <div id="lang-python-querymetrics" class="tab-content"><pre><code class="language-python">import requests

response = requests.get(
  "https://api.monoscope.tech/api/v1/metrics?pid=YOUR_PROJECT_ID",
  headers={
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
)
print(response.json())</code></pre></div>
    <div id="lang-js-querymetrics" class="tab-content"><pre><code class="language-javascript">const response = await fetch("https://api.monoscope.tech/api/v1/metrics?pid=YOUR_PROJECT_ID", {
  method: "GET",
  headers: {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
});
const data = await response.json();
console.log(data);</code></pre></div>
  </section>
</div>

<div class="api-example-panel">
  <div class="api-example-panel-header">
    <span class="api-response-status-tab api-status-2xx">200</span>
    <span style="margin-left: 0.5rem;">application/json</span>
  </div>
  <pre><code class="language-json">{
  "series": [
    {
      "timestamp": "2025-01-15T10:30:00Z",
      "value": 42,
      "labels": {
        "key": "example"
      }
    }
  ],
  "metadata": {
    "query": "example",
    "from": "2025-01-15T10:30:00Z",
    "to": "2025-01-15T10:30:00Z",
    "resolution": "example"
  }
}</code></pre>
</div>

</div>
</div>
</div>
```
