const header = document.querySelector("[data-header]");
const canvas = document.querySelector("[data-flow-canvas]");
const ctx = canvas.getContext("2d");
const thoughts = document.querySelector("[data-thoughts]");
const thoughtText = thoughts?.querySelector("span");

const LOCALES = {
  en: {
    meta: {
      title: "NoveraFlow | A quiet diary for living patterns",
      description:
        "NoveraFlow is a quiet diary space where small records, gentle symbols, and soft feedback help life patterns become visible over time.",
    },
    messages: {
      "brand.home": "NoveraFlow home",
      "nav.label": "Primary navigation",
      "nav.philosophy": "Why",
      "nav.flow": "Flow",
      "nav.symbol": "Symbols",
      "nav.community": "Together",
      "nav.preparing": "Preparing",
      "hero.eyebrow": "A quiet diary for living patterns",
      "hero.title": "NoveraFlow",
      "hero.copy":
        "When records gather, a flow begins to appear. NoveraFlow does not judge the day. It lets short sentences, small symbols, and quiet feedback settle into a shape that feels like your own.",
      "hero.actionsLabel": "Main actions",
      "hero.primaryCta": "Move slowly",
      "hero.secondaryCta": "What is preparing",
      "hero.previewLabel": "NoveraFlow diary feeling preview",
      "hero.recordFirst": "A day for leaving less explanation, and one small trace.",
      "hero.recordSecond": "A similar thought has been moving quietly for a few days.",
      "thoughts.initial": "A small record is enough today.",
      "philosophy.eyebrow": "What matters",
      "philosophy.title": "A diary where the record comes before AI",
      "philosophy.item1.index": "Small",
      "philosophy.item1.title": "Records that do not feel heavy",
      "philosophy.item1.copy": "One sentence, one symbol, or even a quiet blank can still become a record.",
      "philosophy.item2.index": "Quiet",
      "philosophy.item2.title": "Feedback that does not decide for you",
      "philosophy.item2.copy": "AI does not diagnose or prescribe. It simply reflects recurring flows with care.",
      "philosophy.item3.index": "Slow",
      "philosophy.item3.title": "Symbols that do not force meaning",
      "philosophy.item3.copy": "A symbol is not a score or a type. It is a small shape that grows beside your records.",
      "flow.eyebrow": "How it flows",
      "flow.title": "How small pieces of a day become a flow",
      "flow.copy":
        "NoveraFlow does not rush to analyze a record. It waits for repeated words, moods, symbols, and small changes to connect over time.",
      "flow.stepsLabel": "Flow steps",
      "flow.step1.index": "Leave",
      "flow.step1.title": "A short record",
      "flow.step1.copy": "Write the nearest sentence, feeling, or symbol without needing to explain everything.",
      "flow.step2.index": "Gather",
      "flow.step2.title": "A quiet accumulation",
      "flow.step2.copy": "Records gather around flow rather than dates alone.",
      "flow.step3.index": "Reflect",
      "flow.step3.title": "Soft feedback",
      "flow.step3.copy": "When a familiar theme appears, it is gently shown without conclusion.",
      "symbol.eyebrow": "Small symbols",
      "symbol.title": "Symbols are not rewards. They are shapes of flow.",
      "symbol.copy":
        "They may begin as a dot, a line, or a small trace. As records continue, they slowly grow into a natural form. Completion is not an ending. It is a quiet turn into the next flow.",
      "symbol.stageLabel": "Symbol growth stages",
      "feedback.eyebrow": "A quiet note",
      "feedback.title": "\"A similar feeling seems to be returning lately.\"",
      "feedback.copy":
        "Feedback stays close to observation. It does not fix a life into one answer. It helps a person see a flow that may have been hard to notice alone.",
      "community.eyebrow": "Gentle connection",
      "community.title": "Community is not a requirement. It opens quietly.",
      "community.copy":
        "NoveraFlow begins with anonymous flows, not public diaries. When someone chooses to join, similar flows can meet without turning a private life into display.",
      "community.item1.title": "Anonymous flow",
      "community.item1.copy": "A shared feeling can appear without exposing the full original record.",
      "community.item2.title": "Open symbol meaning",
      "community.item2.copy": "The service does not define symbols too strongly. People may interpret them naturally.",
      "community.item3.title": "Connection without pressure",
      "community.item3.copy":
        "The goal is not ranking, typing, or performing. It is the feeling that a flow is not only yours.",
      "mvp.eyebrow": "Now preparing",
      "mvp.title": "Starting small, so it can stay with people longer.",
      "mvp.copy":
        "The first version focuses on writing with ease, choosing or receiving a symbol, and seeing gentle feedback without making the experience feel heavy.",
      "mvp.status1": "Diary experience direction",
      "mvp.status2": "Symbol growth direction",
      "mvp.status3": "First writing experience",
      "mvp.status4": "Anonymous community opening",
      "footer.copy": "A quiet diary that reflects flow instead of judging records.",
    },
    thoughts: [
      "A small record is enough today.",
      "AI reflects the flow, not the answer.",
      "A familiar thread is slowly appearing.",
      "A symbol grows beside the record.",
      "A quiet trace can still become a flow.",
    ],
  },
};

