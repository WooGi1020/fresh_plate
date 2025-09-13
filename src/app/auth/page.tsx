"use client";

import { useState } from "react";
import SigninForm from "./components/SigninForm";
import { Mode } from "@/types/auth.schema";
import SignupForm from "./components/SignupForm";
import SlideBanner from "./components/SlideBanner";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[#f0f0f0] px-4 py-10">
      <div className="w-full min-h-[550px] max-w-3xl grid grid-cols-1 md:grid-cols-2 rounded-4xl overflow-hidden shadow-md relative">
        {/* 중앙 상단 배경 */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-1/2 bg-[#3E5329] z-0"></div>
        {/* 중앙 하단 배경 */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] h-1/2 bg-[#FBF8EF] z-0"></div>
        <SlideBanner mode={mode} />

        {/* Right Form Panel */}
        <SignupForm mode={mode} setMode={setMode} />
        {/* Left Form Panel */}
        <SigninForm mode={mode} setMode={setMode} />
      </div>
    </section>
  );
}
