"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { StatusBadge } from "@/components/shared/status-badge";
import type { ProductionRecord, ProductionStatus } from "@/types/production";
import { cn } from "@/lib/utils";
import { User, Package } from "lucide-react";

const statusColumns: { status: ProductionStatus; color: string }[] = [
  { status: "계획", color: "border-t-gray-400" },
  { status: "원료입고", color: "border-t-blue-400" },
  { status: "배합", color: "border-t-cyan-400" },
  { status: "충전", color: "border-t-indigo-400" },
  { status: "포장", color: "border-t-purple-400" },
  { status: "검사", color: "border-t-yellow-400" },
  { status: "출하", color: "border-t-orange-400" },
  { status: "완료", color: "border-t-green-400" },
];

interface ProductionKanbanProps {
  records: ProductionRecord[];
  onCardClick?: (record: ProductionRecord) => void;
}

export function ProductionKanban({
  records,
  onCardClick,
}: ProductionKanbanProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-4 pb-4 min-w-[1200px]">
        {statusColumns.map(({ status, color }) => {
          const columnRecords = records.filter((r) => r.status === status);

          return (
            <div
              key={status}
              className="flex flex-col w-[200px] shrink-0"
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="text-sm font-semibold">{status}</h3>
                <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                  {columnRecords.length}
                </span>
              </div>
              <div className="space-y-3 min-h-[200px]">
                {columnRecords.map((record) => (
                  <Card
                    key={record.id}
                    className={cn(
                      "border-t-2 py-3 gap-2 cursor-pointer hover:shadow-md transition-shadow",
                      color
                    )}
                    onClick={() => onCardClick?.(record)}
                  >
                    <CardContent className="space-y-2">
                      <p className="text-sm font-semibold leading-tight">
                        {record.productName}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {record.batchNumber}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Package className="size-3" />
                        <span>
                          {record.quantity.toLocaleString()} {record.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <User className="size-3" />
                        <span>{record.assignee}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {columnRecords.length === 0 && (
                  <div className="flex items-center justify-center h-24 border border-dashed rounded-lg">
                    <p className="text-xs text-muted-foreground">없음</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
