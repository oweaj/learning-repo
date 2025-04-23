import * as z from "zod";

export const BlogCreateSchema = z.object({
  title: z
    .string()
    .min(1, "제목은 필수입니다.")
    .max(30, "제목은 최대 30자입니다"),
  main_image: z.string().min(1, "대표 이미지는 필수입니다"),
  sub_image: z.string(),
  category: z.number().min(1, "카테고리를 선택해주세요"),
  content: z.string().min(10, "내용을 입력해주세요"),
});
export type BlogFormValues = z.infer<typeof BlogCreateSchema>;
