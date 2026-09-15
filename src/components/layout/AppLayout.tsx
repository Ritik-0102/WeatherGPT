"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { OfflineIndicator } from "@/components/ui/OfflineIndicator";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <OfflineIndicator />
        <Header />
        <main className="flex-1 pb-16 md:pb-0">
          <div className="h-full">{children}</div>
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
