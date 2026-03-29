---
title: "List Monitors"
menuWeight: 40
httpMethod: GET
apiPath: "/api/v1/monitors"
hideToc: true
pageFullWidth: true
---

```=html
<div class="not-prose">

<div class="api-breadcrumb">Monitors</div>

<div class="api-endpoint-bar">
  <span class="api-method-badge api-method-get">GET</span>
  <code class="api-endpoint-path">/api/v1/monitors</code>
  <button class="api-tryit-btn" data-method="GET" data-path="/api/v1/monitors" data-params="[{&quot;name&quot;:&quot;pid&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Project ID to list monitors for.&quot;},{&quot;name&quot;:&quot;filter&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Filter monitors by status (`active`, `paused`, `triggered`).&quot;},{&quot;name&quot;:&quot;since&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Relative time range for monitor history (e.g. `24h`, `7d`).&quot;}]">Try it <i class="fa-solid fa-play fa-xs"></i></button>
</div>

<p style="margin: 1rem 0; color: var(--color-textWeak); font-size: 0.875rem; line-height: 1.6;">
  List all monitors (alerts) configured for a project. Includes status, thresholds, and notification channels.
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
  <div class="api-param-desc">Project ID to list monitors for.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">filter</span>
    <span class="api-type-badge">active | paused | triggered</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">Filter monitors by status (`active`, `paused`, `triggered`).</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">since</span>
    <span class="api-type-badge">string</span> <span class="api-type-badge">query</span> 
  </div>
  <div class="api-param-desc">Relative time range for monitor history (e.g. `24h`, `7d`).</div>
</div>

<div class="api-section-title" style="margin-top: 1.5rem;">Responses</div>
<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge api-status-2xx">200</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">List of monitors returned successfully.</span>
</div>
<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge api-status-4xx">401</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">Missing or invalid authentication.</span>
</div>
<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge api-status-4xx">403</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">Insufficient permissions for this project.</span>
</div>


<div class="api-section-title" style="margin-top: 1.5rem;">Response Fields</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors</span>
    <span class="api-type-badge">object[]</span>
    
  </div>
  <div class="api-param-desc"></div>
</div><div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].id</span>
    <span class="api-type-badge">string&lt;uuid&gt;</span>
    
  </div>
  <div class="api-param-desc">Monitor unique identifier.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].name</span>
    <span class="api-type-badge">string</span>
    
  </div>
  <div class="api-param-desc">Human-readable monitor name.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].status</span>
    <span class="api-type-badge">active | paused | triggered</span>
    
  </div>
  <div class="api-param-desc">Current monitor status.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].query</span>
    <span class="api-type-badge">string</span>
    
  </div>
  <div class="api-param-desc">The metric query this monitor evaluates.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].threshold</span>
    <span class="api-type-badge">object</span>
    
  </div>
  <div class="api-param-desc"></div>
</div><div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].threshold.operator</span>
    <span class="api-type-badge">&gt; | &gt;= | &lt; | &lt;= | ==</span>
    
  </div>
  <div class="api-param-desc">Comparison operator.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].threshold.value</span>
    <span class="api-type-badge">number</span>
    
  </div>
  <div class="api-param-desc">Threshold value.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].interval</span>
    <span class="api-type-badge">string</span>
    
  </div>
  <div class="api-param-desc">Evaluation interval (e.g. `5m`, `1h`).</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].notification_channels</span>
    <span class="api-type-badge">string[]</span>
    
  </div>
  <div class="api-param-desc">List of notification channel IDs.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].created_at</span>
    <span class="api-type-badge">string&lt;date-time&gt;</span>
    
  </div>
  <div class="api-param-desc"></div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">monitors[].updated_at</span>
    <span class="api-type-badge">string&lt;date-time&gt;</span>
    
  </div>
  <div class="api-param-desc"></div>
</div>

</div>
<div class="api-examples">

<div class="api-example-panel">
  <section class="tab-group" data-tab-group="lang-listmonitors">
    <div class="api-example-panel-header api-lang-tabs">
      <button class="tab-button" data-tab="lang-curl-listmonitors">cURL</button>
      <button class="tab-button" data-tab="lang-python-listmonitors">Python</button>
      <button class="tab-button" data-tab="lang-js-listmonitors">JavaScript</button>
    </div>
    <div id="lang-curl-listmonitors" class="tab-content"><pre><code class="language-bash">curl -X GET "https://api.monoscope.tech/api/v1/monitors?pid=YOUR_PROJECT_ID" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"</code></pre></div>
    <div id="lang-python-listmonitors" class="tab-content"><pre><code class="language-python">import requests

response = requests.get(
  "https://api.monoscope.tech/api/v1/monitors?pid=YOUR_PROJECT_ID",
  headers={
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
)
print(response.json())</code></pre></div>
    <div id="lang-js-listmonitors" class="tab-content"><pre><code class="language-javascript">const response = await fetch("https://api.monoscope.tech/api/v1/monitors?pid=YOUR_PROJECT_ID", {
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
  "monitors": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "example",
      "status": "active",
      "query": "example",
      "threshold": {
        "operator": "&gt;",
        "value": 42
      },
      "interval": "example",
      "notification_channels": [
        "example"
      ],
      "created_at": "2025-01-15T10:30:00Z",
      "updated_at": "2025-01-15T10:30:00Z"
    }
  ]
}</code></pre>
</div>

</div>
</div>
</div>
```
