---
title: "POST /api/v1/monitors/{monitor_id}/mute"
menuWeight: 180
httpMethod: POST
apiPath: "/api/v1/monitors/{monitor_id}/mute"
hideToc: true
---

{% raw %}
```=html
<h1 style="overflow-wrap:anywhere">POST /api/v1/monitors/{monitor_id}/mute</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-post">POST</span><code class="api-endpoint-path">/api/v1/monitors/{monitor_id}/mute</code><button type="button" class="api-tryit-btn" data-method="POST" data-path="/api/v1/monitors/{monitor_id}/mute" data-body="false" data-params="[{&quot;name&quot;:&quot;X-Project-Id&quot;,&quot;in&quot;:&quot;header&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;Project UUID. Use the project associated with your API key.&quot;},{&quot;name&quot;:&quot;monitor_id&quot;,&quot;in&quot;:&quot;path&quot;,&quot;required&quot;:true,&quot;type&quot;:&quot;string (uuid)&quot;,&quot;description&quot;:&quot;&quot;},{&quot;name&quot;:&quot;duration_minutes&quot;,&quot;in&quot;:&quot;query&quot;,&quot;required&quot;:false,&quot;type&quot;:&quot;integer&quot;,&quot;description&quot;:&quot;&quot;}]">Try it</button></div>

<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>X-Project-Id</code></td><td>header</td><td>string (uuid)</td><td>Required</td><td>Project UUID. Use the project associated with your API key.</td></tr>
<tr><td><code>monitor_id</code></td><td>path</td><td>string (uuid)</td><td>Required</td><td></td></tr>
<tr><td><code>duration_minutes</code></td><td>query</td><td>integer</td><td>Optional</td><td></td></tr></tbody></table></div>

<h2>Examples</h2>
<section class="tab-group" data-tab-group="post-monitors-monitor-id-mute"><button type="button" class="tab-button" data-tab="post-monitors-monitor-id-mute-curl">cURL</button><button type="button" class="tab-button" data-tab="post-monitors-monitor-id-mute-python">Python</button><button type="button" class="tab-button" data-tab="post-monitors-monitor-id-mute-js">JavaScript</button><div id="post-monitors-monitor-id-mute-curl" class="tab-content"><pre><code class="language-bash">curl --request POST 'https://api.monoscope.tech/api/v1/monitors/YOUR_MONITOR_ID/mute' \
  --header 'Authorization: Bearer YOUR_API_KEY' \
  --header 'X-Project-Id: YOUR_PROJECT_ID'</code></pre></div>
<div id="post-monitors-monitor-id-mute-python" class="tab-content"><pre><code class="language-python">import requests

response = requests.post(
  &quot;https://api.monoscope.tech/api/v1/monitors/YOUR_MONITOR_ID/mute&quot;,
  headers={
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
  timeout=30,
)
response.raise_for_status()
print(response.text)</code></pre></div>
<div id="post-monitors-monitor-id-mute-js" class="tab-content"><pre><code class="language-javascript">const response = await fetch(&quot;https://api.monoscope.tech/api/v1/monitors/YOUR_MONITOR_ID/mute&quot;, {
  method: &quot;POST&quot;,
  headers: {
  &quot;Authorization&quot;: &quot;Bearer YOUR_API_KEY&quot;,
  &quot;X-Project-Id&quot;: &quot;YOUR_PROJECT_ID&quot;
},
});
if (!response.ok) throw new Error(`HTTP ${response.status}: ${await response.text()}`);
console.log(await response.text());</code></pre></div></section>
<h2>Responses</h2>
<h3>HTTP 200</h3><p>Response defined by the API schema.</p><div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody><tr><td><code>alert_config</code></td><td>object</td><td>Required</td><td></td></tr>
<tr><td><code>alert_last_triggered</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Optional</td><td></td></tr>
<tr><td><code>alert_recovery_threshold</code></td><td>number (double)</td><td>Optional</td><td></td></tr>
<tr><td><code>alert_threshold</code></td><td>number (double)</td><td>Required</td><td></td></tr>
<tr><td><code>check_interval_mins</code></td><td>integer</td><td>Required</td><td></td></tr>
<tr><td><code>created_at</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Required</td><td></td></tr>
<tr><td><code>current_status</code></td><td>normal | warning | alerting</td><td>Required</td><td></td></tr>
<tr><td><code>current_value</code></td><td>number (double)</td><td>Required</td><td></td></tr>
<tr><td><code>dashboard_id</code></td><td>string (uuid)</td><td>Optional</td><td></td></tr>
<tr><td><code>deactivated_at</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Optional</td><td></td></tr>
<tr><td><code>deleted_at</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Optional</td><td></td></tr>
<tr><td><code>environment</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>id</code></td><td>string (uuid)</td><td>Required</td><td></td></tr>
<tr><td><code>last_evaluated</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Optional</td><td></td></tr>
<tr><td><code>log_query</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>log_query_as_sql</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>muted_until</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Optional</td><td></td></tr>
<tr><td><code>notification_count</code></td><td>integer</td><td>Required</td><td></td></tr>
<tr><td><code>project_id</code></td><td>string (uuid)</td><td>Required</td><td></td></tr>
<tr><td><code>renotify_interval_mins</code></td><td>integer</td><td>Optional</td><td></td></tr>
<tr><td><code>service</code></td><td>string</td><td>Optional</td><td></td></tr>
<tr><td><code>stop_after_count</code></td><td>integer</td><td>Optional</td><td></td></tr>
<tr><td><code>teams</code></td><td>string (uuid)[]</td><td>Required</td><td></td></tr>
<tr><td><code>threshold_sustained_for_mins</code></td><td>integer</td><td>Required</td><td></td></tr>
<tr><td><code>time_window_mins</code></td><td>integer</td><td>Required</td><td></td></tr>
<tr><td><code>trigger_less_than</code></td><td>boolean</td><td>Required</td><td></td></tr>
<tr><td><code>updated_at</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Required</td><td></td></tr>
<tr><td><code>visualization_type</code></td><td>string</td><td>Required</td><td></td></tr>
<tr><td><code>warning_last_triggered</code></td><td>string (yyyy-mm-ddThh:MM:ssZ)</td><td>Optional</td><td></td></tr>
<tr><td><code>warning_recovery_threshold</code></td><td>number (double)</td><td>Optional</td><td></td></tr>
<tr><td><code>warning_threshold</code></td><td>number (double)</td><td>Optional</td><td></td></tr>
<tr><td><code>widget_id</code></td><td>string</td><td>Optional</td><td></td></tr></tbody></table></div><details><summary>JSON schema</summary><pre><code class="language-json">{
  &quot;properties&quot;: {
    &quot;alert_config&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/MonitorAlertConfig&quot;
    },
    &quot;alert_last_triggered&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;alert_recovery_threshold&quot;: {
      &quot;format&quot;: &quot;double&quot;,
      &quot;type&quot;: &quot;number&quot;
    },
    &quot;alert_threshold&quot;: {
      &quot;format&quot;: &quot;double&quot;,
      &quot;type&quot;: &quot;number&quot;
    },
    &quot;check_interval_mins&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;created_at&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;current_status&quot;: {
      &quot;enum&quot;: [
        &quot;normal&quot;,
        &quot;warning&quot;,
        &quot;alerting&quot;
      ],
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;current_value&quot;: {
      &quot;format&quot;: &quot;double&quot;,
      &quot;type&quot;: &quot;number&quot;
    },
    &quot;dashboard_id&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UUID&quot;
    },
    &quot;deactivated_at&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;deleted_at&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;environment&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;id&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UUID&quot;
    },
    &quot;last_evaluated&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;log_query&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;log_query_as_sql&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;muted_until&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;notification_count&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;project_id&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UUID&quot;
    },
    &quot;renotify_interval_mins&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;service&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;stop_after_count&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;teams&quot;: {
      &quot;items&quot;: {
        &quot;$ref&quot;: &quot;#/components/schemas/UUID&quot;
      },
      &quot;type&quot;: &quot;array&quot;
    },
    &quot;threshold_sustained_for_mins&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;time_window_mins&quot;: {
      &quot;maximum&quot;: 9223372036854776000,
      &quot;minimum&quot;: -9223372036854776000,
      &quot;type&quot;: &quot;integer&quot;
    },
    &quot;trigger_less_than&quot;: {
      &quot;type&quot;: &quot;boolean&quot;
    },
    &quot;updated_at&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;visualization_type&quot;: {
      &quot;type&quot;: &quot;string&quot;
    },
    &quot;warning_last_triggered&quot;: {
      &quot;$ref&quot;: &quot;#/components/schemas/UTCTime&quot;
    },
    &quot;warning_recovery_threshold&quot;: {
      &quot;format&quot;: &quot;double&quot;,
      &quot;type&quot;: &quot;number&quot;
    },
    &quot;warning_threshold&quot;: {
      &quot;format&quot;: &quot;double&quot;,
      &quot;type&quot;: &quot;number&quot;
    },
    &quot;widget_id&quot;: {
      &quot;type&quot;: &quot;string&quot;
    }
  },
  &quot;required&quot;: [
    &quot;id&quot;,
    &quot;project_id&quot;,
    &quot;created_at&quot;,
    &quot;updated_at&quot;,
    &quot;check_interval_mins&quot;,
    &quot;alert_threshold&quot;,
    &quot;log_query&quot;,
    &quot;log_query_as_sql&quot;,
    &quot;trigger_less_than&quot;,
    &quot;threshold_sustained_for_mins&quot;,
    &quot;alert_config&quot;,
    &quot;visualization_type&quot;,
    &quot;teams&quot;,
    &quot;current_status&quot;,
    &quot;current_value&quot;,
    &quot;notification_count&quot;,
    &quot;time_window_mins&quot;
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
