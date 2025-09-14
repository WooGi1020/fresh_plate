"use client";

import { useState, useEffect } from "react";
import SigninForm from "./components/SigninForm";
import { Mode } from "@/types/auth.schema";
import SignupForm from "./components/SignupForm";
import SlideBanner from "./components/SlideBanner";

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [isMdUp, setIsMdUp] = useState<boolean>(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMdUp(e.matches);

    // 초기값 설정
    handle(mql);

    if ("addEventListener" in mql) {
      mql.addEventListener("change", handle as EventListener);
    } else {
      (mql as any).addListener(handle);
    }

    return () => {
      if ("removeEventListener" in mql) {
        mql.removeEventListener("change", handle as EventListener);
      } else {
        (mql as any).removeListener(handle);
      }
    };
  }, []);

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[#f0f0f0] px-4 py-10 bg-[url('/images/bg2.png')] bg-cover ">
      <div className="w-full min-h-[550px] max-w-3xl grid grid-cols-1 md:grid-cols-2 rounded-4xl overflow-hidden shadow-md relative">
        {/* backgrounds */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-1/2 bg-[#3E5329] z-0"></div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[100px] h-1/2 bg-[#FBF8EF] z-0"></div>

        {isMdUp ? (
          <>
            <SlideBanner mode={mode} />
            <SignupForm mode={mode} setMode={setMode} />
            <SigninForm mode={mode} setMode={setMode} />
          </>
        ) : (
          /* md 이하: banner 숨기고 mode에 따라 실제로 한 컴포넌트만 렌더 */
          <>
            {mode === "signin" ? (
              <SigninForm mode={mode} setMode={setMode} />
            ) : (
              <SignupForm mode={mode} setMode={setMode} />
            )}
          </>
        )}
      </div>
    </section>
  );
}
