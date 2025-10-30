import { Restaurant } from "@/types/restaurants.schema";
import CustomSideListItem from "./CustomSideListItem";

const SkeletonItem = () => (
  <div className="animate-pulse space-y-2 w-full">
    <div className="h-24 bg-neutral-300 rounded w-full" />
  </div>
);

const CustomSideListContent = ({
  data,
  isLoading,
  setSelectedId,
  map,
}: {
  data: Restaurant[];
  isLoading: boolean;
  setSelectedId: (value: number | null) => void;
  map: kakao.maps.Map;
}) => {
  if (isLoading)
    return (
      <div className="space-y-4 pt-4 w-full">
        {Array.from({ length: 6 }).map((_, idx) => (
          <SkeletonItem key={idx} />
        ))}
      </div>
    );

  if (data.length === 0)
    return (
      <p className="text-center text-neutral-500 text-sm mt-10">
        검색 결과가 없습니다.
      </p>
    );

  return (
    <div className="space-y-3 pt-2 px-1 scroll-box py-2">
      {data.map((restaurant, idx) => (
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
};

export default CustomSideListContent;
