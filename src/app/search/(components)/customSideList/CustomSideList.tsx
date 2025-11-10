"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { Restaurant } from "@/types/restaurants.schema";
import CustomSideListHeader from "./CustomSideListHeader";
import CustomSideListContent from "./CustomSideListContent";
import { useMapStore } from "@/store/useMapStore";
import { useExpandedStore } from "@/store/useExpandedStore";
import ArrowDownIcon from "@/icons/arrow_down_icon.svg";

export default function CustomSideList({
  initialData,
  map,
}: {
  initialData: Restaurant[];
  map: kakao.maps.Map;
}) {
  const expanded = useExpandedStore((s) => s.expanded);
  const setExpanded = useExpandedStore((s) => s.setExpanded);
  const [sortOption, setSortOption] = useState("기본");
  const user = useAuthStore((s) => s.user);
  const setSelectedId = useMapStore((s) => s.setSelectedId);

  const sortedData = useMemo(() => {
    if (!initialData) return [];
    const data = [...initialData];

    switch (sortOption) {
      case "추천":
        return data.sort((a, b) => {
          const getPriority = (r: typeof a) => {
            // 알러지 위험이 있다면 가장 낮은 우선순위
            if (r.allergyLevel! >= 0) return 0;

            // 추천 + 안전
            if (r.recommended && !r.warning) return 3;

            // 추천 + 주의
            if (r.recommended) return 2;

            // 일반 (추천 X, 경고 X)
            if (!r.warning) return 1;

            // 경고 있음
            return 0;
          };

          return getPriority(b) - getPriority(a);
        });

      case "별점":
        return data.sort((a, b) => {
          if (b.avgRating !== a.avgRating) {
            return (b.avgRating ?? 0) - (a.avgRating ?? 0);
          }
          return 0;
        });
      case "최신화":
        return data.sort((a, b) => {
          const aDate = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const bDate = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return bDate - aDate;
        });
      default:
        return data;
    }
  }, [initialData, sortOption]);

  const handleSortChange = (value: string) => {
    setSortOption(value);
    toast.success(`${value} 기준으로 정렬되었습니다.`);
  };

  const count = sortedData.length;

  return (
    <>
      {/* ✅ Desktop */}
      <div
        className="hidden md:flex flex-col absolute left-4 top-1/2 -translate-y-1/2
        h-[80vh] w-[400px] z-20 rounded-xl border border-neutral-200 side-fade-in
        bg-white/80 backdrop-blur-md shadow-2xl p-4 overflow-hidden opacity-95 ring-1 ring-black/5"
      >
        <CustomSideListHeader
          count={count}
          sortOption={sortOption}
          onSortChange={handleSortChange}
          user={!!user}
        />
        <CustomSideListContent
          data={sortedData}
          setSelectedId={setSelectedId}
          map={map}
        />
      </div>

      {/* ✅ Mobile Bottom Sheet */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-20
        mx-auto w-full max-w-[720px] flex flex-col
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
            count={count}
            sortOption={sortOption}
            onSortChange={handleSortChange}
            user={!!user}
          />
        </div>

        {/* ✅ Scrollable List */}
        <div className="flex-1 overflow-y-auto px-4 min-h-0">
          <CustomSideListContent
            data={sortedData}
            setSelectedId={setSelectedId}
            map={map}
          />
        </div>
      </div>
    </>
  );
}
