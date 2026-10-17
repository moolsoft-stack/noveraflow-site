(() => {
  const root = document.documentElement;
  // Continuous UTC+9 slots: local 1970-01-01 00:00 starts with A.
  const interval = 8 * 60 * 60 * 1000;
  const offset = 9 * 60 * 60 * 1000;
  const key = 'noveraflow.landing.override';
  const slotAt = time => Math.floor((time + offset) / interval);
  let override;
  let timer;
  try {
    sessionStorage.removeItem('noveraflow.landing.scene');
    override = JSON.parse(sessionStorage.getItem(key));
  } catch { /* Automatic selection also works without storage. */ }
  function sync() {
    const now = Date.now();
    const slot = slotAt(now);
    if (override && (override.slot !== slot || !['A', 'B'].includes(override.scene))) {
      override = null;
      try { sessionStorage.removeItem(key); } catch { /* In-memory expiry still applies. */ }
    }
    const scene = override?.scene || (slot % 2 === 0 ? 'A' : 'B');
    root.dataset.scene = scene;
    root.dataset.sceneMode = override ? 'manual' : 'auto';
    document.querySelectorAll('[data-scene-select]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.sceneSelect === scene));
    });
    clearTimeout(timer);
    timer = setTimeout(sync, (slot + 1) * interval - offset - now + 25);
  }
  window.NoveraFlowScene = {
    sync,
    select(scene) {
      if (!['A', 'B'].includes(scene)) return;
      override = { slot: slotAt(Date.now()), scene };
      try { sessionStorage.setItem(key, JSON.stringify(override)); } catch { /* Keep this page's choice. */ }
      sync();
    },
  };
  sync();
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-scene-select]').forEach(button => {
      button.addEventListener('click', () => window.NoveraFlowScene.select(button.dataset.sceneSelect));
    });
    sync();
  });
  window.addEventListener('pageshow', sync);
  window.addEventListener('focus', sync);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) sync(); });
  const limited = navigator.connection?.saveData ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  root.dataset.motion = limited || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : 'on';
})();
