/* eslint-disable import/no-anonymous-default-export */
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

export default {
  //AUTH API
  authRegister(data) {
    console.log("run registration API.", data);
    return axios.post("rest-auth/registration/", data);
  },
  authLogin(data) {
    console.log("run login API.");
    return axios.post("rest-auth/login/", data);
  },
  authLogout() {
    console.log("run logout API.");
    return axios.post("rest-auth/logout/", null, tokenConfig());
  },
  getUsers() {
    return axios.get(`rest-auth/user/?${isProductionURL(BASE_URL)}`, tokenConfig());
  },

  getUser(pk) {
    return axios.get(`user/user/${pk}/?${isProductionURL(BASE_URL)}`, tokenConfig());
  },

  getDeers() {
    return axios.get(`user/deer/?${isProductionURL(BASE_URL)}`, tokenConfig());
  },

  getDeer(pk) {
    return axios.get(`user/deer/${pk}/?${isProductionURL(BASE_URL)}`, tokenConfig());
  },
  getUserdata(pk) {
    return axios.get(`user/user/?${isProductionURL(BASE_URL)}`, tokenConfig());
  },
};
