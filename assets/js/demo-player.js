// <demo-player src="/assets/demos/see-everything.json"> — animated product demo.
// Plays a captured sequence of real product screens: cursor moves, clicks,
// typing and captions, defined in the spec JSON next to the images.
(() => {
  const IMG_BASE = '/assets/demos/img/';
  const tmpl = `
  <style>
    :host { display:block; position:relative; overflow:hidden; border-radius:inherit; }
    .frame { position:relative; width:100%; }
    .layer { position:absolute; inset:0; width:100%; height:100%; opacity:0; transition:opacity .45s ease; }
    .layer.on { opacity:1; }
    .layer img { width:100%; height:100%; display:block; }
    .cursor { position:absolute; width:22px; height:22px; margin:-3px 0 0 -3px; z-index:30; opacity:0;
      transition:left 1.2s cubic-bezier(.45,.05,.2,1), top 1.2s cubic-bezier(.45,.05,.2,1), opacity .3s;
      filter:drop-shadow(0 1px 2px rgb(0 0 0 / .45)); pointer-events:none; }
    .cursor.down { transform:scale(.85); transition-duration:.12s; }
    .ripple { position:absolute; width:44px; height:44px; margin:-22px 0 0 -22px; border-radius:50%;
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
      max-width:92%; overflow:hidden; text-overflow:ellipsis; opacity:0; transition:opacity .4s, transform .4s;
      backdrop-filter:blur(4px); }
    .caption.on { opacity:1; }
    .frame { container-type:inline-size; }
  </style>
  <div class="frame" part="frame">
    <div class="layer a"><img alt="" draggable="false"></div>
    <div class="layer b"><img alt="" draggable="false"></div>
    <div class="typebox"><span class="txt"></span><span class="caret"></span></div>
    <div class="ripple"></div>
    <svg class="cursor" viewBox="0 0 24 24"><path d="M5.5 3.2l12.8 12.2-5.6.4 3.1 5.9-2.6 1.3-3-5.9-4.2 3.6z" fill="#fff" stroke="#0f172a" stroke-width="1.4" stroke-linejoin="round"/></svg>
    <div class="caption"></div>
  </div>`;

  const sleep = (ms, sig) => new Promise(r => { const t = setTimeout(r, ms); sig?.addEventListener('abort', () => { clearTimeout(t); r(); }, {once:true}); });

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
      const frame = $('.frame');
      frame.style.aspectRatio = `${spec.w} / ${spec.h}`;
      // preload
      const srcs = [...new Set(spec.steps.filter(s => s.img).map(s => IMG_BASE + s.img))];
      await Promise.all(srcs.map(u => new Promise(r => { const i = new Image(); i.onload = i.onerror = r; i.src = u; })));
      const layers = [$('.layer.a'), $('.layer.b')];
      let front = 0;
      const cursor = $('.cursor'), ripple = $('.ripple'), caption = $('.caption'), typebox = $('.typebox'), typetxt = $('.txt');
      const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const setImg = (name, instant) => {
        const next = layers[1 - front], cur = layers[front];
        next.querySelector('img').src = IMG_BASE + name;
        next.classList.add('on');
        if (instant) cur.classList.remove('on'); else setTimeout(() => cur.classList.remove('on'), 460);
        front = 1 - front;
      };
      const firstImg = spec.steps.find(s => s.img);
      setImg(firstImg.img, true);
      const cap0 = spec.steps.find(s => s.caption);
      if (cap0) { caption.textContent = cap0.caption; caption.classList.add('on'); }
      if (still) return; // reduced motion: static first frame + caption

      const pauseIfHidden = async () => { while (!this._visible) await new Promise(r => this._resume = r); };
      for (;;) {
        for (const step of spec.steps) {
          await pauseIfHidden();
          if (step.caption) {
            caption.classList.remove('on');
            await sleep(300);
            caption.textContent = step.caption; caption.classList.add('on');
          }
          if (step.img && step !== firstImg) setImg(step.img);
          else if (step.img) setImg(step.img, true);
          if (step.cursor) {
            cursor.style.opacity = 1;
            cursor.style.left = step.cursor[0] + '%'; cursor.style.top = step.cursor[1] + '%';
            await sleep(1250);
            if (step.click) {
              cursor.classList.add('down');
              ripple.style.left = step.cursor[0] + '%'; ripple.style.top = step.cursor[1] + '%';
              ripple.classList.add('go');
              await sleep(180); cursor.classList.remove('down');
              await sleep(420); ripple.classList.remove('go');
            }
          }
          if (step.type) {
            const [x, y, w, h] = step.type.rect || [step.type.at[0] - 30, step.type.at[1] - 2, 60, 4];
            Object.assign(typebox.style, {left:x + '%', top:y + '%', width:w + '%', height:h + '%', display:'flex'});
            cursor.style.opacity = 1;
            cursor.style.left = (x + 4) + '%'; cursor.style.top = (y + h/2 + 1) + '%';
            typetxt.textContent = '';
            await sleep(900);
            for (const ch of step.type.text) { typetxt.textContent += ch; await sleep(34); }
            await sleep(900);
          }
          await sleep(step.wait || 800);
          if (step.type) typebox.style.display = 'none';
        }
        cursor.style.opacity = 0;
        await sleep(700);
      }
    }
  }
  customElements.define('demo-player', DemoPlayer);
})();
