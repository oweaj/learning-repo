import { blogUpdateApi } from "@/lib/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export const useBlogUpdate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogUpdateApi,
    onSuccess: ({ data, id }) => {
      alert(data.message);
      router.replace(`/blog/${id}`);
      queryClient.invalidateQueries({ queryKey: ["blog_list"] });
      queryClient.invalidateQueries({ queryKey: ["blogDetail", id] });
    },
    onError: (error: Error) => alert(error.message),
  });
};
