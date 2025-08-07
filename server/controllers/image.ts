import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { Request, Response } from "express";
import { s3 } from "../middleware/image-middleware";
import type { IUserRequest } from "../middleware/user-middleware";

// 이미지 삭제
export const s3ImageDelete = async (req: Request, res: Response) => {
  try {
    const user = (req as IUserRequest).user;

    if (!user) {
      res.status(401).json({ message: "로그인이 필요합니다." });
      return;
    }

    const { imageUrl } = req.params;
    const url = new URL(imageUrl);
    const key = decodeURIComponent(url.pathname.replace(/^\/+/, ""));

    const deleteImage = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });

    await s3.send(deleteImage);
    res.status(200).json({ message: "프로필 이미지가 삭제되었습니다." });
  } catch (error) {
    console.error(`프로필 이미지 삭제 실패: ${error}`);
  }
};
