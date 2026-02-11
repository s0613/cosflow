"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Check, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import { productionRecords } from "@/data/production";
import type { ProductionStatus } from "@/types/production";
import { cn } from "@/lib/utils";

const productionStages: ProductionStatus[] = [
  "계획",
  "원료입고",
  "배합",
  "충전",
  "포장",
  "검사",
  "출하",
  "완료",
];

interface ProductionDetailPageProps {
  params: Promise<{ productionId: string }>;
}

export default function ProductionDetailPage({
  params,
}: ProductionDetailPageProps) {
  const { productionId } = use(params);
  const record = productionRecords.find((r) => r.id === productionId);

  if (!record) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">
          생산 기록을 찾을 수 없습니다.
        </p>
      </div>
    );
  }

  const currentStageIndex = productionStages.indexOf(record.status);

  return (
    <div className="space-y-6">
      <Link
        href="/production"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        생산 목록
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {record.productName}
          </h1>
          <p className="text-muted-foreground mt-1">
            {record.batchNumber} &middot; {record.projectName}
          </p>
        </div>
        <StatusBadge status={record.status} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">생산 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-xs text-muted-foreground">생산 ID</p>
              <p className="text-sm font-medium mt-0.5">{record.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">프로젝트 ID</p>
              <p className="text-sm font-medium mt-0.5">{record.projectId}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">프로젝트명</p>
              <p className="text-sm font-medium mt-0.5">
                {record.projectName}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">제품명</p>
              <p className="text-sm font-medium mt-0.5">
                {record.productName}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">배치번호</p>
              <p className="text-sm font-mono font-medium mt-0.5">
                {record.batchNumber}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">수량</p>
              <p className="text-sm font-medium mt-0.5">
                {record.quantity.toLocaleString()} {record.unit}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">시작일</p>
              <p className="text-sm font-medium mt-0.5">{record.startDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">예정일</p>
              <p className="text-sm font-medium mt-0.5">
                {record.expectedDate}
              </p>
            </div>
            {record.completedDate && (
              <div>
                <p className="text-xs text-muted-foreground">완료일</p>
                <p className="text-sm font-medium mt-0.5">
                  {record.completedDate}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-muted-foreground">담당자</p>
              <p className="text-sm font-medium mt-0.5">{record.assignee}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">생산 단계</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start">
            {productionStages.map((stage, index) => {
              const isCompleted = index < currentStageIndex;
              const isActive = index === currentStageIndex;
              const isLast = index === productionStages.length - 1;

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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">품질 검사 결과</CardTitle>
        </CardHeader>
        <CardContent>
          {record.qualityChecks.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              등록된 품질 검사 항목이 없습니다.
            </p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>검사 항목</TableHead>
                    <TableHead>기준</TableHead>
                    <TableHead>결과</TableHead>
                    <TableHead className="text-center">합격</TableHead>
                    <TableHead>검사자</TableHead>
                    <TableHead>검사일</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {record.qualityChecks.map((qc) => (
                    <TableRow key={qc.id}>
                      <TableCell className="font-medium">{qc.item}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {qc.standard}
                      </TableCell>
                      <TableCell className="text-sm">{qc.result}</TableCell>
                      <TableCell className="text-center">
                        {qc.passed ? (
                          <CheckCircle2 className="size-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="size-5 text-red-500 mx-auto" />
                        )}
                      </TableCell>
                      <TableCell className="text-sm">{qc.checkedBy}</TableCell>
                      <TableCell className="text-sm">
                        {qc.checkedDate}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
