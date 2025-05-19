import { createServerSideClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

// 블로그 생성
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSideClient();
    const formData = await req.json();

    const { data, error } = await supabase
      .from("blog_list")
      .insert(formData)
      .select();

    if (error) {
      return NextResponse.json(
        { error: `리스트를 불러올 수 없습니다. ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `서버 에러 발생 ${error}` },
      { status: 500 },
    );
  }
}
