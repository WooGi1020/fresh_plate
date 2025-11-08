import { SigninValues, SignupValues } from "@/types/auth.schema";
import apiClient from "./apiClient";
import { useAuthStore } from "@/store/useAuthStore";

const setCookie = (name: string, value: string, days = 1) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax`;
};

export const login = async (data: SigninValues) => {
  const res = await apiClient.post("/api/auth/login", data);
  const {
    accessToken,
    refreshToken,
    memberId,
    nickname,
    allergies,
    dietTypes,
  } = res.data.data;
  useAuthStore
    .getState()
    .login(
      { nickname, memberId, eatStyles: [...dietTypes, ...allergies] },
      { accessToken, refreshToken }
    );

  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
};

export const register = async (data: SignupValues) => {
  const res = await apiClient.post("api/auth/register", data);
  const { accessToken, refreshToken, memberId, nickname } = res.data.data;
  useAuthStore
    .getState()
    .login({ nickname, memberId }, { accessToken, refreshToken });

  setCookie("accessToken", accessToken);
  setCookie("refreshToken", refreshToken);
  setCookie("onboardingAllowed ", "true");
  return res.data;
};
