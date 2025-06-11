import type { TBlogListType } from "@/types/blog.type";

export const mockBlogData: TBlogListType = {
  id: 1,
  user_id: {
    id: "userId",
    email: "test@test.com",
    name: "테스트",
    profile_image: null,
    status: null,
  },
  title: "테스트 제목",
  main_image: "/test-image.jpg",
  sub_image: null,
  category_id: { id: 1, name: "daily_life" },
  content: "테스트 내용 입력 영역입니다.",
  created_at: "2025-01-01T00:00:00.000Z",
  deleted_at: null,
  updated_at: null,
};
