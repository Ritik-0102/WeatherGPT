"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Lock, Trash2, LogOut, CheckCircle2, AlertCircle, Loader2, MapPin, Briefcase, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updatePassword, deleteAccount, isLoading, error, clearError } = useAuthStore();

  const [password, setPassword] = useState("");
  const [deletePasswordConfirm, setDeletePasswordConfirm] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] p-4 text-center space-y-4">
        <User className="h-12 w-12 text-muted-foreground opacity-50" />
        <h2 className="text-xl font-bold">You are not signed in</h2>
        <p className="text-xs text-muted-foreground max-w-xs">
          Sign in or create an account to view profile settings, home/work locations, and persona preferences.
        </p>
        <Button size="sm" onClick={() => router.push("/login")} className="rounded-xl">
          Go to Sign In
        </Button>
      </div>
    );
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMsg("");

    const ok = await updatePassword({ password });
    if (ok) {
      setSuccessMsg("Password updated successfully!");
      setPassword("");
    }
  };

  const handleDeleteAccount = async () => {
    clearError();
    const ok = await deleteAccount(deletePasswordConfirm);
    if (ok) {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Account & Security</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage your credentials, persona speciality, and connected AI weather parameters.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1.5 text-xs text-destructive hover:bg-destructive/10">
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </div>

      {/* Profile Overview Card */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold">Profile Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">
                {user.username ? user.username[0].toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-foreground">{user.username}</h3>
                <Badge variant="secondary" className="text-[10px] gap-1">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  {user.role}
                </Badge>
              </div>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2 border-t">
            <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-xl">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-muted-foreground font-medium text-[10px]">HOME LOCATION</p>
                <p className="font-semibold text-foreground">{user.homeLocation || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-muted/40 p-3 rounded-xl">
              <Briefcase className="h-4 w-4 text-primary shrink-0" />
              <div>
                <p className="text-muted-foreground font-medium text-[10px]">WORK LOCATION</p>
                <p className="font-semibold text-foreground">{user.workLocation || "Not set"}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security: Update Password Form */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Lock className="h-4 w-4 text-primary" />
            Update Security Password
          </CardTitle>
          <CardDescription className="text-xs">
            Change your account password (8-20 characters) to secure your mobile app and web sessions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
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

          <form onSubmit={handleUpdatePassword} className="space-y-3 max-w-md">
            <div className="space-y-1 text-xs">
              <label className="font-medium text-foreground">New Password (8-20 characters)</label>
              <input
                type="password"
                required
                minLength={8}
                maxLength={20}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border bg-card focus:ring-2 focus:ring-primary/50 outline-none"
              />
            </div>

            <Button type="submit" disabled={isLoading} size="sm" className="rounded-xl text-xs gap-2">
              {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger Zone: Delete User Account */}
      <Card className="shadow-sm border-destructive/30 bg-destructive/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-destructive flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete Account (Danger Zone)
          </CardTitle>
          <CardDescription className="text-xs">
            Permanently delete your account, preferences, and saved weather history.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!confirmDelete ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setConfirmDelete(true)}
              className="rounded-xl text-xs gap-2"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Account
            </Button>
          ) : (
            <div className="space-y-3 p-3 bg-card rounded-xl border border-destructive/30 max-w-md">
              <p className="text-xs font-semibold text-destructive">
                Enter your password to confirm permanent account deletion:
              </p>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={deletePasswordConfirm}
                onChange={(e) => setDeletePasswordConfirm(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border bg-card outline-none"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteAccount}
                  disabled={isLoading || !deletePasswordConfirm}
                  className="rounded-xl text-xs gap-1.5"
                >
                  {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  Confirm Permanent Delete
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
