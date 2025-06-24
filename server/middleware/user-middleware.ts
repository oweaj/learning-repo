import type { NextFunction, Request, Response } from "express";
import { type IUserRequest, verifyToken } from "../utils/jwt.js";

export interface IAuthRequest extends Request {
  user: IUserRequest;
}

// 현재 로그인한 유저 정보
export const isLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    res.status(400).json({ message: "토큰이 존재하지 않습니다." });
    return;
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(400).json({ message: "유효하지 않은 토큰입니다." });
    return;
  }

  (req as IAuthRequest).user = decoded;
  next();
};
