"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterKey, Filters } from "vegan";

import allergyFilterMap from "@/constants/allergyFilterMap";
import { defaultFilters, allergyKeys } from "@/utils/defaultFilters";

import SearchIcon from "@/icons/search_icon.svg";
import AllegyIcon from "@/icons/allegy_icon.svg";
import FoodIcon from "@/icons/food_icon.svg";
import ReturnIcon from "@/icons/return_icon.svg";

type Props = {
  onClose?: () => void;
  className?: string;
};

const parseSearchParams = (
  searchParams: ReturnType<typeof useSearchParams>
): Filters => {
  const parsed: Filters = { ...defaultFilters };
  for (const key in defaultFilters) {
    const val = searchParams.get(key);
    if (val !== null) {
      parsed[key as FilterKey] =
        val === "true" ? true : val === "false" ? false : val;
    }
  }
  return parsed;
};

export default function HeaderFilterPanel({ onClose, className }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() =>
    parseSearchParams(searchParams)
  );
  const [searchInput, setSearchInput] = useState(filters.q as string);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const next = parseSearchParams(searchParams);
    setFilters(next);
    setSearchInput((prev) =>
      prev !== (next.q as string) ? (next.q as string) : prev
    );
  }, [searchParams]);

  const updateFilters = (key: FilterKey, value: string | boolean) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);

    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(updated)) {
      if (v !== false && v !== "") params.set(k, String(v));
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  // 바깥 클릭으로 닫기
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const renderCheckbox = (
    key: FilterKey,
    label: string,
    colorClass?: string
  ) => (
    <label className="flex items-center gap-2 text-[#3b3b3b]" key={key}>
      <input
        type="checkbox"
        checked={filters[key] as boolean}
        onChange={(e) => updateFilters(key, e.target.checked)}
        className={colorClass ?? "accent-[#3b3b3b]"}
      />
      {label}
    </label>
  );

  return (
    <div
      ref={containerRef}
      className={`absolute left-0 top-full mt-2 w-full z-[60]
                  rounded-lg border border-neutral-300 bg-white shadow-lg
                  p-4 space-y-4 ${className ?? ""} animate-fade-down`}
      role="dialog"
      aria-label="검색 필터"
    >
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#3b3b3b] font-semibold">
            <FoodIcon width={18} height={20} />
            <span className="text-md">재료 필터</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {renderCheckbox("lacto", "락토")}
            {renderCheckbox("ovo", "오보")}
            {renderCheckbox("glutenfree", "글루텐프리")}
          </div>
        </div>

        <hr className="border-t border-neutral-400 border-2" />

        <div className="space-y-2 max-h-[35vh] overflow-y-auto pr-1">
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <AllegyIcon width={18} height={18} fill="#dc2626" />
            <span className="text-md">알레르기 필터</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {allergyKeys.map((key) =>
              renderCheckbox(
                key,
                `${allergyFilterMap[key]} 제외`,
                "accent-red-600"
              )
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={() => {
              router.replace(`${pathname}`);
              onClose?.();
            }}
            className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50"
          >
            초기화
          </button>
          <button
            onClick={() => onClose?.()}
            className="text-sm px-3 py-1.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
