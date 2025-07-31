import { blogDeleteApi } from "@/lib/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useBlogDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogDeleteApi,
    onSuccess: (data) => {
      alert(data.message);
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["blog_list"] });
    },
    onError: (error) => alert(error.message),
  });
};
