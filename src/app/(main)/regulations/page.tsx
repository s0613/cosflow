"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { SearchBar } from "@/components/regulations/search-bar";
import { SearchFilterSidebar } from "@/components/regulations/search-filter-sidebar";
import { AiSummaryCard } from "@/components/regulations/ai-summary-card";
import { SearchResults } from "@/components/regulations/search-results";
import { FileUploadZone } from "@/components/regulations/file-upload-zone";
import { ExcelPreviewModal } from "@/components/regulations/excel-preview-modal";
import { useSearch } from "@/hooks/use-search";

export default function RegulationsPage() {
  const { query, setQuery, state, summary, results, allResults, countryFilters, toggleCountryFilter, search, reset } =
    useSearch();
  const [excelModalOpen, setExcelModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="규제 검색엔진"
        description="화장품 원료 성분의 국가별 규제 현황을 AI로 검색하세요"
      />

      <SearchBar
        value={query}
        onChange={setQuery}
        onSearch={search}
        onReset={reset}
        compact={state !== "idle"}
        inputId="demo-search-input"
        buttonId="demo-search-button"
      />

      {state === "loading" && (
        <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" />
          <span className="text-sm">AI 규제 데이터베이스 검색 중...</span>
        </div>
      )}

      {state === "results" && (
        <div className="flex gap-6">
          <div className="w-44 flex-shrink-0">
            <SearchFilterSidebar
              countryFilters={countryFilters}
              onToggleCountry={toggleCountryFilter}
            />
          </div>
          <div id="demo-results-area" className="flex-1 space-y-4 min-w-0">
            <AiSummaryCard summary={summary} />
            <SearchResults results={results} totalCount={allResults.length} />
          </div>
        </div>
      )}

      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-semibold">일괄 분석</h2>
          <button
            onClick={() => setExcelModalOpen(true)}
            className="text-xs text-primary hover:underline"
          >
            파일 형식 안내
          </button>
        </div>
        <p className="text-xs text-muted-foreground mb-4">
          성분분석서(Excel)를 업로드하면 포함된 모든 성분의 규제 현황을 일괄 검토합니다
        </p>
        <FileUploadZone
          zoneId="demo-upload-zone"
          buttonId="demo-analyze-button"
          bulkResultsId="demo-bulk-results"
        />
      </div>

      <ExcelPreviewModal open={excelModalOpen} onClose={() => setExcelModalOpen(false)} />
    </div>
  );
}
