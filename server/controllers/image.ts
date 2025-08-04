import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { Request, Response } from "express";
import { s3 } from "../middleware/image-middleware";

// 이미지 업로드
export const imageUpload = async (req: Request, res: Response) => {
  try {
    const prevImageUrl = req.body.prevImage;

    if (prevImageUrl) {
      try {
        const url = new URL(prevImageUrl);
        const key = decodeURIComponent(url.pathname.replace(/^\/+/, ""));

        const deleteImage = new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET,
          Key: key,
        });

        await s3.send(deleteImage);

        console.error("기존 이미지 삭제 성공");
      } catch (error) {
        console.error("기존 이미지 삭제 실패", error);
      }
    }

    if (!req.file) {
      res.status(400).json({ message: "현재 파일이 없습니다." });
      return;
    }

    const file = req.file as Express.MulterS3.File;

    res.json({ url: file.location });
  } catch (error) {
    console.error("이미지 업로드 실패", error);
  }
};
