"use client";

import CustomSideListItem from "@/app/search/components/customSideList/CustomSideListItem";
import { Restaurant } from "@/types/restaurants.schema";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";

const SkeletonItem = () => (
  <div className="animate-pulse space-y-2 w-full">
    <div className="h-24 bg-neutral-300 rounded w-full" />
  </div>
);

const CustomSideList = ({
  initialData,
  setSelectedId,
  map,
  isLoading,
}: {
  initialData: Restaurant[];
  setSelectedId: (value: number | null) => void;
  map: kakao.maps.Map;
  isLoading: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [sortOption, setSortOption] = useState("기본");

  const sortedData = useMemo(() => {
    if (!initialData) return [];
    switch (sortOption) {
      case "추천":
        return [...initialData].sort((a, b) => {
          const aIsRecommended = a.recommended && !a.warning;
          const bIsRecommended = b.recommended && !b.warning;
          if (aIsRecommended && !bIsRecommended) return -1;
          if (!aIsRecommended && bIsRecommended) return 1;
          if (a.warning && !b.warning) return 1;
          if (!a.warning && b.warning) return -1;
          return 0;
        });
      case "비추천":
        return [...initialData].sort((a, b) => {
          if (a.warning && !b.warning) return -1;
          if (!a.warning && b.warning) return 1;
          return 0;
        });
      default:
        return initialData;
    }
  }, [initialData, sortOption]);

  const count = sortedData.length;

  const Header = (
    <div className="py-2 mb-1 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-2">
        <p className="relative pl-3 text-[13px] font-semibold tracking-tight text-neutral-800 select-none">
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded bg-gradient-to-b from-neutral-500 to-neutral-300"
            aria-hidden
          />
          장소 목록
        </p>
      </div>
      <select
        value={sortOption}
        onChange={(e) => {
          setSortOption(e.target.value);
          toast.success(`${e.target.value} 기준으로 정렬되었습니다.`);
        }}
        className="text-[12px] px-2 py-[3px] rounded border border-neutral-300 bg-white text-neutral-700 cursor-pointer focus:outline-none ml-auto"
      >
        <option value="기본">기본</option>
        <option value="추천">추천</option>
        <option value="비추천">비추천</option>
      </select>
      <span className="text-[11px] px-2 py-[3px] rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
        {count}곳
      </span>
    </div>
  );

  let Content;
  if (isLoading) {
    Content = (
      <div className="space-y-4 pt-4 w-full">
        {Array.from({ length: 5 }).map((_, idx) => (
          <SkeletonItem key={idx} />
        ))}
      </div>
    );
  } else if (count === 0) {
    Content = (
      <p className="text-center text-neutral-500 text-sm mt-10">
        검색 결과가 없습니다.
      </p>
    );
  } else {
    Content = (
      <div className="space-y-3 pt-2 px-1 scroll-box">
        {sortedData.map((restaurant, idx) => (
          <CustomSideListItem
            key={restaurant.id}
            restaurant={restaurant}
            setSelectedId={setSelectedId}
            map={map}
            index={idx}
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* ✅ Desktop Panel */}
      <div
        className="hidden md:flex flex-col absolute left-4 top-1/2 -translate-y-1/2
                   max-h-[80vh] max-w-[400px] z-20 rounded-xl border border-neutral-200
                   bg-white/80 backdrop-blur-md shadow-2xl p-4
                   overflow-hidden opacity-95 ring-1 ring-black/5"
      >
        {Header}
        {Content}
      </div>

      {/* ✅ Mobile Bottom Sheet */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-20
                    mx-auto w-full max-w-[720px]
                    flex flex-col
                    rounded-t-xl border border-neutral-200 bg-white/95 backdrop-blur-md shadow-2xl
                    ring-1 ring-black/5 transition-[height] duration-200 ease-out
                    ${expanded ? "h-[65vh]" : "h-[56px]"}`}
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
            className={`px-4 pb-2 flex items-center justify-between transition-colors
                        ${
                          expanded
                            ? "bg-transparent"
                            : "bg-white/60 backdrop-blur-sm"
                        }`}
          >
            <p className="relative pl-3 text-[13px] font-semibold tracking-tight text-neutral-800">
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600"
                aria-hidden
              />
              장소 목록
            </p>
            <select
              value={sortOption}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                setSortOption(e.target.value);
                toast.success(`${e.target.value} 기준으로 정렬되었습니다.`);
              }}
              className="text-[12px] px-2 py-[3px] rounded border border-neutral-300 bg-white text-neutral-700 cursor-pointer focus:outline-none ml-auto"
            >
              <option value="기본">기본</option>
              <option value="추천">추천</option>
              <option value="비추천">비추천</option>
            </select>
            <span className="text-[11px] px-2 py-[3px] rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
              {count}곳
            </span>
          </div>
        </button>

        {/* ✅ Scrollable content */}
        <div className="flex-1 overflow-y-auto px-4 min-h-0">
          <div className="mt-2 h-px bg-neutral-200" />
          <div className="pt-2 space-y-3">{Content}</div>
        </div>
      </div>
    </>
  );
};

export default CustomSideList;
