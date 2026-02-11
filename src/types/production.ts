export type ProductionStatus = "계획" | "원료입고" | "배합" | "충전" | "포장" | "검사" | "출하" | "완료";

export interface QualityCheck {
  id: string;
  item: string;
  standard: string;
  result: string;
  passed: boolean;
  checkedBy: string;
  checkedDate: string;
}

export interface ProductionRecord {
  id: string;
  projectId: string;
  projectName: string;
  productName: string;
  batchNumber: string;
  status: ProductionStatus;
  quantity: number;
  unit: string;
  startDate: string;
  expectedDate: string;
  completedDate?: string;
  qualityChecks: QualityCheck[];
  assignee: string;
}
