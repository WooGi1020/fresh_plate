import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (
    token &&
    config.headers &&
    config.url !== "/auth/login" &&
    config.url !== "/auth/register"
  ) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
