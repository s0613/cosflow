"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { RequestFormDialog } from "@/components/requests/request-form-dialog";
import { requests } from "@/data/requests";
import type { DevelopmentRequest } from "@/types/request";

const columns: ColumnDef<Record<string, unknown>>[] = [
  {
    key: "id",
    label: "ID",
    sortable: true,
  },
  {
    key: "projectName",
    label: "프로젝트명",
    sortable: true,
    render: (value) => (
      <span className="font-medium">{String(value)}</span>
    ),
  },
  {
    key: "client",
    label: "의뢰사",
    sortable: true,
  },
  {
    key: "status",
    label: "상태",
    sortable: true,
    render: (value) => <StatusBadge status={String(value)} />,
  },
  {
    key: "priority",
    label: "우선순위",
    sortable: true,
    render: (value) => <StatusBadge status={String(value)} />,
  },
  {
    key: "assignee",
    label: "담당자",
    sortable: true,
  },
  {
    key: "requestDate",
    label: "의뢰일",
    sortable: true,
  },
];

export default function RequestsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <PageHeader
        title="의뢰 관리"
        description="개발 의뢰 현황을 관리합니다"
      >
        <RequestFormDialog />
      </PageHeader>
      <DataTable
        columns={columns}
        data={requests as unknown as Record<string, unknown>[]}
        searchable
        searchPlaceholder="프로젝트명, 의뢰사 검색..."
        searchKey="projectName"
        pageSize={10}
        onRowClick={(row) => {
          const r = row as unknown as DevelopmentRequest;
          router.push(`/requests/${r.id}`);
        }}
      />
    </div>
  );
}
