import axios from "axios";
import { tokenConfig } from "./TokenConfig";

export default {
  callKakaoPayment(data) {
    return axios.post("order/kakao/", data, tokenConfig());
  },

  createCartItem(data) {
    return axios.post("order/cart/", data);
  },

  getUserCartItems(id) {
    return axios.get(`order/cart/?user_id=${id}`);
  },
  getUserOrderList(id) {
    return axios.get(`order/order/?user_id=${id}`);
  },

  deleteCartItem(id) {
    return axios.delete(`order/cart/${id}/`);
  },
  createOrder(data) {
    return axios.post("order/order/", data);
  },
  getOrder(id) {
    return axios.get(`order/order/${id}/`);
  },
  getPayAccess(data) {
    return axios.post("order/paySuccess/", data);
  },
  createAddress(data) {
    return axios.post("order/address/", data);
  },
  createDelivery(data) {
    return axios.post("order/delivery/", data);
  },
  updateDelivery(data, id) {
    return axios.put(`order/delivery/${id}/`, data);
  },
  updateOrder(data, id) {
    return axios.put(`order/order/${id}/`, data);
  },
  downQuantity(data) {
    return axios.post(`/product/product_amount/reduce_quantity/`, data);
  },
  deletePaymentCart(data) {
    return axios.post(`/order/cart/deletePayment/`, data);
  },
};
