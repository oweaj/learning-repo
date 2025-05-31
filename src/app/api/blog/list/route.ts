import { getBlogList } from "@/app/actions/blog.action";
import { type NextRequest, NextResponse } from "next/server";

// 블로그 리스트 조회
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const page = Number(searchParams.get("page") || "1");

  const { data, count } = await getBlogList({ category, page });

  return NextResponse.json({ data, count }, { status: 200 });
}
