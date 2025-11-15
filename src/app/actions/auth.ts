"use server";

import connectDB from "@/lib/database/db";
import { Auth } from "@/lib/schemas/auth-schema";
import { Blog } from "@/lib/schemas/blog-schema";
import type { IAuthFormType } from "@/types/auth.type";
import type { IMyProfileDataType } from "@/types/mypage.type";
import { hash } from "bcryptjs";
import { requireSession } from "./requireSession";

// 회원가입
export const signupAction = async (data: IAuthFormType) => {
  await connectDB();

  const { email, password, name } = data;

  if (!email || !password || !name) {
    throw new Error("필수 항목을 모두 입력해주세요.");
  }

  const checkEmail = await Auth.findOne({ email, deleted: false });
  const checkName = await Auth.findOne({ name, deleted: false });

  if (checkEmail) {
    throw new Error("이미 사용중인 이메일 입니다.");
  }

  if (checkName) {
    throw new Error("이미 사용중인 닉네임 입니다.");
  }

  const checkPassword = password.toLowerCase();
  const hashPassword = await hash(checkPassword, 10);

  const user = new Auth({
    email,
    password: hashPassword,
    name,
  });

  await user.save();
  return { state: true, message: "회원가입이 완료되었습니다." };
};

// 유저 프로필 수정
export const profileUpdateAction = async (data: IMyProfileDataType) => {
  await connectDB();

  const user = await requireSession();
  const { name, introduce, like_category } = data;

  const userData = await Auth.findById(user._id);
  if (!userData) {
    throw new Error("존재하지 않는 사용자 입니다.");
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
  return { state: true, message: "프로필이 수정되었습니다." };
};

// 회원탈퇴
export const deleteUserAction = async () => {
  await connectDB();

  const user = await requireSession();

  const result = await Auth.findByIdAndUpdate(user._id, {
    deleted: true,
    deleted_at: new Date(),
  });

  await Blog.updateMany({ user_id: user._id }, { deleted_at: new Date() });
  await Blog.updateMany(
    { like_user: user._id },
    { $pull: { like_user: user._id }, $inc: { like_count: -1 } },
  );

  if (!result) {
    throw new Error("탈퇴할 수 없는 계정이거나 다시 한번 시도해주세요.");
  }

  return { state: true, message: "회원 탈퇴 처리 완료" };
};
