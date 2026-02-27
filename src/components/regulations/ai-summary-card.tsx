"use client";

import { Sparkles } from "lucide-react";

interface AiSummaryCardProps {
  summary: string;
}

export function AiSummaryCard({ summary }: AiSummaryCardProps) {
  return (
    <div className="border border-primary/20 bg-primary/5 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2 text-primary">
        <Sparkles className="size-4" />
        <span className="text-sm font-semibold">AI 규제 요약</span>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">{summary}</p>
    </div>
  );
}
