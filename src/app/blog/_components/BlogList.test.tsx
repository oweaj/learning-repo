import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData, mockBlogListData } from "@/tests/mockData/mockBlogData";
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

jest.mock("./BlogCard", () => () => <li>Mocked BlogCard</li>);

describe("bloglist 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("list에 데이터가 없다면 null을 반환한다.", async () => {
    mockBlogList.mockReturnValue(null);
    const { container } = render(
      <BlogList category={mockBlogData.category_id} page={1} />,
    );

    expect(mockBlogList).toHaveBeenCalledWith({
      category: mockBlogData.category_id,
      page: 1,
    });
    expect(container.firstChild).toBeNull();
  });

  it("data가 있다면 해당 데이터가 렌더링된다.", async () => {
    mockBlogList.mockReturnValue(mockBlogListData);
    const { container } = render(
      <BlogList category={mockBlogData.category_id} page={1} />,
    );

    expect(mockBlogList).toHaveBeenCalledWith({
      category: mockBlogData.category_id,
      page: 1,
    });
    expect(container.firstChild).not.toBeNull();
  });

  it("데이터 리스트 개수가 10개가 안되면 페이지 네이션 버튼은 랜더링 되지않는다.", () => {
    mockBlogList.mockReturnValue(mockBlogListData);
    render(<BlogList category={null} page={1} />);

    expect(screen.queryByRole("button", { name: "1" })).toBeNull();
  });

  it("데이터 리스트 개수가 10개가 넘어가면 페이지 네이션 버튼이 표시된다.", () => {
    mockBlogList.mockReturnValue({ ...mockBlogListData, totalCount: 12 });
    render(<BlogList category={null} page={1} />);

    expect(screen.queryByRole("button", { name: "1" }));
  });

  it("카테고리가 있다면 쿼리스트링에 선택된 카테고리와 현재 페이지 수가 표시된다.", () => {
    mockBlogList.mockReturnValue({ ...mockBlogListData, totalCount: 12 });
    render(<BlogList category={mockBlogData.category_id} page={1} />);

    fireEvent.click(screen.getByRole("button", { name: "1" }));
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/?category=${mockBlogData.category_id}&page=${mockBlogListData.page}&limit=10`,
    );
  });

  describe("데이터 목록 페이지 네이션", () => {
    beforeEach(() => {
      mockBlogList.mockReturnValue({
        ...mockBlogListData,
        totalCount: 12,
        totalPages: 2,
      });
    });

    it("기본 페이지 번호는 1번 페이지이고 다른 페이지 번호를 클릭하면 해당 페이지 번호로 이동된다.", () => {
      render(<BlogList category={mockBlogData.category_id} page={1} />);

      expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();

      fireEvent.click(screen.getByRole("button", { name: "2" }));

      expect(mockRouterPush).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith(
        `/?category=${mockBlogData.category_id}&page=2&limit=10`,
      );
    });

    it("다음 페이지 버튼을 클릭하면 다음 페이지의 데이터가 렌더링된다.", () => {
      render(<BlogList category={mockBlogData.category_id} page={1} />);

      expect(
        screen.getByRole("button", { name: "다음 페이지" }),
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "다음 페이지" }));

      expect(mockRouterPush).toHaveBeenCalled();
      expect(mockRouterPush).toHaveBeenCalledWith(
        `/?category=${mockBlogData.category_id}&page=2&limit=10`,
      );
    });

    it("이전 페이지 버튼을 클릭하면 이전 페이지의 데이터가 렌더링된다.", () => {
      render(<BlogList category={mockBlogData.category_id} page={2} />);

      expect(
        screen.getByRole("button", { name: "이전 페이지" }),
      ).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "이전 페이지" }));

      expect(mockRouterPush).toHaveBeenCalledWith(
        `/?category=${mockBlogData.category_id}&page=1&limit=10`,
      );
    });
  });
});
