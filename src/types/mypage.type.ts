export interface INoticeFormDataType {
  title: string;
  content: string;
}

export interface INoticeDataType {
  _id: string;
  title: string;
  content: string;
  deleted_at: string | null;
  createdAt: string;
  updateAt: string | null;
}

export interface IMyLikeCategoryDataType {
  name: string;
  introduce: string;
  like_category: string[];
}
