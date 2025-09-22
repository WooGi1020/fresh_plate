"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Restaurant } from "@/types/restaurants.schema";
import filterRestaurants from "@/utils/filterRestaurants";

export default function useFilteredRestaurants(
  data: Restaurant[]
): Restaurant[] {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    return filterRestaurants(data, searchParams);
  }, [data, searchParams.toString()]);

  return filtered;
}
