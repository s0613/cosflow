"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import type { Country } from "@/types/ingredient";

const targetMarkets: { code: Country; label: string }[] = [
  { code: "KR", label: "한국" },
  { code: "CN", label: "중국" },
  { code: "JP", label: "일본" },
  { code: "EU", label: "유럽연합" },
  { code: "VN", label: "베트남" },
];

export function RequestFormDialog() {
  const [open, setOpen] = useState(false);
  const [selectedMarkets, setSelectedMarkets] = useState<Country[]>([]);

  function handleMarketToggle(code: Country) {
    setSelectedMarkets((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("의뢰가 등록되었습니다. (데모)");
    setOpen(false);
    setSelectedMarkets([]);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          새 의뢰
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>새 개발 의뢰</DialogTitle>
          <DialogDescription>
            개발 의뢰 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">프로젝트명</Label>
            <Input id="projectName" placeholder="프로젝트명을 입력하세요" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client">의뢰사</Label>
            <Input id="client" placeholder="의뢰사명을 입력하세요" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productType">제품유형</Label>
            <Input id="productType" placeholder="예: 크림, 토너, 세럼" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priority">우선순위</Label>
            <Select defaultValue="중간">
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="긴급">긴급</SelectItem>
                <SelectItem value="높음">높음</SelectItem>
                <SelectItem value="중간">중간</SelectItem>
                <SelectItem value="낮음">낮음</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>대상 시장</Label>
            <div className="flex flex-wrap gap-3">
              {targetMarkets.map((market) => (
                <label
                  key={market.code}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <Checkbox
                    checked={selectedMarkets.includes(market.code)}
                    onCheckedChange={() => handleMarketToggle(market.code)}
                  />
                  {market.label}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">설명</Label>
            <Textarea
              id="description"
              placeholder="의뢰 내용을 상세히 입력하세요"
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              취소
            </Button>
            <Button type="submit">등록</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
