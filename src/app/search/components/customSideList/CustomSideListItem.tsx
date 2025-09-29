import StarRating from "@/app/search/components/customBalloon/StarRating";
import imageRenderList from "@/constants/image_render_list";
import Image from "next/image";
import { Restaurant } from "@/types/restaurants.schema";

import LacToIcon from "@/icons/lacto_icon.svg";
import OvoIcon from "@/icons/ovo_icon.svg";
import GlutenIcon from "@/icons/gluten_free_icon.svg";
import TrustScore from "@/components/common/TrustScore";
import customOffsetMarkerPosition from "@/libs/map/customOffsetMarkerPosition";

const CustomSideListItem = ({
  restaurant,
  setSelectedId,
  map,
  index,
}: {
  restaurant: Restaurant;
  setSelectedId: (value: number | null) => void;
  map: kakao.maps.Map;
  index: number;
}) => {
  const number = index % 4;
  const lat = Number(restaurant.lat);
  const lng = Number(restaurant.lng);

  const handleClick = () => {
    customOffsetMarkerPosition(map, new kakao.maps.LatLng(lat, lng));
    setSelectedId(restaurant.id);
  };

  return (
    <button
      type="button"
      className={`group w-full text-left flex gap-3 items-start
                 rounded-lg border border-neutral-200 bg-white/80
                focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-neutral-900/20
                  transition-all p-3 cursor-pointer ${
                    restaurant.recommended &&
                    "shadow-sm hover:shadow-md shadow-green-300/50"
                  } ${
        restaurant.warning && "shadow-sm hover:shadow-md shadow-red-300/50"
      }`}
      onClick={handleClick}
      aria-label={`${restaurant.name}${
        restaurant.address ? ` - ${restaurant.address}` : ""
      }`}
      title={restaurant.name}
    >
      <div className="relative w-24 h-20 overflow-hidden rounded-md ring-1 ring-neutral-200 bg-neutral-100 shrink-0">
        <Image
          src={`${imageRenderList[number]}`}
          alt="식당 이미지"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center">
          <h2 className="text-[15px] font-semibold text-neutral-900 truncate">
            {restaurant.name}
          </h2>
          <TrustScore data={restaurant} size={4} />
        </div>
        <p className="mt-0.5 text-[12px] text-neutral-500 truncate">
          {restaurant.address}
        </p>

        <div className="flex items-center gap-1 mt-1">
          <StarRating rating={3.5} size={16} />
          <span className="text-sm text-neutral-800">3.5</span>
          <span className="text-sm text-neutral-400">(4)</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {restaurant.veganFlags.includes("글루텐프리".trim()) && (
            <div title="글루텐프리 표시">
              <GlutenIcon width={18} height={18} />
            </div>
          )}
          {restaurant.veganFlags.includes("락토".trim()) && (
            <div title="락토 표시">
              <LacToIcon width={18} height={18} />
            </div>
          )}
          {restaurant.veganFlags.includes("오보".trim()) && (
            <div title="오보 표시">
              <OvoIcon width={15} height={15} />
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default CustomSideListItem;
