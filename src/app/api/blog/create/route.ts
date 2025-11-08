import { blogCreateAction } from "@/app/actions/blog/create-action";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const data = await blogCreateAction({
      title: body.title,
      main_image: body.main_image,
      sub_image: body.sub_image || null,
      category_id: body.category_id,
      content: body.content,
    });

    return NextResponse.json(
      { message: "블로그 생성 완료", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `서버 에러: ${error}` },
      { status: 500 },
    );
  }
}
