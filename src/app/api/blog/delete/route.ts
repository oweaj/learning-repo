import { createServerSideClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

// 블로그 삭제 업데이트
export async function PATCH(req: NextRequest) {
  const supabase = await createServerSideClient();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "삭제할 id가 존재하지 않습니다." },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from("blog_list")
    .update({
      deleted_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select();

  if (error) {
    return NextResponse.json(
      { error: "해당 블로그 삭제 도중 에러가 발생했습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}
