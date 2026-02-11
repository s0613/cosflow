import { StatusBadge } from "@/components/shared/status-badge";
import type { Project } from "@/types/project";

interface ProjectInfoGridProps {
  project: Project;
}

interface InfoItem {
  label: string;
  value: React.ReactNode;
}

export function ProjectInfoGrid({ project }: ProjectInfoGridProps) {
  const items: InfoItem[] = [
    { label: "프로젝트명", value: project.name },
    { label: "프로젝트 코드", value: <span className="font-mono text-sm">{project.code}</span> },
    { label: "고객사", value: project.client },
    { label: "제품유형", value: project.productType },
    {
      label: "상태",
      value: <StatusBadge status={project.status} />,
    },
    {
      label: "우선순위",
      value: <StatusBadge status={project.priority} />,
    },
    { label: "담당자", value: project.manager },
    { label: "시작일", value: project.startDate },
    { label: "목표일", value: project.targetDate },
    { label: "설명", value: project.description },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className={item.label === "설명" ? "sm:col-span-2" : ""}>
          <dt className="text-sm text-muted-foreground">{item.label}</dt>
          <dd className="mt-1 text-sm font-medium">{item.value}</dd>
        </div>
      ))}
    </div>
  );
}
