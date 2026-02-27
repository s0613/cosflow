"use client";

import { X } from "lucide-react";

const SAMPLE_ROWS = [
  { nameKo: "레티놀", inci: "RETINOL", cas: "68-26-8", amount: "0.3", category: "기능성" },
  { nameKo: "나이아신아마이드", inci: "NIACINAMIDE", cas: "98-92-0", amount: "5.0", category: "미백제" },
  { nameKo: "글리세린", inci: "GLYCERIN", cas: "56-81-5", amount: "10.0", category: "보습제" },
  { nameKo: "에탄올", inci: "ALCOHOL DENAT.", cas: "64-17-5", amount: "15.0", category: "용매" },
  { nameKo: "티타늄디옥사이드", inci: "TITANIUM DIOXIDE", cas: "13463-67-7", amount: "8.0", category: "차단제" },
  { nameKo: "향료", inci: "PARFUM", cas: "—", amount: "0.1", category: "향료" },
];

const COLUMNS = [
  { key: "nameKo", label: "성분명(한글)", note: "필수", colLetter: "A" },
  { key: "inci", label: "INCI명", note: "필수", colLetter: "B" },
  { key: "cas", label: "CAS번호", note: "선택", colLetter: "C" },
  { key: "amount", label: "함량(%)", note: "선택", colLetter: "D" },
  { key: "category", label: "카테고리", note: "선택", colLetter: "E" },
];

const TIPS = [
  { text: "INCI명 또는 CAS번호 중 하나만 있어도 자동 매칭됩니다", highlight: false },
  { text: "함량(%)이 있으면 규제 한도 초과 여부를 자동 검사합니다", highlight: false },
  { text: "첫 번째 행은 반드시 헤더(열 이름)여야 합니다", highlight: false },
  { text: ".xlsx / .xls / .csv 형식 모두 지원합니다", highlight: false },
];

