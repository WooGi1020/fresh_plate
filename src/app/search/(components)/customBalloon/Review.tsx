"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import StarRating from "./StarRating";
import { ReviewPostRequestSchema } from "@/types/review.schema";
import type { ReviewPostRequest } from "@/types/review.schema";
import toast from "react-hot-toast";
import { postReviewAction } from "@/libs/actions/review";
import ImageUploader from "./ImageUploader";

import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  title: string;
  restaurantId: number;
  onClose?: () => void;
  onSuccess?: (newReview: any) => void;
};

export default function ReviewWriteModalContent({
  title,
  restaurantId,
  onClose,
  onSuccess,
}: Props) {
  const { user } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [rating, setRating] = useState(4);
  const [content, setContent] = useState("");
  const [menus, setMenus] = useState<any[] | null>(null);

  const [state, formAction, isSubmittingAction] = useActionState(
    async (_prevState: any) => {
      const payload: ReviewPostRequest = {
        restaurantId,
        rating,
        content: content.trim() || null,
        menus: menus?.length ? menus : null,
      };

      // 클라이언트 사이드 검증
      const validated = ReviewPostRequestSchema.safeParse(payload);
      if (!validated.success) {
        toast.error(validated.error.message);
        return { success: false, error: validated.error.message };
      }

      // 낙관적 데이터 생성
      const optimisticReview = {
        rating,
        content: payload.content,
        writerName: user?.nickname || "나",
        createdAt: new Date().toISOString(),
        menuImageUrl: menus?.[0]?.imageUrl || null,
      };

      const result = await postReviewAction(payload);
      if (result.success) {
        toast.success("리뷰가 성공적으로 등록되었습니다.");
        onSuccess?.(optimisticReview); // 낙관적 데이터 전달
        onClose?.();
      } else {
        toast.error(result.error || "등록 중 오류가 발생했습니다.");
      }
      return result;
    },
    { success: false, error: null },
  );

  const isPending = isUploading || isSubmittingAction;

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {/* 헤더 */}
      <h3 className="text-lg font-bold text-[#3b3b3b]">
        <span className="text-[#85A947]">{title}</span>&nbsp;&#45;&nbsp;리뷰
        작성
      </h3>
      <p className="text-sm text-neutral-600">
        여러분의 솔직한 후기가 저희 서비스를 더욱 개선합니다. 🌱
      </p>

      {/* 평점 */}
      <div className="flex flex-col gap-2 border-t border-neutral-200 pt-4">
        <label className="block text-sm font-medium text-[#3b3b3b]">평점</label>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <StarRating rating={rating} size={24} />
            <span className="text-base font-semibold text-[#3b3b3b]">
              {rating.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            step={0.5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-44 accent-[#85A947] cursor-pointer"
          />
        </div>
        <p className="text-xs text-neutral-500">
          평점은 0.0점에서 5.0점 사이로, 0.5점 단위로 선택할 수 있습니다.
        </p>
      </div>

      {/* 내용 */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[#3b3b3b]">
          내용 (선택)
        </label>
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`여러분께 알맞는 식사였나요?\n제공된 정보와 다른 점이 있었다면 말씀해주세요.`}
          className="w-full rounded-md border border-neutral-300 p-2 bg-white text-sm resize-none focus:ring-2 focus:ring-[#A3C76D] focus:outline-none placeholder:text-neutral-500"
        />
      </div>

      {/* 이미지 URL */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-[#3b3b3b]">
          이미지 추가하기 (선택)
        </label>
        <ImageUploader
          isPending={isUploading}
          setIsPending={setIsUploading}
          onUpload={setMenus}
        />
      </div>

      {/* 제출 에러 */}
      {state?.error && (
        <p className="text-sm text-red-600 font-medium">{state.error}</p>
      )}

      {/* 버튼 영역 */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 transition-all disabled:opacity-50 cursor-pointer"
          onClick={onClose}
          disabled={isPending}
        >
          취소
        </button>
        <SubmitButton isUploading={isUploading} />
      </div>
    </form>
  );
}

function SubmitButton({ isUploading }: { isUploading: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="text-sm px-4 py-1.5 rounded-md border border-[#3b3b3b] bg-[#EAEEDB] hover:bg-[#dfe6c7] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
      disabled={pending || isUploading}
    >
      {pending ? "등록 중..." : "등록"}
    </button>
  );
}
