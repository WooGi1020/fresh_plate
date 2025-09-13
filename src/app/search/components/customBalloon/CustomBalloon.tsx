import VeganIcon from "@/icons/vegan_icon.svg";
import AllegyIcon from "@/icons/allegy_icon.svg";
import GlutenIcon from "@/icons/gluten_free_icon.svg";
import CloseIcon from "@/icons/close_icon.svg";
import { Restaurant } from "vegan";
import StarRating from "@/app/search/components/customBalloon/StarRating";
import { useEffect, useState } from "react";

import imageRenderList from "@/constants/image_render_list";
import Image from "next/image";
import TrustScore from "@/components/common/TrustScore";
// import { hash } from "crypto";

const CustomBalloon = ({
  restaurant,
  onClose,
  map,
}: {
  restaurant: Restaurant;
  onClose: () => void;
  map: kakao.maps.Map;
}) => {
  const [placeUrl, setPlaceUrl] = useState<string | null>(null);
  const number =
    Array.from(restaurant.id).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    ) % 4;

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(`${restaurant.name}`, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setPlaceUrl(data[0].place_url);
      } else {
        setPlaceUrl(null);
      }
    });
  }, [map, restaurant.name]);

  return (
    <div
      className="w-[350px] sm:w-[420px] shadow-lg  p-4 text-neutral-900 speech-bubble cursor-default opacity-90"
      onWheel={(e) => {
        e.stopPropagation();
      }}
    >
      {/* 닫기 버튼 */}
      <button
        className="absolute top-2 right-2 text-2xl font-bold text-neutral-900 border-2 border-transparent hover:bg-neutral-300 cursor-pointer rounded-md p-1"
        onClick={onClose}
      >
        <CloseIcon width={20} height={20} />
      </button>

      {/* 상단: 이미지 + 식당 정보 */}
      <div className="flex gap-4">
        <div className="w-24 h-24 bg-gray-300 flex items-center justify-center rounded-md text-[#6b4f3b] text-xl relative overflow-hidden">
          <Image
            src={`${imageRenderList[number]}`}
            alt="식당 개별 이미지"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            {placeUrl ? (
              <a
                href={placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold mb-1 truncate max-w-[180px] sm:max-w-[250px] hover:underline"
                title={restaurant.name}
              >
                {restaurant.name}
              </a>
            ) : (
              <h2
                className="text-xl font-semibold mb-1 truncate max-w-[180px] sm:max-w-[250px]"
                title={restaurant.name}
              >
                {restaurant.name}
              </h2>
            )}
            <div className="mb-1">
              <TrustScore data={restaurant} />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <StarRating rating={3.5} />
            <span className="text-md text-neutral-900 mb-1">3.5</span>
            <span className="text-md text-neutral-900 mb-1">(4)</span>
          </div>
          <div className="flex gap-2">
            {/* 아이콘은 임시로 원으로 대체 */}

            <div title="비건 표시">
              <VeganIcon width={30} height={30} />
            </div>
            {restaurant.vegan_flags.includes("글루텐프리".trim()) && (
              <div title="글루텐프리 표시">
                <GlutenIcon width={30} height={30} />
              </div>
            )}
            <div title="알러지 반응 표시">
              <AllegyIcon width={30} height={30} fill="#85A947" />
            </div>
          </div>
        </div>
      </div>

      {/* 구분선 */}
      <div className="flex items-center w-full gap-4 my-2">
        <hr className="grow border-[1.5px] border-neutral-900" />
        <p className="whitespace-nowrap text-neutral-900 font-semibold">
          Review
        </p>
        <hr className="grow border-[1.5px] border-neutral-900" />
      </div>
      {/* 알러지 반응 구분 */}
      <div className="flex justify-between mb-3 gap-4 w-full text-center">
        <div className="border border-neutral-900 px-3 py-1 rounded-lg text-sm">
          <span>
            알레르기 <br /> 반응 없음
          </span>
        </div>
        <div className="border border-neutral-900 px-3 py-1 rounded-lg text-sm">
          <span>
            알레르기 <br /> 반응 주의
          </span>
        </div>
        <div className="bg-secondary-default px-3 py-1 rounded-lg text-sm shadow-inner border border-neutral-900">
          <span>
            알레르기 <br /> 반응 있음
          </span>
        </div>
      </div>

      {/* 리뷰 */}
      <div className="text-sm py-2 flex items-center justify-center flex-col h-[65px] overflow-y-scroll">
        <p className="text-neutral-900/50">현재 리뷰가 없습니다.</p>
      </div>
    </div>
  );
};

export default CustomBalloon;
