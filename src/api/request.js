import axios from "axios";
import { TIME_OUT, BASE_URL } from "./config";
import { message } from "antd";
// 创建请求实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = process.env.REACT_APP_TOKEN;
    return config;
  },
  (error) => {
    console.error(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (config) => {
    return config.data;
  },
  (err) => {
    if (err && err.response) {
      console.error(err.response.data);
      message.error(err.response.data);
    }
  }
);

export default instance;
