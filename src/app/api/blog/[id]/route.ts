import { getBlogDetail, updateBlog } from "@/app/actions/blog.action";
import { type NextRequest, NextResponse } from "next/server";

// 블로그 상세 조회
export async function GET(
  _: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "블로그 id가 존재하지 않습니다." },
      { status: 500 },
    );
  }

  const result = await getBlogDetail(id);

  return NextResponse.json(result, { status: 200 });
}

// 블로그 업데이트
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const formData = await req.json();
  const params = await context.params;
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "업데이트할 id가 존재하지 않습니다." },
      { status: 500 },
    );
  }

  const result = await updateBlog(id, formData);

  return NextResponse.json(result, { status: 200 });
}
