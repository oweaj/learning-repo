import { clientAxios } from "@/lib/axios/clientAxios";
import type { IAuthFormType } from "@/types/auth.type";
import type { IMyProfileDataType } from "@/types/mypage.type";

import axios from "axios";

// 로그인
export const signinApi = async (formData: IAuthFormType) => {
  try {
    const { data } = await clientAxios.post("/api/auth/signin", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 회원가입
export const signupApi = async (formData: IAuthFormType) => {
  try {
    const { data } = await clientAxios.post("/api/auth/signup", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 로그아웃
export const logoutApi = async () => {
  try {
    const { data } = await clientAxios.post("/api/auth/logout");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 토큰 갱신
export const refreshTokenApi = async () => {
  try {
    const { data } = await clientAxios.post("/api/auth/refresh");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 유저 정보 조회
export const getUserApi = async () => {
  try {
    const { data } = await clientAxios.get("/api/auth/user");
    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    return { user: null };
  }
};

// 유저 정보 수정
export const userUpdateApi = async (formData: IMyProfileDataType) => {
  try {
    const { data } = await clientAxios.patch("/api/auth/update", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 유저 프로필 이미지 업로드
export const profileImageUploadApi = async ({
  prefix,
  formData,
}: { prefix: string; formData: FormData }) => {
  try {
    const { data } = await clientAxios.patch(
      `/api/auth/image/${prefix}`,
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

// 유저 프로필 이미지 삭제
export const profileImageDeleteApi = async (key: string) => {
  try {
    const { data } = await clientAxios.delete(
      `/api/auth/image/${encodeURIComponent(key)}`,
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};

// 회원탈퇴
export const deleteUserApi = async () => {
  try {
    const result = await clientAxios.delete("/api/auth/delete");
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
  }
};
