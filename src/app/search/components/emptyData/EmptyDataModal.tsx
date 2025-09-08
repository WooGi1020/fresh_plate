"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function NoResultsModal() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/30 z-1000 flex items-center justify-center">
      <div className="bg-[#f7f3e9] border-[3px] border-[#3b3b3b] shadow-[2px_2px_15px_#504840] rounded-lg p-6 w-[320px] text-center font-serif animate-fadeInOut">
        <h2 className="text-xl text-[#3b3b3b] font-bold mb-3">검색 결과 없음</h2>
        <p className="text-sm text-[#5a5a5a]">
          조건에 맞는 음식점을 찾을 수 없어요..
          <br />
          다시 검색해주세요!
        </p>
      </div>
    </div>,
    document.getElementById("modal-container")!
  );
}
