import z from "zod";

// 리뷰 작성 요청
export const ReviewPostRequestSchema = z.object({
  restaurantId: z.number(),
  content: z.string().nullable().optional(),
  menus: z
    .array(
      z.object({
        menu_item: z.string(),
        ingredients: z.array(z.string()),
      })
    )
    .nullable()
    .optional(),
  rating: z.number(),
});
export type ReviewPostRequest = z.infer<typeof ReviewPostRequestSchema>;

// 리뷰 작성 응답
export const ReviewPostResponseSchema = z.object({
  reviewId: z.number(),
});
export type ReviewPostResponse = z.infer<typeof ReviewPostResponseSchema>;

// 리뷰 삭제 응답
export const ReviewDeleteResponseSchema = z.object({
  deletedReviewId: z.number(),
});
export type ReviewDeleteResponse = z.infer<typeof ReviewDeleteResponseSchema>;

// 리뷰 단건
export const ReviewInfoSchema = z.object({
  writerName: z.string(),
  content: z.string().nullable(),
  menuImageUrl: z.string().nullable(),
  rating: z.number(),
  createdAt: z.string(), // ISO 문자열이라면 .datetime()로 교체 가능
});
export type ReviewInfo = z.infer<typeof ReviewInfoSchema>;

// 리뷰 목록 응답
export const ReviewsGetResponseSchema = z.object({
  reviews: z.array(ReviewInfoSchema),
});
export type ReviewsGetResponse = z.infer<typeof ReviewsGetResponseSchema>;
