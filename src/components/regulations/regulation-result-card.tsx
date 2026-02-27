import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";
import type { RegulationSearchResult } from "@/types/chat";
import type { Country } from "@/types/ingredient";

const countryLabels: Record<Country, string> = {
  KR: "한국",
  CN: "중국",
  JP: "일본",
  EU: "유럽연합",
  VN: "아세안",
};

interface RegulationResultCardProps {
  result: RegulationSearchResult;
}

export function RegulationResultCard({ result }: RegulationResultCardProps) {
  return (
    <Card className="py-3 gap-2">
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">{result.ingredientName}</p>
            <p className="text-xs text-muted-foreground">{result.inci}</p>
          </div>
          <StatusBadge status={result.status} />
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 font-medium text-foreground">
            {result.country} {countryLabels[result.country]}
          </span>
          {result.maxConcentration && (
            <span>
              최대 농도: <strong>{result.maxConcentration}</strong>
            </span>
          )}
        </div>
        {result.notes && (
          <p className="text-xs text-muted-foreground">{result.notes}</p>
        )}
      </CardContent>
    </Card>
  );
}
