import { useEffect, useState } from "react";
import UserIcon from "@/icons/user_icon.svg";
import type { ReviewInfo } from "@/types/review.schema";
import StarRating from "./StarRating";

const SlidingReviewViewer = ({ reviews }: { reviews: ReviewInfo[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000); // 4초 간격
    return () => clearInterval(timer);
  }, [reviews.length]);

  if (!reviews.length) {
    return (
      <p className="text-neutral-900/50 text-center py-2">
        현재 리뷰가 없습니다.
      </p>
    );
  }

  const review = reviews[index];

  return (
    <div className="relative h-[80px] overflow-hidden">
      <div
        key={review.createdAt}
        className="absolute inset-0 border-2 rounded-lg p-2 border-neutral-700/70 bg-white/80"
      >
        {/* 아바타 */}
        <div
          className={`${
            reviews.length > 1
              ? "transition-all duration-700 ease-in-out\
                   animate-slide flex gap-3"
              : "flex gap-3"
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center border border-neutral-300">
            <UserIcon className="size-full fill-neutral-600" />
          </div>

          {/* 본문 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate max-w-[160px]">
                {review.writerName}
              </span>
              <span className="text-xs text-neutral-500">
                {new Date(review.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>

            <div className="flex items-center gap-1 mt-0.5">
              <StarRating rating={review.rating} size={14} />
              <span className="text-xs text-neutral-700">
                {review.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-[13px] text-neutral-800 mt-1 break-words max-h-[44px] overflow-hidden truncate">
              {review.content || "- 내용 없음"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingReviewViewer;
