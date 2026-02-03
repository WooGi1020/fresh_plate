import { ReviewInfo } from "@/types/review.schema";
import { use, useOptimistic, useMemo } from "react";
import SlidingReviewViewer from "./SlidingReviewViewer";
import StarRating from "./StarRating";

export default function ReviewSection({
  promise,
  onWriteReview,
  onSeeMore,
}: {
  promise: Promise<ReviewInfo[]>;
  onWriteReview: () => void;
  onSeeMore: (reviews: ReviewInfo[]) => void;
}) {
  const initialReviews = use(promise);

  const [optimisticReviews] = useOptimistic(
    initialReviews,
    (state, newReview: ReviewInfo) => [newReview, ...state],
  );

  const avgRating = useMemo(() => {
    if (!optimisticReviews.length) return null;
    const total = optimisticReviews.reduce(
      (sum, r) => sum + (r.rating ?? 0),
      0,
    );
    return total / optimisticReviews.length;
  }, [optimisticReviews]);

  return (
    <div className="text-sm w-full flex flex-col gap-2 flex-1">
      <div className="flex items-center gap-2">
        <StarRating rating={avgRating ?? 0} size={20} />
        <span className="text-md text-neutral-900 mt-0.5">
          {avgRating ? avgRating.toFixed(1) : "-"} ({optimisticReviews.length})
        </span>
      </div>

      <SlidingReviewViewer reviews={optimisticReviews} />

      <div className="flex justify-end gap-2">
        {optimisticReviews.length > 0 && (
          <button
            type="button"
            onClick={() => onSeeMore(optimisticReviews)}
            className="text-xs px-3 py-1 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
          >
            리뷰 더보기
          </button>
        )}
        <button
          type="button"
          onClick={onWriteReview}
          className="text-xs px-3 py-1 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
        >
          리뷰 작성하기
        </button>
      </div>
    </div>
  );
}
