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
  _res: Response,
  next: NextFunction,
) => {
  const cookieToken = req.cookies.accessToken;
  const authHeader = req.headers.authorization;

  const token =
    cookieToken ||
    (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) {
    (req as IUserRequest).user = null;
    return next();
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    (req as IUserRequest).user = null;
    return next();
  }

  const user = await Auth.findById(decoded._id).select("-password");

  if (!user) {
    (req as IUserRequest).user = null;
    return next();
  }

  (req as IUserRequest).user = user;
  next();
};
