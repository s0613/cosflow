import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CircularProgress } from "@/components/shared/circular-progress";
import { ProjectTimelineStepper } from "@/components/project/project-timeline-stepper";
import { ProjectInfoGrid } from "@/components/project/project-info-grid";
import { ProjectActionButtons } from "@/components/project/project-action-buttons";
import { ProjectTabs } from "@/components/project/project-tabs";

interface ProjectDetailPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectId } = await params;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            목록으로
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {project.code} &middot; {project.client}
            </p>
          </div>
        </div>
        <ProjectActionButtons />
      </div>

      {/* Main content: 2-column layout */}
      <div className="flex gap-6">
        {/* Left sidebar: Timeline stepper */}
        <div className="w-80 shrink-0">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-sm font-semibold mb-4">프로세스 진행 현황</h2>
            <ProjectTimelineStepper stages={project.stages} />
          </div>
        </div>

        {/* Right content area */}
        <div className="flex-1 space-y-6">
          {/* Circular progress + Project info */}
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-sm font-semibold mb-4">프로젝트 정보</h2>
                <ProjectInfoGrid project={project} />
              </div>
              <div className="ml-6 flex flex-col items-center gap-2">
                <CircularProgress value={project.overallProgress} size={120} strokeWidth={10} />
                <span className="text-xs text-muted-foreground">전체 진행률</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <ProjectTabs project={project} />
        </div>
      </div>
    </div>
  );
}
