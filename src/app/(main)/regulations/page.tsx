import { PageHeader } from "@/components/shared/page-header";
import { RegulationChat } from "@/components/regulations/regulation-chat";

export default function RegulationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="규제 검색"
        description="AI 기반 화장품 원료 규제 정보를 검색하세요"
      />
      <RegulationChat />
    </div>
  );
}
