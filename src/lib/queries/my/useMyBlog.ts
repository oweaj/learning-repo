import { myblogListApi } from "@/lib/api/my/mypage";
import type { IBlogDataType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useMyBlogList = (limit?: string) => {
  return useQuery<IBlogDataType[]>({
    queryKey: ["myBlogs", limit ?? "limit"],
    queryFn: () => myblogListApi(limit),
  });
};
