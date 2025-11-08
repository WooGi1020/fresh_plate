"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { Restaurant } from "@/types/restaurants.schema";
import CustomSideListHeader from "./CustomSideListHeader";
import CustomSideListContent from "./CustomSideListContent";
import { useMapStore } from "@/store/useMapStore";

export default function CustomSideList({
  initialData,
  map,
}: {
  initialData: Restaurant[];
  map: kakao.maps.Map;
}) {
  const [expanded, setExpanded] = useState(false);
  const [sortOption, setSortOption] = useState("기본");
  const user = useAuthStore((s) => s.user);
  const setSelectedId = useMapStore((s) => s.setSelectedId);

  const sortedData = useMemo(() => {
    if (!initialData) return [];
    const data = [...initialData];

    switch (sortOption) {
      case "추천":
        return data.sort((a, b) => {
          const aR = a.recommended && !a.warning;
          const bR = b.recommended && !b.warning;
          if (aR && !bR) return -1;
          if (!aR && bR) return 1;
          if (a.warning && !b.warning) return 1;
          if (!a.warning && b.warning) return -1;
          return 0;
        });
      case "별점":
        return data.sort((a, b) => {
          if (b.avgRating !== a.avgRating) {
            return (b.avgRating ?? 0) - (a.avgRating ?? 0);
          }
          return 0;
        });
      // case "최신화":
      //   return data.sort((a, b) => {
      //     const aDate = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      //     const bDate = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      //     return bDate - aDate;
      //   }
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
        ${expanded ? "h-[65vh]" : "h-14"}`}
      >
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full cursor-pointer select-none group shrink-0"
        >
          <div className="pt-2 pb-1">
            <div className="mx-auto h-1.5 w-10 rounded-full bg-neutral-300 group-hover:bg-neutral-400 transition-colors" />
          </div>

          <div
            className={`px-4 pb-2 flex items-center justify-between transition-colors ${
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
        </button>

        {/* ✅ Scrollable List */}
        <div className="flex-1 overflow-y-auto px-4 min-h-0">
          <div className="mt-2 h-px bg-neutral-200" />
          <div className="pt-2 space-y-3">
            <CustomSideListContent
              data={sortedData}
              setSelectedId={setSelectedId}
              map={map}
            />
          </div>
        </div>
      </div>
    </>
  );
}
