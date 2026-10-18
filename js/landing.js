(() => {
  const i18n = window.NoveraFlowI18n;
  if (!i18n) return;
  const root = document.documentElement;
  const mobile = matchMedia('(max-width: 640px)');
  function frameScene() {
    document.querySelectorAll('.land-scene > svg').forEach(svg =>
      svg.setAttribute('viewBox', mobile.matches ? '950 0 650 950' : '0 0 1600 950'));
  }
  frameScene();
  mobile.addEventListener('change', frameScene);
  const toggle = document.querySelector('[data-motion-toggle]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const limited = navigator.connection?.saveData ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  const hero = document.querySelector('.land-hero');
  const scene = document.querySelector('.land-scene');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  let x = 0;
  let y = 0;
  let frame = 0;
  function renderDepth() {
    frame = 0;
    const enabled = root.dataset.motion === 'on' && !reduced.matches && !limited;
    const desktop = enabled && pointer.matches && !mobile.matches;
    const rect = hero.getBoundingClientRect();
    scene.style.setProperty('--pointer-x', desktop ? x.toFixed(3) : '0');
    scene.style.setProperty('--pointer-y', desktop ? y.toFixed(3) : '0');
    // Mobile browsers change the visual viewport while their browser chrome moves.
    // Do not re-composite the full SVG depth stack during those scroll/resize cycles.
    scene.style.setProperty('--scroll-depth', enabled && !mobile.matches
      ? Math.min(1, Math.max(0, -rect.top / rect.height)).toFixed(3)
      : '0');
  }
  function queueDepth() {
    if (!frame) frame = requestAnimationFrame(renderDepth);
  }
  hero.addEventListener('pointermove', event => {
    if (!pointer.matches || mobile.matches || root.dataset.motion !== 'on') return;
    const rect = hero.getBoundingClientRect();
    x = (event.clientX - rect.left) / rect.width * 2 - 1;
    y = (event.clientY - rect.top) / rect.height * 2 - 1;
    queueDepth();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { x = y = 0; queueDepth(); });
  window.addEventListener('scroll', queueDepth, { passive: true });
  window.addEventListener('resize', queueDepth, { passive: true });
  mobile.addEventListener('change', queueDepth);
  pointer.addEventListener('change', queueDepth);
  function updateMotion() {
    const forced = reduced.matches || limited;
    if (forced) root.dataset.motion = 'off';
    toggle.disabled = !!forced;
    toggle.setAttribute('aria-pressed', String(root.dataset.motion === 'off'));
    const key = forced ? 'motion.reduced' : root.dataset.motion === 'off' ? 'motion.play' : 'motion.pause';
    toggle.firstElementChild.dataset.i18n = `landing.${key}`;
    toggle.firstElementChild.textContent = i18n.message(`landing.${key}`);
    queueDepth();
  }
  toggle.addEventListener('click', () => {
    root.dataset.motion = root.dataset.motion === 'off' ? 'on' : 'off';
    updateMotion();
  });
  reduced.addEventListener('change', updateMotion);
  function localizeScreens() {
    document.querySelectorAll('[data-screen]').forEach(image => {
      image.src = `/assets/landing/${i18n.locale}-${image.dataset.screen}-v20261017.webp`;
      image.alt = i18n.message(`landing.screen.${image.dataset.screen}`);
    });
    updateMotion();
  }
  window.addEventListener('noveraflow:localechange', localizeScreens);
  function syncPagePause() {
    // Mobile Chrome already throttles background tabs. Explicitly pausing and
    // resuming every animated SVG descendant forces a full scene recomposition.
    root.classList.toggle('page-hidden', document.hidden && !mobile.matches);
  }
  document.addEventListener('visibilitychange', syncPagePause);
  let heroInView = true;
  function syncScenePause() {
    scene.classList.toggle('page-hidden', !mobile.matches && !heroInView);
  }
  // Stop the decorative hero while desktop visitors read the rest of the page.
  // On mobile, keep its compositor state stable while the browser chrome moves.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      heroInView = entry.isIntersecting;
      syncScenePause();
    }).observe(hero);
  }
  mobile.addEventListener('change', () => {
    syncPagePause();
    syncScenePause();
  });
})();
