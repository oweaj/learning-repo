import { createServerSideClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

// 블로그 리스트 조회
export async function GET(req: NextRequest) {
  const supabase = await createServerSideClient();
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category") || "all";
  const page = Number(searchParams.get("page") || "1");
  const limit = Number(searchParams.get("limit") || "10");
  const currentPage = (page - 1) * limit;

  let result = supabase
    .from("blog_list")
    .select(
      `*,
    category:category_id (
      id,
      name
    ),
    user_info:user_id (
      id,
      email,
      name,
      profile_image
    )
  `,
    )
    .is("deleted_at", null)
    .order("id", { ascending: false });

  if (category !== "all") {
    const { data: categoryData } = await supabase
      .from("category")
      .select("id")
      .eq("name", category)
      .single();

    if (!categoryData) {
      return NextResponse.json(
        { error: "해당 카테고리를 찾을 수 없습니다." },
        { status: 500 },
      );
    }

    result = result.eq("category_id", categoryData.id);
  }

  result = result.range(currentPage, currentPage + limit - 1);
  const { data, error } = await result;

  if (error) {
    return NextResponse.json(
      { error: "블로그 데이터를 불러오는데 실패했습니다." },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}
