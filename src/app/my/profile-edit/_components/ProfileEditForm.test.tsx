import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mockData/mockBlogData";
import ProfileEditForm from "./ProfileEditForm";

const mockUserUpdate = jest.fn();
const mockUser = jest.fn();

jest.mock("@/lib/queries/auth/useUser", () => ({
  useUser: () => mockUser(),
}));

jest.mock("@/lib/queries/auth/useUserUpdate", () => ({
  useUserUpdate: () => ({
    mutate: mockUserUpdate,
  }),
}));

describe("마이페이지 프로필 수정 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUser.mockReturnValue({ data: { name: mockBlogData.user_id.name } });
    render(<ProfileEditForm />);
  });

  it("마이페이지 프로필 수정 폼 기본 항목들이 렌더링 되어야한다.", () => {
    expect(screen.getByRole("textbox", { name: /프로필 이름/ }));
    expect(screen.getByRole("textbox", { name: /소개/ }));
    expect(screen.getByText(/관심 카테고리/)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "일상생활" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "맛집소개" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "제품후기" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "IT정보" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /프로필 수정/ }),
    ).toBeInTheDocument();
  });

  it("로그인한 사용자의 프로필 이름 데이터가 있어야한다.", () => {
    expect(screen.getByRole("textbox", { name: /프로필 이름/ })).toHaveValue(
      mockBlogData.user_id.name,
    );
  });

  it("수정 버튼을 클릭하면 업데이트한 데이터로 프로필을 업데이트 할 수 있다.", () => {
    fireEvent.change(screen.getByRole("textbox", { name: /프로필 이름/ }), {
      target: { value: "테스트수정" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /소개/ }), {
      target: { value: "프로필 소개글 테스트" },
    });
    fireEvent.click(screen.getByRole("button", { name: /프로필 수정/ }));

    waitFor(() => {
      expect(mockUserUpdate).toHaveBeenCalledTimes(1);
      expect(mockUserUpdate).toHaveBeenCalledWith({
        name: "테스트수정",
        introduce: "프로필 소개글 테스트",
      });
    });
  });
});
