import api from "@/lib/axios";
import { ApiResponse, PaginatedResponse, PaginationParams } from "@/types/api";

export class BaseService<T> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(params?: PaginationParams): Promise<ApiResponse<T[] | PaginatedResponse<T>>> {
    const response = await api.get<ApiResponse<T[] | PaginatedResponse<T>>>(this.endpoint, { params });
    return response.data;
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    const response = await api.get<ApiResponse<T>>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data: Partial<T>): Promise<ApiResponse<T>> {
    const response = await api.post<ApiResponse<T>>(this.endpoint, data);
    return response.data;
  }

  async update(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    const response = await api.put<ApiResponse<T>>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    const response = await api.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
    return response.data;
  }
}
