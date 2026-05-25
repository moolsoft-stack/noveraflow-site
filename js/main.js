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
  ko: {
    meta: {
      title: "NoveraFlow | 기록이 흐름이 되는 조용한 다이어리",
      description:
        "NoveraFlow는 짧은 기록, 작은 상징, 조용한 피드백을 통해 삶의 흐름이 천천히 보이도록 돕는 다이어리 공간입니다.",
    },
    messages: {
      "brand.home": "NoveraFlow 홈",
      "nav.label": "주요 탐색",
      "nav.philosophy": "생각",
      "nav.flow": "흐름",
      "nav.symbol": "상징",
      "nav.community": "연결",
      "nav.preparing": "준비 중",
      "hero.eyebrow": "삶의 흐름을 위한 조용한 다이어리",
      "hero.title": "NoveraFlow",
      "hero.copy":
        "기록이 쌓이면, 하나의 흐름이 보이기 시작합니다. NoveraFlow는 하루를 판단하지 않습니다. 짧은 문장, 작은 상징, 조용한 피드백이 당신만의 모양으로 천천히 자리 잡도록 돕습니다.",
      "hero.actionsLabel": "주요 동작",
      "hero.primaryCta": "천천히 보기",
      "hero.secondaryCta": "준비 중인 것",
      "hero.previewLabel": "NoveraFlow 기록 감각 미리보기",
      "hero.recordFirst": "긴 설명보다, 작은 흔적 하나를 남기고 싶은 날.",
      "hero.recordSecond": "비슷한 생각이 며칠 사이 조용히 이어지고 있어요.",
      "thoughts.initial": "오늘은 작은 기록만으로도 충분해요.",
      "philosophy.eyebrow": "중요한 것",
      "philosophy.title": "AI보다 기록이 먼저인 다이어리",
      "philosophy.item1.index": "작게",
      "philosophy.item1.title": "부담 없이 남기는 기록",
      "philosophy.item1.copy": "한 문장, 작은 상징, 조용한 빈칸도 충분한 기록이 될 수 있습니다.",
      "philosophy.item2.index": "조용히",
      "philosophy.item2.title": "단정하지 않는 피드백",
      "philosophy.item2.copy": "AI는 진단하거나 처방하지 않습니다. 반복되는 흐름을 조심스럽게 비춥니다.",
      "philosophy.item3.index": "천천히",
      "philosophy.item3.title": "의미를 강요하지 않는 상징",
      "philosophy.item3.copy": "상징은 점수나 유형이 아닙니다. 기록 곁에서 함께 자라는 작은 형태입니다.",
      "flow.eyebrow": "흐르는 방식",
      "flow.title": "하루의 작은 조각이 흐름이 되는 방식",
      "flow.copy":
        "NoveraFlow는 기록을 서둘러 분석하지 않습니다. 반복되는 말, 분위기, 상징, 작은 변화가 시간 속에서 이어지기를 기다립니다.",
      "flow.stepsLabel": "흐름 단계",
      "flow.step1.index": "남김",
      "flow.step1.title": "짧은 기록",
      "flow.step1.copy": "모든 것을 설명하지 않아도 됩니다. 지금 가까운 문장, 감정, 상징을 남깁니다.",
      "flow.step2.index": "쌓임",
      "flow.step2.title": "조용한 누적",
      "flow.step2.copy": "기록은 날짜만이 아니라 흐름을 중심으로 천천히 쌓입니다.",
      "flow.step3.index": "비춤",
      "flow.step3.title": "부드러운 피드백",
      "flow.step3.copy": "익숙한 주제가 보일 때, 결론 없이 조심스럽게 보여줍니다.",
      "symbol.eyebrow": "작은 상징",
      "symbol.title": "상징은 보상이 아니라 흐름의 형태입니다.",
      "symbol.copy":
        "상징은 점, 선, 작은 흔적으로 시작할 수 있습니다. 기록이 이어지면 자연스러운 형태로 천천히 자랍니다. 완성은 끝이 아니라 다음 흐름으로 조용히 넘어가는 순간입니다.",
      "symbol.stageLabel": "상징 성장 단계",
      "feedback.eyebrow": "조용한 메모",
      "feedback.title": "\"최근 비슷한 감정이 다시 돌아오는 것 같아요.\"",
      "feedback.copy":
        "피드백은 관찰에 가깝게 머뭅니다. 삶을 하나의 답으로 고정하지 않고, 혼자서는 알아차리기 어려웠던 흐름을 다시 볼 수 있게 돕습니다.",
      "community.eyebrow": "부드러운 연결",
      "community.title": "커뮤니티는 필수가 아닙니다. 조용히 열립니다.",
      "community.copy":
        "NoveraFlow는 공개 일기보다 익명의 흐름에서 시작합니다. 사용자가 원할 때, 비슷한 흐름이 사적인 삶을 드러내지 않고 만날 수 있습니다.",
      "community.item1.title": "익명의 흐름",
      "community.item1.copy": "기록 원문 전체를 드러내지 않아도, 공유된 감각은 나타날 수 있습니다.",
      "community.item2.title": "열린 상징 의미",
      "community.item2.copy": "서비스가 상징의 의미를 강하게 정하지 않습니다. 사람들은 자연스럽게 느끼고 해석할 수 있습니다.",
      "community.item3.title": "부담 없는 연결",
      "community.item3.copy": "순위, 유형, 보여주기가 목적이 아닙니다. 어떤 흐름이 나만의 것이 아닐 수 있다는 감각이 중요합니다.",
      "mvp.eyebrow": "지금 준비 중",
      "mvp.title": "작게 시작하고, 오래 곁에 남을 수 있게 준비하고 있습니다.",
      "mvp.copy":
        "첫 버전은 편안한 기록, 상징 선택 또는 부여, 부담 없는 피드백에 집중합니다. 경험이 무겁게 느껴지지 않도록 다듬고 있습니다.",
      "mvp.status1": "기록 경험 방향",
      "mvp.status2": "상징 성장 방향",
      "mvp.status3": "첫 기록 경험",
      "mvp.status4": "익명 커뮤니티 열기",
      "footer.copy": "기록을 판단하지 않고, 흐름을 조용히 비추는 다이어리.",
    },
    thoughts: [
      "오늘은 작은 기록만으로도 충분해요.",
      "AI는 정답보다 흐름을 비춥니다.",
      "비슷한 결이 천천히 나타나고 있어요.",
      "상징은 기록 곁에서 함께 자랍니다.",
      "작은 흔적도 나중에는 흐름이 됩니다.",
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
