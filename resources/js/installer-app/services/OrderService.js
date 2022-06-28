import api from "../http";

export default class OrderService {
  static async getLastOrders() {
    return api.get('/orders/last');
  }

  static async getOrders() {
    return api.get('/orders');
  }

  static async getOrder(orderId) {
    return api.get(`/orders/${orderId}`);
  }

  static async updateOrder(orderId, status) {
    return api.post(`/orders/edit/${orderId}`, {
        status,
    });
  }
}