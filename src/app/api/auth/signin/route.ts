import { createServerSideClient } from "@/utils/supabase/server";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.json();
  const { email, password } = formData;
  const supabase = await createServerSideClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json(
      { error: "이메일 또는 비밀번호를 다시 한번 확인해주세요." },
      { status: 500 },
    );
  }

  const isLoginTime = new Date().getTime().toString();

  const response = new NextResponse(
    JSON.stringify({ message: "로그인 성공" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );

  response.cookies.set("sb-login-time", isLoginTime, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24,
  });

  return response;
}
