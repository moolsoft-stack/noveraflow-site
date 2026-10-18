# Site i18n Status

## 2026-10-18 Phase 1 로컬 구현 상태

- 현재 로컬 기준은 [SEO 구현 기록 21절](04-seo-direction.md#21-2026-10-18-phase-1-로컬-구현)이다.
  아래 ‘검색 접근성 조사 보완’과 6월 구조 설명은 구현 전 기록으로 보존한다.
- 기존 `?lang=ko/en/ja` URL을 유지한다. 8개 페이지 × 3개 언어의 HTML을
  `scripts/build-site.mjs`로 `_localized/`에 생성하고 Pages `_worker.js`가 해당 언어를 반환한다.
- 영어 canonical은 쿼리 없는 최종 URL, 한국어·일본어는 `?lang=ko/ja`다.
  `?lang=en`은 기존 공유 호환성을 위해 200으로 유지하고 영어 canonical을 가리킨다.
- `js/i18n.js`가 landing 포함 본문과 metadata의 단일 번역 원본이다.
  `landing.js`는 시각·동작을 담당하며 중복 번역을 갖지 않는다.
- 언어 선택은 링크로 이동한다. 쿼리 또는 HTML 기본 언어를 따르며 저장된 선호와 브라우저
  언어가 공유 URL의 언어를 덮어쓰지 않는다. 저장소 접근이 차단돼도 동작한다.
- 최초 HTML에 본문·title/description·OG/Twitter·lang·alt·canonical·상호 hreflang·JSON-LD가 있다.
  JavaScript 미실행 상태의 제품 설명과 다운로드도 유지한다.
- 신규 페이지/번역 변경 시 기존 HTML과 모든 언어 키를 수정하고 `npm run build`, `npm test`를
  실행한다. 새 경로는 `site-config.mjs`와 Worker routes를 함께 추가한다.
  `_localized/`와 sitemap을 수동 편집하지 않는다.
- Production 배포·main push는 미실행. 관리·검증·복구는 SEO 21.7~21.10절과
  [운영 기록](HANDOVER_STATUS.md#2026-10-18--seoai-검색-phase-1-로컬-구현)을 따른다.

## 2026-10-18 검색 접근성 조사 보완

이 문서 아래의 2026-06-25 내용은 당시 구조 설명이다. 최신 ko/en/ja SEO 진단과
URL 설계는 [통합 검색 조사](04-seo-direction.md#12-ai-검색-접근성-및-기술-seo)를 따른다.

- 현재 메인 랜딩은 `js/landing.js`와 `js/i18n.js`를 함께 사용한다.
  언어 선택·화면 번역이 존재하는 것과 언어별 검색 HTML이 존재하는 것은 구분한다.
- 직접 GET에서 `/`, `/?lang=ko`, `/?lang=ja`는 모두 영어 HTML과 동일 hash를 반환했다.
  한국어·일본어 본문과 메타 변경에는 JavaScript가 필요하다.
- 홈과 일부 내부 페이지의 en/ko/ja hreflang이 같은 URL을 가리킨다.
  향후 정적 언어 HTML과 self-canonical, 상호 hreflang을 함께 설계할 필요가 있다.
- 현재 메인에는 양쪽 스토어의 실제 다운로드 링크가 있다. 아래의 추후 링크 추가
  TODO를 현재 메인 상태로 해석하지 않는다. About의 출시 준비 문구는 별도 정정 후보다.
- 이번 변경은 문서 보완이며 언어 URL, 번역 코드, 디자인·모션·모바일 동작이나
  배포를 변경하지 않았다.

Last updated: 2026-06-25

## Current Structure

- Supported locales: `ko`, `en`, `ja`
- Shared language file: `js/i18n.js`
- Page animation script: `js/main.js`
- Locale selection: language buttons store the selected locale in
  `localStorage` under `noveraflow.locale`.
- Locale detection order: `?lang=`, stored locale, browser language,
  `data-default-locale`, then English.
- Page identity: each HTML page sets `data-page` on the `<html>` element.
- Metadata: `js/i18n.js` updates title, description, keywords, Open Graph,
  Twitter title/description, and `og:locale` from each page's locale metadata.

## Pages Covered

- `index.html`: main page
- `about.html`: app/download guide
- `philosophy.html`: feature introduction
- `faq.html`: FAQ
- `privacy.html` and `privacy/index.html`: privacy policy
- `terms.html`: terms of service
- `contact.html`: contact/support
- `sitemap.xml`: includes `en`, `ko`, and `ja` alternates

## Key Structure

All three locales use the same flat key structure:

- `common.*`: shared navigation, footer, language labels
- `home.*`: main page copy
- `about.*`: app and download guide
- `features.*`: feature introduction
- `faq.*`: FAQ
- `privacy.*`: privacy policy
- `terms.*`: terms of service
- `contact.*`: contact/support

When adding copy, add the same key to `ko`, `en`, and `ja` before using it in
HTML. A key should not exist in only one locale.

## Remaining TODO

- Legal review is still required before public launch for privacy and terms
  wording in all supported languages.
- Store download links should be added after app store registration is ready.
- If cloud backup, account login, or web app features launch, update privacy,
  terms, FAQ, and metadata together.

## Adding a Language

1. Add the locale code to `SUPPORTED_LOCALES` in `js/i18n.js`.
2. Copy the full existing locale object and translate all `meta`, `messages`,
   and `thoughts` values.
3. Add a language button to each common header or move the header into a shared
   build step before the next larger site refactor.
4. Add `hreflang` entries in each HTML page and `sitemap.xml`.
5. Run a key parity check and `git diff --check`.
