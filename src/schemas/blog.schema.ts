import * as z from "zod";

export const BlogCreateSchema = z.object({
  title: z.string(),
  main_image: z.string(),
  sub_image: z.string(),
  category: z.number(),
  content: z.string(),
});
export type BlogFormValues = z.infer<typeof BlogCreateSchema>;
