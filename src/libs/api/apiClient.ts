import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
});

const useNoAccessTokenUrl = [
  "/api/auth/reissue",
  "/api/auth/login",
  "/api/auth/register",
];

apiClient.interceptors.request.use((config) => {
  if (!useNoAccessTokenUrl.includes(config.url!)) {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

// 401 응답 시 refresh 시도
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { refreshToken, logout, login, user } = useAuthStore.getState();

    if (error.response?.status === 401 && refreshToken) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reissue`,
          null,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        const { accessToken: newAccess } = res.data;

        login(user!, { accessToken: newAccess, refreshToken });

        error.config.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(error.config);
      } catch {
        logout();
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
