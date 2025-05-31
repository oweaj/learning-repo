import { createBlog } from "@/app/actions/blog.action";
import { createServerSideClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

// 블로그 생성
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSideClient();
    const formData = await req.json();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 400 },
      );
    }

    const insertData = { ...formData, user_id: user.id };
    const result = await createBlog(insertData);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `서버 에러 발생 ${error}` },
      { status: 500 },
    );
  }
}
