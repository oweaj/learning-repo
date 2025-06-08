import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogDetail from "./BlogDetail";

const mockBlogDetail = jest.fn();
const mockUser = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
  }),
}));

jest.mock("@/hooks/useUser", () => ({
  useUser: () => mockUser(),
}));

jest.mock("@/lib/queries/blog/useBlogDetail", () => ({
  useBlogDetail: () => mockBlogDetail(),
}));

jest.mock("next/image", () => {
  return ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  );
});

const mockBlogData = {
  id: 1,
  title: "테스트 블로그 제목",
  content: "테스트 블로그 내용",
  main_image: "/test-image.jpg",
  created_at: "2025-01-01T00:00:00.000Z",
  user_id: { id: "userId" },
};

describe("상세페이지 컴포넌트", () => {
  it("상세 데이터가 없을경우 null을 반환한다.", () => {
    mockBlogDetail.mockReturnValue(null);
    mockUser.mockReturnValue("userId");

    const { container } = render(<BlogDetail id={1} />);
    expect(container.firstChild).toBeNull();
  });

  it("상세 데이터가 있을경우 해당 데이터를 랜더링한다.", () => {
    mockBlogDetail.mockReturnValue(mockBlogData);
    render(<BlogDetail id={1} />);

    const title = screen.getByText("테스트 블로그 제목");
    const content = screen.getByText("테스트 블로그 내용");
    const image = screen.getByAltText("블로그 상세 이미지");
    const createAt = screen.getByText("작성일시 : 2025.01.01 09:00");

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(createAt).toBeInTheDocument();
    expect(mockBlogDetail).toHaveBeenCalled();
  });

  describe("상세 페이지 데이터 수정 권한", () => {
    beforeEach(() => {
      mockBlogDetail.mockReturnValue(mockBlogData);
    });

    it("로그인 상태가 아니면 상세페이지에 수정 링크가 표시되지 않는다", () => {
      mockUser.mockReturnValue(null);
      render(<BlogDetail id={1} />);

      const editLink = screen.queryByText("수정");
      expect(editLink).not.toBeInTheDocument();
      expect(mockUser).toHaveBeenCalled();
    });

    it("작성자가 본인이 아니면 상세페이지에 수정 링크가 표시되지 않는다", () => {
      mockUser.mockReturnValue("no-userId");
      render(<BlogDetail id={1} />);

      const editLink = screen.queryByText("수정");
      expect(editLink).not.toBeInTheDocument();
      expect(mockUser).toHaveBeenCalled();
    });

    it("작성자가 본인이면 상세페이지에 수정 링크가 표시된다.", () => {
      mockUser.mockReturnValue("userId");
      render(<BlogDetail id={1} />);

      const editLink = screen.getByText("수정");
      expect(editLink).toBeInTheDocument();
      expect(editLink.closest("a")).toHaveAttribute("href", "/blog/edit?id=1");
      expect(mockUser).toHaveBeenCalled();
    });
  });
});
