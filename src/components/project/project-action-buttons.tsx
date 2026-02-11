"use client";

import { Download, CheckCircle, History } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectActionButtons() {
  function handleCheckout() {
    console.log("[COSFLOW] 체크아웃 실행");
  }

  function handleApprovalRequest() {
    console.log("[COSFLOW] 승인요청 전송");
  }

  function handleChangeHistory() {
    console.log("[COSFLOW] 변경이력 조회");
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="default" size="sm" onClick={handleCheckout}>
        <Download className="size-4" />
        체크아웃
      </Button>
      <Button variant="outline" size="sm" onClick={handleApprovalRequest}>
        <CheckCircle className="size-4" />
        승인요청
      </Button>
      <Button variant="outline" size="sm" onClick={handleChangeHistory}>
        <History className="size-4" />
        변경이력
      </Button>
    </div>
  );
}
