import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { API_URL } from "@/config/env";
import { STORAGE_KEYS } from "@/config/constants";

// Extend AxiosRequestConfig to support retries
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Helper functions for token storage safely (SSR check)
const getCookie = (name: string): string | null => {
  if (typeof window === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
};

const setCookie = (name: string, value: string, days = 7) => {
  if (typeof window === "undefined") return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure`;
};

const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Request Interceptor: Attach Access Token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token: string | null = null;
    if (typeof window !== "undefined") {
      token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || getCookie(STORAGE_KEYS.ACCESS_TOKEN);
    }
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refreshing
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    if (
      error.response?.status === 401 && 
      originalRequest && 
      !originalRequest._retry && 
      originalRequest.url !== "/auth/refresh"
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = typeof window !== "undefined"
          ? localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) || getCookie(STORAGE_KEYS.REFRESH_TOKEN)
          : null;

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call the refresh API directly using axios to avoid cycle
        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
        const { accessToken, newRefreshToken } = response.data.data;

        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
          setCookie(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
          setCookie(STORAGE_KEYS.REFRESH_TOKEN, newRefreshToken);
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // Clear auth tokens and redirect if refresh fails
        if (typeof window !== "undefined") {
          localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
          localStorage.removeItem(STORAGE_KEYS.USER);
          deleteCookie(STORAGE_KEYS.ACCESS_TOKEN);
          deleteCookie(STORAGE_KEYS.REFRESH_TOKEN);
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export default api;
