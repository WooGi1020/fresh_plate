"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import UserIcon from "@/icons/user_icon.svg";
import LoginIcon from "@/icons/login_icon.svg";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthButton() {
  const { isAuthed, user, logout, hasHydrated } = useAuthStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 외부 클릭 감지
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!hasHydrated) return null;

  if (!isAuthed) {
    return (
      <a href="/auth" className="flex items-center gap-1">
        <LoginIcon />
        <span className="hidden sm:inline text-[16px]">로그인</span>
      </a>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-neutral-200 flex items-center justify-center hover:ring-2 hover:ring-neutral-300 cursor-pointer"
      >
        <UserIcon className="size-full fill-neutral-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border bg-white shadow-lg p-4 z-50">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
              <UserIcon className="size-full fill-neutral-600" />
            </div>
            <div>
              <div className="text-sm font-medium">
                {user?.nickname ?? "사용자"}
              </div>
            </div>
          </div>

          <hr className="my-2" />

          <div className="flex flex-col gap-3 mt-3">
            <Link href="/mypage" className="text-sm hover:underline">
              마이페이지
            </Link>
            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="text-sm text-red-500 hover:underline text-left cursor-pointer"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
