import { blogCreateApi } from "@/lib/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useBlogCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogCreateApi,
    onSuccess: () => {
      alert("블로그 글이 등록되었습니다.");
      router.replace("/");
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
    },
    onError: (error) => alert(error.message),
  });
};
