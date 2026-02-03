"use server";

import { serverApiClient } from "../api/serverApiClient";
import type { ReviewPostRequest } from "@/types/review.schema";
import { revalidatePath } from "next/cache";

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
