"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import UserIcon from "@/icons/user_icon.svg";
import LoginIcon from "@/icons/login_icon.svg";
import { useRouter } from "next/navigation";
import ProfileViewer from "./ProfileViewer";
import Link from "next/link";

export default function AuthButton() {
  const { isAuthed, user, hasHydrated } = useAuthStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      <Link href="/sign" className="flex items-center gap-1">
        <LoginIcon />
        <span className="hidden sm:inline text-[16px]">로그인</span>
      </Link>
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

      {open && <ProfileViewer user={user!} />}
    </div>
  );
}
