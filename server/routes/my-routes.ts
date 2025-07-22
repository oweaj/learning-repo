import express from "express";
import { blogLike, myBlogs } from "../controllers/blog.js";
import { isLoginUser } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/blog", isLoginUser, myBlogs);
router.patch("/blog-like", isLoginUser, blogLike);

export default router;
