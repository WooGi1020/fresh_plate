"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "@/icons/close_icon.svg";

function Modal({
  setOpenFilter,
  children,
}: {
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenFilter(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setOpenFilter]);

  // 마운트 후에만 포털 렌더
  useEffect(() => setIsMounted(true), []);

  const container =
    typeof document !== "undefined"
      ? document.getElementById("modal-container")
      : null;

  if (!isMounted || !container) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/30 z-1000 flex items-center justify-center"
      // 오버레이 클릭 시 닫기
      onMouseDown={() => setOpenFilter(false)}
      role="presentation"
    >
      <div
        className="bg-[#f7f3e9] border-[3px] border-[#3b3b3b]
                   shadow-[2px_2px_15px_#504840] rounded-lg p-4 sm:p-6
                   w-[360px] sm:w-[420px] max-w-[92vw]
                   max-h-[80vh] font-serif animate-fade-in relative"
        role="dialog"
        aria-modal="true"
        aria-label="필터"
        ref={modalRef}
        // 내용 클릭은 전파 중단해 오버레이 닫힘 방지
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <button
            className="absolute text-2xl font-bold text-neutral-900 border-2 border-transparent hover:bg-neutral-300 cursor-pointer rounded-md p-1 top-2 right-2"
            onClick={() => setOpenFilter(false)}
            aria-label="닫기"
          >
            <CloseIcon width={15} height={15} />
          </button>
        </div>
        {children}
      </div>
    </div>,
    container
  );
}

export default Modal;
