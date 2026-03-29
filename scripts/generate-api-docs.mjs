import fs from "fs";
import path from "path";

const SPEC_PATH = "assets/api/openapi.json";
const OUTPUT_DIR = "docs/api-reference";
const ENDPOINTS_DIR = path.join(OUTPUT_DIR, "endpoints");
const BASE_URL = "https://api.monoscope.tech";

// --- Helpers ---

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveRef(spec, ref) {
  if (!ref || !ref.$ref) return ref;
  const parts = ref.$ref.replace("#/", "").split("/");
  let obj = spec;
  for (const p of parts) obj = obj?.[p];
  return obj || ref;
}

function resolveSchema(spec, schema) {
  if (!schema) return schema;
  if (schema.$ref) return resolveRef(spec, schema);
  if (schema.items?.$ref) {
    return { ...schema, items: resolveRef(spec, schema.items) };
  }
  return schema;
}

function typeLabel(schema) {
  if (!schema) return "any";
  if (schema.type === "array") return `${typeLabel(schema.items)}[]`;
  if (schema.enum) return schema.enum.join(" | ");
  return schema.format ? `${schema.type}<${schema.format}>` : schema.type || "object";
}

function statusClass(code) {
  const c = String(code)[0];
  if (c === "2") return "api-status-2xx";
  if (c === "4") return "api-status-4xx";
  return "api-status-5xx";
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// --- Schema & Example Builders ---

function generateParamHtml(param) {
  const required = param.required ? `<span class="api-required-badge">required</span>` : "";
  const type = `<span class="api-type-badge">${escapeHtml(typeLabel(param.schema))}</span>`;
  const loc = `<span class="api-type-badge">${param.in}</span>`;
  return `<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">${escapeHtml(param.name)}</span>
    ${type} ${loc} ${required}
  </div>
  <div class="api-param-desc">${escapeHtml(param.description || "")}</div>
</div>`;
}

function generateSchemaFieldsHtml(spec, schema, prefix = "") {
  const resolved = resolveSchema(spec, schema);
  if (!resolved?.properties) return "";
  const required = new Set(resolved.required || []);
  return Object.entries(resolved.properties)
    .map(([name, prop]) => {
      const resolvedProp = resolveSchema(spec, prop);
      const reqBadge = required.has(name) ? `<span class="api-required-badge">required</span>` : "";
      const fullName = prefix ? `${prefix}.${name}` : name;
      let nested = "";
      if (resolvedProp.properties) {
        nested = generateSchemaFieldsHtml(spec, resolvedProp, fullName);
      } else if (resolvedProp.type === "array" && resolvedProp.items?.properties) {
        nested = generateSchemaFieldsHtml(spec, resolveSchema(spec, resolvedProp.items), `${fullName}[]`);
      }
      return `<div class="api-param">
  <div class="api-param-header">
    <span class="api-param-name">${escapeHtml(fullName)}</span>
    <span class="api-type-badge">${escapeHtml(typeLabel(resolvedProp))}</span>
    ${reqBadge}
  </div>
  <div class="api-param-desc">${escapeHtml(resolvedProp.description || "")}</div>
</div>${nested}`;
    })
    .join("\n");
}

function buildExample(spec, schema) {
  const resolved = resolveSchema(spec, schema);
  if (!resolved) return null;
  if (resolved.type === "string") {
    if (resolved.format === "date-time") return "2025-01-15T10:30:00Z";
    if (resolved.format === "uuid") return "550e8400-e29b-41d4-a716-446655440000";
    if (resolved.enum) return resolved.enum[0];
    return "example";
  }
  if (resolved.type === "number" || resolved.type === "integer") return 42;
  if (resolved.type === "boolean") return true;
  if (resolved.type === "array") {
    const item = buildExample(spec, resolved.items);
    return item ? [item] : [];
  }
  if (resolved.properties) {
    const obj = {};
    for (const [k, v] of Object.entries(resolved.properties)) {
      obj[k] = buildExample(spec, v);
    }
    return obj;
  }
  if (resolved.additionalProperties) {
    return { key: buildExample(spec, resolved.additionalProperties) };
  }
  return {};
}

function generateExampleResponse(spec, responseSchema) {
  const resolved = resolveSchema(spec, responseSchema);
  if (!resolved?.properties) return "{}";
  return JSON.stringify(buildExample(spec, resolved), null, 2);
}

// --- Multi-language example generators ---

function buildUrl(apiPath, params) {
  const qp = params.filter((p) => p.required && p.in === "query");
  let url = `${BASE_URL}${apiPath}`;
  if (qp.length) {
    const qs = qp.map((p) => `${p.name}=${p.schema?.format === "uuid" ? "YOUR_PROJECT_ID" : "VALUE"}`).join("&");
    url += `?${qs}`;
  }
  return url;
}

function generateCurlExample(method, apiPath, params, hasBody) {
  const upper = method.toUpperCase();
  const url = buildUrl(apiPath, params);
  let curl = `curl -X ${upper} "${url}"`;
  curl += ` \\\n  -H "Authorization: Bearer YOUR_API_KEY"`;
  curl += ` \\\n  -H "Content-Type: application/json"`;
  if (hasBody) curl += ` \\\n  -d '{}'`;
  return curl;
}

function generatePythonExample(method, apiPath, params, hasBody) {
  const url = buildUrl(apiPath, params);
  let py = `import requests\n\nresponse = requests.${method}(\n  "${url}",\n  headers={\n    "Authorization": "Bearer YOUR_API_KEY",\n    "Content-Type": "application/json"\n  }`;
  if (hasBody) py += `,\n  json={}`;
  py += `\n)\nprint(response.json())`;
  return py;
}

function generateJsExample(method, apiPath, params, hasBody) {
  const url = buildUrl(apiPath, params);
  const upper = method.toUpperCase();
  let js = `const response = await fetch("${url}", {\n  method: "${upper}",\n  headers: {\n    "Authorization": "Bearer YOUR_API_KEY",\n    "Content-Type": "application/json"\n  }`;
  if (hasBody) js += `,\n  body: JSON.stringify({})`;
  js += `\n});\nconst data = await response.json();\nconsole.log(data);`;
  return js;
}

// --- Endpoint page generator (Axiom-style layout) ---

function generateEndpointPage(spec, apiPath, method, operation, weight) {
  const title = operation.summary || operation.operationId || apiPath;
  const slug = slugify(operation.operationId || title);
  const methodUp = method.toUpperCase();
  const params = operation.parameters || [];
  const responses = operation.responses || {};
  const tag = operation.tags?.[0] || "";
  const hasBody = !!operation.requestBody;

  const paramsHtml = params.map((p) => generateParamHtml(p)).join("\n");

  // Response status list + fields
  let responsesHtml = "";
  let exampleResponseJson = "{}";
  let successCode = "200";
  for (const [code, resp] of Object.entries(responses)) {
    responsesHtml += `<div style="margin-bottom: 0.75rem;">
  <span class="api-status-badge ${statusClass(code)}">${code}</span>
  <span class="api-param-desc" style="margin-left: 0.5rem;">${escapeHtml(resp.description || "")}</span>
</div>\n`;
    if (code.startsWith("2") && resp.content?.["application/json"]?.schema) {
      successCode = code;
      exampleResponseJson = generateExampleResponse(spec, resp.content["application/json"].schema);
    }
  }

  let responseFieldsHtml = "";
  const successResp = responses["200"] || responses["201"];
  if (successResp?.content?.["application/json"]?.schema) {
    responseFieldsHtml = generateSchemaFieldsHtml(spec, successResp.content["application/json"].schema);
  }

  // Multi-language examples
  const curl = generateCurlExample(method, apiPath, params, hasBody);
  const python = generatePythonExample(method, apiPath, params, hasBody);
  const javascript = generateJsExample(method, apiPath, params, hasBody);

  // Serialize params for Try it modal
  const tryitParams = JSON.stringify(
    params.map((p) => ({ name: p.name, in: p.in, required: !!p.required, type: p.schema?.type || "string", description: p.description || "" }))
  ).replace(/"/g, "&quot;");

  const content = `---
title: "${title}"
menuWeight: ${weight}
httpMethod: ${methodUp}
apiPath: "${apiPath}"
hideToc: true
pageFullWidth: true
---

\`\`\`=html
<div class="not-prose">

${tag ? `<div class="api-breadcrumb">${escapeHtml(tag)}</div>` : ""}

<div class="api-endpoint-bar">
  <span class="api-method-badge api-method-${method}">${methodUp}</span>
  <code class="api-endpoint-path">${escapeHtml(apiPath)}</code>
  <button class="api-tryit-btn" data-method="${methodUp}" data-path="${escapeHtml(apiPath)}" data-params="${tryitParams}">Try it <i class="fa-solid fa-play fa-xs"></i></button>
</div>

<p style="margin: 1rem 0; color: var(--color-textWeak); font-size: 0.875rem; line-height: 1.6;">
  ${escapeHtml(operation.description || "")}
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

${params.length ? `<div class="api-section-title" style="margin-top: 1.5rem;">Parameters</div>\n${paramsHtml}` : ""}

<div class="api-section-title" style="margin-top: 1.5rem;">Responses</div>
${responsesHtml}

${responseFieldsHtml ? `<div class="api-section-title" style="margin-top: 1.5rem;">Response Fields</div>\n${responseFieldsHtml}` : ""}

</div>
<div class="api-examples">

<div class="api-example-panel">
  <section class="tab-group" data-tab-group="lang-${slug}">
    <div class="api-example-panel-header api-lang-tabs">
      <button class="tab-button" data-tab="lang-curl-${slug}">cURL</button>
      <button class="tab-button" data-tab="lang-python-${slug}">Python</button>
      <button class="tab-button" data-tab="lang-js-${slug}">JavaScript</button>
    </div>
    <div id="lang-curl-${slug}" class="tab-content"><pre><code class="language-bash">${escapeHtml(curl)}</code></pre></div>
    <div id="lang-python-${slug}" class="tab-content"><pre><code class="language-python">${escapeHtml(python)}</code></pre></div>
    <div id="lang-js-${slug}" class="tab-content"><pre><code class="language-javascript">${escapeHtml(javascript)}</code></pre></div>
  </section>
</div>

<div class="api-example-panel">
  <div class="api-example-panel-header">
    <span class="api-response-status-tab ${statusClass(successCode)}">${successCode}</span>
    <span style="margin-left: 0.5rem;">application/json</span>
  </div>
  <pre><code class="language-json">${escapeHtml(exampleResponseJson)}</code></pre>
</div>

</div>
</div>
</div>
\`\`\`
`;

  return { slug, content };
}

// --- Index pages ---

function generateEndpointsIndexPage(spec) {
  const entries = Object.entries(spec.paths || {}).flatMap(([p, methods]) =>
    Object.entries(methods)
      .filter(([m]) => ["get", "post", "put", "patch", "delete"].includes(m))
      .map(([m, op]) => ({ path: p, method: m, op }))
  );

  return `---
title: "Endpoints"
menuWeight: 40
---

${entries
  .map(
    (e) =>
      `- [\`${e.method.toUpperCase()}\` ${e.path}](/docs/api-reference/endpoints/${slugify(e.op.operationId || e.op.summary || e.path)}/) — ${e.op.summary || ""}`
  )
  .join("\n")}
`;
}

// --- Main ---

function main() {
  if (!fs.existsSync(SPEC_PATH)) {
    console.error(`OpenAPI spec not found at ${SPEC_PATH}`);
    process.exit(1);
  }

  const spec = JSON.parse(fs.readFileSync(SPEC_PATH, "utf-8"));
  console.log(`Loaded OpenAPI spec: ${spec.info?.title} v${spec.info?.version}`);

  // Only clean the endpoints directory (preserve manual pages)
  if (fs.existsSync(ENDPOINTS_DIR)) {
    fs.rmSync(ENDPOINTS_DIR, { recursive: true });
  }
  fs.mkdirSync(ENDPOINTS_DIR, { recursive: true });

  // Write endpoints index
  fs.writeFileSync(path.join(ENDPOINTS_DIR, "index.md"), generateEndpointsIndexPage(spec));
  console.log("  Generated: docs/api-reference/endpoints/index.md");

  // Generate per-endpoint pages
  let weight = 10;
  for (const [apiPath, methods] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(methods)) {
      if (!["get", "post", "put", "patch", "delete"].includes(method)) continue;
      weight += 10;
      const { slug, content } = generateEndpointPage(spec, apiPath, method, operation, weight);
      const dir = path.join(ENDPOINTS_DIR, slug);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.md"), content);
      console.log(`  Generated: docs/api-reference/endpoints/${slug}/index.md`);
    }
  }

  console.log(`\nDone! Generated ${weight / 10} endpoint pages in ${ENDPOINTS_DIR}/`);
}

main();
