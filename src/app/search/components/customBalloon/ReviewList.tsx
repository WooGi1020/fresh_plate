import { useMemo } from "react";
import StarRating from "./StarRating";
import type { ReviewInfo } from "@/types/review.schema";

import UserIcon from "@/icons/user_icon.svg";

type Props = {
  restaurantId: number;
  title?: string;
  initialReviews?: ReviewInfo[];
  onClose?: () => void; // 필요 시 하단 닫기 버튼에서 사용
};

export default function ReviewsModalContent({
  title = "리뷰",
  initialReviews,
}: Props) {
  const averageRating = useMemo(() => {
    if (!initialReviews!.length) return null;
    const sum = initialReviews!.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / initialReviews!.length).toFixed(1));
  }, [initialReviews]);

  return (
    <div className="flex flex-col gap-3">
      {/* 헤더(모달 공통 타이틀 아래에 보이는 내부 타이틀) */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-semibold text-[#3b3b3b]">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-neutral-700">
          <StarRating rating={averageRating ?? 0} size={18} />
          <span className="relative bottom-[2.5px]">
            {averageRating?.toFixed(1)}
          </span>
          <span>({initialReviews!.length})</span>
        </div>
      </div>

      {/* 본문 */}
      <div className="min-h-[120px]">
        {initialReviews!.length > 0 && (
          <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-1 scroll-box">
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
                  className="flex gap-3 border border-neutral-200 rounded-lg p-3 bg-white"
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
                        {new Date(rev.createdAt).toLocaleString("ko-KR")}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <StarRating rating={rev.rating} size={16} />
                      <span className="text-xs text-neutral-700">
                        {rev.rating.toFixed(1)}
                      </span>
                    </div>
                    {rev.content && (
                      <p className="text-[13px] text-neutral-800 mt-1 whitespace-pre-wrap break-words">
                        {rev.content}
                      </p>
                    )}
                  </div>

                  {/* 이미지 (옵션) */}
                  {rev.menuImageUrl && (
                    <div className="relative w-14 h-14 rounded-md overflow-hidden border border-neutral-200 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rev.menuImageUrl}
                        alt="리뷰 이미지"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
