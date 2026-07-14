import { UserRole } from "@/config/constants";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileUpdateInput {
  name?: string;
  email?: string;
  avatarUrl?: string;
}
