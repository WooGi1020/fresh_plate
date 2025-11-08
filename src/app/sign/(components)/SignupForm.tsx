"use client";

import React from "react";
import Image from "next/image";
import { SignupValues, SignupSchema } from "@/types/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import AuthInput from "./AuthInput";
import { register } from "@/libs/api/auth.api";
import z from "zod";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignupForm({
  mode,
  setMode,
}: {
  mode: "signin" | "signup";
  setMode: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
}) {
  const signupMethods = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { memberId: "", nickname: "", password: "", password2: "" },
    mode: "onSubmit",
  });
  const router = useRouter();

  const onSubmitSignup = signupMethods.handleSubmit(async (values) => {
    try {
      const { memberId, nickname, password } = values;
      const payload: SignupValues = { memberId, nickname, password };

      await register(payload);
      router.replace("/onboarding");
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "회원가입에 실패했습니다.");
      }
    }
  });

  return (
    <div className="bg-[#FBF8EF] px-6 py-8 flex flex-col justify-center rounded-[35px] z-10">
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

      <FormProvider {...signupMethods}>
        <form onSubmit={onSubmitSignup} className="space-y-4">
          <AuthInput
            name="memberId"
            label="아이디"
            placeholder="아이디"
            autoComplete="id"
          />

          <AuthInput
            name="nickname"
            label="닉네임"
            placeholder="닉네임"
            autoComplete="nickname"
          />
          <AuthInput
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            autoComplete="new-password"
          />
          <AuthInput
            name="password2"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인"
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="min-w-full sm:w-40 ml-auto block text-center text-base font-semibold px-6 py-2 rounded-xl bg-[#3E5329] text-white disabled:opacity-60 hover:bg-[#344823] transition-colors"
          >
            회원가입
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default SignupForm;
