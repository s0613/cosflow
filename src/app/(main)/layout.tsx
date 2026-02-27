"use client";

import { useEffect, useRef } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { DemoWelcomeModal } from "@/components/demo/demo-welcome-modal";
import { useDemoContext } from "@/context/demo-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openWelcome, isPlaying } = useDemoContext();
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => { isPlayingRef.current = isPlaying; }, [isPlaying]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!isPlayingRef.current) openWelcome();
    }, 700);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
      <DemoWelcomeModal />
    </SidebarProvider>
  );
}
