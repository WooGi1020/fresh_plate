import StarRating from "./StarRating";
import UserIcon from "@/icons/user_icon.svg";
import type { ReviewInfo } from "@/types/review.schema";

type ReviewListItemProps = {
  review: ReviewInfo;
};

export default function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <li className="relative flex gap-3 border border-neutral-400/40 rounded-lg p-3 bg-white">
      {/* 아바타 */}
      <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center border border-neutral-300">
        <UserIcon className="size-full fill-neutral-600" />
      </div>

      {/* 본문 */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-medium truncate max-w-50">
            {review.writerName}
          </span>
          <span className="text-xs text-neutral-500">
            {new Date(review.createdAt).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <StarRating rating={review.rating} size={16} />
          <span className="text-xs text-neutral-700">
            {review.rating.toFixed(1)}
          </span>
        </div>

        <hr className="border-neutral-900/50 my-2" />

        {review.content && (
          <div>
            <p className="text-[13px] text-neutral-800 whitespace-pre-wrap wrap-break-word">
              {review.content}
            </p>
            {review.menuImageUrl && (
              <div className="ml-auto w-14 h-14 rounded-md overflow-hidden border border-neutral-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={review.menuImageUrl}
                  alt="리뷰 이미지"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </li>
  );
}
