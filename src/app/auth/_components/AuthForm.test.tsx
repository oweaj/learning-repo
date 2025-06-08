import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthForm from "./AuthForm";

const mockSignin = jest.fn();
const mockSignup = jest.fn();
const mockRouterPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock("@/lib/queries/auth/useSignin", () => ({
  useSignin: () => ({
    mutate: mockSignin,
    isPending: false,
  }),
}));

jest.mock("@/lib/queries/auth/useSignup", () => ({
  useSignup: () => ({
    mutate: mockSignup,
    isPending: false,
  }),
}));

describe("로그인 및 회원가입 공통 인증 form 컴포넌트", () => {
  it("회원가입 폼 제출 시 회원가입 실패", async () => {
    render(<AuthForm submit="signup" />);

    const loginButton = screen.getByRole("button", { name: "회원가입" });
    expect(loginButton).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(
      await screen.findByText("아이디는 최소 2자 이상입니다."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("이메일 형식으로 입력해주세요."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("비밀번호를 다시 확인해주세요."),
    ).toBeInTheDocument();
  });

  it("로그인 폼 제출 시 로그인 실패", async () => {
    render(<AuthForm submit="signin" />);

    const signupButton = screen.getByRole("button", { name: "로그인" });
    expect(signupButton).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(
      await screen.findByText("이메일 형식으로 입력해주세요."),
    ).toBeInTheDocument();
  });

  it("회원가입 폼 제출 시 회원가입 성공", async () => {
    render(<AuthForm submit="signup" />);

    const nameInput = screen.getByLabelText("닉네임");
    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");
    const passwordConfirmInput = screen.getByLabelText("비밀번호 확인");

    fireEvent.change(nameInput, { target: { value: "테스트" } });
    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test1234" } });
    fireEvent.change(passwordConfirmInput, { target: { value: "test1234" } });

    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        name: "테스트",
        email: "test@test.com",
        password: "test1234",
        passwordConfirm: "test1234",
      });
    });
  });

  it("로그인 폼 제출 시 로그인 성공", async () => {
    render(<AuthForm submit="signin" />);

    const emailInput = screen.getByLabelText("이메일");
    const passwordInput = screen.getByLabelText("비밀번호");

    fireEvent.change(emailInput, { target: { value: "test@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test1234" } });

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    await waitFor(() => {
      expect(mockSignin).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "test1234",
      });
    });
  });
});
