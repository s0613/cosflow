export type ProcessStage =
  | "의뢰접수"
  | "개발"
  | "피드백"
  | "디자인"
  | "인증"
  | "생산"
  | "품질관리";

export type ProjectStatus = "진행중" | "완료" | "지연" | "대기" | "중단";

export type StageStatus = "completed" | "in-progress" | "pending" | "delayed";

export interface ProcessStep {
  stage: ProcessStage;
  status: StageStatus;
  progress: number;
  startDate?: string;
  endDate?: string;
  assignee?: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  client: string;
  productType: string;
  status: ProjectStatus;
  priority: "높음" | "중간" | "낮음";
  overallProgress: number;
  stages: ProcessStep[];
  manager: string;
  startDate: string;
  targetDate: string;
  description: string;
  team: string[];
}
