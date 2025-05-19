import { createServerSideClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";
import { type NextRequest, NextResponse } from "next/server";

// 이미지 업로드
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const fileName = nanoid();

  if (!file)
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });

  const supabase = await createServerSideClient();

  const { error } = await supabase.storage
    .from("images")
    .upload(fileName, file);

  if (error) {
    return NextResponse.json(
      { error: "이미지 업로드에 실패했습니다." },
      { status: 500 },
    );
  }

  const { data } = supabase.storage.from("images").getPublicUrl(fileName);

  return NextResponse.json(data.publicUrl, { status: 200 });
}
