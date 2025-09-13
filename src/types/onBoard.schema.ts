import z from "zod";

export type DietType = "glutenfree" | "lacto" | "ovo" | "omnivore";

const DietEnum = z.enum(["glutenfree", "lacto", "ovo", "omnivore"]);
export const onboardingSchema = z.object({
  diet_types: z
    .array(DietEnum)
    .nonempty("식습관을 하나 이상 선택하세요.")
    .refine(
      (arr) => (arr.includes("omnivore") ? arr.length === 1 : true),
      "일반식(omnivore)은 단독으로만 선택할 수 있어요."
    ),
  allergies: z.array(z.string().trim().min(1)),
  // ingredient_blacklist: z.array(z.string().trim().min(1)),
  taste_preferences: z.array(z.string().trim().min(1)),
});

export type FormValues = z.infer<typeof onboardingSchema>;
