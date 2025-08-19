import { clientAxios } from "@/lib/axios/clientAxios";
import type { INoticeFormDataType } from "@/types/mypage.type";
import axios from "axios";

// 공지사항 등록
export const noticeCreateApi = async (formData: INoticeFormDataType) => {
  try {
    const { data } = await clientAxios.post("/api/my/notice/create", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 공지사항 목록
export const noticeListApi = async () => {
  try {
    const { data } = await clientAxios.get("/api/my/notice/list");
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 공지사항 수정
export const noticeUpdateApi = async ({
  id,
  formData,
}: { id: string; formData: INoticeFormDataType }) => {
  try {
    const { data } = await clientAxios.patch(`/api/my/notice/${id}`, formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 공지사항 상세
export const noticeDetailApi = async (id: string) => {
  try {
    const { data } = await clientAxios.get(`/api/my/notice/${id}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 공지사항 삭제
export const noticeDeleteApi = async (id: string) => {
  try {
    const { data } = await clientAxios.delete(`/api/my/notice/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 등록한 블로그
export const myblogListApi = async () => {
  try {
    const { data } = await clientAxios.get("/api/my/blog");

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 블로그 공감
export const myblogLikeApi = async () => {
  try {
    const { data } = await clientAxios.patch("/api/my/blog-like");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 공감한 블로그 목록
export const myLikeBlogsApi = async () => {
  try {
    const { data } = await clientAxios.get("/api/my/like-blogs");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};
