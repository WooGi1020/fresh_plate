"use client";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StarRating from "./StarRating";
import { ReviewPostRequestSchema } from "@/types/review.schema";
import type { ReviewPostRequest } from "@/types/review.schema";
import toast from "react-hot-toast";
import { usePostReview } from "@/libs/mutation/usePostReview";
import ImageUploader from "./ImageUploader";

type Props = {
  restaurantId: number;
  onClose?: () => void;
};

export default function ReviewWriteModalContent({
  restaurantId,
  onClose,
}: Props) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const { mutateAsync: postReview } = usePostReview();

  type FormValues = ReviewPostRequest;
  const methods = useForm<FormValues>({
    resolver: zodResolver(ReviewPostRequestSchema),
    defaultValues: {
      restaurantId,
      rating: 4,
      content: "",
      menus: [],
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const rating = watch("rating");

  const onReviewSubmit = async (values: FormValues) => {
    setSubmitError(null);

    const payload: FormValues = {
      ...values,
      restaurantId: values.restaurantId ?? restaurantId,
      content: values.content?.trim() ? values.content : null,
      menus: values.menus?.length ? values.menus : null,
    };

    try {
      await postReview(payload);
      toast.success("리뷰가 성공적으로 등록되었습니다.");
      onClose?.();
    } catch (e: any) {
      setSubmitError(e?.message ?? "리뷰 등록에 실패했습니다.");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(onReviewSubmit)}
      >
        {/* 헤더 */}
        <h3 className="text-xl font-bold text-[#3b3b3b]">리뷰 작성</h3>
        <p className="text-sm text-neutral-600">
          여러분의 소중한 후기가 저희 서비스의 질을 높여요 🌱
        </p>

        {/* 숨은 필드 */}
        <input
          type="hidden"
          {...register("restaurantId", { valueAsNumber: true })}
          defaultValue={String(restaurantId)}
        />
        {errors.restaurantId && (
          <p className="text-xs text-red-600">
            {String(errors.restaurantId.message)}
          </p>
        )}

        {/* 평점 */}
        <div className="flex flex-col gap-2 border-t border-neutral-200 pt-4">
          <label className="block text-sm font-medium text-[#3b3b3b]">
            평점
          </label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <StarRating rating={Number(rating) || 0} size={24} />
              <span className="text-base font-semibold text-[#3b3b3b]">
                {Number(rating).toFixed(1)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              className="w-44 accent-[#85A947] cursor-pointer"
              {...register("rating", { valueAsNumber: true })}
            />
          </div>
          <p className="text-xs text-neutral-500">
            평점은 0.0점에서 5.0점 사이로, 0.5점 단위로 선택할 수 있습니다.
          </p>
          {errors.rating && (
            <p className="text-xs text-red-600">
              {String(errors.rating.message)}
            </p>
          )}
        </div>

        {/* 내용 */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#3b3b3b]">
            내용 (선택)
          </label>
          <textarea
            rows={4}
            placeholder={`여러분께 알맞는 식사였나요?\n음식의 맛, 분위기, 친절도 등 자유롭게 작성해주세요.`}
            className="w-full rounded-md border border-neutral-300 p-2 bg-white text-sm resize-none focus:ring-2 focus:ring-[#A3C76D] focus:outline-none"
            {...register("content")}
          />
          {errors.content && (
            <p className="text-xs text-red-600">
              {String(errors.content.message)}
            </p>
          )}
        </div>

        {/* 이미지 URL */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#3b3b3b]">
            이미지 추가하기 (선택)
          </label>
          <ImageUploader isPending={isPending} setIsPending={setIsPending} />
          {errors.menus && (
            <p className="text-xs text-red-600">{String(errors.menus)}</p>
          )}
        </div>

        {/* 제출 에러 */}
        {submitError && <p className="text-sm text-red-600">{submitError}</p>}

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-2 pt-4">
          <button
            type="button"
            className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 transition-all disabled:opacity-50 cursor-pointer"
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소
          </button>
          <button
            type="submit"
            className="text-sm px-4 py-1.5 rounded-md border border-[#3b3b3b] bg-[#EAEEDB] hover:bg-[#dfe6c7] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting ? "등록 중..." : "등록"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
