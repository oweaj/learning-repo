import express from "express";
import {
  blogCreate,
  blogDelete,
  blogDetail,
  blogList,
  blogUpdate,
} from "../controllers/blog.js";
import { isLoginUser } from "../middleware/user-middleware.js";

const router = express.Router();

router.get("/list", blogList);
router.post("/create", isLoginUser, blogCreate);
router.get("/detail", blogDetail);
router.patch("/update", isLoginUser, blogUpdate);
router.patch("/delete", isLoginUser, blogDelete);

export default router;
