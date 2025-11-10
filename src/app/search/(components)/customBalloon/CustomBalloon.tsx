import LacToIcon from "@/icons/lacto_icon.svg";
import OvoIcon from "@/icons/ovo_icon.svg";
import GlutenIcon from "@/icons/gluten_free_icon.svg";
import CloseIcon from "@/icons/close_icon.svg";
import LinkIcon from "@/icons/link_icon.svg";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Restaurant } from "@/types/restaurants.schema";

import { useAuthStore } from "@/store/useAuthStore";
import { useGetReviews } from "@/libs/query/getReviewQuery";

import imageRenderList from "@/constants/image_render_list";
import StarRating from "@/app/search/(components)/customBalloon/StarRating";
import TrustScore from "@/components/common/TrustScore";
import Modal from "@/components/common/Modal";
import ReviewsModalContent from "./ReviewList";
import ReviewWriteModalContent from "./Review";
import SlidingReviewViewer from "./SlidingReviewViewer";

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
  const [openReviewListModal, setOpenReviewListModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const { user } = useAuthStore();
  const router = useRouter();

  /** 리뷰 데이터 안전하게 가져오기 */
  const { data: reviews = [], isLoading } = useGetReviews(restaurant.id);
  /** 이미지 인덱스 계산 (안전하게 처리) */
  const number =
    Array.from(String(restaurant.id)).reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    ) % imageRenderList.length;

  const avgRating = useMemo(() => {
    if (!reviews.length) return null;
    const total = reviews.reduce((sum, r) => sum + (r.rating ?? 0), 0);
    return total / reviews.length;
  }, [reviews]);

  /** Kakao Map Place URL 검색 */
  useEffect(() => {
    if (!restaurant?.name) return;

    const fetchPlace = async () => {
      try {
        const res = await fetch(
          `/api/places?query=${encodeURIComponent(restaurant.name)}`
        );
        if (!res.ok) throw new Error("검색 실패");

        const data = await res.json();
        if (Array.isArray(data.documents) && data.documents.length > 0) {
          setPlaceUrl(data.documents[0].place_url);
        } else {
          setPlaceUrl(null);
        }
      } catch (err) {
        console.error(err);
        setPlaceUrl(null);
      }
    };

    fetchPlace();
  }, [restaurant?.name]);

  /** 로그인 필요 시 처리 */
  const handleWriteReview = () => {
    if (!user) {
      toast.error("리뷰 작성을 위해 로그인해주세요.");
      setTimeout(() => router.push("/sign"), 500);
      return;
    }
    setOpenReviewModal(true);
  };

  return (
    <div
      className="w-[350px] sm:w-[420px] shadow-lg text-neutral-900 speech-bubble cursor-default opacity-90"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
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
            src={imageRenderList[number] ?? "/fallback.png"}
            alt="식당 이미지"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center">
            {placeUrl ? (
              <a
                href={placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-xl font-semibold truncate max-w-[180px] sm:max-w-[250px] hover:underline"
                title={restaurant.name}
              >
                {restaurant.name}
                <LinkIcon className="w-3 h-3 inline-block ml-1" />
              </a>
            ) : (
              <h2
                className="text-xl font-semibold truncate max-w-[180px] sm:max-w-[250px]"
                title={restaurant.name}
              >
                {restaurant.name}
              </h2>
            )}
            <div>
              <TrustScore data={restaurant} />
            </div>
          </div>

          {/* 주소 */}
          <div className="max-w-fit truncate whitespace-pre-wrap">
            <p className="text-sm w-full ">{restaurant.address}</p>
          </div>

          {/* 평점 */}
          <div
            className={`flex items-center gap-2 transition-opacity duration-300 ${
              isLoading ? "opacity-60" : "opacity-100"
            }`}
          >
            <StarRating rating={avgRating ?? 0} size={20} />
            <span className="text-md text-neutral-900 mt-0.5">
              {avgRating ? avgRating.toFixed(1) : "-"}
            </span>
            <span className="text-md text-neutral-900 mt-0.5">
              ({reviews.length})
            </span>
          </div>

          {/* 비건 플래그 */}
          <div className="flex gap-2 items-center">
            {restaurant.veganFlags.includes("글루텐프리") && (
              <div title="글루텐프리 표시">
                <GlutenIcon width={26} height={26} />
              </div>
            )}
            {restaurant.veganFlags.includes("락토") && (
              <div title="락토 표시">
                <LacToIcon width={30} height={30} />
              </div>
            )}
            {restaurant.veganFlags.includes("오보") && (
              <div title="오보 표시" className="mt-0.5">
                <OvoIcon width={26} height={26} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 알러지 반응 구분 */}
      {user && (
        <div className="flex items-center justify-between gap-2 w-full md:justify-evenly mt-3">
          {(() => {
            const base =
              "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] max-sm:text-[11px]";
            const neutral =
              "border border-neutral-300 text-neutral-700 bg-white";
            const active =
              "border-2 border-neutral-900 text-neutral-900 bg-secondary-default shadow-inner";

            return (
              <>
                <span
                  className={`${base} ${
                    restaurant.allergyLevel === 0 ? active : neutral
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-green-500"
                    aria-hidden
                  />
                  알러지 안전
                </span>
                <span
                  className={`${base} ${
                    restaurant.allergyLevel! <= 0.4 ? active : neutral
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    aria-hidden
                  />
                  알러지 주의
                </span>
                <span
                  className={`${base} ${
                    restaurant.allergyLevel! >= 0.5 ? active : neutral
                  }`}
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
      )}

      {/* 구분선 */}
      <div className="flex items-center w-full gap-4 my-1">
        <hr className="grow border-[1.5px] border-neutral-900" />
        <p className="whitespace-nowrap text-neutral-900 font-semibold">
          Review
        </p>
        <hr className="grow border-[1.5px] border-neutral-900" />
      </div>

      {/* 리뷰 미리보기 */}
      <div className="text-sm w-full flex flex-col gap-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-2">
            <div className="animate-spin border-4 border-neutral-300 border-t-yellow-700 rounded-full size-5" />
          </div>
        ) : (
          <SlidingReviewViewer reviews={reviews} />
        )}

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleWriteReview}
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

      {/* 리뷰 전체 보기 모달 */}
      {openReviewListModal && (
        <Modal setOpenFilter={setOpenReviewListModal}>
          <ReviewsModalContent
            avgRating={avgRating ?? 0}
            initialReviews={reviews}
            onClose={() => setOpenReviewListModal(false)}
          />
        </Modal>
      )}

      {/* 리뷰 작성 모달 */}
      {openReviewModal && (
        <Modal setOpenFilter={setOpenReviewModal}>
          <ReviewWriteModalContent
            title={restaurant.name}
            restaurantId={restaurant.id}
            onClose={() => setOpenReviewModal(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default CustomBalloon;
