import type { TAuthFormType } from "@/types/auth.type";
import { createSupabaseClient } from "@/utils/supabase/client";

const supabase = createSupabaseClient();

export const signinApi = async (formData: TAuthFormType) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    throw new Error("이메일 또는 비밀번호를 다시 한번 확인해주세요.");
  }

  return data;
};

export const signupApi = async (formData: TAuthFormType) => {
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
  await supabase.auth.signOut();
};
