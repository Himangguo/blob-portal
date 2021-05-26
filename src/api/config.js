const devBaseUrl = "http://39.108.236.42:8001";
const proBaseUrl = "http://39.108.236.42:8001";
// 超时时间
const TIME_OUT = 5000; 
// baseUrl
const BASE_URL =
  process.env.NODE_ENV === "development" ? devBaseUrl : proBaseUrl;
export { TIME_OUT, BASE_URL };
