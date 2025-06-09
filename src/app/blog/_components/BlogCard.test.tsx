import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mock/mockBlogData";
import BlogCard from "./BlogCard";

const mockRouterPush = jest.fn();
const mockBlogDelete = jest.fn();
const mockUser = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock("@/lib/queries/blog/useBlogDelete", () => ({
  useBlogDelete: () => ({
    mutate: mockBlogDelete,
  }),
}));

jest.mock("@/hooks/useUser", () => ({
  useUser: () => mockUser(),
}));

jest.mock("@/components/modal/Modal", () => {
  return function MockModal({
    isOpen,
    setIsOpen,
    content,
    trigger,
    actionButton,
  }: any) {
    return (
      <div data-testid="mock-modal">
        <button
          type="button"
          data-testid="modal-trigger"
          onClick={() => setIsOpen(true)}
        >
          {trigger}
        </button>
        {isOpen && (
          <div>
            <button
              type="button"
              data-testid="modal-close"
              onClick={() => setIsOpen(false)}
            />
            <p>{content}</p>
            <div>{actionButton}</div>
          </div>
        )}
      </div>
    );
  };
});

describe("blog card 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("블로그 id가 없을경우 null을 반환한다.", () => {
    const noBlogId = { ...mockBlogData, id: undefined as unknown as number };
    const { container } = render(<BlogCard {...noBlogId} />);

    expect(container.firstChild).toBeNull();
  });

  it("해당 블로그 게시글이 작성자 본인이 아니면 모달 영역이 렌더링 되지않는다", () => {
    mockUser.mockReturnValue("no-userId");
    render(<BlogCard {...mockBlogData} />);

    expect(screen.queryByTestId("mock-modal")).not.toBeInTheDocument();
  });

  it("해당 블로그 게시글이 작성자 본인이면 모달 영역이 렌더링된다.", () => {
    mockUser.mockReturnValue(mockBlogData.user_id.id);
    render(<BlogCard {...mockBlogData} />);

    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  });

  it("모달 트리거를 클릭하면 모달이 열리고 해당 콘텐츠가 표시되어야 한다.", () => {
    render(<BlogCard {...mockBlogData} />);

    expect(screen.getByTestId("modal-trigger")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("modal-trigger"));

    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
    expect(screen.getByText(mockBlogData.title)).toBeInTheDocument();
    expect(
      screen.getByText(mockBlogData.content as string),
    ).toBeInTheDocument();
    expect(screen.getByAltText("블로그 메인 이미지")).toBeInTheDocument();
  });

  describe("모달 open 상태의 버튼 동작", () => {
    beforeEach(() => {
      mockUser.mockReturnValue(mockBlogData.user_id.id);
      render(<BlogCard {...mockBlogData} />);

      expect(screen.getByTestId("modal-trigger")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("modal-trigger"));
    });

    it("모달 상단 X 아이콘을 클릭하면 모달이 닫혀야한다.", () => {
      expect(screen.getByTestId("modal-close")).toBeInTheDocument();
      fireEvent.click(screen.getByTestId("modal-close"));

      expect(screen.queryByTestId("modal-close")).not.toBeInTheDocument();
    });

    it("모달 삭제 버튼 클릭 시 blogDelete가 실행되어야 한다.", () => {
      expect(screen.getByRole("button", { name: "삭제" })).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "삭제" }));

      expect(mockBlogDelete).toHaveBeenCalledWith(mockBlogData.id);
    });

    it("모달 수정 버튼 클릭 시 해당 블로그 수정 폼으로 이동되어야 한다.", () => {
      expect(screen.getByRole("button", { name: "수정" })).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "수정" }));

      expect(mockRouterPush).toHaveBeenCalledWith(
        `/blog/edit?id=${mockBlogData.id}`,
      );
    });
  });
});
