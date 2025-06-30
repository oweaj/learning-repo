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
router.get("/:id", blogDetail);
router.patch("/:id", isLoginUser, blogUpdate);
router.delete("/:id", isLoginUser, blogDelete);

export default router;
