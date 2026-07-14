import { BaseService } from "./api";
import { Product } from "@/types/common";

export class ProductService extends BaseService<Product> {
  constructor() {
    super("/products");
  }
}

export const productService = new ProductService();
export default productService;
