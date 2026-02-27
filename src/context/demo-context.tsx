"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { ingredients } from "@/data/ingredients";

export type DemoScenario = "search" | "report" | "ontology" | "all" | null;

interface DemoStepDef {
  target: string | null;
  description: string;
  duration: number;
  typeText?: string;
  navigate?: string;
  events?: string[];
}

const firstIngredient = ingredients[0];

// ────────────────────────────────────────────────────────────────────────────
// 시나리오 1: 규제 검색엔진
// ────────────────────────────────────────────────────────────────────────────
const SEARCH_STEPS: DemoStepDef[] = [
  {
    target: null,
    description: "규제 검색엔진 페이지로 이동합니다.",
    duration: 1200,
    navigate: "/regulations",
  },
  {
    target: "demo-search-input",
    description:
      "AI 규제 검색창입니다. 성분 INCI명, 한글명, 또는 방부제·자외선차단 같은 카테고리 키워드를 입력하면 5개국(KR·CN·JP·EU·아세안) 규제 데이터베이스를 실시간 조회합니다.",
    duration: 3500,
  },
  {
    target: "demo-search-input",
    description:
      "「레티놀(Retinol)」을 검색해보겠습니다. 레티놀은 주름 개선 대표 성분이지만 국가마다 규제가 크게 달라 수출 시 반드시 확인이 필요한 원료입니다.",
    duration: 2200,
    typeText: "레티놀.",
  },
  {
    target: null,
    description: "AI가 규제 데이터베이스를 검색하고 있습니다.",
    duration: 1200,
  },
  {
    target: null,
    description:
      "AI가 한국·중국·일본·EU·아세안 5개국의 규제 DB를 동시에 조회 중입니다. 허용 상태, 최대 농도 제한, 특수 조건을 파악합니다...",
    duration: 3000,
  },
  {
    target: "demo-results-area",
    description:
      "검색 결과가 표시됩니다. 상단 AI 요약 카드에는 주요 규제 포인트가 자연어로 정리되고, 아래에는 국가별 상세 카드(허용 상태, 최대 농도, 비고)가 나열됩니다.",
    duration: 4000,
  },
  {
    target: "demo-filter-KR",
    description:
      "국가 필터를 사용하면 원하는 국가 규제만 볼 수 있습니다. 한국(KR) 필터를 클릭해 국내 규제 기준만 표시합니다. 레티놀은 한국에서 기능성화장품 심사 대상입니다.",
    duration: 3500,
    events: ["filter:KR"],
  },
  {
    target: "demo-filter-EU",
    description:
      "EU 필터를 추가합니다. 다중 국가 동시 비교가 가능합니다. EU는 2025년부터 레티놀 사용 농도를 더욱 강화할 예정으로, 수출 전략 수립에 반드시 반영해야 합니다.",
    duration: 3500,
    events: ["filter:EU"],
  },
  {
    target: "demo-upload-zone",
    description:
      "하단의 「일괄 분석」 기능입니다. 성분 분석서나 RFP Excel 파일을 업로드하면 파일 안의 모든 성분을 한 번에 규제 조회합니다. 수십 개의 성분도 수 초 만에 분석 가능합니다.",
    duration: 4000,
  },
  {
    target: "demo-excel-modal",
    description:
      "업로드 파일의 형식입니다. 성분명(한글), INCI명, CAS번호, 함량(%) 열로 구성합니다. INCI명 또는 CAS번호 중 하나만 있어도 자동 매칭되며, 함량이 있으면 규제 한도 초과 여부까지 자동 검사합니다.",
    duration: 5500,
    events: ["show-excel-modal"],
  },
  {
    target: "demo-upload-zone",
    description:
      "「성분분석서_2026Q1.xlsx」 파일이 업로드되었습니다. 6개 성분이 감지되었습니다.",
    duration: 2500,
    events: ["hide-excel-modal", "simulate-file"],
  },
  {
    target: "demo-analyze-button",
    description:
      "「분석 시작」 버튼을 클릭합니다. AI가 업로드된 모든 성분을 5개국 규제 DB와 매칭하여 일괄 적합성 검토를 실행합니다.",
    duration: 4000,
    events: ["trigger-analyze"],
  },
  {
    target: "demo-bulk-results",
    description:
      "✓ 분석 완료 — 6개 성분의 규제 현황이 모두 검토되었습니다. 허용·제한·금지 상태와 조건이 한눈에 표시됩니다. 결과는 Excel로 내보낼 수 있습니다.",
    duration: 4000,
  },
];

