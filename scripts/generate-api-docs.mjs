// Generate the API reference from the checked-in copy of the public OpenAPI spec.
// Refresh assets/api/openapi.json from /api/v1/openapi.json before running this script.
import fs from 'node:fs';
import path from 'node:path';

const SPEC_PATH = 'assets/api/openapi.json';
const OUTPUT_DIR = 'docs/api-reference/endpoints';
const BASE_URL = 'https://api.monoscope.tech';
const METHODS = new Set(['get', 'post', 'put', 'patch', 'delete']);
const spec = JSON.parse(fs.readFileSync(SPEC_PATH, 'utf8'));
if (!spec.openapi || !spec.paths) throw new Error('Expected an OpenAPI specification');
const prefix = spec.servers?.[0]?.url || '/api/v1';
if (!prefix.startsWith('/') || prefix.startsWith('//')) throw new Error('Expected a relative OpenAPI server URL');
const html = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const slugify = value => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const resolve = schema => schema?.$ref ? spec.components?.schemas?.[schema.$ref.split('/').at(-1)] || schema : schema || {};
const jsonMedia = content => Object.entries(content || {}).find(([type]) => type.startsWith('application/json'));
const schemaType = schema => {
  schema = resolve(schema);
  if (schema.enum) return schema.enum.map(String).join(' | ');
  if (schema.oneOf || schema.anyOf) return (schema.oneOf || schema.anyOf).map(s => schemaType(s)).join(' or ');
  if (schema.type === 'array') return `${schemaType(schema.items)}[]`;
  return schema.format ? `${schema.type || 'string'} (${schema.format})` : schema.type || 'object';
};
// Keep the three original reference URLs stable.
const legacy = { 'get /metrics': 'querymetrics', 'get /schema': 'getschema', 'get /monitors': 'listmonitors' };
const entries = Object.entries(spec.paths).flatMap(([apiPath, item]) => Object.entries(item)
  .filter(([method]) => METHODS.has(method))
  .map(([method, operation]) => ({
    apiPath: prefix.replace(/\/$/, '') + apiPath, method, operation,
    params: [...(item.parameters || []), ...(operation.parameters || [])],
    slug: legacy[`${method} ${apiPath}`] || slugify(operation.operationId || `${method}-${apiPath}`),
  })));
if (new Set(entries.map(e => e.slug)).size !== entries.length) throw new Error('Duplicate endpoint slugs');

