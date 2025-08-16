import { clientAxios } from "@/lib/axios/clientAxios";
import { serverAxios } from "@/lib/axios/serverAxios";
import type { IBlogFormDataType } from "@/types/blog.type";
import axios from "axios";

// 블로그 생성
export const blogCreateApi = async (formData: IBlogFormDataType) => {
  try {
    const { data } = await clientAxios.post("/api/blog/create", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 블로그 목록
export const blogListApi = async (category: string | null, page: number) => {
  try {
    const isServer = typeof window === "undefined";
    const axiosInstance = isServer ? serverAxios : clientAxios;
    const query = category
      ? `category=${category}&page=${page}&limit=10`
      : `page=${page}&limit=10`;

    const { data } = await axiosInstance.get(`/api/blog/list?${query}`);

    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 블로그 상세
export const blogDetailApi = async (id: string) => {
  try {
    const isServer = typeof window === "undefined";
    const axiosInstance = isServer ? serverAxios : clientAxios;
    const { data } = await axiosInstance.get(`/api/blog/${id}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 블로그 수정
export const blogUpdateApi = async ({
  id,
  formData,
}: { id: string; formData: IBlogFormDataType }) => {
  try {
    const { data } = await clientAxios.patch(`/api/blog/${id}`, formData);
    return { data, id };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    throw new Error("서버 에러가 발생했습니다.");
  }
};

// 블로그 이미지 업로드
export const blogImageUploadApi = async ({
  prefix,
  file,
}: { prefix: string; file: File }) => {
  try {
    if (!file) throw new Error("업로드할 이미지 파일이 없습니다.");

    const formData = new FormData();
    formData.append("file", file);

    const { data } = await clientAxios.post(
      `/api/blog/image/${prefix}`,
      formData,
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 블로그 공감
export const blogLikeApi = async (id: string) => {
  try {
    const { data } = await clientAxios.patch(`/api/blog/like/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 블로그 공감 랭킹
export const blogLikeRankApi = async () => {
  try {
    const isServer = typeof window === "undefined";
    const axiosInstance = isServer ? serverAxios : clientAxios;
    const { data } = await axiosInstance.get("/api/blog/like_rank");

    return data.blogRank;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 블로그 삭제
export const blogDeleteApi = async (id: string) => {
  try {
    const { data } = await clientAxios.delete(`/api/blog/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};
