"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/shared/status-badge";
import { projects } from "@/data/projects";

export function RecentProjectsTable() {
  const router = useRouter();

  const recentProjects = projects.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">최근 프로젝트</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>코드</TableHead>
              <TableHead>프로젝트명</TableHead>
              <TableHead>고객사</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="w-[140px]">진행률</TableHead>
              <TableHead>담당자</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentProjects.map((project) => (
              <TableRow
                key={project.id}
                className="cursor-pointer"
                onClick={() => router.push(`/dashboard/${project.id}`)}
              >
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {project.code}
                </TableCell>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>
                  <StatusBadge status={project.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.overallProgress} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-10 text-right">
                      {project.overallProgress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>{project.manager}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
