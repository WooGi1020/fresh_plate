"use client";

import { Activity, Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { Restaurant } from "@/types/restaurants.schema";
import { ReviewInfo } from "@/types/review.schema";
import { useAuthStore } from "@/store/useAuthStore";
import { getReviewsAction } from "@/libs/actions/review";
import imageRenderList from "@/constants/image_render_list";

// 아이콘 및 공통 컴포넌트
import LacToIcon from "@/icons/lacto_icon.svg";
import OvoIcon from "@/icons/ovo_icon.svg";
import GlutenIcon from "@/icons/gluten_free_icon.svg";
import CloseIcon from "@/icons/close_icon.svg";
import TrustScore from "@/components/common/TrustScore";
import Modal from "@/components/common/Modal";
import ReviewsModalContent from "./ReviewList";
import ReviewWriteModalContent from "./Review";
import getPlaceAction from "@/libs/actions/place";
import PlaceLink from "./PlaceLink";
import ReviewSection from "./ReviewSection";

const CustomBalloon = ({
  restaurant,
  onClose,
}: {
  restaurant: Restaurant;
  onClose: () => void;
}) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [openReviewListModal, setOpenReviewListModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [selectedReviewsForModal, setSelectedReviewsForModal] = useState<
    ReviewInfo[]
  >([]);

  // ✅ Promise 메모이제이션: 무한 루프 방지의 핵심
  const reviewsPromise = useMemo(
    () => getReviewsAction(restaurant.id),
    [restaurant.id],
  );

  const placePromise = useMemo(
    () => getPlaceAction(restaurant.name),
    [restaurant.name],
  );

  const onCloseEscape = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", onCloseEscape);
    return () => {
      document.body.removeEventListener("keydown", onCloseEscape);
    };
  }, []);

  const number = useMemo(
    () =>
      Array.from(String(restaurant.id)).reduce(
        (acc, char) => acc + char.charCodeAt(0),
        0,
      ) % imageRenderList.length,
    [restaurant.id],
  );

  const handleWriteReview = () => {
    if (!user) {
      toast.error("리뷰 작성을 위해 로그인해주세요.");
      setTimeout(() => router.push("/sign"), 500);
      return;
    }
    setOpenReviewModal(true);
  };

  const handleSeeMore = (currentReviews: ReviewInfo[]) => {
    setSelectedReviewsForModal(currentReviews);
    setOpenReviewListModal(true);
  };

  return (
    <div
      className="w-87.5 sm:w-105 h-87.5 shadow-lg text-neutral-900 speech-bubble cursor-default opacity-90 p-4 bg-white rounded-xl relative flex flex-col"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 p-1 hover:bg-neutral-300 rounded-md"
        onClick={onClose}
      >
        <CloseIcon width={20} height={20} />
      </button>

      <div className="flex gap-4">
        <div className="w-24 h-24 bg-gray-300 rounded-md relative overflow-hidden">
          <Image
            src={imageRenderList[number] ?? "/fallback.png"}
            alt="식당"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-1">
            <Suspense
              fallback={
                <h2
                  className="text-xl font-semibold truncate max-w-45 sm:max-w-62.5"
                  title={restaurant.name}
                >
                  {restaurant.name}
                </h2>
              }
            >
              <PlaceLink
                promise={placePromise}
                restaurantName={restaurant.name}
              />
            </Suspense>
            <TrustScore data={restaurant} />
          </div>
          <p className="text-sm text-neutral-600 whitespace-pre-wrap">
            {restaurant.address}
          </p>

          <div className="flex gap-2">
            {restaurant.veganFlags.includes("글루텐프리") && (
              <GlutenIcon width={26} height={26} />
            )}
            {restaurant.veganFlags.includes("락토") && (
              <LacToIcon width={26} height={26} />
            )}
            {restaurant.veganFlags.includes("오보") && (
              <OvoIcon width={26} height={26} />
            )}
          </div>
        </div>
      </div>

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
                    restaurant.allergyLevel! <= 0.4 &&
                    restaurant.allergyLevel! > 0
                      ? active
                      : neutral
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

      <div className="flex items-center w-full gap-4 my-2">
        <hr className="grow border-neutral-900" />
        <span className="font-semibold text-sm">Review</span>
        <hr className="grow border-neutral-900" />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <Suspense
          fallback={
            <div className="flex flex-col flex-1">
              <div className="flex-1" />

              <div className="flex justify-center items-center">
                <div className="animate-spin border-2 border-t-yellow-700 size-5 rounded-full" />
              </div>

              <div className="flex-1 flex items-end justify-end">
                <button
                  type="button"
                  onClick={handleWriteReview}
                  className="text-xs px-3 py-1 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
                >
                  리뷰 작성하기
                </button>
              </div>
            </div>
          }
        >
          <ReviewSection
            promise={reviewsPromise}
            onWriteReview={handleWriteReview}
            onSeeMore={handleSeeMore}
          />
        </Suspense>
      </div>

      <Activity mode={openReviewListModal ? "visible" : "hidden"}>
        <Modal setOpenFilter={setOpenReviewListModal}>
          <ReviewsModalContent
            avgRating={0} // ReviewSection 내부에서 계산되므로 필요 시 로직 조정
            initialReviews={selectedReviewsForModal}
            onClose={() => setOpenReviewListModal(false)}
          />
        </Modal>
      </Activity>

      <Activity mode={openReviewModal ? "visible" : "hidden"}>
        <Modal setOpenFilter={setOpenReviewModal}>
          <ReviewWriteModalContent
            title={restaurant.name}
            restaurantId={restaurant.id}
            onClose={() => setOpenReviewModal(false)}
            onSuccess={() => setOpenReviewModal(false)} // revalidatePath 자동 갱신 활용
          />
        </Modal>
      </Activity>
    </div>
  );
};

export default CustomBalloon;
