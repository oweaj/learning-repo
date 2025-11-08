import {
  blogCreateApi,
  blogDeleteApi,
  blogDetailApi,
  blogLikeApi,
  blogLikeRankApi,
  blogListApi,
  blogUpdateApi,
} from "@/lib/api/blog/blog";
import type { IBlogDataType, IBlogListType } from "@/types/blog.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// 목록
export const useBlogList = ({
  category,
  page,
  keyword,
}: {
  category: string | null;
  page: number;
  keyword?: string | null;
}) => {
  return useQuery<IBlogListType>({
    queryKey: ["blog_list", category, page, keyword],
    queryFn: () => blogListApi(category, page, keyword),
    placeholderData: (previousData) => previousData,
  });
};

// 생성
export const useBlogCreate = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogCreateApi,
    onSuccess: (data) => {
      alert(data.message);
      router.replace("/");
      queryClient.invalidateQueries({ queryKey: ["blog_list"] });
    },
    onError: (error) => alert(error.message),
  });
};

// 수정
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

// 삭제
export const useBlogDelete = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: blogDeleteApi,
    onSuccess: (data) => {
      alert(data.message);
      router.push("/");
      queryClient.invalidateQueries({ queryKey: ["blog_list"] });
    },
    onError: (error) => alert(error.message),
  });
};

// 상세
export const useBlogDetail = ({ id }: { id: string }) => {
  const data = useQuery<IBlogDataType>({
    queryKey: ["blogDetail", id],
    queryFn: () => blogDetailApi(id),
  });

  return data.data;
};

// 공감
export const useBlogLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: blogLikeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_list"] });
      queryClient.invalidateQueries({ queryKey: ["blogDetail"] });
      queryClient.invalidateQueries({ queryKey: ["blog_rank"] });
      queryClient.invalidateQueries({ queryKey: ["myLikeBlogs"] });
    },
    onError: (error) => alert(error.message),
  });
};

// 공감 랭킹
export const useBlogLikeRank = () => {
  return useQuery<IBlogDataType[]>({
    queryKey: ["blog_rank"],
    queryFn: blogLikeRankApi,
  });
};
