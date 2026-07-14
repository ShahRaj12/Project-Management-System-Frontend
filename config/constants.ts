export const STORAGE_KEYS = {
  ACCESS_TOKEN: "auth_access_token",
  REFRESH_TOKEN: "auth_refresh_token",
  USER: "auth_user_data",
  THEME: "app_theme",
} as const;

export const ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
  MANAGER: "MANAGER",
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];

export const PERMISSIONS = {
  READ_DASHBOARD: "read:dashboard",
  MANAGE_USERS: "manage:users",
  MANAGE_SETTINGS: "manage:settings",
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    REFRESH: "/auth/refresh",
    LOGOUT: "/auth/logout",
  },
  USER: {
    PROFILE: "/users/profile",
    UPDATE: "/users/update",
  },
  PRODUCTS: {
    BASE: "/products",
    GET: (id: string) => `/products/${id}`,
  },
  ORDERS: {
    BASE: "/orders",
  },
  DASHBOARD: {
    STATS: "/dashboard/stats",
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
