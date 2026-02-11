import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";

interface Issue {
  id: string;
  title: string;
  priority: string;
  assignee: string;
  createdDate: string;
  status: string;
}

const issues: Issue[] = [
  {
    id: "ISS-001",
    title: "원료 수급 지연 - 공급업체 납기 미준수",
    priority: "높음",
    assignee: "김연구",
    createdDate: "2025-03-20",
    status: "진행중",
  },
  {
    id: "ISS-002",
    title: "안정성 시험 결과 pH 변동 범위 초과",
    priority: "높음",
    assignee: "이규제",
    createdDate: "2025-04-01",
    status: "진행중",
  },
  {
    id: "ISS-003",
    title: "패키지 디자인 고객 수정 요청 (3차)",
    priority: "중간",
    assignee: "최디자",
    createdDate: "2025-04-05",
    status: "대기",
  },
  {
    id: "ISS-004",
    title: "중국 NMPA 성분 등록 추가 서류 요청",
    priority: "높음",
    assignee: "이규제",
    createdDate: "2025-03-28",
    status: "진행중",
  },
  {
    id: "ISS-005",
    title: "생산 라인 점검 일정 조율 필요",
    priority: "낮음",
    assignee: "정생산",
    createdDate: "2025-04-08",
    status: "대기",
  },
];

export function ProjectOpenIssueTab() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[90px]">이슈ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead>우선순위</TableHead>
            <TableHead>담당자</TableHead>
            <TableHead>생성일</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {issue.id}
              </TableCell>
              <TableCell className="font-medium">{issue.title}</TableCell>
              <TableCell>
                <StatusBadge status={issue.priority} />
              </TableCell>
              <TableCell>{issue.assignee}</TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {issue.createdDate}
              </TableCell>
              <TableCell>
                <StatusBadge status={issue.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
