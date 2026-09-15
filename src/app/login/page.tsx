"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { UserRole } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { CloudLightning, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login, register, loginWithGoogle, isLoading, error, clearError } = useAuthStore();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("NORMAL_USER");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMsg("");

    if (mode === "login") {
      const ok = await login({ email, username, password });
      if (ok) {
        setSuccessMsg("Signed in successfully! Redirecting...");
        setTimeout(() => router.push("/profile"), 600);
      }
    } else {
      const ok = await register({
        username: username || email.split("@")[0],
        email,
        password,
        role,
      });
      if (ok) {
        setSuccessMsg("Account created successfully! Redirecting...");
        setTimeout(() => router.push("/profile"), 600);
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center p-4">
      {/* Top Logo */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <Link href="/" className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md transition-transform hover:scale-105">
          <CloudLightning className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold tracking-tight text-foreground">
          {mode === "login" ? "Sign in to WeatherGPT" : "Create your WeatherGPT account"}
        </h1>
      </div>

      {/* Main Login Card - GitHub Style Minimalist Box */}
      <div className="w-full max-w-[340px] space-y-4">
        <div className="rounded-2xl border bg-card p-6 shadow-sm space-y-4">
          {/* Feedback Banners */}
          {error && (
            <div className="flex items-center gap-2 p-2.5 text-xs bg-destructive/10 text-destructive rounded-xl border border-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="leading-tight">{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-2.5 text-xs bg-emerald-500/10 text-emerald-600 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Google Button */}
          <Button
            type="button"
            variant="outline"
            onClick={loginWithGoogle}
            disabled={isLoading}
            className="w-full gap-2.5 text-xs font-semibold py-2.5 rounded-xl border bg-card hover:bg-muted"
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
            Sign in with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <span className="relative bg-card px-2 text-[11px] text-muted-foreground">
              or
            </span>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "register" && (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Username</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ritik"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Persona Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-xs rounded-xl border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  >
                    <option value="NORMAL_USER">General Citizen</option>
                    <option value="AGRICULTURE">Farmer / Agriculture</option>
                    <option value="AVIATION">Aviation / Pilot</option>
                    <option value="MARINE">Marine / Coastal</option>
                    <option value="RESEARCH">Researcher</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-medium text-foreground">Email address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">Password</label>
                {mode === "login" && (
                  <span className="text-[11px] text-primary hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl font-semibold text-xs mt-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : mode === "login" ? (
                "Sign in"
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </div>

        {/* GitHub Style Secondary Bottom Card */}
        <div className="rounded-2xl border bg-card p-4 text-center text-xs text-muted-foreground">
          {mode === "login" ? (
            <p>
              New to WeatherGPT?{" "}
              <button
                onClick={() => {
                  setMode("register");
                  clearError();
                }}
                className="text-primary font-semibold hover:underline"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setMode("login");
                  clearError();
                }}
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
