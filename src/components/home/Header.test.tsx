import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/components/home/Header";
import { mockBlogData } from "@/tests/mockData/mockBlogData";

const mockLogout = jest.fn();
const mockAlert = jest.fn();
const mockRouterPush = jest.fn();
const mockUser = jest.fn();
window.alert = mockAlert;

jest.mock("@/lib/queries/auth/useLogout", () => ({
  useLogout: () => ({
    mutate: mockLogout,
  }),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock("@/lib/queries/auth/useUser", () => ({
  useUser: () => mockUser(),
}));

describe("헤더 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser.mockReturnValue({
      data: {
        _id: mockBlogData.user_id._id,
        email: mockBlogData.user_id.email,
        name: mockBlogData.user_id.name,
      },
    });
  });

  it("로고, 마이페이지, 로그아웃 요소가 렌더링된다.", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", { level: 1, name: "BLOG" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "마이페이지" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "로그아웃" }),
    ).toBeInTheDocument();
  });

  it("로그아웃 실패시 에러 메시지가 표시된다.", () => {
    mockLogout.mockImplementation(() => {
      const errorLogout = new Error("로그아웃 실패 메세지");
      alert(errorLogout.message);
    });

    render(<Header />);

    expect(
      screen.getByRole("button", { name: "로그아웃" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "로그아웃" }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("로그아웃 실패 메세지");
  });

  it("로그아웃 버튼 클릭시 로그아웃 쿼리 실행이된다.", () => {
    render(<Header />);

    expect(
      screen.getByRole("button", { name: "로그아웃" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "로그아웃" }));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("마이페이지 링크 클릭시 마이페이지로 이동된다.", () => {
    render(<Header />);

    expect(
      screen.getByRole("button", { name: "마이페이지" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "마이페이지" }));
    expect(mockRouterPush).toHaveBeenCalledWith("/my");
  });
});
