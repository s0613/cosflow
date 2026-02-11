import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusColorMap: Record<string, string> = {
  // Blue
  "진행중": "bg-blue-100 text-blue-800 border-blue-200",
  "개발진행": "bg-blue-100 text-blue-800 border-blue-200",
  "심사중": "bg-blue-100 text-blue-800 border-blue-200",
  "배합": "bg-blue-100 text-blue-800 border-blue-200",
  "충전": "bg-blue-100 text-blue-800 border-blue-200",

  // Green
  "완료": "bg-green-100 text-green-800 border-green-200",
  "승인": "bg-green-100 text-green-800 border-green-200",
  "허용": "bg-green-100 text-green-800 border-green-200",
  "출하": "bg-green-100 text-green-800 border-green-200",

  // Red
  "지연": "bg-red-100 text-red-800 border-red-200",
  "반려": "bg-red-100 text-red-800 border-red-200",
  "금지": "bg-red-100 text-red-800 border-red-200",

  // Gray
  "대기": "bg-gray-100 text-gray-800 border-gray-200",
  "접수대기": "bg-gray-100 text-gray-800 border-gray-200",
  "준비중": "bg-gray-100 text-gray-800 border-gray-200",
  "계획": "bg-gray-100 text-gray-800 border-gray-200",

  // Orange / Amber
  "긴급": "bg-amber-100 text-amber-800 border-amber-200",
  "보완요청": "bg-amber-100 text-amber-800 border-amber-200",
  "만료임박": "bg-amber-100 text-amber-800 border-amber-200",
  "제한": "bg-amber-100 text-amber-800 border-amber-200",

  // Yellow
  "높음": "bg-yellow-100 text-yellow-800 border-yellow-200",

  // Slate
  "중간": "bg-slate-100 text-slate-800 border-slate-200",
  "조건부허용": "bg-slate-100 text-slate-800 border-slate-200",
};

const defaultColor = "bg-gray-100 text-gray-800 border-gray-200";

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colorClass = statusColorMap[status] || defaultColor;

  return (
    <Badge
      variant="outline"
      className={cn(colorClass, className)}
    >
      {status}
    </Badge>
  );
}
