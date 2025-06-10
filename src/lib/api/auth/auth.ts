import type { TAuthFormType } from "@/types/auth.type";
import { createSupabaseClient } from "@/utils/supabase/client";
import axios from "axios";

export const signinApi = async (formData: TAuthFormType) => {
  try {
    const { data } = await axios.post("/api/auth/signin", formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(message);
    }
  }
};

export const signupApi = async (formData: TAuthFormType) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
      },
    },
  });

  if (error) {
    throw new Error("회원가입에 실패했습니다. 가입 정보를 다시 확인해주세요.");
  }

  return data;
};

export const logoutApi = async () => {
  try {
    const { data } = await axios.post("/api/auth/logout");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message;
      throw new Error(message);
    }
  }
};
