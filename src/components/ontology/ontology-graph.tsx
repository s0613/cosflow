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
import {
  FolderKanban,
  FileText,
  FlaskConical,
  ShieldCheck,
  Globe,
  BadgeCheck,
  Factory,
  ClipboardCheck,
  UserCircle,
  type LucideIcon,
} from "lucide-react";
import { ontologyNodes, ontologyEdges, OntologyEdge } from "@/data/ontology";
import { NodeDetailPanel } from "./node-detail-panel";

const NODE_ICONS: Record<string, LucideIcon> = {
  project: FolderKanban,
  request: FileText,
  ingredient: FlaskConical,
  regulation: ShieldCheck,
  country: Globe,
  certification: BadgeCheck,
  production: Factory,
  quality: ClipboardCheck,
  user: UserCircle,
};

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
    color: "#718096",
    y: 480,
  },
  {
    key: "L2",
    label: "Business Ontology",
    sub: "Objects · Relationships · Actions",
    color: "#285e61",
    y: 330,
  },
  {
    key: "L3",
    label: "AI Agent Actions",
    sub: "RAG · 자동화 · 의사결정",
    color: "#2c5282",
    y: 180,
  },
  {
    key: "L4",
    label: "Applications",
    sub: "웹 인터페이스 · 워크플로우",
    color: "#1e3a5f",
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
  // L1 — Data Integration (중앙 정렬)
  country:       { x: 260, y: 480 },
  // L2 — Business Ontology (균등 3열)
  ingredient:    { x:  60, y: 320 },
  regulation:    { x: 260, y: 320 },
  certification: { x: 460, y: 320 },
  // L3 — AI Agent Actions (균등 3열)
  request:       { x:  60, y: 170 },
  production:    { x: 260, y: 170 },
  quality:       { x: 460, y: 170 },
  // L4 — Applications (중앙 대칭)
  project:       { x: 150, y:  40 },
  user:          { x: 370, y:  40 },
};

// ── Node component ──────────────────────────────────────────────────────────
function OntologyNodeComponent({ id, data }: NodeProps) {
  const d = data as { label: string; color: string; selected: boolean };
  const Icon = NODE_ICONS[id] ?? Globe;
  return (
    <div
      id={`demo-node-${id}`}
      className="flex items-center justify-center rounded-full border-2 transition-all duration-200"
      style={{
        width: 52,
        height: 52,
        borderColor: d.selected ? d.color : `${d.color}60`,
        backgroundColor: d.selected ? d.color : "#f8fafc",
        boxShadow: d.selected
          ? `0 0 0 4px ${d.color}20, 0 4px 12px ${d.color}25`
          : `0 2px 6px rgba(0,0,0,0.08)`,
      }}
    >
      <Handle type="target" position={Position.Left}   style={{ background: d.color, width: 6, height: 6 }} />
      <Handle type="target" position={Position.Top}    style={{ background: d.color, width: 6, height: 6 }} />
      <Handle type="source" position={Position.Right}  style={{ background: d.color, width: 6, height: 6 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: d.color, width: 6, height: 6 }} />
      <Icon
        size={22}
        strokeWidth={1.8}
        style={{ color: d.selected ? "white" : d.color }}
      />
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
    markerEnd: { type: MarkerType.ArrowClosed, color: "#94a3b8" },
    style: { stroke: "#a0aec0", strokeWidth: 1 },
    labelStyle: { fontSize: 10, fill: "#4a5568", fontWeight: 500 },
    labelBgStyle: { fill: "#f7fafc", fillOpacity: 0.92 },
  }));
}

// ── Layer legend ─────────────────────────────────────────────────────────────
function LayerLegend() {
  return (
    <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm p-3 min-w-[200px]">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
        4-Layer Architecture
      </p>
      {[...LAYERS].reverse().map((layer) => (
        <div key={layer.key} className="flex items-start gap-2 mb-2">
          <div className="flex flex-col items-center gap-0.5 flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: layer.color }} />
            <span className="text-[9px] font-semibold text-slate-400">{layer.key}</span>
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-700">{layer.label}</div>
            <div className="text-[10px] text-slate-400 leading-snug">{layer.sub}</div>
          </div>
        </div>
      ))}
      <div className="border-t border-slate-200 pt-2 mt-1 text-[10px] text-slate-400">
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
          className="bg-slate-50/80"
        >
          <Background gap={24} size={0.8} color="#cbd5e0" />
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
