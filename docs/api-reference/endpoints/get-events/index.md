---
title: "GET /api/v1/events"
menuWeight: 20
httpMethod: GET
apiPath: "/api/v1/events"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">GET /api/v1/events</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-get">GET</span><code class="api-endpoint-path">/api/v1/events</code><button type="button" class="api-tryit-btn" data-method="GET" data-path="/api/v1/events" data-body="false" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;},{&quot;name&quot;:&quot;query&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;since&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;from&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;to&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;source&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;limit&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;integer&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;with_children&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;boolean&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;include_attributes&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;boolean&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;environment&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;service&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;string&quot;,&quot;description&quot;:&quot;&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr>
<tr><td><code>query</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>since</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>from</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>to</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>source</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>limit</code></td><td>query</td><td>integer</td><td>Optional</td><td></td></tr>
<tr><td><code>with_children</code></td><td>query</td><td>boolean</td><td>Optional</td><td></td></tr>
<tr><td><code>include_attributes</code></td><td>query</td><td>boolean</td><td>Optional</td><td></td></tr>
<tr><td><code>environment</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>service</code></td><td>query</td><td>string</td><td>Optional</td><td></td></tr></tbody></table></div>

<h2>Examples</h2>
<section class="tab-group" data-tab-group="get-events"><button type="button" class="tab-button" data-tab="get-events-curl">cURL</button><button type="button" class="tab-button" data-tab="get-events-python">Python</button><button type="button" class="tab-button" data-tab="get-events-js">JavaScript</button><div id="get-events-curl" class="tab-content"><pre><code class="language-bash">curl --request GET 'https://api.monoscope.tech/api/v1/events' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID'</code></pre></div>
<div id="get-events-python" class="tab-content"><pre><code class="language-python">import requests

response = requests.get(
  &quot;https://api.monoscope.tech/api/v1/events&quot;,
  headers={
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
  timeout=30,
)
response.raise_for_status()
print(response.text)</code></pre></div>
<div id="get-events-js" class="tab-content"><pre><code class="language-javascript">const response = await fetch(&quot;https://api.monoscope.tech/api/v1/events&quot;, {
  method: &quot;GET&quot;,
  headers: {
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
});
if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
console.log(await response.text());</code></pre></div></section>
<h2>Responses</h2>
<h3>HTTP 200</h3><p>Response defined by the API schema.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>colIdxMap</code></td><td>object</td><td>Required</td><td></td></tr>
<tr><td><code>cols</code></td><td>string[]</td><td>Required</td><td></td></tr>
<tr><td><code>count</code></td><td>integer</td><td>Required</td><td></td></tr>
<tr><td><code>cursor</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>error</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>hasMore</code></td><td>boolean</td><td>Required</td><td></td></tr>
<tr><td><code>logsData</code></td><td>object[][]</td><td>Required</td><td></td></tr>
<tr><td><code>nextUrl</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>queryResultCount</code></td><td>integer</td><td>Required</td><td></td></tr>
<tr><td><code>recentUrl</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>resetLogsUrl</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>serviceColors</code></td><td>object</td><td>Required</td><td></td></tr>
<tr><td><code>traces</code></td><td>object[]</td><td>Required</td><td></td></tr>
<tr><td><code>viz</code></td><td>logs | timeseries | timeseries_line | top_list | heatmap | patterns | sessions</td><td>Optional</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;colIdxMap&quot;: {
      &quot;additionalProperties&quot;: {
        &quot;maximum&quot;: 9223372036854776000,
        &quot;minimum&quot;: -9223372036854776000,
        &quot;type&quot;: &quot;integer&quot;
      },
      &quot;type&quot;: &quot;object&quot;
    },
    &quot;cols&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;count&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;cursor&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;error&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;hasMore&quot;: {
      &quot;type&quot;: &quot;boolean&quot;
    },
    &quot;logsData&quot;: {
      &quot;items&quot;: {
        &quot;items&quot;: {
          &quot;$ref&quot;: &quot;#/components/schemas/JSONValue&quot;
        },
        &quot;type&quot;: &quot;array&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;nextUrl&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;queryResultCount&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;recentUrl&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;resetLogsUrl&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;serviceColors&quot;: {
      &quot;additionalProperties&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;object&quot;
    },
    &quot;traces&quot;: {
      &quot;items&quot;: {
        &quot;$ref&quot;: &quot;#/components/schemas/TraceTreeEntry&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;viz&quot;: {
      &quot;enum&quot;: [
        &quot;logs&quot;,
        &quot;timeseries&quot;,
        &quot;timeseries_line&quot;,
        &quot;top_list&quot;,
        &quot;heatmap&quot;,
        &quot;patterns&quot;,
        &quot;sessions&quot;
      ],
      &quot;type&quot;: &quot;string&quot;
    }
  },
  &quot;required&quot;: [
    &quot;logsData&quot;,
    &quot;cols&quot;,
    &quot;colIdxMap&quot;,
    &quot;nextUrl&quot;,
    &quot;resetLogsUrl&quot;,
    &quot;recentUrl&quot;,
    &quot;serviceColors&quot;,
    &quot;queryResultCount&quot;,
    &quot;count&quot;,
    &quot;hasMore&quot;,
    &quot;traces&quot;
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
