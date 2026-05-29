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

## Site icon 기준

- 앱 최신 아이콘 기준 원본은 `C:\Projects\noveraflow-app\assets\branding\noveraflow_icon_master.png`입니다.
- 사이트 favicon, 홈 화면 아이콘, manifest icon, JSON-LD logo, header brand mark는 같은 원본에서 생성한 versioned PNG를 사용합니다.
- OG 이미지는 앱 splash 기준 원본 `C:\Projects\noveraflow-app\assets\branding\noveraflow_splash_light.png`를 1200x630 비율로 맞춘 versioned PNG를 사용합니다.
- 파일을 갱신할 때는 기존 파일을 덮어쓰는 대신 `*-vYYYYMMDD.png` 파일명으로 추가하고 `index.html`, `site.webmanifest`, manifest link query를 함께 갱신해 캐시 잔존을 줄입니다.
