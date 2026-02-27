"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { certifications } from "@/data/certifications";
import type { CertificationRecord } from "@/types/certification";
import type { Country } from "@/types/ingredient";

const countryLabels: Record<Country, string> = {
  KR: "한국",
  CN: "중국",
  JP: "일본",
  EU: "유럽연합",
  VN: "아세안",
};

const countryTabs: { value: string; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "KR", label: "한국" },
  { value: "CN", label: "중국" },
  { value: "JP", label: "일본" },
  { value: "EU", label: "EU" },
  { value: "VN", label: "아세안" },
];

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
    key: "country",
    label: "국가",
    sortable: true,
    render: (value) => {
      const code = String(value) as Country;
      return (
        <span className="text-sm">
          {code} {countryLabels[code] || code}
        </span>
      );
    },
  },
  {
    key: "certType",
    label: "인증 유형",
    sortable: true,
  },
  {
    key: "status",
    label: "상태",
    sortable: true,
    render: (value) => <StatusBadge status={String(value)} />,
  },
  {
    key: "submissionDate",
    label: "제출일",
    sortable: true,
    render: (value) => (
      <span className="text-sm">{value ? String(value) : "-"}</span>
    ),
  },
  {
    key: "expectedDate",
    label: "예정일",
    sortable: true,
    render: (value) => (
      <span className="text-sm">{value ? String(value) : "-"}</span>
    ),
  },
];

export default function CertificationsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");

  const filteredCertifications = useMemo(() => {
    if (activeTab === "all") return certifications;
    return certifications.filter((c) => c.country === activeTab);
  }, [activeTab]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <PageHeader
          title="인증 관리"
          description="국가별 인증 현황을 관리합니다"
        />
        <Link
          href="/reports/certification"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
        >
          <FileText className="size-4" />
          보고서 생성
        </Link>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {countryTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {countryTabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <DataTable
              columns={columns}
              data={filteredCertifications as unknown as Record<string, unknown>[]}
              searchable
              searchPlaceholder="프로젝트명, 인증 유형 검색..."
              searchKey="projectName"
              pageSize={10}
              onRowClick={(row) => {
                const cert = row as unknown as CertificationRecord;
                router.push(`/certifications/${cert.id}`);
              }}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
