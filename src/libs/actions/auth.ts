"use server";

import { serverApiClient } from "../api/serverApiClient";
import { SigninSchema, SignupSchema } from "@/types/auth.schema";
import { cookies } from "next/headers";

export async function loginAction(_prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  // validation
  const validated = SigninSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const data = await serverApiClient.post("/api/auth/login", validated.data);
    const {
      accessToken,
      refreshToken,
      memberId,
      nickname,
      allergies,
      dietTypes,
    } = data;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 3600,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 604800,
    });

    return {
      success: true,
      user: {
        nickname,
        memberId,
        eatStyles: [...(dietTypes || []), ...(allergies || [])],
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "로그인에 실패했습니다.",
    };
  }
}

export async function registerAction(_prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());

  // validation
  const validated = SignupSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    const { memberId, nickname, password } = validated.data;
    const data = await serverApiClient.post("api/auth/register", {
      memberId,
      nickname,
      password,
    });

    const {
      accessToken,
      refreshToken,
      memberId: resId,
      nickname: resName,
    } = data;

    const cookieStore = await cookies();
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 3600,
    });
    cookieStore.set("refreshToken", refreshToken, {
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 604800,
    });
    cookieStore.set("onboardingAllowed", "true", {
      path: "/",
      sameSite: "lax",
    });

    return {
      success: true,
      user: { nickname: resName, memberId: resId },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "회원가입에 실패했습니다.",
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("onboardingAllowed");
}
