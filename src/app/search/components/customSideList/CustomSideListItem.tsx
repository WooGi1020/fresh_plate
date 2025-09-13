import StarRating from "@/app/search/components/customBalloon/StarRating";
import imageRenderList from "@/constants/image_render_list";
import Image from "next/image";
import { Restaurant } from "vegan";

import VeganIcon from "@/icons/vegan_icon.svg";
import AllegyIcon from "@/icons/allegy_icon.svg";
import GlutenIcon from "@/icons/gluten_free_icon.svg";
import TrustScore from "@/components/common/TrustScore";

const CustomSideListItem = ({
  restaurant,
  setSelectedId,
  map,
  index,
}: {
  restaurant: Restaurant;
  setSelectedId: (value: string | null) => void;
  map: kakao.maps.Map;
  index: number;
}) => {
  const number = index % 4;

  return (
    <button
      type="button"
      className="group w-full text-left flex gap-3 items-start
                 rounded-lg border border-neutral-200 bg-white/80
                 hover:bg-white focus-visible:outline-none
                 focus-visible:ring-2 focus-visible:ring-neutral-900/20
                 shadow-sm hover:shadow-md transition-all p-3 cursor-pointer"
      onClick={() => {
        setSelectedId(restaurant.id);
        map.panTo(
          new kakao.maps.LatLng(Number(restaurant.lat), Number(restaurant.lng))
        );
      }}
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

        <div className="flex items-center gap-1 mt-2">
          <StarRating rating={3.5} />
          <span className="text-sm text-neutral-800">3.5</span>
          <span className="text-sm text-neutral-400">(4)</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="text-neutral-700" title="비건 표시">
            <VeganIcon width={18} height={18} />
          </div>
          {restaurant.vegan_flags?.includes("글루텐프리") && (
            <div className="text-neutral-700" title="글루텐프리 표시">
              <GlutenIcon width={18} height={18} />
            </div>
          )}
          <div className="text-[#85A947]" title="알러지 반응 표시">
            <AllegyIcon width={18} height={18} />
          </div>
        </div>
      </div>
    </button>
  );
};

export default CustomSideListItem;