// ────────────────────────────────────────────────────────────────────────────
// 시나리오 2: 보고서 자동 생성
// ────────────────────────────────────────────────────────────────────────────
const REPORT_STEPS: DemoStepDef[] = [
  {
    target: null,
    description: "성분 관리 페이지로 이동합니다.",
    duration: 1200,
    navigate: "/ingredients",
  },
  {
    target: "demo-ingredient-row-0",
    description:
      "성분 데이터베이스에서 원하는 성분을 클릭합니다. 한글명, 영문명, INCI, CAS번호, 카테고리로 검색할 수 있습니다. 「" +
      firstIngredient.nameKo +
      "」을 선택합니다.",
    duration: 3500,
  },
  {
    target: null,
    description: "성분 상세 페이지로 이동합니다.",
    duration: 1500,
    navigate: `/ingredients/${firstIngredient.id}`,
  },
  {
    target: "demo-reg-matrix",
    description: "5개국 규제 현황 매트릭스입니다. 허용·제한·금지·조건부허용 상태를 한눈에 확인할 수 있습니다.",
    duration: 3500,
  },
  {
    target: "demo-ingredient-graph",
    description: "성분과 각국 규제의 관계를 온톨로지 그래프로 시각화했습니다. 엣지 색상이 규제 상태를 나타냅니다.",
    duration: 3500,
  },
  {
    target: "demo-report-btn",
    description:
      "「규제 보고서 생성」 버튼입니다. 클릭하면 이 성분의 규제 적합성 보고서를 국가별로 자동 생성합니다. 내부 보고나 수출 심사 자료로 활용할 수 있습니다.",
    duration: 3000,
    events: ["open-report-dialog"],
  },
  {
    target: null,
    description: "보고서 생성 설정 다이얼로그가 열렸습니다. 포함할 국가를 선택합니다.",
    duration: 1500,
  },
  {
    target: "demo-report-check-KR",
    description:
      "수출 대상국을 순서대로 선택합니다 — 한국, 중국, EU 순으로 체크합니다. 각 국가 규제기관(식약처, NMPA, EU CPNP) 기준이 보고서에 포함됩니다.",
    duration: 4000,
    events: ["check-countries"],
  },
  {
    target: "demo-report-generate",
    description:
      "「보고서 생성」 버튼을 클릭합니다. AI가 선택된 3개국의 규제 현황을 정리하여 표준 형식의 적합성 보고서를 작성합니다.",
    duration: 1500,
    events: ["do-generate"],
  },
  {
    target: null,
    description:
      "보고서가 생성되고 있습니다. 성분 기본 정보, 국가별 규제 현황 표, 종합 의견, 참고 규정 4개 섹션으로 구성된 보고서 페이지로 이동합니다.",
    duration: 3000,
  },
  {
    target: "demo-editor-panel",
    description:
      "보고서 페이지입니다. 좌측(70%)은 인쇄 가능한 보고서 미리보기, 우측(30%)은 편집 패널입니다. 실제 문서처럼 구성되어 있어 바로 공유하거나 출력할 수 있습니다.",
    duration: 4000,
  },
  {
    target: "demo-opinion-section",
    description:
      "「종합 의견」 섹션입니다. contentEditable 방식으로 섹션을 클릭하면 직접 타이핑하여 수정할 수 있습니다. 라이브러리 없이도 실시간 인라인 편집이 가능합니다.",
    duration: 3500,
  },
  {
    target: "demo-opinion-section",
    description: "의견을 직접 타이핑해보겠습니다...",
    duration: 5000,
    events: ["type-opinion"],
  },
  {
    target: "demo-share-btn",
    description:
      "「링크 공유」 버튼입니다. 클릭하면 현재 보고서 URL이 클립보드에 복사됩니다. 팀원이나 고객사에게 즉시 공유할 수 있으며 별도 로그인 없이 열람 가능합니다.",
    duration: 3500,
    events: ["do-share"],
  },
  {
    target: "demo-download-btn",
    description:
      "「다운로드」 버튼입니다. 브라우저 인쇄 기능을 활용해 PDF로 저장합니다. 헤더/푸터를 포함한 공식 문서 형태로 출력됩니다.",
    duration: 3500,
  },
  {
    target: null,
    description:
      "✓ 완료 — 성분 선택 → 보고서 생성 → 인라인 편집 → 링크 공유까지 전 과정이 COSFLOW 안에서 완결됩니다.",
    duration: 2500,
  },
];

