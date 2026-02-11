"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegulationStatusMatrix } from "@/components/ingredients/regulation-status-matrix";
import { ingredients } from "@/data/ingredients";

interface IngredientDetailPageProps {
  params: Promise<{ ingredientId: string }>;
}

export default function IngredientDetailPage({
  params,
}: IngredientDetailPageProps) {
  const { ingredientId } = use(params);
  const ingredient = ingredients.find((i) => i.id === ingredientId);

  if (!ingredient) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">성분을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/ingredients"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" />
        성분 목록
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {ingredient.nameKo}
        </h1>
        <p className="text-muted-foreground mt-1">{ingredient.nameEn}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">성분 정보</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-xs text-muted-foreground">성분명 (한글)</p>
              <p className="text-sm font-medium mt-0.5">{ingredient.nameKo}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">성분명 (영문)</p>
              <p className="text-sm font-medium mt-0.5">{ingredient.nameEn}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">INCI 명칭</p>
              <p className="text-sm font-mono font-medium mt-0.5">
                {ingredient.inci}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">CAS 번호</p>
              <p className="text-sm font-mono font-medium mt-0.5">
                {ingredient.casNumber}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">카테고리</p>
              <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium mt-0.5">
                {ingredient.category}
              </span>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs text-muted-foreground">설명</p>
              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                {ingredient.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <RegulationStatusMatrix regulations={ingredient.regulations} />
    </div>
  );
}
