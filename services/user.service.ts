import { BaseService } from "./api";
import { User, UserProfileUpdateInput } from "@/types/user";
import api from "@/lib/axios";
import { ApiResponse } from "@/types/api";

export class UserService extends BaseService<User> {
  constructor() {
    super("/users");
  }

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get<ApiResponse<User>>("/users/profile");
    return response.data;
  }

  async updateProfile(data: UserProfileUpdateInput): Promise<ApiResponse<User>> {
    const response = await api.put<ApiResponse<User>>("/users/profile", data);
    return response.data;
  }
}

export const userService = new UserService();
export default userService;
