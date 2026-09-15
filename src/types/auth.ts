export type UserRole = "NORMAL_USER" | "AGRICULTURE" | "AVIATION" | "MARINE" | "RESEARCH";

export interface UserProfile {
  id?: string;
  username: string;
  email: string;
  role: UserRole;
  homeLocation?: string;
  workLocation?: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  token: string;
  user: UserProfile;
  message?: string;
}

export interface LoginPayload {
  email?: string;
  username?: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role?: UserRole;
  homeLocation?: string;
  workLocation?: string;
}

export interface UpdatePasswordPayload {
  password: string;
}
