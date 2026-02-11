import { PageHeader } from "@/components/shared/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { ProjectStatusChart } from "@/components/dashboard/project-status-chart";
import { CountryRegulationChart } from "@/components/dashboard/country-regulation-chart";
import { RecentProjectsTable } from "@/components/dashboard/recent-projects-table";
import { projects } from "@/data/projects";

export default function DashboardPage() {
  const totalProjects = projects.length;
  const inProgress = projects.filter((p) => p.status === "진행중").length;
  const completed = projects.filter((p) => p.status === "완료").length;
  const delayed = projects.filter((p) => p.status === "지연").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="대시보드"
        description="프로젝트 현황 및 주요 지표를 한눈에 확인하세요"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="전체 프로젝트"
          value={totalProjects}
          change="+2 이번 주"
          changeType="positive"
        />
        <KpiCard
          title="진행중"
          value={inProgress}
          change="+1 이번 주"
          changeType="positive"
        />
        <KpiCard
          title="완료"
          value={completed}
          change="+1 이번 달"
          changeType="positive"
        />
        <KpiCard
          title="지연"
          value={delayed}
          change="주의 필요"
          changeType="negative"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProjectStatusChart />
        <CountryRegulationChart />
      </div>

      {/* Recent Projects Table */}
      <RecentProjectsTable />
    </div>
  );
}
