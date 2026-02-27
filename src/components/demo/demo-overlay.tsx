"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useDemoContext } from "@/context/demo-context";

interface SpotRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PADDING = 12;

export function DemoOverlay() {
  const { isPlaying, activeTarget, stepDescription, step, totalSteps } = useDemoContext();
  const [rect, setRect] = useState<SpotRect | null>(null);
  const [tooltipBelow, setTooltipBelow] = useState(true);
  const [visible, setVisible] = useState(false);

  // Virtual cursor
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [clicking, setClicking] = useState(false);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateRect = useCallback(() => {
    if (!activeTarget) { setRect(null); return; }
    const el = document.getElementById(activeTarget);
    if (!el) { setRect(null); return; }
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    setTooltipBelow(r.bottom < window.innerHeight - 180);
  }, [activeTarget]);

  // Scroll into view + track rect
  useEffect(() => {
    if (!isPlaying || !activeTarget) { setRect(null); return; }
    const el = document.getElementById(activeTarget);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = setTimeout(updateRect, 500);
    const interval = setInterval(updateRect, 250);
    return () => { clearTimeout(t); clearInterval(interval); };
  }, [isPlaying, activeTarget, updateRect]);

  // Move virtual cursor to target element center
  useEffect(() => {
    if (!isPlaying || !activeTarget) return;
    const move = () => {
      const el = document.getElementById(activeTarget);
      if (!el) return;
      const r = el.getBoundingClientRect();
      setCursorPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      // Click ripple after cursor arrives
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      clickTimerRef.current = setTimeout(() => {
        setClicking(true);
        setTimeout(() => setClicking(false), 700);
      }, 950);
    };
    const t = setTimeout(move, 100);
    return () => clearTimeout(t);
  }, [isPlaying, activeTarget]);

  // Fade in/out
  useEffect(() => {
    if (isPlaying) {
      const t = setTimeout(() => setVisible(true), 50);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
      setCursorPos({ x: -200, y: -200 });
    }
  }, [isPlaying]);

  if (!isPlaying) return null;

  const progress = totalSteps > 0 ? (step / totalSteps) * 100 : 0;

  // Tooltip position — center below/above the spotlight element
  const tooltipLeft = rect
    ? Math.max(12, Math.min(window.innerWidth - 316, rect.left + rect.width / 2 - 150))
    : window.innerWidth / 2 - 150;

  const tooltipTop = rect
    ? tooltipBelow
      ? rect.top + rect.height + PADDING + 14
      : rect.top - PADDING - 10
    : undefined;

  const sentences = stepDescription.split(/(?<=\.) /).filter(Boolean);

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-500"
      style={{ zIndex: 200, opacity: visible ? 1 : 0 }}
    >
      {/* Spotlight cutout */}
      {rect && (
        <div
          className="fixed pointer-events-none"
          style={{
            top: rect.top - PADDING,
            left: rect.left - PADDING,
            width: rect.width + PADDING * 2,
            height: rect.height + PADDING * 2,
            borderRadius: 14,
            zIndex: 201,
            boxShadow: `
              0 0 0 9999px rgba(10, 18, 40, 0.40),
              0 0 0 2px rgba(99, 165, 250, 0.9),
              0 0 24px rgba(99, 165, 250, 0.35)
            `,
            border: "2px solid rgba(99, 165, 250, 0.7)",
            animation: "demo-ring-pulse 2s ease-in-out infinite",
          }}
        />
      )}

      {/* Full dark overlay when no target */}
      {!rect && (
        <div
          className="fixed inset-0"
          style={{ background: "rgba(10, 18, 40, 0.30)", zIndex: 200 }}
        />
      )}

      {/* Tooltip card — only when element is spotlighted */}
      {rect && stepDescription && (
        <div
          className="fixed pointer-events-none transition-all duration-300"
          style={{
            zIndex: 9000,
            width: 300,
            left: tooltipLeft,
            ...(tooltipTop !== undefined ? { top: tooltipTop } : { bottom: 80 }),
          }}
        >
          <div className="bg-slate-900/97 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/60 p-4">
            <div className="flex gap-0.5 mb-2.5 overflow-hidden">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full flex-1 transition-all duration-500"
                  style={{
                    background:
                      i < step
                        ? "rgba(99,165,250,0.9)"
                        : i === step - 1
                        ? "rgba(99,165,250,0.55)"
                        : "rgba(100,116,139,0.35)",
                  }}
                />
              ))}
            </div>
            <p className="text-sm leading-relaxed text-slate-100">
              {sentences.map((s, i) => (
                <span key={i} className="block">{s}</span>
              ))}
            </p>
          </div>
        </div>
      )}

      {/* Bottom pill — only when no element is spotlighted */}
      {!rect && stepDescription && (
        <div
          className="fixed left-1/2 -translate-x-1/2 bottom-10 pointer-events-none"
          style={{ zIndex: 9000 }}
        >
          <div className="bg-slate-900/97 backdrop-blur-md text-white rounded-2xl px-5 py-3.5 shadow-2xl border border-slate-700/60 max-w-sm">
            <div className="flex items-start gap-2.5">
              <span
                className="size-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5"
                style={{ animation: "demo-dot-pulse 1.5s ease-in-out infinite" }}
              />
              <p className="text-sm leading-relaxed text-slate-100">
                {sentences.map((s, i) => (
                  <span key={i} className="block">{s}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Thin progress bar at very top */}
      <div
        className="fixed top-0 left-0 right-0 pointer-events-none"
        style={{ zIndex: 210, height: 3 }}
      >
        <div className="h-full bg-slate-800/40">
          <div
            className="h-full bg-blue-400 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Virtual mouse cursor */}
      {activeTarget && (
        <div
          className="fixed pointer-events-none"
          style={{
            zIndex: 9001,
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-4px, -4px)",
            transition: "left 0.9s cubic-bezier(0.25,0.46,0.45,0.94), top 0.9s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          {/* Click ripple */}
          {clicking && (
            <div
              className="absolute rounded-full border-2 border-blue-400"
              style={{
                width: 32,
                height: 32,
                top: -12,
                left: -12,
                animation: "demo-cursor-click 0.6s ease-out forwards",
              }}
            />
          )}
          {/* Cursor dot */}
          <div
            className="size-3 rounded-full bg-blue-400 shadow-lg"
            style={{ boxShadow: "0 0 0 3px rgba(99,165,250,0.3), 0 2px 8px rgba(0,0,0,0.4)" }}
          />
        </div>
      )}
    </div>
  );
}
