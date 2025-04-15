import { blogListApi } from "@/api/blog/blog";
import type { BlogListType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useBlogList = ({
  category,
  page,
}: { category: number; page: number }) => {
  const data = useQuery<BlogListType[]>({
    queryKey: ["blogList", { category_id: category, page, page_size: 10 }],
    queryFn: () => blogListApi({ category_id: category, page, page_size: 10 }),
  });

  return data;
};
