import { compare, hash } from "bcryptjs";
import type { Request, Response } from "express";
import { Auth } from "../schemas/auth-schema.js";
import { accessToken, refreshToken } from "../utils/jwt.js";

// 회원가입
export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: "회원가입 항목을 입력해주세요." });
      return;
    }

    const checkEmail = await Auth.findOne({ email });
    const checkName = await Auth.findOne({ name });

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
    const user = await Auth.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "해당 이메일은 가입되어있지 않습니다." });
      return;
    }

    const checkPassword = await compare(String(password), user.password);
    if (!checkPassword) {
      res.status(400).json({ message: "비밀번호가 올바르지 않습니다." });
      return;
    }

    const access = accessToken({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
    const refresh = refreshToken({
      _id: user._id,
      email: user.email,
      name: user.name,
    });

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
      maxAge: 7 * 24 * 60 * 60 * 1000,
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
