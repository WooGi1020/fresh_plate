import { Restaurant } from "@/types/restaurants.schema";
import { useMemo } from "react";

export default function useSortedData(
  data: Restaurant[],
  sortBy: string,
): { sortedData: Restaurant[]; length: number } {
  const sortedData = useMemo(() => {
    if (!data) return [];
    const dataCopy = [...data];

    switch (sortBy) {
      case "추천":
        return dataCopy.sort((a, b) => {
          const getPriority = (r: typeof a) => {
            // 알러지 위험이 있으면 최하위
            if (r.allergyLevel! > 0) return 0;

            // 추천 → 최상위
            if (r.recommended) return 2;

            // 일반 (추천 X, 알러지 X)
            return 1;
          };

          return getPriority(b) - getPriority(a);
        });

      case "별점":
        return dataCopy.sort((a, b) => {
          if (b.avgRating !== a.avgRating) {
            return (b.avgRating ?? 0) - (a.avgRating ?? 0);
          }
          return 0;
        });
      case "최신화":
        return dataCopy.sort((a, b) => {
          const aDate = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const bDate = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return bDate - aDate;
        });
      default:
        return dataCopy;
    }
  }, [data, sortBy]);

  return { sortedData, length: sortedData.length };
}
