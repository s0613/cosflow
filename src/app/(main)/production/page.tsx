"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LayoutList, Kanban } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { ProductionKanban } from "@/components/production/production-kanban";
import { Button } from "@/components/ui/button";
import { productionRecords } from "@/data/production";
import type { ProductionRecord } from "@/types/production";

const columns: ColumnDef<Record<string, unknown>>[] = [
  {
    key: "batchNumber",
    label: "배치번호",
    sortable: true,
    render: (value) => (
      <span className="font-mono text-sm">{String(value)}</span>
    ),
  },
  {
    key: "productName",
    label: "제품명",
    sortable: true,
    render: (value) => (
      <span className="font-medium">{String(value)}</span>
    ),
  },
  {
    key: "status",
    label: "상태",
    sortable: true,
    render: (value) => <StatusBadge status={String(value)} />,
  },
  {
    key: "quantity",
    label: "수량",
    sortable: true,
    render: (value, row) => {
      const record = row as unknown as ProductionRecord;
      return (
        <span className="text-sm">
          {Number(value).toLocaleString()} {record.unit}
        </span>
      );
    },
  },
  {
    key: "startDate",
    label: "시작일",
    sortable: true,
  },
  {
    key: "expectedDate",
    label: "예정일",
    sortable: true,
  },
  {
    key: "assignee",
    label: "담당자",
    sortable: true,
  },
];

export default function ProductionPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  function handleRowClick(row: Record<string, unknown>) {
    const record = row as unknown as ProductionRecord;
    router.push(`/production/${record.id}`);
  }

  function handleKanbanCardClick(record: ProductionRecord) {
    router.push(`/production/${record.id}`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="생산 관리"
        description="생산 프로세스 및 품질 관리를 수행합니다"
      >
        <div className="flex items-center gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="gap-1.5"
          >
            <LayoutList className="size-4" />
            테이블 뷰
          </Button>
          <Button
            variant={viewMode === "kanban" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("kanban")}
            className="gap-1.5"
          >
            <Kanban className="size-4" />
            칸반 뷰
          </Button>
        </div>
      </PageHeader>

      {viewMode === "table" ? (
        <DataTable
          columns={columns}
          data={productionRecords as unknown as Record<string, unknown>[]}
          searchable
          searchPlaceholder="제품명, 배치번호 검색..."
          searchKey="productName"
          pageSize={10}
          onRowClick={handleRowClick}
        />
      ) : (
        <ProductionKanban
          records={productionRecords}
          onCardClick={handleKanbanCardClick}
        />
      )}
    </div>
  );
}
