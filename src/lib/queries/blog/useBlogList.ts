import { blogListApi } from "@/lib/api/blog/blog";
import type { IBlogListType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useBlogList = ({
  category,
  page,
}: { category: string | null; page: number }) => {
  const data = useQuery<IBlogListType>({
    queryKey: ["blog_list", category, page],
    queryFn: () => blogListApi(category, page),
  });

  return data.data;
};
