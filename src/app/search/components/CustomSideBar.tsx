"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import allergyFilterMap from "@/constants/allergyFilterMap";
import SearchIcon from "@/icons/search_icon.svg";
import AllegyIcon from "@/icons/allegy_icon.svg";
import FoodIcon from "@/icons/food_icon.svg";
import ReturnIcon from "@/icons/return_icon.svg";

const allergyKeys = Object.keys(allergyFilterMap) as (keyof typeof allergyFilterMap)[];

const defaultFilters: Record<string, string | boolean> = {
  q: "",
  location: false,
  lacto: false,
  ovo: false,
  glutenfree: false,
  ...Object.fromEntries(allergyKeys.map((key) => [key, false])),
};

type Filters = typeof defaultFilters;
type FilterKey = keyof Filters;

const parseSearchParams = (searchParams: ReturnType<typeof useSearchParams>): Filters => {
  const parsed: Filters = { ...defaultFilters };

  for (const key in defaultFilters) {
    const val = searchParams.get(key);
    if (val !== null) {
      parsed[key as FilterKey] = val === "true" ? true : val === "false" ? false : val;
    }
  }

  return parsed;
};

const CustomSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() => parseSearchParams(searchParams));
  const [searchInput, setSearchInput] = useState(filters.q as string);

  useEffect(() => {
    setFilters(parseSearchParams(searchParams));
  }, [searchParams]);

  const updateFilters = (key: FilterKey, value: string | boolean) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);

    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(updated)) {
      if (v !== false && v !== "") {
        params.set(k, String(v));
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const renderCheckbox = (key: FilterKey, label: string, colorClass?: string) => (
    <label className="flex items-center gap-2 text-gray-700" key={key}>
      <input
        type="checkbox"
        checked={filters[key] as boolean}
        onChange={(e) => updateFilters(key, e.target.checked)}
        className={colorClass ?? "accent-neutral-900"}
      />
      {label}
    </label>
  );

  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[240px] h-[520px] z-20 bg-[#CBD2A9] opacity-90 rounded-md border-2 border-neutral-900 p-5 space-y-4 fade-in">
      <div>
        <div className="flex items-center mb-2 text-[#333] justify-between">
          <div className="flex items-center gap-1">
            <SearchIcon width={20} height={20} />
            <span className="font-semibold">위치 검색</span>
          </div>
          <button
            title="지도 초기화"
            onClick={() => router.replace(`${pathname}`)}
            className="border-transparent hover:bg-neutral-900/10 rounded-md p-1"
          >
            <ReturnIcon fill="#504840" />
          </button>
        </div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const trimmed = searchInput.trim();
              if (trimmed === "") return;
              updateFilters("q", trimmed);
            }
          }}
          placeholder="장소, 주소 검색"
          className="w-full px-3 py-1.5 rounded-md border border-gray-300 text-[13px] placeholder-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
        />
      </div>

      {renderCheckbox("location", "현재 위치 사용")}

      <hr className="border-neutral-900 border-[1.5px]" />

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-neutral-900 font-semibold mb-3">
          <FoodIcon width={20} height={24} />
          음식 종류
        </div>
        {renderCheckbox("lacto", "락토")}
        {renderCheckbox("ovo", "오보")}
        {renderCheckbox("glutenfree", "글루텐프리")}
      </div>

      <hr className="border-neutral-900 border-[1.5px]" />

      <div className="space-y-2 overflow-y-auto max-h-[160px] pr-1 scroll-box">
        <div className="flex items-center gap-2 text-red-600 font-semibold mb-3">
          <AllegyIcon width={20} height={20} fill="#dc2626" />
          알레르기 필터
        </div>
        {allergyKeys.map((key) => renderCheckbox(key, `${allergyFilterMap[key]} 제외`, "accent-red-400"))}
      </div>
    </div>
  );
};

export default CustomSideBar;
