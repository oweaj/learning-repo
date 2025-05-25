import type { TAuthFormType } from "@/types/auth.type";
import { createSupabaseClient } from "@/utils/supabase/client";

const supabase = createSupabaseClient();

export const signinApi = async (formData: TAuthFormType) => {
  const { data } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  return data;
};

export const signupApi = async (formData: TAuthFormType) => {
  const { data } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
      },
    },
  });

  return data;
};

export const logoutApi = async () => {
  await supabase.auth.signOut();
};
