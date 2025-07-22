import { myblogListApi } from "@/lib/api/my/mypage";
import type { IBlogDataType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useMyBlogList = () => {
  return useQuery<IBlogDataType[]>({
    queryKey: ["myBlogs"],
    queryFn: myblogListApi,
  });
};
