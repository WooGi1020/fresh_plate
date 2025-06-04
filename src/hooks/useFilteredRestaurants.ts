"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Restaurant } from "vegan";
import filterRestaurants from "@/utils/filterRestaurants";

export default function useFilteredRestaurants(data: Restaurant[]): Restaurant[] {
  const searchParams = useSearchParams();
  const [filtered, setFiltered] = useState<Restaurant[]>([]);

  useEffect(() => {
    const result = filterRestaurants(data, searchParams);
    setFiltered(result);
  }, [data, searchParams.toString()]);

  return filtered;
}
