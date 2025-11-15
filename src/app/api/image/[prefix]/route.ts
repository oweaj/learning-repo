import path from "node:path";
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from "nanoid";
import { type NextRequest, NextResponse } from "next/server";

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_BUCKET } =
  process.env;

if (
  !AWS_REGION ||
  !AWS_ACCESS_KEY_ID ||
  !AWS_SECRET_ACCESS_KEY ||
  !AWS_S3_BUCKET
) {
  throw new Error("aws 환경변수가 설정되지 않았습니다.");
}

const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ prefix: string }> },
) {
  const { prefix } = await params;
  const { fileName, fileType } = await req.json();

  if (!fileName || !fileType || !prefix) {
    return NextResponse.json(
      { message: "필수 데이터를 포함해주세요." },
      { status: 400 },
    );
  }

  const key = `${prefix}/${Date.now()}_${nanoid()}${path.extname(fileName)}`;

  const command = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
    ContentType: fileType,
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return NextResponse.json({
    uploadUrl: presignedUrl,
    fileUrl: `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com/${key}`,
  });
}

export async function DELETE(req: NextRequest) {
  const { key } = await req.json();

  if (!key)
    return NextResponse.json(
      { message: "삭제할 key가 없습니다." },
      { status: 400 },
    );

  await s3.send(new DeleteObjectCommand({ Bucket: AWS_S3_BUCKET, Key: key }));

  return NextResponse.json({ message: "이미지 삭제 완료", status: 200 });
}
