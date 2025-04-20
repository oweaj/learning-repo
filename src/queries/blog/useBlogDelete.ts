import { blogDeleteApi } from "@/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useBlogDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogDeleteApi,
    onSuccess: () => {
      alert("해당 블로그 글이 삭제되었습니다.");
      router.push("/0");
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "블로그 삭제중 오류가 발생했습니다.";
        throw new Error(errorMessage);
      }
      throw new Error("네트워크 오류로 인해 다시 시도해주세요.");
    },
  });
};
