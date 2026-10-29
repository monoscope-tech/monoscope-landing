// <demo-scene src="/assets/demos/know.html"> — plays an HTML product demo.
// The demo file holds dark-mode mock screens (`[data-screen]`) and a storyboard
// (`<script type="application/json" data-storyboard>`). Steps run in order and loop:
//   screen   show this screen (crossfade)
//   caption  subtitle text; "" hides it
//   cursor   selector or [x%, y%]; cursor glides there
//   click    press ripple at the cursor
//   focus    selector; soft highlight ring on that element
//   hide     selector; element(s) start hidden until a later `reveal` with the same selector
//   reveal   selector; element(s) fade/slide in
//   swap     [hideSel, showSel]; toggle display between two blocks (e.g. tab panels)
//   tab      selector; mark that .tab active within its header
//   scroll   selector; smooth-scrolls its scrolling container until the element nears the top
//   type     { target, text, instant? }; types into the element's text or input value
//   zoom     { to: selector | [x%, y%], scale, instant? } pushes the camera onto an element; 1 pulls back out.
//            With `screen` and `instant`, the new screen starts pushed in, so a following `zoom: 1` settles it.
//   wait     ms to hold after the step (default 900)
// The host carries data-screen=<current screen>, so the page can restyle the frame around it.
// The stage scales to fit its box. Set data-width/data-height on the script to match captured screens.
// Loading: the first screen is fetched alone and shown at once; the rest stream in behind it. Fetched text and
// parsed stylesheets are cached per URL, so the hero tab and the chapter that play the same demo share them.
(() => {
  const W = Number(document.currentScript.dataset.width) || 1280;
  const H = Number(document.currentScript.dataset.height) || 720;
  const XFADE = 320, CURSOR = 620, CLICK = 260, CAP = 180, ZOOM = 900;
  const css = `
    :host { display:block; position:relative; overflow:hidden; border-radius:inherit; background:oklch(14% .025 263); }
    .box { position:relative; width:100%; aspect-ratio:${W}/${H}; overflow:hidden; }
    .stage { position:absolute; left:0; top:0; width:${W}px; height:${H}px; transform-origin:0 0; }
    .screen { position:absolute; inset:0; opacity:0; visibility:hidden; transition:opacity ${XFADE}ms ease, visibility 0s ${XFADE}ms; }
    .screen.on { opacity:1; visibility:visible; transition:opacity ${XFADE}ms ease; }
    .screen { transform-origin:0 0; }
    .screen.cam { transition:opacity ${XFADE}ms ease, transform ${ZOOM}ms cubic-bezier(.45,0,.2,1); }
    .cursor { position:absolute; width:22px; height:22px; z-index:30; opacity:0; pointer-events:none;
      transition:left ${CURSOR}ms cubic-bezier(.4,.05,.2,1), top ${CURSOR}ms cubic-bezier(.4,.05,.2,1), opacity .25s, transform .12s;
      filter:drop-shadow(0 1px 2px rgb(0 0 0 / .6)); }
    .cursor.down { transform:scale(.86); }
    .ripple { position:absolute; width:40px; height:40px; margin:-20px 0 0 -20px; border-radius:50%; z-index:25;
      background:rgb(59 130 246 / .35); transform:scale(0); pointer-events:none; }
    .ripple.go { animation:ds-rip .5s ease-out forwards; }
    @keyframes ds-rip { to { transform:scale(1.6); opacity:0; } }
    .focus { outline:2px solid rgb(59 130 246 / .9); outline-offset:3px; border-radius:6px;
      box-shadow:0 0 0 6px rgb(59 130 246 / .18); transition:outline-color .2s, box-shadow .2s; }
    .reveal { opacity:0; transform:translateY(6px); }
    .reveal.in { opacity:1; transform:none; transition:opacity .35s ease-out, transform .35s ease-out; }
    .caret::after { content:""; display:inline-block; width:1.5px; height:1em; vertical-align:-.15em; margin-left:2px;
      background:rgb(59 130 246); animation:ds-caret 1s steps(1) infinite; }
    @keyframes ds-caret { 50% { opacity:0; } }
    .caption { position:absolute; left:50%; bottom:var(--ds-caption-bottom, 5%); transform:translateX(-50%); z-index:40; max-width:88%;
      background:rgb(8 12 24 / .82); color:oklch(92% .01 263); padding:.5em 1em; border-radius:999px;
      font:500 clamp(11px, 1.5cqw, 16px)/1.35 InterVariable, Inter, ui-sans-serif, system-ui, sans-serif;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis; opacity:0; transition:opacity .3s;
      border:1px solid rgb(255 255 255 / .08); backdrop-filter:blur(6px); }
    .caption.on { opacity:1; }
    .box { container-type:inline-size; }
    :host([paused]) * { animation-play-state:paused !important; }
    /* captured app CSS sets overscroll-behavior on :host and modals; demos must never trap page scroll */
    :host, :host *, .stage * { overscroll-behavior:auto !important; }
    @media (prefers-reduced-motion: reduce) { *, *::after { animation:none !important; transition:none !important; } }
    `;
  const cache = new Map(), memo = (k, f) => cache.get(k) || (cache.set(k, f()), cache.get(k));
  const text = url => memo(url, () => fetch(url).then(r => r.text()));
  const sheet = url => memo('css:' + url, () => text(url).then(t => { const s = new CSSStyleSheet(); s.replaceSync(t); return s; }));
  const playerSheet = new CSSStyleSheet(); playerSheet.replaceSync(css);

  class DemoScene extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      this._paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const root = this.attachShadow({ mode: 'open' });
      root.adoptedStyleSheets = [playerSheet];
      root.innerHTML = `<div class="box"><div class="stage" inert></div><div class="caption"></div></div>`;
      this.toggleAttribute('paused', this._paused);
      matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', e => { if (e.matches) { this._paused = true; this.toggleAttribute('paused', true); } });
      this._visible = false;
      new IntersectionObserver(es => {
        this._visible = es[0].isIntersecting;
        if (this._visible && !this._started) { this._started = true; this._run(); }
        if (this._visible) this._resume?.();
      }, { threshold: .2 }).observe(this);
      new ResizeObserver(() => this._fit()).observe(this);
    }
    _fit() {
      const stage = this.shadowRoot?.querySelector('.stage');
      if (stage) stage.style.transform = `scale(${this.clientWidth / W})`;
    }
    async _run() {
      const src = this.getAttribute('src'), base = new URL(src, location.href), root = this.shadowRoot;
      const doc = new DOMParser().parseFromString(await text(src), 'text/html');
      const stage = root.querySelector('.stage');
      const own = [], ext = []; // same-origin sheets are parsed once and adopted; cross-origin ones (fonts) stay <link>s
      for (const l of doc.querySelectorAll('link[rel="stylesheet"]')) { const u = new URL(l.getAttribute('href'), base); (u.origin === location.origin ? own : ext).push(u.href); }
      ext.forEach(href => root.prepend(Object.assign(document.createElement('link'), { rel: 'stylesheet', href })));
      const styles = Promise.all(own.map(sheet)).then(list => { root.adoptedStyleSheets = [...list, playerSheet]; });
      const steps = JSON.parse(doc.querySelector('[data-storyboard]').textContent);
      const screens = [...doc.querySelectorAll('[data-screen]')], first = screens.find(sc => sc.dataset.screen === steps.find(st => st.screen)?.screen);
      const load = sc => sc._ready ??= (sc.dataset.src ? text(new URL(sc.dataset.src, base).href) : Promise.resolve(null)).then(html => {
        if (html !== null) { html = html.replace(/\s(autofocus|autoplay)(="[^"]*")?(?=[\s>\/])/g, '').replace(/\s_="[^"]*"/g, ''); if (sc.setHTMLUnsafe) sc.setHTMLUnsafe(html); else sc.innerHTML = html; }
      });
      for (const sc of screens) { sc.classList.add('screen'); stage.append(sc); }
      await Promise.all([load(first), styles]); // first frame needs only its own screen and the stylesheets
      screens.forEach(load);
      stage.insertAdjacentHTML('beforeend', `<div class="ripple"></div>
        <svg class="cursor" viewBox="0 0 24 24"><path d="M5.5 3.2l12.8 12.2-5.6.4 3.1 5.9-2.6 1.3-3-5.9-4.2 3.6z" fill="#fff" stroke="#0f172a" stroke-width="1.4" stroke-linejoin="round"/></svg>`);
      // text=Label finds the smallest element whose own text is exactly Label (case-insensitive)
      const find = (root, sel) => {
        if (!sel.startsWith('text=')) return root.querySelector(sel);
        const t = sel.slice(5).trim().toLowerCase();
        return [...root.querySelectorAll('a,button,span,td,th,div,p,li,h1,h2,h3,label')].filter(e => e.textContent.trim().toLowerCase() === t).sort((x, y) => x.textContent.length - y.textContent.length)[0] || null;
      };
      const $ = s => stage.querySelector(s), caption = this.shadowRoot.querySelector('.caption'),
        cursor = $('.cursor'), ripple = $('.ripple');
      this._fit();
      let current = null;
      const show = async name => {
        const next = stage.querySelector(`[data-screen="${name}"]`);
        if (next === current) return;
        await next._ready; current?.classList.remove('on'); next.classList.add('on'); current = next; this.dataset.screen = name;
      };
      // Steps mutate the current screen (focus, reveal, tab, type, swap); a pristine clone taken before the first
      // mutation restores it when the loop restarts. Untouched screens are never copied.
      const touch = () => { current._pristine ??= current.cloneNode(true); };
      const reset = () => stage.querySelectorAll('.screen').forEach(el => { el.style.transform = ''; if (el._pristine) el.replaceChildren(...el._pristine.cloneNode(true).childNodes); });
      // Camera: scale the screen so the target's centre moves toward the stage centre, never exposing its edges.
      const zoom = (sc, z, instant) => {
        let t = 'none';
        if (z !== 1) {
          sc.style.transform = 'none';
          const b = sc.getBoundingClientRect(), k = b.width / W, s = z.scale, r = Array.isArray(z.to) ? null : find(sc, z.to).getBoundingClientRect();
          const [cx, cy] = r ? [(r.left - b.left + r.width / 2) / k, (r.top - b.top + r.height / 2) / k] : [z.to[0] * W / 100, z.to[1] * H / 100];
          const tx = Math.min(0, Math.max(W - W * s, W / 2 - cx * s)), ty = Math.min(0, Math.max(H - H * s, H / 2 - cy * s));
          t = `translate(${tx}px, ${ty}px) scale(${s})`;
        }
        sc.classList.toggle('cam', !instant); sc.style.transform = t;
      };
      const center = el => { // element centre in stage px, within its screen
        const r = el.getBoundingClientRect(), s = stage.getBoundingClientRect(), k = stage.getBoundingClientRect().width / W;
        return [(r.left - s.left) / k + r.width / 2 / k, (r.top - s.top) / k + r.height / 2 / k];
      };

      await show(steps.find(s => s.screen).screen);
      if (steps[0].caption) { caption.textContent = steps[0].caption; caption.classList.add('on'); }

      const pause = async () => { while (!this._visible || this._paused) await new Promise(r => this._resume = r); };
      // Loop length estimated from the storyboard; `progress` (0..1) and `loop` events let a host drive a loader.
      const total = steps.reduce((t, s) => t + (s.wait ?? 900) + (s.caption !== undefined ? CAP : 0) + (s.cursor ? CURSOR + (s.click ? CLICK : 0) : 0) + (s.type ? (s.type.instant ? 0 : s.type.text.length * 28) + 300 : 0) + (s.zoom && !s.zoom.instant ? ZOOM : 0), 500);
      let elapsed = 0;
      const sleep = async ms => { for (let remaining = ms; remaining > 0; remaining -= 50) { await pause(); await new Promise(r => setTimeout(r, Math.min(50, remaining))); elapsed += Math.min(50, remaining); this.dispatchEvent(new CustomEvent('progress', { detail: Math.min(1, elapsed / total) })); } };
      const seek = +new URLSearchParams(location.search).get('step') || 0;
      for (;;) {
        reset();
        for (const [i, step] of steps.entries()) {
          await pause();
          if (step.zoom?.instant) { const sc = stage.querySelector(`[data-screen="${step.screen}"]`); await sc._ready; zoom(sc, step.zoom, true); }
          if (step.screen) await show(step.screen);
          if (step.zoom && !step.zoom.instant) { void current.offsetWidth; zoom(current, step.zoom); await sleep(ZOOM); }
          if (step.caption !== undefined) {
            caption.classList.remove('on'); await sleep(CAP);
            if (step.caption) { caption.textContent = step.caption; caption.classList.add('on'); }
          }
          if (step.swap || step.tab || step.hide || step.reveal || step.focus || step.type || step.scroll) touch();
          if (step.scroll) {
            const el = find(current, step.scroll), k = stage.getBoundingClientRect().width / W;
            let sc = el?.parentElement; while (sc && !(sc.scrollHeight > sc.clientHeight + 4 && /auto|scroll/.test(getComputedStyle(sc).overflowY))) sc = sc.parentElement;
            sc?.scrollTo({ top: sc.scrollTop + (el.getBoundingClientRect().top - sc.getBoundingClientRect().top) / k - 24, behavior: 'smooth' });
          }
          if (step.hide) current.querySelectorAll(step.hide).forEach(el => el.classList.add('reveal'));
          if (step.swap) { const [a, b] = step.swap.map(q => current.querySelector(q)); if (a) a.style.display = 'none'; if (b) b.style.display = ''; }
          if (step.tab) { const t = current.querySelector(step.tab); t?.parentElement.querySelectorAll('.tab').forEach(x => x.classList.remove('on')); t?.classList.add('on'); }
          if (step.reveal) current.querySelectorAll(step.reveal).forEach((el, n) => setTimeout(() => el.classList.add('in'), n * 90));
          if (step.focus) { stage.querySelectorAll('.focus').forEach(el => el.classList.remove('focus')); find(current, step.focus)?.classList.add('focus'); }
          if (step.cursor) {
            const [x, y] = Array.isArray(step.cursor) ? [step.cursor[0] * W / 100, step.cursor[1] * H / 100] : center(find(current, step.cursor) || current);
            cursor.style.opacity = 1; cursor.style.left = x + 'px'; cursor.style.top = y + 'px';
            await sleep(CURSOR);
            if (step.click) {
              cursor.classList.add('down'); ripple.style.left = x + 'px'; ripple.style.top = y + 'px'; ripple.classList.add('go');
              await sleep(120); cursor.classList.remove('down'); await sleep(CLICK - 120); ripple.classList.remove('go');
            }
          }
          if (step.type) {
            const el = find(current, step.type.target), k = 'value' in el ? 'value' : 'textContent'; el.setAttribute('data-typed', ''); el[k] = ''; el.classList.add('caret');
            if (step.type.instant) el[k] = step.type.text; else for (const ch of step.type.text) { el[k] += ch; await sleep(28); }
            await sleep(300); el.classList.remove('caret');
          }
          if (seek && i < seek) continue;
          await sleep(step.wait ?? 900);
          if (seek && i === seek) await new Promise(() => {}); // hold for screenshots
        }
        cursor.style.opacity = 0; await sleep(500);
        elapsed = 0; this.dispatchEvent(new CustomEvent('loop'));
      }
    }
  }
  customElements.define('demo-scene', DemoScene);
})();
