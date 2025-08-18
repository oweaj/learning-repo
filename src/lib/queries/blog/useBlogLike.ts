import { blogLikeApi } from "@/lib/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useBlogLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogLikeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_list"] });
      queryClient.invalidateQueries({ queryKey: ["blogDetail"] });
      queryClient.invalidateQueries({ queryKey: ["myLikeBlogs"] });
    },
    onError: (error) => alert(error.message),
  });
};
