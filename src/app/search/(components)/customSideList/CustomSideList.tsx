"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Restaurant } from "@/types/restaurants.schema";
import CustomSideListHeader from "./CustomSideListHeader";
import CustomSideListContent from "./CustomSideListContent";
import { useExpandedStore } from "@/store/useExpandedStore";
import ArrowDownIcon from "@/icons/arrow_down_icon.svg";
import useSortedData from "@/hooks/useSortedData";

export default function CustomSideList({
  initialData,
}: {
  initialData: Restaurant[];
}) {
  const expanded = useExpandedStore((s) => s.expanded);
  const setExpanded = useExpandedStore((s) => s.setExpanded);
  const [sortOption, setSortOption] = useState("기본");
  const { sortedData, length } = useSortedData(initialData, sortOption);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    toast.success(`${value} 기준으로 정렬되었습니다.`);
  };

  return (
    <>
      {/* ✅ Desktop */}
      <div
        className="hidden md:flex flex-col absolute left-4 top-1/2 -translate-y-1/2
        h-[80vh] w-100 z-20 rounded-xl border border-neutral-200 side-fade-in
        bg-white/80 backdrop-blur-md shadow-2xl p-4 overflow-hidden opacity-95 ring-1 ring-black/5"
      >
        <CustomSideListHeader
          count={length}
          sortOption={sortOption}
          onSortChange={handleSortChange}
        />
        <CustomSideListContent data={sortedData} />
      </div>

      {/* ✅ Mobile Bottom Sheet */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-20
        mx-auto w-full max-w-180 flex flex-col
        rounded-t-xl border border-neutral-200 bg-white/95 backdrop-blur-md shadow-2xl
        ring-1 ring-black/5 transition-[height] duration-200 ease-out
        ${expanded ? "h-[65vh]" : "h-13"}`}
      >
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full py-2 cursor-pointer select-none group shrink-0 inline-flex justify-center items-center"
        >
          <ArrowDownIcon
            className={`size-10 transition-transform duration-200 ${
              expanded ? "" : "rotate-180"
            }`}
          />
        </button>

        <div
          className={`px-4 flex items-center justify-between transition-colors ${
            expanded ? "bg-transparent" : "bg-white/60 backdrop-blur-sm"
          }`}
        >
          <CustomSideListHeader
            count={length}
            sortOption={sortOption}
            onSortChange={handleSortChange}
          />
        </div>

        {/* ✅ Scrollable List */}
        <div className="flex-1 overflow-y-auto px-4 min-h-0">
          <CustomSideListContent data={sortedData} />
        </div>
      </div>
    </>
  );
}
