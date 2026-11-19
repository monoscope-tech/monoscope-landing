---
title: "GET /api/v1/metrics"
menuWeight: 40
httpMethod: GET
apiPath: "/api/v1/metrics"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">GET /api/v1/metrics</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-get">GET</span><code class="api-endpoint-path">/api/v1/metrics</code><button type="button" class="api-tryit-btn" data-method="GET" data-path="/api/v1/metrics" data-body="false" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;},{&quot;name&quot;:&quot;query&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;KQL over the metrics source, e.g. metrics | where metric_name == \&quot;http.server.requests\&quot; | summarize rate(value) by bin_auto(timestamp). Use rate(value) (per second) or increase(value) (per bin) for counters, last(value) for gauges; they are computed per series and reset-aware. rateif/increaseif/lastif(value, predicate) aggregate only the matching series, for ratios.&quot;},{&quot;name&quot;:&quot;data_type&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;metric | json | float | text&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;since&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;from&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;to&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;source&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;environment&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;service&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr>
<tr><td><code>query</code></td><td>query</td><td>string</td><td>Optional</td><td>KQL over the metrics source, e.g. metrics | where metric_name == &quot;http.server.requests&quot; | summarize rate(value) by bin_auto(timestamp). Use rate(value) (per second) or increase(value) (per bin) for counters, last(value) for gauges; they are computed per series and reset-aware. rateif/increaseif/lastif(value, predicate) aggregate only the matching series, for ratios.</td></tr>
<tr><td><code>data_type</code></td><td>query</td><td>metric | json | float | text</td><td>Optional</td><td></td></tr>
<tr><td><code>since</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>from</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>to</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>source</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>environment</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>service</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr></tbody></table></div>

<h2>Examples</h2>
<section class="tab-group" data-tab-group="querymetrics"><button type="button" class="tab-button" data-tab="querymetrics-curl">cURL</button><button type="button" class="tab-button" data-tab="querymetrics-python">Python</button><button type="button" class="tab-button" data-tab="querymetrics-js">JavaScript</button><div id="querymetrics-curl" class="tab-content"><pre><code class="language-bash">curl --request GET 'https://api.monoscope.tech/api/v1/metrics' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID'</code></pre></div>
<div id="querymetrics-python" class="tab-content"><pre><code class="language-python">import requests

response = requests.get(
  &quot;https://api.monoscope.tech/api/v1/metrics&quot;,
  headers={
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
  timeout=30,
)
response.raise_for_status()
print(response.text)</code></pre></div>
<div id="querymetrics-js" class="tab-content"><pre><code class="language-javascript">const response = await fetch(&quot;https://api.monoscope.tech/api/v1/metrics&quot;, {
  method: &quot;GET&quot;,
  headers: {
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
});
if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
console.log(await response.text());</code></pre></div></section>
<h2>Responses</h2>
<h3>HTTP 200</h3><p>Response defined by the API schema.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>data_float</code></td><td>number (double)</td><td>Optional</td><td></td></tr>
<tr><td><code>data_json</code></td><td>object[][]</td><td>Required</td><td></td></tr>
<tr><td><code>data_text</code></td><td>string[][]</td><td>Required</td><td></td></tr>
<tr><td><code>dataset</code></td><td>number (double)[][]</td><td>Required</td><td></td></tr>
<tr><td><code>error</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>from</code></td><td>integer</td><td>Optional</td><td></td></tr>
<tr><td><code>headers</code></td><td>string[]</td><td>Required</td><td></td></tr>
<tr><td><code>rows_count</code></td><td>number (double)</td><td>Required</td><td></td></tr>
<tr><td><code>rows_per_min</code></td><td>number (double)</td><td>Optional</td><td></td></tr>
<tr><td><code>stats</code></td><td>object</td><td>Optional</td><td></td></tr>
<tr><td><code>to</code></td><td>integer</td><td>Optional</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;data_float&quot;: {
      &quot;format&quot;: &quot;double&quot;,
      &quot;type&quot;: &quot;number&quot;
    },
    &quot;data_json&quot;: {
      &quot;items&quot;: {
        &quot;items&quot;: {
          &quot;$ref&quot;: &quot;#/components/schemas/JSONValue&quot;
        },
        &quot;type&quot;: &quot;array&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;data_text&quot;: {
      &quot;items&quot;: {
        &quot;items&quot;: {
          &quot;type&quot;: &quot;string&quot;
        },
        &quot;type&quot;: &quot;array&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;dataset&quot;: {
      &quot;items&quot;: {
        &quot;items&quot;: {
          &quot;format&quot;: &quot;double&quot;,
          &quot;type&quot;: &quot;number&quot;
        },
        &quot;type&quot;: &quot;array&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;error&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;from&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;headers&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;rows_count&quot;: {
      &quot;format&quot;: &quot;double&quot;,
      &quot;type&quot;: &quot;number&quot;
    },
    &quot;rows_per_min&quot;: {
      &quot;format&quot;: &quot;double&quot;,
      &quot;type&quot;: &quot;number&quot;
    },
    &quot;stats&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/MetricsStats&quot;
    },
    &quot;to&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    }
  },
  &quot;required&quot;: [
    &quot;dataset&quot;,
    &quot;data_json&quot;,
    &quot;data_text&quot;,
    &quot;headers&quot;,
    &quot;rows_count&quot;
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
