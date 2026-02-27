"use client";

import { useEffect, useRef } from "react";
import type { Ingredient } from "@/types/ingredient";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  허용: "text-green-700 bg-green-50",
  제한: "text-amber-700 bg-amber-50",
  금지: "text-red-700 bg-red-50",
  조건부허용: "text-blue-700 bg-blue-50",
  미등록: "text-gray-600 bg-gray-50",
};

const countryNames: Record<string, string> = {
  KR: "대한민국",
  CN: "중국",
  JP: "일본",
  EU: "유럽연합",
  VN: "아세안",
};

interface IngredientReportContentProps {
  ingredient: Ingredient;
  selectedCountries: string[];
  opinionSectionId?: string;
}

export function IngredientReportContent({
  ingredient,
  selectedCountries,
  opinionSectionId,
}: IngredientReportContentProps) {
  const opinionRef = useRef<HTMLDivElement>(null);

  const filteredRegs = ingredient.regulations.filter((r) =>
    selectedCountries.length === 0 || selectedCountries.includes(r.country)
  );

  // Listen for demo type event
  useEffect(() => {
    const OPINION_TEXT =
      "본 성분은 국내 및 EU 시장에서 안전하게 사용 가능하며, 중국 NMPA 기준으로는 사전 신고가 필요합니다. 권장 농도 범위를 준수하고, 제품 라벨에 사용 조건을 명시할 것을 권장드립니다.";
    const handler = () => {
      if (!opinionRef.current) return;
      opinionRef.current.textContent = "";
      opinionRef.current.focus();
      let i = 0;
      const interval = setInterval(() => {
        if (!opinionRef.current) { clearInterval(interval); return; }
        opinionRef.current.textContent = OPINION_TEXT.slice(0, i + 1);
        i++;
        if (i >= OPINION_TEXT.length) clearInterval(interval);
      }, 80);
    };
    window.addEventListener("demo:type-opinion", handler);
    return () => window.removeEventListener("demo:type-opinion", handler);
  }, []);

  return (
    <div className="prose prose-sm max-w-none space-y-6 text-sm">
      {/* Header */}
      <div className="border-b border-border pb-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-1">
              COSFLOW 규제 적합성 보고서
            </div>
            <h1 className="text-xl font-bold text-foreground m-0">
              {ingredient.nameKo} 규제 현황
            </h1>
            <p className="text-muted-foreground text-sm m-0">{ingredient.nameEn} · {ingredient.inci}</p>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            <p>발행일: 2026-02-24</p>
            <p>담당: 박상현 대표이사</p>
          </div>
        </div>
      </div>

      {/* 1. 성분 기본 정보 */}
      <section>
        <h2 className="text-base font-semibold mb-3 text-foreground">1. 성분 기본 정보</h2>
        <div
          contentEditable
          suppressContentEditableWarning
          className="rounded-lg border border-border p-4 bg-muted/20 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
        >
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 not-prose">
            {[
              ["성분명 (한글)", ingredient.nameKo],
              ["성분명 (영문)", ingredient.nameEn],
              ["INCI 명칭", ingredient.inci],
              ["CAS 번호", ingredient.casNumber],
              ["카테고리", ingredient.category],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs text-muted-foreground">{k}</dt>
                <dd className="text-sm font-medium mt-0.5">{v}</dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 국가별 규제 현황 */}
      <section>
        <h2 className="text-base font-semibold mb-3 text-foreground">2. 국가별 규제 현황</h2>
        <table className="w-full border-collapse not-prose text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border px-3 py-2 text-left text-xs font-medium text-muted-foreground">국가</th>
              <th className="border border-border px-3 py-2 text-left text-xs font-medium text-muted-foreground">규제 상태</th>
              <th className="border border-border px-3 py-2 text-left text-xs font-medium text-muted-foreground">최대 농도</th>
              <th className="border border-border px-3 py-2 text-left text-xs font-medium text-muted-foreground">비고</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegs.map((reg) => (
              <tr key={reg.country} className="border-b border-border hover:bg-muted/20">
                <td className="border border-border px-3 py-2">
                  {countryNames[reg.country] ?? reg.country}
                </td>
                <td className="border border-border px-3 py-2">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium", statusColors[reg.status])}>
                    {reg.status}
                  </span>
                </td>
                <td className="border border-border px-3 py-2 text-muted-foreground">
                  {reg.maxConcentration ?? "—"}
                </td>
                <td className="border border-border px-3 py-2 text-muted-foreground text-xs">
                  {reg.notes ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 3. 종합 의견 */}
      <section>
        <h2 className="text-base font-semibold mb-3 text-foreground">3. 종합 의견</h2>
        <div
          id={opinionSectionId}
          ref={opinionRef}
          contentEditable
          suppressContentEditableWarning
          className="rounded-lg border border-border p-4 min-h-[80px] outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-muted-foreground"
          data-placeholder="클릭하여 종합 의견을 입력하세요..."
        >
          {ingredient.description}
        </div>
      </section>

      {/* 4. 참고 규정 */}
      <section>
        <h2 className="text-base font-semibold mb-3 text-foreground">4. 참고 규정</h2>
        <div
          contentEditable
          suppressContentEditableWarning
          className="rounded-lg border border-border p-4 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all"
        >
          <ul className="space-y-1 text-sm text-muted-foreground not-prose list-disc pl-4">
            <li>대한민국 화장품법 시행규칙 별표 3 (사용 제한 원료)</li>
            <li>EU Regulation (EC) No 1223/2009 on cosmetic products</li>
            <li>중국 화장품 감독관리 조례 (2021)</li>
            <li>일본 의약품, 의료기기 등의 품질, 유효성 및 안전성 확보 등에 관한 법률</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
