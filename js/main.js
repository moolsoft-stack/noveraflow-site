const header = document.querySelector("[data-header]");
const canvas = document.querySelector("[data-flow-canvas]");
const ctx = canvas.getContext("2d");
const thoughts = document.querySelector("[data-thoughts]");
const thoughtText = thoughts?.querySelector("span");

const state = {
  width: 0,
  height: 0,
  layers: [],
  particles: [],
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
  createParticles();
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

function createParticles() {
  const count = state.width < 700 ? 18 : 28;
  state.particles = Array.from({ length: count }, (_, index) => {
    const row = index % 4;
    const column = Math.floor(index / 4);
    const xRatio = ((column * 0.137 + row * 0.071) % 0.92) + 0.04;
    const yRatio = 0.2 + row * 0.14 + ((column % 3) * 0.035);

    return {
      xRatio,
      yRatio,
      radius: 1.4 + (index % 3) * 0.45,
      phase: index * 0.74,
      speed: 0.000038 + (index % 5) * 0.000004,
      alpha: 0.16 - (index % 4) * 0.018,
    };
  });
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

  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  state.particles.forEach((point, index) => {
    const flow = state.reducedMotion ? 0 : time * point.speed + point.phase;
    const x = state.width * point.xRatio + Math.sin(flow) * state.width * 0.018;
    const y = state.height * point.yRatio + Math.cos(flow * 0.72) * state.height * 0.024;
    const pulse = state.reducedMotion ? 1 : 0.72 + Math.sin(flow * 1.6) * 0.28;

    if (index % 3 === 0) {
      const next = state.particles[(index + 5) % state.particles.length];
      const nextFlow = state.reducedMotion ? 0 : time * next.speed + next.phase;
      const nextX = state.width * next.xRatio + Math.sin(nextFlow) * state.width * 0.018;
      const nextY = state.height * next.yRatio + Math.cos(nextFlow * 0.72) * state.height * 0.024;
      const distance = Math.hypot(nextX - x, nextY - y);

      if (distance < state.width * 0.32) {
        const linkGradient = ctx.createLinearGradient(x, y, nextX, nextY);
        linkGradient.addColorStop(0, "rgba(68, 93, 77, 0)");
        linkGradient.addColorStop(0.5, "rgba(111, 151, 165, 0.13)");
        linkGradient.addColorStop(1, "rgba(68, 93, 77, 0)");
        ctx.beginPath();
        ctx.strokeStyle = linkGradient;
        ctx.lineWidth = 0.75;
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + nextX) / 2, (y + nextY) / 2 - 18, nextX, nextY);
        ctx.stroke();
      }
    }

    ctx.beginPath();
    ctx.fillStyle = index % 2 === 0
      ? `rgba(68, 93, 77, ${point.alpha * pulse})`
      : `rgba(180, 125, 98, ${point.alpha * 0.82 * pulse})`;
    ctx.arc(x, y, point.radius * pulse, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  if (!state.reducedMotion) {
    requestAnimationFrame(drawFlow);
  }
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function showNextThought() {
  if (!thoughts || !thoughtText || state.reducedMotion) return;

  thoughts.classList.remove("is-visible");

  window.setTimeout(() => {
    thoughtText.textContent = quietThoughts[state.thoughtIndex];
    thoughts.classList.add("is-visible");
    state.thoughtIndex = (state.thoughtIndex + 1) % quietThoughts.length;
  }, 900);

  window.setTimeout(() => {
    thoughts.classList.remove("is-visible");
  }, 6800);
}

function startThoughtLoop() {
  if (!thoughtText || state.reducedMotion) return;

  thoughtText.textContent = quietThoughts[0];
  thoughts.classList.add("is-visible");
  state.thoughtIndex = 1;

  window.setTimeout(() => {
    thoughts.classList.remove("is-visible");
  }, 6800);

  window.setInterval(showNextThought, 9800);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", updateHeader, { passive: true });

resizeCanvas();
drawFlow();
updateHeader();

startThoughtLoop();
