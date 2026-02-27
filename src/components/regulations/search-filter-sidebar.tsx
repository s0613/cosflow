"use client";

import type { Country } from "@/types/ingredient";
import { cn } from "@/lib/utils";

const countries: { code: Country; label: string; flag: string }[] = [
  { code: "KR", label: "한국", flag: "🇰🇷" },
  { code: "CN", label: "중국", flag: "🇨🇳" },
  { code: "JP", label: "일본", flag: "🇯🇵" },
  { code: "EU", label: "EU", flag: "🇪🇺" },
  { code: "VN", label: "아세안", flag: "🌏" },
];

const statuses = ["허용", "제한", "금지", "조건부허용", "미등록"];

interface SearchFilterSidebarProps {
  countryFilters: Country[];
  onToggleCountry: (c: Country) => void;
}

export function SearchFilterSidebar({ countryFilters, onToggleCountry }: SearchFilterSidebarProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          국가 필터
        </h3>
        <div className="space-y-1.5">
          {countries.map((c) => {
            const active = countryFilters.includes(c.code);
            return (
              <button
                key={c.code}
                id={`demo-filter-${c.code}`}
                onClick={() => onToggleCountry(c.code)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all",
                  active
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "hover:bg-muted text-foreground border border-transparent"
                )}
              >
                <span>{c.flag}</span>
                <span className="flex-1 text-left">{c.label}</span>
                <span className="font-mono text-xs text-muted-foreground">{c.code}</span>
                {active && (
                  <div className="size-2 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          규제 상태
        </h3>
        <div className="space-y-1.5">
          {statuses.map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground text-muted-foreground">
              <input type="checkbox" className="rounded" />
              {s}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
