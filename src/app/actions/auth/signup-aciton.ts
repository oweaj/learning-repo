"use server";

import connectDB from "@/lib/database/db";
import { Auth } from "@/lib/schemas/auth-schema";
import type { IAuthFormType } from "@/types/auth.type";
import { hash } from "bcryptjs";

export const signupAction = async (data: IAuthFormType) => {
  try {
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

    return { ok: true, message: "회원가입이 완료되었습니다." };
  } catch (error) {
    return { ok: false, message: `서버 에러 발생 : ${error}` };
  }
};
