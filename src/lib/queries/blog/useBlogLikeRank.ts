import { blogLikeRankApi } from "@/lib/api/blog/blog";
import type { IBlogDataType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useBlogLikeRank = () => {
  return useQuery<IBlogDataType[]>({
    queryKey: ["blog_rank"],
    queryFn: blogLikeRankApi,
  });
};
