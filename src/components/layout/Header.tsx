"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Globe, CloudLightning, Loader2, Navigation, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocationStore } from "@/stores/useLocationStore";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const router = useRouter();
  const { locationName, isLoading, fetchCurrentLocation } = useLocationStore();
  const { setLanguage } = useSettingsStore();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Try auto-fetching location on initial header mount if allowed
  useEffect(() => {
    fetchCurrentLocation();
  }, [fetchCurrentLocation]);

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CloudLightning className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">WeatherGPT</span>
        </div>

        {/* Location Selector Button (Desktop & Mobile) */}
        <button
          onClick={() => fetchCurrentLocation()}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs md:text-sm font-medium transition-all hover:bg-accent"
          title="Click to detect current location via GPS"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <Navigation className="h-4 w-4 text-primary" />
          )}
          <span className="max-w-[150px] md:max-w-[220px] truncate">{locationName}</span>
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="flex">
              <Globe className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("hi")}>हिन्दी (Hindi)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("pa")}>ਪੰਜਾਬੀ (Punjabi)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-destructive" />
        </Button>

        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                    {user.username ? user.username[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="truncate">{user.username}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            size="sm"
            onClick={() => router.push("/login")}
            className="rounded-full text-xs px-4"
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
