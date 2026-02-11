import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function getColor(value: number): string {
  if (value > 75) return "text-green-500";
  if (value > 50) return "text-blue-500";
  if (value > 25) return "text-orange-500";
  return "text-red-500";
}

function getStrokeColor(value: number): string {
  if (value > 75) return "#22c55e";
  if (value > 50) return "#3b82f6";
  if (value > 25) return "#f97316";
  return "#ef4444";
}

export function CircularProgress({
  value,
  size = 120,
  strokeWidth = 8,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (clampedValue / 100) * circumference;
  const colorClass = getColor(clampedValue);
  const strokeColor = getStrokeColor(clampedValue);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted/50"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      <span
        className={cn(
          "absolute text-lg font-semibold",
          colorClass
        )}
      >
        {clampedValue}%
      </span>
    </div>
  );
}
