import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/constants";
import { LoginCredentials, RegisterCredentials, AuthResponse } from "@/types/auth";
import { ApiResponse } from "@/types/api";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post<ApiResponse<AuthResponse>>(API_ENDPOINTS.AUTH.REGISTER, credentials);
    return response.data;
  },

  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  logout: async (refreshToken: string): Promise<ApiResponse<void>> => {
    const response = await api.post<ApiResponse<void>>(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> => {
    const response = await api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return response.data;
  },
};
export default authService;
