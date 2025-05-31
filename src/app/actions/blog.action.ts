"use server";

import type { TBlogFormType, TBlogListType } from "@/types/blog.type";
import { createServerSideClient } from "@/utils/supabase/server";

export const getBlogList = async ({
  category,
  page,
}: {
  category: string | null;
  page: number;
}): Promise<{ data: TBlogListType[]; count: number }> => {
  const supabase = await createServerSideClient(true);
  const currentPage = (page - 1) * 10;

  let result = supabase
    .from("blog_list")
    .select("*, category_id:category(*), user_id:user_info(*)", {
      count: "exact",
    })
    .is("deleted_at", null)
    .order("id", { ascending: false });

  if (category) {
    const { data: categoryData } = await supabase
      .from("category")
      .select("id")
      .eq("name", category)
      .single();

    if (!categoryData) return { data: [], count: 0 };

    result = result.eq("category_id", categoryData.id);
  }

  result = result.range(currentPage, currentPage + 9);
  const { data, count } = await result;

  return {
    data: data as TBlogListType[],
    count: count ?? 0,
  };
};

export const getBlogDetail = async (id: number) => {
  const supabase = await createServerSideClient(true);
  const { data } = await supabase
    .from("blog_list")
    .select("*, category_id:category(*), user_id:user_info(*)")
    .eq("id", id)
    .single();

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
