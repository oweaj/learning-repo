import { type TBlogListType, getBlogList } from "@/app/actions/blog.action";
import { useQuery } from "@tanstack/react-query";

export const useBlogList = ({
  category,
  page,
}: { category: string; page: number }) => {
  const data = useQuery<TBlogListType[]>({
    queryKey: ["blogList", { category, page, limit: 10 }],
    queryFn: () => getBlogList({ category, page, limit: 10 }),
  });

  return data;
};
