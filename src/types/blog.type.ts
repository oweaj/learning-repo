import type { IUserDataType } from "./auth.type";

export interface IBlogListType {
  _id: string;
  title: string;
  content: string;
  main_image: string;
  sub_image: string | null;
  deleted_at: string | null;
  category_id: string;
  user_id: IUserDataType;
  createdAt: string;
  updateAt: string;
}

export interface IBlogFormDataType {
  category_id: string;
  title: string;
  main_image: string;
  sub_image: string | null;
  content: string;
}
