import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_API_URL;

const API = axios.create({ baseURL });

API.interceptors.request.use(
  (config) => {
    config.headers["authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error?.status == 401) {
      localStorage.clear();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