const SUPPORTED_LOCALES = Object.keys(LOCALES);
const DEFAULT_LOCALE = document.documentElement.dataset.defaultLocale || "en";

const state = {
  width: 0,
  height: 0,
  layers: [],
  particles: [],
  reducedMotion: false,
  thoughtIndex: 0,
  frameCount: 0,
  locale: DEFAULT_LOCALE,
};

function detectLocale() {
  const browserLocale = (navigator.language || DEFAULT_LOCALE).toLowerCase();
  const baseLocale = browserLocale.split("-")[0];

  if (SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale;
  }

  if (SUPPORTED_LOCALES.includes(baseLocale)) {
    return baseLocale;
  }

  return DEFAULT_LOCALE;
}

function getLocaleCopy(locale = state.locale) {
  return LOCALES[locale] || LOCALES[DEFAULT_LOCALE] || LOCALES.en;
}

function getMessage(path, locale = state.locale) {
  const copy = getLocaleCopy(locale);
  return copy.messages?.[path] ?? path.split(".").reduce((value, key) => value?.[key], copy);
}

function applyLocale(locale = detectLocale()) {
  state.locale = LOCALES[locale] ? locale : DEFAULT_LOCALE;
  document.documentElement.lang = state.locale;

  const pageTitle = getMessage("meta.title");
  const metaDescription = getMessage("meta.description");

  if (pageTitle) {
    document.title = pageTitle;
  }

  if (metaDescription) {
    document.querySelector("meta[name='description']")?.setAttribute("content", metaDescription);
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const message = getMessage(element.dataset.i18n);
    if (message) {
      element.textContent = message;
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const message = getMessage(element.dataset.i18nAriaLabel);
    if (message) {
      element.setAttribute("aria-label", message);
    }
  });
}

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  state.width = canvas.offsetWidth;
  state.height = canvas.offsetHeight;
  canvas.width = Math.floor(state.width * ratio);
  canvas.height = Math.floor(state.height * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createLayers();
  createParticles();
  console.log("NoveraFlow particles", state.particles.length);
}

function createLayers() {
  const waveCount = state.width < 700 ? 4 : 6;
  state.layers = Array.from({ length: waveCount }, (_, index) => ({
    baseY: state.height * (0.2 + index * 0.105),
    amplitude: state.height * (0.018 + index * 0.006),
    frequency: 0.0018 + index * 0.00042,
    phase: index * 1.35,
    speed: 0.000055 + index * 0.000014,
    alpha: 0.18 - index * 0.012,
  }));
}

function createParticles() {
  const count = state.width < 700 ? 24 : 42;
  state.particles = Array.from({ length: count }, (_, index) => {
    const row = index % 4;
    const column = Math.floor(index / 4);
    const xRatio = ((column * 0.137 + row * 0.071) % 0.92) + 0.04;
    const yRatio = 0.2 + row * 0.14 + (column % 3) * 0.035;

    return {
      xRatio,
      yRatio,
      radius: 2.2 + (index % 3) * 0.62,
      phase: index * 0.74,
      speed: 0.000085 + (index % 5) * 0.00001,
      alpha: 0.34 - (index % 4) * 0.034,
    };
  });
}

