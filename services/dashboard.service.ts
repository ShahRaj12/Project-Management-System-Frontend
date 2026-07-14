import api from "@/lib/axios";
import { API_ENDPOINTS } from "@/config/constants";
import { DashboardData } from "@/types/dashboard";
import { ApiResponse } from "@/types/api";

export const dashboardService = {
  getDashboardData: async (): Promise<ApiResponse<DashboardData>> => {
    const response = await api.get<ApiResponse<DashboardData>>(API_ENDPOINTS.DASHBOARD.STATS);
    return response.data;
  },
};
export default dashboardService;
