"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

type AuthInputProps = {
  name: string; // RHF 필드 이름
  label?: string; // 라벨(옵션)
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  autoComplete?: string;
  className?: string; // 래퍼 div 클래스
  inputClassName?: string; // 인풋 추가 클래스
};

function AuthInput({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  className,
  inputClassName,
}: AuthInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = (errors as any)?.[name]?.message as string | undefined;

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-xs font-medium text-neutral-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!errorMsg}
        {...register(name)}
        className={[
          "w-full h-10 px-3 rounded-md border bg-white shadow-sm outline-none text-sm",
          errorMsg
            ? "border-red-500 focus:ring-red-300 focus:border-red-500"
            : "border-neutral-300 focus:ring-[#3E5329]/40 focus:border-[#3E5329]",
          inputClassName ?? "",
        ].join(" ")}
      />
      {errorMsg && <p className="mt-1 text-xs text-red-600">{errorMsg}</p>}
    </div>
  );
}

export default AuthInput;
