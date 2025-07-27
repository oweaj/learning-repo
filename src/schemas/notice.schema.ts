import * as z from "zod";

export const NoticeCreateSchema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수입니다.")
    .max(30, "제목은 최대 30자입니다"),
  content: z.string().min(10, "내용을 입력해주세요"),
});
export type BlogFormValues = z.infer<typeof NoticeCreateSchema>;
