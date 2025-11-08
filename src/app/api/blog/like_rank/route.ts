import { blogLikeRankAction } from "@/app/actions/blog/rank-action";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    const data = await blogLikeRankAction();

    return NextResponse.json(
      { message: "블로그 랭킹 조회 완료", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `서버 에러: ${error}` },
      { status: 500 },
    );
  }
}
