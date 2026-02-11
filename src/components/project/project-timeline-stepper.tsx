"use client";

import { Check, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProcessStep } from "@/types/project";

interface ProjectTimelineStepperProps {
  stages: ProcessStep[];
  className?: string;
}

function getStepIcon(status: ProcessStep["status"]) {
  switch (status) {
    case "completed":
      return <Check className="size-4" />;
    case "delayed":
      return <AlertTriangle className="size-4" />;
    default:
      return null;
  }
}

function getStepStyles(status: ProcessStep["status"]) {
  switch (status) {
    case "completed":
      return {
        icon: "bg-green-500 text-white border-green-500",
        line: "bg-green-500",
        bg: "",
        text: "text-green-700 font-semibold",
        progress: "text-green-600",
      };
    case "in-progress":
      return {
        icon: "bg-blue-500 text-white border-blue-500",
        line: "bg-blue-200",
        bg: "bg-blue-50 border border-blue-200 rounded-lg",
        text: "text-blue-700 font-semibold",
        progress: "text-blue-600",
      };
    case "delayed":
      return {
        icon: "bg-red-500 text-white border-red-500",
        line: "bg-red-200",
        bg: "bg-red-50 border border-red-200 rounded-lg",
        text: "text-red-700 font-semibold",
        progress: "text-red-600",
      };
    case "pending":
    default:
      return {
        icon: "bg-gray-200 text-gray-500 border-gray-300",
        line: "bg-gray-200",
        bg: "",
        text: "text-gray-500",
        progress: "text-gray-400",
      };
  }
}

export function ProjectTimelineStepper({ stages, className }: ProjectTimelineStepperProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {stages.map((step, index) => {
        const styles = getStepStyles(step.status);
        const isLast = index === stages.length - 1;
        const icon = getStepIcon(step.status);

        return (
          <div key={step.stage} className="flex items-stretch">
            {/* Left column: icon + connector line */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 z-10",
                  styles.icon,
                  step.status === "in-progress" && "animate-pulse"
                )}
              >
                {icon || (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              {!isLast && (
                <div
                  className={cn("w-0.5 flex-1 min-h-[24px]", styles.line)}
                />
              )}
            </div>

            {/* Right column: stage info */}
            <div className={cn("ml-4 flex-1 pb-6", isLast && "pb-0")}>
              <div className={cn("p-3 -mt-1", styles.bg)}>
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm", styles.text)}>
                    {step.stage}
                  </span>
                  <span
                    className={cn("text-xs font-medium", styles.progress)}
                  >
                    {step.progress}%
                  </span>
                </div>
                {step.assignee && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    담당: {step.assignee}
                  </p>
                )}
                {(step.startDate || step.endDate) && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {step.startDate && step.startDate}
                    {step.endDate && ` ~ ${step.endDate}`}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
