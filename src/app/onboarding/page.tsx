"use client";

import { useEffect, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

import AllergyStep from "./(components)/AllegyStep";
import DietStep from "./(components)/DietStep";
import BlacklistStep from "./(components)/LikeStep";
import { onboardingSchema } from "@/types/onBoard.schema";
import { setOnboardingAction } from "@/libs/actions/onboarding";
import toast from "react-hot-toast";
import { useAuthStore, User } from "@/store/useAuthStore";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const setUser = useAuthStore((s) => s.setUser);
  const user = useAuthStore((s) => s.user);
  const TOTAL_STEPS = 3;

  useEffect(() => {
    document.cookie = "onboardingAllowed=; Path=/; Max-Age=0";
  }, []);

  // 로컬 상태로 폼 데이터 관리
  const [formData, setFormData] = useState({
    diet_types: [] as string[],
    allergies: [] as string[],
    taste_preferences: [] as string[],
  });

  const setValue = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [, formAction, isPending] = useActionState(async (_prevState: any) => {
    // 클라이언트에서 최종 검증
    const validated = onboardingSchema.safeParse(formData);
    if (!validated.success) {
      toast.error(validated.error.message);
      return { success: false };
    }

    const result = await setOnboardingAction(null, formData as any);
    if (result.success) {
      setUser({
        ...(user ?? {}),
        eatStyles: [...formData.diet_types, ...formData.allergies],
      } as User);
      toast.success("설정이 완료되었습니다!");
      router.replace(`/search`);
    } else {
      toast.error(result.error || "저장 중 오류가 발생했습니다.");
    }
    return result;
  }, null);

  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  const handleNext = () => {
    if (step === 0) {
      if (formData.diet_types.length === 0) {
        toast.error("식습관을 하나 이상 선택하세요.");
        return;
      }
      if (
        formData.diet_types.includes("omnivore") &&
        formData.diet_types.length > 1
      ) {
        toast.error("일반식(omnivore)은 단독으로만 선택할 수 있어요.");
        return;
      }
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#FBF8EF] px-4 py-10 bg-[url('/images/bg2.png')] bg-cover">
      <form
        action={formAction}
        className="w-full max-w-3xl bg-white border rounded-3xl shadow-md p-6 md:p-8"
      >
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2 font-medium">
            <span>반가워요😊 새로운 사용자를 위한 설정 단계입니다!</span>
            <span className="text-[#3E5329] font-bold">
              {step + 1} / {TOTAL_STEPS}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-[#A3C76D] h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="min-h-[400px]">
          {step === 0 && (
            <DietStep
              selectedTypes={formData.diet_types as any}
              setValue={setValue as any}
            />
          )}
          {step === 1 && (
            <AllergyStep
              allergies={formData.allergies}
              setValue={setValue as any}
            />
          )}
          {step === 2 && (
            <BlacklistStep
              preferences={formData.taste_preferences}
              setValue={setValue as any}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-semibold hover:bg-gray-50 transition cursor-pointer disabled:opacity-30"
            disabled={step === 0 || isPending}
            onClick={() => setStep((s) => s - 1)}
          >
            이전
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-xl cursor-pointer text-gray-600 hover:bg-gray-50 transition"
              onClick={() => router.replace("/search")}
            >
              나중에 설정
            </button>
            {step < TOTAL_STEPS - 1 ? (
              <button
                type="button"
                className="px-8 py-3 rounded-xl bg-[#3E5329] text-white font-semibold hover:bg-[#344823] transition shadow-md cursor-pointer"
                onClick={handleNext}
              >
                다음 단계
              </button>
            ) : (
              <SubmitButton />
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          * 설정은 언제든 마이페이지에서 수정할 수 있어요. 선택한 조건은 기본
          필터로 추천에 반영됩니다.
        </p>
      </form>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="px-8 py-3 rounded-xl bg-[#85A947] text-white font-semibold hover:bg-[#74963C] transition shadow-md cursor-pointer disabled:bg-gray-400"
      disabled={pending}
    >
      {pending ? "저장 중..." : "설정 완료"}
    </button>
  );
}
