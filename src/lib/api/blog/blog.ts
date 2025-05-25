import type { TBlogFormType } from "@/types/blog.type";
import axios from "axios";

// 블로그 생성
export const blogCreateApi = async (formData: TBlogFormType) => {
  const { data } = await axios.post("/api/blog/create", formData);

  return data;
};

// 블로그 목록
export const blogListApi = async ({
  category,
  page,
}: { category: string | null; page: number }) => {
  const query = category
    ? `category=${category}&page=${page}&limit=10`
    : `page=${page}&limit=10`;
  const { data } = await axios.get(`/api/blog/list?${query}`);

  return data;
};

// 블로그 상세
export const blogDetailApi = async (id: number) => {
  const { data } = await axios.get(`/api/blog/${id}`);

  return data;
};

// 블로그 수정
export const blogUpdateApi = async ({
  id,
  formData,
}: { id: number; formData: TBlogFormType }) => {
  await axios.patch(`/api/blog/${id}`, formData);

  return id;
};

// 블로그 삭제
export const blogDeleteApi = async (id: number) => {
  const { data } = await axios.patch("/api/blog/delete", { id });

  return data;
};
