import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type React from "react";
import { FilterKey, Filters } from "vegan";
import { defaultFilters } from "@/utils/defaultFilters";

export const parseSearchParams = (
  searchParams: ReturnType<typeof useSearchParams>
): Filters => {
  const parsed: Filters = { ...defaultFilters };
  for (const key in defaultFilters) {
    const val = searchParams.get(key);
    if (val !== null) {
      parsed[key as FilterKey] =
        val === "true" ? true : val === "false" ? false : val;
    }
  }
  return parsed;
};

export function useSearchFilters() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>(() =>
    parseSearchParams(searchParams)
  );
  const [searchInput, setSearchInput] = useState<string>(
    String(filters.q ?? "")
  );

  useEffect(() => {
    const next = parseSearchParams(searchParams);
    setFilters(next);
    setSearchInput(String(next.q ?? ""));
  }, [searchParams]);

  const replaceWith = useCallback(
    (updated: Filters) => {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(updated)) {
        if (v !== false && v !== "") params.set(k, String(v));
      }
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router]
  );

  const updateFilters = useCallback(
    (key: FilterKey, value: string | boolean) => {
      const updated = { ...filters, [key]: value };
      setFilters(updated);
      replaceWith(updated);
    },
    [filters, replaceWith]
  );

  const applySearchInput = useCallback(() => {
    const trimmed = (searchInput ?? "").trim();
    if (!trimmed) return;
    updateFilters("q", trimmed);
  }, [searchInput, updateFilters]);

  const resetFilters = useCallback(() => {
    router.replace(`${pathname}`);
  }, [pathname, router]);

  const handleSearchKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        applySearchInput();
      }
    },
    [applySearchInput]
  );

  return {
    filters,
    setFilters,
    searchInput,
    setSearchInput,
    updateFilters,
    applySearchInput,
    resetFilters,
    handleSearchKeyDown,
  };
}
