"use client";

import { useCallback, useState, useEffect } from "react";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
  NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ontologyNodes, ontologyEdges, OntologyEdge } from "@/data/ontology";
import { NodeDetailPanel } from "./node-detail-panel";

// ── PDF 기반 4-Layer Architecture ────────────────────────────────────────────
// L4  Applications Layer       : 산업별 맞춤형 웹 인터페이스, 워크플로우 자동화
// L3  AI Agent Actions Layer   : 자동화 실행, 의사결정 지원, RAG 기반 응답 생성
// L2  Business Ontology Layer  : Objects · Relationships · Actions 모델링
// L1  Data Integration Layer   : 사내 시스템, 내부 문서, 외부 API 통합 연동

const LAYERS = [
  {
    key: "L1",
    label: "Data Integration",
    sub: "외부 API · 규제 DB",
    color: "#94a3b8",
    y: 480,
  },
  {
    key: "L2",
    label: "Business Ontology",
    sub: "Objects · Relationships · Actions",
    color: "#10b981",
    y: 330,
  },
  {
    key: "L3",
    label: "AI Agent Actions",
    sub: "RAG · 자동화 · 의사결정",
    color: "#3b82f6",
    y: 180,
  },
  {
    key: "L4",
    label: "Applications",
    sub: "웹 인터페이스 · 워크플로우",
    color: "#8b5cf6",
    y: 40,
  },
] as const;

const nodeLayer: Record<string, string> = {
  country:       "L1",  // 외부 규제 DB 소스
  ingredient:    "L2",  // 핵심 비즈니스 엔티티
  regulation:    "L2",  // 규제 관계 모델
  certification: "L2",  // 인증 관계 모델
  request:       "L3",  // AI 의뢰 자동화
  production:    "L3",  // AI 생산 자동화
  quality:       "L3",  // AI 품질 판정
  project:       "L4",  // 애플리케이션 대시보드
  user:          "L4",  // 사용자 인터페이스
};

const nodePositions: Record<string, { x: number; y: number }> = {
  // L1 — Data Integration
  country:       { x: 280, y: 480 },
  // L2 — Business Ontology
  ingredient:    { x:  60, y: 330 },
  regulation:    { x: 290, y: 330 },
  certification: { x: 530, y: 330 },
  // L3 — AI Agent Actions
  request:       { x:  60, y: 180 },
  production:    { x: 290, y: 180 },
  quality:       { x: 530, y: 180 },
  // L4 — Applications
  project:       { x: 160, y:  40 },
  user:          { x: 440, y:  40 },
};

// ── Node component ──────────────────────────────────────────────────────────
function OntologyNodeComponent({ id, data }: NodeProps) {
  const d = data as { label: string; color: string; selected: boolean };
  return (
    <div
      id={`demo-node-${id}`}
      className="px-4 py-3 rounded-xl border-2 shadow-md transition-all duration-300 min-w-[110px] text-center"
      style={{
        borderColor: d.color,
        backgroundColor: d.selected ? d.color : "white",
        color: d.selected ? "white" : "#1f2937",
        boxShadow: d.selected
          ? `0 0 0 4px ${d.color}40, 0 4px 12px ${d.color}30`
          : undefined,
      }}
    >
      <Handle type="target" position={Position.Left}   style={{ background: d.color }} />
      <Handle type="target" position={Position.Top}    style={{ background: d.color }} />
      <Handle type="source" position={Position.Right}  style={{ background: d.color }} />
      <Handle type="source" position={Position.Bottom} style={{ background: d.color }} />
      <div
        className="size-2.5 rounded-full mx-auto mb-1.5"
        style={{ backgroundColor: d.selected ? "white" : d.color }}
      />
      <div className="text-sm font-semibold">{d.label}</div>
    </div>
  );
}

const nodeTypes = { ontology: OntologyNodeComponent };

function toFlowNodes(selected: string | null): Node[] {
  return ontologyNodes.map((n) => ({
    id: n.id,
    type: "ontology",
    position: nodePositions[n.id] ?? { x: 0, y: 0 },
    data: { label: n.label, color: n.color, selected: n.id === selected },
  }));
}

function toFlowEdges(edgeDefs: OntologyEdge[]): Edge[] {
  return edgeDefs.map((e) => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    animated: false,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: "#94a3b8" },
    labelStyle: { fontSize: 10, fill: "#64748b" },
    labelBgStyle: { fill: "white", fillOpacity: 0.85 },
  }));
}

// ── Layer legend ─────────────────────────────────────────────────────────────
function LayerLegend() {
  return (
    <div className="bg-white/92 backdrop-blur-sm border border-border rounded-xl shadow-sm p-3 min-w-[200px]">
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
        4-Layer Architecture
      </p>
      {[...LAYERS].reverse().map((layer) => (
        <div key={layer.key} className="flex items-start gap-2 mb-2">
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0 mt-0.5">
            <div className="size-2.5 rounded-full" style={{ backgroundColor: layer.color }} />
            <span className="text-[9px] font-bold" style={{ color: layer.color }}>{layer.key}</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">{layer.label}</div>
            <div className="text-[10px] text-muted-foreground leading-snug">{layer.sub}</div>
          </div>
        </div>
      ))}
      <div className="border-t border-border pt-2 mt-1 text-[10px] text-muted-foreground">
        9 엔티티 · 9 관계
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function OntologyGraph() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(toFlowNodes(null));
  const [edges, , onEdgesChange] = useEdgesState(toFlowEdges(ontologyEdges));

  const selectedOntologyNode = selectedNodeId
    ? ontologyNodes.find((n) => n.id === selectedNodeId) ?? null
    : null;

  const selectNode = useCallback(
    (nodeId: string | null) => {
      setSelectedNodeId(nodeId);
      setNodes(toFlowNodes(nodeId));
    },
    [setNodes]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      selectNode(node.id === selectedNodeId ? null : node.id);
    },
    [selectedNodeId, selectNode]
  );

  const onPaneClick = useCallback(() => selectNode(null), [selectNode]);

  useEffect(() => {
    const handler = (e: Event) => {
      const type = (e.type as string).replace("demo:select-node:", "");
      selectNode(type);
    };
    const names = ontologyNodes.map((n) => `demo:select-node:${n.id}`);
    names.forEach((name) => window.addEventListener(name, handler));
    return () => names.forEach((name) => window.removeEventListener(name, handler));
  }, [selectNode]);

  return (
    <div
      id="demo-ontology-graph"
      className="flex h-[calc(100vh-200px)] min-h-[500px] gap-0 border border-border rounded-xl overflow-hidden"
    >
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.22 }}
          className="bg-muted/30"
        >
          <Background gap={20} size={1} color="#e2e8f0" />
          <Controls />
          <Panel position="top-left">
            <LayerLegend />
          </Panel>
        </ReactFlow>
      </div>

      <div id="demo-ontology-panel" className="w-80 border-l border-border bg-card flex-shrink-0">
        <NodeDetailPanel
          node={selectedOntologyNode}
          edges={ontologyEdges}
          onClose={() => selectNode(null)}
        />
      </div>
    </div>
  );
}
