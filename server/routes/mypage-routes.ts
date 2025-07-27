import express from "express";
import { blogLike } from "../controllers/blog.js";
import {
  myBlogs,
  noticeCreate,
  noticeDelete,
  noticeList,
  noticeUpdate,
} from "../controllers/mypage.js";
import { isLoginUser } from "../middleware/user-middleware.js";

const router = express.Router();

router.post("/notice/create", isLoginUser, noticeCreate);
router.get("/notice/list", isLoginUser, noticeList);
router.patch("/notice/:id", isLoginUser, noticeUpdate);
router.delete("/notice/:id", isLoginUser, noticeDelete);
router.get("/blog", isLoginUser, myBlogs);
router.patch("/blog-like", isLoginUser, blogLike);

export default router;
