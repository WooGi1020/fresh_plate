// libs/query/getRestaurantQuery.ts
import { useQuery } from "@tanstack/react-query";
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

// 실제 데이터 fetching 함수
async function fetchRestaurants(isLoggedIn: boolean): Promise<Restaurant[]> {
  const json: RestaurantResponse = isLoggedIn
    ? await getRestaurants()
    : await getRestaurantsForGuest();

  // flatten + 스키마 파싱
  const merged = Object.values(json.data.restaurants).flat();

  return merged.map((r) => RestaurantSchema.parse(r));
}

// 훅
export function useGetRestaurants() {
  const isLoggedIn = useAuthStore((state) => state.isAuthed); // Zustand selector 사용

  return useQuery<Restaurant[]>({
    queryKey: ["restaurants", isLoggedIn],
    queryFn: () => fetchRestaurants(isLoggedIn),
    staleTime: 1000 * 60 * 5,
  });
}
