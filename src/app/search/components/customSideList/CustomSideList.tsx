"use client";

import CustomSideListItem from "@/app/search/components/customSideList/CustomSideListItem";
import { Restaurant } from "@/types/restaurants.schema";

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

  return (
    <div
      className="absolute left-4 top-1/2 -translate-y-1/2 w-[360px] h-[640px] z-20
                 rounded-xl border border-neutral-200 bg-white/80 backdrop-blur-md shadow-2xl
                 p-4 space-y-3 overflow-y-auto scroll-box opacity-95 ring-1 ring-black/5"
    >
      {/* Header */}
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

      {/* Content */}
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
    </div>
  );
};

export default CustomSideList;
