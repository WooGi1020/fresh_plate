import React, { useEffect, useRef } from "react";
import CloseIcon from "@/icons/close_icon.svg";

function Modal({
  setOpenFilter,
  children,
}: {
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenFilter(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpenFilter]);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenFilter]);

  return (
    <div className="fixed inset-0 bg-black/30 z-1000 flex items-center justify-center">
      <div
        className="bg-[#f7f3e9] border-[3px] border-[#3b3b3b]
                       shadow-[2px_2px_15px_#504840] rounded-lg p-4 sm:p-6
                       w-[360px] sm:w-[420px] max-w-[92vw]
                       max-h-[80vh] font-serif animate-fade-in relative"
        role="dialog"
        aria-modal="true"
        aria-label="필터"
        ref={modalRef}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg sm:text-xl text-[#3b3b3b] font-bold">
            원하는 조건을 선택하세요
          </h3>
          <button
            className="absolute text-2xl font-bold text-neutral-900 border-2 border-transparent hover:bg-neutral-300 cursor-pointer rounded-md p-1 top-2 right-2"
            onClick={() => setOpenFilter(false)}
          >
            <CloseIcon width={15} height={15} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
