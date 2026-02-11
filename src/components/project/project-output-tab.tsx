import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";

interface DocumentItem {
  id: string;
  name: string;
  type: string;
  version: string;
  lastModified: string;
  author: string;
  status: string;
}

const documents: DocumentItem[] = [
  {
    id: "DOC-001",
    name: "제품 기획서",
    type: "기획",
    version: "v2.1",
    lastModified: "2025-03-15",
    author: "박진감",
    status: "승인",
  },
  {
    id: "DOC-002",
    name: "원료 성적서",
    type: "연구",
    version: "v1.3",
    lastModified: "2025-04-02",
    author: "김연구",
    status: "승인",
  },
  {
    id: "DOC-003",
    name: "안정성 시험 보고서",
    type: "시험",
    version: "v1.0",
    lastModified: "2025-04-10",
    author: "이규제",
    status: "심사중",
  },
  {
    id: "DOC-004",
    name: "패키지 디자인 시안",
    type: "디자인",
    version: "v3.0",
    lastModified: "2025-03-28",
    author: "최디자",
    status: "승인",
  },
  {
    id: "DOC-005",
    name: "INCI 성분 목록",
    type: "인증",
    version: "v1.2",
    lastModified: "2025-04-05",
    author: "이규제",
    status: "심사중",
  },
  {
    id: "DOC-006",
    name: "제조 공정서",
    type: "생산",
    version: "v1.0",
    lastModified: "2025-03-20",
    author: "정생산",
    status: "준비중",
  },
  {
    id: "DOC-007",
    name: "품질 검사 기준서",
    type: "품질",
    version: "v1.0",
    lastModified: "2025-03-18",
    author: "정생산",
    status: "준비중",
  },
  {
    id: "DOC-008",
    name: "인체적용시험 계획서",
    type: "시험",
    version: "v1.1",
    lastModified: "2025-04-08",
    author: "김연구",
    status: "승인",
  },
];

export function ProjectOutputTab() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>문서명</TableHead>
            <TableHead>유형</TableHead>
            <TableHead>버전</TableHead>
            <TableHead>최종수정일</TableHead>
            <TableHead>작성자</TableHead>
            <TableHead>상태</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell>
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
                  {doc.type}
                </span>
              </TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {doc.version}
              </TableCell>
              <TableCell className="text-muted-foreground text-xs">
                {doc.lastModified}
              </TableCell>
              <TableCell>{doc.author}</TableCell>
              <TableCell>
                <StatusBadge status={doc.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
