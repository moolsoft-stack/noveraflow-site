Status: Official
Official source for: Site SEO direction and SEO copy tone
Latest source: This document, with brand/marketing source in
02-brand-and-marketing.md
Reason: Number prefix is legacy ordering only. This file remains the active SEO
direction.

# NoveraFlow SEO 방향 기준

<a id="phase2-conversion-live-20261031"></a>
## 2026-10-31 완료 보완 — 최소 전환 계측 운영 수집·SQL 조회

**이 절이 최신 상태다. 아래의 저장 경로 선택 대기/운영 미수집은 보완 전 이력이다.** Android·iOS store CTA, Web 시작 CTA, 서버 ACK 이후 Web 신규 기록 관측을 기존 개인 Cloudflare의 무료 Analytics Engine에 연결했다. 이벤트 종류·언어·대략적 국가·유입 유형으로 SQL 집계할 수 있다. 성장 성과/고유 사용자10·30·100명 달성을 뜻하지 않는다. 기존 **미국 Google 노출11·클릭0(10/1~28)** 및 **미국 직접 visits46(고유 사용자 아님)** 기준선은 유지한다. 완료된 SEO/시장 조사·기존20/44 전체 검사는 반복하지 않았다.

### 운영 revision과 실제 수신 근거

- 최종 Site **4a77364e7571a040c445e683251808a03123e60d**, Pages **c8144034-80f7-4c5d-8502-70564558789f**, Cloudflare GitHub check **124421940944 / success**. Web **83b40612160d84b1be589774ec823766b9265cba**, release **web-20261031-conversions-v1**, 실제 main.dart.js SHA256 **47f0176308f81a45c558f1d754c95936ce172f3e238f0e9c30d48817101ae507**.
- 최초 수집 연결은 Site **cd99435** / Pages **5dc86536-a106-41e8-8482-9db67ddb5159** / check124420646537 success에서 검증했다. 3언어별 Android/iOS/Web CTA 각1회, ACK1회, **총10 test 이벤트·응답204×10**, 중복 click/refresh 추가0, 실제 컴파일된 Dart→JS hook PASS. 모든 Auth/records 요청은 격리 Chrome에서 합성 응답으로 가로채 실제 운영 기록 쓰기0이었다. 전환 POST만 실제 운영 수집기에 전달했다.
- 기존 개인 대시보드 세션으로 **SQL200·4종 저장·country=KR·source=direct·traffic=test**를 직접 읽었다. 이는 한국에서 수행한 합성 검증이며 미국 사용자/검색 유입 증거가 아니다. 최초 조회의 빈 결과와 후속 저장 조회를 구분한다. 수락204는 저장 조회를 대신하지 않는다.
- 단일 index에서 일부 SQL 행의 `_sample_interval=2`를 관측했다. 입력 중복이 아니라 표본 가중치였다. 범주별 작은 집단이 섞이지 않게 **이미 허용한 event/language/country/source/scope/traffic 범주 조합**으로 index를 나눴다(4a77364). 같은 범주는 모든 방문자에게 같은 값이며 방문자/계정/이벤트 ID를 새로 만드는 것이 아니다. 관련 receiver 검사2건만 추가 확인했고 Web 재빌드·3언어 전체 재실행0이다. 최종 receiver에 4종 test POST204도 확인했다.

### 이벤트와 첫 기록 판정

**최종 SQL 확인 시각 2026-10-31T03:02:04Z:** 범주 index(`v1|...`)의4종 `store_android/store_ios/web_start/record_created`가 **각1건**, 저장 표본 각1 / 최대 `_sample_interval` 각1로 조회됐다(SQL200). locale=en / country=KR / source=google / traffic=test이며 google은 receiver 진단을 위한 **합성 fixture 값**, 실제 검색 유입이 아니다. 별도 실제 컴파일 브라우저 검증10건은 direct/test였다. 초기 조회에서 일부 행이 늦게 나타났으므로 POST 수락 시각과 SQL 가시화 시각을 구분한다. helperAbsent=true도 재확인했다. 원본은 conversions-index-production-sql.json이다.

| 이벤트 | 실제 발생 조건 | 집계 범위 |
| --- | --- | --- |
| `store_android` | 동의한 페이지에서 실제 Google Play CTA click | 링크 클릭 의도. 스토어 도착/설치 아님 |
| `store_ios` | 동의한 페이지에서 실제 App Store CTA click | 링크 클릭 의도. 스토어 도착/설치 아님 |
| `web_start` | 동의한 페이지의 같은 origin `/app/` 시작 링크 click | 새 가입/로그인 성공 아님 |
| `record_created` | 기존 save의 HTTP200·JSON 처리 후 신규 expectedRevision0 / 반환 revision1 / 요청과 반환 document 깊은 동등 / 같은 verified auth scope / 삭제 아님 | **현재 페이지에서 첫 서버 ACK 신규 생성**, `scope=first_ack_in_page`. 로컬 저장/대기열 등록/저장 버튼 click에는 발생하지 않음 |

Web observer는 기존 client를 감싸고 요청·응답·idempotency·공유 sync 동작을 바꾸지 않는다. observer scope/sink 예외는 원래 저장 응답에 영향을 주지 않는다. 최초 관측 여부·클릭 debounce는 현재 페이지 메모리에만 있다. HTTP401/409/503·network/parse/timeout·ACK mismatch·edit/delete·계정 전환은 제외한다. 같은 페이지의 중복 ACK/추가 create/refresh는 추가 집계하지 않는다. reload/다른 기기/과거 pending ACK를 계정 생애 이력으로 중복 제거하지 않으므로 **계정 최초 기록·고유 사용자·실제 적격10/30/100명은 미측정**이다. 계정 UUID를 외부 분석에 보내 이 공백을 채우지 않는다.

### 개인정보·동의 확인 후 활성화

