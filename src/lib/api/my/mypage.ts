import { clientAxios } from "@/lib/axios/clientAxios";
import axios from "axios";

// 등록한 블로그
export const myblogListApi = async (limit?: string) => {
  try {
    const { data } = await clientAxios.get(`/api/my/blog?limit=${limit}`);
    return data.data;
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
