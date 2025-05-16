"use server";

import { createServerSideClient } from "@/utils/supabase/server";
import type { Database } from "../../../database.types";

export type TBlogListType = Database["public"]["Tables"]["blog_list"]["Row"];
type TBlogFormType = Database["public"]["Tables"]["blog_form_data"]["Row"];

export const getBlogList = async ({
  category,
  page,
  limit = 10,
}: {
  category: string;
  page: number;
  limit: number;
}): Promise<TBlogListType[]> => {
  const supabase = await createServerSideClient(true);
  const currentPage = (page - 1) * limit;

  let result = supabase
    .from("blog_list")
    .select(
      `*,
    category:category_id (
      id,
      name
    ),
    user_info:user_id (
      id,
      email,
      name,
      profile_image
    )
  `,
    )
    .is("deleted_at", null)
    .order("id", { ascending: false });

  if (category !== "all") {
    const { data: categoryData } = await supabase
      .from("category")
      .select("id")
      .eq("name", category)
      .single();

    if (!categoryData) return [];

    result = result.eq("category_id", categoryData.id);
  }

  result = result.range(currentPage, currentPage + limit - 1);
  const { data } = await result;

  return data || [];
};

export const getBlogDetail = async (id: number) => {
  const supabase = await createServerSideClient();
  const { data } = await supabase
    .from("blog_detail")
    .select("*")
    .is("deleted_at", null)
    .eq("id", id);

  return data;
};

export const createBlog = async (formData: TBlogFormType) => {
  const supabase = await createServerSideClient();
  const { data } = await supabase.from("blog_list").insert(formData).select();

  return data;
};

export const updateBlog = async (id: number, formData: TBlogFormType) => {
  const supabase = await createServerSideClient();
  const { data } = await supabase
    .from("blog_list")
    .update({ ...formData, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select();

  return data;
};

export const deleteBlog = async (id: number) => {
  const supabase = await createServerSideClient();
  const { data } = await supabase
    .from("blog_list")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  return data;
};
