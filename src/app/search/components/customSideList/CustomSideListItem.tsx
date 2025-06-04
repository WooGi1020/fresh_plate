import StarRating from "@/app/search/components/customBalloon/StarRating";
import imageRenderList from "@/constants/image_render_list";
import Image from "next/image";
import { Restaurant } from "vegan";

import VeganIcon from "@/icons/vegan_icon.svg";
import AllegyIcon from "@/icons/allegy_icon.svg";
import GlutenIcon from "@/icons/gluten_free_icon.svg";

const CustomSideListItem = ({
  restaurant,
  setSelectedId,
  map,
}: {
  restaurant: Restaurant;
  setSelectedId: (value: string | null) => void;
  map: kakao.maps.Map;
}) => {
  const number = Math.floor(Math.random() * 4);

  return (
    <div
      className="flex gap-3 items-start bg-white rounded-lg border border-neutral-300 hover:shadow-md transition-shadow p-3 cursor-pointer"
      onClick={() => {
        setSelectedId(restaurant.id);
        map.panTo(new kakao.maps.LatLng(Number(restaurant.lat), Number(restaurant.lng)));
      }}
    >
      <div className="w-20 h-16 rounded-md overflow-hidden relative shrink-0 border border-neutral-400">
        <Image src={`${imageRenderList[number]}`} alt="식당 이미지" fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-[15px] font-semibold text-neutral-900 truncate max-w-[160px]" title={restaurant.name}>
          {restaurant.name}
        </h2>
        <p className="text-[11px] font-light truncate max-w-[180px]">{restaurant.address}</p>

        <div className="flex items-center gap-1 mt-1">
          <StarRating rating={3.5} />
          <span className="text-sm text-neutral-800">3.5</span>
          <span className="text-sm text-neutral-500">(4)</span>
        </div>

        <div className="flex gap-2 mt-2">
          <div title="비건 표시">
            <VeganIcon width={18} height={18} />
          </div>
          {restaurant.vegan_flags.includes("글루텐프리") && (
            <div title="글루텐프리 표시">
              <GlutenIcon width={18} height={18} />
            </div>
          )}
          <div title="알러지 반응 표시">
            <AllegyIcon width={18} height={18} fill="#85A947" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSideListItem;
