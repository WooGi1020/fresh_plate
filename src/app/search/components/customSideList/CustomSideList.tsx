"use client";

import CustomSideListItem from "@/app/search/components/customSideList/CustomSideListItem";
import { Restaurant } from "@/types/restaurants.schema";
import useMatchMedia from "@/hooks/useMatchMedia";
import { useState } from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-3 pt-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-3 items-start">
          <div className="w-24 h-20 rounded-md bg-neutral-200/70" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-neutral-200/70 rounded w-2/3" />
            <div className="h-3 bg-neutral-200/70 rounded w-1/2" />
            <div className="h-3 bg-neutral-200/70 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

const CustomSideList = ({
  initialData,
  setSelectedId,
  map,
  onOpenFilter,
}: {
  initialData: Restaurant[];
  setSelectedId: (value: number | null) => void;
  map: kakao.maps.Map;
  onOpenFilter?: () => void;
}) => {
  const count = initialData?.length ?? 0;
  const isMobile = useMatchMedia("(max-width: 768px)", false);
  const [expanded, setExpanded] = useState(false);

  const Header = (
    <div className="mb-2">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-neutral-800">장소 목록</p>
        <div className="flex items-center gap-2">
          {initialData != null && (
            <span className="text-[12px] text-neutral-500">{count}곳</span>
          )}
          {onOpenFilter && (
            <button
              type="button"
              onClick={onOpenFilter}
              className="rounded-md border border-neutral-200 px-2 py-1 text-[12px]
                         text-neutral-700 hover:bg-neutral-50"
              aria-label="필터 열기"
              title="필터 열기"
            >
              필터
            </button>
          )}
        </div>
      </div>
      <div className="mt-2 h-px bg-neutral-200" />
    </div>
  );

  const Content = (
    <>
      {initialData == null ? (
        <LoadingSkeleton />
      ) : count === 0 ? (
        <p className="text-center text-neutral-500 text-sm mt-10">
          검색 결과가 없습니다.
        </p>
      ) : (
        <div className="space-y-3 pt-2">
          {initialData.map((restaurant, idx) => (
            <CustomSideListItem
              key={restaurant.id}
              restaurant={restaurant}
              setSelectedId={setSelectedId}
              map={map}
              index={idx}
            />
          ))}
        </div>
      )}
    </>
  );

  if (!isMobile) {
    // Desktop: 기존 사이드 패널 유지
    return (
      <div
        className="absolute left-4 top-1/2 -translate-y-1/2 w-[360px] h-[640px] z-20
                   rounded-xl border border-neutral-200 bg-white/80 backdrop-blur-md shadow-2xl
                   p-4 space-y-3 overflow-y-auto scroll-box opacity-95 ring-1 ring-black/5"
      >
        {Header}
        {Content}
      </div>
    );
  }

  // Mobile: 하단 고정 바텀시트(뷰어 형태)
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-20
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
        className="w-full cursor-pointer select-none"
        aria-expanded={expanded}
        aria-controls="mobile-side-content"
      >
        <div className="pt-2 pb-2">
          <div className="mx-auto h-1.5 w-10 rounded-full bg-neutral-300" />
        </div>
        <div className="px-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-neutral-800">
              장소 목록
            </p>
            <div className="flex items-center gap-2">
              {initialData != null && (
                <span className="text-[12px] text-neutral-500">{count}곳</span>
              )}
              {onOpenFilter && (
                <span
                  className="rounded-md border border-neutral-200 px-2 py-1 text-[12px]
                             text-neutral-700 bg-white"
                >
                  필터
                </span>
              )}
            </div>
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
  );
};

export default CustomSideList;
