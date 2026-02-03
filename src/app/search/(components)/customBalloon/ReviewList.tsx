import type { ReviewInfo } from "@/types/review.schema";
import ReviewHeader from "./ReviewHeader";
import ReviewListItem from "./ReviewListItem";

type Props = {
  title?: string;
  initialReviews?: ReviewInfo[];
  avgRating: number;
  onClose?: () => void;
};

export default function ReviewsModalContent({
  title = "리뷰",
  initialReviews = [],
  avgRating,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <ReviewHeader
        title={title}
        avgRating={avgRating}
        reviewCount={initialReviews.length}
      />

      {/* 본문 */}
      <div className="min-h-30">
        {initialReviews.length > 0 ? (
          <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-1 scroll-box">
            {initialReviews.map((rev, idx) => (
              <ReviewListItem key={`${rev.writerName}-${idx}`} review={rev} />
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center p-10 text-neutral-500">
            작성된 리뷰가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
