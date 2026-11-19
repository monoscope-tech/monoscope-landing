---
title: "GET /api/v1/incidents/{incident_id}"
menuWeight: 630
httpMethod: GET
apiPath: "/api/v1/incidents/{incident_id}"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">GET /api/v1/incidents/{incident_id}</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-get">GET</span><code class="api-endpoint-path">/api/v1/incidents/{incident_id}</code><button type="button" class="api-tryit-btn" data-method="GET" data-path="/api/v1/incidents/{incident_id}" data-body="false" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;},{&quot;name&quot;:&quot;incident_id&quot;,&quot;in&quot;:&quot;path&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr>
<tr><td><code>incident_id</code></td><td>path</td><td>string (uuid)</td><td>Required</td><td></td></tr></tbody></table></div>

<h2>Examples</h2>
<section class="tab-group" data-tab-group="get-incidents-incident-id"><button type="button" class="tab-button" data-tab="get-incidents-incident-id-curl">cURL</button><button type="button" class="tab-button" data-tab="get-incidents-incident-id-python">Python</button><button type="button" class="tab-button" data-tab="get-incidents-incident-id-js">JavaScript</button><div id="get-incidents-incident-id-curl" class="tab-content"><pre><code class="language-bash">curl --request GET 'https://api.monoscope.tech/api/v1/incidents/YOUR_INCIDENT_ID' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID'</code></pre></div>
<div id="get-incidents-incident-id-python" class="tab-content"><pre><code class="language-python">import requests

response = requests.get(
  &quot;https://api.monoscope.tech/api/v1/incidents/YOUR_INCIDENT_ID&quot;,
  headers={
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
  timeout=30,
)
response.raise_for_status()
print(response.text)</code></pre></div>
<div id="get-incidents-incident-id-js" class="tab-content"><pre><code class="language-javascript">const response = await fetch(&quot;https://api.monoscope.tech/api/v1/incidents/YOUR_INCIDENT_ID&quot;, {
  method: &quot;GET&quot;,
  headers: {
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
});
if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
console.log(await response.text());</code></pre></div></section>
<h2>Responses</h2>
<h3>HTTP 200</h3><p>Response defined by the API schema.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>closed_at</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Optional</td><td></td></tr>
<tr><td><code>id</code></td><td>string (uuid)</td><td>Required</td><td></td></tr>
<tr><td><code>issue_id</code></td><td>string (uuid)</td><td>Optional</td><td></td></tr>
<tr><td><code>last_event_at</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Required</td><td></td></tr>
<tr><td><code>phase</code></td><td>active | recovered | resolved</td><td>Required</td><td></td></tr>
<tr><td><code>project_id</code></td><td>string (uuid)</td><td>Required</td><td></td></tr>
<tr><td><code>started_at</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Required</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;closed_at&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;id&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UUID&quot;
    },
    &quot;issue_id&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UUID&quot;
    },
    &quot;last_event_at&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;phase&quot;: {
      &quot;enum&quot;: [
        &quot;active&quot;,
        &quot;recovered&quot;,
        &quot;resolved&quot;
      ],
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;project_id&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UUID&quot;
    },
    &quot;started_at&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    }
  },
  &quot;required&quot;: [
    &quot;id&quot;,
    &quot;project_id&quot;,
    &quot;phase&quot;,
    &quot;started_at&quot;,
    &quot;last_event_at&quot;
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
