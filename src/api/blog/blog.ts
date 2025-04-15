import type { BlogFormDataType } from "@/types/blog.type";
import clientAxios from "../clientAxios";
import serverAxios from "../serverAxios";

interface BlogListPropsType {
  category_id: number;
  page: number;
  page_size: number;
}

// 블로그 생성
export const blogCreateApi = async (formData: BlogFormDataType) => {
  const { data } = await clientAxios.post("/api/v1/blog", formData);

  return data;
};

// 블로그 목록
export const blogListApi = async ({
  category_id,
  page,
  page_size,
}: BlogListPropsType) => {
  const query =
    category_id === 0
      ? `page=${page}&page_size=${page_size}`
      : `category_id=${category_id}&page=${page}&page_size=${page_size}`;

  const { data } = await serverAxios.get(`/api/v1/blog?${query}`);

  return data.data;
};

// 블로그 상세
export const blogDetailApi = async (id: number) => {
  const { data } = await serverAxios.get(`/api/v1/blog/${id}`);

  return data;
};

// 블로그 수정
export const blogUpdateApi = async (id: number) => {
  const { data } = await clientAxios.patch(`/api/v1/blog/${id}`);

  return data;
};

// 블로그 삭제
export const blogDeleteApi = async (id: number) => {
  const { data } = await clientAxios.delete(`/api/v1/blog/${id}`);

  return data;
};