// ────────────────────────────────────────────────────────────────────────────
// 시나리오 3: 온톨로지 뷰어
// ────────────────────────────────────────────────────────────────────────────
const ONTOLOGY_STEPS: DemoStepDef[] = [
  {
    target: null,
    description: "COSFLOW 도메인 온톨로지 뷰어로 이동합니다.",
    duration: 1200,
    navigate: "/ontology",
  },
  // ── 카드 1: 전체 구조 설명 ──────────────────────────────────────────────────
  {
    target: "demo-ontology-graph",
    description:
      "COSFLOW의 4-Layer 도메인 온톨로지입니다. L1 Data Integration(식약처·NMPA·MHLW·CPNP·아세안 ACD 크롤링) → L2 Business Ontology(성분·규제정보·인증 모델링) → L3 AI Agent Actions(RAG 기반 자동화) → L4 Applications(웹 대시보드·워크플로우) 구조로 화장품 OEM/ODM 업무 전 영역을 커버합니다.",
    duration: 7000,
    events: ["select-node:ingredient"],
  },
  // ── 카드 2: 성분 → 규제정보 흐름 ───────────────────────────────────────────
  {
    target: "demo-ontology-panel",
    description:
      "성분(L2) 노드에는 INCI명·CAS번호·5개국(KR·CN·JP·EU·아세안) 규제 상태가 연결됩니다. MCP를 통해 21,480개 성분의 31,154개 규제 데이터 포인트가 실시간 수집되며, LangChain RAG + PostgreSQL + Pinecone 하이브리드 DB로 저장됩니다.",
    duration: 7000,
    events: ["select-node:regulation"],
  },
  // ── 카드 3: MCP 크롤링 시각화 ───────────────────────────────────────────────
  {
    target: "demo-ontology-panel",
    description:
      "5개 MCP 서버(식약처·NMPA·MHLW·EU CPNP·아세안 ACD)가 각국 규제기관 DB를 매일 자동 크롤링합니다. 수집된 데이터는 지식 그래프와 RDB에 구조화되어, 샘플 의뢰 접수부터 규제 검토까지 2~3시간 → 10분으로 단축됩니다.",
    duration: 7000,
  },
  {
    target: null,
    description:
      "✓ 완료 — COSFLOW 4-Layer 온톨로지로 의뢰→규제검토→인증→생산 전 과정이 하나의 데이터 모델로 연결됩니다.",
    duration: 3000,
  },
];

// ────────────────────────────────────────────────────────────────────────────
// 전체 시나리오 (모두 재생)
// ────────────────────────────────────────────────────────────────────────────
const ALL_STEPS: DemoStepDef[] = [
  ...SEARCH_STEPS,
  {
    target: null,
    description: "다음은 「보고서 자동 생성」입니다. 잠시 후 시작됩니다.",
    duration: 2500,
  },
  ...REPORT_STEPS,
  {
    target: null,
    description: "다음은 「도메인 온톨로지 투어」입니다. 잠시 후 시작됩니다.",
    duration: 2500,
  },
  ...ONTOLOGY_STEPS,
];

