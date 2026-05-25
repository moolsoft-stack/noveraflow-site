const header = document.querySelector("[data-header]");
const canvas = document.querySelector("[data-flow-canvas]");
const ctx = canvas.getContext("2d");
const thoughts = document.querySelector("[data-thoughts]");
const thoughtText = thoughts?.querySelector("span");

const state = {
  width: 0,
  height: 0,
  layers: [],
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  thoughtIndex: 0,
};

const quietThoughts = [
  "짧게 남긴 기록도 괜찮아요.",
  "AI는 정답보다 흐름을 비춥니다.",
  "비슷한 결이 조금씩 이어집니다.",
  "상징은 기록과 함께 천천히 자랍니다.",
  "오늘의 작은 흔적이 나중에 흐름이 됩니다.",
];

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
    speed: 0.000024 + index * 0.000008,
    alpha: 0.082 - index * 0.006,
  }));
}

function drawFlow(time = 0) {
  ctx.clearRect(0, 0, state.width, state.height);

  const hazeShift = state.reducedMotion ? 0 : Math.sin(time * 0.000045) * state.width * 0.026;
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

  if (!state.reducedMotion) {
    requestAnimationFrame(drawFlow);
  }
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function showNextThought() {
  if (!thoughts || !thoughtText || state.reducedMotion) return;

  thoughtText.textContent = quietThoughts[state.thoughtIndex];
  thoughts.classList.add("is-visible");

  window.setTimeout(() => {
    thoughts.classList.remove("is-visible");
  }, 6200);

  state.thoughtIndex = (state.thoughtIndex + 1) % quietThoughts.length;
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", updateHeader, { passive: true });

resizeCanvas();
drawFlow();
updateHeader();

if (thoughtText && !state.reducedMotion) {
  showNextThought();
  window.setInterval(showNextThought, 11800);
}
