(function () {
  'use strict';
  if (window.NFConversions) return;
  const copy = {
    en: {button: 'Optional usage counts', title: 'Help improve NoveraFlow', body: 'With your permission, we count store links, web starts and the first server-confirmed new entry observed on this page, with language, broad country and referral type. Cloudflare stores these counts for three months. We send no journal content or account identifiers and create no visitor ID. Your choice lasts only on this page. You can turn it off here at any time.', allow: 'Allow counts', decline: 'Keep off', stop: 'Turn off', policy: 'Privacy policy', off: 'Off', on: 'On', blocked: 'Your privacy signal keeps optional counts off.'},
    ko: {button: '선택적 이용 집계', title: 'NoveraFlow 개선 돕기', body: '동의하면 스토어 링크·웹 시작·이 페이지에서 처음 관측한 서버 확인 신규 기록을 언어·대략적 국가·유입 유형과 함께 집계합니다. Cloudflare에 3개월 보관하며 기록 내용·계정 식별자는 보내지 않고 방문자 ID를 만들지 않습니다. 선택은 현재 페이지에서만 유지되고 여기서 언제든 끌 수 있습니다.', allow: '집계 허용', decline: '끄기 유지', stop: '집계 끄기', policy: '개인정보처리방침', off: '꺼짐', on: '켜짐', blocked: '개인정보 보호 신호에 따라 선택적 집계를 끕니다.'},
    ja: {button: '任意の利用集計', title: 'NoveraFlowの改善に協力', body: '同意すると、ストアリンク・Web開始・このページで初めて確認したサーバー保存済みの新規記録を、言語・大まかな国・参照元の種類とともに集計します。Cloudflareで3か月保存し、記録内容やアカウント識別子を送信せず、訪問者IDも作成しません。選択は現在のページのみ有効で、ここでいつでも無効にできます。', allow: '集計を許可', decline: '無効のまま', stop: '集計を無効', policy: 'プライバシーポリシー', off: '無効', on: '有効', blocked: 'プライバシー保護の設定に従い、任意の集計を無効にします。'},
  };
  const knownLanguage = value => ['en', 'ko', 'ja'].includes(value) ? value : 'unknown';
  let allowed = false, firstAck = false;
  const seen = new WeakSet(), lastClick = new Map();
  const blocked = () => navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1';
  const language = () => knownLanguage(new URL(location.href).searchParams.get('lang') || document.documentElement.lang);
  const traffic = new URL(location.href).searchParams.get('nf_measurement_test') === '1' || location.hostname !== 'noveraflow.com' ? 'test' : 'production';
  function source() {
    if (!document.referrer) return 'direct';
    try {
      const host = new URL(document.referrer).hostname;
      if (host === 'noveraflow.com') return 'internal';
      if (/^(www\.)?google\.[a-z.]+$/.test(host)) return 'google';
      if (['bing.com', 'www.bing.com'].includes(host)) return 'bing';
      if (['chatgpt.com', 'chat.openai.com'].includes(host)) return 'chatgpt';
      if (/(^|\.)(reddit.com|facebook.com|instagram.com|twitter.com|x.com)$/.test(host)) return 'social';
      return 'other';
    } catch { return 'unknown'; }
  }
  const referral = source(); // Bounded category only; never persist or send URL/query.
  function send(event, locale, scope) {
    if (!allowed || blocked()) return;
    try {
      const payload = {event, language: knownLanguage(locale), source: referral, scope, traffic, consent: 'granted_v1'};
      Promise.resolve(fetch('/_events/conversion', {method: 'POST', credentials: 'omit', cache: 'no-store', keepalive: true,
        referrerPolicy: 'no-referrer', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)})).catch(() => {});
    } catch { /* Counts must never affect navigation, auth or saving. No retries. */ }
  }
  let settingsButton;
  function preferences(locale) {
    const lang = knownLanguage(locale || language()), c = copy[lang] || copy.en;
    const dialog = document.createElement('dialog');
    dialog.style.cssText = 'max-width:min(440px,calc(100vw - 32px));border:1px solid #c9c3ba;border-radius:14px;padding:24px;color:#302b35;background:#fffaf4;font:16px/1.6 system-ui;box-sizing:border-box';
    const heading = document.createElement('h2'); heading.textContent = c.title; heading.style.fontSize = '20px';
    const text = document.createElement('p'); text.textContent = blocked() ? c.blocked : c.body;
    const policy = document.createElement('a'); policy.textContent = c.policy; policy.href = '/privacy' + (lang === 'en' ? '' : '?lang=' + (lang === 'unknown' ? 'en' : lang)); policy.target = '_blank'; policy.rel = 'noopener noreferrer';
    const actions = document.createElement('div'); actions.style.cssText = 'display:flex;flex-wrap:wrap;gap:12px;margin-top:20px';
    const close = () => { dialog.close(); dialog.remove(); if (settingsButton) settingsButton.textContent = c.button + ': ' + (allowed && !blocked() ? c.on : c.off); };
    const no = document.createElement('button'); no.textContent = allowed ? c.stop : c.decline; no.onclick = () => { allowed = false; close(); };
    actions.append(no);
    if (!blocked() && !allowed) { const yes = document.createElement('button'); yes.textContent = c.allow; yes.onclick = () => { allowed = true; close(); }; actions.append(yes); }
    dialog.append(heading, text, policy, actions); document.body.append(dialog); dialog.showModal();
    dialog.addEventListener('cancel', () => dialog.remove(), {once: true});
  }
  window.NFConversions = Object.freeze({
    openPreferences: preferences,
    firstRecordAck(locale) { if (firstAck) return; firstAck = true; send('record_created', locale, 'first_ack_in_page'); },
  });
  document.addEventListener('click', event => {
    if (!event.isTrusted || seen.has(event) || !allowed || blocked()) return;
    seen.add(event);
    const link = event.target?.closest?.('a[href]'); if (!link) return;
    let url; try { url = new URL(link.href, location.href); } catch { return; }
    const kind = url.origin === location.origin && url.pathname === '/app/' ? 'web_start'
      : url.origin === 'https://play.google.com' && url.pathname === '/store/apps/details' && url.searchParams.get('id') === 'com.moolsoft.noveraflow' ? 'store_android'
      : url.origin === 'https://apps.apple.com' && url.pathname === '/app/id6792970947' ? 'store_ios' : null;
    if (!kind) return;
    const now = performance.now(); if (now - (lastClick.get(kind) ?? -Infinity) < 1000) return;
    lastClick.set(kind, now); send(kind, language(), 'click');
  }, true);
  function ready() {
    // Flutter settings/login expose the same dialog in their existing layout.
    if (location.pathname.startsWith('/app/')) return;
    const c = copy[language()] || copy.en;
    settingsButton = document.createElement('button'); settingsButton.type = 'button';
    settingsButton.textContent = c.button + ': ' + c.off;
    settingsButton.style.cssText = 'display:block;margin:12px auto;padding:8px 12px;max-width:calc(100% - 24px);font:inherit';
    settingsButton.onclick = () => preferences();
    (document.querySelector('footer') || document.body).append(settingsButton);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready, {once: true}); else ready();
})();
