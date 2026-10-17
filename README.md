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

정적 파일만 사용하며 별도 의존성 설치는 필요하지 않습니다.

```text
npm run build
npm test
```

검증기는 `/account-deletion`의 비리다이렉트 공개 안내, 외부 요청 경로,
3개 언어, Privacy 번역 키, sitemap 및 모바일 스타일 계약을 확인합니다.

## Site icon 기준

- 현재 앱의 launcher 설정이 사용하는 원본은 `../noveraflow-app/assets/branding/mark_01_icon_1024.png`입니다.
- 메인 랜딩의 favicon, 홈 화면 아이콘, manifest icon, JSON-LD logo, header brand mark와 OG는 같은 공식 원본에서 만든 `assets/landing/*-v20261017.*`을 사용합니다. 앱 원본은 수정하지 않습니다.
- 로고 여백 축소·리사이즈 결과는 웹 전용 자산으로 보관합니다. 새 자산은 날짜가 포함된 이름으로 추가하고 HTML/manifest 참조도 함께 갱신합니다.
- A/B 풍경, 모션, 스토어 링크, Production 배포 및 복구 절차는 [운영 기록](docs/HANDOVER_STATUS.md#2026-10-17--ab-landscape-landing-production-release)을 참고하세요.
