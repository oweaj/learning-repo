import { myblogLikeApi } from "@/lib/api/my/mypage";
import { useQuery } from "@tanstack/react-query";

export const useMyBlogLike = () => {
  const data = useQuery({
    queryKey: ["myBlogLike"],
    queryFn: myblogLikeApi,
  });

  return data.data;
};
