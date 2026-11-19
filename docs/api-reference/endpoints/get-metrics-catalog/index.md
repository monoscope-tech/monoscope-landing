---
title: "GET /api/v1/metrics/catalog"
menuWeight: 50
httpMethod: GET
apiPath: "/api/v1/metrics/catalog"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">GET /api/v1/metrics/catalog</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-get">GET</span><code class="api-endpoint-path">/api/v1/metrics/catalog</code><button type="button" class="api-tryit-btn" data-method="GET" data-path="/api/v1/metrics/catalog" data-body="false" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;},{&quot;name&quot;:&quot;service&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;search&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;limit&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;integer&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;offset&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;integer&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;active&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;boolean&quot;,&quot;description&quot;:&quot;&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr>
<tr><td><code>service</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>search</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>limit</code></td><td>query</td><td>integer</td><td>Optional</td><td></td></tr>
<tr><td><code>offset</code></td><td>query</td><td>integer</td><td>Optional</td><td></td></tr>
<tr><td><code>active</code></td><td>query</td><td>boolean</td><td>Optional</td><td></td></tr></tbody></table></div>

<h2>Examples</h2>
<section class="tab-group" data-tab-group="get-metrics-catalog"><button type="button" class="tab-button" data-tab="get-metrics-catalog-curl">cURL</button><button type="button" class="tab-button" data-tab="get-metrics-catalog-python">Python</button><button type="button" class="tab-button" data-tab="get-metrics-catalog-js">JavaScript</button><div id="get-metrics-catalog-curl" class="tab-content"><pre><code class="language-bash">curl --request GET 'https://api.monoscope.tech/api/v1/metrics/catalog' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID'</code></pre></div>
<div id="get-metrics-catalog-python" class="tab-content"><pre><code class="language-python">import requests

response = requests.get(
  &quot;https://api.monoscope.tech/api/v1/metrics/catalog&quot;,
  headers={
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
  timeout=30,
)
response.raise_for_status()
print(response.text)</code></pre></div>
<div id="get-metrics-catalog-js" class="tab-content"><pre><code class="language-javascript">const response = await fetch(&quot;https://api.monoscope.tech/api/v1/metrics/catalog&quot;, {
  method: &quot;GET&quot;,
  headers: {
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
});
if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
console.log(await response.text());</code></pre></div></section>
<h2>Responses</h2>
<h3>HTTP 200</h3><p>Response defined by the API schema.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>active</code></td><td>boolean</td><td>Required</td><td></td></tr>
<tr><td><code>activeSince</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Required</td><td></td></tr>
<tr><td><code>hasMore</code></td><td>boolean</td><td>Required</td><td></td></tr>
<tr><td><code>metrics</code></td><td>object[]</td><td>Required</td><td></td></tr>
<tr><td><code>search</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>service</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>total</code></td><td>integer</td><td>Required</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;active&quot;: {
      &quot;type&quot;: &quot;boolean&quot;
    },
    &quot;activeSince&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;hasMore&quot;: {
      &quot;type&quot;: &quot;boolean&quot;
    },
    &quot;metrics&quot;: {
      &quot;items&quot;: {
        &quot;$ref&quot;: &quot;#/components/schemas/MetricChartListData&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;search&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;service&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;total&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    }
  },
  &quot;required&quot;: [
    &quot;metrics&quot;,
    &quot;total&quot;,
    &quot;active&quot;,
    &quot;hasMore&quot;,
    &quot;activeSince&quot;
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
<p><a href="/docs/api-reference/getting-started/authentication/">Authentication</a> · <a href="/docs/api-reference/getting-started/rate-limits/">Errors and retries</a> · <a href="/assets/api/openapi.json">OpenAPI specification</a></p>
```
{% endraw %}
