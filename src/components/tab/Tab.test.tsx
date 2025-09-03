import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { mockBlogData } from "@/tests/mockData/mockBlogData";
import Tab from "./Tab";

const mockHandleQueryChange = jest.fn();

describe("tab 컴포넌트", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("카테고리 데이터를 props로 받으면 해당 카테고리 정보가 렌더링 되어야한다.", () => {
    render(
      <Tab
        item={{ id: 1, name: "일상생활", value: "daily_life" }}
        category={mockBlogData.category_id}
        handleQueryChange={mockHandleQueryChange}
      />,
    );
    expect(
      screen.getByRole("button", { name: "일상생활" }),
    ).toBeInTheDocument();
  });

  it("카테고리 클릭 시 상태가 selected로 변경된다.", () => {
    render(
      <Tab
        item={{ id: 1, name: "일상생활", value: "daily_life" }}
        category={mockBlogData.category_id}
        handleQueryChange={mockHandleQueryChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "일상생활" }));
    expect(screen.getByTestId("daily_life-selected")).toBeInTheDocument();
  });

  it("카테고리가 기본인 전체일경우 전체 데이터를 조회한다.", () => {
    const item = { id: 0, name: "전체", value: "all" };
    render(
      <Tab
        item={item}
        category={null}
        handleQueryChange={mockHandleQueryChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: item.name }));
    expect(mockHandleQueryChange).toHaveBeenCalledTimes(1);
    expect(mockHandleQueryChange).toHaveBeenCalledWith({ newCategory: null });
  });

  it("카테고리 클릭 시 해당 카테고리의 데이터를 조회한다.", () => {
    const item = { id: 1, name: "일상생활", value: "daily_life" };
    render(
      <Tab
        item={item}
        category={mockBlogData.category_id}
        handleQueryChange={mockHandleQueryChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: item.name }));
    expect(mockHandleQueryChange).toHaveBeenCalledTimes(1);
    expect(mockHandleQueryChange).toHaveBeenCalledWith({
      newCategory: item.value,
    });
  });
});
