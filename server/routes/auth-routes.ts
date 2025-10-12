import express from "express";
import {
  activeRefreshToken,
  deleteUser,
  getUser,
  logout,
  profileImageDelete,
  profileImageUpload,
  profileUpdate,
  signin,
  signup,
} from "../controllers/auth.js";
import { s3ImageUpload } from "../middleware/image-middleware.js";
import { isLoginUser } from "../middleware/user-middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refresh", activeRefreshToken);
router.get("/user", isLoginUser, getUser);
router.patch("/update", isLoginUser, profileUpdate);
router.patch(
  "/image/:prefix",
  isLoginUser,
  s3ImageUpload.single("file"),
  profileImageUpload,
);
router.delete("/image/:key", isLoginUser, profileImageDelete);
router.delete("/delete", isLoginUser, deleteUser);

export default router;
