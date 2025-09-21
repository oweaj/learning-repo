import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mockData/mockBlogData";
import Sidebar from "./Sidebar";

const mockUserDelete = jest.fn();
const mockUser = jest.fn();

jest.mock("@/lib/queries/auth/useUserDelete", () => ({
  useUserDelete: () => ({
    mutate: mockUserDelete,
  }),
}));

jest.mock("@/lib/queries/auth/useUser", () => ({
  useUser: () => mockUser(),
}));

describe("마이페이지 사이드바", () => {
  beforeEach(() => {
    mockUser.mockReturnValue({
      data: { email: mockBlogData.user_id.email },
    });
    render(<Sidebar />);
  });

  it("로그인 유저 정보가 있다면 마이페이지에 들어가서 사이드바 목록이 보여진다.", () => {
    expect(screen.getByText("공지사항")).toBeInTheDocument();
    expect(screen.getByText("작성한 블로그")).toBeInTheDocument();
    expect(screen.getByText("공감한 블로그")).toBeInTheDocument();
    expect(screen.getByText("프로필 수정")).toBeInTheDocument();
    expect(screen.getByText("회원 탈퇴")).toBeInTheDocument();

    screen.debug();
  });

  it("사이드바 목록을 클릭하면 해당 페이지로 이동된다.", () => {
    const sidebarLink = [
      { text: "공지사항", href: "/my/notice" },
      { text: "작성한 블로그", href: "/my/blogs" },
      { text: "공감한 블로그", href: "/my/liked-blogs" },
      { text: "프로필 수정", href: "/my/profile-edit" },
    ];

    sidebarLink.forEach(({ text, href }) => {
      const link = screen.getByText(text).closest("a");
      expect(link).toHaveAttribute("href", href);
    });
  });

  describe("회원탈퇴 모달 open 상태", () => {
    beforeEach(() => {
      const trigger = screen.getByText("회원 탈퇴");
      expect(trigger).toBeInTheDocument();
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

      fireEvent.click(trigger);
    });

    it("회원탈퇴 목록 클릭시 Link 대신 모달 콘텐츠가 표시된다.", () => {
      expect(screen.getByRole("checkbox")).toBeInTheDocument();
      expect(screen.getByText(mockBlogData.user_id.email)).toBeInTheDocument();
    });

    it("모달 X 아이콘을 클릭하면 모달이 닫힌다.", () => {
      const modalCloes = screen.getByTestId("modal-close");
      expect(modalCloes).toBeInTheDocument();

      fireEvent.click(modalCloes);
      expect(screen.queryByTestId("modal-close")).not.toBeInTheDocument();
      expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
      expect(
        screen.queryByText(mockBlogData.user_id.email),
      ).not.toBeInTheDocument();
    });
  });
});
