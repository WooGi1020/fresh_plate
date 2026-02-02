"use server";

import { serverApiClient } from "../api/serverApiClient";
import { Restaurant, RestaurantSchema } from "@/types/restaurants.schema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

/**
 * 식당 목록 조회 서버 액션
 * accessToken 쿠키 존재 여부에 따라 다른 엔드포인트를 호출합니다.
 */
export async function getRestaurantsAction(): Promise<Restaurant[]> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const isLoggedIn = !!accessToken;
    console.log(isLoggedIn);

    // 백엔드 엔드포인트: 로그인 시 api/restaurant, 미로그인 시 api/restaurant/all
    const endpoint = isLoggedIn ? "api/restaurant" : "api/restaurant/all";

    // 로그인 상태일 경우 개인화된 데이터이므로 짧게 유지하거나 no-store
    // 하지만 "거의 바뀔 일이 없다"면 로그인 상태여도 긴 캐시 시간을 가질 수 있습니다.
    const fetchOptions: RequestInit = isLoggedIn
      ? { next: { revalidate: 3600, tags: ["restaurant"] } } // 로그인 유저는 1시간
      : { next: { revalidate: 86400, tags: ["restaurants-all"] } }; // 비로그인(공용)은 24시간

    const data = await serverApiClient.get<{
      restaurants: Record<string, any[]>;
    }>(endpoint, undefined, fetchOptions);

    if (!data || !data.restaurants) {
      console.warn("No restaurants found in response data:", data);
      return [];
    }

    // 데이터 flatten 및 파싱
    const merged = Object.values(data.restaurants).flat();
    return merged.map((r) => RestaurantSchema.parse(r));
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    throw error;
  }
}

/**
 * 특정 식당 재검증 (캐시 갱신이 필요할 때 사용)
 */
export async function revalidateRestaurants() {
  revalidatePath("/search");
}
