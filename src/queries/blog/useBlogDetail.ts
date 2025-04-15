import { blogDetailApi } from "@/api/blog/blog";
import type { BlogListType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useBlogDetail = ({ id }: { id: number }) => {
  const { data } = useQuery<BlogListType>({
    queryKey: ["blogDetail", id],
    queryFn: () => blogDetailApi(id),
  });

  return data;
};
