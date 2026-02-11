"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/shared/status-badge";
import type { CountryRegulation, Country } from "@/types/ingredient";
import { cn } from "@/lib/utils";

const countries: { code: Country; label: string }[] = [
  { code: "KR", label: "한국" },
  { code: "CN", label: "중국" },
  { code: "JP", label: "일본" },
  { code: "EU", label: "유럽연합" },
  { code: "VN", label: "베트남" },
];

interface RegulationStatusMatrixProps {
  regulations: CountryRegulation[];
}

export function RegulationStatusMatrix({
  regulations,
}: RegulationStatusMatrixProps) {
  function getRegulation(countryCode: Country): CountryRegulation | undefined {
    return regulations.find((r) => r.country === countryCode);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">국가별 규제 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] bg-muted/50">항목</TableHead>
                {countries.map((c) => (
                  <TableHead key={c.code} className="text-center min-w-[140px]">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="text-xs font-bold">{c.code}</span>
                      <span className="text-xs text-muted-foreground">
                        {c.label}
                      </span>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium bg-muted/50 text-sm">
                  규제 상태
                </TableCell>
                {countries.map((c) => {
                  const reg = getRegulation(c.code);
                  return (
                    <TableCell key={c.code} className="text-center">
                      {reg ? (
                        <StatusBadge status={reg.status} />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          정보 없음
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-muted/50 text-sm">
                  최대 농도
                </TableCell>
                {countries.map((c) => {
                  const reg = getRegulation(c.code);
                  return (
                    <TableCell
                      key={c.code}
                      className="text-center text-sm"
                    >
                      {reg?.maxConcentration || "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-muted/50 text-sm">
                  비고
                </TableCell>
                {countries.map((c) => {
                  const reg = getRegulation(c.code);
                  return (
                    <TableCell
                      key={c.code}
                      className="text-center text-xs text-muted-foreground"
                    >
                      {reg?.notes || "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell className="font-medium bg-muted/50 text-sm">
                  최종 업데이트
                </TableCell>
                {countries.map((c) => {
                  const reg = getRegulation(c.code);
                  return (
                    <TableCell
                      key={c.code}
                      className="text-center text-xs text-muted-foreground"
                    >
                      {reg?.lastUpdated || "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
