import { Restaurant } from "@/types/restaurants.schema";
import normalize from "@/utils/normalize";
import allergenFilterMap from "@/constants/allergyFilterMap";
import veganFilterMap from "@/constants/veganFilterMap";

export default function filterRestaurants(
  data: Restaurant[],
  searchParams: URLSearchParams
): Restaurant[] {
  if (!data) return [];

  const query = normalize(searchParams.get("q") || "");

  const activeVeganFilters = Object.keys(veganFilterMap).filter(
    (key) => searchParams.get(key) === "true"
  );

  const activeAllergyExcludes = Object.keys(allergenFilterMap).filter(
    (key) => searchParams.get(key) === "true"
  );

  return data.filter((r) => {
    const name = normalize(r.name);
    const address = normalize(r.address);
    const menuText = r.menus?.map((m) => normalize(m.menuItem)).join(",") ?? "";

    const matchesQuery =
      query === "" ||
      name.includes(query) ||
      address.includes(query) ||
      menuText.includes(query);

    const hasAllVeganFlags = activeVeganFilters.every((key) => {
      const label = veganFilterMap[key as keyof typeof veganFilterMap];
      return r.veganFlags.includes(label);
    });

    const hasExcludedAllergy = activeAllergyExcludes.some((key) => {
      const allergen = allergenFilterMap[key as keyof typeof allergenFilterMap];
      return r.allergyFlags.includes(allergen);
    });

    return matchesQuery && hasAllVeganFlags && !hasExcludedAllergy;
  });
}
