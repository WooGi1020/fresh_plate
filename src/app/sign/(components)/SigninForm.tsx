"use client";

import React, { useEffect, useState, useActionState } from "react";
import AuthInput from "./AuthInput";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginAction } from "@/libs/actions/auth";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

export default function SigninForm({
  mode,
  setMode,
}: {
  mode: "signin" | "signup";
  setMode: React.Dispatch<React.SetStateAction<"signin" | "signup">>;
}) {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [rememberId, setRememberId] = useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [rememberedId, setRememberedId] = useState("");

  const [state, formAction, isPending] = useActionState(loginAction, null);

  // 안전하게 클라이언트 마운트 후 저장된 아이디 주입
  useEffect(() => {
    if (typeof window === "undefined") return;
    const remembered = localStorage.getItem("remembered_id") || "";
    if (remembered) {
      setRememberedId(remembered);
    }
  }, []);

  useEffect(() => {
    if (state?.success && state.user) {
      login(state.user);
      toast.success("로그인에 성공했습니다.");
      router.replace(`/search`);
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, login, router]);

  const handleFormSubmit = (formData: FormData) => {
    const memberId = formData.get("memberId") as string;
    if (typeof window !== "undefined") {
      if (rememberId) localStorage.setItem("remembered_id", memberId);
      else localStorage.removeItem("remembered_id");
    }
    formAction(formData);
  };

  return (
    <div className="bg-[#FBF8EF] px-6 py-8 flex flex-col justify-center rounded-4xl z-10 text-neutral-900">
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

      <form action={handleFormSubmit} className="space-y-4">
        <AuthInput
          name="memberId"
          label="아이디"
          placeholder="아이디"
          autoComplete="username"
          defaultValue={rememberedId}
          error={state?.errors?.memberId?.[0]}
        />

        <AuthInput
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호"
          autoComplete="current-password"
          error={state?.errors?.password?.[0]}
        />

        <div className="flex items-center gap-6 pt-1 justify-center">
          <label className="flex items-center gap-2 text-neutral-700 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="accent-[#3E5329]"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)}
            />
            아이디 저장하기
          </label>
          <label className="flex items-center gap-2 text-neutral-700 text-sm cursor-pointer">
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
          disabled={isPending}
          className="min-w-full sm:w-40 ml-auto block text-center text-base font-semibold px-6 py-2 rounded-xl bg-[#3E5329] text-white disabled:opacity-60 hover:bg-[#344823] transition-colors cursor-pointer"
        >
          {isPending ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
