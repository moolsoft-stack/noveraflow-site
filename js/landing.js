(() => {
  const translations = {
    en: {
      'nav.experience': 'The experience', 'nav.premium': 'Premium', 'nav.delete': 'Account deletion',
      'eyebrow': 'A LITTLE MOMENT. A GENTLE FLOW.',
      'title': 'Let your days\nfind their flow.',
      'description': 'A quiet place for your thoughts, feelings, and everyday moments. Write a little. Notice more. Come back to yourself.',
      'store.get': 'Download on',
      'store.status': 'iOS is available. The latest update, 1.0.80, is under Apple review.',
      'discover': 'A little closer to you', 'motion.pause': 'Pause motion', 'motion.play': 'Resume motion', 'motion.reduced': 'Reduced motion',
      'intro.title': 'You don’t need the perfect words. Just a moment that’s yours.',
      'intro.copy': 'Some days arrive as a sentence. Others, as a feeling. NoveraFlow gives your records a place to gather, so you can gently discover the patterns in your own life.',
      'experience.kicker': 'YOUR DAYS, IN YOUR OWN WAY', 'experience.title': 'Small records. A richer picture.',
      'experience.copy': 'From a passing thought to a monthly reflection, stay connected to the moments that make you, you.',
      'record.title': 'A small moment, kept.', 'record.copy': 'A thought, a photo, a voice. Make room for today, one record at a time.',
      'mood.title': 'A little closer to yourself.', 'mood.copy': 'Notice the feelings and symbols that gather alongside your records.',
      'reflect.title': 'See how your days connect.', 'reflect.copy': 'Weekly and monthly reflections help you notice recurring themes and small changes.',
      'premium.title': 'Space for a deeper conversation.', 'premium.copy': 'Explore your records with Premium AI conversations and yearly summaries.',
      'premium.kicker': 'NOVERAFLOW PREMIUM', 'premium.heading': 'More room for your story.',
      'premium.description': 'When you want to look a little deeper, Premium brings AI conversations, yearly summaries, and automatic cloud backup to your everyday records.',
      'premium.note': 'Premium requires a subscription and sign-in. Availability may vary with the installed app version.',
      'ai.title': 'A conversation at your pace', 'ai.copy': 'Reflect with AI without turning your life into a score or a diagnosis.',
      'year.title': 'A wider view of your year', 'year.copy': 'Revisit your records and the themes that have accompanied you over time.',
      'backup.title': 'Keep your records close', 'backup.copy': 'Automatic cloud backup helps you keep a copy of your records. Export and restore are also available in the app.',
      'closing.title': 'Your next chapter starts small.', 'closing.copy': 'One quiet moment. One record. Your own flow.',
      'screen.alt': 'NoveraFlow app screen',
    },
    ko: {
      'nav.experience': '노베라플로우의 일상', 'nav.premium': '프리미엄', 'nav.delete': '계정 삭제',
      'eyebrow': '작은 기록이 모여, 나만의 흐름으로',
      'title': '하루의 조각들이,\n나만의 흐름으로.',
      'description': '스쳐 간 생각, 오늘의 마음, 평범한 순간들. 조금씩 기록하고, 천천히 발견하세요. 나를 위한 고요한 공간, NoveraFlow.',
      'store.get': '앱 다운로드', 'store.status': 'iOS 앱을 다운로드할 수 있습니다. 최신 업데이트 1.0.80은 Apple 심사 대기 중입니다.',
      'discover': '나를 조금 더 알아가는 시간', 'motion.pause': '움직임 멈추기', 'motion.play': '움직임 켜기', 'motion.reduced': '움직임 줄임',
      'intro.title': '잘 쓰지 않아도 괜찮아요. 나의 순간이면 충분하니까요.',
      'intro.copy': '어떤 하루는 한 문장으로, 어떤 하루는 하나의 감정으로 남아요. NoveraFlow는 그 작은 기록들이 모여 나의 패턴과 변화를 발견할 수 있도록 곁에 머뭅니다.',
      'experience.kicker': '나의 하루를, 나의 방식으로', 'experience.title': '작은 기록에서, 더 넓은 나의 모습으로.',
      'experience.copy': '스쳐 간 생각부터 한 달의 돌아보기까지. 나를 이루는 소중한 순간들을 이어 보세요.',
      'record.title': '오늘의 작은 순간을 남겨요.', 'record.copy': '한 문장, 사진, 목소리로. 길게 설명하지 않아도 오늘의 기록이 됩니다.',
      'mood.title': '마음결을 천천히 살펴요.', 'mood.copy': '기록 곁에 모인 감정과 상징을 통해 오늘의 나에게 조금 더 가까이 다가가요.',
      'reflect.title': '이어지는 하루를 발견해요.', 'reflect.copy': '주간·월간 피드백으로 반복되는 마음과 작은 변화를 차분히 돌아보세요.',
      'premium.title': '조금 더 깊이 이야기해요.', 'premium.copy': '프리미엄 AI 대화와 연간 요약으로 쌓여 온 기록을 더 넓게 살펴보세요.',
      'premium.kicker': 'NOVERAFLOW PREMIUM', 'premium.heading': '나의 이야기를 위한, 조금 더 넓은 공간.',
      'premium.description': '기록을 조금 더 깊이 돌아보고 싶을 때. 프리미엄의 AI 대화, 연간 요약, 클라우드 자동 백업이 일상과 함께합니다.',
      'premium.note': '프리미엄은 구독과 로그인이 필요합니다. 설치된 앱 버전에 따라 제공 기능이 다를 수 있습니다.',
      'ai.title': '나의 속도에 맞춘 AI 대화', 'ai.copy': '점수를 매기거나 진단하지 않고, 기록 속 마음을 함께 돌아봅니다.',
      'year.title': '한 해를 바라보는 넓은 시선', 'year.copy': '시간 속에 쌓인 기록과 그 곁을 지나온 흐름을 다시 만나 보세요.',
      'backup.title': '소중한 기록을 오래 곁에', 'backup.copy': '클라우드 자동 백업으로 기록의 사본을 보관하세요. 앱에서 내보내기와 복원도 이용할 수 있습니다.',
      'closing.title': '다음 이야기는, 작은 기록에서.', 'closing.copy': '고요한 순간 하나. 기록 하나. 나만의 흐름.',
      'screen.alt': 'NoveraFlow 실제 앱 화면',
    },
    ja: {
      'nav.experience': '日々の体験', 'nav.premium': 'プレミアム', 'nav.delete': 'アカウント削除',
      'eyebrow': '小さな記録から、私だけの流れへ',
      'title': '日々のかけらが、\n私だけの流れになる。',
      'description': 'ふと浮かんだ考え、今日の気持ち、何気ない瞬間。少しずつ記録して、ゆっくり気づく。自分に戻る静かな場所、NoveraFlow。',
      'store.get': 'ダウンロード', 'store.status': 'iOSアプリを公開中です。最新アップデート1.0.80はAppleの審査待ちです。',
      'discover': '自分を少しずつ知る時間', 'motion.pause': '動きを止める', 'motion.play': '動きを再開', 'motion.reduced': '動きを軽減',
      'intro.title': '上手に書かなくても大丈夫。あなたの瞬間なら、それで十分。',
      'intro.copy': 'ある日は一文で、ある日はひとつの気持ちで。NoveraFlowは小さな記録が集まり、自分のパターンや変化に気づけるよう、そっと寄り添います。',
      'experience.kicker': '私の日々を、私らしく', 'experience.title': '小さな記録から、広がる自分の姿。',
      'experience.copy': 'ふと浮かぶ思いから、ひと月の振り返りまで。自分をつくる大切な瞬間をつないでみましょう。',
      'record.title': '今日の小さな瞬間を残す。', 'record.copy': '一文、写真、声で。長く説明しなくても、今日の記録になります。',
      'mood.title': '心の流れをゆっくり見る。', 'mood.copy': '記録に寄り添う気持ちとシンボルから、今日の自分に少し近づきます。',
      'reflect.title': 'つながる日々を見つける。', 'reflect.copy': '週・月ごとのフィードバックで、繰り返す気持ちや小さな変化を振り返ります。',
      'premium.title': 'もう少し深く話してみる。', 'premium.copy': 'プレミアムのAI対話と年間サマリーで、積み重ねた記録を広く見つめます。',
      'premium.kicker': 'NOVERAFLOW PREMIUM', 'premium.heading': '自分の物語に、もう少し広い場所を。',
      'premium.description': '記録をもう少し深く振り返りたいときに。AI対話、年間サマリー、クラウド自動バックアップが日々に寄り添います。',
      'premium.note': 'プレミアムには購読とログインが必要です。アプリのバージョンによって利用できる機能が異なる場合があります。',
      'ai.title': '自分のペースでAIと話す', 'ai.copy': '点数や診断に置き換えず、記録にある気持ちを一緒に振り返ります。',
      'year.title': '一年を見渡す広い視点', 'year.copy': '積み重ねた記録と、そのそばにあった流れにもう一度出会いましょう。',
      'backup.title': '大切な記録をそばに', 'backup.copy': 'クラウド自動バックアップで記録のコピーを保管。アプリでは書き出しと復元も利用できます。',
      'closing.title': '次の物語は、小さな記録から。', 'closing.copy': '静かな瞬間をひとつ。記録をひとつ。自分だけの流れを。',
      'screen.alt': 'NoveraFlowの実際のアプリ画面',
    },
  };
  const i18n = window.NoveraFlowI18n;
  if (!i18n) return;
  const sceneLabels = {
    en: ['Time of day', 'Sunrise', 'Sunset'],
    ko: ['풍경 시간대 선택', '일출', '일몰'],
    ja: ['風景の時間帯', '日の出', '日没'],
  };
  for (const [locale, labels] of Object.entries(sceneLabels)) {
    Object.assign(translations[locale], {
      'scene.label': labels[0], 'scene.one': labels[1], 'scene.two': labels[2],
    });
  }
  for (const [locale, messages] of Object.entries(translations)) {
    Object.assign(i18n.locales[locale].messages,
      Object.fromEntries(Object.entries(messages).map(([key, value]) => [`landing.${key}`, value])));
  }
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
    scene.style.setProperty('--scroll-depth', enabled ? Math.min(1, Math.max(0, -rect.top / rect.height)).toFixed(3) : '0');
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
      image.alt = `${i18n.message('landing.screen.alt')} — ${image.closest('article').querySelector('h3').textContent}`;
    });
    updateMotion();
  }
  window.addEventListener('noveraflow:localechange', localizeScreens);
  document.addEventListener('visibilitychange', () => root.classList.toggle('page-hidden', document.hidden));
  // Stop the decorative hero while the visitor reads the rest of the page.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      document.querySelector('.land-scene').classList.toggle('page-hidden', !entry.isIntersecting);
    }).observe(document.querySelector('.land-hero'));
  }
})();
