// <demo-player src="/assets/demos/see-everything.json"> — animated product demo.
// Plays a directed sequence over captured product screens: camera zooms/pans,
// cursor moves, clicks, typing and captions, defined in the spec JSON.
// Step fields: img, caption, cursor:[x,y], click, type:{rect,text}, zoom:[x,y,scale], wait.
(() => {
  const IMG_BASE = '/assets/demos/img/';
  const ZOOM_MS = 900, CURSOR_MS = 700, CLICK_MS = 400, CAP_MS = 200, XFADE_MS = 300;
  const tmpl = `
  <style>
    :host { display:block; position:relative; overflow:hidden; border-radius:inherit; }
    .frame { position:relative; width:100%; overflow:hidden; container-type:inline-size; }
    .stage { position:absolute; inset:0; transform-origin:0 0; transition:transform ${ZOOM_MS}ms cubic-bezier(.45,.05,.15,1); }
    .layer { position:absolute; inset:0; width:100%; height:100%; opacity:0; transition:opacity ${XFADE_MS}ms ease; }
    .layer.on { opacity:1; }
    .layer img { width:100%; height:100%; display:block; }
    .cursor { position:absolute; width:1.6cqw; height:1.6cqw; min-width:14px; min-height:14px; margin:-.2cqw 0 0 -.2cqw; z-index:30; opacity:0;
      transition:left ${CURSOR_MS}ms cubic-bezier(.45,.05,.2,1), top ${CURSOR_MS}ms cubic-bezier(.45,.05,.2,1), opacity .3s;
      filter:drop-shadow(0 1px 2px rgb(0 0 0 / .45)); pointer-events:none; }
    .cursor.down { transform:scale(.85); transition-duration:.12s; }
    .ripple { position:absolute; width:3cqw; height:3cqw; margin:-1.5cqw 0 0 -1.5cqw; border-radius:50%;
      background:rgb(37 99 235 / .35); z-index:25; transform:scale(0); pointer-events:none; }
    .ripple.go { animation:dp-rip .55s ease-out forwards; }
    @keyframes dp-rip { to { transform:scale(1.6); opacity:0; } }
    .typebox { position:absolute; z-index:20; background:#fff; display:none; align-items:center;
      font:500 clamp(8px,1.15cqw,17px)/1 ui-sans-serif,system-ui,sans-serif; color:#1e293b; padding-left:.9em; }
    .typebox .caret { display:inline-block; width:1.5px; height:1.2em; background:#2563eb; margin-left:1px;
      animation:dp-caret 1s steps(1) infinite; }
    @keyframes dp-caret { 50% { opacity:0; } }
    .caption { position:absolute; left:50%; bottom:4.5%; transform:translateX(-50%); z-index:40;
      background:rgb(15 23 42 / .82); color:#f8fafc; padding:.55em 1em; border-radius:999px;
      font:500 clamp(10px,1.5cqw,18px)/1.35 ui-sans-serif,system-ui,sans-serif; white-space:nowrap;
      max-width:92%; overflow:hidden; text-overflow:ellipsis; opacity:0; transition:opacity .4s;
      backdrop-filter:blur(4px); }
    .caption.on { opacity:1; }
    .bar { position:absolute; left:0; bottom:0; height:3px; width:100%; z-index:45;
      background:rgb(37 99 235 / .75); transform:scaleX(0); transform-origin:0 0; }
    .bar.run { transition-timing-function:linear; transition-property:transform; transform:scaleX(1); }
  </style>
  <div class="frame" part="frame">
    <div class="stage">
      <div class="layer a"><img alt="" draggable="false"></div>
      <div class="layer b"><img alt="" draggable="false"></div>
      <div class="typebox"><span class="txt"></span><span class="caret"></span></div>
      <div class="ripple"></div>
      <svg class="cursor" viewBox="0 0 24 24"><path d="M5.5 3.2l12.8 12.2-5.6.4 3.1 5.9-2.6 1.3-3-5.9-4.2 3.6z" fill="#fff" stroke="#0f172a" stroke-width="1.4" stroke-linejoin="round"/></svg>
    </div>
    <div class="caption"></div>
    <div class="bar"></div>
  </div>`;

  const sleep = ms => new Promise(r => setTimeout(r, ms));
  // Rough per-step duration, used for the progress bar.
  const estCost = s => (s.caption ? CAP_MS : 0) + (s.img ? XFADE_MS : 0) + (s.zoom ? ZOOM_MS : 0)
    + (s.cursor ? CURSOR_MS + (s.click ? CLICK_MS : 0) : 0)
    + (s.type ? 900 + (s.type.paste ? 0 : s.type.text.length * 24) : 0) + (s.wait || 500);

  class DemoPlayer extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      this.attachShadow({mode:'open'}).innerHTML = tmpl;
      this._visible = false; this._started = false;
      new IntersectionObserver(es => {
        this._visible = es[0].isIntersecting;
        if (this._visible && !this._started) { this._started = true; this._run(); }
        if (this._visible) this._resume?.();
      }, {threshold:.25}).observe(this);
    }
    async _run() {
      const spec = await (await fetch(this.getAttribute('src'))).json();
      const $ = s => this.shadowRoot.querySelector(s);
      const frame = $('.frame'), stage = $('.stage');
      frame.style.aspectRatio = `${spec.w} / ${spec.h}`;
      const srcs = [...new Set(spec.steps.filter(s => s.img).map(s => IMG_BASE + s.img))];
      await Promise.all(srcs.map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; })));
      const layers = [$('.layer.a'), $('.layer.b')];
      let front = 0;
      const cursor = $('.cursor'), ripple = $('.ripple'), caption = $('.caption'),
        typebox = $('.typebox'), typetxt = $('.txt'), bar = $('.bar');
      const setImg = (name, instant) => {
        const next = layers[1 - front], cur = layers[front];
        next.querySelector('img').src = IMG_BASE + name;
        next.classList.add('on');
        if (instant) cur.classList.remove('on'); else setTimeout(() => cur.classList.remove('on'), XFADE_MS);
        front = 1 - front;
      };
      // Camera: center (x%,y%) of the screen at scale s. translate = 50 - s*center.
      const zoomTo = ([x, y, s]) => {
        x = Math.min(Math.max(x, 50 / s), 100 - 50 / s);
        y = Math.min(Math.max(y, 50 / s), 100 - 50 / s);
        stage.style.transform = `translate(${(50 - s * x).toFixed(2)}%, ${(50 - s * y).toFixed(2)}%) scale(${s})`;
      };
      const firstImg = spec.steps.find(s => s.img);
      setImg(firstImg.img, true);
      const cap0 = spec.steps.find(s => s.caption);
      if (cap0) { caption.textContent = cap0.caption; caption.classList.add('on'); }
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const total = spec.steps.reduce((a, s) => a + estCost(s), 0) + 400;
      const pauseIfHidden = async () => { while (!this._visible) await new Promise(r => this._resume = r); };
      for (;;) {
        bar.classList.remove('run'); bar.style.transitionDuration = '0s'; void bar.offsetWidth;
        bar.style.transitionDuration = total + 'ms'; bar.classList.add('run');
        for (const step of spec.steps) {
          await pauseIfHidden();
          if (step.caption) {
            caption.classList.remove('on');
            await sleep(CAP_MS);
            caption.textContent = step.caption; caption.classList.add('on');
          }
          if (step.img) setImg(step.img, step === firstImg);
          if (step.zoom) { zoomTo(step.zoom); await sleep(ZOOM_MS); }
          if (step.cursor) {
            cursor.style.opacity = 1;
            cursor.style.left = step.cursor[0] + '%'; cursor.style.top = step.cursor[1] + '%';
            await sleep(CURSOR_MS);
            if (step.click) {
              cursor.classList.add('down');
              ripple.style.left = step.cursor[0] + '%'; ripple.style.top = step.cursor[1] + '%';
              ripple.classList.add('go');
              await sleep(150); cursor.classList.remove('down');
              await sleep(CLICK_MS - 150); ripple.classList.remove('go');
            }
          }
          if (step.type) {
            const [x, y, w, h] = step.type.rect;
            Object.assign(typebox.style, {left:x + '%', top:y + '%', width:w + '%', height:h + '%', display:'flex'});
            cursor.style.opacity = 1;
            cursor.style.left = (x + 4) + '%'; cursor.style.top = (y + h / 2 + 1) + '%';
            typetxt.textContent = '';
            await sleep(500);
            if (step.type.paste) { typetxt.textContent = step.type.text; }
            else for (const ch of step.type.text) { typetxt.textContent += ch; await sleep(24); }
            await sleep(400);
          }
          await sleep(step.wait || 500);
          if (step.type) typebox.style.display = 'none';
        }
        cursor.style.opacity = 0;
        zoomTo([50, 50, 1]);
        await sleep(400);
      }
    }
  }
  customElements.define('demo-player', DemoPlayer);
})();
