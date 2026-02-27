"use client";

import { X } from "lucide-react";
import type { OntologyNode, OntologyEdge } from "@/data/ontology";
import { ontologyNodes } from "@/data/ontology";
import { ingredients } from "@/data/ingredients";
import { IngredientRegulationGraph } from "@/components/ingredients/ingredient-regulation-graph";
import { McpCrawlingPanel } from "./mcp-crawling-panel";

interface NodeDetailPanelProps {
  node: OntologyNode | null;
  edges: OntologyEdge[];
  onClose: () => void;
}

const statusColor: Record<string, string> = {
  허용: "bg-green-100 text-green-700",
  제한: "bg-amber-100 text-amber-700",
  금지: "bg-red-100 text-red-700",
  조건부허용: "bg-blue-100 text-blue-700",
  미등록: "bg-gray-100 text-gray-500",
};

// Show first 5 ingredients with summary stats
const SAMPLE_INGREDIENTS = ingredients.slice(0, 5);

function IngredientDetailSection() {
  return (
    <div className="space-y-4">
      {/* Regulation graph for first ingredient */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
          예시 — {SAMPLE_INGREDIENTS[0].nameKo} 규제 관계도
        </p>
        <IngredientRegulationGraph ingredient={SAMPLE_INGREDIENTS[0]} />
      </div>

      {/* Ingredient list */}
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          등록 성분 예시
        </p>
        <div className="space-y-2">
          {SAMPLE_INGREDIENTS.map((ing) => {
            const allowed = ing.regulations.filter((r) => r.status === "허용").length;
            const restricted = ing.regulations.filter(
              (r) => r.status === "제한" || r.status === "조건부허용"
            ).length;
            const banned = ing.regulations.filter((r) => r.status === "금지").length;
            return (
              <div
                key={ing.id}
                className="rounded-lg border border-border p-2.5 bg-muted/20 space-y-1.5"
              >
                <div className="flex items-start justify-between gap-1">
                  <div>
                    <div className="text-xs font-semibold text-foreground">{ing.nameKo}</div>
                    <div className="text-[10px] text-muted-foreground font-mono">{ing.inci}</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground flex-shrink-0">
                    {ing.category}
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-snug">{ing.description}</p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {allowed > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${statusColor["허용"]}`}>
                      허용 {allowed}개국
                    </span>
                  )}
                  {restricted > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${statusColor["제한"]}`}>
                      제한 {restricted}개국
                    </span>
                  )}
                  {banned > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${statusColor["금지"]}`}>
                      금지 {banned}개국
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function NodeDetailPanel({ node, edges, onClose }: NodeDetailPanelProps) {
  if (!node) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-6">
        <div className="text-4xl mb-3">🔍</div>
        <p className="text-sm">노드를 클릭하면<br />상세 정보가 표시됩니다</p>
      </div>
    );
  }

  const connectedEdges = edges.filter(
    (e) => e.source === node.id || e.target === node.id
  );

  const connectedNodes = connectedEdges.map((e) => {
    const otherId = e.source === node.id ? e.target : e.source;
    const otherNode = ontologyNodes.find((n) => n.id === otherId);
    const direction = e.source === node.id ? "→" : "←";
    return { node: otherNode, edge: e, direction };
  });

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div
            className="size-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: node.color }}
          />
          <h2 className="font-semibold text-base">{node.label}</h2>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">{node.description}</p>

      {/* Properties */}
      <div>
        <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          속성
        </h3>
        <div className="space-y-1.5">
          {node.properties.map((prop) => (
            <div key={prop.key} className="flex gap-2 text-sm">
              <span className="font-medium text-foreground/70 min-w-[80px] flex-shrink-0">
                {prop.key}
              </span>
              <span className="text-muted-foreground text-xs leading-5">{prop.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ingredient-specific: regulation graph + ingredient list */}
      {node.id === "ingredient" && <IngredientDetailSection />}

      {/* Regulation-specific: MCP crawling visualization */}
      {node.id === "regulation" && <McpCrawlingPanel />}

      {/* Connected nodes */}
      {connectedNodes.length > 0 && (
        <div>
          <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            연결된 노드
          </h3>
          <div className="space-y-1.5">
            {connectedNodes.map(({ node: other, edge, direction }) => (
              <div
                key={edge.id}
                className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50"
              >
                {other && (
                  <div
                    className="size-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: other.color }}
                  />
                )}
                <span className="text-muted-foreground">{direction}</span>
                <span className="font-medium">{other?.label}</span>
                <span className="text-xs text-muted-foreground ml-auto">{edge.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
