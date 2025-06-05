import { blogUpdateApi } from "@/lib/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

export const useBlogUpdate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogUpdateApi,
    onSuccess: (id: number) => {
      alert("해당 블로그가 수정되었습니다.");
      router.replace(`/blog/${id}`);
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
      queryClient.invalidateQueries({ queryKey: ["blogDetail", id] });
    },
    onError: (error: Error) => alert(error.message),
  });
};
