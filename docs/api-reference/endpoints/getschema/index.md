---
title: "Get Telemetry Schema"
menuWeight: 30
httpMethod: GET
apiPath: "/api/v1/schema"
hideToc: true
pageFullWidth: true
---

```=html
<div class="not-prose">

<div class="api-breadcrumb">Schema</div>

<div class="api-endpoint-bar">
  <span class="api-method-badge api-method-get">GET</span>
  <code class="api-endpoint-path">/api/v1/schema</code>
  <button class="api-tryit-btn" data-method="GET" data-path="/api/v1/schema" data-params="[{&quot;name&quot;:&quot;pid&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;Project ID to retrieve the schema for.&quot;}]">Try it <i class="fa-solid fa-play fa-xs"></i></button>
</div>

<p style="margin: 1rem 0; color: var(--color-textWeak); font-size: 0.875rem; line-height: 1.6;">
  Returns the telemetry schema for a project, including all known field names, types, and cardinality estimates. Useful for building query UIs or autocomplete.
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
  <div class="api-param-desc">Project ID to retrieve the schema for.</div>
</div>

<div class="api-section-title" style="margin-top: 1.5rem;">Responses</div>
<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge api-status-2xx">200</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">Schema returned successfully.</span>
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
    <span class="api-param-name">fields</span>
    <span class="api-type-badge">object[]</span>
    
  </div>
  <div class="api-param-desc">List of known telemetry fields.</div>
</div><div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">fields[].name</span>
    <span class="api-type-badge">string</span>
    
  </div>
  <div class="api-param-desc">Fully qualified field name (e.g. `http.status_code`).</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">fields[].type</span>
    <span class="api-type-badge">string | number | boolean | timestamp</span>
    
  </div>
  <div class="api-param-desc">Field data type.</div>
</div>
<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">fields[].cardinality</span>
    <span class="api-type-badge">integer</span>
    
  </div>
  <div class="api-param-desc">Estimated number of unique values.</div>
</div>

</div>
<div class="api-examples">

<div class="api-example-panel">
  <section class="tab-group" data-tab-group="lang-getschema">
    <div class="api-example-panel-header api-lang-tabs">
      <button class="tab-button" data-tab="lang-curl-getschema">cURL</button>
      <button class="tab-button" data-tab="lang-python-getschema">Python</button>
      <button class="tab-button" data-tab="lang-js-getschema">JavaScript</button>
    </div>
    <div id="lang-curl-getschema" class="tab-content"><pre><code class="language-bash">curl -X GET "https://api.monoscope.tech/api/v1/schema?pid=YOUR_PROJECT_ID" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json"</code></pre></div>
    <div id="lang-python-getschema" class="tab-content"><pre><code class="language-python">import requests

response = requests.get(
  "https://api.monoscope.tech/api/v1/schema?pid=YOUR_PROJECT_ID",
  headers={
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
  }
)
print(response.json())</code></pre></div>
    <div id="lang-js-getschema" class="tab-content"><pre><code class="language-javascript">const response = await fetch("https://api.monoscope.tech/api/v1/schema?pid=YOUR_PROJECT_ID", {
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
  "fields": [
    {
      "name": "example",
      "type": "string",
      "cardinality": 42
    }
  ]
}</code></pre>
</div>

</div>
</div>
</div>
```
