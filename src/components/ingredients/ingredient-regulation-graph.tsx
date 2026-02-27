"use client";

import { useMemo } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  MarkerType,
  Position,
  Handle,
  NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Ingredient } from "@/types/ingredient";

const statusColors: Record<string, string> = {
  허용: "#16a34a",
  제한: "#d97706",
  금지: "#dc2626",
  조건부허용: "#2563eb",
  미등록: "#9ca3af",
};

const countryPositions: Record<string, { x: number; y: number }> = {
  KR: { x: 320, y: 0 },
  CN: { x: 520, y: 130 },
  JP: { x: 440, y: 300 },
  EU: { x: 160, y: 300 },
  VN: { x: 80, y: 130 },
};

const countryFullNames: Record<string, string> = {
  KR: "대한민국",
  CN: "중국",
  JP: "일본",
  EU: "유럽연합",
  VN: "아세안",
};

function CenterNode({ data }: NodeProps) {
  const d = data as { label: string; sub: string };
  return (
    <div className="px-4 py-3 rounded-xl border-2 border-slate-400 bg-slate-800 text-white shadow-lg min-w-[130px] text-center">
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
      <div className="text-xs text-slate-400 mb-0.5 uppercase tracking-wider font-medium">성분</div>
      <div className="text-sm font-bold">{d.label}</div>
      <div className="text-xs text-slate-300 mt-0.5 font-mono">{d.sub}</div>
    </div>
  );
}

function CountryNode({ data }: NodeProps) {
  const d = data as {
    country: string;
    name: string;
    status: string;
    maxConcentration?: string | null;
    color: string;
  };
  return (
    <div
      className="px-3 py-2.5 rounded-xl border-2 shadow-md min-w-[100px] text-center"
      style={{ borderColor: d.color, backgroundColor: `${d.color}18` }}
    >
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Right} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Handle type="target" position={Position.Bottom} style={{ opacity: 0 }} />
      <div className="text-xs text-slate-500 font-medium">{d.name}</div>
      <div className="text-sm font-bold text-slate-800 mt-0.5">{d.country}</div>
      <div className="text-xs font-semibold mt-1" style={{ color: d.color }}>
        {d.status}
      </div>
      {d.maxConcentration && (
        <div className="text-xs text-slate-400 mt-0.5">최대 {d.maxConcentration}</div>
      )}
    </div>
  );
}

const nodeTypes = { ingredientCenter: CenterNode, countryReg: CountryNode };

interface Props {
  ingredient: Ingredient;
}

export function IngredientRegulationGraph({ ingredient }: Props) {
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [
      {
        id: "ingredient",
        type: "ingredientCenter",
        position: { x: 230, y: 145 },
        data: { label: ingredient.nameKo, sub: ingredient.inci },
      },
    ];

    const edges: Edge[] = [];

    ingredient.regulations.forEach((reg) => {
      const pos = countryPositions[reg.country] ?? { x: 0, y: 0 };
      const color = statusColors[reg.status] ?? "#9ca3af";

      nodes.push({
        id: `country-${reg.country}`,
        type: "countryReg",
        position: pos,
        data: {
          country: reg.country,
          name: countryFullNames[reg.country] ?? reg.country,
          status: reg.status,
          maxConcentration: reg.maxConcentration ?? null,
          color,
        },
      });

      edges.push({
        id: `edge-${reg.country}`,
        source: "ingredient",
        target: `country-${reg.country}`,
        style: { stroke: color, strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color },
        animated: reg.status === "금지",
        label: reg.status,
        labelStyle: { fontSize: 10, fill: color, fontWeight: 600 },
        labelBgStyle: { fill: "white", fillOpacity: 0.85 },
      });
    });

    return { nodes, edges };
  }, [ingredient]);

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div style={{ height: 340 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          zoomOnScroll={false}
          panOnDrag={true}
          nodesDraggable={true}
          className="bg-slate-50/70"
        >
          <Background gap={20} size={1} color="#e2e8f0" />
        </ReactFlow>
      </div>

      {/* Legend */}
      <div className="border-t border-border px-4 py-2.5 bg-white flex flex-wrap items-center gap-x-4 gap-y-1">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-1.5">
            <div className="size-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-xs text-muted-foreground">{status}</span>
          </div>
        ))}
        <span className="text-xs text-muted-foreground ml-auto">점선 = 금지 성분</span>
      </div>
    </div>
  );
}
