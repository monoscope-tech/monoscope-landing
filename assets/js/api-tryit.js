(function () {
  let dialog;
  let trigger;
  let requestController;
  let requestPath;
  let requestMethod;
  let generation = 0;
  const byId = id => document.getElementById(id);

  function close() {
    generation += 1;
    requestController?.abort();
    if (dialog?.open) dialog.close();
  }

  function init() {
    if (dialog) return;
    dialog = document.createElement('dialog');
    dialog.id = 'api-tryit-dialog';
    dialog.className = 'api-tryit-modal';
    dialog.setAttribute('aria-labelledby', 'tryit-title');
    // The shared modal class uses flex, so keep closed dialogs explicitly hidden.
    dialog.style.cssText = 'display:none;margin:auto;';
    dialog.innerHTML = `
      <div class="api-tryit-header">
        <h2 class="api-tryit-title" id="tryit-title">API Request</h2>
        <button type="button" class="api-tryit-close" id="tryit-close" aria-label="Close API request">&times;</button>
      </div>
      <div class="api-tryit-body">
        <form id="tryit-form">
          <label class="api-tryit-label" for="tryit-auth">Authorization</label>
          <input class="api-tryit-input" id="tryit-auth" type="password" autocomplete="off" placeholder="Bearer YOUR_API_KEY" required>
          <div id="tryit-params"></div>
          <div id="tryit-body-field" hidden>
            <label class="api-tryit-label" for="tryit-body">JSON request body</label>
            <textarea class="api-tryit-input" id="tryit-body" rows="8" spellcheck="false">{}</textarea>
          </div>
          <button type="submit" class="api-tryit-send" id="tryit-send">Send Request</button>
        </form>
        <p id="tryit-status" role="status" aria-live="polite"></p>
        <pre class="api-tryit-output"><code id="tryit-output"></code></pre>
      </div>`;
    document.body.append(dialog);
    byId('tryit-close').addEventListener('click', close);
    dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
    dialog.addEventListener('close', () => {
      dialog.style.display = 'none';
      byId('tryit-auth').value = '';
      trigger?.focus();
    });
    byId('tryit-form').addEventListener('submit', send);
    byId('tryit-body').addEventListener('input', event => event.target.setCustomValidity(''));
  }

  function open(button) {
    init();
    generation += 1;
    requestController?.abort();
    trigger = button;
    byId('tryit-send').disabled = false;
    requestPath = button.dataset.path;
    requestMethod = button.dataset.method;
    byId('tryit-title').textContent = `${requestMethod} ${requestPath}`;
    byId('tryit-status').textContent = '';
    byId('tryit-output').textContent = '';
    byId('tryit-body-field').hidden = button.dataset.body !== 'true';
    byId('tryit-body').value = '{}';
    byId('tryit-body').setCustomValidity('');
    const paramsEl = byId('tryit-params');
    paramsEl.replaceChildren();
    JSON.parse(button.dataset.params || '[]').forEach((param,index) => {
      const wrapper = document.createElement('div');
      wrapper.style.marginTop = '0.75rem';
      const label = document.createElement('label');
      label.className = 'api-tryit-label';
      label.htmlFor = `tryit-param-${index}`;
      label.textContent = `${param.name} (${param.in}${param.required ? ', required' : ''})`;
      const input = document.createElement('input');
      input.id = label.htmlFor;
      input.className = 'api-tryit-input';
      input.dataset.paramName = param.name;
      input.dataset.paramIn = param.in;
      input.required = param.required;
      input.placeholder = param.description || param.name;
      wrapper.append(label,input);
      paramsEl.append(wrapper);
    });
    dialog.style.display = 'flex';
    dialog.showModal();
    byId('tryit-auth').focus();
  }

  async function send(event) {
    event.preventDefault();
    let path = requestPath;
    const headers = {Authorization: byId('tryit-auth').value.trim()};
    const query = new URLSearchParams();
    byId('tryit-params').querySelectorAll('input').forEach(input => {
      const value = input.value.trim();
      if (!value) return;
      const {paramName:name,paramIn:location} = input.dataset;
      if (location === 'query') query.set(name,value);
      if (location === 'header') headers[name] = value;
      if (location === 'path') path = path.replace(`{${name}}`,encodeURIComponent(value));
    });
    const bodyField = byId('tryit-body');
    bodyField.setCustomValidity('');
    let body;
    if (!byId('tryit-body-field').hidden) {
      body = bodyField.value;
      try { JSON.parse(body); } catch {
        bodyField.setCustomValidity('Enter a valid JSON request body.');
        bodyField.reportValidity();
        bodyField.focus();
        return;
      }
      headers['Content-Type'] = 'application/json';
    }
    const button = byId('tryit-send');
    button.disabled = true;
    byId('tryit-status').textContent = 'Sending request…';
    const currentGeneration = generation;
    const controller = new AbortController();
    requestController = controller;
    const timeout = setTimeout(() => controller.abort(),30000);
    try {
      const url = new URL(path,'https://api.monoscope.tech');
      url.search = query.toString();
      const response = await fetch(url,{method:requestMethod,headers,body,signal:controller.signal});
      const text = await response.text();
      if (currentGeneration !== generation) return;
      byId('tryit-status').textContent = `HTTP ${response.status}`;
      try { byId('tryit-output').textContent = JSON.stringify(JSON.parse(text),null,2); }
      catch { byId('tryit-output').textContent = text; }
    } catch (error) {
      if (currentGeneration !== generation) return;
      byId('tryit-status').textContent = error.name === 'AbortError' ? 'Request stopped or timed out.' : 'Request failed.';
      byId('tryit-output').textContent = error.message;
    } finally {
      clearTimeout(timeout);
      if (currentGeneration === generation) button.disabled = false;
    }
  }

  document.addEventListener('click',event => {
    const button = event.target.closest('.api-tryit-btn');
    if (button) open(button);
  });
})();
