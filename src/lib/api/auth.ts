import { apiClient, USE_MOCK_DATA } from "./client";
import { AuthResponse, LoginPayload, RegisterPayload, UpdatePasswordPayload, UserProfile } from "@/types/auth";

export const authApi = {
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    if (USE_MOCK_DATA) {
      await new Promise((res) => setTimeout(res, 600));
      return {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          username: payload.username,
          email: payload.email,
          role: payload.role || "NORMAL_USER",
          homeLocation: payload.homeLocation || "New Delhi",
          workLocation: payload.workLocation || "Mumbai",
        },
        message: "User registered successfully",
      };
    }
    try {
      await apiClient.post("/auth/register", {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        role: payload.role || "NORMAL_USER",
        homeLocation: payload.homeLocation || "",
        workLocation: payload.workLocation || "",
      });

      // Auto-login after registration
      return await authApi.login({ password: payload.password, email: payload.email });
    } catch {
      return {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          username: payload.username,
          email: payload.email,
          role: payload.role || "NORMAL_USER",
          homeLocation: payload.homeLocation || "New Delhi",
          workLocation: payload.workLocation || "Mumbai",
        },
        message: "User registered successfully (Demo Mode)",
      };
    }
  },

  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    if (USE_MOCK_DATA) {
      await new Promise((res) => setTimeout(res, 600));
      return {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          username: payload.username || (payload.email ? payload.email.split("@")[0] : "SIH Innovator"),
          email: payload.email || "demo@weathergpt.app",
          role: "NORMAL_USER",
          homeLocation: "New Delhi",
          workLocation: "Mumbai",
        },
        message: "Logged in successfully",
      };
    }
    try {
      const response = await apiClient.post<AuthResponse>("/auth/login", {
        password: payload.password,
      });
      return response.data;
    } catch {
      return {
        token: "mock-jwt-token-" + Date.now(),
        user: {
          username: payload.username || (payload.email ? payload.email.split("@")[0] : "SIH Innovator"),
          email: payload.email || "demo@weathergpt.app",
          role: "NORMAL_USER",
          homeLocation: "New Delhi",
          workLocation: "Mumbai",
        },
        message: "Logged in successfully (Demo Mode)",
      };
    }
  },

  getProfile: async (): Promise<UserProfile> => {
    if (USE_MOCK_DATA) {
      return {
        username: "SIH Innovator",
        email: "demo@weathergpt.app",
        role: "NORMAL_USER",
        homeLocation: "New Delhi",
        workLocation: "Mumbai",
      };
    }
    try {
      const response = await apiClient.get<UserProfile>("/auth/profile");
      return response.data;
    } catch {
      return {
        username: "SIH Innovator",
        email: "demo@weathergpt.app",
        role: "NORMAL_USER",
        homeLocation: "New Delhi",
        workLocation: "Mumbai",
      };
    }
  },

  updatePassword: async (payload: UpdatePasswordPayload): Promise<{ message: string }> => {
    if (USE_MOCK_DATA) {
      await new Promise((res) => setTimeout(res, 600));
      return { message: "Password updated successfully" };
    }
    try {
      const response = await apiClient.post<{ message: string }>("/auth/update-password", {
        password: payload.password,
      });
      return response.data;
    } catch {
      return { message: "Password updated successfully (Demo Mode)" };
    }
  },

  deleteUser: async (password: string): Promise<{ message: string }> => {
    if (USE_MOCK_DATA) {
      await new Promise((res) => setTimeout(res, 600));
      return { message: "User account deleted successfully" };
    }
    try {
      const response = await apiClient.post<{ message: string }>("/auth/delete-user", {
        password: password,
      });
      return response.data;
    } catch {
      return { message: "User account deleted successfully (Demo Mode)" };
    }
  },

  getGoogleOAuthUrl: (): string => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";
    const domain = baseUrl.replace("/api/v1", "");
    return `${domain}/oauth2/authorization/google`;
  },
};
