import type { Database } from "../../database.types";
import type { userDataType } from "./auth.type";

type TBlogListRow = Database["public"]["Tables"]["blog_list"]["Row"];

export type TBlogListType = Omit<TBlogListRow, "user_id" | "category_id"> & {
  user_id: Database["public"]["Tables"]["user_info"]["Row"];
  category_id: Database["public"]["Tables"]["category"]["Row"];
};
export type TBlogFormType =
  Database["public"]["Tables"]["blog_form_data"]["Row"];

export interface BlogPageParamsType {
  page?: string;
  [key: string]: string | string[] | undefined;
}

export interface BlogListType {
  id: number | null;
  title: string;
  content: string | null;
  main_image: string;
  sub_image: string;
  created_at: string;
  deleted_at: string | null;
  updated_at: string;
  category: {
    id: number | null;
    name: string;
  };
  user: userDataType;
}

export type PartialBlogDataType = Partial<BlogListType>;

export interface BlogDetailDataType {
  user: {
    id: number;
    email: string;
    status: string;
    name: string;
    phone_number: string;
    profile_image: string;
  };
  category: { id: number; name: string };
  title: string;
  main_image: string;
  sub_image: string;
  content: string;
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface BlogFormDataType {
  category: number;
  title: string;
  main_image: string;
  sub_image: string;
  content: string;
}
