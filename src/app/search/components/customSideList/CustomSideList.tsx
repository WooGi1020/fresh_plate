"use client";

import CustomSideListItem from "@/app/search/components/customSideList/CustomSideListItem";
import { Restaurant } from "vegan";

const CustomSideList = ({
  initialData,
  setSelectedId,
  map,
}: {
  initialData: Restaurant[];
  setSelectedId: (value: string | null) => void;
  map: kakao.maps.Map;
}) => {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-[350px] h-[600px] z-20 bg-neutral-50 rounded-xl border-2 border-neutral-900 p-4 space-y-3 overflow-y-auto scroll-box shadow-xl opacity-90 fade-in">
      {initialData == null ? (
        <>
          <div className="flex items-center w-full gap-2 my-2">
            <hr className="grow border-[1.5px] border-neutral-900" />
            <p className="whitespace-nowrap text-neutral-900 font-semibold">No List</p>
            <hr className="grow border-[1.5px] border-neutral-900" />
          </div>
          <p className="text-center text-neutral-600 mt-10">로딩 중...</p>
        </>
      ) : (
        <>
          <div className="flex items-center w-full gap-2 my-2">
            <hr className="grow border-[1.5px] border-neutral-900" />
            <p className="whitespace-nowrap text-neutral-900 font-semibold">List</p>
            <hr className="grow border-[1.5px] border-neutral-900" />
          </div>

          {initialData.length === 0 ? (
            <p className="text-center text-neutral-600">검색 결과가 없습니다.</p>
          ) : (
            initialData.map((restaurant) => (
              <CustomSideListItem key={restaurant.id} restaurant={restaurant} setSelectedId={setSelectedId} map={map} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default CustomSideList;
