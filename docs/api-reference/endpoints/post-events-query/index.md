---
title: "POST /api/v1/events/query"
menuWeight: 220
httpMethod: POST
apiPath: "/api/v1/events/query"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">POST /api/v1/events/query</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-post">POST</span><code class="api-endpoint-path">/api/v1/events/query</code><button type="button" class="api-tryit-btn" data-method="POST" data-path="/api/v1/events/query" data-body="true" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr></tbody></table></div>
<h2>Request Body</h2><p>Create <code>request.json</code> with the fields this operation requires. The examples read that file.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>environment</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>from</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>include_attributes</code></td><td>boolean</td><td>Optional</td><td></td></tr>
<tr><td><code>limit</code></td><td>integer</td><td>Optional</td><td></td></tr>
<tr><td><code>query</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>service</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>since</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>source</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>to</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>with_children</code></td><td>boolean</td><td>Optional</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;environment&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;from&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;include_attributes&quot;: {
      &quot;type&quot;: &quot;boolean&quot;
    },
    &quot;limit&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;query&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;service&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;since&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;source&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;to&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;with_children&quot;: {
      &quot;type&quot;: &quot;boolean&quot;
    }
  },
  &quot;type&quot;: &quot;object&quot;
}</code></pre></details>
<h2>Examples</h2>
<section class="tab-group" data-tab-group="post-events-query"><button type="button" class="tab-button" data-tab="post-events-query-curl">cURL</button><button type="button" class="tab-button" data-tab="post-events-query-python">Python</button><button type="button" class="tab-button" data-tab="post-events-query-js">JavaScript</button><div id="post-events-query-curl" class="tab-content"><pre><code class="language-bash">curl --request POST 'https://api.monoscope.tech/api/v1/events/query' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID' \
  --header 'Content-Type: application/json' \
  --data-binary @request.json</code></pre></div>
<div id="post-events-query-python" class="tab-content"><pre><code class="language-python">import requests
import json

with open(&quot;request.json&quot;) as body_file:
  payload = json.load(body_file)

response = requests.post(
  &quot;https://api.monoscope.tech/api/v1/events/query&quot;,
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
<div id="post-events-query-js" class="tab-content"><pre><code class="language-javascript">import { readFile } from &quot;node:fs/promises&quot;;
const payload = await readFile(&quot;request.json&quot;, &quot;utf8&quot;);

const response = await fetch(&quot;https://api.monoscope.tech/api/v1/events/query&quot;, {
  method: &quot;POST&quot;,
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
