(() => {
  'use strict';
  const drawer = document.getElementById('lookalPublicDrawer');
  const backdrop = document.getElementById('lookalPublicBackdrop');
  const openButton = document.getElementById('lookalPublicMenuOpen');
  const closeButton = document.getElementById('lookalPublicMenuClose');
  if (!drawer || !backdrop || !openButton || !closeButton) return;
  let previousFocus = null;
  const focusable = () => [...drawer.querySelectorAll('a[href],button:not([disabled])')];
  function close() {
    if (!drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden','true');
    openButton.setAttribute('aria-expanded','false');
    document.body.classList.remove('lookal-public-nav-open');
    if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
  }
  function open() {
    previousFocus = document.activeElement;
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden','false');
    openButton.setAttribute('aria-expanded','true');
    document.body.classList.add('lookal-public-nav-open');
    closeButton.focus();
  }
  openButton.addEventListener('click',open);
  closeButton.addEventListener('click',close);
  backdrop.addEventListener('click',close);
  drawer.querySelectorAll('a[href]').forEach(a => a.addEventListener('click',close));
  document.addEventListener('keydown', event => {
    if (!drawer.classList.contains('is-open')) return;
    if (event.key === 'Escape') {event.preventDefault();close();return;}
    if (event.key !== 'Tab') return;
    const controls = focusable();
    if (!controls.length) return;
    const first = controls[0], last = controls[controls.length-1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
})();
