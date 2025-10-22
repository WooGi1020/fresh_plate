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
  const [sortOption, setSortOption] = useState("기본"); // 정렬 기준 상태

  // 정렬된 데이터 계산
  const sortedData = useMemo(() => {
    if (!initialData) return [];

    switch (sortOption) {
      case "추천":
        return [...initialData].sort((a, b) => {
          const aIsRecommended = a.recommended && !a.warning;
          const bIsRecommended = b.recommended && !b.warning;

          // 추천(true, no warning) 우선
          if (aIsRecommended && !bIsRecommended) return -1;
          if (!aIsRecommended && bIsRecommended) return 1;

          // 둘 다 추천 or 둘 다 비추천이 아닐 경우
          // warning이 true인 항목은 항상 하단으로
          if (a.warning && !b.warning) return 1;
          if (!a.warning && b.warning) return -1;

          return 0;
        });
      case "비추천":
        return [...initialData].sort((a, b) => {
          // warning이 true인 항목을 상단으로
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
    <div
      className="py-2 mb-1 flex items-center justify-between"
      role="region"
      aria-label={`장소 목록 헤더 (총 ${count}곳)`}
    >
      <div className="flex items-center gap-2">
        <p className="relative pl-3 text-[13px] font-semibold tracking-tight text-neutral-800 select-none">
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded bg-gradient-to-b from-neutral-500 bg-neutral-200 to-neutral-300"
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

      <div className="flex items-center gap-2">
        {sortedData && (
          <span
            className="text-[11px] px-2 py-[3px] rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200
                       shadow-[0_0_0_1px_rgba(255,255,255,0.6)_inset]"
          >
            {count}곳
          </span>
        )}
      </div>
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
      <div className="space-y-3 pt-2">
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
      {/* Desktop panel (>= md) */}
      <div
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 w-[360px] h-[640px] z-20
                   rounded-xl border border-neutral-200 bg-white/80 backdrop-blur-md shadow-2xl
                   p-4 space-y-3 overflow-y-auto scroll-box opacity-95 ring-1 ring-black/5"
      >
        {Header}
        {Content}
      </div>

      {/* Mobile bottom sheet (< md) */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-20
                    mx-auto w-full max-w-[720px]
                    rounded-t-xl border border-neutral-200 bg-white/95 backdrop-blur-md shadow-2xl
                    ring-1 ring-black/5 transition-[height] duration-200 ease-out
                    ${expanded ? "h-[65vh]" : "h-[56px]"}`}
        role="region"
        aria-label="장소 목록"
      >
        {/* drag handle + header */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full cursor-pointer select-none group"
          aria-expanded={expanded}
          aria-controls="mobile-side-content"
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
            <div className="flex items-center gap-2">
              <p className="relative pl-3 text-[13px] font-semibold tracking-tight text-neutral-800">
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-600"
                  aria-hidden
                />
                장소 목록
              </p>
            </div>
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
            <div className="flex items-center gap-2">
              {sortedData && (
                <span className="text-[11px] px-2 py-[3px] rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                  {count}곳
                </span>
              )}
            </div>
          </div>
        </button>

        {/* Content area */}
        <div
          id="mobile-side-content"
          className={`px-4 ${expanded ? "block" : "hidden"}`}
        >
          <div className="mt-2 h-px bg-neutral-200" />
          <div
            className="pt-2 space-y-3 overflow-y-auto"
            style={{ maxHeight: "calc(65vh - 56px)" }}
          >
            {Content}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomSideList;
