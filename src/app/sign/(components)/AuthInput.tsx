"use client";

import React from "react";

type AuthInputProps = {
  name: string;
  label?: string;
  type?: "text" | "password" | "email" | "number";
  placeholder?: string;
  autoComplete?: string;
  className?: string; // 래퍼 div 클래스
  inputClassName?: string; // 인풋 추가 클래스
  error?: string; // 에러 메시지 직접 전달
  defaultValue?: string;
};

function AuthInput({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  className,
  inputClassName,
  error,
  defaultValue,
}: AuthInputProps) {
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
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        className={[
          "w-full h-10 px-3 rounded-md border bg-white shadow-sm outline-none text-sm",
          error
            ? "border-red-500 focus:ring-red-300 focus:border-red-500"
            : "border-neutral-300 focus:ring-[#3E5329]/40 focus:border-[#3E5329]",
          inputClassName ?? "",
        ].join(" ")}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default AuthInput;
