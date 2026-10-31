# Handover Status

## 2026-10-31 — 완료 판정 취소·기록 보호 미검증으로 영어 개선 롤백 진행

Site53c5501 / web0eaca55 / Pages7e9b009d의 공개 UI 검증은 기록 미표시 W1의 안전성 검증이 아니다. 기존 목록11개만으로 완전성을 입증할 수 없어 배포 완료 판정을 취소했다. 문서 외41개 변경을 site d922b19 / web d756ac8로 복구해 main Git 통합으로 롤백한다. 실제 사용자 기록 생성·수정·삭제/DB 변경/새 빌드/전체 회귀 재실행0. W1의 계정·기대 기록 범위 및 읽기 전용 원인/영향 확인 전에는 영어 개선 릴리스를 완료·재게시하지 않는다. 실제 롤백 결과와 기존 증거는 [상세 실행 기록](04-seo-direction.md#phase2-english-release-20261031)을 따른다. 아래 과거 PASS/rollback 불필요 기록은 당시의 공개 검사 이력이며 최신 판정이 아니다.

## 2026-10-20 — 문의 Production 배포 완료 / 공개 폼 접수 PASS

Gmail 직접 SMTP 테스트 접수·실제 수신은 사용자 확인 완료다. 인증을 재발급/재입력/재발송하지 않는다.
현재 승인 범위는 기존 backend 우선 배포, 문의 gate 활성화, 기존 Pages main Git 통합 1회 배포와
공개 폼 TEST 1건이다. 아래 인증 대기/미배포 기록은 이전 준비 이력이다.
`8aa38cf` 운영 구조로 main을 fast-forward한 뒤 기존 문의 변경을 통합했다.
공개 canonical은 `/contact?lang=ko`이고 `/contact.html?lang=ko`는 기존 308 호환 URL을 유지한다.
Worker의 `/js/contact.js` 허용, 문의 페이지 전용 자산 버전, 3언어 contact 산출물만 추가한다.
기존 SEO/랜딩/앱 스토어 안내를 덮어쓰지 않는다. 완료한 테스트를 다시 실행하지 않고 필요한 산출물만 생성했다.
rollback은 배포 직전 정상 Pages deployment로 되돌리는 기존 방법을 사용한다.
backend는 `fdd385084d521e1a5b4fb7a11392b119d574dedc`,
`/opt/noveraflow-releases/admin-fdd3850-site-contact-20261020-release`로 배포·활성화됐다.
2026-10-20 18:12:10 KST, gate=true, health/readiness 내부·공개 200, 문의 preflight 204.
기존 RTDN gate=true 및 문의 외 코드/설정은 유지했다. managed backup 18:11:58 KST와 이전 release/PM2 snapshot을 확보했다.
사이트 직전 정상 Pages 복구 지점은 `663c49c3-2b5f-4f4a-aad5-e3e293d6b495` / source `da28d1b`(이후 docs-only skip commit 포함 main `8aa38cf`)다.
사이트 운영 source는 `86114a059b6581cd42e8cbe89a0a470c4969f059`,
Pages deployment `8f314b9e-7b43-426e-be7e-ed9b6dbfa78e`이며 GitHub Cloudflare Pages check completed/success를 확인했다.
별도 직접 deploy를 하지 않았다. 이 결과를 적는 후속 docs commit은 `[CF-Pages-Skip]`로 중복 배포를 피한다.

### 실제 공개 폼 검증·남은 조건

- 공개 URL `https://noveraflow.com/contact?lang=ko`(en `/contact`, ja `/contact?lang=ja`).
  ko/en/ja, 6가지 유형, bug/feature 앱 정보 표시 및 partnership에서 숨김, 모바일 입력 넘침 없음을 확인했다.
- **2026-10-20 18:16:32 KST**, 실제 Chrome 폼 버튼 **1회** 클릭 → 운영 API POST **202**(nginx 관측 POST1건).
  전송 중/입력·버튼 잠금 → 성공 안내 → 입력 초기화를 확인했다.
  배포된 backend는 SMTP의 고정 수신자 accepted 이후에만 이 성공 응답을 반환한다. 직접 SMTP 테스트를 반복하지 않았다.
- 실제 폼 입력과 운영 메일 조립 함수 확인: 제목 `[제휴문의] [TEST] 공개 문의 폼 배포 검증 20261020`,
  From/Reply-To `moolsoft@gmail.com`, 서버 고정 수신 `moolsoft+help@gmail.com`.
  본문에도 TEST/가상/회신 불필요를 명시했다. 수신 원문 헤더를 조회한 확인은 아니다.
- 이번 TEST 메일의 Gmail 검색 UI가 응답하지 않아 **실제 Gmail 수신·수신 원문 헤더 확인은 사용자 대기**다.
  기존 직접 SMTP 테스트는 사용자 수신 확인 완료지만 이번 공개 폼 메일과 별개다. 중복 발송하지 않는다.
- 전송 후 backend health/readiness 내부·공개 모두 200. 기존 RTDN·결제·Premium·AI·백업·앱 1:1 문의 소스/설정 보존,
  DB migration·실제 결제·기타 운영 변경 없음. backend의 모든 main 변경을 배포하지 않고 기존 운영 revision 위 문의 변경만 반영했다.
- 서버 비밀값 없는 증거와 보호된 복구 설정: `/opt/noveraflow-ops/contact-deploy-20261020/`.
  root `0700`, metadata/PM2 복구 설정 `0600`이며 내용/credential을 Git·로그에 노출하지 않는다.
  SMTP 장기 보관·no-echo 갱신/회수와 backend 이전 release/managed backup은 Admin Runbook의 같은 날짜 완료 절을 따른다.
  개인정보 없는 성공 화면은 `D:/Development/Personal/tmp/contact-deploy-20261020/public-contact-success.jpg`(Git 제외).
- rollback이 필요하지 않았다. 장애 시 backend 문의 gate OFF 후 이전 release,
  사이트는 위 정상 Pages deployment로 Worker·3언어 HTML·JS/CSS를 한 묶음으로 복구한다.
  수신 확인 시 이 절과 Admin Runbook만 갱신하고 재발송하지 않는다.

## 2026-10-20 — 사이트 직접 문의 폼 구현 (미배포)

목적: 이전 문의 안내 대신 사용자가 사이트에서 작성·전송하고 현재 NoveraFlow Admin backend가
고정 지원 주소로 메일을 보내도록 구현했다. 기존 디자인·ko/en/ja 및 앱 내부 1:1 문의는 유지한다.
상태: **로컬 구현·검증 완료 / Gmail 인증 입력 준비 완료 / 앱 비밀번호 발급·입력 대기 / 실제 발송 0건 / 운영 미배포 / commit·push 안 함**.
아래 출시 안내 조사/마케팅 변경은 기존 사용자 변경으로 보존했으며 이 작업으로 배포하지 않았다.

- 변경 경로: `contact.html`, `js/contact.js`, `js/i18n.js`, `css/styles.css`,
  `scripts/verify-site.mjs`, `test/contact.test.mjs`, 이 문서.
  문의 페이지의 CSS/i18n/contact.js는 `20261020` 버전으로 캐시를 구분한다.
- 유형: 일반/기능/오류/제휴/광고/기타. 유형·회신 이메일·제목·내용 필수, 이름/회사명 선택.
  플랫폼/버전은 기능·오류 문의에만 표시·전송한다. mailto를 제거했다.
- 공개 연결: `POST https://admin.noveraflow.com/api/public/site-contact`, 쿠키/인증정보 없음.
  받는 주소 `moolsoft+help@gmail.com`, `[제휴문의]` 등 한국어 제목 태그는 서버가 고정한다.
  브라우저에는 SMTP 설정/발신 비밀을 넣지 않는다. 성공은 SMTP 접수 확인 후에만 표시한다.
- 전송 중 입력/버튼 잠금, 동일 요청 키 재사용. 실패/접수 미확인은 입력을 유지하고 중복 재전송 주의를 표시한다.
  15분 메모리 중복 방지는 재시작·여러 backend process를 넘는 영구 exactly-once 보장이 아니다.
- backend 변경/환경변수/안전한 no-echo 주입/단발 메일 검증/중단·복구 절차의 공식 기록:
  `D:/Development/Personal/noveraflow-admin/docs/10-operations-runbook.md`의 **2026-10-20 — 사이트 문의 메일 구현** 절.
  설정 이름은 `SITE_CONTACT_ENABLED`, `SITE_CONTACT_SMTP_HOST`, `SITE_CONTACT_SMTP_PORT`,
  `SITE_CONTACT_SMTP_USER`, `SITE_CONTACT_SMTP_PASSWORD`, `SITE_CONTACT_MAIL_FROM`,
  `SITE_CONTACT_TRUST_LOOPBACK_PROXY`. 운영 보관 위치는 기존 root 소유 `0600`
  `/opt/noveraflow-admin/backend/.env`와 release symlink다. 이번에는 추가/변경하지 않았다.
- 후속 선택: Gmail SMTP USER/From `moolsoft@gmail.com`, 서버 고정 To `moolsoft+help@gmail.com`.
  서버에서 465는 timeout, 587 STARTTLS 연결·인증서 검증은 PASS여서 **`smtp.gmail.com:587` STARTTLS 필수**로 준비했다.
  기존 backend/운영 환경에 SMTP credential이 없으므로 사용자가 Google에서 앱 비밀번호를 신규 발급해야 한다.
  2단계 인증 및 앱 비밀번호 제공 조건/공식 URL/정확한 PowerShell no-echo 입력 명령은 Admin Runbook의 Gmail 절을 따른다.
  root 전용 `/opt/noveraflow-ops/site-contact-gmail-20261020`에 기존 발송 모듈과 설정·단발 검증 도구가 준비됐으며
  `--check`만 실행해 입력 가능 상태를 확인했다. 앱 배포/인증 입력/SMTP 발송은 아직 하지 않았다.
  해당 도구는 AUTH 성공 후에만 기존 보호 `.env`의 발송 설정을 저장하고 gate=false를 유지하며 테스트 1건만 전송한다.
  실제 가상 메일 **0건**이므로 공급자 발송 접수와 Gmail 수신 모두 미확인이다.
- 검증: `npm test` **6/6 PASS**(신규 문의 UI 4개 + 기존 2개), `npm run build` PASS.
  backend 문의 테스트 **10/10 PASS** 및 server syntax PASS. mock/stream MIME 검증은 실제 발송이 아니다.
  로컬 Chrome에서 ko/en/ja 전환과 오류문의 선택 입력, 좁은 viewport의 입력 넘침 없음을 확인했다.
- 남은 조건: Gmail 앱 비밀번호 발급·no-echo 입력 → 보호 설정 저장 및 지정 수신자로 테스트 1건(제목/본문 TEST) →
  접수/실제 수신 구분 확인 → 별도 승인된 운영 배포. 기존 main/origin 차이는 아래 조사 기록을 참고해
  배포 전에 사용자 변경을 보존하며 통합 검토한다. 이번에는 checkout/pull/merge/deploy하지 않았다.
- 운영 장애는 backend 전용 gate OFF로 발송만 중단(503), 사이트 이전 정적 release로 복구한다.
  이미 접수된 메일은 회수하지 못한다. 실제 발송/배포 시 이 절과 Admin Runbook에 날짜·검증 범위·남은 조건을 함께 갱신한다.

Last updated: 2026-10-18

## 2026-10-18 — SEO·AI 검색 Phase 1 Production 배포

현재 상태: **Production 배포 및 운영 검증 완료 / rollback 불필요**.

- 구현 commit 및 Production source revision:
  `37e4d276957cc4002ac3fe386cc6351a63a85ccf`
  (`feat(site):publish-SEO-AI-search-phase-one`). `origin/main` push 성공 후 기존
  Cloudflare Pages Git 통합이 repository root를 게시했다.
- Cloudflare deployment identifier:
  `fb72a1a5-d818-4d70-81f4-30063da16dda`. Cloudflare Pages GitHub check run
  `117542071908`은 source `37e4d27`, `Deployed successfully`, preview URL
  `https://fb72a1a5.noveraflow-site.pages.dev`를 반환했다. 광범위한 Cloudflare OAuth를
  사용하지 않고 공개 GitHub Checks API로 확인했으며 인증정보를 기록하지 않았다.
- 배포 직전 Production source는 `cf93b46`이었고, 이 revision의 직전 정상 Pages
  deployment가 복구 지점이다. 문제가 생기면 Pages dashboard에서 source `cf93b46`인
  성공 deployment를 선택하거나 SEO commit `37e4d27`만 revert해 일반 push한다.
  reset·force-push는 사용하지 않으며 Worker, 24개 정적 HTML, sitemap, HTML/JS/CSS를
  한 묶음으로 복구한다.
- 배포 대상은 한국어·영어·일본어 24개 정적 HTML, 정확한 제품 설명과 FAQ 12개,
  metadata·canonical·hreflang·JSON-LD, sitemap, 명시적 404와 이전 URL 308 Worker다.
  앱·스토어 등록정보·AI backend·DB·인증·학습용 crawler 정책은 변경하지 않았다.
- Production HTTP 검사: 24/24 canonical 문서 GET/HEAD 및 연결 자산 42개 200,
  이전 URL 8개 308, 없는 경로와 `/admin`·내부 API·문서 등 12개 404/noindex.
  각 언어 `Content-Language`, canonical, JSON-LD parse와 sitemap 24 URL이 통과했다.
- Production 브라우저 검사: Chrome/WebKit의 36개 언어·장면·viewport 조합과
  JavaScript 켬/끔 48개 공개 페이지 방문이 통과했다. Hero 애니메이션, 화면 크기 변경,
  스크롤 복귀, 모션 토글·reduced motion, 저장소 제한, desktop depth/offscreen pause,
  언어 링크와 본문 접근성을 확인했다.
- Google Play 링크는 최종 200, App Store 링크는 공식 US 상세 URL로 301 후 200이다.
  `robots.txt`의 wildcard Allow와 sitemap 지시는 저장소와 운영 응답에서 텍스트가 같다.
  OAI-SearchBot·Googlebot·bingbot·PerplexityBot·GPTBot 문자열의 공개 페이지 응답은
  200이지만 실제 봇 IP/WAF 통과나 색인·AI 추천을 보장하는 근거로 사용하지 않는다.
- rollback 조건에 해당하는 주요 화면·다국어·스토어 링크·개인정보 경계 회귀가 없어
  rollback은 실행하지 않았다. 운영 증거는
  `../tmp/seo-phase1-20261018/production-browser/results.json`과 같은 디렉터리의
  screenshot, HTTP 실행 출력으로 보관한다.
- 다음 단계는 Android 공개 version과 신규 Premium capability 확인, iOS 1.0.80(81)
  심사 완료 후 문구 재검토, Google/Bing 색인·성과 및 실제 crawler/WAF 로그 확인,
  Core Web Vitals 추적이다. App Store·Google Play 등록정보 변경은 별도 승인 작업이다.

`GIT: PASS` / `DEPLOY: PASS` / `PRODUCTION_VERIFY: PASS` /
`ROLLBACK: NOT_REQUIRED` / `DOCUMENTATION: PASS`.

## 2026-10-18 — Naver Search Advisor 소유확인 태그 Production 배포

- 구현 commit/Production revision:
  `da28d1bd32ffea0cc1d5cacc636f59514ba15a9b`. 기존 `main` Git 통합에 일반 push했다.
- Cloudflare Pages deployment:
  `663c49c3-2b5f-4f4a-aad5-e3e293d6b495`, check run `117577878657`, 완료
  2026-10-18 12:40:35 KST, preview `https://663c49c3.noveraflow-site.pages.dev`.
- `scripts/build-site.mjs` 공통 생성기에 Naver 공개 인증값을 추가했고, 영어 원본
  `index.html`과 `_localized/{en,ko,ja}/home/index.html`을 생성했다.
  `scripts/verify-seo.mjs`와 `test/seo-routing.test.mjs`가 값과 중복을 자동 검사한다.
- 로컬 `npm run build`, 12개 테스트, `git diff --check`가 통과했다. Pages 호환 로컬
  HTTP의 세 언어 홈도 200, 언어 일치, 인증 태그 1개를 반환했다.
- 운영 `/`, `/?lang=ko`, `/?lang=ja`는 모두 200이며 언어별 첫 HTML에 정확한 태그가
  1개 있다. `Content-Language`, HTML `lang`, self-canonical, hreflang 4개와 JSON-LD가
  유지됐다. robots.txt는 200/저장소 동일, sitemap은 200/24 URL/저장소 동일이다.
- Google 소유권 인증과 SEO metadata, canonical/hreflang, 구조화 데이터, robots,
  sitemap, Worker 라우팅, 앱·스토어·DB·인증정보는 변경하지 않았다. Search Advisor
  콘솔의 최종 소유확인 버튼은 사용자가 직접 실행해야 한다.
- 배포 직전 정상 revision/deployment는
  `8ecfe87460891b77cbf3b87eeccc21240ffa937e` /
  `a9ee77d5-71b3-4a4c-abb1-764feaa768ce`다. 회귀 시 Pages dashboard에서 이 deployment로
  rollback하거나 `da28d1b`만 revert해 일반 push한 뒤 세 언어 HTML과 robots/sitemap을
  재검증한다. reset·force-push는 사용하지 않는다. rollback은 필요하지 않았다.

`GIT: PASS` / `DEPLOY: PASS` / `PRODUCTION_VERIFY: PASS` /
`ROLLBACK: NOT_REQUIRED` / `DOCUMENTATION: PASS`.

## 2026-10-18 — SEO·AI 검색 Phase 1 로컬 구현

이 절은 Production 배포 전 로컬 완료 시점의 기록이다. 현재 운영 상태는 바로 위
Production 배포 절을 따른다.

- SSOT: [SEO 방향 문서 21절](04-seo-direction.md#21-2026-10-18-phase-1-로컬-구현).
  실제 기능과 출시 구분, 변경 파일 목록, 공식 구조화 데이터 기준, 크롤러·개인정보 영향,
  검증 명령·결과·남은 확인과 복구 절차를 이 문서 한 곳에서 관리한다.
- 기존 조사 MD 3개의 미커밋 내용을 보존해 확장했다. 실제 공통 문서 경로는
  `../projects-docs`이며 요청의 `noveraflow-projects-docs`는 존재하지 않는다.
- 공개 iOS는 KR/US/JP 모두 1.0.61로 다시 확인했다. 1.0.80(81) 심사 상태는 사용자 제공
  사실로 유지하며 공개 기능과 분리한다. Android 신규 기능의 배포 버전은 확정하지 않았다.
- 연간 요약은 실제 생성·조회 경로를 확인하지 못해 제공 중 혜택에서 제외했다.
  AI 대화·자동 클라우드 백업은 지원 버전과 로그인/Premium 조건·심사 경계를 명시했다.
  About/Contact 출시 전 문구, FAQ 서버 처리, 오해를 주는 Premium 이미지도 정정했다.
- 기능 상태를 다음처럼 고정한다: Android 공개판은 AI 대화·클라우드 자동 백업의 일반
  제공을 확인하지 못함, iOS 공개 1.0.61은 두 기능의 제공을 확인하지 못함, iOS 심사
  1.0.80(81)은 두 기능의 구현·접근 경로가 확인되지만 공개판이 아님. 기본 일기와
  로컬 ZIP 백업은 무료 공개 범위, Premium capability는 심사·권한 정책에 존재하나
  플랫폼별 공개 여부를 확정하지 않음. 앱 언어 코드는 더 많지만 홈페이지의 확정 지원은
  한국어·영어·일본어로 제한한다. 상세 매트릭스는 SEO 21.1절에 있다.
- 기존 쿼리 언어 URL을 유지하는 24개 정적 HTML과 `_worker.js`/`_routes.json`을 추가했다.
  최종 canonical, 24 URL sitemap, 308 이전 URL 호환, 404와 내부 경로 404/noindex를 적용했다.
  기존 SVG·KST 스케줄·모바일 compositor 보정은 유지한다.
- `robots.txt`와 학습용 크롤러 정책, 앱·인증·DB·스토어·서버 설정은 변경하지 않았다.
- 로컬 확인: build·12개 테스트, 실제 Wrangler Pages의 24 GET/HEAD·41 연결 자산·8 이전 URL·
  12개 404, Chrome/WebKit 36개 언어/풍경/화면 조합, JS 켬/끔 48개 페이지와 추가 동작 검사.
  증거 위치와 상세 한계는 SEO 21.8절에 기록한다. 실물 기기·실제 봇 IP·색인·AI 추천 검증은 별도다.
  120초 유지 검사와 최종 교체 카드의 18개 조합 재검증도 PASS했다.
- 향후 문구 수정 후 `npm run build`로 산출물과 sitemap을 함께 갱신한다.
  기존 Pages Git 게시 루트는 저장소 루트이므로 `_localized/` HTML을 함께 보관한다.
  사용자 배포 승인 전에는 main에 push하거나 Pages deploy를 실행하지 않는다.
- 후속 승인 후 배포 방법: 기존 `main` Git 통합으로 Worker·HTML·산출물·자산·문서를 함께 게시한다.
  설정 변경은 하지 않는다. 복구는 직전 성공 Pages deployment 또는 이번 변경만 revert한 전체 묶음이다.
  reset/force-push로 기존 조사나 다른 변경을 지우지 않는다.

`IMPLEMENTATION: COMPLETE` / `VALIDATION: PASS` /
`PRODUCTION_DEPLOY: NOT_EXECUTED` / `READY_FOR_DEPLOY: YES`.

아래 `Completed`/`Notes`와 2026-10-17 기록은 그 날짜의 이력으로 유지한다.

## Completed

- Site i18n now supports `ko`, `en`, and `ja` through `js/i18n.js`.
- Main page, feature page, app/download guide, FAQ, privacy policy, terms,
  contact/support, footer, navigation, buttons, and metadata are connected to
  i18n keys.
- Locale key parity was checked across Korean, English, and Japanese.
- Core terminology was documented in `docs/NOVERAFLOW_GLOSSARY.md`.
- Site i18n structure and language-addition steps were documented in
  `docs/SITE_I18N_STATUS.md`.

## Notes

- `philosophy.html` now functions as the public feature introduction page while
  keeping its existing URL.
- `/privacy` and `privacy.html` are both connected to the same privacy keys.
- Legal language still needs final review before public launch.
- The landing page now uses verified public Google Play and App Store links;
  see the 2026-10-17 operating record below for release status.

## Do Not Modify From This Site Task

- `noveraflow-app`
- `noveraflow-admin`
- AnalyticsSystem
- Fortune or unrelated project files

## 2026-10-17 — A/B landscape landing Production release

Purpose: upgrade the main landing page while retaining the static site,
Korean/English/Japanese localization, policy routes, FAQ and support features.
The user explicitly approved Production deployment and Git commit/push.

### Baseline and deployment route

- Working tree was clean before this task. Baseline `main` and remote HEAD:
  `c29a12c4ab41318e9913da3a9c7c76a45cffd5e1`.
- Existing hosting is **Cloudflare Pages**, project `noveraflow-site`, with
  automatic deployment from `moolsoft-stack/noveraflow-site` branch `main`.
  Static publishing root is the repository root; there is no PM2 execution
  path or application server for this site.
- Baseline successful Cloudflare deployment:
  `e29f8aa7-baa3-4440-9aae-ded75a88aaa3`.
- Public HTML matched baseline through the closing body; the only extra
  Production HTML was the existing Cloudflare analytics injection.
- Local predeployment HTML snapshot:
  `D:\Development\Personal\tmp\site-landing-20261017\production-before.html`.
  Browser evidence is in the same temporary directory, outside Git.
- Production URL: `https://noveraflow.com/`.
  Existing provider URL: `https://noveraflow-site.pages.dev/`.

### Changed files and official logo

- `index.html`: HTML SEO content, two inline SVG landscapes, downloads,
  actual app screen cards, Premium/backup introduction, and localized footer.
- `css/landing.css`: landing-only layout, responsive styles and animation.
- `js/landing-init.js`: early session choice and reduced-motion policy.
- `js/landing.js`: 3-language landing copy, localized images and motion control.
- `site.webmanifest`: official app icons and landing theme color.
- `assets/landing/`: versioned official-logo derivatives, social preview and
  12 optimized app marketing screens (four per locale).
- `README.md` and this existing operating record.

The current app's `pubspec.yaml` launcher configuration points to
`noveraflow-app/assets/branding/mark_01_icon_1024.png`. That file is the logo
source, superseding the old `noveraflow_icon_master.png` website record.
The app source remains unchanged. Web derivatives are
`assets/landing/icon-{32,192,512,1024}-v20261017.png` and
`assets/landing/official-mark-v20261017.webp` (background margin trimmed and
resized, no shape distortion). Both scenes use the identical official logo.
`assets/landing/og-v20261017.png` also uses this official icon.

Screens come from `noveraflow-app/assets/IOS_K_E_J_img/{k,e,j}{1_h,2_m,3_w,5_p}_ios.png`.
They are resized to 640px WebP at quality 78, about 42–71 KB per image, and
lazy-loaded below the hero. Marketing images retain their real app content.

### A/B selection, motion and maintenance

- First page load chooses A/B with equal probability and stores the choice in
  `sessionStorage['noveraflow.landing.scene']`. Refresh/navigation in the same
  tab session keeps it. An independent new tab session gets its own choice.
  Storage failure always selects A. JavaScript-disabled HTML retains static A.
- A: muted dusk, lake/city reflections, clouds, moonlight, flowers, foliage,
  coffee steam and a cat. B adds spring blossoms, summer foliage, autumn gold,
  snowy ridges and long flowing light paths connecting the landscape.
- CSS animates transform/opacity for clouds, moonlight, city lights, leaves,
  petals, steam, reflections, a small cat ear movement and near-layer depth.
  B uses SVG stroke-dashoffset for the two light trails. No 3D engine, video,
  canvas render loop or new third-party JavaScript dependency is used.
- Mobile reduces motion speed and removes petal/near-layer animation; scene
  framing adapts to keep coffee/cat visible. Reduced-motion, Save-Data,
  deviceMemory <= 4 GB or hardwareConcurrency <= 2 selects static scenery.
  A visible pause/resume button is available; OS/low-resource overrides win.
  Offscreen and hidden-page scenery pauses.
- To inspect both on an existing browser tab, change the sessionStorage key
  to `A` or `B` through developer tools and refresh. There is no public debug
  query flag or analytics experiment tracking.
- Animation definitions and breakpoints are in `css/landing.css`; translation
  strings and image locale changes are in `js/landing.js`.

### Store links and truthful availability

- Google Play: `https://play.google.com/store/apps/details?id=com.moolsoft.noveraflow`.
  Official public listing was reachable on 2026-10-17.
- App Store: `https://apps.apple.com/app/id6792970947`.
  Apple's public lookup for Korea and US returned app ID `6792970947`,
  **public version 1.0.61**. The user's new 1.0.80 (81) is under review.
  The download button therefore links to the available app, with a localized
  notice that update 1.0.80 is under review. It does not advertise 1.0.80 as live.
- When 1.0.80 becomes public, update only `landing.store.status` in all three
  locales and the default HTML copy, after checking Apple's official lookup.
  Premium copy says availability depends on the installed app version.
- The links are ordinary official-store links with noopener/noreferrer; no
  purchase, account, payment configuration or app distribution setting changed.

### Predeployment verification

- `npm run build`: passed (existing static/link/policy contracts).
- `node --test --test-isolation=none test/*.test.mjs`: 2 tests passed. The
  default isolated runner initially hit the sandbox's process spawn EPERM;
  the authorized rerun passed without changing test code.
- Syntax checks for both new JavaScript files and `git diff --check`: passed.
- Real Chrome checks: A/B x ko/en/ja x 320/390/1440px = 18 combinations;
  no horizontal overflow, one visible scene, localized copy/images and both
  official download links. Desktop/mobile screenshots were visually reviewed.
- Session selection exercised both random branches and kept the first choice
  on refresh. Motion pause works. Reduced-motion and simulated two-core mode
  both had **zero running animations**.
- `/privacy`, `/terms`, `/account-deletion`, `/faq.html`, `/about.html`,
  `/contact.html`, `/philosophy.html`: HTTP 200 locally; optimized screenshots
  decoded successfully. Existing FAQ tests and policy translation checks pass.

### Rollback

Use the existing Cloudflare Pages project to roll Production back to deployment
`e29f8aa7-baa3-4440-9aae-ded75a88aaa3` (source `c29a12c`). Alternatively, revert
the landing release commit in Git and push the revert to `main` so the normal
Pages integration publishes the prior site. Preserve later unrelated work and
do not reset or force-push `main`. After rollback, verify the homepage and
`/privacy`, `/terms`, `/account-deletion`, `/faq.html` on the public domain.
Neither method touches nginx, PM2, databases, authentication or payment servers.

### Production result — 2026-10-17 19:52 KST

- Landing release source: `cb58deff7916937c39a85d4abe61ee6c93e54f8f`.
  `git push origin main` completed successfully.
- Cloudflare Pages deployment
  `b8edb256-815f-476b-9c2e-cf0e0568c3b0` completed with **success**.
  Execution/publishing path remains Pages project `noveraflow-site`, repository
  root, branch `main`; the dedicated host is not involved.
- `https://noveraflow.com/` serves the new landing. Real Chrome checks on that
  domain passed all 18 A/B/language/viewport combinations, refresh persistence,
  pause, reduced motion (0 running animations), two-core static mode (0),
  screenshot decoding, official store URLs, and all seven existing policy/help
  routes (HTTP 200). Desktop and mobile Production screenshots were reviewed.
- New CSS/JavaScript, official logo, OG asset and webmanifest all returned 200.
  No broken visible images or untranslated keys remained; webfonts loaded.
- JavaScript-disabled check: A, static, HTML heading and both store links stay
  available. The storage-error fallback is explicitly A even when a browser
  allows reads but denies sessionStorage writes.
- No blocking issue found; rollback was unnecessary. Future maintenance is
  limited to changing the iOS review-status copy when 1.0.80 is publicly live,
  or the user's subsequent visual feedback.
- A follow-up commit records these Production results and the storage-error
  fallback. Its Pages build uses the same publishing path; the implementation
  revision above identifies the complete visual release.

## 2026-10-17 — Scheduled landscapes, shared branding and subtle depth

Purpose: extend the accepted landing design to the existing public pages,
replace random selection with a shared KST schedule, and add restrained depth.
Production deployment and Git commit/push are explicitly authorized.

### Baseline and changed files

- Clean starting tree: `d058d1974e7d3b120890732891b35dcfb2fdeba3`.
- Recovery deployment: Cloudflare Pages `621fe855-875d-460e-9131-f71d05b4b25e`.
- Hosting remains project `noveraflow-site`, Git `main`, repository-root static
  publishing. Local checkout: `D:\Development\Personal\noveraflow-site`.
- Modified: `index.html`, `about.html`, `philosophy.html`, `faq.html`,
  `contact.html`, `privacy.html`, `privacy/index.html`, `terms.html`,
  `account-deletion/index.html`, `css/landing.css`, `js/landing-init.js`,
  `js/landing.js`, and this document.
- Added: `css/brand.css` and `test/landing-schedule.test.mjs`. No new dependency.
- All eight interior-page main bodies are unchanged, including privacy,
  terms and account deletion. Their canonical/hreflang/schema, shared i18n,
  sitemap, robots and FAQ logic are unchanged from the recovery revision.

### Selection rules and maintenance

- A = Design 1 (emotional landscape); B = Design 2 (flowing light).
- Slot = `floor((Date.now() + 9 hours) / 8 hours)`. Even slots use A; odd
  slots use B. Anchor: 1970-01-01 00:00 Asia/Seoul is A. Boundaries are
  00:00, 08:00, 16:00 KST; parity continues across midnight rather than
  resetting daily. For example, 2026-10-17 uses B/A/B and 10-18 uses A/B/A.
- The head script sets the scene before paint. A boundary timer and
  pageshow/focus/visibility resynchronization handle an open or suspended tab.
  Transition duration is 1.2 seconds; reduced/static mode switches directly.
- Manual buttons at the bottom of the Hero store `{slot, scene}` in
  `sessionStorage['noveraflow.landing.override']`. The choice survives reload
  and a visit to another page, but expires at the next slot. There is no
  random-selection path; the previous `noveraflow.landing.scene` key is removed.
- The same epoch time produces the same default regardless of browser timezone.
  This static site uses the visitor's device clock; a materially incorrect
  device clock can select the wrong slot. No time service or backend was added.
- Storage denial falls back to automatic scheduling, with manual choice held
  only in the current document. JavaScript disabled: static A and HTML content.

### Visual changes and limits

- Existing artwork is separate SVG geometry, not a flattened raster Hero.
  Original cloud/moon/city/water/foliage/petal/steam/cat/trail keyframes and
  durations are retained. New outer groups isolate transforms from those
  original animations: far landscape, water, shore, branches and foreground.
- Fine-pointer desktop movement is at most +/-1.5 SVG units for the far layer
  and +/-10 for branches. Differential scroll offsets are 22/14/10/3/4 units.
  Updates use one requested animation frame per input burst, not a running loop.
- B's original light paths are clipped into rear/front portions and drawn on
  different depth planes around the shore/branches, before the cup/cat plane.
- Existing app screenshot cards receive shadows and a 3px slow vertical float.
  Screens are not warped, rotated or enlarged on hover. Hero copy and download
  buttons stay fixed during pointer movement; store hover changes contrast/glow.
- Mobile has no mouse parallax; foreground depth adds a slow 2px translation.
  Reduced motion, data saver and existing low-resource detection disable depth
  and animations. The result is subtle 2.5D layering, not a 3D reconstruction.
- Header/footer marks on all nine HTML documents use the existing web asset
  `assets/landing/official-mark-v20261017.webp`, derived from official app source
  `noveraflow-app/assets/branding/mark_01_icon_1024.png`. App assets are untouched.
  Favicons/social images use the existing `assets/landing/*-v20261017` assets.
- Shared interior styles are in `css/brand.css`: warm neutral surfaces, readable
  cards, gentle borders, responsive navigation and a common footer.
- Store URLs are unchanged: Google Play `com.moolsoft.noveraflow` and Apple
  app ID `6792970947`. Existing localized 1.0.80 review-pending notice remains.

### Predeployment verification

- Static build passed; 5 tests passed (existing policy/FAQ contracts plus
  KST boundary, midnight continuity, persistence/expiry and denied storage).
- Source comparison confirmed interior text, SEO, policies and existing scenic
  keyframes unchanged. Syntax and whitespace checks passed.
- Real Chrome: 18 home cases (A/B x ko/en/ja x 1440/390/320px) and 48 interior
  cases (8 routes x ko/en/ja x 1440/320px). No horizontal overflow or missing
  logos; localized controls and unchanged official download URLs passed.
- Refresh and About-page round trip retain manual selection. Browser clock
  simulation crossed 16:00 KST while open: timer switched to auto/B and completed
  the fade without navigation. Midnight/resumed-tab expiry also passed.
- Real mouse input changed near and far transform matrices independently;
  text/button rectangles stayed identical. Scroll produced different layer
  offsets. Desktop and mobile screenshots were visually reviewed.
- Mobile pointer input had zero pointer offsets. Reduced motion and simulated
  two-core mode had 0 running animations. JavaScript-disabled fallback passed.
- Browser sizes are Chrome device emulation, not physical iPhone/Safari tests.
  Evidence lives outside Git under `tmp/site-landing-20261017/refine-*`.

### Recovery

If public verification fails, roll Cloudflare Pages back to successful baseline
deployment `621fe855-875d-460e-9131-f71d05b4b25e` (source `d058d19`). Alternatively,
revert this release's commits, then push `main` through the same Pages integration.
Preserve unrelated subsequent changes; never reset/force-push shared history.
Verify homepage, A/B, language switching, official store links, `/privacy`,
`/terms`, `/account-deletion`, `/faq.html` after rollback. No database, payment,
authentication, nginx, PM2 or app distribution change is involved.

### Production release

- Implementation revision: `ee9d372c58179b90026eb19e290a35c9e2887d25`.
  Push to `origin/main` succeeded through the existing Git integration.
- Cloudflare Pages deployment `d9e52962-10f6-4afc-a839-5471a261b244`:
  **completed / success**. Public URL: `https://noveraflow.com/`.
- Public main page passed all 18 A/B, locale and viewport combinations.
  Production desktop/mobile screenshots were visually reviewed.
- New CSS/JavaScript, sitemap, robots and webmanifest returned HTTP 200 and
  matched the checked-in sources (normalizing Windows line endings).
- Public interior-page verification passed all 48 route/locale/viewport cases.
  Cloudflare's existing `.html` to extensionless canonical redirects remain.
- On the public domain, manual selection survived refresh and an About-page
  round trip; midnight resume returned to automatic selection. An open-page
  timer crossed the simulated 16:00 KST boundary and completed the B fade.
- Production pointer/scroll checks confirmed independent depth transforms
  with stationary text/buttons. Mobile pointer offsets remained zero; language
  buttons localized the selector. Reduced/two-core modes had 0 animations,
  and the JavaScript-disabled static fallback passed.
- No blocking regression found; no rollback required. The follow-up commit
  only records these verified results. Its normal Pages deployment publishes
  identical application assets; `ee9d372` identifies the visual implementation.
- Verification limits: mobile viewport emulation in Chrome, not a physical
  iPhone/Safari session; schedule boundaries simulated without waiting 8 hours.
  No further implementation or user action is required for this release.

## 2026-10-17 — Sunrise / sunset light grading and numeric selector

Purpose: refine the accepted scenery through light and color, and replace the
internal "Design 1/2" labels with a quiet numeric control. Production deployment
and Git push are authorized. The working tree was clean at `fc62c55` (visual
implementation `ee9d372`). Verified recovery deployment:
`1281b2d5-d31f-4fe7-9622-dc38f71203b0`, Cloudflare Pages **success**.

### Minimal changes

- Files: `index.html`, `css/landing.css`, `js/landing.js`, this operating record.
- 1 / A = **Sunrise**: retained the dark pre-dawn foundation, with warm light
  arriving from the right horizon, softened stars/moon, a thin haze and warm
  water reflection. Added only gradient ellipses inside existing depth groups.
  The new light opacity varies slowly over 40/46 seconds; mobile retains the
  existing 60-second override. This is a quiet dawn impression, not a literal
  solar-position simulation.
- 2 / B = **Sunset**: deeper blue/violet sky and lake, cool soft moon halo,
  gently emphasized stars and lower-saturation seasonal glow/light trails.
  The intended mood is the calm transition from evening into night.
- Existing paths, keyframes, animation durations, 2.5D transforms and fixed
  text/button positions are preserved. No library, raster asset or app change.
- Selector: two circular **44 x 44px** buttons with visible text **1 / 2** only.
  Selection uses a subdued fill/border. Desktop hover and keyboard focus show
  the localized accessible name: 일출/일몰, Sunrise/Sunset, 日の出/日没.
  Touch users have accessible labels without permanently displayed descriptions.
- `js/landing-init.js` is unchanged: KST 00/08/16 boundaries, continuous parity
  across days, pre-paint selection, open-page transition and resume sync remain.
  Manual session choice expires at the next slot, as documented above. Names
  describe the visual concepts; they do not change the alternating schedule.
- All eight interior HTML documents, common branding CSS, official logo assets,
  shared translations, policy/terms text, sitemap and SEO schema are unchanged.
  Download anchors and the public-version/1.0.80-review notice are unchanged.

### Local verification

- `npm run build`, 5 existing tests, syntax and whitespace checks passed.
- Source comparison against `fc62c55` confirmed the preserved elements above.
- Real Chrome: 18 main cases (A/B x ko/en/ja x 1440/390/320px), 48 interior
  cases (8 routes x ko/en/ja x 1440/320px) passed; no overflow or missing logos.
- Checked numeric text, localized accessible names, circular 44px hit areas,
  hover tooltip, selected state, reload and page-navigation persistence.
- Simulated KST boundaries: open-page timer changes scene, finishes its fade
  and expires the manual override; midnight/resumed-tab behavior also passed.
- Pointer/scroll depth remains independent across layers while reading UI stays
  fixed. Reduced-motion and two-core fallback: 0 running animations. Mobile
  pointer offsets: 0. JavaScript-disabled static A and download links passed.
- Desktop/mobile screenshots reviewed for warm dawn vs cool evening, restrained
  controls and readable copy. Mobile checks use Chrome viewport/touch emulation,
  not physical iPhone/Safari. Time boundaries were simulated, not waited 8 hours.
- Temporary browser evidence: `tmp/site-landing-20261017/sunlight-*`, outside Git.

### Deployment and recovery

Use the unchanged Cloudflare Pages `noveraflow-site` Git integration (`main`,
repository-root publishing), local checkout `D:\Development\Personal\noveraflow-site`.
If this refinement regresses, roll Pages back to deployment
`1281b2d5-d31f-4fe7-9622-dc38f71203b0` / source `fc62c55`, or revert this release's
commits and push `main`. Do not reset/force-push. Verify the homepage, selector,
language buttons, download links and policy routes after recovery. No database,
payment, authentication, server configuration or app distribution change.

### Production result

- Implementation revision: `438731ddd53e77c37f014d9c3cb277dd9cfc7c76`.
  Push to `origin/main` succeeded.
- Cloudflare Pages deployment `6b613831-a2cf-4abe-b93c-af46c2326e6b` completed
  with **success**. `https://noveraflow.com/` serves the new light grading and
  numeric controls; desktop/mobile Production screenshots were reviewed.
- All 18 Production main-page A/B/locale/viewport cases passed, including
  numeric-only text, 44px circular controls, localized names and store links.
- Public CSS/JavaScript, sitemap, robots and webmanifest returned HTTP 200 and
  matched the local sources after normalizing line endings.
- All 48 Production interior route/locale/viewport cases passed. Official
  header/footer logos and unchanged policy/help pages remain intact.
- Production manual selection survived reload and an About-page round trip.
  Desktop hover showed the localized name while button text stayed numeric.
  Simulated midnight resume expired the manual override; the open-page timer
  crossed 16:00 KST and completed automatic selection and the fade.
- Production mouse/scroll depth, fixed reading UI, mobile pointer exclusion,
  language switching, reduced-motion/two-core static mode and no-JS fallback
  all passed. Zero running animations in both reduced/static scenarios.
- No blocking issue or required follow-up was found; rollback was unnecessary.
  The follow-up documentation commit records these results without modifying
  application assets. Browser/device and clock-simulation limits are noted above.

## 2026-10-17 — Mobile Hero content clipping protection

User report: the top of the main title was clipped on a real phone, seemingly
while the background moved. Preserve the accepted sunrise/sunset artwork,
animations, desktop depth, selector, download links and public-page content.

### Baseline, findings and scope

- Clean starting revision: `3fa30b5`; implementation `438731d`.
  Verified successful recovery deployment:
  `72d107b4-ee38-45f5-962a-f19eb0d5eec6` (Cloudflare Pages `noveraflow-site`).
- The title/editorial already had no transform or animation; JavaScript depth
  variables are assigned only to `.land-scene`. Background motion affecting
  the title's layout was **not** reproduced in the test engines.
- Confirmed risks: mobile Hero had a fixed `96svh` height, 790px minimum,
  950px maximum and `overflow:hidden`; the shared `main` overflow-x rule also
  computed to `overflow-y:auto`. Background/overlay used negative z-indices.
  There was no explicit safe-area allowance or flow space for bottom controls.
- With 200% browser text adjustment in Chrome, the baseline Hero stayed 790px
  tall while the content outgrew it. After the fix it grows to fit (1399.625px
  in the recorded 375px-wide probe), rather than clipping the content.
- The user's exact intermittent upper-title clipping was not reproduced on
  Windows WebKit/Chrome at normal text size. A screenshot/browser detail was
  requested. Do not describe this as a confirmed Safari engine defect or claim
  physical-device verification; the change removes the identified clipping
  and compositing risks with targeted regression coverage.

### Minimal fix

- Files: `css/landing.css`, `index.html` (CSS cache version only), this record.
- Only at widths <=640px: use a content-sized column Hero, preserving the
  normal 790–950px minimum-height appearance; remove its height ceiling and
  content clipping. Keep `overflow:hidden` on the decorative scene itself.
- Remove the landing main's implicit scroll/clip container. Put the scene,
  shade and content at explicit z-indices 0/1/2; scene ignores pointer events.
  Editorial/control wrappers have no transform or animation.
- Use normal-flow bottom controls with at least 48px separation from copy.
  Add safe-area padding to the Hero/header and a small title line-box allowance
  (`line-height:1.45`, `.08em` block padding). Honor the existing viewport's
  safe-area behavior without changing viewport-fit or disabling text zoom.
- Existing SVG geometry, scenic keyframes, motion speeds, mobile background
  parallax, desktop CSS, JavaScript, logo assets, store links and all other
  pages are unchanged. The 8-hour schedule and session selection are unchanged.
- Safe-area reference: [WebKit's official guidance](https://webkit.org/blog/7929/designing-websites-for-iphone-x/).

### Local verification and limits

- Static build, five existing policy/FAQ/schedule tests and whitespace check pass.
- Temporary tooling outside Git: `tmp/mobile-hero-check/` (Playwright, Windows
  WebKit 27.2 and installed Chrome). No site runtime dependency was added.
- 36 scene/language/profile combinations passed: A/B x ko/en/ja, with WebKit
  at 375x812 (iPhone 12 mini), 390x844 and 320x568; Chrome at 375x812,
  393x851 (Android profile) and 360x640.
- For every case: seek multiple background animation phases, scroll 100px,
  shrink/restore viewport height, return to top, check glyph bounds and actual
  hit testing for background occlusion, and check content/control separation.
  Heading document position stays stable throughout these changes.
- Enlarged text expands the Hero safely. Emulated +47px top / +34px bottom
  safe-area values are honored and reset correctly. Reduced-motion and
  two-core mode have zero ongoing animations after initial UI transitions.
- Both engines: tap selector, reload and About-page round trip retain choice;
  simulated 16:00 KST timer expires it and completes the automatic fade.
  Desktop mouse parallax remains active with stationary editorial bounds.
- Address-bar expansion/collapse is represented by viewport-height changes;
  Windows WebKit is not Mobile Safari's native browser chrome. Physical iPhone
  Safari/Android Chrome confirmation of the reported symptom remains a limit.

### Deployment and recovery

Use the existing `main` Git integration, repository-root publishing in Pages
project `noveraflow-site`; local checkout `D:\Development\Personal\noveraflow-site`.
Recovery: roll Pages back to `72d107b4-ee38-45f5-962a-f19eb0d5eec6` / `3fa30b5`,
or revert the mobile-fix commits and push `main`. Preserve unrelated work;
no reset/force-push. Recheck the Hero, store links, languages and selector.
No operating data, payment/auth service, app source or server configuration
is changed by this release.

### Production verification

- Fix revision: `82cdd3b825ac365ea2fa2ce07b962f43160e9d80`; pushed to `origin/main`.
- Cloudflare Pages deployment `09d19531-f73d-496a-84af-bcac4413d783` completed
  with **success**. `https://noveraflow.com/` returns HTTP 200 and references
  `landing.css?v=20261017d`.
- Repeated the targeted 36-case mobile matrix on the actual public domain in
  WebKit and Chrome: all passed. No heading glyph clipping or background
  occlusion was detected at sampled animation phases, scroll positions and
  changing viewport heights. Production screenshots were visually reviewed.
- Production safe-area emulation, enlarged text, low-resource/reduced motion,
  session selection, the open-page KST boundary and desktop parallax passed.
- No regression requiring rollback found. This follow-up record changes no
  application assets. Physical Mobile Safari's original intermittent symptom
  remains unconfirmed without the user's device/screenshot; do not equate the
  Windows WebKit verification with a real iPhone Safari test.

## 2026-10-17 — Recurrent iPhone Hero clipping investigation (OPEN)

The user reports that the title is initially intact after refresh and later
clips again on an actual iPhone. The preceding mobile layout release must
**not** be treated as a verified fix for that intermittent device symptom.
This follow-up requires a reproducible cause before another code change.

### Baseline and source trace

- Production baseline: `ec959c9`; Pages deployment
  `24a33bfb-3f71-4129-ad30-ac0d7c72cbf1`; implementation `82cdd3b`.
- Public `landing.css?v=20261017d`, `landing.js?v=20261017c` and
  `landing-init.js?v=20261017b` return HTTP 200 and match the checked-out
  files after line-ending normalization. This does not inspect the cache
  on the reporting iPhone.
- At <=640px, the title, editorial wrapper, Hero and main have no transform
  or animation and use visible overflow. Hero height is content-driven with
  a `clamp(790px,96svh,950px)` minimum. No JavaScript writes content height.
- `renderDepth()` writes pointer/scroll variables only on `.land-scene`.
  Mobile pointer depth is zero; mobile scroll depth still updates the SVG
  wrappers. It does not directly transform the title or its ancestors.
- Scene/shade/content use z-indices 0/1/2. Root/body retain computed
  `overflow: hidden auto`; separate ancestor scrolling was investigated,
  not assumed to be the cause. No `visualViewport` handler currently moves
  content. The scene IntersectionObserver only pauses decorative animation.

### New reproduction evidence and its limits

- Temporary read-only browser harness outside the repository:
  `D:\Development\Personal\tmp\mobile-hero-check\recurrence.mjs`.
  Event traces/screenshots use the `recurrence-` prefix in that directory.
  No diagnostic endpoint, telemetry or dependency was added to Production.
- Windows WebKit 27.2 and installed Chrome, mobile emulation at 375x812
  (iPhone 12 mini profile), on the public site: 12 engine/locale/scene cases
  (ko/en/ja x A/B); repeated scroll positions 0/80/170/210/400/1100 and height
  cycles 812/620/640. Collected window and visualViewport events, glyph
  bounds, ancestor scroll positions, overflow, transform and stacking state.
- Title document Y stayed at 172.46875px. Attempts to scroll body/main/Hero/
  editorial separately did not produce an independent scroll offset.
- Additionally let animations run for a real 120 seconds per engine (no
  animation seeking), returning from scrollY=1200 to the top every 30 seconds.
  The title position stayed stable and both final screenshots showed intact
  text. This elapsed-time phase used ja/B; other cases had the shorter
  repeated-scroll/resize sequence. No internal clipping was reproduced.
- At scrollY=210 the title crosses the top of the viewport normally; this
  is distinct from clipping inside a Hero while the title is in view.
  This observation does **not** classify the user's symptom as normal.
- Native iPhone Safari toolbar collapse, rubber-band scrolling and GPU
  compositing are not reproduced by Windows WebKit viewport resizing.
  `visualViewport.offsetTop` remained zero in these simulated cycles.
  Physical Safari remote debugging is not connected in this environment.
  **Direct cause unconfirmed; no verified recurrence fix yet.**

### Required device evidence and next action

- Ask for a screenshot/short recording before refreshing, iPhone/iOS version,
  and whether the title remains clipped after returning fully to the top.
- If a Mac is available, enable Safari Web Inspector on the iPhone, connect
  it to the Mac, and select its NoveraFlow tab from Safari's Develop menu.
  See [WebKit remote inspection instructions](https://webkit.org/web-inspector/enabling-web-inspector/).
- At the failing state, compare heading `getBoundingClientRect().top`,
  `scrollY`, their sum, `visualViewport.offsetTop/pageTop/height/scale`, and
  the ancestor overflow/transform/scrollTop values with the refreshed state.
  Capture pixels too: DOM bounds and hit testing alone cannot rule out a
  compositor paint defect, particularly with pointer-events:none scenery.
- Only after a failure is captured, isolate the mobile scroll transform or
  offending clipping/compositing layer in the inspector and demonstrate
  recovery without refresh. Apply that smallest proven change; retain the
  existing scenic keyframes and desktop depth. Repeat the actual failing
  device sequence before calling the issue resolved.

### Changes, deployment and recovery

- Repository change for this investigation: this document only. No further
  padding, transform or viewport workaround has been applied without evidence.
- No corrective Production deployment yet; baseline remains `ec959c9`.
  Save the investigation with a `[CF-Pages-Skip]` documentation-only commit
  so recording an open issue does not masquerade as a new fix release.
  [Cloudflare documents this deployment-skip prefix](https://developers.cloudflare.com/pages/configuration/git-integration/github-integration/#skipping-a-build-via-a-commit-message).
- For a later verified patch, use the existing `main` Pages integration.
  Recovery point: deployment `24a33bfb-3f71-4129-ad30-ac0d7c72cbf1` /
  `ec959c9`, or revert only the future patch and push; no reset/force-push.
  A rollback to this baseline restores the current site, not a proven cure
  for the reported iPhone defect. Site behavior and operating data unchanged.

## 2026-10-17 — Mobile Safari recurrent Hero clipping correction

Purpose: remove the mobile-only compositor trigger identified after the earlier
height/safe-area change did not stop the intermittent iPhone symptom. This is a
targeted follow-up to the open investigation above; no spacing, typography,
scenery, content, store link, schedule or non-landing page was changed.

### Direct cause and reproduction

- `js/landing.js` registered both `scroll` and `resize` handlers for
  `renderDepth()` at every viewport width. Although pointer depth was disabled
  on mobile, `--scroll-depth` was still recalculated there.
- Each mobile scroll/address-bar viewport cycle therefore transformed all
  `.depth-layer` SVG groups and transitioned the large scene compositor layers.
  The title box itself remained fixed, so the recurring visual cut was a scene
  recomposition/paint-order condition rather than title geometry or insufficient
  safe-area spacing. Refresh reset the transformed scene to scroll depth zero,
  matching the reported temporary recovery.
- Reproduced against the pre-fix Production page in a WebKit iPhone 12 mini
  profile: at scrollY=200, `--scroll-depth` changed from `0.000` to `0.253` and
  `.depth-far` changed from the identity matrix to Y=5.566px while title document
  Y stayed 172.46875px. The patched local page kept both the variable and matrix
  at zero under the identical sequence, with the same title document Y.

### Minimal change

- `js/landing.js`: mobile now always sets scene `--scroll-depth` to zero. A
  media-query change queues one depth refresh so crossing 640px cannot retain a
  stale desktop transform. Desktop pointer and scroll depth remain unchanged.
- `index.html`: advance only the landing JavaScript cache key to
  `landing.js?v=20261017d`.
- The SVG scene, individual cloud/moon/city/water/foliage/petal/steam/cat/light
  animations, the light grading, mobile automatic foreground movement, scene
  selector, 8-hour KST schedule, content and buttons remain unchanged.

### Verification before deployment

- Static site verification, five existing tests and `git diff --check` pass.
- Existing browser matrix passes all 36 cases: WebKit and Chrome; A/B scenes;
  ko/en/ja; iPhone 12 mini 375x812, iPhone 390x844, WebKit 320x568, Chrome
  375x812, Android 393x851 and Chrome 360x640.
- The matrix covers animation phases, scroll, viewport shrink/restore, enlarged
  text, selector/session persistence, the live 16:00 KST boundary, reduced
  motion and low-resource behavior. Desktop pointer depth still changes with
  pointer position while editorial bounds remain fixed.
- Native iPhone Safari cannot be remotely inspected from this Windows host
  because the recorded Mac mini SSH paths are unreachable. This release removes
  the directly reproduced mobile transform trigger; per the user's rule, final
  physical-device confirmation is still required before calling the visual
  symptom completely resolved.

### Deployment and recovery

- Production delivery uses the existing Cloudflare Pages Git integration from
  `main`; repository root is the publish directory.
- Recovery baseline before this correction: deployment
  `24a33bfb-3f71-4129-ad30-ac0d7c72cbf1`, site implementation `82cdd3b`, and
  recorded repository revision `ec959c9`. Revert only this correction commit
  and push `main`, or roll Pages back to that deployment; no reset/force-push.
- Production revision, Pages deployment ID and public-domain verification are
  recorded below after the deployment completes.

### Production result

- Correction revision: `cfd420c6e0151fa95fdc39105808cb9511250487`;
  pushed to `origin/main`.
- Cloudflare Pages deployment `cd5395c9-53ff-4c36-bf97-fa861ec43412`
  completed with `success`.
- `https://noveraflow.com/` returns HTTP 200 and references
  `landing.js?v=20261017d`; the public script contains the mobile guard.
- The complete 36-case WebKit/Chrome mobile matrix passed again on the public
  domain, including ko/en/ja and both scenes. Scene/session switching, the KST
  boundary, reduced motion and desktop depth also passed.
- On public Production at mobile scrollY=200, `--scroll-depth` is `0`, the far
  depth wrapper remains the identity matrix, title document Y is 172.46875px,
  and 19 independent scenic animations are still running. The corrective path
  is therefore live without removing the intended mobile atmosphere.
- No Production rollback was required. Physical iPhone Safari confirmation is
  the remaining acceptance check; until that check, describe the deployed
  trigger correction as verified in Production browser emulation rather than a
  fully confirmed physical-device resolution.

## 2026-10-17 — Mobile Safari Hero structural isolation follow-up

Purpose: prioritize stable iPhone title rendering after the physical device
reproduced the clipping again on Production revision `cfd420c`. This entry
supersedes the preceding claim that the JavaScript scroll-depth update alone
was the direct cause. That update removed one compositor trigger but did not
remove the remaining CSS clipping and SVG composition paths.

### Rendering-path findings and uncertainty

- Mobile DOM order is scene, editorial content, then bottom controls inside one
  Hero. The scene is absolute; editorial content and bottom controls are normal
  flow at <=640px. The site header is absolute. There are no fixed or sticky
  elements inside the Hero, and the landing page disables the global fixed body
  atmosphere pseudo-element.
- The title/editorial nodes have no transform, filter, perspective, animation,
  clip-path or clipping overflow. Their document coordinates stayed stable in
  automated traces. The previous height/safe-area fix therefore addressed the
  wrong failure class.
- Global `overflow-x:hidden` on both `html` and `body` computed as
  `overflow: hidden auto`, making the Safari viewport/root ancestors clipping
  scroll containers. Previous work changed only Hero/main overflow and left
  these two ancestors intact.
- After `cfd420c`, JavaScript mobile scroll depth was zero, but CSS still gave
  every SVG depth group a transform transition; the near groups still used the
  mobile depth animation; and both full SVG scenes remained opacity/visibility
  transition layers. These large composited layers shared the Hero stacking
  context with the content.
- The physical iPhone recurrence proves the earlier single-trigger conclusion
  was incomplete. Without a reachable Mac/iPhone Web Inspector session, it is
  still not possible to attribute the device paint failure to one specific
  WebKit internal layer. The confirmed site-side risk is the combination of
  root clipping scroll containers and residual full-scene composition layers.
  This release removes both rather than claiming an unobserved browser-internal
  mechanism as fact.

### Minimal mobile-only structural correction

- `css/landing.css`: landing `html` and `body` use `overflow-x:clip` and
  `overflow-y:visible` on mobile, retaining horizontal protection without
  creating vertical scroll containers.
- Hero/content/controls explicitly use the normal document flow without
  transform, filter, perspective, will-change, contain or clip-path. The Hero
  no longer creates the additional mobile isolation layer.
- The absolute scenic wrapper is paint-contained below the shade and content.
  Full SVG scenes have no transform/filter/perspective/will-change/transition.
  Only the active scene is displayed; mobile scene selection is an immediate
  stable swap instead of a full-SVG opacity crossfade.
- All mobile `.depth-layer` wrappers are static: no transform, individual
  translate, transition or wrapper animation. JavaScript mobile scroll depth
  remains zero. Desktop depth and crossfade rules are unchanged.
- Safe individual SVG descendant animations remain: clouds, moonlight, city
  lights, water, foliage, steam, cat and light trails. Existing mobile rules
  still suppress petals and near-layer motion and lengthen the remaining
  animation durations. Content, links, 8-hour scheduling and manual selection
  are unchanged.
- `index.html`: advance only the landing CSS cache key to
  `landing.css?v=20261017e` so Safari cannot reuse the previous CSS asset URL.

### Verification before deployment

- Static verification, five existing tests and `git diff --check` pass.
- Existing browser matrix passes all 36 WebKit/Chrome mobile cases: ko/en/ja,
  A/B, iPhone 12 mini 375x812, iPhone 390x844, narrow 320x568, Android 393x851
  and Chrome 360x640. Selector/session behavior, KST boundary, reduced motion,
  low-resource behavior and desktop mouse depth pass.
- A separate concurrent WebKit run kept all six ko/en/ja x A/B pages open for
  over two minutes, applying scrollY=220 and viewport 812/620 changes every 30
  seconds. Every title document Y remained 172.46875px; root/body computed to
  `clip/visible`; inactive SVG was `display:none`; depth transforms stayed
  `none`; and 13 (A) or 17 (B) scenic descendant animations remained running.
- Windows WebKit viewport resizing is not native Safari browser chrome. Actual
  iPhone validation remains the final acceptance check and must not be replaced
  by these automated results.

### Deployment and recovery

- Production baseline for this correction: code revision `cfd420c`, Pages
  deployment `cd5395c9-53ff-4c36-bf97-fa861ec43412`; repository record before
  work `5acf57f`.
- Deploy with the existing `main` Cloudflare Pages integration after local
  verification. If needed, roll back to the baseline deployment or revert only
  this correction commit and push; never reset or force-push.
- Production revision, deployment ID and public asset/browser verification are
  appended after completion.

### Production result

- Structural correction revision:
  `5d6510409ba73a2495a5195282dcdb2b3a64bd64`; pushed to `origin/main`.
- Cloudflare Pages deployment `a870de3e-dd06-4335-9368-fccf5894bcb5`
  completed successfully.
- `https://noveraflow.com/` returns HTTP 200 and references only
  `landing.css?v=20261017e` (the preceding `v=20261017d` reference is absent).
- The 36-case WebKit/Chrome matrix passed on the public domain. The concurrent
  two-minute Production WebKit run also passed all ko/en/ja x A/B pages after
  four scroll and viewport-height cycles. Title Y remained 172.46875px;
  root/body were `clip/visible`; inactive full scenes remained `display:none`;
  depth wrappers remained untransformed; and 13/17 scenic animations ran.
- Mac mini access was retried at the currently observed local candidate and the
  preserved external address; SSH timed out at both. No native iPhone Safari
  remote-inspector evidence was available. The user must perform the short
  physical-device acceptance sequence below before this is declared completely
  resolved: open/reload once, repeat scroll down/back to top while the address
  bar hides/shows, leave the page open over two minutes, and check both scenes.
- No regression or condition requiring rollback was observed in Production.
  Recovery remains the `cfd420c` deployment above or a revert of `5d65104`.

### Completion-check evidence: languages, viewport classes and warm cache

- The existing iPhone 12 mini WebKit evidence was retained without rerunning it:
  375x812, ko/en/ja x A/B, two minutes, four repeated scroll cycles and
  812->620->812 viewport-height changes. The title document Y remained
  172.46875px in every sample and the mobile content transform remained `none`.
- A targeted Production WebKit run added the current large-iPhone viewport
  class at 440x956. All ko/en/ja x A/B cases stayed open for 120 seconds and
  completed four cycles of scrollY=220 plus 956->700->956 height changes.
  Every case passed with 0px title document-position drift, `overflow:visible`
  on the Hero, and no title transform. At the top, ko/en titles occupied
  Y=172.46875..297.875px and the taller ja title occupied
  Y=172.46875..357.3125px, fully inside the 956px viewport.
- Before each large-viewport reload, the browser fetched the preceding asset
  URLs `landing.css?v=20261017d` and `landing.js?v=20261017c` with a cacheable
  request. After reload in the same browser context, the live document and
  resource trace selected `landing.css?v=20261017e` and
  `landing.js?v=20261017d`; neither preceding URL was selected as the page's
  stylesheet or script. This covers a returning browser with earlier assets in
  cache, in addition to the fresh-load checks already recorded above.
- These runs cover the requested language, scene, repeated-scroll, elapsed-time,
  viewport-height-change and warm-cache conditions in Production emulation.
  They do not constitute physical iPhone Safari evidence. Complete resolution
  remains pending the device sequence below.

### Minimum physical-iPhone acceptance sequence

1. On a physical iPhone 12 mini (375x812 class), use an existing non-private
   Safari tab that has visited the site before. Open Production without first
   clearing website data; this preserves the warm-cache condition.
2. Check Korean, English and Japanese. For each language, select scene 1 and
   scene 2 and confirm the full title, description and download buttons are
   visible at the top.
3. In every language/scene combination, scroll down and back to the top at
   least four times so Safari's address bar hides and reappears. Rotate
   portrait->landscape->portrait once to force a viewport-size change, then
   leave the page open for at least two minutes and repeat the scroll.
4. Repeat steps 1-3 on the newest/larger iPhone available (440x956 class). If a
   second physical device is unavailable, record that limitation explicitly;
   responsive simulation is supporting evidence and does not replace this
   physical-device check.
5. Reload the existing tab and repeat one scroll cycle. When Web Inspector is
   available, confirm the loaded asset URLs are
   `landing.css?v=20261017e` and `landing.js?v=20261017d`. Also open one private
   tab for a fresh-cache comparison. A pass requires the title to remain whole
   after warm-cache reload, fresh-cache load, resizing, repeated scrolling and
   the two-minute wait in all three languages and both scenes.

## 2026-10-17 — Android Chrome Hero scene-resume correction

The reporting device was corrected to Android Chrome; no matching iPhone
Safari failure has been reported. This entry replaces the device assumption in
the preceding investigation without reverting the useful mobile layout and
scene-isolation safeguards.

### Reproduction and cause boundary

- Production baseline: revision `5d6510409ba73a2495a5195282dcdb2b3a64bd64`,
  Pages deployment `a870de3e-dd06-4335-9368-fccf5894bcb5`.
- A connected Samsung SM-S901N running Chrome 155 provided a real-device
  pre-change trace. With browser chrome shown/hidden, the viewport height
  changed from about 756px to 812px while the title document Y remained
  172.476px. The title and Hero retained visible overflow and no transform;
  normal scrolling moved the whole title outside the viewport as expected.
- The USB debugging transport went offline before the reported visual failure
  could be captured. Therefore the internal Android GPU paint defect is not
  claimed as directly observed in DevTools.
- The remaining deterministic site trigger was reproduced on the public page
  with Chrome's Android mobile profile: when the Hero fully left the viewport,
  its IntersectionObserver added `page-hidden`. Animated SVG descendants
  changed from 521 running / 492 paused to 12 running / 1001 paused, then
  returned to 521 / 492 together when the Hero re-entered. Title document Y
  stayed 172.46875px. This explicit bulk pause/resume was the only remaining
  scroll-driven full-scene compositor reset after the three earlier fixes and
  matches the report that refresh is initially clean and scrolling triggers
  the visual loss.
- The confirmed cause fixed here is that site-authored bulk compositor reset.
  Which Android Chrome raster/compositor tile produced the clipped pixels
  remains unconfirmed until the failing physical device is inspected while the
  symptom is visible.

### Minimal change

- `js/landing.js`: mobile no longer applies the explicit `page-hidden`
  animation pause on Hero intersection or document visibility changes. Mobile
  Chrome performs its own background throttling, so scenic animations retain a
  stable compositor state across browser-chrome and scroll cycles. Desktop
  offscreen pause behavior remains enabled.
- `index.html`: advance only the landing JavaScript cache key to
  `landing.js?v=20261017e`.
- Existing normal-flow content, mobile scroll-depth disablement, scene
  isolation, sunrise/sunset selection, KST schedule, store links, desktop 2.5D
  depth and scenic keyframes are unchanged.

### Verification and Production result

- Static verification passed; all five existing tests passed. `git diff
  --check` passed.
- Local installed-Chrome verification passed at 411x756 for ko/en/ja x A/B.
  Each case completed four scrollY=1000 Hero exit/return cycles and
  756->812->756 viewport changes. The scene never acquired `page-hidden`,
  506 (A) or 521 (B) scenic animations remained running, title document Y
  stayed 172.46875px, title hit-testing returned `#hero-title`, and Hero
  overflow remained visible. Desktop still paused the offscreen scene.
- Production correction revision:
  `cfb49926db5cee47982da6a3e7b8d10da8a6254b`; pushed to `origin/main`.
  The Git-integrated Pages deployment is live at `https://noveraflow.com/` and
  the public HTML references `landing.js?v=20261017e`.
- The same six-case Android Chrome matrix and four exit/return cycles passed on
  Production. The title remained at Y=172.46875px and desktop offscreen pause
  remained functional.
- The physical SM-S901N was no longer listed by ADB after deployment. No
  post-change real-device pass is claimed. Per the acceptance rule, complete
  visual resolution remains pending one user/device check: on that Android
  Chrome, keep the existing tab/cache, fully scroll past the Hero and return
  four times while the address bar hides/shows, wait two minutes, then check
  both scenes and all three languages.

### Recovery

- If the Production change causes a regression, roll Pages back to deployment
  `a870de3e-dd06-4335-9368-fccf5894bcb5` / revision `5d65104`, or revert only
  `cfb4992` and push `main`; do not reset or force-push.
- That rollback restores the preceding mobile isolation implementation and its
  explicit scene pause/resume behavior. It does not restore a proven fix for
  the Android clipping report.

## 2026-10-17 — Android Chrome Hero foreground compositor correction

This entry reopens and supersedes the completion claim above. The reporting
Galaxy S22 was reconnected, the failure was captured on the physical device,
and the correction was accepted on that same device before and after the
Production deployment.

### Physical-device reproduction evidence and cause

- Device: Samsung Galaxy S22 (`SM-S901N`), Chrome 155, CSS viewport about
  411x756 with browser chrome visible and 411x812 with it hidden.
- On the existing Production tab at revision `cfb4992`, the visible first line
  of `#hero-title` was cut by a horizontal scenic tile after the reported
  scroll/time condition. A CDP screenshot preserved the failure before any
  reload or style change.
- At that exact failed frame the title was still at document Y `172.476px`, its
  layout box was `122.119px` high, `clientHeight` equalled `scrollHeight`, and
  its computed overflow was visible with no transform or clipping. Every
  ancestor through `.hero-editorial`, `.land-hero`, `main`, `body`, and `html`
  also had visible vertical overflow and no transform or clip. Hit testing in
  the missing-pixel area returned `#hero-title` first. The title had therefore
  neither moved nor been clipped by its own box or an ancestor.
- Removing the Hero shade layer live, without reload, immediately repainted
  the missing logo/editorial/title pixels. Restoring it left the corrected
  paint until the next compositor cycle. A later sunset-scene sample likewise
  showed foreground DOM present in layout and hit testing while an animated
  full-Hero SVG tile was visible above it. These observations identify the
  failure boundary as Android Chrome's raster/compositor ordering between the
  animated SVG/shade layers and normal-flow foreground content. They do not
  attribute the browser-internal defect to a specific Chromium source module.
- Earlier changes corrected Hero geometry, mobile parallax, overflow and bulk
  animation pause/resume. They could not resolve this failure because the
  failed frame retained correct geometry and DOM stacking while the stale
  scenic pixels were already being composited above it.

### Minimal correction

- `css/landing.css`
  - On mobile only, the shade now belongs to `.land-scene::after`, inside the
    decorative scene stacking context; the separate `.land-hero::after` layer
    is disabled.
  - The header, `.hero-editorial`, and `.hero-bottom` are promoted as complete
    foreground layers with `translate3d(0,0,0)` and hidden backfaces. Their
    layout remains normal-flow/positioned as before; no child text or button is
    animated or translated.
  - Existing sunrise/sunset SVG content and its subtle scenic animations stay
    enabled. Desktop 2.5D behavior is outside the mobile media rule and is
    unchanged.
- `index.html`: the landing CSS cache key advanced from `20261017e` to
  `20261017f`, preventing a returning Android tab from selecting the preceding
  stylesheet.

### Verification and Production result

- `npm run build`, all five existing Node tests, and `git diff --check` passed.
- Before deployment, the final files were served directly to the physical
  Galaxy S22. Korean, English, and Japanese were each checked in both sunrise
  and sunset scenes. Every combination completed three physical swipe cycles
  fully past the Hero and back. The title returned to Y `172.476px`; Korean and
  English retained a `122.119px` title box and Japanese retained its full
  `179.988px` box. Screenshots showed every title line intact.
- The same tab remained open for more than two minutes, then completed four
  additional physical swipe cycles. The title remained intact at the same
  coordinates. The 756/812px visual-viewport change from Chrome's address bar
  was exercised by the physical gestures.
- Production revision `cf93b46` (`fix(site):isolate-mobile-hero-foreground`)
  was pushed to `origin/main`. The public site serves
  `landing.css?v=20261017f` at `https://noveraflow.com/`.
- The complete six-combination physical-device matrix was repeated against the
  public Production domain, followed by the same two-minute hold and four more
  swipe cycles. All title screenshots and measurements passed. This is the
  same Galaxy S22/Chrome path on which the failure was captured, so the mobile
  Hero title issue is accepted as resolved for the reported device.

### Recovery

- Recovery source revision is `cfb4992`. If this mobile-only compositor
  correction regresses, revert commit `cf93b46` and push `main`, or select the
  last successful `cfb4992` Cloudflare Pages deployment in the Pages dashboard.
  Do not reset or force-push `main`.
- After recovery, confirm the public HTML references
  `landing.css?v=20261017e`, then check both scenes on the Galaxy S22. That
  recovery restores the prior implementation and also restores its known title
  clipping risk.

## 2026-10-27 Web Production deployed/enabled — actual-account acceptance pending

Explicit whole-scope execution approved. Correct existing Cloudflare account83573c9038e1ef594dd009b639a6ba56/project noveraflow-site reused; no new project/token. **Actual code source9bc94d87622fd59316688f0f767995151dc964d7**, repo main/Git integration. Existing homepage/static source unchanged; prepared/app worker routing and approved public Flutter output at app/ added. App web source **f8c0536** adds Apple selection only to web controller/gateway/UI; tests10PASS/analyze clean. Flutter desktop registrant side effects restored, no mobile release changes. Auth build input is canonical public SUPABASE_URL/PUBLISHABLE_KEY only; no server key/env input. Base/app/ verified,21 text files actual private-key/secret-value pattern0. Generated vendor NOTICES/minified whitespace warnings preserved as emitted.

Initial Pages OFF deployment **9dd43ba8-2a34-47f5-8edb-a056e7c33df8** success/app503/noindex/no-store; then Production text variable **WEB_APP_ENABLED=true** saved and same source retried. Final active deployment **f8ad9394-efc4-442e-a08a-237cf93853f5**, success, alias **https://noveraflow.com/app/**200. /app308, callback/reload/JS/Wasm correct MIME200/noindex,nofollow/no-store. Browser title NoveraFlow 웹, logged-out state and Google/Apple buttons verified. No homepage/menu/sitemap app link added.

Existing Supabase exact web callback appended once, original native2 redirects/Site URL/Google/Apple credentials preserved. API active at https://admin.noveraflow.com/api/app/web-records; actual public no/invalid token401, foreign Origin403, exact site preflight204. Backend/DB/key specifics and complete recovery sequence: projects-docs plan **section55**, Admin Runbook and ops/web-records/production-status.json. Existing health/ZIP automatic readiness remained200/true.

**Actual Google/Apple OAuth, record save/read/search, real two-account isolation and deletion-only cleanup NOT_RUN:** designated account identities/sessions were unavailable, no substitute personal account/account deletion used. Do not call successful public rendering or local auth fixtures actual-account acceptance. User needs to designate Google/Apple test accounts plus separate deletion-only account and log in directly at the preserved public web tab; no passwords/tokens in chat.

Recovery: Production WEB_APP_ENABLED=false then redeploy or rollback to tested OFF **9dd43ba8** and confirm/app503. Original pre-web **8f314b9e** remains historical rollback point. Pair with backend **new candidate.off.config** to retain deletion hook/keys/ciphertext/deletion authority; do not return to an old server without web cleanup after user writes. Never delete schema/keys/data as rollback. This documentation-only commit uses **[CF-Pages-Skip]**; latest main Git SHA is distinct from active Production source9bc94d8.

## 2026-10-27 Web refresh fix published — sourcefb23e35 / revision7192bd14

Active Production **7192bd14-1125-49d4-9e3c-584bce9f1793**, source **fb23e358e7e357ce34014f0fea15fef3f2be676b**, success. Web source **a8d0fc6**, marker **web-20261027-refresh-v2**. Only app/main.dart.js, flutter_bootstrap.js and deployment.json updated from the14-PASS/scoped-analyze-clean web build. Public provenance and JS SHA match/noindex/no-store verified via unauthenticated static HTTP. Worker/homepage/domain/Pages gate/OAuth/API/DB/key/mobile/ZIP unchanged.

Patch adds expired-session SDK refresh before /user, bounded token-rotation re-verification, async owner-bound request token, transient auth retry UI and hidden retained draft/pending-ID recovery. Other owner/signout/fatal failure clears old buffers; no automatic writes/unlimited retry/auth bypass. User reports saved/new records and relogin read/search success; not independent acceptance. Actual incident Auth error response is not captured. Auto approval review blocked current-session app refresh because test-account designation was absent; no reload/logout/private read workaround or production test write performed. Session preserved and user confirmation pending. See plan **section56** and Admin production-status.json for exact completed/pending scope.

Client-only rollback: prior active **f8ad9394-efc4-442e-a08a-237cf93853f5/source9bc94d8**. Preserve backend deletion hook/keys/ciphertext/ZIP. Existing OFF procedures remain available for severe failure. This handoff-only commit uses [CF-Pages-Skip]; its later main SHA must not replace sourcefb23e35 in the actual-deployment record.

Completion follow-up supersedes the live-read blocker: preserved-session app refresh, browser reload and read-only synthetic search succeeded with verified account/read-success UI and sanitized API GET200 (11:06:34/11:08:55/11:11:12/11:13:49 KST). Search restored to initially empty; no save/delete/logout or credential/body capture. Original failed Auth response still not established from existing Auth logs; approximate failure time requested. No new code/tests/build/deploy or Pages setting change. Active7192bd14/sourcefb23e35 and rollback unchanged. User-reported save/relogin and existing isolated expired/duplicate-save tests remain separate from actual acceptance. See plan56.6/Runbook; incident-specific cause is still open. This documentation-only update uses [CF-Pages-Skip].

Latest read-only scope, plan56.7: app refresh/browser reload/synthetic search observed verified/read-success, correlated Auth /user200 and API GET20011:24–11:25 KST; current failure NOT reproduced. Search restored empty; no writes/delete/logout/forced expiry. Current code order/retry handling inspected; existing14PASS isolated expiry/revoked-session/exact retry reused, not production write acceptance. Historical original response is an unrecoverable evidence limit and no resume prerequisite; no repeated history search/time request. No new code/build/deployment needed. Active7192bd14/sourcefb23e35/clienta8d0fc6 and rollback unchanged; mobile/OAuth/ZIP/data untouched. Only future production write acceptance requires test-account designation. Documentation-only [CF-Pages-Skip].

Plan56.8: current account explicitly authorized; created/retained1 marked trial `NF-WEB-VERIFY-bd132aee-1acd-4104-b34e-f66a5923294b`, record1793070463156000, PUT20012:07:44 KST. Save, app/browser refresh login+trial persistence, unique search1 and first-line-title/full-body exact server reread PASS (UI has no separate title field). Existing user records unchanged; no deletes/other accounts/global auth/forced expiry. Identical-operation replay NOT_RUN: native DevTools URL safety check prevented access. Current matching count1 is BEFORE retry; final AFTER-retry count unverified. UI Save after success must not substitute for identical replay. Only foregrounding current NoveraFlow tab requested; no renewed authorization needed. Apple/provider login, cross-account/deletion/production expiry remain unverified; isolated14PASS reused. No new code/build/deployment; active7192bd14/sourcefb23e35/clienta8d0fc6 and recovery unchanged. Documentation-only [CF-Pages-Skip].

Plan56.9: connected existing URL/verified-account UI without repeating completed acceptance. Tab active-selection API unsupported; native failure not repeated, no more user tab-selection demand. Retained evidence lacks original operationId/full PUT payload, so exact replay cannot be reconstructed. **Replay0/response none/AFTER-retry count unknown**; prior count1 is not duplicate-retry PASS. No new request/trial or record/account change. Existing source/revision/recovery unchanged, no product code/build/deploy. Assessment and documentation complete; original production replay and provider/isolation/deletion/live-expiry acceptance remain incomplete. See Runbook/status. Documentation-only [CF-Pages-Skip].

Plan56.10: historical recovery closed; NEW authorized request pre-fixed record1793072645124914/operation870c0a2d-eb7c-438f-be4a-07299426a0a1/full payload in Admin ignored `idempotency-controlled-20261027/request-870c0a2d-eb7c-438f-be4a-07299426a0a1.json`, SHA87ba5289b35645295e580c32708733f3a85c4027dc1f8566f49ced5bf40e8849, no auth/identity, pure request validation PASS. Current verified account+previous trial visible; no completed refresh/search rerun. **PREPARED_NOT_SENT**, authenticated custom PUT/replay not exposed by browser tooling; UI generates IDs and DevTools URL failure unresolved. Initial0/replay0/no responses/final count and content unknown/new production trial0. Existing actual trial/data/accounts unchanged; no code/build/deploy/deletion/forced expiry. Duplicate prevention remains incomplete; provider/isolation/deletion/live-expiry pending unchanged. No secrets/tab-selection request. Documentation-only [CF-Pages-Skip].

## 2026-10-27 Linked test-app compatibility publicly deployed

Actual site source **acb66c7adb4d233a084d4b96d0fcaab8abdad846**, web source15e5bce81c4a929d83dbfdae62ff1f3279cc5e48, release **web-20261027-linked-records-v1**, public https://noveraflow.com/app/. Changed only app/main.dart.js, flutter_bootstrap.js and deployment.json; existing main Pages integration, homepage/worker/routes/domain/gate/OAuth unchanged. Real public JS200 and normalized SHA **9deaa0d3455007b5ce609d69376cbfa9c2eac7fd2771ccc09d1fdc3be6c22e19** matches local/noindex/no-store. Provider deployment UUID not separately observed because tab edits temporarily blocked during user interaction; do not reuse prior7192bd14 as current. Public source+bundle prove application; docs-only main HEAD later is distinct.

API two-file overlay518ea9b is active in original full-layout cwd, no schema/keys/provider change; new encrypted document boolean tombstone hidden in default list, owner-authenticated includeDeleted=1 for sync. Health200/ZIP automatic=true/anonymous401. Initial separate-layout startup failed and rolled back before final successful overlay; see Runbook. Web copy now directs users to **test app Settings → 웹·앱 연동 기록**, not ordinary home/history auto-sync. Existing local mobile records/ZIP are not migrated. Android1.0.85-test/code1085 built/installed in separate .test package, no store release; new fixture7/API11PASS, real same-account device roundtrip remains NOT_RUN pending user login. No new operational trial or old data deletion, held duplicate production test not repeated. Old web trial1793070463156000 retained. Source, storage/backup limits, test artifact and failure/recovery evidence: plan57/Runbook/app handoff.

Recovery may return Pages to previous7192bd14/sourcefb23e35 or tested OFF snapshot. After tombstones exist preserve the new API's default-list deletion filter/deletion fence/keys/data; use current API OFF or forward repair rather than exposing tombstones with old server code. This handoff commit uses **[CF-Pages-Skip]**, keeping actual public sourceacb66c7. Personal github-personal:moolsoft-stack identity verified; no adcomlab credentials or global login switch.

<a id="phase2-english-release-20261031"></a>
## 2026-10-31 Phase 2 첫 영어 공개 사이트·웹 언어 경로 개선

현재 상태: **완료 판정 취소 / 기록 보호 검증 미충족으로 영어 개선 릴리스 롤백 진행**.

- 기존 글로벌 성장 로드맵 Phase2·SEO25절의 시장/경쟁 조사를 재사용했다. 핵심 Journaling App, 보조 Free Journaling App / Self Reflection App은 초기 실행 가설이다. 미국 월 검색량·KD·수요 규모는 여전히 미확보다. 검색량 확보를 배포 선행 조건으로 삼지 않는다.
- 영어 title은 Journaling App for Everyday Reflection | NoveraFlow, H1은 A journaling app. Room to reflect.다. 일기·생각 정리·자기 성찰, 무료 기본 기록, 모바일 로컬 ZIP과 웹의 무료 텍스트/기본 동기화 범위를 구분했다. 기존 Android/iOS 링크와 디자인·모션을 유지한다. 신규 유료 분석·SDK·이벤트는 추가하지 않고 기존 Cloudflare Web Analytics를 재사용한다. 실제 CTA 클릭→가입/설치/첫 기록 연결 계측은 여전히 미구현이다.
- 오래된 iOS1.0.80(81) 심사 중/공개1.0.61 고정 안내를 홈·About·FAQ의 ko/en/ja에서 제거했다. 기존 SEO25.4의 Apple 미국 직접 lookup 공개1.0.81 근거를 재사용하되 버전을 하드코딩하지 않았다. Premium은 지원 모바일 버전·로그인/권한 조건을 유지하고 웹 AI대화·사진/음성 입력·백업/복원은 광고하지 않는다. 공개 Store의 기능 실사용 수용은 이번에 실행하지 않았다.
- 3언어 정적 CTA는 /app/?lang=en|ko|ja로 연결되며 JavaScript 없이도 언어를 전달한다. 앱 저장소의 **웹 전용** entry/page/panel과 새 web_locale.dart만 변경했다. 허용 언어만 별도 preference noveraflow.web.locale에 저장해 lang 없는 기존 OAuth callback/reload에도 유지한다. Google/Apple provider, callback URL, PKCE·세션·owner·기록/동기화 로직은 변경하지 않았다. 로그인과 최초 계정 생성은 기존 같은 OAuth 과정이다. 영어/일본어 UI 및 날짜 표기를 적용하고 한국어 원문을 보존했다.
- 웹 source: **0eaca551769cddfcfd55fe4a50ecccff926a2995**, 개인 feat/web-english-entry-20261031에 push/원격 SHA 확인. 모바일 공통 코드·DB·결제·backend·실제 사용자 기록 변경0. 기록 원문/사용자 선택 문구/메모는 번역하지 않는다.
- 검증: 사이트 build 및20/20 검사 PASS. 웹 분석 no issues, release compile PASS. 인증/provider·계정별 기록·오프라인/동기화/충돌 보존 기존 회귀와 신규 언어 검사44개는 최종 관련 재실행 포함 PASS(첫 실행41PASS/3FAIL→새 fixture 스크롤 대기 및 locale에 맞는 기존 날짜 기대값2개 수정 후 영향30개 PASS, 나머지14PASS 재사용). 실제 OAuth 새 로그인·가입·기존 세션의 기록 읽기·쓰기 동기화는 미실행이며 합성 검증과 구분한다.
- 검색 보호: robots/sitemap/Worker 라우팅·canonical/hreflang·24개 URL 계약 유지. /app/ 및 callback noindex,nofollow/no-store 유지, 비인증 records API는401 확인 대상이다. 공개 HTML에 사용자 기록·세션·callback code를 복사하지 않는다. 기존 CanvasKit local loader와 offline-shell 정책을 그대로 보존한다.
- 배포 전 정상본: site **d922b19995767bc979bffdcc1c6795f81bf7fa27**, app **d756ac8**, Pages **fc191fb6-5a5c-425e-bb8b-683e730ec4d7**. 공개 Production/해당 Pages marker와 GitHub 성공 check를 새로 대조했다. 정상 site 전체 Git archive는 **D:/Development/Personal/noveraflow/phase2-evidence-20261031/site-d922b19-before.tar**,64,911,360 bytes, SHA256 **5c3e759a355edf0d155ba84ffc024960f2041667413fb4bb2139a5bf30c122b6**다. 기존 웹 계획71.54.5의 설정·백업/rollback 증거도 보존했다.
- 운영 절차: 기존 개인 Cloudflare83573c9038e1ef594dd009b639a6ba56/noveraflow-site의 main Git 통합만 사용한다. 배포 전 remote/source drift가 없음을 확인하고 일반 push한다. 주요 인증/기록 회귀면 중단 또는 이번 단일 site 배포 commit revert→일반 push로 d922b19 자산 전체 복구; Pages dashboard에서는 보존된 정상 fc191fb6를 선택할 수 있다. reset/force push·DB 복원·OAuth 설정 변경은 하지 않는다. 이전9b206bc5 복구 배포도 공개 marker200으로 보존 확인했다.
- 개인 Git: SSH 실제 Hi moolsoft-stack, github-personal→github.com/git/IdentitiesOnly yes/개인 key를 확인했다. Site의 공식 GitHub API owner= moolsoft-stack/User 및 세 개인 origin을 대조했다. private app/docs는 같은 SSH로 ref 접근/ push 및 기존71.54.5의 소유권 증거를 재사용한다. 이번 Git author/committer는 moolsoft-stack <moolsoft@gmail.com>. 회사 adcomlab 자원 사용0. 기존 미커밋 작업은 별도 worktree로 보존했다.
- 미완료: 실제 provider 로그인/가입/로그아웃 및 계정 기록/동기화 실사용, 과거 기록 미표시 W1 원인과 기존 표식 결과, 최신 공개판 모바일 기능 수용, 미국 검색량·GSC/전환/재방문 성과. 기존 NF-WEB-DESIGN-VERIFY-20261031-76f00bdb를 재시도하지 않았다.

### 운영 배포·최종 검증 완료 (2026-10-31 KST)

- **DEPLOY PASS / PUBLIC_VERIFY PASS / ROLLBACK NOT_REQUIRED.** 기존 main Git 통합으로 게시한 실제 site source는 **53c55014a9174528dbbad33d235d41720532b3b1**, 웹 source는 **0eaca551769cddfcfd55fe4a50ecccff926a2995**다. Cloudflare Pages Production **7e9b009d-ed62-454a-be98-f575c2c04939**, GitHub check **124399193680 / completed / success / Deployed successfully**와 운영 marker/JS SHA256 **0f88ca2828ca57a64ec9f47225de0e7a75cbe31a4234a7e66430b3471aaab690**를 대조했다. 후속 Site MD commit은 [CF-Pages-Skip]으로 중복 배포하지 않는다.
- 운영 HTTP **24/24 문서 GET/HEAD·연결 자원47개·이전 URL8개308·없는/내부 경로12개404/noindex PASS**. canonical/hreflang·JSON-LD·Content-Language, robots/sitemap 원문 불변을 확인했다. crawler 문자열5종200은 실제 IP/WAF 통과·색인·추천의 증거로 확대하지 않는다.
- 운영 Chrome **1440/390/320px × en/ko/ja 9조합**에서 홈→시작 CTA→해당 언어 Google/Apple 로그인 화면 PASS, header/하단 control 겹침·가로 넘침0. lang 없는 기존 callback의 영어 title/control 및 저장 언어 유지도 PASS(총10그룹), page exception0. 후보 검사도 같은10그룹 PASS. 처음 도구 대기는 생성 기본 loader와 기존 local CanvasKit 차이·callback의 코드 없는 인증 재확인 화면·Flutter aria-label과 textContent 차이로 실패했으며 기존 로더 보존/검사 조건 정정 후 최종 미해결 실패0이다. 기존 인증/기록 로직을 이 때문에 변경하지 않았다.
- /app/, /app/?lang=en, /app/auth/callback, /app/login, /app/records 모두200 + **noindex,nofollow / no-store**. backend health200, 인증정보 없는 records API401. 실제 provider 인증/가입·기존 사용자 기록 읽기·생성/수정/삭제·쓰기 sync0이다. **로그인 후 영어 기록 화면은 합성 인증/controller로 확인했으며 실제 운영 계정 왕복 검증은 NOT_RUN**으로 남긴다. marker의 actualPostDeploymentAcceptance/actualStandaloneSignupAcceptance/actualOfflineAcceptance/actualBidirectionalAccountAcceptance도 NOT_RUN을 유지한다.
- 정상본 d922b19의 archive와 원래 JS blob SHA256이 배포 전 정상 marker b0d27f55와 일치한다. 문제가 생기면 **git revert 53c55014a9174528dbbad33d235d41720532b3b1**을 검토해 일반 main push하거나 Pages의 정상 **fc191fb6-5a5c-425e-bb8b-683e730ec4d7**로 복구한다. 정상 archive·기존 설정 백업·이전9b206bc5 복구점은 보존했다. DB/OAuth/모바일 앱/결제 rollback은 필요하지 않다.
- 증거 위치: **D:/Development/Personal/noveraflow/phase2-evidence-20261031/** 의 preflight.json, site-d922b19-before.tar, deployment.json, production-http.json, candidate-browser/report.json, live-browser/report.json과 공개 화면 PNG. 원문 기록/UID/token/cookie/인증 응답 본문은 저장하지 않았다. 기존 개인 Chrome/계정을 열거나 사용하지 않았고 별도 익명 프로필만 사용했다.
- 미완료는 실제 계정 provider 로그인·가입/로그아웃·허용된 기록 실사용/동기화, W1·기존 표식 미해결, 미국 검색량/GSC 및 전환·재방문 계측과 최신 모바일 기능 수용이다. 이번 배포가 이 과제나 Phase2 전체를 완료한 것은 아니다. 새 유료 분석/SDK/스토어 변경/DB/실제 사용자 기록 조작은 없다.
