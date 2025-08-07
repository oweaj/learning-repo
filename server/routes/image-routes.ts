import express from "express";
import { s3ImageDelete } from "../controllers/image";

import { isLoginUser } from "../middleware/user-middleware";

const router = express.Router();

router.delete("/:imageUrl", isLoginUser, s3ImageDelete);

export default router;
