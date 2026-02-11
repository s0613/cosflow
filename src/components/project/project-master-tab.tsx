import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

interface ProjectMasterTabProps {
  project: Project;
}

function calcDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function calcDDay(targetDate: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days > 0) return `D-${days}`;
  if (days === 0) return "D-Day";
  return `D+${Math.abs(days)}`;
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-b-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

export function ProjectMasterTab({ project }: ProjectMasterTabProps) {
  const elapsedDays = calcDays(project.startDate, new Date().toISOString().split("T")[0]);
  const dDay = calcDDay(project.targetDate);

  // Dummy customer schedule dates relative to the project
  const sampleDeadline = new Date(project.targetDate);
  sampleDeadline.setDate(sampleDeadline.getDate() - 45);
  const massProductionDeadline = new Date(project.targetDate);
  massProductionDeadline.setDate(massProductionDeadline.getDate() - 15);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">프로젝트 일정</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="시작일" value={project.startDate} />
          <InfoRow label="목표일" value={project.targetDate} />
          <InfoRow label="진행일수" value={`${elapsedDays}일`} />
          <InfoRow label="D-Day" value={dDay} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">고객 일정</CardTitle>
        </CardHeader>
        <CardContent>
          <InfoRow label="샘플 납기" value={sampleDeadline.toISOString().split("T")[0]} />
          <InfoRow label="양산 납기" value={massProductionDeadline.toISOString().split("T")[0]} />
          <InfoRow label="고객 검수일" value={project.targetDate} />
          <InfoRow label="최종 출하일" value={project.targetDate} />
        </CardContent>
      </Card>
    </div>
  );
}
