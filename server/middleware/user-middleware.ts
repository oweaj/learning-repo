import type { NextFunction, Request, Response } from "express";
import { Auth } from "../schemas/auth-schema.js";
import { verifyToken } from "../utils/jwt.js";

export interface IUserRequest extends Request {
  user: {
    _id: string;
    email: string;
    name: string;
    profile_image: string | null;
    introduce: string | null;
    like_category: string[];
    deleted: boolean;
  };
}

// 현재 로그인한 유저 정보
export const isLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookieToken = req.cookies.accessToken;
  const authHeader = req.headers.authorization;

  const token =
    cookieToken ||
    (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

  if (!token) {
    res.status(401).json({ message: "토큰이 존재하지 않습니다." });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    return;
  }

  const user = await Auth.findById(decoded._id).select("-password");

  if (!user) {
    res.status(401).json({ message: "해당 유저가 존재하지 않습니다." });
    return;
  }

  (req as IUserRequest).user = user;
  next();
};
