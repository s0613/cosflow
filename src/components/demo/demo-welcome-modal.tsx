"use client";

import { Search, FileText, Network, Play, X, PlayCircle } from "lucide-react";
import { useDemoContext } from "@/context/demo-context";

const scenarios = [
  {
    id: "search" as const,
    icon: Search,
    iconBg: "bg-blue-600",
    cardBg: "bg-blue-50/50 border-blue-100 hover:border-blue-400 hover:bg-blue-50",
    labelColor: "text-blue-600",
    playBg: "bg-blue-600",
    label: "규제 검색",
    duration: "약 55초",
    title: "규제 검색엔진 자동 시연",
    desc: "AI 성분 검색 · 국가 필터링 · Excel 일괄 분석",
  },
  {
    id: "report" as const,
    icon: FileText,
    iconBg: "bg-purple-600",
    cardBg: "bg-purple-50/50 border-purple-100 hover:border-purple-400 hover:bg-purple-50",
    labelColor: "text-purple-600",
    playBg: "bg-purple-600",
    label: "보고서 생성",
    duration: "약 60초",
    title: "보고서 자동 생성 시연",
    desc: "성분 보고서 생성 · 인라인 편집 · 링크 공유 · 다운로드",
  },
  {
    id: "ontology" as const,
    icon: Network,
    iconBg: "bg-emerald-600",
    cardBg: "bg-emerald-50/50 border-emerald-100 hover:border-emerald-400 hover:bg-emerald-50",
    labelColor: "text-emerald-600",
    playBg: "bg-emerald-600",
    label: "온톨로지",
    duration: "약 65초",
    title: "도메인 온톨로지 투어",
    desc: "9개 엔티티 · 관계 그래프 · 노드별 상세 설명",
  },
];

export function DemoWelcomeModal() {
  const { showWelcome, closeWelcome, startScenario } = useDemoContext();

  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-slate-950/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-[520px] mx-4 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div
          className="relative px-8 py-7 text-white"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.16 0.08 255) 0%, oklch(0.30 0.16 255) 100%)",
          }}
        >
          <button
            onClick={closeWelcome}
            className="absolute top-4 right-4 text-white/50 hover:text-white/90 transition-colors"
          >
            <X className="size-4" />
          </button>

          <div className="flex items-end gap-3 mb-3">
            <div className="text-2xl font-bold tracking-tight">COSFLOW</div>
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-0.5 text-xs font-medium mb-0.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              라이브 데모
            </div>
          </div>
          <p className="text-white/70 text-sm leading-relaxed">
            화장품 규제 통합 관리 플랫폼의 핵심 기능을 직접 체험해보세요.
            <br />
            시나리오를 선택하면 처음부터 끝까지 자동으로 시연됩니다.
          </p>
        </div>

        {/* Scenarios */}
        <div className="p-6 space-y-2.5">
          {scenarios.map((s) => (
            <button
              key={s.id}
              onClick={() => startScenario(s.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left group ${s.cardBg}`}
            >
              <div
                className={`flex items-center justify-center size-12 rounded-xl ${s.iconBg} text-white flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}
              >
                <s.icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-bold uppercase tracking-wider ${s.labelColor}`}>
                    {s.label}
                  </span>
                  <span className="text-xs text-muted-foreground">· {s.duration}</span>
                </div>
                <div className="font-semibold text-sm text-foreground">{s.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
              </div>
              <div
                className={`flex items-center justify-center size-8 rounded-full ${s.playBg} text-white flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm`}
              >
                <Play className="size-3.5 ml-0.5" />
              </div>
            </button>
          ))}
        </div>

        {/* Play All button */}
        <div className="px-6 pb-3">
          <button
            onClick={() => startScenario("all")}
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-400 hover:bg-slate-50 transition-all group"
          >
            <PlayCircle className="size-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
              전체 시나리오 연속 재생
            </span>
            <span className="text-xs text-slate-400 group-hover:text-slate-500 transition-colors">
              약 3분
            </span>
          </button>
        </div>

        <div className="pb-5 px-6">
          <button
            onClick={closeWelcome}
            className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2"
          >
            건너뛰기 — 직접 탐색하기
          </button>
        </div>
      </div>
    </div>
  );
}
