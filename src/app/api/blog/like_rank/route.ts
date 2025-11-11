import connectDB from "@/lib/database/db";
import { Blog } from "@/lib/schemas/blog-schema";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
  try {
    await connectDB();

    const blogRank = await Blog.find({
      deleted_at: null,
      like_count: { $gt: 0 },
    })
      .sort({ like_count: -1, createdAt: -1 })
      .populate("user_id", "email name profile_image")
      .limit(10)
      .lean();

    const data = JSON.parse(JSON.stringify(blogRank));
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
