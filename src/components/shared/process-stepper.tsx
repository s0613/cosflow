import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types/project";

interface ProcessStepperProps {
  stages: ProcessStep[];
  className?: string;
}

function getStepStyles(status: ProcessStep["status"]) {
  switch (status) {
    case "completed":
      return {
        circle: "bg-green-500 text-white border-green-500",
        line: "bg-green-500",
        label: "text-green-700 font-medium",
      };
    case "in-progress":
      return {
        circle: "bg-blue-500 text-white border-blue-500 animate-pulse",
        line: "bg-blue-200",
        label: "text-blue-700 font-medium",
      };
    case "delayed":
      return {
        circle: "bg-red-500 text-white border-red-500",
        line: "bg-red-200",
        label: "text-red-700 font-medium",
      };
    case "pending":
    default:
      return {
        circle: "bg-gray-200 text-gray-500 border-gray-300",
        line: "bg-gray-200",
        label: "text-gray-500",
      };
  }
}

export function ProcessStepper({ stages, className }: ProcessStepperProps) {
  return (
    <div className={cn("flex items-start", className)}>
      {stages.map((step, index) => {
        const styles = getStepStyles(step.status);
        const isLast = index === stages.length - 1;

        return (
          <div
            key={step.stage}
            className={cn("flex flex-col items-center", !isLast && "flex-1")}
          >
            <div className="flex items-center w-full">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full border-2 text-xs shrink-0",
                    styles.circle
                  )}
                >
                  {step.status === "completed" ? (
                    <Check className="size-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
              </div>
              {/* Connector line */}
              {!isLast && (
                <div className={cn("h-0.5 flex-1 mx-1", styles.line)} />
              )}
            </div>
            {/* Label */}
            <span
              className={cn(
                "mt-2 text-xs text-center whitespace-nowrap",
                styles.label
              )}
            >
              {step.stage}
            </span>
            {/* Progress percentage */}
            {step.status === "in-progress" && (
              <span className="text-[10px] text-blue-500 mt-0.5">
                {step.progress}%
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
