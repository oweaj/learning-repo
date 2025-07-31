import { noticeCreateApi } from "@/lib/api/my/mypage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useNoticeCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: noticeCreateApi,
    onSuccess: (data) => {
      alert(data.message);
      router.replace("/my/notice");
      queryClient.invalidateQueries({ queryKey: ["notice_list"] });
    },
    onError: (error) => alert(error.message),
  });
};
