import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import AuthInput from "./AuthInput";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninSchema, SigninValues } from "@/types/auth.schema";
import router from "next/router";

function SigninForm({
  mode,
  setMode,
}: {
  mode: "signin" | "signup";
  setMode: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
}) {
  const signinMethods = useForm<SigninValues>({
    resolver: zodResolver(SigninSchema),
    defaultValues: { id: "", password: "" },
    mode: "onSubmit",
  });

  const [rememberId, setRememberId] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);

  const onSubmitSignin = signinMethods.handleSubmit(async (values) => {
    try {
      if (rememberId) localStorage.setItem("remembered_id", values.id);
      else localStorage.removeItem("remembered_id");
      // TODO: 로그인 API 연동
      await new Promise((r) => setTimeout(r, 600));
      router.replace("/");
    } catch (err) {
      // 오류 처리 UI가 필요하면 추가
    }
  });

  return (
    <div className="bg-[#FBF8EF] px-6 py-8 flex flex-col justify-center rounded-4xl z-10">
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

      <FormProvider {...signinMethods}>
        <form onSubmit={onSubmitSignin} className="space-y-4">
          <AuthInput
            name="id"
            label="아이디"
            placeholder="아이디"
            autoComplete="username"
          />

          <AuthInput
            name="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호"
            autoComplete="new-password"
          />

          <div className="flex items-center gap-6 pt-1 justify-center">
            <label className="flex items-center gap-2 text-neutral-700 text-sm">
              <input
                type="checkbox"
                className="accent-[#3E5329]"
                checked={rememberId}
                onChange={(e) => setRememberId(e.target.checked)}
              />
              아이디 저장하기
            </label>
            <label className="flex items-center gap-2 text-neutral-700 text-sm">
              <input
                type="checkbox"
                className="accent-[#3E5329]"
                checked={autoLogin}
                onChange={(e) => setAutoLogin(e.target.checked)}
              />
              자동 로그인
            </label>
          </div>

          <button
            type="submit"
            className="min-w-full sm:w-40 ml-auto block text-center text-base font-semibold px-6 py-2 rounded-xl bg-[#3E5329] text-white disabled:opacity-60 hover:bg-[#344823] transition-colors"
          >
            로그인
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

export default SigninForm;
