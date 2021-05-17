import axios from "axios";
import { tokenConfig } from "./TokenConfig";
const BASE_URL = (axios.defaults.baseURL = "http://styletier.com:8000/");
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
//"http://styletier.com:8000/"
//"http://127.0.0.1:8000/"
// OS에 환경 변수 설정 하기엔 오래 걸릴 것 같아서 위 BASE_URL의 값에 따라 파라미터를 리턴하는 함수를 구현함
const isProductionURL = (apiServerUrl) => {
  if (apiServerUrl === "http://127.0.0.1:8000/") {
    return "";
  } else {
    return "format=json";
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // product API
  getAllProduct() {
    console.log("run get all product API.");
    return axios.get(
      `product/product/?${isProductionURL(BASE_URL)}`,
      tokenConfig()
    );
  },
  createProduct(data) {
    console.log("run create product API.");
    return axios.post(
      `product/product/`,
      data,
      tokenConfig()
    );
  },
  updateProduct(data, id) {
    console.log("run update product API.");
    return axios.put(
      `product/product/${id}/`,
      data,
      tokenConfig()
    );
  },
  deleteProduct(id) {
    console.log("run delete product API.");
    return axios.delete(
      `product/product/${id}/`,
      tokenConfig()
    );
  },
  getProduct(id) {
    console.log("run get product API.");
    return axios.get(
      `product/product/${id}/?${isProductionURL(BASE_URL)}`,
      tokenConfig()
    );
  },
  getCategory() {
    return axios.get(`product/category/?${isProductionURL(BASE_URL)}`);
  },
  getCategoryProduct(id) {
    return axios.get(
      `product/product/?category_id=${id}&${isProductionURL(BASE_URL)}`
    );
  },
  getBestProduct() {
    return axios.get(
      `product/product/get_best_product/?${isProductionURL(BASE_URL)}`
    );
  },
  getNewProduct() {
    return axios.get(
      `product/product/get_new_product/?${isProductionURL(BASE_URL)}`
    );
  },
};