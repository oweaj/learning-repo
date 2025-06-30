import * as z from "zod";

export const signinSchema = z.object({
  email: z.string().email("이메일 형식으로 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상입니다."),
});

export const signupSchema = z
  .object({
    name: z.string().min(2, "아이디는 최소 2자 이상입니다."),
    email: z.string().email("이메일 형식으로 입력해주세요."),
    password: z
      .string()
      .min(6, "비밀번호는 최소 6자 이상입니다.")
      .regex(
        /^(?=.*[a-z])(?=.*\d)[a-z\d]+$/i,
        "비밀번호는 영문자와 숫자를 포함해야 합니다.",
      ),
    passwordConfirm: z.string().min(1, "비밀번호를 다시 확인해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });
export type signinFormValues = z.infer<typeof signinSchema>;
export type signupFormValues = z.infer<typeof signupSchema>;
