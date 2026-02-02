"use client";
import { dietTypeArr } from "@/constants/dietType";
import { DietType } from "@/types/onBoard.schema";

interface Props {
  selectedTypes: DietType[];
  setValue: (name: string, value: any) => void;
}

export default function DietStep({ selectedTypes, setValue }: Props) {
  const toggleDiet = (key: DietType) => {
    if (key === "omnivore") {
      setValue("diet_types", ["omnivore"]);
      return;
    }
    if (selectedTypes.includes("omnivore")) {
      setValue("diet_types", [key]);
      return;
    }
    const next = selectedTypes.includes(key)
      ? selectedTypes.filter((k) => k !== key)
      : [...selectedTypes, key];
    setValue("diet_types", next);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-neutral-900">
        식습관 유형을 선택해주세요!{" "}
        <span className="text-sm text-gray-500">(복수 선택 가능)</span>
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {dietTypeArr.map((opt) => {
          const selected = selectedTypes.includes(opt.key);
          return (
            <button
              type="button"
              key={opt.key}
              onClick={() => toggleDiet(opt.key)}
              className={`border rounded-xl px-4 py-3 text-left transition cursor-pointer text-gray-800 ${
                selected
                  ? "border-[#3E5329] bg-[#F0F6EA]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      {!!selectedTypes.length && (
        <p className="text-sm text-gray-600 mt-3">
          {selectedTypes
            .map((k) => dietTypeArr.find((opt) => opt.key === k)?.label ?? k)
            .join(", ")}{" "}
          선택됨.
        </p>
      )}
    </div>
  );
}
