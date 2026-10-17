(() => {
  const root = document.documentElement;
  let scene = 'A';
  try {
    scene = sessionStorage.getItem('noveraflow.landing.scene');
    if (!['A', 'B'].includes(scene)) {
      scene = Math.random() < 0.5 ? 'A' : 'B';
      sessionStorage.setItem('noveraflow.landing.scene', scene);
    }
  } catch { /* A remains the static fallback when storage is unavailable. */ }
  root.dataset.scene = scene || 'A';
  const limited = navigator.connection?.saveData ||
    (navigator.deviceMemory && navigator.deviceMemory <= 4) ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);
  root.dataset.motion = limited || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : 'on';
})();
