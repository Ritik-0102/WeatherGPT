import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, LoginPayload, RegisterPayload, UpdatePasswordPayload } from "@/types/auth";
import { authApi } from "@/lib/api/auth";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (payload: LoginPayload) => Promise<boolean>;
  register: (payload: RegisterPayload) => Promise<boolean>;
  loginWithGoogle: () => void;
  fetchProfile: () => Promise<void>;
  updatePassword: (payload: UpdatePasswordPayload) => Promise<boolean>;
  deleteAccount: (password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (payload: LoginPayload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.login(payload);
          if (typeof window !== "undefined") {
            localStorage.setItem("weathergpt_auth_token", res.token);
          }
          set({
            token: res.token,
            user: res.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Failed to log in. Check password.";
          set({ error: message, isLoading: false });
          return false;
        }
      },

      register: async (payload: RegisterPayload) => {
        set({ isLoading: true, error: null });
        try {
          const res = await authApi.register(payload);
          if (typeof window !== "undefined") {
            localStorage.setItem("weathergpt_auth_token", res.token);
          }
          set({
            token: res.token,
            user: res.user,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Failed to create account.";
          set({ error: message, isLoading: false });
          return false;
        }
      },

      loginWithGoogle: () => {
        if (typeof window !== "undefined") {
          window.location.href = authApi.getGoogleOAuthUrl();
        }
      },

      fetchProfile: async () => {
        const { token } = get();
        if (!token) return;
        set({ isLoading: true });
        try {
          const profile = await authApi.getProfile();
          set({ user: profile, isAuthenticated: true, isLoading: false });
        } catch {
          set({ isLoading: false });
        }
      },

      updatePassword: async (payload: UpdatePasswordPayload) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.updatePassword(payload);
          set({ isLoading: false });
          return true;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Failed to update password.";
          set({ error: message, isLoading: false });
          return false;
        }
      },

      deleteAccount: async (password: string) => {
        set({ isLoading: true, error: null });
        try {
          await authApi.deleteUser(password);
          if (typeof window !== "undefined") {
            localStorage.removeItem("weathergpt_auth_token");
          }
          set({
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
          return true;
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Failed to delete account.";
          set({ error: message, isLoading: false });
          return false;
        }
      },

      logout: () => {
        if (typeof window !== "undefined") {
          localStorage.removeItem("weathergpt_auth_token");
        }
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "weathergpt_auth_store",
    }
  )
);
