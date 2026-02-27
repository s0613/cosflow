"use client";

import { Bold, Italic, Underline, Heading1, Heading2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormatButtonProps {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}

function FormatButton({ onClick, title, children }: FormatButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="p-1.5 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
    >
      {children}
    </button>
  );
}

interface ReportEditorPanelProps {
  panelId?: string;
}

export function ReportEditorPanel({ panelId }: ReportEditorPanelProps) {
  const execCmd = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
  };

  return (
    <div id={panelId} className="h-full flex flex-col border-l border-border">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-3 border-b border-border bg-muted/30">
        <FormatButton onClick={() => execCmd("bold")} title="굵게">
          <Bold className="size-4" />
        </FormatButton>
        <FormatButton onClick={() => execCmd("italic")} title="기울임">
          <Italic className="size-4" />
        </FormatButton>
        <FormatButton onClick={() => execCmd("underline")} title="밑줄">
          <Underline className="size-4" />
        </FormatButton>
        <div className="w-px h-4 bg-border mx-1" />
        <FormatButton onClick={() => execCmd("formatBlock", "h1")} title="제목 1">
          <Heading1 className="size-4" />
        </FormatButton>
        <FormatButton onClick={() => execCmd("formatBlock", "h2")} title="제목 2">
          <Heading2 className="size-4" />
        </FormatButton>
        <FormatButton onClick={() => execCmd("formatBlock", "p")} title="본문">
          <span className="text-xs font-medium">P</span>
        </FormatButton>
      </div>

      {/* Instructions */}
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs text-muted-foreground leading-relaxed">
          보고서의 섹션을 클릭하면 직접 편집할 수 있습니다.
          위 서식 도구를 사용하여 텍스트를 꾸밀 수 있습니다.
        </p>
        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
          <p className="font-medium text-foreground">편집 가능한 섹션</p>
          <ul className="space-y-1 pl-3">
            <li>• 성분 기본 정보</li>
            <li>• 종합 의견</li>
            <li>• 참고 규정</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
