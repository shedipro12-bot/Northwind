import { OrderModel } from "../models/order-model";
import { dal } from "../utils/dal";

class OrderService {

    public async getAllOrders(): Promise<OrderModel[]> {
        const sql = "select * from orders";
        const orders = await dal.execute(sql) as OrderModel[];
        return orders;
    }

    public async getOneOrder(id: number): Promise<OrderModel> {
        const sql = "select * from orders where id = ?";
        const values = [id];
        const orders = await dal.execute(sql, values) as OrderModel[];
        const order = orders[0];
        return order;
    }

    public async getOrdersByYear(year: number): Promise<OrderModel[]> {
        const sql = "select * from orders where year(orderDate) = ?";
        const values = [year];
        const orders = await dal.execute(sql, values) as OrderModel[];
        return orders;
    }

}

export const orderService = new OrderService();
