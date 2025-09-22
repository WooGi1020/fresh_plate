"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import StarRating from "./StarRating";
import { ReviewPostRequestSchema } from "@/types/review.schema";
import type { ReviewPostRequest } from "@/types/review.schema";

type Props = {
  restaurantId: number;
  onClose?: () => void;
};

export default function ReviewWriteModalContent({
  restaurantId,
  onClose,
}: Props) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  type FormValues = ReviewPostRequest;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(ReviewPostRequestSchema),
    defaultValues: {
      restaurantId, // 기본값 설정 (등록도 필요)
      rating: 4,
      content: "",
      menuImageUrl: "",
    },
  });

  const rating = watch("rating");

  const onReviewSubmit = async (values: FormValues) => {
    setSubmitError(null);

    // restaurantId가 빠질 가능성을 막기 위해 안전하게 병합
    const payload: FormValues = {
      ...values,
      restaurantId: values.restaurantId ?? restaurantId,
      // 빈 문자열은 null로 변환 (스키마가 이를 허용한다면)
      content: values.content?.trim() ? values.content : null,
      menuImageUrl: values.menuImageUrl?.trim() ? values.menuImageUrl : null,
    };

    try {
      console.log(payload);
      onClose?.();
    } catch (e: any) {
      setSubmitError(e);
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onReviewSubmit)}
    >
      <h3 className="text-lg sm:text-xl text-[#3b3b3b] font-bold">리뷰 작성</h3>

      {/* 숨은 필드: restaurantId 반드시 register */}
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <StarRating rating={Number(rating) || 0} />
          <span className="text-sm text-neutral-700">
            {Number(rating).toFixed(1)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          className="w-40 accent-[#85A947]"
          {...register("rating", { valueAsNumber: true })}
        />
      </div>
      {errors.rating && (
        <p className="text-xs text-red-600">{String(errors.rating.message)}</p>
      )}

      {/* 내용 */}
      <div>
        <label className="block text-sm text-[#3b3b3b] mb-1">내용 (선택)</label>
        <textarea
          rows={4}
          placeholder="방문 후기를 남겨주세요."
          className="w-full rounded-md border border-neutral-300 p-2 bg-white text-sm resize-none"
          {...register("content")}
        />
        {errors.content && (
          <p className="text-xs text-red-600">
            {String(errors.content.message)}
          </p>
        )}
      </div>

      {/* 이미지 URL */}
      <div>
        <label className="block text-sm text-[#3b3b3b] mb-1">
          이미지 추가하기 (선택)
        </label>
        <input
          type="url"
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-md border border-neutral-300 p-2 bg-white text-sm"
          {...register("menuImageUrl")}
        />
        {errors.menuImageUrl && (
          <p className="text-xs text-red-600">
            {String(errors.menuImageUrl.message)}
          </p>
        )}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 bg-white hover:bg-neutral-100 cursor-pointer"
          onClick={onClose}
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type="submit"
          className="text-sm px-3 py-1.5 rounded-md border border-[#3b3b3b] bg-[#EAEEDB] hover:bg-[#dfe6c7] cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "등록 중..." : "등록"}
        </button>
      </div>
    </form>
  );
}