function fields(schema, ancestry = new Set(), depth = 0) {
  const reference = schema?.$ref;
  if (depth > 4 || (reference && ancestry.has(reference))) return '';
  const seen = new Set(ancestry);
  if (reference) seen.add(reference);
  const resolved = resolve(schema);
  if (resolved.type === 'array') return fields(resolved.items, seen, depth + 1);
  const rows = Object.entries(resolved.properties || {}).map(([name, field]) => `<tr><td><code>${html(name)}</code></td><td>${html(schemaType(field))}</td><td>${resolved.required?.includes(name) ? 'Required' : 'Optional'}</td><td>${html(field.description || resolve(field).description || '')}</td></tr>`).join('\n');
  return rows ? `<div class="overflow-x-auto"><table><thead><tr><th>Field</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody>${rows}</tbody></table></div>` : '';
}
function schemaBlock(schema) {
  return fields(schema) + `<details><summary>JSON schema</summary><pre><code class="language-json">${html(JSON.stringify(resolve(schema), null, 2))}</code></pre></details>`;
}
function examples(entry, hasBody) {
  let requestPath = entry.apiPath.replace(/\{([^}]+)\}/g, (_, key) => `YOUR_${key.toUpperCase()}`);
  const query = entry.params.filter(p => p.in === 'query' && p.required);
  if (query.length) requestPath += '?' + query.map(p => `${encodeURIComponent(p.name)}=VALUE`).join('&');
  const url = BASE_URL + requestPath;
  const headers = { Authorization: 'Bearer YOUR_API_KEY', 'X-Project-Id': 'YOUR_PROJECT_ID' };
  if (hasBody) headers['Content-Type'] = 'application/json';
  const curl = `curl --request ${entry.method.toUpperCase()} '${url}'` + Object.entries(headers).map(([k,v]) => ` \\\n  --header '${k}: ${v}'`).join('') + (hasBody ? " \\\n  --data-binary @request.json" : '');
  const py = `import requests${hasBody ? '\nimport json' : ''}\n\n${hasBody ? 'with open("request.json") as body_file:\n  payload = json.load(body_file)\n\n' : ''}response = requests.${entry.method}(\n  ${JSON.stringify(url)},\n  headers=${JSON.stringify(headers, null, 2)},${hasBody ? '\n  json=payload,' : ''}\n  timeout=30,\n)\nresponse.raise_for_status()\nprint(response.text)`;
  const js = `${hasBody ? 'import { readFile } from "node:fs/promises";\nconst payload = await readFile("request.json", "utf8");\n\n' : ''}const response = await fetch(${JSON.stringify(url)}, {\n  method: "${entry.method.toUpperCase()}",\n  headers: ${JSON.stringify(headers, null, 2)},${hasBody ? '\n  body: payload,' : ''}\n});\nif (!response.ok) throw new Error(\`HTTP \${response.status}: \${await response.text()}\`);\nconsole.log(await response.text());`;
  return [['curl','cURL','bash',curl],['python','Python','python',py],['js','JavaScript','javascript',js]].map(([id,label,lang,code],i) => ({id:`${entry.slug}-${id}`,label,lang,code}));
}
function page(entry, weight) {
  const {operation,apiPath,method,slug} = entry;
  const request = jsonMedia(operation.requestBody?.content);
  const params = [{in:'header',name:'X-Project-Id',required:true,schema:{type:'string',format:'uuid'},description:'Project UUID. Use the project associated with your API key.'}, ...entry.params];
  const snippets = examples(entry, !!request);
  const title = operation.summary || `${method.toUpperCase()} ${apiPath}`;
  const paramsData = params.map(p=>({name:p.name,in:p.in,required:!!p.required,type:schemaType(p.schema),description:p.description || ''}));
  return `---
title: ${JSON.stringify(title)}
menuWeight: ${weight}
httpMethod: ${method.toUpperCase()}
apiPath: ${JSON.stringify(apiPath)}
hideToc: true
---

{% raw %}
\`\`\`=html
<h1 style="overflow-wrap:anywhere">${html(title)}</h1>
<div class="api-endpoint-bar"><span class="api-method-badge api-method-${method}">${method.toUpperCase()}</span><code class="api-endpoint-path">${html(apiPath)}</code><button type="button" class="api-tryit-btn" data-method="${method.toUpperCase()}" data-path="${html(apiPath)}" data-body="${!!request}" data-params="${html(JSON.stringify(paramsData))}">Try it</button></div>
${operation.description ? `<p>${html(operation.description)}</p>` : ''}
<p>Authenticate with <code>Authorization: Bearer YOUR_API_KEY</code> and <code>X-Project-Id: YOUR_PROJECT_ID</code>. Replace path placeholders and example values with your project's values.</p>
<h2>Parameters</h2>
<div class="overflow-x-auto"><table><thead><tr><th>Name</th><th>Location</th><th>Type</th><th>Presence</th><th>Description</th></tr></thead><tbody>${params.map(p=>`<tr><td><code>${html(p.name)}</code></td><td>${html(p.in)}</td><td>${html(schemaType(p.schema))}</td><td>${p.required?'Required':'Optional'}</td><td>${html(p.description)}</td></tr>`).join('\n')}</tbody></table></div>
${request ? `<h2>Request Body</h2><p>Create <code>request.json</code> with the fields this operation requires. The examples read that file.</p>${schemaBlock(request[1].schema)}` : ''}
<h2>Examples</h2>
<section class="tab-group" data-tab-group="${slug}">${snippets.map(s=>`<button type="button" class="tab-button" data-tab="${s.id}">${s.label}</button>`).join('')}${snippets.map(s=>`<div id="${s.id}" class="tab-content"><pre><code class="language-${s.lang}">${html(s.code)}</code></pre></div>`).join('\n')}</section>
<h2>Responses</h2>
${Object.entries(operation.responses || {}).map(([status,response])=>{const media=jsonMedia(response.content);return `<h3>HTTP ${html(status)}</h3><p>${html(response.description || 'Response defined by the API schema.')}</p>${media ? schemaBlock(media[1].schema) : '<p>No JSON response body is specified.</p>'}`;}).join('\n')}
<p><a href="/docs/api-reference/getting-started/authentication/">Authentication</a> · <a href="/docs/api-reference/getting-started/rate-limits/">Errors and retries</a> · <a href="/assets/api/openapi.json">OpenAPI specification</a></p>
\`\`\`
{% endraw %}
`;
}
// Validate the complete generation before replacing old output.
const pages = entries.map((entry,i)=>({slug:entry.slug,content:page(entry,(i+1)*10)}));
fs.rmSync(OUTPUT_DIR,{recursive:true,force:true});
fs.mkdirSync(OUTPUT_DIR,{recursive:true});
for(const entry of pages){const dir=path.join(OUTPUT_DIR,entry.slug);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.md'),entry.content);}
const groups = new Map();
for (const entry of entries) {
  const key = entry.apiPath.slice(prefix.length).split('/')[1];
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(entry);
}
const index = `---\ntitle: Endpoints\nmenuWeight: 40\n---\n\n# API Endpoints\n\nThis reference contains ${entries.length} operations from the public OpenAPI specification. Each request uses a project API key and the \`X-Project-Id\` header. See [Authentication](/docs/api-reference/getting-started/authentication/) before sending requests.\n\n` + [...groups].map(([group,items])=>`## ${group.replaceAll('-',' ').replace(/\b\w/g, c => c.toUpperCase())}\n\n`+items.map(e=>`- [\`${e.method.toUpperCase()} ${e.apiPath}\`](/docs/api-reference/endpoints/${e.slug}/)${e.operation.summary?' — '+e.operation.summary:''}`).join('\n')).join('\n\n')+'\n';
fs.writeFileSync(path.join(OUTPUT_DIR,'index.md'),index);
console.log(`Generated ${pages.length} endpoint pages from ${SPEC_PATH}.`);
