import { Restaurant } from "@/types/restaurants.schema";
import normalize from "@/utils/normalize";
import { allergyFilterMap } from "@/constants/allergyFilterMap";
import veganFilterMap from "@/constants/veganFilterMap";
import { jaccardSimilarity } from "@/utils/jaccard";

export default function filterRestaurants(
  data: Restaurant[],
  searchParams: URLSearchParams
): Restaurant[] {
  if (!data) return [];

  const query = normalize(searchParams.get("q") || "");

  const activeVeganFilters = Object.keys(veganFilterMap).filter(
    (key) => searchParams.get(key) === "true"
  );

  const activeAllergyExcludes = Object.keys(allergyFilterMap).filter(
    (key) => searchParams.get(key) === "true"
  );

  return data.filter((r) => {
    const name = normalize(r.name);
    const address = normalize(r.address);
    const menuText = r.menus?.map((m) => normalize(m.menuItem)).join(",") ?? "";

    // ✅ Jaccard 유사도 기반 검색
    const nameScore = jaccardSimilarity(name, query);
    const addrScore = jaccardSimilarity(address, query);
    const menuScore = jaccardSimilarity(menuText, query);

    const matchesQuery =
      query === "" ||
      name.includes(query) ||
      address.includes(query) ||
      menuText.includes(query) ||
      Math.max(nameScore, addrScore, menuScore) >= 0.3; // 🔹유사도 기준값 (조정 가능)

    const hasAllVeganFlags = activeVeganFilters.every((key) => {
      const label = veganFilterMap[key as keyof typeof veganFilterMap];
      return r.veganFlags.includes(label);
    });

    const hasExcludedAllergy = activeAllergyExcludes.some((key) => {
      const allergen = allergyFilterMap[key as keyof typeof allergyFilterMap];
      return r.allergyFlags.includes(allergen);
    });

    return matchesQuery && hasAllVeganFlags && !hasExcludedAllergy;
  });
}
