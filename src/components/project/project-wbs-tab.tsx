"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared/status-badge";
import type { Project } from "@/types/project";

interface ProjectWbsTabProps {
  project: Project;
}

interface WbsItem {
  id: string;
  name: string;
  assignee: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
}

function generateWbsData(project: Project): WbsItem[] {
  return [
    {
      id: "WBS-001",
      name: "고객 요구사항 분석",
      assignee: project.manager,
      startDate: project.startDate,
      endDate: addDays(project.startDate, 5),
      progress: 100,
      status: "완료",
    },
    {
      id: "WBS-002",
      name: "원료 선정 및 검토",
      assignee: "김연구",
      startDate: addDays(project.startDate, 6),
      endDate: addDays(project.startDate, 20),
      progress: 100,
      status: "완료",
    },
    {
      id: "WBS-003",
      name: "시제품 제조 (1차)",
      assignee: "김연구",
      startDate: addDays(project.startDate, 21),
      endDate: addDays(project.startDate, 40),
      progress: 85,
      status: "진행중",
    },
    {
      id: "WBS-004",
      name: "안정성 시험",
      assignee: "이규제",
      startDate: addDays(project.startDate, 41),
      endDate: addDays(project.startDate, 70),
      progress: 40,
      status: "진행중",
    },
    {
      id: "WBS-005",
      name: "패키지 디자인",
      assignee: "최디자",
      startDate: addDays(project.startDate, 50),
      endDate: addDays(project.startDate, 75),
      progress: 20,
      status: "진행중",
    },
    {
      id: "WBS-006",
      name: "인증 서류 준비",
      assignee: "이규제",
      startDate: addDays(project.startDate, 60),
      endDate: addDays(project.startDate, 90),
      progress: 0,
      status: "대기",
    },
    {
      id: "WBS-007",
      name: "양산 시험",
      assignee: "정생산",
      startDate: addDays(project.startDate, 91),
      endDate: addDays(project.startDate, 110),
      progress: 0,
      status: "대기",
    },
    {
      id: "WBS-008",
      name: "품질 검사 및 출하",
      assignee: "정생산",
      startDate: addDays(project.startDate, 111),
      endDate: addDays(project.startDate, 120),
      progress: 0,
      status: "대기",
    },
    {
      id: "WBS-009",
      name: "최종 보고서 작성",
      assignee: project.manager,
      startDate: addDays(project.startDate, 115),
      endDate: addDays(project.startDate, 125),
      progress: 0,
      status: "대기",
    },
    {
      id: "WBS-010",
      name: "고객 납품",
      assignee: project.manager,
      startDate: addDays(project.startDate, 126),
      endDate: project.targetDate,
      progress: 0,
      status: "대기",
    },
  ];
}

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

export function ProjectWbsTab({ project }: ProjectWbsTabProps) {
  const wbsData = generateWbsData(project);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[90px]">작업ID</TableHead>
            <TableHead>작업명</TableHead>
            <TableHead>담당자</TableHead>
            <TableHead>시작일</TableHead>
            <TableHead>종료일</TableHead>
            <TableHead className="w-[140px]">진행률</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {wbsData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {item.id}
              </TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.assignee}</TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {item.startDate}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {item.endDate}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={item.progress} className="h-2 flex-1" />
                  <span className="text-xs text-muted-foreground w-10 text-right">
                    {item.progress}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