function drawFlow(time = 0) {
  if (state.frameCount === 0) {
    console.log("NoveraFlow animation loaded");
  }
  state.frameCount += 1;

  ctx.clearRect(0, 0, state.width, state.height);

  const hazeShift = state.reducedMotion ? 0 : Math.sin(time * 0.000075) * state.width * 0.04;
  const haze = ctx.createRadialGradient(
    state.width * 0.62 + hazeShift,
    state.height * 0.28,
    0,
    state.width * 0.62 + hazeShift,
    state.height * 0.28,
    Math.max(state.width, state.height) * 0.68,
  );
  haze.addColorStop(0, "rgba(216, 232, 224, 0.56)");
  haze.addColorStop(0.48, "rgba(239, 243, 232, 0.24)");
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
    ctx.lineWidth = layerIndex === 0 ? 1.9 : 1.25;
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
    const x = state.width * point.xRatio + Math.sin(flow) * state.width * 0.034;
    const y = state.height * point.yRatio + Math.cos(flow * 0.72) * state.height * 0.044;
    const pulse = state.reducedMotion ? 1 : 0.65 + Math.sin(flow * 1.6) * 0.35;

    if (index % 3 === 0) {
      const next = state.particles[(index + 5) % state.particles.length];
      const nextFlow = state.reducedMotion ? 0 : time * next.speed + next.phase;
      const nextX = state.width * next.xRatio + Math.sin(nextFlow) * state.width * 0.034;
      const nextY = state.height * next.yRatio + Math.cos(nextFlow * 0.72) * state.height * 0.044;
      const distance = Math.hypot(nextX - x, nextY - y);

      if (distance < state.width * 0.32) {
        const linkGradient = ctx.createLinearGradient(x, y, nextX, nextY);
        linkGradient.addColorStop(0, "rgba(68, 93, 77, 0)");
        linkGradient.addColorStop(0.5, "rgba(111, 151, 165, 0.28)");
        linkGradient.addColorStop(1, "rgba(68, 93, 77, 0)");
        ctx.beginPath();
        ctx.strokeStyle = linkGradient;
        ctx.lineWidth = 1.15;
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo((x + nextX) / 2, (y + nextY) / 2 - 18, nextX, nextY);
        ctx.stroke();
      }
    }

    ctx.beginPath();
    ctx.fillStyle =
      index % 2 === 0
        ? `rgba(68, 93, 77, ${point.alpha * pulse})`
        : `rgba(180, 125, 98, ${point.alpha * 0.82 * pulse})`;
    ctx.arc(x, y, point.radius * pulse, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.restore();

  requestAnimationFrame(drawFlow);
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function showNextThought() {
  if (!thoughts || !thoughtText) return;

  thoughts.classList.remove("is-visible");

  window.setTimeout(() => {
    const quietThoughts = getLocaleCopy().thoughts;
    thoughtText.textContent = quietThoughts[state.thoughtIndex];
    thoughts.classList.add("is-visible");
    console.log("NoveraFlow thought changed", thoughtText.textContent);
    state.thoughtIndex = (state.thoughtIndex + 1) % quietThoughts.length;
  }, 520);

  window.setTimeout(() => {
    thoughts.classList.remove("is-visible");
  }, 5600);
}

function startThoughtLoop() {
  if (!thoughtText) return;

  const quietThoughts = getLocaleCopy().thoughts;
  thoughtText.textContent = quietThoughts[0];
  thoughts.classList.add("is-visible");
  console.log("NoveraFlow thought changed", thoughtText.textContent);
  state.thoughtIndex = 1;

  window.setTimeout(() => {
    thoughts.classList.remove("is-visible");
  }, 5600);

  window.setInterval(showNextThought, 7600);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", updateHeader, { passive: true });

applyLocale();
resizeCanvas();
drawFlow();
updateHeader();
startThoughtLoop();
