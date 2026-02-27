import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/context/demo-context";
import { DemoOverlay } from "@/components/demo/demo-overlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "COSFLOW - 화장품 규제 통합 관리 플랫폼",
  description: "화장품 원료 규제 검색, 인증 관리, 생산 프로세스 통합 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-geist-sans), 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif" }}
      >
        <DemoProvider>
          <DemoOverlay />
          {children}
        </DemoProvider>
      </body>
    </html>
  );
}
