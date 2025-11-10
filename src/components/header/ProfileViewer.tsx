import React, { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import UserIcon from "@/icons/user_icon.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMarkerStyleStore } from "@/store/useMarkerStyleStore";

function ProfileViewer({
  user,
  pathname,
}: {
  user: { memberId: string; nickname: string };
  pathname: string;
}) {
  const { logout } = useAuthStore();
  const router = useRouter();
  console.log("pathname in ProfileViewer:", pathname);

  const disableMarkerEffect = user
    ? useMarkerStyleStore((s) => s.isMarkerDisabled(user.nickname))
    : false;
  const toggleMarkerEffect = useMarkerStyleStore((s) => s.toggleMarkerEffect);

  return (
    <div className="absolute right-0 mt-2 w-64 rounded-lg border bg-white shadow-lg p-4 z-50">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
          <UserIcon className="size-full fill-neutral-600" />
        </div>
        <div>
          <div className="text-md font-medium">
            {user?.nickname ?? "사용자"}
          </div>
        </div>
      </div>

      <hr className="my-3" />

      {pathname === "/search" && (
        <>
          {/* 마커 효과 토글 */}
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-neutral-700">
              마커 글로시 효과 제거
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={disableMarkerEffect}
                onChange={() => user && toggleMarkerEffect(user.nickname)}
                className="sr-only"
              />
              <div
                className={`w-10 h-5 rounded-full transition-colors duration-300 ${
                  disableMarkerEffect ? "bg-yellow-800" : "bg-neutral-300"
                }`}
              ></div>
              <div
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
                  disableMarkerEffect ? "translate-x-5" : ""
                }`}
              ></div>
            </div>
          </label>

          <hr className="my-3" />
        </>
      )}

      <div className="flex flex-col gap-3">
        <Link href="/my-page" className="text-sm hover:underline">
          마이페이지
        </Link>
        <button
          onClick={() => {
            logout();
            document.cookie = "accessToken=; Path=/; Max-Age=0";
            document.cookie = "refreshToken=; Path=/; Max-Age=0";
            toast.error("로그아웃 되었습니다.");
            router.push("/");
          }}
          className="text-sm text-red-500 hover:underline text-left cursor-pointer"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default ProfileViewer;
