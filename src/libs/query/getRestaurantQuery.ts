// libs/query/getRestaurantQuery.ts
import { queryOptions, useQuery } from "@tanstack/react-query";
import { getRestaurants, getRestaurantsForGuest } from "../api/restaurants.api";
import { useAuthStore } from "@/store/useAuthStore";
import { Restaurant, RestaurantSchema } from "@/types/restaurants.schema";

type RestaurantResponse = {
  success: boolean;
  code: number;
  data: {
    restaurants: Record<string, unknown[]>; // 서버에서는 0,1,2.. key를 가진 배열
  };
  message: string;
};

async function fetchRestaurants(): Promise<Restaurant[]> {
  const isLoggedIn = useAuthStore.getState().isAuthed;

  // 로그인 여부에 따라 다른 API 호출
  const json: RestaurantResponse = isLoggedIn
    ? await getRestaurants()
    : await getRestaurantsForGuest();

  // flatten + 스키마 파싱
  const merged = Object.values(json.data.restaurants).flat();

  return merged.map((r) => RestaurantSchema.parse(r));
}

export const getRestaurantsQueryOptions = () => {
  return queryOptions({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });
};

// 훅
export function useGetRestaurants() {
  return useQuery(getRestaurantsQueryOptions());
}
