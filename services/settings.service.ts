import { BaseService } from "./api";
import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export interface SystemSettings {
  siteName: string;
  maintenanceMode: boolean;
  allowRegistrations: boolean;
  supportEmail: string;
}

export class SettingsService extends BaseService<SystemSettings> {
  constructor() {
    super("/settings");
  }

  async getSettings(): Promise<ApiResponse<SystemSettings>> {
    const response = await api.get<ApiResponse<SystemSettings>>("/settings");
    return response.data;
  }

  async updateSettings(data: Partial<SystemSettings>): Promise<ApiResponse<SystemSettings>> {
    const response = await api.put<ApiResponse<SystemSettings>>("/settings", data);
    return response.data;
  }
}

export const settingsService = new SettingsService();
export default settingsService;
