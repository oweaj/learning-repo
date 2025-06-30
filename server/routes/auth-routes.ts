import express from "express";
import {
  activeRefreshToken,
  getUser,
  logout,
  signin,
  signup,
} from "../controllers/auth.js";
import { isLoginUser } from "../middleware/user-middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/refresh", activeRefreshToken);
router.get("/user", isLoginUser, getUser);

export default router;
