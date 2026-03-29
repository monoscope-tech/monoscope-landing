(function () {
  const MODAL_HTML = `
<div class="api-tryit-overlay" id="api-tryit-overlay">
  <div class="api-tryit-modal">
    <div class="api-tryit-header">
      <div class="api-tryit-title">
        <span class="api-method-badge" id="tryit-method"></span>
        <code id="tryit-path"></code>
      </div>
      <button class="api-tryit-close" id="tryit-close">&times;</button>
    </div>
    <div class="api-tryit-body">
      <div class="api-tryit-form" id="tryit-form">
        <label class="api-tryit-label">Authorization</label>
        <input class="api-tryit-input" id="tryit-auth" type="text" placeholder="Bearer YOUR_API_KEY" value="Bearer ">
        <div id="tryit-params"></div>
        <button class="api-tryit-send" id="tryit-send">Send Request</button>
      </div>
      <div class="api-tryit-response" id="tryit-response" style="display:none;">
        <div class="api-tryit-label">Response <span id="tryit-status"></span></div>
        <pre class="api-tryit-output"><code id="tryit-output"></code></pre>
      </div>
    </div>
  </div>
</div>`;

  let initialized = false;

  function init() {
    if (initialized) return;
    initialized = true;
    document.body.insertAdjacentHTML("beforeend", MODAL_HTML);

    const overlay = document.getElementById("api-tryit-overlay");
    document.getElementById("tryit-close").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    document.getElementById("tryit-send").addEventListener("click", send);
  }

  function open(btn) {
    init();
    const method = btn.dataset.method;
    const apiPath = btn.dataset.path;
    const params = JSON.parse(btn.dataset.params || "[]");

    document.getElementById("tryit-method").textContent = method;
    document.getElementById("tryit-method").className = `api-method-badge api-method-${method.toLowerCase()}`;
    document.getElementById("tryit-path").textContent = apiPath;
    document.getElementById("tryit-response").style.display = "none";

    const paramsEl = document.getElementById("tryit-params");
    paramsEl.innerHTML = "";
    params.forEach((p) => {
      const div = document.createElement("div");
      div.style.marginTop = "0.75rem";
      div.innerHTML = `
        <label class="api-tryit-label">${p.name} <span style="opacity:0.5;font-size:0.75rem;">${p.in} · ${p.type}${p.required ? " · required" : ""}</span></label>
        <input class="api-tryit-input" data-param-name="${p.name}" data-param-in="${p.in}" type="text" placeholder="${p.description || p.name}">`;
      paramsEl.appendChild(div);
    });

    // Store current config
    paramsEl.dataset.method = method;
    paramsEl.dataset.path = apiPath;

    document.getElementById("api-tryit-overlay").classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function close() {
    document.getElementById("api-tryit-overlay").classList.remove("active");
    document.body.style.overflow = "";
  }

  async function send() {
    const paramsEl = document.getElementById("tryit-params");
    const method = paramsEl.dataset.method;
    let url = new URL(`https://api.monoscope.tech${paramsEl.dataset.path}`);
    const auth = document.getElementById("tryit-auth").value.trim();

    paramsEl.querySelectorAll("input[data-param-name]").forEach((input) => {
      if (!input.value.trim()) return;
      if (input.dataset.paramIn === "query") {
        url.searchParams.set(input.dataset.paramName, input.value.trim());
      }
    });

    const sendBtn = document.getElementById("tryit-send");
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";

    try {
      const resp = await fetch(url.toString(), {
        method,
        headers: {
          Authorization: auth,
          "Content-Type": "application/json",
        },
      });
      const text = await resp.text();
      let body;
      try { body = JSON.stringify(JSON.parse(text), null, 2); } catch { body = text; }

      const statusEl = document.getElementById("tryit-status");
      statusEl.textContent = resp.status;
      statusEl.className = resp.ok ? "api-status-badge api-status-2xx" : "api-status-badge api-status-4xx";

      document.getElementById("tryit-output").textContent = body;
      document.getElementById("tryit-response").style.display = "block";
    } catch (err) {
      document.getElementById("tryit-status").textContent = "Error";
      document.getElementById("tryit-status").className = "api-status-badge api-status-5xx";
      document.getElementById("tryit-output").textContent = err.message;
      document.getElementById("tryit-response").style.display = "block";
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Request";
    }
  }

  // Delegate clicks on Try it buttons
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".api-tryit-btn");
    if (btn) open(btn);
  });
})();
