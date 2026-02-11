import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export function KpiCard({ title, value, change, changeType = "neutral" }: KpiCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground">{title}</span>
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        {change && (
          <span
            className={cn(
              "text-xs font-medium",
              changeType === "positive" && "text-green-600",
              changeType === "negative" && "text-red-600",
              changeType === "neutral" && "text-muted-foreground"
            )}
          >
            {change}
          </span>
        )}
      </CardContent>
    </Card>
  );
}
