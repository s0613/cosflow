"use client";

import { use, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Link2, Download, CheckCircle2 } from "lucide-react";
import { ingredients } from "@/data/ingredients";
import { IngredientReportContent } from "@/components/reports/ingredient-report-content";
import { ReportEditorPanel } from "@/components/reports/report-editor-panel";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ ingredientId: string }>;
}

export default function IngredientReportPage({ params }: Props) {
  const { ingredientId } = use(params);
  const searchParams = useSearchParams();
  const countries = (searchParams.get("countries") ?? "").split(",").filter(Boolean);

  const ingredient = ingredients.find((i) => i.id === ingredientId);
  const [copied, setCopied] = useState(false);

  // Demo: listen for share event
  useEffect(() => {
    const shareHandler = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
    window.addEventListener("demo:do-share", shareHandler);
    return () => window.removeEventListener("demo:do-share", shareHandler);
  }, []);

  if (!ingredient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">성분을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border px-6 py-3 flex items-center justify-between bg-card print:hidden">
        <Link
          href={`/ingredients/${ingredientId}`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          성분 상세
        </Link>
        <h1 className="text-sm font-semibold">{ingredient.nameKo} 규제 보고서</h1>
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
          <div className="max-w-3xl mx-auto">
            <IngredientReportContent
              ingredient={ingredient}
              selectedCountries={countries}
              opinionSectionId="demo-opinion-section"
            />
          </div>
        </div>
        <div className="w-64 flex-shrink-0 print:hidden">
          <ReportEditorPanel panelId="demo-editor-panel-toolbar" />
        </div>
      </div>
    </div>
  );
}
