import type { IBlogDataType, IBlogListType } from "@/types/blog.type";
import type { INoticeFormDataType } from "@/types/mypage.type";

export const mockBlogData: IBlogDataType = {
  _id: "test-id",
  title: "테스트 제목",
  content: "테스트 내용 입력 영역입니다.",
  main_image: "/test-image.jpg",
  sub_image: null,
  category_id: "daily_life",
  like_user: [],
  like_count: 0,
  deleted_at: null,
  user_id: {
    _id: "user-id",
    email: "test@test.com",
    name: "테스트",
    profile_image: null,
    introduce: null,
    like_category: [],
  },
  createdAt: "2025-01-01T00:00:00.000Z",
  updateAt: null,
  isWriter: false,
  isLiked: false,
};

export const mockNoticeData: INoticeFormDataType = {
  title: "마이페이지 공지사항 테스트 제목",
  content: "공지사항 테스트 내용 입력 입니다.",
};

export const mockBlogListData: IBlogListType = {
  bloglist: [mockBlogData],
  page: 1,
  limit: 10,
  totalPages: 1,
  totalCount: 1,
};

export const mockBlogLikeRankData = [
  { ...mockBlogData, _id: "test-1", like_count: 5 },
  { ...mockBlogData, _id: "test-2", like_count: 10 },
  { ...mockBlogData, _id: "test-3", like_count: 3 },
  { ...mockBlogData, _id: "test-4", like_count: 0 },
  { ...mockBlogData, _id: "test-5", like_count: 7 },
  { ...mockBlogData, _id: "test-6", like_count: 1 },
];
