import { blogListAction } from "@/app/actions/blog/list-action";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const category = searchParams.get("category");
    const keyword = searchParams.get("keyword");

    const data = await blogListAction(category, page, keyword);

    return NextResponse.json(
      { message: "블로그 목록 조회 완료", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `서버 에러: ${error}` },
      { status: 500 },
    );
  }
}
