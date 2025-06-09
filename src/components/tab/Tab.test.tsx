import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tab from "./Tab";

const mockRouterPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "category") return "daily_life";
      return null;
    },
  }),
}));

describe("tab 컴포넌트", () => {
  it("카테고리 데이터를 props로 받으면 해당 카테고리 정보가 렌더링 되어야한다.", () => {
    render(<Tab category={{ id: 1, name: "일상생활", value: "daily_life" }} />);
    expect(
      screen.getByRole("button", { name: "일상생활" }),
    ).toBeInTheDocument();
  });

  it("카테고리 클릭 시 상태가 selected로 변경된다.", () => {
    render(<Tab category={{ id: 1, name: "일상생활", value: "daily_life" }} />);

    fireEvent.click(screen.getByRole("button", { name: "일상생활" }));
    expect(screen.getByTestId("daily_life-selected")).toBeInTheDocument();
  });

  it("카테고리가 기본인 전체일경우 전체 데이터를 조회한다.", () => {
    render(<Tab category={{ id: 0, name: "전체", value: "all" }} />);

    fireEvent.click(screen.getByRole("button", { name: "전체" }));
    expect(mockRouterPush).toHaveBeenCalledWith("/?page=1&limit=10");
  });

  it("카테고리 클릭 시 해당 카테고리의 데이터를 조회한다.", () => {
    render(<Tab category={{ id: 1, name: "일상생활", value: "daily_life" }} />);

    fireEvent.click(screen.getByRole("button", { name: "일상생활" }));
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/?category=daily_life&page=1&limit=10",
    );
  });
});
