import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  mockBlogData,
  mockBlogLikeRankData,
} from "@/tests/mockData/mockBlogData";
import UserInfo from "./UserInfo";

describe("마이페이지 유저 정보", () => {
  it("해당 유저의 블로그에 대한 정보 카운트가 표시된다.", () => {
    render(
      <UserInfo
        queryBlogs={{ blogs: [mockBlogData], maxLikeCount: 1 }}
        queryLikeblogs={{ likeBlogs: mockBlogLikeRankData }}
      />,
    );

    expect(screen.getByText("내 블로그 수").parentElement).toHaveTextContent(
      "1",
    );
    expect(
      screen.getByText("공감한 블로그 수").parentElement,
    ).toHaveTextContent("6");
    expect(
      screen.getByText("받은 최대 공감 수").parentElement,
    ).toHaveTextContent("1");
  });
});
