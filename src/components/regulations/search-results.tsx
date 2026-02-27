"use client";

import type { SearchResult } from "@/hooks/use-search";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  허용: "bg-green-100 text-green-700 border-green-200",
  제한: "bg-amber-100 text-amber-700 border-amber-200",
  금지: "bg-red-100 text-red-700 border-red-200",
  조건부허용: "bg-blue-100 text-blue-700 border-blue-200",
  미등록: "bg-gray-100 text-gray-600 border-gray-200",
};

const countryFlags: Record<string, string> = {
  KR: "🇰🇷",
  CN: "🇨🇳",
  JP: "🇯🇵",
  EU: "🇪🇺",
  VN: "🌏",
};

interface SearchResultsProps {
  results: SearchResult[];
  totalCount: number;
  containerId?: string;
}

export function SearchResults({ results, totalCount, containerId }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-sm">현재 필터 조건에 맞는 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div id={containerId} className="space-y-3">
      <p className="text-xs text-muted-foreground">
        총 {totalCount}건 중 {results.length}건 표시
      </p>
      {results.map((r, i) => (
        <div
          key={i}
          className="border border-border rounded-xl p-4 bg-card hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-sm">{r.ingredientName}</span>
                <span className="text-xs text-muted-foreground font-mono">{r.inci}</span>
              </div>
              {r.maxConcentration && (
                <p className="text-xs text-muted-foreground mt-1">
                  최대 농도: <span className="font-medium text-foreground">{r.maxConcentration}</span>
                </p>
              )}
              {r.notes && (
                <p className="text-xs text-muted-foreground mt-1">{r.notes}</p>
              )}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-base">{countryFlags[r.country]}</span>
              <span
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full border font-medium",
                  statusColors[r.status] ?? "bg-gray-100 text-gray-600"
                )}
              >
                {r.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
