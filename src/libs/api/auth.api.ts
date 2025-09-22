import { SigninValues, SignupValues } from "@/types/auth.schema";
import apiClient from "./apiClient";
import { useAuthStore } from "@/store/useAuthStore";

export const login = async (data: SigninValues) => {
  const res = await apiClient.post("/api/auth/login", data);
  const { accessToken, refreshToken, memberId, nickname } = res.data.data;
  useAuthStore
    .getState()
    .login({ nickname, memberId }, { accessToken, refreshToken });
};

export const register = async (data: SignupValues) => {
  const res = await apiClient.post("api/auth/register", data);
  const { accessToken, refreshToken, memberId, nickname } = res.data.data;
  useAuthStore
    .getState()
    .login({ nickname, memberId }, { accessToken, refreshToken });
  return res.data;
};
