import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mockData/mockBlogData";
import BlogDetail from "./BlogDetail";

const mockBlogDetail = jest.fn();
const mockBlogDelete = jest.fn();
const mockBlogLike = jest.fn();
const mockUser = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
    push: jest.fn(),
  }),
}));

jest.mock("@/lib/queries/auth/useUser", () => ({
  useUser: () => mockUser(),
}));

jest.mock("@/lib/queries/blog/useBlogDetail", () => ({
  useBlogDetail: () => mockBlogDetail(),
}));

jest.mock("@/lib/queries/blog/useBlogDelete", () => ({
  useBlogDelete: () => ({
    mutate: mockBlogDelete,
  }),
}));

jest.mock("@/lib/queries/blog/useBlogLike", () => ({
  useBlogLike: () => ({
    mutate: mockBlogLike,
  }),
}));

jest.mock("next/image", () => {
  return ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  );
});

describe("상세페이지 컴포넌트", () => {
  it("상세 데이터가 없을경우 null을 반환한다.", () => {
    mockBlogDetail.mockReturnValue(null);
    mockUser.mockReturnValue(mockBlogData.user_id);

    const { container } = render(<BlogDetail id={mockBlogData._id} />);
    expect(container.firstChild).toBeNull();
  });

  it("상세 데이터가 있을경우 해당 데이터를 렌더링한다.", () => {
    mockBlogDetail.mockReturnValue(mockBlogData);
    render(<BlogDetail id={mockBlogData._id} />);

    expect(screen.getByText(mockBlogData.title)).toBeInTheDocument();
    expect(
      screen.getByText(mockBlogData.content as string),
    ).toBeInTheDocument();
    expect(screen.getByAltText("블로그 상세 이미지")).toBeInTheDocument();
    expect(screen.getByAltText("블로그 상세 이미지")).toHaveAttribute(
      "src",
      "/test-image.jpg",
    );
    expect(screen.getByText("2025.01.01")).toBeInTheDocument();
    expect(mockBlogDetail).toHaveBeenCalled();
  });

  describe("상세 페이지 데이터 수정 권한", () => {
    beforeEach(() => {
      mockBlogDetail.mockReturnValue(mockBlogData);
    });

    it("로그인 상태가 아니면 상세페이지에 수정 링크가 표시되지 않는다", () => {
      mockUser.mockReturnValue(null);
      render(<BlogDetail id={mockBlogData._id} />);

      expect(screen.queryByText("수정")).not.toBeInTheDocument();
      expect(mockUser).toHaveBeenCalled();
    });

    it("작성자가 본인이 아니면 상세페이지에 수정 링크가 표시되지 않는다", () => {
      mockUser.mockReturnValue("no-userId");
      render(<BlogDetail id={mockBlogData._id} />);

      expect(screen.queryByText("수정")).not.toBeInTheDocument();
      expect(mockUser).toHaveBeenCalled();
    });

    it("작성자가 본인이면 상세페이지에 수정 링크가 표시된다.", () => {
      mockUser.mockReturnValue(mockBlogData.user_id);
      render(<BlogDetail id={mockBlogData._id} />);

      expect(screen.getByText("수정")).toBeInTheDocument();
      expect(screen.getByText("수정").closest("a")).toHaveAttribute(
        "href",
        `/blog/edit?id=${mockBlogData._id}`,
      );
      expect(mockUser).toHaveBeenCalled();
    });
  });
});
