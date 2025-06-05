import type { TBlogFormType } from "@/types/blog.type";
import axios from "axios";

// 블로그 생성
export const blogCreateApi = async (formData: TBlogFormType) => {
  try {
    const { data } = await axios.post("/api/blog/create", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        "블로그 글 등록에 실패했습니다. 내용을 다시 확인해주세요.",
      );
    }
  }
};

// 블로그 목록
export const blogListApi = async ({
  category,
  page,
}: { category: string | null; page: number }) => {
  try {
    const query = category
      ? `category=${category}&page=${page}&limit=10`
      : `page=${page}&limit=10`;
    const { data } = await axios.get(`/api/blog/list?${query}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("블로그 목록을 불러오는데 실패했습니다.");
    }
  }
};

// 블로그 상세
export const blogDetailApi = async (id: number) => {
  try {
    const { data } = await axios.get(`/api/blog/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("블로그 상세 정보를 불러오는데 실패했습니다.");
    }
  }
};

// 블로그 수정
export const blogUpdateApi = async ({
  id,
  formData,
}: { id: number; formData: TBlogFormType }) => {
  try {
    await axios.patch(`/api/blog/${id}`, formData);
    return id;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("해당 블로그를 수정하는데 실패했습니다.");
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};

// 블로그 삭제
export const blogDeleteApi = async (id: number) => {
  try {
    const { data } = await axios.patch("/api/blog/delete", { id });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("해당 블로그를 삭제하는데 실패했습니다.");
    }
  }
};
