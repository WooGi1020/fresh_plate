"use server";

import { serverApiClient } from "../api/serverApiClient";
import { onboardingSchema, FormValues } from "@/types/onBoard.schema";

export async function setOnboardingAction(_prevState: any, data: FormValues) {
  // validation
  const validated = onboardingSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await serverApiClient.post(
      "api/member/on-board",
      validated.data,
    );
    return {
      success: true,
      data: response,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "설정 저장에 실패했습니다.",
    };
  }
}
