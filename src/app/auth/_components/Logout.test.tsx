import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Logout } from "./Logout";

const mockLogout = jest.fn();
const mockAlert = jest.fn();
window.alert = mockAlert;

jest.mock("@/lib/queries/auth/useLogout", () => ({
  useLogout: () => ({
    mutate: mockLogout,
  }),
}));

describe("로그아웃 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("로그아웃 버튼이 렌더링된다.", () => {
    render(<Logout />);

    const logoutButton = screen.getByRole("button");
    expect(logoutButton).toBeInTheDocument();
  });

  it("로그아웃 실패시 에러 메시지가 표시된다.", () => {
    mockLogout.mockImplementation(() => {
      const errorLogout = new Error("로그아웃 실패 메세지");
      alert(errorLogout.message);
    });

    render(<Logout />);
    const logoutButton = screen.getByRole("button");

    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith("로그아웃 실패 메세지");
  });

  it("로그아웃 버튼 클릭시 로그아웃 쿼리 실행이된다.", () => {
    render(<Logout />);

    const logoutButton = screen.getByRole("button");
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockAlert).not.toHaveBeenCalled();
  });
});
