import { myLikeBlogsApi } from "@/lib/api/my/mypage";
import type { IMyLikeBlogDataType } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useMyLikeBlogList = () => {
  return useQuery<IMyLikeBlogDataType>({
    queryKey: ["myLikeBlogs"],
    queryFn: myLikeBlogsApi,
  });
};
