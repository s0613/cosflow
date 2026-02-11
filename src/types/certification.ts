import type { Country } from "@/types/ingredient";

export type CertStatus = "준비중" | "서류제출" | "심사중" | "보완요청" | "승인" | "만료임박" | "반려";

export interface CertificationRecord {
  id: string;
  projectId: string;
  projectName: string;
  country: Country;
  certType: string;
  status: CertStatus;
  submissionDate?: string;
  expectedDate?: string;
  approvalDate?: string;
  documents: { name: string; status: "완료" | "진행중" | "미시작" }[];
  notes?: string;
}
