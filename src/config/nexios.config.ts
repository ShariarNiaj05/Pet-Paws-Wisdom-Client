import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";

// Default configuration for Nexios
const defaultConfig: NexiosOptions = {
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Cookie: document.cookie,
  },
  credentials: "include",
  timeout: 10000,
  withCredentials: true,
};

const nexiosInstance = new Nexios(defaultConfig);

/* nexiosInstance.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];

  console.log("token on nexios interceptor", token);
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
}); */

nexiosInstance.interceptors.request.use((config) => {
  console.log("Request config:", config);
  return config;
});

export default nexiosInstance;
