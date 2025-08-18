import { myblogListApi } from "@/lib/api/my/mypage";
import type { IMyBlogDataType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useMyBlogList = () => {
  return useQuery<IMyBlogDataType>({
    queryKey: ["myBlogs"],
    queryFn: myblogListApi,
  });
};
