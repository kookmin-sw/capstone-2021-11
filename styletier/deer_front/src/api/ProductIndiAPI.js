import axios from "axios";
import { tokenConfig } from "./TokenConfig";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // product Indi API
  getAllProductIndi() {
    console.log("run get all product API.");
    return axios.get("product/deer_product/", tokenConfig());
  },
  createProductIndi(data) {
    console.log("run create product API.");
    return axios.post("product/deer_product/", data, tokenConfig());
  },
  updateProductIndi(data, id) {
    console.log("run update product API.");
    return axios.put(`product/deer_product/${id}/`, data, tokenConfig());
  },
  deleteProductIndi(id) {
    console.log("run delete product API.");
    return axios.delete(`product/deer_product/${id}/`, tokenConfig());
  },
  getProductIndi(id) {
    console.log("run get product API.");
    return axios.get(`product/deer_product/${id}/`, tokenConfig());
  },
  getProductIndiWithUser(id) {
    return axios.get(`product/deer_product/?user_id=${id}`, tokenConfig());
  },
};
