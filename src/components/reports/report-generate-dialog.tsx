"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2, FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const countries = [
  { code: "KR", label: "한국 (KFDA)", flag: "🇰🇷" },
  { code: "CN", label: "중국 (NMPA)", flag: "🇨🇳" },
  { code: "JP", label: "일본 (PMDA)", flag: "🇯🇵" },
  { code: "EU", label: "EU (SCCS)", flag: "🇪🇺" },
  { code: "VN", label: "아세안", flag: "🌏" },
];

const DEMO_COUNTRIES = ["KR", "CN", "EU"];

interface ReportGenerateDialogProps {
  open: boolean;
  onClose: () => void;
  ingredientId: string;
  ingredientName: string;
}

export function ReportGenerateDialog({
  open,
  onClose,
  ingredientId,
  ingredientName,
}: ReportGenerateDialogProps) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const selectedRef = useRef(selected);
  useEffect(() => { selectedRef.current = selected; }, [selected]);

  const toggle = (code: string) => {
    setSelected((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleGenerate = useCallback(() => {
    const sel = selectedRef.current;
    if (sel.length === 0) return;
    setGenerating(true);
    setTimeout(() => {
      router.push(`/reports/ingredient/${ingredientId}?countries=${sel.join(",")}`);
    }, 1200);
  }, [ingredientId, router]);

  // Demo: auto-check countries sequentially, then generate
  useEffect(() => {
    const checkHandler = async () => {
      setSelected([]);
      for (let i = 0; i < DEMO_COUNTRIES.length; i++) {
        await new Promise((r) => setTimeout(r, 500 + i * 550));
        setSelected((prev) => [...prev, DEMO_COUNTRIES[i]]);
      }
    };
    const generateHandler = () => {
      setTimeout(() => handleGenerate(), 300);
    };

    window.addEventListener("demo:check-countries", checkHandler);
    window.addEventListener("demo:do-generate", generateHandler);
    return () => {
      window.removeEventListener("demo:check-countries", checkHandler);
      window.removeEventListener("demo:do-generate", generateHandler);
    };
  }, [handleGenerate]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            규제 보고서 생성
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{ingredientName}</span>의 국가별 규제 적합성 보고서를 생성합니다
          </p>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            포함할 국가 선택
          </p>
          {countries.map((c) => {
            const checked = selected.includes(c.code);
            return (
              <label
                key={c.code}
                id={`demo-report-check-${c.code}`}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                  checked ? "border-primary/40 bg-primary/5" : "border-border hover:bg-muted/50"
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(c.code)}
                  className="rounded"
                />
                <span>{c.flag}</span>
                <span className="text-sm">{c.label}</span>
              </label>
            );
          })}
        </div>

        <DialogFooter className="gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
          >
            취소
          </button>
          <button
            id="demo-report-generate"
            onClick={handleGenerate}
            disabled={selected.length === 0 || generating}
            className={cn(
              "px-4 py-2 text-sm rounded-lg font-medium flex items-center gap-2 transition-colors",
              selected.length > 0
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            {generating ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                생성 중...
              </>
            ) : (
              <>
                <FileText className="size-4" />
                보고서 생성
              </>
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
