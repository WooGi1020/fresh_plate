import React from "react";
import Image from "next/image";
import { Mode } from "@/types/auth.schema";

function SlideBanner({ mode }: { mode: Mode }) {
  return (
    <div
      className={`absolute top-0 w-1/2 h-full flex items-center justify-center bg-[#3E5329] transition-transform duration-400 z-20 rounded-[30px] ${
        mode === "signin" ? "translate-x-0 left-0" : "translate-x-full left-0"
      }`}
    >
      <Image
        src="/images/home/big_logo.png"
        alt="브랜드 로고"
        width={200}
        height={160}
        className="object-contain drop-shadow"
        priority
      />
    </div>
  );
}

export default SlideBanner;
