import { Nexios } from "nexios-http";
import { NexiosOptions } from "nexios-http/types/interfaces";

// Default configuration for Nexios
const defaultConfig: NexiosOptions = {
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
    // Accept: "application/json",
  },
  credentials: "include",
  timeout: 10000,
  withCredentials: true,
};

const nexiosInstance = new Nexios(defaultConfig);

if (typeof window !== "undefined") {
  nexiosInstance.interceptors.request.use((config) => {
    // Get accessToken from document.cookies (on client-side)
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `${token}`;
    }

    return config;
  });
}

export default nexiosInstance;
