import LacToIcon from "@/icons/lacto_icon.svg";
import OvoIcon from "@/icons/ovo_icon.svg";
import GlutenIcon from "@/icons/gluten_free_icon.svg";
import CloseIcon from "@/icons/close_icon.svg";
import { Restaurant } from "@/types/restaurants.schema";
import StarRating from "@/app/search/components/customBalloon/StarRating";
import { useEffect, useMemo, useState } from "react";

import imageRenderList from "@/constants/image_render_list";
import Image from "next/image";
import TrustScore from "@/components/common/TrustScore";
import Modal from "@/components/common/Modal";
import ReviewsModalContent from "./ReviewList";
import { ReviewInfo } from "@/types/review.schema";
import ReviewWriteModalContent from "./Review";
import LinkIcon from "@/icons/link_icon.svg";

import SlidingReviewViewer from "./SlidingReviewViewer";

const CustomBalloon = ({
  restaurant,
  onClose,
  map,
  reviews = [],
}: {
  restaurant: Restaurant;
  onClose: () => void;
  map: kakao.maps.Map;
  reviews?: ReviewInfo[];
}) => {
  const [placeUrl, setPlaceUrl] = useState<string | null>(null);
  const [openReviewListModal, setOpenReviewListModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);

  const number =
    Array.from(String(restaurant.id)).reduce(
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

  // 평균 평점
  const averageRating = useMemo(() => {
    if (!reviews.length) return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / reviews.length).toFixed(1));
  }, [reviews]);

  return (
    <div
      className="w-[350px] sm:w-[420px] shadow-lg text-neutral-900 speech-bubble cursor-default opacity-90"
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
                className="group text-xl font-semibold mb-1 truncate max-w-[180px] sm:max-w-[250px] hover:underline"
                title={restaurant.name}
              >
                {restaurant.name}
                <LinkIcon className="w-3 h-3 inline-block" />
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
            <StarRating rating={averageRating ?? 0} />
            <span className="text-md text-neutral-900 mt-0.5">
              {averageRating?.toFixed(1) ?? "-"}
            </span>
            <span className="text-md text-neutral-900 mt-0.5">
              ({reviews.length})
            </span>
          </div>

          <div className="flex gap-2 mt-2">
            {restaurant.veganFlags.includes("글루텐프리".trim()) && (
              <div title="글루텐프리 표시">
                <GlutenIcon width={30} height={30} />
              </div>
            )}
            {restaurant.veganFlags.includes("락토".trim()) && (
              <div title="락토 표시">
                <LacToIcon width={30} height={30} />
              </div>
            )}
            {restaurant.veganFlags.includes("오보".trim()) && (
              <div title="오보 표시" className="mt-0.5">
                <OvoIcon width={26} height={26} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 알러지 반응 구분 (간소화 칩 + 강조 상태) */}
      <div className="flex items-center justify-between gap-2 w-full md:justify-evenly mt-3">
        {(() => {
          const base =
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[12px] max-sm:text-[11px] ";
          const neutral = "border border-neutral-300 text-neutral-700 bg-white";
          const active =
            "border border-neutral-900 text-neutral-900 bg-secondary-default shadow-inner";
          return (
            <>
              <span
                className={`${base} ${restaurant.warning ? neutral : active}`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-500"
                  aria-hidden
                />
                알러지 안전
              </span>
              <span className={`${base} ${neutral}`}>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-amber-400"
                  aria-hidden
                />
                알러지 주의
              </span>
              <span
                className={`${base} ${restaurant.warning ? active : neutral}`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-red-500"
                  aria-hidden
                />
                알러지 위험
              </span>
            </>
          );
        })()}
      </div>

      {/* 구분선 */}
      <div className="flex items-center w-full gap-4 my-1">
        <hr className="grow border-[1.5px] border-neutral-900" />
        <p className="whitespace-nowrap text-neutral-900 font-semibold">
          Review
        </p>
        <hr className="grow border-[1.5px] border-neutral-900" />
      </div>

      {/* 최신 리뷰 1건 (스크롤 없음) */}
      <div className="text-sm w-full flex flex-col gap-2 ">
        <SlidingReviewViewer reviews={reviews} />

        {/* 전체보기 버튼 */}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpenReviewModal(true)}
            className="text-xs px-3 py-1 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
          >
            리뷰 작성하기
          </button>
          {reviews.length > 0 && (
            <button
              type="button"
              onClick={() => setOpenReviewListModal(true)}
              className="text-xs px-3 py-1 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
            >
              리뷰 더보기
            </button>
          )}
        </div>
      </div>

      {/* 공통 모달에 자식으로 주입 */}
      {openReviewListModal && (
        <Modal setOpenFilter={setOpenReviewListModal}>
          <ReviewsModalContent
            restaurantId={Number(restaurant.id as unknown as number)}
            initialReviews={reviews}
            onClose={() => setOpenReviewListModal(false)}
          />
        </Modal>
      )}
      {openReviewModal && (
        <Modal setOpenFilter={setOpenReviewModal}>
          <ReviewWriteModalContent
            restaurantId={1}
            onClose={() => setOpenReviewModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CustomBalloon;
