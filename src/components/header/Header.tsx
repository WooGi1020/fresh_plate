"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import SearchIcon from "@/icons/search_icon.svg";

import FilterIcon from "@/icons/filter_icon.svg";
import HeaderFilterPanel from "./HeaderFilterPanel";
import ResetIcon from "@/icons/return_icon.svg";

import { useSearchFilters } from "@/hooks/useSearchFilters";
import AuthButton from "./AuthButton";
import useMatchMedia from "@/hooks/useMatchMedia";

const Header = () => {
  const pathname = usePathname();
  const [showFilters, setShowFilters] = useState(false);
  const isPC = useMatchMedia("(min-width: 768px)", true);
  const { searchInput, setSearchInput, handleSearchKeyDown } =
    useSearchFilters();

  // 공통 래퍼 클래스: 크기/테두리/배경/패딩을 여기서 통일
  const searchShellClass =
    "group flex items-center gap-2 w-full max-w-[450px] min-w-[220px] " +
    "bg-white/90 border border-neutral-300 rounded-full px-4 py-2 " +
    "shadow-sm hover:shadow-md";

  return (
    <header
      className={`fixed inset-0 w-full h-[60px] flex justify-between items-center px-7 z-50 ${
        pathname == "/" ? "bg-[#FFFFFF]" : "bg-[#EAEEDB]"
      } shadow-md`}
    >
      <Link href="/" className="relative w-[66px] h-[45px]">
        <Image
          src="/images/home/small_logo.png"
          alt="홈 로고 링크 이미지"
          fill
          className="object-contain"
        />
      </Link>

      {/* 루트에서만 보이는 검색 유도 UI */}
      <div className="flex-1 flex justify-center px-4">
        {pathname === "/" && (
          <Link
            href="/search"
            aria-label="식당 검색 페이지로 이동"
            className={`${searchShellClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20`}
          >
            <SearchIcon width={18} height={18} />
            <span className="text-[14px] text-neutral-500 group-hover:text-neutral-700">
              지금 바로 찾아보세요!
            </span>
            <span className="ml-auto text-[12px] text-neutral-400 group-hover:text-neutral-600 max-md:hidden">
              검색하러 가기
            </span>
          </Link>
        )}

        {pathname === "/search" && (
          <div
            className={`${searchShellClass} focus-within:ring-2 focus-within:ring-neutral-900/20 relative`}
          >
            <SearchIcon width={18} height={18} />
            <input
              type="text"
              autoFocus={isPC}
              placeholder="지금 바로 찾아보세요!"
              className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-neutral-400 px-0 py-0"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button
              aria-label="필터 열기"
              title="필터 열기"
              onMouseDown={(e: React.MouseEvent) => {
                e.stopPropagation();
                setShowFilters((v) => !v);
              }}
              className="absolute right-8 rounded-full hover:bg-gray-200 p-2 cursor-pointer outline-none"
            >
              <FilterIcon width={16} height={16} className="text-neutral-600" />
            </button>
            <Link
              href="/search"
              title="검색어 초기화"
              aria-label="초기화"
              className="absolute right-2 rounded-full hover:bg-gray-200 p-2 cursor-pointer outline-none"
            >
              <ResetIcon width={14} height={14} className="text-neutral-600" />
            </Link>

            {showFilters && (
              <HeaderFilterPanel onClose={() => setShowFilters(false)} />
            )}
          </div>
        )}
      </div>

      {pathname !== "/sign" && <AuthButton />}
    </header>
  );
};

export default Header;
