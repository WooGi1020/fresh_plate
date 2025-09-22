import { SigninValues, SignupValues } from "@/types/auth.schema";
import apiClient from "./apiClinet";
import { useAuthStore } from "@/store/useAuthStore";

export const login = async (data: SigninValues) => {
  const res = await apiClient.post("/api/auth/login", data);
  const { accessToken, refreshToken } = res.data;
  const user = { nickname: "사용자", memberId: "test" };

  useAuthStore.getState().login(user, { accessToken, refreshToken });
};

export const register = async (data: SignupValues) => {
  const res = await apiClient.post("api/auth/register", data);
  return res.data;
};
