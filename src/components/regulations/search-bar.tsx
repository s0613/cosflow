"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSearch: (q: string) => void;
  onReset?: () => void;
  compact?: boolean;
  inputId?: string;
  buttonId?: string;
}

const suggestions = ["히알루론산", "레티놀", "나이아신아마이드", "파라벤", "자외선차단", "글리세린"];

export function SearchBar({
  value,
  onChange,
  onSearch,
  onReset,
  compact = false,
  inputId,
  buttonId,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSearch(value);
  };

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "flex items-center gap-2 border border-border rounded-xl bg-background shadow-sm transition-all",
          compact ? "px-3 py-2" : "px-4 py-3"
        )}
      >
        <Search className={cn("text-muted-foreground flex-shrink-0", compact ? "size-4" : "size-5")} />
        <input
          id={inputId}
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="성분명, INCI, 키워드 입력..."
          className={cn(
            "flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
            compact ? "text-sm" : "text-base"
          )}
        />
        {value && (
          <button
            onClick={() => { onChange(""); onReset?.(); }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        )}
        <button
          id={buttonId}
          onClick={() => onSearch(value)}
          className={cn(
            "bg-primary text-primary-foreground rounded-lg font-medium transition-colors hover:bg-primary/90 flex-shrink-0",
            compact ? "px-3 py-1.5 text-xs" : "px-5 py-2 text-sm"
          )}
        >
          검색
        </button>
      </div>

      {!compact && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => { onChange(s); onSearch(s); }}
              className="px-3 py-1 text-xs rounded-full border border-border bg-muted/50 hover:bg-accent hover:border-primary/50 transition-colors text-muted-foreground hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
