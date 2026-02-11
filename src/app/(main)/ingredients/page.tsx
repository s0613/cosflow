"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { DataTable, type ColumnDef } from "@/components/shared/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ingredients } from "@/data/ingredients";
import type { Ingredient } from "@/types/ingredient";

const categories = [
  "전체",
  ...Array.from(new Set(ingredients.map((i) => i.category))).sort(),
];

const columns: ColumnDef<Record<string, unknown>>[] = [
  {
    key: "nameKo",
    label: "성분명(한글)",
    sortable: true,
    render: (value) => (
      <span className="font-medium">{String(value)}</span>
    ),
  },
  {
    key: "nameEn",
    label: "영문명",
    sortable: true,
  },
  {
    key: "inci",
    label: "INCI",
    sortable: true,
    render: (value) => (
      <span className="text-xs font-mono">{String(value)}</span>
    ),
  },
  {
    key: "casNumber",
    label: "CAS번호",
    sortable: true,
    render: (value) => (
      <span className="text-xs font-mono">{String(value)}</span>
    ),
  },
  {
    key: "category",
    label: "카테고리",
    sortable: true,
    render: (value) => (
      <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
        {String(value)}
      </span>
    ),
  },
];

export default function IngredientsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredIngredients = useMemo(() => {
    if (selectedCategory === "전체") return ingredients;
    return ingredients.filter((i) => i.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="성분 관리"
        description="화장품 원료 성분 및 규제 정보를 관리합니다"
      />
      <div className="flex items-center gap-4">
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="카테고리 선택" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground">
          21,480개 중 1-{Math.min(10, filteredIngredients.length)} 표시
        </p>
      </div>
      <DataTable
        columns={columns}
        data={filteredIngredients as unknown as Record<string, unknown>[]}
        searchable
        searchPlaceholder="성분명, INCI, CAS번호 검색..."
        pageSize={10}
        onRowClick={(row) => {
          const ingredient = row as unknown as Ingredient;
          router.push(`/ingredients/${ingredient.id}`);
        }}
      />
    </div>
  );
}
