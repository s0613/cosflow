import type { Country } from "@/types/ingredient";

export type RequestStatus = "접수대기" | "접수완료" | "검토중" | "개발진행" | "샘플제작" | "완료" | "반려";

export interface DevelopmentRequest {
  id: string;
  projectName: string;
  client: string;
  requestDate: string;
  status: RequestStatus;
  priority: "긴급" | "높음" | "중간" | "낮음";
  assignee: string;
  productType: string;
  targetMarket: Country[];
  description: string;
  attachments: number;
}
