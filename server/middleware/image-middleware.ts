import path from "node:path";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import type { Request } from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import { nanoid } from "nanoid";

dotenv.config();

const { AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

if (!AWS_REGION || !AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
  throw new Error("aws key 설정이 되어있지 않습니다.");
}

export const s3 = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

// s3 업로드
const checkPrefix = ["blog", "profile"];

export const s3ImageUpload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_S3_BUCKET as string,
    key(req: Request, file, cb) {
      if (!checkPrefix.includes(req.params.prefix)) {
        return cb(new Error("유효하지 않는 이미지 경로입니다."));
      }

      const ext = path.extname(file.originalname);
      cb(null, `${req.params.prefix}/${Date.now()}_${nanoid()}${ext}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 * 5 },
});
