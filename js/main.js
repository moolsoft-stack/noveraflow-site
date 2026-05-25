const header = document.querySelector("[data-header]");
const canvas = document.querySelector("[data-flow-canvas]");
const ctx = canvas.getContext("2d");

const state = {
  width: 0,
  height: 0,
  points: [],
  reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
};

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  state.width = canvas.offsetWidth;
  state.height = canvas.offsetHeight;
  canvas.width = Math.floor(state.width * ratio);
  canvas.height = Math.floor(state.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createPoints();
}

function createPoints() {
  const count = Math.max(34, Math.floor(state.width / 34));
  state.points = Array.from({ length: count }, (_, index) => ({
    x: (index / Math.max(count - 1, 1)) * state.width,
    y: state.height * (0.34 + Math.sin(index * 0.72) * 0.12 + Math.random() * 0.28),
    speed: 0.0018 + Math.random() * 0.002,
    phase: Math.random() * Math.PI * 2,
    radius: 1.4 + Math.random() * 2.4,
  }));
}

function drawFlow(time = 0) {
  ctx.clearRect(0, 0, state.width, state.height);

  const gradient = ctx.createLinearGradient(0, 0, state.width, state.height);
  gradient.addColorStop(0, "rgba(113, 139, 118, 0.18)");
  gradient.addColorStop(0.48, "rgba(111, 151, 165, 0.2)");
  gradient.addColorStop(1, "rgba(213, 169, 79, 0.13)");

  ctx.lineWidth = 1.4;
  ctx.strokeStyle = gradient;
  ctx.beginPath();

  state.points.forEach((point, index) => {
    const drift = state.reducedMotion ? 0 : Math.sin(time * point.speed + point.phase) * 18;
    const x = point.x;
    const y = point.y + drift;

    if (index === 0) {
      ctx.moveTo(x, y);
      return;
    }

    const previous = state.points[index - 1];
    const previousDrift = state.reducedMotion ? 0 : Math.sin(time * previous.speed + previous.phase) * 18;
    const controlX = (previous.x + x) / 2;
    const controlY = (previous.y + previousDrift + y) / 2 - 26;
    ctx.quadraticCurveTo(controlX, controlY, x, y);
  });

  ctx.stroke();

  state.points.forEach((point, index) => {
    if (index % 4 !== 0) return;

    const drift = state.reducedMotion ? 0 : Math.sin(time * point.speed + point.phase) * 18;
    ctx.beginPath();
    ctx.fillStyle = index % 8 === 0 ? "rgba(68, 93, 77, 0.28)" : "rgba(180, 125, 98, 0.22)";
    ctx.arc(point.x, point.y + drift, point.radius, 0, Math.PI * 2);
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
