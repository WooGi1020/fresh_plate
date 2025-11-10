import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReview } from "../api/reviews.api";
import type {
  ReviewPostRequest,
  ReviewPostResponse,
} from "@/types/review.schema";

export const usePostReview = () => {
  const queryClient = useQueryClient();

  return useMutation<ReviewPostResponse, Error, ReviewPostRequest>({
    mutationFn: postReview,
    onSuccess: (_data, variables) => {
      queryClient.refetchQueries({
        queryKey: ["reviews", Number(variables.restaurantId)],
      });
    },
  });
};
