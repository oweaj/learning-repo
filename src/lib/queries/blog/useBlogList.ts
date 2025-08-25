import { blogListApi } from "@/lib/api/blog/blog";
import type { IBlogListType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useBlogList = ({
  category,
  page,
  keyword,
}: {
  category: string | null;
  page: number;
  keyword?: string | null;
}) => {
  return useQuery<IBlogListType>({
    queryKey: ["blog_list", category, page, keyword],
    queryFn: () => blogListApi(category, page, keyword),
  });
};