interface ExcelPreviewModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExcelPreviewModal({ open, onClose }: ExcelPreviewModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        id="demo-excel-modal"
        className="bg-white w-full max-w-2xl mx-4 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Window chrome bar (Excel-like top) */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ background: "linear-gradient(90deg, #1e7145 0%, #217346 100%)" }}
        >
          <div className="flex items-center gap-3">
            {/* Excel icon area */}
            <div className="flex items-center justify-center size-8 rounded bg-white/15">
              <svg viewBox="0 0 24 24" className="size-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">성분분석서_2026Q1.xlsx</div>
              <div className="text-white/60 text-xs">Microsoft Excel — 성분 분석서 형식 안내</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors rounded p-0.5"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Ribbon bar (simplified) */}
        <div className="flex items-center gap-1 px-4 py-1.5 bg-[#f3f3f3] border-b border-[#d4d4d4] text-xs text-[#444]">
          {["홈", "삽입", "페이지 레이아웃", "수식", "데이터", "검토", "보기"].map((tab, i) => (
            <button
              key={tab}
              className={`px-2.5 py-1 rounded ${i === 0 ? "bg-white border border-[#c8c8c8] text-[#217346] font-semibold shadow-sm" : "hover:bg-white/80"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Formula bar */}
        <div className="flex items-center gap-2 px-3 py-1 bg-white border-b border-[#d4d4d4]">
          <div className="flex items-center justify-center w-14 h-6 border border-[#d4d4d4] rounded text-xs font-mono text-[#444] bg-[#f9f9f9]">
            A1
          </div>
          <div className="text-[#d4d4d4] text-sm">|</div>
          <div className="flex-1 h-6 border border-[#d4d4d4] rounded px-2 flex items-center text-xs font-mono text-[#444] bg-white">
            성분명(한글)
          </div>
        </div>

        {/* Spreadsheet */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs" style={{ fontFamily: "Calibri, sans-serif" }}>
            {/* Column letters row */}
            <thead>
              <tr>
                {/* Row number corner cell */}
                <td
                  className="w-8 border-r border-b border-[#d4d4d4] text-center select-none"
                  style={{ background: "#f3f3f3", minWidth: "32px" }}
                />
                {COLUMNS.map((col) => (
                  <td
                    key={col.colLetter}
                    className="px-2 py-1 border-r border-b border-[#d4d4d4] text-center font-medium select-none"
                    style={{
                      background: "#f3f3f3",
                      color: "#444",
                      minWidth: col.colLetter === "B" ? "160px" : col.colLetter === "A" ? "120px" : "90px",
                    }}
                  >
                    {col.colLetter}
                  </td>
                ))}
              </tr>
              {/* Header row (row 1) */}
              <tr>
                <td
                  className="px-2 py-1.5 border-r border-b border-[#d4d4d4] text-center text-[#888] select-none"
                  style={{ background: "#f3f3f3" }}
                >
                  1
                </td>
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className="px-2 py-1.5 border-r border-b border-[#d4d4d4] font-bold"
                    style={{ background: "#217346", color: "white" }}
                  >
                    {col.label}
                    <span
                      className="ml-1 text-[10px] font-normal"
                      style={{ color: col.note === "필수" ? "#ffd700" : "rgba(255,255,255,0.55)" }}
                    >
                      {col.note === "필수" ? "★" : "○"}
                    </span>
                  </td>
                ))}
              </tr>
            </thead>
            <tbody>
              {SAMPLE_ROWS.map((row, i) => (
                <tr
                  key={i}
                  style={{ background: i % 2 === 0 ? "white" : "#f7fbf9" }}
                >
                  {/* Row number */}
                  <td
                    className="px-2 py-1 border-r border-b border-[#d4d4d4] text-center text-[#888] select-none"
                    style={{ background: "#f3f3f3" }}
                  >
                    {i + 2}
                  </td>
                  <td className="px-2 py-1 border-r border-b border-[#d4d4d4] font-medium text-[#1a1a1a]">
                    {row.nameKo}
                  </td>
                  <td className="px-2 py-1 border-r border-b border-[#d4d4d4] font-mono text-[#333]">
                    {row.inci}
                  </td>
                  <td className="px-2 py-1 border-r border-b border-[#d4d4d4] font-mono text-[#555]">
                    {row.cas}
                  </td>
                  <td className="px-2 py-1 border-r border-b border-[#d4d4d4] text-center text-[#1a6a3a] font-medium">
                    {row.amount}
                  </td>
                  <td className="px-2 py-1 border-r border-b border-[#d4d4d4]">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#e8f5ee] text-[#1a6a3a]">
                      {row.category}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Ellipsis row */}
              <tr style={{ background: "#fafafa" }}>
                <td
                  className="px-2 py-1 border-r border-b border-[#d4d4d4] text-center text-[#bbb] select-none"
                  style={{ background: "#f3f3f3" }}
                >
                  …
                </td>
                {COLUMNS.map((col) => (
                  <td key={col.key} className="px-2 py-1 border-r border-b border-[#d4d4d4] text-[#ccc] text-center">
                    …
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sheet tabs */}
        <div className="flex items-end gap-0 px-3 border-t border-[#d4d4d4] bg-[#f3f3f3]">
          <div
            className="px-4 py-1.5 text-xs font-medium border-t-2 border-l border-r border-[#d4d4d4] rounded-t -mb-px bg-white"
            style={{ borderTopColor: "#217346", color: "#217346" }}
          >
            Sheet1
          </div>
          <div className="px-3 py-1.5 text-xs text-[#999] border-t border-r border-[#d4d4d4] rounded-t">
            Sheet2
          </div>
        </div>

        {/* Tips */}
        <div className="px-5 py-4 bg-white border-t border-border">
          <div className="flex items-center gap-1.5 mb-2 text-[#217346]">
            <svg className="size-3.5 fill-current" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span className="text-xs font-semibold">자동 분석 기능 안내</span>
          </div>
          <ul className="space-y-1.5">
            {TIPS.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#555]">
                <span className="mt-0.5 size-1.5 rounded-full bg-[#217346] flex-shrink-0" />
                {tip.text}
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#e8e8e8]">
            <span className="text-xs text-[#888]">★ 필수 &nbsp; ○ 선택</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-sm rounded font-medium text-white transition-colors"
              style={{ background: "#217346" }}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
