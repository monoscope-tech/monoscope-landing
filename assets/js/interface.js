(() => {
  const header = document.getElementById('header');
  const toggle = header.querySelector('.nav-toggle');
  const closeMenu = () => {
    header.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const disclosure = event.target.closest('details[open]');
    if (disclosure) {
      disclosure.open = false;
      disclosure.querySelector('summary').focus();
    } else if (header.classList.contains('menu-open')) {
      closeMenu(); toggle.focus();
    }
  });
  document.addEventListener('click', event => {
    header.querySelectorAll('details[open]').forEach(detail => {
      if (!detail.contains(event.target)) detail.open = false;
    });
    if (!header.contains(event.target)) closeMenu();
  });
  const marquee = document.getElementById('integration-marquee');
  document.querySelector('[data-marquee-toggle]')?.addEventListener('click', event => {
    const paused = marquee.classList.toggle('paused');
    event.currentTarget.setAttribute('aria-pressed', String(paused));
    event.currentTarget.textContent = paused ? 'Resume integrations' : 'Pause integrations';
  });

  // Keep the provider's form and submission behavior inside a native modal.
  const installNewsletter = overlay => {
    if (overlay.closest('dialog')) return;
    const dialog = document.createElement('dialog');
    dialog.className = 'newsletter-dialog';
    dialog.setAttribute('aria-label', 'Monoscope newsletter');
    overlay.before(dialog); dialog.append(overlay);
    const close = document.createElement('button');
    close.type = 'button'; close.className = 'newsletter-close';
    close.textContent = 'Close'; dialog.prepend(close);
    const dismiss = () => {
      overlay.dataset.active = 'false'; overlay.style.display = 'none';
      dialog.close();
    };
    close.addEventListener('click', dismiss);
    dialog.addEventListener('cancel', event => { event.preventDefault(); dismiss(); });
    const sync = () => {
      const active = overlay.dataset.active === 'true' && overlay.style.display !== 'none';
      if (active && !dialog.open) dialog.showModal();
      if (!active && dialog.open) dialog.close();
    };
    new MutationObserver(sync).observe(overlay, { attributes: true, attributeFilter: ['data-active', 'style'] });
    sync();
  };
  const observeNewsletter = () => document.querySelectorAll('.formkit-overlay').forEach(installNewsletter);
  new MutationObserver(observeNewsletter).observe(document.body, { childList: true, subtree: true });
  observeNewsletter();
})();
