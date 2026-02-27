"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Check, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import { certifications } from "@/data/certifications";
import type { CertStatus } from "@/types/certification";
import type { Country } from "@/types/ingredient";
import { cn } from "@/lib/utils";

const countryLabels: Record<Country, string> = {
  KR: "한국",
  CN: "중국",
  JP: "일본",
  EU: "유럽연합",
  VN: "아세안",
};

const certStages: CertStatus[] = [
  "준비중",
  "서류제출",
  "심사중",
  "보완요청",
  "승인",
];

interface CertDetailPageProps {
  params: Promise<{ certId: string }>;
}

export default function CertDetailPage({ params }: CertDetailPageProps) {
  const { certId } = use(params);
  const cert = certifications.find((c) => c.id === certId);

  if (!cert) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">인증 기록을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const currentStageIndex =
    cert.status === "반려" || cert.status === "만료임박"
      ? -1
      : certStages.indexOf(cert.status);

  return (
    <div className="space-y-6">
      <Link
        href="/certifications"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        인증 목록
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {cert.projectName}
          </h1>
          <p className="text-muted-foreground mt-1">
            {cert.id} &middot; {cert.certType}
          </p>
        </div>
        <StatusBadge status={cert.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">인증 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-xs text-muted-foreground">인증 ID</p>
              <p className="text-sm font-medium mt-0.5">{cert.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">프로젝트 ID</p>
              <p className="text-sm font-medium mt-0.5">{cert.projectId}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">프로젝트명</p>
              <p className="text-sm font-medium mt-0.5">{cert.projectName}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">국가</p>
              <p className="text-sm font-medium mt-0.5">
                {cert.country} {countryLabels[cert.country]}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">인증 유형</p>
              <p className="text-sm font-medium mt-0.5">{cert.certType}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">현재 상태</p>
              <div className="mt-0.5">
                <StatusBadge status={cert.status} />
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">제출일</p>
              <p className="text-sm font-medium mt-0.5">
                {cert.submissionDate || "-"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">예정일</p>
              <p className="text-sm font-medium mt-0.5">
                {cert.expectedDate || "-"}
              </p>
            </div>
            {cert.approvalDate && (
              <div>
                <p className="text-xs text-muted-foreground">승인일</p>
                <p className="text-sm font-medium mt-0.5">
                  {cert.approvalDate}
                </p>
              </div>
            )}
            {cert.notes && (
              <div className="md:col-span-2">
                <p className="text-xs text-muted-foreground">비고</p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                  {cert.notes}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">서류 체크리스트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {cert.documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-md border"
              >
                <div className="flex items-center gap-3">
                  <FileText className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{doc.name}</span>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {cert.status !== "반려" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">인증 진행 흐름</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start">
              {certStages.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isActive = index === currentStageIndex;
                const isLast = index === certStages.length - 1;

                return (
                  <div
                    key={stage}
                    className={cn(
                      "flex flex-col items-center",
                      !isLast && "flex-1"
                    )}
                  >
                    <div className="flex items-center w-full">
                      <div className="flex flex-col items-center">
                        <div
                          className={cn(
                            "flex size-8 items-center justify-center rounded-full border-2 text-xs shrink-0",
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
                            isCompleted
                              ? "bg-green-500"
                              : "bg-muted-foreground/20"
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
    </div>
  );
}
