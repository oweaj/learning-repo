import express from "express";
import { imageUpload } from "../controllers/image";
import { s3ImageUpload } from "../middleware/image-middleware";

const router = express.Router();

router.post("/upload/:prefix", s3ImageUpload.single("file"), imageUpload);

export default router;
