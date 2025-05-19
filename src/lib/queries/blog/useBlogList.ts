import type { TBlogListType } from "@/app/actions/blog.action";
import { blogListApi } from "@/lib/api/blog/blog";
import { useQuery } from "@tanstack/react-query";

export const useBlogList = ({
  category,
  page,
}: { category: string; page: number }) => {
  const data = useQuery<TBlogListType[]>({
    queryKey: ["blogList", { category, page, limit: 10 }],
    queryFn: () => blogListApi({ category, page, limit: 10 }),
  });

  return data;
};
