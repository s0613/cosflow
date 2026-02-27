import { PageHeader } from "@/components/shared/page-header";
import { OntologyGraph } from "@/components/ontology/ontology-graph";

export default function OntologyPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="온톨로지 뷰어"
        description="COSFLOW 도메인 스키마 그래프 — 노드를 클릭하여 상세 정보를 확인하세요"
      />
      <OntologyGraph />
    </div>
  );
}
