import { blogDeleteApi } from "@/lib/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useBlogDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogDeleteApi,
    onSuccess: () => {
      alert("해당 블로그 글이 삭제되었습니다.");
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["blog_list"] });
    },
    onError: (error) => alert(error.message),
  });
};
