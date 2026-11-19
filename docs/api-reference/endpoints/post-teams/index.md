---
title: "POST /api/v1/teams"
menuWeight: 650
httpMethod: POST
apiPath: "/api/v1/teams"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">POST /api/v1/teams</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-post">POST</span><code class="api-endpoint-path">/api/v1/teams</code><button type="button" class="api-tryit-btn" data-method="POST" data-path="/api/v1/teams" data-body="true" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr></tbody></table></div>
<h2>Request Body</h2><p>Create <code>request.json</code> with the fields this operation requires. The examples read that file.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>description</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>discord_channels</code></td><td>string[]</td><td>Optional</td><td></td></tr>
<tr><td><code>handle</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>members</code></td><td>string (uuid)[]</td><td>Optional</td><td></td></tr>
<tr><td><code>name</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>notify_emails</code></td><td>string[]</td><td>Optional</td><td></td></tr>
<tr><td><code>pagerduty_services</code></td><td>string[]</td><td>Optional</td><td></td></tr>
<tr><td><code>phone_numbers</code></td><td>string[]</td><td>Optional</td><td></td></tr>
<tr><td><code>slack_channels</code></td><td>string[]</td><td>Optional</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;description&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;discord_channels&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;handle&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;members&quot;: {
      &quot;items&quot;: {
        &quot;$ref&quot;: &quot;#/components/schemas/UUID&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;name&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;notify_emails&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;pagerduty_services&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;phone_numbers&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;slack_channels&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    }
  },
  &quot;required&quot;: [
    &quot;name&quot;,
    &quot;handle&quot;
  ],
  &quot;type&quot;: &quot;object&quot;
}</code></pre></details>
<h2>Examples</h2>
<section class="tab-group" data-tab-group="post-teams"><button type="button" class="tab-button" data-tab="post-teams-curl">cURL</button><button type="button" class="tab-button" data-tab="post-teams-python">Python</button><button type="button" class="tab-button" data-tab="post-teams-js">JavaScript</button><div id="post-teams-curl" class="tab-content"><pre><code class="language-bash">curl --request POST 'https://api.monoscope.tech/api/v1/teams' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID' \
  --header 'Content-Type: application/json' \
  --data-binary @request.json</code></pre></div>
<div id="post-teams-python" class="tab-content"><pre><code class="language-python">import requests
import json

with open(&quot;request.json&quot;) as body_file:
  payload = json.load(body_file)

response = requests.post(
  &quot;https://api.monoscope.tech/api/v1/teams&quot;,
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
<div id="post-teams-js" class="tab-content"><pre><code class="language-javascript">import { readFile } from &quot;node:fs/promises&quot;;
const payload = await readFile(&quot;request.json&quot;, &quot;utf8&quot;);

const response = await fetch(&quot;https://api.monoscope.tech/api/v1/teams&quot;, {
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
<h3>HTTP 200</h3><p>Response defined by the API schema.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>discord_channels</code></td><td>string[]</td><td>Required</td><td></td></tr>
<tr><td><code>members</code></td><td>object[]</td><td>Required</td><td></td></tr>
<tr><td><code>notify_emails</code></td><td>string[]</td><td>Required</td><td></td></tr>
<tr><td><code>pagerduty_services</code></td><td>string[]</td><td>Required</td><td></td></tr>
<tr><td><code>phone_numbers</code></td><td>string[]</td><td>Required</td><td></td></tr>
<tr><td><code>slack_channels</code></td><td>string[]</td><td>Required</td><td></td></tr>
<tr><td><code>summary</code></td><td>object</td><td>Required</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;discord_channels&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;members&quot;: {
      &quot;items&quot;: {
        &quot;$ref&quot;: &quot;#/components/schemas/UserRef&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;notify_emails&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;pagerduty_services&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;phone_numbers&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;slack_channels&quot;: {
      &quot;items&quot;: {
        &quot;type&quot;: &quot;string&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;summary&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/TeamSummary&quot;
    }
  },
  &quot;required&quot;: [
    &quot;summary&quot;,
    &quot;members&quot;,
    &quot;notify_emails&quot;,
    &quot;slack_channels&quot;,
    &quot;discord_channels&quot;,
    &quot;phone_numbers&quot;,
    &quot;pagerduty_services&quot;
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
