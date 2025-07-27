import { compare, hash } from "bcryptjs";
import type { Request, Response } from "express";
import type { IUserRequest } from "../middleware/user-middleware.js";
import { Auth } from "../schemas/auth-schema.js";
import { accessToken, refreshToken, verifyToken } from "../utils/jwt.js";

// 회원가입
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: "회원가입 항목을 입력해주세요." });
      return;
    }

    const checkEmail = await Auth.findOne({ email, deleted: false });
    const checkName = await Auth.findOne({ name, deleted: false });

    if (checkEmail) {
      res.status(400).json({ message: "이미 사용중인 이메일 입니다." });
      return;
    }

    if (checkName) {
      res.status(400).json({ message: "이미 사용중인 닉네임 입니다." });
      return;
    }

    const hashPassword = await hash(password, 10);

    const user = new Auth({
      email,
      password: hashPassword,
      name,
    });

    await user.save();
    res.status(200).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러 : ${error}` });
  }
};

// 로그인
export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email, deleted: false });

    if (!user) {
      res.status(400).json({ message: "해당 이메일은 가입되어있지 않습니다." });
      return;
    }

    const checkPassword = await compare(String(password), user.password);
    if (!checkPassword) {
      res.status(400).json({ message: "비밀번호가 올바르지 않습니다." });
      return;
    }

    const access = accessToken(user._id.toString());
    const refresh = refreshToken(user._id.toString());

    res.cookie("accessToken", access, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 10 * 60 * 1000,
    });

    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "로그인 성공",
    });
  } catch (error) {
    res.status(500).json({ message: `서버 에러 : ${error}` });
  }
};

// 로그아웃
export const logout = async (_req: Request, res: Response) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "로그아웃 되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};

// 리프레시 토큰 갱신
export const activeRefreshToken = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    res.status(400).json({ message: "refresh token이 없습니다." });
    return;
  }

  const user = verifyToken(refreshToken);

  if (!user) {
    res.status(400).json({ message: "refresh token이 유효하지 않습니다." });
    return;
  }

  const newAccessToken = accessToken(user._id);

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  res.status(200).json({ message: "access token 재발급 완료했습니다." });
};

// 유저 정보 조회
export const getUser = (req: Request, res: Response) => {
  const user = (req as IUserRequest).user;

  if (!user) {
    res.status(400).json({ message: "로그인이 필요합니다." });
    return;
  }

  res.status(200).json({ user, message: "유저 정보 조회 완료" });
};

// 계정 탈퇴
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user_id = (req as IUserRequest).user._id;

    if (!user_id) {
      res.status(401).json({ message: "해당 계정 id가 유효하지 않습니다." });
      return;
    }

    const result = await Auth.findByIdAndUpdate(user_id, {
      deleted: true,
      deleted_at: new Date(),
    });

    if (!result) {
      res
        .status(400)
        .json({ message: "탈퇴할 수 없는 계정이거나 다시 한번 시도해주세요." });
      return;
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "회원 탈퇴 처리 완료" });
  } catch (error) {
    res.status(500).json({ message: `서버 에러: ${error}` });
  }
};
