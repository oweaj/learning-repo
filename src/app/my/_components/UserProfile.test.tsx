import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mockData/mockBlogData";
import UserProfile from "./UserProfile";

const mockRouterPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

jest.mock("@/assets/images/default-profile.svg", () => () => (
  <div>DefaultProfile</div>
));

describe("마이페이지 유저 프로필", () => {
  beforeEach(() => {
    render(<UserProfile user={mockBlogData.user_id} />);
  });

  it("해당 유저의 프로필 정보가 보여진다.", () => {
    expect(screen.getByText(mockBlogData.user_id.name)).toBeInTheDocument();
    expect(screen.getByText(mockBlogData.user_id.email)).toBeInTheDocument();
    expect(screen.getByText("DefaultProfile")).toBeInTheDocument();
  });

  it("프로필 수정을 클릭시 수정 페이지로 이동된다.", () => {
    const profileEditButton = screen.getByRole("button", {
      name: "프로필 수정",
    });

    expect(profileEditButton).toBeInTheDocument();

    fireEvent.click(profileEditButton);
    expect(mockRouterPush).toHaveBeenCalledWith("/my/profile-edit");
  });

  it("내 작성글 클릭시 작성한 페이지로 이동된다.", () => {
    const MyBlogButton = screen.getByRole("button", { name: "내 작성글" });
    expect(MyBlogButton).toBeInTheDocument();

    fireEvent.click(MyBlogButton);
    expect(mockRouterPush).toHaveBeenCalledWith("/my/blogs");
  });
});
