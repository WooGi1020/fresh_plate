"use server";

import { serverApiClient } from "../api/serverApiClient";
import type { ReviewInfo, ReviewPostRequest } from "@/types/review.schema";
import { revalidatePath } from "next/cache";

/**
 * 특정 식당의 리뷰 목록 조회 서버 액션
 */
export async function getReviewsAction(
  restaurantId: number,
): Promise<ReviewInfo[]> {
  try {
    const data = await serverApiClient.get<{ reviews: ReviewInfo[] }>(
      `api/restaurant/${restaurantId}/reviews`,
      undefined,
      {
        next: { tags: [`reviews-${restaurantId}`] }, // 식당별 리뷰 태그 설정
      },
    );
    const list = Array.isArray(data) ? data : (data?.reviews ?? []);
    return list as ReviewInfo[];
  } catch (error) {
    console.error(
      `Failed to fetch reviews for restaurant ${restaurantId}:`,
      error,
    );
    return [];
  }
}

/**
 * 리뷰 등록 서버 액션
 */
export async function postReviewAction(data: ReviewPostRequest) {
  try {
    const response = await serverApiClient.post(`api/restaurant/review`, data);

    // revalidatePath에 경로와 타입('page') 두 개의 인수를 전달하여 확실하게 갱신
    revalidatePath("/search", "page");

    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
