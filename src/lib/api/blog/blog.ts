import type { TBlogFormType } from "@/app/actions/blog.action";
import axios from "axios";

interface BlogListPropsType {
  category: string;
  page: number;
  limit: number;
}

// 블로그 생성
export const blogCreateApi = async (formData: TBlogFormType) => {
  const { data } = await axios.post("/api/blog/create", formData);

  return data;
};

// 블로그 목록
export const blogListApi = async ({ category, page }: BlogListPropsType) => {
  let query = "";

  if (category !== "all") {
    query = `category=${category}&page=${page}&limit=10`;
  } else if (category === "all" && page > 1) {
    query = `page=${page}&limit=10`;
  }

  const { data } = await axios.get(`/api/blog/list?${query}`);

  return data.data;
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
