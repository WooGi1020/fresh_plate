import z from "zod";

export type Mode = "signin" | "signup";

// Zod 스키마
export const SigninSchema = z.object({
  memberId: z.string().min(1, "아이디를 입력하세요."),
  password: z.string().min(4, "비밀번호는 최소 4자 이상입니다."),
});
export type SigninValues = z.infer<typeof SigninSchema>;

const SignupBaseSchema = z.object({
  memberId: z.string(),
  nickname: z.string(),
  password: z.string(),
  password2: z.string(),
});

export const SignupSchema = SignupBaseSchema.refine(
  (data) => data.password === data.password2,
  {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["password2"],
  }
);

const SignupSubsetSchema = SignupBaseSchema.pick({
  memberId: true,
  nickname: true,
  password: true,
});

export type SignupValues = z.infer<typeof SignupSubsetSchema>;
