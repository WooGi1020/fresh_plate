import { useMemo } from "react";
import StarRating from "./StarRating";
import type { ReviewInfo } from "@/types/review.schema";

import UserIcon from "@/icons/user_icon.svg";
import { Restaurant } from "@/types/restaurants.schema";

type Props = {
  restaurant: Restaurant;
  title?: string;
  initialReviews?: ReviewInfo[];
  onClose?: () => void; // 필요 시 하단 닫기 버튼에서 사용
};

export default function ReviewsModalContent({
  title = "리뷰",
  initialReviews,
  restaurant,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {/* 헤더(모달 공통 타이틀 아래에 보이는 내부 타이틀) */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-[#3b3b3b]">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-neutral-700">
          <StarRating rating={restaurant.avgRating!} size={18} />
          <span className="text-sm relative bottom-0.5">
            {restaurant.avgRating}
          </span>
          &#40;
          <span className="text-sm -mx-1.5 relative bottom-0.5">
            {initialReviews!.length}
          </span>
          &#41;
        </div>
      </div>

      {/* 본문 */}
      <div className="min-h-[120px]">
        {initialReviews!.length > 0 && (
          <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 scroll-box">
            {initialReviews!
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((rev, idx) => (
                <li
                  key={idx}
                  className="relative flex gap-3 border border-neutral-400/40 rounded-lg p-3 bg-white"
                >
                  {/* 아바타 */}
                  <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center border border-neutral-300">
                    <UserIcon className="size-full fill-neutral-600" />
                  </div>

                  {/* 본문 */}
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate max-w-[200px]">
                        {rev.writerName}
                      </span>
                      <span className="text-xs text-neutral-500">
                        {new Date(rev.createdAt).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarRating rating={rev.rating} size={16} />
                      <span className="text-xs text-neutral-700">
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>

                    <hr className="border-neutral-900/50 my-2" />

                    {rev.content && (
                      <div>
                        <p className="text-[13px] text-neutral-800 whitespace-pre-wrap wrap-break-word">
                          {rev.content}
                        </p>
                        {rev.menuImageUrl && (
                          <div className="ml-auto w-14 h-14 rounded-md overflow-hidden border border-neutral-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={rev.menuImageUrl}
                              alt="리뷰 이미지"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
