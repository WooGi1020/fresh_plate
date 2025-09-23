"use client";

import { useEffect, useState } from "react";

export default function useMatchMedia(
  query: string,
  defaultValue = true // 👉 PC 기준 가정
) {
  const [matches, setMatches] = useState<boolean>(defaultValue);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setMatches(e.matches);

    // 초기값 동기화
    setMatches(mql.matches);

    if ("addEventListener" in mql) {
      mql.addEventListener("change", handler as EventListener);
    } else {
      (mql as any).addListener(handler);
    }

    return () => {
      if ("removeEventListener" in mql) {
        mql.removeEventListener("change", handler as EventListener);
      } else {
        (mql as any).removeListener(handler);
      }
    };
  }, [query]);

  return matches;
}
