import type { Request, Response } from "express";

// 이미지 업로드
export const imageUpload = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "현재 파일이 없습니다." });
    return;
  }

  const file = req.file as Express.MulterS3.File;

  res.json({ url: file.location });
};
