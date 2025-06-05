import { createServerSideClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(_: NextRequest) {
  const supabase = await createServerSideClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      { error: "로그아웃 진행시 에러가 발생했습니다." },
      { status: 500 },
    );
  }

  const response = new NextResponse(
    JSON.stringify({ message: "로그아웃 성공" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );

  response.cookies.delete("sb-login-time");

  return response;
}
