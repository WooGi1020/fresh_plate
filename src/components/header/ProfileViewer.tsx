import React from "react";
import { useAuthStore } from "@/store/useAuthStore";

import UserIcon from "@/icons/user_icon.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function ProfileViewer({
  user,
}: {
  user: { memberId: string; nickname: string };
}) {
  const { logout } = useAuthStore();
  const router = useRouter();

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

      <hr className="my-2" />

      <div className="flex flex-col gap-3 mt-3">
        <Link href="/mypage" className="text-sm hover:underline">
          마이페이지
        </Link>
        <button
          onClick={() => {
            logout();
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
