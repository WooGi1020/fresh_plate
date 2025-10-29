"use client";

import { useEffect, useRef, useMemo } from "react";
import allergyFilterMap from "@/constants/allergyFilterMap";
import { allergyKeys } from "@/utils/defaultFilters";
import { FilterKey } from "@/types/data";
import { useSearchFilters } from "@/hooks/useSearchFilters";

import AllegyIcon from "@/icons/allegy_icon.svg";
import FoodIcon from "@/icons/food_icon.svg";
import clsx from "clsx";

type Props = {
  onClose?: () => void;
  className?: string;
  userPreferredFilters?: FilterKey[]; // 🔹 유저 선호 필터 우선 표시
};

export default function HeaderFilterPanel({
  onClose,
  className,
  userPreferredFilters = [],
}: Props) {
  const { filters, updateFilters, resetFilters } = useSearchFilters();
  const containerRef = useRef<HTMLDivElement | null>(null);

  /** ✅ ESC / 외부 클릭 닫기 */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        onClose?.();
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  /** ✅ 유저 선호 필터를 우선적으로 정렬 */
  const sortedAllergyKeys = useMemo(() => {
    const preferred = allergyKeys.filter((k) =>
      userPreferredFilters.includes(k)
    );
    const others = allergyKeys.filter((k) => !userPreferredFilters.includes(k));
    return [...preferred, ...others];
  }, [userPreferredFilters]);

  const renderCheckbox = (
    key: FilterKey,
    label: string,
    colorClass?: string,
    isPreferred?: boolean
  ) => (
    <label
      key={key}
      className={clsx(
        "flex items-center gap-2 p-2 rounded-md border transition-all cursor-pointer relative ",
        filters[key]
          ? "bg-neutral-300 border-neutral-900"
          : "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50",
        isPreferred &&
          "border-yellow-500/70 bg-yellow-50 hover:border-yellow-500/90 hover:bg-yellow-100" // 🔹 유저 선호 강조
      )}
    >
      <input
        type="checkbox"
        checked={Boolean(filters[key])}
        onChange={(e) => updateFilters(key, e.target.checked)}
        className={clsx("accent-neutral-900", colorClass)}
      />
      <span className="text-sm font-medium">{label}</span>

      {isPreferred && (
        <AllegyIcon
          width={14}
          height={14}
          className="text-yellow-600 ml-auto absolute right-1.5"
        />
      )}
    </label>
  );

  return (
    <div
      ref={containerRef}
      className={clsx(
        `absolute left-0 top-full mt-2 w-full z-60 rounded-xl border border-neutral-200 
         bg-white shadow-xl p-4 space-y-5 animate-fade-down`,
        className
      )}
      role="dialog"
      aria-label="검색 필터"
    >
      {/* Ingredient Filter */}
      <section>
        <div className="flex items-center gap-2 text-[#3b3b3b] font-semibold mb-2">
          <FoodIcon width={18} height={20} />
          <span>비건 필터링</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {renderCheckbox("lacto", "락토")}
          {renderCheckbox("ovo", "오보")}
          {renderCheckbox("glutenfree", "글루텐프리")}
        </div>
      </section>

      {/* Allergy Filter */}
      <section className="pt-2 border-t border-neutral-200">
        <div className="flex items-center gap-2 text-red-600 font-semibold mb-2">
          <AllegyIcon width={18} height={18} fill="#dc2626" />
          <span>알레르기 유발 재료 필터링</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[35vh] overflow-y-auto pr-1">
          {sortedAllergyKeys.map((key) =>
            renderCheckbox(
              key,
              `${allergyFilterMap[key]} 제외`,
              "accent-red-600",
              userPreferredFilters.includes(key)
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
        <button
          onClick={() => {
            resetFilters();
            onClose?.();
          }}
          className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50"
        >
          초기화
        </button>
        <button
          onClick={() => onClose?.()}
          className="text-sm px-3 py-1.5 rounded-md bg-neutral-900 text-white hover:bg-neutral-800"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
