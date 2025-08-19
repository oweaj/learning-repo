import express from "express";
import { blogLike } from "../controllers/blog.js";
import {
  myBlogs,
  myLikeBlogs,
  noticeCreate,
  noticeDelete,
  noticeDetail,
  noticeList,
  noticeUpdate,
} from "../controllers/mypage.js";
import { isLoginUser } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/blog", isLoginUser, myBlogs);
router.patch("/blog-like", isLoginUser, blogLike);
router.get("/like-blogs", isLoginUser, myLikeBlogs);
router.post("/notice/create", isLoginUser, noticeCreate);
router.get("/notice/list", isLoginUser, noticeList);
router.patch("/notice/:id", isLoginUser, noticeUpdate);
router.get("/notice/:id", isLoginUser, noticeDetail);
router.delete("/notice/:id", isLoginUser, noticeDelete);

export default router;
