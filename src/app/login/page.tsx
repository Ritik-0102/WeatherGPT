"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserRole } from "@/types/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CloudLightning, Lock, Mail, User, MapPin, Briefcase, ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const ROLES: { code: UserRole; label: string; desc: string }[] = [
  { code: "NORMAL_USER", label: "General Citizen", desc: "General weather, alerts & daily forecasts" },
  { code: "AGRICULTURE", label: "Agriculture & Farmer", desc: "Agro-meteorological crop insights" },
  { code: "AVIATION", label: "Aviation & Pilot", desc: "Wind shears, visibility & flight hazards" },
  { code: "MARINE", label: "Marine & Coastal", desc: "High tides, wave heights & maritime advisories" },
  { code: "RESEARCH", label: "Research & Climate", desc: "Multi-decadal historical climate analytics" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loginWithGoogle, isLoading, error, clearError } = useAuthStore();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("NORMAL_USER");
  const [homeLocation, setHomeLocation] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMsg("");

    if (mode === "login") {
      const ok = await login({ email, username, password });
      if (ok) {
        setSuccessMsg("Logged in successfully! Redirecting...");
        setTimeout(() => router.push("/profile"), 800);
      }
    } else {
      const ok = await register({
        username,
        email,
        password,
        role,
        homeLocation,
        workLocation,
      });
      if (ok) {
        setSuccessMsg("Account registered successfully! Redirecting...");
        setTimeout(() => router.push("/profile"), 800);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl border-muted">
        <CardHeader className="text-center space-y-2 pb-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
            <CloudLightning className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {mode === "login" ? "Welcome Back to WeatherGPT" : "Create WeatherGPT Account"}
          </CardTitle>
          <CardDescription className="text-xs max-w-sm mx-auto">
            {mode === "login"
              ? "Sign in to access personalized AI weather forecasts and emergency alert preferences."
              : "Register to unlock persona-based weather intelligence, severe alerts, and climate insights."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 rounded-xl bg-muted p-1 text-xs">
            <button
              onClick={() => {
                setMode("login");
                clearError();
              }}
              className={`py-2 font-semibold rounded-lg transition-all ${
                mode === "login" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode("register");
                clearError();
              }}
              className={`py-2 font-semibold rounded-lg transition-all ${
                mode === "register" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              Register
            </button>
          </div>

          {/* Feedback Banners */}
          {error && (
            <div className="flex items-center gap-2 p-3 text-xs bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 text-xs bg-emerald-500/10 text-emerald-600 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <Button
            type="button"
            variant="outline"
            onClick={loginWithGoogle}
            disabled={isLoading}
            className="w-full gap-2.5 text-xs font-semibold py-2.5 rounded-xl border bg-card hover:bg-accent"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Sign In with Google OAuth
          </Button>

          <div className="relative my-3 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <span className="relative bg-card px-2 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Or with User Credentials
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "register" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Username (3-20 chars)</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      minLength={3}
                      maxLength={20}
                      placeholder="e.g. ritik_sih"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-card focus:ring-2 focus:ring-primary/50 outline-none"
                    />
                  </div>
                </div>

                {/* Persona Role Selection */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Persona & Speciality Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-xs rounded-xl border bg-card focus:ring-2 focus:ring-primary/50 outline-none"
                  >
                    {ROLES.map((r) => (
                      <option key={r.code} value={r.code}>
                        {r.label} — {r.desc}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Home Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="e.g. New Delhi"
                        value={homeLocation}
                        onChange={(e) => setHomeLocation(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-card focus:ring-2 focus:ring-primary/50 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Work Location</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="e.g. Mumbai"
                        value={workLocation}
                        onChange={(e) => setWorkLocation(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-card focus:ring-2 focus:ring-primary/50 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-card focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Password (8-20 chars)</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={8}
                  maxLength={20}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border bg-card focus:ring-2 focus:ring-primary/50 outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl font-semibold text-xs mt-3"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Register Account"
              )}
            </Button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-[11px] text-muted-foreground hover:text-foreground underline">
              Return to WeatherGPT Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
