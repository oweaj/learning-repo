import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BLOG_CATEGORY } from "@/constants/blogCategory";
import BlogCategory from "./BlogCategory";

jest.mock("@/components/tab/Tab", () => (props: any) => {
  return <div data-testid="mock-tab" data-props={JSON.stringify(props)} />;
});

describe("블로그 카테고리 컴포넌트", () => {
  it("카테고리 정보와 수 대로 tab이 랜더링된다.", () => {
    render(<BlogCategory />);
    const tabs = screen.getAllByTestId("mock-tab");

    expect(tabs).toHaveLength(BLOG_CATEGORY.length);

    tabs.forEach((tab, i) => {
      const props = JSON.parse(tab.getAttribute("data-props") || "{}");
      expect(props.category.id).toBe(BLOG_CATEGORY[i].id);
      expect(props.category.name).toBe(BLOG_CATEGORY[i].name);
    });
  });
});
