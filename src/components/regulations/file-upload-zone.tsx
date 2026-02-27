"use client";

import { useRef, useState, useEffect } from "react";
import { Upload, FileSpreadsheet, X, Loader2, CheckCircle2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SearchResult } from "@/hooks/use-search";

const mockBulkResults: SearchResult[] = [
  { ingredientName: "레티놀", inci: "RETINOL", country: "KR", status: "제한", maxConcentration: "기능성 원료 2500IU/g", notes: "KFDA 기능성화장품 심사 필요" },
  { ingredientName: "나이아신아마이드", inci: "NIACINAMIDE", country: "CN", status: "허용", maxConcentration: "5%", notes: "미백 특수화장품 등록 시 별도 심사" },
  { ingredientName: "에탄올", inci: "ALCOHOL DENAT.", country: "EU", status: "허용", notes: "변성제 종류에 따라 표기 규정 상이" },
  { ingredientName: "글리세린", inci: "GLYCERIN", country: "KR", status: "허용", notes: "농도 제한 없음" },
  { ingredientName: "티타늄디옥사이드", inci: "TITANIUM DIOXIDE", country: "EU", status: "제한", maxConcentration: "25%", notes: "분무형 제품 사용 금지, 나노 표기 의무" },
  { ingredientName: "향료", inci: "PARFUM", country: "EU", status: "제한", notes: "26종 알레르기 향료 개별 표기 의무" },
];

interface FileUploadZoneProps {
  zoneId?: string;
  buttonId?: string;
  bulkResultsId?: string;
}

export function FileUploadZone({ zoneId, buttonId, bulkResultsId }: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<string | null>(null);
  const [analyzeState, setAnalyzeState] = useState<"idle" | "loading" | "done">("idle");

  const fileRef = useRef<string | null>(null);
  useEffect(() => { fileRef.current = file; }, [file]);

  useEffect(() => {
    const fileHandler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.name) setFile(detail.name);
    };
    const analyzeHandler = () => {
      if (fileRef.current) {
        setAnalyzeState("loading");
        setTimeout(() => setAnalyzeState("done"), 2500);
      }
    };
    window.addEventListener("demo-simulate-file", fileHandler);
    window.addEventListener("demo-trigger-analyze", analyzeHandler);
    return () => {
      window.removeEventListener("demo-simulate-file", fileHandler);
      window.removeEventListener("demo-trigger-analyze", analyzeHandler);
    };
  }, []);

  const handleFile = (files: FileList | null) => {
    if (files?.[0]) setFile(files[0].name);
  };

  const handleAnalyze = () => {
    if (!file) return;
    setAnalyzeState("loading");
    setTimeout(() => setAnalyzeState("done"), 2500);
  };

  return (
    <div id={zoneId} className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-xl p-6 text-center transition-all",
          file ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/30 hover:bg-muted/30"
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files); }}
      >
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileSpreadsheet className="size-6 text-primary" />
            <span className="text-sm font-medium">{file}</span>
            <button
              onClick={() => { setFile(null); setAnalyzeState("idle"); }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="size-8 text-muted-foreground mx-auto" />
            <div>
              <p className="text-sm font-medium">RFP 또는 성분 분석서(Excel) 업로드</p>
              <p className="text-xs text-muted-foreground">드래그 앤 드롭 또는 클릭하여 파일 선택</p>
            </div>
            <button
              onClick={() => inputRef.current?.click()}
              className="text-xs text-primary hover:underline"
            >
              파일 선택
            </button>
            <input
              ref={inputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              onChange={(e) => handleFile(e.target.files)}
            />
          </div>
        )}
      </div>

      {file && analyzeState === "idle" && (
        <button
          id={buttonId}
          onClick={handleAnalyze}
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          분석 시작
        </button>
      )}

      {analyzeState === "loading" && (
        <div className="flex items-center justify-center gap-2 py-4 text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          <span className="text-sm">성분 규제 분석 중...</span>
        </div>
      )}

      {analyzeState === "done" && (
        <div id={bulkResultsId} className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="size-4" />
              <span className="text-sm font-medium">분석 완료 — {mockBulkResults.length}개 성분 검토됨</span>
            </div>
            <button
              onClick={() => {
                // Simulate Excel download with a mock CSV blob
                const header = "성분명,INCI명,국가,규제상태,최대농도,비고\n";
                const rows = mockBulkResults
                  .map((r) =>
                    [r.ingredientName, r.inci, r.country, r.status, r.maxConcentration ?? "", r.notes].join(",")
                  )
                  .join("\n");
                const blob = new Blob(["\uFEFF" + header + rows], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "규제분석결과_2026Q1.csv";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
            >
              <Download className="size-3.5" />
              Excel 다운로드
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {mockBulkResults.map((r, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-lg bg-card text-sm">
                <span className="font-medium flex-1">{r.ingredientName}</span>
                <span className="text-xs text-muted-foreground">{r.country}</span>
                <span className={cn(
                  "px-2 py-0.5 text-xs rounded-full border",
                  r.status === "허용" ? "bg-green-100 text-green-700 border-green-200" :
                  r.status === "제한" ? "bg-amber-100 text-amber-700 border-amber-200" :
                  "bg-red-100 text-red-700 border-red-200"
                )}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
