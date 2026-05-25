const header = document.querySelector("[data-header]");
const canvas = document.querySelector("[data-flow-canvas]");
const ctx = canvas.getContext("2d");

const state = {
  width: 0,
  height: 0,
  layers: [],
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  state.width = canvas.offsetWidth;
  state.height = canvas.offsetHeight;
  canvas.width = Math.floor(state.width * ratio);
  canvas.height = Math.floor(state.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createLayers();
}

function createLayers() {
  const waveCount = state.width < 700 ? 4 : 6;
  state.layers = Array.from({ length: waveCount }, (_, index) => ({
    baseY: state.height * (0.2 + index * 0.105),
    amplitude: state.height * (0.012 + index * 0.004),
    frequency: 0.0018 + index * 0.00042,
    phase: index * 1.35,
    speed: 0.000055 + index * 0.000014,
    alpha: 0.11 - index * 0.008,
  }));
}

function drawFlow(time = 0) {
  ctx.clearRect(0, 0, state.width, state.height);

  const hazeShift = state.reducedMotion ? 0 : Math.sin(time * 0.00008) * state.width * 0.035;
  const haze = ctx.createRadialGradient(
    state.width * 0.62 + hazeShift,
    state.height * 0.28,
    0,
    state.width * 0.62 + hazeShift,
    state.height * 0.28,
    Math.max(state.width, state.height) * 0.68,
  );
  haze.addColorStop(0, "rgba(216, 232, 224, 0.42)");
  haze.addColorStop(0.48, "rgba(239, 243, 232, 0.18)");
  haze.addColorStop(1, "rgba(239, 243, 232, 0)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, 0, state.width, state.height);

  state.layers.forEach((layer, layerIndex) => {
    const drift = state.reducedMotion ? 0 : time * layer.speed;
    const gradient = ctx.createLinearGradient(0, layer.baseY - 40, state.width, layer.baseY + 40);
    gradient.addColorStop(0, `rgba(68, 93, 77, ${layer.alpha * 0.55})`);
    gradient.addColorStop(0.45, `rgba(111, 151, 165, ${layer.alpha})`);
    gradient.addColorStop(1, `rgba(213, 169, 79, ${layer.alpha * 0.42})`);

    ctx.beginPath();
    ctx.lineWidth = layerIndex === 0 ? 1.15 : 0.85;
    ctx.strokeStyle = gradient;

    for (let x = -24; x <= state.width + 24; x += 18) {
      const y =
        layer.baseY +
        Math.sin(x * layer.frequency + layer.phase + drift) * layer.amplitude +
        Math.sin(x * layer.frequency * 0.42 + layer.phase * 0.7 - drift * 0.6) * layer.amplitude * 1.7;

      if (x === -24) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    ctx.stroke();
  });

  const breath = state.reducedMotion ? 0 : Math.sin(time * 0.00011) * 0.35 + 0.65;
  const marks = [
    [0.18, 0.38, 2.1],
    [0.34, 0.49, 1.55],
    [0.57, 0.31, 1.8],
    [0.76, 0.56, 1.35],
    [0.88, 0.41, 1.65],
  ];

  marks.forEach(([xRatio, yRatio, radius], index) => {
    ctx.beginPath();
    ctx.fillStyle = index % 2 === 0 ? `rgba(68, 93, 77, ${0.07 * breath})` : `rgba(180, 125, 98, ${0.055 * breath})`;
    ctx.arc(state.width * xRatio, state.height * yRatio, radius, 0, Math.PI * 2);
    ctx.fill();
  });

  if (!state.reducedMotion) {
    requestAnimationFrame(drawFlow);
  }
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", updateHeader, { passive: true });

resizeCanvas();
drawFlow();
updateHeader();
