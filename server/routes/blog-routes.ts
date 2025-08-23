import express from "express";
import {
  blogCreate,
  blogDelete,
  blogDetail,
  blogImageUpload,
  blogLike,
  blogLikeRank,
  blogList,
  blogUpdate,
} from "../controllers/blog.js";
import { s3ImageUpload } from "../middleware/image-middleware.js";
import { isLoginUser } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/list", blogList);
router.post("/create", isLoginUser, blogCreate);
router.get("/like_rank", blogLikeRank);
router.patch("/like/:id", isLoginUser, blogLike);
router.post("/image/:prefix", s3ImageUpload.single("file"), blogImageUpload);
router.get("/:id", isLoginUser, blogDetail);
router.patch("/:id", isLoginUser, blogUpdate);
router.delete("/:id", isLoginUser, blogDelete);

export default router;
