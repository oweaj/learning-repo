import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mockData/mockBlogData";
import BlogList from "./BlogList";

const mockRouterPush = jest.fn();
const mockBlogList = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock("@/lib/queries/blog/useBlogList", () => ({
  useBlogList: (args: any) => mockBlogList(args),
}));

jest.mock("./BlogCard", () => () => <div>Mocked BlogCard</div>);

describe("bloglist 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("list에 데이터가 없다면 null을 반환한다.", async () => {
    mockBlogList.mockReturnValue({ data: null, count: 0 });
    const { container } = render(
      <BlogList category={mockBlogData.category_id.name} page={1} />,
    );

    await waitFor(() => {
      expect(mockBlogList).toHaveBeenCalledWith({
        category: mockBlogData.category_id.name,
        page: 1,
      });
      expect(container.firstChild).toBeNull();
    });
  });

  it("data가 있다면 해당 데이터가 렌더링된다.", async () => {
    mockBlogList.mockReturnValue({ data: [mockBlogData], count: 1 });
    const { container } = render(
      <BlogList category={mockBlogData.category_id.name} page={1} />,
    );

    await waitFor(() => {
      expect(mockBlogList).toHaveBeenCalledWith({
        category: mockBlogData.category_id.name,
        page: 1,
      });
      expect(container.firstChild).not.toBeNull();
    });
  });

  it("카테고리가 전체(Null)이면 쿼리스트링에서 카테고리는 제외되고 현재 페이지 수만 표시된다.", () => {
    mockRouterPush.mockReturnValue({ data: [mockBlogData], count: 1 });
    render(<BlogList category={null} page={1} />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));

    expect(mockRouterPush).toHaveBeenCalledWith("/?page=1&limit=10");
  });

  it("카테고리가 있다면 쿼리스트링에 선택된 카테고리와 현재 페이지 수가 표시된다.", () => {
    mockRouterPush.mockReturnValue({ data: [mockBlogData], count: 1 });
    render(<BlogList category={mockBlogData.category_id.name} page={1} />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));

    expect(mockRouterPush).toHaveBeenCalledWith(
      `/?category=${mockBlogData.category_id.name}&page=1&limit=10`,
    );
  });

  describe("데이터 목록 페이지 네이션", () => {
    const mockData = Array.from({ length: 20 }, (_, i) => ({
      ...mockBlogData,
      id: `mock-${i}`,
      title: `mock title ${i}`,
    }));

    it("다음 페이지 버튼을 클릭하면 다음 페이지의 데이터가 렌더링된다.", () => {
      mockBlogList.mockReturnValue({ data: mockData, count: 20 });
      render(<BlogList category={mockBlogData.category_id.name} page={1} />);

      expect(
        screen.getByRole("button", { name: "다음 페이지" }),
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "다음 페이지" }));

      expect(mockRouterPush).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith(
        `/?category=${mockBlogData.category_id.name}&page=2&limit=10`,
      );
    });

    it("이전 페이지 버튼을 클릭하면 이전 페이지의 데이터가 렌더링된다.", () => {
      mockBlogList.mockReturnValue({ data: mockData, count: 20 });
      render(<BlogList category={mockBlogData.category_id.name} page={2} />);

      expect(
        screen.getByRole("button", { name: "이전 페이지" }),
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "이전 페이지" }));

      expect(mockRouterPush).toHaveBeenCalledWith(
        `/?category=${mockBlogData.category_id.name}&page=1&limit=10`,
      );
    });
  });
});
