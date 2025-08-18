import { myLikeBlogsApi } from "@/lib/api/my/mypage";
import type { IMyBlogDataType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useMyLikeBlogList = () => {
  return useQuery<IMyBlogDataType>({
    queryKey: ["myLikeBlogs"],
    queryFn: myLikeBlogsApi,
  });
};
