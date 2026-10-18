# noveraflow-site

NoveraFlow 공식 사이트와 랜딩 페이지 프로젝트입니다.

## 역할

- 공식 사이트
- 랜딩 페이지
- 브랜드 소개
- SEO
- OG 이미지/메타 정보
- 마케팅 관련 문서

## 관리하지 않는 것

- 실제 앱 개발: `C:\Projects\noveraflow-app`
- 관리자 시스템: `C:\Projects\noveraflow-admin`
- 전체 철학과 기준 문서: `C:\Projects\aidiary`

## Docs

사이트 관련 문서는 [docs](docs/)에서 관리합니다.

사이트 문서가 제품 철학과 충돌하면 `aidiary/docs`를 우선합니다.

## 로컬 검증

Node.js 24에서 기존 HTML과 `js/i18n.js`를 사용해 언어별 정적 HTML을 생성합니다.
기본 build/test에는 별도 의존성 설치가 필요하지 않습니다.

```text
npm run build
npm test
npm run preview
```

검증기는 24개 언어별 HTML, canonical/hreflang, JSON-LD, sitemap, Privacy·삭제 안내,
404와 이전 URL 호환성을 확인합니다. `npm run preview`는 `http://127.0.0.1:4173`에서
동일한 Worker 라우팅을 실행합니다. HTTP 검사는 `node scripts/check-http.mjs`로 실행합니다.

공개 URL은 기존 `?lang=ko/en/ja` 형식을 유지합니다. 문구는 `js/i18n.js`, 구조는 기존
HTML, 경로는 `scripts/site-config.mjs`와 `_worker.js`에서 관리합니다.
`_localized/`의 24개 HTML과 `sitemap.xml`은 직접 편집하지 말고 build 결과를 함께 보관합니다.
기존 Cloudflare Pages 게시 루트가 저장소 루트이므로 산출물을 저장소에 포함합니다.

2026-10-18 Phase 1은 커밋 `37e4d276957cc4002ac3fe386cc6351a63a85ccf`로
Cloudflare Pages deployment `fb72a1a5-d818-4d70-81f4-30063da16dda`에 배포되어
운영 검증을 통과했습니다. 실제 기능 판정, Cloudflare 런타임·브라우저 검증,
새 파일 관리와 복구 방법은
[SEO 구현 기록](docs/04-seo-direction.md#21-2026-10-18-phase-1-로컬-구현)과
[운영 기록](docs/HANDOVER_STATUS.md)을 따릅니다.

## Site icon 기준

- 현재 앱의 launcher 설정이 사용하는 원본은 `../noveraflow-app/assets/branding/mark_01_icon_1024.png`입니다.
- 메인 랜딩의 favicon, 홈 화면 아이콘, manifest icon, JSON-LD logo, header brand mark와 OG는 같은 공식 원본에서 만든 `assets/landing/*-v20261017.*`을 사용합니다. 앱 원본은 수정하지 않습니다.
- 로고 여백 축소·리사이즈 결과는 웹 전용 자산으로 보관합니다. 새 자산은 날짜가 포함된 이름으로 추가하고 HTML/manifest 참조도 함께 갱신합니다.
- A/B 풍경, 모션, 스토어 링크, Production 배포 및 복구 절차는 [운영 기록](docs/HANDOVER_STATUS.md#2026-10-17--ab-landscape-landing-production-release)을 참고하세요.
