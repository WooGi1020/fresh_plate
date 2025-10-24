import { ReviewInfo, ReviewPostRequest } from "@/types/review.schema";
import apiClient from "./apiClient";
import { AxiosResponse } from "axios";

export const getReviews = async (id: number) => {
  const res: AxiosResponse = await apiClient.get(
    `api/restaurant/${id}/reviews`
  );
  return res.data.data.reviews as ReviewInfo[];
};

export const postReview = async (data: ReviewPostRequest) => {
  const res = await apiClient.post(`api/restaurant/review`, data);
  return res.data;
};
