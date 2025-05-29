"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import rawData from "@/data/merged_vegan_restaurants.json";
import { Restaurant } from "vegan";
import normalize from "@/utils/normalize";
import allergenIngredientsMap from "@/constants/filter_list";

const rawdata = rawData as Restaurant[];

export default function useFilteredRestaurants(): Restaurant[] {
  const searchParams = useSearchParams();
  const [filtered, setFiltered] = useState<Restaurant[]>([]);

  useEffect(() => {
    const query = searchParams.get("q") || "";
    const normalizedQuery = normalize(query);

    const isGlutenFreeFilter = searchParams.get("glutenfree") === "true";

    const shouldExclude = (menu: string): boolean => {
      for (const [key, ingredients] of Object.entries(allergenIngredientsMap)) {
        if (key === "glutenfree") continue;

        if (searchParams.get(key) === "true") {
          if (ingredients.some((ingredient) => menu.includes(ingredient))) {
            return true;
          }
        }
      }
      return false;
    };

    const result = rawdata.filter((r) => {
      const name = normalize(r.name);
      const address = normalize(r.address);
      const menu = r.menu ?? "";

      const matchesQuery =
        normalizedQuery === "" || name.includes(normalizedQuery) || address.includes(normalizedQuery);

      if (!matchesQuery) return false;

      if (isGlutenFreeFilter) {
        return menu.includes("글루텐프리");
      } else {
        // 그 외에는 기존 제외 필터만 적용
        return !shouldExclude(menu);
      }
    });

    setFiltered(result);
  }, [searchParams]);

  return filtered;
}
