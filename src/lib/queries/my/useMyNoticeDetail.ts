import { noticeDetailApi } from "@/lib/api/my/mypage";
import type { INoticeFormDataType } from "@/types/mypage.type";
import { useQuery } from "@tanstack/react-query";

export const useNoticeDetail = (id: string) => {
  const data = useQuery<INoticeFormDataType>({
    queryKey: ["noticeDetail", id],
    queryFn: () => noticeDetailApi(id),
  });

  return data.data;
};
