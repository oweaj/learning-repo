import {
  myBlogsAction,
  myLikeBlogsAction,
  noticeCreateAction,
  noticeDeleteAction,
  noticeDetailAction,
  noticeListAction,
  noticeUpdateAction,
} from "@/app/actions/mypage";
import type { IMyBlogDataType, IMyLikeBlogDataType } from "@/types/blog.type";
import type { INoticeDataType, INoticeFormDataType } from "@/types/mypage.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// 공지사항 리스트
export const useNoticeList = () => {
  return useQuery<INoticeDataType[]>({
    queryKey: ["notice_list"],
    queryFn: noticeListAction,
  });
};

// 공지사항 생성
export const useNoticeCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: noticeCreateAction,
    onSuccess: (data) => {
      alert(data.message);
      router.replace("/my/notice");
      queryClient.invalidateQueries({ queryKey: ["notice_list"] });
    },
    onError: (error) => alert(error.message),
  });
};

// 공지사항 수정
export const useNoticeUpdate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: noticeUpdateAction,
    onSuccess: ({ message }) => {
      alert(message);
      router.replace("/my/notice");
      queryClient.invalidateQueries({ queryKey: ["notice_list"] });
    },
    onError: (error) => alert(error.message),
  });
};

// 공지사항 상세 리스트
export const useNoticeDetail = (id: string) => {
  const data = useQuery<INoticeFormDataType>({
    queryKey: ["noticeDetail", id],
    queryFn: () => noticeDetailAction(id),
  });

  return data.data;
};

// 공지사항 삭제
export const useNoticeDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: noticeDeleteAction,
    onSuccess: ({ message }) => {
      alert(message);
      router.replace("/my/notice");
      queryClient.invalidateQueries({ queryKey: ["notice_list"] });
    },
    onError: (error) => alert(error.message),
  });
};

// 등록한 블로그
export const useMyBlogList = () => {
  return useQuery<IMyBlogDataType>({
    queryKey: ["myBlogs"],
    queryFn: myBlogsAction,
  });
};

// 공감한 블로그 리스트
export const useMyLikeBlogList = () => {
  return useQuery<IMyLikeBlogDataType>({
    queryKey: ["myLikeBlogs"],
    queryFn: myLikeBlogsAction,
  });
};
