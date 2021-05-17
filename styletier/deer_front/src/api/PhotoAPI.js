import axios from "axios";
import { tokenConfig } from "./TokenConfig";
const BASE_URL = (axios.defaults.baseURL = "http://styletier.com:8000/");
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
// "http://styletier.com:8000/"
// "http://127.0.0.1:8000/");

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
  getDeerPhoto() {
    console.log("run get all deerphoto API.");
    return axios.get(`product/deerphoto/?${isProductionURL(BASE_URL)}`);
  },

  // pid : product id
  getProductPhotoWithPID(pid) {
    return axios.get(
      `product/product_photo/?product_id=${pid}&${isProductionURL(BASE_URL)}`
    );
  },
};
