import { noticeDeleteApi } from "@/lib/api/my/mypage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useNoticeDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: noticeDeleteApi,
    onSuccess: (data) => {
      alert(data.message);
      router.replace("/my/notice");
      queryClient.invalidateQueries({ queryKey: ["notice_list"] });
    },
    onError: (error) => alert(error.message),
  });
};
