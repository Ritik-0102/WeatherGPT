"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BOTTOM_NAV } from "@/constants/nav";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/80 px-2 pb-safe backdrop-blur-md md:hidden">
      {BOTTOM_NAV.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:text-foreground",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                isActive ? "bg-primary/10" : "bg-transparent"
              )}
            >
              <item.icon className="h-5 w-5" />
            </div>
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
