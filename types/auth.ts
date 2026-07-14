import { User } from "./user";

export interface LoginCredentials {
  email: string;
  password?: string; // Optional depending on login method, but normally required
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  confirmPassword?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse extends ApiResponseData {
  user: User;
  tokens: AuthTokens;
}

export interface ApiResponseData {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
