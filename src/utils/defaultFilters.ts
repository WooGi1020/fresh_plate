import { allergyFilterMap } from "@/constants/allergyFilterMap";

export const allergyKeys = Object.keys(
  allergyFilterMap
) as (keyof typeof allergyFilterMap)[];

export const defaultFilters: Record<string, string | boolean> = {
  q: "",
  location: false,
  lacto: false,
  ovo: false,
  glutenfree: false,
  ...Object.fromEntries(allergyKeys.map((key) => [key, false])),
};
