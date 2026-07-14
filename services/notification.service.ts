import { BaseService } from "./api";
import { Notification } from "@/types/common";
import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export class NotificationService extends BaseService<Notification> {
  constructor() {
    super("/notifications");
  }

  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    const response = await api.put<ApiResponse<Notification>>(`${this.endpoint}/${id}/read`);
    return response.data;
  }

  async markAllAsRead(): Promise<ApiResponse<void>> {
    const response = await api.put<ApiResponse<void>>(`${this.endpoint}/read-all`);
    return response.data;
  }
}

export const notificationService = new NotificationService();
export default notificationService;
