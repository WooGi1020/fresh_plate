"use client";
import { PreferenceOptions } from "@/constants/preferenceOptions";
import { FormValues } from "@/types/onBoard.schema";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  tastePreferences: string[];
  setValue: UseFormSetValue<FormValues>;
}

export default function LikeStep({ tastePreferences, setValue }: Props) {
  const toggleTaste = (taste: string) => {
    const current = tastePreferences || [];

    // 이미 선택된 경우 → 제거
    if (current.includes(taste)) {
      const next = current.filter((t) => t !== taste);
      setValue("taste_preferences", next, { shouldDirty: true });
      return;
    }

    // 새 항목 추가
    const next = [...current, taste];
    setValue("taste_preferences", next, { shouldDirty: true });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">어떤 음식점을 선호하시나요?</h2>
      <p className="mb-4 text-sm text-gray-600">
        좋아하는 음식점 종류를 선택해주시면, 취향에 맞는 식당을 우선적으로
        보여드려요! (최대 3개 선택 가능)
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 max-md:overflow-y-scroll max-md:h-48">
        {PreferenceOptions.map((taste) => {
          const selected = tastePreferences?.includes(taste.id);
          const disabled = !selected && tastePreferences.length >= 3; // 3개 선택 시 나머지는 비활성화

          return (
            <button
              type="button"
              key={taste.id}
              onClick={() => toggleTaste(taste.id)}
              disabled={disabled}
              className={`border rounded-xl px-4 py-3 text-left transition cursor-pointer ${
                selected
                  ? "border-[#3E5329] bg-[#F0F6EA]"
                  : "border-gray-200 hover:border-gray-300"
              } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {taste.label}
            </button>
          );
        })}
      </div>

      {!!tastePreferences?.length && (
        <p className="text-sm text-gray-600 mt-3">
          <span className="font-bold text-shadow-neutral-700">
            {tastePreferences
              .map(
                (id) =>
                  PreferenceOptions.find((opt) => opt.id === id)?.label ?? id
              )
              .join(", ")}
          </span>{" "}
          선택됨.
        </p>
      )}
    </div>
  );
}
