import { blogDetailApi } from "@/lib/api/blog/blog";
import type { TBlogListType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useBlogDetail = ({ id }: { id: number }) => {
  const { data } = useQuery<TBlogListType>({
    queryKey: ["blogDetail", id],
    queryFn: () => blogDetailApi(id),
  });

  return data;
};
