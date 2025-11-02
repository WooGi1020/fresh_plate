"use client";
import { KnownAllergens } from "@/constants/knownAllegens";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface Props {
  allergies: string[];
  setValue: UseFormSetValue<any>;
}

export default function AllergyStep({ allergies, setValue }: Props) {
  const [input, setInput] = useState("");

  const uniquePush = (list: string[], value: string) =>
    value && !list.includes(value) ? [...list, value] : list;

  const addTag = (value: string) => {
    const next = uniquePush(allergies, value.trim());
    setValue("allergies", next, { shouldDirty: true });
  };
  const removeTag = (v: string) => {
    setValue(
      "allergies",
      allergies.filter((t) => t !== v),
      {
        shouldDirty: true,
      }
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">피해야할 재료를 알려주세요!</h2>
      <p className=" mb-4 text-sm text-gray-600">
        식약처가 정한 국내 공식 알레르기 유발 재료 목록입니다 😊
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4 max-md:overflow-y-scroll max-md:h-48">
        {KnownAllergens.map((a) => {
          const checked = allergies.includes(a);
          return (
            <label
              key={a}
              className={`cursor-pointer border rounded-xl px-4 py-2 text-sm transition ${
                checked
                  ? "border-[#3E5329] bg-[#F0F6EA]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <input
                type="checkbox"
                className="mr-2 accent-[#3E5329]"
                checked={checked}
                onChange={(e) => (e.target.checked ? addTag(a) : removeTag(a))}
              />
              {a}
            </label>
          );
        })}
      </div>

      {!!allergies.length && (
        <div className="flex flex-wrap gap-2 mt-4">
          {allergies.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-gray-100 rounded-full px-3 py-1 flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
