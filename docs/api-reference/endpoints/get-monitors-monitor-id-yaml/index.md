---
title: "GET /api/v1/monitors/{monitor_id}/yaml"
menuWeight: 160
httpMethod: GET
apiPath: "/api/v1/monitors/{monitor_id}/yaml"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">GET /api/v1/monitors/{monitor_id}/yaml</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-get">GET</span><code class="api-endpoint-path">/api/v1/monitors/{monitor_id}/yaml</code><button type="button" class="api-tryit-btn" data-method="GET" data-path="/api/v1/monitors/{monitor_id}/yaml" data-body="false" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;},{&quot;name&quot;:&quot;monitor_id&quot;,&quot;in&quot;:&quot;path&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr>
<tr><td><code>monitor_id</code></td><td>path</td><td>string (uuid)</td><td>Required</td><td></td></tr></tbody></table></div>

<h2>Examples</h2>
<section class="tab-group" data-tab-group="get-monitors-monitor-id-yaml"><button type="button" class="tab-button" data-tab="get-monitors-monitor-id-yaml-curl">cURL</button><button type="button" class="tab-button" data-tab="get-monitors-monitor-id-yaml-python">Python</button><button type="button" class="tab-button" data-tab="get-monitors-monitor-id-yaml-js">JavaScript</button><div id="get-monitors-monitor-id-yaml-curl" class="tab-content"><pre><code class="language-bash">curl --request GET 'https://api.monoscope.tech/api/v1/monitors/YOUR_MONITOR_ID/yaml' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID'</code></pre></div>
<div id="get-monitors-monitor-id-yaml-python" class="tab-content"><pre><code class="language-python">import requests

response = requests.get(
  &quot;https://api.monoscope.tech/api/v1/monitors/YOUR_MONITOR_ID/yaml&quot;,
  headers={
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
  timeout=30,
)
response.raise_for_status()
print(response.text)</code></pre></div>
<div id="get-monitors-monitor-id-yaml-js" class="tab-content"><pre><code class="language-javascript">const response = await fetch(&quot;https://api.monoscope.tech/api/v1/monitors/YOUR_MONITOR_ID/yaml&quot;, {
  method: &quot;GET&quot;,
  headers: {
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
});
if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
console.log(await response.text());</code></pre></div></section>
<h2>Responses</h2>
<h3>HTTP 200</h3><p>Response defined by the API schema.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>active</code></td><td>boolean</td><td>Optional</td><td></td></tr>
<tr><td><code>condition</code></td><td>object</td><td>Required</td><td></td></tr>
<tr><td><code>environment</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>evaluation</code></td><td>object</td><td>Required</td><td></td></tr>
<tr><td><code>notify</code></td><td>object</td><td>Optional</td><td></td></tr>
<tr><td><code>service</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>severity</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>title</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>visualization_type</code></td><td>string</td><td>Optional</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;active&quot;: {
      &quot;type&quot;: &quot;boolean&quot;
    },
    &quot;condition&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/MonitorCondition&quot;
    },
    &quot;environment&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;evaluation&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/MonitorEvaluation&quot;
    },
    &quot;notify&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/MonitorNotification&quot;
    },
    &quot;service&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;severity&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;title&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;visualization_type&quot;: {
      &quot;type&quot;: &quot;string&quot;
    }
  },
  &quot;required&quot;: [
    &quot;title&quot;,
    &quot;condition&quot;,
    &quot;evaluation&quot;
  ],
  &quot;type&quot;: &quot;object&quot;
}</code></pre></details>
<h3>HTTP 400</h3><p>Refused; error.code says why</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>error</code></td><td>object</td><td>Required</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;error&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/ApiProblem&quot;
    }
  },
  &quot;required&quot;: [
    &quot;error&quot;
  ],
  &quot;type&quot;: &quot;object&quot;
}</code></pre></details>
<h3>HTTP 401</h3><p>Refused; error.code says why</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>error</code></td><td>object</td><td>Required</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;error&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/ApiProblem&quot;
    }
  },
  &quot;required&quot;: [
    &quot;error&quot;
  ],
  &quot;type&quot;: &quot;object&quot;
}</code></pre></details>
<h3>HTTP 404</h3><p>Refused; error.code says why</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>error</code></td><td>object</td><td>Required</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;error&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/ApiProblem&quot;
    }
  },
  &quot;required&quot;: [
    &quot;error&quot;
  ],
  &quot;type&quot;: &quot;object&quot;
}</code></pre></details>
<p><a href="/docs/api-reference/getting-started/authentication/">Authentication</a> · <a href="/docs/api-reference/getting-started/rate-limits/">Errors and retries</a> · <a href="/assets/api/openapi.json">OpenAPI specification</a></p>
```
{% endraw %}
