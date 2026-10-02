// <demo-scene src="/assets/demos/know.html"> — plays an HTML product demo.
// The demo file holds dark-mode mock screens (`[data-screen]`) and a storyboard
// (`<script type="application/json" data-storyboard>`). Steps run in order and loop:
//   screen   show this screen (crossfade)
//   caption  subtitle text; "" hides it
//   cursor   selector or [x%, y%]; cursor glides there
//   click    press ripple at the cursor
//   focus    selector; soft highlight ring on that element
//   reveal   selector; element(s) fade/slide in
//   swap     [hideSel, showSel]; toggle display between two blocks (e.g. tab panels)
//   tab      selector; mark that .tab active within its header
//   type     { target, text }; types into the element's text
//   wait     ms to hold after the step (default 900)
// Camera never zooms: the stage is a fixed 1280x720 design scaled to fit its box.
(() => {
  const W = 1280, H = 720, XFADE = 320, CURSOR = 620, CLICK = 260, CAP = 180;
  const css = `
    :host { display:block; position:relative; overflow:hidden; border-radius:inherit; background:oklch(14% .025 263); }
    .box { position:relative; width:100%; aspect-ratio:${W}/${H}; overflow:hidden; }
    .stage { position:absolute; left:0; top:0; width:${W}px; height:${H}px; transform-origin:0 0; }
    .screen { position:absolute; inset:0; opacity:0; transition:opacity ${XFADE}ms ease; }
    .screen.on { opacity:1; }
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
    .caption { position:absolute; left:50%; bottom:5%; transform:translateX(-50%); z-index:40; max-width:88%;
      background:rgb(8 12 24 / .82); color:oklch(92% .01 263); padding:.5em 1em; border-radius:999px;
      font:500 clamp(11px, 1.5cqw, 16px)/1.35 InterVariable, Inter, ui-sans-serif, system-ui, sans-serif;
      white-space:nowrap; overflow:hidden; text-overflow:ellipsis; opacity:0; transition:opacity .3s;
      border:1px solid rgb(255 255 255 / .08); backdrop-filter:blur(6px); }
    .caption.on { opacity:1; }
    .box { container-type:inline-size; }`;
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  class DemoScene extends HTMLElement {
    connectedCallback() {
      if (this._init) return; this._init = true;
      this.setAttribute('inert', ''); // demos are display-only: nothing inside may take focus or scroll the page
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `<style>${css}</style><div class="box"><div class="stage"></div><div class="caption"></div></div>`;
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
      const html = await (await fetch(this.getAttribute('src'))).text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const stage = this.shadowRoot.querySelector('.stage');
      const base = new URL(this.getAttribute('src'), location.href);
      doc.querySelectorAll('style, link[rel="stylesheet"]').forEach(s => {
        const n = s.cloneNode(true); if (n.href) n.href = new URL(s.getAttribute('href'), base); this.shadowRoot.prepend(n);
      });
      for (const sc of doc.querySelectorAll('[data-screen]')) {
        sc.classList.add('screen');
        if (sc.dataset.src) { // real dashboard screen snapshot, with declarative shadow roots
          const html = (await (await fetch(new URL(sc.dataset.src, base))).text()).replace(/\s(autofocus|autoplay)(="[^"]*")?(?=[\s>\/])/g, '').replace(/\s_="[^"]*"/g, '');
          if (sc.setHTMLUnsafe) sc.setHTMLUnsafe(html); else sc.innerHTML = html;
        }
        stage.append(sc);
      }
      stage.insertAdjacentHTML('beforeend', `<div class="ripple"></div>
        <svg class="cursor" viewBox="0 0 24 24"><path d="M5.5 3.2l12.8 12.2-5.6.4 3.1 5.9-2.6 1.3-3-5.9-4.2 3.6z" fill="#fff" stroke="#0f172a" stroke-width="1.4" stroke-linejoin="round"/></svg>`);
      const steps = JSON.parse(doc.querySelector('[data-storyboard]').textContent);
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
      const show = name => {
        const next = stage.querySelector(`[data-screen="${name}"]`);
        if (next === current) return;
        current?.classList.remove('on'); next.classList.add('on'); current = next;
      };
      const center = el => { // element centre in stage px, within its screen
        const r = el.getBoundingClientRect(), s = stage.getBoundingClientRect(), k = this.clientWidth / W;
        return [(r.left - s.left) / k + r.width / 2 / k, (r.top - s.top) / k + r.height / 2 / k];
      };
      const screens = [...stage.querySelectorAll('.screen')], initial = screens.map(el => el.innerHTML);
      const reset = () => screens.forEach((el, i) => { el.innerHTML = initial[i]; });
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      const still = steps.find(s => s.screen); show(still.screen);
      if (steps[0].caption) { caption.textContent = steps[0].caption; caption.classList.add('on'); }
      if (reduced) { stage.querySelectorAll('.reveal').forEach(el => el.classList.add('in')); return; }
      const pause = async () => { while (!this._visible) await new Promise(r => this._resume = r); };
      const seek = +new URLSearchParams(location.search).get('step') || 0;
      for (;;) {
        reset();
        for (const [i, step] of steps.entries()) {
          await pause();
          if (step.screen) show(step.screen);
          if (step.caption !== undefined) {
            caption.classList.remove('on'); await sleep(CAP);
            if (step.caption) { caption.textContent = step.caption; caption.classList.add('on'); }
          }
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
            const el = find(current, step.type.target); el.setAttribute('data-typed', ''); el.textContent = ''; el.classList.add('caret');
            for (const ch of step.type.text) { el.textContent += ch; await sleep(28); }
            await sleep(300); el.classList.remove('caret');
          }
          if (seek && i < seek) continue;
          await sleep(step.wait ?? 900);
          if (seek && i === seek) await new Promise(() => {}); // hold for screenshots
        }
        cursor.style.opacity = 0; await sleep(500);
      }
    }
  }
  customElements.define('demo-scene', DemoScene);
})();
