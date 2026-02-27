# CLAUDE.md

이 파일은 이 저장소에서 작업할 때 Claude Code(claude.ai/code)에게 제공되는 가이드입니다.

## 명령어

```bash
npm run dev      # 개발 서버 시작
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 시작
npm run lint     # ESLint 실행
```

테스트 프레임워크는 설정되어 있지 않습니다.

## 아키텍처

**COSFLOW**는 한국 뷰티 산업을 대상으로 하는 화장품 규제 통합 관리 및 생산 관리 플랫폼으로, Next.js 16 (App Router) 기반입니다. UI는 한국어로 작성되어 있습니다.

### 라우팅 구조

- `/` → `/dashboard`로 리다이렉트
- `/login` — 로그인 페이지
- `/(main)/` — 공통 사이드바 레이아웃을 공유하는 라우트 그룹 (`SidebarProvider` + `AppSidebar`)
  - `/dashboard` — KPI 카드, 차트, 최근 프로젝트 테이블
  - `/requests` — 개발 의뢰 관리
  - `/ingredients` — 성분 데이터베이스 및 국가별 규제 현황 매트릭스
  - `/certifications` — 인증 관리
  - `/production` — 칸반 방식의 생산 워크플로우
  - `/regulations` — 국가 필터링이 적용된 AI 규제 정보 챗

### 데이터 흐름

모든 데이터는 `src/data/`의 정적 목 데이터입니다. API 레이어나 데이터베이스는 없으며, 각 페이지에서 직접 import합니다. `use-chat.ts` 훅은 `src/data/chat-responses.ts`와 `src/data/regulations.ts`를 기반으로 키워드 매칭 및 국가 필터링을 포함한 채팅 상태를 관리합니다.

### 컴포넌트 구조

- `src/components/ui/` — shadcn/ui 컴포넌트 (25개, New York 스타일, neutral 기본 색상)
- `src/components/layout/` — `AppSidebar`, `AppHeader`, `UserNav`
- `src/components/shared/` — `DataTable`, `PageHeader`, `ProcessStepper` (모듈 간 공통 사용)
- `src/components/{module}/` — 각 라우트별 기능 전용 컴포넌트

### 주요 타입

`src/types/`에 정의되어 있습니다:
- `Project` — 7단계 프로세스: 의뢰접수 → 개발 → 피드백 → 디자인 → 인증 → 생산 → 품질관리
- `ProductionRecord` — 8단계 배치 상태: 계획 → 원료입고 → 배합 → 충전 → 포장 → 검사 → 출하 → 완료
- `Ingredient` — 국가별 `CountryRegulation` 포함: KR, CN, JP, EU, VN
- `RegulationStatus`: "허용" | "제한" | "금지" | "미등록" | "조건부허용"

### 스타일링

Tailwind CSS v4 (`@tailwindcss/postcss`) 사용. 테마는 `src/app/globals.css`에서 OKLCh 색공간 변수로 정의됩니다. 사이드바는 딥 블루 계열(`oklch(0.20 0.06 255)`)을 사용하며, CSS 변수를 통해 다크 모드를 지원합니다. 조건부 클래스 적용 시 `src/lib/utils.ts`의 `cn()` (clsx + tailwind-merge)을 사용하세요.

경로 별칭: `@/*` → `src/*`
