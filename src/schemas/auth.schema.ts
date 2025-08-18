import { BLOG_CATEGORY } from "@/constants/blog/blog";
import * as z from "zod";

const filterCategory = BLOG_CATEGORY.filter((item) => item.value !== "all").map(
  (item) => item.value,
);

export const signinSchema = z.object({
  email: z.string().email("이메일 형식으로 입력해주세요."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상입니다."),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, "닉네임은 최소 2자 이상입니다.")
      .max(8, "닉네임은 최대 8자 이하입니다."),
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

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "닉네임은 최소 2자 이상입니다.")
    .max(8, "닉네임은 최대 8자 이하입니다."),
  introduce: z.string().min(1, "자기소개는 최소 1자 이상입니다."),
  like_category: z
    .array(
      z.string().refine((val) => filterCategory.includes(val), {
        message: "카테고리를 선택하주세요.",
      }),
    )
    .refine((arr) => arr.length > 0, {
      message: "카테고리를 선택해주세요.",
    }),
});

export type signinFormValues = z.infer<typeof signinSchema>;
export type signupFormValues = z.infer<typeof signupSchema>;
export type userFormValues = z.infer<typeof userSchema>;
