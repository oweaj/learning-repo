import { createServerSideClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

// 블로그 상세 조회
export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createServerSideClient();
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "블로그 id가 존재하지 않습니다." },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from("blog_list")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "해당 블로그를 찾을 수 없습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}

// 블로그 업데이트
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createServerSideClient();
  const formData = await req.json();
  const id = Number(params.id);

  if (!id) {
    return NextResponse.json(
      { error: "업데이트할 id가 존재하지 않습니다." },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from("blog_list")
    .update(
      { ...formData, updated_at: new Date().toISOString() }
        .eq("id", id)
        .select(),
    );

  if (error) {
    return NextResponse.json(
      { error: "해당 블로그 삭제 도중 에러가 발생했습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}
