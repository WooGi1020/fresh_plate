"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AllergyStep from "./components/AllegyStep";
import DietStep from "./components/DietStep";
import BlacklistStep from "./components/LikeStep";
import { FormValues, onboardingSchema } from "@/types/onBoard.schema";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const totalSteps = 3;

  // useForm 선언
  const methods = useForm<FormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      diet_types: [],
      allergies: [],
      taste_preferences: [],
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = methods;

  // 스텝 컴포넌트에 내려줄 값들
  const dietTypes = watch("diet_types");
  const allergies = watch("allergies");
  const tastePreferences = watch("taste_preferences");

  const progress = useMemo(
    () => Math.round(((step + 1) / totalSteps) * 100),
    [step, totalSteps]
  );

  const goNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (step === 0) {
      const isStepValid = await trigger("diet_types");
      if (!isStepValid) return;
    }

    setStep((prev) => {
      if (prev < totalSteps - 1) {
        return prev + 1;
      }
      return prev;
    });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setSaving(true);
    try {
      // api 연동 부분
      console.log(data);
      router.replace("/search");
    } catch {
      alert("저장 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#FBF8EF] px-4 py-10 bg-[url('/images/bg.png')] bg-cover">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl bg-white border rounded-3xl shadow-md p-6 md:p-8"
        >
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>새로운 사용자를 위한 설정 단계에요!</span>
              <span>
                {step + 1}/{totalSteps}
              </span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded">
              <div
                className="h-2 bg-[#3E5329] rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step Components */}
          {step === 0 && (
            <DietStep
              dietTypes={dietTypes}
              setValue={setValue}
              errors={errors}
            />
          )}
          {step === 1 && (
            <AllergyStep allergies={allergies} setValue={setValue} />
          )}
          {step === 2 && (
            <BlacklistStep
              tastePreferences={tastePreferences}
              setValue={setValue}
            />
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-gray-200 hover:border-gray-300 cursor-pointer"
              disabled={step === 0}
              onClick={() => setStep((s) => Math.max(0, s - 1))}
            >
              이전
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-xl cursor-pointer text-gray-600 hover:bg-gray-50"
                onClick={() => router.replace("/search")}
              >
                나중에 설정
              </button>
              {step < totalSteps - 1 ? (
                <button
                  type="button"
                  className="px-5 py-2 cursor-pointer rounded-xl bg-[#3E5329] text-white disabled:opacity-50"
                  onClick={goNext}
                  disabled={step === 0 && dietTypes.length === 0}
                >
                  다음
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl cursor-pointer bg-[#3E5329] text-white disabled:opacity-50"
                  disabled={saving}
                >
                  {saving ? "저장 중..." : "시작하기"}
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            * 설정은 언제든 마이페이지에서 수정할 수 있어요. 선택한 조건은 기본
            필터로 추천에 반영됩니다.
          </p>
        </form>
      </FormProvider>
    </section>
  );
}
