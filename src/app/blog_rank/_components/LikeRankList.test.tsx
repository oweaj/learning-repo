import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mockData/mockBlogData";
import LikeRankList from "./LikeRankList";

const mockBlogLikeRank = jest.fn();

jest.mock("@/lib/queries/blog/useBlogLikeRank", () => ({
  useBlogLikeRank: () => mockBlogLikeRank(),
}));

jest.mock("@/app/blog/_components/BlogCard", () => ({
  __esModule: true,
  default: ({ item }: { item: any }) => <li>{item._id}</li>,
}));

describe("블로그 랭킹 컴포넌트", () => {
  it("공감 수에 따라 내림차순으로 데이터가 렌더링 된다.", () => {
    const mockBlogLikeRankData = [
      { ...mockBlogData, _id: "test-1", like_count: 5 },
      { ...mockBlogData, _id: "test-2", like_count: 10 },
      { ...mockBlogData, _id: "test-3", like_count: 3 },
      { ...mockBlogData, _id: "test-4", like_count: 0 },
      { ...mockBlogData, _id: "test-5", like_count: 7 },
      { ...mockBlogData, _id: "test-6", like_count: 1 },
    ];

    mockBlogLikeRank.mockReturnValue({
      data: mockBlogLikeRankData.sort((a, b) => b.like_count - a.like_count),
    });
    render(<LikeRankList />);

    mockBlogLikeRankData.forEach((data) => {
      expect(screen.getByText(`${data._id}`)).toBeInTheDocument();
    });
  });
});
