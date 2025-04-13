import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "비밀번호는 최소 1자 이상입니다.")
    .email("이메일 형식이 아닙니다."),
  password: z
    .string()
    .min(1, "비밀번호는 최소 1자 이상입니다.")
    .regex(
      /^(?=.*[a-z])(?=.*\d)[a-z\d]+$/i,
      "비밀번호는 영문자와 숫자를 포함해야 합니다.",
    ),
});
export type LoginFormValues = z.infer<typeof loginSchema>;
