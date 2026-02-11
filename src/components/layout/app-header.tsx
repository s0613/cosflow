"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/layout/user-nav";

const pathNameMap: Record<string, string> = {
  "/dashboard": "대시보드",
  "/requests": "의뢰 관리",
  "/ingredients": "성분 관리",
  "/regulations": "규제 검색",
  "/certifications": "인증 관리",
  "/production": "생산 관리",
};

function getBreadcrumbLabel(pathname: string): string {
  if (pathNameMap[pathname]) {
    return pathNameMap[pathname];
  }

  for (const [path, label] of Object.entries(pathNameMap)) {
    if (pathname.startsWith(path + "/")) {
      return label;
    }
  }

  return "COSFLOW";
}

export function AppHeader() {
  const pathname = usePathname();
  const currentLabel = getBreadcrumbLabel(pathname);

  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{currentLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="프로젝트, 성분 검색..."
            className="w-64 pl-8"
          />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-4" />
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-white">
            3
          </span>
        </Button>
        <UserNav />
      </div>
    </header>
  );
}
