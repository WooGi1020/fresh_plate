"use server";

import { serverApiClient } from "../api/serverApiClient";
import { Restaurant, RestaurantSchema } from "@/types/restaurants.schema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function getRestaurantsAction(): Promise<Restaurant[]> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const isLoggedIn = !!accessToken;
    console.log(isLoggedIn);

    const endpoint = isLoggedIn ? "api/restaurant" : "api/restaurant/all";

    const fetchOptions: RequestInit = isLoggedIn
      ? { next: { revalidate: 3600, tags: ["restaurant"] } }
      : { next: { revalidate: 86400, tags: ["restaurants-all"] } };

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
