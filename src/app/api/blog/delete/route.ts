import { deleteBlog } from "@/app/actions/blog.action";
import { type NextRequest, NextResponse } from "next/server";

// 블로그 삭제 업데이트
export async function PATCH(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "삭제할 id가 존재하지 않습니다." },
      { status: 500 },
    );
  }

  const result = await deleteBlog(id);

  return NextResponse.json(result, { status: 200 });
}
