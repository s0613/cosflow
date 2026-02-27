"use client";

// ── MCP Crawling Visualization ────────────────────────────────────────────────
// 5개 MCP 서버에서 규제 정보 DB로 데이터가 흐르는 것을 시각화합니다.
// L1 Data Integration Layer: KR·CN·JP·EU·아세안 각국 규제기관 API 크롤링
// 출처: 업플로우 사업실적 보고서 — 식약처(KR), NMPA(CN), 후생노동성(JP), EU CPNP, 아세안 화장품 지침

const MCP_SERVERS = [
  { id: "KR", label: "식약처", desc: "식품의약품안전처", flag: "🇰🇷", color: "#3b82f6" },
  { id: "CN", label: "NMPA", desc: "国家药监局", flag: "🇨🇳", color: "#ef4444" },
  { id: "JP", label: "MHLW", desc: "후생노동성", flag: "🇯🇵", color: "#8b5cf6" },
  { id: "EU", label: "CPNP", desc: "EU CPNP", flag: "🇪🇺", color: "#10b981" },
  { id: "ASEAN", label: "ACD", desc: "아세안 화장품 지침", flag: "🌏", color: "#f59e0b" },
];

// Positions: pentagon centered at (150, 130), radius 88
const CX = 150;
const CY = 130;

// KR top, then clockwise
const SERVER_POSITIONS = [
  { x: 150,   y: 42   },  // KR  -90°
  { x: 234,   y: 103  },  // CN  -18°
  { x: 202,   y: 201  },  // JP   54°
  { x: 98,    y: 201  },  // EU  126°
  { x: 66,    y: 103  },  // VN  198°
];

// Animated packet dots — each server has 3 staggered packets
// using SVG <animateMotion> for smooth path travel
const PACKETS_PER_SERVER = 3;

