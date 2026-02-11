import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { users } from "@/data/users";
import type { Project } from "@/types/project";

interface ProjectOrgTabProps {
  project: Project;
}

export function ProjectOrgTab({ project }: ProjectOrgTabProps) {
  const teamMembers = project.team
    .map((name) => users.find((u) => u.name === name))
    .filter(Boolean);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>부서</TableHead>
            <TableHead>이메일</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teamMembers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                팀 멤버 정보가 없습니다.
              </TableCell>
            </TableRow>
          ) : (
            teamMembers.map((member) => (
              <TableRow key={member!.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{member!.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member!.name}</span>
                  </div>
                </TableCell>
                <TableCell>{member!.role}</TableCell>
                <TableCell>{member!.department}</TableCell>
                <TableCell className="text-muted-foreground">{member!.email}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
