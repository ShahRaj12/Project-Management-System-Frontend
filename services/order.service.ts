import { BaseService } from "./api";
import { Order } from "@/types/common";

export class OrderService extends BaseService<Order> {
  constructor() {
    super("/orders");
  }
}

export const orderService = new OrderService();
export default orderService;
