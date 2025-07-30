noticeListApi;

import { noticeListApi } from "@/lib/api/my/mypage";
import type { INoticeDataType } from "@/types/mypage.type";
import { useQuery } from "@tanstack/react-query";

export const useNoticeList = () => {
  return useQuery<INoticeDataType[]>({
    queryKey: ["notice_list"],
    queryFn: () => noticeListApi(),
  });
};
