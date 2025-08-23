import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { compare, hash } from "bcryptjs";
import type { Request, Response } from "express";
import { s3 } from "../middleware/image-middleware.js";
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
      domain: ".blog-mission.site",
      maxAge: 10 * 60 * 1000,
    });

    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      domain: ".blog-mission.site",
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
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      domain: ".blog-mission.site",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      domain: ".blog-mission.site",
    });

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
    domain: ".blog-mission.site",
    maxAge: 10 * 60 * 1000,
  });

  res.status(200).json({
    message: "access token 재발급 완료했습니다.",
    accessToken: newAccessToken,
  });
};

// 유저 정보 조회
export const getUser = (req: Request, res: Response) => {
  const user = (req as IUserRequest).user;

  res.status(200).json({ user, message: "유저 정보 조회 완료" });
};

// 유저 프로필 수정
export const profileUpdate = async (req: Request, res: Response) => {
  try {
    const user = (req as IUserRequest).user;
    const { name, introduce, like_category } = req.body;

    const userData = await Auth.findById(user._id);
    if (!userData) {
      res.status(404).json({ message: "존재하지 않는 사용자 입니다." });
      return;
    }

    const updateUserData = {
      name: name ?? userData.name,
      introduce: introduce ?? userData.introduce,
      like_category: like_category ?? userData.like_category,
    };

    await Auth.findByIdAndUpdate(
      user._id,
      { $set: updateUserData },
      { new: true },
    );

    res.status(200).json({ message: "프로필이 수정되었습니다." });
  } catch (error) {
    res.status(500).json({ message: `프로필 수정에 실패했습니다. ${error}` });
  }
};

// 유저 이미지 업로드
export const profileImageUpload = async (req: Request, res: Response) => {
  try {
    const user = (req as IUserRequest).user;

    if (!req.file) {
      res.status(400).json({ message: "이미지 파일이 없습니다." });
      return;
    }

    await Auth.findByIdAndUpdate(
      user._id,
      { profile_image: (req.file as Express.MulterS3.File).location },
      { new: true },
    );
    res.status(200).json({ message: "프로필 이미지 업로드를 했습니다." });
  } catch (error) {
    res
      .status(500)
      .json({ message: `프로필 이미지 수정에 실패했습니다. ${error}` });
  }
};

// 유저 이미지 삭제
export const profileImageDelete = async (req: Request, res: Response) => {
  try {
    const user = (req as IUserRequest).user;
    const { key } = req.params;

    if (!key) {
      res.status(400).json({ message: "삭제할 이미지 키가 필요합니다." });
      return;
    }

    const deleteImage = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    });

    await s3.send(deleteImage);
    await Auth.findByIdAndUpdate(
      user._id,
      { profile_image: null },
      { new: true },
    );

    res.status(200).json({ message: "프로필 이미지가 삭제되었습니다." });
  } catch (error) {
    console.error(`서버 에러: ${error}`);
  }
};

// 계정 탈퇴
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = (req as IUserRequest).user;

    const result = await Auth.findByIdAndUpdate(user._id, {
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
