---
title: "PATCH /api/v1/dashboards/{dashboard_id}"
menuWeight: 290
httpMethod: PATCH
apiPath: "/api/v1/dashboards/{dashboard_id}"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">PATCH /api/v1/dashboards/{dashboard_id}</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-patch">PATCH</span><code class="api-endpoint-path">/api/v1/dashboards/{dashboard_id}</code><button type="button" class="api-tryit-btn" data-method="PATCH" data-path="/api/v1/dashboards/{dashboard_id}" data-body="true" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;},{&quot;name&quot;:&quot;dashboard_id&quot;,&quot;in&quot;:&quot;path&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr>
<tr><td><code>dashboard_id</code></td><td>path</td><td>string (uuid)</td><td>Required</td><td></td></tr></tbody></table></div>
<h2>Request Body</h2><p>Create <code>request.json</code> with the fields this operation requires. The examples read that file.</p><details><summary>JSON schema</summary><pre><code class="language-json">{}</code></pre></details>
<h2>Examples</h2>
<section class="tab-group" data-tab-group="patch-dashboards-dashboard-id"><button type="button" class="tab-button" data-tab="patch-dashboards-dashboard-id-curl">cURL</button><button type="button" class="tab-button" data-tab="patch-dashboards-dashboard-id-python">Python</button><button type="button" class="tab-button" data-tab="patch-dashboards-dashboard-id-js">JavaScript</button><div id="patch-dashboards-dashboard-id-curl" class="tab-content"><pre><code class="language-bash">curl --request PATCH 'https://api.monoscope.tech/api/v1/dashboards/YOUR_DASHBOARD_ID' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID' \
  --header 'Content-Type: application/json' \
  --data-binary @request.json</code></pre></div>
<div id="patch-dashboards-dashboard-id-python" class="tab-content"><pre><code class="language-python">import requests
import json

with open(&quot;request.json&quot;) as body_file:
  payload = json.load(body_file)

response = requests.patch(
  &quot;https://api.monoscope.tech/api/v1/dashboards/YOUR_DASHBOARD_ID&quot;,
  headers={
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;,
  &quot;Content-Type&quot;: &quot;application/json&quot;
},
  json=payload,
  timeout=30,
)
response.raise_for_status()
print(response.text)</code></pre></div>
<div id="patch-dashboards-dashboard-id-js" class="tab-content"><pre><code class="language-javascript">import { readFile } from &quot;node:fs/promises&quot;;
const payload = await readFile(&quot;request.json&quot;, &quot;utf8&quot;);

const response = await fetch(&quot;https://api.monoscope.tech/api/v1/dashboards/YOUR_DASHBOARD_ID&quot;, {
  method: &quot;PATCH&quot;,
  headers: {
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;,
  &quot;Content-Type&quot;: &quot;application/json&quot;
},
  body: payload,
});
if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
console.log(await response.text());</code></pre></div></section>
<h2>Responses</h2>
<h3>HTTP 200</h3><p>Response defined by the API schema.</p><details><summary>JSON schema</summary><pre><code class="language-json">{}</code></pre></details>
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
