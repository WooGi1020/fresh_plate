import z from "zod";

export type Mode = "signin" | "signup";

// Zod 스키마
export const SigninSchema = z.object({
  id: z.string().min(1, "아이디를 입력하세요."),
  password: z.string().min(4, "비밀번호는 최소 4자 이상입니다."),
});
export type SigninValues = z.infer<typeof SigninSchema>;

export const SignupSchema = z
  .object({
    id: z.string().min(4, "아이디는 최소 4자 이상입니다."),
    nickname: z.string().min(2, "닉네임은 최소 2자 이상입니다."),
    password: z.string().min(6, "비밀번호는 최소 6자 이상입니다."),
    password2: z.string().min(6, "비밀번호 확인은 최소 6자 이상입니다."),
  })
  .refine((v) => v.password === v.password2, {
    path: ["password2"],
    message: "비밀번호가 일치하지 않습니다.",
  });
export type SignupValues = z.infer<typeof SignupSchema>;
