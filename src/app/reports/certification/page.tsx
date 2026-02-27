"use client";

import Link from "next/link";
import { ArrowLeft, Link2, Download, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { certifications } from "@/data/certifications";
import { ReportEditorPanel } from "@/components/reports/report-editor-panel";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  승인: "bg-green-100 text-green-700",
  심사중: "bg-blue-100 text-blue-700",
  준비중: "bg-amber-100 text-amber-700",
  반려: "bg-red-100 text-red-700",
  만료: "bg-gray-100 text-gray-600",
};

const countryFlags: Record<string, string> = {
  KR: "🇰🇷",
  CN: "🇨🇳",
  JP: "🇯🇵",
  EU: "🇪🇺",
  VN: "🌏",
};

export default function CertificationReportPage() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  // Summary stats
  const total = certifications.length;
  const approved = certifications.filter((c) => c.status === "승인").length;
  const pending = certifications.filter((c) => c.status === "심사중").length;
  const preparing = certifications.filter((c) => c.status === "준비중").length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border px-6 py-3 flex items-center justify-between bg-card print:hidden">
        <Link
          href="/certifications"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          인증 관리
        </Link>
        <h1 className="text-sm font-semibold">인증 현황 보고서</h1>
        <div className="flex items-center gap-2">
          <button
            id="demo-share-btn"
            onClick={handleShare}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border transition-all",
              copied
                ? "bg-green-50 border-green-200 text-green-700"
                : "border-border hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {copied ? (
              <>
                <CheckCircle2 className="size-3.5" />
                복사됨
              </>
            ) : (
              <>
                <Link2 className="size-3.5" />
                링크 공유
              </>
            )}
          </button>
          <button
            id="demo-download-btn"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Download className="size-3.5" />
            다운로드
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden print:block">
        <div id="demo-editor-panel" className="flex-1 overflow-y-auto p-8 print:p-0">
          <div className="max-w-3xl mx-auto space-y-6 text-sm">
            {/* Header */}
            <div className="border-b border-border pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground font-medium tracking-wider uppercase mb-1">
                    COSFLOW 인증 현황 보고서
                  </div>
                  <h1 className="text-xl font-bold">글로벌 인증 현황 종합</h1>
                  <p className="text-muted-foreground text-sm">전체 {total}건 인증 데이터 기준</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>발행일: 2026-02-24</p>
                  <p>담당: 박상현 대표이사</p>
                </div>
              </div>
            </div>

            {/* Summary */}
            <section>
              <h2 className="text-base font-semibold mb-3">1. 인증 현황 요약</h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "전체", value: total, color: "bg-muted" },
                  { label: "승인", value: approved, color: "bg-green-50 text-green-700" },
                  { label: "심사중", value: pending, color: "bg-blue-50 text-blue-700" },
                  { label: "준비중", value: preparing, color: "bg-amber-50 text-amber-700" },
                ].map((s) => (
                  <div key={s.label} className={cn("rounded-lg p-3 text-center", s.color)}>
                    <div className="text-2xl font-bold">{s.value}</div>
                    <div className="text-xs mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Table */}
            <section>
              <h2 className="text-base font-semibold mb-3">2. 국가별 인증 현황 상세</h2>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    {["ID", "프로젝트", "국가", "인증유형", "상태", "제출일", "예정일"].map((h) => (
                      <th key={h} className="border border-border px-3 py-2 text-left text-xs font-medium text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {certifications.map((c) => (
                    <tr key={c.id} className="border-b border-border hover:bg-muted/20">
                      <td className="border border-border px-3 py-2 font-mono text-xs">{c.id}</td>
                      <td className="border border-border px-3 py-2 font-medium">{c.projectName}</td>
                      <td className="border border-border px-3 py-2">
                        <span>{countryFlags[c.country]} {c.country}</span>
                      </td>
                      <td className="border border-border px-3 py-2 text-xs text-muted-foreground">{c.certType}</td>
                      <td className="border border-border px-3 py-2">
                        <span className={cn("px-2 py-0.5 rounded text-xs font-medium", statusColors[c.status] ?? "bg-gray-100 text-gray-600")}>
                          {c.status}
                        </span>
                      </td>
                      <td className="border border-border px-3 py-2 text-xs text-muted-foreground">{c.submissionDate ?? "—"}</td>
                      <td className="border border-border px-3 py-2 text-xs text-muted-foreground">{c.expectedDate ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Opinion */}
            <section>
              <h2 className="text-base font-semibold mb-3">3. 종합 의견</h2>
              <div
                id="demo-opinion-section"
                contentEditable
                suppressContentEditableWarning
                className="rounded-lg border border-border p-4 min-h-[80px] outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 transition-all text-muted-foreground"
              >
                전체 인증 {total}건 중 {approved}건이 승인 완료되었으며, {pending}건이 심사 진행 중입니다.
                주요 수출 대상국인 중국(NMPA) 비안 절차와 EU 규정 준수를 위한 지속적인 모니터링이 필요합니다.
              </div>
            </section>
          </div>
        </div>

        {/* Editor panel */}
        <div className="w-64 flex-shrink-0 print:hidden">
          <ReportEditorPanel />
        </div>
      </div>
    </div>
  );
}
