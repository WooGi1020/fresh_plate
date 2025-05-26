"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SearchIcon from "@/icons/search_icon.svg";
import CenterIcon from "@/icons/center_icon.svg";
import LoginIcon from "@/icons/login_icon.svg";
import EventIcon from "@/icons/event_icon.svg";

const Header = () => {
  const pathname = usePathname();

  return (
    <header
      className={`fixed inset-0 w-full h-[70px] flex justify-between items-center px-7 z-50 ${
        pathname == "/" ? "bg-[#FFFFFF]" : "bg-[#EAEEDB]"
      } shadow-md`}
    >
      <Link href="/" className="relative w-[88px] h-[65px]">
        <Image src="/images/home/small_logo.png" alt="홈 로고 링크 이미지" fill className="object-contain" />
      </Link>
      <div className="flex justify-evenly items-center max-w-[600px] w-full min-w-[200px]">
        <Link href="/search" className="flex items-center gap-1 p-1 hover:bg-[#504840]/10 rounded-md">
          <SearchIcon />
          <span className="text-[20px] sm:text-[20px] hidden sm:inline ">식당 찾기</span>
        </Link>
        <Link href="/search" className="flex items-center gap-1 p-1 hover:bg-[#504840]/10 rounded-md">
          <EventIcon />
          <span className="text-[20px] sm:text-[20px] hidden sm:inline ">My 혜택</span>
        </Link>
        <Link href="/search" className="flex items-center p-1 gap-1 hover:bg-[#504840]/10 rounded-md">
          <CenterIcon />
          <span className="text-[20px] sm:text-[20px] hidden sm:inline ">고객 센터</span>
        </Link>
      </div>
      <Link href="/login" className="flex items-center gap-1">
        <LoginIcon />
        <span className="text-[20px] sm:text-[20px] hidden sm:inline">Login</span>
      </Link>
    </header>
  );
};

export default Header;
