"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Paperclip, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { requests } from "@/data/requests";
import type { RequestStatus } from "@/types/request";
import type { Country } from "@/types/ingredient";
import { cn } from "@/lib/utils";

const countryLabels: Record<Country, string> = {
  KR: "한국",
  CN: "중국",
  JP: "일본",
  EU: "유럽연합",
  VN: "베트남",
};

const requestStages: RequestStatus[] = [
  "접수대기",
  "접수완료",
  "검토중",
  "개발진행",
  "샘플제작",
  "완료",
];

interface RequestDetailPageProps {
  params: Promise<{ requestId: string }>;
}

export default function RequestDetailPage({ params }: RequestDetailPageProps) {
  const { requestId } = use(params);
  const request = requests.find((r) => r.id === requestId);

  if (!request) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">의뢰를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const currentStageIndex = request.status === "반려"
    ? -1
    : requestStages.indexOf(request.status);

  return (
    <div className="space-y-6">
      <Link
        href="/requests"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        의뢰 목록
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {request.projectName}
          </h1>
          <p className="text-muted-foreground mt-1">{request.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={request.priority} />
          <StatusBadge status={request.status} />
        </div>
      </div>

      {request.status !== "반려" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">진행 상태</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start">
              {requestStages.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isActive = index === currentStageIndex;
                const isLast = index === requestStages.length - 1;

                return (
                  <div
                    key={stage}
                    className={cn("flex flex-col items-center", !isLast && "flex-1")}
                  >
                    <div className="flex items-center w-full">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "flex size-8 items-center justify-center rounded-full border-2 text-xs shrink-0 transition-colors",
                            isCompleted
                              ? "bg-green-500 text-white border-green-500"
                              : isActive
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-background text-muted-foreground border-muted-foreground/30"
                          )}
                        >
                          {isCompleted ? (
                            <Check className="size-4" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                      </div>
                      {!isLast && (
                        <div
                          className={cn(
                            "h-0.5 flex-1 mx-1",
                            isCompleted ? "bg-green-500" : "bg-muted-foreground/20"
                          )}
                        />
                      )}
                    </div>
                    <span
                      className={cn(
                        "mt-2 text-xs text-center whitespace-nowrap",
                        isCompleted
                          ? "text-green-700 font-medium"
                          : isActive
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                      )}
                    >
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">의뢰 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-xs text-muted-foreground">의뢰 ID</p>
              <p className="text-sm font-medium mt-0.5">{request.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">의뢰사</p>
              <p className="text-sm font-medium mt-0.5">{request.client}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">제품유형</p>
              <p className="text-sm font-medium mt-0.5">{request.productType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">담당자</p>
              <p className="text-sm font-medium mt-0.5">{request.assignee}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">의뢰일</p>
              <p className="text-sm font-medium mt-0.5">{request.requestDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">대상 시장</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                {request.targetMarket.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium"
                  >
                    {m} {countryLabels[m]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">설명</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {request.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">첨부 파일</CardTitle>
        </CardHeader>
        <CardContent>
          {request.attachments > 0 ? (
            <div className="space-y-2">
              {Array.from({ length: request.attachments }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-md border bg-muted/50"
                >
                  <Paperclip className="size-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {request.projectName}_첨부{i + 1}.pdf
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(Math.random() * 5 + 0.5).toFixed(1)} MB
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              첨부 파일이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
