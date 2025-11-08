import { Restaurant } from "@/types/restaurants.schema";
import CustomSideListItem from "./CustomSideListItem";

const CustomSideListContent = ({
  data,
  setSelectedId,
  map,
}: {
  data: Restaurant[];
  setSelectedId: (value: number | null) => void;
  map: kakao.maps.Map;
}) => {
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
