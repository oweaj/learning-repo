import { blogCreateApi } from "@/lib/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useBlogCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogCreateApi,
    onSuccess: (data) => {
      alert(data.message);
      router.replace("/");
      queryClient.invalidateQueries({ queryKey: ["blog_list"] });
    },
    onError: (error) => alert(error.message),
  });
};
