import { defaultFilters } from "@/utils/defaultFilters";

declare module "vegan" {
  type Filters = typeof defaultFilters;
  type FilterKey = keyof Filters;
}