// ────────────────────────────────────────────────────────────────────────────
// Context
// ────────────────────────────────────────────────────────────────────────────
interface DemoContextValue {
  showWelcome: boolean;
  isPlaying: boolean;
  scenario: DemoScenario;
  step: number;
  totalSteps: number;
  activeTarget: string | null;
  stepDescription: string;
  typewriterText: string;
  openWelcome: () => void;
  closeWelcome: () => void;
  startScenario: (s: "search" | "report" | "ontology" | "all") => void;
  stopScenario: () => void;
}

const DemoContext = createContext<DemoContextValue | null>(null);

export function useDemoContext() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemoContext must be inside DemoProvider");
  return ctx;
}

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scenario, setScenario] = useState<DemoScenario>(null);
  const [step, setStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [activeTarget, setActiveTarget] = useState<string | null>(null);
  const [stepDescription, setStepDescription] = useState("");
  const [typewriterText, setTypewriterText] = useState("");
  const stopRef = useRef(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const safeSleep = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      if (stopRef.current) { resolve(); return; }
      const t = setTimeout(resolve, ms);
      timeoutsRef.current.push(t);
    });
  }, []);

  const dispatch = useCallback((event: string, detail?: unknown) => {
    window.dispatchEvent(new CustomEvent(`demo:${event}`, { detail }));
  }, []);

  const runSteps = useCallback(
    async (steps: DemoStepDef[]) => {
      setTotalSteps(steps.length);

      for (let i = 0; i < steps.length; i++) {
        if (stopRef.current) return;
        const s = steps[i];
        setStep(i + 1);
        setActiveTarget(s.target ?? null);
        setStepDescription(s.description);

        if (s.navigate) {
          router.push(s.navigate);
          await safeSleep(1000);
        }
        if (stopRef.current) return;

        if (s.typeText) {
          // Strip trailing "." from display but use it as auto-submit signal
          const displayText = s.typeText.endsWith(".")
            ? s.typeText.slice(0, -1)
            : s.typeText;
          const autoSubmit = s.typeText.endsWith(".");

          for (let j = 0; j <= displayText.length; j++) {
            if (stopRef.current) return;
            setTypewriterText(displayText.slice(0, j));
            await safeSleep(150);
          }

          if (autoSubmit) {
            await safeSleep(400);
            dispatch("search");
            await safeSleep(200);
          }
        }
        if (stopRef.current) return;

        if (s.events) {
          for (const ev of s.events) {
            if (stopRef.current) return;
            dispatch(ev);
            await safeSleep(350);
          }
        }
        if (stopRef.current) return;

        await safeSleep(s.duration);
      }

      if (!stopRef.current) {
        setIsPlaying(false);
        setScenario(null);
        setStep(0);
        setActiveTarget(null);
        setStepDescription("");
        setTypewriterText("");
      }
    },
    [router, safeSleep, dispatch]
  );

  const stopScenario = useCallback(() => {
    stopRef.current = true;
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setIsPlaying(false);
    setScenario(null);
    setStep(0);
    setActiveTarget(null);
    setStepDescription("");
    setTypewriterText("");
  }, []);

  const startScenario = useCallback(
    (sc: "search" | "report" | "ontology" | "all") => {
      stopRef.current = false;
      timeoutsRef.current = [];
      setIsPlaying(true);
      setScenario(sc);
      setShowWelcome(false);
      setStep(0);
      setTypewriterText("");
      setActiveTarget(null);
      setStepDescription("");
      const steps =
        sc === "search"
          ? SEARCH_STEPS
          : sc === "report"
          ? REPORT_STEPS
          : sc === "ontology"
          ? ONTOLOGY_STEPS
          : ALL_STEPS;
      runSteps(steps);
    },
    [runSteps]
  );

  const openWelcome = useCallback(() => setShowWelcome(true), []);
  const closeWelcome = useCallback(() => setShowWelcome(false), []);

  return (
    <DemoContext.Provider
      value={{
        showWelcome,
        isPlaying,
        scenario,
        step,
        totalSteps,
        activeTarget,
        stepDescription,
        typewriterText,
        openWelcome,
        closeWelcome,
        startScenario,
        stopScenario,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
