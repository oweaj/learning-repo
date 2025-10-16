import type { NextFunction, Request, Response } from "express";
import type { Types } from "mongoose";
import { Auth } from "../schemas/auth-schema.js";
import { verifyToken } from "../utils/jwt.js";

export interface IUserRequest extends Request {
  user: {
    _id: string | Types.ObjectId;
    email: string;
    name: string;
    profile_image: string | null;
    introduce: string | null;
    like_category: string[];
    deleted: boolean;
  } | null;
}

// 현재 로그인한 유저 정보
export const isLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  const authHeader = req.headers.authorization;

  const token =
    accessToken ||
    (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) {
    (req as IUserRequest).user = null;

    if (refreshToken) {
      res.status(401).json({ message: "토큰이 만료되었습니다." });
      return;
    }
    return next();
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "토큰이 유효하지 않습니다." });
    return;
  }

  const user = await Auth.findById(decoded._id).select("-password");

  (req as IUserRequest).user = user || null;
  next();
};