export function McpCrawlingPanel() {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
        MCP 서버 실시간 크롤링
      </p>

      {/* Animated SVG diagram */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
      >
        <svg
          viewBox="0 0 300 260"
          className="w-full"
          style={{ display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid dots background */}
          {Array.from({ length: 8 }).map((_, row) =>
            Array.from({ length: 10 }).map((_, col) => (
              <circle
                key={`g-${row}-${col}`}
                cx={col * 33 + 15}
                cy={row * 33 + 15}
                r="1"
                fill="rgba(148,163,184,0.12)"
              />
            ))
          )}

          {/* Connection lines (dashed) */}
          {MCP_SERVERS.map((server, i) => {
            const pos = SERVER_POSITIONS[i];
            return (
              <line
                key={`line-${server.id}`}
                x1={pos.x}
                y1={pos.y}
                x2={CX}
                y2={CY}
                stroke={server.color}
                strokeWidth="1.2"
                strokeOpacity="0.25"
                strokeDasharray="5 4"
              />
            );
          })}

          {/* Animated data packets */}
          {MCP_SERVERS.map((server, i) => {
            const pos = SERVER_POSITIONS[i];
            const pathD = `M ${pos.x} ${pos.y} L ${CX} ${CY}`;
            const dur = 2.2 + i * 0.15;
            return Array.from({ length: PACKETS_PER_SERVER }).map((_, j) => {
              const delay = j * (dur / PACKETS_PER_SERVER) + i * 0.12;
              return (
                <g key={`pkt-${server.id}-${j}`}>
                  {/* Glow halo */}
                  <circle r="5" fill={server.color} opacity="0.2">
                    <animateMotion
                      dur={`${dur}s`}
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                      path={pathD}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.2;0.2;0"
                      keyTimes="0;0.15;0.85;1"
                      dur={`${dur}s`}
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  {/* Core dot */}
                  <circle r="2.5" fill={server.color}>
                    <animateMotion
                      dur={`${dur}s`}
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                      path={pathD}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.88;1"
                      dur={`${dur}s`}
                      begin={`${delay}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            });
          })}

          {/* MCP Server nodes */}
          {MCP_SERVERS.map((server, i) => {
            const pos = SERVER_POSITIONS[i];
            return (
              <g key={`node-${server.id}`}>
                {/* Outer glow ring */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="22"
                  fill="none"
                  stroke={server.color}
                  strokeWidth="1"
                  opacity="0.3"
                />
                {/* Main circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="18"
                  fill="#0f172a"
                  stroke={server.color}
                  strokeWidth="1.5"
                />
                {/* Flag */}
                <text
                  x={pos.x}
                  y={pos.y - 3}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="11"
                >
                  {server.flag}
                </text>
                {/* Agency code */}
                <text
                  x={pos.x}
                  y={pos.y + 9}
                  textAnchor="middle"
                  fill={server.color}
                  fontSize="7"
                  fontWeight="700"
                  letterSpacing="0.5"
                >
                  {server.label}
                </text>
                {/* Country ID label outside the node */}
                {(() => {
                  const lx = i === 1 ? pos.x + 28 : i === 4 ? pos.x - 28 : pos.x;
                  const ly = i === 0 ? pos.y - 26 : (i === 2 || i === 3) ? pos.y + 30 : pos.y - 8;
                  const anchor = i === 1 ? "start" : i === 4 ? "end" : "middle";
                  return (
                    <text
                      x={lx}
                      y={ly}
                      textAnchor={anchor}
                      fill="rgba(148,163,184,0.7)"
                      fontSize="8"
                      fontWeight="600"
                    >
                      {server.id}
                    </text>
                  );
                })()}
              </g>
            );
          })}

          {/* Central DB node */}
          {/* Pulse ring animation */}
          <circle cx={CX} cy={CY} r="28" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.3">
            <animate
              attributeName="r"
              values="28;42;28"
              dur="2.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.3;0;0.3"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </circle>
          {/* DB circle */}
          <circle cx={CX} cy={CY} r="28" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
          {/* DB icon lines */}
          <ellipse cx={CX} cy={CY - 8} rx="14" ry="5" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1={CX - 14} y1={CY - 8} x2={CX - 14} y2={CY + 4} stroke="#94a3b8" strokeWidth="1.2" />
          <line x1={CX + 14} y1={CY - 8} x2={CX + 14} y2={CY + 4} stroke="#94a3b8" strokeWidth="1.2" />
          <path
            d={`M ${CX - 14} ${CY + 4} Q ${CX} ${CY + 13} ${CX + 14} ${CY + 4}`}
            fill="none"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
          {/* DB label */}
          <text x={CX} y={CY + 22} textAnchor="middle" fill="rgba(148,163,184,0.9)" fontSize="8" fontWeight="600">
            규제정보 DB
          </text>
        </svg>
      </div>

      {/* MCP server list */}
      <div className="space-y-1.5">
        {MCP_SERVERS.map((server, i) => (
          <div key={server.id} className="flex items-center gap-2">
            <div
              className="size-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: server.color }}
            />
            <span className="text-[11px] font-medium text-foreground">
              {server.flag} {server.id}
            </span>
            <span className="text-[10px] text-muted-foreground">{server.label}</span>
            <span className="text-[9px] text-muted-foreground ml-1">— {server.desc}</span>
            <div className="ml-auto flex items-center gap-1">
              <div
                className="size-1.5 rounded-full"
                style={{
                  backgroundColor: server.color,
                  animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
              <span className="text-[9px] text-muted-foreground">크롤링 중</span>
            </div>
          </div>
        ))}
      </div>

      {/* LangChain RAG label */}
      <div className="flex items-center gap-1.5 pt-1 border-t border-border">
        <div className="size-1.5 rounded-full bg-primary" />
        <span className="text-[10px] text-muted-foreground">
          LangChain RAG → PostgreSQL + Pinecone 벡터 DB → Business Ontology Layer
        </span>
      </div>
    </div>
  );
}
