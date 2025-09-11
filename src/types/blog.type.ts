import type { IUserDataType } from "./auth.type";

export interface IBlogDataType {
  _id: string;
  title: string;
  content: string;
  main_image: string;
  sub_image: string | null;
  deleted_at: string | null;
  category_id: string;
  user_id: IUserDataType;
  createdAt: string;
  updateAt: string | null;
  like_count: number;
  like_user: string[];
  isWriter?: boolean;
  isLiked?: boolean;
}

export interface IBlogFormDataType {
  category_id: string;
  title: string;
  main_image: string;
  sub_image: string | null;
  content: string;
}

export interface IBlogListType {
  bloglist: IBlogDataType[];
  limit: number;
  page: number;
  totalCount: number;
  totalPages: number;
}

export interface IMyBlogDataType {
  blogs: IBlogDataType[];
  maxLikeCount: number;
}

export interface IMyLikeBlogDataType {
  likeBlogs: IBlogDataType[];
}
