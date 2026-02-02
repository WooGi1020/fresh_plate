"use client";

import React, { useActionState, useEffect } from "react";
import Image from "next/image";
import AuthInput from "./AuthInput";
import { registerAction } from "@/libs/actions/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function SignupForm({
  mode,
  setMode,
}: {
  mode: "signin" | "signup";
  setMode: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
}) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [state, formAction, isPending] = useActionState(registerAction, null);

  useEffect(() => {
    if (state?.success && state.user) {
      login(state.user);
      toast.success("회원가입에 성공했습니다.");
      router.replace("/onboarding");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, login, router]);

  return (
    <div className="bg-[#FBF8EF] px-6 py-8 flex flex-col justify-center rounded-[35px] z-10 text-neutral-900">
      {/* Small Logo */}
      <div className="flex items-center justify-center mb-5">
        <div className="relative w-10 h-10">
          <Image
            src="/images/home/small_logo.png"
            alt="로고"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex items-center justify-center gap-5 text-sm">
        <button
          type="button"
          className={`font-semibold transition-colors ${
            mode === "signin"
              ? "text-[#3E5329] border-b border-[#3E5329]"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
          onClick={() => setMode("signin")}
          aria-pressed={mode === "signin"}
        >
          로그인
        </button>
        <button
          type="button"
          className={`font-semibold transition-colors ${
            mode === "signup"
              ? "text-[#3E5329] border-b border-[#3E5329]"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
          onClick={() => setMode("signup")}
          aria-pressed={mode === "signup"}
        >
          회원가입
        </button>
      </div>

      <form action={formAction} className="space-y-4">
        <AuthInput
          name="memberId"
          label="아이디"
          placeholder="아이디"
          autoComplete="username"
          error={state?.errors?.memberId?.[0]}
        />

        <AuthInput
          name="nickname"
          label="닉네임"
          placeholder="닉네임"
          autoComplete="nickname"
          error={state?.errors?.nickname?.[0]}
        />

        <AuthInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          autoComplete="new-password"
          error={state?.errors?.password?.[0]}
        />

        <AuthInput
          name="password2"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="new-password"
          error={state?.errors?.password2?.[0]}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-[#85A947] text-white rounded-md font-bold hover:bg-[#3E5329] transition-colors disabled:bg-neutral-300 disabled:cursor-not-allowed mt-2 cursor-pointer"
        >
          {isPending ? "처리 중..." : "회원가입"}
        </button>
      </form>
    </div>
  );
}