- 공개 홈 footer 및 Web 기존 로그인/설정 카드에 **선택적 이용 집계** 버튼을 추가했다. en/ko/ja 고지 후 직접 허용한 현재 페이지에서만 수집한다. 기본 off, 강제 팝업/동의 없는 전송0, 철회 즉시 향후 전송 중단. 동의 선택을 cookie/LocalStorage/SessionStorage에 저장하지 않아 페이지 이동/OAuth 복귀 후 다시 off다. 기존 필수 인증/언어/기록 저장소는 건드리지 않았다.
- Global Privacy Control / Do Not Track은 client와 receiver에서 차단한다. 허용하지 않거나 차단/실패/광고차단이 있으면 수집되지 않으므로 전체 방문을 대표하는 전환율로 간주하지 않는다. 기존 Cloudflare Web Analytics 방문 분석과 이 선택적 전환 집계는 별개임을 고지했다.
- client POST는 event/언어/source/scope/test·production/동의 버전의 허용 값만 전송한다. `credentials:omit`·`referrerPolicy:no-referrer`이며 Authorization을 보내지 않는다. receiver는 예상 필드 외 값/임의 source URL/Authorization/다른 origin/512byte 초과를 거부한다.
- **기록 본문·제목·email·계정 UUID·기록/operation ID·인증정보·IP 원문·전체 URL/query/referrer·fingerprint를 분석 payload/index에 포함하지 않는다.** callback은 내용/인자 없이 언어만 JS bridge에 전달한다. auth scope 비교는 기존 값으로 메모리 안에서만 한다.
- 국가 bucket은 request.cf.country의 US/KR/JP/other/unknown이며 거주 확인이 아니다. referrer는 direct/google/bing/chatgpt/social/internal/other/unknown으로만 분류하고 원문은 저장하지 않는다. google은 referrer 분류이지 검색어/미국 검색 수요 증명이 아니다. OAuth를 넘는 원래 획득 경로를 저장/연결하지 않으므로 기록 이벤트가 internal/other/direct로 보일 수 있다.
- 기존 개인 계정의 **무료 Analytics Engine** 기능/전용 dataset `noveraflow_web_conversions_v1`·Pages binding `NF_CONVERSIONS`만 사용한다. [무료 한도/가격](https://developers.cloudflare.com/analytics/analytics-engine/pricing/)과 [3개월 보존](https://developers.cloudflare.com/analytics/analytics-engine/limits/)을 확인하고 고지에 반영했다. 유료 plan upgrade·결제정보·유료 분석 SDK 추가0. 새 visitor ID/추적 저장소/browser 식별자0. 운영 기록 DB는 이 분석 저장소와 별개이며 변경0이다.

### 집계 방법과 해석

WAE blob1=event, blob2=언어, blob3=국가 bucket, blob4=source, blob5=scope, blob6=traffic class, double1=1. index1은 `v1|`+위 허용 범주 조합(96byte 이하)이다. 분석자 권한이 있는 기존 개인 Cloudflare 세션에서 SQL API200으로 읽었다. 새 API token은 생성하지 않았다. 실제 지표는 반드시 `blob6='production'`을 적용하고 합성 시험은 `test`로 제외한다. 운영자/봇의 자동 식별과 개인별 연결은 제공하지 않는다.

미국·영어 최근7일 집계 예시(UTC 기간, 진단용 개인 ID/원문 조회 금지):

```sql
SELECT blob1 AS event_name, blob4 AS source_type,
       SUM(_sample_interval * double1) AS estimated_events,
       COUNT() AS stored_samples, MAX(_sample_interval) AS max_sample_interval
FROM noveraflow_web_conversions_v1
WHERE blob6 = 'production' AND blob2 = 'en' AND blob3 = 'US'
  AND timestamp >= NOW() - INTERVAL '7' DAY
GROUP BY event_name, source_type
ORDER BY event_name, source_type
LIMIT 100
```

WAE는 [쓰기/조회 표본화](https://developers.cloudflare.com/analytics/analytics-engine/sampling/)를 사용하므로 `COUNT()`를 전체 이벤트 수로 쓰지 않고 `_sample_interval` 가중 집계와 표본수를 함께 제시한다. 범주별 index도 무표본·정확한 사람 수를 보장하지 않는다. 빈 관측 행은 해당 범위의 이벤트 미관측이며 사용자가0명이라는 뜻이 아니다. GSC28일·기존CF rolling7일·이번 수집 개시 이후 자료는 기간/정의가 달라 직접 전환율을 계산하지 않는다. 실제 사용자10→30→100 판단은 별도 내부 첫 성공/국가/시험 제외 근거가 필요하다.

### 변경 범위 검증·기록 보호

- 신규 client/receiver5검사 PASS: 4종 허용 필드/국가, 동의·민감 필드·origin·크기 거부, GPC/DNT, 3언어 CTA/중복/저장 접근0, 철회 차단. 신규 sync 연결1 PASS: ACK 유실/재시도 명령 동일·pending 보존→ACK후 해제·수정 revision 보존. 기존 observer6 PASS와 기존20/44를 재사용했다.
- 실제 Web release compile 및 scoped analyze clean. 기본 Flutter Chrome test launcher 대기는 종료하고 기존 CDP 격리 방식으로 **실제 컴파일된 bridge·auth/records 연결**을 검증했다. test mock Auth/PUT은 네트워크에서 모두 차단·대체했고, 실제 사용자 기록 생성/수정/삭제/강제 이전0이다.
- 실제 운영 기존 계정의 새 Web **영어 UI12 / 인증 GET200·active12 / nextCursor null / 캐시 ID·revision12 정합 / 같은 owner / 필터 빈값 / 날짜10/27~31 / pending0·conflict0 / tombstone0** PASS. 실제 token/UUID/본문은 브라우저 밖으로 반출하지 않았다. core Auth/client/controller/공유 sync source는0eaca55와 동일하며 Web 전용 observer와 선택 버튼만 연결했다. 한국어/일본어 CTA는 새 브라우저 검사로 확인했고 기존 로그인/언어 수용을 재사용했다.
- 새 receiver GET enabled=true·noindex, 실제 bundle hash 일치, app/callback200/noindex/no-store·비인증 records API401, robots/sitemap 불변 PASS. 이전 SEO761a353의 Journaling App HTML/메타데이터·canonical/hreflang·24 URL 및 GPTBot 정책을 보존했다. 미색인17개 상세 분류와 새 영어 콘텐츠 Google 색인 미확인은 이전 조사 그대로 유지한다.

### 게시 장애 해결·복구·Git

초기 Pages 게시3회는 계정 Analytics Engine 쓰기 초기화 오류로 실패했으며 당시 정상761a353/Web0eaca55를 유지했다. 무료 SQL 활성화/빈 dataset 생성 후에도 Pages 쓰기 gate가 남았다. 동일 개인 계정에서 **공개 경로·데이터 쓰기 없는 404 임시 Worker**로 동일 binding을 초기화한 뒤, 같은 검증된 소스로 새 Pages 배포가 성공했다(5dc86536). 임시 Worker `noveraflow-conversion-init-20261031`는 finally 삭제200 및 후속 GET404로 제거 확인했다. 새 유료 서비스/Worker 상시 운영/결제 변경0이다.

새 읽기 토큰 생성은 자동 검토가 명시적 승인 없는 자격 증명 변경으로 거부하여 수행하지 않았다. **기존 개인 세션 SQL200**으로 해결했다. 실제 records GET은 초기 미검사 스크립트 거부 후 전체 내용을 검사하고 SHA256 **86fe1839b9556c6f8faf197e79a3269f52c48897ac7361ae2c07ff91d92bc2d3**로 고정해 허용된 읽기만 실행했다. 남은 자격 증명 승인 차단은 없다.

정상본 backup **D:/Development/Personal/noveraflow/phase2-evidence-20261031/site-9b79c63-before-conversions.tar**, **65,413,120bytes / SHA256 76a4265b621283c72027c86531efbf497b3435de9b860eed1c8f670a40c617b4**. 당시 main9b79c63은 실제 운영761a353과 문서만 달랐으며 Web0eaca55를 포함한다. 복구는 정상 **Pages4dce72da-074f-40d8-aab2-aa37debf69be**(761a353/Web0eaca55)로 rollback하거나, **4a77364 → cd99435 순서로 코드 revert 후 일반 main push**한다. 수집기 index만 되돌리면 직전 정상5dc86536도 복구점이다. 운영 DB/기록 복원·force/reset을 하지 않는다. 이번 기록 회귀/rollback 필요0이다.

증거는 기존 phase2-evidence-20261031의 conversions-predeploy.json, conversions-live.json, conversions-index-live.json, conversions-production-sql.json, conversions-index-production-sql.json, conversions-production-record-list.json, conversions-production-records-api.json이다. 실제 고객 본문/UUID/token/cookie를 기록하지 않았다. 개인 moolsoft-stack 소유권/remote/SSH 및 작성자·committer를 확인했고 회사 adcomlab 혼용0. 관련 App feature/Site main/기존 Docs 브랜치만 push한다. 후속 Site MD는 **[CF-Pages-Skip]**으로 중복 배포하지 않는다.

남은 성장 과제는 실제 동의 표본 축적, 국가/유입 unknown 및 표본 coverage 관리, 계정 최초·고유 사용자/신규 가입/재방문 지표, 새 영어 문구 색인 반영이다. 모바일 과거 로컬 기록 전체 대조는 별도 이전 과제다. 이것들을 운영 전환 이벤트 미구현과 혼동하지 않는다.


<a id="phase2-minimal-conversion-seo-20261031"></a>
## 2026-10-31 최소 전환 계측 준비·영어 SEO 수정 — 수집 활성화 대기

### 결과와 범위

기준선은 아래 기존 조사 그대로 **미국 Google 노출11/클릭0(10/1~28)**, **미국 직접 visits46(최근7일 GMT+9)**이며 후자는 고유 사용자46명이 아니다. 실제 첫 기록 사용자10/30/100은 미측정이다. 이번에는 기존20/44·운영 기록12건 대조를 반복하지 않았다. 운영 DB·사용자 기록 쓰기/실제 시험 기록 생성·삭제·모바일·결제·스토어 제출 변경0이다.

영어 홈 `MobileApplication.description`이 현재 visible Journaling App 소개가 아닌 과거 AI 중심 FAQ 설명을 사용하고 있었다. 생성기의 영어 홈 한 필드만 현재 `landing.intro.copy`에 맞췄다. Site source **761a3534e89e37c3b1a9bc85155b9f1deac920a9**. 제목/description·canonical·hreflang·sitemap/robots·GPTBot 정책·CTA href·한국어/일본어 HTML·Web bundle은 그대로다. 새 schema 테스트1 PASS, en HTML은 해당 설명 외 byte동일(줄바꿈 정규화), ko/ja HTML byte동일. 키워드 추가 나열·새 URL/페이지·실제 미제공 기능 주장0이다. 공개 HTML은 직접 영어를 제공하지만 GSC 마지막 root crawl은10/30이므로 **10/31 새 문구/schema의 Google 재수집·색인 반영은 미확인**이다.

### GSC 미색인17개 실제 URL 분류 (10/23 보고서)

| 보고 사유 / 개수 | 실제 상세 URL | 현재 읽기 확인과 처리 |
| --- | --- | --- |
| redirect7 | `/contact.html`, `/terms.html`, `/account-deletion`, `/philosophy.html`, `http://noveraflow.com/`, `/faq.html`, `/account-deletion?lang=ko` | 각각1회301/308→200. 현재 의도한 최종 canonical 경로로 이동하며 lang=ko 보존. 오류/색인 필요17개로 해석하지 않음 |
| 사용자 canonical 없는 중복4 | `https://admin.noveraflow.com/?lang=ja`, `?lang=en`, `?lang=ko`, `/admin-legacy/events` | 현재 비인증 HEAD200 모두 `X-Robots-Tag:noindex`. 관리자 검색 제외 의도, 공개 홈 canonical을 붙이거나 색인 해제하지 않음 |
| noindex2 | `https://admin.noveraflow.com/`, `/roadmap` | 현재 HEAD200/noindex. 관리자 의도적 제외 유지 |
| 적절한 canonical 대체2 | `https://noveraflow.com/terms?lang=en`, `/privacy?lang=en` | 현재 GET200, 각각 쿼리 없는 `/terms`, `/privacy` canonical. 의도한 영어 기본 URL 중복 통합 |
| redirect error1 | `https://noveraflow.com/about.html` | 현재308→`/about`200,1회·루프없음. 과거 보고서의 실패 원인은 현재 재현되지 않으며 당시 edge 응답 원인까지 확정하지 못함. 재수집 후 상태 확인 필요 |
| 404 1 | `https://noveraflow.com/cdn-cgi/l/email-protection` | 현재404. Cloudflare 예약 이메일 보호 경로이며 콘텐츠 페이지가 아님. 홈으로 soft404 이동시키거나 sitemap 추가하지 않음 |

사유 분류 합계17/17이며 Google의 과거 제외 사유가 현재 상태로 즉시 갱신됐다는 뜻은 아니다. root 검색 노출과 admin URL은 별개다. 비공개 `/app/?lang=en`·callback HEAD200/noindex,nofollow/no-store를 확인했고 기존 API/기록 보호 결과는 재사용한다. 공개 sitemap24·기존 canonical/hreflang을 유지하며 색인 요청/관리자 noindex 해제0이다.

### 기존 수집 경로 확인과 활성화 차단 조건

- 기존 CF Web Analytics는 country/host/path/referrer 집계에는 사용하지만 **custom events 및 UTM query 수집은 지원하지 않는다**. SPA pageview나 가짜 경로로 CTA/저장을 대신하지 않는다. [공식 FAQ](https://developers.cloudflare.com/web-analytics/faq/).
- 기존 Native 이벤트는 `first_open`/`record_created`/`auth_sign_in` 계약이 있으나 설치 식별자를 요구하고 Web 전송은 제외한다. 기존 식별자 없는 Web을 Native 설치처럼 등록하거나 고정 가짜 사용자 ID로 이벤트/사용자 수를 오염시키지 않는다.
- 기존 Pages console 로그는 영구 저장되지 않아 전환 추이 집계 저장소로 사용하지 않는다. [Pages 로그 한계](https://developers.cloudflare.com/pages/functions/debugging-and-logging/).
- 따라서 Android/iOS store CTA·Web 시작·Web 저장 ACK의 **운영 이벤트 수집은 아직 미구현/미활성**이다. 국가/유입 집계는 기존 CF 기준선을 유지하지만 전환별 국가/유입 연계·고유 사용자·최초 가입·D1/D7은 미측정이다. source callback 준비를 수집 완료로 표시하지 않는다.

사용자의 “신규 식별자나 추적 저장이 필요하면 개인정보 및 동의 요건을 먼저 확인하고 임의 활성화하지 말라”는 조건에 따라 새 저장 경로를 선택하기 전 활성화하지 않았다. 기존 승인된 무식별 집계 경로가 있다면 그 경로를 우선 지정받는다. 대안인 기존 개인 Cloudflare 계정의 Analytics Engine은 [무료 범위/가격](https://developers.cloudflare.com/analytics/analytics-engine/pricing/) 및 [3개월 보존](https://developers.cloudflare.com/analytics/analytics-engine/limits/)을 확인했지만 **dataset/binding/API token 생성·요금제 변경·데이터 쓰기0**이다. 무료 범위를 넘는 유료 사용을 자동 허용하지 않는다.

**검토 가능한 최소 payload 제안(미활성):** event enum(Android store CTA / iOS store CTA / Web start / first create ACK observed in page), UI language(en/ko/ja/unknown), country bucket(US/KR/JP/other/unknown), source bucket(direct/search_google/search_bing/chatgpt/social/internal/other/unknown). 서버 timestamp 외 고유 식별자 없음. country는 기존 edge 국가의 대리값이며 거주 확인이 아니다. full referrer/URL/query/UTM·기록 ID/본문/제목·email·계정 UUID·operation ID·인증정보·IP 원문·fingerprint를 payload/index로 쓰지 않는다. country/source 수집 방식과 누락, 공개 고지의 목적·보존·제공자·권리 및 적용 동의/GPC/DNT 처리부터 확정해야 한다. 무쿠키라는 이유만으로 동의 불필요를 단정하지 않는다. callback provider referrer를 원래 검색 획득 경로로 바꾸거나 OAuth를 넘는 추적 저장을 임의 추가하지 않는다.

### Web 첫 기록 성공 판정 준비 (운영 연결0)

별도 개인 App branch **feat/web-conversion-observer-20261031**, source **dc4ed015d7348d6a5d9e94217b4a0af3ca1607ed**에 Web 전용 `ObservedWebRecordsClient`와 신규 격리 검사만 보존했다. main entry/client/controller/공유 sync·모바일 파일은 수정하지 않았고 import/주입·새 웹 빌드·운영 bundle 교체0이다. 외부 전송·식별자 생성·browser storage 추가0.

제안 관측은 기존 `save()`의 인증 PUT200 및 JSON 파싱 성공 **이후**, 같은 기존 auth scope이고 신규 생성 expectedRevision0/revision1·반환 document가 요청과 깊은 동등·삭제가 아닌 경우에만 내용/인자를 받지 않는 callback을 호출한다. scope는 요청 중 메모리에서만 비교하고 sink에 전달하지 않는다. `_reported`는 현재 client 인스턴스 메모리에만 있어 중복 ACK/추가 create에 페이지당1회이며 새 추적 식별자나 저장 표식이 아니다. HTTP/network/parse/timeout·mismatch·수정·삭제·계정 변경에는 집계0, 분석 scope/sink 예외는 기존 저장 응답을 바꾸지 않는다.

**중요한 범위:** 이것은 “현재 페이지에서 처음 관측한 서버 확인 신규 생성”이며 **계정 생애 최초 기록/고유 첫 기록 사용자 수가 아니다**. reload/다른 기기/과거 pending ACK·삭제 이력 등은 이 메모리만으로 완전히 중복 제거할 수 없다. 10/30/100 목표를 계산하려면 기존 서버 계정 이력에 대한 별도 승인된 내부 집계 근거가 필요하며 계정 UUID를 외부 이벤트로 보내 해결하지 않는다. 아직 수집도 연결하지 않았으므로 운영 이벤트/실제 고유 사용자 모두 미측정이다.

신규 격리 테스트 **6 PASS**, scoped Dart analyze clean: ACK 전0/정상 ACK후1/재수신 중복0, HTTP401/409/503·offline/parse·mismatch0, edit/delete/owner 전환0, timeout 뒤 늦은 응답0, 관측 scope 예외와 sink 예외에서 저장 결과 유지. 합성 메모리 transport만 사용했고 운영 사용자/API 쓰기0. 기존20/44 전체 반복0, 기존 인증·기록·동기화 runtime 소스 diff0 및 운영 Web marker/hash 동일을 확인한다.

### 배포·백업·복구 및 남은 조건

**실제 SEO 운영 배포 완료:** Site **761a3534e89e37c3b1a9bc85155b9f1deac920a9**, Pages **4dce72da-074f-40d8-aab2-aa37debf69be**, GitHub Cloudflare Pages check **124414022669/completed/success**. 영어 schema 현재 소개와 일치, en/ko/ja 홈200·언어·각3개 Web CTA 및 store href PASS, ko/ja HTML은 배포 전과 동일, robots/sitemap 원문 동일, app/callback200/noindex/no-store, 비인증 records API401 PASS. 운영 Web source **0eaca55** 및 실제 main.dart.js SHA **0f88ca2828ca57a64ec9f47225de0e7a75cbe31a4234a7e66430b3471aaab690** 불변으로 기존 인증·기록·동기화 runtime 변경0 확인. 실제 기록 쓰기·새 provider 인증 조작0, 기존 실제 UI12/API12 증거 재사용. regression/rollback 필요0. **전환 계측 운영 배포는 하지 않았으며 이번 전체 계측 목표는 미완료**다.

SEO 한 필드의 기존 Git→Pages 배포만 실행하며 전환 계측 준비 코드는 운영에 포함하지 않는다. 정상 source archive **D:/Development/Personal/noveraflow/phase2-evidence-20261031/site-8cb4c05-before-measurement.tar**, **65,402,880 bytes / SHA256 b495cb6a633550ddb0c0ab45b7097761840644e4c9e89fc18b9a48b496382f9d**. 실제 운영 기준 e4cbe8d/Web0eaca55와 복구 Pages **69535c7e-6266-4dd6-b324-6cbc07a2f562**의 marker/main SHA **0f88ca2828ca57a64ec9f47225de0e7a75cbe31a4234a7e66430b3471aaab690** 일치를 배포 전 확인했다. archive는 코드 복구본이며 DB/기록 백업으로 주장하지 않는다.

회귀 시 Pages 정상69535c7e로 rollback하거나 **git revert 761a3534e89e37c3b1a9bc85155b9f1deac920a9** 후 개인 main 일반 push한다. DB/사용자 기록 복원·reset/force push는 하지 않는다. 남은 조건: 저장 경로 선택과 개인정보/동의 검토·최소 CTA 수신/집계 구현·관측 hook 연결·변경 부분의 이벤트 언어/중복/ACK 및 통합 회귀·운영 수신 검증. 실제 첫 사용자 수·새 영어 색인 반영은 계속 미측정/미확인이다.


<a id="phase2-search-measurement-20261031"></a>
## 2026-10-31 Phase 2 미국 검색·유입 측정 준비 — 실제 관측 기준선

### 범위와 관측 조건

운영 Site **e4cbe8d94ef0d0ac3ce058b157c74376582a9718** / Web **0eaca551769cddfcfd55fe4a50ecccff926a2995**를 읽기 전용으로 확인했다. 개인 Google 계정의 기존 Search Console 도메인 속성 `noveraflow.com`과 개인 Cloudflare 기존 Web Analytics를 사용했다. 아래 실측은 과거의 “접근/실측 미확보”를 갱신하며 과거 배포 이력을 변경하지 않는다. 코드·계측·운영 배포·DB·사용자 기록·모바일·결제·스토어 제출·광고 변경0, 신규 서비스/SDK/시장·경쟁 재조사0. 기존 사이트20/Web44 및 실제 UI12/API12·영어 callback 검증은 재사용하고 반복하지 않았다.

### Google Search Console: 색인과 미국 검색

| 항목 | 실제 관측 | 해석/제약 |
| --- | --- | --- |
| 페이지 색인 보고서 | 마지막 업데이트 **2026-10-23**, 색인28 / 미색인17 | 최신 공개 영어 문구의 색인 완료 증거가 아님 |
| 미색인 사유 | redirect7, 사용자 canonical 없는 중복4, noindex2, 적절한 canonical 대체2, redirect error1, 404 1. 발견/크롤링 후 미색인 각0 | 정상 제외와 오류를 구분. redirect error1·중복4의 개별 URL/원인 후속 확인 필요 |
| 영어 홈 URL 검사 | `https://noveraflow.com/` Google에 등록/색인됨. 마지막 크롤링 UI **2026-10-30 오전2:34:28**, Googlebot 스마트폰, 크롤링·색인 허용, 가져오기 성공 | 사용자 canonical=root, Google canonical=검사 URL. 실시간 테스트/색인 요청하지 않음; UI 시간대 별도 미확인 |
| Sitemap 보고서 | `/sitemap.xml` 제출10/18, 마지막 읽기10/29, 성공, 발견24 / 동영상0 | URL 검사 세부의 sitemap “일시적 처리 오류” 표시는 별개로 남김. 제출 실패로 단정/재제출하지 않음 |
| Web 검색, 미국, 최근28일 | 차트 명시 기간 **2026-10-01~10-28**, 노출**11**, 클릭**0**, CTR0%, 평균 게재순위21.5 | 국가=미국 필터. 확인 당시 최종 업데이트4.5시간 전. 배포10/31 이전 자료 |
| 미국 공개 검색어 행 | **novoflow**, 노출3 / 클릭0, 표시1행 | 전체11 중 나머지8은 공개 query에 귀속 불가. 비공개/집계 제한을 고려; 전 검색어 목록으로 간주하지 않음 |
| 동일28일 전체 국가 | 노출44 / 클릭3 / CTR6.8% / 평균11.3 | 미국 값과 혼합하지 않음 |

`Journaling App` 핵심, `Free Journaling App`·`Self Reflection App` 보조는 잠정 실행 키워드로 유지한다. 해당 미국 query 행은 관측되지 않았으며 검색량0/수요없음으로 해석하지 않는다. **미국 월 검색량은 여전히 미확보**다. GSC는 시장 전체 검색량이 아니라 속성 실적이며, 이번 영어 배포의 효과·새 문구 색인·인과관계는 아직 미확인이다. [Google 실적 보고서 정의](https://support.google.com/webmasters/answer/7576553?hl=en).

### 공개 검색 설정과 ChatGPT 검색 크롤러

- 운영 robots200: `User-agent: *` / `Allow: /` / `Sitemap: https://noveraflow.com/sitemap.xml`, 저장소 원문 동일. sitemap200·24 URL·저장소 동일·앱 경로 제외. 공개24문서 모두 canonical·Content-Language·4개 hreflang 일치(24/24).
- OAI-SearchBot **User-Agent 문자열을 사용한 홈 GET200**. robots는 접근을 허용한다. 실제 OpenAI IP의 WAF 통과/방문 로그·ChatGPT 색인·노출·인용은 **미확인**이며 문자열 응답만으로 보장하지 않는다. 필요 시 기존 Cloudflare 집계/보안 로그에서 공식 IP 범위와 대조하는 읽기 확인을 후속으로 수행한다.
- **GPTBot 정책 변경0**. 현재 wildcard 정책을 그대로 유지했다. 검색용 OAI-SearchBot과 학습용 GPTBot은 별개다. [OpenAI 공식 bot 안내](https://developers.openai.com/api/docs/bots).
- `/app/?lang=en`200 + `X-Robots-Tag: noindex,nofollow` / `Cache-Control: no-store` 유지. 개인 기록·인증 경로 보호는 기존 배포 검증을 재사용하며 성장 측정에 기록/토큰을 반출하지 않는다.

### 영어 CTA 실제 목적지와 언어

| CTA | 운영 href / 실제 응답 | 언어 및 측정 한계 |
| --- | --- | --- |
| Android | `https://play.google.com/store/apps/details?id=com.moolsoft.noveraflow`, GET200·동일 최종 URL | 명시적 hl=en 없음. 영어 요청에서도 계정/브라우저/스토어 설정에 따른 표시 가능; 영어 UI 강제 보장 불가 |
| iOS | `https://apps.apple.com/app/id6792970947`, GET200 → `https://apps.apple.com/us/app/noveraflow/id6792970947` | 관측 요청은 en-US. href에 명시적 언어값 없음; 모든 사용자의 영문 스토어 표시 보장 불가 |
| Web | `/app/?lang=en`, 영어 홈3개 시작 링크, GET200 | 영어 명시 전달. 직전 실제 영어 홈→CTA→로그인/기록 및 lang 없는 OAuth callback 영어 유지 PASS 재사용. 이번 새 로그인/가입 조작0 |

무료 일기·생각 정리·자기 성찰 및 실제 플랫폼 안내는 기존 개선분을 유지한다. 스토어 href에 캠페인 식별자 없고 `js/landing.js`·언어 스크립트에 CTA click 이벤트 없다. 링크 정상 응답은 이동 횟수·설치·가입·첫 기록의 증거가 아니다. OAuth 공급자 자체 화면 언어와 앱 복귀 후 영어 상태를 구분한다.

### 기존 분석 도구: 무엇을 실제 측정할 수 있는가

Cloudflare Web Analytics 기존 태그는 admin 하위 도메인도 포함한다. 관측 당시 최근24시간(GMT+9), 봇 제외=Yes 전체21방문 중 root host18 / admin3이므로 **Host equals noveraflow.com** 필터가 필수다. 공용 host 최근24시간 미국5방문은 모두 직접 유입, 경로 `/privacy`3·`/`1·`/account-deletion/`1, 브라우저/OS Unknown5였다.

필터 **Host=noveraflow.com / Country=United States / bots excluded Yes / 최근7일(GMT+9)**의 안정화된 화면은 **46방문**, 직접46, 경로 `/privacy`30·`/account-deletion/`9·`/`7, 브라우저 Unknown42/ChromeDerivative4, OS Unknown42/Linux4, Desktop46이었다. 이 기간의 표시 referrer에 검색 엔진이 없지만 referrer 유실·분류 한계를 고려하며 검색 유입 전체0으로 단정하지 않는다. 운영자/테스트 제외 coverage 미확인이고 visits는 실제 고유 사람 수가 아니므로 **46명의 미국 사용자/실제 첫 기록 사용자로 집계하지 않는다**. GSC10/1~28과 rolling7일은 기간·시간대·정의가 달라 전환율 계산 금지. [Cloudflare 지표](https://developers.cloudflare.com/web-analytics/data-metrics/high-level-metrics/), [차원](https://developers.cloudflare.com/web-analytics/data-metrics/dimensions/).

| 지표 | 현재 재사용 가능한 근거 | 구현/확인 필요 |
| --- | --- | --- |
| 미국 방문 | CF 국가·host·경로·referrer·기간별 visits 실측 가능 | 실제 사람/내부 테스트 제외·영어 UI별 분리 미확인. US IP 집계는 거주 확인 아님 |
| 검색 유입 | GSC 미국 노출/클릭/query; CF referrer 분류 | 서로 다른 정의/기간. 사용자 단위 여정 join 없음; query 비공개 영역 unknown |
| 스토어 이동 | 목적지 응답/기존 스토어 자체 보고 경로 | CTA 클릭/채널별 outbound 계측 없음. Store Connect/Play 실제 캠페인 보고 권한·수치는 이번 미확인 |
| 웹 시작 | CF `/app/` 경로 도착은 대리 지표 | 직접 방문/북마크 포함; 시작 CTA 클릭 및 locale별 전환과 같지 않음. 미국7일 표시에 app 경로 없음도 가입0 증거 아님 |
| 신규 가입 | Native `account_auth_controller.dart`에 `auth_sign_in` emitter 존재 | 과거 “emitter0” 설명 정정. stage/outcome/provider는 로그인/복원과 신규 계정을 구분 못함. 공개 버전별 runtime coverage·신규 가입 수 미확인 |
| 첫 기록 | Native 저장 성공 후 best-effort `record_created`; `first_open`·`history_opened` 재사용 후보 | `EventLogger`는 kIsWeb이면 전송하지 않음. Web 전용 entry에도 해당 emitter 없음. 설치/이벤트 수는 계정별 첫 성공 사용자 아님; ACK·retry 중복·cohort 계측 필요 |
| 재방문 | Native history 이벤트의 관측 범위 집계 후보 | CF visits는 사용자 유지율 아님. 계정 cohort D1/D7·전체 활동 coverage·공개판 실제 집계 미확인 |

현재 Native 국가 분석은 익명 설치 ID와 **최신 기기 locale 국가 접미사**의 대리값이다. en-US≠미국 거주/위치이며 재설치·기기별 중복/guest-login 미구분을 유지한다. Admin `usage-statistics.js`도 가입/계정DAU·WAU·MAU/실제 국가/세션 리텐션을 unavailable로 명시한다. auth aggregate의 **최소20 표본·365일 보존** 등 기존 보호를10명 목표 때문에 낮추지 않는다. 이 소스 확인은 실제 운영 이벤트 수/공개판 coverage 확인을 대신하지 않는다. 실제 적격 첫 기록 사용자 **10/30/100 모두 미측정**, 기존 운영자 연결 기록12건은 사용자12명이 아니다.

### 10 → 30 → 100명을 위한 최소 후속 개선안 (이번 미구현)

1. **기준선 운영:** 같은 기간·시간대·root host·US 필터로 GSC/CF를 주기 비교하고 브랜드/비브랜드·Unknown·내부/시험 제외 여부를 별도 표기한다. 새 영어 문구 색인은 후속 URL 검사에서 확인한다. redirect error1/중복4의 URL부터 읽기 확인한다. 검색량 미확보는 배포/실험 차단 조건으로 추가하지 않는다.
2. **가장 작은 전환 계측:** 기존 인프라로 Android/iOS/Web CTA·배치·UI언어의 최소 집계 가능성을 먼저 설계한다. 공식 스토어 발급 캠페인 링크/보고를 우선 검토하고 Apple token을 추측하지 않는다. 도착/클릭/설치/가입을 별개로 보고, 기존 내비게이션·인증·저장/동기화를 막지 않는다. 실제 추가 구현은 별도 승인 범위이며 이번 링크/코드 수정0이다.
3. **10명:** Web 한 경로부터 신규 계정과 기존 로그인, 최초 성공 저장(로컬 durable commit과 서버 ACK 상태 별도), 재시도/가져오기/복원/수정/시험 제외 기준을 정하고 기존 계정 식별을 내부 집계에만 재사용하는 최소안을 검토한다. 미국/영어 적격 근거 없으면 US unknown으로 남긴다. 필요 시 자발적 동의 파일럿의 국가 확인 방식을 별도 검토하며 이번 개인정보 수집0. 비운영 검증·coverage 확인 뒤 실제 첫 성공10명을 판단하고 막힘/자발적 의견을 우선 개선한다.
4. **30명:** 같은 정의의 첫 기록 cohort에서 관측기간이 찬 D1/D7 재방문·새 두 번째 기록·이탈/지원 시간을 비교한다. 결측/미성숙 cohort 제외를 명시하고 반복된 가장 큰 장애 한 가지를 개선한다.
5. **100명:** 중복/내부/봇/시험을 제외한 적격 첫 기록100명과 coverage·재방문·재작성·지원 비용을 함께 검토해 계속/수정/중단을 결정한다. 방문/설치/로그인 수로 목표를 대체하거나 성공 시점을 약속하지 않는다.

기록 본문·감정·AI 대화·email·raw UID·인증정보·상세IP·fingerprint·민감 URL query를 성장 이벤트/외부 분석에 추가하지 않는다. 기존 동의·보존·삭제 정책과 최소 표본을 유지하며 새 SDK/유료 서비스 없이 가능한 범위를 우선한다. 미국 거주/최초 기록/재방문 실제 실측과 모바일 과거 로컬 기록 전체 대조는 남은 과제다. 후자는 별도 이전 과제이며 검색 준비의 필수 조건이 아니다.

### 문서·Git 및 운영 인계

개인 GitHub API owner `moolsoft-stack`/User, Site·Docs origin의 `github-personal:moolsoft-stack` namespace 및 실제 SSH 인사 `Hi moolsoft-stack`를 확인했다. author/committer는 `moolsoft-stack <moolsoft@gmail.com>`로 명시한다. 회사 adcomlab 자원 접근/혼용0. 원래 dirty worktree는 보존하고 clean worktree의 관련 문서만 commit·push한다. Site 문서 commit은 **[CF-Pages-Skip]**으로 운영 배포를 방지하며 Docs의 기존 roadmap JSON은 MASTER 출처 commit 갱신용 문서 투영만 재생성한다.

이번 운영 변경/새 백업/새 배포0. 기존 운영 Pages **69535c7e-6266-4dd6-b324-6cbc07a2f562**와 정상 archive `D:/Development/Personal/noveraflow/phase2-evidence-20261031/site-e183767-before-english-resume.tar` 및 rollback Pages **752537f5-36b9-4e5d-91b7-892d0073013f**(source80bf845/webd756ac8)를 유지한다. 상세 SHA/복구 절차는 기존 배포 완료 절을 따른다. 현재 조사에서 숫자/coverage가 없는 항목은0이 아니라 미확인이다.

<a id="phase2-english-resume-completed-20261031"></a>
## 2026-10-31 영어권 웹 개선 운영 재배포 완료 — 실제 UI12/API12 사후 확인

**이번 합의 범위 완료: DEPLOY PASS / AUTHENTICATED_READ_PATH PASS / RECORD_PROTECTION PASS(연결12건) / ROLLBACK NOT_REQUIRED.** Site **e4cbe8d94ef0d0ac3ce058b157c74376582a9718**, web **0eaca551769cddfcfd55fe4a50ecccff926a2995**, Pages **69535c7e-6266-4dd6-b324-6cbc07a2f562**, GitHub Cloudflare check **124405410233 / success**. 실제 운영 release는 **web-20261031-english-entry-v2**, main SHA256 **0f88ca2828ca57a64ec9f47225de0e7a75cbe31a4234a7e66430b3471aaab690**다. 후속 Site 문서 commit은 [CF-Pages-Skip]으로 중복 배포하지 않는다. 아래 과거 모바일 대조 차단/미배포/롤백 기록은 이 재개 결정 전 이력이다.

- **실제 운영 브라우저:** 기존 로그인된 Default Chrome의 별도 NoveraFlow 창에서 en/ko/ja 각각 홈의 언어별 시작 CTA→기록 메뉴를 확인했다. **각12건 / 검색어 비어 있음 / 더 보기0 / 실제 스크롤로 표시 날짜2026-10-27~31 / 서버 확인 완료 / 전송 대기0·충돌0 / 로그인 상태 유지**가 모두 PASS다. 기록 선택·본문 입력·저장·삭제·로그아웃은 조작하지 않았다. 현재 창은 영어 기록 목록으로 남겼다.
- **인증된 운영 API:** 배포 전·후 동일 브라우저 세션을 브라우저 안에서만 사용한 **GET200 / records12·active12·삭제표식0 / nextCursor null / q 빈값·after0·includeDeleted1 / ID오름차순 / createdAt2026-10-27~31**를 직접 읽었다. 세션↔캐시 owner와 API↔캐시 ID/revision12개 일치. token/UID/본문을 브라우저 밖으로 내보내지 않았다. 예전의 SQL 기대12·로그GET200만으로 판정한 한계를 이번 직접 응답으로 보완했다.
- **기록 보호:** 앞서 확인한 서버·IndexedDB12건 ID/revision/내용SHA 일치·삭제/누락/충돌/전송 대기0을 재사용한다. 이번 운영 READ ONLY 사후 집계도 **current12 / revision13 / 배포 전 실제 읽기 시작(2026-10-31T01:43:16Z) 이후 기록 revision 추가0**이다. 운영 사용자 기록 생성·수정·삭제·강제 이전0, 운영 DB/키/모바일 앱/결제/구독 변경0.
- **영어 로그인·OAuth 언어:** 별도 익명 프로필에서 운영 영어 Google/Apple 로그인 버튼과 lang 없는 기존 callback의 영어 유지 PASS. 실제 기존 사용자 세션의 en/ko/ja 계정 접근·목록·인증 GET PASS. 새 provider 로그인/가입·로그아웃·운영 저장/양방향 쓰기 시험은 수행하지 않았다. provider/PKCE/callback 및 기록 client/store/sync는 d756ac8과 동일한 로직이다. 기존20/44 PASS와 빌드 결과를 재사용했고 재실행·재빌드0이다. marker의 과거 actualStandaloneSignup/Offline/Bidirectional/actualPostDeploymentAcceptance NOT_RUN 필드는 이 미실행 수용 범위를 유지하며, 이번 실제 읽기 경로 PASS는 이 절과 운영 증거로 별도 관리한다.
- **공개 사이트/검색:** 기존 영어 홈페이지·일기/생각 정리/자기 성찰·무료/플랫폼 범위·Android/iOS/Web CTA·제목/description을 재적용했다. 실제 en/ko/ja 홈200·각 언어 CTA, canonical/hreflang 유지, robots/sitemap 원문 불변, 앱/callback/records 비색인/no-store, API health200·비인증401 PASS. 새 SDK/유료 분석/시장·경쟁 조사 없음. 키워드3개는 잠정 선정·미국 검색량 미확보 유지, Phase2 전체 성장 성과 완료를 뜻하지 않는다.
- **백업·복구:** D:/Development/Personal/noveraflow/phase2-evidence-20261031/site-e183767-before-english-resume.tar, **64,983,040 bytes / SHA256 80aea21d5acda58a614c5f4a7cd4b7198bb447e230665d3096cc109208388579**. 배포 전 전체 정상 source e183767의 Git archive이며 사용자 기록/DB backup으로 주장하지 않는다. 기존 d922b19 archive도 보존했다. 복구점 **Pages752537f5-36b9-4e5d-91b7-892d0073013f / site80bf845 / web d756ac8 / JS b0d27f55**의 실제 marker 접근을 재확인했다. 중대한 회귀면 해당 Pages 정상본으로 즉시 복구하거나 새 site commit **e4cbe8d94ef0d0ac3ce058b157c74376582a9718**의 코드 변경만 되돌려 일반 main push한다. 후속 문서 충돌이 있으면 현재 운영 증거를 보존하고 코드만 복구한다. force/reset·DB 복원/원본 overwrite는 하지 않는다. 이번 rollback0이다.
- **증거/도구:** 기존 phase2-evidence-20261031 아래 operational-path-before-redeploy.json, operational-path-after-redeploy.json, english-resume-preflight.json, english-resume-deployment.json, english-resume-anonymous/report.json. 실제 기록 화면 캡처나 원문/계정/token은 남기지 않고 집계만 보존했다. 도구의 로컬 경로·예약 변수·로드 완료 대기·접근성 null·다른 Chrome 창 구분/콘솔 응답 대기를 보정한 뒤 최종 미해결 검증 실패0이며, 제품이나 기록 로직을 이를 이유로 수정하지 않았다.
- **범위 변경/남은 과제:** 최신 사용자 결정으로 **모바일 과거 로컬 기록 전체 대조는 별도 이전 과제이며 이번 영어 배포 gate가 아니다**. 모바일 원본의 전체 날짜/개수·가져오기/제외/미지원 범위는 여전히 미대조다. 실제 신규 provider 로그인·가입/로그아웃·운영 쓰기·실기기 동기화는 미실행으로 남기고 추가 쓰기 시험은 기존 승인된 비운영 계정만 사용한다. 기존11건 이후 최초 저장1건으로 현재12건 차이가 설명됨과 모바일 과거 기록의 원인을 혼동하지 않는다.
- **개인 Git:** SSH Hi moolsoft-stack, Site 공식 owner=moolsoft-stack/User와 개인 Site/App/Docs/Admin namespace·기존 작성자를 확인했다. 이번 작성자/committer도 moolsoft-stack <moolsoft@gmail.com>, 회사 adcomlab 사용0. 기존 미커밋 변경은 격리 worktree로 보존했고 이번 배포/문서만 commit/push하여 원격 SHA를 확인한다. 앱 소스0eaca55는 기존 feature branch에 그대로 보존하며 모바일 main은 변경하지 않는다.


<a id="phase2-english-resume-20261031"></a>
## 2026-10-31 영어 개선 재개 — 실제 운영 UI12·인증 API12 확인

최신 사용자 범위에 따라 **모바일 과거 로컬 기록 전체 대조는 별도 이전 과제**이며 이번 영어 사이트 배포의 필수 조건에서 제외한다. 아래 이전 모바일 대조 차단/재배포 보류는 이 결정 전 이력이다. 현재 정상 web d756ac8에서 실제 Default Chrome의 기존 로그인 세션으로 기록 메뉴만 열어 **12개의 기록·빈 검색어·더 보기0·표시 날짜2026-10-27~31·서버 확인 완료·전송 대기0·충돌0**을 읽었다. 같은 브라우저 메모리의 기존 세션을 사용한 records **GET200 / records12·active12·삭제표식0·nextCursor null / q 빈값·after0·includeDeleted1 / ID오름차순**을 확인했고 API↔캐시 ID/revision12개와 세션↔캐시 owner가 일치했다. token/UID/본문은 브라우저 밖으로 내보내지 않았으며 입력·저장·수정·삭제0이다. 서버·IndexedDB12건 내용SHA 일치·삭제/누락/대기/충돌0의 앞선 결과를 재사용한다.

영어 홈페이지/title/description·무료/지원 범위·Android/iOS/Web CTA·언어 전달을 포함한 기존 site53c5501의 문서 외41개 경로와 web source **0eaca551769cddfcfd55fe4a50ecccff926a2995**를 재사용한다. 새 기능 코드·기록 client/store/sync·OAuth provider/PKCE/callback·모바일 공통 코드·DB·결제·구독 수정0. 새 웹 main SHA256은 기존 검증본 **0f88ca2828ca57a64ec9f47225de0e7a75cbe31a4234a7e66430b3471aaab690**와 일치하며 빌드·기존 사이트20건/웹44건은 반복하지 않는다. 배포 marker만 v2·재개 근거/직전 기준으로 갱신한다. 배포 전 운영 경로 집계는 `phase2-evidence-20261031/operational-path-before-redeploy.json`이다.

현재 정상본 전체 archive: **D:/Development/Personal/noveraflow/phase2-evidence-20261031/site-e183767-before-english-resume.tar**, **64,983,040 bytes**, SHA256 **80aea21d5acda58a614c5f4a7cd4b7198bb447e230665d3096cc109208388579**. 기존 d922b19 archive도 보존했다. 실제 접근한 정상 Pages **752537f5-36b9-4e5d-91b7-892d0073013f / source80bf845 / web d756ac8 / JS b0d27f55**와 일치한다. 중요 인증·12건 조회 회귀 시 해당 정상 Pages로 복구하거나 이번 배포 commit만 revert하여 일반 main push한다. 개인 main Git 통합만 사용하고 운영 설정/DB/키/사용자 기록은 복구 대상으로 쓰지 않는다. 실제 배포 revision과 사후 결과는 위 최신 재배포 완료 절로 확정했다.

<a id="phase2-record-scope-readonly-20261031"></a>
## 2026-10-31 기록 범위 읽기 전용 조사 — 웹 12건 정합 / 모바일 과거 기록 대조 대기 / 재배포 없음

최신 판정: **조사한 계정의 서버↔브라우저 12건 정합 PASS / 모바일 과거 기록 미표시 원인 최종 확정은 BLOCKED / 영어 개선 재배포 안 함**. 아래 이전 완료·롤백 기록을 이 판정으로 대체하며 이력은 보존한다. 기존 영어 소스0eaca55·사이트53c5501은 후보로 보존하고 운영은 rollback80bf845 / web d756ac8을 유지한다. 사이트20건·웹44건과 기존 빌드/브라우저 전체 검사는 반복하지 않았다. 제품/모바일/인증/DB/결제/구독 코드 수정과 운영 사용자 기록 생성·수정·삭제·강제 가져오기는 없다.

### 확인한 원인과 범위 차이

| 구분 | 실제 확인 | 판정/한계 |
| --- | --- | --- |
| 로그인 계정 연결 | 서버 registry 한 계정, Supabase 기존 관리 GET200의 user와 owner 일치, 비익명 Google·Apple identity2개. 해당 owner와 브라우저 owner namespace도 일치 | 서버/저장소의 계정 대응 확인. 현재 브라우저 token의 유효성·새 OAuth 로그인 완료를 대신하지 않음. UUID/email/token은 출력·저장하지 않음 |
| 현재 서버 기록/이력 | READ ONLY로 current12건·revision13건·고유 record ID12개. 12건 복호화 성공/실패0, 대응 revision·내용 일치12, 이력에만 있고 current에 없는 ID0, current 대응 revision 누락0, 삭제 표식0 | 관측한 연결 기록12건의 이력 정합과 보존 확인. 모바일에만 존재하는 과거 원본의 완전성까지 증명하지 않음 |
| 이전 목록11건과 현재12건 | 기존 UI 관측 시각2026-10-31 08:04:48 KST까지 처음 저장된 ID11개, 그 이후 처음 저장된 ID1개·revision1개. 현재12개와 일치 | **11→12 차이는 서로 다른 관측 시점의 추가1건으로 설명됨**. 이번 조사에서는 쓰기0. 이전 UI에 보인11개만으로 누락이나 완전성을 판단한 방식은 폐기 |
| API 반환/페이지네이션 | 실제 운영 records.js/routes.js/runtime.js의 LF SHA가 기존 로컬 소스와 일치. record_id 오름차순으로101개 읽고100개 반환하며 continuation을 유지, 삭제/검색은 복호화 후 적용. 현재12건은 첫 페이지 한도 미만, 빈 q 기대 반환12·nextCursor null | **인증된 HTTP 응답 본문의 반환 건수를 이번에 직접 캡처한 것은 아님**. 최근 제한된 access log에서 collection GET200 49회 확인; body/건수는 로그에 없음. 코드·SQL 기대12와 실제 HTTP 응답 건수는 구분 |
| 웹 IndexedDB | Default의 NoveraFlow origin DB만 인증정보 없이 임시 격리 복사, 외부 요청 차단·readonly transaction. owner 일치, 캐시12/서버12, ID12·revision12·정규화 JSON 내용 SHA12 일치. 서버에만 있는 기록0/캐시에만 있는 기록0 | **현재 캐시에 서버 연결 기록의 조회 누락·내용 차이 없음**. 원본 DB 파일 SHA 전후 불변. 임시 기록 사본은 제거하고 비식별 집계만 보존 |
| 정렬·필터·동기화 | 검색어는 IndexedDB에 저장하지 않는 controller 메모리 상태이며 실제 열린 화면의 검색어는 미관측. 빈 검색어로 투영하면12건. createdAt 내림차순/동일 시 id 내림차순. syncScanComplete=true/cursor 없음, pending0/conflict0/blocked0/localOnly0/paused=false, 미저장 초안 차이 없음 | 캐시에 미완료 동기화는 없음. 실제 화면의 비어 있지 않은 검색어로 가려졌을 가능성은 이 캐시 조사만으로 배제하지 않음 |
| 모바일 로컬 과거 기록 | 서버/웹12건의 createdAt 범위2026-10-27~31, 서버 첫 저장일 이전 createdAt0. 기존 안정 bulk-copy ID 범위의 서버 기록0. 소스의 legacy device archive와 계정 연결 저장소는 분리되어 있고, 과거 기록은 명시적 가져오기/동의 후 사본으로 연결. 사진·음성·이벤트/비지원 문서·충돌 등은 제외 또는 보존/격리 | **미이전/미지원에 의한 범위 차이 가능성이 소스로 확인됨**. 그러나 연결 모바일 기기0이고 실제 과거 원본·가져오기 상태를 읽지 못했으므로 제보 원인을 미이전으로 확정하거나 데이터 유실을 전면 부정하지 않음 |

계정 NF device link11행은 기기ID 연계 행 수이며 물리 기기11대나 기록11건이라는 뜻이 아니다. 실제 사용 기기 수/전체 모바일 원본 수로 해석하지 않는다.

### 보호·검증 및 실제 차단 조건

- 운영 호스트는 기존 전용 개인 SSH key와 NoveraFlow release 경로로 확인했다. 실제 Admin cwd는 `/opt/noveraflow-releases/admin-b9e6bb4-usage-tabs-20261030-release/backend`이며 과거518ea9b 경로를 현재 런타임으로 오인하지 않았다. records/routes/runtime의 현행 해시는 대조 일치, Auth verifier 파일 전체는 이전 소스와 다르므로 동일 파일이라고 주장하지 않는다. 현행 코드는 관리형 Auth의 검증된 user.id를 subject로 사용함을 확인했다. 서버 재시작/배포/설정 변경0.
- 모든 운영 SQL은 **BEGIN READ ONLY**와5초 statement timeout에서 SELECT만 수행했다. 기존 key loader로 호스트 메모리 안에서만 복호화/해시 비교하고 키를 제거했으며 본문·ID·UID·secret·cookie/token을 로그/MD/Git으로 내보내지 않았다. Supabase도 기존 사용자 조회 GET만 사용했고 token 발급·새 로그인·계정 변경0이다.
- 추가 검증은 이12건의 현재 집계·이력 대조·원본 불변 IndexedDB 격리 사본 대조뿐이다. 원본 브라우저를 띄워 자동 동기화를 실행하지 않았고 격리 브라우저에는 쿠키/LocalStorage/Auth를 복사하지 않았다. 읽기 요약은 `D:/Development/Personal/noveraflow/phase2-evidence-20261031/read-only-indexeddb-summary.json`, 재현 절차는 같은 위치의 `read-only-indexeddb.mjs`다. 민감한 임시 사본은 제거됐다.
- 기존20/44 PASS는 영어 UI/인증 callback·합성 기록/저장·오프라인/충돌 회귀의 기존 증거로만 재사용한다. 0eaca55는 웹 전용 언어/UI와 관련 테스트 변경이며 기록 client/store/sync·모바일 공통 코드 수정이 아니다. 이번에 재현된 제품 결함이 없어 추측 수정·추가 빌드·동일 검사를 실행하지 않았다. 기존 승인 비운영 계정의 새 실제 OAuth/쓰기 시험은 실행하지 않았다.
- **재배포를 막는 실제 조건:** 제보된 모바일 과거 기록의 날짜/개수·원본 존재·로그인 owner·연결 시점·가져오기 version/진행/제외/오류를 대조할 기기 또는 기존 승인된 읽기 자료가 없다. 또한 인증된 실제 records HTTP 응답 건수·현재 로그인 경로를 직접 관측할 지원 연결이 없다. 저장/동기화가 필요한 추가 수용은 기존 승인된 비운영 계정만 사용하며 해당 인증 연결 없이 임의 계정 생성·운영 쓰기로 대체하지 않는다.
- **해결 순서:** 먼저 제보가 ‘모바일 과거 기록만 웹에 없음’인지 ‘이전에 웹에 있던 연결 기록이 사라짐’인지와 날짜 범위를 확인한다. 전자는 원본을 수정하지 않고 legacy/연결 이후 기록·bulkImport/mapping/excluded/blocked/pending 상태를 집계해 미이전·미지원 여부를 확정한다. 후자는 해당 ID의 기존 이력/서버/캐시·필터/커서와 API 응답을 읽기 전용으로 대조한다. 결함이 확인될 때만 최소 수정과 기존 승인 비운영 계정 검증을 수행한다. **운영 강제 이전/입력/삭제는 해결책으로 사용하지 않는다.**
- 운영 배포 조건 미충족이므로 **영어 개선 재배포0**. 현재 운영 marker는 web d756ac8 / b0d27f55050616cbfc4c01c3a8fa51be4d7ee51ef8a0c5720981e6e7973c267d이며 기존 rollback80bf845 / Pages752537f5를 유지한다. 보존된 site-d922b19-before.tar64,911,360 bytes와 기존 SHA/설정 복구 경로는 이전 절을 재사용한다. 새 운영 백업/DB 복원/배포/롤백을 실행하지 않았다.
- 개인 소유권: 새 SSH 응답 Hi moolsoft-stack, Site 공식 GitHub owner=moolsoft-stack/User, Site/App/Docs/Admin 원격은 github-personal:moolsoft-stack namespace다. 기존 개인 작성자와71.54.5의 private repo 소유권 증거를 재사용하며 회사 adcomlab 자원 사용0. 이번 MD 변경만 기존 개인 branch에 commit/push하고 원격 SHA를 확인한다.

> Phase2 첫 조사·공개 영어 사이트 실측과 추천 실행안은 [25절](#phase2-keyword-evidence-20261031)이다. 24절의 초기 미조사 상태와 구분한다.
> 2026-10-31 최신 실행 우선순위는 [24절 미국 Journaling App 진입](#us-journaling-growth-20261031)과 [글로벌 마스터](https://github.com/moolsoft-stack/noveraflow-docs/blob/docs/global-growth-20261031/MASTER_ROADMAP.md#global-growth-20261031)다. 21절은 로컬 구현 기록,22절은 당시 Production 적용 기록이며 서로 다른 날짜/범위로 보존한다. 아래 과거의 ‘미배포’ 문장을 현재 전체 사이트 상태로 재사용하지 않는다.

> 2026-10-18 Phase 1 로컬 구현: [21절](#21-2026-10-18-phase-1-로컬-구현)이 이번 변경의 기능 판정·구현·검증 기준이다.
> 10~20절은 구현 전 조사 기록으로 보존한다. Production에는 아직 적용하지 않았다.

> 2026-10-18 조사 갱신: [통합 검색 진단 및 개선 설계](#10-2026-10-18-통합-검색-진단-및-개선-설계)가 현재 SEO·ASO·GEO/AEO 조사 기준이다.
> 아래 1~9절은 브랜드 원칙과 과거 초안이다. 출시 상태, 언어 URL, 기능·구독 문구는 10절 이후의 검증 결과를 우선한다.

> Current role: active SEO direction document for `noveraflow-site`.
> Source philosophy: `C:\projects\projects-docs\OFFICIAL_DOCUMENT_SYSTEM.md`
> and `C:\projects\noveraflow-app\docs\BRAND_MANIFESTO.md`.
> SEO must explain the product clearly without exaggerating or changing the philosophy.

이 문서는 NoveraFlow 사이트의 SEO 작업을 진행하기 전에, 검색엔진과 AI 검색이 사이트의 목적을 명확히 이해하도록 돕는 기준 문서입니다.

NoveraFlow는 감성적인 브랜드 공간에 가깝지만, 검색엔진에게는 무엇을 제공하는 서비스인지 분명하게 전달되어야 합니다. 따라서 SEO는 키워드를 많이 넣는 방식이 아니라, 브랜드의 분위기와 실제 서비스 정의가 자연스럽게 함께 보이는 방향으로 진행합니다.

## 1. SEO의 기본 방향

NoveraFlow의 SEO는 사용자 경험과 검색 이해도를 동시에 고려합니다.

사용자에게는 조용하고 자연스러운 분위기를 유지해야 합니다. 사이트를 읽는 사람은 과한 마케팅 문구나 키워드 반복보다, 기록과 삶의 흐름을 편안하게 느낄 수 있어야 합니다.

검색엔진에게는 서비스의 정체성이 명확해야 합니다. NoveraFlow는 짧은 기록, 조용한 AI 피드백, 상징 성장, 삶의 흐름을 다루는 다이어리 서비스입니다. 이 핵심이 title, description, Open Graph, 구조화 데이터, 본문 문장 안에 자연스럽게 드러나야 합니다.

기본 원칙:

- 사용자에게는 감성적이고 편안한 문장
- 검색엔진에게는 명확한 서비스 정의
- 감성과 검색성을 함께 고려
- 키워드 나열식 SEO 지양
- AI보다 기록과 삶의 흐름을 중심에 둠
- 치료, 진단, 처방처럼 보이는 표현은 피함

## 2. 브랜드 핵심 키워드

브랜드 핵심 키워드는 NoveraFlow의 분위기와 철학을 설명하는 단어입니다. 이 키워드들은 본문, 메타 문구, OG 문구, 구조화 데이터에서 자연스럽게 사용할 수 있습니다.

주요 키워드:

- NoveraFlow
- flow
- life flow
- living patterns
- quiet diary
- reflection
- personal growth
- memory
- rhythm
- symbols
- emotional patterns

사용 방향:

- `flow`, `life flow`, `living patterns`는 NoveraFlow의 핵심 개념으로 사용
- `quiet diary`, `reflection`, `memory`는 사이트의 차분한 정체성을 설명할 때 사용
- `symbols`, `emotional patterns`는 상징 성장과 기록 흐름을 설명할 때 사용
- `personal growth`는 성취나 생산성보다 자기 이해에 가까운 의미로 사용

## 3. 실제 서비스 키워드

실제 서비스 키워드는 사용자가 검색할 가능성이 높은 표현입니다. 브랜드 문장 안에 자연스럽게 섞어야 하며, 반복적으로 나열하지 않습니다.

주요 키워드:

- AI diary
- journaling app
- digital diary
- self reflection
- daily record
- mood journal
- personal growth app
- mindful journaling
- life tracking

사용 방향:

- `AI diary`는 서비스 정의에 사용하되, AI가 전면에 나서는 느낌은 피함
- `journaling app`, `digital diary`는 검색엔진이 서비스 범주를 이해하도록 사용
- `self reflection`, `mindful journaling`은 기록의 목적을 부드럽게 설명할 때 사용
- `mood journal`, `daily record`는 기록 방식과 사용 맥락을 설명할 때 사용
- `life tracking`은 딱딱한 추적 도구처럼 보이지 않도록 신중하게 사용

## 4. 초기 사용자 중심 키워드

초기 사용자는 기록에 관심이 있고, 자신의 생각과 감정을 조용히 정리하고 싶은 사람들입니다. 이들은 강한 생산성 도구보다 부담 없는 기록 공간을 원할 가능성이 높습니다.

초기 사용자 예시:

- 기록 습관이 있는 사람
- 자기개발에 관심 있는 사람
- SNS 피로감을 느끼는 사람
- 감정과 생각을 정리하고 싶은 사람
- 조용하고 부담 없는 앱을 원하는 사람
- 짧은 기록을 꾸준히 남기고 싶은 사람

관련 키워드:

- quiet journaling
- mindful app
- reflection app
- minimal diary
- emotional journaling
- self improvement journal
- private diary

사용 방향:

- `quiet journaling`, `minimal diary`, `private diary`는 NoveraFlow의 부담 없는 분위기를 설명할 때 적합
- `reflection app`, `emotional journaling`은 감정과 생각을 정리하는 맥락에서 사용
- `self improvement journal`은 성과 중심보다 자기 이해 중심으로 표현
- `mindful app`은 명상 앱처럼 고정되지 않도록 조심스럽게 사용

## 5. 모든 사용자 대상 키워드

NoveraFlow는 특정 문제 해결 앱으로만 제한되지 않아야 합니다. 누구나 자신의 하루, 생각, 기억, 감정, 반복되는 삶의 흐름을 남길 수 있는 공간이어야 합니다.

관련 키워드:

- everyday diary
- life record
- personal notes
- daily thoughts
- memory journal
- life pattern
- personal timeline

사용 방향:

- `everyday diary`, `daily thoughts`는 일반 사용자가 쉽게 이해할 수 있는 표현
- `life record`, `memory journal`은 기록이 시간과 함께 남는다는 점을 설명할 때 사용
- `life pattern`, `personal timeline`은 흐름과 반복을 설명할 때 사용
- 특정 감정 문제나 특정 성향의 사용자로 제한하지 않음

## 6. 피해야 할 SEO 방향

NoveraFlow의 SEO는 검색 노출을 위해 브랜드 정체성을 흐리면 안 됩니다. 특히 의료, 치료, 진단, 생산성, 과한 AI 기술 중심 표현은 주의합니다.

피해야 할 방향:

- 과한 키워드 반복
- 치료/의료 앱처럼 보이는 표현
- 우울/불안 해결 앱처럼 고정되는 표현
- 생산성 툴처럼 딱딱하게 보이는 표현
- AI 기술 중심으로만 보이는 표현
- 너무 무거운 철학 용어 남발
- 성격유형, 진단 결과, 점수화 서비스처럼 보이는 표현
- 빠른 변화, 성취, 목표 달성을 과하게 강조하는 문구

피해야 할 예시:

- AI가 당신의 감정을 진단합니다.
- 우울과 불안을 해결하는 다이어리 앱
- 당신의 성격과 관계를 분석합니다.
- 매일 더 생산적인 사람이 되도록 도와줍니다.
- AI 기술로 삶을 최적화합니다.

권장하는 표현:

- A quiet AI diary for noticing living patterns.
- A gentle journaling space for thoughts, emotions, and everyday records.
- Short records can slowly reveal the rhythm of your life.
- NoveraFlow helps you reflect without judgment.

## 7. 추천 메타 문구 초안

아래 문구들은 이후 `index.html`의 meta tag, Open Graph, Twitter card에 적용할 수 있는 초안입니다. 실제 적용 시에는 길이와 노출 맥락에 맞게 조정합니다.

### 기본 영어 메타

Title:

`NoveraFlow | A Quiet AI Diary for Living Patterns`

Description:

`NoveraFlow is a quiet AI diary designed to help you notice patterns in your thoughts, emotions, and everyday life through short daily records.`

OG Title:

`NoveraFlow | A Quiet Diary for Life Flow`

OG Description:

`Write small daily records, grow gentle symbols, and notice the quiet patterns of your life over time.`

Twitter Title:

`NoveraFlow | A Quiet AI Diary`

Twitter Description:

`A gentle journaling space for short records, reflection, symbols, and living patterns.`

### 한국어 메타 초안

Title:

`NoveraFlow | 삶의 흐름을 비추는 조용한 AI 다이어리`

Description:

`NoveraFlow는 짧은 기록을 통해 생각, 감정, 일상의 흐름을 천천히 알아차릴 수 있도록 돕는 조용한 AI 다이어리입니다.`

OG Title:

`NoveraFlow | 기록이 흐름이 되는 조용한 다이어리`

OG Description:

`짧은 기록, 작은 상징, 부드러운 피드백을 통해 삶의 흐름을 조용히 바라볼 수 있는 기록 공간입니다.`

### 짧은 브랜드 설명

영어:

`A quiet AI diary for short records, gentle reflection, and living patterns.`

한국어:

`짧은 기록과 조용한 피드백으로 삶의 흐름을 비추는 다이어리.`

## 8. 향후 적용 기준

이 문서는 이후 사이트 SEO 작업의 기준으로 사용합니다.

적용 대상:

- `index.html` meta tag
- Open Graph
- Twitter card
- sitemap
- robots.txt
- 구조화 데이터
- 다국어 SEO
- 검색 결과에 노출될 title/description 문구
- AI 검색이 이해할 수 있는 서비스 설명 문장

적용 원칙:

- 영어 기본, 한국어 자동 전환 구조와 충돌하지 않게 설계
- 다국어 SEO는 `en`, `ko`를 먼저 고려하고 이후 `ja` 등으로 확장 가능하게 유지
- 페이지 본문은 감성 중심으로 유지하되, meta/structured data는 서비스 정의를 더 명확하게 작성
- 검색을 위한 문장이 사이트 분위기를 해치지 않도록 조정
- NoveraFlow를 의료, 치료, 진단, 성격 분석 서비스로 오해하게 만들지 않음

## 9. SEO 문장 톤 기준

SEO 문장은 검색엔진을 위해 명확해야 하지만, 사용자에게는 자연스럽게 읽혀야 합니다.

좋은 톤:

- 조용한
- 부드러운
- 짧은
- 부담 없는
- 삶의 흐름을 바라보는
- 기록을 판단하지 않는
- 천천히 알아차리는

피해야 할 톤:

- 과장된
- 치료를 약속하는
- AI 기술을 과시하는
- 성과와 생산성을 강요하는
- 사용자의 상태를 단정하는
- 지나치게 철학적이거나 어렵게 설명하는

핵심 기준:

> 사용자는 편안하게 느끼고, 검색엔진은 명확하게 이해해야 한다.

## 10. 2026-10-18 통합 검색 진단 및 개선 설계

Status: **조사 완료 / 개선안 Proposed / 구현·배포 미실행**

조사일: 2026-10-18 KST. 공개 HTTP·스토어·검색 검사는 약 08:30~08:50 KST에 수행했다.
검색·추천 노출을 보장하지 않는다. 목표는 정확한 공개 정보, 검색 가능성,
검증 가능한 홈페이지 유입 및 스토어 전환 개선이다.

### 10.1 범위와 문서 위치

- 요청 경로의 `noveraflow-projects-docs`는 이 작업 공간에 없다. 실제 공통 문서
  저장소는 `D:/Development/Personal/projects-docs`이며 README와 공식 문서 체계로 확인했다.
- 기존 SEO SSOT인 이 문서를 확장한다. `05-seo-summary.md`는 Merged 상태를 유지한다.
  앱의 `APP_STORE_PREPARATION.md`에는 본 조사 링크만 연결한다.
- 기존 README, `DOCUMENT_INDEX.md`, `DEV_WORKFLOW.md`,
  `NOVERAFLOW_CURRENT_STATUS.md`, 사이트 `HANDOVER_STATUS.md`,
  `SITE_I18N_STATUS.md`, 앱 Store/Privacy/Backup/Analytics 문서와 관련 소스를 확인했다.
- 시작 기준: site `4d95d6b`, app `c83a90c`, admin `59f0539`, AI `6ddddba`,
  projects-docs `990c23d`. 앱·Admin·공통 문서에는 기존 미커밋 변경이 있었다.
  기존 변경을 보존했으며 이번 조사에서 서비스 소스를 수정하지 않았다.
- Production·운영 DB·서버·CDN 설정·스토어 등록정보·심사·소유권 인증을
  변경하지 않았다. IPA/AAB 생성, 계정 생성, 유료 도구 가입, commit/push도 하지 않았다.
  사이트는 main push와 Cloudflare Pages 배포가 연결되어 있으므로 문서도 push하지 않는다.

### 10.2 증거 해석 규칙

| 증거 | 이 보고서에서 의미하는 범위 |
| --- | --- |
| 직접 HTTP GET | 이 조사 환경에서 해당 응답을 받음. 실제 검색사 IP에서의 접근·색인을 증명하지 않음 |
| User-Agent 비교 | 문자열에 따른 응답 차이 검사. 실제 봇 인증 또는 WAF 허용 증명이 아님 |
| 웹 검색 도구 | 반환된 검색 결과 표본. Google/Bing/ChatGPT 제품의 실제 순위·추천 답변과 동일시하지 않음 |
| 공개 스토어 GET / Apple lookup | 지역별 공개 등록정보와 공개 버전. 심사 중 메타데이터·설치 후 기능 전체를 증명하지 않음 |
| 소스 코드 | 구현 근거. 해당 코드가 공개 스토어 배포물에 포함되어 활성화되었는지는 별도 |
| 과거 운영 성공 기록 | 해당 날짜·빌드·계정·환경의 성공. 현재 모든 사용자에게 제공된다는 의미가 아님 |

Cloudflare 계정의 실시간 WAF 규칙·봇 설정·검증된 봇 접근 로그,
Search Console/Bing Webmaster Tools/Naver Search Advisor 및 스토어 콘솔의
인증된 성과 데이터는 이번 세션에서 확보하지 못했다. 자격 증명 파일을
읽거나 기록하지 않았다. 계정 미등록·트래픽 0이라고 판단하지 않는다.

## 11. 현재 상태 요약

| 영역 | 판단 | 주요 근거 / 다음 단계 |
| --- | --- | --- |
| Google Play ASO | ko/en/ja 공개 등록정보 존재. 설명 개선 필요 | 이름은 AI 기록/AI Journal/AI記録. 한국어 설명이 추상적이고 짧은 설명에 일기·감정 기록 용도가 약함. 일본어 이미지 글자 결손 확인 |
| Apple ASO | 공개판과 심사판 분리 필요 | KR/US/JP 공개판 1.0.61. 사용자 제공 심사 대상 1.0.80(81)은 유지. 이름은 브랜드만, 부제목은 감성 문구, 키워드 필드는 비공개 |
| 홈페이지 SEO | 기본 접근 가능, 기술·콘텐츠 정합성 부족 | 200, index/follow, 기본 영어 HTML 있음. 다국어 최초 HTML·canonical·sitemap·404 처리 개선 필요 |
| ChatGPT Search | robots 정책상 접근 가능. 실제 봇·추천 미검증 | OAI-SearchBot을 막는 규칙 없음. UA GET 200. 홈페이지가 웹 검색 표본에서 발견되지만 오래된 본문도 반환됨 |
| Google AI 검색 | 기술 접근 기반 있음. 색인·계정 설정 미확인 | Googlebot 차단 없음. 실제 색인·스니펫 자격 및 Search generative AI control 확인 필요. Gemini는 별도 정책 고려 |
| Perplexity / Copilot | 공개 접근 기반 있음. 인용·추천 미검증 | PerplexityBot 및 bingbot UA 200. 실제 IP 로그, 서비스별 답변 증거 없음 |
| 제품 이해 정확성 | 충분하지 않음 | About의 출시 준비 문구, FAQ의 서버 처리 설명, Premium 출시 경계와 연간 요약 문구가 충돌 |
| 실제 발견 | 브랜드 일부 발견, 일반 기능 표본 미발견 | 웹 검색 도구에서 홈페이지·Google Play 발견. 3개 언어의 기능 검색 표본에서 NoveraFlow 결과 확인 못함 |
| 개인정보와 검색 | 공개 제품 설명만 검색 가능하게 하면 양립 | robots는 개인정보 보호 장치가 아님. 인증·객체 권한이 우선. 학습용 정책은 별도 결정 |

## 12. AI 검색 접근성 및 기술 SEO

### 12.1 크롤러 용도와 현재 정책

실제 `/robots.txt`는 HTTP 200이며 로컬 소스와 같은 다음 규칙이다.

```text
User-agent: *
Allow: /

Sitemap: https://noveraflow.com/sitemap.xml
```

| 크롤러 / 제어 토큰 | 공식 용도 | 현재 robots 적용 | 이 조사에서 확인한 응답 |
| --- | --- | --- | --- |
| OAI-SearchBot | ChatGPT 검색 수집. 모델 학습과 독립 | 전체 허용 | 해당 UA 루트 GET 200 |
| GPTBot | 기반 모델 학습에 쓰일 수 있는 수집 | 전체 허용. 별도 선택 기록은 확인 못함 | 해당 UA 200. 변경하지 않음 |
| ChatGPT-User | 사용자 요청에 따른 페이지 방문. Search 포함 여부 제어용 아님 | 사용자 요청에는 robots가 적용되지 않을 수 있음 | 해당 UA 200 |
| Googlebot | Google 검색과 검색 내 AI 기능의 수집 | 전체 허용 | 해당 UA 200 |
| Google-Extended | Gemini/Vertex 모델 학습 및 일부 grounding 제어 | 전체 허용. 별도 정책 결정 필요 | 독립 HTTP UA가 아니므로 이 문자열의 200은 실제 지원 검사로 인정하지 않음 |
| bingbot | Bing 검색 수집. Copilot 접근 기반의 하나 | 전체 허용 | 해당 UA 200 |
| PerplexityBot | Perplexity 검색 결과 수집. 기반 모델 학습용 아님 | 전체 허용 | 해당 UA 200 |
| Perplexity-User | 사용자 요청에 따른 방문. 학습·자동 크롤링용 아님 | 일반적으로 robots를 무시하는 사용자 요청 fetcher | 해당 UA 200 |
| Yeti | Naver 검색 로봇 | wildcard로 허용 | 별도 UA 요청은 미실행. Naver 실제 수집 로그 미확인 |

OpenAI는 검색과 학습 토큰을 독립적으로 운영한다. GPTBot 허용은 ChatGPT Search
노출의 필수 조건이 아니다. [OpenAI 크롤러 공식 문서](https://developers.openai.com/api/docs/bots)

Google-Extended는 독립 HTTP User-Agent가 없고 Google Search 포함·순위에 영향을
주지 않는다. Gemini Apps/Vertex의 일부 grounding까지 함께 제어하므로 학습만의
스위치로 단순화하지 않는다. 검색을 위해 임의 허용하거나 차단하지 않는다.
[Google 공통 크롤러와 Google-Extended](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)

Perplexity의 두 봇 용도와 공식 IP 목록은
[Perplexity Crawlers](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)를 기준으로 한다.
bingbot의 실제 여부는 [Bing 공식 검증 절차](https://www.bing.com/webmasters/help/verify-bingbot-2195837f),
Naver robots는 [Search Advisor](https://searchadvisor.naver.com/guide/seo-basic-robots)를 따른다.

**정책 제안:** 공개 마케팅 페이지의 검색용 봇 접근을 유지한다. 현재 wildcard가
GPTBot까지 허용한다는 사실을 사용자에게 알리고, 학습용 허용 여부는 별도 정책으로
확정한다. 후속 승인에서 학습 거부가 선택되면 GPTBot 전용 Disallow 그룹을 설계할 수
있다. 이번에는 robots 변경·WAF 예외·학습 허용을 추가하지 않았다.

### 12.2 HTTP 검사 결과

직접 GET에서 `server: cloudflare`를 확인했다. 루트 응답은 92,415 bytes,
LF 정규화 SHA-256은
`dbc19683d81bfa8f2035934fdd5c131dc7e96d6a3022da120096234f6ff0da5d`였다.
로컬 `index.html`과 줄바꿈 정규화 후 일치했다.

| 요청 | 직접 검사 결과 | 진단 |
| --- | --- | --- |
| `https://noveraflow.com/` | 200 / 영어 본문 / index, follow / X-Robots-Tag 없음 | JS 없이 제품 본문·스토어 링크 읽기 가능 |
| `/robots.txt` | 200 / text/plain / wildcard Allow | 웹 검색 도구의 접근 오류와 구분해야 함 |
| `/sitemap.xml` | 200 / application/xml / URL 8개 | 존재함. 제출 여부는 알 수 없음 |
| `/about.html`, `/philosophy.html`, `/faq.html`, `/contact.html` | 최종 200, 각각 확장자 없는 경로로 이동 | canonical은 여전히 `.html`을 가리킴 |
| `/privacy`, `/terms` | 200 | 해당 canonical과 일치 |
| `/account-deletion` | 최종 `/account-deletion/` 200 | canonical은 slash 없는 URL. 공개 삭제 안내이며 삭제 실행 API가 아님 |
| `/?lang=ko`, `/?lang=ja` | 200, 루트와 동일 bytes·hash·영어 lang | 언어 본문·메타는 JS 실행 후 변경됨 |
| `/llms.txt` | 200, HTML 홈페이지와 같은 hash | 실제 llms.txt가 존재하는 증거가 아님 |
| `/random-seo-audit-not-found-20261018` | 200, 홈페이지와 같은 hash | 없는 경로에도 홈페이지 fallback. soft-404/중복 URL 위험 |
| `http://noveraflow.com/` | 301 → HTTPS | 정상 |
| `/index.html` | 308 → `/` | 정상 |
| `https://www.noveraflow.com/` | fetch failed | DNS/TLS/네트워크 중 원인 미확정. 정상 리다이렉트로 보고하지 않음 |

검사한 공개 HTML에서 noindex 및 X-Robots-Tag 차단은 발견하지 못했다.
8개 봇 문자열과 Android 모바일 브라우저 문자열의 루트 응답은 모두 200,
92,415 bytes, 위의 동일 hash였다. Google-Extended 문자열 요청은 참고용 합성 검사다.
이 결과는 UA 기반 차별 차단이 관측되지 않았다는 의미이며, 봇 IP·국가·ASN·속도·평판에
따른 WAF 차단이 없다는 의미는 아니다. 전체 봇으로 모든 URL을 조합한 검사는 하지 않았다.

### 12.3 CDN·WAF·실제 로그의 남은 확인

기존 사이트 운영 기록은 Cloudflare Pages Git 배포와 2026-10-17 모바일 검증 성공을
기록한다. 그러나 계정의 현재 AI bot blocking, managed challenge, rate limit,
custom rules, verified bots 처리와 실제 검색 봇 로그는 읽지 못했다.

후속 읽기 전용 확인은 공식 IP 목록 또는 공식 검증 방식으로 확인한 봇의 최근
7~28일 `robots.txt`·주요 페이지 요청에 대해 시간, 상태 코드, challenge action,
경로와 응답 크기만 집계한다. UA 이름만으로 허용하지 않는다. 예외가 필요하다면
공개 호스트·공개 GET 경로로 좁히고 IP/검증된 봇 조건을 함께 검토한다.
원본 IP·토큰·쿠키·사용자 URL을 공개 보고서에 기록하지 않는다.

### 12.4 Canonical·sitemap·다국어·모바일

1. Cloudflare Pages의 `.html` 제거 동작과 canonical/sitemap/내부 링크를 맞춘다.
   도착 URL이 `/about`이면 canonical도 `/about`으로 정한다. 삭제 안내는 실제
   200인 `/account-deletion/`로 통일하는 안을 우선 검토한다. 리다이렉트 루프를 만들지 않는다.
2. sitemap의 8개 URL 중 5개는 `.html` 또는 slash 리다이렉트를 거친다.
   최종 canonical 200 URL만 넣고, 2026-06-25로 남은 홈페이지 lastmod를 실제 내용 변경일로
   갱신한다. 모든 날짜를 매번 오늘로 바꾸지 않는다. changefreq/priority로 순위를 기대하지 않는다.
3. 홈·About·Features·FAQ·Contact는 en/ko/ja hreflang이 같은 URL을 가리킨다.
   Privacy/Terms/삭제 안내는 쿼리별 언어 URL이 있지만 JS 없이는 언어 본문 구분이 불충분하다.
   `?lang=` 추가만으로 다국어 색인을 해결했다고 보고하지 않는다.
4. 후속 설계는 `/en/`, `/ko/`, `/ja/`와 각 기존 페이지의 **빌드 시 정적 HTML** 생성이다.
   페이지마다 언어에 맞는 title/description/lang/본문/self-canonical을 반환하고
   상호 hreflang과 x-default를 연결한다. 기존 경로의 이관·canonical 처리는 한 번에 정한다.
   이는 실제 번역 페이지이며 키워드 변형 페이지를 늘리는 작업이 아니다.
5. 언어 버튼은 각 번역 URL의 링크로 연결하고 JS로 기존 전환 경험을 보완한다.
   브라우저 언어에 따른 강제 이동은 피한다. 현재 i18n.js와 landing.js의 문구 중복도 정리한다.
   [Google 다국어 사이트 가이드](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
6. 기존 A/B 풍경·모션·모바일 레이아웃을 유지한다. 이전 운영 문서의 모바일 검증 결과는
   재사용하되 이번 세션에서 실물 기기·렌더링·CWV를 재검증했다고 표현하지 않는다.
   소스에는 viewport, 이미지 크기, lazy loading 및 reduced-motion 처리가 있다.
   현재 CrUX/LCP/INP/CLS·Lighthouse 값은 확보하지 못했으므로 성능 점수를 생성하지 않는다.

### 12.5 개인정보 노출 경계

공식 사이트에는 제품·지원·정책 설명만 공개한다. 일기 원문, 마음결 대화,
사용자 ZIP/첨부파일, 계정·결제·관리자 정보, 인증 callback, 내부 API 응답은
본문·JSON-LD·sitemap·llms.txt에 포함하지 않는다.

앱의 대화·클라우드 백업 클라이언트는 Bearer 인증을 사용한다. 기존 10-17 운영 기록에도
cloud backup API의 미인증 401 경계가 있다. 이번에는 사용자 데이터 API를 조회하거나
샘플 백업을 열지 않았다. 현재 모든 비공개 객체의 접근 통제를 독립 검증한 것은 아니다.

robots.txt는 호스트별이며 `noveraflow.com`의 규칙이 admin/ai 호스트를 보호하지 않는다.
비공개 호스트·API는 인증/인가, 객체 소유권과 비공개 저장소 정책이 우선이다.
로그인·관리자 UI에는 후속으로 noindex/X-Robots-Tag도 검토한다. robots Disallow만으로
기밀을 보호하거나 이미 알려진 URL을 색인에서 제거할 수 있다고 가정하지 않는다.
공개 `/account-deletion/` 안내는 접근 가능하게 유지하고 실제 삭제 실행은 인증을 유지한다.

## 13. 실제 제품 기능과 공개 문구의 사용 조건

### 13.1 상태 구분

사용자 제공 iOS 심사 대상은 **1.0.80(81)**이다. 로컬 `pubspec.yaml`은
`1.0.80+80`으로 남아 있고, 10-17 Admin 운영 문서는 build 81의 서버 구매 복원 및
권한 처리를 기록한다. 이 차이를 빌드 번호 수정이나 재빌드로 해결하지 않는다.
공개 Apple KR/US/JP lookup은 모두 **1.0.61**, 공개 배포일 2026-09-26을 반환했다.
Google Play 공개 최종 업데이트일은 2026-10-14이나 현재 설치 배포 버전 번호는
공개 HTML에서 확정하지 못했다.

| 기능 | 상태 | 근거 및 공개 사용 범위 |
| --- | --- | --- |
| 텍스트·사진·음성 일기, 기록 이력 | 현재 실제 제공 중 | 공개 Play en/ja 설명·스크린샷, Diary repository 및 상세 화면 |
| 상징·상태를 통한 감정 기록 | 현재 실제 제공 중 | `diary/data/diary_entry.dart`의 selectedState, 공개 상징 UI. 감정 점수/의학적 분석/정밀 차트를 약속하지 않음 |
| AI 피드백 / 다른 시선 | 현재 실제 제공 중 | 공개 스토어 설명·이력, feedback 소스. 사용자가 요청하는 성찰용 피드백 |
| 주간·월간 돌아보기 | 현재 실제 제공 중 | Apple 1.0.28 이후 공개 버전 이력과 현재 weekly/monthly repository·화면. 이용 조건과 서비스 제한 적용 |
| 완전 자동 정기 요약 | 제공하지 않음(확인한 현재 경로) | repository가 명시적 request를 실행하고 canGenerate/캐시/네트워크 상태를 검사. 화면의 기간 갱신 타이머는 자동 AI 생성 기능이 아님 |
| 마음결 AI 대화 | 구현되었으나 공개 출시 확인 전 | `ai_conversation` controller/API/repository 및 10-17 심사 운영 기록. 공개 iOS 1.0.61 제공 근거 없음. Android 일반 배포도 별도 확인 필요 |
| 로컬 ZIP 내보내기·복원 | 현재 실제 제공 중 | 공개 FAQ/Features와 `backup_service.dart`, `_LocalBackupRestoreCard`. 일반 기록 ZIP과 새 마음결 기록 포함 여부의 배포 시점을 분리 |
| 클라우드 자동 백업 | 구현되었으나 공개 출시 확인 전 | scheduler/execution service/UI/capability와 10-17 심사 권한 기록. public iOS 1.0.61의 일반 제공 확인 못함. 백업은 실시간 다기기 동기화와 구분 |
| 연간 AI 결산 | 개발 또는 준비 중 / 제공 확인 불가 | 앱 문구·capability 상수·서버 권한 분기는 있으나 앱의 연간 생성·조회 UI/repository 및 AI 생성 경로를 찾지 못함. 권한 활성화만으로 구현 완료로 판정하지 않음 |
| 실시간 다기기 동기화 | 제공 확인 불가, 공개 문구 제외 | 클라우드 백업·복원으로 동기화를 주장할 수 없음 |
| 커뮤니티·익명 흐름 공유 | 현재 제공 확인 불가, 공개 문구 제외 | 검색 도구의 이전 홈페이지에 등장하지만 이번 소스·공개 출시 근거 없음 |
| 기본 일기 무료 이용 | 현재 실제 제공 중 | 앱 Premium 안내와 기록 작성 경로. 무료 설치와 모든 AI 기능 무료를 구분 |
| Premium의 구성·구독 구매 | 심사 빌드 구현 / 공개 배포·플랫폼별 확인 필요 | 현재 상수는 대화·클라우드 자동 백업·연간 요약. 주간/월간은 현재 서버 정책상 Premium 필수 capability가 아님 |
| 지원 언어 | 소스에 ko/en/ja/zh/es 등록, ko/en/ja UI 근거 있음 | `app/app.dart`와 `core/i18n/app_strings.dart`, 공개 ko/en/ja 스크린샷. 번역 완성도는 별도이며 Apple 공개 언어 표시는 EN만 확인됨 |
| 운영체제 | Android / iPhone·iPad 공개 제공 | 공개 스토어. Apple 공개 최소 iOS 15.0. macOS 최적화 또는 Web diary를 주장하지 않음 |
| 개인정보 보호 | 로컬 기본 저장·선택 AI 서버 전송 확인 | 앱 Privacy/Backup 문서, 공개 개인정보처리방침. E2EE·완전 오프라인 AI·무수집·영구 보관·학습 미사용은 확인 근거 없이 주장 금지 |

파일 경로의 앱 기능 기준은 `noveraflow-app/lib/features/`이다.
서버 권한 근거는 `noveraflow-admin/backend/src/payment-cloud/feature-access-policy.js`이다.

### 13.2 오래된 문서와 새 구현의 충돌

`NOVERAFLOW_CURRENT_STATUS.md`의 10-05 overlay는 초기 Premium에 주간·월간을 넣고
클라우드·연간을 Future로 분류한다. 그러나 현재 앱과 Admin 코드, 10-17 심사 기록은
다른 capability 구성을 보인다. 10-16 StoreKit 차단 설명도 후속 10-17 복원 성공
기록보다 오래되었다. 이번 보고서는 오래된 문장을 현재 사실로 재사용하지 않는다.
동시에 새 권한 설정·구매 성공을 실제 연간 요약 동작이나 공개 출시의 증거로 쓰지 않는다.

후속 문구 승인 전에 공개 플랫폼·버전별 기능 매트릭스를 확정하고 공통 현재 상태
문서를 맞춘다. 기존 `BACKUP_RULES.md`와 settings 소스의 미커밋 수정은 진행 중 작업으로
보존했다. 해당 작업의 전체 검수·출시 완료를 이번 조사로 선언하지 않는다.

### 13.3 개인정보 문구 검토

현재 Privacy는 기본 기록의 로컬 저장, AI 요청 시 선택 정보의 서버 전송과 익명
이벤트 수집을 설명한다. 새 Premium의 대화·첨부파일 클라우드 백업 설명은 현재 앱
문구가 더 구체적이다. 따라서 ‘일기는 기기에만 저장’, ‘AI에게 보내지 않음’,
‘대화 원문은 어떠한 경우에도 서버로 가지 않음’은 부정확하다.
대화 생성용 전송, 서버 transcript 영속 저장 여부, 사용자가 선택한 백업 업로드를
각각 설명해야 한다. 저장 시 암호화와 E2EE는 별도이며 검증된 암호화 설계 없이 추가하지 않는다.

공식 다운로드: [Google Play](https://play.google.com/store/apps/details?id=com.moolsoft.noveraflow),
[Apple App Store](https://apps.apple.com/app/id6792970947).

## 14. 홈페이지 콘텐츠와 구조화 데이터 설계

### 14.1 현재 콘텐츠 평가와 배치

실제 메인 HTML은 새로운 랜딩이며 Google Play/App Store 링크와 주간·월간 돌아보기,
Premium 대화·클라우드·연간 문구를 포함한다. JS 없이 읽을 수 있다.
그러나 About는 여전히 출시 준비와 추후 다운로드 추가를 안내하고, Contact에도 출시 전
지원 안내가 남아 있다. FAQ의 ‘서버 처리가 추가되면 정책 갱신’ 문장은 이미 존재하는
AI 요청 처리를 충분히 설명하지 못한다. 검색 도구는 더 오래된 홈·정책을 반환하기도 한다.

| 위치 | 제안 콘텐츠 | 유지할 경험 / 선정 이유 |
| --- | --- | --- |
| Hero 다음 기존 intro-strip | 2~3문장 제품 정의: 짧은 텍스트·사진·음성 일기, 상징을 통한 감정 기록, 요청형 AI 돌아보기 | 풍경·Hero·모션을 건드리지 않고 앱 종류를 즉시 이해 |
| `#experience` 기존 4개 카드 | 기록 / 감정·상징 / 주간·월간 / 데이터 보관. 각 카드에서 상세 설명으로 내부 링크 | 기존 스크린샷 레이아웃 활용. 미출시 혜택을 현재 기능처럼 노출하지 않음 |
| `#premium` 기존 영역 | 공개 출시가 확인된 혜택과 구독·로그인 조건만 노출. 연간 요약은 제공 검증 전 제외 | 버전별 차이를 설명하고 일반 제공으로 오해하지 않게 함 |
| About 기존 페이지 | 어떤 앱인지, 적합한 사용자, 공개 플랫폼, 공식 다운로드 2개, 업데이트 날짜 | 준비 중 문구 제거 후보. 독립적인 설명 근거 페이지 |
| Features 기존 philosophy 페이지 | 각 기능·무료/구독·네트워크·저장·요청 조건을 짧게 설명 | 별도 키워드용 페이지 생성 없이 기존 링크 구조 보강 |
| FAQ 기존 정적 FAQ | 17절의 ko/en/ja 답변. 핵심 제품 FAQ는 HTML에 포함 | 클릭·검색·API 요청을 하지 않는 봇도 읽을 수 있음 |
| Privacy / 데이터 안내 | 기본 로컬·AI 요청 전송·선택 클라우드·사용자 ZIP의 차이 | 개인정보를 차별화 과장 대신 사용자가 판단할 수 있는 사실로 설명 |

정적 제품 FAQ와 `js/support-faq.js`의 승인된 지원 FAQ는 역할이 다르다.
동적 지원 FAQ는 GET 후 사용자가 펼쳐야 답변을 가져오는 구조이며 일부 이벤트 POST도
발생한다. 이를 열지 않아도 핵심 제품 답변을 읽을 수 있도록 기존 정적 FAQ를 보강한다.
이번 조사에서는 해당 POST나 새로운 추적 기능을 실행·추가하지 않았다.

차별화 후보는 짧은 글·사진·음성·상징의 조합, 평가·진단을 하지 않는 돌아보기,
기본 로컬 기록과 사용자 ZIP이다. AI 대화는 출시 검증 뒤 추가할 수 있다.
‘유일’, ‘가장 안전’, ‘최고의 AI’와 같은 우월성은 입증되지 않았다.

### 14.2 메타와 JSON-LD

| 항목 | 현재 | 개선 설계 / 조건 |
| --- | --- | --- |
| Title / Description | 영어 기본 + JS 번역. 분위기 중심 | 언어별 최초 HTML에 실제 앱 범주·주요 기능. 17절 초안 사용 |
| OG / Twitter Card | 홈에 제목·설명·1200×630 PNG·alt 있음 | 번역별 URL/문구 일치. 현재 og:locale alternate는 ko만 있어 ja도 검토 |
| Meta keywords | 존재 | 반복 확장보다 본문·title·설명에 집중. 순위 개선 지표로 쓰지 않음 |
| Canonical / hreflang / sitemap | 12절 불일치 | URL 정책과 정적 언어 페이지 확정 후 함께 수정 |
| Organization | 기존 JSON-LD 있음. name=NoveraFlow, sameAs 비어 있음 | 공개 operator moolsoft와 브랜드 관계 명료화. 정확한 공식 스토어 URL 연결 |
| WebSite | 기존 JSON-LD 있음 | 안정된 @id와 publisher 유지. 실제 없는 검색 기능 SearchAction 생성 금지 |
| SoftwareApplication / MobileApplication | 홈에 없음 | MobileApplication은 SoftwareApplication 하위 유형. 앱 설명 노드 하나를 기본으로 구성 가능 |
| BreadcrumbList | 없음 | 홈→기능/FAQ 등 실제 표시하는 탐색 경로에만 도입. 홈 단일 화면에는 불필요 |
| FAQPage | 없음 | 정확한 visible FAQ와 일치할 때 의미 표현용 검토. Google FAQ 리치 결과를 목표로 추가하지 않음 |
| 평점·리뷰·다운로드·수상 | 홈 구조화 데이터에 없음 | 가공/복사/상시 최신성 미보장 수치 추가 금지 |

다음은 공개 설명 정합성을 먼저 해결한 뒤 사용할 **설계 예시**다. 실행하지 않았다.
언어별 페이지 URL이 확정되면 해당 locale URL과 inLanguage로 조정한다.

```json
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "@id": "https://noveraflow.com/#app",
  "name": "NoveraFlow",
  "url": "https://noveraflow.com/",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Android, iOS",
  "description": "A diary for short text, photo and voice records, symbols, and AI reflection.",
  "installUrl": [
    "https://play.google.com/store/apps/details?id=com.moolsoft.noveraflow",
    "https://apps.apple.com/app/id6792970947"
  ],
  "publisher": { "@id": "https://noveraflow.com/#organization" }
}
```

이 예시는 평점·리뷰·offer를 생략한 의미 표현이며 Google 소프트웨어 앱 리치 결과의
필수 요건을 모두 충족한다고 주장하지 않는다. 공개 가격·구독을 정확히 표시할 수 있을
때만 무료 설치와 구독 조건을 분리해 offers를 검토한다. Google 문서상 해당 리치 결과에는
이름·가격과 실제 rating 또는 review 등의 요건이 있다.
[Google SoftwareApplication](https://developers.google.com/search/docs/appearance/structured-data/software-app)

**현재 기준의 변화:** Google은 2026-05-07부터 FAQ 리치 결과를 중단했고 6월에
관련 문서를 제거했다. 과거의 ‘정부·건강 사이트 한정’ 설명을 현재 정책으로 쓰지 않는다.
[Google 공식 변경 기록](https://developers.google.com/search/updates)

### 14.3 llms.txt와 Google AI 관련 설정

실제 llms.txt가 없고 미존재 경로가 HTML 200을 반환한다. 이것은 AI용 파일이
정상 구성됐다는 뜻이 아니다. 우선 정상 404 응답을 설계한다.
Google Search는 llms.txt를 검색·AI 노출 조건으로 쓰지 않는다고 명시한다.
OpenAI/Perplexity의 확인한 공식 크롤러 문서에서도 필수 지원 조건은 확인되지 않았다.
새 파일을 우선 작업으로 만들지 않는다.
[Google AI 최적화 가이드](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

2026-10-18 현재 Google 공식 가이드는 색인·스니펫 자격 외에 Search Console의
**Search generative AI control**도 설명한다. 기본값은 포함이지만 NoveraFlow의
현재 속성·상위 속성 상속 설정은 읽지 못했으므로 포함으로 단정하지 않는다.
이 설정은 Google-Extended의 학습 제어와 별개다. 기존 계정에서 읽기 전용 확인만
계획하고 임의 변경하지 않는다.
[Search generative AI control](https://support.google.com/webmasters/answer/16908024)

## 15. 실제 검색 발견 여부와 경쟁 환경

### 15.1 브랜드 검색 및 서비스 직접 검증

| 채널 / 검사 | 관측 결과 | 공식 홈 인용 / 추천 여부 |
| --- | --- | --- |
| 웹 검색 도구: `"NoveraFlow"`, `"NoveraFlow" diary`, `"NoveraFlow" 일기`, `"NoveraFlow" 日記`, `site:noveraflow.com` | 반환 결과 묶음에 공식 홈페이지·Google Play en 및 일부 언어·FAQ·Privacy·Terms·Features 확인 | 검색 결과 발견. AI 추천 후보 언급/답변 내 인용은 검증하지 않음. 각 언어 쿼리별 순위는 제공되지 않음 |
| 같은 브랜드 검색의 Apple 결과 | 해당 웹 도구 표본에서 확정 못함 | Apple 공개 페이지는 직접 GET·lookup으로 접근 확인. 웹 색인 발견과 구분 |
| Google 공개 SERP GET: 브랜드 / `AI 일기 앱 추천` | 200이지만 이동/JS 안내로 결과 목록 확인 불가 | 직접 검증하지 못함. 색인 부재로 판단하지 않음 |
| Bing 공개 SERP GET: 같은 2개 쿼리 | 200. 표본 결과가 쿼리와 관련성이 낮고 NoveraFlow 링크 확인 못함 | 직접 HTML 표본 미발견. 정밀 색인 판정 보류 |
| Naver 공개 SERP GET: `NoveraFlow` | 해당 표본에서 검색 결과 없음 안내 | 브랜드 미발견(이 시간·환경의 표본) |
| Naver 공개 SERP GET: `AI 일기 앱 추천` | 결과 HTML 접근됨. NoveraFlow 링크 확인 못함 | 일반 검색 표본 미발견. AI 브리핑 추천은 별도 미검증 |
| ChatGPT Search 실제 추천 답변 | 사용자 UI에서 독립 세션 실행 수단 없음 | 직접 검증하지 못함 |
| Perplexity 실제 답변 | 서비스 UI 실행 수단 없음 | 직접 검증하지 못함 |
| Gemini / AI Overviews / AI Mode / Copilot 실제 답변 | 서비스 UI·로그인·위치별 실험 수단 없음 | 직접 검증하지 못함 |

웹 검색 도구에서 [공식 홈](https://noveraflow.com/)과
[Google Play 영어 페이지](https://play.google.com/store/apps/details?id=com.moolsoft.noveraflow&hl=en)가
발견됐다. 일부 반환본은 과거 커뮤니티·출시 준비 문구와 오래된 정책을 포함했다.
직접 HTTP의 현재 홈과 내용이 달라 검색 도구의 수집/캐시 시차 가능성이 있다.
이를 특정 AI 서비스가 부정확한 추천을 했다는 증거로 쓰지 않는다.

### 15.2 기능 검색 쿼리 표본

다음 7개 유형×3개 언어를 웹 검색 도구로 실행했다. 동일 batch에서 결과가 합쳐지므로
개별 쿼리의 순위·전체 결과 수는 보고하지 않는다. 반환된 각 언어 batch의 결과 표본에는
NoveraFlow 브랜드·홈페이지·공식 스토어 URL이 확인되지 않았다.
**‘표본 미발견’은 해당 검색엔진 전체에서 색인되지 않았다는 뜻이 아니다.**

| 유형 | 한국어 | English | 日本語 | 결과 |
| --- | --- | --- | --- | --- |
| AI 일기 추천 | AI 일기 앱 추천 | best AI journaling apps | AI日記アプリ おすすめ | 3개 언어 표본 미발견 |
| 감정 기록 | 감정일기 앱 추천 | mood tracking diary apps | 感情を記録できる日記アプリ | 3개 언어 표본 미발견 |
| AI 대화 | AI와 대화하는 일기 앱 | journaling app chat with AI | AIと会話できる日記アプリ | 3개 언어 표본 미발견. 대화 출시 검증 필요 |
| 자동 요약 수요 | 주간 월간 자동 일기 요약 앱 | automatic weekly monthly journal summary app | 日記アプリ 週間 月間 自動 要約 | 3개 언어 표본 미발견. 자동 기능 광고용으로 사용 금지 |
| 개인정보 | 개인정보 보호 일기 앱 추천 | privacy focused diary apps | プライバシー 日記アプリ おすすめ | 3개 언어 표본 미발견 |
| OS별 추천 | Android iOS 일기 앱 추천 | best Android iOS journal apps | Android iPhone 日記アプリ おすすめ | 3개 언어 표본 미발견 |
| 기능 비교 | AI 일기 앱 비교 사진 음성 로컬 저장 | AI journal app comparison voice photo local storage | AI日記 アプリ 比較 写真 音声 端末保存 | 3개 언어 표본 미발견 |

자동 요약은 사용자의 검색 의도를 조사한 것이며 NoveraFlow 기능으로 인정한 것이 아니다.
검색 결과는 시간, 지역, 언어, 로그인, 개인화, 기기, 검색 도구의 결과 제한에 따라 달라진다.
KST 시각은 기록했으나 웹 검색 도구의 실제 요청 위치는 통제하지 못했다.
Play `gl=KR`와 Apple KR/US/JP storefront는 명시했다.

### 15.3 경쟁 앱의 공개 정보와 차별화 후보

| 공개 출처 | 확인한 포지셔닝 | NoveraFlow 설계 시 참고 |
| --- | --- | --- |
| [Rosebud](https://www.rosebud.app/) | AI journal, 대화/음성·주간 보고서 등을 명료하게 설명 | AI 일기·대화만으로 독자성을 주장할 수 없음. 실제 대화 진입·제한·저장 방식을 더 구체적으로 설명 |
| [Daylio](https://daylio.net/) | 기분·활동 중심의 간단한 기록 | 기분 추적 수요와 겹치지만 NoveraFlow는 텍스트·사진·음성·상징 기록의 실제 조합을 설명 |
| [Day One 암호화 설명](https://dayoneapp.com/features/end-to-end-encryption/) | E2EE를 명시적으로 설명하는 별도 문서 보유 | NoveraFlow의 로컬 저장은 E2EE 증명이 아님. 검증되지 않은 동급 보안 주장 금지 |

경쟁사 소개는 해당 회사의 공개 주장이다. 실사용 비교·안전성 우열·가격/검색량/경쟁도
수치를 측정하지 않았다. 대량 비교 페이지나 자사 순위표보다 제품 설명과 실제 UI 근거를 먼저 보강한다.

## 16. 스토어별 ASO 현황 및 향후 설계

### 16.1 Google Play

현재 공개 `hl=ko/en/ja&gl=KR`를 직접 GET했다.

| 항목 | 현재 관측 | 개선 판단 |
| --- | --- | --- |
| 이름 ko | NoveraFlow AI 기록 | 기록의 범위가 넓음. 실제 일기 범주가 드러나는 대안 검토 |
| 이름 en | NoveraFlow AI Journal | 범주와 AI가 이미 명확. 이름 변경 필요성 낮음 |
| 이름 ja | NoveraFlow AI記録 | 일본어 검색 표현인 AI日記로 개선 후보 |
| 짧은 설명 ko | 작은 기록이 쌓이면 AI가 나만의 흐름과 변화를 함께 발견합니다. | 일기·감정 기록·입력 방식 중 실제 효용 추가 |
| 짧은 설명 en | Discover your personal patterns through small daily records. | diary/journal와 구체적 기능을 자연스럽게 보강 |
| 짧은 설명 ja | 小さな記録から、自分だけの変化と流れを見つけるAI記録アプリ。 | 日記·気持ち·振り返り 표현을 검토 |
| 상세 설명 | ko는 감성 소개 중심. en/ja는 텍스트·사진·음성·AI·상징·월간 돌아보기 목록 있음 | 한국어에 같은 수준의 사실 추가. 주간·월간의 요청 조건, 데이터 처리·무료 범위 명료화 |
| 카테고리 | Lifestyle / 라이프스타일 | 현재 제품 범주와 합리적으로 일치. 태그 실제 선택값은 Console 확인 필요 |
| 아이콘 | 공개 이미지 확보·샘플 확인 | 브랜드 마크는 일관. Play 이미지의 배경/alpha는 뷰어 차이가 있어 결함으로 단정하지 않음. 실제 스토어 밝은/어두운 배경 확인 후보 |
| 스크린샷 | ko/en/ja 각각 8개 img 요소 확인. 첫 이미지 직접 검토 | ko 첫 샘플은 번호 6, en/ja는 번호 1. 조회 순서·실험 여부는 Console 확인 필요. Android 페이지 샘플에 iPhone 프레임·상태바가 있어 Android 실제 화면으로 교체 검토 |
| 일본어 이미지 | 첫 이미지의 記録 등 일부 글자가 사각형으로 보임 | 명확한 가독성 문제. 현재 공개 이미지 기준 수정 우선 |
| 그래픽 이미지 | 원본 feature graphic을 독립 확정 못함 | 없음으로 단정하지 않음. Console 원본·언어별 미리보기 확인 |
| 검색 유입·획득·전환 | Console 미확보 | 0/높음/낮음 수치와 실험 성과를 생성하지 않음 |
| 맞춤 등록정보·실험·프로모션 | 현재 설정 미확인 | 기능·성과 데이터와 계정 자격 확인 후 P3/P4 검토 |

공개 스크린샷은 각 언어 첫 이미지만 검토했다. 전체 8장의 번역·순서·디바이스 진실성을
검수 완료했다고 보고하지 않는다. 임시 검토 자산은
`D:/Development/Personal/tmp/seo-audit-20261018/`에 있다.

Play 이름 30자·짧은 설명 80자·상세 설명 4,000자 기준으로 초안을 검증한다.
[Google Play 등록정보 공식 기준](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en)

맞춤 등록정보는 다음의 **조건부 후보**이며 생성하지 않았다.

| 타겟 | 후보 메시지/화면 | 적용 조건 |
| --- | --- | --- |
| AI 일기 | AI 돌아보기·실제 결과 UI | 요청형 AI와 조건 설명. 대화 강조는 공개 배포 확인 뒤 |
| 감정 기록 | 상징·느낌·짧은 일기 | 임상 mood score/치료 효능으로 표현하지 않음 |
| 개인 기록 관리 | 텍스트·사진·음성·기록 이력·사용자 ZIP | 실제 Android 화면과 저장 설명 일치 |
| ko/en/ja 사용자 | 각각 자연스러운 문구·해당 UI | 단순 언어 현지화는 기본 등록정보부터. 언어만 다르다는 이유로 맞춤 페이지를 과도하게 분할하지 않음 |

공식 문서는 search keywords 타겟과 실제 유입 키워드/변형 묶음 선택을 지원한다.
현재 NoveraFlow 계정의 가용 타겟·데이터는 미확인이다.
[Google Play 맞춤 등록정보](https://support.google.com/googleplay/android-developer/answer/9867158?hl=en)

P3 실험은 충분한 유입을 확인한 뒤 한 번에 짧은 설명 또는 첫 스크린샷 한 요소만 바꾼다.
기간·최소 표본·중단 조건을 시작 전에 정하고 Console의 실제 신뢰도와 설치/첫 실행 결과를
사용한다. 표본이 적으면 승자를 선언하지 않는다.
[등록정보 실험](https://support.google.com/googleplay/android-developer/answer/12053285?hl=en)
프로모션 콘텐츠는 앱 계정의 자격과 실제 행사·새 기능이 있을 때만 검토한다.
[프로모션 콘텐츠 자격](https://support.google.com/googleplay/android-developer/answer/12929029?hl=en)

### 16.2 Apple App Store

| 항목 | 공개 상태 | 심사 이후 개선 설계 |
| --- | --- | --- |
| 버전 | KR/US/JP 모두 1.0.61. 심사 대상은 사용자 제공 1.0.80(81) | 심사 취소·재제출·메타 수정 없이 유지 |
| 이름 | NoveraFlow | 브랜드 유지안 우선. 필요하면 17절 기능형 이름을 다음 버전에서 비교 |
| 부제목 ko/en/ja | 기록이 쌓이면 흐름이 보입니다 / Turn Moments Into Meaning / 記録が流れになる瞬間 | 검색 범주·감정 기록·AI 돌아보기의 기능형 후보 비교 |
| 키워드 필드 | 공개되지 않음 | 현재 값의 좋고 나쁨 판정 불가. 승인 완료 후 기존 값과 제안 비교 |
| 설명 | 3개 언어 존재. 짧은 감성 소개 위주 | 현재 제공 기능, 무료/구독, 로컬/서버 데이터 설명 보강 |
| 프로모션 텍스트 | 독립 필드 값을 확정 못함 | 없는 것으로 단정하지 않음. 17절 초안은 심사 완료 뒤 검토 |
| 카테고리 | Lifestyle, 보조 Productivity | 주 범주는 타당. 변경에 앞서 유입 데이터 확인 |
| 언어 표시 | 공개 lookup/web은 EN만 표시 | Flutter ko/en/ja UI와 차이. Info.plist/번들 언어 선언과 실제 배포 번들을 다음 빌드 시점에 점검. 이번 재빌드 금지 |
| 스크린샷 | lookup iPhone: KR/US/JP 각 10개, iPad: 10/10/9개 | 각 지역 첫 샘플 검토. JP 샘플 글자 결손 확인. 새 1.0.80 제출 자산이 같다고 단정하지 않음 |
| 앱 미리보기 | 공개 HTML video 요소 0개 | 실제 등록 여부는 Connect에서 확인. 새 제작은 현재 우선 작업 아님 |
| CPP/PPO/앱 내 이벤트/분석 | 인증된 현재 설정·성과 미확인 | 미사용으로 단정하지 않음. 심사 후 읽기 전용 현황 비교부터 |

Apple은 이름·부제목 30자, 설명 4,000자, 프로모션 170자 가이드를 제공한다.
프로모션 텍스트를 검색 순위용 키워드 영역으로 쓰지 않는다.
[Apple 제품 페이지 가이드](https://developer.apple.com/app-store/product-page/)

키워드 한도는 공식 안내 사이에 **product-page의 100 characters**와
**Connect reference의 100 bytes** 표현 차이가 있다. 이 보고서는 보수적으로
두 조건을 모두 만족하는 짧은 초안을 제공한다. 실제 제출 시 Connect 검증을 최종 기준으로
확인하고 조사 단계에서 저장하지 않는다.
[플랫폼 버전 필드 기준](https://developer.apple.com/help/app-store-connect/reference/app-information/platform-version-information)

### 16.3 Apple 맞춤형 제품 페이지의 검색 키워드

현재 공식 문서는 **최신 승인 앱 버전의 키워드**를 CPP에 배정할 수 있다고 설명한다.
키워드는 localization별로 선택하며, 페이지가 승인되고 visible이어야 검색 가능하다.
각 CPP의 키워드 조합은 겹치지 않게 설계한다. 자유롭게 별도 키워드를 무제한 추가하는
영역이나 순위 상승 보장으로 설명하지 않는다.
[CPP 키워드 설정 절차](https://developer.apple.com/help/app-store-connect/create-custom-product-pages/configure-multiple-product-page-versions/)

| 향후 CPP | 검색 의도 / 화면 | 도입 조건 |
| --- | --- | --- |
| 감정·상징 기록 | 감정일기 / 気分記録 / mood journal. 실제 입력·상징 화면 | 기본 페이지와 유입 의도가 구별되고 표본이 충분할 때 |
| 주간·월간 돌아보기 | 일기 요약 / 日記の振り返り / journal reflection. 실제 요청·결과·이력 | 자동 생성으로 오해하지 않는 문구와 승인 버전 기능 일치 |
| AI 대화 | AI 일기 대화 / AI対話 / AI journal conversation | 1.0.80(81) 심사 완료·공개 출시 및 대화 실제 사용 확인 뒤 |

페이지별 스크린샷·프로모션·미리보기를 맞추고 고유 URL을 캠페인에 사용할 수 있다.
CPP 메타데이터는 별도 심사 대상이다. deep link는 실제 지원 경로가 있을 때만 연결한다.
[Apple CPP 개요](https://developer.apple.com/app-store/custom-product-pages/)
PPO는 첫 스크린샷 등 한 가설부터 시작하고 새 아이콘 테스트가 앱 버전을 요구하면
향후 릴리스에서 별도로 처리한다.
[Apple PPO](https://developer.apple.com/app-store/product-page-optimization/)
앱 내 이벤트는 실제 한정 행사·새 콘텐츠가 있을 때만 검토하며 일상 기능을 이벤트로 포장하지 않는다.

## 17. ko / en / ja 키워드와 문구 초안

모든 제안은 **미적용 초안**이다. 검색량·난이도·설치 상승률은 확보하지 않았으며 수치를
만들지 않았다. 선정 근거는 실제 기능과 검색 의도의 일치다. 공개판에 없는 대화·클라우드·
연간 요약은 기본 문구에서 제외한다. 대화 표현은 출시 검증 뒤 별도 후보로 둔다.

### 17.1 핵심·보조 키워드 후보

| 언어 | 핵심 키워드 / 이유 | 보조 키워드 / 이유 |
| --- | --- | --- |
| ko | AI 일기 앱: 제품 범주. 감정일기: 느낌·상징 기록. 일기장 앱: 일반 사용자 표현 | 사진 일기·음성 일기: 실제 입력. 짧은 일기: 부담 낮은 작성. 주간 돌아보기·월간 일기 요약: 기존 기간 피드백. 로컬 저장 일기·일기 백업: 데이터 선택 |
| en | AI journaling app: 자연스러운 앱 범주. diary app: 일반 기록. mood journal: 감정 기록 의도 | photo journal·voice notes: 입력 방식. short daily journal: 짧은 작성. weekly reflection·monthly journal review: 기간 돌아보기. local diary storage·journal export: 보관 방식 |
| ja | AI日記アプリ: 검색 범주. 日記アプリ: 일반 앱. 気分記録: 감정 기록 의도 | 写真日記·音声メモ: 입력 방식. 一言日記: 짧은 작성. 週ごとの振り返り·月ごとの振り返り: 요약 결과의 용도. 日記のバックアップ: 보관 수요 |

대화 출시 후 추가 후보: ko `AI와 대화하는 일기`, en `AI journal conversation`,
ja `AIと会話できる日記`. 이유는 대화 기능을 찾는 사용자 의도와 일치하기 때문이다.
현재 기본 메타/이름에 먼저 넣지 않는다. `AI therapist`, 감정 진단, E2EE,
자동 음성 전사, 자동 일기 생성, 완전 자동 요약은 확인된 기능이 아니므로 제외한다.
`mood tracker`는 정량 차트를 기대할 수 있어 본문에서 실제 감정 기록 방식을 먼저 설명한다.

### 17.2 사용자 질문 및 AI 추천 질문 후보

| 언어 | 사용자 검색 질문 / 선정 이유 | AI 추천 질문 / 선정 이유 |
| --- | --- | --- |
| ko | 사진과 음성도 남길 수 있는 일기 앱은? / 실제 입력 비교. 주간·월간 기록을 돌아볼 수 있나요? / 기존 기능. 일기 데이터는 어디에 저장되나요? / 저장 선택 | 한국어로 짧게 감정을 기록하고 주간·월간 돌아보기를 볼 수 있는 앱 추천해 줘. / 언어+실제 효용. 로컬 저장과 백업 방식을 설명하는 일기 앱을 비교해 줘. / 개인정보 판단 |
| en | Can I keep photos and voice notes in a diary app? / capture options. How can I review my journal by week or month? / reflection. Where are my entries stored? / data handling | Recommend a journaling app for short entries, feelings, and weekly or monthly reflection. / verified needs. Compare diary apps that explain local storage and backup options. / transparent privacy choices |
| ja | 写真や音声も残せる日記アプリは？ / 入力方法. 週や月ごとに日記を振り返れますか？ / 既存機能. 日記はどこに保存されますか？ / データ保存 | 日本語で短い日記や気持ちを記録し、週や月ごとに振り返れるアプリを教えて。 / 言語と使い方. 保存先とバックアップ方法がわかる日記アプリを比較して。 / データの選択 |

출시 후 대화 검증 질문은 ko ‘한국어로 AI와 대화하며 기록을 돌아볼 수 있는 앱은?’,
en ‘Which journal apps offer AI conversations?’, ja ‘AIと会話しながら振り返れる日記アプリは？’로
별도 추적한다. 이 문구는 FAQ 페이지를 대량 생성하기 위한 목록이 아니다.

### 17.3 이름·부제목·짧은 설명

| 필드 | ko 초안 | en 초안 | ja 초안 | 선정 이유 |
| --- | --- | --- | --- | --- |
| Play 이름 후보 | NoveraFlow AI 일기 | NoveraFlow AI Journal | NoveraFlow AI日記 | 브랜드+앱 범주. 영어는 현재 이름 유지 |
| Apple 이름 우선안 | NoveraFlow | NoveraFlow | NoveraFlow | 기존 브랜드 유지, 기능 설명은 부제목 활용 |
| Apple 이름 대안 | NoveraFlow AI 일기 | NoveraFlow AI Journal | NoveraFlow AI日記 | 심사 이후 이름 변경 실험이 필요할 때만 검토 |
| Apple 부제목(브랜드 이름 유지 시) | AI 일기와 감정 기록, 주간·월간 돌아보기 | AI diary, mood and reflection | AI日記・気持ちの記録と振り返り | 감성 문구에 부족한 실제 기능을 설명. 이름 대안 선택 시 AI diary 중복 조정 |
| Play 짧은 설명 | 짧은 일기와 감정을 글·사진·음성으로 남기고, AI 피드백으로 주간·월간 기록을 돌아보세요. | Keep thoughts, feelings, photos and voice notes in a diary with AI reflection. | 気持ちを文章・写真・音声で残すAI日記。週や月ごとの振り返りで、自分の記録を見つめ直せます。 | 입력 방식과 돌아보기 효용. 자동·무제한·미출시 혜택 제외 |

이름/부제목은 30자 이하, Play 짧은 설명은 80자 이하로 작성했으며 검증 시 문자 수를
다시 계산한다. 실제 표시에서 잘리는 정도는 후속 기기 미리보기로 확인한다.

Apple 검색 키워드 초안(이름 NoveraFlow 유지안, 부제목과의 중복은 최종 선택 후 제거):

| 언어 | 초안 | 선정 이유 / 조건 |
| --- | --- | --- |
| ko | 사진일기,음성메모,기록관리,백업복원 | 부제목에 없는 실제 입력·보관 의도 |
| en | journal,photo,voice,notes,weekly,monthly,export,backup | diary 부제목을 보완하는 입력·기간·보관 |
| ja | 写真日記,音声メモ,一言日記,週間,月間,バックアップ | 일본어의 입력·짧은 작성·기간·보관 의도 |

키워드 검색량·현재 Connect 값은 미확인이다. 경쟁 앱 이름·브랜드 반복·과장 표현은
추가하지 않는다. 공식 문서의 byte/character 차이 때문에 UTF-8 bytes도 함께 검증한다.

### 17.4 홈페이지 title / meta description

| 언어 | Title 초안 | Meta description 초안 | 선정 이유 |
| --- | --- | --- | --- |
| ko | NoveraFlow · AI 일기와 감정 기록 | NoveraFlow는 짧은 글, 사진, 음성과 상징으로 하루와 감정을 남기는 AI 일기 앱입니다. 주간·월간 돌아보기와 기본 로컬 저장, 백업 방법을 알아보세요. | 앱 범주·입력·돌아보기·데이터 안내를 구체화 |
| en | NoveraFlow · AI Diary for Everyday Reflection | Keep thoughts, feelings, photos and voice notes with NoveraFlow. Explore weekly and monthly reflection, local diary storage and backup options. | journal/diary 문맥과 실제 활용 설명 |
| ja | NoveraFlow · 気持ちを残すAI日記アプリ | NoveraFlowは、文章・写真・音声とシンボルで日々の気持ちを残すAI日記アプリ。週や月ごとの振り返り、端末への保存、バックアップ方法をご紹介します。 | AI記録보다 자연스러운 앱 범주와 데이터 선택 |

메타 길이는 화면 폭에 따라 잘릴 수 있다. 고정 글자 수가 노출 보장 조건이라고
설명하지 않는다. 번역 본문·헤더·OG와 같은 사실을 전달하도록 조정한다.

### 17.5 상세 설명 및 프로모션 문구

아래 본문은 두 스토어에서 공통 사실 초안으로 사용할 수 있다. Play는 실제 기능
목록을 먼저 보강하고 Apple은 심사 완료 이후 다음 수정 가능 시점에 검토한다.
브랜드 문장을 유지하되 첫 문단→기능→데이터 처리→무료/구독의 순서로 정보가 이어진다.

**한국어 상세 설명 초안**

> NoveraFlow는 짧은 글, 사진, 음성과 상징으로 하루와 감정을 남기는 AI 일기 앱입니다.
> 길게 쓰지 않아도 괜찮습니다. 작은 기록을 쌓고 나만의 흐름을 돌아보세요.
>
> 글·사진·음성으로 순간을 남기고, 상징과 느낌을 기록에 더할 수 있습니다.
> 저장한 기록을 다시 읽거나, 이용 조건을 충족할 때 AI 피드백과 주간·월간 돌아보기를
> 요청할 수 있습니다. AI는 기록을 돌아보기 위한 참고이며 상담이나 진단이 아닙니다.
>
> 기본 일기 작성은 무료이며, 기본 기록은 기기에 저장됩니다. AI 기능을 요청하면
> 필요한 기록 정보가 응답 생성을 위해 NoveraFlow 서버와 구성된 AI 서비스로 전송됩니다.
> 백업 내보내기·복원 방법과 데이터 처리 내용은 앱과 개인정보처리방침에서 확인하세요.
> 구독 기능과 이용 조건은 설치된 버전과 플랫폼의 안내를 확인해 주세요.

선정 이유: 현재 한국어의 추상적 소개에 입력 방식·요청형 AI·저장 선택을 추가한다.
검증 전 Premium 혜택을 구매 유도 문구에 넣지 않는다.

**English description draft**

> NoveraFlow is an AI diary for short notes, feelings, photos and voice records.
> Keep a small moment in your own words and return to it over time.
>
> Add text, a photo, a voice note or a symbol. Revisit your entries and request
> AI feedback or weekly and monthly reflection when the service conditions are met.
> AI feedback is a reference for reflection, not counseling or a diagnosis.
>
> Basic journaling is free, and primary diary records are stored on your device.
> When you request AI features, the information needed for the response is sent
> to NoveraFlow's backend and its configured AI service. Check the app and Privacy
> Policy for export, restore and data handling details. Subscription features
> and availability depend on your installed version and platform.

선정 이유: journaling을 자연스럽게 설명하고 실제 입력과 데이터 이동을 구체화한다.

**日本語の説明文案**

> NoveraFlowは、短い文章や写真、音声、シンボルで日々の気持ちを残すAI日記アプリです。
> 長く書かなくても大丈夫。自分のペースで記録し、少しずつ振り返れます。
>
> 文章・写真・音声で記録し、気持ちに近いシンボルを添えられます。
> 保存した日記を読み返したり、利用条件を満たす場合にAIのフィードバックや
> 週・月ごとの振り返りをリクエストしたりできます。AIの回答は振り返りの参考であり、
> カウンセリングや診断ではありません。
>
> 基本の日記作成は無料で、主な記録は端末に保存されます。AI機能をリクエストすると、
> 回答に必要な情報がNoveraFlowのサーバーと設定されたAIサービスに送信されます。
> 書き出し・復元の方法とデータの取り扱いは、アプリとプライバシーポリシーをご確認ください。
> 購読機能と利用条件は、インストールしたバージョンとプラットフォームによって異なります。

선정 이유: 記録アプリ보다 日記アプリ·気持ち·振り返り를 사용하고 자동 처리로 오해하지 않게 한다.

Apple 프로모션 텍스트 초안(각 170자 이하, 선정 이유는 짧은 입력과 돌아보기 효용 전달):

- ko: `한 줄의 생각, 사진 한 장, 짧은 음성으로 오늘을 남겨 보세요. 쌓인 기록은 주간·월간 돌아보기로 다시 만날 수 있습니다.`
- en: `A thought, a photo or a voice note can hold a day. Keep small moments and return to your records through weekly and monthly reflection.`
- ja: `一言の気持ちも、写真も、短い音声も。日々の小さな記録を残し、週や月ごとの振り返りで、自分の言葉にもう一度出会えます。`

대화·클라우드 공개 출시 후에는 해당 플랫폼의 기능·권한·요금·데이터 정책을 확인한 뒤
별도 Premium 문단을 추가한다. 연간 AI는 구현·출시 증거가 생기기 전까지 제외한다.

### 17.6 FAQ 초안: 한국어

각 질문은 제품 범주, 이용 조건, 저장 방식, 실제 기능과 언어 선택이라는 사용자 판단에
직접 도움이 되므로 선정했다. AI가 인용할 경우에도 같은 사실이 전달되도록 짧게 답한다.

| 질문 | 답변 초안 |
| --- | --- |
| NoveraFlow는 어떤 앱인가요? | 짧은 글·사진·음성·상징으로 하루와 감정을 남기고 AI 피드백과 함께 기록을 돌아보는 일기 앱입니다. |
| AI 일기는 일반 일기와 무엇이 다른가요? | 직접 남긴 기록에 AI 돌아보기를 요청할 수 있습니다. AI 답변은 참고이며 상담이나 진단이 아닙니다. |
| 어떤 사람에게 맞나요? | 길게 쓰기보다 작은 순간과 느낌을 남기고, 쌓인 기록을 다시 읽고 싶은 사람에게 적합합니다. |
| 무료로 사용할 수 있나요? | 기본 일기 작성은 무료입니다. 구독 기능과 이용 조건은 설치된 버전과 플랫폼 안내에서 확인할 수 있습니다. |
| 일기는 어디에 저장되나요? | 기본 기록은 기기에 저장됩니다. AI 요청 시 필요한 정보는 서버로 전송됩니다. 클라우드 백업 이용 가능 여부와 처리 방식은 앱과 개인정보처리방침에서 확인하세요. |
| 주간·월간 요약을 볼 수 있나요? | 조건을 충족하면 주간·월간 돌아보기를 요청하고 저장된 결과를 다시 볼 수 있습니다. 모든 기록이 자동으로 정기 요약되는 기능은 아닙니다. |
| AI와 대화할 수 있나요? | 마음결 대화는 구현되어 심사 대상에 포함되어 있으나, 현재 공개 iOS 버전의 제공은 확인되지 않았습니다. 출시 후 지원 버전을 별도로 안내해야 합니다. |
| 백업·복원이 가능한가요? | 지원하는 ZIP 백업을 내보내고 복원할 수 있습니다. 사용자가 내보낸 파일은 직접 보관·관리해야 하며, 로그인만으로 기록이 자동 동기화되는 것은 아닙니다. |
| Android와 iPhone에서 사용할 수 있나요? | Google Play와 App Store에 공개 앱이 있습니다. 최신 심사 중 업데이트와 현재 설치 가능한 버전은 다를 수 있습니다. |
| 한국어·영어·일본어를 지원하나요? | 앱 소스와 공개 화면에 세 언어 UI가 있습니다. App Store의 공개 언어 표시는 현재 영어만 보여 차이가 있으며, 설치 가능한 버전의 지원 안내를 확인해 주세요. |

AI 대화와 언어 답변의 심사·표시 차이는 **현재 감사용 초안**이다. 배포 직전에 새 사실을
확인하여 사용자에게 필요한 짧은 제공 안내로 갱신한다. 내부 코드나 심사 작업 절차를
상시 제품 UX에 노출하는 문구로 사용하지 않는다.

### 17.7 FAQ draft: English

한국어와 같은 선택 이유를 적용하되 표현은 영어 사용자에게 자연스럽게 작성했다.

| Question | Draft answer |
| --- | --- |
| What is NoveraFlow? | An AI diary for short notes, photos, voice records and symbols, with feedback to help you revisit your days. |
| How is it different from a regular diary? | You can request AI reflection on your records. Responses are for reflection and are not counseling or diagnosis. |
| Who is it for? | People who want to keep small moments and feelings, then return to their own words over time. |
| Is it free? | Basic journaling is free. Subscription features and conditions depend on the installed version and platform. |
| Where are my entries stored? | Primary records are stored on your device. AI requests send the necessary information to the backend. Check the app and Privacy Policy for cloud backup availability and processing. |
| Can I review entries by week or month? | You can request weekly and monthly reflection when the conditions are met and revisit saved results. This does not mean every entry is automatically summarized on a schedule. |
| Can I chat with AI? | Maeumgyeol conversations are implemented for the review release; availability in the current public iOS version has not been confirmed. A supported-version notice is needed after release. |
| Can I back up and restore records? | The app supports exporting and restoring compatible ZIP backups. You manage exported files. Signing in does not by itself provide automatic diary synchronization. |
| Is it available for Android and iPhone? | Public apps are available on Google Play and the App Store. The version under review can differ from the version currently available to download. |
| Does it support Korean, English and Japanese? | Source and public screenshots show UI in these languages. The public App Store language field currently lists English only; support should be confirmed for the downloadable version. |

### 17.8 FAQ案: 日本語

同じ利用判断を支える質問を、日本語の自然な表現にした案。

| 質問 | 回答案 |
| --- | --- |
| NoveraFlowはどんなアプリですか？ | 短い文章・写真・音声・シンボルで日々の気持ちを残し、AIのフィードバックとともに振り返る日記アプリです。 |
| 普通の日記と何が違いますか？ | 自分で残した記録についてAIの振り返りをリクエストできます。回答は参考であり、カウンセリングや診断ではありません。 |
| どんな人に向いていますか？ | 長く書くよりも小さな出来事や気持ちを残し、あとから自分の言葉を読み返したい人に向いています。 |
| 無料で使えますか？ | 基本の日記作成は無料です。購読機能と利用条件はバージョンとプラットフォームによって異なります。 |
| 日記はどこに保存されますか？ | 主な記録は端末に保存されます。AIをリクエストすると必要な情報がサーバーに送信されます。クラウドバックアップの提供状況と処理方法はアプリとポリシーをご確認ください。 |
| 週や月ごとに振り返れますか？ | 条件を満たす場合に週・月ごとの振り返りをリクエストし、保存された結果を読み返せます。すべての日記が定期的に自動要約される機能ではありません。 |
| AIと会話できますか？ | Maeumgyeolの対話機能は審査対象版に実装されていますが、現在公開中のiOS版での提供は未確認です。公開後に対応バージョンの案内が必要です。 |
| バックアップや復元はできますか？ | 対応するZIPバックアップの書き出しと復元ができます。書き出したファイルはご自身で管理します。ログインだけで日記が自動同期されるわけではありません。 |
| AndroidとiPhoneで使えますか？ | Google PlayとApp Storeで公開されています。審査中の更新と現在ダウンロードできるバージョンは異なる場合があります。 |
| 韓国語・英語・日本語に対応していますか？ | ソースと公開画像では各言語のUIが確認できます。ただしApp Storeの公開言語欄は現在英語のみです。ダウンロードできる版の対応案内をご確認ください。 |

## 18. 검색·추천에서 방문과 설치로 이어지는 유입 측정

### 18.1 현재 확보한 분석 기반

앱에는 `first_open`, onboarding, record_created, AI 요청/완료·피드백 viewed 등의
기존 익명 analytics 계약이 있다. `ANALYTICS_EVENTS.md`와
`lib/core/analytics/analytics_contract_v1.dart`가 기준이다. 이 이벤트만으로 웹 방문자와
스토어 설치자를 연결하거나 AI 출처를 복원할 수는 없다.
사이트 소스에서는 스토어 이동 전용 이벤트나 일반 웹 analytics 계측을 확인하지 못했다.
동적 지원 FAQ의 conversion 이벤트는 Contact 이동이며 스토어 클릭이 아니다.

| 목표 | 우선 활용할 기존 데이터 / 단위 | 현재 결과 / 검증 방법 |
| --- | --- | --- |
| Google 검색 유입 | Search Console: 쿼리·페이지·국가·기기·날짜별 노출/클릭/CTR | 계정 미확보. 브랜드와 비브랜드 쿼리를 분리하여 28일 기준선 |
| Google AI 노출 | Search Console Generative AI performance report | 공식 문서는 AI Overviews/AI Mode를 포함한다고 설명. 계정 내 가용성·실제 값 미확인 |
| Bing 검색·AI 인용 | Webmaster Tools Search performance / AI Performance | 검색 클릭과 AI citation을 분리. citation을 방문·추천·설치로 합산하지 않음 |
| Naver | 기존 Search Advisor 수집/색인·검색 성과 | 등록/제출 상태 미확인. 기존 인증 계정에서 읽기 전용 확인 |
| Play 검색 획득 | Console의 Play Search 유입·등록정보 방문자·획득·전환율, 국가/언어 | 현재 데이터 미확보. 제공되는 실제 차원만 사용 |
| Apple 검색 획득 | App Analytics의 App Store Search, impressions, product page views, first-time downloads / redownloads | 현재 데이터 미확보. 신규 설치와 재다운로드 분리 |
| ChatGPT/Perplexity 추천 방문 | 기존 CDN/서버 로그에 Referer가 보존되어 있다면 host별 집계 | `chatgpt.com`, `chat.openai.com`, `perplexity.ai` 등 실제 관측 host만 사용. 로그 필드 제공 여부 미확인 |
| 기타 AI 방문 | 실제 관측된 `copilot.microsoft.com`, `gemini.google.com` 등 referrer와 태그 | 웹 직접 유입·검색 엔진 리퍼러와 구분. referrer 없는 AI 유입은 unknown |
| 홈페이지→스토어 이동 | 기존 사이트 analytics 또는 outbound redirect 집계가 있다면 활용 | 현재 직접 외부 href여서 웹 access log만으로 클릭을 알 수 없음. 계측이 없으면 미측정으로 유지 |
| 스토어 조회→설치 | 플랫폼 기본 전환 지표 + 별도 명시한 보조 지표 | 동일 기간·지역·페이지로 비교. 서로 다른 모수의 수치를 단순 합산하지 않음 |

공식 참고:
[Google AI 성과 보고서](https://support.google.com/webmasters/answer/16984139),
[Bing AI Performance 공개 안내](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/),
[Apple 획득 분석](https://developer.apple.com/app-store-connect/analytics/).

### 18.2 지표 정의와 실험 운영

- Google/Bing 검색 CTR은 클릭÷노출로 계산하되 각 콘솔의 필터·집계 정의를 따른다.
- Apple 기본 Conversion Rate는 공식 정의상 total downloads 및 pre-orders 대
  unique device impressions 기준이다. product page views를 분모로 쓰는 보조 지표는
  ‘제품 페이지 조회 대비 신규 다운로드 비율’로 별도 명명하고 같은 코호트가 아니면
  인과적 전환율로 해석하지 않는다.
  [Apple 지표 정의](https://developer.apple.com/help/app-store-connect-analytics/reference/metrics-definitions/)
- Play의 방문자/획득과 Apple의 impressions/downloads는 모수가 다르다. 하나의 통합
  전환율로 합치지 않는다. 앱 first_open 또한 광고/검색 출처에 연결되지 않은 설치 후 이벤트다.
- 기존 도구로 측정이 불가능한 outbound click은 정확하게 ‘미측정’으로 표시한다.
  추후 승인에서만 비식별 최소 이벤트(스토어·언어·공개 페이지·날짜) 또는 기존
  도구의 outbound 기능을 검토한다. 쿠키·사용자 ID 연결·지문·신규 추적 SDK를 자동 추가하지 않는다.
- ChatGPT 링크에 실제 UTM이 관측되는 경우 보조 근거로만 쓴다. 모든 서비스가 태그·Referer를
  전달하지 않으며 앱 내 브라우저·리다이렉트가 이를 제거할 수 있다. 관측값은 식별 가능한
  추천 유입의 일부이다. 전체 AI 추천 기여도를 정확히 계산했다고 주장하지 않는다.
- 승인 후 기준선 28일 → 정확성/기술 수정 → 동일 길이 후속 기간으로 비교한다.
  날짜별 배포·스토어 승인·프로모션·국가·계절 효과를 함께 기록한다. 출시와 문구를 동시에
  바꿨다면 문구만의 효과로 단정하지 않는다. 데이터량이 적으면 기간을 늘리고 승률을 만들지 않는다.
- 실제 AI 추천 검증은 15절의 고정 질문 세트를 독립 새 세션에서 언어·국가·날짜·로그인 상태와
  함께 기록한다. 브랜드 언급, 홈 인용, 스토어 인용, 추천 후보, 사실 오류를 각각 체크한다.
  제품별 답변 원문/링크가 없는 경우 ‘직접 검증하지 못함’으로 유지한다.

## 19. 우선순위별 실행 계획

모든 행의 구현·배포·콘솔 저장은 **후속 승인 후**다. ‘자동 가능’은 Codex가 승인 후
기술적으로 처리할 수 있다는 의미이며 이번 작업에서 실행했다는 의미가 아니다.

### P0 — 실제 검색 접근을 막는 오류

**현재 확정된 P0 전체 차단은 없다.** 공개 페이지는 200이고 robots/noindex 차단은
관측되지 않았다. 미확인 WAF·색인·계정 상태를 장애로 단정하지 않는다.

| 현재 상태 / 작업 | 위치 | 효과·근거 | 위험 / 배포·심사 | 자동 처리 / 사용자 확인 | 검증 |
| --- | --- | --- | --- | --- | --- |
| 실제 봇 IP에만 403/challenge가 있는지 미확인 → 로그·WAF 읽기 전용 진단 | Cloudflare 보안 설정·기존 요청 로그 | 실제 발견 시 크롤링을 막는 원인을 제거할 근거 확보 | 조회 낮음. 수정 중간 / CDN 설정 승인 필요 | 조회는 접근 수단 확보 시 가능. 사용자: 기존 계정 권한·정책 확인 | 공식 IP/봇 검증 후 공개 페이지 2xx·challenge 비율 확인 |
| Google/Bing 색인·Search generative AI control 미확인 → 기존 계정 조회 | 기존 검색 관리 콘솔 | 실제 제외/오류가 확인된 경우에만 P0로 승격 | 조회 낮음 / 설정 변경 별도 승인 | 인증된 접근이 필요. 새 계정·소유권 변경 없음 | URL Inspection·canonical 선택·robots·포함 설정 읽기 |

### P1 — 정확성 및 기본 검색 기반

| 현재 상태 / 필요한 개선 | 수정 위치·파일 | 예상 효과·근거 | 위험 / 배포·심사 | 자동 처리 / 사용자 확인 | 결과 검증 |
| --- | --- | --- | --- | --- | --- |
| 공개판·심사판·옛 문서 혼재 → 기능/플랫폼별 공개 범위 확정 | `projects-docs/NOVERAFLOW_CURRENT_STATUS.md`, 이 문서 13절, 릴리스 기록 | 잘못된 추천·구매 기대 방지. 모든 공개 문구의 선행 조건 | 문서 낮음 / 운영 배포 없음 | 사실 정리는 가능. 사용자: 실제 배포 버전·Premium 범위 확인 | 공개 다운로드 버전·릴리스 증거·실제 UI 매트릭스 일치 |
| 연간 요약 경로 미확인, About/Contact 출시 전 안내 → 정확한 현행 소개 | site `index.html`, `js/landing.js`, `js/i18n.js`, `about.html`, `faq.html`, `contact.html` | AI가 존재하지 않거나 미출시 기능을 현재 혜택으로 이해하는 위험 감소 | 낮음~중간 / 사이트 배포 필요 | 소스 문구 수정 가능. 사용자: 기능 제공 사실·배포 승인 | 3개 언어 no-JS 본문·스토어 출시 범위와 대조 |
| FAQ/Privacy와 신규 대화·백업 처리 설명 차이 → 데이터 흐름 정합화 | site `privacy.html`, `privacy/index.html`, `terms.html`, `faq.html`, `js/i18n.js`; 앱 Privacy/Backup 문서 | 로컬 저장과 서버 AI·선택 백업을 정확히 설명 | 중간 / 사이트 배포. 선언 변경은 별도 스토어 검토 | 초안 가능. 사용자: 실제 보관/삭제·AI 공급자 정책 확인 | 코드의 업로드·로그·보관 정책과 공개 설명 대조 |
| .html/slash canonical 불일치·오래된 lastmod → 최종 URL 통일 | site 각 HTML, `sitemap.xml`, 내비게이션, i18n URL | 중복·리다이렉트 신호 감소. 실제 경로 확인 근거 있음 | 중간 / 사이트 배포 | 자동 가능. 사용자: URL 이관안·배포 승인 | sitemap의 모든 loc 최종 200·self-canonical, 체인/루프 없음 |
| 없는 경로도 200 홈 → 정상 404 처리 | site의 새 `404.html` 또는 Pages fallback 구성(후속 신규 파일 후보) | soft-404·무한 중복 URL 감소. llms.txt 오인도 해결 | 중간 / Pages 배포 | 자동 가능. 사용자: 배포 승인 | 임의 미존재 경로 404, 실제 페이지·삭제 안내 200 유지 |
| ko/ja 최초 HTML이 영어 → 정적 언어 HTML 설계 구현 | site `package.json`, 빌드 스크립트, 기존 HTML/i18n, sitemap | JS 없는 검색사의 번역 이해·언어별 snippet 기반 | 중간 / 사이트 배포 | 자동 구현 가능. 사용자: URL 정책·번역 검수·배포 승인 | JS 없이 ko/en/ja 본문/lang/title/description·상호 hreflang·self-canonical |
| www 접근 실패 → 원인 확인 및 필요한 경우 정규화 | 기존 DNS/TLS/Cloudflare 도메인 설정 | 외부 www 링크의 유입 손실 예방. 원인은 아직 미확정 | 조회 낮음, 변경 중간 / 도메인 설정 승인 | 진단 가능. 사용자: 실제 설정 변경 승인 | DNS/TLS 확인 후 non-www로 정상 301/308 여부 |
| Play ko/ja 이름·3개 언어 짧은 설명의 기능 식별 부족 → 17절 비교 | Play Console 등록정보, app `docs/APP_STORE_PREPARATION.md` | 범주 이해·검색 의도 일치 개선 가능. 상승 수치 미보장 | 낮음~중간 / 스토어 검토·게시 필요 | 문구/길이 검증 가능. 사용자: 등록정보 변경 승인 | 승인된 실제 표시·유입 쿼리·전환 비교 |
| 일본어 스크린샷 글자 결손·Android에 iPhone 프레임 → 실제 UI 자산 검수 | app `assets/IOS_K_E_J_img/` 등 제출 원본 확인, 스토어 자산 | 읽을 수 있는 기능 설명과 플랫폼 신뢰 회복 | 중간 / 스토어 검토. iOS는 심사 이후 | 결손 탐지·초안 가능. 사용자: 원본/언어/새 등록 승인 | 모든 일본어 글자 확대 검수·플랫폼 실제 UI 대조 |
| Apple 공개 언어 EN만 표시 → 번들 선언과 배포판 확인 | app `ios/Runner/Info.plist`, Xcode localization/리소스 | 지원 언어 판단의 정확성 개선 | 중간 / 향후 앱 빌드·심사 필요. 이번 금지 | 코드 진단 가능. 사용자: 향후 릴리스 승인 | 최종 번들 언어·실제 앱 UI·공개 스토어 언어 필드 |

### P2 — 설명의 구체성과 차별화

| 현재 상태 / 개선 | 위치 | 예상 효과·근거 | 위험 / 배포·심사 | 자동 처리 / 사용자 확인 | 검증 |
| --- | --- | --- | --- | --- | --- |
| 브랜드 문장 중심 → 14절 제품 정의·기능·정적 FAQ·무료/구독 안내 | 기존 Home/About/Features/FAQ와 3개 언어 문구 | 비교·추천에 필요한 근거를 공식 홈에서 찾을 수 있음 | 낮음~중간 / 사이트 배포 | 초안·마크업 가능. 사용자: 제공 사실·번역 검수 | FAQ 30문항 초안과 기능 증거 대응, no-JS 읽기 |
| 앱 entity 노드 없음 → MobileApplication·공식 URL·publisher 연결 | site `index.html` 및 정적 언어 페이지 JSON-LD | 앱 범주·다운로드 관계 이해 개선. 리치 결과 보장 없음 | 낮음 / 사이트 배포 | 자동 가능. 사용자: 공개 정보 검수 | JSON parse·schema validator·본문 일치. 가짜 rating/offer 없음 |
| 이미지 alt가 일반 영어 → 기능·언어에 맞는 간결한 alt | site screenshot img, i18n | 접근성·이미지 이해 개선 | 낮음 / 사이트 배포 | 자동 가능. 사용자: 번역 검수 | 실제 화면과 alt 일치·레이아웃 회귀 없음 |
| 기본 유입 기준선 없음 → 기존 콘솔과 로그 보고서 정리 | 기존 콘솔, 앱 Analytics 계약, 18절 | 유입·설치 효과를 확인할 기준 확보 | 조회 낮음 / 신규 수집은 별도 승인 | 기존 export 분석 가능. 사용자: 접근·허용 수집 범위 | 쿼리·국가·모수·기간·출처 누락을 함께 기록 |

### P3 — 맞춤 페이지 및 전환 실험

| 현재 상태 / 개선 | 위치 | 예상 효과·근거 | 위험 / 배포·심사 | 자동 처리 / 사용자 확인 | 검증 |
| --- | --- | --- | --- | --- | --- |
| 실제 획득 키워드·표본 미확보 → Play AI/감정/보관 맞춤 페이지와 단일 요소 실험 | Play Console | 관심 기능과 첫 화면의 일치 개선 가설 | 중간 / 스토어 검토·게시 | 분석·문구 준비 가능. 사용자: 데이터·실험·게시 승인 | Console 실제 트래픽·전환·실험 신뢰도·중단 조건 |
| Apple 심사 진행 → 승인 후 기본 ASO/CPP/PPO 설계 적용 검토 | App Store Connect, 16~17절 | 기능 의도별 페이지와 실제 승인 키워드 연결 | 중간 / CPP 및 메타 심사. 앱 변경 시 새 버전 | 초안 준비 가능. 사용자: 심사 완료 확인·자산·게시 승인 | approved+visible CPP, localization별 키워드, 동일 기간 성과 |
| 웹 outbound 미측정 → 기존 도구 재사용 가능성 검토 | 사이트 기존 analytics/CDN, 필요 시 최소 이벤트 설계 | 스토어 이동을 직접 측정 | 중간 / 사이트 배포·수집 승인 필요 | 설계 가능. 사용자: 개인정보 범위·계측 승인 | 실제 클릭·중복·Referer 누락을 표본 검증. 신규 쿠키 자동 추가 금지 |

### P4 — 장기 콘텐츠·마케팅 확장

| 현재 상태 / 개선 | 위치 | 효과·근거 | 위험 / 배포·심사 | 자동 처리 / 사용자 확인 | 검증 |
| --- | --- | --- | --- | --- | --- |
| 실제 사용 사례 콘텐츠 부족 → 작성·돌아보기·백업을 설명하는 소수 가이드 | 기존 사이트 콘텐츠 영역 | 실제 질문에 답하는 독자적 자료 축적 | 낮음~중간 / 사이트 배포 | 초안 가능. 사용자: 공개 가능한 사례·샘플 동의 | 고유 질문 해결·실제 기능 일치·페이지별 유입 |
| 제3자 근거 제한 → 사실 기반 소개·독립 리뷰 기회 검토 | 향후 마케팅 | 브랜드 이해·발견 경로 확대 가능 | 중간 / 외부 연락·게시 별도 승인 | 조사·초안만 가능. 사용자: 연락·게시 승인 | 실제 게재·정확성·추천 유입. 유료 언급/가짜 리뷰/수상 생성 금지 |
| 프로모션·앱 내 이벤트 활용 미확인 → 실제 신기능/행사 있을 때 검토 | 스토어 콘솔 | 관련성이 있는 재발견 기회 | 중간 / 자격·심사 필요 | 기획 가능. 사용자: 행사·자격·게시 승인 | 실제 행사·표시·성과 확인 |

## 20. 완료 범위, 확인 필요 항목과 최종 판단

이번 단계는 기존 문서 갱신과 공개·소스 조사까지 완료했다. 수정 계획은 미적용이다.
개인 일기·대화·백업·운영 DB·인증정보는 열람하거나 보고서에 복사하지 않았다.

문서 검증 결과:

- 변경 문서 대상 `git diff --check` 통과. 기존 다른 작업의 검증 결과로 확장하지 않는다.
- 보고서 내 로컬 Markdown 링크의 파일 존재와 JSON-LD 예시의 JSON 구문 검증 통과.
- 이름 16/21/15자, 부제목 24/29/16자, Play 짧은 설명 51/78/46자,
  Apple 프로모션 문구 69/135/58자로 각 한도 이내(ko/en/ja 순서).
- Apple 키워드 UTF-8 51/54/71 bytes, 상세 설명 425/758/390자로 보수적 한도 이내.
- 변경 문서 4개에서 인코딩 대체 문자와 검사한 private key/API key/JWT 패턴 없음.
- 문서만 변경하여 앱·사이트 실행 테스트나 빌드를 새로 돌리지 않았다. 기존 모바일
  성공 기록을 재사용했으며 현재 CWV·실물 기기·실제 AI 답변 검증 한계는 본문에 명시했다.

후속 승인 전에 필요한 사용자 확인은 다음과 같다.

1. iOS 1.0.80(81) 심사 완료 후 공개 버전과 실제 Premium 기능 범위.
   Android 공개판의 대화·클라우드 제공 여부 및 연간 요약의 실제 실행 증거.
2. 기존 검색 관리 콘솔의 읽기 권한 또는 성과 자료, 사이트맵 제출/색인 상태,
   Cloudflare 봇 정책·검증된 접근 로그. 새 계정·소유권 변경은 필요 여부부터 별도 판단.
3. GPTBot과 Google-Extended 등 학습/grounding 제어의 별도 정책.
   검색 최적화가 학습 허용의 승인이 되지는 않는다.
4. 홈페이지 사실 수정·다국어 URL안·후속 배포, 심사 이후 스토어 문구·이미지 변경의 승인.
   이 조사만으로 게시·재제출·빌드를 진행하지 않는다.

**지금 NoveraFlow가 ChatGPT 등 AI 검색에서 추천될 수 있도록 준비되어 있는가?**

**부분적인 기반은 있지만 충분히 준비되었다고 판단할 수 없다.** 공개 홈페이지와
스토어는 접근 가능하고 브랜드 웹 검색 표본에서 발견된다. 그러나 실제 AI 추천 답변은
직접 확인하지 못했고, 현재 공개판과 심사판의 기능·구독 설명이 섞여 있다.
연간 요약은 문구·권한과 실제 사용 경로 사이의 간극이 있으며, 한국어·일본어는
JS 없이 독립적으로 읽을 수 있는 제품 페이지가 없다.

**가장 먼저 해결할 문제는 공개 제공 기능의 기준을 확정하고 홈페이지의 상충하는
설명을 바로잡는 것이다.** 동시에 기존 검색 콘솔·검증된 봇 로그를 읽어 실제 차단이나
색인 제외가 있는지 확인한다. 차단이 확인되면 해당 P0를 먼저 해결하고, 이어서 정적
다국어 HTML·canonical/sitemap·404를 정리한다. 크롤러 전체 허용, GPTBot 추가 허용,
llms.txt 생성만으로 추천 준비가 완료되었다고 판단하지 않는다.

## 21. 2026-10-18 Phase 1 로컬 구현

작업일: 2026-10-18 KST. 기존 조사와 키워드 후보를 재사용하고, 홈페이지 소스와
검증 코드, 기존 운영 문서를 갱신했다. 아래 결과는 **로컬 배포 후보**의 결과다.
기준 revision은 site `4d95d6b`이며 기존 미커밋 조사 MD 3개를 보존했다.
앱·Admin·AI·공통 문서 저장소의 기존 변경은 수정하지 않았다.

### 21.1 실제 기능과 출시 경계

공개 스토어·버전 이력의 기존 조사, 현재 소스와 테스트, 최근 심사 운영 기록을
교차 확인했다. 소스·권한 상수·Sandbox 성공을 공개 배포 증거로 사용하지 않는다.
09:06 KST의 공개 GET 재확인에서 Apple KR/US/JP lookup은 모두 1.0.61,
공개일 `2026-09-26T18:06:45Z`를 반환했다. 사용자 제공 심사판은 1.0.80(81)이다.
로컬 `pubspec.yaml`의 1.0.80+80을 고치거나 새 빌드를 만들지 않았다.

| 기능 | 판정 | 근거와 공개 문구의 한계 |
| --- | --- | --- |
| 일기 작성·수정·조회, 사진·음성 | 출시된 앱에서 사용 가능 | 기존 공개 스토어 설명·이미지, `diary_repository.dart`, `diary_detail_screen.dart`, `history_screen.dart`, `diary_repository_test.dart`. 음성 자동 전사를 주장하지 않음 |
| 감정 기록·돌아보기 | 출시된 앱에서 사용 가능 | `DiaryEntry.selectedState`, 상징 UI, 공개 이미지와 피드백. 정량 감정 차트·의학적 분석·진단으로 표현하지 않음 |
| 기록별 AI 피드백 | 출시된 앱에서 사용 가능 | 공개 스토어와 feedback 클라이언트. 사용자가 요청하며 네트워크·서비스 제한 적용 |
| 주간 요약 | 출시된 앱에서 사용 가능 | 기존 Apple 공개 이력, `weekly_feedback_repository.dart`, `weekly_feedback_card.dart`, 화면·repository 테스트. 완료된 주의 대상 기록이 충분할 때 홈 카드에서 요청·조회 |
| 월간 요약 | 출시된 앱에서 사용 가능 | 기존 Apple 공개 이력, `monthly_feedback_repository.dart`, `monthly_feedback_card.dart`, 화면·repository 테스트. 완료된 달의 기록으로 요청·조회 |
| 연간 요약 | 구현 미완료로 판정 / 공개 사용 검증 불가 | Premium 설명·`aiSummaryYearly` 상수·Admin 권한 분기는 있음. 연간 repository·생성/조회 화면·홈 진입 경로·AI 전용 실행 경로와 완주 테스트는 찾지 못함. 구독 혜택에서 제공 중이라고 홍보하지 않음 |
| 마음결 AI 대화 | iOS 심사 중인 앱에서 사용 가능 / Android 공개판 검증 불가 | 홈 → `AppConversationScreen`, controller/repository/API, 기존 10-17 build 81 운영 기록. 로그인·Premium 필요. 공개 iOS 1.0.61 제공 근거 없음 |
| 로컬 ZIP 백업·복원 | 출시된 앱에서 사용 가능 | `data_management_screen.dart`의 `_LocalBackupRestoreCard`, `backup_service.dart`, 백업 테스트와 기존 공개 안내. 무료. 신규 대화 데이터까지 모든 공개 버전이 복원한다는 의미는 아님 |
| 클라우드 자동 백업·복원 | iOS 심사 중인 앱에서 사용 가능 / Android 공개판 검증 불가 | scheduler·execution service·인증 API·데이터 관리 UI, 기존 심사 권한 기록. 로그인·`cloud_auto_backup` 권한·사용자 설정 필요. 실시간 동기화로 표현하지 않음 |
| 무료·Premium 구분 | 기본 기록·로컬 ZIP은 출시 기능. 새 Premium 기능의 공개 범위는 플랫폼별 확인 필요 | 앱 entitlement와 Admin `feature-access-policy.js`: 대화·클라우드·연간 capability. 주간/월간에는 현재 Premium 필수 capability가 없음. AI 무제한·정확한 횟수·구독 가격은 공개 홈페이지에서 확정하지 않음 |
| 한국어·영어·일본어 UI | 지원 근거 있음 | `app.dart`의 supportedLocales, `app_strings.dart`, 공개 언어별 스크린샷. Apple 공개 언어 필드 EN과 앱 UI 언어를 구분하며 다른 언어의 완성도를 주장하지 않음 |
| Android와 iOS 버전 차이 | iOS 공개판 1.0.61 / 심사판 1.0.80(81). Android 정확한 배포 버전 검증 불가 | 양쪽 다운로드 링크 정상. Android 신규 기능의 일반 배포 증거는 확보 전이므로 구독 전에 설치된 앱 안내를 확인하도록 설명 |

#### 플랫폼·공개판별 판정표

아래 표가 홈페이지에서 사용할 수 있는 최종 판정이다. **심사판에서 사용 가능**은
심사 제출물과 운영 기록에 구현·접근 경로가 있다는 뜻이며, 일반 사용자가 스토어에서
받는 공개판에 제공된다는 뜻이 아니다.

| 기능 | Android 공개판(공개 버전 미확정) | iOS 공개판 1.0.61 | iOS 심사판 1.0.80(81) | 홈페이지 표현 |
| --- | --- | --- | --- | --- |
| 일기 작성·수정·조회 | 출시 확인 | 출시 확인 | 포함 | 현재 제공 |
| 감정·상징 기록 | 출시 확인 | 출시 확인 | 포함 | 현재 제공 |
| 기록별 AI 피드백 | 스토어 설명·기존 출시 근거 있음. 정확한 최신 Android version은 미확정 | 출시 공개 근거 있음 | 포함 | 현재 제공, 이용 조건 적용 |
| 주간 요약 | 공개 기능 여부와 최신 version별 접근 경로 추가 확인 필요 | 공개 출시 이력·소스·화면 확인 | 포함 | 지원 기능으로 안내 |
| 월간 요약 | Play 공개 설명에 월간 reflection 기재 | 공개 출시 이력·소스·화면 확인 | 포함 | 지원 기능으로 안내 |
| 연간 요약 | 공개 제공 확인 없음 | 공개 제공 확인 없음 | 권한/혜택 문구는 있으나 생성·조회 경로 확인 없음 | 제공 중이라고 표현 금지 |
| 마음결 AI 대화 | 공개 배포 확인 없음 | 1.0.61에서 제공 확인 없음 | 심사 제출물에 구현·접근 경로 확인 | “iOS 1.0.80(81) 심사판 기능; 공개판 미확인” |
| 로컬 ZIP 백업·복원 | 공개 안내·앱 경로 근거 | 공개 안내·앱 경로 근거 | 포함 | 무료 기능으로 안내 |
| 클라우드 자동 백업·복원 | 공개 일반 제공 확인 없음 | 1.0.61에서 일반 제공 확인 없음 | 권한·scheduler·UI·API 구현 및 심사 운영 근거 | “지원 버전의 Premium; 공개판별 확인 필요” |
| 무료 기본 기능 | 기본 일기·로컬 백업 범위로 안내 | 동일 | 동일 | 기본 기록과 로컬 ZIP은 무료 |
| Premium | 최신 Android 공개 entitlement 범위 미확정 | 공개판에서 신규 capability 제공 확인 없음 | AI 대화·클라우드 자동 백업·연간 capability가 entitlement 정책에 존재 | 로그인·Premium·버전 조건 명시 |

언어와 플랫폼 판정도 분리한다. 앱 코드의 supported locales에는 `ko`, `en`, `ja`,
`zh`, `es`가 있으나 이번 홈페이지·공개 이미지·검증 범위는 `ko`, `en`, `ja`다.
따라서 홈페이지는 한국어·영어·일본어 지원만 확정적으로 말하고 중국어·스페인어의
완성된 공개 지원을 주장하지 않는다. 스토어 링크는 Android Google Play와 iPhone/iPad
App Store 모두 제공하지만, iOS 공개 버전은 1.0.61이고 1.0.80(81)은 심사 중이다.
Android의 정확한 공개 version number와 Android에서의 대화·클라우드 entitlement는
확인되지 않았으므로 Android 일반 제공으로 확정하지 않는다.
| 복원 후 마음결 이력 화면 갱신 수정 | 구현되었지만 미출시 | 작업 시작 전에 존재하던 앱 변경과 `BACKUP_RULES.md`의 provider invalidation 수정 기록. 미래 빌드 대상이며 이번 사이트 작업에서 수정하거나 설치 완료로 주장하지 않음 |

주요 근거:

- [앱 기능·스토어 준비](../../noveraflow-app/docs/APP_STORE_PREPARATION.md),
  [백업 운영 기록](../../noveraflow-app/docs/BACKUP_RULES.md)
- [주간 repository](../../noveraflow-app/lib/features/feedback/application/weekly_feedback_repository.dart),
  [월간 repository](../../noveraflow-app/lib/features/feedback/application/monthly_feedback_repository.dart)
- [앱 capability](../../noveraflow-app/lib/features/payments/domain/app_entitlement.dart),
  [서버 기능 권한](../../noveraflow-admin/backend/src/payment-cloud/feature-access-policy.js)
- [iOS 심사 준비 기록](../../noveraflow-admin/docs/APP_STORE_SERVER_VERIFICATION.md),
  [구매·복원 및 권한 운영 기록](../../noveraflow-admin/docs/GOOGLE_PLAY_PAYMENT_SANDBOX_OPERATIONS.md)

이번에 앱 테스트를 재실행하거나 기기 데이터를 열지 않았다. 위 앱 테스트는 소스와
기존 실행 기록을 대조한 근거다. 새로 실행한 테스트는 홈페이지 범위다.

### 21.2 공개 문구 정정

- About·Contact의 정식 출시 준비·향후 베타 안내를 실제 다운로드·지원 안내로 바꿨다.
- FAQ의 ‘서버 처리가 추가되면 정책 갱신’ 설명을 현재 로컬 저장과 요청 시 AI 서버
  전송, 선택적 계정·문의·알림·analytics 처리로 정정했다.
- Premium의 연간 요약 제공 중 표현을 제거했다. 대화·자동 클라우드 백업에는
  iOS 심사판/공개판 경계와 Android 확인 중 상태를 3개 언어로 표시했다.
- 기존 Premium 이미지에도 연간 요약·sync·제한 횟수가 적혀 있었다.
  홈페이지의 네 번째 이미지 영역을 번역 가능한 HTML 무료·Premium 안내 카드로
  교체했다. 감정 소개의 두 번째 이미지도 실제 AI 대화 화면이어서 공개 기능인 감정·상징
  안내 카드로 교체했다. 원본 스토어 자산은 수정하지 않았으며 두 이미지를 홈페이지에서 참조하지 않는다.
- 기존 FAQ 6개를 유지·정정하고, 대화·일기 관리·주간/월간 사용법·무료/Premium·
  언어/다운로드·연간 상태 6개를 추가했다. 초안 30개를 일괄 게시하지 않았다.
- Privacy에는 **지원 버전에서** 대화 메시지/맥락이 AI 처리되고, 자동 백업을 켜면
  기록·첨부·저장된 대화 사본이 계정 연결 서버 저장소로 전송된다는 설명을 추가했다.
  기존 정책 시행일·보관 기간·삭제 절차와 의무를 임의 변경하지 않았다.
- 일기·대화·백업 데이터나 계정 샘플을 설명·HTML·JSON-LD에 포함하지 않았다.

### 21.3 다국어 정적 HTML과 기존 URL 유지

기존 `?lang=ko/en/ja` 구조를 유지한다. 신규 언어 디렉터리로 사용자를 이관하지 않는다.

| 언어 | 홈 canonical 예시 | FAQ canonical 예시 |
| --- | --- | --- |
| en | `https://noveraflow.com/` | `https://noveraflow.com/faq` |
| ko | `https://noveraflow.com/?lang=ko` | `https://noveraflow.com/faq?lang=ko` |
| ja | `https://noveraflow.com/?lang=ja` | `https://noveraflow.com/faq?lang=ja` |

- 영어 `?lang=en` 공유 URL도 200으로 유지하되 쿼리 없는 영어 URL로 canonical을 지정한다.
- 홈페이지·About·Features(`/philosophy`)·FAQ·Contact·Privacy·Terms·삭제 안내,
  8개 페이지 × 3개 언어의 HTML을 빌드 시 `_localized/{lang}/{pageKey}/index.html`로 생성한다.
- `_worker.js`가 기존 공개 URL의 `lang`을 확인해 미리 생성한 HTML을 ASSETS로 반환한다.
  브라우저·검색 봇에 동일한 문서를 제공하며, 요청 중 번역하거나 AI 응답을 생성하지 않는다.
- 언어별 title/description/lang, OG/Twitter, screenshot/alt, 본문, self-canonical과
  상호 hreflang 3개 및 영어 x-default를 최초 HTML에 넣는다.
- 언어 선택은 실제 `<a>` 링크다. JavaScript 미실행·localStorage 차단에서도 작동한다.
  쿼리 없는 URL은 영어이며 브라우저 언어·저장된 선호 때문에 본문/메타를 바꾸지 않는다.
  공유 URL과 최초 HTML의 언어가 일치하도록 기존 자동 언어 감지 우선순위를 조정했다.
- 기존 일출/일몰 SVG, KST 전환·session 선택, 모바일 compositor 보정, desktop depth,
  모션 키프레임을 유지한다. `landing.js`의 중복 번역을 `i18n.js`로 합쳤다.
- 새 번역/스타일 캐시 키는 `20261018a`. 기존 `landing-init.js`는 변경하지 않았다.
- 삭제 안내는 언어별 산출물에 해당 언어 article만 포함한다. 편집 원본에는 3개 언어를
  보존하며 외부 요청은 공개 안내만 제공한다.

### 21.4 Canonical·sitemap·404·공개 경계

- 최종 URL은 `/`, `/about`, `/philosophy`, `/faq`, `/contact`, `/privacy`,
  `/terms`, `/account-deletion/`이다. 이전 `.html`, `/index.html`, 삭제 안내의
  slash 없는 URL은 쿼리를 보존하는 308로 연결한다. 각 언어의 내부 링크도 최종 URL을 쓴다.
- sitemap은 24개 canonical URL만 포함하고 각 URL에 4개 alternate를 넣는다.
  입증되지 않은 과거 lastmod·일괄 오늘 날짜·priority·changefreq를 넣지 않는다.
- `404.html`과 Worker의 명시적 공개 경로 목록으로 soft-404 홈페이지 fallback을 제거했다.
  없는 `/llms.txt`도 404다. 별도 llms 파일을 만들지 않았다.
- `/docs`, `/scripts`, `/test`, `/_localized`, `.git`, `.env`, 내부 API·관리자 경로는
  사이트 Worker에서 404/noindex다. 공개 자산·정책·계정 삭제 안내만 허용한다.
  누락된 언어별 산출물은 503/noindex로 실패하며 영어 홈 200으로 숨기지 않는다.
- 기존 앱·Admin·AI의 인증·인가·저장소를 변경하지 않았다. 사이트 404가 다른 호스트의
  인증을 대신하지 않으며 robots.txt로 개인정보를 보호한다고 주장하지 않는다.

### 21.5 구조화 데이터와 공식 기준

- 공통: `Organization`(실제 운영자 moolsoft, NoveraFlow 브랜드), `WebSite`,
  현재 언어의 `WebPage` 또는 `AboutPage`·`ContactPage`.
- 홈: `MobileApplication`으로 앱·플랫폼·언어·공식 installUrl·확인된 기능을 연결한다.
  `SoftwareApplication`의 하위 유형이므로 동일 앱을 중복 노드로 만들지 않는다.
- 내부 페이지: 실제 화면의 breadcrumb와 같은 `BreadcrumbList`.
- FAQ: 해당 언어에 표시되는 12개 문답만 `FAQPage`/Question/Answer로 표현한다.
  원격 승인 도움말 위젯의 동적 내용을 정적 JSON-LD에 추측해 넣지 않는다.
- 가격·평점·리뷰·다운로드 수·수상·미확인 연간 기능을 생성하지 않는다.
  Google 앱 리치 결과의 평점/리뷰 요건을 채우기 위해 데이터를 만들지 않는다.
- Google 공식 업데이트에 따르면 FAQ 리치 결과는 2026-05-07부터 중단됐고 6월에
  문서가 제거됐다. FAQPage는 Schema.org 의미 표현용이며 특별 표시·순위·AI 추천을 보장하지 않는다.

공식 확인 문서:
[Google 소프트웨어 앱](https://developers.google.com/search/docs/appearance/structured-data/software-app),
[Google FAQ 중단 기록](https://developers.google.com/search/updates#may-2026),
[Schema.org MobileApplication](https://schema.org/MobileApplication),
[Schema.org FAQPage](https://schema.org/FAQPage),
[Google Breadcrumb](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb),
[Google 다국어 URL](https://developers.google.com/search/docs/specialty/international/localized-versions),
[Cloudflare Pages advanced mode](https://developers.cloudflare.com/pages/functions/advanced-mode/),
[Cloudflare 로컬 검증](https://developers.cloudflare.com/pages/functions/local-development/).

외부 Rich Results Test나 Schema.org 웹 검증 서비스에 미출시 소스를 업로드하지 않았다.
로컬 JSON parse, 타입·필수 연결·본문 일치, 실제 HTTP 반환 및 sitemap XML 파싱을 검증했다.

### 21.6 크롤러 정책과 개인정보 영향

`robots.txt`는 바이트 변경 없이 기존 wildcard Allow와 sitemap 지시를 유지한다.
OAI-SearchBot·Googlebot·bingbot·PerplexityBot·GPTBot 문자열로 공개 홈 GET을 확인했고
모두 기존 Production HTML 92,415 bytes/200을 반환했다. 이는 **실제 봇 IP 허용이나
WAF challenge 부재의 증거가 아니다**. 새 구현은 Production에 아직 없다.

검색용 봇과 GPTBot 등의 학습용 정책은 기존 조사 12.1절처럼 분리한다. GPTBot과
Google-Extended 정책은 수정하지 않았다. 권장안은 검색 접근을 유지하면서 학습/
grounding 허용 여부를 별도 결정하는 것이다. Cloudflare 계정의 WAF·실제 봇 로그와
검색 관리 콘솔은 읽지 못했으며 설정 변경도 하지 않았다.

새 수집 이벤트·쿠키·외부 API·유료 서비스·인증 비밀을 추가하지 않았다.
기존 공개 승인 도움말 위젯의 GET/피드백 동작은 보존했다. 브라우저 검증에서는
해당 API를 fixture 응답으로 대체하여 실제 도움말 평가 이벤트를 쓰지 않았다.

### 21.7 변경 파일과 관리 위치

| 파일 | 목적 / 수정 방법 |
| --- | --- |
| `index.html`, `about.html`, `philosophy.html`, `faq.html`, `contact.html` | 기존 레이아웃·번역 키 유지, 잘못된 문구 정정, 다운로드·정적 FAQ·breadcrumb |
| `privacy.html`, `privacy/index.html`, `terms.html`, `account-deletion/index.html` | 정책 원문 유지, 언어별 metadata·경로 정렬, 조건부 AI/클라우드 설명 |
| `js/i18n.js` | 사이트 전체 문구·landing 번역·metadata의 단일 편집 위치. 3개 언어 키를 함께 수정 |
| `js/landing.js` | 중복 번역 제거·정확한 screenshot alt. 기존 scene/depth/모션 유지 |
| `css/styles.css`, `css/landing.css` | 버튼 형태의 언어 링크 스타일, breadcrumb, HTML 안내 카드 |
| `scripts/site-config.mjs` | 공개 페이지·원본 파일·언어·canonical·스토어 URL 계약 |
| `scripts/build-site.mjs`, `_localized/` 전체 24개 HTML, `sitemap.xml` | 정적 산출물 생성. `_localized`와 sitemap은 직접 편집하지 않고 `npm run build` 후 결과를 함께 보관 |
| `_worker.js`, `_routes.json`, `404.html` | 기존 쿼리 URL에 정적 언어 HTML 제공, 이전 URL 이동, 공개 경계와 404. 새 페이지는 site-config와 Worker routes를 함께 수정 |
| `scripts/verify-site.mjs`, `scripts/verify-seo.mjs`, `test/seo-routing.test.mjs` | 기존 정책 계약 유지, metadata·번역·JSON-LD·최신 산출물·실제 라우팅 테스트 |
| `scripts/preview-site.mjs`, `scripts/check-http.mjs`, `scripts/check-browser.mjs` | 로컬 preview·실제 HTTP 검사·선택적 기존 Playwright 설치를 통한 시각/동작 회귀 검사 |
| `package.json`, `.gitignore` | build/test/preview 명령과 로컬 Wrangler 임시 파일 제외 |
| `README.md`, 이 문서, `docs/README.md`, `SITE_I18N_STATUS.md`, `HANDOVER_STATUS.md` | 관리·검증·배포 후보·복구 방법. 새 중복 보고서를 만들지 않음 |

기존 Pages의 게시 루트가 repository root이고 별도 원격 build 설정을 바꾸지 않기 위해
24개 산출물을 저장소에 함께 포함한다. `_worker.js`는 기존 Pages Git 통합이 지원하는
advanced mode이며 새로운 프레임워크·인증 서비스·외부 서버를 도입하지 않는다.

### 21.8 로컬 검증 결과

- 기존 5개 테스트는 변경 전 단일 프로세스 실행에서 PASS했다. 기본 Node 테스트의
  자식 프로세스 격리는 이 Windows 환경에서 EPERM이므로 Node 24의
  `--experimental-test-isolation=none`을 사용한다. 기존 테스트 내용을 제거하지 않았다.
- `npm run build`, `npm test`: **12/12 PASS**. 정적 산출물 최신성·재생성 안정성,
  각 언어 metadata/OG/Twitter/canonical/hreflang, FAQ 본문/JSON-LD 일치 포함.
- 실제 Cloudflare Wrangler **4.151.1**의 `pages dev . --local`에서 Worker compile 성공.
  로컬 Request.cf 다운로드 timeout은 placeholder로 대체됐으며 Worker·ASSETS 요청은 정상 실행됐다.
- 실제 Pages 로컬 HTTP: 정식 HTML **24/24 GET·HEAD 200**, 연결 자산/URL **41개 200**,
  이전 URL **8개 308 → 200**, 미존재·내부 경로 **12개 404/noindex**, 봇 문자열 **5개 200**.
- Chrome·WebKit **36개 조합**(en/ko/ja × A/B × 6개 화면): 320·375·390·411·440·1440px,
  각각 4회 Hero 이탈/복귀·높이 변경 후 제목 위치·overflow·모바일 scene pause 회귀 검사 PASS.
- 공개 페이지 **48회**(24 URL × JS 켬/끔): 언어·메타·h1·기본 제품 본문·FAQ·레이아웃·언어 링크 검사.
- 추가 검사: motion pause/resume, reduced motion, 저장소 차단, data saver, desktop pointer depth와
  offscreen pause, XML 파싱과 sitemap URL 24개, 6개 언어/풍경 탭의 120초 유지·4회 스크롤/높이 변경.
- 추가 이미지 검수에서 두 번째 화면의 미출시 AI 대화 표현도 확인해 교체했다.
  최종 감정/Premium 카드 **18개 언어·엔진·화면 조합 PASS**와 전체 HTTP를 재검증했다.
  `pages-browser/final-cards.json`과 `final-cards-*.png`가 이 마지막 카드 변경의 증거다.
  잘못된 언어 쿼리 3개 및 정상 언어 쿼리 3개도 실제 Chrome에서 본문·canonical 일치를 확인했다.
- Hero 장식 SVG의 SHA-256은 변경 전과 동일
  `31960546828798c614b089705becbc5e7bcef88fdc26079198d458acb4e33bfa`.
- Google Play/App Store 기존 다운로드 링크의 직접 GET 모두 200. 스토어 등록정보는 변경하지 않았다.
- `git diff --check`, 공개 소스의 비밀·내부 URL 패턴 검사 통과. `.wrangler`는 추적 제외.

브라우저 최종 결과와 증거는 `../tmp/seo-phase1-20261018/pages-browser/results.json`,
`pages-http.json`, `public-verification.json`과 screenshot에 보관한다. 임시 도구는
동일 디렉터리의 `tooling`에만 설치했으며 사이트 dependency·lockfile을 추가하지 않았다.
실물 기기·검색 색인·AI 서비스의 실제 추천·CWV를 이번 로컬 결과로 대체하지 않는다.

### 21.9 배포 준비와 복구

**Production 배포·push·스토어 변경은 미실행. 사용자 배포 승인 직전에서 중지한다.**

1. 문구 수정은 `js/i18n.js`, 원본 페이지 구조 수정은 기존 HTML에서 한다.
   `npm run build`로 영어 원본·24개 언어 산출물·sitemap을 함께 갱신한다.
2. `npm test`, `git diff --check`, `npm run preview` 후 `node scripts/check-http.mjs`로 검사한다.
   실제 Pages 검증은 임시/기존 Wrangler의 `pages dev . --local --compatibility-date 2026-10-18`을 사용한다.
   운영 credentials·remote binding·deploy 명령은 필요 없다.
3. 브라우저 재검증은 기존 Playwright 모듈의 절대 경로를 `PLAYWRIGHT_MODULE_PATH`에,
   기존 browser 경로를 `PLAYWRIGHT_BROWSERS_PATH`에 지정한다. 설치된 Chrome을 쓰면
   `CHROME_EXECUTABLE`도 지정한다. `SITE_CHECK_BASE`를 로컬 Pages URL로 지정하고
   `node scripts/check-browser.mjs`를 실행한다. `SITE_CHECK_SOAK=1`은 120초 검사를 추가한다.
   결과 디렉터리는 `SITE_CHECK_OUTPUT`, HTTP JSON은 `SITE_CHECK_HTTP_OUTPUT`으로 변경할 수 있다.
4. **후속 승인 후에만** 원본·산출물·Worker·404·문서를 같은 변경으로 기존 `main` Git 통합에
   게시한다. 기존 Pages 프로젝트와 repository-root 게시 경로를 유지하며 서버 설정을 변경하지 않는다.
   새 Worker도 함께 배포되어야 하므로 HTML만 따로 복사하지 않는다.
5. 배포 후 공개 24 URL·404·이전 URL·robots·자산·실제 봇 접근을 다시 확인한다.
   실제 봇/WAF·색인 콘솔 확인은 별도 접근 권한이 있을 때 수행한다.
6. 복구는 배포 직전의 성공한 Pages deployment로 rollback하거나 이 Phase 1 변경만 revert한다.
   기존 조사 MD와 다른 작업을 지우는 reset/force-push는 하지 않는다. Worker·산출물·sitemap·
   HTML·JS·CSS를 함께 복구하고 200/404·언어·스토어 링크를 확인한다. 과거 Pages 배포로 돌아가면
   종전의 영어 HTML·soft-404 문제도 돌아오므로 복구 결과에 그 한계를 기록한다.

### 21.10 남은 확인과 범위 밖 문제

- Android 실제 공개 버전과 대화·클라우드 기능의 일반 배포 여부. 확인 전 현재의 보수적 문구 유지.
- iOS 1.0.80(81) 심사 완료 후 공개 버전·새 Premium 기능·언어별 안내를 다시 확인.
- 앱 Premium 화면의 연간 혜택 문구와 생성·조회 구현의 간극, 복원 직후 대화 이력 갱신의
  미출시 수정은 앱 후속 작업이다. 이번 SEO 작업에서 앱 기능이나 심사를 변경하지 않았다.
- 실물 Android/iPhone 확인, 현재 WAF/검증된 봇 로그, Google/Bing 색인 상태·성과,
  www DNS/TLS 문제는 해당 환경에서 추가 확인이 필요하다. 추측으로 서버 설정을 바꾸지 않았다.
- 검색/추천 노출은 보장하지 않는다. 학습용 크롤러 정책은 별도 결정이며 현 상태 유지.

로컬 기능 구현과 검증의 최종 상태는 아래 운영 문서의 같은 날짜 완료 기록과 함께 확인한다.

```text
IMPLEMENTATION: COMPLETE
VALIDATION: PASS
PRODUCTION_DEPLOY: NOT_EXECUTED
READY_FOR_DEPLOY: YES
```

## 22. 2026-10-18 Production 배포 및 운영 검증

21절의 배포 후보를 commit `37e4d276957cc4002ac3fe386cc6351a63a85ccf`로
`origin/main`에 일반 push했고, 기존 Cloudflare Pages Git 통합이 repository root를
Production에 게시했다. 배포 전 원격 `main`은 로컬 기준점 `4d95d6b`와 같았으며
force-push나 인프라 설정 변경은 없었다. 배포 직전 운영 source revision은 `cf93b46`이다.

Cloudflare deployment identifier는 `fb72a1a5-d818-4d70-81f4-30063da16dda`이다.
Cloudflare Pages GitHub check run `117542071908`은 source `37e4d27`,
`Deployed successfully`, preview URL `https://fb72a1a5.noveraflow-site.pages.dev`를
반환했다. 광범위한 Cloudflare OAuth를 사용하지 않고 공개 GitHub Checks API로
확인했으며 인증정보를 기록하지 않았다.

Production `https://noveraflow.com` 검증 결과는 다음과 같다.

- 8개 페이지 × 3개 언어인 24개 canonical 문서의 GET/HEAD와 연결 자산 42개가 200이다.
  각 문서는 요청 URL에 맞는 `Content-Language`, HTML `lang`, canonical, reciprocal
  hreflang, metadata와 parse 가능한 JSON-LD를 반환한다.
- sitemap은 200이며 24개 정식 URL과 언어 alternate만 포함한다. 이전 호환 URL 8개는
  query를 보존해 308로 이동한다. 없는 경로와 `/admin`, 내부 API, 문서·생성물 직접 경로
  등 12개는 404와 `X-Robots-Tag: noindex`를 반환한다.
- Chrome/WebKit 36개 언어·장면·viewport 조합과 JavaScript 켬/끔 48개 페이지 방문이
  통과했다. 기존 Hero 애니메이션, 모바일/PC 레이아웃, 스크롤·viewport 복귀, 모션 제어,
  desktop depth/offscreen pause와 언어 링크가 정상이다. JavaScript가 꺼져도 주요 제품
  정보, FAQ, 정책, 다운로드 링크가 최초 HTML에 남는다.
- Google Play는 200, App Store는 공식 상세 URL로 이동한 뒤 200이다. 두 링크의 대상과
  스토어 등록정보는 변경하지 않았다.
- 운영 `robots.txt`의 wildcard Allow와 sitemap 지시는 저장소와 텍스트가 같다.
  OAI-SearchBot·Googlebot·bingbot·PerplexityBot·GPTBot User-Agent 문자열 검사는 200이나,
  실제 crawler IP의 WAF 통과·색인·AI 검색 노출이나 추천을 확정하지 않는다.
- 공개 Worker는 사용자 일기·대화·계정·백업, 관리자 경로, 내부 API와 repository 문서를
  노출하지 않는다. 앱 인증·인가와 운영 데이터는 변경하지 않았다.

배포 후 중대 오류가 없어 rollback은 실행하지 않았다. 복구가 필요하면 Pages dashboard에서
배포 직전 source `cf93b46`인 성공 deployment를 선택하거나 `37e4d27`만 revert해 일반
push한다. reset·force-push는 하지 않으며 Worker·24개 정적 HTML·sitemap·HTML/JS/CSS를
함께 복구한 뒤 200/308/404, 세 언어, 스토어 링크와 개인정보 경계를 다시 확인한다.

남은 과제는 Android 공개 version과 대화·클라우드 capability 확인, iOS 1.0.80(81) 공개 후
문구 재검토, Google/Bing 색인·성과와 실제 crawler/WAF 로그 확인, Core Web Vitals 추적이다.
검색 노출과 추천은 이 배포만으로 보장하지 않는다.

```text
GIT: PASS
DEPLOY: PASS
PRODUCTION_VERIFY: PASS
ROLLBACK: NOT_REQUIRED
DOCUMENTATION: PASS
```

### 22.1 2026-10-18 Naver Search Advisor 소유확인 태그 배포

Naver Search Advisor가 JavaScript 없이 첫 HTML 응답에서 소유확인 값을 읽도록 홈의
공통 정적 생성 과정에 `naver-site-verification` meta를 추가했다. 값은 사용자가 제공한
공개 인증값을 그대로 사용한다. `scripts/build-site.mjs`가 영어 원본과 en/ko/ja 홈
산출물에 태그를 정확히 한 번 생성하며, 이미 생성된 태그는 먼저 제거해 반복 빌드의
결정성을 유지한다. `scripts/verify-seo.mjs`와 `test/seo-routing.test.mjs`가 세 언어 홈의
값·중복·실제 Worker 응답을 검사한다. 비홈 페이지, Google 인증 방식, canonical,
hreflang, JSON-LD, robots.txt, sitemap과 crawler 정책은 변경하지 않았다.

`npm run build`, 기존 12개 테스트, `git diff --check`가 통과했다. 로컬 Pages 호환 HTTP
응답도 `/`, `/?lang=ko`, `/?lang=ja`에서 각각 200, 올바른 `Content-Language`, 태그 1개를
반환했다. 구현 commit 및 Production revision은
`da28d1bd32ffea0cc1d5cacc636f59514ba15a9b`이고, 기존 `main` Git 통합의 Cloudflare Pages
deployment `663c49c3-2b5f-4f4a-aad5-e3e293d6b495`가 성공했다. 배포 완료 시각은
2026-10-18 12:40:35 KST이며 preview는 `https://663c49c3.noveraflow-site.pages.dev`다.

운영 세 언어 홈은 모두 200이고 HTML `lang`·`Content-Language`·self-canonical이 요청
언어와 일치한다. 인증 태그는 각 첫 HTML에 정확히 1개, hreflang은 기존 4개,
JSON-LD는 유지됐다. 운영 robots.txt는 200이며 저장소 내용과 같고, sitemap은 200,
24 URL이며 저장소 내용과 같다. Naver Search Advisor 콘솔의 최종 **소유확인 실행은
사용자가 직접 해야 하며 이번 배포 성공만으로 인증 완료를 선언하지 않는다.**
아래 24절의 `meta 없음`은 이번 배포 전 10:42~10:48 KST 조사 시점 기록이며,
현재 운영 상태는 이 22.1절의 배포 후 검증 결과를 따른다.

배포 직전 정상 revision은 `8ecfe87460891b77cbf3b87eeccc21240ffa937e`, Pages deployment는
`a9ee77d5-71b3-4a4c-abb1-764feaa768ce`다. 회귀 시 Pages dashboard에서 이 deployment로
rollback하거나 `da28d1b`만 revert해 일반 push한다. 이후 세 언어 첫 HTML의 200·태그
제거 상태·canonical/hreflang과 robots/sitemap을 재검증한다. reset·force-push 및
Cloudflare/DNS/Search Advisor 설정 변경은 하지 않는다. 현재 회귀가 없어 rollback은
실행하지 않았다.

## 23. 2026-10-18 Google Play ASO 최종 업로드 준비

21.10에 남았던 Android 공개 버전을 공식 Google Play 공개 HTML로 다시 확인했다.
패키지 `com.moolsoft.noveraflow`의 공개 버전은 `1.0.80`, 최종 업데이트는
`2026-10-14`이며, ko/en/ja 등록정보와 `Lifestyle`, 인앱 구매 표시가 반환된다.
Play Console 내부의 현재 태그·상품·국가별 가격·획득 검색어·전환 데이터는 접근하지
않았고 추측하지 않았다.

ASO 문구에는 공개 근거와 현재 소스가 일치하는 텍스트·사진·음성 일기, 감정·심볼,
기록별 AI 피드백, 요청형 주간·월간 돌아보기, 로컬 ZIP 백업·복원만 사용한다.
AI 대화, 클라우드 자동 백업, 연간 AI 요약은 구현·권한 코드만으로 공개 기능으로
판정하지 않았다. 운영 SSOT가 연간 AI를 초기 Premium 범위에서 제외하는데 앱 Premium
혜택 UI에는 남아 있는 불일치도 확인했으며, 이번에는 앱 기능을 변경하지 않고 Play
문구와 이미지에서 제외했다.

최종 이름은 ko `NoveraFlow AI 일기`, en `NoveraFlow AI Journal`, ja
`NoveraFlow AI日記`다. 이름은 `16/21/15`자, 짧은 설명은 `42/75/40`자,
상세 설명은 LF 정규화 기준 `734/1398/685`자, CRLF 보수 계산 기준
`758/1422/709`자로 Play의 30/80/4,000자 제한을 통과했다. 정확한 세 언어
문구, 적용 전후 표, 검색어 주제, 기능·무료/Premium 판정과 Console 적용 순서는
[App Store Preparation](../../noveraflow-app/docs/APP_STORE_PREPARATION.md#2026-10-18-google-play-aso-최종-업로드-자료)을
현재 작업 기준으로 사용한다.

공개 일본어 이미지 원본 8개를 실제로 비교한 결과 1·2·3·5·6·7·8번에서 상단 홍보
카피의 대체 글리프 결손을 확인했다. 글자가 온전한 4번도 AI 피드백 생성 실패 화면을
포함해 기존 공개 8개를 그대로 재사용하지 않는다. 원본과 기존 디자인을 덮어쓰지 않고
`assets/branding/play_store_screenshots/ja_aso_20261018/`에 공개 기능과 일치하는 최종
업로드 세트 5개를 준비했다. 모두 1440×2880, 24-bit RGB, 알파 없음, 8 MB 미만이고
보존 원본과 SHA-256이 일치한다. 각 이미지를 원본 해상도로 육안 검수해 일본어 결손·
잘림·폰트 대체·오류 상태가 없음을 확인했다. AI 대화·Premium/연간·클라우드 백업
이미지는 제외했다.

현재 공개 페이지의 `5+` 다운로드 외에 통계 표본 근거가 없으므로 맞춤 스토어
등록정보와 등록정보 실험은 활성화하지 않는다. 향후 Console에서 충분한 방문·설치·오픈
표본과 검색어가 확인된 뒤 현지화 실험에서 한 번에 한 요소만 시험한다. 이번 작업에서
Google Play Console 수정·게시, Android 빌드·출시, 사이트 Production 배포는 수행하지
않았다.

<a id="us-journaling-growth-20261031"></a>
## 24. 2026-10-31 US Journaling App

### 24.1 역할·상태·자료 구분

이번은 기존 브랜드/SEO 문서 재사용과 미국 진입 실행안 정리다. **마케팅/측정/Store/robots/HTML 구현·게시0**이다. 사업 방향과 Phase0~7·사용자100명/예산·결정은 [MASTER_ROADMAP](https://github.com/moolsoft-stack/noveraflow-docs/blob/docs/global-growth-20261031/MASTER_ROADMAP.md#global-growth-20261031), 플랫폼 실제 지원은 [현재 기능표](https://github.com/moolsoft-stack/noveraflow-docs/blob/docs/global-growth-20261031/NOVERAFLOW_CURRENT_STATUS.md#platform-capabilities-20261031), 톤은 [브랜드/마케팅](02-brand-and-marketing.md), 운영 적용/복구는 기존 웹 계획71.54.5와21~22절이 소유한다. 같은 전략/기능표를 새 문서로 복제하지 않는다.

**확정:** 첫 시장 미국/영어권, 첫 범주 Journaling App, 기존 ko/en/ja 유지, 실제 기능만 소개, 유료 광고는 초기 필수 아님. **가설:** 이 검색 의도가 NoveraFlow의 짧은 기록·자기 성찰 가치와 맞을 수 있음. **미확보:** 실제 US 검색량·유기적 SEO 경쟁 강도·검색 순위·US 유입/가입·첫 기록·retention·유료 전환 값. 이번 웹 문서 조회는 공식 정책 확인이며 제품 수요를 검증한 실험이 아니다.

### 24.2 키워드별 가설과 조사 준비

| 키워드 | 검토 검색 의도 | 주장/기능 경계 | 이번 검색량 / 경쟁 |
| --- | --- | --- | --- |
| Journaling App | 일상 기록 서비스를 찾는 범주 진입 | 우선 진입점. 실제 사용 가능한 플랫폼/버전·기록 기능으로 안내 | **미측정 / 미측정** |
| Free Journaling App | 무료로 시작할 기록 공간 | 기존 무료 범위/조건만 설명. Premium/AI 제한이나 웹 미지원 기능을 숨기지 않음 | **미측정 / 미측정** |
| AI Journal | 기록 기반 AI 도움 | 지원 버전의 다른 시선·주간/월간 등 확인된 경로만. 연간/웹 AI는 제공 중으로 표현하지 않음 | **미측정 / 미측정** |
| AI Diary | 일기와 AI 피드백 | 사용자가 요청하는 기존 기능·조건을 명시. 분석 정확성/치료 효과 보장 금지 | **미측정 / 미측정** |
| Self Reflection App | 생각 정리·자기 성찰 | 조용한 기록 경험을 설명. 새로운 코칭/진단 기능이 있는 것으로 만들지 않음 | **미측정 / 미측정** |
| Mood Tracker | 감정 기록/돌아보기 | 기존 감정·상징 기록과 실제 미구현 정량 차트/의학적 추적을 구분. 검색어 선정이 기능 구현 승인이 아님 | **미측정 / 미측정** |

후속 조사 기록에는 **확인일·도구/원본 링크·US 지역·언어 조건·기간·검색어/주제 구분·실제 값/범위·불확실성**을 함께 둔다. Google Trends는 표본을 정규화한 상대 관심도이며 월 절대 검색량으로 환산하지 않는다[S1]. 기존 권한이 있는 Keyword Planner를 선택적으로 쓰더라도 반올림/유사어·지역/네트워크 조건을 보존하고, **광고주 경쟁 지표를 유기적 SEO 난이도로 부르지 않는다**[S2]. 계정/billing 설정이 필요한 도구는 이번에 새 계정/결제수단을 만들지 않으며 광고 집행을 자료 확보의 필수 조건으로 두지 않는다.

유기적 경쟁은 이후 동일 날짜/US·영어 조건에서 검색 결과의 제품/스토어/콘텐츠 구성과 실제 지원 주장, 관측 방법을 기록해 비교한다. 조사가 없으면 높음/낮음·틈새 우위·예상100명 유입 기간을 임의 수치로 채우지 않는다. 보유 Search Console 값은 해당 사이트의 노출/클릭이지 전체 시장 수요가 아니다[S3].

### 24.3 기존 영어 진입점·검색/크롤러 준비

| 준비 항목 | 기존 자산/다음 작업 | 완료 판단과 제한 |
| --- | --- | --- |
| 공식 영어 소개 | 기존 영어 canonical `https://noveraflow.com/`와21~22절의 정적 다국어 HTML·번역/Store 자산 재사용. `?lang=en` 호환, `?lang=ko/ja` 유지 | 영어 본문·기능/플랫폼·무료 조건·CTA가 현재 기능표와 일치하는 검토안. 이번 HTML/copy 변경 없음 |
| Google 색인/SEO | 기존 title/description·검색 가능 HTML·canonical/hreflang/sitemap·공개 링크/404를 owner 자료로 점검하는 후속 작업 | 기존 Search Console 권한에서 URL 검사/US 비브랜드 기준선을 확인. 계정/권한·색인/노출 수는 현재 미확보. 접근 가능이 색인·순위 보장은 아님[S3][S4][S5] |
| ChatGPT 검색 | 공개 소개 페이지의 OAI-SearchBot 접근과 실제 IP/WAF 경계를 후속 확인 | OAI-SearchBot은 검색용, GPTBot은 학습용 별도 제어. ChatGPT-User는 사용자 요청 동작이며 자동 검색 crawler 허용의 대체 증거가 아님. 허용해도 노출/추천을 보장하지 않음[S6] |
| 개인 기록 비공개 | `/app/`의 기존 noindex/no-store와 로그인·owner 검증을 유지. 본문·메모·AI 대화·callback·인증 API를 공개 콘텐츠/분석 URL에 넣지 않음 | robots.txt만으로 개인정보를 보호하지 않음. 인증/권한이 보호 경계이며 noindex는 검색 노출 제어. crawl 차단으로 noindex를 읽지 못하게 하는 영향도 변경 전에 검토[S4] |
| 기존 crawler 설정 | d922b19의 추적 `robots.txt`는 `User-agent: * / Allow: /`와 sitemap이다.12/21~22절의 과거 관측 재사용 | GPTBot 별도 정책 선택은 사용자 미결정. robots/WAF/학습 정책은 이번 수정0. 과거 UA 문자열200은 실제 crawler IP/색인/ChatGPT 인용 증거가 아님 |
| App Store 영어 metadata | 기존 App Store Preparation의 en-US 문구/이미지 재사용 후보. 실제 공개/심사/미업로드 build84·플랫폼 기능과 대조 | 현재 미국 Store 제공판과 문구/스크린샷·이용 조건 확인 후 별도 게시. 심사판/미구현 연간/모든 플랫폼 동일 기능을 현재 기능처럼 약속하지 않음[S7] |
| Google Play 영어 metadata | 기존23절/앱 ASO 자료·공개 기능에 맞는 title/short/full description/스크린샷 후보 재사용 | 실제 US 제공·공개 track/기능과 대조. 기존 local draft를 이미 게시된 Store 문구로 표시하지 않음. 이번 Console 수정/제출0[S8] |
| 실제 기능 기반 콘텐츠 | 첫 기록 시작·기존 기록 찾기·자기 성찰 사용법과 공개 지원 범위 설명. 비민감 합성 예시만 사용 | 기존 사용자 원문/계정/사진을 marketing 증거로 쓰지 않음. 미지원 웹 메모/마음결/백업을 앱과 같은 기능으로 소개하지 않음 |
| 무료 진입·전환 | 기존 도메인/서비스/Store 링크 중 안전한 첫 기록 경로 선정, 새 PG·광고·계정 없이 시작 | signup/설치만이 아니라 첫 기록 성공과 재방문까지 확인할 계획. 실제 저장 수용이 미확인인 경로는 그 한계 해결 전 대규모 홍보하지 않음 |

### 24.4 측정과 첫 실행 순서

지표·분모·10/30/100 checkpoint·US/영어 cohort·중복/테스트 제외는 [마스터의 측정 계약](https://github.com/moolsoft-stack/noveraflow-docs/blob/docs/global-growth-20261031/MASTER_ROADMAP.md#growth-metrics-20261031)을 따른다. 검색 노출/클릭→방문→가입 또는 설치→첫 기록→재방문/재작성→유료 전환의 공백을 별도로 표시한다. 기존 App `first_open`/`record_created`/`history_opened` 및 Admin 집계를 먼저 대조하며, `auth_sign_in`은 emitter가 없는 계약일 뿐이다. Web signup/first-record coverage나 외부 SDK가 이미 켜졌다고 가정하지 않는다.

첫 후속 실행은 **①6개 키워드 근거표/기존 영어 소개·CTA 주장 대조 → ②기존 Search Console/Store 권한과 검색 기준선 확인 → ③가장 신뢰 가능한 첫 기록 플랫폼/계측 경로 및 안전 결함 확인 → ④별도 승인된 최소 공개 변경·자발적10명 유입 관측**이다. Phase3의 P0는 어느 시점에서도 먼저 처리한다. 이번은 이 순서를 문서화했으며 위 실제 작업·사용자 기록 쓰기를 실행하지 않았다. 작은 표본에서 A/B 승자·보장 전환율·검색 성공을 선언하지 않는다.

계측/유입 준비 비용은 기존 인프라·무료 자료 재사용의 **추가 현금0원 우선 가정**이다. 영어 교정·콘텐츠/문의 대응 시간, 사용량 증가의 서버/AI 변동비는 실제로 남으며 미집계다. 새 도구/외주/광고·결제수단 등록·수집 항목/retention 변경은 필요성과 예산/개인정보 검토 후 별도로 정한다. 신규 수집에 journal/감정·AI 대화 내용, raw token/callback/query, 광고 fingerprint를 추가하지 않는다.

### 24.5 수익/정책 검토와 공식 출처

웹 직접 결제는 마스터 Phase6의 후보 비교다. 글로벌 정기결제/지원 국가·통화·정산, 기존 계정/무료·Premium 공유 entitlement, 수수료/환전/세금, 환불·해지·지원과 서버/AI 비용을 확인해야 한다. Apple/Google의 지역·프로그램별 예외와 조건은 바뀔 수 있으므로 실제 연동 시 다시 확인한다[S9][S10]. 지금 일률적인 외부 결제 허용/금지나 수수료·법인 필요 시점을 확정하지 않는다. 기존 가격/권한/판매 설정·PG 계약·법인/채용 변경0이다.

2026-10-31 공식 원문 확인. 아래는 정책/측정 방식의 근거이며 실제 NoveraFlow 검색량/성과 수치의 근거가 아니다.

- [S1 Google Trends 데이터 FAQ](https://support.google.com/trends/answer/4365533?hl=en): 표본·정규화된 상대 관심도.
- [S2 Keyword Planner의 예측/과거 지표](https://support.google.com/google-ads/answer/3022575?hl=en): 검색량 집계 조건/반올림, 광고주 경쟁의 의미, 접근의 billing 설정 조건.
- [S3 Search Console 검색 성과 보고서](https://support.google.com/webmasters/answer/7576553?hl=en&edition=starter): query/page/country/date별 사이트 성과 집계.
- [S4 Google 개발자 검색 가이드](https://developers.google.com/search/docs/fundamentals/get-started-developers): 검색 가능 본문/링크·인증/noindex와 robots 구분.
- [S5 Google 다국어·다지역 사이트](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites): 언어별 URL·hreflang/canonical.
- [S6 OpenAI Crawlers](https://developers.openai.com/api/docs/bots): OAI-SearchBot/GPTBot의 별도 제어 및 ChatGPT-User 역할.
- [S7 Apple Product Page](https://developer.apple.com/app-store/product-page/): 제품 페이지/현지화 자료.
- [S8 Google Play 앱/등록정보 설정](https://support.google.com/googleplay/android-developer/answer/9859152?hl=en): 언어별 이름·소개/등록정보.
- [S9 Apple App Review Guidelines 3.1](https://developer.apple.com/app-store/review/guidelines/#in-app-purchase): 결제/구독·지역별 조건 검토 기준.
- [S10 Google Play Payments](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en): 결제 정책 및 해당 예외/프로그램 검토 기준.

이번 변경의 구현·운영/Store 배포·계측 활성화·광고0. 문서 링크/정합성만 검사하고 개인 문서 브랜치에 **[CF-Pages-Skip]** commit으로 push한다. site main/d922b19와 기존 공개 HTML·Worker·robots·sitemap·운영 사용자 데이터는 유지한다. 기능 검증/백업·복구 이력은 기존 owner 문서에서 보존한다.


<a id="phase2-keyword-evidence-20261031"></a>
## 25. Phase 2 첫 조사 — 미국 키워드·영어 진입 경로 (2026-10-31 KST)

### 25.1 범위·판정·기존 작업 확인

- 목적: 기존 자산으로 미국 영어권 첫 기록 사용자 확보에 연결할 키워드와 최소 실행안을 정한다. **추천/실행안 작성 완료, 미국 월 검색량 확정 미완료, 구현·배포 미실행**이다. 추천은 검색량 순위나 낮은 경쟁이 입증된 선택이 아니라 제품 적합성과 확인된 경쟁의 정성 판단이다.
- 먼저 MASTER_ROADMAP / DOCUMENT_INDEX / CURRENT_STATUS와 브랜드02·SEO24절, DEV_WORKFLOW를 읽었다. 이 작업 루트와 docs/site 범위에서 적용할 AGENTS.md는 발견되지 않았다. 기존 개발·검증·백업/복구 이력을 보존한다.
- 기존 문서 브랜치 docs/global-growth-20261031의 docs 05a4393(원문34ca776), site 9b7e479는 시작 시 원격 SHA 일치·작업 트리 clean이었다. 원격 docs main 0a418609와 site main d922b199도 별도 확인했으며 main을 합치거나 덮어쓰지 않았다.
- 개인 GitHub /user와 docs/site 실제 owner는 moolsoft-stack(User), fetch/push remote는 git@github-personal:moolsoft-stack/noveraflow-{docs,site}.git, SSH 인사는 moolsoft-stack이다. 이번 commit author/committer는 moolsoft-stack <moolsoft@gmail.com>로 범위 지정한다. 기본 작성자 Codex/codex@local·MOOISOFT의 기존 설정/이력은 보존하며 회사 adcomlab 계정·remote·key는 사용하지 않는다.
- 공개 자료·HTTP GET/HEAD·새 익명 en-US Chrome만 사용했다. 브라우저 비조회 요청3개를 차단했고 로그인·입력·사용자 기록 생성/수정/삭제·유료 도구 가입·광고·Store 수정·DB/결제/운영 변경은 없다. 임시 익명 profile은 종료 후 제거했으며 새 조사 파일/스크린샷/도구 설치는 만들지 않았다.

### 25.2 키워드 수요 근거와 채택할 수 없는 수치

**조회 방법:** 2026-10-31 KST에 여섯 키워드의 영어 공개 검색 결과와 경쟁사 공식 페이지/미국 Store를 조사했다. 검색 도구의 결과는 미국 IP·Google US 순위가 고정된 SERP가 아니므로 순위·점유율·국가별 검색량으로 사용하지 않는다. 실제 미국 사용자의 수요 크기·전환 의향을 검증한 조사도 아니다. 미국 조건이 명시된 값은 아래 공개 API의 country=us 응답뿐이며, 그 값도 집계 기간이 빠져 수치 근거로 채택하지 않았다.

| 키워드 | 미국 공개 조회 근거 | cached_at 날짜(집계 기간 아님) | 수치 채택 판정 |
| --- | --- | --- | --- |
| journaling app | [seodata 미국 요청](https://api.seodata.dev/v1/keyword?q=journaling%20app&country=us) HTTP200 | 2026-05-20 UTC | 측정 시작/종료월 미제공 → 월 검색량 미확인 |
| free journaling app | [seodata 미국 요청](https://api.seodata.dev/v1/keyword?q=free%20journaling%20app&country=us) HTTP200 | 2026-09-13 UTC | 동일. 무료 검색 의도가 유료 기능 무제한 수요라는 뜻 아님 |
| AI journal | [seodata 미국 요청](https://api.seodata.dev/v1/keyword?q=AI%20journal&country=us) HTTP200 | 2026-05-18 UTC | 동일. 앱과 학술지 의도 혼재도 별도 문제 |
| AI diary | [seodata 미국 요청](https://api.seodata.dev/v1/keyword?q=AI%20diary&country=us) HTTP200 | 2026-06-18 UTC | 동일. AI 자동 작성/대화 등 기대 범위 확인 필요 |
| self reflection app | [seodata 미국 요청](https://api.seodata.dev/v1/keyword?q=self%20reflection%20app&country=us) HTTP200 | 2026-10-12 UTC | 동일. 긴 꼬리라는 이유만으로 저경쟁/수요량 추정 금지 |
| mood tracker | [seodata 미국 요청](https://api.seodata.dev/v1/keyword?q=mood%20tracker&country=us) HTTP200 | 2026-05-12 UTC | 동일. 앱 외 printable/일별 chart 의도도 혼재 |

[제공자 문서](https://www.seodata.dev/llms.txt)는 월 검색량/CPC/광고 경쟁·국가별 응답을 설명하고, [공개 키워드 설명](https://www.seodata.dev/keyword/journal-apps)은 Google Ads API 기반 미국 월평균이라고 주장한다. 그러나 이번6개 응답/문서에는 시작/종료월·언어·네트워크·유사어 집계 조건이 없다. cached_at은 캐시 시각이지 검색 측정 기간이 아니다. **원시 volume/CPC/competition을 확정 수치나 SEO 난이도로 표에 옮기지 않았고, 최신성·동일 기간 비교·독립 검증을 보장하지 않는다.**

Google Trends는 US·영어 검색어·Web Search·2025-10-31~2026-10-30 조건으로 첫5개 비교를 시도했으나 공개 조회 HTTP429라 시계열/CSV를 얻지 못했다. 차단 우회·로그인·반복 요청을 하지 않았고 mood tracker를 포함한 후속 비교도 중단했다. [재현할 공개 explore](https://trends.google.com/trends/explore?date=2025-10-31%202026-10-30&geo=US&q=journaling%20app,free%20journaling%20app,AI%20journal,AI%20diary,self%20reflection%20app)는 조건 확인용이며 결과값 증거가 아니다. Trends는 [상대 정규화 지표](https://support.google.com/trends/answer/4365533?hl=en)이지 월 절대 검색량이 아니다.

기존 Google Ads/Keyword Planner·Search Console 계정의 허용된 내보내기는 이번에 확보하지 못했다. [Google의 지표 정의](https://support.google.com/google-ads/answer/3022575?hl=en)에 따라 검색량의 기간/지역/유사어·네트워크 조건과 광고 경쟁을 구분해야 한다. MicroSaaSHQ 등 검색 결과의 월 수요·경쟁/매출 추정도 국가/기간/산출 근거가 부족해 사용하지 않았다. AI 추천 횟수/빈도·순위도 측정하지 않았다. 미확인 값은 0이나 수요 부재로 해석하지 않는다.

**정량 조사 완료 기준 / 남은 항목:** 여섯 검색어 각각 원본·조회일·미국·언어·시작/종료월·검색 네트워크·산출 방식/유사어 조건·실제 값/범위가 확인된 자료를 확보하고 같은 조건끼리 비교해야 한다. 기존 권한의 무료 내보내기부터 검토하며 새 유료 도구/광고 계정/결제수단이 선행 조건은 아니다. 이번에는 이 조건을 충족하는 미국 월 검색량이 없어 정량 수요 확정은 미완료다.

<a id="phase2-demand-signal-supplement-20261031"></a>
### 25.2.1 완료 보완 — 미국·영어 설정의 Google 실검색 기반 신호

**이번 추가 조사:** 2026-10-31 KST에 Google 공개 자동완성을 비로그인 HTTP GET으로 각 검색어1회씩 조회했다. 공통 조건은 `client=firefox&hl=en&gl=us`이며6개 모두 HTTP200/JSON 응답을 받았다. 아래는 응답에서 입력어 그대로의 반복을 제외한 확장어 예시다. 원본 URL의 q만 다르고 같은 방법으로 조회했다. 새 코드/조사 파일·스크린샷·유료 계정은 만들지 않았다.

| 입력 키워드 | 실제 관측한 확장어 일부 | 의도와 첫 실행 판단 | 원본 |
| --- | --- | --- | --- |
| journaling app | journaling app free / journaling app android | 무료·기기별 기본 기록 앱 의도가 나타남. 기존 Android/iOS 기록 기능과 맞아 핵심으로 유지 | [Google 응답](https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=journaling%20app) |
| free journaling app | free journaling app for iphone / free journaling apps for android | 무료 시작·기기 호환 의도. 기존 무료 기본 기록 범위를 정확히 설명할 보조 키워드로 유지 | [Google 응답](https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=free%20journaling%20app) |
| AI journal | ai journal app / ai journal that writes back | 앱·응답형 AI 의도도 실제 관측됨. 기존 학술지 혼재 근거만으로 앱 의도가 없다고 단정하지 않음. 현재 공개판별 AI 지원/웹 미지원 격차 때문에 첫 핵심에서는 제외 | [Google 응답](https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=AI%20journal) |
| AI diary | ai diary generator / ai diary that talks back | 자동 작성·대화 기대가 드러남. 기본 기록 중심 초기 약속과 맞지 않는 기대를 만들 수 있어 후순위 | [Google 응답](https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=AI%20diary) |
| self reflection app | self reflection app free / self reflection appraisal sample | 앱·무료 의도와 인사 평가 등 다른 의도가 혼재. 서비스 정체성에 맞는 성찰 문맥의 보조어로만 유지, 독립 페이지/저경쟁 가정 없음 | [Google 응답](https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=self%20reflection%20app) |
| mood tracker | mood tracker app / mood tracker printable | 앱과 인쇄물 의도가 혼재. 정량 추적 기능 기대와의 차이를 고려해 초기 핵심/보조에서 제외 | [Google 응답](https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=mood%20tracker) |

**근거와 제한:** [Google 공식 자동완성 설명](https://support.google.com/websearch/answer/7368877?hl=en)은 실제 검색·언어·위치·관심 변화와 웹의 단어 패턴 등이 예측에 반영되며 단순 인기 검색어 목록은 아니라고 설명한다. 따라서 이번 자료는 미국·영어 **요청 설정에서 관측한 실검색 기반의 방향성 신호**다. gl=us가 응답의 미국 거주자 전용 표본/실제 요청 IP 위치를 보증하지 않으며, 미국 한정 검색 발생·시장 규모를 독립 검증한 자료로 부르지 않는다. 관측 기간은2026-10-31의 단일 조회 시점이고 집계 시작/종료월은 제공되지 않는다. 응답 개수·순서·반복 횟수로 월 검색량·수요 크기·상대 인기/성장률·SEO 난이도·AI 추천 빈도를 계산하지 않는다. 같은 seed를 넣어 받은 echo를 새 수요 증거로 세지도 않았다. 이전 seodata 숫자 배제와 Trends429 제한은 그대로다.

**선정 결과:** 이 방향성 신호와25.3의 기존 제품 적합성·경쟁 비교를 결합해 이번 **첫 콘텐츠 실행 권고안**은 핵심 **journaling app**, 보조 **free journaling app / self reflection app**로 정한다. 이는 실제 유입 실험에 사용할 추천 키워드 선택을 마친 것이며 미국 정량 수요/저경쟁/성과를 확정한 결과가 아니다. 사용자에게 제시할 무료·기기별 시작과 짧은 기록/성찰 문구에만 활용하고 실제 전환 결과로 재평가한다. 초기 실행안 선택을 위해 검증되지 않은 월 검색량을 필수 수치로 채우지 않는다.

**보완 완료 범위:** 부족했던 검색 의도·방향성 근거를 원본/날짜/요청 국가·언어/측정 방법/한계와 함께 기록했다. 기존 영어 사이트 점검·경쟁 앱 조사·실행안·문서4개와 기존 docs0cae4a0/site04b1ab4 push 결과는 누적 완료 이력으로 유지하며 재실행하지 않았다. 앞선 보완 최종 응답의 ‘파일·Git 변경 없음’은 그 보완 턴에만 해당하며 전체 작업의 문서 반영/push가 없었다는 뜻이 아니다. 국가·기간이 완비된 미국 월 검색량 검증은 여전히 미완료다. 해당 수치까지 필수인 판단/성과 보고에는 기존 개인 계정의 허용된 원자료가 추가로 필요하다.

### 25.3 제품 적합성·경쟁 비교와 추천

다음 높음/중간~높음은 공식 제품의 범위·무료 대안·의도 혼재를 보고 내린 **정성적 경쟁 부담 판단**이다. Google US 실제 순위, SEO KD, 광고 경쟁 점수나 성공 확률을 뜻하지 않는다. 정확한 경쟁 강도는 미측정이다.

| 키워드 | 확인된 검색 의도/경쟁 근거 | NoveraFlow 활용·격차 | 판단 |
| --- | --- | --- | --- |
| journaling app | 일상 글쓰기/보관·되돌아보기. Day One·Apple Journal·Journey와 비교 콘텐츠가 있는 범주 | 기존 기본 기록·조회·감정/상징·사진/음성·지원 버전의 AI 활용 가능. 기존 웹 저장·동기화 수용은 별도 미확인 | 적합성 높음 / 경쟁 부담 높음. **핵심1개 추천** |
| free journaling app | 무료 기본 기록·유료 제한/설치 장벽 확인. Apple Journal·Day One·Clearful의 무료 진입 제공 | 현재 기본 기록/로컬 ZIP 무료 정책 활용. 무료 AI 무제한·웹 완전 지원으로 확대 금지 | 적합성 높음 / 경쟁 부담 높음. **보조1 추천**, CTA/무료 조건 설명에 사용 |
| self reflection app | 생각·감정을 돌아보는 목적. stoic·Reflection의 안내형 글쓰기/일상 성찰 제공 | 짧은 기록·상징과 지원 버전의 되돌아보기로 정체성 유지. 치료·코칭/진단·새 prompt library를 약속하지 않음 | 적합성 높음 / 경쟁 부담 중간~높음, 저경쟁 입증 아님. **보조2 추천** |
| AI journal | AI 피드백 앱 외 [AI 학술지](https://aij.ijcai.org/about-the-artificial-intelligence-journal/) 의도도 혼재. Rosebud·Mindsera·Reflection의 강한 AI 제품 포지션 | 지원판의 다른 시선/요약 등 활용 가능하나 현재 웹 AI 없음, 공개판별 기능 확인 필요 | 적합성 조건부 / 경쟁 부담 높음 + 의도 혼재. 지금 핵심에서 제외, 본문 보조 설명 후보 |
| AI diary | AI가 답하거나 대신 쓰는 일기 기대. Reflectly·Dayora 등의 서비스와 경쟁 | 기존 요청형 피드백은 가능 범위이나 자동 작성/무제한 대화/웹 AI를 기대하게 할 위험 | 적합성 조건부 / 경쟁 부담 높음. 기본 기록 경로 정합성 확보 뒤 재검토 |
| mood tracker | 감정/활동 check-in·그래프/상관관계와 printable도 탐색. Daylio 전문 기능과 경쟁 | 기존 감정/상징은 활용하되 정량 mood chart/의료 평가를 제공 중이라고 할 수 없음 | 적합성 부분 / 경쟁 부담 높음 + 기능 기대 차이. 첫 목표에서 제외 |

핵심 **journaling app**, 보조 **free journaling app / self reflection app**를 한 영어 진입 페이지에서 자연스럽게 설명한다. 같은 의도로 URL3개를 새로 만들거나 키워드 반복을 늘리지 않는다. 범주 자체는 경쟁이 높으므로 ‘짧은 일상 기록으로 시작해 다시 돌아보는 경험’이라는 구체적 사용 장면을 먼저 전달한다. 이는 **추천안**이며 검색량 기반 우선순위/시장 공백이 확정됐다는 뜻은 아니다. 정량 기준선·실제 첫 기록/재방문 결과에 따라 바꿀 수 있다.

| 경쟁 앱 / 1차 출처 | 공식 페이지에서 확인한 주요 특징 | NoveraFlow에 주는 판단 |
| --- | --- | --- |
| [Day One](https://dayoneapp.com/) / [미국 Store](https://apps.apple.com/us/app/day-one-daily-journal-diary/id1044867788) | 무료 진입, 다양한 매체 기록, 과거 날짜 되돌아보기, 암호화/백업·내보내기 설명 | 기록·사진·privacy만으로 독점 차별화 주장 불가. 기록 찾기와 신뢰성이 기본 기대 |
| [Apple Journal 미국 Store](https://apps.apple.com/us/app/journal/id6447391597) | 무료, 멀티미디어/제안·검색·기록 습관·Apple 생태계 연계 | iOS 무료 대안이 이미 있음. NoveraFlow의 Android 포함 기존 자산과 성찰 경험을 알리되 동기화 수용을 과장하지 않음 |
| [Clearful](https://clearful.com/) | 무료 디지털 기록 시작, 자기 성찰/개인 성장과 글쓰기 안내 | 짧고 쉬운 시작은 경쟁사에도 있음. 독특함 대신 실제 이해·첫 기록 성공 여부를 검증 |
| [stoic](https://www.getstoic.com/) / [Reflection](https://www.reflection.app/) | 일상 성찰·안내형 기록과 선택적 AI, 기기/웹 경로·감정/습관 관련 기능 설명 | self reflection도 빈 시장이 아님. 의료/치료 표현·추가 코칭 기능을 따라 만들 필요 없음 |
| [Rosebud](https://www.rosebud.app/) / [Mindsera](https://mindsera.com/) | AI 질문/통찰·음성/성장 지원과 요약/패턴을 전면 소개 | AI라는 단어만으로 차별화되지 않음. 기존 선택형 기능의 실제 조건과 데이터 처리 설명이 필요 |
| [Reflectly 미국 Store](https://apps.apple.com/us/app/reflectly-journal-ai-diary/id1241229134) / [Dayora](https://www.dayora.ai/ai-diary-app) | AI 질문/일기 반응·감정/습관; Dayora는 무료 AI와 음성 등을 홍보 | 무료 경쟁을 따라 기존 quota/가격을 바꾸지 않음. 경쟁사 주장일 뿐 기능 실사용/보안의 독립 검증은 아님 |
| [Daylio](https://daylio.net/) | 감정/활동 선택, 통계·그래프/상관관계, 메모·사진/음성 | mood tracker의 정량 기능 기대가 큼. NoveraFlow를 동등한 통계 추적기로 홍보하지 않음 |

위 경쟁사 기능은2026-10-31 공식 소개 관측이며 직접 설치/결제/보안 시험을 하지 않았다. 매출·다운로드·별점은 시장 수요나 NoveraFlow의 예상 성과로 사용하지 않는다. **차별화 가능성은 ‘한 줄부터 시작하는 조용한 기록·감정/상징·부담 없는 성찰’의 조합을 이해하기 쉽게 전달하는 가설**이다. 유일한 기능·더 안전함·더 나은 AI라고 입증한 결과가 아니다.

### 25.4 현재 공개 영어 사이트 — 확인 결과와 개선안 분리

검사일2026-10-31 KST. 직접 HTTP GET/HEAD와 기존 추적 소스, 새 익명 en-US Chrome을 사용했다. Search Console/실제 크롤러 로그·가입/기록 쓰기 실험은 하지 않았다.

| 항목 | 실제 확인 | 문제/미확인 | 최소 개선안·완료 기준 |
| --- | --- | --- | --- |
| 영어 title/description | [홈](https://noveraflow.com/) HTTP200, lang=en·Content-Language=en, index/follow. title은 **NoveraFlow \| AI Diary & Mood Journal for Android and iPhone**. description은 텍스트·사진·음성 기록과 AI 피드백/주간·월간 돌아보기 소개 | title·H1에서 journaling app 범주/무료 시작이 선명하지 않음. H1은 감성적 흐름 표현 중심 | 기존 영어 원본의 범주·가치를 먼저 설명하고 title/description/OG/JSON-LD·실제 표시 정합성 확인. 같은 문구를 모든 플랫폼 기능 보장으로 확대하지 않음 |
| 크롤링/색인 접근 | 본문·다운로드 링크가 서버 HTML에 존재. Googlebot/OAI-SearchBot 문자열 HEAD200, noindex 헤더 없음. 공개 검색 도구의 site:noveraflow.com 질의에 홈·FAQ·약관 반환 | 검색 도구 노출은 Google US 순위/전체 색인·노출수·ChatGPT 추천 빈도 증거 아님. 실제 crawler IP/WAF·Google URL 검사 미확인 | 기존 Search Console 접근으로 홈 URL/US 비브랜드 기준선·원인 확인. 실제 bot IP 접근은 별도 읽기 근거 확보, 접근 허용을 노출 보장으로 쓰지 않음 |
| robots | [robots.txt](https://noveraflow.com/robots.txt) HTTP200, 전체 UA 허용과 sitemap 선언 | OAI 검색용 접근을 막는 robots 규칙은 관측되지 않음. GPTBot 학습 별도 선택은 미결정 | 현재 허용은 유지. 필요 시 검색/학습 정책을 구분해 사용자 결정 후 변경. 이번 robots/WAF 수정0 |
| sitemap | [sitemap.xml](https://noveraflow.com/sitemap.xml) HTTP200, 공개24 URL, app/auth/token URL0 | 제출/실제 처리·발견 건수 미확인 | 공개 URL만 유지. 도구 권한 확보 후 제출/처리 상태 확인, 새 파일/페이지 대량 생성 불필요 |
| canonical/hreflang | 영어 /, ko /?lang=ko, ja /?lang=ja 각각 자기 canonical·en/ko/ja/x-default 상호 연결. /?lang=en은200이며 /를 canonical로 가리킴 | 기술적 기본선 정상. 언어 쿼리라는 이유만으로 고칠 결함 아님 | 기존 URL/번역을 유지하며 다음 문구 수정에서도 동등한 언어 링크·메타 보존 |
| Google/ChatGPT 준비 | 공개 본문/색인 허용·sitemap·기본 구조화 데이터 존재. [Google 가이드](https://developers.google.com/search/docs/fundamentals/get-started-developers)와 [OpenAI Crawlers](https://developers.openai.com/api/docs/bots)의 기본 접근 요건과 대조 | OAI-SearchBot은 검색, GPTBot은 학습, ChatGPT-User는 사용자 요청. 문자열200은 실제 crawler IP 통과나 인용 증거가 아님 | AI 전용 신규 페이지/llms 파일/추천 수치보다 현재 공개 설명·접근성을 우선. 학습 허용을 검색 노출의 필수 조건으로 삼지 않음 |
| Store 연결 | 기존 Android package com.moolsoft.noveraflow·iOS id6792970947 링크 존재, 미국 영어 Play 페이지 HTTP200·영어 제품 설명, 미국 Apple lookup HTTP200 | 연결/소개 확인이지 설치·영어 UI·계정·저장 성공 확인 아님. Play 공개 build 번호 미확인 | 기존 두 링크 유지, 공개판·설치 조건·무료 범위 설명 대조. Store 수정은 이번 범위 밖 |
| iOS 안내 최신성 | [Apple 미국 lookup](https://itunes.apple.com/lookup?id=6792970947&country=us)은 **1.0.81**, release2026-10-26T15:11:35Z, 무료 다운로드/USD, EN 메타 응답. 검색 도구의 [미국 Store 페이지](https://apps.apple.com/us/app/noveraflow/id6792970947)는 캐시상1.0.80 | 사이트는 여전히1.0.80(81) 심사 중·공개1.0.61 기준 안내. 현재 직접 응답과 불일치. 공개1.0.81에서 마음결/클라우드 실사용 성공은 별도 미검증 | 심사 중이라는 고정 문장을 현재 공개 근거로 갱신하고 지원판 조건을 명시하는 후속 문구 작업. 공개 version만으로 모든 Premium 검증 완료라고 쓰지 않음 |
| 무료 시작/실제 경로 | 홈 CTA Use web은 /app/. en-US 익명 Chrome에서도 웹 title/메뉴·Google/Apple 로그인 문구가 한국어로 표시. 기존 app d756ac8은 로그인 과정에서 계정 생성 후 계정별 텍스트 기록 UI로 진입하는 소스 | 영어 방문자의 언어 단절·무료 범위/계정 필요 여부·다음 행동 설명 부족. 실제 가입/저장 수용은 실행하지 않았음 | 앱 시작을 먼저 안내하고 웹은 현재 한국어/지원 범위를 명시하는 보조 경로로 제안. 앱의 첫 기록은 설치 후 기본 기록 경로를 검증해 설명하고 불필요한 별도 가입 단계를 추가하지 않음 |
| 기능 주장 | 기본 기록·로컬 ZIP 무료, AI/클라우드 지원판/권한·제한 안내 존재. 임상 mood 평가·연간 제공을 약속하지 않는 점은 유지 가능 | 모바일의 사진/음성/AI/백업 설명 옆 Use web이 동일 제공처럼 읽힐 위험. 웹은 텍스트 중심·메모/마음결 안내·AI/ZIP 미지원 근거. 마음결/백업 문구는 새 공개판 수용과 대조 필요 | 짧은 플랫폼별 범위 안내와 정확한 무료 조건 추가. 기본 기능을 임의 변경하거나 웹 AI/복구를 새로 약속하지 않음 |
| 개인 기록/인증 비공개 | /app/ GET200과 /app/auth/callback·/app/login HEAD200 모두 X-Robots-Tag=noindex,nofollow·Cache-Control=no-store. sitemap 제외. 토큰 없는 기존 web-records API는401, 응답 본문/사용자 기록 미열람 | 인증 HTML200은 사용자 기록 공개가 아니라 SPA shell. noindex/robots는 접근 제어가 아님. owner 간 격리/전체 Auth·보안 감사는 미실행 | 기존 auth/owner 보호·비색인·검색/개인 공간 분리를 유지. 공개 사이트로 기록/토큰/개인 query를 내보내지 않음 |

### 25.5 비용을 최소화한 첫 실행안 — 구현은 별도

**추천 순서:** 검색에서 범주 이해 → 가치/실제 지원 이해 → 무료 시작 경로 → 첫 기록/재방문 집계. 이번은 아래 구현안을 문서화했을 뿐 공개 문구·설정·계측을 바꾸지 않았다.

| 작업 | 최소 변경/재사용 | 선행 조건 | 완료 기준 | 비용·부담 / 미확인 |
| --- | --- | --- | --- | --- |
| P2-A 근거/안전 gate | 기존 Search Console·Store 자료와 기능표 대조, 첫 대상 공개판/첫 기록 경로 선정. 기존 과거 기록/동기화 P0 위험 분류 | 기존 개인 도구 권한·허용된 시험 범위. 이번 실제 기록 쓰기는 금지 | 확인된 무료 기본 경로·영어 지원·미확인 수용/계측 목록을 분리. 정량 미확보면 명시하고 작은 실험의 보류/진행 판단 | 새 현금0 우선, 운영자 검토. Search Console 권한/집계 기간·실제 쓰기 수용은 미확인 |
| P2-B **첫 구현 묶음** | 기존 영어 홈 title/description·짧은 첫 화면 범주 설명·무료 조건/플랫폼 안내·CTA 보조 문구만 수정하는 안. 오래된 iOS 심사 안내 갱신. 기존 ko/ja·HTML 구조·Store 링크 재사용 | P2-A의 사실 근거와 아래 영어 문구/CTA 방향 사용자 결정. 실제 구현·배포는 후속 별도 작업 | HTML/표시/meta/구조화 데이터의 주장이 일치, 기존 링크/언어·개인 영역 noindex 보존. 가입/첫 기록 성공을 버튼 클릭만으로 PASS 처리하지 않음 | 새 서비스/서버/도메인/광고0, 소규모 콘텐츠·기존 사이트 검증 부담. 이번 빌드/소스 변경0 |
| P2-C 무료 시작 이탈 완화 | 두 기존 Store 링크를 명확한 무료 시작 경로로 안내. Web은 한국어/텍스트 중심의 보조 진입으로 설명. 설치→기본 기록→다시 열기의 짧은 설명 사용 | 실제 공개판의 영어 첫 기록 경로 확인. 모든 기능/플랫폼 동일 제공 약속 금지 | 영어 방문자가 플랫폼·무료 조건·로그인 필요 여부를 이해하고 맞는 경로 선택. 실제 이탈률은 후속 관측 전 미측정 | 기존 링크·문구 우선, 새 가입 화면/결제/딥링크/웹 번역 기능 개발을 선행하지 않음 |
| P2-D 최소 측정 | 기존 App first_open/record_created/history_opened 계약과 보유 Admin 집계, 허용된 Search Console/Store 집계를 대조. 작은 주간 수동 집계부터 | coverage·동의/보존·운영/시험 제외·중복·US 근거를 확인. auth_sign_in은 아직 emitter 없는 계약 | 노출→클릭→방문→가입/설치→첫 기록→D1/D7/새 두 번째 기록을 측정/미측정으로 구분, 분모·관측 기간 기록. 미국 적격 첫 기록10→30→100 기준 준수 | 새 SDK/유료 분석0 우선. cohort 연결/가입/Web 저장 이벤트·US 실제 인원 집계 미완료, 변경 필요 시 계약/개인정보 검토부터 |

영어 문구 **검토안/미게시**:

- Title: **Journaling App for Everyday Reflection | NoveraFlow**
- 첫 화면 범주: **A journaling app for small moments and self-reflection.**
- Description: **Start with a short daily entry. Keep everyday thoughts and feelings, then return to reflect. Basic journaling is free; features vary by platform and version.**
- 앱 CTA 후보: **Start free on Android / Start free on iPhone**. 다운로드/설치가 먼저임을 보조 문구로 설명하고, 버튼을 실제 첫 기록 완료로 집계하지 않는다.
- 웹 보조 CTA 후보: **Web preview — Korean interface**. 기능의 베타 상태/공개 명칭·우선순위는 사용자 결정이며 지금 버튼이나 서비스 상태를 바꾸지 않는다.

**사용자 결정:** 첫 추천 키워드3개와 위 영어 표현 채택 여부, 앱 우선/웹 보조 CTA 방향·첫 대상 플랫폼/공개판, 기존 Search Console/Keyword Planner 내보내기 접근·기간, US cohort/비로그인 중복·관측 기간/최소 집계 범위, GPTBot 학습 정책. 무료/Premium 가격·권한·유료 도구/광고·PG는 이번 결정/실행 대상으로 올리지 않는다.

### 25.6 완료 기록·미완료·자원/복구

- 작업1: 여섯 키워드의 공개 조회·의도/제품 적합성·정성 경쟁·대표 앱 비교와1+2 추천 작성 완료. **미국 월 검색량/통제된 US SERP·KD·AI 추천 빈도·수요 크기 확정은 미완료**다. 확인 가능한 공식/원본 링크와 배제 사유를 위에 기록했다.
- 작업2: 공개 영어 HTML·새 익명 Chrome·robots/sitemap/canonical/hreflang·Store/입구·개인/인증 비색인·비인증 API 보호 확인 완료. 실제 가입·설치/로그인·저장/재방문·기존 사용자 기록·최신 공개판 AI/백업 수용·Search Console 상태/진짜 crawler IP는 미확인이다.
- 작업3: 최소 콘텐츠/CTA 변경·완료 기준/선행 조건·측정 공백·운영 부담을 정리했다. 구현·빌드·배포·Store 변경·새 이벤트/계정/도구/광고/DB/결제 작업0. 고정 인프라 비용·운영자 시간·실사용 증가의 AI 비용은 남으며 실제 총비용0이라고 보고하지 않는다.
- 문서 검사: 새 로컬 링크/anchor4개·교차 docs/site 링크/anchor2개와 두 저장소 git diff --check PASS. 원시 검색량 숫자를 추천 근거에 옮기지 않았음을 확인했다. 기존 테스트의 과거 phase/고정 날짜 fixture3건 실패는 앞선 문서 기록대로 남고, 이번 코드/fixture 수정·전체 테스트 재실행은 하지 않았다.
- 작업4: 기존 MASTER·CURRENT_STATUS·브랜드02·이 SEO25절만 갱신한다. MASTER 원문 commit 후 기존 roadmap.json 문서 snapshot만 생성기로 동기화하며 Admin runtime에는 복사하지 않는다. 새 MD/조사 artifact/앱 테스트/사이트 빌드는 만들지 않는다.
- 복구/사용자 영향: 문서만 변경하므로 사용자 데이터/서비스 영향0. 기존 웹 계획71.54.5의 백업/복구·Production 기준은 보존하며 새 운영 release를 만들지 않는다. 문서 복구는 관련 문서 commit 검토 후 revert다. 개인 문서 branch만 push하며 site commit은 [CF-Pages-Skip]으로 main/preview 운영 배포를 제외한다. 비밀값은 기록하지 않는다.

<a id="phase2-english-release-20261031"></a>
## 2026-10-31 Phase 2 첫 영어 공개 사이트·웹 언어 경로 개선

현재 상태: **완료 판정 취소 / 영어 개선 운영 롤백 완료 / W1 기록 보호 검증 대기·원래 목표 미완료**.

롤백 확인: **site 80bf84569458a2f1258d21dd9541542ceec8d192**, Pages **752537f5-36b9-4e5d-91b7-892d0073013f**, GitHub check **124400445623 / success**. 실제 운영 webSource **d756ac8c668babd6bd44a3c027ef079f6b3efaa9**, JS SHA256 **b0d27f55050616cbfc4c01c3a8fa51be4d7ee51ef8a0c5720981e6e7973c267d**가 배포 전 기준과 일치했다. 홈3언어·/app/·callback200, 인증 영역 noindex,nofollow/no-store, health200·비인증 records401만 좁게 확인했다. 기존 전체 검사/빌드 재실행·새 artifact·사용자 기록 조작0. 영어 개선 사이트53c5501/웹0eaca55는 운영에서 철회했으며 재배포하지 않는다. **ROLLBACK PASS는 W1 해결/기록 완전성 PASS가 아니며 원래 목표의 완료를 뜻하지 않는다.** 해당 플랫폼·누락 날짜 범위·동일 기록의 모바일 표시 여부 및 인증된 읽기 경로를 확보한 뒤 원인/영향을 확인해야 한다. 아래 롤백 진행/과거 배포 완료 표현은 이 결과 이전 이력이다. 후속 MD commit은 [CF-Pages-Skip]으로 중복 배포하지 않는다.

완료 검사 보완: 아래 공개 UI/HTTP PASS는 기존 기록의 완전성·누락 여부 검증을 대체하지 못한다. W1은 일부 과거 기록 미표시 제보이며 원인/영향이 미확정이다. 기존 목록11개 관측만으로 중요한 기록 기능에 문제가 없다고 판단한 배포 결정은 철회한다. 현재 인증된 해당 계정의 읽기 연결과 기대 기록 범위가 없어 안전성을 확인할 수 없다. 이번 릴리스에서 변경한 문서 외41개 경로를 배포 전 site d922b19와 byte/내용이 같은 상태로 복구했으며, web d756ac8로 되돌리는 기존 main Git 배포 절차를 적용한다. 새 기능/빌드/전체 테스트/DB/사용자 기록 조작은 하지 않는다. 개선 소스0eaca55와 기존 검증은 후보로 보존하되 W1의 읽기 전용 원인·영향 분류 및 기록 보호 수용 전에는 재배포하거나 원래 목표를 완료로 표시하지 않는다. 실제 롤백 revision·운영 검증은 확인 후 이 절에 기록한다.

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
