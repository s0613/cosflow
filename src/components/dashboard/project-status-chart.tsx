"use client";

import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { projects } from "@/data/projects";

const STATUS_COLORS: Record<string, string> = {
  "진행중": "#3b82f6",
  "완료": "#22c55e",
  "지연": "#ef4444",
  "대기": "#9ca3af",
  "중단": "#f97316",
};

export function ProjectStatusChart() {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      counts[p.status] = (counts[p.status] || 0) + 1;
    });

    return Object.entries(counts).map(([name, count]) => ({
      name,
      count,
      fill: STATUS_COLORS[name] || "#6b7280",
    }));
  }, []);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle className="text-base">프로젝트 상태별 현황</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="name" type="category" width={60} tick={{ fontSize: 13 }} />
              <Tooltip
                formatter={(value: number) => [`${value}건`, "프로젝트"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={28}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
