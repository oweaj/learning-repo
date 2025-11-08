import { blogDeleteAction } from "@/app/actions/blog/delete-action";
import { blogDetailAction } from "@/app/actions/blog/detail-action";
import { blogUpdateAction } from "@/app/actions/blog/update-action";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await blogDetailAction(id);

    return NextResponse.json(
      { message: "블로그 상세 조회 완료", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `서버 에러: ${error}` },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const body = await req.json();
    const data = await blogUpdateAction({ id, data: body });

    return NextResponse.json(
      { message: "블로그 수정 완료", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `서버 에러: ${error}` },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await blogDeleteAction(id);

    return NextResponse.json(
      { message: "블로그 삭제 완료", data },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `서버 에러: ${error}` },
      { status: 500 },
    );
  }
}
