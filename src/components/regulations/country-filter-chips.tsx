"use client";

import { cn } from "@/lib/utils";
import { Country } from "@/types/ingredient";

const countries: { code: Country; label: string }[] = [
  { code: "KR", label: "KR 한국" },
  { code: "CN", label: "CN 중국" },
  { code: "JP", label: "JP 일본" },
  { code: "EU", label: "EU 유럽연합" },
  { code: "VN", label: "VN 아세안" },
];

interface CountryFilterChipsProps {
  activeFilters: Country[];
  onToggle: (country: Country) => void;
}

export function CountryFilterChips({
  activeFilters,
  onToggle,
}: CountryFilterChipsProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <span className="text-xs text-muted-foreground mr-1">국가 필터:</span>
      {countries.map((c) => {
        const isActive = activeFilters.includes(c.code);
        return (
          <button
            key={c.code}
            onClick={() => onToggle(c.code)}
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors border",
              isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground"
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
