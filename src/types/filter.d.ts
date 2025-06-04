import { defaultFilters } from "@/constants/defaultFilters";

declare module "vegan" {
  type Filters = typeof defaultFilters;
  type FilterKey = keyof Filters;
}
