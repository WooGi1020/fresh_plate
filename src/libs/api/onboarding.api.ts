import { FormValues } from "@/types/onBoard.schema";
import apiClient from "./apiClinet";

export const setOnboarding = async (data: FormValues) => {
  const res = await apiClient.post("api/member/on-board", data);
  return res.data;
};
