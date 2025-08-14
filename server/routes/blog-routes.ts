import express from "express";
import {
  blogCreate,
  blogDelete,
  blogDetail,
  blogImageUpload,
  blogLike,
  blogList,
  blogUpdate,
} from "../controllers/blog.js";
import { s3ImageUpload } from "../middleware/image-middleware.js";
import { isLoginUser } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/list", blogList);
router.post("/create", isLoginUser, blogCreate);
router.get("/:id", blogDetail);
router.patch("/:id", isLoginUser, blogUpdate);
router.post("/image/:prefix", s3ImageUpload.single("file"), blogImageUpload);
router.patch("/like/:id", isLoginUser, blogLike);
router.delete("/:id", isLoginUser, blogDelete);

export default router;
