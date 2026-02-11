import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
          <FileQuestion className="size-8 text-muted-foreground" />
        </div>
        <h1 className="text-7xl font-extrabold tracking-tighter text-primary">
          404
        </h1>
        <p className="text-lg text-muted-foreground">
          페이지를 찾을 수 없습니다
        </p>
        <p className="max-w-sm text-sm text-muted-foreground/70">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
      </div>
      <Button asChild size="lg">
        <Link href="/dashboard">대시보드로 돌아가기</Link>
      </Button>
    </div>
  );
}
