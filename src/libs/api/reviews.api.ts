import { ReviewPostRequest } from "@/types/review.schema";
import apiClient from "./apiClient";

export const getReviews = async (id: number) => {
  const res = await apiClient.get(`api/restaurant/${id}/reviews`);
  return res.data;
};

export const postReview = async (data: ReviewPostRequest) => {
  const res = await apiClient.post(`api/restaurant/review`, data);
  return res.data;
};
