"use client";
import { FormValues } from "@/types/onBoard.schema";
import { UseFormSetValue } from "react-hook-form";

// Props 이름을 명확하게 변경합니다.
interface Props {
  tastePreferences: string[];
  setValue: UseFormSetValue<FormValues>;
}

// 선호하는 맛/취향 목록
export const PreferenceOptions = [
  { id: "cafe", label: "카페/디저트 선호" }, // 과자점, 디저트샵, 베이커리류
  { id: "restaurant", label: "식사 위주 음식점 선호" }, // 일반음식점
  { id: "korean", label: "한식 기반 음식점" },
  { id: "western", label: "양식 기반 음식점" },
  { id: "vegan_certified", label: "공식 채식 인증 음식점" },
  { id: "vegan_friendly", label: "비건 프렌들리 매장" },
  { id: "healthy_concept", label: "건강식/자연식 컨셉" },
  { id: "trendy_concept", label: "트렌디한 메뉴/퓨전 컨셉" },
  { id: "traditional_concept", label: "전통적인 분위기/사찰음식" },
];

// 컴포넌트 이름도 역할에 맞게 변경하는 것을 추천합니다. (예: TasteStep)
export default function LikeStep({ tastePreferences, setValue }: Props) {
  // 맛/취향을 선택하거나 해제하는 함수
  const toggleTaste = (taste: string) => {
    const current = tastePreferences || [];
    const next = current.includes(taste)
      ? current.filter((t) => t !== taste)
      : [...current, taste];
    // react-hook-form의 taste_preferences 필드를 업데이트합니다.
    setValue("taste_preferences", next, { shouldDirty: true });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">어떤 음식점을 선호하시나요?</h2>
      <p className="mb-4 text-sm text-gray-600">
        좋아하는 음식점 종류를 선택해주시면, 취향에 맞는 식당을 추천해드려요!
        (선택사항)
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 max-md:overflow-y-scroll max-md:h-48">
        {PreferenceOptions.map((taste) => {
          const selected = tastePreferences?.includes(taste.id);
          return (
            <button
              type="button"
              key={taste.id}
              onClick={() => toggleTaste(taste.id)}
              className={`border rounded-xl px-4 py-3 text-left transition cursor-pointer ${
                selected
                  ? "border-[#3E5329] bg-[#F0F6EA]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
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
