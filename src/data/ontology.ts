export interface OntologyNode {
  id: string;
  label: string;
  description: string;
  properties: { key: string; value: string }[];
  color: string;
}

export interface OntologyEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export const ontologyNodes: OntologyNode[] = [
  {
    id: "project",
    label: "프로젝트",
    description: "화장품 개발 프로젝트 엔티티. 의뢰부터 출하까지의 전체 생산 사이클을 관리합니다.",
    properties: [
      { key: "ID", value: "String (UUID)" },
      { key: "이름", value: "String" },
      { key: "상태", value: "진행중 | 완료 | 지연 | 대기 | 중단" },
      { key: "우선순위", value: "높음 | 중간 | 낮음" },
      { key: "진행률", value: "Number (0~100)" },
    ],
    color: "#3b82f6",
  },
  {
    id: "request",
    label: "의뢰",
    description: "고객사로부터 접수된 화장품 개발 의뢰. 프로젝트 생성의 시작점입니다.",
    properties: [
      { key: "ID", value: "String" },
      { key: "고객사명", value: "String" },
      { key: "제품유형", value: "String" },
      { key: "접수일", value: "Date" },
      { key: "상태", value: "검토중 | 승인 | 반려" },
    ],
    color: "#8b5cf6",
  },
  {
    id: "ingredient",
    label: "성분",
    description: "화장품 원료 성분. INCI명, CAS번호, 국가별 규제 현황 정보를 포함합니다.",
    properties: [
      { key: "ID", value: "String" },
      { key: "성분명(한글)", value: "String" },
      { key: "INCI명", value: "String" },
      { key: "CAS번호", value: "String" },
      { key: "카테고리", value: "String" },
    ],
    color: "#10b981",
  },
  {
    id: "regulation",
    label: "규제정보",
    description: "특정 성분에 대한 국가별 규제 현황. 허용 여부, 최대 농도, 조건 등을 포함합니다.",
    properties: [
      { key: "상태", value: "허용 | 제한 | 금지 | 조건부허용 | 미등록" },
      { key: "최대농도", value: "String (optional)" },
      { key: "비고", value: "String" },
      { key: "최종업데이트", value: "Date" },
    ],
    color: "#f59e0b",
  },
  {
    id: "country",
    label: "국가",
    description: "규제 관할 국가. 현재 5개국(한국, 중국, 일본, EU, 아세안)을 지원합니다.",
    properties: [
      { key: "코드", value: "KR | CN | JP | EU | VN" },
      { key: "명칭", value: "String" },
      { key: "규제기관", value: "String" },
    ],
    color: "#ef4444",
  },
  {
    id: "certification",
    label: "인증",
    description: "화장품 수출을 위한 국가별 인증. 만료일, 갱신 주기 등을 관리합니다.",
    properties: [
      { key: "ID", value: "String" },
      { key: "인증명", value: "String" },
      { key: "인증기관", value: "String" },
      { key: "발급일", value: "Date" },
      { key: "만료일", value: "Date" },
    ],
    color: "#06b6d4",
  },
  {
    id: "production",
    label: "생산배치",
    description: "화장품 생산 배치 단위. 계획부터 출하까지 8단계 워크플로우로 관리됩니다.",
    properties: [
      { key: "배치번호", value: "String" },
      { key: "생산수량", value: "Number" },
      { key: "단위", value: "String" },
      { key: "상태", value: "계획 | 원료입고 | 배합 | 충전 | 포장 | 검사 | 출하 | 완료" },
    ],
    color: "#f97316",
  },
  {
    id: "quality",
    label: "품질검사",
    description: "생산 배치에 대한 품질 검사 기록. 항목별 검사 결과와 합격 여부를 포함합니다.",
    properties: [
      { key: "검사항목", value: "String" },
      { key: "기준값", value: "String" },
      { key: "검사결과", value: "String" },
      { key: "합격여부", value: "Boolean" },
      { key: "검사자", value: "String" },
    ],
    color: "#84cc16",
  },
  {
    id: "user",
    label: "사용자",
    description: "COSFLOW 시스템 사용자. 역할에 따라 프로젝트 접근 권한이 다릅니다.",
    properties: [
      { key: "ID", value: "String" },
      { key: "이름", value: "String" },
      { key: "부서", value: "String" },
      { key: "역할", value: "대표이사 | 연구원 | QC | 영업" },
    ],
    color: "#6366f1",
  },
];

export const ontologyEdges: OntologyEdge[] = [
  { id: "e1", source: "request", target: "project", label: "생성" },
  { id: "e2", source: "project", target: "ingredient", label: "사용" },
  { id: "e3", source: "ingredient", target: "regulation", label: "적용" },
  { id: "e4", source: "regulation", target: "country", label: "관할" },
  { id: "e5", source: "project", target: "certification", label: "취득" },
  { id: "e6", source: "certification", target: "country", label: "대상국가" },
  { id: "e7", source: "project", target: "production", label: "생산" },
  { id: "e8", source: "production", target: "quality", label: "검사" },
  { id: "e9", source: "user", target: "project", label: "담당" },
];
