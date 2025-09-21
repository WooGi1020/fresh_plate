import { SigninValues, SignupValues } from "@/types/auth.schema";
import apiClient from "./apiClinet";

export const login = async (data: SigninValues) => {
  const res = await apiClient.post("api/auth/login", data);
  const accessToken = res.data.data.accessToken;
  if (accessToken) {
    localStorage.setItem("access_token", accessToken);
  }
  return res.data;
};

export const register = async (data: SignupValues) => {
  const res = await apiClient.post("api/auth/register", data);
  return res.data;
};
