import { defaultFilters } from "@/utils/defaultFilters";

export type Filters = typeof defaultFilters;
export type FilterKey = keyof Filters;
