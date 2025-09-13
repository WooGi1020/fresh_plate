"use client";
import { DietType } from "@/types/onBoard.schema";
import { UseFormSetValue, FieldErrors } from "react-hook-form";

interface Props {
  dietTypes: DietType[];
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

const dietTypeArr: ReadonlyArray<{ key: DietType; label: string }> = [
  { key: "glutenfree", label: "글루텐프리" },
  { key: "lacto", label: "락토" },
  { key: "ovo", label: "오보" },
  { key: "omnivore", label: "일반식" },
];

export default function DietStep({ dietTypes, setValue, errors }: Props) {
  const toggleDiet = (key: DietType) => {
    if (key === "omnivore") {
      setValue("diet_types", ["omnivore"], { shouldValidate: true });
      return;
    }
    if (dietTypes.includes("omnivore")) {
      setValue("diet_types", [key], { shouldValidate: true });
      return;
    }
    const next = dietTypes.includes(key)
      ? dietTypes.filter((k) => k !== key)
      : [...dietTypes, key];
    setValue("diet_types", next, { shouldValidate: true });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">
        식습관 유형을 선택해주세요!{" "}
        <span className="text-sm text-gray-500">(복수 선택 가능)</span>
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {dietTypeArr.map((opt) => {
          const selected = dietTypes.includes(opt.key);
          return (
            <button
              type="button"
              key={opt.key}
              onClick={() => toggleDiet(opt.key)}
              className={`border rounded-xl px-4 py-3 text-left transition cursor-pointer ${
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
      {!!dietTypes.length && (
        <p className="text-sm text-gray-600 mt-3">
          {dietTypes
            .map((k) => dietTypeArr.find((opt) => opt.key === k)?.label ?? k)
            .join(", ")}{" "}
          선택됨.
        </p>
      )}
      {errors.diet_types && (
        <p className="text-sm text-red-600 mt-2">
          {errors.diet_types.message as string}
        </p>
      )}
    </div>
  );
}
