import apiClient from "./apiClient";

export const getRestaurants = async () => {
  const res = await apiClient.get("api/restaurant");
  return res.data;
};

export const getRestaurantsForGuest = async () => {
  const res = await apiClient.get("api/restaurant/all");
  return res.data;
};
