import { blogDeleteApi } from "@/api/blog/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useBlogDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogDeleteApi,
    onSuccess: (id: number) => {
      queryClient.invalidateQueries({ queryKey: ["blogList"] });
      queryClient.invalidateQueries({ queryKey: ["blogDetail", id] });
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
