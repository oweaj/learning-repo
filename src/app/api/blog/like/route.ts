import { blogLikeAction } from "@/app/actions/blog/like-action";
import { type NextRequest, NextResponse } from "next/server";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await blogLikeAction(id);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `서버 에러: ${error}` },
      { status: 500 },
    );
  }
}
