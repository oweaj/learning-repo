noticeListApi;

import { noticeListApi } from "@/lib/api/my/mypage";
import type { INoticeListType } from "@/types/mypage.type";
import { useQuery } from "@tanstack/react-query";

export const useNoticeList = (page: number) => {
  return useQuery<INoticeListType>({
    queryKey: ["notice_list", page],
    queryFn: () => noticeListApi(page),
  });
};
