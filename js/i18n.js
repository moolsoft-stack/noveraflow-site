(function () {
  const STORAGE_KEY = "noveraflow.locale";
  const SUPPORTED_LOCALES = ["ko", "en", "ja"];

  const locales = {
    ko: {
      meta: {
        home: {
          title: "NoveraFlow | 삶의 흐름을 비추는 조용한 AI 다이어리",
          description:
            "NoveraFlow는 짧은 기록, 상징, 흐름, AI 피드백을 통해 일상을 조용히 돌아보도록 돕는 AI 다이어리입니다.",
          keywords:
            "NoveraFlow, AI 다이어리, 기록, 상징, 흐름, 피드백, AI 피드백, 백업, 복구, 알림, 개인정보",
          ogTitle: "NoveraFlow | 기록이 흐름이 되는 조용한 다이어리",
          ogDescription:
            "짧은 기록과 작은 상징, 조용한 피드백으로 일상의 흐름을 천천히 바라보는 기록 공간입니다.",
          twitterTitle: "NoveraFlow | 조용한 AI 다이어리",
          twitterDescription:
            "짧은 기록과 AI 피드백으로 삶의 흐름을 조용히 비추는 다이어리입니다.",
          locale: "ko_KR",
        },
        about: {
          title: "NoveraFlow 소개 | 조용한 AI 다이어리",
          description:
            "NoveraFlow가 기록, 상징, 흐름, 피드백을 통해 어떤 기록 경험을 제공하는지 안내합니다.",
          ogTitle: "NoveraFlow 소개",
          ogDescription:
            "짧은 기록과 상징, AI 피드백을 중심으로 한 NoveraFlow의 방향을 소개합니다.",
          twitterTitle: "NoveraFlow 소개",
          twitterDescription:
            "NoveraFlow의 기록 경험과 앱 준비 상태를 안내합니다.",
          locale: "ko_KR",
        },
        features: {
          title: "NoveraFlow 기능 | 기록, 상징, 흐름, AI 피드백",
          description:
            "NoveraFlow의 주요 기능인 기록, 상징, 흐름, AI 피드백, 백업, 복구, 알림 방향을 소개합니다.",
          ogTitle: "NoveraFlow 기능 소개",
          ogDescription:
            "기록, 상징, 흐름, AI 피드백을 중심으로 NoveraFlow의 기능 방향을 확인하세요.",
          twitterTitle: "NoveraFlow 기능",
          twitterDescription:
            "기록, 상징, 흐름, AI 피드백을 중심으로 한 조용한 다이어리 기능입니다.",
          locale: "ko_KR",
        },
        faq: {
          title: "NoveraFlow FAQ | 자주 묻는 질문",
          description:
            "NoveraFlow의 기록, 상징, 흐름, AI 피드백, 백업, 복구, 알림, 개인정보에 관한 자주 묻는 질문입니다.",
          ogTitle: "NoveraFlow FAQ",
          ogDescription:
            "NoveraFlow 사용 전 알아두면 좋은 질문과 답변을 확인하세요.",
          twitterTitle: "NoveraFlow FAQ",
          twitterDescription: "NoveraFlow 자주 묻는 질문입니다.",
          locale: "ko_KR",
        },
        privacy: {
          title: "NoveraFlow 개인정보처리방침",
          description:
            "NoveraFlow의 기록, Google·Apple 로그인, Supabase Auth, Support, Push, analytics 데이터 처리와 계정 삭제 원칙을 안내합니다.",
          ogTitle: "NoveraFlow 개인정보처리방침",
          ogDescription:
            "NoveraFlow의 개인정보, 기록 데이터, 백업 파일 처리 원칙을 안내합니다.",
          twitterTitle: "NoveraFlow 개인정보처리방침",
          twitterDescription:
            "NoveraFlow의 개인정보와 기록 데이터 처리 원칙입니다.",
          locale: "ko_KR",
        },
        accountDeletion: {
          title: "NoveraFlow 계정 삭제",
          description: "NoveraFlow AI 기록 계정 삭제 방법과 데이터별 삭제·보유기간을 안내합니다.",
          keywords: "NoveraFlow, 계정 삭제, 개인정보 삭제, Google Play",
          ogTitle: "NoveraFlow 계정 삭제",
          ogDescription: "앱과 외부 요청을 통한 계정 삭제 절차를 확인하세요.",
          twitterTitle: "NoveraFlow 계정 삭제",
          twitterDescription: "NoveraFlow 계정 삭제와 데이터 보유기간 안내입니다.",
          locale: "ko_KR",
        },
        terms: {
          title: "NoveraFlow 이용약관",
          description:
            "NoveraFlow의 기록, AI 피드백, 로그인 계정, Support, Push, 백업과 계정 삭제 이용 기준을 안내합니다.",
          ogTitle: "NoveraFlow 이용약관",
          ogDescription:
            "NoveraFlow 이용약관과 서비스 이용 기준을 확인하세요.",
          twitterTitle: "NoveraFlow 이용약관",
          twitterDescription: "NoveraFlow 서비스 이용 기준입니다.",
          locale: "ko_KR",
        },
        contact: {
          title: "NoveraFlow 문의 및 지원",
          description:
            "NoveraFlow의 제품 문의, 개인정보 문의, 이용약관 문의, 지원 연락처를 안내합니다.",
          ogTitle: "NoveraFlow 문의 및 지원",
          ogDescription: "NoveraFlow 문의와 지원 연락처를 확인하세요.",
          twitterTitle: "NoveraFlow 문의",
          twitterDescription: "NoveraFlow 문의 및 지원 안내입니다.",
          locale: "ko_KR",
        },
      },
      messages: {
        "common.brand.home": "NoveraFlow 홈",
        "common.nav.label": "주요 탐색",
        "common.nav.home": "홈",
        "common.nav.about": "소개",
        "common.nav.features": "기능",
        "common.nav.faq": "FAQ",
        "common.nav.privacy": "개인정보",
        "common.nav.terms": "이용약관",
        "common.nav.contact": "문의",
        "common.footer.label": "푸터 탐색",
        "common.footer.copy":
          "기록을 판단하지 않고, 흐름을 조용히 비추는 다이어리.",
        "common.language.label": "언어 선택",
        "common.language.ko": "한국어",
        "common.language.en": "English",
        "common.language.ja": "日本語",
        "home.hero.eyebrow": "삶의 흐름을 위한 조용한 다이어리",
        "home.hero.title": "NoveraFlow",
        "home.hero.copy":
          "기록이 쌓이면, 하나의 흐름이 보이기 시작합니다. NoveraFlow는 하루를 판단하지 않습니다. 짧은 문장, 작은 상징, 조용한 피드백이 당신만의 모양으로 천천히 자리 잡도록 돕습니다.",
        "home.hero.actionsLabel": "주요 동작",
        "home.hero.primaryCta": "기능 보기",
        "home.hero.secondaryCta": "앱 안내",
        "home.hero.previewLabel": "NoveraFlow 기록 감각 미리보기",
        "home.hero.recordFirst":
          "긴 설명보다, 작은 흔적 하나를 남기고 싶은 날.",
        "home.hero.recordSecond":
          "비슷한 생각이 며칠 사이 조용히 이어지고 있어요.",
        "home.thoughts.initial": "오늘은 작은 기록만으로도 충분해요.",
        "home.philosophy.eyebrow": "중요한 것",
        "home.philosophy.title": "AI보다 기록이 먼저인 다이어리",
        "home.philosophy.item1.index": "작게",
        "home.philosophy.item1.title": "부담 없이 남기는 기록",
        "home.philosophy.item1.copy":
          "한 문장, 작은 상징, 조용한 빈칸도 충분한 기록이 될 수 있습니다.",
        "home.philosophy.item2.index": "조용히",
        "home.philosophy.item2.title": "단정하지 않는 피드백",
        "home.philosophy.item2.copy":
          "AI는 진단하거나 처방하지 않습니다. 반복되는 흐름을 조심스럽게 비춥니다.",
        "home.philosophy.item3.index": "천천히",
        "home.philosophy.item3.title": "의미를 강요하지 않는 상징",
        "home.philosophy.item3.copy":
          "상징은 점수나 유형이 아닙니다. 기록 곁에서 함께 자라는 작은 형태입니다.",
        "home.flow.eyebrow": "흐르는 방식",
        "home.flow.title": "하루의 작은 조각이 흐름이 되는 방식",
        "home.flow.copy":
          "NoveraFlow는 기록을 서둘러 분석하지 않습니다. 반복되는 말, 분위기, 상징, 작은 변화가 시간 속에서 이어지기를 기다립니다.",
        "home.flow.stepsLabel": "흐름 단계",
        "home.flow.step1.index": "남김",
        "home.flow.step1.title": "짧은 기록",
        "home.flow.step1.copy":
          "모든 것을 설명하지 않아도 됩니다. 지금 가까운 문장, 감정, 상징을 남깁니다.",
        "home.flow.step2.index": "쌓임",
        "home.flow.step2.title": "조용한 누적",
        "home.flow.step2.copy":
          "기록은 날짜만이 아니라 흐름을 중심으로 천천히 쌓입니다.",
        "home.flow.step3.index": "비춤",
        "home.flow.step3.title": "부드러운 피드백",
        "home.flow.step3.copy":
          "익숙한 주제가 보일 때, 결론 없이 조심스럽게 보여줍니다.",
        "home.symbol.eyebrow": "작은 상징",
        "home.symbol.title": "상징은 보상이 아니라 흐름의 형태입니다.",
        "home.symbol.copy":
          "상징은 점, 선, 작은 흔적으로 시작할 수 있습니다. 기록이 이어지면 자연스러운 형태로 천천히 자랍니다. 완성은 끝이 아니라 다음 흐름으로 조용히 넘어가는 순간입니다.",
        "home.symbol.stageLabel": "상징 성장 단계",
        "home.feedback.eyebrow": "조용한 메모",
        "home.feedback.title":
          '"최근 비슷한 감정이 다시 돌아오는 것 같아요."',
        "home.feedback.copy":
          "피드백은 관찰에 가깝게 머뭅니다. 삶을 하나의 답으로 고정하지 않고, 혼자서는 알아차리기 어려웠던 흐름을 다시 볼 수 있게 돕습니다.",
        "home.community.eyebrow": "부드러운 연결",
        "home.community.title": "커뮤니티는 필수가 아닙니다. 조용히 열립니다.",
        "home.community.copy":
          "NoveraFlow는 공개 일기보다 익명의 흐름에서 시작합니다. 사용자가 원할 때, 비슷한 흐름이 사적인 삶을 드러내지 않고 만날 수 있습니다.",
        "home.community.item1.title": "익명의 흐름",
        "home.community.item1.copy":
          "기록 원문 전체를 드러내지 않아도, 공유된 감각은 나타날 수 있습니다.",
        "home.community.item2.title": "열린 상징 의미",
        "home.community.item2.copy":
          "서비스가 상징의 의미를 강하게 정하지 않습니다. 사람들은 자연스럽게 느끼고 해석할 수 있습니다.",
        "home.community.item3.title": "부담 없는 연결",
        "home.community.item3.copy":
          "순위, 유형, 보여주기가 목적이 아닙니다. 어떤 흐름이 나만의 것이 아닐 수 있다는 감각이 중요합니다.",
        "home.mvp.eyebrow": "앱 안내",
        "home.mvp.title": "작게 시작하고, 오래 곁에 남을 수 있게 준비하고 있습니다.",
        "home.mvp.copy":
          "첫 버전은 편안한 기록, 상징, 부담 없는 AI 피드백, 선택적 계정 로그인과 사용자가 관리하는 백업 ZIP 내보내기·복구를 지원합니다. 기본 기록은 기기에 남습니다.",
        "home.mvp.status1": "기록 경험 방향",
        "home.mvp.status2": "상징 성장 방향",
        "home.mvp.status3": "AI 피드백 품질 점검",
        "home.mvp.status4": "백업 ZIP 내보내기와 복구",
        "about.eyebrow": "소개",
        "about.title": "NoveraFlow 소개",
        "about.lead":
          "NoveraFlow는 일상을 점수로 바꾸지 않고, 작은 기록이 흐름으로 이어지도록 돕는 조용한 AI 다이어리입니다.",
        "about.section1.title": "기록을 먼저 생각합니다",
        "about.section1.copy":
          "기록은 길거나 완성된 문장일 필요가 없습니다. 짧은 문장, 상징, 사진이나 음성 같은 작은 흔적도 사용자의 하루를 남기는 방식이 될 수 있습니다.",
        "about.section2.title": "앱 안내와 다운로드",
        "about.section2.copy":
          "NoveraFlow는 현재 정식 오픈 전 준비 단계입니다. 앱 배포와 다운로드 링크는 스토어 등록과 기본 검수가 끝난 뒤 이 사이트에서 안내합니다.",
        "about.section3.title": "백업과 복구 방향",
        "about.section3.copy":
          "초기 버전은 로컬 기록을 중심으로 시작하며, 백업과 복구는 사용자의 기록을 오래 보존하기 위한 핵심 기능으로 다룹니다.",
        "features.eyebrow": "기능",
        "features.title": "기록, 상징, 흐름, AI 피드백",
        "features.lead":
          "NoveraFlow의 기능은 사용자를 빠르게 해석하기보다, 기록이 쌓이며 보이는 흐름을 조용히 확인하도록 설계됩니다.",
        "features.record.title": "기록",
        "features.record.copy":
          "짧은 글, 선택한 상징, 사진, 음성 기록을 남길 수 있는 개인 기록 공간을 지향합니다.",
        "features.symbol.title": "상징",
        "features.symbol.copy":
          "상징은 보상이나 등급이 아니라 기록 곁에서 천천히 자라는 작은 형태입니다.",
        "features.flow.title": "흐름",
        "features.flow.copy":
          "흐름은 반복되는 말, 감정, 상징, 생활 맥락이 충분히 쌓였을 때 조심스럽게 드러나는 패턴입니다.",
        "features.feedback.title": "AI 피드백",
        "features.feedback.copy":
          "AI 피드백은 진단이나 처방이 아니라, 사용자가 자신의 기록을 다시 바라볼 수 있도록 돕는 관찰형 문장입니다.",
        "features.backup.title": "백업과 복구",
        "features.backup.copy":
          "앱에서 기록을 백업 ZIP으로 내보내고 지원되는 백업을 복구할 수 있습니다. 내보낸 파일은 사용자가 직접 관리합니다.",
        "features.notice.title": "알림",
        "features.notice.copy":
          "알림은 기록을 압박하기보다, 사용자가 원할 때 조용히 돌아올 수 있도록 돕는 방향으로 설계합니다.",
        "faq.eyebrow": "FAQ",
        "faq.title": "자주 묻는 질문",
        "faq.lead":
          "NoveraFlow 사용 전 궁금할 수 있는 기록, AI 피드백, 개인정보, 백업 관련 질문을 정리했습니다.",
        "faq.q1.title": "NoveraFlow는 어떤 앱인가요?",
        "faq.q1.copy":
          "짧은 기록과 상징, 흐름, AI 피드백을 통해 일상을 조용히 돌아보는 AI 다이어리입니다.",
        "faq.q2.title": "AI 피드백은 상담이나 진단인가요?",
        "faq.q2.copy":
          "아닙니다. AI 피드백은 기록을 판단하거나 진단하지 않으며, 참고용 관찰 문장으로 제공됩니다.",
        "faq.q3.title": "기록은 어디에 저장되나요?",
        "faq.q3.copy":
          "초기 버전은 로컬 기록을 중심으로 설계됩니다. 서버 처리나 백업 기능이 추가될 때는 개인정보처리방침에 반영합니다.",
        "faq.q4.title": "백업과 복구를 지원하나요?",
        "faq.q4.copy":
          "지원합니다. 앱에서 백업 ZIP을 내보내고 지원되는 백업을 복구할 수 있으며, 내보낸 파일은 사용자가 직접 관리합니다.",
        "faq.q5.title": "알림을 끌 수 있나요?",
        "faq.q5.copy":
          "가능합니다. 알림은 앱 설정과 기기의 알림 권한으로 제어합니다.",
        "faq.q6.title": "문의는 어디로 보내면 되나요?",
        "faq.q6.copy":
          "제품, 개인정보, 이용약관 관련 문의는 문의 페이지의 이메일로 보내실 수 있습니다.",
        "privacy.eyebrow": "개인정보",
        "privacy.title": "개인정보처리방침",
        "privacy.lead":
          "NoveraFlow는 사용자의 기록을 소중하게 다룹니다. 사용자를 광고 목적으로 추적하거나 기록 데이터를 판매하지 않습니다.",
        "privacy.updated": "시행일 및 최종 업데이트: 2026년 9월 2일",
        "privacy.s1.title": "1. 처리하는 정보",
        "privacy.s1.copy":
          "NoveraFlow는 서비스 제공을 위해 다음 정보를 처리할 수 있습니다.",
        "privacy.s1.item1": "사용자가 작성한 기록 내용",
        "privacy.s1.item2": "사용자가 선택한 상징, 상태, 키워드",
        "privacy.s1.item3": "사용자가 직접 첨부한 사진 또는 음성 파일",
        "privacy.s1.item4": "기록 생성, 기능 사용, 오류 확인에 필요한 앱 사용 이벤트",
        "privacy.s1.item5": "도움됨, 보통, 아쉬움 선택 등 피드백 평가 데이터",
        "privacy.s1.item6":
          "로그인 시 Supabase Auth 계정 UUID, 인증을 위해 Google 또는 Apple이 제공하는 신원 정보와 인증 세션 데이터",
        "privacy.s1.item7":
          "앱 내 Support 이용 시 문의 유형, 제목, 메시지, 답변, 상태, 시각, 로그인 계정 연결",
        "privacy.s1.item8":
          "Push 이용 시 설치 식별자, 암호화된 기기 token, 플랫폼, 언어, 앱 버전/build, 권한 상태와 존재하는 경우 로그인 계정 연결",
        "privacy.s1.item9":
          "기기에서 생성한 익명 analytics 식별자, 이벤트 이름과 시각, 언어/locale, 시간대 정보, 앱 버전, 플랫폼, 화면, 제한된 기능 결과 또는 오류 정보",
        "privacy.s1.item10":
          "일간·주간·월간 AI 피드백 요청 시 선택된 기록 텍스트, 제한된 기간/건수와 이전 피드백 비교 데이터, 언어/시간대 및 quota 정보와 기기 생성 익명 식별자",
        "privacy.s1.note":
          "NoveraFlow는 광고 식별자를 이용해 사용자를 추적하거나 광고 프로파일을 만들기 위해 기록 데이터를 수집하지 않습니다.",
        "privacy.s2.title": "2. 이용 목적",
        "privacy.s2.copy":
          "수집 또는 처리되는 정보는 기록 저장, AI 피드백 생성, 상징과 흐름 분석, 앱 안정성 확인, 피드백 품질 개선을 위해 사용됩니다.",
        "privacy.s2.note":
          "AI 피드백은 사용자의 기록을 판단하거나 진단하기 위한 기능이 아니며, 기록을 돌아볼 수 있도록 돕는 참고용 반응입니다.",
        "privacy.s3.title": "3. 보관과 저장 위치",
        "privacy.s3.copy1":
          "현재 v1 정책에서 기본 기록 데이터는 사용자의 기기에 로컬로 저장됩니다.",
        "privacy.s3.copy2":
          "사용자는 앱에서 백업 ZIP 파일을 직접 내보낼 수 있습니다. 이 파일은 NoveraFlow가 관리하는 저장소 밖에 있으므로 관리와 삭제는 사용자가 직접 수행합니다.",
        "privacy.s3.copy5":
          "AI 피드백을 요청하면 선택된 데이터가 응답 생성을 위해 NoveraFlow backend와 구성된 AI runtime으로 전송됩니다. 현재 요청 로그 경로는 기록 텍스트 대신 내용 길이와 짧은 hash를 기록하며, 생성된 피드백은 로컬 기록과 함께 저장됩니다.",
        "privacy.s3.copy3":
          "앱 사용 이벤트와 피드백 평가는 기기에서 생성한 익명 analytics 식별자와 함께 서버로 전송되어 안정성 확인과 품질 개선을 위해 보관됩니다. analytics payload에는 기록 본문, 첨부파일 내용, 이메일, Supabase 계정 UUID, 광고 식별자 또는 정밀 위치가 포함되지 않습니다.",
        "privacy.s3.copy4":
          "서버 백업은 최대 30일 보관됩니다. 현재 서버 구현에는 익명 analytics 이벤트, AI 피드백 quota/usage 항목과 최소화된 Push dispatch 감사 필드의 자동 기간 만료가 없어, 이 데이터의 보유기간은 고정된 기간으로 제한되지 않습니다.",
        "privacy.s4.title": "4. 제3자 제공 및 판매 금지",
        "privacy.s4.copy":
          "NoveraFlow는 사용자의 개인정보나 기록 데이터를 판매하지 않습니다. 법령상 요청이나 사용자의 명시적 요청이 있는 경우를 제외하고 기록을 임의로 공개하지 않습니다.",
        "privacy.s4.copy2":
          "선택 기능을 사용할 때 Google과 Apple은 로그인 정보를, Supabase는 계정 인증을, Firebase Cloud Messaging은 Push 전송 token과 메시지를 처리합니다.",
        "privacy.s5.title": "5. 사용자 권리와 삭제",
        "privacy.s5.copy":
          "로그인 사용자는 홈 → 계정/설정 → 계정 → 계정 삭제에서 영구 계정 삭제를 요청할 수 있습니다. 앱을 사용할 수 없는 사용자는 계정 삭제 페이지의 본인 확인 요청 방법을 이용할 수 있습니다.",
        "privacy.s5.link": "계정 삭제 안내 보기",
        "privacy.s5.item1":
          "필요한 로그인 제공자 처리와 서버 정리 후 Supabase Auth 계정을 영구 삭제합니다.",
        "privacy.s5.item2":
          "Support 계정 연결과 알림 outbox는 즉시 제거합니다. 삭제와 연결된 문의 내용은 즉시 일반 조회를 차단하고 최대 7일 안에 물리 삭제합니다.",
        "privacy.s5.item3":
          "계정 소유 Push receipt, device, 암호화 token은 즉시 삭제합니다. 보존되는 Push dispatch JSON에서는 일치하는 수신 계정 식별자만 제거하며 관련 없는 dispatch는 변경하지 않습니다.",
        "privacy.s5.item4":
          "기기에서 생성한 익명 analytics 식별자는 Supabase 계정 UUID와 다르며 계정 삭제에 자동으로 연결되거나 제거되지 않습니다. 앱 데이터 삭제 시 로컬 사본은 삭제되지만, 서버가 이미 수신한 계정 비연결 analytics 이벤트는 계정 삭제로 삭제되지 않습니다.",
        "privacy.s5.item5":
          "재시도와 백업 복구 뒤에도 삭제를 유지하기 위해 keyed deletion replay 항목은 최대 31일, 계정 신원이 없는 deletion receipt는 최대 365일 보관합니다.",
        "privacy.s5.item6":
          "현재 기기의 앱 관리 기록과 첨부파일 삭제는 별도의 선택 사항이며 기본값은 유지입니다.",
        "privacy.s5.item7":
          "사용자가 직접 내보낸 백업 ZIP 파일은 자동 삭제되지 않습니다.",
        "privacy.s6.title": "6. 보안",
        "privacy.s6.copy":
          "NoveraFlow는 기록과 관련 데이터를 보호하기 위해 합리적인 기술적, 관리적 보호 조치를 적용합니다.",
        "privacy.s7.title": "7. 아동의 개인정보",
        "privacy.s7.copy":
          "NoveraFlow는 아동을 대상으로 개인정보를 의도적으로 수집하도록 설계된 서비스가 아닙니다.",
        "privacy.s8.title": "8. 정책 변경",
        "privacy.s8.copy":
          "서비스 기능, 데이터 처리 방식, 법령 또는 플랫폼 정책이 변경되면 본 방침이 수정될 수 있습니다.",
        "privacy.s9.title": "9. 연락처",
        "privacy.s9.service": "서비스명: NoveraFlow",
        "privacy.s9.operator": "운영자: moolsoft",
        "privacy.s9.email": "이메일:",
        "privacy.s9.website": "웹사이트:",
        "privacy.s9.termsLink": "이용약관 보기",
        "terms.eyebrow": "이용약관",
        "terms.title": "이용약관",
        "terms.lead":
          "이 약관은 현재 NoveraFlow 서비스와 이용 시 적용되는 책임을 안내합니다.",
        "terms.updated": "시행일 및 최종 업데이트: 2026년 9월 2일",
        "terms.s1.title": "1. 서비스와 계정",
        "terms.s1.copy":
          "NoveraFlow는 로컬 일기 기록과 선택적 계정 기능을 제공합니다. Google 또는 Apple 로그인은 Supabase Auth 계정을 생성하고 접근하는 데 사용됩니다. Support 문의와 계정 소유 Push 기능에는 해당 로그인 계정이 필요합니다.",
        "terms.s2.title": "2. 기록과 AI 피드백",
        "terms.s2.copy":
          "NoveraFlow는 기록과 성찰 경험을 제공합니다. AI 피드백은 이용 불가, 지연 또는 불완전할 수 있으며 의료, 법률, 금융 또는 기타 전문 상담이 아닙니다. 기록이나 피드백을 바탕으로 한 결정은 사용자의 책임입니다.",
        "terms.s3.title": "3. 로컬 기록과 백업",
        "terms.s3.copy":
          "현재 v1 설계에서 기본 기록과 첨부파일은 사용자의 기기에 저장됩니다. 사용자는 기기와 직접 내보낸 백업 ZIP을 보호하고, 필요한 경우 복구를 확인하며, 더 이상 필요하지 않은 사본을 삭제할 책임이 있습니다.",
        "terms.s4.title": "4. 개인정보와 계정 연결 기능",
        "terms.s4.copy":
          "인증, analytics, Support, Push 기능은 개인정보처리방침에 설명된 데이터만 처리합니다. Support 메시지에 비밀번호, 인증 코드, token 또는 불필요한 민감 기록 내용을 입력하지 마세요.",
        "terms.s4.privacyLink": "개인정보처리방침 보기",
        "terms.s5.title": "5. 계정 삭제",
        "terms.s5.copy":
          "로그아웃은 계정을 삭제하지 않습니다. 영구 삭제에는 앱에서 Google 또는 Apple 재인증과 최종 확인이 필요하며, 앱을 사용할 수 없을 때는 본인 확인이 포함된 외부 요청 절차를 이용합니다. 삭제 범위와 보유 기간은 계정 삭제 페이지에서 안내합니다.",
        "terms.s5.deletionLink": "계정 삭제 안내 보기",
        "terms.s6.title": "6. 가용성, 변경 및 문의",
        "terms.s6.copy":
          "서비스는 유지보수, 보안, 제공자 변경 또는 운영상 사유로 변경되거나 일시 중단될 수 있습니다. 약관 또는 데이터 처리의 중요한 변경은 공개 정책에 반영합니다. 문의는 공개 지원 채널로 보낼 수 있습니다.",
        "terms.s6.contactLink": "NoveraFlow 지원 문의",
        "contact.eyebrow": "문의",
        "contact.title": "문의 및 지원",
        "contact.lead":
          "제품 문의, 개인정보 문의, 이용약관 문의, 향후 베타 관련 연락은 아래 채널로 보내 주세요.",
        "contact.channel.title": "문의 채널",
        "contact.channel.email": "이메일:",
        "contact.before.title": "정식 오픈 전 안내",
        "contact.before.copy":
          "앱 등록, 베타 테스트, 정식 운영 전에 공개 지원 절차와 개인정보 문의 절차를 다시 확인합니다.",
      },
      thoughts: [
        "오늘은 작은 기록만으로도 충분해요.",
        "AI는 정답보다 흐름을 비춥니다.",
        "비슷한 결이 천천히 나타나고 있어요.",
        "상징은 기록 곁에서 함께 자랍니다.",
        "작은 흔적도 나중에는 흐름이 됩니다.",
      ],
    },
    en: {
      meta: {
        home: {
          title: "NoveraFlow | A Quiet AI Diary for Living Patterns",
          description:
            "NoveraFlow is a quiet AI diary for short records, symbols, flows, and AI feedback that helps you reflect without pressure.",
          keywords:
            "NoveraFlow, AI diary, records, symbols, flows, feedback, AI feedback, backup, restore, notifications, privacy",
          ogTitle: "NoveraFlow | A Quiet Diary for Life Flow",
          ogDescription:
            "Write short records, grow gentle symbols, and notice your everyday flows with quiet feedback.",
          twitterTitle: "NoveraFlow | A Quiet AI Diary",
          twitterDescription:
            "A quiet diary for short records, symbols, flows, and AI feedback.",
          locale: "en_US",
        },
        about: {
          title: "About NoveraFlow | Quiet AI Diary",
          description:
            "Learn how NoveraFlow approaches records, symbols, flows, and feedback.",
          ogTitle: "About NoveraFlow",
          ogDescription:
            "A quiet AI diary built around short records, symbols, flows, and AI feedback.",
          twitterTitle: "About NoveraFlow",
          twitterDescription:
            "NoveraFlow app direction and launch preparation.",
          locale: "en_US",
        },
        features: {
          title: "NoveraFlow Features | Records, Symbols, Flows, AI Feedback",
          description:
            "See how NoveraFlow handles records, symbols, flows, AI feedback, backup, restore, and notifications.",
          ogTitle: "NoveraFlow Features",
          ogDescription:
            "Records, symbols, flows, and AI feedback in a quiet diary experience.",
          twitterTitle: "NoveraFlow Features",
          twitterDescription:
            "A quiet diary built around records, symbols, flows, and AI feedback.",
          locale: "en_US",
        },
        faq: {
          title: "NoveraFlow FAQ",
          description:
            "Frequently asked questions about NoveraFlow records, symbols, flows, AI feedback, backup, restore, notifications, and privacy.",
          ogTitle: "NoveraFlow FAQ",
          ogDescription:
            "Answers to common questions before using NoveraFlow.",
          twitterTitle: "NoveraFlow FAQ",
          twitterDescription: "Frequently asked questions about NoveraFlow.",
          locale: "en_US",
        },
        privacy: {
          title: "NoveraFlow Privacy Policy",
          description:
            "How NoveraFlow handles records, Google and Apple sign-in, Supabase Auth, support, Push, analytics, and account deletion.",
          ogTitle: "NoveraFlow Privacy Policy",
          ogDescription:
            "NoveraFlow privacy and record data handling principles.",
          twitterTitle: "NoveraFlow Privacy Policy",
          twitterDescription:
            "NoveraFlow privacy and record data handling principles.",
          locale: "en_US",
        },
        accountDeletion: {
          title: "Delete a NoveraFlow Account",
          description: "How to delete a NoveraFlow AI Record account and how related data is deleted or retained.",
          keywords: "NoveraFlow, account deletion, personal data deletion, Google Play",
          ogTitle: "Delete a NoveraFlow Account",
          ogDescription: "Account deletion steps in the app and when the app is unavailable.",
          twitterTitle: "Delete a NoveraFlow Account",
          twitterDescription: "NoveraFlow account deletion and data retention details.",
          locale: "en_US",
        },
        terms: {
          title: "NoveraFlow Terms of Service",
          description:
            "Terms for NoveraFlow records, AI feedback, sign-in accounts, support, Push, backup, and account deletion.",
          ogTitle: "NoveraFlow Terms of Service",
          ogDescription: "NoveraFlow terms and service boundaries.",
          twitterTitle: "NoveraFlow Terms of Service",
          twitterDescription: "NoveraFlow service terms.",
          locale: "en_US",
        },
        contact: {
          title: "Contact NoveraFlow",
          description:
            "Contact NoveraFlow for product questions, privacy questions, terms questions, and support.",
          ogTitle: "Contact NoveraFlow",
          ogDescription: "Contact and support information for NoveraFlow.",
          twitterTitle: "Contact NoveraFlow",
          twitterDescription: "NoveraFlow contact and support.",
          locale: "en_US",
        },
      },
      messages: {
        "common.brand.home": "NoveraFlow home",
        "common.nav.label": "Primary navigation",
        "common.nav.home": "Home",
        "common.nav.about": "About",
        "common.nav.features": "Features",
        "common.nav.faq": "FAQ",
        "common.nav.privacy": "Privacy",
        "common.nav.terms": "Terms",
        "common.nav.contact": "Contact",
        "common.footer.label": "Footer navigation",
        "common.footer.copy":
          "A quiet diary that reflects flows instead of judging records.",
        "common.language.label": "Language",
        "common.language.ko": "한국어",
        "common.language.en": "English",
        "common.language.ja": "日本語",
        "home.hero.eyebrow": "A quiet diary for living patterns",
        "home.hero.title": "NoveraFlow",
        "home.hero.copy":
          "When records gather, a flow begins to appear. NoveraFlow does not judge the day. It lets short sentences, small symbols, and quiet feedback settle into a shape that feels like your own.",
        "home.hero.actionsLabel": "Main actions",
        "home.hero.primaryCta": "See features",
        "home.hero.secondaryCta": "App guide",
        "home.hero.previewLabel": "NoveraFlow diary feeling preview",
        "home.hero.recordFirst":
          "A day for leaving less explanation, and one small trace.",
        "home.hero.recordSecond":
          "A similar thought has been moving quietly for a few days.",
        "home.thoughts.initial": "A small record is enough today.",
        "home.philosophy.eyebrow": "What matters",
        "home.philosophy.title": "A diary where records come before AI",
        "home.philosophy.item1.index": "Small",
        "home.philosophy.item1.title": "Records that do not feel heavy",
        "home.philosophy.item1.copy":
          "One sentence, one symbol, or even a quiet blank can still become a record.",
        "home.philosophy.item2.index": "Quiet",
        "home.philosophy.item2.title": "Feedback that does not decide for you",
        "home.philosophy.item2.copy":
          "AI does not diagnose or prescribe. It reflects recurring flows with care.",
        "home.philosophy.item3.index": "Slow",
        "home.philosophy.item3.title": "Symbols that do not force meaning",
        "home.philosophy.item3.copy":
          "A symbol is not a score or a type. It is a small shape that grows beside your records.",
        "home.flow.eyebrow": "How it flows",
        "home.flow.title": "How small pieces of a day become a flow",
        "home.flow.copy":
          "NoveraFlow does not rush to analyze a record. It waits for repeated words, moods, symbols, and small changes to connect over time.",
        "home.flow.stepsLabel": "Flow steps",
        "home.flow.step1.index": "Leave",
        "home.flow.step1.title": "A short record",
        "home.flow.step1.copy":
          "Write the nearest sentence, feeling, or symbol without needing to explain everything.",
        "home.flow.step2.index": "Gather",
        "home.flow.step2.title": "A quiet accumulation",
        "home.flow.step2.copy":
          "Records gather around flows rather than dates alone.",
        "home.flow.step3.index": "Reflect",
        "home.flow.step3.title": "Soft feedback",
        "home.flow.step3.copy":
          "When a familiar theme appears, it is gently shown without conclusion.",
        "home.symbol.eyebrow": "Small symbols",
        "home.symbol.title": "Symbols are not rewards. They are shapes of flow.",
        "home.symbol.copy":
          "They may begin as a dot, a line, or a small trace. As records continue, they slowly grow into a natural form. Completion is not an ending. It is a quiet turn into the next flow.",
        "home.symbol.stageLabel": "Symbol growth stages",
        "home.feedback.eyebrow": "A quiet note",
        "home.feedback.title":
          '"A similar feeling seems to be returning lately."',
        "home.feedback.copy":
          "Feedback stays close to observation. It does not fix a life into one answer. It helps a person see a flow that may have been hard to notice alone.",
        "home.community.eyebrow": "Gentle connection",
        "home.community.title": "Community is optional. It opens quietly.",
        "home.community.copy":
          "NoveraFlow begins with anonymous flows, not public diaries. When someone chooses to join, similar flows can meet without turning a private life into display.",
        "home.community.item1.title": "Anonymous flow",
        "home.community.item1.copy":
          "A shared feeling can appear without exposing the full original record.",
        "home.community.item2.title": "Open symbol meaning",
        "home.community.item2.copy":
          "The service does not define symbols too strongly. People may interpret them naturally.",
        "home.community.item3.title": "Connection without pressure",
        "home.community.item3.copy":
          "The goal is not ranking, typing, or performing. It is the feeling that a flow is not only yours.",
        "home.mvp.eyebrow": "App guide",
        "home.mvp.title": "Starting small, so it can stay with people longer.",
        "home.mvp.copy":
          "The first version supports easy records, symbols, light AI feedback, optional account sign-in, and user-managed backup ZIP export and restore. Primary records remain on the device.",
        "home.mvp.status1": "Record experience",
        "home.mvp.status2": "Symbol growth",
        "home.mvp.status3": "AI feedback quality",
        "home.mvp.status4": "Backup ZIP export and restore",
        "about.eyebrow": "About",
        "about.title": "About NoveraFlow",
        "about.lead":
          "NoveraFlow is a quiet AI diary for people who want small records to become personal flows without turning life into a score.",
        "about.section1.title": "Records come first",
        "about.section1.copy":
          "A record does not need to be long or complete. A short sentence, a symbol, a photo, or a voice note can be enough to keep a trace of the day.",
        "about.section2.title": "App guide and download",
        "about.section2.copy":
          "NoveraFlow is preparing for public launch. App store links and download information will be added here after registration and basic review.",
        "about.section3.title": "Backup and restore direction",
        "about.section3.copy":
          "The first version starts with local records. Backup and restore are treated as core features for long-term record preservation.",
        "features.eyebrow": "Features",
        "features.title": "Records, symbols, flows, and AI feedback",
        "features.lead":
          "NoveraFlow features are designed to help you notice flows over time instead of being interpreted too quickly.",
        "features.record.title": "Records",
        "features.record.copy":
          "A private space for short text, selected symbols, photos, and voice records.",
        "features.symbol.title": "Symbols",
        "features.symbol.copy":
          "Symbols are not rewards or grades. They are small forms that grow beside records.",
        "features.flow.title": "Flows",
        "features.flow.copy":
          "A flow appears carefully when repeated words, emotions, symbols, and life context have enough ground.",
        "features.feedback.title": "AI feedback",
        "features.feedback.copy":
          "AI feedback is observational. It helps you revisit records without diagnosis or prescription.",
        "features.backup.title": "Backup and restore",
        "features.backup.copy":
          "The app can export records as a backup ZIP and restore a supported backup. Exported files remain under the user's control.",
        "features.notice.title": "Notifications",
        "features.notice.copy":
          "Notifications are designed to invite a quiet return, not pressure constant engagement.",
        "faq.eyebrow": "FAQ",
        "faq.title": "Frequently asked questions",
        "faq.lead":
          "Common questions about records, AI feedback, privacy, backup, restore, and notifications.",
        "faq.q1.title": "What is NoveraFlow?",
        "faq.q1.copy":
          "NoveraFlow is a quiet AI diary for short records, symbols, flows, and AI feedback.",
        "faq.q2.title": "Is AI feedback counseling or diagnosis?",
        "faq.q2.copy":
          "No. AI feedback does not judge or diagnose records. It is provided as a reflective observation.",
        "faq.q3.title": "Where are records stored?",
        "faq.q3.copy":
          "The first version is designed around local records. If server processing or backup changes are added, the privacy policy will be updated.",
        "faq.q4.title": "Will backup and restore be supported?",
        "faq.q4.copy":
          "Yes. The app can export a backup ZIP and restore from a supported backup. Exported files remain under the user's control.",
        "faq.q5.title": "Can notifications be turned off?",
        "faq.q5.copy":
          "Yes. Notifications are controlled by the app setting and the device's notification permission.",
        "faq.q6.title": "Where can I contact support?",
        "faq.q6.copy":
          "Product, privacy, and terms questions can be sent to the email on the contact page.",
        "privacy.eyebrow": "Privacy",
        "privacy.title": "Privacy Policy",
        "privacy.lead":
          "NoveraFlow treats records with care. It does not track users for advertising or sell record data.",
        "privacy.updated": "Effective and last updated: September 2, 2026",
        "privacy.s1.title": "1. Information processed",
        "privacy.s1.copy":
          "NoveraFlow may process the following information to provide the service.",
        "privacy.s1.item1": "Record content written by the user",
        "privacy.s1.item2": "Symbols, states, and keywords selected by the user",
        "privacy.s1.item3": "Photo or voice files attached by the user",
        "privacy.s1.item4":
          "App events needed for record creation, feature use, and error checks",
        "privacy.s1.item5":
          "Feedback rating data such as helpful, okay, or not quite",
        "privacy.s1.item6":
          "When you sign in, a Supabase Auth account UUID, Google or Apple identity information supplied for authentication, and authentication session data",
        "privacy.s1.item7":
          "Support inquiry category, subject, messages, replies, status, timestamps, and signed-in account link when you use in-app support",
        "privacy.s1.item8":
          "For Push, an installation identifier, encrypted device token, platform, language, app version/build, permission state, and signed-in account link when present",
        "privacy.s1.item9":
          "A device-generated anonymous analytics identifier, event name and time, language/locale, time-zone context, app version, platform, screen, and bounded feature outcome or error metadata",
        "privacy.s1.item10":
          "For requested daily, weekly, or monthly AI feedback: selected record text, limited period/count and previous-feedback comparison data, language/time-zone and quota metadata, and the device-generated anonymous identifier",
        "privacy.s1.note":
          "NoveraFlow does not collect record data to track users with advertising identifiers or build ad profiles.",
        "privacy.s2.title": "2. Purpose of use",
        "privacy.s2.copy":
          "Processed information is used for record storage, AI feedback, symbol and flow analysis, app stability, and feedback quality improvement.",
        "privacy.s2.note":
          "AI feedback is not designed to judge or diagnose records. It is a reference response that helps users revisit records.",
        "privacy.s3.title": "3. Storage and location",
        "privacy.s3.copy1":
          "Under the current v1 policy, primary record data is stored locally on the user's device.",
        "privacy.s3.copy2":
          "Users may export backup ZIP files from the app. These files are outside NoveraFlow's managed storage, so managing and deleting them is the user's responsibility.",
        "privacy.s3.copy5":
          "When AI feedback is requested, the selected data is sent to NoveraFlow's backend and configured AI runtime to generate the response. The current request-log path records content length and a short hash rather than the record text, and the generated feedback is stored with the local records.",
        "privacy.s3.copy3":
          "App events and feedback ratings are sent with the device-generated anonymous analytics identifier and stored on servers for stability checks and quality improvement. Analytics payloads do not include record text, attachment contents, email, Supabase account UUID, advertising identifiers, or precise location.",
        "privacy.s3.copy4":
          "Server backups are retained for no more than 30 days. The current server implementation has no automatic time-based expiry for anonymous analytics events, AI feedback quota/usage entries, or minimized Push dispatch audit fields, so their retention is not bounded by a fixed period.",
        "privacy.s4.title": "4. No sale or unnecessary third-party sharing",
        "privacy.s4.copy":
          "NoveraFlow does not sell personal information or record data. It does not disclose records except where required by law or explicitly requested by the user.",
        "privacy.s4.copy2":
          "Google and Apple process sign-in information, Supabase provides account authentication, and Firebase Cloud Messaging processes Push delivery tokens and messages when those optional features are used.",
        "privacy.s5.title": "5. User rights and deletion",
        "privacy.s5.copy":
          "Signed-in users can request permanent account deletion in Home → Account/Settings → Account → Delete account. Users who cannot use the app can follow the verified request method on the account deletion page.",
        "privacy.s5.link": "View account deletion instructions",
        "privacy.s5.item1":
          "The Supabase Auth account is hard-deleted after required provider handling and server cleanup.",
        "privacy.s5.item2":
          "Support account links and notification outbox rows are removed immediately. Content tied to the deletion is hidden immediately and physically purged within 7 days.",
        "privacy.s5.item3":
          "Account-owned Push receipts, devices, and encrypted tokens are deleted immediately. A matching recipient account identifier is removed from retained Push dispatch JSON without changing unrelated dispatches.",
        "privacy.s5.item4":
          "The device-generated anonymous analytics identifier is not the Supabase account UUID and is not automatically linked to or removed with account deletion. Clearing app data removes its local copy; analytics events already received by the server are not account-linked and are not deleted through account deletion.",
        "privacy.s5.item5":
          "The keyed deletion replay entry is retained for up to 31 days, and the identity-free deletion receipt for up to 365 days, so deletion remains effective after retries or backup restore.",
        "privacy.s5.item6":
          "Choosing whether to delete app-managed records and attachments on the current device is separate and optional. Records are kept by default.",
        "privacy.s5.item7":
          "Backup ZIP files exported by the user are not automatically deleted.",
        "privacy.s6.title": "6. Security",
        "privacy.s6.copy":
          "NoveraFlow applies reasonable technical and administrative safeguards to protect records and related data.",
        "privacy.s7.title": "7. Children's privacy",
        "privacy.s7.copy":
          "NoveraFlow is not designed to intentionally collect personal information from children.",
        "privacy.s8.title": "8. Policy changes",
        "privacy.s8.copy":
          "This policy may change when service features, data handling, laws, or platform policies change.",
        "privacy.s9.title": "9. Contact",
        "privacy.s9.service": "Service: NoveraFlow",
        "privacy.s9.operator": "Operator: moolsoft",
        "privacy.s9.email": "Email:",
        "privacy.s9.website": "Website:",
        "privacy.s9.termsLink": "View the Terms of Service",
        "terms.eyebrow": "Terms",
        "terms.title": "Terms of Service",
        "terms.lead":
          "These terms describe the current NoveraFlow service and the responsibilities that apply when you use it.",
        "terms.updated": "Effective and last updated: September 2, 2026",
        "terms.s1.title": "1. Service and accounts",
        "terms.s1.copy":
          "NoveraFlow provides local diary records and optional account features. Google or Apple sign-in creates and accesses a Supabase Auth account. Support inquiries and account-owned Push features require the relevant signed-in account.",
        "terms.s2.title": "2. Records and AI feedback",
        "terms.s2.copy":
          "NoveraFlow provides a diary and reflection experience. AI feedback may be unavailable, delayed, or incomplete and is not medical, legal, financial, or other professional advice. You remain responsible for decisions based on your records or feedback.",
        "terms.s3.title": "3. Local records and backup",
        "terms.s3.copy":
          "Primary records and attachments are stored on your device under the current v1 design. You are responsible for protecting your device and any backup ZIP you export, testing restoration where appropriate, and deleting copies you no longer need.",
        "terms.s4.title": "4. Privacy and account-linked features",
        "terms.s4.copy":
          "Authentication, analytics, support, and Push features process only the data described in the Privacy Policy. Do not place passwords, authorization codes, tokens, or unnecessary sensitive record content in support messages.",
        "terms.s4.privacyLink": "View the Privacy Policy",
        "terms.s5.title": "5. Account deletion",
        "terms.s5.copy":
          "Signing out does not delete an account. Permanent deletion requires Google or Apple reauthentication and final confirmation in the app, or the verified external request procedure when the app cannot be used. Deletion scope and retention periods are explained on the account deletion page.",
        "terms.s5.deletionLink": "View account deletion instructions",
        "terms.s6.title": "6. Availability, changes, and contact",
        "terms.s6.copy":
          "The service may change or be temporarily unavailable for maintenance, security, provider changes, or operational reasons. Material changes to these terms or data handling will be reflected in the public policies. Questions may be sent through the public contact channel.",
        "terms.s6.contactLink": "Contact NoveraFlow support",
        "contact.eyebrow": "Contact",
        "contact.title": "Contact and support",
        "contact.lead":
          "For product questions, privacy questions, terms questions, or future beta communication, use the channel below.",
        "contact.channel.title": "Contact channel",
        "contact.channel.email": "Email:",
        "contact.before.title": "Before public launch",
        "contact.before.copy":
          "Public support and privacy contact processes will be reviewed before app registration, beta testing, and production operation.",
      },
      thoughts: [
        "A small record is enough today.",
        "AI reflects the flow, not the answer.",
        "A familiar thread is slowly appearing.",
        "A symbol grows beside the record.",
        "A quiet trace can still become a flow.",
      ],
    },
    ja: {
      meta: {
        home: {
          title: "NoveraFlow | 暮らしの流れを映す静かなAI日記",
          description:
            "NoveraFlowは、短い記録、象徴、流れ、AIフィードバックを通じて日々を静かに振り返るためのAI日記です。",
          keywords:
            "NoveraFlow, AI日記, 記録, 象徴, 流れ, フィードバック, AIフィードバック, バックアップ, 復元, 通知, プライバシー",
          ogTitle: "NoveraFlow | 記録が流れになる静かな日記",
          ogDescription:
            "短い記録、小さな象徴、静かなフィードバックで日々の流れをゆっくり見つめる記録空間です。",
          twitterTitle: "NoveraFlow | 静かなAI日記",
          twitterDescription:
            "短い記録とAIフィードバックで暮らしの流れを静かに映す日記です。",
          locale: "ja_JP",
        },
        about: {
          title: "NoveraFlowについて | 静かなAI日記",
          description:
            "NoveraFlowが記録、象徴、流れ、フィードバックをどのように扱うかを紹介します。",
          ogTitle: "NoveraFlowについて",
          ogDescription:
            "短い記録、象徴、AIフィードバックを中心にしたNoveraFlowの方向性を紹介します。",
          twitterTitle: "NoveraFlowについて",
          twitterDescription:
            "NoveraFlowの記録体験とアプリ準備状況を案内します。",
          locale: "ja_JP",
        },
        features: {
          title: "NoveraFlowの機能 | 記録、象徴、流れ、AIフィードバック",
          description:
            "NoveraFlowの記録、象徴、流れ、AIフィードバック、バックアップ、復元、通知の方向性を紹介します。",
          ogTitle: "NoveraFlowの機能",
          ogDescription:
            "記録、象徴、流れ、AIフィードバックを中心にした機能を確認できます。",
          twitterTitle: "NoveraFlowの機能",
          twitterDescription:
            "記録、象徴、流れ、AIフィードバックを中心にした静かな日記機能です。",
          locale: "ja_JP",
        },
        faq: {
          title: "NoveraFlow FAQ | よくある質問",
          description:
            "NoveraFlowの記録、象徴、流れ、AIフィードバック、バックアップ、復元、通知、プライバシーに関する質問です。",
          ogTitle: "NoveraFlow FAQ",
          ogDescription:
            "NoveraFlowを使う前に確認したい質問と回答です。",
          twitterTitle: "NoveraFlow FAQ",
          twitterDescription: "NoveraFlowのよくある質問です。",
          locale: "ja_JP",
        },
        privacy: {
          title: "NoveraFlow プライバシーポリシー",
          description:
            "NoveraFlowの記録、Google・Appleログイン、Supabase Auth、Support、Push、analytics、アカウント削除に関する取り扱い方針です。",
          ogTitle: "NoveraFlow プライバシーポリシー",
          ogDescription:
            "NoveraFlowのプライバシーと記録データの取り扱い方針です。",
          twitterTitle: "NoveraFlow プライバシーポリシー",
          twitterDescription:
            "NoveraFlowのプライバシーと記録データの取り扱い方針です。",
          locale: "ja_JP",
        },
        accountDeletion: {
          title: "NoveraFlowアカウントの削除",
          description: "NoveraFlow AI記録のアカウント削除方法とデータの削除・保持期間をご案内します。",
          keywords: "NoveraFlow, アカウント削除, 個人データ削除, Google Play",
          ogTitle: "NoveraFlowアカウントの削除",
          ogDescription: "アプリ内およびアプリを利用できない場合の削除手順です。",
          twitterTitle: "NoveraFlowアカウントの削除",
          twitterDescription: "NoveraFlowのアカウント削除とデータ保持期間です。",
          locale: "ja_JP",
        },
        terms: {
          title: "NoveraFlow 利用規約",
          description:
            "NoveraFlowの記録、AIフィードバック、ログインアカウント、Support、Push、バックアップ、アカウント削除の利用基準です。",
          ogTitle: "NoveraFlow 利用規約",
          ogDescription: "NoveraFlowの利用規約とサービス範囲です。",
          twitterTitle: "NoveraFlow 利用規約",
          twitterDescription: "NoveraFlowの利用規約です。",
          locale: "ja_JP",
        },
        contact: {
          title: "NoveraFlow お問い合わせ",
          description:
            "NoveraFlowの製品、プライバシー、利用規約、サポートに関する問い合わせ先です。",
          ogTitle: "NoveraFlow お問い合わせ",
          ogDescription: "NoveraFlowのお問い合わせとサポート案内です。",
          twitterTitle: "NoveraFlow お問い合わせ",
          twitterDescription: "NoveraFlowのお問い合わせ案内です。",
          locale: "ja_JP",
        },
      },
      messages: {
        "common.brand.home": "NoveraFlow ホーム",
        "common.nav.label": "メインナビゲーション",
        "common.nav.home": "ホーム",
        "common.nav.about": "紹介",
        "common.nav.features": "機能",
        "common.nav.faq": "FAQ",
        "common.nav.privacy": "プライバシー",
        "common.nav.terms": "利用規約",
        "common.nav.contact": "お問い合わせ",
        "common.footer.label": "フッターナビゲーション",
        "common.footer.copy":
          "記録を判断せず、流れを静かに映す日記です。",
        "common.language.label": "言語選択",
        "common.language.ko": "한국어",
        "common.language.en": "English",
        "common.language.ja": "日本語",
        "home.hero.eyebrow": "暮らしの流れのための静かな日記",
        "home.hero.title": "NoveraFlow",
        "home.hero.copy":
          "記録が重なると、ひとつの流れが少しずつ見えてきます。NoveraFlowは一日を判断しません。短い言葉、小さな象徴、静かなフィードバックが、自分らしい形に落ち着いていくのを支えます。",
        "home.hero.actionsLabel": "主な操作",
        "home.hero.primaryCta": "機能を見る",
        "home.hero.secondaryCta": "アプリ案内",
        "home.hero.previewLabel": "NoveraFlowの記録体験プレビュー",
        "home.hero.recordFirst": "長い説明より、小さな跡をひとつ残したい日。",
        "home.hero.recordSecond":
          "似たような考えが、ここ数日静かに続いています。",
        "home.thoughts.initial": "今日は小さな記録だけでも十分です。",
        "home.philosophy.eyebrow": "大切にしていること",
        "home.philosophy.title": "AIよりも記録が先にある日記",
        "home.philosophy.item1.index": "小さく",
        "home.philosophy.item1.title": "負担になりにくい記録",
        "home.philosophy.item1.copy":
          "一文、小さな象徴、静かな空白でも、十分に記録になり得ます。",
        "home.philosophy.item2.index": "静かに",
        "home.philosophy.item2.title": "決めつけないフィードバック",
        "home.philosophy.item2.copy":
          "AIは診断や処方をしません。繰り返し現れる流れを丁寧に映します。",
        "home.philosophy.item3.index": "ゆっくり",
        "home.philosophy.item3.title": "意味を押しつけない象徴",
        "home.philosophy.item3.copy":
          "象徴は点数やタイプではありません。記録のそばで育つ小さな形です。",
        "home.flow.eyebrow": "流れ方",
        "home.flow.title": "一日の小さな断片が流れになるまで",
        "home.flow.copy":
          "NoveraFlowは記録を急いで分析しません。繰り返される言葉、気分、象徴、小さな変化が時間の中でつながるのを待ちます。",
        "home.flow.stepsLabel": "流れの段階",
        "home.flow.step1.index": "残す",
        "home.flow.step1.title": "短い記録",
        "home.flow.step1.copy":
          "すべてを説明しなくても大丈夫です。いま近くにある言葉、感情、象徴を残します。",
        "home.flow.step2.index": "重なる",
        "home.flow.step2.title": "静かな蓄積",
        "home.flow.step2.copy":
          "記録は日付だけでなく、流れを中心に少しずつ重なります。",
        "home.flow.step3.index": "映す",
        "home.flow.step3.title": "やわらかなフィードバック",
        "home.flow.step3.copy":
          "なじみのあるテーマが見えたとき、結論を急がず静かに示します。",
        "home.symbol.eyebrow": "小さな象徴",
        "home.symbol.title": "象徴は報酬ではなく、流れの形です。",
        "home.symbol.copy":
          "象徴は点、線、小さな跡から始まることがあります。記録が続くと、自然な形へゆっくり育ちます。完成は終わりではなく、次の流れへ静かに移る瞬間です。",
        "home.symbol.stageLabel": "象徴の成長段階",
        "home.feedback.eyebrow": "静かなメモ",
        "home.feedback.title":
          "「最近、似た感情がまた戻ってきているようです。」",
        "home.feedback.copy":
          "フィードバックは観察に近い場所にとどまります。人生をひとつの答えに固定せず、一人では気づきにくかった流れを見直す助けになります。",
        "home.community.eyebrow": "やわらかなつながり",
        "home.community.title": "コミュニティは必須ではありません。静かに開きます。",
        "home.community.copy":
          "NoveraFlowは公開日記ではなく、匿名の流れから始まります。本人が望むとき、似た流れが私生活をさらさずに出会えます。",
        "home.community.item1.title": "匿名の流れ",
        "home.community.item1.copy":
          "記録の原文全体を見せなくても、共有された感覚は現れます。",
        "home.community.item2.title": "開かれた象徴の意味",
        "home.community.item2.copy":
          "サービスが象徴の意味を強く決めません。人は自然に感じ、解釈できます。",
        "home.community.item3.title": "負担のないつながり",
        "home.community.item3.copy":
          "順位、分類、見せることが目的ではありません。ある流れが自分だけのものではないかもしれないという感覚を大切にします。",
        "home.mvp.eyebrow": "アプリ案内",
        "home.mvp.title": "小さく始め、長くそばに残れるよう準備しています。",
        "home.mvp.copy":
          "最初のバージョンは、気軽な記録、象徴、軽いAIフィードバック、任意のアカウントログイン、利用者が管理するバックアップZIPの書き出しと復元に対応します。基本記録は端末に残ります。",
        "home.mvp.status1": "記録体験",
        "home.mvp.status2": "象徴の成長",
        "home.mvp.status3": "AIフィードバック品質",
        "home.mvp.status4": "バックアップZIPの書き出しと復元",
        "about.eyebrow": "紹介",
        "about.title": "NoveraFlowについて",
        "about.lead":
          "NoveraFlowは、日々を点数に変えず、小さな記録が自分の流れにつながるよう支える静かなAI日記です。",
        "about.section1.title": "記録を先に考えます",
        "about.section1.copy":
          "記録は長く完成された文章である必要はありません。短い言葉、象徴、写真、音声のような小さな跡も、一日を残す方法になります。",
        "about.section2.title": "アプリ案内とダウンロード",
        "about.section2.copy":
          "NoveraFlowは現在、正式公開に向けて準備中です。アプリストアのリンクとダウンロード情報は、登録と基本審査の後にこのサイトで案内します。",
        "about.section3.title": "バックアップと復元の方向",
        "about.section3.copy":
          "最初のバージョンはローカル記録を中心に始まります。バックアップと復元は、記録を長く残すための重要な機能として扱います。",
        "features.eyebrow": "機能",
        "features.title": "記録、象徴、流れ、AIフィードバック",
        "features.lead":
          "NoveraFlowの機能は、利用者を急いで解釈するのではなく、記録が重なって見えてくる流れを静かに確認できるよう設計されます。",
        "features.record.title": "記録",
        "features.record.copy":
          "短い文章、選んだ象徴、写真、音声記録を残せる個人の記録空間を目指します。",
        "features.symbol.title": "象徴",
        "features.symbol.copy":
          "象徴は報酬や等級ではありません。記録のそばでゆっくり育つ小さな形です。",
        "features.flow.title": "流れ",
        "features.flow.copy":
          "流れは、繰り返される言葉、感情、象徴、生活の文脈が十分に重なったとき、慎重に現れるパターンです。",
        "features.feedback.title": "AIフィードバック",
        "features.feedback.copy":
          "AIフィードバックは診断や処方ではなく、自分の記録を見直すための観察型の言葉です。",
        "features.backup.title": "バックアップと復元",
        "features.backup.copy":
          "アプリから記録をバックアップZIPとして書き出し、対応するバックアップを復元できます。書き出したファイルは利用者が管理します。",
        "features.notice.title": "通知",
        "features.notice.copy":
          "通知は記録を急かすのではなく、必要なときに静かに戻れるよう支える方向で設計します。",
        "faq.eyebrow": "FAQ",
        "faq.title": "よくある質問",
        "faq.lead":
          "NoveraFlowを使う前に気になりやすい記録、AIフィードバック、プライバシー、バックアップに関する質問です。",
        "faq.q1.title": "NoveraFlowはどんなアプリですか？",
        "faq.q1.copy":
          "短い記録、象徴、流れ、AIフィードバックを通じて日々を静かに振り返るAI日記です。",
        "faq.q2.title": "AIフィードバックは相談や診断ですか？",
        "faq.q2.copy":
          "いいえ。AIフィードバックは記録を判断したり診断したりせず、参考用の観察文として提供されます。",
        "faq.q3.title": "記録はどこに保存されますか？",
        "faq.q3.copy":
          "初期バージョンはローカル記録を中心に設計されます。サーバー処理やバックアップ機能が追加される場合は、プライバシーポリシーに反映します。",
        "faq.q4.title": "バックアップと復元に対応しますか？",
        "faq.q4.copy":
          "対応しています。アプリからバックアップZIPを書き出し、対応するバックアップを復元できます。書き出したファイルは利用者が管理します。",
        "faq.q5.title": "通知はオフにできますか？",
        "faq.q5.copy":
          "はい。通知はアプリ設定と端末の通知権限で管理できます。",
        "faq.q6.title": "問い合わせはどこに送ればよいですか？",
        "faq.q6.copy":
          "製品、プライバシー、利用規約に関する問い合わせは、お問い合わせページのメールアドレスへ送信できます。",
        "privacy.eyebrow": "プライバシー",
        "privacy.title": "プライバシーポリシー",
        "privacy.lead":
          "NoveraFlowは利用者の記録を大切に扱います。広告目的で利用者を追跡したり、記録データを販売したりしません。",
        "privacy.updated": "施行日および最終更新日: 2026年9月2日",
        "privacy.s1.title": "1. 取り扱う情報",
        "privacy.s1.copy":
          "NoveraFlowはサービス提供のため、次の情報を取り扱う場合があります。",
        "privacy.s1.item1": "利用者が作成した記録内容",
        "privacy.s1.item2": "利用者が選択した象徴、状態、キーワード",
        "privacy.s1.item3": "利用者が添付した写真または音声ファイル",
        "privacy.s1.item4": "記録作成、機能利用、エラー確認に必要なアプリ利用イベント",
        "privacy.s1.item5": "役に立った、普通、いまひとつ等のフィードバック評価データ",
        "privacy.s1.item6":
          "ログイン時のSupabase AuthアカウントUUID、認証のためGoogleまたはAppleから提供される本人情報と認証セッションデータ",
        "privacy.s1.item7":
          "アプリ内Support利用時の問い合わせ種別、件名、メッセージ、返信、状態、時刻、ログインアカウントとの紐付け",
        "privacy.s1.item8":
          "Push利用時のインストール識別子、暗号化された端末token、プラットフォーム、言語、アプリのバージョン/build、権限状態、および存在する場合のログインアカウントとの紐付け",
        "privacy.s1.item9":
          "端末で生成される匿名analytics識別子、イベント名と時刻、言語/locale、タイムゾーン情報、アプリのバージョン、プラットフォーム、画面、限定された機能結果またはエラー情報",
        "privacy.s1.item10":
          "日次・週次・月次AIフィードバックのリクエスト時に選択された記録テキスト、限定された期間/件数と以前のフィードバック比較データ、言語/タイムゾーンおよびquota情報、端末で生成される匿名識別子",
        "privacy.s1.note":
          "NoveraFlowは広告識別子で利用者を追跡したり、広告プロファイルを作成したりする目的で記録データを収集しません。",
        "privacy.s2.title": "2. 利用目的",
        "privacy.s2.copy":
          "処理される情報は、記録の保存、AIフィードバック、象徴と流れの分析、アプリの安定性確認、フィードバック品質改善のために使われます。",
        "privacy.s2.note":
          "AIフィードバックは記録を判断または診断する機能ではなく、記録を見直すための参考反応です。",
        "privacy.s3.title": "3. 保管と保存場所",
        "privacy.s3.copy1":
          "現在のv1方針では、基本的な記録データは利用者の端末にローカル保存されます。",
        "privacy.s3.copy2":
          "利用者はアプリからバックアップZIPを書き出せます。このファイルはNoveraFlowの管理対象外にあるため、管理と削除は利用者自身が行います。",
        "privacy.s3.copy5":
          "AIフィードバックをリクエストすると、選択されたデータは応答生成のためNoveraFlow backendと設定済みAI runtimeへ送信されます。現在のリクエストログ経路は記録テキストではなく内容の長さと短いhashを記録し、生成されたフィードバックは端末内記録とともに保存されます。",
        "privacy.s3.copy3":
          "アプリ利用イベントとフィードバック評価は、端末で生成される匿名analytics識別子とともにサーバーへ送信され、安定性確認と品質改善のため保管されます。analytics payloadには記録本文、添付ファイルの内容、メール、SupabaseアカウントUUID、広告識別子、正確な位置情報は含まれません。",
        "privacy.s3.copy4":
          "サーバーバックアップは最長30日保持します。現在のサーバー実装では、匿名analyticsイベント、AIフィードバックquota/usage項目、最小化されたPush dispatch監査フィールドに自動的な期間満了がなく、保持期間は固定期間に制限されません。",
        "privacy.s4.title": "4. 第三者提供および販売の禁止",
        "privacy.s4.copy":
          "NoveraFlowは個人情報や記録データを販売しません。法令上の要請または利用者の明示的な依頼がある場合を除き、記録を任意に公開しません。",
        "privacy.s4.copy2":
          "任意機能の利用時、GoogleとAppleはログイン情報を、Supabaseはアカウント認証を、Firebase Cloud MessagingはPush配信用tokenとメッセージを処理します。",
        "privacy.s5.title": "5. 利用者の権利と削除",
        "privacy.s5.copy":
          "ログイン利用者は、ホーム → アカウント／設定 → アカウント → アカウントを削除から完全削除をリクエストできます。アプリを利用できない場合は、アカウント削除ページの本人確認付きリクエスト方法を利用できます。",
        "privacy.s5.link": "アカウント削除の案内を見る",
        "privacy.s5.item1":
          "必要なログインプロバイダー処理とサーバー整理後、Supabase Authアカウントを完全削除します。",
        "privacy.s5.item2":
          "Supportアカウントの紐付けと通知outboxは直ちに削除します。削除に関連する問い合わせ内容は直ちに通常閲覧を停止し、最長7日以内に物理削除します。",
        "privacy.s5.item3":
          "アカウント所有のPush receipt、device、暗号化tokenは直ちに削除します。保持されるPush dispatch JSONでは一致する受信アカウント識別子のみを削除し、関係のないdispatchは変更しません。",
        "privacy.s5.item4":
          "端末で生成される匿名analytics識別子はSupabaseアカウントUUIDとは別で、アカウント削除に自動で紐付けまたは削除されません。アプリデータを消去すると端末内のコピーは削除されますが、サーバーが受信済みのアカウント非連携analyticsイベントはアカウント削除では削除されません。",
        "privacy.s5.item5":
          "再試行やバックアップ復元後も削除を維持するため、keyed deletion replay項目は最長31日、アカウント情報を含まないdeletion receiptは最長365日保持します。",
        "privacy.s5.item6":
          "現在の端末にあるアプリ管理の記録と添付ファイルの削除は別の任意選択で、初期設定では保持します。",
        "privacy.s5.item7":
          "利用者が書き出したバックアップZIPは自動削除されません。",
        "privacy.s6.title": "6. セキュリティ",
        "privacy.s6.copy":
          "NoveraFlowは記録と関連データを保護するため、合理的な技術的・管理的保護措置を適用します。",
        "privacy.s7.title": "7. 子どものプライバシー",
        "privacy.s7.copy":
          "NoveraFlowは子どもの個人情報を意図的に収集するよう設計されたサービスではありません。",
        "privacy.s8.title": "8. 方針の変更",
        "privacy.s8.copy":
          "サービス機能、データ処理、法令、プラットフォーム方針が変わる場合、本方針を変更することがあります。",
        "privacy.s9.title": "9. 連絡先",
        "privacy.s9.service": "サービス名: NoveraFlow",
        "privacy.s9.operator": "運営者: moolsoft",
        "privacy.s9.email": "メール:",
        "privacy.s9.website": "ウェブサイト:",
        "privacy.s9.termsLink": "利用規約を見る",
        "terms.eyebrow": "利用規約",
        "terms.title": "利用規約",
        "terms.lead":
          "この規約は、現在のNoveraFlowサービスと利用時に適用される責任を案内するものです。",
        "terms.updated": "施行日および最終更新日: 2026年9月2日",
        "terms.s1.title": "1. サービスとアカウント",
        "terms.s1.copy":
          "NoveraFlowは端末内の日記記録と任意のアカウント機能を提供します。GoogleまたはAppleログインはSupabase Authアカウントの作成とアクセスに使用されます。Support問い合わせとアカウント所有のPush機能には該当するログインアカウントが必要です。",
        "terms.s2.title": "2. 記録とAIフィードバック",
        "terms.s2.copy":
          "NoveraFlowは日記と振り返りの体験を提供します。AIフィードバックは利用できない、遅延する、または不完全な場合があり、医療、法律、金融その他の専門的助言ではありません。記録やフィードバックに基づく判断は利用者の責任です。",
        "terms.s3.title": "3. 端末内記録とバックアップ",
        "terms.s3.copy":
          "現在のv1設計では、基本記録と添付ファイルは利用者の端末に保存されます。利用者は端末と書き出したバックアップZIPを保護し、必要に応じて復元を確認し、不要なコピーを削除する責任があります。",
        "terms.s4.title": "4. プライバシーとアカウント連携機能",
        "terms.s4.copy":
          "認証、analytics、Support、Push機能はプライバシーポリシーに記載されたデータのみを処理します。Supportメッセージにパスワード、認証コード、token、不要な機微記録内容を入力しないでください。",
        "terms.s4.privacyLink": "プライバシーポリシーを見る",
        "terms.s5.title": "5. アカウント削除",
        "terms.s5.copy":
          "ログアウトではアカウントは削除されません。完全削除にはアプリ内でGoogleまたはAppleによる再認証と最終確認が必要で、アプリを利用できない場合は本人確認を伴う外部リクエスト手順を利用します。削除範囲と保持期間はアカウント削除ページで案内します。",
        "terms.s5.deletionLink": "アカウント削除の案内を見る",
        "terms.s6.title": "6. 提供状況、変更、問い合わせ",
        "terms.s6.copy":
          "サービスは保守、セキュリティ、提供者の変更、運用上の理由により変更または一時停止する場合があります。規約またはデータ処理の重要な変更は公開ポリシーに反映します。問い合わせは公開サポート窓口へ送信できます。",
        "terms.s6.contactLink": "NoveraFlowサポートへ問い合わせる",
        "contact.eyebrow": "お問い合わせ",
        "contact.title": "お問い合わせとサポート",
        "contact.lead":
          "製品、プライバシー、利用規約、今後のベータに関する連絡は、以下の窓口へお送りください。",
        "contact.channel.title": "問い合わせ先",
        "contact.channel.email": "メール:",
        "contact.before.title": "正式公開前の案内",
        "contact.before.copy":
          "アプリ登録、ベータテスト、正式運用の前に、公開サポートとプライバシー問い合わせの手順を再確認します。",
      },
      thoughts: [
        "今日は小さな記録だけでも十分です。",
        "AIは答えではなく流れを映します。",
        "なじみのある糸が少しずつ見えています。",
        "象徴は記録のそばで育ちます。",
        "静かな跡も、やがて流れになります。",
      ],
    },
  };

  function pageKey() {
    return document.documentElement.dataset.page || "home";
  }

  function normalizeLocale(locale) {
    const base = String(locale || "").toLowerCase().split("-")[0];
    return SUPPORTED_LOCALES.includes(base) ? base : "";
  }

  function detectLocale() {
    const params = new URLSearchParams(window.location.search);
    return (
      normalizeLocale(params.get("lang")) ||
      normalizeLocale(window.localStorage.getItem(STORAGE_KEY)) ||
      normalizeLocale(navigator.language) ||
      normalizeLocale(document.documentElement.dataset.defaultLocale) ||
      "en"
    );
  }

  function getCopy(locale = window.NoveraFlowI18n.locale) {
    return locales[locale] || locales.en;
  }

  function message(key, locale = window.NoveraFlowI18n.locale) {
    return getCopy(locale).messages[key] || locales.en.messages[key] || key;
  }

  function metaFor(locale = window.NoveraFlowI18n.locale) {
    const copy = getCopy(locale);
    return copy.meta[pageKey()] || copy.meta.home;
  }

  function setMeta(selector, attribute, value) {
    if (!value) return;
    let element = document.querySelector(selector);
    if (!element && selector.startsWith("meta[")) {
      const match = selector.match(/^meta\[(name|property)='([^']+)'\]$/);
      if (match) {
        element = document.createElement("meta");
        element.setAttribute(match[1], match[2]);
        document.head.appendChild(element);
      }
    }
    if (element) element.setAttribute(attribute, value);
  }

  function applyLocale(locale = detectLocale()) {
    const normalized = normalizeLocale(locale) || "en";
    window.NoveraFlowI18n.locale = normalized;
    window.localStorage.setItem(STORAGE_KEY, normalized);
    document.documentElement.lang = normalized;

    const meta = metaFor(normalized);
    document.title = meta.title;
    setMeta("meta[name='description']", "content", meta.description);
    setMeta("meta[name='keywords']", "content", meta.keywords);
    setMeta("meta[property='og:title']", "content", meta.ogTitle);
    setMeta("meta[property='og:description']", "content", meta.ogDescription);
    setMeta("meta[property='og:locale']", "content", meta.locale);
    setMeta("meta[name='twitter:title']", "content", meta.twitterTitle);
    setMeta(
      "meta[name='twitter:description']",
      "content",
      meta.twitterDescription,
    );

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = message(element.dataset.i18n, normalized);
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute(
        "aria-label",
        message(element.dataset.i18nAriaLabel, normalized),
      );
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
      element.setAttribute("title", message(element.dataset.i18nTitle, normalized));
    });
    document.querySelectorAll("[data-locale]").forEach((element) => {
      const active = element.dataset.locale === normalized;
      element.classList.toggle("is-active", active);
      element.setAttribute("aria-pressed", String(active));
    });

    window.dispatchEvent(
      new CustomEvent("noveraflow:localechange", {
        detail: { locale: normalized },
      }),
    );
  }

  function bindLanguageSwitch() {
    document.querySelectorAll("[data-locale]").forEach((button) => {
      button.addEventListener("click", () => applyLocale(button.dataset.locale));
    });
  }

  window.NoveraFlowI18n = {
    locales,
    supportedLocales: SUPPORTED_LOCALES,
    locale: detectLocale(),
    applyLocale,
    message,
    metaFor,
  };

  document.addEventListener("DOMContentLoaded", () => {
    bindLanguageSwitch();
    applyLocale(window.NoveraFlowI18n.locale);
  });
})();
