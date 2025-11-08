import { allergyFilterMapReversed } from "@/constants/allergyFilterMap";

const userPreferredLink = (userPreferredFilters: string[]) => {
  const userPreferredLink =
    "?" +
    userPreferredFilters
      .filter((f) => f !== "omnivore")
      .map((f) => encodeURIComponent(allergyFilterMapReversed[f]) + `=true`)
      .join("&");
  return userPreferredLink;
};

export default userPreferredLink;
