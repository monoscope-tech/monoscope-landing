// Homepage micro-motion: lamps and sea glints pinned to painted art, and once-only heading reveals.
(() => {
  // Morning hero: slide the painting so the lighthouse's foot sits just above the demo tabs at any width
  const sky = document.querySelector('[data-anchor-to]'), tabs = sky && document.querySelector(sky.dataset.anchorTo);
  const anchor = () => { if (!tabs.offsetParent) return sky.style.top = ''; sky.style.top = tabs.getBoundingClientRect().top - sky.parentElement.getBoundingClientRect().top - sky.offsetHeight * +sky.dataset.anchorAt + 'px'; };
  if (tabs) { new ResizeObserver(anchor).observe(sky.parentElement); sky.complete ? anchor() : sky.addEventListener('load', anchor, { once: true }); }
  if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
  if (sky) {
    const gull = '<svg viewBox="0 0 22 10"><path d="M1 7 Q6 1 11 6 Q16 1 21 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    const fx = Object.assign(document.createElement('div'), { className: 'sky-fx', ariaHidden: true });
    fx.innerHTML = [[3, 0, 110], [12, -40, 95], [20, -75, 120]].map(([top, d, t]) => `<i class="wisp" style="top:${top}rem;--d:${d}s;--t:${t}s"></i>`).join('')
      + [[24, -6, 34], [25.2, -8.5, 34], [21, -24, 42]].map(([top, d, t]) => `<i class="gull" style="top:${top}rem;left:0;--d:${d}s;--t:${t}s">${gull}</i>`).join('');
    sky.after(fx);
  }

  // Map image-relative [fx, fy] to the img box, honouring object-fit: cover and object-position.
  const at = (img, fx, fy) => {
    const cw = img.offsetWidth, ch = img.offsetHeight, s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s, [px, py] = getComputedStyle(img).objectPosition.split(' ').map(v => parseFloat(v) / 100);
    return [(cw - dw) * px + fx * dw, (ch - dh) * py + fy * dh];
  };

  document.querySelector('.footer-scene-landscape')?.setAttribute('data-fireflies', '');
  document.querySelectorAll('img[data-art], img[data-fireflies]').forEach(img => {
    img.parentElement.classList.add('art-panel');
    const fx = Object.assign(document.createElement('div'), { className: 'art-fx', ariaHidden: true });
    img.after(fx);
    if (img.dataset.beam) fx.dataset.beam = img.dataset.beam;
    const lamp = img.dataset.lamp?.split(',').map(Number), flies = 'fireflies' in img.dataset ? Array.from({ length: 14 }, (_, i) => [Math.random(), 0.55 + Math.random() * 0.4, i * 0.37]) : [], glints = 'glint' in img.dataset ? Array.from({ length: 7 }, (_, i) => [0.3 + Math.random() * 0.65, 0.8 + Math.random() * 0.15, i * 0.5 + Math.random()]) : [];
    const place = () => {
      Object.assign(fx.style, { left: img.offsetLeft + 'px', top: img.offsetTop + 'px', width: img.offsetWidth + 'px', height: img.offsetHeight + 'px' });
      fx.replaceChildren();
      if (lamp) { const [x, y] = at(img, ...lamp); fx.insertAdjacentHTML('beforeend', `<i class="lamp-at" style="left:${x}px;top:${y}px"><i class="beam"></i><i class="lamp"></i></i>`); }
      for (const [gx, gy, d] of flies) { const [x, y] = at(img, gx, gy); fx.insertAdjacentHTML('beforeend', `<i class="firefly" style="left:${x}px;top:${y}px;--d:${d}s"></i>`); }
      for (const [gx, gy, d] of glints) { const [x, y] = at(img, gx, gy); fx.insertAdjacentHTML('beforeend', `<i class="glint" style="left:${x}px;top:${y}px;--d:${d}s"></i>`); }
    };
    img.complete ? place() : img.addEventListener('load', place, { once: true });
    new ResizeObserver(place).observe(img);
  });

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.2 });
  document.querySelectorAll('section[id] > .wrap .max-w-3xl, .space-y-6.max-w-3xl, #results > div:first-child').forEach(head =>
    [...head.children].forEach((el, i) => { el.classList.add('rv'); el.style.setProperty('--d', i * 0.07 + 's'); io.observe(el); }));
})();
