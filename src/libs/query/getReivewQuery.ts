import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../api/reviews.api";
import type { ReviewInfo } from "@/types/review.schema";

export function useGetReviews(id: number) {
  return useQuery<ReviewInfo[]>({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const data = await getReviews(id);
      const list = Array.isArray(data) ? data : (data as any)?.reviews ?? [];
      return list as ReviewInfo[];
    },
    placeholderData: [],
    staleTime: 1000 * 60,
    enabled: !!id,
  });
}
