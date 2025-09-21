import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mockData/mockBlogData";
import MyDataList from "./MyDataList";

jest.mock("@/app/blog/_components/BlogCard", () => ({
  __esModule: true,
  default: ({ item }: { item: any }) => <li>{item._id}</li>,
}));

describe("마이페이지 컴포넌트", () => {
  it("내가 작성한 블로그가 존재하면 해당 데이터가 랜더링 된다.", () => {
    render(<MyDataList data={[mockBlogData]} />);

    expect(screen.getByText("test-id")).toBeInTheDocument();
  });

  it("preview props가 있다면 작성한 블로그 미리보기로 최대 3개까지 보여진다.", () => {
    const mockBlogList = [
      { ...mockBlogData, _id: "test-1" },
      { ...mockBlogData, _id: "test-2" },
      { ...mockBlogData, _id: "test-3" },
      { ...mockBlogData, _id: "test-4" },
    ];

    render(<MyDataList preview data={mockBlogList} />);

    expect(screen.getByText("test-1")).toBeInTheDocument();
    expect(screen.getByText("test-2")).toBeInTheDocument();
    expect(screen.getByText("test-3")).toBeInTheDocument();
    expect(screen.queryByText("test-4")).not.toBeInTheDocument();
  });

  it("작성한 블로그가 없다면 해당 텍스트가 표시된다.", () => {
    render(<MyDataList />);

    expect(screen.getByText(/블로그가 없습니다/)).toBeInTheDocument();
  });
});
