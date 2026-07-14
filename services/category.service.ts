import { BaseService } from "./api";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
}

export class CategoryService extends BaseService<Category> {
  constructor() {
    super("/categories");
  }
}

export const categoryService = new CategoryService();
export default categoryService;
